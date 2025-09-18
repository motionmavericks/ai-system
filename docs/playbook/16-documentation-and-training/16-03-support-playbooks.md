<!-- ai:managed start file="docs/playbook/16-documentation-and-training/16-03-support-playbooks.md" responsibility="docs" strategy="replace" -->
---
title: "Support Playbooks – Motion Mavericks Portal"
doc_path: "docs/playbook/16-documentation-and-training/16-03-support-playbooks.md"
doc_type: "documentation"
status: "Draft"
version: "0.2.0"
owner: "Client Success Lead"
reviewers: ["Reliability Partner", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [support, playbooks]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Support Playbooks – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="documentation"
     path="docs/playbook/16-documentation-and-training/16-03-support-playbooks.md"
     version="0.2.0"
     status="Draft"
     owner="Client Success Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>support, playbooks</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Support playbooks provide tiered response procedures for the Motion Mavericks portal. They equip frontline and escalation teams to resolve login issues, share link problems, notification queries, and asset concerns while preserving privacy, residency, and RPO/RTO commitments.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Agencies and clients rely on timely support across Australian time zones. Support staff need consistent scripts, troubleshooting steps, and escalation paths that integrate with incident response (11-05) and reliability engineering (15-03). Playbooks must reflect Admin, Agency, and Guest permissions.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Support tier definitions, contact channels, response targets.
- Scripts and workflows for common issues (≥5 scenarios).
- Escalation and documentation requirements.
- Excludes non-portal support (e.g., billing), handled by separate teams.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Support tiers
| Tier | Role | Hours | Responsibilities |
|------|------|-------|------------------|
| Tier 0 | Knowledge base/self-service | 24/7 | Provide guides (16-05), status page, share link troubleshooting tips |
| Tier 1 | Client Success Associates | 08:00–20:00 AEST | Handle email/chat tickets, triage, resolve simple issues |
| Tier 2 | Client Success Lead + QA | On-call rotation | Manage complex issues, interface with engineering |
| Tier 3 | Reliability Partner / Technical Lead | On-call as per 19-01 | Resolve platform issues, coordinate incidents |
| Tier 4 | Vendors (Mux, Resend, Clerk) | As per SLAs | Escalate issues requiring provider intervention |

### Channels and tooling
- Primary: Zendesk queue (`support@motionmavericks.au`), Slack connect for agencies, phone hotline for critical events.
- Status page updates managed via `status.motionmavericks.au`.
- Ticket tags: `login`, `share-link`, `notification`, `asset`, `billing`, `security`.

### Response targets
| Severity | Definition | Initial response | Resolution target |
|----------|------------|------------------|-------------------|
| P0 | Portal unavailable, data breach | 15 min | 1 h (align with RTO) |
| P1 | Critical functionality impact (share links, asset upload) | 30 min | 4 h |
| P2 | High impact for single agency | 2 h | 1 business day |
| P3 | Low impact/general question | 4 h | 3 business days |

### Scenario playbooks

#### Login issues (magic link failed)
1. Verify status page for Clerk outage.
2. Confirm user email correct and invited to tenant.
3. Ask user to check spam, resend magic link.
4. If still failing, create manual login token via Clerk admin (expires 15 min).
5. If Clerk outage, escalate to Tier 2 for incident handling.
6. Document resolution and attach logs (redacted) to ticket.

#### Share link not working
1. Confirm token expiry; reissue link if expired.
2. Check if asset flagged private; adjust access if authorised by Admin.
3. Validate guest email matches share restrictions.
4. Review audit logs for suspicious activity; escalate to Security if abuse suspected.
5. Provide updated link and instructions; remind user of expiry window.

#### Notification missing
1. Check notification preferences for user/agency.
2. Verify Resend status; view bounce/suppression list.
3. Re-send notification via admin console; confirm delivery.
4. If Resend issue, escalate to Tier 2 and follow RB-05.
5. Record timeline and outcome in ticket.

#### Asset playback stuttering
1. Confirm user bandwidth and recommended browser.
2. Check Mux status; view asset metrics.
3. Provide lower-resolution link if available.
4. If widespread, escalate to Tier 3; update status page if needed.

#### Milestone updates not visible
1. Ensure agency user has correct role and tenant.
2. Clear client cache (Ctrl+Shift+R) or instruct to logout/login.
3. Check background job queue; escalate to reliability if delays.

### Escalation procedure
- Tier 1 escalates via Zendesk macro, tagging `needs_engineering`.
- Tier 2 escalates to on-call via PagerDuty if severity P1+.
- Maintain communication loop with client; provide updates at agreed interval.

### Documentation
- Each ticket must include: issue summary, steps taken, resolution, follow-up tasks, links to relevant docs.
- For P1+, create post-ticket summary referencing incident number.

### Training
- Quarterly refresher on share link security, privacy obligations, and accessible support responses.
- Mock support drills aligning with chaos experiments (15-05).

### Reporting
- Weekly support metrics: ticket volume, SLA adherence, top drivers, satisfaction score.
- Feed trends into roadmap prioritisation (19-05) and reliability backlog (15-03).
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
- [19-02-bug-triage-and-sla](../19-post-launch/19-02-bug-triage-and-sla.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [16-05-user-guides](16-05-user-guides.md)
- [18-05-launch-comms](../18-release-and-cutover/18-05-launch-comms.md)
- [20-02-retrospectives](../20-archive-and-postmortems/20-02-retrospectives.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we introduce chatbots to handle Tier 0 enquiries before handing off to humans?
- Do we need bilingual support coverage for agencies working in non-English markets?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Support team has access to necessary admin tools with audit logging.
- Agencies agree to defined SLAs and provide emergency contacts.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Client success operating handbook
- Zendesk ticket analysis (Q3 2025)
- Reliability + support workshops
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
