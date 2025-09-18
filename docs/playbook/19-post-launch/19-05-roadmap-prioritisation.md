<!-- ai:managed start file="docs/playbook/19-post-launch/19-05-roadmap-prioritisation.md" responsibility="docs" strategy="replace" -->
---
title: "Roadmap Prioritisation – Motion Mavericks Portal"
doc_path: "docs/playbook/19-post-launch/19-05-roadmap-prioritisation.md"
doc_type: "operations"
status: "Draft"
version: "0.2.0"
owner: "Product Manager"
reviewers: ["Owen (Founder)", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [roadmap, prioritisation]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Roadmap Prioritisation – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="operations"
     path="docs/playbook/19-post-launch/19-05-roadmap-prioritisation.md"
     version="0.2.0"
     status="Draft"
     owner="Product Manager">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>roadmap, prioritisation</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document outlines how Motion Mavericks prioritises portal roadmap initiatives. It balances customer feedback, analytics, reliability needs, compliance obligations, and commercial targets to deliver sustained value.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
After launch, feature demand will expand. Prioritisation ensures resources focus on improvements that strengthen production management scope—milestones, tasks, assets, notifications, share links, and compliance. The process interfaces with feedback loop (19-03), analytics (19-04), and reliability backlog (15-03).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Prioritisation rituals, scoring model, decision forum.
- Artefacts used to communicate roadmap updates.
- Excludes individual feature specifications (covered elsewhere).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Input sources
- Feedback backlog (19-03) with RICE scoring.
- Bug triage outcomes (19-02) requiring systemic fixes.
- Analytics trends highlighting drop-offs or growth (19-04).
- Reliability initiatives (15-03) and compliance mandates (11-04).
- GTM strategy (17-04) and pricing commitments (17-01).

### Prioritisation framework
- Use weighted scoring: Impact (30%), Reach (20%), Confidence (15%), Effort (15%), Strategic Alignment (20%).
- Strategic alignment weight emphasises data residency, RPO/RTO, share link adoption, and agency retention.
- Include constraint check: resource availability, vendor dependencies, compliance deadlines.

### Rituals
| Cadence | Meeting | Participants | Outcomes |
|---------|---------|--------------|----------|
| Bi-weekly | Roadmap triage | Product Manager, Technical Lead, Reliability Partner, Client Success Lead | Update scoring, adjust pipeline |
| Monthly | Roadmap council | Founder, Product Manager, Marketing Lead, Legal Counsel | Approve next sprint/quarter scope, review trade-offs |
| Quarterly | Strategy offsite | Leadership + key partners | Revisit vision, adjust long-term bets |

### Roadmap artefacts
- 3-tier roadmap (Now, Next, Later) in product board.
- Public summary for agencies with high-level themes.
- Internal detailed plan with swimlanes (Core workflows, Reliability, Compliance, GTM enablement).
- Change log entry for major roadmap adjustments.

### Communication
- Share updates via monthly newsletter, Slack, and agency briefings.
- Provide rationale for deprioritised items; track follow-up.
- Use feedback portal to announce status changes (accepted, planned, deferred).

### Governance
- Product Manager custodial owner; final approval by Founder.
- Document decisions with context and data points; store in roadmap decision log.
- Reassess scoring when new information emerges (incidents, compliance changes).

### Measuring success
- Roadmap throughput vs plan.
- Percent of roadmap driven by validated feedback vs internal ideas.
- Impact metrics: share link adoption, milestone completion time, asset delivery satisfaction, churn rate.
- Post-release reviews confirm objectives met; feed into retrospective.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [19-03-feedback-loop](19-03-feedback-loop.md)
- [19-04-analytics-review-cadence](19-04-analytics-review-cadence.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [17-01-pricing-and-packaging](../17-go-to-market-and-legal/17-01-pricing-and-packaging.md)
- [20-02-retrospectives](../20-archive-and-postmortems/20-02-retrospectives.md)
- [20-03-change-log](../20-archive-and-postmortems/20-03-change-log.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we invite agency representatives to quarterly roadmap reviews for direct input?
- Should we allocate fixed capacity for technical debt vs new features each sprint?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Product analytics accurate for measuring impact.
- Stakeholders commit to decision cadence and respect prioritisation outcomes.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Product operations framework
- Feedback backlog data (September 2025)
- Strategic brief (HighLevel.Final)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
