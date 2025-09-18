<!-- ai:managed start file="docs/playbook/18-release-and-cutover/18-02-cutover-plan.md" responsibility="docs" strategy="replace" -->
---
title: "Cutover Plan – Motion Mavericks Portal"
doc_path: "docs/playbook/18-release-and-cutover/18-02-cutover-plan.md"
doc_type: "release"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [cutover, release]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Cutover Plan – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="release"
     path="docs/playbook/18-release-and-cutover/18-02-cutover-plan.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>cutover, release</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This cutover plan coordinates the transition from legacy workflows to the Motion Mavericks portal. It covers timeline, roles, activities, validation, and communication needed to move agency partners onto the new platform with minimal disruption.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Legacy tracking via spreadsheets and shared drives lacks auditability and is error-prone. Cutover must synchronise milestone/task data, assets, and share links while ensuring agencies and clients understand new workflows. The plan accounts for AU residency, RPO/RTO, and compliance requirements.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Cutover timeline from T-7 days to T+7 days.
- Tasks for engineering, reliability, client success, marketing, legal.
- Validation, communication, and rollback checkpoints.
- Excludes data migration scripts (see 18-03 for details).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Timeline overview
| Phase | Timing | Activities |
|-------|--------|------------|
| Preparation | T-7 to T-3 days | Finalise data migration dry run, complete training, confirm support coverage |
| Freeze | T-2 days | Freeze legacy spreadsheets; notify agencies | 
| Cutover day | T0 | Execute migration, enable portal access, run smoke tests |
| Stabilisation | T+1 to T+7 | Monitor metrics, run office hours, gather feedback |

### Roles
| Role | Responsibilities |
|------|------------------|
| Cutover lead (Reliability Partner) | Coordinate timeline, chairs stand-ups |
| Technical Lead | Owns deployment, migration execution |
| Client Success Lead | Communicates with agencies, runs training |
| Marketing Lead | Handles external comms |
| Security Specialist | Monitors compliance, handles access reviews |
| Legal Counsel | Confirms terms acceptance |

### Activities by phase
**Preparation (T-7 to T-3)**
- Run data migration rehearsal (18-03) with sample dataset.
- Validate share link token regeneration process.
- Prepare agency-specific onboarding packs (16-05).
- Ensure support runbooks (16-03) updated and staff briefed.
- Confirm marketing launch assets ready (17-04).
- Review compliance evidence for audit readiness (11-04).

**Freeze (T-2)**
- Announce freeze window to agencies (no updates in legacy spreadsheets).
- Export final data snapshot for audit.
- Enable heightened monitoring and set PagerDuty to cutover schedule.

**Cutover day (T0)**
1. 06:00 AEST: Pre-cutover stand-up to confirm readiness.
2. 06:30: Run final data migration scripts; verify record counts.
3. 07:00: Deploy release following 18-01 checklist.
4. 07:30: Generate share links for in-flight deliverables.
5. 08:00: Conduct smoke tests (Admin, Agency, Guest flows).
6. 08:30: Send agency go-live announcement (18-05).
7. 09:00+: Monitor dashboards, respond to support inquiries.

**Stabilisation (T+1 to T+7)**
- Daily stand-up for cutover status.
- Track support tickets; escalate issues promptly.
- Gather feedback via survey (17-04 timeline).
- Confirm data residency metrics, audit logs captured.
- Close cutover event after 7 days with retrospective.

### Validation checkpoints
- Data migration reconciliation: compare milestone/task counts vs legacy.
- Share link audit: sample 10 active links for correct expiry/access.
- Notification check: send test digest and confirm delivery to pilot agency.
- Accessibility spot check: ensure updated pages meet WCAG 2.2.

### Communication plan
- Pre-cutover email (T-7) outlining benefits, timeline, freeze schedule.
- Reminder (T-2) with support contacts.
- Launch day messages (T0) with login instructions and training schedule.
- Daily updates (T+1 to T+3) summarising progress and known issues.
- Retrospective summary shared with stakeholders at T+7.

### Readiness criteria
- All stakeholders trained and confirmed via checklist.
- Migration dry run success metrics met.
- Monitoring dashboards configured with cutover-specific panels.
- Rollback plan (18-04) validated.

### Post-cutover retrospective
- Meeting at T+7; assess successes, issues, metrics vs targets.
- Document learnings in retrospectives doc (20-02).
- Update runbooks, onboarding, and marketing materials as needed.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [18-01-release-checklist](18-01-release-checklist.md)
- [18-03-data-migration-runbook](18-03-data-migration-runbook.md)
- [18-04-rollback-plan](18-04-rollback-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [17-04-marketing-launch-plan](../17-go-to-market-and-legal/17-04-marketing-launch-plan.md)
- [16-04-onboarding](../16-documentation-and-training/16-04-onboarding.md)
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we require staggered cutover by agency to reduce risk, or can all move simultaneously?
- Should we maintain read-only access to legacy spreadsheets beyond T+7 for historical reference?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Agencies adhere to freeze and provide point contacts during cutover.
- Migration scripts tested and ready; data quality sufficient for automated load.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Cutover planning workshop notes
- Legacy process documentation
- Reliability operations handbook
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
