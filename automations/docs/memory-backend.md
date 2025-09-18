---
title: "Memory Backend Rollout"
status: "Draft"
owner: "Reliability Partner"
last_updated: "2025-09-19"
---

# Memory Backend Rollout

Defines the production memory infrastructure that supports hybrid context for autonomous agents.

## 1. Components

| Layer | Provider | Notes | Environment Variables |
|-------|----------|-------|------------------------|
| Vector store | Mem0 self-hosted (pgvector) | Stores embeddings + cosine similarity search | `MEMORY_VECTOR_URL`, `MEMORY_VECTOR_API_KEY` |
| Graph store | Neo4j Aura (APAC region) | Encodes relationships between facts/tickets | `MEMORY_GRAPH_URL`, `MEMORY_GRAPH_USER`, `MEMORY_GRAPH_PASSWORD` |
| Key/value cache | Upstash Redis | Fast lookup for recent facts/telemetry | `MEMORY_REDIS_URL`, `MEMORY_REDIS_TOKEN` |

## 2. Provisioning Steps

1. **Mem0 Cluster**
   - Deploy Mem0 using the official Helm chart targeting managed Postgres (pgvector enabled).
   - Create service token; store in 1Password vault `Motion Mavericks › Automation` as `MEMORY_VECTOR_API_KEY`.
   - Record HTTPS endpoint (e.g., `https://mem0.motionmavericks.au`).
2. **Neo4j Aura**
   - Create new project in `ap-southeast-2`. Enable AuraDS for future graph analytics.
   - Create read/write user dedicated to automation agents.
3. **Upstash Redis**
   - Provision single-region plan in `ap-southeast-1` (closest to Vercel Sydney).
   - Enable TLS and set rate limiting to prevent runaway writes.

## 3. Environment Variable Wiring

Add the following to GitHub Actions secrets and Vercel env:

```
MEMORY_VECTOR_URL=https://mem0.motionmavericks.au
MEMORY_VECTOR_API_KEY=<REDACTED>
MEMORY_GRAPH_URL=neo4j+s://<cluster>.databases.neo4j.io
MEMORY_GRAPH_USER=motion-mavericks-automation
MEMORY_GRAPH_PASSWORD=<REDACTED>
MEMORY_REDIS_URL=https://global-upstash-url
MEMORY_REDIS_TOKEN=<REDACTED>
DSPY_API_KEY=<REDACTED>
```

Expose local development equivalents via `.env.example`:

```
MEMORY_VECTOR_URL=http://localhost:7000
MEMORY_VECTOR_API_KEY=dev-vector-key
MEMORY_GRAPH_URL=bolt://localhost:7687
MEMORY_GRAPH_USER=neo4j
MEMORY_GRAPH_PASSWORD=neo4j-password
MEMORY_REDIS_URL=redis://localhost:6379
MEMORY_REDIS_TOKEN=local-redis-token
```

## 4. Synchronisation Workflow

1. Agents read/write through controller functions (`store_memory`, `query_memory`, `append_trace`).
2. After each run, orchestrator invokes `collect-telemetry.mjs` → `memory-validate.mjs --write` → `memory-compact.mjs` to keep JSON mirror in sync.
3. Nightly job `reinforcement-train.yml` pushes replay buffer to DSPy optimiser and backfills embeddings/graph edges in Mem0/Neo4j.

## 5. Monitoring

- Mem0: enable Prometheus metrics; scrape latency and success ratios.
- Neo4j: watch connection pool usage and transaction errors.
- Redis: enforce TTL for keys (telemetry 30 days, replay 90 days).
- Alert thresholds align with observability SLOs (see `docs/playbook/14-02-metrics-sli-slo.md`).

