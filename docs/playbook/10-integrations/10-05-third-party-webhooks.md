<!-- ai:managed start file="docs/playbook/10-integrations/10-05-third-party-webhooks.md" responsibility="docs" strategy="replace" -->
---
title: "Third-party Webhooks – Motion Mavericks Portal"
doc_path: "docs/playbook/10-integrations/10-05-third-party-webhooks.md"
doc_type: "integration"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [webhooks, integration]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Third-party Webhooks – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="integration"
     path="docs/playbook/10-integrations/10-05-third-party-webhooks.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>webhooks, integration</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide documents Motion Mavericks portal third-party webhooks: Mux (media), Resend (email), and optional future Slack integration. It describes security measures, processing flow, idempotency, retries, and monitoring.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Webhooks provide critical signals for asset processing, email delivery, and potential agency notifications. Handling them securely ensures asset statuses remain accurate and compliance obligations are met.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Mux, Resend, optional Slack webhooks. Security validation, payload schema, processing steps, retries.
- Excludes internal Cron jobs (documented elsewhere).
- Assumes Vercel serverless functions handle inbound requests.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Mux
- Endpoint: `POST /api/v1/webhooks/mux` (see 07-05 for event list).
- Security: `Mux-Signature` header (HMAC SHA256). Verify timestamp <5 minutes old.
- Payload schema stored in `packages/api-contracts/src/muxWebhook.ts`.
- Processing: update asset status, notify stakeholders, log analytics event.
- Retries: rely on Mux (10 attempts) + custom DLQ.

### Resend
- Endpoint: `POST /api/v1/webhooks/resend`.
- Security: HMAC `resend-signature` header; secret rotated every 180 days.
- Events: `email.delivered`, `email.bounced`, `email.complained`.
- Processing: update notification delivery state, add suppression entry, alert support on complaint.

### Optional Slack (future)
- Webhook to share incidents or milestone updates with agencies; not enabled for MVP. If enabled:
  - Use incoming webhook URL stored securely (
 `SLACK_WEBHOOK_URL`).
  - Messages limited to Admin notifications, no PII.
  - Rate limit to avoid spam (max 5/min).

### Security & resilience
- IP allow-list optional; evaluate once vendor IP ranges confirmed.
- Invalid signature → 401 response, log attempt.
- Payload size limit 1 MB for webhooks; reject larger requests.

### Logging
- `webhook_events` table records `source`, `event_id`, `payloadHash`, `status`, `processed_at`.
- Logs include `requestId`, `durationMs`, `result`.

### Monitoring
- Alert when webhook failure rate >5% or DLQ length >10.
- Sentry integration for error tracking with sanitized payload.

### Documentation & testing
- Integration tests mocking vendor signatures ensure verification works.
- Playbook references kept current when vendor changes event schema.
- Manual runbook for reprocessing DLQ documented in 15-03.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [07-05-webhooks-and-events](../07-apis-and-contracts/07-05-webhooks-and-events.md)
- [09-03-background-jobs](../09-backend/09-03-background-jobs.md)
- [11-01-security-baseline](../11-security-and-compliance/11-01-security-baseline.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [05-03-environments-and-secrets](../05-project-setup/05-03-environments-and-secrets.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we add Slack webhook integration for incident alerts during MVP pilot?
- Do we need IP allow-list enforcement at CDN level for additional security?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Vendor webhook formats remain stable; subscribe to release notes.
- DLQ size remains manageable without external queue service.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Vendor docs (Mux, Resend)
- Reliability partner event handling review
- Security consultant recommendations
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
