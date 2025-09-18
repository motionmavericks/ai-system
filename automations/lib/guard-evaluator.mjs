#!/usr/bin/env node
import { readFile, access } from 'fs/promises';
import { existsSync, constants } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

/**
 * Guard Evaluator - Evaluates ticket guard specifications
 */
export class GuardEvaluator {
  constructor() {
    this.guardDir = resolve(repoRoot, 'automations/ticket-guards');
    this.evaluators = this.initializeEvaluators();
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
    // For safety, this is stubbed - real implementation would need sandboxing
    return {
      ok: false,
      reason: 'Command execution not implemented for safety'
    };
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
   * @returns {Promise<Object>} Fix results
   */
  async attemptAutoFix(ticketId, actions) {
    const results = [];

    for (const action of actions) {
      if (typeof action === 'string' && action.startsWith('npm run')) {
        // Could execute safe npm scripts
        results.push({
          action,
          status: 'skipped',
          reason: 'Auto-execution disabled for safety'
        });
      } else if (typeof action === 'object' && action.type === 'createFile') {
        // Could create missing files
        results.push({
          action: action.path,
          status: 'skipped',
          reason: 'File creation disabled for safety'
        });
      } else {
        results.push({
          action,
          status: 'unknown',
          reason: 'Unknown action type'
        });
      }
    }

    return {
      attempted: actions.length,
      results
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