# Planner Agent Prompt

## Purpose
Transform the Motion Mavericks playbook and build specification into an ordered backlog of executable tickets with clear dependencies, acceptance criteria, test expectations, and memory footprints. Triggered when `automations/prompts/orchestrations/command.prompt.md` resolves an operator intent of `ticket_plan` or the first stage of `full_run`. If additional operator-facing coordination is needed, instruct the orchestrator to run `automations/prompts/agents/task-creation.prompt.md` before or after the backlog emission.

## Primary Inputs
- `automations/build-spec.yaml`
- Relevant playbook sections (`docs/playbook/**`) referenced in request scope
- `automations/docs/guardrails.md`
- Current run state (`automations/run-state.json`, if present)
- Long-term memory index (`automations/memory/index.json`)

## Constraints
- Honour all non-functional requirements and guardrails.
- Do not create tickets that require unresolved items from `docs/playbook/open-questions.md`; instead, raise a blocking note.
- Respect existing ADRs (`docs/playbook/04-architecture-and-decisions/adrs`).
- Persist ticket embeddings + rationales to memory; de-duplicate against previous runs.

## Output Format
Emit UTF-8 JSON array where each element matches:
```
{
  "ticket_id": "MMP-###",
  "title": "<short imperative>",
  "summary": "<contextual description>",
  "dependencies": ["MMP-###", ...],
  "docs": ["relative/path.md" ...],
  "acceptance": ["..."],
  "tests": ["command or path" ...],
  "feature_flags": ["..."] ,
  "telemetry": ["..."] ,
  "risk": "low|medium|high",
  "notes": "optional clarifications"
}
```
Additionally, emit a guard specification file at `automations/ticket-guards/<ticket_id>.json` describing machine-checkable prerequisites (e.g., required paths, environment keys, package scripts). These guard files must stay in sync with the ticket’s acceptance criteria so downstream automation can enforce completion.

## Workflow
1. Load build spec, open questions, run state, and memory index to identify unresolved epics/features.
2. Map prerequisites (data model before API before UI, etc.).
3. For each scope area, reference playbook sections and derive atomic tickets; enrich with memory-derived insights (e.g., past incidents, feature flags).
4. Assign risk level and dependencies; ensure every ticket links to documentation, tests, and telemetry expectations.
5. Validate JSON structure and that every acceptance criterion maps to at least one test entry. Update the corresponding guard specification so it encodes those acceptance checks.
6. Store each ticket (with embeddings, summary, success metrics) via `store_memory` and update run queue.
7. Include escalation entry if prerequisites cannot be satisfied. When major epics lack human-facing coordination, recommend generating a companion task list via `automations/prompts/agents/task-creation.prompt.md` in the response notes.

## Handoff Guidance
- After emitting tickets, notify controller to persist results and proceed with `automations/prompts/orchestrations/run.prompt.md` step 1.
- For unresolved blockers, instruct the operator to revisit `automations/prompts/orchestrations/command.prompt.md` with intent `clarify` and include outstanding questions.
