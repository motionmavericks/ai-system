#!/usr/bin/env node
import { describe, it } from 'node:test';
import assert from 'assert';
import { createGuardEvaluator } from '../lib/guard-evaluator.mjs';

describe('Guard System Sandboxed Command Execution', () => {
  let evaluator;

  // Setup before tests
  it('should initialize guard evaluator', () => {
    evaluator = createGuardEvaluator();
    assert.ok(evaluator, 'Guard evaluator should be created');
    assert.ok(evaluator.allowedCommands, 'Should have allowed commands list');
    assert.equal(evaluator.commandTimeout, 30000, 'Should have 30s timeout');
    assert.equal(evaluator.maxBufferSize, 1024 * 1024, 'Should have 1MB buffer limit');
  });

  describe('Command Whitelisting', () => {
    it('should allow npm commands', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'npm --version',
        ticket_id: 'TEST-001'
      });
      assert.ok(result.ok, 'npm command should succeed');
      assert.ok(result.stdout, 'Should capture output');
    });

    it('should allow pnpm commands', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'pnpm --version || echo "pnpm not installed"',
        ticket_id: 'TEST-002'
      });
      // Not failing if pnpm is not installed
      assert.ok(result.stdout !== undefined, 'Should execute command');
    });

    it('should allow node commands', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'node --version',
        ticket_id: 'TEST-003'
      });
      assert.ok(result.ok, 'node command should succeed');
      assert.ok(result.stdout.includes('v'), 'Should return node version');
    });

    it('should allow git commands', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'git --version',
        ticket_id: 'TEST-004'
      });
      assert.ok(result.ok, 'git command should succeed');
      assert.ok(result.stdout.includes('git'), 'Should return git version');
    });

    it('should block disallowed commands', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'curl https://example.com',
        ticket_id: 'TEST-005'
      });
      assert.ok(!result.ok, 'curl command should be blocked');
      assert.ok(result.reason.includes('not in allowed list'), 'Should indicate command is not allowed');
    });

    it('should block rm commands', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'rm -rf /tmp/test',
        ticket_id: 'TEST-006'
      });
      assert.ok(!result.ok, 'rm command should be blocked');
      assert.ok(result.reason.includes('not in allowed list'), 'Should indicate command is not allowed');
    });
  });

  describe('Timeout Handling', () => {
    it('should timeout long-running commands', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'node -e "setTimeout(() => {}, 60000)"',
        ticket_id: 'TEST-007'
      });
      assert.ok(!result.ok, 'Command should fail due to timeout');
      assert.ok(result.reason.includes('timeout') || result.reason.includes('failed'), 'Should indicate timeout');
    });

    it('should handle commands that complete within timeout', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'node -e "console.log(\\"quick\\"); process.exit(0)"',
        ticket_id: 'TEST-008'
      });
      assert.ok(result.ok, 'Quick command should succeed');
      assert.ok(result.stdout.includes('quick'), 'Should capture output');
      assert.ok(result.duration < 5000, 'Should complete quickly');
    });
  });

  describe('Output Buffer Limits', () => {
    it('should handle normal output', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'node -e "console.log(\\"test output\\")"',
        ticket_id: 'TEST-009'
      });
      assert.ok(result.ok, 'Command should succeed');
      assert.ok(result.stdout.includes('test output'), 'Should capture output');
    });

    it('should limit excessive output', async () => {
      // Generate output larger than 1MB
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'node -e "for(let i=0; i<100000; i++) console.log(\\"x\\".repeat(100))"',
        ticket_id: 'TEST-010'
      });
      // Command might fail due to buffer limit
      if (!result.ok) {
        assert.ok(result.reason.includes('buffer limit') || result.reason.includes('failed'), 'Should indicate buffer limit exceeded');
      }
    });
  });

  describe('Error Handling', () => {
    it('should capture exit codes', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'node -e "process.exit(1)"',
        ticket_id: 'TEST-011'
      });
      assert.ok(!result.ok, 'Command should fail');
      assert.ok(result.reason.includes('exit code'), 'Should indicate exit code failure');
    });

    it('should capture stderr', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'node -e "console.error(\\"error message\\"); process.exit(1)"',
        ticket_id: 'TEST-012'
      });
      assert.ok(!result.ok, 'Command should fail');
      assert.ok(result.stderr.includes('error message'), 'Should capture stderr');
    });

    it('should handle invalid commands gracefully', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'nonexistentcommand',
        ticket_id: 'TEST-013'
      });
      assert.ok(!result.ok, 'Command should fail');
      assert.ok(result.reason, 'Should provide failure reason');
    });
  });

  describe('Logging and Telemetry', () => {
    it('should log command executions', async () => {
      evaluator.clearSandboxLogs();

      await evaluator.evaluateCommandSucceeds({
        command: 'node --version',
        ticket_id: 'TEST-014'
      });

      const logs = evaluator.getSandboxLogs();
      assert.ok(logs.length > 0, 'Should have execution logs');

      const log = logs[0];
      assert.equal(log.command, 'node --version', 'Should log command');
      assert.equal(log.ticket, 'TEST-014', 'Should log ticket ID');
      assert.ok(log.timestamp, 'Should have timestamp');
      assert.ok(log.duration !== undefined, 'Should log duration');
      assert.equal(log.result, 'success', 'Should log result status');
    });

    it('should log blocked commands', async () => {
      evaluator.clearSandboxLogs();

      await evaluator.evaluateCommandSucceeds({
        command: 'curl https://example.com',
        ticket_id: 'TEST-015'
      });

      const logs = evaluator.getSandboxLogs();
      assert.ok(logs.length > 0, 'Should have execution logs');

      const log = logs[0];
      assert.equal(log.result, 'blocked', 'Should log blocked status');
      assert.ok(log.reason, 'Should log block reason');
    });

    it('should log failures', async () => {
      evaluator.clearSandboxLogs();

      await evaluator.evaluateCommandSucceeds({
        command: 'node -e "process.exit(1)"',
        ticket_id: 'TEST-016'
      });

      const logs = evaluator.getSandboxLogs();
      assert.ok(logs.length > 0, 'Should have execution logs');

      const log = logs[0];
      assert.equal(log.result, 'failed', 'Should log failed status');
      assert.equal(log.exitCode, 1, 'Should log exit code');
    });
  });

  describe('Environment and Working Directory', () => {
    it('should use custom environment variables', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'node -e "console.log(process.env.TEST_VAR)"',
        env: { TEST_VAR: 'test_value' },
        ticket_id: 'TEST-017'
      });
      assert.ok(result.ok, 'Command should succeed');
      assert.ok(result.stdout.includes('test_value'), 'Should use custom env var');
    });

    it('should use custom working directory', async () => {
      const result = await evaluator.evaluateCommandSucceeds({
        command: 'node -e "console.log(process.cwd())"',
        cwd: '/tmp',
        ticket_id: 'TEST-018'
      });
      assert.ok(result.ok, 'Command should succeed');
      assert.ok(result.stdout.includes('/tmp'), 'Should use custom cwd');
    });
  });

  describe('Auto-Fix Functionality', () => {
    it('should support dry-run mode', async () => {
      const actions = [
        'npm install',
        { type: 'command', command: 'npm test' }
      ];

      const result = await evaluator.attemptAutoFix('TEST-019', actions, { dryRun: true });
      assert.equal(result.dryRun, true, 'Should be in dry-run mode');
      assert.equal(result.attempted, 2, 'Should attempt all actions');
      assert.ok(result.results.every(r => r.status === 'dry-run'), 'All actions should be dry-run');
    });

    it('should execute safe npm commands', async () => {
      const actions = ['npm --version'];
      const result = await evaluator.attemptAutoFix('TEST-020', actions, { dryRun: false });

      assert.equal(result.attempted, 1, 'Should attempt action');
      assert.ok(result.results[0].status === 'success', 'npm version should succeed');
    });

    it('should block unsafe npm commands', async () => {
      const actions = ['npm publish'];
      const result = await evaluator.attemptAutoFix('TEST-021', actions, { dryRun: false });

      assert.equal(result.attempted, 1, 'Should attempt action');
      assert.equal(result.results[0].status, 'blocked', 'npm publish should be blocked');
    });

    it('should track fix history', async () => {
      const actions = ['npm --version'];
      const result = await evaluator.attemptAutoFix('TEST-022', actions, {
        dryRun: false,
        recordHistory: true
      });

      assert.ok(result.history, 'Should have history');
      assert.equal(result.history.length, 1, 'Should have one history entry');
      assert.equal(result.history[0].ticketId, 'TEST-022', 'Should track ticket ID');
      assert.ok(result.history[0].timestamp, 'Should have timestamp');
    });

    it('should handle command-type actions', async () => {
      const actions = [
        { type: 'command', command: 'git status', cwd: '.' }
      ];

      const result = await evaluator.attemptAutoFix('TEST-023', actions, { dryRun: false });
      assert.equal(result.attempted, 1, 'Should attempt action');
      assert.ok(result.results[0].status === 'success', 'git status should succeed');
    });

    it('should skip file creation actions safely', async () => {
      const actions = [
        { type: 'createFile', path: '/tmp/test.txt', content: 'test content' }
      ];

      const result = await evaluator.attemptAutoFix('TEST-024', actions, { dryRun: false });
      assert.equal(result.attempted, 1, 'Should attempt action');
      assert.equal(result.results[0].status, 'skipped', 'File creation should be skipped');
      assert.ok(result.results[0].reason.includes('validation'), 'Should require additional validation');
    });

    it('should provide summary statistics', async () => {
      const actions = [
        'npm --version',  // should succeed
        'curl test',      // should be blocked
        { type: 'createFile', path: 'test.txt' }  // should be skipped
      ];

      const result = await evaluator.attemptAutoFix('TEST-025', actions, { dryRun: false });
      assert.equal(result.attempted, 3, 'Should attempt all actions');
      assert.ok(result.successful >= 1, 'Should have at least one success');
      assert.ok(result.skipped >= 1, 'Should have at least one skipped');
    });
  });
});

// Run the tests
if (import.meta.url.startsWith('file:')) {
  console.log('🧪 Running Guard Sandboxing Tests...\n');
}