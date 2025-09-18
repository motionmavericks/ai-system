---
title: "Automation Guardrails"
status: "Draft"
owner: "Reliability Partner"
last_updated: "2025-09-19"
---

# Automation Guardrails

Rules the autonomous agents must obey when generating code, running scripts, or modifying documentation.

## 1. Scope of Authority

- Allowed repositories: current workspace only. No external network fetches without explicit ticket instruction.
- Allowed directories for code edits:
  - `apps/` (frontend/backend runtime)
  - `packages/` (shared libraries, db, config)
  - `.github/workflows/`
  - `automations/` (state only)
  - `docs/` **inside AI-managed blocks**
- Forbidden directories: `.git/`, secrets, `node_modules/`, vendor caches, human-authored notes outside AI blocks.

## 2. Documentation Protocol

- All documentation changes must occur within existing `<!-- ai:managed start ... -->` blocks or via append-only files specifically created for automation (`automations/*`).
- After updating docs, run structural validation (section order, links).
- Update `docs/playbook/20-03-change-log.md` for each automation batch.
- Persist documentation-derived facts to memory store and refresh manifest checksum.

## 3. Secrets & Credentials

- Never print or hardcode API keys, passwords, or tokens. Use placeholders (`<PLACEHOLDER>`) and reference secrets manager integration steps.
- Environment variable names must match `05-03-environments-and-secrets.md`.
- Any rotation must be logged as per docs but not executed without human approval.

## 4. Testing & CI

- Before proposing a PR, run relevant tests listed in ticket (unit/integration/e2e/accessibility/perf).
- Capture logs; on failure, stop automation and escalate with report.
- Persist telemetry JSON for each command under `automations/memory/telemetry/`.
- Do not merge if any required GitHub Action fails or if `memory-validate` job reports drift.

## 5. Database & Migrations

- Every schema change requires a Drizzle migration plus accompanying tests.
- Migration rollback (down script or compensating plan) mandatory.
- Never drop production data columns without archival/backfill ticket approved by human.

## 6. Feature Flags

- All new user-facing functionality must be wrapped in LaunchDarkly flag or equivalent with default OFF for production until release checklist complete.
- Document flag in `automations/build-spec.yaml` and relevant docs.

## 7. Release Safety

- Releases must follow `18-01-release-checklist.md`; automation cannot bypass sign-off.
- Rollback operations permitted only when triggered by SEV0/SEV1 incident ticket.
- Change log must reference release ID and ticket IDs.

## 8. Logging & Telemetry

- Ensure new endpoints emit structured logs with `request_id`, `tenant_id`, `role`.
- New metrics/traces must follow naming conventions defined in `14-02` and `14-03`.
- Telemetry must also be written to memory replay buffer with reward score for reinforcement loop.

## 9. Security & Compliance

- Run static analysis/secrets scan on each PR.
- Any changes impacting privacy (data collection, share link behaviour) must notify Legal via ticket comment.
- Guest-accessible pages must remain read-only; automation should add tests to enforce access control.

## 10. Memory & Learning Integrity

- Maintain `automations/memory/manifest.json` (checksum, schema version). Any mutation must update checksum using approved script.
- Never delete memory entries without logging retirement reason and cross-referencing change log.
- Experience replay files must follow JSON schema defined in `automations/memory/README.md` (to be generated) and stay under 5 MB per ticket.
- Reward updates must be numeric (0–1) and accompanied by rationale.

## 11. Human Escalation Triggers

Automation must pause and request review when:

1. Requirements conflict or documentation ambiguity detected.
2. Ticket scope affects external systems (billing, contracts) not modelled in build spec.
3. Changes introduce irreversible data operations or require manual vendor tasks.
4. Security/compliance actions require legal review.

## 12. Audit Trail

- Log every command executed (`automations/logs/<agent>/<timestamp>.log`).
- Include ticket ID, git branch, test summary, and resulting commit hash.
- Store logs for minimum 90 days for compliance audit.
- Link audit log entries to corresponding memory trace IDs for traceability.

Adhering to these guardrails is mandatory for fully autonomous operation.
