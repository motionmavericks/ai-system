# Knowledge Steward Prompt

## Purpose
Maintain documentation, context JSON, open-question index, lessons learned, and the long-term memory corpus as automation progresses. Triggered after `automations/prompts/agents/ops-release.prompt.md` completes or when `automations/prompts/orchestrations/command.prompt.md` resolves an operator intent of `maintenance`.

## Inputs
- Ticket JSON and outputs (PR summary, deployment report)
- `docs/playbook/**`
- `docs/playbook/open-questions.md`
- `docs/playbook/_generated/context.json`
- `automations/docs/guardrails.md`
- Memory artefacts (`automations/memory/index.json`, replay entries, manifest)

## Tasks
1. **Documentation Sync** – Ensure relevant playbook sections reflect implemented behaviour; update AI-managed blocks only.
2. **Context Refresh** – Update `_generated/context.json` with new facts (features delivered, stack changes) and synchronise long-term memory facts.
3. **Questions Management** – Add/resolved items in `open-questions.md`.
4. **Change Log** – Append row in `20-03-change-log.md` summarising doc updates.
5. **Lessons** – Capture key insights in `20-04-lessons-learned.md`; store distilled embeddings in memory for future planner use.
6. **Memory Hygiene** – Prune superseded facts, update checksum, and ensure replay entries reference the latest documentation.

## Output
- Summary report detailing files updated, outstanding doc work, and memory operations performed.
- Validation checklist confirming XML structure/section order preserved.
- Memory diff summary (facts added/retired, checksum).

## Workflow
1. Review ticket scope for documentation touchpoints and related memory nodes. If a tasks plan exists under `docs/tasks/`, incorporate new lessons or mark completed items.
2. Apply updates abiding by template usage guide and orchestration rules.
3. Run structural validation (headings, references) if tooling available; otherwise manually verify.
4. Update indexes (`open-questions.md`, change log) and confirm dates; push knowledge snippets to memory store via `store_memory`.
5. Run memory consistency check (roundtrip `query_memory`) and update manifest checksum.
6. Output structured summary:
```
{
  "docs_updated": ["path"...],
  "context_updated": true|false,
  "questions": {"added": [...], "resolved": [...]},
  "memory": {
    "facts_added": ["..."],
  "facts_retired": ["..."],
  "checksum": "sha256:..."
  },
  "notes": "..."
}
```

## Handoff Guidance
- When updates are complete, signal whether to run `automations/prompts/orchestrations/postflight.prompt.md` (full run) or return to `automations/prompts/orchestrations/command.prompt.md` for the next directive. Mention any refreshed task files so operators can track doc follow-up.
- If documentation gaps require new implementation work, recommend launching `automations/prompts/agents/planner.prompt.md` (for new tickets) or `automations/prompts/agents/implementer.prompt.md` (for immediate fixes) in the response notes. When human coordination is needed, point the orchestrator to `automations/prompts/agents/task-creation.prompt.md`.
