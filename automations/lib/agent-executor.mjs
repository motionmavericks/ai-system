#!/usr/bin/env node
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

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

    while (currentAgent < this.agentSequence.length) {
      const agentName = this.agentSequence[currentAgent];
      let retryCount = 0;
      let success = false;

      while (retryCount < maxRetries && !success) {
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

          // Handle agent response
          if (result.status === 'escalate') {
            // Escalation required
            await this.stateManager.updateTicketStatus(
              ticket.ticket_id,
              agentName,
              'blocked',
              {
                summary: result.summary,
                escalation_reason: result.notes
              }
            );
            return {
              success: false,
              phase: agentName,
              reason: 'escalation',
              results
            };
          }

          if (result.status === 'revise' && agentName === 'reviewer') {
            // Reviewer requests revision - go back to implementer
            context.reviewer_feedback = result;
            currentAgent = 0; // Back to implementer
            retryCount++;
            continue;
          }

          if (result.status === 'failed' && agentName === 'qa') {
            // QA failed - go back to implementer
            context.qa_failure = result;
            currentAgent = 0; // Back to implementer
            retryCount++;
            continue;
          }

          // Agent succeeded
          success = true;
          context[`${agentName}_output`] = result;

        } catch (error) {
          console.error(`Error executing ${agentName}:`, error);
          retryCount++;

          if (retryCount >= maxRetries) {
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

      if (success) {
        currentAgent++;
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