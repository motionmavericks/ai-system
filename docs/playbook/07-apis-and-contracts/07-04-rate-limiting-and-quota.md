<!-- ai:managed start file="docs/playbook/07-apis-and-contracts/07-04-rate-limiting-and-quota.md" responsibility="docs" strategy="replace" -->
---
title: "Rate Limiting and Quota – Motion Mavericks Portal"
doc_path: "docs/playbook/07-apis-and-contracts/07-04-rate-limiting-and-quota.md"
doc_type: "policy"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [rate-limiting, policy]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Rate Limiting and Quota – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="policy"
     path="docs/playbook/07-apis-and-contracts/07-04-rate-limiting-and-quota.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>rate-limiting, policy</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This policy establishes rate limits and quotas for Motion Mavericks portal APIs to protect availability, prevent abuse, and maintain compliance. Limits balance user experience with security, particularly around authentication and share links.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal is exposed to external guests via share links and agency producers via APIs. Uncontrolled access risks downtime, token brute-forcing, and increased costs. Rate limiting must integrate with Vercel edge middleware and Neon to enforce quotas.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Applies to public REST endpoints and share link access.
- Excludes internal service-to-service traffic (managed separately).
- Assumes Vercel Edge Middleware + Vercel KV for counters.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Rate limit tiers
| Endpoint group | Limit | Key | Reset window | Notes |
|----------------|-------|-----|-------------|-------|
| Authentication (invites, magic link consumption) | 10 requests/min/IP | IP + email hash | 60 seconds | Prevent invitation spam |
| Share link view | 60 views/min/IP | Share link ID + IP | 60 seconds | Protect against brute force or hotlinking |
| Share link creation | 20 per hour/tenant | Tenant ID + user ID | 60 minutes | Guard against bulk creation |
| Project/task CRUD | 120 requests/min/user | User ID | 60 seconds | Allows inline editing without overload |
| Comments | 60/min/user | User ID | 60 seconds | Anti-spam |
| Notifications (ack, list) | 120/min/user | User ID | 60 seconds | Ensure responsive UI |
| Analytics endpoints | 30/min/user | User ID | 60 seconds | Prevent heavy polling |

### Enforcement
- Edge middleware increments counters in Vercel KV with TTL = reset window.
- On limit breach, response `429` with error code `RATE_LIMIT_EXCEEDED` and Retry-After header.
- Metrics exported to Sentry and dashboards; error budget consumption tracked.

### Abuse detection
- If share link view limit triggered >5 times in 10 minutes, automatically revoke link and alert Admin.
- IP reputation list stored to block known bad actors; manual overrides documented in security runbook.

### Quotas
- Tenants limited to 100 active share links simultaneously; additional requests require Admin approval.
- Asset upload concurrency limited to 5 simultaneous uploads per tenant; queueing enforced client-side and server-side.
- Notification digests daily; manual triggers limited to 3 per day to prevent email floods.

### Configuration
- Limits stored in `packages/config/src/rateLimits.ts`; environment variables allow override per environment.
- Staging limits lowered to facilitate testing (e.g., share link view limit 10/min).

### Monitoring
- Dashboard tracks rate limit hits, rejected requests, top IPs.
- Alerts triggered if 429 rate >2% of total requests for 5 minutes.

### Exceptions
- Admin can whitelist IP ranges temporarily (e.g., internal testing) via secure admin console; actions logged.
- High-volume operations (data migration) use internal endpoints with bypass tokens validated server-side.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [07-01-api-style-guide](07-01-api-style-guide.md)
- [04-04-threat-model](../04-architecture-and-decisions/04-04-threat-model.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
- [07-05-webhooks-and-events](07-05-webhooks-and-events.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do clients require higher share link view quotas for public-facing campaigns?
- Should we integrate third-party bot detection for share link endpoints?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Vercel KV provides sufficient performance; monitor latency and fallback to Redis-managed solution if needed.
- Rate limits won't materially impact agency workflows; adjust if legitimate use cases are throttled.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Security partner rate limit recommendations
- Historical share link usage analysis
- OWASP API Security cheat sheet
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
