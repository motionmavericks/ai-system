<!-- ai:managed start file="docs/playbook/14-observability/14-01-logging.md" responsibility="docs" strategy="replace" -->
---
title: "Logging Strategy – Motion Mavericks Portal"
doc_path: "docs/playbook/14-observability/14-01-logging.md"
doc_type: "observability"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [logging, observability]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Logging Strategy – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="observability"
     path="docs/playbook/14-observability/14-01-logging.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>logging, observability</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This logging strategy describes how Motion Mavericks captures, processes, and analyses logs for the production management portal. It supports monitoring of Admin, Agency, and Guest actions across milestones, tasks, assets, notifications, and share links. The plan enforces privacy, residency, and compliance obligations while enabling rapid incident diagnosis.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal operates on Vercel edge/serverless functions, Neon, and third-party integrations. Logging must remain consistent across environments, provide audit evidence, and respect AU privacy regulations. Data minimisation and retention control are critical to avoid sensitive information leakage.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Application, access, audit, and infrastructure logs for portal services.
- Log collection, enrichment, retention, and storage locations.
- PII redaction policies, structured logging format, and correlation IDs.
- Excludes Mux CDN raw logs (available via vendor portal) but references integration points.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Logging architecture
| Layer | Tooling | Notes |
|-------|---------|-------|
| Application | Pino logger configured in Next.js serverless handlers | Structured JSON, includes `request_id`, `tenant_id`, `role` |
| Edge functions | `@vercel/edge` logging to Vercel log drain | Captures share link validations, IP hashed to /24 |
| Database | Neon query logs with slow query threshold 200 ms | Export weekly to S3-compatible storage |
| Notifications | Resend event logs via webhook -> ingestion worker | Tracks bounces, unsubscribes, digests |
| Asset pipeline | Mux webhooks + ingestion worker logs | Captures upload status, playback errors |

Log drains configured to push to Logtail (AU region) feeding Grafana Loki.

### Log schema (application)
```
{
  "timestamp": "2025-09-19T02:15:00.123Z",
  "level": "info",
  "message": "milestone.status.updated",
  "request_id": "req_abc123",
  "tenant_id": "tenant_mavericks",
  "user_role": "agency",
  "project_id": "proj_789",
  "milestone_id": "mile_456",
  "status": "Completed",
  "latency_ms": 132,
  "location": "syd1"
}
```

### PII and privacy controls
- Automatically hash email addresses using SHA-256 with salt before logging.
- Strip asset filenames if they contain client names; log asset IDs instead.
- Remove query payloads for share links; log only success/failure and reason codes.
- Include `privacy_redacted: true` flag when fields removed.

### Retention and storage
| Log type | Retention | Storage |
|----------|-----------|---------|
| Application runtime logs | 30 days (dev), 90 days (staging), 180 days (prod) | Logtail (AU) |
| Audit logs | 365 days | Neon `audit_events` table |
| Access logs (share links) | 365 days | Neon + S3 archive |
| Incident logs | 24 months | `<REDACTED>` secure storage |

### Correlation IDs
- Middleware attaches `request_id` using `cls-hooked` equivalent for serverless (AsyncLocalStorage).
- Propagate to client via response header `x-request-id` for debugging.
- Downstream services (Resend, Mux) include correlation ID in metadata where possible.

### Alerting hooks
- SLO monitors evaluate logs for error rate >1%, share token failures, asset processing timeouts.
- Security anomalies (multiple failed logins from same IP) forwarded to Security Specialist.

### Access
- Observability dashboards restricted to Admin and Reliability team.
- Developers access via least privilege; guest/agency data aggregated where possible.
- All access logged and reviewed quarterly (11-04).

### Log quality practices
- Use log levels: `debug` (dev only), `info`, `warn`, `error`.
- Avoid logging large payloads; use references to storage (S3 link) when necessary.
- Include metrics summary logs for nightly digests to validate notifications.
- Test logging in CI by asserting log structure in integration tests where critical.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
- [14-03-tracing](14-03-tracing.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [14-02-metrics-sli-slo](14-02-metrics-sli-slo.md)
- [18-04-rollback-plan](../18-release-and-cutover/18-04-rollback-plan.md)
- [20-01-postmortems-template](../20-archive-and-postmortems/20-01-postmortems-template.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we need log sampling in production to reduce cost while preserving diagnostic value?
- Should we establish automated log scrubbing jobs to redact legacy entries before retention expiry?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Logtail AU region meets residency requirements and integrates with Grafana Loki.
- AsyncLocalStorage remains stable under serverless workloads for correlation IDs.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Observability architecture notes (2025)
- Vercel log drain documentation
- Motion Mavericks privacy policy draft
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
