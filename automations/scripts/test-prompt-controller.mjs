#!/usr/bin/env node
import { createPromptController, StubbedLLMInterface } from '../lib/prompt-controller.mjs';
import { createStateManager, createMemoryManager } from '../lib/state-manager.mjs';
import { createGuardEvaluator } from '../lib/guard-evaluator.mjs';
import { createAgentExecutor } from '../lib/agent-executor.mjs';

/**
 * Test script for the prompt controller
 * Verifies the controller walks the full prompt chain using stubbed LLM responses
 */

// Define test responses for different prompts
const testResponses = {
  'command.prompt.md': JSON.stringify({
    intent: 'full_run',
    summary: 'Starting full orchestration run',
    next_prompt: 'automations/prompts/orchestrations/preflight.prompt.md',
    follow_on: [
      'automations/prompts/orchestrations/run.prompt.md',
      'automations/prompts/orchestrations/postflight.prompt.md'
    ],
    notes: 'Test mode - proceeding with full run'
  }),

  'preflight.prompt.md': JSON.stringify({
    status: 'ready',
    summary: 'All preflight checks passed',
    next_prompt: 'automations/prompts/orchestrations/run.prompt.md',
    follow_on: ['automations/prompts/orchestrations/postflight.prompt.md'],
    notes: 'System ready for orchestration'
  }),

  'run.prompt.md': JSON.stringify({
    ticket_id: 'TEST-001',
    phase: 'implementer',
    summary: 'Starting ticket implementation',
    next_prompt: 'automations/prompts/agents/implementer.prompt.md',
    follow_on: [
      'automations/prompts/agents/reviewer.prompt.md',
      'automations/prompts/agents/qa.prompt.md',
      'automations/prompts/agents/ops-release.prompt.md',
      'automations/prompts/agents/knowledge-steward.prompt.md',
      'automations/prompts/orchestrations/run.prompt.md'
    ],
    updates: {
      run_state: { tickets: { 'TEST-001': { status: 'in_progress', phase: 'implementer' } } },
      memory: ['automations/memory/sessions/TEST-RUN/session.json']
    },
    notes: 'Executing implementer agent'
  }),

  'implementer.prompt.md': JSON.stringify({
    status: 'success',
    summary: 'Implementation completed',
    code_changes: ['file1.js', 'file2.js'],
    tests_added: ['test1.spec.js'],
    next_prompt: null,
    notes: 'Code implemented successfully'
  }),

  'reviewer.prompt.md': JSON.stringify({
    status: 'approved',
    summary: 'Code review passed',
    feedback: 'Code looks good',
    next_prompt: null,
    notes: 'No issues found'
  }),

  'qa.prompt.md': JSON.stringify({
    status: 'passed',
    summary: 'All tests passing',
    test_results: { passed: 10, failed: 0 },
    next_prompt: null,
    notes: 'QA complete'
  }),

  'ops-release.prompt.md': JSON.stringify({
    status: 'deployed',
    summary: 'Deployed to preview',
    deployment_url: 'https://preview.example.com',
    next_prompt: null,
    notes: 'Deployment successful'
  }),

  'knowledge-steward.prompt.md': JSON.stringify({
    status: 'updated',
    summary: 'Documentation updated',
    docs_updated: ['README.md', 'CHANGELOG.md'],
    next_prompt: null,
    notes: 'Knowledge base updated'
  }),

  'postflight.prompt.md': JSON.stringify({
    status: 'complete',
    summary: 'Postflight checks complete',
    next_prompt: null,
    notes: 'All systems operational'
  })
};

async function runTests() {
  console.log('🧪 Starting prompt controller tests...\n');

  // Test 1: Basic prompt loading and execution
  await testBasicExecution();

  // Test 2: Control loop execution
  await testControlLoop();

  // Test 3: Agent chain execution
  await testAgentChain();

  console.log('\n✅ All tests completed successfully!');
}

async function testBasicExecution() {
  console.log('Test 1: Basic prompt loading and execution');

  const llm = new StubbedLLMInterface(testResponses);
  const controller = createPromptController(llm);

  try {
    // Load and execute command prompt
    const result = await controller.executePrompt(
      'automations/prompts/orchestrations/command.prompt.md',
      { operator_intent: 'full_run' }
    );

    console.log('  ✓ Command prompt executed');
    console.log(`    Intent: ${result.intent}`);
    console.log(`    Next: ${result.next_prompt}`);

    if (result.intent !== 'full_run') {
      throw new Error('Expected intent to be full_run');
    }

  } catch (error) {
    console.error('  ✗ Test failed:', error.message);
    process.exit(1);
  }
}

async function testControlLoop() {
  console.log('\nTest 2: Control loop execution');

  const responses = {
    'First prompt': JSON.stringify({
      summary: 'First step',
      next_prompt: 'second',
      updates: { counter: 1 }
    }),
    'second': JSON.stringify({
      summary: 'Second step',
      next_prompt: 'third',
      updates: { counter: 2 }
    }),
    'third': JSON.stringify({
      summary: 'Final step',
      next_prompt: null,
      updates: { counter: 3 }
    })
  };

  const llm = new StubbedLLMInterface(responses);
  const controller = createPromptController(llm);

  // Override loadPrompt for this test
  controller.loadPrompt = async (path) => path + ' content';

  try {
    const result = await controller.runControlLoop('First prompt', { initial: true });

    console.log('  ✓ Control loop completed');
    console.log(`    Iterations: ${result.iterations}`);
    console.log(`    Final counter: ${result.final_result.updates.counter}`);

    if (result.iterations !== 3) {
      throw new Error('Expected 3 iterations');
    }

    if (!result.completed) {
      throw new Error('Expected loop to complete');
    }

  } catch (error) {
    console.error('  ✗ Test failed:', error.message);
    process.exit(1);
  }
}

async function testAgentChain() {
  console.log('\nTest 3: Agent chain execution');

  const llm = new StubbedLLMInterface(testResponses);
  const promptController = createPromptController(llm);
  const stateManager = createStateManager();
  const guardEvaluator = createGuardEvaluator();

  // Create a test run ID
  const runId = 'TEST-RUN-001';
  const memoryManager = createMemoryManager(runId);

  // Override methods to avoid file system operations
  stateManager.loadRunState = async () => ({
    run_id: runId,
    tickets: { 'TEST-001': { status: 'pending', phase: 'planner' } }
  });
  stateManager.saveRunState = async () => {};
  stateManager.updateTicketStatus = async () => ({ tickets: {} });

  memoryManager.bootstrap = async () => 'test-heartbeat.json';
  memoryManager.updateHeartbeat = async () => {};
  memoryManager.writeTelemetry = async () => 'test-telemetry.json';
  memoryManager.writeReplayTrace = async () => 'test-replay.json';
  memoryManager.updateSession = async () => {};
  memoryManager.queryMemory = async () => ({ facts: {}, related: [] });

  const agentExecutor = createAgentExecutor({
    promptController,
    stateManager,
    memoryManager,
    guardEvaluator
  });

  try {
    const ticket = {
      ticket_id: 'TEST-001',
      title: 'Test ticket',
      dependencies: []
    };

    const context = {
      run_id: runId,
      test: true
    };

    // Execute single agent
    const result = await agentExecutor.executeAgent('implementer', ticket, context);

    console.log('  ✓ Agent executed');
    console.log(`    Status: ${result.status}`);
    console.log(`    Summary: ${result.summary}`);

    if (result.status !== 'success') {
      throw new Error('Expected agent to succeed');
    }

  } catch (error) {
    console.error('  ✗ Test failed:', error.message);
    process.exit(1);
  }
}

// Run tests
runTests().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});