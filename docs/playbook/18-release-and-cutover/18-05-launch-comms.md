<!-- ai:managed start file="docs/playbook/18-release-and-cutover/18-05-launch-comms.md" responsibility="docs" strategy="replace" -->
---
title: "Launch Communications – Motion Mavericks Portal"
doc_path: "docs/playbook/18-release-and-cutover/18-05-launch-comms.md"
doc_type: "release"
status: "Draft"
version: "0.2.0"
owner: "Client Success Lead"
reviewers: ["Marketing Lead", "Legal Counsel"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [communications, launch]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Launch Communications – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="release"
     path="docs/playbook/18-release-and-cutover/18-05-launch-comms.md"
     version="0.2.0"
     status="Draft"
     owner="Client Success Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>communications, launch</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This plan outlines communications surrounding the Motion Mavericks portal launch. It includes messaging, timing, templates, and responsibilities for at least five audiences, ensuring consistent information, compliance, and support readiness.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Clear communication is essential to transition agencies and clients to the portal, set expectations, and highlight benefits. Messages must reference privacy/terms updates, emphasise AU residency, and align with marketing positioning (17-04) and release checklist (18-01).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Communication schedule, channel, owner, and template for agencies, clients, internal teams, vendors, and leadership.
- Post-launch updates and feedback loops.
- Excludes ongoing marketing campaigns beyond launch window.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Audience matrix
| Audience | Channel | Timing | Owner | Key message |
|----------|---------|--------|-------|-------------|
| Agency partners | Email + briefing webinar | T-7, T-2, T0 | Client Success Lead | Benefits of portal, training schedule, freeze window |
| Client stakeholders | Email + share link landing banner | T-2, T0 | Account Manager | Access instructions, privacy assurances, support contact |
| Internal Motion Mavericks team | Slack + town hall | T-5, T0 | Owen (Founder) | Launch goals, support expectations, success metrics |
| Vendors (Mux, Resend, Clerk, Neon) | Email | T-3 | Reliability Partner | Cutover timing, contact for issues |
| Leadership/Board | Executive report | T-1 | Owen (Founder) | Readiness summary, go/no-go confirmation |
| Support team | Zendesk channel | T-3, T0, T+1 | Client Success Lead | Scripts, SLA reminders |

### Communication templates (summaries)
- **Agency email (T-7)**: Outline timeline, training sessions (dates/links), portal benefits, freeze period, support contacts.
- **Agency reminder (T-2)**: Reinforce freeze, provide login instructions, link to Terms/Privacy updates, emphasise share link security.
- **Launch day message (T0)**: Announce portal availability, highlight new features, provide quick start guide (16-05), remind to log feedback.
- **Client email**: Provide updated share link instructions, emphasise that deliverables now accessible via portal, highlight data protection and support.
- **Internal Slack**: Celebrate milestone, share metrics dashboard link, set expectation for monitoring.
- **Vendor notice**: Provide read-only access to status page, request alert if they detect anomalies, share contact list.
- **Leadership report**: Summarise readiness checklist status, SLO metrics, risk assessment, fallback plan reference.

### Communication schedule
| Date | Activity |
|------|----------|
| T-10 | Internal briefing deck finalised |
| T-7 | Agency email, training invites sent |
| T-5 | Internal town hall |
| T-3 | Vendor notice, support script distribution |
| T-2 | Agency/client reminder |
| T0 | Launch announcement (all channels) |
| T+1 | Progress update shared with all audiences |
| T+3 | Feedback survey sent to agencies + clients |
| T+7 | Post-launch summary and next steps |

### Messaging pillars
- Unified workspace for milestones, tasks, assets, notifications, share links.
- Reliability commitments (99.9% availability, RPO/RTO targets).
- Privacy & data residency compliance.
- Support readiness (16-03) and training resources (16-04, 16-05).
- Roadmap transparency (19-05) for upcoming improvements.

### Feedback and tracking
- Centralise responses in CRM; tag theme (product, training, issues).
- Daily digest summarised for leadership.
- Update feedback loop doc (19-03) with insights.

### Risk mitigation
- Escalation protocol for negative feedback: immediate response within 2 hours, escalate to relevant team.
- Monitor open rates/click-through; resend to recipients who did not open critical comms.
- Provide alternative offline briefings for agencies unable to attend webinars.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [18-01-release-checklist](18-01-release-checklist.md)
- [17-04-marketing-launch-plan](../17-go-to-market-and-legal/17-04-marketing-launch-plan.md)
- [16-05-user-guides](../16-documentation-and-training/16-05-user-guides.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [18-02-cutover-plan](18-02-cutover-plan.md)
- [19-03-feedback-loop](../19-post-launch/19-03-feedback-loop.md)
- [20-03-change-log](../20-archive-and-postmortems/20-03-change-log.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we provide multilingual versions of launch communications for international clients?
- Do we schedule follow-up webinar series for clients beyond initial launch week?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Contact lists accurate and consented for communications.
- Marketing automation tools configured to track engagement.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Client success communication templates (2024)
- Marketing launch plan assets
- Support documentation
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
