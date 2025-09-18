<!-- ai:managed start file="docs/playbook/19-post-launch/19-02-bug-triage-and-sla.md" responsibility="docs" strategy="replace" -->
---
title: "Bug Triage and SLA – Motion Mavericks Portal"
doc_path: "docs/playbook/19-post-launch/19-02-bug-triage-and-sla.md"
doc_type: "operations"
status: "Draft"
version: "0.2.0"
owner: "Technical Lead"
reviewers: ["Reliability Partner", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [triage, sla]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Bug Triage and SLA – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="operations"
     path="docs/playbook/19-post-launch/19-02-bug-triage-and-sla.md"
     version="0.2.0"
     status="Draft"
     owner="Technical Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>triage, sla</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document defines bug triage workflow and service level agreements (SLAs) for the Motion Mavericks portal. It ensures issues impacting milestones, tasks, assets, notifications, and share links are prioritised, resolved, and communicated efficiently.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Post-launch support requires predictable triage to maintain agency confidence and meet contractual commitments. The portal’s multi-tenant nature means bugs may affect specific agencies or all users. Workflow integrates with support rotation (19-01), incident response (11-05), and reliability backlog (15-03).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Triage process from intake to resolution.
- Severity definitions, SLA targets, ownership and communication.
- Tooling for tracking and reporting.
- Excludes feature requests (managed via roadmap prioritisation 19-05).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Severity matrix
| Severity | Definition | Examples | Initial response | Resolution SLA |
|----------|------------|----------|------------------|----------------|
| SEV0 | Critical outage/data breach | Portal down, share token leak | 15 min | 1 h |
| SEV1 | Major functionality loss | Asset upload failing for all users | 30 min | 4 h |
| SEV2 | Significant degradation | Notifications delayed, performance issues | 2 h | 1 business day |
| SEV3 | Minor issue, workaround available | UI bug, incorrect copy | 4 h | 5 business days |
| SEV4 | Cosmetic/low impact | Tooltip typo | 8 h | Next release |

### Intake and triage flow
1. Ticket created via Zendesk, Slack, or monitoring alert.
2. Tier 1 logs bug in Linear board `Portal::Bugs`, including reproduction steps, environment, severity recommendation.
3. Daily triage stand-up (Tier 2 + Technical Lead) confirms severity, assigns owner, sets SLA due date.
4. For SEV0/SEV1, invoke incident response (11-05) and follow rollback plan (18-04) if needed.
5. For lower severities, schedule fix in current sprint or backlog based on priority.

### SLA tracking
- Linear automation tracks due dates; escalates overdue items to Technical Lead.
- Weekly report summarises SLA adherence, average time to resolution, open items by severity.
- Post-mortem required for breached SLAs on SEV0/SEV1.

### Communication
- Tier 1 updates requestor every SLA interval with progress.
- For high severity, send broadcast updates to impacted agencies via email/Slack.
- Post-resolution note includes fix details, affected features, test evidence.

### Root cause analysis
- For SEV0/SEV1, complete RCA within 3 business days using template (20-01).
- Identify corrective actions (code, tests, documentation) and assign owners.
- Track actions until completed; review in reliability sync.

### Tooling
- Zendesk: intake, customer communication.
- Linear: bug tracking, status automation, dashboards.
- Grafana/Tempo: diagnostics.
- Confluence/Docs: RCA storage.

### Continuous improvement
- Monthly triage review; adjust severity definitions, SLA targets if necessary.
- Integrate bug learnings into tests (12-*) and runbooks (16-02).
- Maintain backlog health; avoid >30 open SEV3/SEV4 items.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [19-01-support-rotation](19-01-support-rotation.md)
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [19-03-feedback-loop](19-03-feedback-loop.md)
- [19-05-roadmap-prioritisation](19-05-roadmap-prioritisation.md)
- [20-01-postmortems-template](../20-archive-and-postmortems/20-01-postmortems-template.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we integrate automated customer notifications when high severity bugs resolved?
- Do we introduce bug bounties for agency partners identifying critical issues?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Support team accurately categorises severity; triage leads can adjust quickly.
- Tooling integrations between Zendesk and Linear remain stable.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Support SLA matrix (2025)
- Reliability meeting notes
- Incident retrospectives 2024
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
