# Orchestration Preflight Prompt

## Purpose
Perform readiness checks before launching an autonomous build run with persistent memory and reinforcement loops.

## Checklist
1. Confirm `automation/build-spec.yaml`, `automation/guardrails.md`, and `automation/agent-orchestration.md` exist, are current, and reference the same memory schema version.
2. Ensure `docs/playbook/open-questions.md` has no blockers marked "critical".
3. Verify repository is clean (`git status --short` == empty) or stash changes.
4. Validate memory health: `automation/memory/manifest.json` present, index checksum matches, replay buffer writable, and free disk space ≥2 GB.
5. Confirm required secrets for CI/CD, telemetry sinks, and memory services (if external) are available (list from `automation/ci-bootstrap.md`).
6. Validate tooling versions: Node LTS (>=20.x), pnpm 9+, Next.js 15, Drizzle CLI, Playwright, k6, DSPy CLI installed.
7. Check connectivity to external services (Neon, Vercel, Clerk, Mux, Resend) and memory backends (vector DB/graph store) if integration tests require them.

## Output Format
```
{
  "ready": true|false,
  "checks": [
    {"item": "Clean git state", "status": "pass|fail", "notes": "..."},
    {"item": "Memory checksum", "status": "pass|fail", "notes": "..."},
    {"item": "DSPy optimiser cache", "status": "pass|fail", "notes": "..."},
    ...
  ],
  "blockers": ["..."],
  "warnings": ["..."]
}
```

## Instructions
- If any check fails, set `ready=false` and list blockers; do not proceed to main orchestration until resolved.
- When all checks pass, emit `ready=true` with timestamp and proceed to run orchestration prompt.
