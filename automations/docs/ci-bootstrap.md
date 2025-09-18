---
title: "CI/CD Bootstrap Plan"
status: "Draft"
owner: "Technical Lead"
last_updated: "2025-09-19"
---

# CI/CD Bootstrap Plan

Steps to take the playbook from documentation to an automated build pipeline that agents can execute.

## 1. Repository Scaffolding

1. Initialise monorepo structure:
   - `apps/web` (Next.js 15 portal)
   - `packages/db` (Drizzle schema, migrations)
   - `packages/api` (shared service logic)
   - `packages/config` (linting, formatting, tsconfig)
2. Add `pnpm` workspace with lockfile committed.
3. Seed `.nvmrc`, `.editorconfig`, `.prettierrc`, `.eslintrc.js` per `05-02`.
4. Create initial Drizzle schema stubs (`tenants`, `users`, `projects`, `milestones`).

## 2. GitHub Actions Skeleton

Create `.github/workflows/ci.yml` with jobs:

- `setup`: install pnpm, cache dependencies.
- `lint`: `pnpm lint`.
- `typecheck`: `pnpm typecheck`.
- `unit`: `pnpm test:unit --coverage`.
- `integration`: `pnpm test:integration` (Dockerised Neon).
- `e2e`: `pnpm test:e2e --project=chromium --trace on` (Playwright).
- `accessibility`: `pnpm test:a11y`.
- `performance`: `pnpm test:perf:smoke` (k6 via reusable action).
- `security`: `pnpm lint:security` (npm audit/trivy/gitguardian).
- `telemetry-package`: collate logs/artefacts into `automations/memory/telemetry/` and upload as build artefact.
- `memory-validate`: run `pnpm automation:memory:validate` to ensure index + manifest are consistent; block merge on failure.

Each job uploads artefacts to `actions/upload-artifact` for 14 days.

## 3. Secrets & Environment Setup

Store secrets in GitHub Actions (retrieved from 1Password/Vercel once available):

- `VERCEL_TOKEN`
- `NEON_CONNECTION_STRING_DEV`
- `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET`
- `RESEND_API_KEY`
- `CLERK_SECRET_KEY`
- `MEMORY_VECTOR_URL`, `MEMORY_VECTOR_API_KEY` (if external service)
- `MEMORY_GRAPH_URL`, `MEMORY_GRAPH_USER`, `MEMORY_GRAPH_PASSWORD`
- `MEMORY_REDIS_URL`, `MEMORY_REDIS_TOKEN`
- `DSPY_API_KEY` (for optimiser pipeline)

For local dev, provide `.env.example` and `pnpm env:pull` script referencing secret manager.

## 4. Testing Framework Configuration

- Add Vitest config shared across workspaces (`vitest.config.ts`).
- Configure Playwright project with fixtures for admin/agency/guest sessions.
- Provide k6 script templates under `tests/perf` with environment-driven targets.
- Add telemetry collector (`automations/scripts/collect-telemetry.mjs`) to normalise metrics into memory store friendly JSON.

## 5. Quality Gates

- Configure branch protection on `main`: require CI checks (`lint`, `typecheck`, `unit`, `integration`, `e2e`, `memory-validate`).
- Set Codecov (optional) or native coverage gating to 80% statement coverage for unit tests.
- Configure Danger/Reviewdog to enforce docs referencing relevant playbook sections in PR descriptions and verifying memory diff summary present.

## 6. Deploy Previews

- Add GitHub Action `deploy-preview.yml` triggered on PR ready for review:
  - Build Next.js 15 app.
  - Deploy to Vercel preview using `VERCEL_TOKEN`.
  - Comment preview URL, test commands, and link to deployment telemetry JSON in artefacts.

## 7. Release Pipeline

- Create manual workflow `release.yml` triggered with inputs (`version`, `notes`).
- Steps: run full CI, tag release, promote Vercel deployment, update change log, notify Slack.

## 8. Local Developer Support

- Provide makefile or `pnpm` scripts (`dev`, `dev:api`, `db:push`, `db:seed`).
- Expose memory utilities: `pnpm memory:query`, `pnpm memory:store`, `pnpm memory:compact`.
- Document in `automations/build-spec.yaml` + `16-01-developer-docs.md`.

## 9. Bootstrap Tasks for Agent

1. Generate repo skeleton from this plan.
2. Add minimal passing tests (e.g., health-check endpoint) to validate pipeline.
3. Instrument memory utilities (`automations/scripts/memory-validate.mjs`, `automations/scripts/collect-telemetry.mjs`).
4. Configure GitHub Actions secrets (manual step by human, once tokens ready).
5. Run CI to confirm baseline green before feature work, ensuring `memory-validate` job succeeds and telemetry artefact produced.

## 10. Reinforcement & Optimisation Pipeline

- Add workflow `reinforcement-train.yml` triggered nightly or on demand:
  - Download replay buffers from `automations/memory/replay/` artefacts.
  - Run DSPy optimiser (`pnpm dspy:optimise`) to refresh agent programs/prompts.
  - Update `automations/memory/manifest.json` with new programme hashes.
  - Publish optimisation summary to `automations/logs/optimiser/` and notify orchestrator.
- Gate merges if optimiser drifts beyond configured reward delta (fail job if reward dropped >10%).

Once these steps are complete, the autonomous agents can begin executing tickets defined in the orchestration blueprint.
