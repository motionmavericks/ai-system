<!-- ai:managed start file="docs/playbook/06-data-model-and-storage/06-03-seed-and-fixtures.md" responsibility="docs" strategy="replace" -->
---
title: "Seed and Fixtures – Motion Mavericks Portal"
doc_path: "docs/playbook/06-data-model-and-storage/06-03-seed-and-fixtures.md"
doc_type: "process"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Quality Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [seed, fixtures]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Seed and Fixtures – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="process"
     path="docs/playbook/06-data-model-and-storage/06-03-seed-and-fixtures.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>seed, fixtures</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This plan defines deterministic seed data and fixtures for Motion Mavericks portal development, testing, and demos. It includes admin, agency, and guest accounts, sample projects, milestones, tasks, assets, and share links. Seeds support Playwright tests, staging demos, and data migration dry-runs while protecting privacy.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Reliable fixtures accelerate testing and onboarding. Seeds must be deterministic, anonymised, and align with schema constraints, ensuring reproducible behaviour across environments. Staging seeds mimic production flows without exposing client-sensitive data.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Seed scripts, fixture data for tests, anonymisation approach, refresh cadence.
- Excludes production data migration (covered in 18-03) and backup restoration (06-04).
- Assumes Neon branching available for seeding.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Seed scripts
- `pnpm db:seed:dev` – seeds local/dev environment with deterministic data via `scripts/seed/dev.ts`.
- `pnpm db:seed:staging` – seeds staging with anonymised snapshot using CSV exports processed by `scripts/seed/staging.ts`.
- Seeds executed automatically post-migration in CI for dev preview; staging run triggered manually by release manager.

### Core fixture dataset
| Entity | Example data | Notes |
|--------|--------------|-------|
| Tenants | `motion-mavericks` (admin), `agency-mktg`, `agency-post` | Tenant IDs stable UUIDs seeded via `.env.seed` |
| Users | Admin Owen, Agency producers (Zara, Luca), Guest reviewers (Priya, Leo) | Emails use `@example.mav` domain |
| Projects | `MMV-001 Brand Launch`, `MMV-002 Product Teaser` | Include start/end dates, client names anonymised |
| Milestones | Discovery, Pre-production, Shoot, Post, Delivery | Sequence numbers ensure timeline ordering |
| Tasks | Script approval, Shot list finalisation, Rough cut review | Include due dates, statuses covering pending/completed |
| Assets | Test videos referencing fixture Mux asset IDs | Mux sandbox assets pre-uploaded; fallback JSON mock |
| Share links | Tokens generated deterministic hash seeds | Expiry set to 7 days for tests; analytics counters pre-populated |
| Comments | Sample agency/client feedback threads | Body text generic; metadata contains timestamps |
| Notifications | Due task reminder, share link opened, asset processing success | Supports in-app feed and email digests |

### Test accounts
- Admin: `owen.admin@example.mav` (Clerk dev account), passwordless.
- Agency: `zara.producer@example.mav`, `luca.editor@example.mav`.
- Guest: `priya.client@example.mav`, `leo.reviewer@example.mav` (for share link flows).
- Credentials stored in `.env.seed`; use Clerk dev API to create users when seeding dev/staging.

### Determinism and randomisation
- Seed uses Faker with fixed seed value `20250919` to ensure repeatable outputs.
- UUIDs generated via deterministic function `seededUuid(name)` to avoid churn.
- Date offsets relative to `Date.now()` to keep tasks timely (±7 days) for Playwright assertions.

### Anonymisation for staging
- Production snapshots sanitized via SQL script removing PII: replace emails, names, comments with pseudo data.
- Assets references replaced with watermark placeholder video stored in Mux sandbox.
- Share link tokens regenerated; analytics reset to zero.

### Refresh cadence
- Dev seeds run daily via CI to ensure clean state.
- Staging seeds refreshed weekly or before major demos.
- Documentation updated when schema changes require seed adjustments.

### Maintenance
- Seed scripts include type checks ensuring schema drift detected at compile time.
- Changes require PR review with QA sign-off; update Playwright fixtures as necessary.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [06-01-schema-design](06-01-schema-design.md)
- [12-04-e2e-tests](../12-testing-and-quality/12-04-e2e-tests.md)
- [18-03-data-migration-runbook](../18-release-and-cutover/18-03-data-migration-runbook.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [06-05-data-governance](06-05-data-governance.md)
- [03-02-journeys-and-flows](../03-ux-and-design/03-02-journeys-and-flows.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we automate anonymised snapshot generation using dbt or rely on manual SQL scripts?
- Do agencies require custom demo datasets beyond the default seeds for client presentations?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Mux sandbox assets remain available for test playback; monitor expiration.
- Clerk dev environment supports scripted user creation without manual confirmation.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- QA fixture planning workshop (September 2025)
- Data privacy advisor recommendations on anonymisation
- Legacy project spreadsheets used for baseline seeds
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
