#!/usr/bin/env node
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdir, writeFile } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

/**
 * Agent Executor - Manages execution of agent prompts
 */
export class AgentExecutor {
  constructor(promptController, stateManager, memoryManager, guardEvaluator) {
    this.promptController = promptController;
    this.stateManager = stateManager;
    this.memoryManager = memoryManager;
    this.guardEvaluator = guardEvaluator;
    this.agentSequence = [
      'implementer',
      'reviewer',
      'qa',
      'ops-release',
      'knowledge-steward'
    ];

    // Escalation configuration
    this.escalationCategories = {
      MISSING_DEPENDENCY: 'missing_dependency',
      GUARD_FAILURE: 'guard_failure',
      API_ERROR: 'api_error',
      TIMEOUT: 'timeout',
      VALIDATION_ERROR: 'validation_error',
      HUMAN_REVIEW: 'human_review',
      UNKNOWN: 'unknown'
    };

    this.retryConfig = {
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 30000,
      backoffMultiplier: 2
    };

    this.escalationMetrics = {
      totalEscalations: 0,
      byCategory: {},
      byTicket: {},
      byPhase: {}
    };
  }

  /**
   * Execute a single agent
   * @param {string} agentName - Agent name
   * @param {Object} ticket - Ticket data
   * @param {Object} context - Execution context
   * @returns {Promise<Object>} Agent result
   */
  async executeAgent(agentName, ticket, context) {
    const promptPath = `automations/prompts/agents/${agentName}.prompt.md`;

    // Update heartbeat
    await this.memoryManager.updateHeartbeat(`${ticket.ticket_id}:${agentName}`);

    // Build agent context
    const agentContext = {
      ...context,
      current_ticket: ticket,
      agent: agentName,
      phase: agentName
    };

    // Query relevant memory
    const memorySlice = await this.memoryManager.queryMemory({
      ticket_id: ticket.ticket_id,
      phase: agentName
    });
    agentContext.memory_slice = memorySlice;

    // Execute the agent prompt
    const result = await this.promptController.executePrompt(promptPath, agentContext);

    // Write telemetry
    await this.memoryManager.writeTelemetry(ticket.ticket_id, agentName, {
      summary: result.summary,
      status: result.status || 'in_progress',
      details: result.details,
      timestamp: new Date().toISOString()
    });

    // Write replay trace
    const events = [
      {
        type: 'execution',
        agent: agentName,
        detail: result.summary,
        timestamp: new Date().toISOString()
      }
    ];

    if (result.events) {
      events.push(...result.events);
    }

    await this.memoryManager.writeReplayTrace(ticket.ticket_id, agentName, events);

    // Update session
    await this.memoryManager.updateSession({
      active_phase: agentName,
      last_agent: agentName,
      last_ticket: ticket.ticket_id
    });

    return result;
  }

  /**
   * Execute the full agent chain for a ticket
   * @param {Object} ticket - Ticket to execute
   * @param {Object} initialContext - Initial context
   * @returns {Promise<Object>} Execution result
   */
  async executeTicketChain(ticket, initialContext) {
    let currentAgent = 0;
    let context = { ...initialContext };
    const maxRetries = 3;
    const results = [];
    let globalRetryCount = 0; // Track total rewinds

    while (currentAgent < this.agentSequence.length && globalRetryCount < maxRetries) {
      const agentName = this.agentSequence[currentAgent];

      try {
        // Update state to in_progress
        await this.stateManager.updateTicketStatus(
          ticket.ticket_id,
          agentName,
          'in_progress',
          { agent: agentName }
        );

        // Execute agent
        const result = await this.executeAgent(agentName, ticket, context);
        results.push(result);

        // Handle agent response with enhanced escalation
        if (result.status === 'escalate') {
          const escalation = await this.handleEscalation(
            ticket,
            agentName,
            result,
            context
          );

          if (escalation.shouldRetry) {
            // Retry with backoff
            globalRetryCount++;
            context.retryMetadata = escalation.retryMetadata;
            await this.delay(escalation.retryDelay);
            continue;
          }

          return {
            success: false,
            phase: agentName,
            reason: 'escalation',
            escalation,
            results
          };
        }

        if (result.status === 'revise' && agentName === 'reviewer') {
          // Reviewer requests revision - properly rewind
          context.reviewer_feedback = result;
          currentAgent = 0; // Reset to implementer
          globalRetryCount++;
          continue; // Continue from new position
        }

        if (result.status === 'failed' && agentName === 'qa') {
          // QA failed - properly rewind
          context.qa_failure = result;
          currentAgent = 0; // Reset to implementer
          globalRetryCount++;
          continue; // Continue from new position
        }

        // Agent succeeded - move forward
        context[`${agentName}_output`] = result;
        currentAgent++;

      } catch (error) {
        console.error(`Error executing ${agentName}:`, error);
        globalRetryCount++;

        if (globalRetryCount >= maxRetries) {
          await this.stateManager.updateTicketStatus(
            ticket.ticket_id,
            agentName,
            'blocked',
            {
              summary: `Failed after ${maxRetries} retries`,
              error: error.message
            }
          );
          return {
            success: false,
            phase: agentName,
            reason: 'max_retries',
            results
          };
        }
      }
    }

    // All agents completed successfully
    await this.stateManager.updateTicketStatus(
      ticket.ticket_id,
      'knowledge',
      'done',
      {
        summary: 'Ticket completed successfully',
        completed_at: new Date().toISOString()
      }
    );

    return {
      success: true,
      phase: 'done',
      results
    };
  }

  /**
   * Execute planner agent
   * @param {Object} context - Execution context
   * @returns {Promise<Object>} Planner result
   */
  async executePlanner(context) {
    const promptPath = 'automations/prompts/agents/planner.prompt.md';

    await this.memoryManager.updateHeartbeat('planner');

    const result = await this.promptController.executePrompt(promptPath, context);

    // Update queue if planner produced new tickets
    if (result.tickets) {
      // Would write to run-queue.json here
      context.queue_updated = true;
    }

    await this.memoryManager.updateSession({
      active_phase: 'planner',
      planner_executed: true
    });

    return result;
  }

  /**
   * Get the next agent for a ticket based on current phase
   * @param {string} currentPhase - Current phase
   * @returns {string|null} Next agent name or null
   */
  getNextAgent(currentPhase) {
    const index = this.agentSequence.indexOf(currentPhase);

    if (index === -1) {
      // Not in sequence, start from beginning
      return this.agentSequence[0];
    }

    if (index < this.agentSequence.length - 1) {
      return this.agentSequence[index + 1];
    }

    return null; // All agents completed
  }

  /**
   * Determine if a ticket needs agent execution
   * @param {Object} ticket - Ticket data
   * @param {Object} state - Current state
   * @returns {boolean} True if needs execution
   */
  needsExecution(ticket, state) {
    const ticketState = state.tickets && state.tickets[ticket.ticket_id];

    if (!ticketState) {
      return true;
    }

    return ticketState.status !== 'done' && ticketState.status !== 'blocked';
  }

  /**
   * Handle escalation with categorization and retry logic
   * @param {Object} ticket - Ticket being escalated
   * @param {string} phase - Current phase
   * @param {Object} result - Agent result
   * @param {Object} context - Execution context
   * @returns {Promise<Object>} Escalation details
   */
  async handleEscalation(ticket, phase, result, context) {
    const category = this.categorizeEscalation(result);
    const retryAttempt = context.retryMetadata?.attempt || 0;

    // Update metrics
    this.escalationMetrics.totalEscalations++;
    this.escalationMetrics.byCategory[category] =
      (this.escalationMetrics.byCategory[category] || 0) + 1;
    this.escalationMetrics.byTicket[ticket.ticket_id] =
      (this.escalationMetrics.byTicket[ticket.ticket_id] || 0) + 1;
    this.escalationMetrics.byPhase[phase] =
      (this.escalationMetrics.byPhase[phase] || 0) + 1;

    // Determine if we should retry
    const shouldRetry = this.shouldRetryEscalation(category, retryAttempt);
    const retryDelay = this.calculateRetryDelay(retryAttempt);

    // Log escalation
    const escalationEntry = {
      ticket_id: ticket.ticket_id,
      phase,
      category,
      reason: result.notes || result.summary,
      timestamp: new Date().toISOString(),
      retryAttempt,
      shouldRetry,
      retryDelay
    };

    // Update ticket status
    await this.stateManager.updateTicketStatus(
      ticket.ticket_id,
      phase,
      shouldRetry ? 'retry_pending' : 'blocked',
      {
        summary: result.summary,
        escalation_reason: result.notes,
        escalation_category: category,
        retry_attempt: retryAttempt,
        next_retry: shouldRetry ? new Date(Date.now() + retryDelay).toISOString() : null
      }
    );

    // Send escalation notification if needed
    if (!shouldRetry || retryAttempt >= this.retryConfig.maxRetries - 1) {
      await this.notifyEscalation(escalationEntry);
    }

    return {
      category,
      shouldRetry,
      retryDelay,
      retryMetadata: {
        attempt: retryAttempt + 1,
        category,
        lastError: result.notes
      },
      escalationEntry
    };
  }

  /**
   * Categorize escalation reason
   * @param {Object} result - Agent result
   * @returns {string} Escalation category
   */
  categorizeEscalation(result) {
    const reason = (result.notes || result.summary || '').toLowerCase();

    if (reason.includes('dependency') || reason.includes('package') || reason.includes('module')) {
      return this.escalationCategories.MISSING_DEPENDENCY;
    }
    if (reason.includes('guard') || reason.includes('validation') || reason.includes('check')) {
      return this.escalationCategories.GUARD_FAILURE;
    }
    if (reason.includes('api') || reason.includes('network') || reason.includes('connection')) {
      return this.escalationCategories.API_ERROR;
    }
    if (reason.includes('timeout') || reason.includes('timed out')) {
      return this.escalationCategories.TIMEOUT;
    }
    if (reason.includes('invalid') || reason.includes('malformed') || reason.includes('schema')) {
      return this.escalationCategories.VALIDATION_ERROR;
    }
    if (reason.includes('human') || reason.includes('manual') || reason.includes('review')) {
      return this.escalationCategories.HUMAN_REVIEW;
    }

    return this.escalationCategories.UNKNOWN;
  }

  /**
   * Determine if escalation should be retried
   * @param {string} category - Escalation category
   * @param {number} attempt - Current retry attempt
   * @returns {boolean} Should retry
   */
  shouldRetryEscalation(category, attempt) {
    if (attempt >= this.retryConfig.maxRetries) {
      return false;
    }

    // Some categories should not be retried
    const nonRetryableCategories = [
      this.escalationCategories.HUMAN_REVIEW,
      this.escalationCategories.VALIDATION_ERROR
    ];

    return !nonRetryableCategories.includes(category);
  }

  /**
   * Calculate retry delay with exponential backoff
   * @param {number} attempt - Retry attempt number
   * @returns {number} Delay in milliseconds
   */
  calculateRetryDelay(attempt) {
    const delay = Math.min(
      this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffMultiplier, attempt),
      this.retryConfig.maxDelay
    );

    // Add jitter to avoid thundering herd
    const jitter = Math.random() * 0.3 * delay;
    return Math.floor(delay + jitter);
  }

  /**
   * Notify about escalation
   * @param {Object} escalation - Escalation details
   */
  async notifyEscalation(escalation) {
    // Write to escalation log
    const escalationLogPath = resolve(
      this.memoryManager.memoryRoot,
      'escalations',
      `${escalation.ticket_id}-${Date.now()}.json`
    );

    try {
      await mkdir(dirname(escalationLogPath), { recursive: true });
      await writeFile(
        escalationLogPath,
        JSON.stringify(escalation, null, 2),
        'utf8'
      );

      console.warn(`⚠️  Escalation logged for ${escalation.ticket_id}: ${escalation.category}`);
      console.warn(`   Reason: ${escalation.reason}`);
      console.warn(`   Log: ${escalationLogPath}`);
    } catch (error) {
      console.error('Failed to log escalation:', error);
    }
  }

  /**
   * Get escalation metrics
   * @returns {Object} Escalation metrics
   */
  getEscalationMetrics() {
    return {
      ...this.escalationMetrics,
      avgEscalationsPerTicket: this.escalationMetrics.totalEscalations /
        Object.keys(this.escalationMetrics.byTicket).length || 0
    };
  }

  /**
   * Helper to delay execution
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise<void>}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Factory function to create an agent executor
 * @param {Object} deps - Dependencies
 * @returns {AgentExecutor} Executor instance
 */
export function createAgentExecutor(deps) {
  const {
    promptController,
    stateManager,
    memoryManager,
    guardEvaluator
  } = deps;

  return new AgentExecutor(
    promptController,
    stateManager,
    memoryManager,
    guardEvaluator
  );
}