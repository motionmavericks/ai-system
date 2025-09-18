<!-- ai:managed start file="docs/playbook/19-post-launch/19-01-support-rotation.md" responsibility="docs" strategy="replace" -->
---
title: "Support Rotation – Motion Mavericks Portal"
doc_path: "docs/playbook/19-post-launch/19-01-support-rotation.md"
doc_type: "operations"
status: "Draft"
version: "0.2.0"
owner: "Client Success Lead"
reviewers: ["Reliability Partner", "Marketing Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [support, post-launch]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Support Rotation – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="operations"
     path="docs/playbook/19-post-launch/19-01-support-rotation.md"
     version="0.2.0"
     status="Draft"
     owner="Client Success Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>support, post-launch</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This rotation defines how Motion Mavericks provides post-launch support for the portal. It outlines coverage hours, staffing, hand-offs, escalation, and reporting to ensure agencies and clients receive timely assistance.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Post-launch, agencies will rely on the portal for active projects across Australian time zones. Support must cover Admin, Agency, and Guest queries while coordinating with reliability, marketing, and engineering teams. Rotation integrates with incident response (11-05) and support playbooks (16-03).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Support roster for Tier 1–3 teams, coverage hours, on-call expectations.
- Handover process, ticket queues, escalation to engineering.
- Reporting and continuous improvement plan.
- Excludes vendor support escalation (documented separately).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Coverage hours
| Region | Hours | Channel |
|--------|-------|---------|
| AEST (primary) | 07:00–20:00 Mon–Fri | Zendesk, Slack Connect, phone |
| After hours | 20:00–07:00 | PagerDuty on-call (Priority P0/P1) |
| Weekends | 09:00–15:00 | Email monitored, PagerDuty for urgent |

### Rotation schedule
| Week | Tier 1 (Client Success) | Tier 2 (QA/CS Lead) | Tier 3 (Reliability/Engineering) |
|------|-------------------------|---------------------|----------------------------------|
| 1 | Alex (CS) | Priya (CS Lead) | Sam (Reliability) |
| 2 | Jordan (CS) | Priya | Alice (Technical Lead) |
| 3 | Casey (CS) | Dan (QA) | Sam |
| 4 | Taylor (CS) | Priya | Alice |
- Rotation repeats monthly; update schedule quarterly.
- Provide backup for holidays at least 2 weeks in advance.

### Responsibilities
- **Tier 1**: Handle general queries, share link reissues, minor troubleshooting, escalate via Zendesk macro.
- **Tier 2**: Resolve complex issues, coordinate training, engage Tier 3 when technical intervention needed.
- **Tier 3**: Investigate platform issues, deploy fixes or initiate incidents.
- **On-call engineer**: Respond to PagerDuty within 15 minutes for P0/P1.

### Handover checklist
- Update Zendesk board with open tickets, priority, next steps.
- Share daily summary in `#support-handoff` channel (include metrics).
- Highlight ongoing incidents, feature flags, or known issues.
- Confirm monitoring status and any pending migrations.

### Tools
- Zendesk for ticket management.
- PagerDuty for critical alerts.
- Slack channels: `#support`, `#incidents`, `#portal-cutover` (during transition).
- Linear for engineering issue tracking.

### Escalation matrix
| Severity | Target response | Escalation path |
|----------|-----------------|-----------------|
| P0 | 15 min | Tier 3 on-call + Incident Commander |
| P1 | 30 min | Tier 3 on-call |
| P2 | 2 h | Tier 2, escalate to Tier 3 if unresolved 4 h |
| P3 | 4 h | Tier 1 with Tier 2 review |

### Reporting
- Daily summary (ticket count, SLA adherence, top issues) to leadership.
- Weekly report covering trends, product feedback, support time by agency.
- Monthly review aligning with analytics cadence (19-04) and roadmap (19-05).

### Continuous improvement
- Run rotational retrospective monthly; document learnings in 20-02.
- Update support playbooks (16-03) with new scripts.
- Feed product feedback into backlog via 19-03 workflow.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [16-03-support-playbooks](../16-documentation-and-training/16-03-support-playbooks.md)
- [19-02-bug-triage-and-sla](19-02-bug-triage-and-sla.md)
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [19-03-feedback-loop](19-03-feedback-loop.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
- [20-02-retrospectives](../20-archive-and-postmortems/20-02-retrospectives.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we need weekend on-call coverage from client success or rely solely on PagerDuty escalation?
- Should we expand rotation to include agency representatives for joint triage sessions?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Staffing levels adequate to maintain coverage without burnout.
- Support metrics tracked automatically within Zendesk.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Support staffing plan (2025)
- Zendesk SLA configuration notes
- Reliability operations schedule
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
