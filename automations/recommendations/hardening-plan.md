# Motion Mavericks Automation Orchestrator - Hardening Plan

## Executive Summary
This document provides a comprehensive improvement plan for the Motion Mavericks automation orchestrator. The recommendations address critical bugs in orchestration flow, agent execution loops, state management, guard evaluation, and telemetry/documentation alignment. All tickets (F-001 through F-006) are treated as pending/unimplemented.

## Critical Findings & Fixes

### 1. Orchestration Flow Issues

#### Problem: Preflight Status Mismatch
**Location:** `automations/scripts/orchestrator-run.mjs:153`
```javascript
// Current (INCORRECT):
if (preflightResult.status !== 'ready') {
// Should be:
if (!preflightResult.ready) {
```

**Impact:** Preflight validation always fails because the prompt returns `{ ready: boolean }` not `{ status: string }`

**Fix F-001.1:** Update preflight check
```javascript
// automations/scripts/orchestrator-run.mjs:153
if (!preflightResult.ready) {
  console.error('❌ Preflight checks failed:', preflightResult.summary);
  if (preflightResult.blockers) {
    console.error('Blockers:', preflightResult.blockers);
  }
  process.exit(1);
}
```

### 2. Agent Executor Loop Issues

#### Problem: Cannot Rewind to Implementer
**Location:** `automations/lib/agent-executor.mjs:143-156`

**Current Behavior:** When reviewer requests revision or QA fails, the code attempts to reset `currentAgent = 0` but continues incrementing from the stale position.

**Fix F-002.1:** Proper Loop Rewinding
```javascript
// automations/lib/agent-executor.mjs:97-190
async executeTicketChain(ticket, initialContext) {
  let currentAgent = 0;
  let context = { ...initialContext };
  const maxRetries = 3;
  const results = [];
  let globalRetryCount = 0; // Track total rewinds

  while (currentAgent < this.agentSequence.length && globalRetryCount < maxRetries) {
    const agentName = this.agentSequence[currentAgent];

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
        // Reviewer requests revision - properly rewind
        context.reviewer_feedback = result;
        currentAgent = 0; // Reset to implementer
        globalRetryCount++;
        continue; // IMPORTANT: Continue from new position
      }

      if (result.status === 'failed' && agentName === 'qa') {
        // QA failed - properly rewind
        context.qa_failure = result;
        currentAgent = 0; // Reset to implementer
        globalRetryCount++;
        continue; // IMPORTANT: Continue from new position
      }

      // Agent succeeded - move forward
      context[`${agentName}_output`] = result;
      currentAgent++;

    } catch (error) {
      console.error(`Error executing ${agentName}:`, error);
      globalRetryCount++;

      if (globalRetryCount >= maxRetries) {
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
```

### 3. State Management Issues

#### Problem: Force Reinitializes & Null State
**Location:** `automations/lib/state-manager.mjs:145-153`

**Current Issues:**
1. Always passes `--force` flag, wiping existing state
2. No null check before accessing `state.tickets`

**Fix F-003.1:** Safe State Initialization
```javascript
// automations/lib/state-manager.mjs:144-153
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
```

**Fix F-003.2:** Null-Safe Ticket Updates
```javascript
// automations/lib/state-manager.mjs:76-103
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
```

### 4. Guard System Issues

#### Problem: Command Execution & Auto-Fix Disabled
**Location:** `automations/lib/guard-evaluator.mjs:214-220, 281-312`

**Fix F-004.1:** Enable Sandboxed Command Execution
```javascript
// automations/lib/guard-evaluator.mjs:214-220
async evaluateCommandSucceeds(check) {
  // Implement sandboxed execution for safe commands
  const allowedCommands = ['npm', 'pnpm', 'node', 'git'];
  const command = check.command.split(' ')[0];

  if (!allowedCommands.includes(command)) {
    return {
      ok: false,
      reason: `Command '${command}' not in allowed list for safety`
    };
  }

  try {
    const { spawn } = await import('child_process');
    const { promisify } = await import('util');
    const exec = promisify(spawn);

    // Execute with timeout and resource limits
    const result = await Promise.race([
      exec(check.command, {
        cwd: this.repoRoot,
        timeout: 30000, // 30 second timeout
        maxBuffer: 1024 * 1024 // 1MB output limit
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Command timeout')), 30000)
      )
    ]);

    return {
      ok: result.code === 0,
      reason: result.code !== 0 ? `Command exited with code ${result.code}` : undefined
    };
  } catch (error) {
    return {
      ok: false,
      reason: `Command failed: ${error.message}`
    };
  }
}
```

### 5. LLM Interface Issues

#### Problem: Stubbed Interface in Production
**Location:** `automations/lib/prompt-controller.mjs:239-287`

**Fix F-005.1:** Real LLM Provider Abstraction
```javascript
// automations/lib/llm-provider.mjs (NEW FILE)
export class LLMProvider {
  constructor(config) {
    this.apiKey = config.apiKey || process.env.LLM_API_KEY;
    this.model = config.model || 'gpt-4';
    this.baseUrl = config.baseUrl || 'https://api.openai.com/v1';
    this.timeout = config.timeout || 60000;
  }

  async complete(prompt, metadata = {}) {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are an automation orchestrator assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
}

// Factory with fallback
export function createLLMProvider(config = {}) {
  if (process.env.USE_STUBBED_LLM === 'true') {
    return new StubbedLLMInterface(config.responses);
  }
  return new LLMProvider(config);
}
```

### 6. Queue Management Issues

#### Problem: Human-Owned Tickets Not Filtered
**Location:** `automations/scripts/orchestrator-run.mjs` (missing filter logic)

**Fix F-006.1:** Filter Human-Owned Tickets
```javascript
// automations/scripts/orchestrator-run.mjs:29-34
// Load initial state and filter queue
const queue = await stateManager.loadQueue();
const agentQueue = queue.filter(ticket => {
  // Skip tickets owned by humans
  if (ticket.summary && ticket.summary.includes('Owner: Human:')) {
    console.log(`ℹ️  Skipping human-owned ticket: ${ticket.ticket_id}`);
    return false;
  }
  return true;
});

if (!agentQueue || agentQueue.length === 0) {
  console.error('❌ No agent-executable tickets in queue.');
  process.exit(1);
}
```

### 7. Memory & Telemetry Issues

#### Problem: Shallow String Filtering
**Location:** `automations/lib/state-manager.mjs:411-445`

**Fix F-007.1:** Semantic Memory Recall
```javascript
// automations/lib/state-manager.mjs:411-445
async queryMemory(filters = {}) {
  const index = await this.readMemoryIndex();

  const results = {
    facts: {},
    related: [],
    semantic: []
  };

  // Enhanced semantic search
  if (filters.semantic_query) {
    // Use embeddings for semantic similarity
    const query_embedding = await this.getEmbedding(filters.semantic_query);
    const similarities = index.embeddings.map(item => ({
      ...item,
      similarity: this.cosineSimilarity(query_embedding, item.vector)
    }));

    // Get top-k similar items
    const topK = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, filters.top_k || 5);

    results.semantic = topK;
  }

  // Existing filters with deep object search
  if (filters.ticket_id) {
    for (const [key, value] of Object.entries(index.facts)) {
      // Deep search in nested objects
      if (this.deepSearch(value, 'ticket_id', filters.ticket_id) ||
          key.includes(filters.ticket_id)) {
        results.facts[key] = value;
      }
    }
  }

  if (filters.phase) {
    const telemetryFiles = existsSync(this.telemetryDir)
      ? await readdir(this.telemetryDir)
      : [];

    for (const file of telemetryFiles) {
      if (file.includes(filters.phase)) {
        const content = await readFile(join(this.telemetryDir, file), 'utf8');
        const parsed = JSON.parse(content);

        // Add relevance scoring
        parsed.relevance = this.calculateRelevance(parsed, filters);
        results.related.push(parsed);
      }
    }

    // Sort by relevance
    results.related.sort((a, b) => b.relevance - a.relevance);
  }

  return results;
}

// Helper methods
deepSearch(obj, key, value) {
  if (!obj) return false;
  if (obj[key] === value) return true;

  for (const prop in obj) {
    if (typeof obj[prop] === 'object') {
      if (this.deepSearch(obj[prop], key, value)) return true;
    }
  }
  return false;
}

cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

calculateRelevance(item, filters) {
  let score = 0;
  if (item.ticket_id === filters.ticket_id) score += 3;
  if (item.phase === filters.phase) score += 2;
  if (filters.timestamp && Math.abs(new Date(item.timestamp) - new Date(filters.timestamp)) < 3600000) score += 1;
  return score;
}
```

## Implementation Roadmap

### Phase 1: Critical Fixes (Immediate)
1. **F-001.1:** Fix preflight status check
2. **F-002.1:** Fix agent executor rewind logic
3. **F-003.1:** Fix state initialization with force flag
4. **F-003.2:** Add null-safe state operations
5. **F-006.1:** Filter human-owned tickets

### Phase 2: Guard & LLM (Week 1)
1. **F-004.1:** Implement sandboxed command execution
2. **F-005.1:** Create real LLM provider abstraction
3. Enable guard auto-fix for safe operations

### Phase 3: Memory & Telemetry (Week 2)
1. **F-007.1:** Implement semantic memory search
2. Create telemetry aggregation pipeline
3. Add proper logging to `automations/logs/`

### Phase 4: Documentation & Testing (Week 3)
1. Update all documentation to match implementation
2. Create integration test suite
3. Add smoke tests for each component

## Validation Steps

### Unit Tests Required
```bash
# Test files to create
automations/tests/orchestrator.test.mjs
automations/tests/agent-executor.test.mjs
automations/tests/state-manager.test.mjs
automations/tests/guard-evaluator.test.mjs
automations/tests/prompt-controller.test.mjs
```

### Integration Tests
```bash
# Run full orchestration in dry-run mode
npm run automation:orchestrate -- --dry-run --run-id TEST-RUN

# Validate state management
npm run automation:run-state:validate

# Test guard evaluation
npm run automation:guards:test -- --ticket F-001

# Memory system health check
npm run automation:memory:validate
```

### Smoke Tests
```javascript
// automations/scripts/orchestration-smoke.mjs
async function smokeTest() {
  const tests = [
    { name: 'Preflight Check', fn: testPreflightCheck },
    { name: 'State Init', fn: testStateInit },
    { name: 'Guard Eval', fn: testGuardEval },
    { name: 'Agent Loop', fn: testAgentLoop },
    { name: 'Memory Query', fn: testMemoryQuery }
  ];

  for (const test of tests) {
    try {
      await test.fn();
      console.log(`✅ ${test.name} passed`);
    } catch (error) {
      console.error(`❌ ${test.name} failed:`, error.message);
      process.exit(1);
    }
  }
}
```

## Ownership & Responsibilities

### Code Owners
- **Orchestration Core:** `automations/scripts/orchestrator-run.mjs` → Automation Lead
- **Agent Execution:** `automations/lib/agent-executor.mjs` → Agent Framework Owner
- **State Management:** `automations/lib/state-manager.mjs` → State Management Lead
- **Guard System:** `automations/lib/guard-evaluator.mjs` → Security/Validation Lead
- **LLM Interface:** `automations/lib/prompt-controller.mjs` → AI Integration Lead
- **Memory System:** `automations/lib/state-manager.mjs#MemoryManager` → Memory Systems Lead

### Review Requirements
- All fixes require code review from respective owner
- Integration changes require cross-team review
- State schema changes require architecture review

## Success Metrics

### Operational Metrics
- **Preflight Success Rate:** >95%
- **Agent Rewind Success:** 100% correct rewinding
- **State Consistency:** Zero null reference errors
- **Guard Execution:** <5s per guard check
- **Memory Query Performance:** <100ms for semantic search

### Quality Metrics
- **Test Coverage:** >80% for all modules
- **Documentation Accuracy:** 100% match with implementation
- **Error Recovery:** Graceful handling of all failure modes
- **Telemetry Capture:** 100% of agent actions logged

## Risk Mitigation

### High-Risk Areas
1. **State Corruption:** Implement versioning and backups
2. **Infinite Loops:** Add circuit breakers and timeouts
3. **Memory Leaks:** Monitor memory usage and implement cleanup
4. **LLM Failures:** Implement retry logic with exponential backoff

### Rollback Strategy
```bash
# Before any change
git checkout -b hardening-backup
npm run automation:state:backup

# After issues
git checkout hardening-backup
npm run automation:state:restore
```

## Conclusion

This comprehensive plan addresses all identified issues in the Motion Mavericks automation orchestrator. Implementation should proceed in phases, with critical fixes deployed immediately and validated through the provided test suites. Each fix includes specific code changes, validation steps, and ownership assignments to ensure accountability and quality.

The plan assumes no existing tickets have been completed and provides a forward-looking approach to hardening the system. Regular validation through smoke tests and integration checks will ensure the system remains stable throughout the implementation process.