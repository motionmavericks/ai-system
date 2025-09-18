# Automations Workspace

Consolidates the agent prompts, orchestration specs, memory assets, and supporting scripts used to run the Motion Mavericks automation stack.

## Layout

- `build-spec.yaml` – Source of truth for automation scope, guardrails, and required outputs.
- `docs/` – Reference material for agents and operators (guardrails, orchestration blueprint, CI bootstrap guide, dry-run report, memory backend notes).
- `prompts/` – Prompt templates grouped by responsibility.
  - `agents/` – Planner, Implementer, Reviewer, QA, Ops, Knowledge Steward prompts.
  - `orchestrations/` – Preflight, run, and postflight controller prompts.
- `memory/` – Hybrid fact store with manifest, index, telemetry, replay buffers, and session scratchpads.
- `scripts/` – Node utilities for validating/compacting memory and collecting telemetry.
- `samples/` – Example telemetry payloads used for dry runs and tooling smoke tests.

Automation-specific npm scripts live in the repository root `package.json` under the `automation:*` namespace and resolve into this workspace.

