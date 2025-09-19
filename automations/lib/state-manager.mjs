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
   * @returns {Promise<Object|null>} Run state or null if missing
   */
  async loadRunState() {
    if (!existsSync(this.runStatePath)) {
      return null;
    }
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

    // Ensure tickets object exists before operations
    if (!state.tickets) {
      state.tickets = {};
    }

    // Merge ticket updates safely
    if (delta.tickets) {
      for (const [ticketId, ticketDelta] of Object.entries(delta.tickets)) {
        const existing = state.tickets[ticketId] || {
          status: 'pending',
          phase: 'planner',
          history: [],
          artefacts: {}
        };

        const merged = { ...existing, ...ticketDelta };

        // Safe history merge
        if (ticketDelta.history && Array.isArray(ticketDelta.history)) {
          merged.history = [...(existing.history || []), ...ticketDelta.history];
        }

        // Safe artefacts merge
        if (ticketDelta.artefacts) {
          merged.artefacts = {
            ...(existing.artefacts || {}),
            ...ticketDelta.artefacts
          };
        }

        state.tickets[ticketId] = merged;
      }
    }

    // Apply remaining delta properties
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

    // Only reinitialize if truly needed
    if (existingState && existingState.run_id === runId && !force) {
      console.log(`ℹ️  Using existing state for run ${runId}`);
      return existingState;
    }

    // Only use --force flag when explicitly needed
    const args = ['run', 'automation:run-state:init', '--', '--run-id', runId];
    if (force) {
      args.push('--force');
    }

    await this.execCommand('npm', args);
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
    let state = await this.loadRunState();

    if (!state) {
      state = {
        run_id: this.generateRunId(),
        createdAt: new Date().toISOString(),
        tickets: {}
      };
    }

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

    // Enhanced semantic query implementation
    const results = {
      facts: {},
      related: [],
      embeddings: [],
      relevanceScores: {}
    };

    // If semantic query is provided, use semantic search
    if (filters.query) {
      const semanticResults = await this.semanticSearch(filters.query, index, filters.topK || 5);
      results.facts = semanticResults.facts;
      results.related = semanticResults.related;
      results.embeddings = semanticResults.embeddings;
      results.relevanceScores = semanticResults.scores;
    } else {
      // Standard filtering
      if (filters.ticket_id) {
        // Find facts related to ticket
        for (const [key, value] of Object.entries(index.facts || {})) {
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
    }

    // Deep object search if specified
    if (filters.deepSearch && filters.searchPath) {
      const deepResults = this.deepSearch(index, filters.searchPath, filters.searchValue);
      results.deepSearchResults = deepResults;
    }

    // Aggregate telemetry if requested
    if (filters.aggregateTelemetry) {
      results.telemetryAggregation = await this.aggregateTelemetry(filters);
    }

    return results;
  }

  /**
   * Perform semantic search using embeddings or keyword scoring
   * @param {string} query - Search query
   * @param {Object} index - Memory index
   * @param {number} topK - Number of results to return
   * @returns {Promise<Object>} Search results
   */
  async semanticSearch(query, index, topK = 5) {
    // Since we don't have external embeddings API, use keyword scoring
    const results = {
      facts: {},
      related: [],
      embeddings: [],
      scores: {}
    };

    // Generate embedding stub for query
    const queryEmbedding = this.generateStubEmbedding(query);

    // Score all facts
    const scoredFacts = [];
    for (const [key, value] of Object.entries(index.facts || {})) {
      const factText = JSON.stringify(value);
      const score = this.calculateRelevance(query, factText, queryEmbedding);
      scoredFacts.push({ key, value, score });
    }

    // Sort by score and take top K
    scoredFacts.sort((a, b) => b.score - a.score);
    const topFacts = scoredFacts.slice(0, topK);

    for (const fact of topFacts) {
      results.facts[fact.key] = fact.value;
      results.scores[fact.key] = fact.score;
    }

    // Search in telemetry files
    if (existsSync(this.telemetryDir)) {
      const telemetryFiles = await readdir(this.telemetryDir);
      const scoredTelemetry = [];

      for (const file of telemetryFiles) {
        const content = await readFile(join(this.telemetryDir, file), 'utf8');
        const data = JSON.parse(content);
        const score = this.calculateRelevance(query, content, queryEmbedding);
        scoredTelemetry.push({ data, score });
      }

      scoredTelemetry.sort((a, b) => b.score - a.score);
      results.related = scoredTelemetry.slice(0, topK).map(item => item.data);
    }

    // Store query embedding for caching
    results.embeddings.push({
      query,
      embedding: queryEmbedding,
      timestamp: new Date().toISOString()
    });

    return results;
  }

  /**
   * Generate stub embedding for text (deterministic)
   * @param {string} text - Text to embed
   * @returns {Array<number>} Stub embedding vector
   */
  generateStubEmbedding(text) {
    // Simple deterministic embedding based on character codes
    // In production, this would use actual embedding model
    const vector = new Array(128).fill(0);
    const words = text.toLowerCase().split(/\s+/);

    for (let i = 0; i < words.length && i < vector.length; i++) {
      const word = words[i];
      for (let j = 0; j < word.length; j++) {
        vector[i] += word.charCodeAt(j) / 1000;
      }
      vector[i] = Math.tanh(vector[i]); // Normalize to [-1, 1]
    }

    return vector;
  }

  /**
   * Calculate cosine similarity between vectors
   * @param {Array<number>} vec1 - First vector
   * @param {Array<number>} vec2 - Second vector
   * @returns {number} Cosine similarity
   */
  cosineSimilarity(vec1, vec2) {
    if (vec1.length !== vec2.length) {
      throw new Error('Vectors must have same length');
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      norm1 += vec1[i] * vec1[i];
      norm2 += vec2[i] * vec2[i];
    }

    if (norm1 === 0 || norm2 === 0) {
      return 0;
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  /**
   * Calculate relevance score between query and text
   * @param {string} query - Search query
   * @param {string} text - Text to score
   * @param {Array<number>} queryEmbedding - Query embedding
   * @returns {number} Relevance score
   */
  calculateRelevance(query, text, queryEmbedding) {
    // Combine keyword matching with embedding similarity
    const queryWords = query.toLowerCase().split(/\s+/);
    const textLower = text.toLowerCase();

    // Keyword score
    let keywordScore = 0;
    for (const word of queryWords) {
      if (textLower.includes(word)) {
        keywordScore += 1;
      }
    }
    keywordScore = keywordScore / queryWords.length;

    // Embedding similarity
    const textEmbedding = this.generateStubEmbedding(text);
    const embeddingScore = this.cosineSimilarity(queryEmbedding, textEmbedding);

    // Weighted combination
    return (keywordScore * 0.6) + (embeddingScore * 0.4);
  }

  /**
   * Deep search in nested objects
   * @param {Object} obj - Object to search
   * @param {string} path - Path to search (e.g., 'tickets.*.status')
   * @param {*} value - Value to match
   * @returns {Array} Matching results
   */
  deepSearch(obj, path, value) {
    const results = [];
    const pathParts = path.split('.');

    function search(current, parts, currentPath = []) {
      if (parts.length === 0) {
        if (value === undefined || current === value) {
          results.push({
            path: currentPath.join('.'),
            value: current
          });
        }
        return;
      }

      const [part, ...remaining] = parts;

      if (part === '*') {
        // Wildcard - search all properties
        if (typeof current === 'object' && current !== null) {
          for (const [key, val] of Object.entries(current)) {
            search(val, remaining, [...currentPath, key]);
          }
        }
      } else if (current && typeof current === 'object' && part in current) {
        search(current[part], remaining, [...currentPath, part]);
      }
    }

    search(obj, pathParts);
    return results;
  }

  /**
   * Aggregate telemetry data
   * @param {Object} filters - Aggregation filters
   * @returns {Promise<Object>} Aggregated telemetry
   */
  async aggregateTelemetry(filters) {
    const aggregation = {
      byPhase: {},
      byTicket: {},
      timeline: [],
      summary: {
        totalEvents: 0,
        uniqueTickets: new Set(),
        phases: new Set()
      }
    };

    if (!existsSync(this.telemetryDir)) {
      return aggregation;
    }

    const files = await readdir(this.telemetryDir);

    for (const file of files) {
      const content = await readFile(join(this.telemetryDir, file), 'utf8');
      const data = JSON.parse(content);

      // Update aggregations
      const phase = data.phase || 'unknown';
      const ticketId = data.ticket_id || 'unknown';

      if (!aggregation.byPhase[phase]) {
        aggregation.byPhase[phase] = [];
      }
      aggregation.byPhase[phase].push(data);

      if (!aggregation.byTicket[ticketId]) {
        aggregation.byTicket[ticketId] = [];
      }
      aggregation.byTicket[ticketId].push(data);

      aggregation.timeline.push({
        timestamp: data.timestamp,
        phase,
        ticketId,
        summary: data.summary
      });

      aggregation.summary.totalEvents++;
      aggregation.summary.uniqueTickets.add(ticketId);
      aggregation.summary.phases.add(phase);
    }

    // Convert sets to arrays
    aggregation.summary.uniqueTickets = Array.from(aggregation.summary.uniqueTickets);
    aggregation.summary.phases = Array.from(aggregation.summary.phases);

    // Sort timeline
    aggregation.timeline.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return aggregation;
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
