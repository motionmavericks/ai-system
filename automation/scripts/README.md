# Automation Scripts

Utility scripts referenced by guardrails, CI, and orchestration prompts.

| Script | Purpose | Typical Invocation |
|--------|---------|--------------------|
| `memory-validate.mjs` | Verifies `automation/memory/index.json` schema, recomputes checksum, optionally updates manifest. | `node automation/scripts/memory-validate.mjs --write` |
| `memory-compact.mjs` | Deduplicates memory records, sorts canonical order, updates manifest counts + checksum. | `node automation/scripts/memory-compact.mjs` |
| `collect-telemetry.mjs` | Aggregates QA/ops telemetry JSON into a single summary artefact ready for memory ingestion. | `node automation/scripts/collect-telemetry.mjs --input tmp/telemetry --run-id RUN-20250919` |

All scripts assume execution from repository root and require Node.js ≥20.

