<!-- ai:managed start file="docs/playbook/07-apis-and-contracts/07-05-webhooks-and-events.md" responsibility="docs" strategy="replace" -->
---
title: "Webhooks and Events – Motion Mavericks Portal"
doc_path: "docs/playbook/07-apis-and-contracts/07-05-webhooks-and-events.md"
doc_type: "api-guide"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [webhooks, events]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Webhooks and Events – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="api-guide"
     path="docs/playbook/07-apis-and-contracts/07-05-webhooks-and-events.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>webhooks, events</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document details Motion Mavericks portal webhook integrations with Mux and Resend, idempotency handling, retry strategy, and scheduled events such as share link expiry. Proper management ensures reliable asset processing, notification delivery, and compliance automation.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Mux webhooks indicate asset status changes, while Resend notifies about bounces and complaints. The portal must handle events idempotently, verify authenticity, and queue retries to maintain SLOs. Scheduled events enforce expiry policies.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Webhook endpoints, security validation, idempotency keys, retry handling, dead letter queue, scheduled Cron events.
- Excludes API endpoints (covered elsewhere) and external integration setups (see section 10).
- Assumes Vercel serverless functions handle webhooks.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Mux webhook handling
- Endpoint: `POST /api/v1/webhooks/mux`.
- Events consumed: `video.asset.created`, `video.asset.ready`, `video.asset.errored`, `video.upload.cancelled`.
- Security: validate `Mux-Signature` header; use SHA-256 HMAC with secret stored in Vercel env; reject if timestamp skew >5 minutes or signature mismatch.
- Idempotency: each event includes `id`; stored in `webhook_events` table with unique constraint to prevent duplication.
- Processing:
  1. Parse payload.
  2. Update `assets` record status (`processing` → `ready` / `failed`).
  3. Generate signed playback URL and event log.
  4. Notify relevant users (notifications + email) when status transitions to `ready` or `failed`.
- Failures: if processing throws, event moved to Dead Letter Queue (Neon table `webhook_events` with status `failed`). Cron job `mux-webhook-retry` reprocesses every 5 minutes up to 5 attempts.

### Resend webhook handling
- Endpoint: `POST /api/v1/webhooks/resend`.
- Events: `email.delivered`, `email.bounced`, `email.complained`.
- Validation: Resend signature header verified; events older than 5 minutes discarded.
- Processing: update notification delivery status, suppress email for addresses with repeated bounces, alert support team.

### Idempotency strategy
- Each webhook event stored with `source` + `event_id`; unique index prevents double processing.
- Application-level idempotency keys used for share link creation and asset uploads to avoid duplication.
- Response codes: `200` on success, `400` on validation failure, `500` when processing fails (retries allowed).

### Retry policy
- Webhooks rely on provider retry (Mux 10 attempts exponential backoff, Resend 5 attempts). Portal ensures idempotent processing to handle duplicates.
- Additional internal retry via DLQ: `mux-webhook-retry` job replays failed events; after max attempts, escalate to reliability partner.

### Share link expiry job
- Cron schedule: every 15 minutes.
- Job tasks: query `share_links` where `expires_at < now()` and `status='active'`; set status `expired`, revoke tokens, notify owners.
- Also triggers optional digest summarising expired links for Admin.

### Invitation cleanup job
- Runs hourly; expires invitations older than 72 hours, notifies Admin to reissue if needed.

### Residency report job
- Weekly Cron; aggregates asset storage regions, stores evidence, emails compliance advisor.

### Monitoring
- Webhook dashboards track success rate, retries, latency.
- Alerts triggered if failure rate >2% within 10 minutes or DLQ length >10 events.
- Logs include redacted payload and processing outcome for audit.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [07-02-endpoints-and-contracts](07-02-endpoints-and-contracts.md)
- [04-03-data-flows](../04-architecture-and-decisions/04-03-data-flows.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [10-05-third-party-webhooks](../10-integrations/10-05-third-party-webhooks.md)
- [18-03-data-migration-runbook](../18-release-and-cutover/18-03-data-migration-runbook.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we add webhook signing secret rotation schedule (e.g., every 180 days) via automated script?
- Do we need Slack notifications for DLQ events to improve visibility?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Providers maintain webhook retry guarantees; monitor for degradations.
- Cron tasks on Vercel meet reliability needs; fallback to external scheduler if failure rate increases.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Mux webhook documentation
- Resend event handling guides
- Reliability partner event processing review
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
