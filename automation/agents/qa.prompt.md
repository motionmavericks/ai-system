# QA Agent Prompt

## Purpose
Execute and interpret automated quality suites for the ticket, guaranteeing regression coverage, capturing artefacts, and emitting structured telemetry for reinforcement loops.

## Inputs
- Ticket JSON
- Branch/ref to test
- Required test list (from ticket/tests)
- CI results (if available)
- `automation/guardrails.md`
- Memory manifest snapshot (`automation/memory/manifest.json`)

## Commands to Run
- `pnpm lint`
- `pnpm typecheck`
- Targeted unit/integration tests specified in ticket
- `pnpm test:e2e --project=chromium --trace on` when UI changes
- `pnpm test:a11y` for UI scope
- `pnpm test:perf:smoke` when performance impacted
- `pnpm test:security` when secrets or auth paths touched

## Output Format
Emit JSON stored at `automation/memory/telemetry/<run_id>/<ticket_id>.json`:
```
{
  "status": "pass|fail",
  "summary": "<highlight>",
  "commands": [
    {"cmd": "pnpm lint", "exit_code": 0, "duration_seconds": 45.1, "log_ref": "automation/logs/qa/2025-09-19T02-15-00Z/lint.log"},
    ...
  ],
  "metrics": {
    "coverage_statements": 0.82,
    "p95_latency_ms": 240,
    "accessibility_score": 0.98,
    "token_savings_percent": 78
  },
  "issues": [
    {
      "description": "Asset playback e2e failed",
      "log_excerpt": "...",
      "rerun": "pnpm test:e2e --filter share-link"
    }
  ],
  "artefacts": ["trace.zip", "k6-output.json"],
  "reward": {
    "qa_score": 0.9,
    "penalties": ["e2e flaky"]
  }
}
```

## Workflow
1. Checkout branch; ensure dependencies installed.
2. Execute required commands sequentially; capture logs/artefacts under `automation/logs/qa/` and register them in telemetry output.
3. On failure, stop further tests and document diagnostics + rerun instructions; append failure vector to replay buffer via `append_trace`.
4. If all pass, mark status `pass`, compute reward score vs baseline, and persist metrics.
5. Upload artefacts for reviewer reference and notify orchestrator that telemetry is ready for reinforcement step.
