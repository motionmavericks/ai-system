# Spec Tasks

These tasks convert the updated Motion Mavericks portal brief into complete playbook documentation across the existing `/docs/playbook` tree.

> Created: 2025-09-18
> Status: Ready for Implementation

## Tasks

### 1. 00-brief-and-vision/ Documentation (5 files)

1.1 Review the refreshed `docs/plan/HighLevel.Final.md` and orchestration guide to extract portal mission, roles (Admin, Agency, Guest), and non-functional targets.

1.2 Create/update `00-01-product-vision.md` covering: Mission, Value proposition (≥4 focused on unified portal experience), Non-goals (≥5 aligned to deferred features), Out-of-scope (≥6 from legacy spec), Related, Open questions, Assumptions, Sources.

1.3 Create/update `00-02-success-metrics.md` with a table (Metric, Definition, Target, Data source, Cadence, Owner) ≥7 rows reflecting onboarding speed, milestone coverage, share-link performance, accessibility compliance, operational SLIs.

1.4 Create/update `00-03-stakeholders.md` to describe Owen, agency partners, client stakeholders, contracted specialists; include table columns Role, Stakeholder/Group, Decision rights, RACI, Contact cadence (≥6 rows).

1.5 Create/update `00-04-constraints.md` describing Time, Budget, Technical, Regulatory, Implications per updated targets (99.9% availability, AU residency, RPO/RTO).

1.6 Create/update `00-05-risks-and-assumptions.md` with risk register table columns: ID, Risk, Prob, Impact, RAG, Mitigation, Owner (≥10 rows) across project tracking, data residency, agency adoption, compliance, share links.

1.7 Validate all five files via orchestration guide §9.1; remove unused template sections, ensure AI-managed blocks intact.

### 2. 01-discovery-and-research/ Documentation (4 files)

2.1 Analyse updated brief and legacy spec to derive research insights on production companies, agency collaboration, client review needs.

2.2 Create/update `01-01-market-research.md` with sections: Production collaboration market size, Trends (≥5) in agency portals, Drivers (centralisation, audit), Blockers (change management, budget), Segment notes (Admin, Agency, Client).

2.3 Create/update `01-02-competitor-analysis.md` comparing ≥3 tools (e.g., Frame.io, Asana, Monday) across ≥6 capability rows (milestones, asset review, share links, notifications, permissions, residency). Provide Summary with Gaps (≥5) to emphasise Motion Mavericks differentiation.

2.4 Create/update `01-03-user-interviews.md` with Screener criteria for agency and client participants, Interview guide (≥12 questions covering project tracking, asset review, notifications, security), Synthesis template, Consent statement meeting Australian privacy norms.

2.5 Create/update `01-04-content-and-data-audit.md` inventory table (Source, Type, Owner, Quality, Freshness, Notes) ≥15 rows covering briefs, milestones spreadsheets, share drives, footage archives, approval emails.

2.6 Confirm each document meets orchestration guide §9.1 and references updated brief/spec.

### 3. 02-requirements-and-scope/ Documentation (5 files)

3.1 Extract functional and non-functional requirements from the new brief, legacy plan, and research outputs.

3.2 Create/update `02-01-user-stories.md` grouped by epic (Onboarding, Project tracking, Asset delivery, Collaboration, Share links, Notifications). Provide ≥22 stories in “As a… I want… so that…” format with Trace column referencing success metric IDs.

3.3 Create/update `02-02-acceptance-criteria.md` using Gherkin scenarios for critical paths (invite→login, milestone update, asset upload, comment, share view). Include ≥12 scenarios with ≥4 negative cases.

3.4 Create/update `02-03-non-functional-requirements.md` table (Area, SLI/SLO, Target, Method, Env) ≥14 rows mapping availability, latency, accessibility, residency, RPO/RTO, playback, rate limiting, audit logging, backup drills.

3.5 Create/update `02-04-scope-boundaries.md` covering In-scope (portal features), Out-of-scope (deferred capabilities), De-scoping rules (prioritisation guardrails), Assumptions (agency adoption, client preferences).

3.6 Create/update `02-05-definition-of-done.md` with checklists for Engineering, Design, QA, Security, Docs (each ≥9 items tailored to portal flows, accessibility, testing, documentation).

3.7 Validate requirements set per orchestration guide §9.1.

### 4. 03-ux-and-design/ Documentation (5 files)

4.1 Translate requirements into UX artefacts capturing tenant-aware navigation and accessible workflows.

4.2 Create/update `03-01-personas.md` with 3–5 personas (Admin Owen, Agency Producer, Client Stakeholder, Guest Reviewer). Each includes Goals, JTBD (≥3), Frictions (≥5), Accessibility needs, Key quotes (≤2).

4.3 Create/update `03-02-journeys-and-flows.md` describing at least 3 flows: Admin creates project/milestones, Agency completes tasks/comments, Guest views share link. Provide steps table (Step, Actor, Intent, Happy path, Failure).

4.4 Create/update `03-03-information-architecture.md` with Sitemap (tenant dashboard, projects, assets, notifications, settings) and Content model (entities ≥7 aligning with data model).

4.5 Create/update `03-04-wireframes.md` linking to ≥10 asset references (use placeholders) covering states: Empty, Loading, Error, Success, with notes on share modal and notifications drawer.

4.6 Create/update `03-05-design-system.md` including tokens table (Name, Category, Example, Usage) for colours, spacing, typography; components list (≥16) with states (default, hover, focus, disabled) for cards, task rows, share modal, notifications.

4.7 Verify UX docs meet accessibility guidance and orchestration checks.

### 5. 04-architecture-and-decisions/ Documentation (5 files + ADRs)

5.1 Interpret technical sections (tech stack, data model, API surface) for architectural documentation.

5.2 Create/update `04-01-system-context.md` with C4 L1 diagram link and narrative mapping Admin, Agency, Guest, external systems (Mux, Clerk, Resend, Neon, Vercel Blob) and trust boundaries (tenant isolation, share links).

5.3 Create/update `04-02-solution-architecture.md` detailing Runtime (Next.js on Vercel), Components (≥8 modules: Auth, Project service, Task service, Asset pipeline, Notifications, Share link service, Frontend app, Admin tools), Data stores, Queues/Cron, Deployment strategy.

5.4 Create/update `04-03-data-flows.md` with CRUD map table (entities ≥8) and Event flows list (≥12) for asset ready, comment creation, task due notifications, share link revocation (include producer/consumer).

5.5 Create/update `04-04-threat-model.md` performing STRIDE analysis per component, referencing share token threats, webhook spoofing, tenant isolation; include DFD link and mitigations per threat.

5.6 Update `04-architecture-and-decisions/adrs/README.md` with ADR index table (ADR, Title, Status, Date, Owner) referencing new decisions (e.g., choose Clerk magic link, Mux direct upload, TanStack Query, Vercel Cron).

5.7 Draft ADRs for: Authentication approach, Multi-tenant data model enforcement, Asset pipeline with Mux, Notification delivery strategy, Share link security controls. Use provided templates.

5.8 Validate architecture set per orchestration guide §9.1.

### 6. 05-project-setup/ Documentation (5 files)

6.1 Align project setup documents with the portal tech stack and operational requirements.

6.2 Update `05-01-repository-setup.md` detailing mono-repo/Turborepo structure, branch model, PR checks, semantic versioning.

6.3 Update `05-02-coding-standards.md` covering TypeScript conventions, UI patterns (shadcn/ui), linting/prettier configs, naming.

6.4 Update `05-03-environments-and-secrets.md` specifying environment tiers (dev, staging, prod), credential management (Clerk, Mux, Resend, Neon), rotation cadence.

6.5 Update `05-04-package-and-dependency-policy.md` covering pnpm usage, dependency audit schedule, OWASP checks.

6.6 Update `05-05-precommit-and-ci-conventions.md` outlining git hooks, CI checks (lint, test, Playwright, accessibility), merge requirements.

6.7 Ensure documents include Related, Open questions, Assumptions, Sources.

### 7. 06-data-model-and-storage/ Documentation (5 files)

7.1 Use data model section to flesh out storage strategy.

7.2 Update `06-01-schema-design.md` with ERD description of tenants→projects→milestones→tasks, assets, comments, share_links, notifications, indexes, constraints.

7.3 Update `06-02-migrations-plan.md` describing Drizzle migration process, up/down scripts, verification, RLS (optional) handling.

7.4 Update `06-03-seed-and-fixtures.md` covering deterministic seeds for Playwright, test accounts (admin, agency, guest), data anonymisation.

7.5 Update `06-04-backup-and-restore.md` describing Neon backup schedule, restore drills (quarterly), RPO/RTO compliance, verification steps.

7.6 Update `06-05-data-governance.md` covering retention (audit logs 365 days, share tokens 14-day default), privacy handling, DSAR workflow, logging minimisation.

### 8. 07-apis-and-contracts/ Documentation (5 files)

8.1 Reflect API surface from brief.

8.2 Update `07-01-api-style-guide.md` for REST conventions, error envelope, rate limit headers, JSON schema.

8.3 Update `07-02-endpoints-and-contracts.md` with detailed request/response examples for auth, projects/milestones/tasks, assets, comments, notifications, share links. Include success and failure schemas.

8.4 Update `07-03-auth-and-authorisation.md` covering magic link issuance, session cookies, role-based checks, token signing, share password hashing.

8.5 Update `07-04-rate-limiting-and-quota.md` detailing 10 req/min/IP on auth/share, asset upload throttling, share view monitoring, abuse detection.

8.6 Update `07-05-webhooks-and-events.md` covering Mux webhook validation, idempotency, retries, share link expiry cron events.

### 9. 08-frontend/ Documentation (7 files)

9.1 Align frontend documentation with portal UX.

9.2 Update `08-01-tech-stack.md` summarising Next.js App Router, TypeScript, Tailwind, shadcn/ui, Radix, TanStack Query, React Hook Form, Resend via API.

9.3 Update `08-02-routing-and-navigation.md` covering tenant routing, layout hierarchy, protected routes, share page.

9.4 Update `08-03-state-management.md` describing query caches, optimistic updates, offline considerations, suspense handling.

9.5 Update `08-04-forms-and-validation.md` covering project/milestone forms, share link modal, zod schemas, error messaging.

9.6 Update `08-05-ui-components.md` listing key components (ProjectCard, MilestoneList, TaskRow, AssetViewer, ShareModal, NotificationBell) with props and states.

9.7 Update `08-06-accessibility-a11y.md` aligning to WCAG 2.2 AA (focus management, aria-live, captions, keyboard shortcuts).

9.8 Update `08-07-internationalisation-i18n.md` documenting copy strategy (en-AU primary), formatting, content localisation future considerations.

### 10. 09-backend/ Documentation (5 files)

10.1 Reflect service design.

10.2 Update `09-01-service-boundaries.md` defining auth service, project service, task service, asset pipeline, notification service, share link service.

10.3 Update `09-02-business-logic.md` describing workflow rules (milestone status transitions, asset status updates, notification triggers, share revocation).

10.4 Update `09-03-background-jobs.md` covering Vercel Cron tasks, queue handling (if required), idempotency strategies.

10.5 Update `09-04-file-and-media-storage.md` detailing Mux direct upload, webhooks, Vercel Blob usage, retention.

10.6 Update `09-05-caching-strategy.md` covering Vercel KV usage for rate limits/notification counts, HTTP caching for share pages, fallback strategies.

### 11. 10-integrations/ Documentation (5 files)

11.1 Ensure integration docs cover Clerk, Mux, Resend, analytics.

11.2 Update `10-01-identity-provider.md` for Clerk magic link configuration, user provisioning, webhook handling.

11.3 Update `10-02-payments.md` (repurpose to “Commercial considerations”) with notes on project invoicing/agency billing placeholders and deferral plan (if not applicable, mark out-of-scope with justification).

11.4 Update `10-03-email-and-notifications.md` detailing Resend templates, React Email, deliverability, unsubscribe policies if required.

11.5 Update `10-04-analytics-and-product-events.md` specifying events (project_created, milestone_completed, asset_viewed, share_opened), instrumentation, privacy.

11.6 Update `10-05-third-party-webhooks.md` focusing on Mux, Resend (bounce), optional Slack deferrals; include security measures.

### 12. 11-security-and-compliance/ Documentation (5 files)

12.1 Capture security baseline around share links, data residency, compliance.

12.2 Update `11-01-security-baseline.md` summarising threat controls (JWT TTLs, rate limiting, CSRF, XSS prevention, audit logging).

12.3 Update `11-02-secrets-management.md` covering storage (Vercel env, Doppler if used), rotation, access requests.

12.4 Update `11-03-privacy-and-data-protection.md` aligning with GDPR/APP obligations, DSAR workflow, data minimisation, logging policies.

12.5 Update `11-04-compliance-checklist.md` mapping controls to AU Privacy Principles, GDPR articles, internal policies.

12.6 Update `11-05-incident-response.md` detailing detection, escalation, communication for breaches, share link compromise, downtime.

### 13. 12-testing-and-quality/ Documentation (6 files)

13.1 Align quality plans with new flows.

13.2 Update `12-01-test-strategy.md` summarising unit/integration/E2E coverage, accessibility audits, performance targets.

13.3 Update `12-02-unit-tests.md` listing key modules (share service, notifications, milestone calculations) with coverage goals.

13.4 Update `12-03-integration-tests.md` describing API-level tests, database interactions, webhook handling.

13.5 Update `12-04-e2e-tests.md` detailing Playwright flows, fixtures, trace retention, CI triggers.

13.6 Update `12-05-performance-tests.md` covering load testing for share endpoints, asset playback, notifications.

13.7 Update `12-06-accessibility-tests.md` specifying axe-playwright runs, manual audits, acceptance gates.

### 14. 13-devops-ci-cd/ Documentation (5 files)

14.1 Refresh DevOps docs.

14.2 Update `13-01-ci-pipeline.md` describing pipeline stages (lint, tests, build, deploy preview, production approval).

14.3 Update `13-02-cd-and-release-strategy.md` covering Vercel deploy previews, staged rollout, feature flags.

14.4 Update `13-03-infrastructure-as-code.md` explaining configuration approach (Vercel dashboard, optional Terraform), secrets provisioning.

14.5 Update `13-04-environment-configs.md` documenting environment-specific settings (flags, TTLs, API keys).

14.6 Update `13-05-rollback-and-hotfix.md` detailing revert process, smoke testing, communication.

### 15. 14-observability/ Documentation (5 files)

15.1 Align observability to new KPIs.

15.2 Update `14-01-logging.md` covering structured logs, correlation IDs, redaction.

15.3 Update `14-02-metrics-sli-slo.md` defining metrics (availability, latency, share opens, playback errors, notification delivery) with targets.

15.4 Update `14-03-tracing.md` describing distributed tracing (if used), key spans.

15.5 Update `14-04-alerting.md` specifying alert rules (error spikes, slow endpoints, failed cron, webhook failures) and runbooks.

15.6 Update `14-05-dashboards.md` outlining dashboards for operations, KPI tracking, stakeholder reporting.

### 16. 15-performance-and-reliability/ Documentation (5 files)

16.1 Update reliability docs to reflect share link and asset demands.

16.2 Update `15-01-load-and-stress-testing.md` with scenarios for concurrent project views, share link opens, asset streaming.

16.3 Update `15-02-capacity-planning.md` covering scaling assumptions (Neon tiers, Vercel concurrency, Mux limits).

16.4 Update `15-03-reliability-engineering.md` documenting SLO error budgets, on-call, incident rehearsal schedule.

16.5 Update `15-04-disaster-recovery.md` covering failure scenarios (Neon outage, Mux downtime), RTO/RPO processes, drill cadence.

16.6 Update `15-05-chaos-experiments.md` proposing hypotheses (share link token expiry, webhook drop, KV outage) with guardrails and rollback.

### 17. 16-documentation-and-training/ Documentation (5 files)

17.1 Ensure internal/external training materials match portal workflows.

17.2 Update `16-01-developer-docs.md` covering local setup (pnpm, env vars), common tasks (migrations, feature flags), gotchas (tenant context).

17.3 Update `16-02-runbooks.md` with ≥10 tasks (new agency onboarding, share link revocation, Mux incident response) including prerequisites, steps, rollback.

17.4 Update `16-03-support-playbooks.md` covering support tiers, scripts for login issues, share problems, notification queries, escalation paths.

17.5 Update `16-04-onboarding.md` with 30/60/90 plan for new developers/agency contacts, access matrix, checklists.

17.6 Update `16-05-user-guides.md` detailing top tasks (≥10) for Admin and Agency, with screenshot placeholders, tips.

### 18. 17-go-to-market-and-legal/ Documentation (5 files)

18.1 Align GTM/legal docs with agency rollout.

18.2 Update `17-01-pricing-and-packaging.md` (or positioning) describing portal value for agencies/clients, tiering (if any), rollout strategy.

18.3 Update `17-02-legal-review.md` summarising counsel input on contracts, privacy, share links, data residency.

18.4 Update `17-03-terms-and-privacy.md` documenting link to ToS/Privacy policy, change policy, data locations.

18.5 Update `17-04-marketing-launch-plan.md` with channels (agency briefings, client emails), assets, dates, owners, KPIs.

18.6 Update `17-05-app-store-listing.md` repurposed to “Portal collateral” with copy blocks, metadata, image specs for internal rollouts.

### 19. 18-release-and-cutover/ Documentation (5 files)

19.1 Prepare launch materials.

19.2 Update `18-01-release-checklist.md` with ≥25 pre-flight checks, sign-offs across Admin, Agency, Client, technical teams.

19.3 Update `18-02-cutover-plan.md` covering timeline, roles, rollback point, dry run outcomes.

19.4 Update `18-03-data-migration-runbook.md` describing import of existing milestones/tasks/assets, verification, backout plan, timing.

19.5 Update `18-04-rollback-plan.md` detailing triggers, scripts, comms, data plans.

19.6 Update `18-05-launch-comms.md` with templates for agencies, clients, internal stakeholders (≥5 audiences).

### 20. 19-post-launch/ Documentation (5 files)

20.1 Plan post-launch operations.

20.2 Update `19-01-support-rotation.md` describing roster, coverage hours, escalation.

20.3 Update `19-02-bug-triage-and-sla.md` covering severity matrix, intake paths, SLA targets.

20.4 Update `19-03-feedback-loop.md` outlining sources (agencies, clients), cadence, backlog integration.

20.5 Update `19-04-analytics-review-cadence.md` detailing weekly/monthly rituals, owners, metrics.

20.6 Update `19-05-roadmap-prioritisation.md` describing scoring model, intake, review board.

### 21. 20-archive-and-postmortems/ Documentation (4 files)

21.1 Refresh archive documentation.

21.2 Update `20-01-postmortems-template.md` with fields for timeline, impact, RCA (5 Whys), corrective actions with owners.

21.3 Update `20-02-retrospectives.md` covering cadence, format, action tracking for portal team.

21.4 Update `20-03-change-log.md` with Date, Change, Author entry post-run.

21.5 Update `20-04-lessons-learned.md` capturing themes (agency onboarding, share link adoption, performance) and improvements.

21.6 Verify compliance with orchestration guide §9.1.

### 22. Cross-cutting Requirements

22.1 Ensure all files use resolved YAML front matter (language `en-AU`, declarative tone) per orchestration guide §6.

22.2 Apply AI-managed block protocol to every generated document.

22.3 Each file includes sections in template order: Overview, Core body, Related (≥2 links), Open questions, Assumptions, Sources.

22.4 Regenerate `/docs/playbook/_generated/context.json` with facts from updated `HighLevel.Final.md` once documentation complete.

22.5 Maintain ADR index and individual ADRs consistent with new decisions.

22.6 Append documentation run entry to `docs/playbook/20-03-change-log.md`.

22.7 Validate all files against orchestration checklist §9 (structure, content minimums, references).

22.8 Ensure cross-references, relative links, and filenames are accurate; update when doc names change.

22.9 Confirm Australian English usage, inclusive language, declarative tone.

22.10 Redact sensitive values with `<REDACTED>` or `<PLACEHOLDER>` as required.
