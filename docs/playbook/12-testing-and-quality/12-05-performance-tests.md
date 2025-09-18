<!-- ai:managed start file="docs/playbook/12-testing-and-quality/12-05-performance-tests.md" responsibility="docs" strategy="replace" -->
---
title: "Performance Tests – Motion Mavericks Portal"
doc_path: "docs/playbook/12-testing-and-quality/12-05-performance-tests.md"
doc_type: "quality"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "QA Engineer"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [performance, load-testing]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Performance Tests – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="quality"
     path="docs/playbook/12-testing-and-quality/12-05-performance-tests.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>performance, load-testing</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Performance testing ensures the portal meets latency, throughput, and resilience targets across Admin, Agency, and Guest workflows. This plan stress tests share endpoints, milestone updates, asset streaming, and notification queues to uphold 99.9% availability, p95 latency ≤300 ms, and AU-first user experience expectations.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Production management requires real-time collaboration. Agencies often upload large assets while clients stream previews, placing pressure on API and CDN paths. Prior projects suffered from slow asset readiness and delayed notifications. Performance checks integrate with observability (14-*) and reliability (15-*) strategies.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- API load tests for project, milestone, task, and share endpoints.
- Asset streaming validation through Mux playback monitoring.
- Notification throughput and latency under burst conditions.
- Includes resilience checks for RPO/RTO readiness (backup performance).
- Excludes offline editing or third-party agency systems.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Key scenarios
| Scenario | Tool | Target | Pass criteria |
|----------|------|--------|---------------|
| Project dashboard fetch | k6 HTTP | 200 concurrent users, 5 min ramp | p95 latency ≤300 ms, error rate <0.5% |
| Milestone status updates | k6 HTTP | 100 updates/min, 10 min duration | p95 latency ≤350 ms, <1% 5xx |
| Share link view bursts | k6 HTTP + Web Vitals | 500 guests over 10 min | Token validation ≤150 ms, CDN hit ratio ≥90% |
| Asset playback start | Mux QA API, synthetic viewers | 50 concurrent streams | Time-to-first-frame ≤3 s on 25 Mbps |
| Notification digests | Custom script w/ Resend API | 200 emails triggered in 5 min | Queue drain ≤2 min, bounce rate ≤1% |
| Backup + restore simulation | Shell script executing `pg_dump` + restore | 20 GB dataset | Backup ≤30 min, restore ≤45 min |

### Environment configuration
- Performance tests run against staging environment with production-like data volumes (scrubbed PII).
- Use dedicated Neon branch with read replicas to avoid production impact.
- Mux load tests scheduled during off-peak to respect bandwidth agreements.

### Execution cadence
- Monthly baseline run logged in reliability dashboard.
- Pre-launch: run full suite twice (feature freeze, final go/no-go).
- On-demand runs after major architectural change (e.g., caching, database indexes).

### Automation and reporting
- k6 scripts stored in `tests/perf`. Executed via GitHub Actions with outputs to JSON + Grafana dashboards.
- Mux metrics pulled via API; results compared against SLA and archived.
- Resend queue metrics instrumented via webhook events; aggregated in DataDog.
- Reports summarised with trend charts, posted to `#reliability` Slack channel.

### Tuning and remediation
- If latency breaches thresholds, create performance backlog item with owner and deadline.
- Apply caching (Upstash), DB indexes, or query optimisation as necessary.
- Conduct chaos experiment cross-references when performance tests highlight bottlenecks.

### Data hygiene
- Use anonymised but realistic projects (≥20 milestones, ≥100 tasks, ≥200 assets) to mimic real workloads.
- Clean up generated share links and notifications post-test to prevent audit noise.

### Integration with release process
- Release checklist (18-01) requires latest performance report <30 days old.
- Performance regressions block releases until remediation plan signed off by Technical Lead and Reliability Partner.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [15-01-load-and-stress-testing](../15-performance-and-reliability/15-01-load-and-stress-testing.md)
- [14-01-observability-overview](../14-observability/14-01-observability-overview.md)
- [18-02-cutover-plan](../18-release-and-cutover/18-02-cutover-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [12-01-test-strategy](12-01-test-strategy.md)
- [15-04-disaster-recovery](../15-performance-and-reliability/15-04-disaster-recovery.md)
- [14-04-alerting-and-response](../14-observability/14-04-alerting-and-response.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we need synthetic tests from EU/US regions to verify guest experience for non-AU stakeholders?
- Should performance suite trigger automatically post-deploy to staging or remain manual until resource budget confirmed?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Neon performance characteristics in staging mirror production sizing.
- Cost of extended Mux streaming tests remains within contract allowance.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Legacy performance SLA deck (2024)
- Mux quality-of-experience guidelines
- Resend throughput documentation
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
