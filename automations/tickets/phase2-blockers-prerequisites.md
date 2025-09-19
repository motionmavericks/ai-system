# Phase 2 Blockers and Prerequisites

## Critical Blockers (Must Resolve Before Phase 2)

### 1. LLM Provider Credentials
**Blocking:** F-005.1 (LLM Provider Abstraction)
**Type:** External Dependency
**Resolution Required:**
- [ ] Obtain OpenAI API key OR Anthropic API key
- [ ] Determine primary LLM provider selection
- [ ] Set up billing/budget controls
- [ ] Configure rate limiting strategy

**Environment Variables Needed:**
```bash
LLM_API_KEY=<api_key>
LLM_PROVIDER=openai|anthropic|local
LLM_MODEL=gpt-4|claude-3|llama
LLM_BASE_URL=<optional_custom_endpoint>
```

### 2. Embedding Model Access
**Blocking:** F-007.1 (Semantic Memory Search)
**Type:** External Dependency
**Resolution Required:**
- [ ] Select embedding model (OpenAI ada-002, sentence-transformers, etc.)
- [ ] Obtain API access if using external service
- [ ] OR set up local embedding model infrastructure

**Environment Variables Needed:**
```bash
EMBEDDING_API_KEY=<api_key_if_external>
EMBEDDING_MODEL=text-embedding-ada-002|all-MiniLM-L6-v2
EMBEDDING_PROVIDER=openai|local
```

## Prerequisites (Should Address Before Implementation)

### 1. Sandboxing Infrastructure
**For:** F-004.1 (Guard Sandboxing)
**Type:** Technical Setup
**Requirements:**
- [ ] Validate Node.js child_process isolation is sufficient
- [ ] Consider Docker containers for stronger isolation if needed
- [ ] Define resource limits policy (CPU, memory, disk)
- [ ] Set up monitoring for sandboxed processes

### 2. Vector Storage Solution
**For:** F-007.1 (Semantic Memory)
**Type:** Infrastructure
**Options to Evaluate:**
- [ ] In-memory storage (development only)
- [ ] File-based storage with indexes
- [ ] Vector database (Pinecone, Weaviate, Qdrant)
- [ ] Hybrid approach with caching

**Decision Criteria:**
- Expected data volume
- Query performance requirements
- Budget constraints
- Operational complexity

### 3. Testing Infrastructure
**For:** All Phase 2 tickets
**Type:** Development Environment
**Requirements:**
- [ ] Set up test API keys with limited quotas
- [ ] Create isolated test environment
- [ ] Configure CI/CD pipeline for new tests
- [ ] Set up performance monitoring

## Operational Prerequisites

### 1. Team Assignments
**Required Before Start:**
- [ ] Confirm Security/Validation Lead availability
- [ ] Confirm AI Integration Lead availability
- [ ] Confirm Memory Systems Lead availability
- [ ] Establish code review process

### 2. Documentation Requirements
**Before Implementation:**
- [ ] Update architecture documentation
- [ ] Create security guidelines for sandboxing
- [ ] Document LLM provider integration patterns
- [ ] Create runbook for production deployment

### 3. Monitoring and Alerting
**Setup Required:**
- [ ] LLM API usage monitoring
- [ ] Sandboxed execution monitoring
- [ ] Memory system performance metrics
- [ ] Cost tracking for API usage

## Resolution Timeline

### Immediate (Before Phase 2 Start)
1. **Day 1-2:** Obtain LLM API credentials
2. **Day 2-3:** Evaluate and select embedding model
3. **Day 3-4:** Set up development environment with credentials
4. **Day 4-5:** Validate sandboxing approach

### During Phase 2 Week 1
1. Finalize vector storage decision
2. Set up test infrastructure
3. Configure monitoring systems

## Risk Mitigation

### If Blockers Cannot Be Resolved

#### No LLM API Access
**Fallback:** Continue with enhanced stubbed interface
**Impact:** Limited to mock responses, no real AI capabilities
**Alternative:** Investigate local LLM options (Ollama, llama.cpp)

#### No Embedding Model Access
**Fallback:** Use keyword-based search enhancements only
**Impact:** No semantic search, limited to exact matching
**Alternative:** Implement TF-IDF based relevance scoring

#### Sandboxing Concerns
**Fallback:** Restricted command whitelist only
**Impact:** Limited guard functionality
**Alternative:** Manual review process for command execution

## Recommended Actions

### For Project Manager
1. Prioritize obtaining LLM API credentials
2. Allocate budget for API usage
3. Schedule team availability check

### For Technical Lead
1. Prototype sandboxing approach
2. Benchmark embedding options
3. Design fallback strategies

### For DevOps
1. Prepare credential management system
2. Set up monitoring infrastructure
3. Configure test environments

## Environment Setup Script

Create `.env.phase2` file:
```bash
# LLM Configuration
LLM_API_KEY=
LLM_PROVIDER=openai
LLM_MODEL=gpt-4
LLM_BASE_URL=https://api.openai.com/v1
LLM_TIMEOUT=60000
USE_STUBBED_LLM=false

# Embedding Configuration
EMBEDDING_API_KEY=
EMBEDDING_MODEL=text-embedding-ada-002
EMBEDDING_PROVIDER=openai
EMBEDDING_CACHE_DIR=./automations/memory/embeddings

# Sandboxing Configuration
SANDBOX_ENABLED=true
SANDBOX_TIMEOUT=30000
SANDBOX_MAX_BUFFER=1048576
ALLOWED_COMMANDS=npm,pnpm,node,git

# Memory Configuration
MEMORY_VECTOR_STORAGE=file
MEMORY_VECTOR_INDEX=./automations/memory/vectors/index.json
SEMANTIC_SEARCH_ENABLED=false
SEMANTIC_SEARCH_TOP_K=5

# Monitoring
TELEMETRY_ENABLED=true
API_USAGE_TRACKING=true
COST_ALERT_THRESHOLD=100
```

## Status Tracking

| Blocker/Prerequisite | Status | Owner | Target Date | Notes |
|---------------------|--------|-------|-------------|-------|
| LLM API Credentials | ❌ PENDING | AI Integration Lead | 2025-01-20 | Awaiting procurement |
| Embedding Model Selection | ❌ PENDING | Memory Systems Lead | 2025-01-21 | Evaluation in progress |
| Sandboxing Validation | ❌ PENDING | Security Lead | 2025-01-22 | Prototype needed |
| Vector Storage Decision | ❌ PENDING | Architecture Team | 2025-01-23 | Options under review |
| Test Environment | ❌ PENDING | DevOps | 2025-01-24 | Setup required |

## Next Steps

1. **Immediate:** Request LLM API access from procurement
2. **Tomorrow:** Schedule Phase 2 kickoff meeting with all leads
3. **This Week:** Complete all blocker resolutions
4. **Next Week:** Begin Phase 2 implementation with F-004.1 and F-005.1