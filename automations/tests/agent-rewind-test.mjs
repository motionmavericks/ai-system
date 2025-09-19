#!/usr/bin/env node

/**
 * Agent Rewind Test Harness
 * Tests the Phase 1 fix for proper agent loop rewinding when reviewer requests revision or QA fails.
 */

import { AgentExecutor } from '../lib/agent-executor.mjs';
import { StateManager } from '../lib/state-manager.mjs';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { join } from 'path';

// Test configuration
const TEST_RUN_ID = `TEST-REWIND-${Date.now()}`;
const TEST_TICKET = {
  ticket_id: 'TEST-001',
  summary: 'Test ticket for rewind verification',
  acceptance_criteria: ['Verify rewind logic works correctly'],
  priority: 'high'
};

// Mock responses for different agents
const MOCK_RESPONSES = {
  implementer: {
    first_attempt: {
      status: 'complete',
      summary: 'Initial implementation complete',
      files_modified: ['test.js'],
      implementation: 'console.log("first attempt");'
    },
    after_review: {
      status: 'complete',
      summary: 'Fixed based on reviewer feedback',
      files_modified: ['test.js'],
      implementation: 'console.log("fixed after review");'
    },
    after_qa: {
      status: 'complete',
      summary: 'Fixed QA issues',
      files_modified: ['test.js'],
      implementation: 'console.log("fixed after QA");'
    }
  },
  reviewer: {
    first_review: {
      status: 'revise',
      summary: 'Code needs improvements',
      notes: 'Missing error handling'
    },
    second_review: {
      status: 'approved',
      summary: 'Code looks good now'
    }
  },
  qa: {
    first_test: {
      status: 'failed',
      summary: 'Tests failed',
      notes: 'Unit test coverage insufficient'
    },
    second_test: {
      status: 'passed',
      summary: 'All tests passing'
    }
  },
  ops_release: {
    status: 'deployed',
    summary: 'Deployed to staging'
  },
  knowledge_steward: {
    status: 'documented',
    summary: 'Knowledge captured'
  }
};

// Mock PromptController for testing
class MockPromptController {
  constructor(mockResponses) {
    this.mockResponses = mockResponses;
    this.callCount = {
      implementer: 0,
      reviewer: 0,
      qa: 0,
      ops_release: 0,
      knowledge_steward: 0
    };
  }

  async executePrompt(promptPath, context) {
    // Extract agent name from prompt path
    const agent = promptPath.split('/').pop().replace('.prompt.md', '');

    // Handle ops-release -> ops_release mapping
    const agentKey = agent.replace('-', '_');

    this.callCount[agentKey]++;

    // Return different responses based on call count and agent
    switch(agentKey) {
      case 'implementer':
        if (this.callCount.implementer === 1) {
          return this.mockResponses.implementer.first_attempt;
        } else if (this.callCount.implementer === 2) {
          // After reviewer feedback
          return this.mockResponses.implementer.after_review;
        } else if (this.callCount.implementer === 3) {
          // After QA failure
          return this.mockResponses.implementer.after_qa;
        }
        break;

      case 'reviewer':
        if (this.callCount.reviewer === 1) {
          return this.mockResponses.reviewer.first_review;
        } else {
          // After any fix, approve
          return this.mockResponses.reviewer.second_review;
        }

      case 'qa':
        if (this.callCount.qa === 1) {
          return this.mockResponses.qa.first_test;
        } else {
          return this.mockResponses.qa.second_test;
        }

      case 'ops_release':
        return this.mockResponses.ops_release;

      case 'knowledge_steward':
        return this.mockResponses.knowledge_steward;
    }

    throw new Error(`Unexpected agent call: ${agentKey} #${this.callCount[agentKey]}`);
  }
}

// Test runner
async function runTest() {
  console.log('🧪 Agent Rewind Test Harness');
  console.log('===========================\n');

  // Setup test directory
  const testDir = join(process.cwd(), 'automations', 'tests', 'rewind-test-output');
  if (!existsSync(testDir)) {
    await mkdir(testDir, { recursive: true });
  }

  // Initialize components
  const stateManager = new StateManager({
    runStatePath: join(testDir, 'run-state.json'),
    queuePath: join(testDir, 'run-queue.json')
  });

  const promptController = new MockPromptController(MOCK_RESPONSES);

  // Mock memory manager
  const memoryManager = {
    updateHeartbeat: async () => {},
    queryMemory: async () => ({ facts: {}, related: [] }),
    capturePhaseActivity: async () => {},
    writeTelemetry: async () => {},
    writeReplayTrace: async () => {},
    updateSession: async () => {}
  };

  // Mock guard evaluator
  const guardEvaluator = {
    evaluateTicketGuards: async () => ({ passed: true, results: [] })
  };

  const agentExecutor = new AgentExecutor(
    promptController,
    stateManager,
    memoryManager,
    guardEvaluator
  );

  // Initialize test state
  await stateManager.initializeRunState(TEST_RUN_ID, true);

  console.log('📋 Test Scenario: Reviewer Requests Revision, Then QA Fails\n');

  try {
    // Execute the ticket through the agent chain
    const result = await agentExecutor.executeTicketChain(TEST_TICKET, {
      run_id: TEST_RUN_ID,
      test_mode: true
    });

    // Verify results
    console.log('\n📊 Results:');
    console.log(`  Success: ${result.success}`);
    console.log(`  Final Phase: ${result.phase}`);
    console.log(`  Total Results: ${result.results.length}`);

    console.log('\n📈 Agent Call Counts:');
    Object.entries(promptController.callCount).forEach(([agent, count]) => {
      console.log(`  ${agent}: ${count} calls`);
    });

    // Validate expected behavior
    console.log('\n✅ Validation:');

    const tests = [
      {
        name: 'Implementer called 3 times (initial + review rewind + QA rewind)',
        passed: promptController.callCount.implementer === 3
      },
      {
        name: 'Reviewer called 3 times (initial reject + approval after first fix + approval after QA fix)',
        passed: promptController.callCount.reviewer === 3
      },
      {
        name: 'QA called 2 times (initial fail + pass)',
        passed: promptController.callCount.qa === 2
      },
      {
        name: 'Ops Release called once',
        passed: promptController.callCount.ops_release === 1
      },
      {
        name: 'Knowledge Steward called once',
        passed: promptController.callCount.knowledge_steward === 1
      },
      {
        name: 'Final result is success',
        passed: result.success === true
      },
      {
        name: 'Final phase is done',
        passed: result.phase === 'done'
      }
    ];

    let allPassed = true;
    tests.forEach(test => {
      console.log(`  ${test.passed ? '✅' : '❌'} ${test.name}`);
      if (!test.passed) allPassed = false;
    });

    if (allPassed) {
      console.log('\n🎉 All tests passed! Agent rewind logic is working correctly.');
      process.exit(0);
    } else {
      console.log('\n❌ Some tests failed. Review the rewind logic implementation.');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Test failed with error:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the test
runTest().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});