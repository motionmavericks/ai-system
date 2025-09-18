<!-- ai:managed start file="docs/playbook/16-documentation-and-training/16-02-runbooks.md" responsibility="docs" strategy="replace" -->
---
title: "Operational Runbooks – Motion Mavericks Portal"
doc_path: "docs/playbook/16-documentation-and-training/16-02-runbooks.md"
doc_type: "documentation"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [runbooks, operations]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Operational Runbooks – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="documentation"
     path="docs/playbook/16-documentation-and-training/16-02-runbooks.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>runbooks, operations</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This runbook library provides step-by-step guides for operating the Motion Mavericks portal. Tasks cover onboarding agencies, managing share links, responding to incidents, maintaining notifications, and coordinating disaster recovery. Each entry lists prerequisites, execution steps, validation, and rollback considerations.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Operational responsibilities span reliability, security, and client success teams. Consistent runbooks ensure compliance with AU residency, privacy, and RPO/RTO commitments while supporting Admin, Agency, and Guest experiences. Procedures align with incident response (11-05) and release planning (18-*).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- At least ten operational tasks with prerequisites, steps, validation, rollback.
- Covers onboarding, share link management, asset workflows, notifications, analytics, and DR drills.
- Excludes non-operational documentation (see 16-05 for user guidance).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Runbook index
| ID | Task | Owner |
|----|------|-------|
| RB-01 | Onboard new agency tenant | Client Success Lead |
| RB-02 | Provision guest access for major review | Admin Owen |
| RB-03 | Rotate share link signing key | Security Specialist |
| RB-04 | Revoke compromised share link | Reliability Partner |
| RB-05 | Investigate notification delivery failure | QA Engineer |
| RB-06 | Manage Mux asset upload backlog | Reliability Partner |
| RB-07 | Execute nightly backup verification | Reliability Partner |
| RB-08 | Restore Neon from backup | Technical Lead |
| RB-09 | Trigger digest resend after Resend outage | Client Success Lead |
| RB-10 | Update analytics dashboards post-release | Product Analyst |
| RB-11 | Conduct quarterly DR drill | Reliability Partner |
| RB-12 | Archive completed project data | Admin Owen |

### Sample runbook template
Each runbook follows structure: `Prerequisites`, `Steps`, `Validation`, `Rollback`, `Notes`.

#### RB-01 Onboard new agency tenant
- **Prerequisites**: Signed contract; agency domain verified; Clerk invite template approved; Legal review complete.
- **Steps**:
  1. Create agency record via `pnpm cli:agency create --name "Agency" --email ops@agency.au`.
  2. Configure tenant settings (timezone, branding) in admin console.
  3. Add agency users via Clerk bulk uploader (CSV). Assign `agency_producer` role.
  4. Create sample project with milestones/tasks for walkthrough.
  5. Send onboarding email linking to portal docs (16-05) and privacy notice (17-03).
  6. Schedule training session and record in CRM.
- **Validation**: Agency user logs in and views assigned project; share link generation works; notifications triggered.
- **Rollback**: Delete tenant and users if onboarding cancelled; purge sample data.
- **Notes**: Update capacity plan if agency load > forecast.

#### RB-03 Rotate share link signing key
- **Prerequisites**: Security approval; downtime window (5 minutes) communicated; new key generated.
- **Steps**:
  1. Generate key: `pnpm share:generate-key --output key.pem`.
  2. Store key in 1Password vault; update Vercel env var `SHARE_SIGNING_KEY` via Terraform.
  3. Deploy configuration change (staging, then production).
  4. Invalidate existing share tokens via `pnpm share:invalidate --older-than 12h`.
  5. Notify agencies of minor disruption; provide instructions if links expire early.
- **Validation**: New share links generated successfully; audit log records rotation event; tests pass.
- **Rollback**: Reapply previous key from vault; regenerate tokens; document incident.

#### RB-05 Investigate notification delivery failure
- **Prerequisites**: Alert from 14-04 triggered; access to Resend dashboard.
- **Steps**:
  1. Review Resend status page; note incidents.
  2. Query Neon `notification_events` for latest status codes.
  3. Check Resend suppression list for impacted recipients.
  4. Inspect queue metrics (14-05) for backlog.
  5. Retry failed notifications via `pnpm notifications:retry --status failed`.
  6. If Resend outage persists >30 min, trigger fallback provider per RB-09.
- **Validation**: Delivery rate returns to ≥98%; backlog cleared; share link reminders sent.
- **Rollback**: If fallback provider fails, pause notifications and notify stakeholders.

#### RB-08 Restore Neon from backup
- **Prerequisites**: DR event declared; latest backup available; approval from Incident Commander.
- **Steps**:
  1. Identify backup timestamp; run `neon backup restore` command to new branch.
  2. Update connection strings via IaC; deploy application pointing to restored branch.
  3. Run migrations ensuring schema current.
  4. Execute integrity checks (counts, audits, share link token validation).
  5. Bring app back online; monitor SLO metrics.
- **Validation**: Data matches expected counts; share links functional; notifications resume.
- **Rollback**: If restoration fails, attempt earlier backup; escalate to Neon support.

#### RB-11 Conduct quarterly DR drill
- **Prerequisites**: Drill schedule agreed; test data prepared; stakeholders notified.
- **Steps**:
  1. Choose scenario (Neon outage, Mux downtime, Resend failure).
  2. Execute relevant chaos experiment (15-05) in staging.
  3. Follow disaster recovery runbook (15-04) steps.
  4. Record timings, issues, improvements.
  5. Debrief with participants; capture action items.
- **Validation**: Recovery within RTO; documentation updated; lessons logged.
- **Rollback**: Revert environment to normal; confirm staging stable.

> Full runbook entries stored in `docs/runbooks/` with detailed commands and attachments.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
- [15-04-disaster-recovery](../15-performance-and-reliability/15-04-disaster-recovery.md)
- [18-01-release-checklist](../18-release-and-cutover/18-01-release-checklist.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [16-01-developer-docs](16-01-developer-docs.md)
- [16-03-support-playbooks](16-03-support-playbooks.md)
- [20-01-postmortems-template](../20-archive-and-postmortems/20-01-postmortems-template.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we convert runbooks into executable scripts (RunDeck) for repeatability?
- Do we need separate client-facing runbooks detailing communication steps during incidents?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Staff have necessary access rights (Clerk, Vercel, Neon, Mux, Resend).
- Staging environment closely mirrors production for rehearsal accuracy.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Ops working sessions (September 2025)
- Incident reports 2024–2025
- Vendor runbooks (Neon, Mux, Resend)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
