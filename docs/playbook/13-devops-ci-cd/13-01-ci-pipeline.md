<!-- ai:managed start file="docs/playbook/13-devops-ci-cd/13-01-ci-pipeline.md" responsibility="docs" strategy="replace" -->
---
title: "CI Pipeline – Motion Mavericks Portal"
doc_path: "docs/playbook/13-devops-ci-cd/13-01-ci-pipeline.md"
doc_type: "devops"
status: "Draft"
version: "0.2.0"
owner: "Technical Lead"
reviewers: ["QA Engineer", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [ci, github-actions]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# CI Pipeline – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="devops"
     path="docs/playbook/13-devops-ci-cd/13-01-ci-pipeline.md"
     version="0.2.0"
     status="Draft"
     owner="Technical Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>ci, github-actions</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document outlines the continuous integration pipeline for Motion Mavericks’ production management portal. CI runs on GitHub Actions to validate Admin, Agency, and Guest facing changes through linting, testing, type checking, and security scans. It enforces quality gates before code reaches staging or production deployments.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal integrates TypeScript, Drizzle migrations, Playwright, and multiple third-party SDKs. Rapid iteration demands automated validation to catch regressions in share links, notifications, and asset flows. CI must remain efficient to support PR-based workflows while producing compliance evidence.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- GitHub Actions workflows triggered by pull requests, pushes to main, and scheduled jobs.
- Build, lint, type check, unit, integration, and end-to-end smoke testing.
- Security scanning (dependency, secret detection) and artefact management.
- Excludes production deployment (covered in 13-02).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Workflow overview
| Workflow | Trigger | Jobs |
|----------|---------|------|
| `ci-pr.yml` | PR to `main` | lint → type-check → unit-tests → integration-tests → e2e-smoke |
| `ci-main.yml` | Push to `main` | build → unit-tests → integration-tests → e2e-full → accessibility → performance-smoke |
| `scheduled-security.yml` | Daily cron | dependency-audit → secret-scan |
| `migration-verify.yml` | PR touching `drizzle` | migrate-test-db → rollback-check |

### Job details
- **Lint**: `pnpm lint` across app + packages; uses ESLint with TypeScript rules.
- **Type-check**: `pnpm typecheck` ensures Next.js + Drizzle types compile.
- **Unit-tests**: `pnpm test:unit --coverage`; uploads LCOV to Codecov.
- **Integration-tests**: Launch ephemeral Postgres via `neondb` action; run `pnpm test:integration`.
- **E2E-smoke/full**: Playwright headless, seeded data, recording traces for critical flows.
- **Accessibility**: `pnpm test:a11y` runs axe-playwright for key pages.
- **Performance-smoke**: k6 script hitting share link endpoint (3 min) to catch major regressions.
- **Security scans**: `pnpm audit`, `trivy fs`, GitGuardian secret scan.

### Infrastructure
- GitHub Actions runners with Node 20.
- Cache `~/.pnpm-store` using `actions/cache`. Key includes `pnpm-lock.yaml` hash.
- Use `.env.ci` with non-secret placeholders for tests; dynamic secrets fetched via GitHub secrets (Clerk test keys, Mux sandbox, Resend test key).
- Postgres action uses seeded SQL; ensure data residency not impacted (temporary data only).

### Artefacts and reporting
- Upload Playwright traces, videos, and k6 outputs to workflow artefacts (retained 14 days).
- Publish summary comment on PR via GitHub Action with coverage diff and failing tests.
- Integration with Slack (`#builds`) to notify of failures.

### Quality gates
- Required status checks: lint, type-check, unit-tests, integration-tests, e2e-smoke.
- Coverage threshold 80% enforced via Codecov, failing results block merge.
- Security workflow must pass within last 24 hours before release branch cut.

### Secrets management
- GitHub Actions secrets store retrieves from 1Password Connect; use short-lived tokens.
- Workflows mask sensitive output; logging sanitized.
- If secret rotation occurs, update GitHub secrets and 1Password simultaneously.

### Cost and optimisation
- Use concurrency group `ci-pr` to cancel superseded runs.
- Parallelise tests across matrix where feasible (unit, integration shards).
- Monitor runtime (<15 min per PR). Optimise by caching build outputs and using `next build --turbo` for type-check.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [05-02-development-tooling](../05-project-setup/05-02-development-tooling.md)
- [12-01-test-strategy](../12-testing-and-quality/12-01-test-strategy.md)
- [11-04-compliance-checklist](../11-security-and-compliance/11-04-compliance-checklist.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [13-02-cd-and-release-strategy](13-02-cd-and-release-strategy.md)
- [15-02-capacity-planning](../15-performance-and-reliability/15-02-capacity-planning.md)
- [14-04-alerting-and-response](../14-observability/14-04-alerting-and-response.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we migrate heavy Playwright suites to managed runners to reduce queue time?
- Do we integrate static analysis (SonarCloud) before onboarding additional agencies?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- GitHub Actions limits suffice for concurrent PRs during peak production cycles.
- Developers maintain `pnpm-lock.yaml` to ensure deterministic installs.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- `.github/workflows/*` drafts
- Legacy CI notes from Motion Mavericks monorepo
- GitHub Actions usage metrics dashboard
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
