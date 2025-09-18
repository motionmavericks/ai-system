# Repository Guidelines

## Project Structure & Module Organization
Top-level scripts and Node entry points live under `automations/`. Use `automations/scripts/` for executable `.mjs` tasks, `automations/memory/` for replay data, telemetry, and manifests, and `automations/docs/` for automation-specific references. Long-form strategy, research, and review material sits in `docs/` (notably `docs/playbook/` for reusable patterns). Repository-wide helpers such as `create_playbook.sh` and project metadata (`package.json`) stay in the root. Add new assets beside the feature they serve, keeping raw inputs in `automations/memory/` or `docs/resources/` as appropriate. Task plans for human coordination now live in `docs/tasks/tasks_*.md` and are authored by the Task Creation agent.

## Build, Test, and Development Commands
- `npm run automation:memory:check` – Dry-run validation of memory manifests; fails on schema drift.
- `npm run automation:memory:validate` – Same as above, but rewrites manifests to the canonical shape.
- `npm run automation:memory:compact` – Trims replay/session payloads while preserving ordering.
- `npm run automation:telemetry:collect` – Generates the latest telemetry snapshot in `automations/memory/telemetry/`.
- `npm run automation:orchestration:smoke` – Executes the orchestration smoke harness; run before pushing CI-critical changes.

## Coding Style & Naming Conventions
Use modern ES modules (`type: "module"`) with `import`/`export`. Prefer 2-space indentation, single quotes in code, and trailing commas in multi-line literals. Name files with hyphenated lowercase tokens (`memory-validate.mjs`) and exported symbols in `camelCase`. Keep scripts pure—log outputs via `console` only at orchestration edges and guard I/O with `try/catch` + informative errors. Run formatters or linters that ship with the feature before committing; align with any `.editorconfig` entries when present. For cross-agent coordination, reference task plans (`docs/tasks/tasks_*.md`) instead of duplicating ad-hoc checklists.

## Testing Guidelines
Treat smoke automation as the minimum gate. Extend `automations/scripts/orchestration-smoke.mjs` with focused checks when adding orchestration features, and keep fixtures under `automations/memory/replay/`. Tests should mirror the feature name (e.g., `feature-smoke.mjs`) and log actionable failure context. Aim for coverage of critical branches (load, recovery, guardrails) and document deviations in `automations/docs/`.

## Commit & Pull Request Guidelines
Follow the existing history pattern: concise, imperative subjects (`Refactor automation workspace...`). Include scope when relevant (`memory`, `docs`, `smoke`). Body text should explain rationale, not restate the diff. PRs must link related issues or specs, summarize risk/impact, note required follow-up scripts, and attach telemetry/smoke output snippets when behaviour changes. Request review from the automation maintainers roster and ensure CI smoke commands succeed locally first.

## Security & Configuration Tips
Do not commit credential material; store runtime secrets outside `automations/memory/` and redact session payloads before sharing. Telemetry exports may contain identifiers—scrub or aggregate before publishing. When integrating new services, document required environment variables in `automations/docs/guardrails.md` and gate network calls behind configuration flags.
