<!-- ai:managed start file="docs/playbook/19-post-launch/19-03-feedback-loop.md" responsibility="docs" strategy="replace" -->
---
title: "Feedback Loop – Motion Mavericks Portal"
doc_path: "docs/playbook/19-post-launch/19-03-feedback-loop.md"
doc_type: "operations"
status: "Draft"
version: "0.2.0"
owner: "Product Manager"
reviewers: ["Client Success Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [feedback, post-launch]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Feedback Loop – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="operations"
     path="docs/playbook/19-post-launch/19-03-feedback-loop.md"
     version="0.2.0"
     status="Draft"
     owner="Product Manager">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>feedback, post-launch</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This feedback loop defines how Motion Mavericks captures, triages, and acts on input from agencies, clients, and internal teams after portal launch. It ensures improvements align with production needs while respecting compliance, reliability, and roadmap priorities.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Agencies will provide ongoing feedback on milestones, tasks, assets, notifications, and share links. Structured collection prevents ad hoc requests from derailing roadmap focus. The loop integrates with bug triage (19-02), analytics (19-04), and prioritisation (19-05).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Feedback sources, cadence, tooling, and responsibilities.
- Categorisation, evaluation, and communication of outcomes.
- Excludes customer support ticket handling (see 16-03/19-01).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Sources & channels
| Source | Description | Owner | Frequency |
|--------|-------------|-------|-----------|
| Agency review calls | 30-min sessions per agency | Client Success Lead | Monthly |
| Portal feedback widget | In-app form capturing suggestions | Product Manager | Continuous |
| Support tickets (feature requests) | Tagged `feature-request` | Client Success Lead | Weekly review |
| Analytics insights | Dashboards highlighting drop-offs | Product Analyst | Bi-weekly |
| Internal retrospectives | Engineering/CS retro action items | Reliability Partner | Monthly |

### Submission workflow
1. Capture feedback in Linear project `Portal::Feedback` using template (source, description, persona, severity, effort estimate).
2. Auto-tag with categories: `milestones`, `tasks`, `assets`, `share-links`, `notifications`, `compliance`, `usability`.
3. Attach relevant data (screenshots, analytics snippet, ticket link).

### Evaluation cadence
- Weekly triage (Product + Client Success + Reliability) to classify items as `Bug`, `Enhancement`, `Idea`.
- Evaluate impact, reach, confidence, effort (RICE scoring) for roadmap consideration.
- Feed high priority items into roadmap board (19-05); update submitters on decision.

### Communication
- Send acknowledgement within 2 business days with reference ID.
- Monthly newsletter to agencies summarising top delivered improvements and upcoming focus areas.
- Maintain public changelog (20-03) for delivered features.

### Metrics
- Feedback volume by category.
- Response time (acknowledgement, decision).
- Improvement adoption (usage metrics post-release).
- Satisfaction scores from follow-up surveys.

### Tools
- Linear for tracking.
- Notion/Confluence for summary dashboards.
- Slack automation for new high-impact feedback.
- Loom for recording demos of new features responding to feedback.

### Governance
- Product Manager accountable for backlog hygiene.
- Leadership review quarterly to ensure alignment with strategic goals.
- Ensure privacy compliance when storing feedback (no sensitive client data in plain text).
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [19-05-roadmap-prioritisation](19-05-roadmap-prioritisation.md)
- [19-04-analytics-review-cadence](19-04-analytics-review-cadence.md)
- [16-03-support-playbooks](../16-documentation-and-training/16-03-support-playbooks.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [19-02-bug-triage-and-sla](19-02-bug-triage-and-sla.md)
- [20-02-retrospectives](../20-archive-and-postmortems/20-02-retrospectives.md)
- [17-04-marketing-launch-plan](../17-go-to-market-and-legal/17-04-marketing-launch-plan.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we create agency advisory council sessions separate from monthly check-ins?
- Do we provide external roadmap visibility to clients or keep internal only?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Agencies willing to provide structured feedback through designated channels.
- Feedback volume manageable with current staffing; revisit if volume >50 items/month.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Product discovery workshop notes
- Pilot feedback logs
- Customer success operations manual
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
