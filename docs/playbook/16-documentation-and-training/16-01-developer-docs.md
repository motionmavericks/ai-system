<!-- ai:managed start file="docs/playbook/16-documentation-and-training/16-01-developer-docs.md" responsibility="docs" strategy="replace" -->
---
title: "Developer Documentation – Motion Mavericks Portal"
doc_path: "docs/playbook/16-documentation-and-training/16-01-developer-docs.md"
doc_type: "documentation"
status: "Draft"
version: "0.2.0"
owner: "Technical Lead"
reviewers: ["QA Engineer", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [developer-docs, onboarding]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Developer Documentation – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="documentation"
     path="docs/playbook/16-documentation-and-training/16-01-developer-docs.md"
     version="0.2.0"
     status="Draft"
     owner="Technical Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>developer-docs, onboarding</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document equips developers with the information needed to work on the Motion Mavericks portal. It covers local setup, coding standards, testing commands, environment configuration, and gotchas related to milestones, tasks, assets, notifications, and share links. Content supports rapid onboarding and consistent delivery.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal uses Next.js 15 (App Router), TypeScript, Drizzle ORM, Neon, Upstash, Mux, Resend, and Clerk. Developers collaborate across Admin, Agency, and Guest features in a multi-tenant model. Strong documentation ensures features meet reliability, privacy, and residency targets while enabling quick iteration.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Local setup steps, environment bootstrapping, and common commands.
- Coding standards, project structure, and testing expectations.
- Troubleshooting tips and escalation paths.
- Excludes non-technical onboarding (see 16-04).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Local setup
1. Install prerequisites: Node 20, pnpm 9, Docker (for Neon local), ffmpeg (for asset testing).
2. Clone repo: `git clone git@github.com:maverick/ai-system.git`.
3. Install dependencies: `pnpm install` (uses pnpm workspace).
4. Fetch env vars: `pnpm env:pull --env dev` (auth via 1Password CLI, see 11-02).
5. Start services: `pnpm dev` (Next.js), `pnpm dev:api` if separate API server needed, `docker compose up neon redis` for local DB/cache.
6. Seed data: `pnpm db:seed` to create Admin, Agency, Guest fixtures with sample projects.

### Project structure highlights
```
/app
  /(dashboard)           # Admin/Agency dashboards
  /share/[token]          # Guest share link view
  /api/*                  # Route handlers (REST)
/lib                      # Domain logic, utilities
/services                 # Integrations (Mux, Resend, Clerk)
/components               # Reusable UI components
/drizzle                  # Schema + migrations
/tests                    # Unit, integration, e2e suites
```
- Multi-tenant enforcement lives in `lib/tenant` helpers; ensure usage in API + UI.
- Notification templates stored under `services/notifications/templates` (MJML).

### Running tests
- Unit: `pnpm test:unit`
- Integration: `pnpm test:integration`
- E2E (Playwright): `pnpm test:e2e`
- Accessibility: `pnpm test:a11y`
- Performance smoke: `pnpm test:perf:smoke`
- Coverage report: `pnpm coverage`

### Coding standards
- TypeScript strict mode; avoid `any` (require justification PR comment).
- Lint before commit: `pnpm lint` (ESLint + custom rules).
- Use `data-testid` in components for reliable E2E selectors.
- Follow accessibility guidelines (03-04) when introducing UI changes.
- Apply date/time functions via `luxon` configured for Australia/Sydney.

### Common tasks
- Create migration: `pnpm db:create-migration --name add_share_token_audit`
- Run migrations: `pnpm db:migrate`
- Generate API client types: `pnpm generate:api`
- Sync translations (if expanded): `pnpm i18n:sync`
- Update share link TTL default: update `services/share/config.ts` and tests.

### Troubleshooting
| Issue | Fix |
|-------|-----|
| `SSL` errors connecting to Neon | Ensure local certificates installed (`pnpm db:cert`), set `NEON_SSL=require` |
| Mux upload fails | Check `.env.dev` Mux credentials, ensure file size <500 MB for dev |
| Clerk magic link emails not arriving | Confirm MailHog running (`pnpm mailhog`), check spam |
| Playwright trace missing | Re-run with `DEBUG=pw:api pnpm test:e2e --trace on` |
| Share token mismatch | Clear Redis (`pnpm redis:flush`) and re-seed tokens |

### Escalation
- Reliability issues: Slack `#reliability`, open Linear ticket with severity.
- Legal/privacy questions: escalate to Security Specialist + Legal Counsel.
- Agency-specific bugs: inform Client Success Lead and log in support board.

### Documentation maintenance
- Update this doc when new dev tools added or workflows change.
- Cross-reference major changes in change log (20-03).
- Keep sample commands accurate; test quarterly.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [05-02-development-tooling](../05-project-setup/05-02-development-tooling.md)
- [12-01-test-strategy](../12-testing-and-quality/12-01-test-strategy.md)
- [11-02-secrets-management](../11-security-and-compliance/11-02-secrets-management.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [16-02-runbooks](16-02-runbooks.md)
- [16-04-onboarding](16-04-onboarding.md)
- [18-01-release-checklist](../18-release-and-cutover/18-01-release-checklist.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we need a dedicated internal package for common fixtures shared across tests to reduce duplication?
- Should we introduce automated lint checks for accessibility attributes in components?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Developers have 1Password access to retrieve environment variables.
- Local hardware handles running Next.js, database containers, and Playwright concurrently.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Repository README drafts
- Engineering onboarding sessions (September 2025)
- `package.json` scripts
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
