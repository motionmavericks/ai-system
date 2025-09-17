---
title: "Motion Mavericks Portal – Integrated Execution Brief"
doc_path: "docs/plan/HighLevel.Final.md"
doc_type: "agent_requirements"
status: "draft"
version: "0.3.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Client Success Lead", "Technical Delivery Lead"]
last_updated: "2025-09-18"
project: "Motion Mavericks Portal"
module: "core"
tags: [project-management, production, agencies, clients, collaboration]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "docs/specs/legacy-mvp-plan.md"
pii: true
security_review_required: true
compliance_scope: [AU_Privacy, GDPR]
---

# Motion Mavericks Portal – Integrated Execution Brief

> Status: **draft** • Version: **0.3.0** • Updated: **2025-09-18**

<doc xmlns="urn:docs:agent-execution"
     type="agent_requirements"
     path="docs/plan/HighLevel.Final.md"
     version="0.3.0"
     status="draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="docs/specs/legacy-mvp-plan.md"/>
    <tags>project-management, production, agencies, clients, collaboration</tags>
  </meta>

  <sections>

    <section id="objective" heading="Objective and success definition">
      <content><![CDATA[
## 1. Objective and success definition
- **Problem**: Motion Mavericks currently orchestrates agency partners and client stakeholders through scattered spreadsheets, email threads, ad-hoc file shares, and manual status calls. This creates inconsistent handovers, opaque accountability, and a high risk of missed milestones across tightly scheduled productions.
- **Goal**: Deliver a single secure portal that Motion Mavericks (Admin), agency partners (starting with MKTG), and client guests can use to manage projects, milestones, tasks, assets, comments, notifications, and shareable view-only links.
- **Key outcomes**:
  - Every active project tracked in the portal with milestones, tasks, and deliverable status visible to authorised users.
  - Role-based access (Admin, Agency, Guest) enforced via passwordless magic-link authentication and signed share tokens.
  - Non-functional targets met: 99.9% monthly availability, p95 API latency <300 ms, p95 TTFB <400 ms in ANZ, video start time <3 s on 25 Mbps connections, WCAG 2.2 AA compliance for critical flows, AU-first data residency with RPO ≤24 h and RTO ≤1 h.
- **Success metrics**:
  - ≥90% of agency users onboarded complete first login within five minutes of invitation.
  - 100% of production milestones and tasks for pilot projects recorded in the portal by launch.
  - Guest share links achieve <1% playback error rate and ≥80% open rate within 48 hours of delivery.
  - No critical accessibility or security regressions detected in CI test suites prior to go-live.
]]></content>
    </section>

    <section id="doc_inventory" heading="Documentation inventory">
      <content><![CDATA[
## 2. Documentation inventory
| Relative path | Purpose | Priority | Notes |
|---------------|---------|----------|-------|
| docs/playbook/00-brief-and-vision/00-01-product-vision.md | Strategic direction, mission, value pillars aligned to unified portal | P0 | Updated to reflect production management scope |
| docs/playbook/01-discovery-and-research/01-01-production-stakeholders.md | Capture Admin, Agency, Client user needs and journey pain points | P0 | Replace previous security-focused personas |
| docs/playbook/02-requirements-and-scope/02-01-functional-requirements.md | Enumerate project, milestone, task, asset, notification, share flows | P0 | Include mappings to acceptance criteria and success metrics |
| docs/playbook/02-requirements-and-scope/02-03-non-functional-requirements.md | Detail availability, performance, accessibility, residency, RPO/RTO targets | P0 | Anchored in legacy spec figures |
| docs/playbook/03-ux-and-design/03-02-project-journeys.md | Describe portal navigation, milestone board, asset review, share experience | P0 | Must incorporate WCAG 2.2 AA expectations |
| docs/playbook/04-architecture-and-decisions/04-02-solution-architecture.md | Lay out multi-tenant model (tenants, users, projects, assets), Mux integration, share token flows | P0 | Align with provided data model and tech stack |
| docs/playbook/04-architecture-and-decisions/04-03-data-model.md | Document Drizzle migrations covering all tables and indexes | P0 | Include tenancy enforcement patterns |
| docs/playbook/05-project-setup/_shared/env-config.final.md | Consolidate environment variables, TTLs, key rotation schedule | P0 | Derived from legacy spec env matrix |
| docs/playbook/06-data-model-and-storage/06-01-drizzle-migrations.md | Migration plan with up/down scripts, verification strategy | P0 | Include RLS considerations (optional) |
| docs/playbook/07-apis-and-contracts/07-01-api-surface.md | Define route handlers, request/response schemas, error contracts | P0 | Must cover auth, share, projects/milestones/tasks, assets, notifications |
| docs/playbook/08-frontend/08-01-app-router-structure.md | Map Next.js routing, component tree, loading/error states | P0 | Reference portal routes (tenant view, asset, share link) |
| docs/playbook/09-backend/09-01-authentication-sessions.md | Detail Clerk magic link flows, session lifespan, CSRF, rate limits | P0 | Align with spec TTL targets |
| docs/playbook/10-integrations/10-01-mux-integration.md | Direct upload, webhook verification, playback JWT claims | P0 | Include signed playback enforcement |
| docs/playbook/12-testing-and-quality/12-01-testing-strategy.md | Outline unit, integration, E2E, accessibility test suites | P0 | Include deterministic data seeding |
| docs/playbook/13-devops-ci-cd/13-01-release-runbook.md | Go/no-go checklist, rollback plan, monitoring hand-off | P0 | Capture cron jobs, KPI dashboard |
| docs/playbook/14-observability/14-01-telemetry-and-alerting.md | RED metrics, Sentry instrumentation, alert thresholds | P0 | Map to notifications and share flows |
| docs/playbook/15-performance-and-reliability/15-01-resilience-controls.md | Rate limiting, share sweep cron, backup/restore workflow | P0 | Ensure RPO/RTO targets met |
| docs/playbook/_generated/context.json | Machine-readable facts extracted from this brief | P0 | Must be regenerated once docs updated |
| docs/playbook/20-archive-and-postmortems/20-03-change-log.md | Append documentation run entry | P0 | Required per orchestration guide |
]]></content>
    </section>

    <section id="scope" heading="Scope and solution outline">
      <content><![CDATA[
## 3. Scope and solution outline
- **Primary roles**:
  - **Admin (Motion Mavericks)**: manages agencies, projects, milestones, tasks, uploads assets, issues share links, oversees notifications, and revokes access.
  - **Agency user**: authenticates via magic link, views assigned projects, updates tasks, comments on assets, receives notifications.
  - **Guest**: consumes view-only share links for individual assets or project deliverables; optional password and expiry enforcement.
- **In-scope features**:
  - Multi-tenant data model covering tenants, users, projects, milestones, tasks, assets, comments, share links, notifications.
  - Asset pipeline using Mux direct uploads, webhook processing, signed playback tokens, and Vercel Blob for non-video files.
  - Notifications via Resend (email templates for invites, magic links, asset ready, comment mentions, task reminders) and in-app feed with badge count.
  - Share link lifecycle with password hashing, expiry sweeps, revocation, and audit logging.
  - Next.js App Router front end with state management (TanStack Query), accessible UI (shadcn/ui, Radix, Tailwind), and specific page structures for projects, assets, notifications, share page.
- **Out-of-scope for MVP**:
  - Custom branding or white-labelling.
  - Timecoded annotations, approval workflows, watermarking.
  - Slack/Teams integrations, SSO/SCIM, template-driven automation.
  - Deep analytics dashboards beyond KPI snapshots.
- **Assumptions**:
  - Agencies will adopt portal-based commenting in lieu of email chains.
  - Clients accept view-only playback without download capability for MVP.
  - Existing Melbourne-based legal and finance partners will review updated workflows for privacy and invoicing alignment.
]]></content>
    </section>

    <section id="context" heading="Business and technical context">
      <content><![CDATA[
## 4. Business and technical context
- **Operating model**: Motion Mavericks leads end-to-end production, contracting agencies (e.g., MKTG) and specialist crews (editors, colourists, sound designers) per project. Clients span commercial brands and creative organisations requiring stringent access control and audit-ready progress tracking.
- **Current pain points**: Lack of centralised milestone visibility, inconsistent asset delivery, duplicated status updates across email and spreadsheets, and no audit trail for guest access.
- **Opportunity**: A portal consolidating project tracking and asset delivery strengthens Motion Mavericks’ competitive position, reduces rework, and provides clients with a polished, transparent experience aligned to modern production expectations.
- **Technical landscape**: The stack comprises Vercel-hosted Next.js (App Router), TypeScript, Tailwind, shadcn/ui, Radix UI, TanStack Query, Clerk (magic link auth), Neon Postgres with Drizzle ORM, Vercel Blob, Mux Video, Resend email, Vercel KV, Sentry, Playwright, Vitest/Jest, and supporting utilities (zod, jose, uuid, date-fns, clsx).
]]></content>
    </section>

    <section id="constraints" heading="Operational constraints">
      <content><![CDATA[
## 5. Operational constraints
- **Non-functional targets**: Availability 99.9% monthly; p95 API latency <300 ms; p95 TTFB <400 ms (ANZ); video start <3 s on 25 Mbps; WCAG 2.2 AA; AU-first residency with RPO ≤24 h and RTO ≤1 h.
- **Security/privacy**: Magic link TTL 30 minutes; session lifetime 14–30 days; share link default expiry 14 days with optional password; Mux playback JWT TTL 2 hours; rate limits at 10 requests/min/IP on auth/share endpoints; HMAC verification for Mux webhooks; structured audit logs for share link opens.
- **Resource/time**: Owen remains primary operator; agency partners available on retainer; documentation must minimise rework for contracted specialists; launch window coordinated with upcoming campaign cycles.
- **Compliance**: Must satisfy Australian Privacy Principles and GDPR expectations for data handling, audit trails, and data subject requests.
]]></content>
    </section>

    <section id="tech_stack" heading="Technology stack and environment">
      <content><![CDATA[
## 6. Technology stack and environment
- **Platform & hosting**: Vercel (App, Edge, Blob, KV, Cron, Git Previews).
- **Frontend**: Next.js App Router, React, TypeScript, TailwindCSS, shadcn/ui, Radix UI, Lucide/Heroicons, TanStack Query, react-hook-form.
- **Auth**: Clerk (passwordless magic link) with optional Auth.js fallback; jose for JWT management; argon2 for share password hashing; sessions stored as cookies with refresh support.
- **Database**: Neon (Vercel Postgres) with Drizzle ORM migrations; optional RLS policies leveraging `app.current_tenant_id`.
- **Media & storage**: Mux Video (direct upload, webhooks, HLS playback, signed tokens), Mux Player, Vercel Blob for PDFs/images/briefs.
- **Messaging & notifications**: Resend email with React Email templates; in-app feed stored in Postgres (notifications table) and optionally cached in Vercel KV.
- **Observability**: Sentry Next.js SDK, optional OpenTelemetry; structured logging with correlation IDs; RED dashboards.
- **Testing**: Playwright with axe-playwright for accessibility, Vitest/Jest for unit/integration, deterministic fixtures.
- **Environment variables**: DATABASE_URL, CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, CLERK_JWT_KEY, RESEND_API_KEY, MUX_TOKEN_ID, MUX_TOKEN_SECRET, MUX_WEBHOOK_SECRET, MUX_SIGNING_KEY_ID, MUX_SIGNING_PRIVATE_KEY, VERCEL_BLOB_READ_WRITE_TOKEN, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN (optional), SENTRY_DSN (optional), BASE_URL.
- **Security lifetimes**: Magic link TTL 30 minutes; share link expiry default 14 days; Mux playback JWT 2 hours; rate limits 10 requests/min/IP.
]]></content>
    </section>

    <section id="data_model" heading="Domain model and storage">
      <content><![CDATA[
## 7. Domain model and storage
- **Core tables** (Postgres + Drizzle): tenants, users, projects, milestones, tasks, assets, comments, share_links, notifications.
- **Relationships**:
  - Tenants represent Motion Mavericks (admin) and agencies; users reference tenant with roles (admin, agency).
  - Projects belong to tenant and drive milestone/task hierarchies.
  - Assets link to projects, optionally Mux asset IDs/playback IDs and Vercel Blob keys; comments belong to assets.
  - Share_links reference asset or project, track tokens, expiry, password hash, revocation.
  - Notifications map to users with JSON payloads and read timestamps.
- **Indexes and constraints**: Tenant-scoped indexes on `(tenant_id, created_at)`; asset/comment indexes on `(project_id, created_at)`; foreign keys with cascading rules only where safe; prefer soft deletes not required for MVP.
- **Access control**: Application-level tenancy checks; optional Postgres RLS using `current_setting('app.current_tenant_id')` pattern.
]]></content>
    </section>

    <section id="api_surface" heading="API surface">
      <content><![CDATA[
## 8. API surface
- **Auth**:
  - `POST /api/auth/magic-link` – issue magic link (rate limited).
  - `POST /api/auth/magic-link/consume` – redeem token and create session.
- **Share links**:
  - `POST /api/share/create` – admin/agency creation with expiry/password options.
  - `GET /r/:token` – resolve share token, prompt for password if configured, render view-only page.
- **Projects & work management**:
  - `GET /api/projects/:id`, `GET /api/projects/:id/milestones`, `GET /api/milestones/:id/tasks` for portal consumption.
  - Admin internal routes for create/update milestones/tasks (documented for completeness).
- **Assets**:
  - `POST /api/assets/mux/direct-upload` – generate direct upload URL.
  - `POST /api/webhooks/mux` – handle Mux lifecycle events with HMAC verification (asset ready/error).
  - `GET /api/assets/:id/playback-token` – return signed playback JWT when authorised.
  - `GET /api/assets/:id/comments` / `POST /api/assets/:id/comments` – comment feed and creation with zod validation.
- **Notifications**:
  - `GET /api/notifications` – list notifications for current user.
  - `POST /api/notifications/mark-read` – bulk mark as read.
- **Ops** (optional): `POST /api/ops/feature-flags` for controlled flag toggles.
- **Error contract**: Standard JSON envelope `{ code: string, message: string, details?: object }`, rate limit headers on throttled endpoints.
]]></content>
    </section>

    <section id="frontend" heading="Frontend architecture">

    <section id="frontend" heading="Frontend architecture">
      <content><![CDATA[
## 9. Frontend architecture
- **Routing**: Next.js App Router structure with tenant-aware segments `app/(tenant)/[agency]/projects/[id]`, `app/(tenant)/[agency]/assets/[id]`, and public share route `app/r/[token]`.
- **Key pages**:
  - Project overview: displays milestones and tasks, status badges, due dates, add/edit controls for Admin.
  - Asset detail: embeds Mux Player, shows metadata, comments tab, share link management modal.
  - Notifications feed: lists unread/read items with mark-as-read actions.
  - Share page: view-only layout with optional password prompt, audit-friendly messaging.
- **Components**: Reusable cards, tables, badges, tabs, dialogs, copy-to-clipboard buttons, skeleton loaders, empty/error states with clear CTAs.
- **State management**: TanStack Query for data fetching with cache keys (`['project', id]`, `['milestones', projectId]`, `['tasks', milestoneId]`, `['asset', id]`, `['comments', assetId]`, `['notifications']`). Optimistic updates for comments and task toggles.
- **Accessibility**: Keyboard navigable controls, visible focus states, aria-live regions for new comments/notifications, caption support for videos, colour contrast ≥4.5:1.
]]></content>
    </section>

    <section id="auth" heading="Authentication and sessions">
      <content><![CDATA[
## 10. Authentication and sessions
- **Passwordless flow**: Admin invites user or agency user requests magic link via email; `POST /api/auth/magic-link` issues token (30-minute TTL). User clicks email link, `POST /api/auth/magic-link/consume` validates token, sets session cookie (14–30 day lifespan) with optional global sign-out.
- **Authorisation**:
  - Admin: full access across tenants, manage agencies and projects.
  - Agency user: limited to tenant-specific projects, milestones, assets, commenting.
  - Guest share token: read-only, restricted to referenced asset/project; no POST/PUT access.
- **Controls**: Rate limit auth endpoints (10 requests/min/IP), CSRF protection on state-changing routes, same-site cookies, audit logging of login attempts, optional multi-factor escalation post-MVP.
]]></content>
    </section>

    <section id="notifications" heading="Notifications and communications">
      <content><![CDATA[
## 11. Notifications and communications
- **Triggers**: `asset.ready` (Mux webhook) → email + in-app; `comment_create` (mentions/all participants) → email + in-app; `task_due_soon` (24 h prior) → optional email + in-app.
- **Email delivery**: Resend with React Email templates (invite, magic link, asset ready, comment mention, due soon). Emails include relevant links, respect privacy (no sensitive data in subject/body).
- **In-app feed**: Notifications table captures payloads; unread count displayed in header via badge; `mark-read` endpoint updates state; optional caching in Vercel KV for quick badge retrieval.
]]></content>
    </section>

    <section id="share_links" heading="Share link lifecycle">
      <content><![CDATA[
## 12. Share link lifecycle
- **Creation**: Admin (or permitted agency user) generates share scoped to asset/project with default 14-day expiry and optional password. Tokens are random UUIDs; passwords hashed with argon2.
- **Consumption**: Public route `/r/:token` verifies token, enforces password if configured, renders view-only details. Playback uses signed JWT tokens (2-hour TTL) to prevent reuse outside session.
- **Revocation & hygiene**: Admin can revoke single link or entire project set. Vercel Cron sweeps expired links nightly and marks them inactive. Audit log records opens with timestamp/IP (minimal PII, stored securely).
]]></content>
    </section>

    <section id="jobs" heading="Background jobs and integrations">
      <content><![CDATA[
## 13. Background jobs and integrations
- **Mux webhook**: Idempotent processing of `asset.created`, `asset.ready`, `asset.errored` events; verifies HMAC signature and updates asset status, triggering notifications.
- **Cron jobs**: Nightly share link expiry sweep; optional daily notifier for tasks due within 24 hours; potential weekly KPI digest.
- **Feature flags**: Simple admin-only endpoint or DB table to toggle features (e.g., notifications, due-soon reminders) documented for operations.
]]></content>
    </section>

    <section id="testing" heading="Testing and quality assurance">
      <content><![CDATA[
## 14. Testing and quality assurance
- **Unit/integration tests**: Vitest/Jest for services (share link creation, notification builder, JWT signer), schema validation (zod), and data access functions.
- **E2E (Playwright)**: Cover invite → login → project view; asset upload → comment addition → share link creation; guest share consumption with optional password. Capture traces/snapshots on failure; run accessibility checks using axe-playwright.
- **Fixtures and seeds**: Deterministic data seeding scripts for CI and local runs; mocks or sandbox integrations for Resend and Mux.
- **CI gates**: Linting (ESLint, Prettier), type checks, Playwright headless runs, accessibility regression; fail build on critical issues.
]]></content>
    </section>

    <section id="observability" heading="Observability and logging">
      <content><![CDATA[
## 15. Observability and logging
- **Instrumentation**: Sentry for front-end and server routes; structured logging (JSON) with correlation IDs; optional OpenTelemetry traces for key flows.
- **Dashboards**: Monitor RED metrics (request rate, error rate, duration), share link open success, playback errors, task notification throughput.
- **Alerts**: Thresholds for error spikes, slow routes, failed cron jobs, webhook failures, share token abuse patterns.
- **Compliance**: Logs redacted; secrets excluded; retention policy aligned to privacy requirements (e.g., 90-day application logs, 365-day audit logs).
]]></content>
    </section>

    <section id="release" heading="Release management and operations">
      <content><![CDATA[
## 16. Release management and operations
- **Go/no-go checklist**: DB migrations applied; API smoke tests; E2E suite green; webhooks verified; monitoring live; rollback tested; on-call contact assigned.
- **KPI dashboard**: % active agency projects in portal; median time invite → first project view (<5 min); share link open rate; playback error rate (<1%); support tickets per project (≤1 on average).
- **Rollback**: Versioned deploys, documented revert process, post-mortem template for incidents.
- **Support**: Onboarding packs for agencies, help docs for clients, escalation path to Owen and contracted support partners.
]]></content>
    </section>

    <section id="security" heading="Security and privacy baseline">
      <content><![CDATA[
## 17. Security and privacy baseline
- **Threats mitigated**: Token leakage (short TTLs, one-time magic links), brute-force share passwords (rate limits, lockout), XSS/CSRF (output encoding, same-site cookies, origin checks), webhook spoofing (HMAC + replay guard).
- **Practices**: Weekly dependency scanning, lockfile review, key rotation every 180 days (Mux signing key, Resend, Clerk), least privilege on API tokens, data subject request workflows (export/delete) documented.
- **Backups**: Nightly DB backups with quarterly restore drills; verify RTO ≤1 h.
- **Privacy**: Store minimal PII (names, emails); audit share link usage; provide contact for data subject requests under GDPR/AU Privacy.
]]></content>
    </section>

    <section id="accessibility" heading="Accessibility and content guidelines">
      <content><![CDATA[
## 18. Accessibility and content guidelines
- **WCAG 2.2 AA**: Keyboard navigable interfaces, skip links, focus states, ARIA roles/names, live regions for dynamic updates, captions when provided, alt text for imagery.
- **Copy tone**: Clear, action-oriented messaging; specific error messages with recovery steps; empty states encouraging next actions (e.g., “Add your first milestone”).
- **Testing**: Automated accessibility checks in CI plus manual assistive tech spot checks pre-release.
]]></content>
    </section>

    <section id="deliverables" heading="Deliverables and documentation plan">
      <content><![CDATA[
## 19. Deliverables and documentation plan
- **Stage-based documentation**: Each playbook folder (00–09 initially) to include `tag.md` and `final.md` capturing tasks, subtasks (1–3 h each), acceptance criteria, references as per legacy plan update.
- **Shared artefacts**: `_shared/env-config.final.md` (env matrix, TTLs), `_shared/telemetry-a11y.final.md` (event instrumentation and WCAG notes).
- **Indexes**: `docs/playbook/INDEX.md` and `docs/playbook/mvp-task-plan.tag.md` updated with execution order, dependencies, and cross-links.
- **Schema/contracts**: Drizzle migrations, API route documentation, Mux integration guide, front-end page/component trees, testing configuration, operations runbook, monitoring/alerting notes, backup/restore guidance.
- **Change management**: `docs/playbook/20-03-change-log.md` updated after each automation run; open questions tracked in `open-questions.final.md` with escalation pathways.
]]></content>
    </section>

    <section id="acceptance" heading="Acceptance criteria">
      <content><![CDATA[
## 20. Acceptance criteria
- All major flows (invite → login → project → asset → comment; share link view-only) documented with explicit tasks, acceptance tests, and state coverage.
- Endpoints and schemas documented with request/response samples; migrations compile and run in staging.
- Mux upload → webhook → playback path tested with signed playback enforcement; alerts configured for failures.
- Front-end components specified with file paths, loading/error/empty states, and accessibility checks.
- Notifications (email + in-app) defined with triggers and templates; tests in place.
- Runbooks for release, KPIs, rollback, monitoring, backup/restore prepared and reviewed.
- Security and privacy controls documented; rate limits enforced; compliance notes captured.
- No critical open questions outstanding; deferrals recorded with remediation plans.
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## 21. Open questions
| Question | Owner | Due date | Status | Notes |
|----------|-------|----------|--------|-------|
| Confirm agency rollout order and contract requirements beyond MKTG | Owen | 2025-09-25 | Open | Impacts onboarding flows and legal review |
| Decide cadence and format for client status digests (weekly vs real-time) | Client Success Lead | 2025-09-22 | Open | Influences notification templates |
| Validate requirement for optional guest download access post-MVP | Agency Partner Lead | 2025-10-05 | Open | Could affect Mux configuration |
]]></content>
    </section>

  </sections>
</doc>
