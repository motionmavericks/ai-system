<!-- ai:managed start file="docs/playbook/19-post-launch/19-04-analytics-review-cadence.md" responsibility="docs" strategy="replace" -->
---
title: "Analytics Review Cadence – Motion Mavericks Portal"
doc_path: "docs/playbook/19-post-launch/19-04-analytics-review-cadence.md"
doc_type: "operations"
status: "Draft"
version: "0.2.0"
owner: "Product Analyst"
reviewers: ["Technical Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [analytics, cadence]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Analytics Review Cadence – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="operations"
     path="docs/playbook/19-post-launch/19-04-analytics-review-cadence.md"
     version="0.2.0"
     status="Draft"
     owner="Product Analyst">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>analytics, cadence</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This cadence defines how Motion Mavericks reviews analytics to monitor portal performance, adoption, and reliability. It ensures insights inform support, product, and commercial decisions.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Post-launch data reveals how agencies and clients engage with milestones, tasks, assets, notifications, and share links. Regular review is required to maintain SLOs, track KPIs, and feed into roadmap prioritisation (19-05).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Analytics sources, dashboards, metrics, and meeting cadence.
- Responsibilities for data quality, interpretation, and follow-up.
- Excludes financial reporting (handled by Finance).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Data sources
- Grafana dashboards (14-05) covering SLOs and operational metrics.
- Product analytics (PostHog/Segment) tracking feature usage.
- Zendesk reports for support volume.
- CRM data for agency adoption and contract status.

### Metrics by review frequency
| Frequency | Metrics | Audience |
|-----------|---------|----------|
| Daily stand-up | Availability, latency, share link success, incident status | Reliability Partner, Technical Lead |
| Weekly review | Active projects, milestone completion rate, asset uploads, notification delivery, support ticket trends | Product, Client Success, Reliability |
| Monthly business review | Adoption per agency, share link engagement, NPS/CSAT, churn risk | Leadership, Marketing |
| Quarterly strategy | Non-functional performance, revenue vs target, roadmap impact, compliance audits | Executive, Board |

### Meeting structure
- Weekly analytics review (60 min). Agenda: metrics snapshot, variances, deep dives, action items.
- Monthly business review (90 min) combining analytics, support, feedback, GTM updates.
- Quarterly strategy workshop aligning metrics with roadmap and pricing.

### Responsibilities
| Role | Responsibilities |
|------|------------------|
| Product Analyst | Prepare dashboards, highlight anomalies, ensure data quality |
| Reliability Partner | Provide SLO context, incident summaries |
| Client Success Lead | Share customer sentiment, adoption insights |
| Marketing Lead | Report campaign performance, lead generation |
| Technical Lead | Discuss technical constraints, upcoming releases |

### Actions & tracking
- Use Linear project `Analytics::Insights` to track follow-up actions.
- Assign owner, due date, impact rating.
- Review action status each meeting; archive when completed.

### Data quality
- Validate instrumentation monthly; ensure events fire correctly.
- Maintain data dictionary describing metrics definitions and calculation logic.
- Align analytics with privacy commitments (minimise personal data, honour DSRs).

### Reporting templates
- Weekly dashboard PDF summarising key metrics with commentary.
- Monthly executive summary (two pages) with highlights, risks, opportunities.
- Quarterly presentation deck with trends, hypothesis, recommended roadmap adjustments.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [14-02-metrics-sli-slo](../14-observability/14-02-metrics-sli-slo.md)
- [19-05-roadmap-prioritisation](19-05-roadmap-prioritisation.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [19-03-feedback-loop](19-03-feedback-loop.md)
- [17-04-marketing-launch-plan](../17-go-to-market-and-legal/17-04-marketing-launch-plan.md)
- [20-02-retrospectives](../20-archive-and-postmortems/20-02-retrospectives.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we need real-time dashboards for agencies to view adoption metrics directly?
- Should we integrate financial metrics into monthly analytics review or keep separate?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Instrumentation capturing required events accurately.
- Stakeholders attend scheduled reviews or send delegate.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Analytics implementation plan
- SLO reporting template
- Marketing analytics reports
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
