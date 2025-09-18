<!-- ai:managed start file="docs/playbook/06-data-model-and-storage/06-05-data-governance.md" responsibility="docs" strategy="replace" -->
---
title: "Data Governance – Motion Mavericks Portal"
doc_path: "docs/playbook/06-data-model-and-storage/06-05-data-governance.md"
doc_type: "policy"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Compliance Advisor", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [data, governance]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Data Governance – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="policy"
     path="docs/playbook/06-data-model-and-storage/06-05-data-governance.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>data, governance</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This policy defines how Motion Mavericks governs portal data, covering retention, privacy, DSAR handling, and logging minimisation. It aligns with Australian Privacy Principles and GDPR obligations, supporting audits and client trust. Governance ensures share links, notifications, and audit logs remain compliant.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal holds client names, emails, production assets, and commentary. Clients expect clear retention schedules, deletion processes, and transparency. Data governance integrates with backup, monitoring, and documentation to meet non-functional targets.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Applies to all data stored in Neon, Vercel Blob, Mux, Resend, Sentry, and analytics.
- Includes retention, DSAR workflow, minimisation, redaction, and access controls.
- Excludes finance/accounting systems managed separately.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Retention policy
| Data type | Retention | Disposal method | Owner |
|-----------|-----------|-----------------|-------|
| Audit logs | 365 days | Automatic purge via partition drop | Reliability partner |
| Share links | Active ≤14 days (extendable), records purged 90 days after expiry | Cron job deletes tokens, analytics aggregated | Security specialist |
| Notifications | 180 days | Cron job deletes read notifications older than retention | Platform engineer |
| Comments | Lifetime of project + 180 days archive | Soft delete then purge via job after retention | Owen |
| Assets | Latest version retained indefinitely unless removed by Admin; superseded versions archived after 90 days | Mux asset deletion script | Agency partner lead |
| Residency evidence | 5 years | Stored in encrypted bucket; manual purge with compliance sign-off | Compliance advisor |
| Backup exports | 30 days (weekly), 12 months (monthly compliance snapshot) | Automated deletion via lifecycle rules | Reliability partner |

### Privacy controls
- Minimal PII (email, name) stored; optional phone numbers avoided.
- Comments scrubbed with keyword filter to remove sensitive information before storage.
- Share link analytics store IP + user agent hashed with salt; accessible only to Admin.
- Data at rest encrypted by Neon/Mux; transmission forced over TLS.

### DSAR workflow
1. Request intake via support form; ticket flagged `DSAR`.
2. Compliance advisor verifies requester identity within 5 business days.
3. Export data via SQL scripts (users, audit logs, comments) and share link analytics; deliver encrypted export within 30 days.
4. For deletion requests, execute removal script: deactivate account, delete comments where permitted, revoke share links, remove notifications.
5. Log DSAR in `docs/playbook/11-security-and-compliance/_generated/dsar-log.md` with outcome and completion date.
6. Notify requester upon completion; escalate unresolved tasks.

### Logging and minimisation
- Structured logs avoid storing PII; IDs used instead of emails.
- Sentry configured with allowlist; breadcrumb data redacted.
- Analytics uses aggregated events (project_created, share_opened) without personal data beyond hashed user IDs.

### Access controls
- Only Admin and compliance advisor access residency evidence and DSAR exports.
- Role-based access enforced via RLS; support staff use support tooling with scoped permissions.
- Access reviews conducted quarterly.

### Compliance reporting
- Quarterly governance report summarises retention adherence, DSAR requests, and incidents.
- Stored in `docs/playbook/11-security-and-compliance/_generated/governance-report-<quarter>.md`.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
- [06-04-backup-and-restore](06-04-backup-and-restore.md)
- [20-01-postmortems-template](../20-archive-and-postmortems/20-01-postmortems-template.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [04-04-threat-model](../04-architecture-and-decisions/04-04-threat-model.md)
- [18-03-data-migration-runbook](../18-release-and-cutover/18-03-data-migration-runbook.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do any clients require longer audit log retention; if so, should we archive to cold storage rather than purge?
- Should share link analytics anonymisation adopt differential privacy techniques in future releases?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Agencies agree to retention timelines; contracts updated accordingly.
- DSAR volume remains manageable (<12 requests per year); revisit automation if exceeded.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Compliance advisor briefing (September 2025)
- GDPR and APP guidelines
- Client procurement questionnaires
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
