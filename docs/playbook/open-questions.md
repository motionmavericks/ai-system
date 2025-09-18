# Motion Mavericks Portal – Open Questions Index
Generated: 2025-09-19

## 00-brief-and-vision/00-01-product-vision.md
- Confirm rollout order for subsequent agency partners after MKTG and determine contractual onboarding requirements.
- Decide whether client stakeholders require scheduled digest emails in addition to event-driven notifications.
- Validate the need for optional guest download permissions for specific deliverables after pilot feedback.

## 00-brief-and-vision/00-02-success-metrics.md
- Determine whether agencies need per-milestone variance dashboards or if aggregate reporting suffices for launch.
- Confirm if guest playback telemetry must be surfaced to clients directly or summarised in weekly digests.

## 00-brief-and-vision/00-03-stakeholders.md
- Confirm backups for agency and compliance roles to ensure continuity during leave or peak shoots.
- Determine whether client stakeholders require direct access to error budget dashboards or curated summaries.

## 00-brief-and-vision/00-04-constraints.md
- Confirm whether enterprise review requires independent penetration test evidence before launch.
- Determine if share link retention policy must vary for government clients with stricter archival needs.

## 00-brief-and-vision/00-05-risks-and-assumptions.md
- Do government clients require additional attestations beyond the documented privacy controls?
- Will agencies need automation to bulk-upload legacy milestones during cutover, increasing operational risk?

## 01-discovery-and-research/01-01-market-research.md
- Should Motion Mavericks publish an annual compliance report to align with procurement expectations highlighted by agencies?
- What level of dashboard customisation do agencies require to justify consolidating existing project tools?

## 01-discovery-and-research/01-02-competitor-analysis.md
- Should Motion Mavericks prioritise publishing regional compliance attestations to counter enterprise positioning by Frame.io and Monday.com?
- Do agencies require integration with existing task tools (e.g. Asana) for gradual migration, or is a full replacement viable?

## 01-discovery-and-research/01-03-user-interviews.md
- Do client stakeholders require a separate consent flow when recordings include agency personnel from multiple organisations?
- Should interviews capture telemetry preferences (e.g. analytics dashboards) beyond notifications?

## 01-discovery-and-research/01-04-content-and-data-audit.md
- Do historic approval emails older than 24 months need to be migrated for compliance, or can they remain archived outside the portal?
- What redaction process is required before importing Slack transcripts containing client-sensitive details?

## 02-requirements-and-scope/02-01-user-stories.md
- Should non-functional stories referencing SM-06 include explicit alert routing to on-call rotations, or is coverage in reliability docs sufficient?
- Do client stakeholders require separate stories for digest personalisation by asset type?

## 02-requirements-and-scope/02-02-acceptance-criteria.md
- Should residency checks verify both primary and backup storage layers per drill, or will dashboards suffice?
- Do we need explicit negative scenarios for notification throttling when rate limiting is reached?

## 02-requirements-and-scope/02-03-non-functional-requirements.md
- Should share link rate limiting differentiate between geographic regions or rely on global thresholds?
- Do we need additional SLIs for mobile playback performance given client usage patterns?

## 02-requirements-and-scope/02-04-scope-boundaries.md
- Should customer-branded share link experiences be treated as an MVP stretch goal or deferred entirely to post-launch?
- What governance process approves exceptions to residency requirements if a client requests offshore collaboration?

## 02-requirements-and-scope/02-05-definition-of-done.md
- Should QA include mandatory manual playback testing with assistive technology before each release?
- Do documentation updates require a peer review checklist similar to code reviews?

## 03-ux-and-design/03-01-personas.md
- Do we need a dedicated persona for compliance officers who may access the portal purely for audit evidence?
- Should personas capture mobile-first behaviours in more depth for on-set producers?

## 03-ux-and-design/03-02-journeys-and-flows.md
- Should the guest review flow include optional multi-factor prompts for high-sensitivity content?
- Do agency producers require an offline upload option when connectivity is limited on set?

## 03-ux-and-design/03-03-information-architecture.md
- Should assets be accessible directly from the dashboard for fast follow-up, or remain scoped within projects to enforce tenancy boundaries?
- Do we need a dedicated compliance hub in primary navigation for legal stakeholders?

## 03-ux-and-design/03-04-wireframes.md
- Should notifications drawer support grouped bulk actions (e.g. acknowledge all incident alerts) in MVP?
- Do we need a dedicated wireframe for residency evidence export to satisfy compliance stakeholders?

## 03-ux-and-design/03-05-design-system.md
- Do we require a dark-mode variant beyond the current dark theme to support high-contrast accessibility preferences?
- Should residency badges be treated as a tokenised component for use across dashboard, modals, and emails?

## 04-architecture-and-decisions/04-01-system-context.md
- Should we introduce a dedicated compliance reporting service boundary for exporting residency evidence?
- Will government clients require isolated deployment environments beyond the shared Vercel tenancy?

## 04-architecture-and-decisions/04-02-solution-architecture.md
- Should we introduce an event bus (e.g. Inngest) for high-volume notifications, or do Cron + Neon suffice for MVP?
- Do we need a read replica for Neon to handle analytics queries without impacting transactional load?

## 04-architecture-and-decisions/04-03-data-flows.md
- Do we need additional events for compliance exports or will weekly residency reports suffice?
- Should share link open events trigger rate-limited notifications to prevent spam during high-volume reviews?

## 04-architecture-and-decisions/04-04-threat-model.md
- Do enterprise clients require penetration testing before launch, or will this threat model suffice temporarily?
- Should we enforce passcode complexity rules for share links (length, numbers) or leave optional for MVP?

## 04-architecture-and-decisions/adrs/2025-09-19-asset-pipeline-mux.md
- Do we need to store low-resolution proxies locally for offline review by agencies?
- Should we enable Mux Asset Passthrough for large raw files beyond portal streaming needs?

## 04-architecture-and-decisions/adrs/2025-09-19-authentication-approach.md
- Should Admin accounts require passkeys post-MVP for higher assurance?
- Do government clients mandate integration with their IdP, requiring SSO extensions?

## 04-architecture-and-decisions/adrs/2025-09-19-multi-tenant-data-model.md
- Do compliance stakeholders require per-tenant encryption keys in future iterations?
- Should we add tenant-level rate limits beyond global thresholds to prevent resource hogging?

## 04-architecture-and-decisions/adrs/2025-09-19-notification-delivery-strategy.md
- Should SMS or Slack channels be introduced for critical incidents before post-MVP roadmap?
- Do clients require configurable digest frequency beyond daily summaries?

## 04-architecture-and-decisions/adrs/2025-09-19-share-link-security-controls.md
- Should we integrate IP allow-listing for high-security clients post-launch?
- Do we require additional watermarking or DRM for government engagements?

## 04-architecture-and-decisions/adrs/README.md
- Do we require ADRs for analytics instrumentation or can those live within integration docs?
- Should future ADR numbering follow chronological order or thematic grouping?

## 05-project-setup/05-01-repository-setup.md
- Do we need a long-lived staging branch for agency demos, or will deploy previews suffice?
- Should we automate tag creation via Changesets or keep manual gating for now?

## 05-project-setup/05-02-coding-standards.md
- Should we formalise hooks naming conventions beyond the current `useFeature` pattern?
- Do we introduce automatic visual regression testing to complement Playwright flows?

## 05-project-setup/05-03-environments-and-secrets.md
- Should we adopt Doppler or Vault for centralised workflow post-MVP?
- Do compliance auditors require automated rotation evidence beyond manual log entries?

## 05-project-setup/05-04-package-and-dependency-policy.md
- Should we adopt a private package proxy for caching and tamper resistance?
- Do agencies require notice when upstream packages change telemetry behaviour?

## 05-project-setup/05-05-precommit-and-ci-conventions.md
- Should we gate merges on Lighthouse scores for all PRs or only for weekly monitoring?
- Do we require concurrency limits to avoid running duplicate pipelines on rapid pushes?

## 06-data-model-and-storage/06-01-schema-design.md
- Do we require encrypted columns for sensitive metadata, or does limited PII make row-level policies sufficient?
- Should audit logs be streamed to external cold storage for long-term retention beyond 365 days?

## 06-data-model-and-storage/06-02-migrations-plan.md
- Do we require zero-downtime strategies (e.g., trigger-based dual writes) for future major changes?
- Should we adopt automated diff tooling (Atlas, Supabase diff) to complement Drizzle generation?

## 06-data-model-and-storage/06-03-seed-and-fixtures.md
- Should we automate anonymised snapshot generation using dbt or rely on manual SQL scripts?
- Do agencies require custom demo datasets beyond the default seeds for client presentations?

## 06-data-model-and-storage/06-04-backup-and-restore.md
- Should we automate failover to a warm standby environment for high-severity incidents post-MVP?
- Do compliance auditors require third-party attestation of backup integrity?

## 06-data-model-and-storage/06-05-data-governance.md
- Do any clients require longer audit log retention; if so, should we archive to cold storage rather than purge?
- Should share link analytics anonymisation adopt differential privacy techniques in future releases?

## 07-apis-and-contracts/07-01-api-style-guide.md
- Should we support GraphQL or remain REST-only for MVP integrations?
- Do agency partners need webhook callbacks beyond Mux/Resend to mirror project updates?

## 07-apis-and-contracts/07-02-endpoints-and-contracts.md
- Should share link creation support custom domains in MVP or remain on portal hostname?
- Do agencies require export endpoints for analytics beyond current scope?

## 07-apis-and-contracts/07-03-auth-and-authorisation.md
- Should Admin accounts require passkeys post-MVP for higher assurance?
- Do government clients mandate IP allow-listing for share link access?

## 07-apis-and-contracts/07-04-rate-limiting-and-quota.md
- Do clients require higher share link view quotas for public-facing campaigns?
- Should we integrate third-party bot detection for share link endpoints?

## 07-apis-and-contracts/07-05-webhooks-and-events.md
- Should we add webhook signing secret rotation schedule (e.g., every 180 days) via automated script?
- Do we need Slack notifications for DLQ events to improve visibility?

## 08-frontend/08-01-tech-stack.md
- Do we introduce Storybook before GA release to improve component documentation?
- Should we adopt React Server Components for share link rendering to reduce JS payload further?

## 08-frontend/08-02-routing-and-navigation.md
- Should tenant slug be surfaced in URL for admin cross-tenant access at MVP, or remain implicit?
- Do we need offline fallback pages for share links when network is unstable?

## 08-frontend/08-03-state-management.md
- Should we persist notification cache beyond 1 hour for agencies needing offline reference?
- Do we require background sync for asset upload metadata in case of temporary failures?

## 08-frontend/08-04-forms-and-validation.md
- Should we introduce auto-save for project creation wizard to handle browser refresh mid-setup?
- Do clients require custom validation messages per region (future localisation)?

## 08-frontend/08-05-ui-components.md
- Should we introduce a Chart component for performance metrics, or rely on table summaries at MVP?
- Do share link recipients need a simplified component set separate from portal UI?

## 08-frontend/08-06-accessibility-a11y.md
- Do clients require audio descriptions for video assets, and if so, can agencies supply them during upload?
- Should we offer user-configurable high-contrast or reduced-motion toggles at MVP or defer to post-launch?

## 08-frontend/08-07-internationalisation-i18n.md
- Which locale should be prioritised after en-AU (en-NZ vs en-UK)?
- Do agencies require bilingual share links or per-recipient locale settings?

## 09-backend/09-01-service-boundaries.md
- Should analytics events eventually flow to an external warehouse, or will Neon suffice for the next 12 months?
- Do we need to separate compliance reporting into dedicated service for governance audits?

## 09-backend/09-02-business-logic.md
- Should asset failure automatically roll back milestone status to `at_risk`, or leave manual intervention?
- Do clients need automated approval records beyond comment threads (e.g., digital signatures)?

## 09-backend/09-03-background-jobs.md
- Should we adopt dedicated job queue (e.g., Inngest) if job volume increases post-launch?
- Do agencies require scheduling of custom digests beyond daily frequency?

## 09-backend/09-04-file-and-media-storage.md
- Do we need to support downloadable proxies for offline client review in future iterations?
- Should we invest in watermarking or DRM options for high-sensitivity content post-MVP?

## 09-backend/09-05-caching-strategy.md
- Should we introduce incremental static regeneration for public marketing-like pages after MVP?
- Do we need to purge KV entries manually post-tenant removal to avoid residual data?

## 10-integrations/10-01-identity-provider.md
- Do we need passkey support for Admin accounts before pilot, or is post-launch acceptable?
- Should we enable SMS fallback for agencies with strict email filters?

## 10-integrations/10-02-payments.md
- Do agencies expect portal-based cost tracking before we roll out to additional partners?
- Should we provide API hooks for exporting project metadata to finance tools ahead of full integration?

## 10-integrations/10-03-email-and-notifications.md
- Do agencies require brand-specific senders (e.g., MKTG) or is Motion Mavericks sender sufficient for MVP?
- Should we integrate SMS fallback for incident alerts if email delivery fails?

## 10-integrations/10-04-analytics-and-product-events.md
- Should we adopt real-time dashboarding (e.g., Superset) if data volume grows?
- Do client stakeholders require direct access to analytics exports, or are internal summaries sufficient?

## 10-integrations/10-05-third-party-webhooks.md
- Should we add Slack webhook integration for incident alerts during MVP pilot?
- Do we need IP allow-list enforcement at CDN level for additional security?

## 11-security-and-compliance/11-01-security-baseline.md
- Do enterprise clients require third-party penetration testing evidence prior to go-live?
- Should we adopt automated secrets scanning (e.g., GitHub Advanced Security) before general release?

## 11-security-and-compliance/11-02-secrets-management.md
- Should we adopt automated reminders for rotations rather than manual calendar events?
- Do we need HSM-backed secret storage for high-sensitivity keys post-MVP?

## 11-security-and-compliance/11-03-privacy-and-data-protection.md
- Do we require Data Protection Impact Assessments for each new agency onboarded post-MVP?
- Should Guest share links support optional view analytics anonymisation toggles for privacy-sensitive clients?

## 11-security-and-compliance/11-04-compliance-checklist.md
- Do we require an external penetration test before go-live to satisfy client security clauses?
- Should we formalise ISO 27001 alignment now or defer until post-launch growth phase?

## 11-security-and-compliance/11-05-incident-response.md
- Should we procure third-party incident response retainer for forensic deep dives beyond internal capability?
- Do we need real-time SMS notifications for SEV0 incidents affecting agency principals?

## 12-testing-and-quality/12-01-test-strategy.md
- Do we introduce contract testing (e.g., Pact) between backend and frontend immediately or defer post-launch?
- Should nightly regression run on staging or dedicated QA environment to avoid agency sandbox overlap?

## 12-testing-and-quality/12-02-unit-tests.md
- Do we standardise factory helpers for Neon row fixtures to reduce duplication across tests?
- Should we introduce mutation testing to validate the effectiveness of share token tests?

## 12-testing-and-quality/12-03-integration-tests.md
- Should we integrate contract snapshots (e.g., JSON schema diffing) to catch inadvertent API changes for agency clients?
- Will we provision ephemeral databases per CI workflow run to improve isolation at scale?

## 12-testing-and-quality/12-04-e2e-tests.md
- Do we add Safari coverage via Playwright AWS Lambda runners prior to enterprise client onboarding?
- Should we run smoke E2E on production post-deploy, or rely solely on staging synthetic checks?

## 12-testing-and-quality/12-05-performance-tests.md
- Do we need synthetic tests from EU/US regions to verify guest experience for non-AU stakeholders?
- Should performance suite trigger automatically post-deploy to staging or remain manual until resource budget confirmed?

## 12-testing-and-quality/12-06-accessibility-tests.md
- Should we include Android TalkBack testing for guest share links consumed on mobile?
- Do we need to budget for third-party accessibility audit prior to enterprise roll-out?

## 13-devops-ci-cd/13-01-ci-pipeline.md
- Should we migrate heavy Playwright suites to managed runners to reduce queue time?
- Do we integrate static analysis (SonarCloud) before onboarding additional agencies?

## 13-devops-ci-cd/13-02-cd-and-release-strategy.md
- Should we implement canary deployments using Vercel regions before full production rollout?
- Do we require sign-off from agency partners for breaking UI changes prior to deployment?

## 13-devops-ci-cd/13-03-infrastructure-as-code.md
- Should we adopt Pulumi or Terraform Cloud run tasks for policy-as-code (e.g., residency validation)?
- Do we integrate cost management tooling (Infracost) into plan reviews?

## 13-devops-ci-cd/13-04-environment-configs.md
- Should we introduce a QA environment distinct from staging to support agency training sessions?
- Do we enable partial production data masking for staging analytics while protecting privacy?

## 13-devops-ci-cd/13-05-rollback-and-hotfix.md
- Should we automate rollback triggers based on SLO breaches via Vercel APIs?
- Do we need a secondary staging environment dedicated to hotfix validation when staging already used by agencies?

## 14-observability/14-01-logging.md
- Do we need log sampling in production to reduce cost while preserving diagnostic value?
- Should we establish automated log scrubbing jobs to redact legacy entries before retention expiry?

## 14-observability/14-02-metrics-sli-slo.md
- Do we expand SLO set to cover agency upload throughput explicitly?
- Should share link success differentiate between internal and external networks?

## 14-observability/14-03-tracing.md
- Should we adopt tail-based sampling with adaptive rules to capture rare share link failures?
- Do we need customer-facing trace IDs in share link error messages for support workflows?

## 14-observability/14-04-alerting.md
- Should we integrate SMS alerts for high-priority agencies requiring immediate comms?
- Do we need separate alert thresholds for pilot agencies with lower traffic to avoid noise?

## 14-observability/14-05-dashboards.md
- Should we expose live dashboard embeds to select clients or rely on scheduled digests only?
- Do we need a dedicated accessibility dashboard to track axe violations over time?

## 15-performance-and-reliability/15-01-load-and-stress-testing.md
- Do we budget for synthetic load tests during agency campaign launches to simulate peak usage proactively?
- Should we integrate real-time load testing via production shadow traffic after go-live?

## 15-performance-and-reliability/15-02-capacity-planning.md
- Should we reserve dedicated CDN capacity for high-profile launches to guarantee playback quality?
- Do we need to budget for an EU data replica if an agency expands outside AU sooner than expected?

## 15-performance-and-reliability/15-03-reliability-engineering.md
- Should we formalise an SRE error budget council including agency representation?
- Do we need to expand reliability tooling budget for dedicated synthetic monitoring outside Australia?

## 15-performance-and-reliability/15-04-disaster-recovery.md
- Should we implement multi-region read replicas for Neon to accelerate failover beyond 60 minutes?
- Do we require contractual guarantees from Mux for AU-first failover paths?

## 15-performance-and-reliability/15-05-chaos-experiments.md
- Should we invest in dedicated chaos tooling or continue with scripted experiments?
- Do we extend chaos coverage to client-facing production flows after initial hardening?

## 16-documentation-and-training/16-01-developer-docs.md
- Do we need a dedicated internal package for common fixtures shared across tests to reduce duplication?
- Should we introduce automated lint checks for accessibility attributes in components?

## 16-documentation-and-training/16-02-runbooks.md
- Should we convert runbooks into executable scripts (RunDeck) for repeatability?
- Do we need separate client-facing runbooks detailing communication steps during incidents?

## 16-documentation-and-training/16-03-support-playbooks.md
- Should we introduce chatbots to handle Tier 0 enquiries before handing off to humans?
- Do we need bilingual support coverage for agencies working in non-English markets?

## 16-documentation-and-training/16-04-onboarding.md
- Should onboarding include certification or badge for agency producers completing training?
- Do we need asynchronous training modules for contractors onboarding outside business hours?

## 16-documentation-and-training/16-05-user-guides.md
- Should we provide guest-specific quick start cards for clients with limited technical literacy?
- Do we need translated guides for agencies operating outside Australia?

## 17-go-to-market-and-legal/17-01-pricing-and-packaging.md
- Should we introduce a self-serve tier for smaller production teams post-launch?
- Do we bundle analytics add-ons (custom dashboards) as paid extras or include in Growth tier?

## 17-go-to-market-and-legal/17-02-legal-review.md
- Do we require additional contractual assurance for agencies storing sensitive client PII within asset metadata?
- Should we introduce standard contract clause for optional guest password protection once implemented?

## 17-go-to-market-and-legal/17-03-terms-and-privacy.md
- Will client-specific terms require bespoke privacy addendums for particular industries (e.g., healthcare)?
- Do we integrate cookie consent banner if analytics expands beyond essential telemetry?

## 17-go-to-market-and-legal/17-04-marketing-launch-plan.md
- Should we co-market with pilot agencies via joint case studies at launch?
- Do we invest in paid search campaigns post-launch to reach non-partner agencies?

## 17-go-to-market-and-legal/17-05-app-store-listing.md
- Do we translate collateral for regional partners outside Australia?
- Should we create interactive demos (Figma prototypes) for self-guided exploration?

## 18-release-and-cutover/18-01-release-checklist.md
- Should we automate checklist verification within CI/CD pipelines?
- Do we require external stakeholder approval for major UX changes before release?

## 18-release-and-cutover/18-02-cutover-plan.md
- Do we require staggered cutover by agency to reduce risk, or can all move simultaneously?
- Should we maintain read-only access to legacy spreadsheets beyond T+7 for historical reference?

## 18-release-and-cutover/18-03-data-migration-runbook.md
- Do we migrate historical analytics events or recreate from raw data post-launch?
- Should we anonymise archived guest emails after migration to reduce privacy footprint?

## 18-release-and-cutover/18-04-rollback-plan.md
- Should we automate rollbacks via pipeline triggers for specific alert thresholds?
- Do we provide agencies with proactive alert when rollback occurs or wait for impact assessment?

## 18-release-and-cutover/18-05-launch-comms.md
- Should we provide multilingual versions of launch communications for international clients?
- Do we schedule follow-up webinar series for clients beyond initial launch week?

## 19-post-launch/19-01-support-rotation.md
- Do we need weekend on-call coverage from client success or rely solely on PagerDuty escalation?
- Should we expand rotation to include agency representatives for joint triage sessions?

## 19-post-launch/19-02-bug-triage-and-sla.md
- Should we integrate automated customer notifications when high severity bugs resolved?
- Do we introduce bug bounties for agency partners identifying critical issues?

## 19-post-launch/19-03-feedback-loop.md
- Should we create agency advisory council sessions separate from monthly check-ins?
- Do we provide external roadmap visibility to clients or keep internal only?

## 19-post-launch/19-04-analytics-review-cadence.md
- Do we need real-time dashboards for agencies to view adoption metrics directly?
- Should we integrate financial metrics into monthly analytics review or keep separate?

## 19-post-launch/19-05-roadmap-prioritisation.md
- Do we invite agency representatives to quarterly roadmap reviews for direct input?
- Should we allocate fixed capacity for technical debt vs new features each sprint?

## 20-archive-and-postmortems/20-01-postmortems-template.md
- Do we automate postmortem creation from PagerDuty incidents?
- Should actions automatically populate reliability backlog?

## 20-archive-and-postmortems/20-02-retrospectives.md
- Should agency partners participate in quarterly retrospectives?
- Do we record retrospectives for asynchronous review or keep notes only?

## 20-archive-and-postmortems/20-03-change-log.md
- Should we automate diff summaries for future documentation runs?
- Do agency stakeholders require a public-facing changelog extract?

## 20-archive-and-postmortems/20-04-lessons-learned.md
- Should we automate lesson capture from retrospectives or keep manual for now?
- Do we share key lessons externally with agencies to reinforce partnership transparency?
