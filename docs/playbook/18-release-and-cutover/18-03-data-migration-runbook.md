<!-- ai:managed start file="docs/playbook/18-release-and-cutover/18-03-data-migration-runbook.md" responsibility="docs" strategy="replace" -->
---
title: "Data Migration Runbook – Motion Mavericks Portal"
doc_path: "docs/playbook/18-release-and-cutover/18-03-data-migration-runbook.md"
doc_type: "release"
status: "Draft"
version: "0.2.0"
owner: "Technical Lead"
reviewers: ["Reliability Partner", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [data-migration, release]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Data Migration Runbook – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="release"
     path="docs/playbook/18-release-and-cutover/18-03-data-migration-runbook.md"
     version="0.2.0"
     status="Draft"
     owner="Technical Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>data-migration, release</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This runbook details the migration of existing production data into the Motion Mavericks portal. It covers data sources, mapping, execution steps, validation, and contingency plans to ensure milestones, tasks, assets, notifications, and share links are accurately recreated.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Legacy data resides in spreadsheets, shared drives, and email archives. Accurate migration is required for agencies to continue work without duplication. Process must maintain privacy, residency, and audit requirements while populating the new multi-tenant data model (06-*).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Migration of active and recently completed projects (last 12 months).
- Milestones, tasks, comments, assets metadata, share link history, notification preferences.
- Excludes raw asset files already stored in Mux (linked via metadata) and archived projects >12 months old.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Source inventory
| Source | Description | Format | Owner |
|--------|-------------|--------|-------|
| `projects_master.xlsx` | Project, milestone, task data | Excel | Project Operations |
| `share_links.csv` | Historical share link tokens | CSV | Client Success |
| `notifications_settings.csv` | Digest preferences | CSV | Client Success |
| `assets_manifest.csv` | Asset titles, file paths, Mux IDs | CSV | Reliability |
| `comments_export.json` | Threaded comments from legacy tool | JSON | Agency Producer |

### Data mapping
| Target table | Source fields | Transformations |
|--------------|--------------|----------------|
| `tenants` | Agency list from `projects_master.xlsx` | Normalise names, assign tenant IDs |
| `projects` | Project tab | Map statuses, convert dates to ISO, set timezone AU/Sydney |
| `milestones` | Milestone rows | Map to project IDs, convert status codes |
| `tasks` | Task rows | Map owners to user IDs, include due dates, statuses |
| `assets` | `assets_manifest.csv` | Link to Mux asset IDs, set storage location |
| `share_links` | `share_links.csv` | Re-issue tokens with new signing key, set expiry 14 days from cutover |
| `comments` | `comments_export.json` | Normalise markdown, attach to tasks/milestones |
| `notification_preferences` | `notifications_settings.csv` | Validate digest frequency, convert to enum |

### Execution steps
1. Prepare staging database snapshot; run migrations.
2. Convert spreadsheets to CSV using script `pnpm migrate:prepare`.
3. Run data quality checks (missing owners, invalid dates) and produce report.
4. Execute import script `pnpm migrate:import --env staging`.
5. Validate counts and sample records; adjust data as needed.
6. Repeat import for production during cutover (T0) with `--env prod`.
7. Generate share links via script; notify agencies about new URLs.

### Validation checklist
- Project counts match source (±0) per agency.
- Milestone statuses consistent and accurate.
- Share links accessible, audit logs created on test access.
- Notifications preferences appear in user settings.
- Comments associated correctly with tasks/milestones.
- Audit log entry records migration actions with actor `system`.

### Contingency plan
- If import fails: rollback database to pre-import snapshot; investigate error logs.
- If data incomplete: rerun script for affected tenants only.
- Share link mismatch: revert to legacy links temporarily and communicate to clients.

### Security & privacy
- Store intermediate files in encrypted S3 bucket with 7-day retention, access limited to migration team.
- Redact personal info not required (e.g., phone numbers) before import if outside scope.
- Document operations for compliance register.

### Tools & scripts
- `scripts/migration/transform.ts` (data cleaning)
- `scripts/migration/import.ts` (Drizzle + batch insert)
- `scripts/migration/validate.ts` (counts, sample diffs)
- Logging to console + file `migration.log` with timestamps.

### Team coordination
- Daily stand-up during migration week.
- Share progress via Slack `#portal-cutover` channel.
- Escalate blockers to Technical Lead immediately.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [06-01-drizzle-migrations](../06-data-model-and-storage/06-01-drizzle-migrations.md)
- [15-04-disaster-recovery](../15-performance-and-reliability/15-04-disaster-recovery.md)
- [18-02-cutover-plan](18-02-cutover-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [18-01-release-checklist](18-01-release-checklist.md)
- [18-04-rollback-plan](18-04-rollback-plan.md)
- [20-03-change-log](../20-archive-and-postmortems/20-03-change-log.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we migrate historical analytics events or recreate from raw data post-launch?
- Should we anonymise archived guest emails after migration to reduce privacy footprint?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Source data accurate and complete; agencies provide missing info ahead of cutover.
- Migration window sufficient (≤90 minutes) given dataset size.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Data inventory audit (01-04)
- Migration script repository
- Legacy process documentation
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
