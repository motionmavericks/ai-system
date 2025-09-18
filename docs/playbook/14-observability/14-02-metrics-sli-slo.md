<!-- ai:managed start file="docs/playbook/14-observability/14-02-metrics-sli-slo.md" responsibility="docs" strategy="replace" -->
---
title: "Metrics, SLIs and SLOs – Motion Mavericks Portal"
doc_path: "docs/playbook/14-observability/14-02-metrics-sli-slo.md"
doc_type: "observability"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [metrics, slo]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Metrics, SLIs and SLOs – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="observability"
     path="docs/playbook/14-observability/14-02-metrics-sli-slo.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>metrics, slo</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document defines Motion Mavericks’ service level indicators (SLIs) and objectives (SLOs). Metrics track the health of milestone management, asset delivery, notifications, and share links for Admin, Agency, and Guest users. Targets align with contractual commitments including 99.9% availability, AU-first performance, and rapid recovery.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal combines serverless APIs, Neon database, Mux streaming, and Resend notifications. Monitoring must provide business-level insight and operational guardrails. SLOs feed into reliability engineering (15-03) and release gating (13-02, 18-01).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- SLIs/SLOs for API availability, response time, asset performance, notification throughput, and data integrity.
- Error budgets, alert thresholds, and reporting cadence.
- Excludes purely financial KPIs (handled by business analytics).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Service level table
| SLI | Definition | Target SLO | Measurement | Alert threshold |
|-----|------------|------------|-------------|-----------------|
| API availability | Successful responses / total for core endpoints | 99.9% monthly | Vercel function metrics | Alert at 99.7% |
| API latency | p95 latency for `/api/projects`, `/api/share` | ≤300 ms | Vercel, Datadog | Alert at 320 ms |
| Share link success | Successful guest views / attempts | ≥99% | Synthetic checks + audit logs | Alert at 98% |
| Asset playback start | Time-to-first-frame for Mux streams | ≤3 s (p95) | Mux QoE metrics | Alert at 3.5 s |
| Notification delivery | Emails delivered within 5 min | ≥98% | Resend events | Alert at 95% |
| Data freshness | Background sync delivering milestone updates to analytics | within 15 min | Cron job metrics | Alert if >20 min |
| Backup success | Nightly backup completion | 100% | Neon logs | Alert on any failure |
| Error rate | 5xx responses per minute | <0.5% | Vercel logs | Alert at 1% |
| Accessibility health | Automated checks passing in CI | 100% | Playwright axe suite | Alert on any failure |

### Error budgets
- Availability: 0.1% monthly (~43 min). Breach triggers release freeze and reliability review.
- Latency: 5% of requests may exceed target; track via percentiles. Breach triggers performance war-room.
- Share links: 1% budget; consuming >50% in a week requires investigation.

### Reporting cadence
- Weekly SLO report summarised on `#reliability` channel.
- Monthly stakeholder review with Owen, Client Success, Agency Partner lead.
- Quarterly business review aligns SLO trends with roadmap decisions.

### Instrumentation requirements
- All API endpoints instrumented with OpenTelemetry to emit latency and status metrics.
- Synthetic monitors (k6, Playwright) feed share link success and asset checks.
- Notification metrics derived from Resend events stored in analytics warehouse.

### Remediation workflow
1. Detect SLO breach via alert or report.
2. Reliability Partner assigns owner and opens Linear ticket.
3. Evaluate error budget impact and decide if release freeze needed.
4. Document remediation plan, timeline, and validation steps.
5. Update change log and share lessons in retrospective (20-02).

### Dashboards
- Primary dashboards in Grafana (14-05) segmented by tenant and region.
- Include toggles for Admin, Agency, Guest experiences.
- Display RPO/RTO readiness metrics (backup status, recovery drill results).
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
- [13-01-ci-pipeline](../13-devops-ci-cd/13-01-ci-pipeline.md)
- [12-05-performance-tests](../12-testing-and-quality/12-05-performance-tests.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [14-04-alerting](14-04-alerting.md)
- [18-01-release-checklist](../18-release-and-cutover/18-01-release-checklist.md)
- [19-04-analytics-review-cadence](../19-post-launch/19-04-analytics-review-cadence.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we expand SLO set to cover agency upload throughput explicitly?
- Should share link success differentiate between internal and external networks?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Vercel and Mux provide reliable metrics APIs for real-time ingestion.
- Synthetic checks accurately mimic guest experience under typical conditions.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- HighLevel brief non-functional targets
- Reliability workshop outputs (September 2025)
- Mux and Resend SLA documentation
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
