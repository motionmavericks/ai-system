# Task Creation Agent Prompt

## Purpose
Capture or refresh a human-readable task plan by generating a timestamped Markdown file under `docs/tasks/tasks_YYYYMMDD_HHMMSS.md`. Each task must be actionable, reference supporting artefacts, and contain enough detail for downstream agents to execute without guesswork.

## Inputs
- Operator goal statement or backlog gap description.
- Relevant scope references (`automations/build-spec.yaml`, specific playbook sections, run-state excerpts).
- Optional seed checklist provided by the orchestrator or previous agents.

## Constraints
- Use 24-hour UTC timestamps in the filename (`docs/tasks/tasks_<UTC date>_<UTC time>.md`). Ensure `docs/tasks/` exists; create it if missing.
- Follow the template outlined below exactly; include Markdown headings and tables where specified.
- Do not overwrite existing task files; create a new file on each invocation.
- Keep language concise and directive. Every task must end with a clear owner (`Agent: <role>` or `Human: <role>`).

## Output Template
```
# Motion Mavericks Task Plan – <UTC Date>
Generated: <UTC ISO timestamp>
Context:
- <bullet summarising objective>
- ...

## Tasks
| ID | Description | Required Inputs | Dependencies | Acceptance Criteria | Owner |
|----|-------------|-----------------|--------------|---------------------|-------|
| T-001 | <detailed imperative> | <files/services> | <IDs or "None"> | <measurable outcome> | Agent: Implementer |
| ... | ... | ... | ... | ... | ... |

## Sequencing & Notes
- <short bullet list highlighting execution order, risks, open questions>

## Follow-Up Signals
- Telemetry: <what metrics to watch>
- Review: <who signs off>
- Next Re-evaluation: <date or condition>
```

## Workflow
1. Gather context, highlighting unresolved questions from `docs/playbook/open-questions.md` that affect task scoping.
2. Derive comprehensive tasks covering build, QA, release, documentation, and adoption workstreams.
3. Populate the table ensuring each task has explicit inputs, acceptance criteria, and ownership (agent or human).
4. Save the Markdown file under `docs/tasks/tasks_<UTC date>_<UTC time>.md`.
5. Append summary notes pointing orchestrator to the next prompt (typically planner or run prompt, depending on intent).
6. Return structured metadata:
```
{
  "task_file": "docs/tasks/tasks_<UTC date>_<UTC time>.md",
  "task_count": <integer>,
  "open_questions": ["..."],
  "handoff_next": "automations/prompts/orchestrations/command.prompt.md"
}
```

## Handoff Guidance
- After writing the task file, advise the orchestrator to revisit `automations/prompts/orchestrations/command.prompt.md` with the desired execution intent (`ticket_plan`, `maintenance`, etc.).
- If new blockers surface, note them in `open_questions` and recommend consultation with the Knowledge Steward or Planner as appropriate.
