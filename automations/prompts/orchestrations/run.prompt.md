# Orchestration Run Prompt

## Purpose
Coordinate planner, implementer, reviewer, QA, ops, and knowledge steward agents to execute the full autonomous build cycle for the Motion Mavericks portal, while maintaining persistent memory and closed-loop learning signals. This prompt follows a successful preflight when `automations/prompts/orchestrations/command.prompt.md` is processing a `full_run` intent.

## Inputs
- `automations/build-spec.yaml`
- `automations/run-state.json` (create if absent)
- `docs/playbook/**`
- Agent prompt library (`automations/prompts/agents/*.prompt.md`)
- Memory store (`automations/memory/**`) – hybrid index + replay buffer
- Preflight status (must be ready)

## High-Level Flow
1. **Initialisation** – If `automations/run-state.json` lacks the current `run_id`, automatically run `npm run automation:run-state:init -- --run-id <run_id> --force` to regenerate from `automations/run-queue.json` and reload memory heartbeat metadata. Log the command under `updates.run_state` and include the diff. The helper `npm run automation:run:queue` performs this automatically when invoked directly.
2. **Plan Generation (optional)** – Invoke Planner only when the queue is empty or requires refresh. Existing queues skip this step.
3. **Ticket Execution Loop** – Continue iterating until every ticket in `automations/run-queue.json` reports `status: "done"` in `automations/run-state.json`:
   a. Select the next ready ticket (all dependencies marked `done`). Always process a single ticket at a time; if no ticket is ready, mark blockers and return.
   b. Spawn Implementer with ticket + memory; collect outputs + execution traces.
   c. Dispatch Reviewer; if `revise`, loop back to Implementer with feedback persisted to memory before selecting any new ticket.
   d. When approved, run QA; on failure, return to Implementer with annotated logs + failure embeddings.
   e. Upon QA success, trigger Ops/Release; capture deployment telemetry + reward signal.
   f. Call Knowledge Steward to update docs/context and reconcile memory facts.
   g. Append agent traces to `automations/memory/replay/<run_id>/<ticket_id>-<agent>.json` and ticket telemetry to `automations/memory/telemetry/<run_id>/<ticket_id>.json` at every phase.
   h. Update `automations/memory/sessions/<run_id>/session.json` with the active phase and command transcript.
   i. Refresh the heartbeat (`automations/memory/sessions/<run_id>/heartbeat.json`) with the current phase so monitoring reflects progress.
   j. After Knowledge Steward completes, mark the ticket `done` in `automations/run-state.json`, append artefact links, persist rewards, and snapshot the session log.
   k. Re-enter this loop (step 3a) until no tickets remain unresolved.
3. **Post-loop Validation** – Ensure all tickets closed, CI passing, change log updated, memory compaction executed. If any ticket stays `blocked`, emit an escalation packet instead of claiming success.

## State Management
- Maintain JSON structure:
```
{
  "run_id": "RUN-YYYYMMDD-HHMM",
  "tickets": {
    "MMP-001": {
      "status": "pending|in_progress|qa|deploy|done|blocked",
      "phase": "planner",
      "artefacts": {"branch": "", "pr": "", "logs": [...]}
    }
  }
}
```

Each ticket entry must include a `phase` (`planner|implementer|reviewer|qa|ops_release|knowledge|done|blocked`) so downstream tooling can resume the correct prompt if an agent needs to retry. Persist timestamps, heartbeat updates, session snapshots, and artefact references (`branch`, `pr`, `logs`, `docs`) after every agent turn.

## Failure Handling
- If any agent returns `escalate`, pause run, record blocker in `run-state`, snapshot relevant memory, and surface to human operator.
- On repeated QA/Reviewer failures (>3 iterations), mark ticket `blocked`, tag memory with remediation note, and escalate.
- If reward scores trend downward for three tickets, trigger adaptive re-planning or halt for human review.

## Execution Contract
- Never finish this prompt with only a refreshed plan. Always return an execution packet for the **immediate next agent turn**.
- After each agent completes, re-run this prompt to select the next phase for the current ticket or to move to the next ticket.
- Do not advance to a new ticket until the current ticket reaches `phase: "done"`.
- If planner output changes the queue, update `automations/run-state.json` to reflect any inserted or removed tickets before continuing the loop.
- Ensure `updates.memory` includes file paths written to `sessions`, `replay`, or `telemetry` so downstream automation can verify persistence.
- If the heartbeat daemon stops responding, pause execution, call `npm run automation:memory:bootstrap -- --run-id <run_id> --daemon` to restart it, update `automations/memory/sessions/<run_id>/heartbeat.json`, and record the restart in `updates.run_state`.
- When selecting the next agent, set `next_prompt` to the specific agent prompt (Implementer, Reviewer, QA, Ops, Knowledge) rather than back to this file; only once the ticket is `done` should `next_prompt` point to `automations/prompts/orchestrations/run.prompt.md`.

## Output Format
Respond with JSON so the controller can chain the next agent automatically:
```
{
  "ticket_id": "F-001",
  "phase": "implementer|reviewer|qa|ops_release|knowledge|done|blocked|planner",
  "summary": "<brief rationale for this phase>",
  "next_prompt": "automations/prompts/agents/...",
  "follow_on": ["automations/prompts/orchestrations/run.prompt.md"],
  "updates": {
    "run_state": { ... optional delta ... },
    "memory": ["path/to/update.json"],
    "telemetry": ["commands to execute or artefacts to write"]
  },
  "notes": "Any additional guidance, escalation context, or required human actions"
}
```
- For active phases, `next_prompt` must point to the corresponding agent prompt (`implementer`, `reviewer`, `qa`, `ops-release`, `knowledge-steward`). Include this file in `follow_on` so control returns here after the agent completes.
- When the current ticket reaches `phase: "done"`, set `next_prompt` to this file (`automations/prompts/orchestrations/run.prompt.md`) with `summary` explaining that the loop should advance to the next ticket. Only emit `next_prompt: automations/prompts/orchestrations/postflight.prompt.md` once every ticket is `done`.
- If a ticket is blocked, set `phase: "blocked"`, keep `next_prompt` on this file, and explain the blocker in `notes` so the controller can escalate.
- Include `follow_on` prompts for multi-step agent chains (e.g., after Implementer, include Reviewer, QA, Ops, Knowledge Steward in order). Always keep this prompt (`automations/prompts/orchestrations/run.prompt.md`) as the final entry to resume the loop.

## Notes
- Ensure each agent invocation logs inputs/outputs under `automations/logs/<agent>/<timestamp>.json` and appends traces to `automations/memory/replay/`.
- Respect guardrails at every stage; do not auto-merge to production without required approvals flagged in ticket metadata.
- Run `automations/scripts/memory-validate.mjs` if memory checksum deviates.
- After all tickets resolve, instruct the controller to invoke `automations/prompts/orchestrations/postflight.prompt.md`. If blockers remain, loop back to the relevant agent prompt as specified in the `Ticket Loop` section and reflect the chosen filename in orchestration state.
