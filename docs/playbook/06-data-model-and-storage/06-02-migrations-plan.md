<!-- ai:managed start file="docs/playbook/06-data-model-and-storage/06-02-migrations-plan.md" responsibility="docs" strategy="replace" -->
---
title: "Migrations Plan – Motion Mavericks Portal"
doc_path: "docs/playbook/06-data-model-and-storage/06-02-migrations-plan.md"
doc_type: "process"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [migrations, db]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Migrations Plan – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="process"
     path="docs/playbook/06-data-model-and-storage/06-02-migrations-plan.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>migrations, db</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This plan governs database migrations using Drizzle ORM for the Motion Mavericks portal. It defines procedures for authoring, reviewing, applying, and rolling back schema changes across dev, staging, and production environments. The plan ensures residency, RPO/RTO, and audit requirements remain intact.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Neon PostgreSQL powers the portal. Schema evolution must maintain tenant isolation (RLS), uptime (99.9%), and backup integrity. Drizzle migrations provide type-safe generation and allow code review of SQL changes.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Covers migration tooling, workflow, approval, verification, rollback, and RLS integration.
- Excludes seed data automation (see 06-03) and backup execution (06-04).
- Assumes Neon Business tier with branching support.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Tooling
- Drizzle ORM + `drizzle-kit` for migration generation.
- Migrations stored in `drizzle/migrations/` with timestamped filenames `YYYYMMDDHHMM_description.ts`.
- `pnpm db:generate` creates SQL diff; `pnpm db:migrate` applies to target environment.
- `pnpm db:deploy` runs in CI for staging/production with `--config drizzle.config.ts`.

### Workflow
1. Developer updates schema definitions in `packages/api-contracts` and `drizzle/schema.ts`.
2. Run `pnpm db:generate` to create migration file; inspect generated SQL, adjust as needed.
3. Add corresponding down migration ensuring reversibility (drop columns/tables carefully).
4. Run `pnpm db:migrate --env=dev` locally to ensure success; record output in PR.
5. Update tests/seeds to reflect schema change; run `pnpm test`.
6. Submit PR with migration file, updated schema, documentation references.
7. Reviewer validates SQL, RLS rules, and data backfill scripts if required.

### Promotion strategy
- Dev: auto-applied on merge via GitHub Action `db-migrate-dev`.
- Staging: manual workflow triggered by release manager after review; runs migrations and seeds anonymised data.
- Production: manual workflow requiring approvals from Owen + reliability partner; runs migrations during scheduled window (off-peak AEST) with monitoring.

### RLS handling
- Migration adding new tables must include RLS policies in same migration to avoid unsecured windows.
- For existing tables, update policies via `ALTER POLICY`; ensure down migration restores previous state.
- RLS execution plan verified using `SET app.tenant_id` tests in `pnpm db:rls-check` script.

### Data backfills
- When adding non-null columns, use multi-step migrations: add column nullable → backfill via script or default → set NOT NULL.
- For large backfills, use asynchronous job recorded in `job_runs` table; ensure monitoring.

### Verification
- After staging migration, run smoke tests (API, Playwright) plus `pnpm db:verify` which checks for missing indexes/constraints.
- Production migration monitored via Sentry breadcrumbs + Neon metrics. If anomalies detected, trigger rollback plan.

### Rollback
- Down migration available for immediate rollback; run `pnpm db:rollback --steps=1` if issue detected.
- If data transformation irreversible, create companion recovery script and document in migration comment.

### Audit trail
- Migration workflow logs outputs to GitHub Actions artifacts.
- Migration approvals recorded via GitHub review; reference issue for compliance.
- `drizzle/meta/_journal.json` tracked to ensure consistent ordering.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [06-01-schema-design](06-01-schema-design.md)
- [06-04-backup-and-restore](06-04-backup-and-restore.md)
- [13-01-ci-pipeline](../13-devops-ci-cd/13-01-ci-pipeline.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [06-03-seed-and-fixtures](06-03-seed-and-fixtures.md)
- [15-04-disaster-recovery](../15-observability-and-reliability/15-04-disaster-recovery.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we require zero-downtime strategies (e.g., trigger-based dual writes) for future major changes?
- Should we adopt automated diff tooling (Atlas, Supabase diff) to complement Drizzle generation?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Neon branching allows dry-run of migrations before staging/production.
- Development team maintains migration discipline; no schema changes merged without migrations.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Drizzle ORM documentation
- Neon migration best practices
- Reliability partner database review
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
