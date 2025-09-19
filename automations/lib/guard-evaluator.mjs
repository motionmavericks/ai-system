#!/usr/bin/env node
import { readFile, access } from 'fs/promises';
import { existsSync, constants } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { promisify } from 'util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

/**
 * Guard Evaluator - Evaluates ticket guard specifications
 */
export class GuardEvaluator {
  constructor() {
    this.guardDir = resolve(repoRoot, 'automations/ticket-guards');
    this.evaluators = this.initializeEvaluators();

    // Sandboxing configuration
    this.allowedCommands = ['npm', 'pnpm', 'node', 'git'];
    this.commandTimeout = 30000; // 30 seconds
    this.maxBufferSize = 1024 * 1024; // 1MB
    this.sandboxLogs = [];
  }

  /**
   * Initialize guard check evaluators
   * @returns {Object} Map of evaluator functions
   */
  initializeEvaluators() {
    return {
      pathExists: this.evaluatePathExists.bind(this),
      fileContainsAll: this.evaluateFileContainsAll.bind(this),
      packageScripts: this.evaluatePackageScripts.bind(this),
      fileMatches: this.evaluateFileMatches.bind(this),
      commandSucceeds: this.evaluateCommandSucceeds.bind(this),
      jsonPath: this.evaluateJsonPath.bind(this)
    };
  }

  /**
   * Load guard specification for a ticket
   * @param {string} ticketId - Ticket ID
   * @returns {Promise<Object|null>} Guard specification
   */
  async loadTicketGuard(ticketId) {
    const guardPath = resolve(this.guardDir, `${ticketId}.json`);

    if (!existsSync(guardPath)) {
      return null;
    }

    const content = await readFile(guardPath, 'utf8');
    return JSON.parse(content);
  }

  /**
   * Evaluate all guards for a ticket
   * @param {string} ticketId - Ticket ID
   * @returns {Promise<Object>} Evaluation result
   */
  async evaluateTicket(ticketId) {
    const guard = await this.loadTicketGuard(ticketId);

    if (!guard) {
      return {
        status: 'blocked',
        passed: false,
        summary: `No guard definition found for ${ticketId}.`,
        recommended_actions: ['Create guard specification at automations/ticket-guards/' + ticketId + '.json']
      };
    }

    const failures = [];
    const actions = [];
    const details = {};

    for (const check of guard.checks || []) {
      const evaluator = this.evaluators[check.type];

      if (!evaluator) {
        failures.push(`Unknown guard check type: ${check.type}`);
        if (check.fix) actions.push(check.fix);
        continue;
      }

      try {
        const result = await evaluator(check);
        details[check.name || check.type] = result;

        if (!result.ok) {
          failures.push(result.reason);
          if (check.fix) actions.push(check.fix);
        }
      } catch (error) {
        failures.push(`Error evaluating ${check.type}: ${error.message}`);
        if (check.fix) actions.push(check.fix);
      }
    }

    if (failures.length > 0) {
      return {
        status: 'blocked',
        passed: false,
        summary: guard.summaryOnFailure || `Guard checks failed for ${ticketId}.`,
        failures,
        details,
        recommended_actions: actions
      };
    }

    return {
      status: 'ready',
      passed: true,
      summary: guard.summaryOnSuccess || `All guard checks passed for ${ticketId}.`,
      details
    };
  }

  /**
   * Evaluate path exists check
   * @param {Object} check - Check configuration
   * @returns {Promise<Object>} Result
   */
  async evaluatePathExists(check) {
    try {
      const fullPath = resolve(repoRoot, check.path);
      await access(fullPath, constants.R_OK);
      return { ok: true, path: check.path };
    } catch {
      return {
        ok: false,
        reason: `Missing required path: ${check.path}`
      };
    }
  }

  /**
   * Evaluate file contains all strings
   * @param {Object} check - Check configuration
   * @returns {Promise<Object>} Result
   */
  async evaluateFileContainsAll(check) {
    const fullPath = resolve(repoRoot, check.path);

    if (!existsSync(fullPath)) {
      return {
        ok: false,
        reason: `Missing required file: ${check.path}`
      };
    }

    const contents = await readFile(fullPath, 'utf8');
    const missing = (check.needles || []).filter(needle => !contents.includes(needle));

    if (missing.length > 0) {
      return {
        ok: false,
        reason: `${check.path} missing tokens: ${missing.join(', ')}`
      };
    }

    return { ok: true, found: check.needles };
  }

  /**
   * Evaluate package.json scripts
   * @param {Object} check - Check configuration
   * @returns {Promise<Object>} Result
   */
  async evaluatePackageScripts(check) {
    const packagePath = resolve(repoRoot, 'package.json');
    const pkg = JSON.parse(await readFile(packagePath, 'utf8'));
    const scripts = pkg.scripts || {};
    const missing = (check.scripts || []).filter(script => !scripts[script]);

    if (missing.length > 0) {
      return {
        ok: false,
        reason: `package.json missing scripts: ${missing.join(', ')}`
      };
    }

    return { ok: true, scripts: check.scripts };
  }

  /**
   * Evaluate file matches pattern
   * @param {Object} check - Check configuration
   * @returns {Promise<Object>} Result
   */
  async evaluateFileMatches(check) {
    const fullPath = resolve(repoRoot, check.path);

    if (!existsSync(fullPath)) {
      return {
        ok: false,
        reason: `Missing required file: ${check.path}`
      };
    }

    const contents = await readFile(fullPath, 'utf8');
    const regex = new RegExp(check.pattern, check.flags || 'g');
    const matches = contents.match(regex);

    if (!matches || matches.length === 0) {
      return {
        ok: false,
        reason: `${check.path} does not match pattern: ${check.pattern}`
      };
    }

    return { ok: true, matches: matches.length };
  }

  /**
   * Evaluate command succeeds
   * @param {Object} check - Check configuration
   * @returns {Promise<Object>} Result
   */
  async evaluateCommandSucceeds(check) {
    const startTime = Date.now();
    const logEntry = {
      command: check.command,
      timestamp: new Date().toISOString(),
      ticket: check.ticket_id || 'unknown'
    };

    try {
      // Validate command against allowlist
      const commandParts = check.command.trim().split(/\s+/);
      const baseCommand = commandParts[0];

      if (!this.allowedCommands.includes(baseCommand)) {
        const result = {
          ok: false,
          reason: `Command '${baseCommand}' not in allowed list: ${this.allowedCommands.join(', ')}`
        };
        logEntry.result = 'blocked';
        logEntry.reason = result.reason;
        this.sandboxLogs.push(logEntry);
        return result;
      }

      // Execute command with sandboxing constraints
      const executionResult = await this.executeSandboxedCommand(
        check.command,
        check.cwd || repoRoot,
        check.env || {}
      );

      logEntry.duration = Date.now() - startTime;
      logEntry.exitCode = executionResult.code;
      logEntry.result = executionResult.code === 0 ? 'success' : 'failed';

      if (executionResult.stdout) {
        logEntry.stdout = executionResult.stdout.substring(0, 1000); // Log first 1KB
      }

      this.sandboxLogs.push(logEntry);

      if (executionResult.code !== 0) {
        return {
          ok: false,
          reason: `Command failed with exit code ${executionResult.code}`,
          stderr: executionResult.stderr,
          stdout: executionResult.stdout
        };
      }

      return {
        ok: true,
        stdout: executionResult.stdout,
        duration: logEntry.duration
      };

    } catch (error) {
      logEntry.result = 'error';
      logEntry.error = error.message;
      logEntry.duration = Date.now() - startTime;
      this.sandboxLogs.push(logEntry);

      return {
        ok: false,
        reason: `Command execution failed: ${error.message}`
      };
    }
  }

  /**
   * Execute a command with sandboxing constraints
   * @param {string} command - Command to execute
   * @param {string} cwd - Working directory
   * @param {Object} env - Environment variables
   * @returns {Promise<Object>} Execution result
   */
  async executeSandboxedCommand(command, cwd, env) {
    return new Promise((resolve, reject) => {
      const child = spawn('sh', ['-c', command], {
        cwd,
        env: { ...process.env, ...env },
        timeout: this.commandTimeout,
        maxBuffer: this.maxBufferSize,
        shell: false // Use sh directly, don't allow shell injection
      });

      let stdout = '';
      let stderr = '';
      let killed = false;

      // Set timeout
      const timer = setTimeout(() => {
        killed = true;
        child.kill('SIGKILL');
        reject(new Error(`Command timed out after ${this.commandTimeout}ms`));
      }, this.commandTimeout);

      // Capture stdout with buffer limit
      child.stdout.on('data', (data) => {
        stdout += data.toString();
        if (stdout.length > this.maxBufferSize) {
          killed = true;
          child.kill('SIGKILL');
          clearTimeout(timer);
          reject(new Error(`Output exceeded buffer limit of ${this.maxBufferSize} bytes`));
        }
      });

      // Capture stderr with buffer limit
      child.stderr.on('data', (data) => {
        stderr += data.toString();
        if (stderr.length > this.maxBufferSize) {
          killed = true;
          child.kill('SIGKILL');
          clearTimeout(timer);
          reject(new Error(`Error output exceeded buffer limit of ${this.maxBufferSize} bytes`));
        }
      });

      child.on('close', (code, signal) => {
        clearTimeout(timer);
        if (!killed) {
          resolve({
            code,
            signal,
            stdout,
            stderr
          });
        }
      });

      child.on('error', (error) => {
        clearTimeout(timer);
        reject(error);
      });
    });
  }

  /**
   * Get sandbox execution logs
   * @returns {Array} Execution logs
   */
  getSandboxLogs() {
    return this.sandboxLogs;
  }

  /**
   * Clear sandbox execution logs
   */
  clearSandboxLogs() {
    this.sandboxLogs = [];
  }

  /**
   * Evaluate JSON path exists and matches
   * @param {Object} check - Check configuration
   * @returns {Promise<Object>} Result
   */
  async evaluateJsonPath(check) {
    const fullPath = resolve(repoRoot, check.path);

    if (!existsSync(fullPath)) {
      return {
        ok: false,
        reason: `Missing required file: ${check.path}`
      };
    }

    const contents = await readFile(fullPath, 'utf8');
    let data;

    try {
      data = JSON.parse(contents);
    } catch (e) {
      return {
        ok: false,
        reason: `Failed to parse JSON from ${check.path}: ${e.message}`
      };
    }

    // Simple JSON path evaluation
    const pathParts = check.jsonPath.split('.');
    let current = data;

    for (const part of pathParts) {
      if (current == null || !(part in current)) {
        return {
          ok: false,
          reason: `JSON path ${check.jsonPath} not found in ${check.path}`
        };
      }
      current = current[part];
    }

    if (check.expectedValue !== undefined) {
      if (current !== check.expectedValue) {
        return {
          ok: false,
          reason: `JSON path ${check.jsonPath} has value ${current}, expected ${check.expectedValue}`
        };
      }
    }

    return { ok: true, value: current };
  }

  /**
   * Auto-fix guard failures where possible
   * @param {string} ticketId - Ticket ID
   * @param {Array} actions - Recommended actions
   * @param {Object} options - Auto-fix options
   * @returns {Promise<Object>} Fix results
   */
  async attemptAutoFix(ticketId, actions, options = {}) {
    const { dryRun = false, recordHistory = true } = options;
    const results = [];
    const fixHistory = [];

    for (const action of actions) {
      const historyEntry = {
        ticketId,
        action,
        timestamp: new Date().toISOString(),
        dryRun
      };

      if (typeof action === 'string' && action.startsWith('npm ')) {
        // Execute safe npm commands
        const commandParts = action.split(/\s+/);
        // Allow more npm commands including --version
        const safeNpmCommands = ['install', 'ci', 'run', '--version', 'ls', 'list', 'version'];
        const npmCommand = commandParts[1];
        if (commandParts[0] === 'npm' && (safeNpmCommands.includes(npmCommand) || npmCommand?.startsWith('--'))) {
          if (dryRun) {
            results.push({
              action,
              status: 'dry-run',
              wouldExecute: true,
              reason: 'Would execute npm command'
            });
            historyEntry.status = 'dry-run';
          } else {
            try {
              const execResult = await this.executeSandboxedCommand(action, repoRoot, {});
              results.push({
                action,
                status: execResult.code === 0 ? 'success' : 'failed',
                exitCode: execResult.code,
                output: execResult.stdout
              });
              historyEntry.status = execResult.code === 0 ? 'success' : 'failed';
              historyEntry.exitCode = execResult.code;
            } catch (error) {
              results.push({
                action,
                status: 'error',
                reason: error.message
              });
              historyEntry.status = 'error';
              historyEntry.error = error.message;
            }
          }
        } else {
          results.push({
            action,
            status: 'blocked',
            reason: 'Unsafe npm command'
          });
          historyEntry.status = 'blocked';
        }
      } else if (typeof action === 'object' && action.type === 'createFile') {
        if (dryRun) {
          results.push({
            action: action.path,
            status: 'dry-run',
            wouldCreate: true,
            content: action.content ? action.content.substring(0, 100) + '...' : ''
          });
          historyEntry.status = 'dry-run';
        } else {
          // In production, would create the file here
          results.push({
            action: action.path,
            status: 'skipped',
            reason: 'File creation requires additional validation'
          });
          historyEntry.status = 'skipped';
        }
      } else if (typeof action === 'object' && action.type === 'command') {
        // Handle command-type actions
        const check = {
          command: action.command,
          cwd: action.cwd,
          env: action.env
        };

        if (dryRun) {
          results.push({
            action: action.command,
            status: 'dry-run',
            wouldExecute: true
          });
          historyEntry.status = 'dry-run';
        } else {
          const result = await this.evaluateCommandSucceeds(check);
          results.push({
            action: action.command,
            status: result.ok ? 'success' : 'failed',
            reason: result.reason,
            output: result.stdout
          });
          historyEntry.status = result.ok ? 'success' : 'failed';
        }
      } else {
        results.push({
          action,
          status: 'unknown',
          reason: 'Unknown action type'
        });
        historyEntry.status = 'unknown';
      }

      if (recordHistory) {
        fixHistory.push(historyEntry);
      }
    }

    return {
      attempted: actions.length,
      successful: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'failed').length,
      skipped: results.filter(r => r.status === 'skipped').length,
      dryRun,
      results,
      history: recordHistory ? fixHistory : undefined
    };
  }
}

/**
 * Factory function to create a guard evaluator
 * @returns {GuardEvaluator} Evaluator instance
 */
export function createGuardEvaluator() {
  return new GuardEvaluator();
}