<!-- ai:managed start file="docs/playbook/09-backend/09-03-background-jobs.md" responsibility="docs" strategy="replace" -->
---
title: "Background Jobs – Motion Mavericks Portal"
doc_path: "docs/playbook/09-backend/09-03-background-jobs.md"
doc_type: "backend-process"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [background-jobs]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Background Jobs – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="backend-process"
     path="docs/playbook/09-backend/09-03-background-jobs.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>background-jobs</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document enumerates Motion Mavericks portal background jobs, including schedule, purpose, runtime, retry strategy, and observability. Jobs run on Vercel Cron or within queue workers to maintain share link policies, notifications, compliance, and data hygiene.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Automated jobs uphold non-functional requirements: share link expiry, digest delivery, residency reporting, invitation cleanup, and webhook retries. Jobs must be deterministic, idempotent, and logged for audit.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Scheduled tasks, retry policies, monitoring, failure handling, tooling.
- Excludes synchronous operations inside request-response cycle.
- Assumes Vercel Cron with fallback manual triggers.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Job inventory
| Job name | Schedule | Runtime | Purpose | Failure handling |
|----------|----------|---------|---------|-----------------|
| `share-link-expiry` | Every 15 minutes | Edge function | Expire share links, revoke tokens, notify owners | Retries once; logs to DLQ on failure |
| `notification-digest` | Daily 08:00 AEST | Serverless function | Send email digest of due tasks, asset updates | Retries 3 times; failure alerts reliability partner |
| `invite-cleanup` | Hourly | Serverless function | Mark invitations expired after 72 h | Low risk; logs failure, manual rerun |
| `mux-webhook-retry` | Every 5 minutes | Worker function | Replay failed Mux events from DLQ | Retries limit 5; escalate if queue >10 |
| `residency-report` | Weekly Monday 07:00 AEST | Serverless function | Generate residency evidence, store report, email compliance | Retries 2 times, failure triggers manual run |
| `backup-verify` | Monthly first business day | Serverless job | Kick off Neon restore drill (staging) | Manual oversight; failure blocks compliance sign-off |
| `analytics-rollup` | Hourly | Serverless | Aggregate events for dashboard metrics | Retries once; fallback next run |
| `notification-suppression-cleanup` | Daily 01:00 AEST | Serverless | Remove bounce-suppressed addresses older than 30 days | Retries once |
| `tenant-health-check` | Daily 06:00 AEST | Serverless | Generate tenant status summary (milestones at risk, share link usage) | Failure notifies Admin |

### Implementation
- Jobs defined in `apps/worker/src/jobs/*.ts` with exported handler.
- Scheduler configuration in `vercel.json` Cron section.
- Jobs use Neon via connection pool limited to 5 connections per run.
- Logging via `pino` with `jobName`, `runId`, `durationMs`, `status`.
- Idempotency achieved using `job_runs` table; job records run start/end, skip if already executed within window.

### Retry & DLQ strategy
- Vercel Cron lacks built-in retries; we wrap jobs with retry logic using exponential backoff (max 3 attempts) when safe.
- Critical jobs (webhook retry) manage explicit DLQ in Neon. Secondary job attempts reprocessing; after max attempts escalate to reliability partner.

### Monitoring
- Metrics exported to Sentry as custom transactions; error rate thresholds configured per job.
- Dashboard summarises job success/failure counts, runtime, queue depth (where applicable).
- Alerts triggered if job fails consecutively or runtime exceeds SLA (e.g., share-link-expiry >60 seconds).

### Manual operations
- Admin console page allows manual trigger for `share-link-expiry`, `notification-digest`, `residency-report` with audit log entry.
- CLI script `pnpm job:run <job>` for local/staging testing.

### Deployment & testing
- Jobs deployed with general code via Vercel; integration tests run using Neon dev branch.
- Playwright tests simulate share link expiry by mocking Cron run.
- Staging environment uses shortened intervals for testing (e.g., share link expiry every 5 minutes).
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [09-02-business-logic](09-02-business-logic.md)
- [07-05-webhooks-and-events](../07-apis-and-contracts/07-05-webhooks-and-events.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [18-04-rollback-plan](../18-release-and-cutover/18-04-rollback-plan.md)
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we adopt dedicated job queue (e.g., Inngest) if job volume increases post-launch?
- Do agencies require scheduling of custom digests beyond daily frequency?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Vercel Cron reliability sufficient for MVP; monitor failure trends.
- Neon handles job logging storage without significant overhead; partition if needed later.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Reliability partner job design review
- Vercel Cron documentation
- Compliance advisor requirements for residency reporting
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
