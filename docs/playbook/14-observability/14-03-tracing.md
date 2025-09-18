<!-- ai:managed start file="docs/playbook/14-observability/14-03-tracing.md" responsibility="docs" strategy="replace" -->
---
title: "Tracing Strategy – Motion Mavericks Portal"
doc_path: "docs/playbook/14-observability/14-03-tracing.md"
doc_type: "observability"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "Backend Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [tracing, observability]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Tracing Strategy – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="observability"
     path="docs/playbook/14-observability/14-03-tracing.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>tracing, observability</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Tracing provides visibility into Motion Mavericks’ distributed workflows. This strategy describes how we instrument Next.js APIs, background jobs, and integration flows with OpenTelemetry to trace milestone updates, asset processing, notification delivery, and share link validation. Traces accelerate troubleshooting, support SLOs, and feed into performance analysis.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Serverless architecture and third-party dependencies introduce complexity; issues are hard to diagnose without span-level data. Previous incidents lacked insight into Resend or Mux latency contributions. Tracing integrates with logging (14-01) and metrics (14-02).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- OpenTelemetry instrumentation for API routes, server actions, background jobs, and webhooks.
- Propagation of trace context across services (Resend, Mux, Upstash).
- Storage and sampling strategy via Grafana Tempo.
- Excludes client-side tracing beyond initial Next.js instrumentation.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Architecture
- Use OpenTelemetry SDK for Node.js (auto-instrumentation for HTTP, fetch, PostgreSQL).
- Span exporter sends to Grafana Agent deployed alongside Neon read replica; forwarded to Tempo (AU region).
- Vercel edge functions limited instrumentation; custom middleware attaches span attributes for share link validation.
- Playwright E2E tests capture trace IDs for correlation in debugging.

### Span taxonomy
| Span name | Description | Key attributes |
|-----------|-------------|----------------|
| `api.projects.list` | Fetch project dashboard data | `tenant_id`, `role`, `project_count` |
| `service.milestones.update` | Server action updating milestone | `milestone_id`, `status`, `latency_ms` |
| `integration.mux.asset.ingest` | Asset upload workflow | `asset_id`, `file_size`, `mux_request_id` |
| `integration.resend.send` | Notification dispatch | `notification_id`, `template`, `recipient_role` |
| `job.share_token.cleanup` | Cron removing expired tokens | `tokens_removed`, `duration_ms` |
| `webhook.mux.asset_ready` | Mux event processing | `asset_id`, `processing_time_ms` |

### Context propagation
- Inject trace IDs into Resend metadata; logs and metrics include `trace_id` when available.
- Upstash operations include `traceparent` header for correlation.
- Playwright tests capture `response.headers()['x-trace-id']` for debugging.

### Sampling
- Default 20% sampling in production to balance cost and visibility.
- Always sample error spans (automatically via tail-based sampling rule).
- Staging environment sampling 50%; development 100%.

### Alert integration
- Traces aggregated to identify latency hotspots; rules trigger alerts when span latency > threshold for consecutive periods.
- Export traces to Tempo for deep analysis; link to Grafana dashboards for context.

### Data retention
- Tempo retains traces 7 days for production, 3 days for staging. Critical incidents archived manually.
- Ensure exported traces exclude sensitive payloads (PII attributes redacted before export).

### Tooling and workflow
- Provide VS Code tasks to view local traces via `otel-cli`.
- Document trace lookup instructions in developer docs (16-01).
- During incidents, SRE uses trace search to isolate slow spans and share summary with engineering team.

### Testing
- Integration tests assert presence of `traceparent` header for critical endpoints.
- `pnpm trace:smoke` script sends sample requests verifying instrumentation after deployments.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [14-01-logging](14-01-logging.md)
- [15-01-load-and-stress-testing](../15-performance-and-reliability/15-01-load-and-stress-testing.md)
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [14-04-alerting](14-04-alerting.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
- [16-02-runbooks](../16-documentation-and-training/16-02-runbooks.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we adopt tail-based sampling with adaptive rules to capture rare share link failures?
- Do we need customer-facing trace IDs in share link error messages for support workflows?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Grafana Tempo cluster sized to handle sampling volume without throttling.
- Third-party services (Mux, Resend) support metadata required for trace correlation.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- OpenTelemetry best practices (2025)
- Motion Mavericks reliability design session notes
- Grafana Tempo deployment guide
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
