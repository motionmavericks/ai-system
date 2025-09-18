#!/usr/bin/env node
import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

/**
 * State Manager - Handles run-state.json and related state management
 */
export class StateManager {
  constructor() {
    this.runStatePath = resolve(repoRoot, 'automations/run-state.json');
    this.runQueuePath = resolve(repoRoot, 'automations/run-queue.json');
  }

  /**
   * Read JSON file
   * @param {string} path - File path
   * @returns {Promise<Object>} Parsed JSON
   */
  async readJson(path) {
    if (!existsSync(path)) {
      return null;
    }
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw);
  }

  /**
   * Write JSON file
   * @param {string} path - File path
   * @param {Object} value - Data to write
   */
  async writeJson(path, value) {
    await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  }

  /**
   * Load current run state
   * @returns {Promise<Object>} Run state
   */
  async loadRunState() {
    return this.readJson(this.runStatePath);
  }

  /**
   * Save run state
   * @param {Object} state - State to save
   */
  async saveRunState(state) {
    state.updatedAt = new Date().toISOString();
    await this.writeJson(this.runStatePath, state);
  }

  /**
   * Apply a partial run-state delta produced by a prompt response
   * @param {Object} delta - Partial state delta
   * @returns {Promise<Object>} Updated state
   */
  async applyRunStateDelta(delta = {}) {
    if (!delta || Object.keys(delta).length === 0) {
      return this.loadRunState();
    }

    const state = (await this.loadRunState()) || {
      run_id: this.generateRunId(),
      createdAt: new Date().toISOString(),
      tickets: {}
    };

    // Merge ticket updates
    if (delta.tickets) {
      state.tickets = state.tickets || {};

      for (const [ticketId, ticketDelta] of Object.entries(delta.tickets)) {
        const existing = state.tickets[ticketId] || {
          status: 'pending',
          phase: 'planner',
          history: [],
          artefacts: {}
        };

        const merged = { ...existing, ...ticketDelta };

        // Merge history entries
        if (ticketDelta.history && Array.isArray(ticketDelta.history)) {
          merged.history = [...(existing.history || []), ...ticketDelta.history];
        }

        // Merge artefacts
        if (ticketDelta.artefacts) {
          merged.artefacts = {
            ...(existing.artefacts || {}),
            ...ticketDelta.artefacts
          };
        }

        state.tickets[ticketId] = merged;
      }
    }

    const remainingKeys = Object.keys(delta).filter(key => key !== 'tickets');
    for (const key of remainingKeys) {
      state[key] = delta[key];
    }

    await this.saveRunState(state);
    return state;
  }

  /**
   * Load run queue
   * @returns {Promise<Array>} Queue items
   */
  async loadQueue() {
    const queue = await this.readJson(this.runQueuePath);
    return queue || [];
  }

  /**
   * Generate run ID
   * @param {Object} existingState - Existing state if any
   * @returns {string} Run ID
   */
  generateRunId(existingState = null) {
    if (existingState && existingState.run_id) {
      return existingState.run_id;
    }
    const now = new Date();
    const pad = value => value.toString().padStart(2, '0');
    return `RUN-${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}-${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;
  }

  /**
   * Initialize run state from queue
   * @param {string} runId - Run ID
   * @param {boolean} force - Force reinitialization
   * @returns {Promise<Object>} Initialized state
   */
  async initializeRunState(runId, force = false) {
    const existingState = await this.loadRunState();

    if (existingState && existingState.run_id === runId && !force) {
      return existingState;
    }

    // Execute the init script
    await this.execCommand('npm', ['run', 'automation:run-state:init', '--', '--run-id', runId, '--force']);
    return this.loadRunState();
  }

  /**
   * Update ticket status
   * @param {string} ticketId - Ticket ID
   * @param {string} phase - Current phase
   * @param {string} status - Status
   * @param {Object} metadata - Additional metadata
   */
  async updateTicketStatus(ticketId, phase, status, metadata = {}) {
    const state = await this.loadRunState();

    if (!state.tickets) {
      state.tickets = {};
    }

    if (!state.tickets[ticketId]) {
      state.tickets[ticketId] = {
        status: 'pending',
        phase: 'planner',
        history: [],
        artefacts: {}
      };
    }

    const ticket = state.tickets[ticketId];
    const historyEntry = {
      phase,
      status,
      timestamp: new Date().toISOString(),
      ...metadata
    };

    ticket.history.push(historyEntry);
    ticket.phase = phase;
    ticket.status = status;

    if (metadata.artefacts) {
      ticket.artefacts = { ...ticket.artefacts, ...metadata.artefacts };
    }

    await this.saveRunState(state);
    return state;
  }

  /**
   * Get next ready ticket
   * @param {Object} state - Current state
   * @param {Array} queue - Queue items
   * @returns {Object|null} Next ticket or null
   */
  getNextReadyTicket(state, queue) {
    const queueMap = new Map(queue.map(ticket => [ticket.ticket_id, ticket]));

    for (const ticket of queue) {
      const ticketState = state.tickets && state.tickets[ticket.ticket_id];

      // Skip if no state or already done/blocked
      if (!ticketState || ticketState.status === 'done' || ticketState.status === 'blocked') {
        continue;
      }

      // Check dependencies
      const deps = ticket.dependencies || [];
      const depsReady = deps.every(dep => {
        const depState = state.tickets && state.tickets[dep];
        return depState && depState.status === 'done';
      });

      if (depsReady) {
        return ticket;
      }
    }

    return null;
  }

  /**
   * Mark tickets as blocked
   * @param {Array} ticketIds - Ticket IDs to block
   * @param {string} reason - Blocking reason
   */
  async markTicketsBlocked(ticketIds, reason) {
    const state = await this.loadRunState();

    for (const ticketId of ticketIds) {
      await this.updateTicketStatus(ticketId, 'blocked', 'blocked', {
        summary: reason,
        blocked_at: new Date().toISOString()
      });
    }

    return state;
  }

  /**
   * Execute a command
   * @param {string} command - Command to execute
   * @param {Array} args - Command arguments
   * @returns {Promise<void>}
   */
  async execCommand(command, args = []) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, { stdio: 'inherit', cwd: repoRoot });
      child.on('close', code => {
        if (code !== 0) {
          reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
        } else {
          resolve();
        }
      });
    });
  }
}

/**
 * Memory Manager - Handles memory storage and retrieval
 */
export class MemoryManager {
  constructor(runId) {
    this.runId = runId;
    this.memoryRoot = resolve(repoRoot, 'automations/memory');
    this.sessionDir = join(this.memoryRoot, 'sessions', runId);
    this.telemetryDir = join(this.memoryRoot, 'telemetry', runId);
    this.replayDir = join(this.memoryRoot, 'replay', runId);
  }

  /**
   * Bootstrap memory for a run
   * @returns {Promise<string>} Heartbeat file path
   */
  async bootstrap() {
    const heartbeatPath = join(this.sessionDir, 'heartbeat.json');

    if (!existsSync(heartbeatPath)) {
      await this.execCommand('npm', ['run', 'automation:memory:bootstrap', '--', '--run-id', this.runId]);
    }

    return heartbeatPath;
  }

  /**
   * Update heartbeat
   * @param {string} phase - Current phase
   * @param {Object} metadata - Additional metadata
   */
  async updateHeartbeat(phase, metadata = {}) {
    const heartbeatPath = join(this.sessionDir, 'heartbeat.json');

    if (!existsSync(heartbeatPath)) {
      await mkdir(this.sessionDir, { recursive: true });
    }

    const heartbeat = existsSync(heartbeatPath)
      ? JSON.parse(await readFile(heartbeatPath, 'utf8'))
      : {};

    Object.assign(heartbeat, {
      status: 'running',
      phase,
      updatedAt: new Date().toISOString(),
      run_id: this.runId,
      ...metadata
    });

    await writeFile(heartbeatPath, `${JSON.stringify(heartbeat, null, 2)}\n`, 'utf8');
    return heartbeat;
  }

  /**
   * Write telemetry data
   * @param {string} ticketId - Ticket ID
   * @param {string} phase - Phase
   * @param {Object} data - Telemetry data
   */
  async writeTelemetry(ticketId, phase, data) {
    await mkdir(this.telemetryDir, { recursive: true });
    const filename = `${ticketId}-${phase}.json`;
    const path = join(this.telemetryDir, filename);

    const telemetry = {
      ticket_id: ticketId,
      phase,
      timestamp: new Date().toISOString(),
      ...data
    };

    await writeFile(path, `${JSON.stringify(telemetry, null, 2)}\n`, 'utf8');
    return path;
  }

  /**
   * Write replay trace
   * @param {string} ticketId - Ticket ID
   * @param {string} agent - Agent name
   * @param {Array} events - Replay events
   */
  async writeReplayTrace(ticketId, agent, events) {
    await mkdir(this.replayDir, { recursive: true });
    const filename = `${ticketId}-${agent}.json`;
    const path = join(this.replayDir, filename);

    const trace = {
      ticket_id: ticketId,
      agent,
      run_id: this.runId,
      events: events || [],
      timestamp: new Date().toISOString()
    };

    await writeFile(path, `${JSON.stringify(trace, null, 2)}\n`, 'utf8');
    return path;
  }

  /**
   * Update session data
   * @param {Object} sessionData - Session data to merge
   */
  async updateSession(sessionData) {
    const sessionPath = join(this.sessionDir, 'session.json');

    if (!existsSync(this.sessionDir)) {
      await mkdir(this.sessionDir, { recursive: true });
    }

    const existing = existsSync(sessionPath)
      ? JSON.parse(await readFile(sessionPath, 'utf8'))
      : {};

    const updated = {
      ...existing,
      ...sessionData,
      run_id: this.runId,
      updatedAt: new Date().toISOString()
    };

    await writeFile(sessionPath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
    return updated;
  }

  /**
   * Read memory index
   * @returns {Promise<Object>} Memory index
   */
  async readMemoryIndex() {
    const indexPath = join(this.memoryRoot, 'index.json');
    if (!existsSync(indexPath)) {
      return { facts: {}, embeddings: [], graph: {} };
    }
    return JSON.parse(await readFile(indexPath, 'utf8'));
  }

  /**
   * Query memory
   * @param {Object} filters - Query filters
   * @returns {Promise<Object>} Memory slice
   */
  async queryMemory(filters = {}) {
    const index = await this.readMemoryIndex();

    // Simple filtering implementation
    const results = {
      facts: {},
      related: []
    };

    if (filters.ticket_id) {
      // Find facts related to ticket
      for (const [key, value] of Object.entries(index.facts)) {
        if (key.includes(filters.ticket_id) ||
            (value && typeof value === 'object' && value.ticket_id === filters.ticket_id)) {
          results.facts[key] = value;
        }
      }
    }

    if (filters.phase) {
      // Find telemetry for phase
      const telemetryFiles = existsSync(this.telemetryDir)
        ? await readdir(this.telemetryDir)
        : [];

      for (const file of telemetryFiles) {
        if (file.includes(filters.phase)) {
          const content = await readFile(join(this.telemetryDir, file), 'utf8');
          results.related.push(JSON.parse(content));
        }
      }
    }

    return results;
  }

  /**
   * Execute a command
   * @param {string} command - Command to execute
   * @param {Array} args - Command arguments
   * @returns {Promise<void>}
   */
  async execCommand(command, args = []) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, args, { stdio: 'inherit', cwd: repoRoot });
      child.on('close', code => {
        if (code !== 0) {
          reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
        } else {
          resolve();
        }
      });
    });
  }
}

/**
 * Factory functions
 */
export function createStateManager() {
  return new StateManager();
}

export function createMemoryManager(runId) {
  return new MemoryManager(runId);
}
