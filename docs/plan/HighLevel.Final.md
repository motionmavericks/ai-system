---
title: "Motion Mavericks MVP – Integrated Agent Execution Brief"
doc_path: "docs/plan/HighLevel.Final.md"
doc_type: "agent_requirements"
status: "draft"
version: "0.2.0"
owner: "Programme Office (Codex x Claude)"
reviewers: ["Security Lead", "Compliance Officer", "Product Lead", "Reliability Engineer", "Finance Ops Partner"]
last_updated: "2025-09-17"
project: "Motion Mavericks MVP Portal"
module: "core"
tags: [security, compliance, reliability, cost, privacy]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "docs/research/00-high-level-overview.md"
pii: true
security_review_required: true
compliance_scope: [AU_Privacy, GDPR, SOC2, ISO27001]
---

# Motion Mavericks MVP – Integrated Agent Execution Brief

> Status: **draft** • Version: **0.2.0** • Updated: **2025-09-17**

<doc xmlns="urn:docs:agent-execution"
     type="agent_requirements"
     path="docs/plan/HighLevel.Final.md"
     version="0.2.0"
     status="draft"
     owner="Programme Office (Codex x Claude)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="docs/research/00-high-level-overview.md"/>
    <tags>security, compliance, reliability, cost, privacy</tags>
  </meta>

  <sections>

    <section id="objective" heading="Objective and success definition">
      <content><![CDATA[
## 1. Objective and success definition
- Problem this brief solves: The MVP execution plan still omits production-grade controls for video confidentiality, webhook resilience, GDPR and Australian Privacy Act alignment, auditable logging, rate limiting, SLO ownership, vendor assurance, and cost guardrails identified by Codex, Claude, Qwen, and Gemini reviews.
- Desired outcomes once documentation is generated:
  - End-to-end security and compliance playbooks covering signed playback, share governance, webhook validation, data residency, and privacy notices.
  - Operational readiness packs for rate limiting, cost monitoring, SLOs, vendor outages, telemetry, and regression testing.
  - Harmonised acceptance workflows that bind security, legal, finance, and product approvals before the 2025-10-15 security review.
  - Traceable requirements-to-controls mapping satisfying GDPR Article 32, Australian Privacy Principles, and SOC 2 CC6/CC7 expectations.
- Success metrics for the Agentis coding agent:
  - P0 documentation approved by Security Lead and Compliance Officer by 2025-09-29 covering signed playback, webhook reliability, residency & retention, rate limiting, audit logging, SLO & incident, and cost monitoring.
  - Staging validations show signed playback token expiry ≤15 minutes, webhook replay clearing DLQ within 1 minute, rate limits returning HTTP 429 at defined thresholds, and cost alerts firing at 50/80/100% of budget.
  - Compliance reviews confirm lawful basis mapping, 30-day erasure workflows, AU residency controls, and data classification tags embedded in each playbook.
  - Security review and incident drills close with zero open P0 findings tied to these domains.
]]></content>
    </section>

    <section id="doc_inventory" heading="Documentation inventory">
      <content><![CDATA[
## 2. Documentation inventory
| Relative path | Purpose | Priority (P0/P1/P2) | Notes |
|---------------|---------|---------------------|-------|
| docs/playbook/security/signed-playback-and-sharing.md | Enforce Mux signed playback tokens, share lifecycle governance, audit trail | P0 | Integrates Claude share-token security controls and GDPR Art.32 evidence |
| docs/playbook/platform/mux-upload-and-webhook-reliability.md | Persist upload state, validate webhooks, manage DLQ replay, ensure resilience | P0 | Merges Claude webhook validation and resilience requirements |
| docs/playbook/compliance/data-residency-and-retention.md | Define AU-first residency, GDPR lawful basis, retention and erasure workflows | P0 | Incorporates Claude GDPR framework and Privacy Act obligations |
| docs/playbook/security/rate-limiting-and-abuse-controls.md | Specify throttling thresholds, anomaly detection, synthetic monitoring | P0 | Aligns with Claude rate limiting acceptance and abuse use cases |
| docs/playbook/security/audit-logging-and-vendor-review.md | Establish structured logging, retention tiers, and third-party security audits | P0 | Covers Claude audit logging, monitoring, and vendor assurance controls |
| docs/playbook/operations/slo-and-incident-response.md | Document SLO targets, error budgets, incident lifecycle, escalation | P0 | Adds Claude operational readiness checks and incident rehearsal steps |
| docs/playbook/cost/cost-monitoring-and-alerting.md | Define spend KPIs, alert thresholds, throttling triggers, reporting | P0 | Implements Claude cost monitoring blueprint and compliance checks |
| docs/playbook/operations/vendor-outage-runbooks.md | Vendor-specific outage escalation, communication, fallback | P1 | Reconciles Codex vendor playbooks with Claude business continuity notes |
| docs/playbook/observability/upload-telemetry.md | Instrument metrics, alerts, dashboards for upload lifecycle | P1 | References Claude monitoring controls for webhook coverage |
| docs/playbook/product/share-token-management-ui.md | Admin UX for viewing, revoking, auditing share tokens | P1 | Embeds Claude access control and privacy review requirements |
| docs/playbook/compliance/cookie-consent-and-privacy-notice.md | AU/GDPR compliant consent banner and privacy copy | P1 | Maps Claude privacy notice guidance to product delivery |
| docs/playbook/analytics/minimal-analytics-instrumentation.md | Lightweight analytics for signup/upload/share events with privacy guardrails | P1 | Aligns with Claude data minimisation directives |
| docs/playbook/testing/e2e-critical-journeys.md | Expand Playwright coverage for critical flows | P2 | Includes Claude compliance regression scenarios |
]]></content>
    </section>

    <section id="source_materials" heading="Source materials and truth set">
      <content><![CDATA[
## 3. Source materials and truth set
- Primary references: docs/research/00-high-level-overview.md, docs/research/Codex-HighLevel.md, docs/research/Claude-HighLevel.md, vendor docs for Mux, Clerk, Neon, Vercel KV/Cron/Edge, Sentry, Resend.
- SME contacts and availability: Product Lead (Ava Chen, Slack #product-mvp, 48h SLA), Security Lead (Liam Patel, PagerDuty security rota, 24h), Compliance Officer (Priya Rao, compliance clinic Wed 11:00 AEST), Legal Counsel (Sofia Mendes, legal@motionmavericks.com, 72h), Reliability Engineer (Noah Hughes, Slack #platform, 48h), Finance Ops Partner (Elise Morgan, finance@motionmavericks.com, 72h).
- Data repositories or dashboards: Mux dashboard (playback and signing keys), Neon metrics, Sentry projects, Vercel analytics, Finance billing exports, Access Tracker spreadsheet, Privacy incident register.
- Validation approach for conflicting information: Default to latest compliance ruling from Priya Rao; if security vs product conflict, Security Lead decision prevails unless CTO escalates; document dissent and resolution in merge log; capture evidentiary links in Section 12 controls matrix.
]]></content>
    </section>

    <section id="style_guidance" heading="Style and formatting directives">
      <content><![CDATA[
## 4. Style and formatting directives
- Language and tone: Australian English, concise, directive sentences; avoid marketing adjectives; prefer active voice.
- Terminology and glossary references: Use "signed playback", "share token", "dead-letter queue", "error budget" consistently; align data classification labels (Confidential, Sensitive, Restricted) to compliance section.
- Citation and linking rules: Link to internal docs with relative paths; cite external regulations (e.g., GDPR Art.32, APP 11) inline; include change-log references to GitHub PRs.
- Diagram or asset expectations: Provide Mermaid sequence diagrams for token flows, webhook paths, and incident escalations; store under `docs/diagrams/` with matching filenames.
- Accessibility or localisation requirements: Ensure docs describe screen-reader impact for share token UI; privacy copy references AU and EU variants; maintain WCAG AA guidance in UI-related documents.
]]></content>
    </section>

    <section id="structure_alignment" heading="Template alignment">
      <content><![CDATA[
## 5. Template alignment
| Target doc | Base template | Additional sections | Deviations or notes |
|------------|---------------|---------------------|---------------------|
| signed-playback-and-sharing.md | security-control | Token lifecycle tables, rollback playbook | Includes Claude share-token security appendix |
| mux-upload-and-webhook-reliability.md | operational-runbook | DLQ replay checklist, payload capture matrix | Embeds Claude webhook validation Gherkin tests |
| data-residency-and-retention.md | compliance-framework | Residency matrix, lawful basis register | Integrates GDPR & Privacy Act acceptance scripts |
| rate-limiting-and-abuse-controls.md | security-control | Threat model, threshold tuning log | Adds Claude abuse scenarios and cost triggers |
| audit-logging-and-vendor-review.md | security-control | Vendor due diligence checklist, retention tiers | Consolidates Claude audit logging + third-party audits |
| slo-and-incident-response.md | operational-runbook | Incident rehearsal log, PagerDuty rota | References Claude operational acceptance gates |
| cost-monitoring-and-alerting.md | operational-runbook | Budget governance board, throttling SOP | Follows Claude cost monitoring blueprint |
| vendor-outage-runbooks.md | operational-runbook | Vendor-specific fallback ladders | Aligns with Claude business continuity steps |
| upload-telemetry.md | observability-playbook | Metric catalogue, dashboard JSON refs | Includes Claude monitoring controls |
| share-token-management-ui.md | product-guide | Admin workflow screenshots, legal review checklist | Merges Codex UI backlog with Claude access rules |
| cookie-consent-and-privacy-notice.md | compliance-framework | Region-specific copy blocks, consent audit log | Implements Claude privacy notice guidance |
| minimal-analytics-instrumentation.md | analytics-guide | Event schema, data minimisation appendix | Adds Claude privacy-preserving analytics controls |
| e2e-critical-journeys.md | testing-playbook | Regression matrix, CI gating plan | Extends Codex QA scope with Claude compliance tests |
]]></content>
    </section>

    <section id="naming_scope" heading="File naming and scope rules">
      <content><![CDATA[
## 6. File naming and scope rules
- Naming conventions: Kebab-case file names; prefix with domain folder (security/, compliance/, operations/, etc.); append hyphenated qualifiers (e.g., `-and-abuse-controls`).
- Folder placement guidance: All docs reside under `docs/playbook/`; diagrams under `docs/diagrams/`; acceptance scripts under `tests/`; CSVs under `docs/data/` when referenced.
- Module or tag usage: Tag front matter with {mvp, security} plus relevant domain tags (compliance, reliability, cost, analytics); align to this brief’s tag set for filtering.
- Scope inclusions and exclusions: Include MVP portal backend, supporting infrastructure, CI/CD validation, and vendor integrations; exclude speculative premium features and mobile-native apps unless they impact compliance baselines.
]]></content>
    </section>

    <section id="context" heading="Business and technical context">
      <content><![CDATA[
## 7. Business and technical context
- Domain overview: Motion Mavericks enables coaches to share confidential training videos that demand tight access controls, verifiable residency, and accurate cost stewardship ahead of commercial launch.
- Core systems and integrations: Next.js App Router, Clerk, Neon (Sydney region), Drizzle ORM, Vercel KV/Cron/Blob/Edge middleware, Mux streaming, Sentry, Resend, Finance billing exports.
- User personas and needs: Creators demand revocable sharing and cost visibility; viewers expect frictionless playback with predictable expiry; operations teams require SLO dashboards, incident scripts, and rate-limit telemetry; legal and compliance teams require audit-ready documentation.
- Regulatory or contractual constraints: GDPR, Australian Privacy Principles, SOC 2 CC6/CC7, upcoming enterprise contract requiring 30-day erasure and yearly vendor attestations, signed data processing agreements with Mux and Clerk.
]]></content>
    </section>

    <section id="stakeholders" heading="Stakeholders and decision-makers">
      <content><![CDATA[
## 8. Stakeholders and decision-makers
| Name | Role | Responsibility | Decision authority | Contact cadence |
|------|------|----------------|--------------------|-----------------|
| Ava Chen | Product Lead | Feature prioritisation, UX approvals | Signs off product-facing docs & rate limit UX | Weekly sync |
| Liam Patel | Security Lead | Security controls, audit logging, signed playback | Final sign-off on security docs | PagerDuty + weekly |
| Priya Rao | Compliance Officer | Residency, retention, consent language | Must approve compliance docs | Weekly clinic |
| Sofia Mendes | Legal Counsel | GDPR/AU Privacy interpretation, contractual clauses | Escalation point for legal blockers | Ad hoc (≤72h) |
| Noah Hughes | Reliability Engineer | SLOs, webhook resilience, telemetry | Approves reliability playbooks | Slack within 48h |
| Elise Morgan | Finance Ops Partner | Cost guardrails & alerting | Approves cost monitoring doc | Async ≤72h |
| Marco Silva | QA Lead | E2E coverage plan, validation scripts | Approves testing doc & automation scope | Bi-weekly |
| Jonah Blake | DevOps Manager | Access provisioning, deployment | Grants infra access, enforces tooling standards | Stand-up Tue/Thu |
]]></content>
    </section>

    <section id="constraints" heading="Operational constraints">
      <content><![CDATA[
## 9. Operational constraints
- Technical limitations: Current stack lacks signed playback, webhook DLQ, structured logging, and automated cost dashboard; must stay within existing Vercel/Mux/Clerk plans.
- Resource/tooling constraints: SMEs available ≤2 hours per week; legal review lead time 72 hours; Finance data refresh nightly; no budget for new third-party tooling before launch.
- Security/privacy considerations: Documentation must avoid production secrets; redact payload samples; log access requests; enforce need-to-know for staging data.
- Time/sequencing constraints: Security review set for 2025-10-15; P0 docs must be merged by 2025-09-29; legal sign-off required before consent banner deployment; cost throttling cannot ship after marketing launch on 2025-10-05.
]]></content>
    </section>

    <section id="access" heading="Access and tooling requirements">
      <content><![CDATA[
## 10. Access and tooling requirements
- Required credentials: Staging Clerk project keys, Neon staging DB (read-only), Mux sandbox signing key, Vercel project with KV/Cron permissions, Sentry DSN, Finance billing export access; request via DevOps ticket `DO-ACCESS` with Security Lead approval.
- Tooling and automation scripts: GitHub Codespaces optional, Mermaid CLI for diagrams, webhook replay harness (WP-02), cost export script provided by Finance, Drizzle migrations for audit tables, Playwright suites for acceptance tests, Vercel CLI for KV configuration.
- Audit/logging requirements: Record access grants in Access Tracker; capture webhook replay runs and rate-limit tests in Sentry; store compliance reviews in Confluence page linked from Section 12.
- Support contacts: DevOps Manager for infrastructure, Security Lead for credential storage guidance, Compliance Officer for data handling queries, Finance Ops for billing exports, Legal Counsel for GDPR interpretations.
]]></content>
    </section>

    <section id="data_sensitivity" heading="Data sensitivity and compliance">
      <content><![CDATA[
## 11. Data sensitivity and compliance
- Data classification: User videos = Confidential; share tokens & signed URLs = Sensitive; audit logs = Restricted; billing metrics = Protected; telemetry samples = Internal.
- Handling and redaction rules: Use synthetic or redacted payloads; never expose raw playback IDs; rotate signing keys per 90 days; ensure audit logs tamper-evident; cascade deletions across Neon, KV, Blob, and Sentry within 30 days.
- Compliance frameworks: GDPR Articles 6, 17, 32; Australian Privacy Principles 6, 11; SOC 2 CC6/CC7; ISO 27001 Annex A controls for access management and logging.
- Escalation path: Report suspected breach via #security-incidents and PagerDuty within 15 minutes; inform Legal Counsel for privacy notification guidance; escalate persistent residency issues to Compliance Officer; record responses in incident register.
]]></content>
    </section>

    <section id="deliverable_acceptance" heading="Deliverable acceptance criteria">
      <content><![CDATA[
## 12. Deliverable acceptance criteria
- Narrative expectations: Each playbook opens with executive summary, references originating review IDs, outlines decision log, and closes with validation checklist plus rollback plan.
- Validation obligations: Provide automated lint output, staging test artefacts, and screenshots/log snippets proving rate limits, signed playback expiry, webhook DLQ drain, cost alert triggers, and deletion workflow audit trails.
- Review workflow: Draft → SME owner review → Security and/or Compliance review (as applicable) → Finance or Product sign-off where scope touches their domain → Programme office records approval in change log.
- Sign-off authorities: Security docs (Liam Patel), compliance docs (Priya Rao + Sofia Mendes), reliability docs (Noah Hughes), cost doc (Elise Morgan), product/UI doc (Ava Chen), testing doc (Marco Silva).
- Acceptance scenarios:
  - Given a playbook is submitted for approval, When automated tests and linting succeed in CI, Then reviewers receive evidence links and can issue sign-off without requesting missing artefacts.
  - Given a compliance-sensitive change is proposed, When Legal Counsel approves updated language, Then the change log records control references for GDPR and APP obligations before merge.
]]></content>
    </section>

    <section id="timeline" heading="Timeline and sequencing">
      <content><![CDATA[
## 13. Timeline and sequencing
| Milestone | Description | Target date | Dependencies | Owner |
|-----------|-------------|-------------|--------------|-------|
| M1 – Security Foundation | Signed playback, share governance, webhook validation blueprints drafted | 2025-09-22 | Mux sandbox access, Clerk session hooks | Security Tech Writer & Platform Engineer |
| M2 – Compliance Controls | Residency, retention, consent copy, audit logging framework | 2025-09-27 | Legal availability, Access Tracker updates | Compliance Officer & Legal Counsel |
| M3 – Operational Controls | Rate limiting, cost monitoring, DLQ replay runbooks approved | 2025-09-29 | M1 & M2 approvals | Reliability Engineer & Finance Ops |
| M4 – Incident Readiness | SLO/incident response, vendor outage playbooks rehearsed | 2025-10-04 | PagerDuty rota confirmed, comms templates drafted | Reliability Engineer |
| M5 – Security Testing & Analytics | Minimal analytics, telemetry dashboards, E2E regression suite merged | 2025-10-08 | Automation environment green, QA resources | QA Lead |
| M6 – Production Gate | Final compliance attestation, security review, launch go/no-go | 2025-10-15 | All prior milestones complete, incident drill results filed | Programme Office & CTO |
]]></content>
    </section>

    <section id="risks" heading="Risks and mitigations">
      <content><![CDATA[
## 14. Risks and mitigations
| ID | Risk | Trigger | Impact | Mitigation | Owner | Status |
|----|------|---------|--------|------------|-------|--------|
| R1 | Compliance approvals delayed | Legal backlog or conflicting priorities | High | Submit redlines early, schedule review clinic, capture assumptions with validation plan | Compliance Officer | Open |
| R2 | Security implementation slips past milestone | Signed playback or webhook controls blocked by engineering bandwidth | High | Pair Security Lead with Platform Engineer, time-box spike, escalate to Programme Office | Security Lead | Open |
| R3 | Rate limiting or throttling degrades legitimate UX | Thresholds too aggressive for early adopters | Medium | Start in monitor mode, review telemetry weekly, offer per-customer overrides | Backend Engineer | Open |
| R4 | Audit logging inflates storage costs | Retention tiers not enforced | Medium | Implement tiered retention, compress logs, include budget check in cost doc | Security Architect | Open |
| R5 | Vendor API change breaks integrations | Mux or Clerk updates schema without notice | Medium | Pin versions, enable vendor status alerts, maintain vendor outage playbooks | Platform Engineer | Open |
| R6 | Cost monitoring increases latency or misses data | Billing APIs slow or inconsistent | Medium | Cache responses, schedule off-peak sync, reconcile monthly with Finance | DevOps Engineer | Open |
| R7 | Consent and analytics docs diverge | Consent banner update lags analytics deployment | Medium | Joint review for consent and analytics docs, block analytics release without consent sign-off | Product Lead | Open |
| R8 | Erasure automation misses downstream stores | Manual deletion process incomplete | High | Incorporate deletion verification in compliance doc, add automated test in E2E suite | Compliance Officer | Open |
]]></content>
    </section>

    <section id="change_management" heading="Change management and versioning">
      <content><![CDATA[
## 15. Change management and versioning
- Request intake process: Raise GitHub issue tagged `doc-update` with impact summary and control references; Programme Office triages weekly; urgent security/compliance updates follow incident protocol.
- Versioning rules and tooling: Semantic version bump per approved change; signed commits; maintain change log tables referencing PR numbers; archive superseded appendices under `docs/playbook/archive/`.
- Communication plan for updates: Post merged changes in #motion-mavericks-docs with bullet summary; send weekly digest to stakeholders; escalate critical changes via PagerDuty security channel.
- Responsibilities for ongoing maintenance: Security Lead reviews security docs quarterly; Compliance Officer refreshes residency/consent every 6 months; Finance Ops reviews cost guardrails quarterly; Programme Office maintains traceability matrix.
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## 16. Open questions
| Question | Owner | Due date | Status | Notes |
|----------|-------|---------|--------|-------|
| None – all review-raised questions resolved within this brief | — | — | Closed | Further queries captured via `doc-update` issues |
]]></content>
    </section>

    <section id="implementation_considerations" heading="Implementation considerations">
      <content><![CDATA[
## 17. Implementation considerations
- Outstanding activities: Build webhook replay harness prototype; draft cost dashboard wireframes; confirm vendor contractual clauses for audit schedule.
- Decision points and owners: Share token TTL exception policy (Product Lead by 2025-09-20); retention schedule for audit logs (Compliance Officer by 2025-09-23); throttling override governance (Finance Ops by 2025-09-24).
- Resource or capability needs: Temporary QA allocation for Gherkin automation; legal review bandwidth for privacy copy; DevOps support for cron job verification.
- Sequencing or timing constraints: Complete security/compliance docs before operations/cost to unblock approvals; run staging validations immediately after each draft and attach artefacts; schedule incident drill before M6 gate.
- Additional directives for the agent: Avoid TBD placeholders—state assumption and validation plan; include rollback and monitoring hooks in every playbook; cross-reference Section 12 controls when citing compliance obligations.
]]></content>
    </section>
    <section id="doc_blueprints" heading="Doc blueprints per deliverable">
      <content><![CDATA[
## 18. Doc blueprints per deliverable

### Signed Playback and Share Governance – `docs/playbook/security/signed-playback-and-sharing.md`
<docBlueprint path="docs/playbook/security/signed-playback-and-sharing.md" template="security-control" owner="Security Tech Writer">
#### 1. Summary
- Purpose: Enforce server-issued signed playback tokens tied to share lifecycle and audit trail.
- Audience: Backend engineers, security reviewers, legal stakeholders.
- Outcome once delivered: Public playback disabled, signed tokens expire ≤15 minutes, revocations logged within audit system.
- Owner: Security Tech Writer (sponsored by Liam Patel).
- Milestone: M1 – Security Foundation (2025-09-22).

#### 2. Context
- Problem statement: Public playback IDs allow unauthorised access, breaching confidentiality obligations noted in Codex REC-001 and Claude security review.
- Background details: Share tokens live in Vercel KV; playback currently public; compliance demands traceability for revocations.
- Constraints: Must reuse existing Mux account and Clerk auth; no additional CDN; maintain 300ms latency budget.
- Related work or precedents: Mux signed URL guidance, Clerk session validation patterns, Codex signed playback prototype.
- Key supporting links: Mux signed URL docs, Clerk middleware repo, SOC2 CC6 guidance, GDPR Art.32 encryption requirement.

#### 3. Goals
- G1: Replace public playback with server-generated signed tokens integrated with share metadata.
- G2: Capture issuance, refresh, and revocation events in structured audit logs accessible to compliance.

#### 4. Non-goals
- Implementing custom DRM or watermarking solutions.

#### 5. Scope
##### In scope
- Token minting API route; share token TTL policy; revocation workflow; audit logging schema.
##### Out of scope
- Mobile-native playback clients; monetised pay-per-view integrations.
##### Boundaries and assumptions
- Assumption → Validation plan: Product can support 7-day share TTL; confirm via Ava Chen sign-off before release.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Liam Patel | Security Lead | Approve controls and threat model | Final sign-off | PagerDuty |
| Priya Rao | Compliance Officer | Validate residency/privacy notes | Must approve compliance content | compliance@motionmavericks.com |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-SPS-01 | Generate signed playback tokens server-side for authorised requests | P0 | Gherkin scenario in Section 15.2 |
| FR-SPS-02 | Revoke tokens within 15 minutes of share expiry or delete | P0 | Automation verifies revocation latency |
| FR-SPS-03 | Log token issuance and revoke events with share ID and viewer context | P0 | Audit log schema defined |
| FR-SPS-04 | Provide admin UI hook for emergency revoke | P1 | Linked to WP share-token UI |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Performance | Token generation <300ms P95 | Load test via staging harness | Backend Engineer |
| Reliability | 99.9% successful signed playback issuance | Observability dashboard | Reliability Engineer |
| Security | Zero unsigned playback attempts succeed | Sentry alert review | Security Lead |
| Privacy | Residency remains AU-primary, EU fallback documented | Deployment config review | Compliance Officer |

#### 8. Approach
- Preferred approach: Mint signed tokens using Mux server SDK with environment-stored signing key; validate share token and Clerk session before issuance.
- Alternatives considered: Client-side token generation (rejected due to key exposure); long-lived tokens (rejected due to replay risk).
- Trade-offs: Slight server load increase versus confidentiality uplift.

#### 9. Structure or design
- Overview: Viewer request → Clerk session check → share token validation → signed URL issuance → audit log write.
- Components or steps: `/api/share/[token]` route; Neon `share_tokens` and `playback_audit` tables; logging middleware.
- Diagram links: `docs/diagrams/signed-playback-sequence.mmd`.

#### 10. Data
- Entities: ShareToken, PlaybackAudit, TokenRevocation.
- Sources and owners: Neon (Platform team), Sentry logs (Reliability team).
- Retention rules: Share tokens active 7 days; audit logs retained 365 days with quarterly review; revocation logs kept 2 years for compliance.
- Data quality checks: Daily job verifying revoked tokens blocked; weekly audit verifying log completeness.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| `/api/share/[token]` | Inbound | Viewer → Next.js API | JSON payload {playbackUrl, expiresAt} | Clerk session + share token | Backend Engineer |
| Audit log sink | Outbound | App → Sentry/Neon | Structured log fields | App key | Security Lead |

#### 12. Security, privacy, compliance
- Data classification: Share tokens = Sensitive; audit logs = Restricted.
- Threats and mitigations: Token brute force mitigated by 128-bit entropy and rate limiting; replay mitigated via 15-minute expiry and revocation; leaking logs mitigated via restricted access and redaction.
- Controls mapped to standards: GDPR Art.32, APP 11, SOC2 CC6.1.
- Privacy/DPIA notes: Reference erasure workflow ensuring tokens deleted within 30 days of request; log data residency in compliance doc.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Vendor | Mux signing key rotation schedule | Ensure correct key usage | High | Platform Engineer |
| Internal | Share token UI doc | Provide revoke hooks | Medium | Product Lead |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Token TTL misconfigured | Medium | High | Automated test + monitoring alert | Security Lead | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Revocation latency | Time from revoke request to playback denial | Not instrumented | <15 minutes | Audit log + Playwright test | Weekly |
| Unsigned playback attempts | Count per day | Unknown | 0 | Sentry security alerts | Daily |

##### 15.2 Acceptance summary
- Definition of Done: Signed tokens enforced, revocation automation live, audit log sample reviewed by Compliance Officer.
- Given a viewer requests playback with a valid share token, When the server validates Clerk session and share record, Then it returns a signed URL expiring ≤15 minutes and records issuance in the audit log.
- Given a share token is revoked or expires, When a viewer attempts playback, Then the server returns HTTP 403 within 15 minutes and logs the blocked attempt.

##### Compliance Acceptance
- Given a data subject submits an erasure request, When the erasure workflow runs, Then associated share tokens and playback logs are deleted within 30 days and evidence is stored for GDPR Art.17 and APP 12 audits.
- Given quarterly security review preparation, When compliance samples playback logs, Then entries demonstrate location metadata for AU residency and SOC2 CC6.1 control coverage.

#### 16. Rollout and operations
- Environments and flags: Staging feature flag `SIGNED_PLAYBACK_ENFORCED` toggled before production; production flag enabled post-approval.
- Runbooks and support: Link to vendor outage doc for fallback; include manual revoke procedure.
- Observability expectations: Dashboard tracking token issuance success rate and revocation latency; alert on unsigned playback attempt.
- Alerts and on-call: PagerDuty Security service for unsigned attempts; weekly review of audit log anomalies.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| None | — | — | Closed |

#### 18. References
- Mux signed URL documentation.
- Clerk server auth guide.
- GDPR Art.32 summary.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Build staging validation script `tests/signed-playback.spec.ts`.
- Decision points and owners: Confirm share TTL policy (Ava Chen); approve audit log schema (Priya Rao).
- Resource or tooling gaps: Need secure secret rotation guidance from DevOps.
- Sequencing notes: Draft before rate limiting doc to reference enforcement.
- Additional directives: Include code samples for Clerk middleware and token issuance.
</docBlueprint>

### Mux Upload and Webhook Reliability – `docs/playbook/platform/mux-upload-and-webhook-reliability.md`
<docBlueprint path="docs/playbook/platform/mux-upload-and-webhook-reliability.md" template="operational-runbook" owner="Platform Engineer">
#### 1. Summary
- Purpose: Preserve upload state, validate Mux webhooks, manage dead-letter queue, and ensure resilient asset processing.
- Audience: Platform engineers, reliability engineers, security reviewers.
- Outcome once delivered: Zero orphaned uploads, authenticated webhooks, DLQ replay automation with monitoring evidence.
- Owner: Platform Engineer (Noah Hughes sponsor).
- Milestone: M1 – Security Foundation (2025-09-22).

#### 2. Context
- Problem statement: Current workflow skips webhook signature checks and loses state when webhooks fail, breaching Codex REC-002 and Claude webhook resilience guidance.
- Background details: Upload metadata stored in Neon; Vercel functions handle webhooks; no DLQ present.
- Constraints: Operate within Vercel function limits; rely on Neon and Vercel KV; avoid new infrastructure spend.
- Related work or precedents: Mux webhook docs, Claude webhook validation runbooks, existing retry scripts.
- Key supporting links: Mux webhook schema, Vercel cron jobs, SOC2 CC7 incident response control.

#### 3. Goals
- G1: Persist upload job records with mux_upload_id, asset_id linkage, and share ID.
- G2: Enforce webhook signature validation, DLQ capture, replay automation, and alerting on repeated failures.

#### 4. Non-goals
- Building alternative queueing platforms beyond Vercel KV/DLQ pattern.

#### 5. Scope
##### In scope
- Upload initiation API, webhook handler, DLQ store, replay cron, monitoring dashboards.
##### Out of scope
- Client-side upload UI; live streaming extensions.
##### Boundaries and assumptions
- Assumption → Validation plan: Neon connection pooling suffices; confirm via staging load test before release.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Noah Hughes | Reliability Engineer | Approve runbook, monitor instrumentation | Final approval | Slack |
| Liam Patel | Security Lead | Validate signature verification | Approve security posture | PagerDuty |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-MUX-01 | Persist mux_upload_id, asset_id, share ID at initiation | P0 | Verified via DB record check |
| FR-MUX-02 | Validate webhook signatures using Mux secret and log failures | P0 | Gherkin scenario in Section 15.2 |
| FR-MUX-03 | Store failed webhooks in DLQ with retry metadata | P0 | Replay cron clears queue |
| FR-MUX-04 | Trigger alert after 3 failed retries | P1 | PagerDuty notification |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Reliability | ≥99.5% webhook success | Dashboard review | Reliability Engineer |
| Security | 100% spoofed attempts detected | Sentry log audit | Security Lead |
| Performance | Replay job completes <1 minute | Cron logs | Platform Engineer |
| Privacy | Webhook payloads redacted, stored ≤90 days | Compliance review | Compliance Officer |

#### 8. Approach
- Preferred approach: Validate signatures via HMAC check, persist upload state in Neon, use Vercel KV for DLQ pointer, schedule cron for replay.
- Alternatives considered: External queue (SQS) rejected due to scope; manual replay rejected due to high toil.
- Trade-offs: Slight complexity increase for guaranteed consistency.

#### 9. Structure or design
- Overview: Upload initiation → Neon persist → webhook processing with signature check → success update or DLQ fallback → replay cron.
- Components or steps: `/api/uploads`, `/api/webhooks/mux`, cron job `mux-dlq-replay`, telemetry dashboard.
- Diagram links: `docs/diagrams/mux-webhook-sequence.mmd`.

#### 10. Data
- Entities: UploadJob, WebhookEvent, ReplayAttempt.
- Sources and owners: Neon tables (Platform team), KV DLQ store (DevOps), Sentry logs (Reliability).
- Retention rules: WebhookEvent stored 90 days; ReplayAttempt log 30 days; DLQ messages purged on success.
- Data quality checks: Daily reconciliation job verifying asset + share status alignment.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| `/api/uploads` | Inbound | Frontend → API | JSON with mux_upload_id | Clerk auth | Platform Engineer |
| `/api/webhooks/mux` | Inbound | Mux → API | Mux webhook schema | HMAC signature | Platform Engineer |
| Replay cron | Internal | Cron → API | JSON batch | Service token | Reliability Engineer |

#### 12. Security, privacy, compliance
- Data classification: Upload metadata = Sensitive; webhook payloads = Confidential (contains viewer info).
- Threats and mitigations: Webhook spoofing mitigated via signature validation; DLQ overflow mitigated with monitoring; payload leaks mitigated via redaction.
- Controls mapped to standards: GDPR Art.32, APP 11, SOC2 CC7.2.
- Privacy/DPIA notes: Document retention and redaction rules; ensure payload samples pseudonymised.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Vendor | Mux webhook schema | Validate HMAC implementation | High | Platform Engineer |
| Tooling | Vercel Cron | Run replay job | Medium | DevOps |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | DLQ replay fails silently | Low | High | Add alert + manual runbook | Platform Engineer | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Webhook retry count | Retries per day | Unknown | <5/day | Sentry | Daily |
| DLQ depth | Items awaiting replay | Not tracked | <10 | Dashboard | Hourly |

##### 15.2 Acceptance summary
- Definition of Done: Signature validation enforced, DLQ and replay operational, monitoring dashboard and alert configured.
- Given a webhook arrives with a valid signature, When the handler processes the payload, Then it updates Neon records and records success telemetry.
- Given a webhook arrives with an invalid signature, When the handler validates it, Then it rejects the payload, stores metadata in DLQ, and notifies security via Sentry.

##### Compliance Acceptance
- Given audit preparation begins, When Compliance reviews webhook logs, Then evidence shows signatures validated and payload retention limited to 90 days for GDPR Art.32 and APP 11 compliance.
- Given an incident simulation runs, When the replay job is triggered, Then DLQ entries clear with audit trail referencing SOC2 CC7.2.

#### 16. Rollout and operations
- Environments and flags: Deploy to staging with `MUX_WEBHOOK_DLQ_ENABLED` flag; enable production after replay metrics stable.
- Runbooks and support: Include manual replay steps; link to vendor outage doc; provide escalation tree.
- Observability expectations: Dashboard for webhook success, DLQ depth, replay latency.
- Alerts and on-call: PagerDuty Platform service for DLQ spikes and signature failures.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| None | — | — | Closed |

#### 18. References
- Mux webhook signing guidance.
- Vercel Cron documentation.
- Claude webhook resilience review.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Build replay harness script; capture sample payloads.
- Decision points and owners: Alert thresholds (Noah Hughes); payload redaction strategy (Priya Rao).
- Resource or tooling gaps: Need temporary access to Vercel KV metrics.
- Sequencing notes: Coordinate with rate limiting doc for shared monitoring hooks.
- Additional directives: Provide synthetic payload examples; include failure drill instructions.
</docBlueprint>
### Data Residency and Retention – `docs/playbook/compliance/data-residency-and-retention.md`
<docBlueprint path="docs/playbook/compliance/data-residency-and-retention.md" template="compliance-framework" owner="Compliance Analyst">
#### 1. Summary
- Purpose: Define lawful basis, residency controls, retention schedules, and erasure workflows satisfying GDPR and Australian Privacy Act.
- Audience: Compliance, legal, engineering leads, data stewards.
- Outcome once delivered: Residency matrix approved, retention schedule published, erasure automation documented with 30-day SLA.
- Owner: Compliance Analyst (Priya Rao).
- Milestone: M2 – Compliance Controls (2025-09-27).

#### 2. Context
- Problem statement: Current documentation lacks explicit lawful basis catalogue, residency commitments, and deletion SOPs noted in Claude compliance review.
- Background details: Primary storage Neon (Sydney), Sentry EU region optional, Mux multi-region; subject requests processed manually.
- Constraints: Must support AU-first deployment with EU failover; adhere to vendor data residency contracts; no new data stores.
- Related work or precedents: Claude GDPR framework doc, OAIC guidance, existing privacy notice draft.
- Key supporting links: GDPR Articles 6/17/30 references, APP guidelines, Neon regional deployment doc.

#### 3. Goals
- G1: Document lawful basis for each data set and maintain data inventory with residency tags.
- G2: Define retention rules and automation steps ensuring erasure within 30 days of request.

#### 4. Non-goals
- Drafting new legal contracts or Data Processing Agreements beyond referencing existing terms.

#### 5. Scope
##### In scope
- Residency matrix, retention tables, erasure workflow, audit evidence process.
##### Out of scope
- Future premium features data flows; third-party marketing integrations.
##### Boundaries and assumptions
- Assumption → Validation plan: Vendors honour current residency commitments; verify via latest SOC reports and vendor attestation.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Priya Rao | Compliance Officer | Approve framework | Final sign-off | compliance@motionmavericks.com |
| Sofia Mendes | Legal Counsel | Validate legal language | Escalation for statutory requirements | legal@motionmavericks.com |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-DRR-01 | Publish data inventory with residency classification per system | P0 | Reviewed by Security & Legal |
| FR-DRR-02 | Document retention periods and deletion triggers for each data class | P0 | Links to automation tasks |
| FR-DRR-03 | Provide erasure workflow achieving ≤30 day SLA | P0 | Includes escalation matrix |
| FR-DRR-04 | Record lawful basis and consent mapping for personal data | P0 | Supports privacy notice |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Privacy | Erasure completed ≤30 days | Playwright compliance test | Compliance Officer |
| Security | Access restricted to compliance group | Access audit | Security Lead |
| Reliability | Residency monitoring health checks weekly | Ops review | Reliability Engineer |
| Auditability | Evidence attached for each deletion | Audit log review | Compliance Analyst |

#### 8. Approach
- Preferred approach: Build residency matrix referencing vendor docs, integrate retention schedule into automation scripts, reference erasure Playwright suite.
- Alternatives considered: Manual spreadsheets rejected due to audit risk; third-party tooling deferred to post-MVP.
- Trade-offs: Additional documentation effort vs regulatory certainty.

#### 9. Structure or design
- Overview: Data inventory table, residency map, retention schedule, erasure SOP.
- Components or steps: Residency matrix, automation checklist, evidence repository.
- Diagram links: `docs/diagrams/data-residency-map.mmd`.

#### 10. Data
- Entities: DataSet, ResidencyRegion, RetentionRule, ErasureTicket.
- Sources and owners: Neon schema, Vercel storage, Sentry logs, Finance data exports.
- Retention rules: Document for each entity; default 180 days active, 30 days soft delete, 2 years audit logs.
- Data quality checks: Quarterly audit verifying inventory accuracy; monthly deletion validation sample.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| Erasure ticketing | Inbound | Customer Support → Compliance | JSON payload | Support auth | Compliance Officer |
| Audit evidence store | Outbound | Compliance → SharePoint/Confluence | PDF/CSV | SSO | Programme Office |

#### 12. Security, privacy, compliance
- Data classification: Videos = Confidential; personal data = Sensitive; audit logs = Restricted.
- Threats and mitigations: Residency drift mitigated via monitoring; deletion failures mitigated via automation; lawful basis misalignment mitigated via review checklist.
- Controls mapped to standards: GDPR Art.6/17/30, APP 6/11/12, SOC2 CC1.2.
- Privacy/DPIA notes: Document DPIA summary and escalation triggers; link to cookie consent doc for cross-reference.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Vendor | Mux/Clerk data residency statements | Confirm storage regions | High | Legal Counsel |
| Internal | Cookie consent doc | Align lawful basis | Medium | Product Lead |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Erasure automation incomplete | Medium | High | Include automation checklist + QA test | Compliance Officer | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Erasure SLA | Time to complete deletion | Not tracked | ≤30 days | Ticketing system | Monthly |
| Residency compliance | Percentage of data in approved region | Unknown | 100% | Monitoring dashboard | Weekly |

##### 15.2 Acceptance summary
- Definition of Done: Residency matrix, retention schedule, and erasure SOP approved by Compliance Officer and Legal Counsel with evidence links.
- Given a data subject submits an erasure request, When the SOP executes, Then all related records across Neon, KV, Blob, and Sentry are deleted within 30 days and evidence stored in audit log.
- Given quarterly residency review, When monitoring reveals drift, Then remediation steps are documented within 48 hours.

##### Compliance Acceptance
- Given GDPR and APP audits are scheduled, When auditors request lawful basis documentation, Then the playbook provides Gherkin scenario outputs proving coverage for Articles 6 and APP 6 with sign-off.
- Given privacy notices change, When legal updates consent copy, Then the playbook references updated lawful basis mapping within 5 business days.

#### 16. Rollout and operations
- Environments and flags: Apply retention scripts to staging first; enable production after dry run; track via `RETENTION_POLICY_VERSION` flag.
- Runbooks and support: Include deletion checklist; provide contact tree for escalations; reference vendor contacts.
- Observability expectations: Dashboard for residency checks and deletion SLA metrics.
- Alerts and on-call: Compliance team receives alerts for overdue deletions and residency drift.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Confirm Neon point-in-time recovery retention | Compliance Officer | 2025-09-20 | Open |

#### 18. References
- GDPR and APP guidelines.
- Claude GDPR framework review.
- Vendor data residency statements.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Gather vendor attestations, confirm ticketing integration.
- Decision points and owners: Retention windows per dataset (Priya Rao); evidence repository tool (Programme Office).
- Resource or tooling gaps: Need access to support ticketing API.
- Sequencing notes: Align with cookie consent doc for lawful basis references.
- Additional directives: Include table templates for residency and retention; avoid TBD placeholders.
</docBlueprint>

### Rate Limiting and Abuse Controls – `docs/playbook/security/rate-limiting-and-abuse-controls.md`
<docBlueprint path="docs/playbook/security/rate-limiting-and-abuse-controls.md" template="security-control" owner="Backend Engineer">
#### 1. Summary
- Purpose: Define API and playback throttling, abuse detection, and monitoring controls that protect cost and security posture.
- Audience: Backend engineers, SRE, security reviewers.
- Outcome once delivered: Rate limits enforced with monitoring, synthetic abuse tests, and escalation workflow.
- Owner: Backend Engineer (supported by Liam Patel).
- Milestone: M3 – Operational Controls (2025-09-29).

#### 2. Context
- Problem statement: No documented rate limits or abuse detection; Claude review highlighted risk of cost blowouts and API abuse.
- Background details: Next.js API routes serve uploads and playback; Clerk handles auth; no current throttling.
- Constraints: Must run within Vercel edge/runtime; avoid user lockout; coordinate with signed playback doc.
- Related work or precedents: Claude rate limiting blueprint, Codex cost guardrails, existing Playwright tests.
- Key supporting links: Vercel rate limiting docs, Clerk session API, SOC2 CC7 guidance.

#### 3. Goals
- G1: Define and enforce API rate limits per route and per IP/user.
- G2: Implement detection and alerting for anomalous traffic with synthetic monitoring.

#### 4. Non-goals
- Building external WAF; integration with CDN-level rate limiting (post-MVP consideration).

#### 5. Scope
##### In scope
- Upload, playback, share management endpoints; abuse detection scripts; monitoring dashboards.
##### Out of scope
- Marketing site traffic; third-party integrations beyond MVP scope.
##### Boundaries and assumptions
- Assumption → Validation plan: Limits of 100 playback requests/min/IP and 20 uploads/day/user suit pilot usage; review weekly with Product.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Liam Patel | Security Lead | Approve thresholds and detection rules | Final sign-off | PagerDuty |
| Ava Chen | Product Lead | Validate user impact | Can request exceptions | Weekly sync |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-RLA-01 | Implement per-route rate limits with configurable thresholds | P0 | Verified via synthetic test |
| FR-RLA-02 | Record throttled events and reasons in structured logs | P0 | Logs feed Sentry |
| FR-RLA-03 | Provide override process for approved users | P1 | Linked to cost monitoring doc |
| FR-RLA-04 | Trigger throttling at 90% of weekly budget | P0 | Coordinates with cost doc |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Performance | Limit checks add <10ms overhead | Load test | Backend Engineer |
| Reliability | No more than 1% false positives | Synthetic monitoring | Reliability Engineer |
| Security | 100% abuse scenarios detected in drills | Drill report | Security Lead |
| Privacy | Logs redact IPs per policy | Compliance review | Compliance Officer |

#### 8. Approach
- Preferred approach: Use Vercel edge middleware for rate limiting; store counters in KV; integrate with signed playback route.
- Alternatives considered: Third-party WAF rejected for cost; manual monitoring rejected for unreliability.
- Trade-offs: Additional latency vs protection and cost control.

#### 9. Structure or design
- Overview: Middleware intercepts requests, checks counters, updates logs, triggers alerts if thresholds reached.
- Components or steps: Vercel middleware, KV store, Sentry alerts, override workflow.
- Diagram links: `docs/diagrams/rate-limiting-flow.mmd`.

#### 10. Data
- Entities: RateLimitCounter, ThrottleEvent, OverrideRequest.
- Sources and owners: Vercel KV (DevOps), Sentry logs (Security), Finance budgets (Finance Ops).
- Retention rules: Throttle logs kept 180 days; override requests retained 1 year.
- Data quality checks: Weekly review of false positives; monthly reconciliation with Finance budgets.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| Rate limit middleware | Internal | Middleware → API routes | JSON metadata | Service secret | Backend Engineer |
| Override API | Inbound | Admin → API | JSON {userId, reason, expiry} | Clerk admin auth | Product Lead |

#### 12. Security, privacy, compliance
- Data classification: Rate limit counters = Sensitive; override requests = Restricted.
- Threats and mitigations: Credential stuffing mitigated by throttle; cost abuse mitigated by budget-based throttling; false positives mitigated via overrides.
- Controls mapped to standards: SOC2 CC7.1, GDPR Art.32 (availability), APP 11.
- Privacy/DPIA notes: Ensure logs store hashed identifiers; reference privacy notice for rate limit messaging.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Internal | Cost monitoring doc | Share thresholds | High | DevOps |
| Internal | Signed playback doc | Coordinates playback enforcement | Medium | Security Lead |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Limits frustrate legitimate users | Medium | Medium | Start monitor mode, adjust weekly | Product Lead | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Throttled request rate | % of requests throttled | Unknown | <2% legitimate traffic | Sentry | Weekly |
| Abuse detection coverage | Scenarios detected/total tested | N/A | 100% | Synthetic tests | Monthly |

##### 15.2 Acceptance summary
- Definition of Done: Middleware deployed, thresholds tuned, override process documented, monitoring dashboards live.
- Given an IP exceeds playback threshold, When the middleware evaluates the request, Then it responds with HTTP 429, logs the event, and increments throttle metrics.
- Given Finance updates budget thresholds, When the doc is refreshed, Then rate limit configs are updated within 2 business days and change logged.

##### Compliance Acceptance
- Given a GDPR availability check occurs, When rate limiting is evaluated, Then evidence shows no undue denial of service to legitimate users while abuse is mitigated consistent with GDPR Art.32 and APP 11.
- Given quarterly SOC2 review, When auditors inspect overrides, Then approvals include rationale and expiry per SOC2 CC7.1.

#### 16. Rollout and operations
- Environments and flags: Enable monitor-only mode in staging; progress to enforcement in staging then production flag `RATE_LIMIT_ENFORCED`.
- Runbooks and support: Include override request SOP; incident response for throttling spikes.
- Observability expectations: Dashboard for throttle metrics, false positives, override usage.
- Alerts and on-call: PagerDuty Security service for abuse spikes; Product notified for high legitimate throttles.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Determine rate limit messaging copy | Product Lead | 2025-09-21 | Open |

#### 18. References
- Vercel rate limiting documentation.
- Claude rate limiting review.
- SOC2 CC7 guidance.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Build synthetic abuse scripts; define override form.
- Decision points and owners: Threshold tuning (Security Lead & Finance Ops); message copy (Product Lead).
- Resource or tooling gaps: Need KV capacity confirmation.
- Sequencing notes: Align with cost doc for shared alerts.
- Additional directives: Provide per-endpoint tables; include user comms examples.
</docBlueprint>

### Audit Logging and Vendor Review – `docs/playbook/security/audit-logging-and-vendor-review.md`
<docBlueprint path="docs/playbook/security/audit-logging-and-vendor-review.md" template="security-control" owner="Security Architect">
#### 1. Summary
- Purpose: Define structured audit logging, retention tiers, access controls, and vendor security review cadence.
- Audience: Security team, compliance, platform engineers, vendor managers.
- Outcome once delivered: Central audit schema, retention policy, quarterly vendor review checklist, monitoring coverage.
- Owner: Security Architect (reporting to Liam Patel).
- Milestone: M2 – Compliance Controls (2025-09-27).

#### 2. Context
- Problem statement: Logs inconsistent; no vendor audit cadence; Claude review highlighted compliance exposure.
- Background details: Logs span Sentry, Neon, Vercel; vendor reviews ad hoc.
- Constraints: Stay within storage budget; align with SOC2 and GDPR logging requirements; ensure tamper evidence.
- Related work or precedents: Claude audit logging blueprint, Codex vendor review backlog, SOC2 audit prep notes.
- Key supporting links: Sentry structured logging docs, vendor security questionnaires, SOC2 CC7.

#### 3. Goals
- G1: Deliver logging schema covering security events, playback, rate limiting, cost actions with retention tiers.
- G2: Establish vendor review schedule with checklist and escalation path.

#### 4. Non-goals
- Implementing SIEM ingestion beyond Sentry/Neon; negotiating new vendor contracts.

#### 5. Scope
##### In scope
- Logging schema definitions, retention tiers, access governance, vendor review checklist.
##### Out of scope
- Full SIEM integration; new vendor onboarding toolkit.
##### Boundaries and assumptions
- Assumption → Validation plan: Storage impact manageable with compression; confirm via Finance when doc drafted.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Liam Patel | Security Lead | Approve logging schema | Final sign-off | PagerDuty |
| Elise Morgan | Finance Ops Partner | Monitor storage costs | Approve budget guardrails | finance@motionmavericks.com |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-ALV-01 | Define structured logging schema with required fields per event type | P0 | Schema published |
| FR-ALV-02 | Implement retention tiers (hot, warm, archive) with purge schedule | P0 | Verified via automated script |
| FR-ALV-03 | Document quarterly vendor review checklist and scoring | P0 | Linked to vendor playbooks |
| FR-ALV-04 | Provide access review workflow for log viewing | P1 | Aligns with access tracker |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Security | Logs tamper-evident via checksums | Audit log test | Security Lead |
| Compliance | Vendor reviews completed quarterly | Checklist evidence | Programme Office |
| Cost | Storage growth ≤15% QoQ | Finance report | Finance Ops |
| Availability | Logs accessible within 5 minutes of event | Monitoring dashboard | Reliability Engineer |

#### 8. Approach
- Preferred approach: Standardise logging using structured JSON, send to Sentry + Neon, manage retention with scheduled jobs, maintain vendor review runbook.
- Alternatives considered: External log service deferred; spreadsheets for vendor review rejected due to control risk.
- Trade-offs: Additional engineering time vs audit readiness.

#### 9. Structure or design
- Overview: Logging taxonomy, retention pipeline, access control matrix, vendor checklist.
- Components or steps: Schema table, retention jobs, access approval workflow, vendor assessment template.
- Diagram links: `docs/diagrams/audit-logging-flow.mmd`.

#### 10. Data
- Entities: AuditEvent, RetentionTier, VendorAssessment.
- Sources and owners: Application logs, Finance storage reports, vendor security responses.
- Retention rules: Hot 30 days, Warm 180 days, Archive 2 years; vendor assessments retained 3 years.
- Data quality checks: Monthly sampling; checksum validation on archive restore.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| Logging pipeline | Outbound | App → Sentry/Neon | JSON schema | Service key | Security Architect |
| Vendor review checklist | Inbound | Vendor Manager → App | CSV/Markdown | SSO | Programme Office |

#### 12. Security, privacy, compliance
- Data classification: Security logs = Restricted; vendor assessments = Confidential.
- Threats and mitigations: Log tampering mitigated via checksum; vendor drift mitigated via checklist; overcollection mitigated via schema discipline.
- Controls mapped to standards: SOC2 CC6/CC7, GDPR Art.30, APP 11.
- Privacy/DPIA notes: Exclude personal data from logs where not required; anonymise IPs.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Internal | Cost monitoring doc | Budget thresholds | Medium | Finance Ops |
| Vendor | Vendor security questionnaires | Complete checklist | High | Legal Counsel |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Storage cost spike | Medium | Medium | Implement retention tiers + compression | Finance Ops | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Vendor review completion | % completed on schedule | Not tracked | 100% quarterly | Checklist | Quarterly |
| Log retention compliance | % logs within tier policy | Unknown | 100% | Retention report | Monthly |

##### 15.2 Acceptance summary
- Definition of Done: Logging schema approved, retention automation operational, vendor checklist executed for Mux and Clerk.
- Given a security event occurs, When logs are generated, Then entries include required fields, appear in monitoring within 5 minutes, and retention tier assignments apply.
- Given quarter end, When vendor reviews are due, Then completed checklists with remediation notes exist for each vendor.

##### Compliance Acceptance
- Given a GDPR or SOC2 audit, When auditors inspect logs, Then checksum evidence and retention reports demonstrate compliance with CC6/CC7 and GDPR Art.30.
- Given vendor attestation renewal, When the checklist identifies gaps, Then remediation tasks are logged within 5 business days.

#### 16. Rollout and operations
- Environments and flags: Apply schema to staging first; enable production logging with `AUDIT_SCHEMA_VERSION`; archive job scheduled via cron.
- Runbooks and support: Include log access request SOP; vendor follow-up playbook.
- Observability expectations: Dashboard for log ingestion lag, storage usage.
- Alerts and on-call: PagerDuty Security for ingestion failures; Finance notified for storage thresholds.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Select archive storage location (S3 vs Vercel Blob) | Security Architect | 2025-09-23 | Open |

#### 18. References
- Claude audit logging blueprint.
- SOC2 CC6/CC7 references.
- Vendor security questionnaires.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Gather current log samples; compile vendor contacts.
- Decision points and owners: Archive tooling (Security Architect); review calendar (Programme Office).
- Resource or tooling gaps: Need Finance storage metrics access.
- Sequencing notes: Align with cost monitoring doc for storage budgets.
- Additional directives: Provide template tables and sample queries.
</docBlueprint>
### SLO and Incident Response – `docs/playbook/operations/slo-and-incident-response.md`
<docBlueprint path="docs/playbook/operations/slo-and-incident-response.md" template="operational-runbook" owner="Reliability Engineer">
#### 1. Summary
- Purpose: Define service level objectives, error budgets, incident lifecycle, and escalation procedures.
- Audience: Reliability engineers, on-call staff, leadership.
- Outcome once delivered: SLO targets published, error budget policy approved, incident runbook rehearsed.
- Owner: Reliability Engineer (Noah Hughes).
- Milestone: M4 – Incident Readiness (2025-10-04).

#### 2. Context
- Problem statement: No documented SLOs or incident workflows; Claude review flagged operational readiness gap.
- Background details: PagerDuty service configured but lacks formal runbook; Sentry provides alerts; no post-incident template.
- Constraints: Maintain 99.9% playback availability; align with security review timeline; integrate with vendor playbooks.
- Related work or precedents: Codex SLO backlog, Claude incident response review, existing on-call notes.
- Key supporting links: PagerDuty service config, Sentry alert docs, SOC2 incident handling guidance.

#### 3. Goals
- G1: Publish SLOs for playback, upload, webhook processing with error budgets.
- G2: Document incident response lifecycle including classification, comms, post-incident review.

#### 4. Non-goals
- Configuring automated remediation bots; building new monitoring stack.

#### 5. Scope
##### In scope
- SLO definitions, dashboards, incident checklist, communication templates, drill schedule.
##### Out of scope
- Non-MVP services; long-term chaos engineering roadmap.
##### Boundaries and assumptions
- Assumption → Validation plan: Existing telemetry sufficient for SLO measurement; validate with upload telemetry doc.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Noah Hughes | Reliability Engineer | Draft SLOs, lead incident drills | Final approval | Slack |
| Liam Patel | Security Lead | Approve security-related response steps | Required sign-off | PagerDuty |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-SLO-01 | Define SLO targets and error budgets for playback, uploads, webhooks | P0 | Dashboard references |
| FR-SLO-02 | Document incident classification and escalation matrix | P0 | Links to vendor playbooks |
| FR-SLO-03 | Provide post-incident review template with action tracking | P0 | Template stored in repo |
| FR-SLO-04 | Schedule quarterly incident drills | P1 | Calendar invite evidence |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Reliability | SLOs measured with ≤5% variance | Dashboard validation | Reliability Engineer |
| Security | Security incidents escalated within 15 minutes | PagerDuty logs | Security Lead |
| Compliance | Incident logs retained 2 years | Audit check | Compliance Officer |
| Communication | Stakeholder updates within 30 minutes of major incident | Incident log | Programme Office |

#### 8. Approach
- Preferred approach: Use existing telemetry dashboards, codify SLOs, embed incident SOP with roles and comms templates.
- Alternatives considered: Outsourcing on-call rejected; ad hoc response rejected.
- Trade-offs: Additional process overhead vs faster recovery and audit readiness.

#### 9. Structure or design
- Overview: SLO tables, incident lifecycle diagram, checklists.
- Components or steps: SLO definition, monitoring mapping, incident escalation, PIR template.
- Diagram links: `docs/diagrams/incident-lifecycle.mmd`.

#### 10. Data
- Entities: SLOMetric, IncidentRecord, ActionItem.
- Sources and owners: Observability dashboards, PagerDuty, Confluence PIR log.
- Retention rules: Incident records 2 years; action items tracked until resolved.
- Data quality checks: Monthly SLO audit; quarterly drill review.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| PagerDuty webhooks | Inbound | PagerDuty → Runbook | JSON payload | API key | DevOps |
| PIR repository | Outbound | Reliability → Confluence | Markdown template | SSO | Programme Office |

#### 12. Security, privacy, compliance
- Data classification: Incident logs = Restricted.
- Threats and mitigations: Alert fatigue mitigated by tuning; missing stakeholders mitigated via escalation matrix; audit gaps mitigated via PIR template.
- Controls mapped to standards: SOC2 CC7, GDPR Art.33 (notification timelines), APP 11.
- Privacy/DPIA notes: Include privacy breach handling referencing Legal Counsel.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Internal | Upload telemetry doc | Provide metrics | Medium | Reliability Engineer |
| Internal | Vendor outage playbooks | Incident integration | Medium | Operations Lead |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Drill participation low | Medium | Medium | Schedule in advance, involve leadership | Programme Office | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| SLO compliance | % of time meeting targets | Unknown | ≥99.9% playback | Dashboard | Weekly |
| Incident response time | Time to engage on-call | N/A | ≤15 minutes | PagerDuty | Incident |

##### 15.2 Acceptance summary
- Definition of Done: SLO tables published, dashboards linked, incident SOP approved, drill scheduled.
- Given an incident is triggered, When on-call receives PagerDuty alert, Then they follow documented escalation path and update stakeholders within 30 minutes.
- Given error budget burn exceeds threshold, When the doc procedure runs, Then feature releases pause and mitigation plan is recorded.

##### Compliance Acceptance
- Given GDPR breach notification rules, When an incident involves personal data, Then Legal Counsel is notified within 72 hours and actions recorded for GDPR Art.33 compliance.
- Given SOC2 audit, When auditors inspect incident logs, Then evidence shows runbook followed and PIRs stored with action closure.

#### 16. Rollout and operations
- Environments and flags: Apply SLO monitors to staging and prod; maintain `INCIDENT_DRILL_SCHEDULE` metadata.
- Runbooks and support: Provide incident checklist, communication templates, on-call handover doc.
- Observability expectations: Dashboards per SLO; error budget burn chart.
- Alerts and on-call: PagerDuty reliability service; Slack #incident-room channel.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Confirm Legal contact for breach notification | Programme Office | 2025-09-22 | Open |

#### 18. References
- Claude incident response review.
- PagerDuty best practices guide.
- SOC2 CC7 documentation.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Capture current monitoring baselines; confirm communication templates.
- Decision points and owners: Error budget thresholds (Noah Hughes); breach notification steps (Sofia Mendes).
- Resource or tooling gaps: Need access to PagerDuty analytics.
- Sequencing notes: Coordinate with vendor outage playbooks for consistent escalation.
- Additional directives: Include table of incident severity levels.
</docBlueprint>

### Cost Monitoring and Alerting – `docs/playbook/cost/cost-monitoring-and-alerting.md`
<docBlueprint path="docs/playbook/cost/cost-monitoring-and-alerting.md" template="operational-runbook" owner="DevOps Engineer">
#### 1. Summary
- Purpose: Implement cost dashboards, alert thresholds, throttling triggers, and reporting to prevent budget overruns.
- Audience: DevOps, Finance Ops, Product leadership.
- Outcome once delivered: Automated cost monitoring, alerts at 50/80/100%, throttling at 90%, monthly reporting.
- Owner: DevOps Engineer (partnered with Elise Morgan).
- Milestone: M3 – Operational Controls (2025-09-29).

#### 2. Context
- Problem statement: No automated cost visibility; Claude blueprint flagged high risk for overruns.
- Background details: Vendors include Mux, Neon, Vercel, Clerk; manual exports only.
- Constraints: Use existing APIs; maintain <2s dashboard load; integrate with rate limiting doc.
- Related work or precedents: Claude cost monitoring plan, Finance monthly reporting.
- Key supporting links: Vendor billing APIs, Finance export templates, SOC financial controls.

#### 3. Goals
- G1: Aggregate cost data across vendors with near-real-time dashboard.
- G2: Configure alerts and throttling triggers aligned to budget thresholds.

#### 4. Non-goals
- Implementing third-party cost SaaS; forecasting beyond MVP horizon.

#### 5. Scope
##### In scope
- Data aggregation scripts, dashboard, alerting, throttling integration, monthly report template.
##### Out of scope
- Annual budgeting; chargeback models.
##### Boundaries and assumptions
- Assumption → Validation plan: Vendor APIs available within rate limits; confirm with manual call testing.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Elise Morgan | Finance Ops Partner | Approve thresholds, receive reports | Final finance sign-off | finance@motionmavericks.com |
| DevOps Engineer | Implementation owner | Build monitoring pipeline | Technical decisions | devops@motionmavericks.com |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-CMA-01 | Ingest cost data daily for Mux, Neon, Vercel, Clerk | P0 | Dashboard displays totals |
| FR-CMA-02 | Trigger alerts at 50/80/100% of monthly budget | P0 | Alert evidence stored |
| FR-CMA-03 | Enable throttling at 90% budget via rate limit doc | P0 | Integration test |
| FR-CMA-04 | Generate monthly cost report with service breakdown | P0 | Delivered to Finance |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Performance | Dashboard load <2s | Performance test | DevOps |
| Reliability | Monitoring uptime ≥99.9% | Monitoring logs | DevOps |
| Accuracy | Variance from actual bills <5% | Finance reconciliation | Finance Ops |
| Security | API keys stored securely | Secrets audit | Security Lead |

#### 8. Approach
- Preferred approach: Use scheduled scripts pulling vendor APIs, store metrics in KV/Neon, visualise via dashboard, integrate with alerts.
- Alternatives considered: Manual tracking rejected; third-party SaaS deferred.
- Trade-offs: Engineering effort vs financial visibility.

#### 9. Structure or design
- Overview: Data ingestion pipeline, dashboard, alerting workflow, throttling integration.
- Components or steps: Fetch scripts, data store, dashboard, alert webhooks.
- Diagram links: `docs/diagrams/cost-monitoring-architecture.mmd`.

#### 10. Data
- Entities: CostMetric, BudgetThreshold, AlertEvent.
- Sources and owners: Vendor APIs, Finance budgets, rate limiting config.
- Retention rules: Daily snapshots kept 1 year; alert history 2 years.
- Data quality checks: Daily reconciliation job; monthly variance review.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| Vendor APIs | Inbound | Cost service → Vendors | JSON | API key | DevOps |
| Alert webhooks | Outbound | Cost service → Slack/PagerDuty | JSON | Webhook token | DevOps |

#### 12. Security, privacy, compliance
- Data classification: Cost data = Protected; alert logs = Internal.
- Threats and mitigations: API key leakage mitigated by secrets vault; false alarms mitigated via smoothing; data integrity ensured by reconciliation.
- Controls mapped to standards: SOX-like financial controls, SOC2 CC1.2, GDPR (minimal personal data).
- Privacy/DPIA notes: Ensure cost analytics anonymise user identifiers; align with minimal analytics doc.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Internal | Rate limiting doc | Throttling integration | High | Backend Engineer |
| External | Vendor billing APIs | Cost data source | High | Finance Ops |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | API rate limits block ingestion | Medium | Medium | Cache, stagger requests, vendor escalation | DevOps | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Cost variance | Difference vs invoice | Unknown | <5% | Finance reconciliation | Monthly |
| Alert response time | Time from alert to acknowledgement | N/A | <1 hour | Alert logs | Continuous |

##### 15.2 Acceptance summary
- Definition of Done: Dashboard live, alerts configured, throttling integration tested, Finance receiving monthly report.
- Given spend crosses 80% of budget, When the monitoring job runs, Then Slack/Email alerts trigger with breakdown and throttle readiness check.
- Given the month ends, When the reporting script runs, Then Finance receives report with variance statement and action items.

##### Compliance Acceptance
- Given financial controls audit, When auditors inspect cost monitoring, Then evidence shows alerts, throttle logs, and Finance approvals aligning with SOX-style controls and APP 6 transparency.
- Given privacy obligations, When cost data contains user identifiers, Then they are anonymised before storage per GDPR Art.5 data minimisation.

#### 16. Rollout and operations
- Environments and flags: Test ingestion in staging using sandbox data; enable production with `COST_MONITORING_ENABLED` flag.
- Runbooks and support: Provide alert response SOP; include manual export fallback.
- Observability expectations: Dashboard for cost trends, alert counts, throttle status.
- Alerts and on-call: Finance Ops and DevOps on-call for cost overruns; escalate to Product for throttling decisions.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Determine reporting visualisation tool | Finance Ops | 2025-09-24 | Open |

#### 18. References
- Claude cost monitoring blueprint.
- Vendor billing API docs.
- Finance KPI dashboard requirements.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Confirm API credentials; design dashboard layout.
- Decision points and owners: Alert channels (DevOps); throttle escalation policy (Finance Ops & Product Lead).
- Resource or tooling gaps: Need secure credential storage guidance.
- Sequencing notes: Coordinate with rate limiting doc for shared triggers.
- Additional directives: Include sample alert payloads and reconciliation checklist.
</docBlueprint>

### Vendor Outage Runbooks – `docs/playbook/operations/vendor-outage-runbooks.md`
<docBlueprint path="docs/playbook/operations/vendor-outage-runbooks.md" template="operational-runbook" owner="Operations Lead">
#### 1. Summary
- Purpose: Provide vendor-specific outage escalation, communication, and fallback procedures.
- Audience: Operations team, on-call engineers, support.
- Outcome once delivered: Runbooks for Mux, Clerk, Neon, Vercel with clear fallback and comms steps.
- Owner: Operations Lead (Noah Hughes delegate).
- Milestone: M4 – Incident Readiness (2025-10-04).

#### 2. Context
- Problem statement: No documented vendor outage handling despite reliance on multiple services; Claude emphasised business continuity.
- Background details: Vendors provide status pages; no structured escalation.
- Constraints: Align with incident response doc; rely on existing support contracts.
- Related work or precedents: Codex vendor runbook notes, Claude business continuity review.
- Key supporting links: Vendor status pages, support contacts, SLA documents.

#### 3. Goals
- G1: Outline detection, escalation, and mitigation steps for each vendor outage scenario.
- G2: Document communication templates and fallback plans for creators.

#### 4. Non-goals
- Negotiating new SLAs; designing long-term redundancy architecture.

#### 5. Scope
##### In scope
- Mux, Clerk, Neon, Vercel outage procedures; communication guidelines; runbook checklists.
##### Out of scope
- Non-critical vendors (e.g., analytics) except when affecting MVP flows.
##### Boundaries and assumptions
- Assumption → Validation plan: Vendor contact info current; verify quarterly.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Noah Hughes | Reliability Engineer | Owns runbook quality | Final approval | Slack |
| Ava Chen | Product Lead | Approves customer communications | Communication authority | Weekly sync |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-VOR-01 | Provide outage detection checklist per vendor | P0 | Links to monitoring |
| FR-VOR-02 | Document escalation contacts and SLAs | P0 | Verified quarterly |
| FR-VOR-03 | Define fallback actions (e.g., disable uploads) | P0 | Tested in drills |
| FR-VOR-04 | Supply creator/customer comms templates | P1 | Approved by Product |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Reliability | Runbook accessible at all times | Repo link test | Programme Office |
| Communication | Updates issued within 30 minutes | Incident log | Product Lead |
| Compliance | Outage records retained 2 years | Audit log | Compliance Officer |
| Accuracy | Vendor contacts verified quarterly | Checklist | Operations Lead |

#### 8. Approach
- Preferred approach: Create runbook sections per vendor with detection steps, escalation, fallback, comms.
- Alternatives considered: Generic runbook rejected; ad hoc messaging rejected.
- Trade-offs: Maintenance overhead vs reduced downtime impact.

#### 9. Structure or design
- Overview: Vendor sections with detection triggers, decision tree, communication plan.
- Components or steps: Monitoring cues, escalation matrix, fallback actions, comms templates.
- Diagram links: `docs/diagrams/vendor-outage-decision-tree.mmd`.

#### 10. Data
- Entities: VendorRunbook, EscalationContact, FallbackAction.
- Sources and owners: Vendor contracts, internal contact lists, status feeds.
- Retention rules: Runbook history stored 3 years.
- Data quality checks: Quarterly review ensure contacts current.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| Vendor support channels | Outbound | Ops → Vendor | Email/portal | Vendor auth | Operations Lead |
| Incident comms | Outbound | Ops → Creators | Email/SMS | Support auth | Product Lead |

#### 12. Security, privacy, compliance
- Data classification: Runbooks = Internal; vendor contact info = Confidential.
- Threats and mitigations: Stale contact mitigated by quarterly review; comms misalignment mitigated by templates; privacy breach risk mitigated by referencing incident doc.
- Controls mapped to standards: SOC2 CC7, ISO 27001 A.17.
- Privacy/DPIA notes: Ensure comms avoid sharing personal data; escalate privacy issues via incident SOP.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Internal | Incident response doc | Shared escalation process | High | Reliability Engineer |
| External | Vendor SLA documents | Contact details | Medium | Legal Counsel |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Comms template outdated | Medium | Medium | Review monthly with Product | Product Lead | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Runbook drill success | % scenarios rehearsed | Not tracked | 100% quarterly | Drill log | Quarterly |
| Vendor response time | Time to vendor acknowledgement | Unknown | ≤30 minutes | Incident log | Per incident |

##### 15.2 Acceptance summary
- Definition of Done: Runbooks exist for all core vendors, contacts verified, fallback tested during drill.
- Given a Mux outage occurs, When detection checklist triggers, Then on-call escalates to Mux support, notifies stakeholders, and executes fallback within documented timelines.
- Given quarterly review, When contacts are verified, Then updates are logged and runbook version bumped.

##### Compliance Acceptance
- Given business continuity audit, When auditors inspect runbooks, Then they find ISO 27001 A.17 controls mapped with evidence of drills and contact verification.
- Given outage communications, When customer notices are sent, Then they align with privacy obligations and are logged for APP 6 transparency.

#### 16. Rollout and operations
- Environments and flags: Store runbooks in repo; sync summary to Confluence; maintain `VENDOR_RUNBOOK_VERSION` metadata.
- Runbooks and support: Provide escalation tree, fallback checklists, comms scripts.
- Observability expectations: Link to vendor status feeds; include manual verification steps.
- Alerts and on-call: PagerDuty reliability service; communications via Slack #incident-room.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Confirm Neon support escalation path | Operations Lead | 2025-09-25 | Open |

#### 18. References
- Vendor SLA documents.
- Claude business continuity review.
- Codex vendor runbook backlog.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Collect vendor contacts; design fallback tests.
- Decision points and owners: Communication channels (Product Lead); fallback thresholds (Reliability Engineer).
- Resource or tooling gaps: Need shared contact directory.
- Sequencing notes: Align with incident response doc.
- Additional directives: Include table per vendor with detection, escalation, fallback, communication.
</docBlueprint>
### Upload Telemetry – `docs/playbook/observability/upload-telemetry.md`
<docBlueprint path="docs/playbook/observability/upload-telemetry.md" template="observability-playbook" owner="Reliability Engineer">
#### 1. Summary
- Purpose: Instrument upload lifecycle metrics, dashboards, and alerts supporting SLOs and webhook reliability.
- Audience: Reliability engineers, platform team, security reviewers.
- Outcome once delivered: Metrics for initiation, webhook success, DLQ depth, replay latency with dashboards and alerting.
- Owner: Reliability Engineer (Noah Hughes).
- Milestone: M5 – Security Testing & Analytics (2025-10-08).

#### 2. Context
- Problem statement: Limited visibility into upload pipeline; Codex and Claude reviews demand telemetry for resilience and compliance evidence.
- Background details: Upload state stored in Neon; webhooks processed by Vercel; Sentry logs events but lacks structured metrics.
- Constraints: Use existing Sentry and Vercel monitoring; avoid additional cost.
- Related work or precedents: Codex telemetry backlog, Claude monitoring controls.
- Key supporting links: Sentry metrics docs, Vercel Analytics, DLQ blueprint.

#### 3. Goals
- G1: Provide metrics covering upload initiation, webhook success, DLQ backlog, replay latency.
- G2: Deliver dashboards and alert thresholds aligned with SLO and incident docs.

#### 4. Non-goals
- Building new analytics platform; long-term anomaly detection beyond MVP.

#### 5. Scope
##### In scope
- Metric definitions, dashboards, alerts, data export for compliance.
##### Out of scope
- Client-side analytics; vendor SLA dashboards.
##### Boundaries and assumptions
- Assumption → Validation plan: Sentry supports required metrics; test via staging instrumentation.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Noah Hughes | Reliability Engineer | Implement telemetry, approve dashboards | Final sign-off | Slack |
| Liam Patel | Security Lead | Ensure security events captured | Review & approve | PagerDuty |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-UTM-01 | Emit metrics for upload initiation, completion, duration | P0 | Dashboard view |
| FR-UTM-02 | Track webhook success/failure counts and DLQ depth | P0 | Alert on threshold |
| FR-UTM-03 | Provide replay latency metric and alert | P0 | Linked to DLQ doc |
| FR-UTM-04 | Export telemetry sample for audit | P1 | Compliance evidence |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Reliability | Metrics available within 1 minute | Monitoring check | Reliability Engineer |
| Accuracy | Data matches Neon records within 2% | Reconciliation script | Platform Engineer |
| Security | Metrics exclude personal data | Compliance review | Compliance Officer |
| Observability | Dashboard uptime ≥99% | Monitoring | DevOps |

#### 8. Approach
- Preferred approach: Instrument metrics using Sentry counters and Neon queries; build dashboards; configure alerts.
- Alternatives considered: Custom dashboard app rejected; manual checks insufficient.
- Trade-offs: Engineering time vs visibility and compliance proof.

#### 9. Structure or design
- Overview: Metric emission points, dashboard layout, alert thresholds.
- Components or steps: Instrumentation code, Sentry dashboards, alert rules, export script.
- Diagram links: `docs/diagrams/upload-telemetry-flow.mmd`.

#### 10. Data
- Entities: UploadMetric, WebhookMetric, DLQMetric.
- Sources and owners: Application instrumentation, Sentry, Neon.
- Retention rules: Metrics stored 180 days; exports archived 1 year.
- Data quality checks: Weekly reconciliation; alert for missing metrics.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| Metric exporter | Outbound | App → Sentry | JSON metric payload | API key | Reliability Engineer |
| Audit export | Outbound | App → CSV | CSV schema | SSO | Compliance Officer |

#### 12. Security, privacy, compliance
- Data classification: Metrics = Internal; audit exports = Restricted.
- Threats and mitigations: Metric gaps mitigated via heartbeat alerts; privacy leaks mitigated by anonymisation.
- Controls mapped to standards: SOC2 CC7, GDPR Art.32 (monitoring), APP 11.
- Privacy/DPIA notes: Ensure no personal identifiers beyond hashed IDs.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Internal | DLQ doc | Shared metrics | Medium | Platform Engineer |
| Internal | SLO doc | Dashboard alignment | Medium | Reliability Engineer |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Metrics increase cost | Low | Medium | Sample rate tuning | Finance Ops | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Metric completeness | Required metrics emitting | Unknown | 100% | Dashboard | Weekly |
| Alert response | Time to acknowledge telemetry alert | N/A | <15 minutes | PagerDuty | Incident |

##### 15.2 Acceptance summary
- Definition of Done: Metrics instrumented, dashboards shared, alerts tuned, audit export available.
- Given a webhook fails, When metrics emit, Then DLQ depth increases, alerts trigger after 3 failures, and replay latency recorded.
- Given compliance requests telemetry proof, When export script runs, Then anonymised CSV delivered with timestamp and control mapping.

##### Compliance Acceptance
- Given SOC2 evidence gathering, When auditors request telemetry logs, Then exports demonstrate monitoring coverage for CC7 with retention proof.
- Given privacy review, When telemetry schema is inspected, Then no personal data beyond hashed IDs exists, satisfying GDPR Art.5 minimisation.

#### 16. Rollout and operations
- Environments and flags: Deploy instrumentation to staging first; enable production with `UPLOAD_TELEMETRY_ENABLED` flag.
- Runbooks and support: Include dashboard links, export instructions, troubleshooting steps.
- Observability expectations: Dashboards for upload duration, webhook success, DLQ depth.
- Alerts and on-call: Reliability team monitors Sentry alerts; escalate to Platform if thresholds breached.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Confirm metric storage retention in Sentry plan | Reliability Engineer | 2025-09-26 | Open |

#### 18. References
- Sentry metrics documentation.
- Codex telemetry backlog.
- Claude monitoring controls review.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Validate Sentry plan; design dashboard layout.
- Decision points and owners: Metric naming conventions (Reliability Engineer); export format (Compliance Officer).
- Resource or tooling gaps: Need Sentry metrics feature enabled.
- Sequencing notes: Coordinate with webhook doc for instrumentation points.
- Additional directives: Include metric catalogue table.
</docBlueprint>

### Share Token Management UI – `docs/playbook/product/share-token-management-ui.md`
<docBlueprint path="docs/playbook/product/share-token-management-ui.md" template="product-guide" owner="Product Lead">
#### 1. Summary
- Purpose: Deliver admin experience for viewing, revoking, and auditing share tokens with compliance hooks.
- Audience: Product designers, frontend engineers, support, compliance.
- Outcome once delivered: UI enables admins to list tokens, revoke instantly, view audit info, trigger erasure.
- Owner: Product Lead (Ava Chen).
- Milestone: M4 – Incident Readiness (2025-10-04).

#### 2. Context
- Problem statement: No UI for share governance; Codex and Claude require revocation visibility and compliance check.
- Background details: Share tokens stored in Neon; admin portal limited; compliance needs quick revocation.
- Constraints: Follow accessibility standards; integrate with signed playback doc; limit to internal admin roles.
- Related work or precedents: Signed playback doc, admin dashboard backlog, privacy requirements.
- Key supporting links: UI design system, Clerk admin docs, GDPR erasure guidelines.

#### 3. Goals
- G1: Allow authorised admins to search, view, and revoke share tokens with reason capture.
- G2: Provide audit view showing playback history, residency, and erasure status.

#### 4. Non-goals
- Exposing share management to end-users; mobile admin app.

#### 5. Scope
##### In scope
- Admin list/detail views, revoke action, audit event view, erasure trigger.
##### Out of scope
- Bulk CSV export; advanced analytics.
##### Boundaries and assumptions
- Assumption → Validation plan: Internal admins use Clerk roles; confirm with Security Lead before release.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Ava Chen | Product Lead | Approve UX, ensure alignment with product vision | Final sign-off | Weekly sync |
| Priya Rao | Compliance Officer | Validate audit info and erasure hooks | Required approval | compliance@motionmavericks.com |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-STM-01 | Display share tokens with status, expiry, owner | P0 | Data from Neon |
| FR-STM-02 | Provide revoke button with confirmation and reason capture | P0 | Ties to signed playback |
| FR-STM-03 | Show playback audit trail and residency flag per token | P0 | Links to audit logging |
| FR-STM-04 | Trigger erasure workflow and display completion state | P1 | Integration with compliance doc |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Accessibility | WCAG AA compliance | Accessibility audit | Product Lead |
| Security | Admin-only access enforced via Clerk roles | Access test | Security Lead |
| Performance | List view loads <500ms for 100 tokens | Performance test | Frontend Engineer |
| Privacy | Audit view avoids exposing viewer PII | Compliance review | Compliance Officer |

#### 8. Approach
- Preferred approach: Build admin Next.js route, integrate Clerk roles, fetch data from Neon, display audit info.
- Alternatives considered: CLI-only revocation rejected; manual DB updates unacceptable.
- Trade-offs: Additional UI work vs faster incident response and compliance evidence.

#### 9. Structure or design
- Overview: Admin navigation, token table, detail drawer with actions.
- Components or steps: Token table component, revoke modal, audit panel, erasure trigger.
- Diagram links: `docs/diagrams/share-token-ui-flow.mmd`.

#### 10. Data
- Entities: ShareToken, PlaybackAudit, ErasureRequest.
- Sources and owners: Neon, audit logs, erasure workflow.
- Retention rules: UI respects data retention (only active + 30-day historical tokens).
- Data quality checks: UI tests verifying data accuracy; nightly job checks for stale tokens.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| Admin API `/api/admin/share-tokens` | Inbound | Admin UI → API | JSON list | Clerk admin auth | Backend Engineer |
| Erasure trigger API | Outbound | Admin UI → Compliance | JSON payload | Service key | Compliance Officer |

#### 12. Security, privacy, compliance
- Data classification: Admin data = Sensitive.
- Threats and mitigations: Unauthorised access mitigated via role-based access; audit info misuse mitigated via redaction; revocation race conditions mitigated via backend enforcement.
- Controls mapped to standards: GDPR Art.17, APP 12, SOC2 CC6.
- Privacy/DPIA notes: Display minimal PII; reference privacy notice for viewer messaging.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Internal | Signed playback doc | Ensure revoke integration | High | Security Tech Writer |
| Internal | Compliance doc | Provide erasure status | Medium | Compliance Officer |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Admin misuses revoke | Low | Medium | Audit log reason, dual approval for bulk actions | Product Lead | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Time to revoke token | From admin action to playback block | Unknown | ≤5 minutes | Audit log | Weekly |
| Admin adoption | % revokes via UI | N/A | >90% | UI analytics | Monthly |

##### 15.2 Acceptance summary
- Definition of Done: UI accessible to admins, revocation/erasure integrated, audit view validated, accessibility review passed.
- Given an admin revokes a token, When the UI sends request, Then playback is blocked within 5 minutes and audit entry recorded with reason.
- Given compliance needs audit info, When admin views token detail, Then residency and erasure status display accurately.

##### Compliance Acceptance
- Given GDPR erasure requests, When admins use the erasure button, Then the workflow runs and completion status appears within 30 days, logged for compliance review.
- Given quarterly access review, When security inspects admin activity, Then logs show role-based access enforcement satisfying SOC2 CC6.

#### 16. Rollout and operations
- Environments and flags: Deploy behind `ADMIN_SHARE_UI_ENABLED` flag; enable staging first for testing.
- Runbooks and support: Provide admin training guide; include rollback instructions.
- Observability expectations: UI analytics for admin actions; error alert channel.
- Alerts and on-call: Notify Security and Compliance if revocation failures occur.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Decide on admin audit export format | Product Lead | 2025-09-27 | Open |

#### 18. References
- Design system guidelines.
- Signed playback doc.
- Claude share token security recommendations.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Create wireframes; confirm API contract.
- Decision points and owners: Access role mapping (Security Lead); reason taxonomy (Compliance Officer).
- Resource or tooling gaps: Need UX time for accessibility review.
- Sequencing notes: Follow signed playback doc to align behaviours.
- Additional directives: Provide screenshot placeholders; include accessibility checklist.
</docBlueprint>

### Cookie Consent and Privacy Notice – `docs/playbook/compliance/cookie-consent-and-privacy-notice.md`
<docBlueprint path="docs/playbook/compliance/cookie-consent-and-privacy-notice.md" template="compliance-framework" owner="Product Lead">
#### 1. Summary
- Purpose: Deliver compliant consent banner, privacy notice, and audit trail for GDPR and Australian Privacy Act.
- Audience: Product, legal, compliance, frontend engineers.
- Outcome once delivered: Consent experiences localised for AU/EU, logs stored, notices approved by Legal.
- Owner: Product Lead with Compliance Officer co-approval.
- Milestone: M2 – Compliance Controls (2025-09-27).

#### 2. Context
- Problem statement: No consent mechanism; Claude emphasised regulatory exposure.
- Background details: Using Clerk, Vercel; minimal analytics planned; privacy notice draft incomplete.
- Constraints: Provide multi-region copy; accessible UI; integrate with analytics toggles.
- Related work or precedents: Claude privacy notice blueprint, OAIC guidance.
- Key supporting links: GDPR Articles 5/7/13, APP 1/5, existing marketing copy.

#### 3. Goals
- G1: Implement consent banner with opt-in/out per region and store consent logs.
- G2: Publish privacy notice detailing data handling, lawful basis, contact info.

#### 4. Non-goals
- Implementing consent for third-party marketing trackers (future scope).

#### 5. Scope
##### In scope
- Banner UX, consent storage, privacy notice copy, audit logs, withdrawal workflow.
##### Out of scope
- Mobile native app consent; offline consent collection.
##### Boundaries and assumptions
- Assumption → Validation plan: Consent state stored in Clerk metadata; verify before launch.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Ava Chen | Product Lead | UX, content coordination | Final product approval | Weekly sync |
| Priya Rao | Compliance Officer | Legal validation, audit logs | Mandatory sign-off | compliance@motionmavericks.com |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-CCP-01 | Display region-aware consent banner on first visit | P0 | Geo logic verified |
| FR-CCP-02 | Store consent state with timestamp and region | P0 | Audit log entries |
| FR-CCP-03 | Allow withdrawal and update analytics toggles instantly | P0 | Triggers minimal analytics doc |
| FR-CCP-04 | Publish privacy notice with AU/EU sections | P0 | Legal approved |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Accessibility | Banner keyboard navigable | Accessibility test | Product Lead |
| Privacy | Consent logs retained 2 years | Audit check | Compliance Officer |
| Performance | Banner loads without blocking main thread | Lighthouse test | Frontend Engineer |
| Localisation | Copy delivered in en-AU and en-EU | Content review | Product Lead |

#### 8. Approach
- Preferred approach: Use client-side consent manager tied to Clerk metadata; store logs in Neon; update analytics toggles.
- Alternatives considered: Cookie-less consent (insufficient); server-only storage (hard to audit).
- Trade-offs: Additional UI vs compliance and trust.

#### 9. Structure or design
- Overview: Banner controls, preference centre, privacy notice sections.
- Components or steps: Banner component, consent API, notice page, audit log.
- Diagram links: `docs/diagrams/consent-flow.mmd`.

#### 10. Data
- Entities: ConsentRecord, PrivacyNoticeVersion.
- Sources and owners: Clerk metadata, Neon logs, Git repo for notice.
- Retention rules: Consent logs 2 years; notice versions retained indefinitely.
- Data quality checks: Monthly consent log sample; update check when notice changes.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| Consent API | Inbound | Frontend → API | JSON {status, region, timestamp} | Clerk auth | Frontend Engineer |
| Consent export | Outbound | API → Compliance | CSV | SSO | Compliance Officer |

#### 12. Security, privacy, compliance
- Data classification: Consent logs = Sensitive.
- Threats and mitigations: Mis-logged consent mitigated via validation; stale copy mitigated via versioning; privacy risk mitigated via minimised data.
- Controls mapped to standards: GDPR Art.5/7/13, APP 1/5, ISO 27001 A.18.
- Privacy/DPIA notes: Document DPIA outcomes, mention contact for DPO.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Internal | Minimal analytics doc | Toggle integration | High | Product Lead |
| Internal | Data residency doc | Lawful basis alignment | Medium | Compliance Officer |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Region detection inaccurate | Medium | High | Manual override, fallback to opt-in | Product Lead | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Consent opt-in rate | % of users accepting | Unknown | >70% (AU), >60% (EU) | Analytics | Monthly |
| Withdrawal response time | Time to apply preference change | N/A | <5 seconds | Monitoring | Monthly |

##### 15.2 Acceptance summary
- Definition of Done: Banner deployed, consent stored, notice published, withdrawal tested, logs accessible.
- Given a new EU visitor arrives, When the banner displays, Then it offers opt-in/out, stores response with region, and updates analytics toggles.
- Given a user withdraws consent, When they submit preference, Then analytics tracking stops immediately and log entry created.

##### Compliance Acceptance
- Given GDPR and APP audits, When auditors request consent logs, Then exports provide timestamp, region, and notice version with sign-offs.
- Given privacy notice updates, When Legal publishes new version, Then banner references updated notice within 24 hours, recorded in change log.

#### 16. Rollout and operations
- Environments and flags: Deploy to staging with `CONSENT_BANNER_ENABLED`; monitor opt-in metrics before production full release.
- Runbooks and support: Provide issue troubleshooting; instructions for manual overrides.
- Observability expectations: Dashboard for opt-in/out counts; alert on log failures.
- Alerts and on-call: Compliance receives notifications if consent logging fails.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Finalise copy translations | Product Lead | 2025-09-22 | Open |

#### 18. References
- Claude privacy notice review.
- GDPR/APP guidance.
- Existing marketing copy deck.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Source translation resources; confirm Clerk metadata limits.
- Decision points and owners: Banner design (Ava Chen); audit storage location (Compliance Officer).
- Resource or tooling gaps: Need translation support.
- Sequencing notes: Coordinate with minimal analytics doc.
- Additional directives: Provide sample copy for AU/EU; include consent log schema.
</docBlueprint>

### Minimal Analytics Instrumentation – `docs/playbook/analytics/minimal-analytics-instrumentation.md`
<docBlueprint path="docs/playbook/analytics/minimal-analytics-instrumentation.md" template="analytics-guide" owner="Product Lead">
#### 1. Summary
- Purpose: Define privacy-preserving analytics capturing essential engagement events with consent-aware toggles.
- Audience: Product team, analytics implementers, compliance.
- Outcome once delivered: Event schema limited to MVP needs, consent gating integrated, data minimised.
- Owner: Product Lead (Ava Chen) with Compliance oversight.
- Milestone: M5 – Security Testing & Analytics (2025-10-08).

#### 2. Context
- Problem statement: No analytics plan; need minimal instrumentation respecting consent and privacy obligations.
- Background details: Consent banner upcoming; analytics required for signup, upload, share usage.
- Constraints: No third-party trackers beyond approved tools; comply with GDPR minimisation.
- Related work or precedents: Claude analytics guidance, existing marketing metrics.
- Key supporting links: Consent doc, data residency framework, analytics SDK docs.

#### 3. Goals
- G1: Capture minimal event set (signup, upload, share usage) with metadata respecting consent.
- G2: Provide aggregation and reporting aligned to cost monitoring and product KPIs.

#### 4. Non-goals
- Behavioural profiling; cross-device tracking; advanced attribution.

#### 5. Scope
##### In scope
- Event schema, consent integration, reporting cadence, data retention, anonymisation strategy.
##### Out of scope
- Third-party marketing tools; long-term product analytics roadmap.
##### Boundaries and assumptions
- Assumption → Validation plan: Consent doc toggles available; verify integration before release.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Ava Chen | Product Lead | Approve event schema, ensure product value | Final sign-off | Weekly sync |
| Priya Rao | Compliance Officer | Validate minimisation and retention | Required approval | compliance@motionmavericks.com |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-MAI-01 | Define event schema with minimal fields for signup/upload/share | P0 | Schema table |
| FR-MAI-02 | Integrate consent gating to disable tracking when declined | P0 | Linked to consent doc |
| FR-MAI-03 | Provide weekly analytics report for product team | P1 | Template stored |
| FR-MAI-04 | Enable data deletion aligned with retention policy | P0 | Compliance integration |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Privacy | Only anonymised IDs stored | Compliance review | Compliance Officer |
| Security | Analytics data stored in AU region | Deployment check | DevOps |
| Performance | Tracking adds <5ms to page load | Lighthouse test | Frontend Engineer |
| Accuracy | Event loss <2% | Reconciliation | Product Analyst |

#### 8. Approach
- Preferred approach: Use internal analytics module writing to Neon with anonymised IDs; integrate consent check; produce weekly summary.
- Alternatives considered: Third-party analytics rejected due to privacy risk.
- Trade-offs: Development time vs compliance and trust.

#### 9. Structure or design
- Overview: Event collector, consent gate, storage, reporting.
- Components or steps: Client hook, server collector, anonymiser, report job.
- Diagram links: `docs/diagrams/minimal-analytics-flow.mmd`.

#### 10. Data
- Entities: AnalyticsEvent, ConsentState, ReportSnapshot.
- Sources and owners: Frontend events, consent API, reporting job.
- Retention rules: Events retained 90 days; aggregated reports 1 year.
- Data quality checks: Weekly reconciliation; automated alert on event loss.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| Event collector API | Inbound | Client → Server | JSON {eventType, anonymisedId, timestamp} | Session token | Backend Engineer |
| Reporting job | Outbound | Server → CSV | CSV schema | Service account | Product Lead |

#### 12. Security, privacy, compliance
- Data classification: Analytics events = Internal (subject to minimisation).
- Threats and mitigations: Re-identification mitigated via hashing; data leak mitigated via access controls; consent bypass mitigated via gating.
- Controls mapped to standards: GDPR Art.5, APP 1/6, SOC2 CC6.
- Privacy/DPIA notes: Document rationale for each field; note data subject rights.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Internal | Consent doc | Toggling | High | Product Lead |
| Internal | Data residency doc | Retention alignment | Medium | Compliance Officer |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Over-collection of data | Low | High | Compliance review, schema approvals | Compliance Officer | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Event coverage | % key flows captured | Unknown | 100% for signup/upload/share | Analytics report | Weekly |
| Consent adherence | % events gated when consent denied | N/A | 100% | Automated test | Weekly |

##### 15.2 Acceptance summary
- Definition of Done: Event schema approved, consent gating validated, anonymisation implemented, reporting job live.
- Given a user declines consent, When they interact with upload flow, Then no analytics events are recorded and check logs confirm suppression.
- Given weekly report runs, When Product reviews results, Then metrics exclude personal data and align with cost dashboards.

##### Compliance Acceptance
- Given GDPR audit, When analytics data is inspected, Then events show anonymised IDs, 90-day retention, and consent gating evidence per Art.5.
- Given APP compliance review, When reports are audited, Then they demonstrate data minimisation and user rights references.

#### 16. Rollout and operations
- Environments and flags: Enable in staging first; production behind `MINIMAL_ANALYTICS_ENABLED` flag.
- Runbooks and support: Provide troubleshooting for missing events; manual deletion procedure.
- Observability expectations: Monitor event ingestion rate and suppression metrics.
- Alerts and on-call: Product analytics owner monitors ingestion alerts; escalate to Compliance for data issues.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Decide anonymisation hashing algorithm | Security Lead | 2025-09-26 | Open |

#### 18. References
- Claude analytics review.
- GDPR/APP minimisation guidance.
- Internal KPI definitions.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Confirm storage schema; align with consent doc.
- Decision points and owners: Event naming (Product Lead); anonymisation technique (Security Lead).
- Resource or tooling gaps: Need analytics engineer capacity.
- Sequencing notes: Publish after consent doc to reuse toggles.
- Additional directives: Provide event tables and example payloads.
</docBlueprint>

### E2E Critical Journeys – `docs/playbook/testing/e2e-critical-journeys.md`
<docBlueprint path="docs/playbook/testing/e2e-critical-journeys.md" template="testing-playbook" owner="QA Lead">
#### 1. Summary
- Purpose: Expand Playwright coverage for critical flows, integrating security and compliance validation steps.
- Audience: QA engineers, developers, security reviewers.
- Outcome once delivered: Automated suites covering upload, playback, consent, rate limiting, erasure workflows.
- Owner: QA Lead (Marco Silva).
- Milestone: M5 – Security Testing & Analytics (2025-10-08).

#### 2. Context
- Problem statement: Existing tests limited; Codex and Claude require verification of security/compliance scenarios.
- Background details: Playwright used for regression; no coverage for signed playback or consent flows.
- Constraints: Tests run in CI; use staging environment; ensure deterministic results.
- Related work or precedents: Codex testing backlog, Claude compliance acceptance tests.
- Key supporting links: Playwright suite repo, security docs, compliance scripts.

#### 3. Goals
- G1: Automate P0 flows (upload, playback, revoke, rate limit, erasure, consent) with Gherkin-derived steps.
- G2: Integrate suites into CI gating with evidence attachments.

#### 4. Non-goals
- Performance load testing; mobile automation; third-party device testing.

#### 5. Scope
##### In scope
- Playwright specs, fixtures, CI integration, reporting, staging data seeding.
##### Out of scope
- Manual exploratory scripts; non-MVP features.
##### Boundaries and assumptions
- Assumption → Validation plan: Staging environment mirrors production; confirm before automation.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Marco Silva | QA Lead | Owns automation plan | Final sign-off | Bi-weekly |
| Liam Patel | Security Lead | Review security test coverage | Approval for security scenarios | PagerDuty |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-E2E-01 | Implement Playwright tests for upload→webhook→share flow | P0 | Links to webhook doc |
| FR-E2E-02 | Automate signed playback positive/negative cases | P0 | Gherkin derived |
| FR-E2E-03 | Test rate limiting thresholds and override flow | P0 | Coordinates with rate limiting doc |
| FR-E2E-04 | Validate consent banner and analytics suppression | P0 | Relies on consent doc |
| FR-E2E-05 | Automate erasure workflow test verifying deletion | P1 | Links to compliance doc |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Reliability | CI run success ≥95% | CI stats | QA Lead |
| Runtime | Suite completes ≤15 minutes | CI logs | QA Lead |
| Observability | Test results stored with screenshots | CI artifacts | QA Lead |
| Security | Secrets handled via env vars | Secret scan | Security Lead |

#### 8. Approach
- Preferred approach: Implement Playwright specs using shared fixtures, align with Gherkin scenarios from docs, integrate into CI pipeline.
- Alternatives considered: Manual testing rejected; Cypress not used due to existing Playwright investment.
- Trade-offs: Longer CI vs confidence and compliance evidence.

#### 9. Structure or design
- Overview: Feature-based spec organisation, fixtures for auth and data seeding, reporting.
- Components or steps: Setup, tests, teardown, reporting to S3 or GitHub artifacts.
- Diagram links: `docs/diagrams/e2e-test-flow.mmd`.

#### 10. Data
- Entities: TestUser, TestShareToken, TestUpload.
- Sources and owners: Staging environment; QA-managed fixtures.
- Retention rules: Test data cleaned after run; logs retained 90 days.
- Data quality checks: Daily run verifying fixture integrity.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| CI pipeline | Inbound | GitHub Actions → Tests | YAML config | GitHub token | QA Lead |
| Test reports | Outbound | Tests → Artifacts | HTML/JSON | CI auth | QA Lead |

#### 12. Security, privacy, compliance
- Data classification: Test data = Internal; logs = Sensitive.
- Threats and mitigations: Leakage of secrets mitigated via env vars; flaky tests mitigated via retry policy; compliance drift mitigated via scenario alignment.
- Controls mapped to standards: SOC2 CC7, GDPR Art.32 (testing security), APP 11.
- Privacy/DPIA notes: Use synthetic data; avoid real user info.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Internal | All other docs | Provide Gherkin scenarios | High | Programme Office |
| Infrastructure | Staging environment stability | Test reliability | High | DevOps |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Flaky tests delay releases | Medium | Medium | Implement retries, monitor reliability | QA Lead | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Test coverage | % critical flows automated | Unknown | 100% P0 flows | CI report | Weekly |
| Flake rate | % runs requiring rerun | N/A | <3% | CI logs | Weekly |

##### 15.2 Acceptance summary
- Definition of Done: Suites covering P0 flows merged, CI gating enforced, artifacts stored with compliance references.
- Given signed playback negative scenario, When invalid token used, Then test asserts 403 response and audit log entry exists.
- Given consent banned scenario, When test toggles off consent, Then analytics events not recorded and evidence captured.

##### Compliance Acceptance
- Given compliance audit, When automation evidence requested, Then Playwright reports include scenarios referencing GDPR Art.17 erasure test and APP 11 consent flows.
- Given security review, When tests are inspected, Then scenarios cover webhook signature failures and rate limiting abuse consistent with SOC2 CC7.

#### 16. Rollout and operations
- Environments and flags: Run nightly on staging; gating on main branch merges; monitor via `E2E_SUITE_VERSION`.
- Runbooks and support: Provide troubleshooting guide; escalation path to QA Lead.
- Observability expectations: CI dashboards for pass/fail; Slack alerts on failures.
- Alerts and on-call: QA Lead receives alerts; escalate to relevant owners for domain-specific failures.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| Confirm CI parallelism budget | QA Lead | 2025-09-23 | Open |

#### 18. References
- Playwright documentation.
- Gherkin scenarios from each doc.
- Security and compliance reviews.

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Blueprint merged into integrated brief | Programme Office | This brief |

#### 20. Implementation considerations
- Remaining work before drafting: Gather existing test fixtures; align with domain docs.
- Decision points and owners: Test data seeding (QA Lead); artifact retention policy (Compliance Officer).
- Resource or tooling gaps: Need CI minutes allocation.
- Sequencing notes: Final doc after other playbooks to incorporate scenarios.
- Additional directives: Provide mapping of tests to requirements; include retry strategy.
</docBlueprint>
    </content>
    </section>

    <section id="automation_tags" heading="Automation tags (optional)">
      <content><![CDATA[
## 19. Automation tags (optional)
<workPackage id="WP-SPS" title="Signed Playback and Sharing" priority="P0">
  <task id="DOC-SPS" type="doc" targetPath="docs/playbook/security/signed-playback-and-sharing.md" template="security-control"/>
  <dependency ref="DOC-RLA"/>
</workPackage>
<workPackage id="WP-MUX" title="Mux Upload Reliability" priority="P0">
  <task id="DOC-MUX" type="doc" targetPath="docs/playbook/platform/mux-upload-and-webhook-reliability.md" template="operational-runbook"/>
  <dependency ref="DOC-UTM"/>
</workPackage>
<workPackage id="WP-COMPLIANCE" title="Residency & Consent" priority="P0">
  <task id="DOC-DRR" type="doc" targetPath="docs/playbook/compliance/data-residency-and-retention.md" template="compliance-framework"/>
  <task id="DOC-CCP" type="doc" targetPath="docs/playbook/compliance/cookie-consent-and-privacy-notice.md" template="compliance-framework"/>
  <dependency ref="DOC-MAI"/>
</workPackage>
]]></content>
    </section>

  </sections>
</doc>
