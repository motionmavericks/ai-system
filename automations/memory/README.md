# Automation Memory Store

Defines the hybrid long-term memory surface for Motion Mavericks automation. Agents persist facts, vector embeddings, graph relationships, telemetry, and replay traces here. The guardrails, orchestration prompts, and CI jobs expect this layout.

## Directory Layout

- `index.json` – Canonical facts, vector metadata, and lightweight graph adjacency list.
- `manifest.json` – Schema + checksum tracker produced after validation/compaction.
- `telemetry/` – Run-level QA, ops, and performance metrics (`<run_id>/<ticket_id>.json`).
- `replay/` – Structured experience traces for reinforcement learning (`<run_id>/<ticket_id>-<agent>.json`).
- `sessions/` – Scratchpad state for in-flight runs (cleared postflight).

## Schema Expectations

### index.json
```jsonc
{
  "facts": [{
    "id": "fact-0001",           // unique identifier
    "type": "doc" | "ticket" | "insight",
    "summary": "...",             // human readable
    "source": "docs/...",
    "tags": ["docs", "baseline"],
    "updatedAt": "2025-09-19T00:00:00.000Z"
  }],
  "vectors": [{
    "id": "vec-0001",
    "ref": "fact-0001",
    "embedding": [0.01, 0.02, -0.03], // truncated float array
    "dimensions": 3
  }],
  "graph": {
    "nodes": [{"id": "fact-0001", "label": "doc"}],
    "edges": [{"from": "fact-0001", "to": "fact-0002", "type": "relates"}]
  }
}
```

### manifest.json
```jsonc
{
  "schemaVersion": "1.0.0",
  "checksum": "sha256(index.json canonical)",
  "lastCompacted": "ISO timestamp",
  "items": {
    "facts": 1,
    "vectors": 1,
    "graphNodes": 1,
    "graphEdges": 0
  }
}
```

### telemetry entries
```jsonc
{
  "status": "pass",
  "summary": "Milestone tests passed",
  "commands": [{"cmd": "pnpm test:unit", "exit_code": 0, "duration_seconds": 42.1, "log_ref": "automations/logs/..."}],
  "metrics": {"coverage_statements": 0.82},
  "issues": [],
  "artefacts": ["trace.zip"],
  "reward": {"qa_score": 0.92}
}
```

### replay entries
```jsonc
{
  "ticket_id": "MMP-001",
  "agent": "implementer",
  "events": [{"type": "plan", "detail": "Outline steps"}, {"type": "command", "cmd": "pnpm lint", "exit_code": 0}],
  "reward": 0.85,
  "notes": "All tests green"
}
```

## Validation & Maintenance

- `automations/scripts/memory-validate.mjs` – Ensures schema compliance and checksum integrity. Use `node automations/scripts/memory-validate.mjs --write` inside CI.
- `automations/scripts/memory-compact.mjs` – Deduplicates/sorts records, recomputes checksum, and updates manifest.
- `automations/scripts/collect-telemetry.mjs` – Aggregates raw QA/ops logs into telemetry outputs before committing to memory.
- `automations/scripts/memory-bootstrap.mjs` – Creates run scaffolding (sessions, replay, telemetry) and maintains a heartbeat daemon. Run `npm run automation:memory:bootstrap -- --run-id <RUN_ID>` before launching orchestration (automatically invoked by `npm run automation:run:queue`).
- `automations/scripts/run-state-init.mjs` – Mirrors `automations/run-queue.json` into `automations/run-state.json`, ensuring the orchestrator records heartbeat locations and ticket phases. The preflight/run prompts call this automatically when needed.
- `automations/scripts/orchestrator-run.mjs` – Drives the entire queue, writing telemetry/replay snapshots and updating `automations/run-state.json` as tickets progress.

## External Backends

Environment variables (see `automations/docs/ci-bootstrap.md`) point to production-grade vector/graph stores. The local JSON artifacts act as an audit mirror and fallback cache so agents can continue operating offline.
