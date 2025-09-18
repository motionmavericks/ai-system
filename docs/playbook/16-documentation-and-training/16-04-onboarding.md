<!-- ai:managed start file="docs/playbook/16-documentation-and-training/16-04-onboarding.md" responsibility="docs" strategy="replace" -->
---
title: "Onboarding Programme – Motion Mavericks Portal"
doc_path: "docs/playbook/16-documentation-and-training/16-04-onboarding.md"
doc_type: "documentation"
status: "Draft"
version: "0.2.0"
owner: "Technical Lead"
reviewers: ["Client Success Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [onboarding, training]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Onboarding Programme – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="documentation"
     path="docs/playbook/16-documentation-and-training/16-04-onboarding.md"
     version="0.2.0"
     status="Draft"
     owner="Technical Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>onboarding, training</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This onboarding programme guides new developers and agency contacts through their first 90 days with Motion Mavericks. It sets expectations, delivers training on milestones, tasks, assets, notifications, and share links, and ensures compliance with security, privacy, and residency requirements.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Rapid onboarding is essential to scale support for production management. The programme standardises training for internal engineers, client success staff, and agency producers. It ties into developer docs (16-01), support playbooks (16-03), and compliance obligations (11-*).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- 30/60/90-day plans for developers and agency contacts.
- Access matrix and checklists for required systems.
- Training sessions, resources, and evaluation criteria.
- Excludes HR onboarding (handled separately).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Access matrix
| Role | Systems | Access level | Approver |
|------|---------|--------------|----------|
| Developer | GitHub, Vercel, Neon (read/write), Mux sandbox, Resend sandbox, Slack | Contributor | Technical Lead |
| Reliability engineer | Above + PagerDuty, Grafana, Terraform Cloud | Maintainer | Reliability Partner |
| Client success | Portal admin tenant, Zendesk, Resend dashboard, analytics | User | Client Success Lead |
| Agency producer | Portal (agency tenant), knowledge base, Slack | Limited | Client Success Lead |
| Guest reviewer | Share link, knowledge base | View | Agency producer |

### Developer 30/60/90 plan
| Timeline | Focus | Objectives |
|----------|-------|------------|
| Day 0–30 | Foundations | Complete security/privacy training; set up local env; ship minor bug fix; run tests; shadow reliability stand-up |
| Day 31–60 | Feature delivery | Own user story involving milestones/tasks; add tests (unit + integration + E2E); document change; participate in release; join support shadow |
| Day 61–90 | Autonomy | Lead feature design review; run chaos experiment; contribute to runbook updates; mentor new hire |

### Agency 30/60/90 plan
| Timeline | Focus | Objectives |
|----------|-------|------------|
| Day 0–30 | Portal basics | Complete portal orientation; review sample project; generate share links; understand notification settings |
| Day 31–60 | Workflows | Import active project; upload assets; provide feedback to Motion Mavericks; attend compliance briefing |
| Day 61–90 | Optimisation | Configure reporting cadence; suggest improvements; align with support playbooks |

### Checklists
- **Pre-start**: laptop provisioned, accounts created, orientation scheduled, privacy agreement signed.
- **Day 1**: welcome session, portal walkthrough, security briefing, knowledge base access.
- **Week 2**: attend QA testing overview, join support watch, review compliance requirements.
- **Monthly**: evaluate progress via 1:1s, adjust objectives, gather feedback.

### Training sessions
1. Portal architecture and data residency (60 min).
2. Share link security and privacy implications (45 min).
3. Notifications and digest configuration (30 min).
4. Incident response simulation (60 min) with 11-05.
5. Accessibility best practices (45 min) referencing 12-06.

### Evaluation
- Managers complete onboarding scorecard at Day 30/60/90 verifying objectives.
- Capture skill gaps; schedule follow-up training.
- Document achievements in HR system and share in team meeting.

### Continuous improvement
- Survey new hires and agency contacts after 90 days.
- Update programme quarterly; incorporate feedback from retrospectives (20-02).
- Track onboarding completion metrics; aim for completion rate ≥95%.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [16-01-developer-docs](16-01-developer-docs.md)
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
- [16-03-support-playbooks](16-03-support-playbooks.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [19-01-support-rotation](../19-post-launch/19-01-support-rotation.md)
- [18-05-launch-comms](../18-release-and-cutover/18-05-launch-comms.md)
- [20-02-retrospectives](../20-archive-and-postmortems/20-02-retrospectives.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should onboarding include certification or badge for agency producers completing training?
- Do we need asynchronous training modules for contractors onboarding outside business hours?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- All onboarding participants can access required systems within first week.
- Training resources kept current by respective owners (Technical Lead, Client Success, Security).
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Motion Mavericks onboarding survey results (2024)
- Engineering training materials
- Client success orientation deck
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
