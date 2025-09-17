---
title: "Motion Mavericks Portal Legacy MVP Plan"
doc_path: "docs/specs/legacy-mvp-plan.md"
doc_type: "historical-spec"
status: "archived"
version: "0.1.0"
owner: "Owen (Founder)"
last_updated: "2025-09-18"
tags: [legacy, reference, production]
---

# Motion Mavericks Portal Legacy MVP Plan

> Source: Original outline supplied by Owen. Retained as reference for updated documentation run.

## Scope summary
- **Goal**: One secure, low-friction portal for Motion Mavericks (Admin) and agencies (starting with MKTG) to manage projects, view milestones/tasks, upload/view deliverables, comment on assets, and share view-only links with guests.
- **Roles**:
  - **Admin (Motion Mavericks)** creates agencies, projects, milestones, tasks; uploads assets; manages links and users.
  - **Agency user** authenticates via magic link; views milestones/tasks and assets; comments on assets.
  - **Guest** consumes view-only share links with optional password and expiry.
- **Out-of-scope**: Custom domains/branding, timecoded comments, approval workflows, watermarking, Slack/Teams, SSO/SCIM, templates/automations.
- **Non-functional targets**: 99.9% availability, p95 API latency <300 ms, p95 TTFB <400 ms (ANZ), video start <3 s on 25 Mbps, WCAG 2.2 AA, AU data residency, RPO ≤24 h, RTO ≤1 h.

## Technology stack
- **Hosting/platform**: Vercel (App, Edge, Blob, KV, Cron, Git Previews).
- **Frontend**: Next.js App Router, React, TypeScript, TailwindCSS, shadcn/ui, Radix UI, Lucide/Heroicons, TanStack Query (or SWR), react-hook-form.
- **Auth**: Clerk passwordless magic link or Auth.js alternative; jose, zod, argon2 (optional for passwords), uuid.
- **Database**: Neon/Vercel Postgres with Drizzle ORM migrations.
- **Media**: Mux direct upload, webhooks, HLS, signed playback JWT, Mux Player.
- **Storage**: Vercel Blob for briefs, PDFs, images.
- **Email**: Resend and React Email templates.
- **Observability**: Sentry (Next.js SDK), optional OpenTelemetry.
- **Rate limiting/state**: Vercel KV (Upstash).
- **Build/dev**: Turborepo (optional), pnpm, ESLint, Prettier, PostCSS, Autoprefixer.
- **Testing**: Playwright + axe-playwright, Vitest/Jest.
- **Utilities/Compliance**: date-fns, clsx, OWASP ASVS references, GDPR, OAIC APPs.

## Environment configuration
- **Environment variables**: DATABASE_URL, CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, CLERK_JWT_KEY, RESEND_API_KEY, MUX_TOKEN_ID, MUX_TOKEN_SECRET, MUX_WEBHOOK_SECRET, MUX_SIGNING_KEY_ID, MUX_SIGNING_PRIVATE_KEY, VERCEL_BLOB_READ_WRITE_TOKEN, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN (optional), SENTRY_DSN (optional), BASE_URL.
- **Security lifetimes**: Magic link TTL 30 minutes; session lifetime 14–30 days; share link expiry 14 days default; Mux playback JWT TTL 2 hours; rate limits 10 requests/min/IP.

## Data model (Postgres + Drizzle)
- **Entities**: tenants, users, projects, milestones, tasks, assets, comments, share_links, notifications.
- **Indexes/constraints**: Tenant-based indexes, safe cascading rules, optional RLS via `app.current_tenant_id`.

## API surface (route handlers)
- **Auth**: `POST /api/auth/magic-link`, `POST /api/auth/magic-link/consume`.
- **Share**: `POST /api/share/create`, `GET /r/:token`.
- **Projects/Milestones/Tasks**: `GET /api/projects/:id`, `GET /api/projects/:id/milestones`, `GET /api/milestones/:id/tasks`, plus admin write routes as needed.
- **Assets**: `POST /api/assets/mux/direct-upload`, `POST /api/webhooks/mux`, `GET /api/assets/:id/playback-token`, `GET|POST /api/assets/:id/comments`.
- **Notifications**: `GET /api/notifications`, `POST /api/notifications/mark-read`.
- **Error contract**: `{ code, message, details? }` with rate limit headers.

## Frontend application
- **Routes**: Tenant pages (project overview, asset detail), notifications, share route.
- **Components/UI**: Tables, cards, badges, dialogs, copy buttons, skeletons, empty/error states.
- **State management**: TanStack Query cache keys for projects, milestones, tasks, assets, comments, notifications.
- **Accessibility**: Keyboard navigation, focus states, aria-live, captions, contrast.

## Authentication & sessions
- Passwordless invite flow, session cookies, role-based authorisation, CSRF protection, rate limiting, audit logging.

## Notifications
- Triggers for asset ready, comment mention, task due soon; Resend email templates; in-app feed with badge counts.

## Share links
- Creation with expiry/password options, public view route, playback restrictions, audit logging, revocation and cron sweeps.

## Background jobs
- Vercel Cron tasks (share expiry, task reminders); Mux webhook processing with idempotency and retries.

## Testing strategy
- Unit/integration tests (Vitest/Jest); Playwright E2E flows; deterministic fixtures; accessibility checks.

## Observability & operations
- Sentry instrumentation, structured logging, RED dashboards, alerts for errors/slow routes; backup/restore procedures.

## Release management
- Go/no-go checklist, feature flags, beta communications, KPI dashboard, rollback steps.

## Security & privacy baseline
- Threat mitigations, dependency scanning, key rotation, least privilege, data subject request handling, backup drills.

## Accessibility & content guidelines
- WCAG 2.2 AA compliance, copy tone, error handling guidance, empty-state messaging.

## Deliverables checklist
- Stage documents (tag/final), shared env & telemetry notes, index updates, task plan dependencies, README updates, review pack, migrations, API route docs, front-end specs, testing setup, ops runbooks.

## Acceptance criteria
- Documented flows, endpoint coverage, Mux enforcement, component specs with accessibility notes, notification templates, runbooks, security baseline, resolved questions.

