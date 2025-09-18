<!-- ai:managed start file="docs/playbook/04-architecture-and-decisions/04-01-system-context.md" responsibility="docs" strategy="replace" -->
---
title: "System Context – Motion Mavericks Portal"
doc_path: "docs/playbook/04-architecture-and-decisions/04-01-system-context.md"
doc_type: "architecture"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [architecture, context]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# System Context – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="architecture"
     path="docs/playbook/04-architecture-and-decisions/04-01-system-context.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>architecture, context</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This system context defines the Motion Mavericks portal at C4 Level 1. It maps user roles (Admin, Agency, Guest), external services (Mux, Clerk, Resend, Neon, Vercel Blob, Sentry), and trust boundaries that enforce tenant isolation and share link security. The context informs solution architecture, threat modelling, and integration plans.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Motion Mavericks requires a unified portal to coordinate agencies and clients while meeting compliance obligations (Australian residency, RPO ≤24 h, RTO ≤1 h, WCAG 2.2 AA). The platform runs on Vercel (Next.js) with Neon as the primary database. External services manage identity (Clerk), media (Mux), email (Resend), observability (Sentry), and file storage (Vercel Blob). Trust boundaries ensure only authorised actors access specific data.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes high-level actors, systems, and data flows across production management, asset delivery, and notifications.
- Out of scope: detailed component interactions (covered in 04-02) and data models (covered in 04-03).
- Assumes production hosting on Vercel (ANZ), Neon (Sydney), and Mux AU PoPs.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### C4 Level 1 overview
- Diagram reference: [C4 L1 – Motion Mavericks Portal](<PLACEHOLDER_C4_L1_DIAGRAM>)
- The portal (Next.js on Vercel) is the central system boundary, exposing UI and APIs.
- Users authenticate via Clerk magic links; session cookies stored with HttpOnly + SameSite settings.
- Portal integrates with Neon (PostgreSQL) for multi-tenant data, Vercel Blob for raw uploads (pre-Mux), Mux for encoding/playback, Resend for email notifications, and Sentry for observability.

### Actors and interactions
| Actor | Description | Interfaces | Trust boundary notes |
|-------|-------------|------------|----------------------|
| Admin (Owen) | Configures tenants, projects, agencies, residency evidence | Web UI, Admin APIs | Full access within Motion Mavericks tenant |
| Agency Producer | Manages milestones, tasks, assets | Web UI, asset uploads (signed URLs) | Access restricted to assigned projects via Neon RLS |
| Guest Reviewer | View-only share link recipient | Share page | Access limited to specific assets via signed tokens |
| Clerk | Identity provider | Authentication webhooks, session management APIs | External trust boundary; minimal PII stored locally |
| Neon | PostgreSQL + storage | Database connections (psql, Drizzle) | Tenant-level isolation enforced via RLS policies |
| Mux | Media processing and playback | Direct upload URLs, webhooks, playback URLs | Share tokens signed server-side; playback limited via signed URLs |
| Vercel Blob | Temporary storage prior to Mux handoff | Signed upload URLs | Data resides in AU region, short-lived |
| Resend | Transactional email | Email API, webhook events | Contains minimal PII (email, name) |
| Sentry | Observability | Error and performance telemetry | Sanitised payloads, PII redaction enforced |
| Analytics (Vercel) | Web analytics for success metrics | Client-side instrumentation | Data aggregated, respects privacy policies |

### Trust boundaries
1. **Portal boundary**: separates client browsers from server logic; secured via HTTPS, CSP, and CSRF protections.
2. **Platform boundary**: Vercel serverless functions and edge middleware handle API logic; Neon connections secured via TLS, RLS enforces tenant restrictions.
3. **Media boundary**: Signed Mux URLs prevent unauthorised playback; share tokens stored hashed.
4. **Email boundary**: Resend handles delivery; tokens not distributed via email plain text beyond intended use.
5. **Observability boundary**: PII redacted before sending to Sentry. Logs stored within compliance-retention policies.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [04-02-solution-architecture](04-02-solution-architecture.md)
- [04-04-threat-model](04-04-threat-model.md)
- [High-level portal brief](../../plan/HighLevel.Final.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [04-03-data-flows](04-03-data-flows.md)
- [10-01-identity-provider](../10-integrations/10-01-identity-provider.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should we introduce a dedicated compliance reporting service boundary for exporting residency evidence?
- Will government clients require isolated deployment environments beyond the shared Vercel tenancy?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Mux provides AU edge resources sufficient to meet playback SLA without additional CDN contracts.
- Clerk magic link flows satisfy agency security requirements; otherwise, SSO integration would be reconsidered.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Stakeholder workshops (September 2025)
- Vendor documentation (Vercel, Neon, Mux, Clerk, Resend)
- Legacy MVP architecture context
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
