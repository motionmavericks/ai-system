<!-- ai:managed start file="docs/playbook/15-performance-and-reliability/15-01-load-and-stress-testing.md" responsibility="docs" strategy="replace" -->
---
title: "Load and Stress Testing – Motion Mavericks Portal"
doc_path: "docs/playbook/15-performance-and-reliability/15-01-load-and-stress-testing.md"
doc_type: "reliability"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "QA Engineer"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [performance, stress-testing]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Load and Stress Testing – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="reliability"
     path="docs/playbook/15-performance-and-reliability/15-01-load-and-stress-testing.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>performance, stress-testing</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This plan defines load and stress testing for Motion Mavericks’ production management portal. It validates system behaviour under expected and extreme traffic for milestones, tasks, assets, notifications, and share links. Results inform capacity planning, SLO adherence, and release readiness.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Agencies run campaigns with large concurrent asset reviews, while clients expect fast share link playback. The portal relies on Vercel, Neon, Mux, and Resend; load must be tested end-to-end. Stress testing identifies failure points, ensuring readiness for RPO/RTO obligations.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Load testing at expected peak volumes for API endpoints, share links, and notifications.
- Stress testing above peak to observe degradation and recovery triggers.
- Includes database, cache, and CDN interactions.
- Excludes vendor internal limits beyond published SLAs.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Scenarios
| Scenario | Type | Load target | Goals |
|----------|------|-------------|-------|
| Project dashboard fetch | Load | 200 concurrent Admin/Agency users for 15 min | Maintain p95 ≤300 ms, <0.5% errors |
| Milestone update burst | Stress | Ramp from 50 to 500 updates/min over 10 min | Observe Neon CPU, queue backlog, ensure no data loss |
| Share link viewing | Load | 500 guests concurrently streaming assets | Ensure token validation <150 ms, playback start ≤3 s |
| Share link surge | Stress | Spike to 1000 concurrent opens in 2 min | Validate rate limiting, ensure graceful degradation |
| Asset upload | Load | 50 simultaneous uploads (100 MB each) | Monitor bandwidth, ensure Mux ingest within SLA |
| Notification digests | Load | 200 emails/min | Delivery within 5 min, queue drain |
| Backup + queries | Stress | Run nightly backup while 150 users active | Confirm RPO unaffected, latency stable |

### Tools
- k6 for HTTP load/stress scripts (`tests/perf/load`).
- Locust optional for interactive modelling.
- Custom Node scripts to queue Resend payloads and track responses.
- Mux CLI for initiating playback sessions.

### Execution process
1. Provision staging environment scaling to production-like configuration.
2. Warm caches and pre-generate share tokens.
3. Run baseline load scenario; capture metrics.
4. Execute stress scenario; monitor for breaches in latency/error rates.
5. Trigger recovery: auto-scaling, rate limits, revert to normal load.
6. Document results, bottlenecks, and remediation tasks.

### Observability tie-in
- Use Grafana dashboards (14-05) to visualise metrics during tests.
- Record trace samples for slow transactions; correlate with database metrics.
- Log share link token failures for analysis.

### Acceptance criteria
- System meets SLOs under load scenarios.
- Under stress scenarios, system degrades predictably and recovers without manual intervention (except beyond defined thresholds).
- No data corruption or loss; audit logs remain consistent.

### Remediation workflow
- If thresholds exceeded, create Linear performance ticket with owner and fix plan.
- Re-run scenario post-fix to verify improvement.
- Update capacity plan (15-02) with new requirements.

### Scheduling
- Quarterly load test suite run with report.
- Stress test run pre-launch and annually thereafter.
- Additional runs triggered after major architectural changes.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [12-05-performance-tests](../12-testing-and-quality/12-05-performance-tests.md)
- [14-02-metrics-sli-slo](../14-observability/14-02-metrics-sli-slo.md)
- [15-02-capacity-planning](15-02-capacity-planning.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [15-03-reliability-engineering](15-03-reliability-engineering.md)
- [15-05-chaos-experiments](15-05-chaos-experiments.md)
- [18-02-cutover-plan](../18-release-and-cutover/18-02-cutover-plan.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we budget for synthetic load tests during agency campaign launches to simulate peak usage proactively?
- Should we integrate real-time load testing via production shadow traffic after go-live?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Staging environment mirrors production capacity to produce meaningful results.
- Vendors allow planned stress tests without violating acceptable use policies.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Performance modelling spreadsheet (2025)
- Mux SLA documentation
- Resend throughput benchmarks
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
