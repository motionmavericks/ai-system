<!-- ai:managed start file="docs/playbook/09-backend/09-01-service-boundaries.md" responsibility="docs" strategy="replace" -->
---
title: "Service Boundaries – Motion Mavericks Portal"
doc_path: "docs/playbook/09-backend/09-01-service-boundaries.md"
doc_type: "architecture"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [backend, service-boundaries]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Service Boundaries – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="architecture"
     path="docs/playbook/09-backend/09-01-service-boundaries.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>backend, service-boundaries</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document defines Motion Mavericks portal backend service boundaries. It clarifies responsibilities for auth, projects, tasks, assets, notifications, share links, and supporting utilities, ensuring clear ownership, scaling strategies, and compliance alignment.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The backend is implemented within a Next.js monorepo but logically separated into services handled by Route Handlers / server actions. Defining boundaries prevents coupling, simplifies testing, and allows future extraction into microservices if required.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Service responsibilities, inputs/outputs, data ownership, scaling considerations.
- Excludes low-level CRUD details (see 07-02) and infrastructure (04-02).
- Assumes single repository with modular architecture.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Services overview
| Service | Responsibilities | Interfaces | Data ownership |
|---------|-----------------|------------|----------------|
| Auth Service | Invitations, magic links, session validation, role provisioning | REST endpoints `/auth/*`, Clerk webhooks | `users`, `sessions` (Clerk), `invitations` table |
| Tenant Service | Tenant provisioning, agency onboarding, branding, residency settings | `/tenants/*`, admin UI | `tenants`, `tenant_settings` |
| Project Service | Projects CRUD, milestone templates, status rollups | `/projects/*`, server actions | `projects`, `milestones`, related views |
| Task Service | Task management, status transitions, audit logging | `/tasks/*`, server actions | `tasks`, `task_history` |
| Asset Pipeline Service | Upload orchestration, Mux integration, asset metadata | `/assets/*`, webhooks `/webhooks/mux` | `assets`, `asset_versions` |
| Share Link Service | Link generation, token signing, analytics, revocation | `/share-links/*` | `share_links`, `share_link_events` |
| Notification Service | In-app feed, email digests, delivery tracking | `/notifications/*`, Resend webhooks | `notifications`, `notification_preferences` |
| Compliance Service | Residency evidence, audit logs, reporting | `/compliance/*` (admin) | `residency_evidence`, `audit_logs` |
| Analytics Service | Event tracking (project_created, share_opened), KPI aggregation | `/analytics/events` | `analytics_events`, `dashboard_metrics` |

### Interaction diagram (summary)
- Auth Service authenticates user → Tenant Service resolves tenant context → Project/Task/Asset services operate under context.
- Asset Pipeline triggers Notification Service via event bus (TanStack Query invalidation + Resend).
- Share Link Service interacts with Asset Pipeline for playback tokens and Notification Service for guest reminders.
- Compliance Service consumes audit logs emitted by all services via event emitter.

### Scaling & deployment notes
- Services share Neon database but maintain schema modularity (namespaces via table prefixes optional).
- Asset Pipeline may require concurrency controls; run in serverless functions with streaming responses.
- Notification Service uses Vercel Cron for scheduled jobs; tasks executed within same repo.

### Observability
- Each service logs with structured metadata (`service`, `action`, `tenantId`, `requestId`).
- Sentry tags allow filtering by service.
- Metrics aggregated per service (latency, error rate, throughput) to monitor SLO adherence.

### Future extraction
- Candidate services for extraction if scale demands: Asset Pipeline (to worker), Notification Service (to queue-based system), Analytics Service (to event pipeline).
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [04-02-solution-architecture](../04-architecture-and-decisions/04-02-solution-architecture.md)
- [07-02-endpoints-and-contracts](../07-apis-and-contracts/07-02-endpoints-and-contracts.md)
- [09-02-business-logic](09-02-business-logic.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [09-03-background-jobs](09-03-background-jobs.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should analytics events eventually flow to an external warehouse, or will Neon suffice for the next 12 months?
- Do we need to separate compliance reporting into dedicated service for governance audits?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Single repository architecture remains manageable; service boundaries primarily logical for now.
- Future multi-region deployment may require re-evaluating asset pipeline and notification service design.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Backend architecture workshop (September 2025)
- Reliability partner recommendations
- ADRs 001–005
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
