<!-- ai:managed start file="docs/playbook/05-project-setup/05-05-precommit-and-ci-conventions.md" responsibility="docs" strategy="replace" -->
---
title: "Pre-commit and CI Conventions – Motion Mavericks Portal"
doc_path: "docs/playbook/05-project-setup/05-05-precommit-and-ci-conventions.md"
doc_type: "process"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [ci, process]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Pre-commit and CI Conventions – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="process"
     path="docs/playbook/05-project-setup/05-05-precommit-and-ci-conventions.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>ci, process</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document describes Motion Mavericks portal pre-commit hooks and CI conventions. It ensures every change meets linting, testing, accessibility, residency, and documentation standards before merging. Automation reduces manual QA load while protecting availability and compliance targets.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
With a lean team and external contributors, automated checks catch regressions early. Hooks and CI pipelines align with the Definition of Done, covering unit tests, Playwright flows, and documentation updates. CI runs on GitHub Actions with caching via Turborepo.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes Husky-managed git hooks, lint-staged configuration, CI workflow stages, failure handling.
- Excludes detailed pipeline scripts (see 13-01-ci-pipeline).
- Assumes contributors have Node LTS and pnpm installed locally.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Pre-commit hooks (Husky + lint-staged)
1. `pre-commit` hook runs `pnpm lint-staged` with tasks:
   - ESLint on staged `.ts`, `.tsx` files.
   - Prettier format check on staged files.
   - Stylelint for CSS/Tailwind class ordering.
   - `tsc --noEmit` on staged TypeScript for quick type sanity.
   - `pnpm test:changed` executing Vitest on affected files using Git diff heuristics.
2. `commit-msg` hook enforces Conventional Commits (`type(scope): summary`).
3. `pre-push` hook (optional) runs `pnpm test` and `pnpm lint` if changes touch `apps/` directories.

### CI workflow stages (GitHub Actions)
1. **Setup**: checkout, pnpm install with cache, Turbo repo restore.
2. **Static analysis**: ESLint, Prettier check, Stylelint, TypeScript build.
3. **Unit tests**: Vitest with coverage threshold (lines ≥90% for touched files).
4. **Integration tests**: API tests hitting local Neon via Docker using migrations.
5. **E2E tests**: Playwright across Chrome and WebKit; traces stored 30 days.
6. **Accessibility**: Playwright + axe verifying critical flows.
7. **Performance smoke**: Lighthouse CI on key pages (dashboard, share link) verifying p95 budgets.
8. **Documentation check**: Ensures relevant markdown updated, required sections present using custom script.
9. **Deploy preview**: Vercel preview triggered on success (for non-draft PRs).

### Failure handling
- Any stage failure blocks merge; author must resolve before re-run.
- Flaky tests triaged within 24 hours; annotate with `@flaky` only after filing issue and applying temporary retries.
- Accessibility or performance regressions require design/development fix prior to merge; no waivers without Owen approval.

### Reporting and alerts
- GitHub PR summary comment aggregates key metrics (coverage, accessibility score).
- Failed main branch builds notify reliability partner via email and Sentry alert.
- Weekly CI health report summarises runtime, flake rate, queue length.

### Documentation enforcement
- `docs-check` script validates presence of Summary, Context, Scope, Details, References, Related, Open questions, Assumptions, Sources in modified docs.
- Pull requests updating functionality must reference corresponding playbook file in description.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [13-01-ci-pipeline](../13-devops-ci-cd/13-01-ci-pipeline.md)
- [02-05-definition-of-done](../02-requirements-and-scope/02-05-definition-of-done.md)
- [12-04-e2e-tests](../12-testing-and-quality/12-04-e2e-tests.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [05-02-coding-standards](05-02-coding-standards.md)
- [12-06-accessibility-tests](../12-testing-and-quality/12-06-accessibility-tests.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we gate merges on Lighthouse scores for all PRs or only for weekly monitoring?
- Do we require concurrency limits to avoid running duplicate pipelines on rapid pushes?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- GitHub Actions concurrency is sufficient for current workload; monitor as team grows.
- Contributors keep local Husky hooks enabled; bypass requires documented justification.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- CI pipeline design session (September 2025)
- Accessibility testing strategy
- Reliability partner recommendations on failure triage
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
