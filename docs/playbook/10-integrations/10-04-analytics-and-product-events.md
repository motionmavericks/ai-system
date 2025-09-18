<!-- ai:managed start file="docs/playbook/10-integrations/10-04-analytics-and-product-events.md" responsibility="docs" strategy="replace" -->
---
title: "Analytics and Product Events – Motion Mavericks Portal"
doc_path: "docs/playbook/10-integrations/10-04-analytics-and-product-events.md"
doc_type: "integration"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [analytics]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Analytics and Product Events – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="integration"
     path="docs/playbook/10-integrations/10-04-analytics-and-product-events.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>analytics</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide documents Motion Mavericks portal analytics instrumentation, event schemas, privacy controls, and reporting cadence. It ensures product metrics align with success metrics (SM-01 – SM-07) while respecting residency and data minimisation.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Understanding portal adoption and performance is critical for agency rollout. Analytics must provide actionable insights without collecting unnecessary personal data. Events feed dashboards and operational SLOs.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Event definitions, instrumentation locations, storage, privacy/consent, dashboards, reporting cadence.
- Excludes marketing analytics (managed separately) and third-party tracking pixels.
- Assumes events stored in Neon and surfaced via Vercel Analytics dashboards.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Event taxonomy
| Event | Description | Payload fields |
|--------|-------------|----------------|
| `user_invited` | Admin invites user | `tenantId`, `role`, `invitationId` |
| `user_activated` | User completes onboarding | `tenantId`, `role`, `timeToActivate` |
| `project_created` | Project created | `tenantId`, `projectId`, `templateUsed?`, `milestoneCount` |
| `milestone_completed` | Milestone marked completed | `tenantId`, `projectId`, `milestoneId`, `durationDays` |
| `task_completed` | Task completed | `tenantId`, `projectId`, `taskId`, `status`, `varianceHours` |
| `asset_uploaded` | Asset uploaded | `tenantId`, `assetId`, `fileSizeMb`, `processingDuration` |
| `asset_failed` | Asset processing failed | `tenantId`, `assetId`, `errorCode` |
| `share_link_created` | Share link generated | `tenantId`, `shareLinkId`, `expiresInDays`, `requirePasscode` |
| `share_link_viewed` | Guest view share link | `tenantId`, `shareLinkId`, `viewId`, `hashedIp`, `userAgent` |
| `notification_sent` | Email/in-app notification | `tenantId`, `notificationId`, `channel`, `type` |
| `notification_bounced` | Email bounce | `tenantId`, `email`, `reason` |
| `residency_report_generated` | Compliance report created | `tenantId`, `reportId`, `durationMs` |
| `incident_logged` | Incident triggered | `tenantId`, `incidentId`, `severity` |

Payloads avoid raw emails except where necessary for bounce handling (stored hashed when possible).

### Instrumentation
- Client events captured via lightweight analytics client posting to `/api/v1/analytics/events` (server validates and stores).
- Server emits events on business logic operations (project creation, asset processing).
- Use Drizzle to insert into `analytics_events` table with JSONB payload and `occurred_at` timestamp.

### Dashboards
- Dashboard surfaces key metrics mapping to success metrics: onboarding time, milestone coverage, share link performance, accessibility pass rate, availability, notification delivery.
- Built using Vercel Analytics + custom API feeding Next.js dashboards.
- Weekly analytics review meeting references metrics from `analytics_events`.

### Privacy & consent
- Analytics stored in AU; minimal PII (hashed IP). Provide opt-out for agency internal testers via feature flag.
- No third-party trackers; only first-party analytics.
- Event retention: 12 months; aggregated metrics stored separately for long-term tracking.

### Reporting cadence
- Weekly operations meeting: milestone coverage, share link engagement, asset failure trends.
- Monthly compliance review: residency reports, DSAR metrics.
- Post-launch: add executive summary for agencies (pending needs).

### Testing & validation
- Unit tests ensure event payloads match schema (Zod validation).
- Integration tests confirm API endpoint rejects invalid payloads.
- Manual checks during staging verifying events flow to dashboards.

### Tools
- For future expansion, evaluate Segment-like router but keep events simple for MVP.
- Use `pino` logs to trace event pipeline during debugging.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [00-02-success-metrics](../00-brief-and-vision/00-02-success-metrics.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
- [06-05-data-governance](../06-data-model-and-storage/06-05-data-governance.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [12-05-performance-tests](../12-testing-and-quality/12-05-performance-tests.md)
- [03-02-journeys-and-flows](../03-ux-and-design/03-02-journeys-and-flows.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we adopt real-time dashboarding (e.g., Superset) if data volume grows?
- Do client stakeholders require direct access to analytics exports, or are internal summaries sufficient?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Data volume manageable within Neon; evaluate warehouse integration when agencies scale.
- Hashing approach meets privacy requirements; confirm with compliance advisor.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Analytics design workshop (September 2025)
- Compliance advisor privacy checklist
- Success metrics documentation
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
