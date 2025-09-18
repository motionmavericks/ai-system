<!-- ai:managed start file="docs/playbook/04-architecture-and-decisions/04-02-solution-architecture.md" responsibility="docs" strategy="replace" -->
---
title: "Solution Architecture – Motion Mavericks Portal"
doc_path: "docs/playbook/04-architecture-and-decisions/04-02-solution-architecture.md"
doc_type: "architecture"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [architecture, solution]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Solution Architecture – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="architecture"
     path="docs/playbook/04-architecture-and-decisions/04-02-solution-architecture.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>architecture, solution</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This solution architecture details the Motion Mavericks portal runtime, core components, data stores, background jobs, and deployment strategy. It highlights how the system meets availability, residency, and share-link security goals using Vercel, Next.js, Neon, Mux, Resend, and supporting services.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal must orchestrate production projects while enforcing AU residency, RPO/RTO targets, and WCAG compliance. With limited headcount, the solution leans on managed services and serverless infrastructure. Architecture decisions are captured in ADRs referenced here.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Covers runtime environment, logical components (≥8), data stores, queues/cron, and deployment approach.
- Excludes detailed data models and API contracts (covered elsewhere).
- Assumes production deployment on Vercel with Neon (Sydney) and Mux AU PoPs.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Runtime environment
- **Frontend + API**: Next.js 15 App Router deployed on Vercel (ANZ edge). Server actions and Route Handlers for APIs.
- **Database**: Neon PostgreSQL (Sydney region) with Drizzle ORM, RLS enforcing tenant isolation.
- **Media**: Mux Direct Upload + Playback API; Vercel Blob handles initial uploads.
- **Authentication**: Clerk magic link and session management; Vercel edge middleware for auth checks.
- **Notifications**: Resend for email, in-app notifications stored in Neon; Cron tasks powering digests.
- **Observability**: Sentry, Vercel Analytics, custom dashboards, structured logging via pino.

### Core components (≥8)
| Component | Responsibility | Technology |
|-----------|----------------|------------|
| Auth Service | Manage invitations, magic links, sessions | Clerk, Next.js route handlers |
| Tenant Manager | Provision tenants, agencies, roles | Next.js API, Neon tables |
| Project Service | CRUD for projects, milestones, templates | Next.js API, Drizzle |
| Task Service | Task operations, status transitions, audit | Next.js API, Drizzle |
| Asset Pipeline | Upload, process, sync asset metadata | Vercel Blob, Mux, Neon |
| Share Link Service | Generate signed tokens, revoke links, track analytics | Next.js API, Neon, KV cache for rate limits |
| Notification Service | In-app feed, email digests, incident alerts | Resend, Neon, Vercel Cron |
| Compliance & Telemetry | Residency reports, audit logging | Neon, Sentry, custom dashboards |
| Frontend App | React UI, routing, data fetching, accessibility | Next.js, TanStack Query, shadcn/ui |

### Data stores
- **Neon PostgreSQL**: Primary transactional store (tenants, users, projects, milestones, tasks, assets, share_links, comments, notifications, audit_logs).
- **Vercel KV**: Rate limiting counters (share link views, auth attempts), notification badge counts.
- **Vercel Blob**: Temporary storage for upload staging before Mux ingestion.
- **Mux**: Stores processed video assets; metadata synchronised back to Neon.
- **S3-compatible archival (future)**: Option for long-term retention (deferred).

### Queues and scheduled jobs
| Job | Schedule | Purpose | Implementation |
|-----|----------|---------|----------------|
| invite-expiry-cleanup | Hourly | Invalidate expired invitations | Vercel Cron + Neon update |
| share-link-expiry | Every 15 min | Revoke expired links, notify owners | Vercel Cron |
| notification-digest | Daily (08:00 AEST) | Email summary of due tasks | Vercel Cron + Resend |
| mux-webhook-retry | Ad hoc | Replay failed Mux webhooks via DLQ | Vercel queue or Neon job table |
| residency-report | Weekly | Generate residency evidence for audits | Vercel Cron |
| backup-verification | Monthly | Trigger Neon backup restore validation | Runbook executed, logged in Neon |

### Deployment strategy
- GitHub mono-repo with main/trunk branch, feature branches via PR.
- CI pipeline (GitHub Actions) runs lint, tests, type checks, Playwright, accessibility scans.
- Vercel deploy previews for PRs, manual promotion to production after QA sign-off.
- Feature flags via environment variables and Vercel Edge Config for gradual rollouts (e.g., share link analytics).
- Infrastructure changes tracked via code (Drizzle migrations, config files) ensuring reproducibility.

### Trust & compliance considerations
- Secrets managed in Vercel environment settings with rotation tracked in `05-03-environments-and-secrets.md`.
- All network traffic enforced via HTTPS; CORS limited to Motion Mavericks domains.
- RLS policies prevent cross-tenant data access; share links hashed and stored with short TTLs.
- SLO monitoring (availability, latency, playback) integrated into Sentry + dashboards with alert thresholds.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [04-01-system-context](04-01-system-context.md)
- [04-03-data-flows](04-03-data-flows.md)
- [ADR: authentication approach](adrs/2025-09-19-authentication-approach.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [07-01-api-style-guide](../07-apis-and-contracts/07-01-api-style-guide.md)
- [09-01-service-boundaries](../09-backend/09-01-service-boundaries.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should we introduce an event bus (e.g. Inngest) for high-volume notifications, or do Cron + Neon suffice for MVP?
- Do we need a read replica for Neon to handle analytics queries without impacting transactional load?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Vercel Cron provides adequate reliability for scheduled jobs; fallback is to adopt external scheduler if SLAs not met.
- Mux webhook retries can be handled via Neon-stored DLQ without introducing additional messaging infrastructure.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Technical architecture workshops (September 2025)
- Vendor implementation guides (Vercel, Neon, Mux, Clerk, Resend)
- Legacy security ADRs used for reference
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
