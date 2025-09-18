#!/usr/bin/env node
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createPromptController } from '../lib/prompt-controller.mjs';
import { createStateManager, createMemoryManager } from '../lib/state-manager.mjs';
import { createGuardEvaluator } from '../lib/guard-evaluator.mjs';
import { createAgentExecutor } from '../lib/agent-executor.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

/**
 * Prompt-Driven Orchestrator
 *
 * This script implements the full prompt-driven orchestration flow:
 * - Loads and executes prompts via the prompt controller
 * - Manages state and memory through helpers
 * - Follows the preflight → run → agent → postflight sequence
 * - Evaluates guards and manages the control loop
 */

async function main() {
  try {
    // Initialize components
    const promptController = createPromptController();
    const stateManager = createStateManager();
    const guardEvaluator = createGuardEvaluator();

    // Load initial state
    const queue = await stateManager.loadQueue();
    if (!queue || queue.length === 0) {
      console.error('❌ No tickets in queue. Run planner first.');
      process.exit(1);
    }

    // Generate or get run ID
    const existingState = await stateManager.loadRunState();
    const runId = stateManager.generateRunId(existingState);

    // Initialize run state
    const runState = await stateManager.initializeRunState(runId, false);

    // Create memory manager
    const memoryManager = createMemoryManager(runId);
    await memoryManager.bootstrap();

    // Create agent executor
    const agentExecutor = createAgentExecutor({
      promptController,
      stateManager,
      memoryManager,
      guardEvaluator
    });

    // Build initial context
    const initialContext = {
      operator_intent: 'full_run',
      run_id: runId,
      run_state: runState,
      queue: queue,
      memory_paths: {
        sessions: `automations/memory/sessions/${runId}`,
        telemetry: `automations/memory/telemetry/${runId}`,
        replay: `automations/memory/replay/${runId}`
      }
    };

    // Execute command prompt to determine flow
    console.log('🚀 Starting prompt-driven orchestration...');
    const commandResult = await promptController.executePrompt(
      'automations/prompts/orchestrations/command.prompt.md',
      initialContext
    );

    console.log(`📋 Intent: ${commandResult.intent}`);

    // Handle different intents
    if (commandResult.intent === 'full_run') {
      // Execute full orchestration flow
      await executeFullRun(
        promptController,
        stateManager,
        memoryManager,
        guardEvaluator,
        agentExecutor,
        runId,
        queue
      );
    } else if (commandResult.intent === 'ticket_plan') {
      // Execute planner only
      await agentExecutor.executePlanner(initialContext);
      console.log('✅ Planning completed.');
    } else if (commandResult.intent === 'ticket_execution') {
      // Execute specific ticket
      const ticketId = commandResult.ticket_id;
      const ticket = queue.find(t => t.ticket_id === ticketId);

      if (!ticket) {
        console.error(`❌ Ticket ${ticketId} not found in queue.`);
        process.exit(1);
      }

      await executeTicket(
        ticket,
        stateManager,
        memoryManager,
        guardEvaluator,
        agentExecutor,
        runId
      );
    } else {
      console.error(`❌ Unknown intent: ${commandResult.intent}`);
      process.exit(1);
    }

    console.log('✅ Orchestration completed successfully.');

  } catch (error) {
    console.error('❌ Orchestration failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

/**
 * Execute full orchestration run
 */
async function executeFullRun(
  promptController,
  stateManager,
  memoryManager,
  guardEvaluator,
  agentExecutor,
  runId,
  queue
) {
  // Execute preflight first
  console.log('🔍 Running preflight checks...');
  const preflightResult = await promptController.executePrompt(
    'automations/prompts/orchestrations/preflight.prompt.md',
    {
      run_id: runId,
      queue
    }
  );

  await applyPromptUpdates({
    result: preflightResult,
    stateManager,
    memoryManager
  });

  if (preflightResult.status !== 'ready') {
    console.error('❌ Preflight checks failed:', preflightResult.summary);
    if (preflightResult.blockers) {
      console.error('Blockers:', preflightResult.blockers);
    }
    process.exit(1);
  }

  console.log('✅ Preflight checks passed.');

  const runPromptPath = 'automations/prompts/orchestrations/run.prompt.md';
  const postflightPromptPath = 'automations/prompts/orchestrations/postflight.prompt.md';

  let context = {
    run_id: runId,
    queue,
    run_state: await stateManager.loadRunState(),
    guard_evaluations: {},
    operator_intent: 'full_run',
    memory_paths: {
      sessions: `automations/memory/sessions/${runId}`,
      telemetry: `automations/memory/telemetry/${runId}`,
      replay: `automations/memory/replay/${runId}`
    }
  };

  let currentPrompt = runPromptPath;
  let followOnQueue = [];
  let activeTicket = null;
  let blockedTickets = new Set();
  let processedCount = 0;
  let postflightDetails = null;
  let loopError = null;

  console.log('🔄 Entering prompt-driven execution loop...');

  try {
    while (currentPrompt) {
      context.run_state = await stateManager.loadRunState();

      if (currentPrompt === runPromptPath) {
        const runResult = await promptController.executePrompt(runPromptPath, context);
        await applyPromptUpdates({ result: runResult, stateManager, memoryManager });

        if (runResult.phase === 'blocked' && runResult.ticket_id) {
          blockedTickets.add(runResult.ticket_id);
        }

        if (runResult.phase === 'done' && runResult.ticket_id) {
          processedCount += 1;
        }

        if (!runResult.next_prompt) {
          break;
        }

        if (runResult.next_prompt === postflightPromptPath) {
          currentPrompt = null;
          break;
        }

        if (runResult.next_prompt.includes('/agents/')) {
          const ticketId = runResult.ticket_id;
          activeTicket = queue.find(t => t.ticket_id === ticketId);

          if (!activeTicket) {
            throw new Error(`Run prompt referenced unknown ticket: ${ticketId}`);
          }

          const guardResult = await guardEvaluator.evaluateTicket(ticketId);
          context.guard_evaluations = {
            ...(context.guard_evaluations || {}),
            [ticketId]: guardResult
          };
          if (guardResult && !guardResult.passed) {
            console.log(`❌ Guard checks failed for ${ticketId}. Marking blocked.`);
            await stateManager.updateTicketStatus(ticketId, 'blocked', 'blocked', {
              summary: guardResult.summary,
              failures: guardResult.failures,
              recommended_actions: guardResult.recommended_actions
            });
            context.run_state = await stateManager.loadRunState();
            blockedTickets.add(ticketId);
            currentPrompt = followOnQueue.shift() || runPromptPath;
            continue;
          }

          followOnQueue = Array.isArray(runResult.follow_on) ? [...runResult.follow_on] : [];
          context.current_ticket = activeTicket;
          context.current_phase = runResult.phase;
          currentPrompt = runResult.next_prompt;
          continue;
        }

        // If run prompt directed to another orchestration prompt
        currentPrompt = runResult.next_prompt;
        continue;
      }

      if (currentPrompt.includes('/agents/')) {
        if (!activeTicket) {
          throw new Error('Agent prompt requested without an active ticket context');
        }

        const agentName = currentPrompt
          .split('/')
          .pop()
          .replace('.prompt.md', '');

        const agentResult = await agentExecutor.executeAgent(agentName, activeTicket, context);
        await applyPromptUpdates({ result: agentResult, stateManager, memoryManager });

        context.previous_agent_output = agentResult;

        // Determine next prompt in chain
        currentPrompt = followOnQueue.shift() || runPromptPath;

        if (!currentPrompt.includes('/agents/') && currentPrompt === runPromptPath) {
          activeTicket = null;
        }

        continue;
      }

      // Unknown prompt type
      console.warn(`⚠️  Unrecognized prompt flow: ${currentPrompt}. Stopping.`);
      break;
    }
  } catch (error) {
    loopError = error;
  } finally {
    try {
      postflightDetails = await ensurePostflight({
        promptController,
        stateManager,
        memoryManager,
        runId,
        processedCount,
        blockedTickets
      });
    } catch (postflightError) {
      if (loopError) {
        console.error('❌ Postflight execution failed after orchestration error:', postflightError.message);
      }
      loopError = loopError || postflightError;
    }
  }

  if (postflightDetails && postflightDetails.blockedTickets.length > 0) {
    console.error(`\n❌ Queue halted. Blocked tickets: ${postflightDetails.blockedTickets.join(', ')}`);
    console.error('Refer to automations/run-state.json for detailed guard failures.');
    process.exit(1);
  }

  if (loopError) {
    throw loopError;
  }

  console.log(`\n✅ Prompt-driven run completed. Tickets processed: ${processedCount}`);
}

async function ensurePostflight({
  promptController,
  stateManager,
  memoryManager,
  runId,
  processedCount,
  blockedTickets
}) {
  const finalState = await stateManager.loadRunState();
  const postflightResult = await promptController.executePrompt(
    'automations/prompts/orchestrations/postflight.prompt.md',
    {
      run_id: runId,
      tickets_processed: processedCount,
      blocked_tickets: Array.from(blockedTickets),
      final_state: finalState
    }
  );

  if (memoryManager) {
    await memoryManager.updateHeartbeat(blockedTickets.size ? 'blocked' : 'postflight');
  }

  await applyPromptUpdates({ result: postflightResult, stateManager, memoryManager });

  console.log(`\n✅ Postflight completed: ${postflightResult.summary}`);

  return {
    summary: postflightResult.summary,
    blockedTickets: Array.from(blockedTickets)
  };
}

/**
 * Execute a single ticket
 */
async function executeTicket(
  ticket,
  stateManager,
  memoryManager,
  guardEvaluator,
  agentExecutor,
  runId
) {
  try {
    // Build context for ticket execution
    const context = {
      run_id: runId,
      ticket: ticket,
      memory_paths: {
        sessions: `automations/memory/sessions/${runId}`,
        telemetry: `automations/memory/telemetry/${runId}`,
        replay: `automations/memory/replay/${runId}`
      }
    };

    // Execute through agent chain
    const result = await agentExecutor.executeTicketChain(ticket, context);

    if (result.success) {
      console.log(`✅ Ticket ${ticket.ticket_id} completed successfully.`);
    } else {
      console.log(`❌ Ticket ${ticket.ticket_id} failed at phase: ${result.phase}`);
      console.log(`   Reason: ${result.reason}`);
    }

    return result;

  } catch (error) {
    console.error(`❌ Error executing ticket ${ticket.ticket_id}:`, error);

    await stateManager.updateTicketStatus(
      ticket.ticket_id,
      'error',
      'blocked',
      {
        summary: 'Execution error',
        error: error.message
      }
    );

    return {
      success: false,
      phase: 'error',
      reason: error.message
    };
  }
}

/**
 * Apply updates returned from a prompt response
 */
async function applyPromptUpdates({ result, stateManager, memoryManager }) {
  if (!result || !result.updates) {
    return;
  }

  const { updates } = result;

  if (updates.run_state) {
    await stateManager.applyRunStateDelta(updates.run_state);
  }

  if (memoryManager && updates.memory && Array.isArray(updates.memory)) {
    for (const entry of updates.memory) {
      if (typeof entry === 'string') {
        await memoryManager.updateSession({ note: entry });
      } else if (entry && typeof entry === 'object') {
        await memoryManager.updateSession(entry);
      }
    }
  }

  if (memoryManager && updates.telemetry && Array.isArray(updates.telemetry)) {
    for (const item of updates.telemetry) {
      if (item && typeof item === 'object') {
        const { ticket_id, phase, data } = item;
        if (ticket_id && phase) {
          await memoryManager.writeTelemetry(ticket_id, phase, data || {});
        }
      }
    }
  }
}

// Run the orchestrator
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
