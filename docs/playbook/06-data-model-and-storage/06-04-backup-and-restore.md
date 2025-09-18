<!-- ai:managed start file="docs/playbook/06-data-model-and-storage/06-04-backup-and-restore.md" responsibility="docs" strategy="replace" -->
---
title: "Backup and Restore – Motion Mavericks Portal"
doc_path: "docs/playbook/06-data-model-and-storage/06-04-backup-and-restore.md"
doc_type: "process"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Compliance Advisor"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [backup, restore]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Backup and Restore – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="process"
     path="docs/playbook/06-data-model-and-storage/06-04-backup-and-restore.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>backup, restore</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This runbook defines how Motion Mavericks meets RPO ≤24 hours and RTO ≤1 hour via Neon backups and restore drills. It covers schedule, storage, verification, and incident response for data recovery. Procedures ensure AU residency and compliance evidence.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal stores production-critical data. Loss would jeopardise milestone tracking and compliance. Neon Business tier provides automated backups and point-in-time recovery (PITR). Operational discipline ensures recoverability during incidents.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Backup schedule, storage location, restore process, verification, documentation.
- Excludes application-level retries (covered in reliability docs) and front-end caching.
- Assumes Neon Business features and access to Vercel + Mux for coordination.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Backup schedule
| Type | Frequency | Retention | Location |
|------|-----------|-----------|----------|
| Automated snapshot | Hourly | 7 days | Neon-managed (AU) |
| Daily full backup | Nightly at 02:00 AEST | 30 days | Neon cold storage (AU) |
| Weekly export | Sundays at 03:00 AEST | 12 weeks | Encrypted dump stored in Vercel-managed S3 AU bucket |
| Monthly compliance snapshot | First business day | 12 months | Encrypted, stored with residency evidence |

### Restore procedures
1. **Assessment**: Identify incident (data corruption, accidental delete, outage). Determine recovery point (<=24 h).
2. **Isolation**: Pause write traffic using feature flag or maintenance mode.
3. **PITR**: Use Neon Timeline to create branch at desired timestamp.
4. **Validation**: Run automated smoke tests against branch (Playwright + regression queries).
5. **Cutover**: Promote branch to production by updating connection string on Vercel and redeploying.
6. **Monitoring**: Verify SLO dashboards, ensure share link playback and notifications functioning.
7. **Post-restore**: Document incident, capture metrics, notify stakeholders.

### Restore drill cadence
- Quarterly planned drill executed by reliability partner.
- Sequence: simulate data corruption in staging, execute restore, measure RTO, document in `docs/playbook/15-performance-and-reliability/15-04-disaster-recovery.md`.
- Drills target completion ≤45 minutes to maintain 1-hour buffer.

### Verification steps
- Cross-check row counts for key tables (projects, tasks, assets) before reopening portal.
- Validate RLS policies remain intact after restore using `pnpm db:rls-check`.
- Confirm share link tokens still hashed and expiry dates intact.
- Ensure audit logs and residency evidence preserved (no data loss outside RPO window).

### Roles and responsibilities
- **Reliability partner**: Executes backups/restore drills, manages Neon operations.
- **Owen**: Approves production restores, handles communication with agencies/clients.
- **Security specialist**: Reviews audit logs post-incident.

### Documentation & evidence
- Backup logs stored under `docs/playbook/15-performance-and-reliability/_generated/backup-reports/`.
- Restore drill reports include start/end times, issues, follow-ups.
- Compliance snapshots recorded in `residency_evidence` table and referenced in `11-03-privacy-and-data-protection.md`.

### Integration with other systems
- Vercel redeploy triggered after restore to ensure connection strings updated.
- Mux assets unaffected; share link service resets analytics if rollback occurs beyond RPO.
- Notification service replays missed digests using job ledger to avoid duplicate emails.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [15-04-disaster-recovery](../15-observability-and-reliability/15-04-disaster-recovery.md)
- [04-04-threat-model](../04-architecture-and-decisions/04-04-threat-model.md)
- [06-05-data-governance](06-05-data-governance.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [20-01-postmortems-template](../20-archive-and-postmortems/20-01-postmortems-template.md)
- [18-04-rollback-plan](../18-release-and-cutover/18-04-rollback-plan.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we automate failover to a warm standby environment for high-severity incidents post-MVP?
- Do compliance auditors require third-party attestation of backup integrity?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Neon automated backups maintain AU residency; confirm quarterly via vendor reports.
- Portal downtime during restore acceptable if under 1 hour; communicate to clients.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Reliability partner backup workshop (September 2025)
- Neon Business tier documentation
- Compliance advisor guidance on retention and evidence
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
