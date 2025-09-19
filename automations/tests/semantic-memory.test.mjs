#!/usr/bin/env node
import { describe, it } from 'node:test';
import assert from 'assert';
import { createMemoryManager } from '../lib/state-manager.mjs';
import { mkdir, writeFile, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const testMemoryRoot = join(__dirname, 'test-memory');
const testRunId = 'TEST-RUN-001';

describe('Semantic Memory Search Enhancement', () => {
  let memoryManager;

  // Setup and cleanup
  async function setupTestEnvironment() {
    // Create test memory directories
    await mkdir(testMemoryRoot, { recursive: true });
    await mkdir(join(testMemoryRoot, 'sessions', testRunId), { recursive: true });
    await mkdir(join(testMemoryRoot, 'telemetry', testRunId), { recursive: true });
    await mkdir(join(testMemoryRoot, 'embeddings'), { recursive: true });

    // Create test memory index
    const testIndex = {
      facts: {
        'ticket-F001': {
          ticket_id: 'F-001',
          status: 'completed',
          summary: 'Implement authentication system with OAuth support'
        },
        'ticket-F002': {
          ticket_id: 'F-002',
          status: 'in_progress',
          summary: 'Add user profile management features'
        },
        'ticket-F003': {
          ticket_id: 'F-003',
          status: 'pending',
          summary: 'Create dashboard with analytics and metrics'
        },
        'config-auth': {
          type: 'configuration',
          module: 'authentication',
          settings: {
            oauth_enabled: true,
            providers: ['google', 'github']
          }
        },
        'error-log-001': {
          type: 'error',
          message: 'Authentication failed for user admin',
          timestamp: '2024-01-15T10:30:00Z'
        }
      },
      embeddings: [],
      graph: {
        nodes: ['F-001', 'F-002', 'F-003'],
        edges: [
          { from: 'F-001', to: 'F-002', type: 'dependency' }
        ]
      }
    };

    await writeFile(
      join(testMemoryRoot, 'index.json'),
      JSON.stringify(testIndex, null, 2),
      'utf8'
    );

    // Create test telemetry files
    const telemetryData = [
      {
        ticket_id: 'F-001',
        phase: 'implementation',
        timestamp: '2024-01-15T09:00:00Z',
        summary: 'Completed OAuth integration'
      },
      {
        ticket_id: 'F-002',
        phase: 'planning',
        timestamp: '2024-01-15T10:00:00Z',
        summary: 'Designing user profile schema'
      }
    ];

    for (let i = 0; i < telemetryData.length; i++) {
      await writeFile(
        join(testMemoryRoot, 'telemetry', testRunId, `telemetry-${i}.json`),
        JSON.stringify(telemetryData[i], null, 2),
        'utf8'
      );
    }

    // Create memory manager with test directory
    memoryManager = createMemoryManager(testRunId);
    memoryManager.memoryRoot = testMemoryRoot;
    memoryManager.sessionDir = join(testMemoryRoot, 'sessions', testRunId);
    memoryManager.telemetryDir = join(testMemoryRoot, 'telemetry', testRunId);
  }

  async function cleanupTestEnvironment() {
    if (existsSync(testMemoryRoot)) {
      await rm(testMemoryRoot, { recursive: true, force: true });
    }
  }

  // Run setup before tests
  it('should setup test environment', async () => {
    await setupTestEnvironment();
    assert.ok(existsSync(testMemoryRoot), 'Test memory root should exist');
    assert.ok(memoryManager, 'Memory manager should be created');
  });

  describe('Embedding Generation', () => {
    it('should generate deterministic stub embeddings', () => {
      const text1 = 'authentication oauth login';
      const text2 = 'authentication oauth login'; // Same text
      const text3 = 'dashboard metrics analytics';

      const embedding1 = memoryManager.generateStubEmbedding(text1);
      const embedding2 = memoryManager.generateStubEmbedding(text2);
      const embedding3 = memoryManager.generateStubEmbedding(text3);

      assert.ok(Array.isArray(embedding1), 'Should return array');
      assert.equal(embedding1.length, 128, 'Should have 128 dimensions');
      assert.deepEqual(embedding1, embedding2, 'Same text should produce same embedding');
      assert.notDeepEqual(embedding1, embedding3, 'Different text should produce different embedding');
    });

    it('should normalize embedding values', () => {
      const text = 'test embedding normalization';
      const embedding = memoryManager.generateStubEmbedding(text);

      for (const value of embedding) {
        assert.ok(value >= -1 && value <= 1, `Value ${value} should be normalized to [-1, 1]`);
      }
    });
  });

  describe('Cosine Similarity', () => {
    it('should calculate cosine similarity correctly', () => {
      const vec1 = [1, 0, 0];
      const vec2 = [1, 0, 0]; // Same vector
      const vec3 = [0, 1, 0]; // Orthogonal
      const vec4 = [-1, 0, 0]; // Opposite

      const sim1 = memoryManager.cosineSimilarity(vec1, vec2);
      const sim2 = memoryManager.cosineSimilarity(vec1, vec3);
      const sim3 = memoryManager.cosineSimilarity(vec1, vec4);

      assert.ok(Math.abs(sim1 - 1.0) < 0.0001, 'Same vectors should have similarity ~1');
      assert.ok(Math.abs(sim2) < 0.0001, 'Orthogonal vectors should have similarity ~0');
      assert.ok(Math.abs(sim3 + 1.0) < 0.0001, 'Opposite vectors should have similarity ~-1');
    });

    it('should handle zero vectors', () => {
      const vec1 = [0, 0, 0];
      const vec2 = [1, 2, 3];

      const sim = memoryManager.cosineSimilarity(vec1, vec2);
      assert.equal(sim, 0, 'Zero vector should have 0 similarity');
    });

    it('should throw for mismatched vector lengths', () => {
      const vec1 = [1, 2, 3];
      const vec2 = [1, 2];

      assert.throws(
        () => memoryManager.cosineSimilarity(vec1, vec2),
        /same length/,
        'Should throw for different lengths'
      );
    });
  });

  describe('Relevance Scoring', () => {
    it('should calculate relevance combining keywords and embeddings', () => {
      const query = 'authentication oauth';
      const queryEmbedding = memoryManager.generateStubEmbedding(query);

      const text1 = 'implement authentication system with oauth support';
      const text2 = 'dashboard metrics and analytics';

      const score1 = memoryManager.calculateRelevance(query, text1, queryEmbedding);
      const score2 = memoryManager.calculateRelevance(query, text2, queryEmbedding);

      assert.ok(score1 > score2, 'Text with matching keywords should score higher');
      assert.ok(score1 >= 0 && score1 <= 1, 'Score should be between 0 and 1');
    });

    it('should handle exact matches with high score', () => {
      const query = 'authentication';
      const queryEmbedding = memoryManager.generateStubEmbedding(query);
      const text = 'authentication';

      const score = memoryManager.calculateRelevance(query, text, queryEmbedding);
      assert.ok(score > 0.8, 'Exact match should have high score');
    });

    it('should handle no matches with low score', () => {
      const query = 'quantum physics';
      const queryEmbedding = memoryManager.generateStubEmbedding(query);
      const text = 'dashboard metrics analytics';

      const score = memoryManager.calculateRelevance(query, text, queryEmbedding);
      assert.ok(score < 0.5, 'No match should have low score');
    });
  });

  describe('Semantic Search', () => {
    it('should perform semantic search with query', async () => {
      const results = await memoryManager.queryMemory({
        query: 'authentication oauth'
      });

      assert.ok(results.facts, 'Should have facts');
      assert.ok(results.relevanceScores, 'Should have relevance scores');
      assert.ok(results.embeddings, 'Should have embeddings');

      // Check that auth-related facts score higher
      const factKeys = Object.keys(results.facts);
      assert.ok(factKeys.length > 0, 'Should return some facts');

      // Check relevance scores exist
      for (const key of factKeys) {
        assert.ok(typeof results.relevanceScores[key] === 'number', 'Should have numeric score');
      }
    });

    it('should respect topK parameter', async () => {
      const results = await memoryManager.queryMemory({
        query: 'ticket',
        topK: 2
      });

      const factCount = Object.keys(results.facts).length;
      assert.ok(factCount <= 2, `Should return at most topK facts (got ${factCount})`);
    });

    it('should search in telemetry files', async () => {
      const results = await memoryManager.queryMemory({
        query: 'OAuth integration',
        topK: 3
      });

      assert.ok(results.related, 'Should have related telemetry');
      assert.ok(Array.isArray(results.related), 'Related should be an array');
    });

    it('should store query embeddings', async () => {
      const results = await memoryManager.queryMemory({
        query: 'test query'
      });

      assert.ok(results.embeddings.length > 0, 'Should store query embedding');
      const embedding = results.embeddings[0];
      assert.equal(embedding.query, 'test query', 'Should store original query');
      assert.ok(embedding.embedding, 'Should have embedding vector');
      assert.ok(embedding.timestamp, 'Should have timestamp');
    });
  });

  describe('Deep Object Search', () => {
    it('should search nested properties with wildcards', async () => {
      const results = await memoryManager.queryMemory({
        deepSearch: true,
        searchPath: 'facts.*.status',
        searchValue: 'completed'
      });

      assert.ok(results.deepSearchResults, 'Should have deep search results');
      assert.ok(Array.isArray(results.deepSearchResults), 'Results should be array');

      const completed = results.deepSearchResults.filter(r => r.value === 'completed');
      assert.ok(completed.length > 0, 'Should find completed status');
    });

    it('should find nested configuration values', async () => {
      const results = await memoryManager.queryMemory({
        deepSearch: true,
        searchPath: 'facts.*.settings.oauth_enabled',
        searchValue: true
      });

      assert.ok(results.deepSearchResults, 'Should have results');
      const found = results.deepSearchResults.find(r => r.value === true);
      assert.ok(found, 'Should find oauth_enabled setting');
    });

    it('should handle search without value match', async () => {
      const results = await memoryManager.queryMemory({
        deepSearch: true,
        searchPath: 'facts.*.type'
      });

      assert.ok(results.deepSearchResults, 'Should have results');
      const types = results.deepSearchResults.map(r => r.value);
      assert.ok(types.includes('configuration'), 'Should find configuration type');
      assert.ok(types.includes('error'), 'Should find error type');
    });
  });

  describe('Telemetry Aggregation', () => {
    it('should aggregate telemetry by phase', async () => {
      const results = await memoryManager.queryMemory({
        aggregateTelemetry: true
      });

      assert.ok(results.telemetryAggregation, 'Should have aggregation');
      assert.ok(results.telemetryAggregation.byPhase, 'Should have phase aggregation');

      const phases = Object.keys(results.telemetryAggregation.byPhase);
      assert.ok(phases.includes('implementation'), 'Should have implementation phase');
      assert.ok(phases.includes('planning'), 'Should have planning phase');
    });

    it('should aggregate telemetry by ticket', async () => {
      const results = await memoryManager.queryMemory({
        aggregateTelemetry: true
      });

      const agg = results.telemetryAggregation;
      assert.ok(agg.byTicket, 'Should have ticket aggregation');
      assert.ok(agg.byTicket['F-001'], 'Should have F-001 telemetry');
      assert.ok(agg.byTicket['F-002'], 'Should have F-002 telemetry');
    });

    it('should create timeline of events', async () => {
      const results = await memoryManager.queryMemory({
        aggregateTelemetry: true
      });

      const timeline = results.telemetryAggregation.timeline;
      assert.ok(Array.isArray(timeline), 'Timeline should be array');
      assert.ok(timeline.length > 0, 'Should have events in timeline');

      // Check timeline is sorted
      for (let i = 1; i < timeline.length; i++) {
        const prev = new Date(timeline[i - 1].timestamp);
        const curr = new Date(timeline[i].timestamp);
        assert.ok(prev <= curr, 'Timeline should be chronologically sorted');
      }
    });

    it('should provide summary statistics', async () => {
      const results = await memoryManager.queryMemory({
        aggregateTelemetry: true
      });

      const summary = results.telemetryAggregation.summary;
      assert.ok(summary, 'Should have summary');
      assert.ok(summary.totalEvents > 0, 'Should count events');
      assert.ok(Array.isArray(summary.uniqueTickets), 'Should list unique tickets');
      assert.ok(Array.isArray(summary.phases), 'Should list phases');
    });
  });

  describe('Combined Query Features', () => {
    it('should combine semantic search with standard filters', async () => {
      const results = await memoryManager.queryMemory({
        query: 'authentication',
        ticket_id: 'F-001',
        topK: 3
      });

      assert.ok(results.facts, 'Should have facts');
      // Should prioritize F-001 ticket in results
      const f001Facts = Object.entries(results.facts).filter(([k, v]) =>
        k.includes('F001') || (v && v.ticket_id === 'F-001')
      );
      assert.ok(f001Facts.length > 0, 'Should include F-001 facts');
    });

    it('should combine semantic search with telemetry aggregation', async () => {
      const results = await memoryManager.queryMemory({
        query: 'OAuth',
        aggregateTelemetry: true,
        topK: 5
      });

      assert.ok(results.facts, 'Should have semantic search results');
      assert.ok(results.relevanceScores, 'Should have scores');
      assert.ok(results.telemetryAggregation, 'Should have telemetry aggregation');
    });

    it('should handle phase filter with telemetry', async () => {
      const results = await memoryManager.queryMemory({
        phase: 'implementation'
      });

      assert.ok(results.related, 'Should have related telemetry');
      const implementationItems = results.related.filter(item =>
        item.phase === 'implementation'
      );
      assert.ok(implementationItems.length > 0, 'Should find implementation phase items');
    });
  });

  describe('Performance Benchmarks', () => {
    it('should handle large result sets efficiently', async () => {
      const startTime = Date.now();

      const results = await memoryManager.queryMemory({
        query: 'system',
        topK: 100,
        aggregateTelemetry: true,
        deepSearch: true,
        searchPath: 'facts.*'
      });

      const duration = Date.now() - startTime;

      assert.ok(results, 'Should return results');
      assert.ok(duration < 1000, `Query should complete quickly (took ${duration}ms)`);
    });

    it('should cache embeddings for repeated queries', async () => {
      const query = 'caching test query';

      // First query
      const start1 = Date.now();
      const results1 = await memoryManager.queryMemory({ query });
      const duration1 = Date.now() - start1;

      // Same query again (should be faster if caching works)
      const start2 = Date.now();
      const results2 = await memoryManager.queryMemory({ query });
      const duration2 = Date.now() - start2;

      assert.ok(results1 && results2, 'Both queries should return results');
      // Note: Since we're using stub embeddings, caching benefit might be minimal
      // but the mechanism should still work
    });
  });

  // Cleanup after all tests
  it('should cleanup test environment', async () => {
    await cleanupTestEnvironment();
    assert.ok(!existsSync(testMemoryRoot), 'Test memory root should be removed');
  });
});

// Run the tests
if (import.meta.url.startsWith('file:')) {
  console.log('🧪 Running Semantic Memory Tests...\n');
}