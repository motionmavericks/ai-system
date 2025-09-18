---
title: "Agent Orchestration Blueprint"
status: "Draft"
owner: "Docs Agent"
last_updated: "2025-09-19"
---

# Agent Orchestration Blueprint

Defines the autonomous workflow that converts the Motion Mavericks playbook into a working MVP. Roles, inputs, prompts, success criteria, and learning feedback loops are codified for controller tooling (e.g. LangGraph, AutoGen, DSPy).

## 1. Roles & Responsibilities

| Agent | Responsibility | Primary Inputs | Required Outputs |
|-------|----------------|----------------|------------------|
| Planner | Decompose work into ordered tickets, map dependencies | `automation/build-spec.yaml`, playbook sections `02-*`, `04-*`, `05-*`, `18-*` | Ticket plan (YAML/JSON), acceptance criteria, test plan |
| Implementer | Write code, migrations, configuration per ticket | Planner ticket, relevant playbook doc, ADR refs | Git commit/PR draft, code diffs, updated tests |
| Reviewer | Static analysis, enforce guardrails, request fixes | PR diff, `automation/guardrails.md`, lint/test logs | Review report, approval/block decision |
| QA | Run automated suites, capture artefacts | Implementer output, test suites | Test results, failure triage, rerun instructions |
| Ops/Release | Manage env variables, deploy previews, update change log | Planner release ticket, playbook `13-*`, `18-*`, `20-*` | Deployment status, release notes, change log entry |
| Knowledge Steward | Maintain documentation, context JSON, lessons learned | All docs | Updated docs, `docs/playbook/_generated/context.json`, `docs/playbook/20-03-change-log.md` entry |

Controller agent (Orchestrator) coordinates role turn-taking and manages shared memory (
`automation/memory/` persistent store).

## 2. Artefact Flow

1. Planner ingests build spec → emits structured plan (`automation/run-queue.json`) and writes scope embeddings to long-term memory.
2. Orchestrator selects next ready ticket, loads relevant memory slices, and passes to Implementer.
3. Implementer writes code, runs targeted unit tests, opens draft PR, and records execution traces (commands, failures) to short-term memory.
4. Reviewer checks diff; on failure, ticket loops back to Implementer with critique persisted for reuse.
5. QA runs full suite (unit, integration, e2e, accessibility, performance smoke) via GitHub Actions dispatcher and pushes structured metrics to telemetry store.
6. Ops agent merges PR, promotes to preview, triggers release checklist, and logs deployment outcomes.
7. Knowledge Steward updates docs, context, change log, and reconciles memory records to keep facts current.
8. Reinforcement loop: Orchestrator updates prompt/program parameters based on evaluation scores before pulling next ticket.

Memory layers:
- **Short-term scratchpad** – JSON files per run under `automation/memory/sessions/<run_id>/`.
- **Long-term fact store** – Hybrid memory index (`automation/memory/index.json`) consolidating embeddings (vector similarity), relationships (graph adjacency list), and keyed facts for low-latency lookups.
- **Experience buffer** – `automation/memory/replay/` capturing agent traces for DSPy/RL fine-tuning.

## 3. Ticket Schema (JSON)

```json
{
  "ticket_id": "MMP-001",
  "title": "Implement tenant-aware project CRUD",
  "dependencies": ["MMP-000"],
  "docs": ["docs/playbook/07-02-endpoints-and-contracts.md", "docs/playbook/06-data-model-and-storage/06-01-schema-design.md"],
  "acceptance": [
    "Admin can create project via POST /api/projects",
    "Milestone table auto-seeded with default status"
  ],
  "tests": [
    "unit: packages/db/tests/projects.test.ts",
    "integration: app/api/projects/route.test.ts"
  ],
  "feature_flags": ["projects_v1"],
  "telemetry": ["event: project.created"],
  "security": ["Ensure tenant_id enforced"]
}
```

## 4. Prompt Templates

### Planner Prompt
- Summarise scope from build spec and recent memory snapshots.
- Produce ordered list of tickets with dependencies.
- Reference success metrics (build spec `non_functional_requirements`).
- Persist ticket embeddings + rationale to long-term memory.
- Output strictly valid JSON array.

### Implementer Prompt
- Receive ticket JSON plus memory slice (prior related tickets, reviewer notes, telemetry trends).
- Fetch relevant doc excerpts.
- Plan → code → tests pattern.
- Enforce guardrails (no changes outside allowed directories without annotation).
- Emit execution trace (commands, test outcomes, deltas) to experience buffer.

### Reviewer Prompt
- Evaluate diff vs guardrails.
- Require: formatting hooks run, tests listed executed, PR description includes references.
- Compare implementation against historical incidents stored in memory; surface regressions.
- Approve only if acceptance criteria satisfied, tests passing, no secrets exposed.
- Store structured review feedback for future retrieval and RL rewards.

### QA Prompt
- Execute matrix of commands, capture output and key metrics.
- Push results to telemetry store (`automation/memory/telemetry.json`).
- On failure, annotate log sections, score severity, and link to rerun command.

### Ops Prompt
- Run release checklist subset for ticket scope.
- Update change log entry with ticket summary and link.
- Record deployment metadata (timestamp, Vercel URL, rollback token) in memory.

### Knowledge Steward Prompt
- Update or confirm `docs/playbook/_generated/context.json` alignment.
- Append change log row.
- If docs changed, ensure AI-managed blocks remain valid.
- Archive distilled lessons to long-term memory and resolve superseded facts.

## 5. State Management & Memory Hygiene

- Orchestrator maintains `automation/run-state.json` containing current ticket, status (`pending|in_progress|blocked|done`), artefact links, and aggregate reward scores.
- Logs stored per agent under `automation/logs/<agent>/<timestamp>.log` for audit.
- Memory compactor runs postflight to dedupe facts, update graph edges, and roll stale traces into the replay buffer.
- Every run updates `automation/memory/manifest.json` with checksum + schema version to support validation.

## 6. Guardrail Hooks

- Before editing files, Implementer consults `automation/guardrails.md` to ensure scope alignment.
- Reviewer ensures guardrail violations escalate to human review.

## 7. Automation Interfaces

| Function | Description |
|----------|-------------|
| `fetch_docs(paths[])` | Returns doc excerpts for agent prompts |
| `run_ci(pipeline)` | Triggers GitHub workflow; collects results |
| `open_pr(branch, summary)` | Creates draft PR |
| `update_change_log(entry)` | Adds row to `20-03-change-log.md` |
| `deploy_preview(branch)` | Calls Vercel API |
| `store_memory(payload, ttl)` | Writes fact/embedding nodes to hybrid memory |
| `query_memory(filters)` | Retrieves contextual memory slice (vector + graph) |
| `append_trace(agent, data)` | Persists structured experience for replay |
| `reward_update(agent, score)` | Updates reinforcement signals for DSPy/RL fine-tuning |

Implementations can be stitched via LangGraph or a custom controller.

## 8. Success Criteria

- 100% tickets closed with passing CI and merged PRs.
- Documentation auto-updated with each run (context, change log).
- Memory accuracy ≥95% (no stale facts detected in spot checks) with token usage reduced ≥75% vs full-history prompts.
- Reinforcement loop closes per run: rewards calculated, traces persisted, and prompt/program cache refreshed.
- Human oversight limited to sign-offs at release and major architectural decisions.

## 9. Next Steps

1. Generate initial ticket plan from build spec.
2. Wire orchestration stack to use this blueprint.
3. Run dry-run using a single ticket (e.g., schema setup) to validate workflow.
