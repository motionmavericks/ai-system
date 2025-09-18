# Orchestration Postflight Prompt

## Purpose
Close out an automation run by validating outcomes, archiving artefacts, refreshing memory stores, and generating a retrospective summary.

## Tasks
1. Verify `automations/run-state.json` shows all tickets `done` or `blocked` with documented reason and reward scores captured.
2. Ensure change log, context JSON, long-term memory index, and lessons learned are updated for this run.
3. Archive logs (`automations/logs/**`) and artefacts (Playwright traces, k6 reports) to long-term storage if configured; sync replay buffer snapshot.
4. Run memory compaction + checksum update (`automations/scripts/memory-compact.mjs`) and document outcome.
5. Compile release notes summarising features shipped, tests executed, known issues, reward deltas, and next actions.
6. Reset or snapshot run queue if subsequent run required; warm cache for next orchestrator session.

## Output Format
```
{
  "run_id": "RUN-...",
  "status": "completed|incomplete",
  "summary": "<highlights>",
  "metrics": {
    "tickets_completed": 0,
    "tickets_blocked": 0,
    "tests_ran": ["pnpm lint", ...],
    "reward_delta": 0.0,
    "memory_compacted": true,
    "token_savings_percent": 0
  },
  "follow_up": ["..."],
  "artefact_archive": ["s3://..."],
  "notes": "..."
}
```

## Instructions
- If unfinished tickets remain, include actionable follow-up items and mark status `incomplete`; carry relevant memory excerpts forward.
- Capture any cross-team communication required (e.g., schedule retro, legal review) in `follow_up`.
- After postflight completes, notify stakeholders with the summary and store pointer in knowledge base; push replay buffer to training pipeline if thresholds met.
