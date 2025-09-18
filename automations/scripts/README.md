# Automation Scripts

Utility scripts referenced by guardrails, CI, and orchestration prompts.

| Script | Purpose | Typical Invocation |
|--------|---------|--------------------|
| `memory-validate.mjs` | Verifies `automations/memory/index.json` schema, recomputes checksum, optionally updates manifest. | `node automations/scripts/memory-validate.mjs --write` |
| `memory-compact.mjs` | Deduplicates memory records, sorts canonical order, updates manifest counts + checksum. | `node automations/scripts/memory-compact.mjs` |
| `collect-telemetry.mjs` | Aggregates QA/ops telemetry JSON into a single summary artefact ready for memory ingestion. | `node automations/scripts/collect-telemetry.mjs --input tmp/telemetry --run-id RUN-20250919` |
| `memory-bootstrap.mjs` | Creates session/replay/telemetry scaffolding and optional heartbeat daemon for a run. | `node automations/scripts/memory-bootstrap.mjs --run-id RUN-20250919 --daemon` |
| `run-state-init.mjs` | Generates `automations/run-state.json` from the current run queue. | `node automations/scripts/run-state-init.mjs --run-id RUN-20250919` |
| `orchestrator-run.mjs` | Executes the ticket queue end-to-end, updating run-state, replay, telemetry, and heartbeat files. | `node automations/scripts/orchestrator-run.mjs` |
| `ticket-handlers/*.mjs` | Per-ticket automation modules invoked by `orchestrator-run.mjs`. | Managed automatically; run via `npm run automation:run:queue` |

All scripts assume execution from repository root and require Node.js ≥20.
