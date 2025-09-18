# Orchestration Run Prompt

## Purpose
Coordinate planner, implementer, reviewer, QA, ops, and knowledge steward agents to execute the full autonomous build cycle for the Motion Mavericks portal, while maintaining persistent memory and closed-loop learning signals.

## Inputs
- `automation/build-spec.yaml`
- `automation/run-state.json` (create if absent)
- `docs/playbook/**`
- Agent prompt library (`automation/agents/*.prompt.md`)
- Memory store (`automation/memory/**`) – hybrid index + replay buffer
- Preflight status (must be ready)

## High-Level Flow
1. **Plan Generation** – Invoke Planner with build spec + long-term memory to produce/upsert ticket backlog (`automation/run-queue.json`) and refresh memory embeddings.
2. **Ticket Loop** – While unresolved tickets remain:
   a. Select next ticket with dependencies satisfied; query contextual memory slice.
   b. Spawn Implementer with ticket + memory; collect outputs + execution traces.
   c. Dispatch Reviewer; if `revise`, loop back to Implementer with feedback persisted to memory.
   d. When approved, run QA; on failure, return to Implementer with logs + failure embeddings.
   e. Upon QA success, trigger Ops/Release; capture deployment telemetry + reward signal.
   f. Call Knowledge Steward to update docs/context and reconcile memory facts.
   g. Update `automation/run-state.json` with ticket status, artefact links, reward score, and surfaced lessons.
   h. Invoke `reward_update` + DSPy optimiser to refine prompts/programs before selecting next ticket.
3. **Post-loop Validation** – Ensure all tickets closed, CI passing, change log updated, memory compaction executed.

## State Management
- Maintain JSON structure:
```
{
  "run_id": "RUN-YYYYMMDD-HHMM",
  "tickets": {
    "MMP-001": {
      "status": "pending|in_progress|qa|deploy|done|blocked",
      "artefacts": {"branch": "", "pr": "", "logs": [...]}
    }
  }
}
```

## Failure Handling
- If any agent returns `escalate`, pause run, record blocker in `run-state`, snapshot relevant memory, and surface to human operator.
- On repeated QA/Reviewer failures (>3 iterations), mark ticket `blocked`, tag memory with remediation note, and escalate.
- If reward scores trend downward for three tickets, trigger adaptive re-planning or halt for human review.

## Output
- Final run report summarising tickets completed, outstanding blockers, deployments made, tests executed, documentation updates, reinforcement updates (reward deltas, optimiser runs), memory statistics, and next steps.

## Notes
- Ensure each agent invocation logs inputs/outputs under `automation/logs/<agent>/<timestamp>.json` and appends traces to `automation/memory/replay/`.
- Respect guardrails at every stage; do not auto-merge to production without required approvals flagged in ticket metadata.
- Run `automation/scripts/memory-validate.ts` (to be implemented) if memory checksum deviates.
