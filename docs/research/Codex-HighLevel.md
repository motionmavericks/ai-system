---
title: "Motion Mavericks MVP – Codex Agent Execution Brief"
doc_path: "docs/research/Codex-HighLevel.md"
doc_type: "agent_requirements"
status: "draft"
version: "0.1.0"
owner: "Codex (GPT-5)"
reviewers: ["Motion Mavericks Product Lead", "Security Lead", "Compliance Officer"]
last_updated: "2025-09-17"
project: "Motion Mavericks MVP Portal"
module: "core"
tags: [security, compliance, reliability, cost]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "docs/research/00-high-level-overview.md"
pii: false
security_review_required: true
compliance_scope: [AU_Privacy, GDPR, SOC2]
---

# Motion Mavericks MVP – Codex Agent Execution Brief

> Status: **draft** • Version: **0.1.0** • Updated: **2025-09-17**

<doc xmlns="urn:docs:agent-execution"
     type="agent_requirements"
     path="docs/research/Codex-HighLevel.md"
     version="0.1.0"
     status="draft"
     owner="Codex (GPT-5)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="docs/research/00-high-level-overview.md"/>
    <tags>security, compliance, reliability, cost</tags>
  </meta>

  <sections>

    <section id="objective" heading="Objective and success definition">
      <content><![CDATA[
## 1. Objective and success definition
- Problem this brief solves: The Rev B execution plan does not close critical gaps raised by Codex, Qwen, Gemini, and Claude reviews—namely video confidentiality, webhook resilience, residency compliance, API abuse prevention, third-party audits, SLO ownership, and cost guardrails.
- Desired outcomes once documentation is generated: Authoritative playbooks exist for signed playback enforcement, resilient upload/webhook processing, compliant data lifecycle management, rate limiting, audit logging plus vendor review, SLO-driven incident response, and budget monitoring.
- Success metrics for the Agentis coding agent:
  - 100% of P0 deliverables drafted and approved by Security and Compliance leads before 2025-09-29.
  - Staging validation demonstrates signed playback expiry ≤15 minutes, webhook retries prevent orphan assets, and rate limits trigger 429s after threshold.
  - Security review reports zero open P0 findings tied to these domains.
]]></content>
    </section>

    <section id="doc_inventory" heading="Documentation inventory">
      <content><![CDATA[
## 2. Documentation inventory
| Relative path | Purpose | Priority (P0/P1/P2) | Notes |
|---------------|---------|---------------------|-------|
| docs/playbook/security/signed-playback-and-sharing.md | Enforce Mux signed playback, token TTL, revocation, audit trail | P0 | Closes Codex REC-001, Qwen REC-001, Gemini REC-001 |
| docs/playbook/platform/mux-upload-and-webhook-reliability.md | Persist upload IDs, mandate signature validation, add retries/DLQ | P0 | Closes Codex REC-002, Gemini REC-002/003, Claude REC-006 |
| docs/playbook/compliance/data-residency-and-retention.md | Define AU-first residency, retention schedules, erasure workflows | P0 | Closes Codex REC-003, Qwen REC-002, Claude REC-001 |
| docs/playbook/security/rate-limiting-and-abuse-controls.md | Specify throttling, anomaly detection, synthetic monitoring | P0 | Implements Claude REC-002 |
| docs/playbook/security/audit-logging-and-vendor-review.md | Establish audit logging schema and quarterly vendor security audits | P0 | Implements Claude REC-005, Qwen REC-003 |
| docs/playbook/operations/slo-and-incident-response.md | Document SLO targets, error budgets, incident lifecycle | P0 | Implements Claude REC-003 and Codex REC-005 |
| docs/playbook/cost/cost-monitoring-and-alerting.md | Define spend KPIs, alert thresholds, escalation owners | P0 | Implements Claude REC-004 |
| docs/playbook/operations/vendor-outage-runbooks.md | Vendor-specific outage escalation and fallback | P1 | Complements Codex REC-005 |
| docs/playbook/observability/upload-telemetry.md | Instrument metrics, alerts, dashboards for upload lifecycle | P1 | Implements Codex REC-006, Qwen REC-006 |
| docs/playbook/product/share-token-management-ui.md | Admin UX for viewing and revoking share tokens | P1 | Expands Codex REC-004 |
| docs/playbook/compliance/cookie-consent-and-privacy-notice.md | AU/GDPR compliant consent banner and privacy copy | P1 | Implements Gemini REC-004 |
| docs/playbook/analytics/minimal-analytics-instrumentation.md | Lightweight analytics for signup/upload/share events | P1 | Implements Gemini REC-007 |
| docs/playbook/testing/e2e-critical-journeys.md | Expand Playwright coverage for critical flows | P2 | Implements Qwen REC-005 |
]]></content>
    </section>

    <section id="source_materials" heading="Source materials and truth set">
      <content><![CDATA[
## 3. Source materials and truth set
- Primary references: docs/research/00-high-level-overview.md, Mux API docs, Clerk security/audit docs, Neon regional deployment guidance, Vercel KV + Edge middleware docs, OAIC privacy principles, GDPR Article 32, vendor billing portals.
- SME contacts and availability: Product Lead (Slack #product-mvp, 48h), Security Lead (PagerDuty on-call, 24h), Compliance Officer (Wednesdays 10:00 AEST, 48h), Reliability Engineer (Slack #platform, 48h), Finance Ops Partner (finance@motionmavs.com, 72h).
- Data repositories or dashboards: Sentry project for MVP, vendor billing dashboards, GitHub Projects board “Motion Mavericks / MVP Docs”.
- Validation approach for conflicting information: Prioritise statutory requirements, validate vendor behaviours in staging, record final decisions in doc change logs and update this brief.
]]></content>
    </section>

    <section id="style_guidance" heading="Style and formatting directives">
      <content><![CDATA[
## 4. Style and formatting directives
- Language and tone: Directive, implementation-ready, use MUST/SHOULD for obligations.
- Terminology: Maintain canonical vocabulary (“share token”, “signed playback token”, “upload job”, “error budget”). Add glossary entries where missing.
- Citation and linking rules: Inline hyperlinks to vendor docs/legal sources; provide short reference lists where legal guidance cited.
- Diagram expectations: Provide Mermaid diagrams for upload flow, rate limiting architecture, incident response swimlanes.
- Accessibility/localisation: Ensure diagrams meet WCAG 2.1 AA contrast; when quoting UI copy, include AU English and flag US/EU variants if legally distinct.
]]></content>
    </section>

    <section id="structure_alignment" heading="Template alignment">
      <content><![CDATA[
## 5. Template alignment
| Target doc | Base template | Additional sections | Deviations or notes |
|------------|---------------|---------------------|---------------------|
| signed-playback-and-sharing.md | security-control | Revocation workflow checklist | Include tested code appendix |
| mux-upload-and-webhook-reliability.md | operational-runbook | Dead-letter triage SOP | Include webhook payload schema |
| data-residency-and-retention.md | compliance-brief | Residency decision matrix | Provide DPIA summary |
| rate-limiting-and-abuse-controls.md | security-control | Synthetic monitoring plan | Outline phased rollout |
| audit-logging-and-vendor-review.md | security-control | Audit schedule + retention | Add tamper detection guidance |
| slo-and-incident-response.md | operational-runbook | Error budget policy | Link to PagerDuty configs |
| cost-monitoring-and-alerting.md | operational-runbook | Budget guardrails | Include monthly review checklist |
| vendor-outage-runbooks.md | operational-runbook | Vendor contact matrix | Provide fallback decision tree |
| upload-telemetry.md | observability-guide | Alert catalogue | Map to SLO error budgets |
| share-token-management-ui.md | product-brief | Accessibility acceptance criteria | Include wireframe checklist |
| cookie-consent-and-privacy-notice.md | compliance-brief | Jurisdiction delta appendix | Provide approved legal copy |
| minimal-analytics-instrumentation.md | product-brief | Event taxonomy | Note consent handling |
| e2e-critical-journeys.md | operational-runbook | Coverage gate table | Include CI integration steps |
]]></content>
    </section>

    <section id="naming_scope" heading="File naming and scope rules">
      <content><![CDATA[
## 6. File naming and scope rules
- Naming conventions: Lowercase kebab-case filenames grouped by domain directory.
- Folder placement: Use `docs/playbook/<domain>/`; introduce subfolders only when domain has ≥2 related docs.
- Module/tag usage: Apply tags from {security, compliance, reliability, cost, analytics}; align with this brief’s tags for discoverability.
- Scope boundaries: Cover MVP-era web portal, APIs, storage, and operational tooling; exclude future premium features (e.g., AI editing) unless they affect compliance baseline.
]]></content>
    </section>

    <section id="context" heading="Business and technical context">
      <content><![CDATA[
## 7. Business and technical context
- Domain overview: Portal enabling coaches to upload and share training videos with controlled access.
- Core systems: Next.js App Router, Clerk, Neon Postgres (Sydney), Drizzle ORM, Vercel Blob, Mux streaming, Resend email, Vercel KV/Cron, Sentry.
- Personas: Creator (needs confidential sharing, revocation ≤15 minutes, cost visibility); Viewer (expects frictionless playback, predictable expiry); Operations/Security (needs audit trails, SLO reporting, incident playbooks).
- Constraints: AU residency preference, GDPR compliance, SOC2-ready controls, SLA 99.9% playback availability, deletion requests processed ≤24 hours.
]]></content>
    </section>

    <section id="stakeholders" heading="Stakeholders and decision-makers">
      <content><![CDATA[
## 8. Stakeholders and decision-makers
| Name | Role | Responsibility | Decision authority | Contact cadence |
|------|------|----------------|--------------------|-----------------|
| Ava Chen | Product Lead | Feature prioritisation, UX approvals | Approves product docs & rate limit UX | Weekly sync |
| Liam Patel | Security Lead | Security controls, audit logging, signed playback | Final sign-off on security docs | PagerDuty + weekly |
| Priya Rao | Compliance Officer | Residency, retention, consent language | Must approve compliance docs | Weekly office hour |
| Noah Hughes | Reliability Engineer | SLOs, webhook resilience, telemetry | Approves reliability playbooks | Slack 48h |
| Elise Morgan | Finance Ops Partner | Cost guardrails & alerting | Approves cost monitoring doc | Async 72h |
| Marco Silva | QA Lead | E2E coverage plan, validation scripts | Approves testing doc | Bi-weekly |
]]></content>
    </section>

    <section id="constraints" heading="Operational constraints">
      <content><![CDATA[
## 9. Operational constraints
- Technical limitations: Current implementation lacks signed playback, webhook DLQ, and structured logging; must design without assuming new infra beyond Vercel KV/Blob.
- Resource/tooling constraints: SMEs available ≤2h/week; rely on existing staging environment and GitHub workflows.
- Security/privacy considerations: No production credentials in docs; sample payloads must be redacted.
- Time/sequencing constraints: Security review on 2025-10-15 requires P0 docs approved by 2025-09-29.
]]></content>
    </section>

    <section id="access" heading="Access and tooling requirements">
      <content><![CDATA[
## 10. Access and tooling requirements
- Required credentials: Staging Clerk project keys, Neon staging DB (read-only), Mux sandbox tokens, Vercel project with KV access; request via DevOps JIRA ticket DO-ACCESS within 48h.
- Tooling/scripts: GitHub Codespace optional, Mermaid CLI for diagrams, webhook replay harness (to be built in WP-02), cost export script (Finance provides CSV template).
- Audit/logging requirements: Track access requests in Access Tracker spreadsheet; log webhook replay runs in Sentry for audit trail.
- Support contacts: DevOps Manager for infrastructure, Security Lead for secrets handling, Finance Ops for billing exports.
]]></content>
    </section>

    <section id="data_sensitivity" heading="Data sensitivity and compliance">
      <content><![CDATA[
## 11. Data sensitivity and compliance
- Data classification: Uploaded videos = Confidential; share tokens = Sensitive; audit logs = Restricted.
- Handling rules: Store examples using synthetic data; anonymise user identifiers; never embed live playback IDs.
- Compliance frameworks: AU Privacy, GDPR (Articles 6, 17, 32), SOC2 CC2 & CC6 controls guide requirements.
- Incident escalation: Raise via #security-incidents Slack and PagerDuty security rota within 15 minutes of discovery.
]]></content>
    </section>

    <section id="deliverable_acceptance" heading="Deliverable acceptance criteria">
      <content><![CDATA[
## 12. Deliverable acceptance criteria
- Narrative: Each playbook starts with executive summary, includes decision log referencing agent recommendations, and concludes with validation checklist.
- Validation: Provide staging test scripts (e.g., signed playback expiry, webhook replay) and automated lint output (Markdown lint + link verifier).
- Review workflow: Draft → SME review (owner + Security/Compliance as applicable) → Final approval logged in GitHub project → Update change log.
- Sign-off authorities: Security Lead (security docs), Compliance Officer (compliance docs), Reliability Engineer (operations docs), Finance Ops Partner (cost doc), Product Lead (product docs).
]]></content>
    </section>

    <section id="timeline" heading="Timeline and sequencing">
      <content><![CDATA[
## 13. Timeline and sequencing
| Milestone | Description | Target date | Dependencies | Owner |
|-----------|-------------|-------------|--------------|-------|
| M1 | Draft signed playback & webhook docs | 2025-09-22 | Access to staging + Mux tokens | Security Tech Writer & Platform Engineer |
| M2 | Compliance, rate limiting, audit logging docs ready for review | 2025-09-27 | M1 complete | Compliance Analyst & Backend Engineer |
| M3 | P0 approvals completed | 2025-09-29 | M2 approvals | Security Lead & Compliance Officer |
| M4 | P1 docs (outage, telemetry, consent, analytics, UI) merged | 2025-10-04 | M3 | Cross-functional squad |
| M5 | E2E coverage plan finalised | 2025-10-08 | M4 | QA Lead |
]]></content>
    </section>

    <section id="risks" heading="Risks and mitigations">
      <content><![CDATA[
## 14. Risks and mitigations
| ID | Risk | Trigger | Impact | Mitigation | Owner | Status |
|----|------|---------|--------|------------|-------|--------|
| R1 | Compliance approvals delayed | Compliance Officer backlog | High | Provide executive summaries + early redlines | Compliance Analyst | Open |
| R2 | Webhook behaviour undocumented | Stage payloads differ from prod | High | Build replay harness, capture payload samples | Platform Engineer | Open |
| R3 | Rate limits frustrate legitimate users | Threshold too low | Medium | Pilot with soft monitoring, adjust thresholds weekly | Backend Engineer | Open |
| R4 | Audit logging inflates costs | Storage usage spikes | Medium | Include retention tiers and compression guidance | Security Architect | Open |
| R5 | Analytics blocked by consent dependencies | Consent banner not implemented | Medium | Pair consent & analytics docs for joint review | Product Lead | Open |
]]></content>
    </section>

    <section id="change_management" heading="Change management and versioning">
      <content><![CDATA[
## 15. Change management and versioning
- Request intake: Use GitHub issues tagged `doc-update` with impact description; triage weekly.
- Versioning: Increment doc version in front matter per approved change; maintain change log entries referencing PRs.
- Communication: Post merged updates in #motion-mavericks-docs with summary and next steps.
- Maintenance: Security Lead owns quarterly review of security docs; Compliance Officer reviews residency/consent every 6 months; Finance Ops reviews cost guardrails quarterly.
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## 16. Open questions
| Question | Owner | Due date | Status | Notes |
|----------|-------|---------|--------|-------|
| None — all review-raised questions resolved within this brief | — | — | Closed | Signed playback, residency, retention, and audit decisions documented above |
]]></content>
    </section>

    <section id="implementation_considerations" heading="Implementation considerations">
      <content><![CDATA[
## 17. Implementation considerations
- Outstanding activities: Validate current implementation gaps (signed playback disabled, missing webhook storage); gather historical cost data; confirm PagerDuty roster.
- Decision points: Share token TTL (set 7 days, override allowed down to 24h on request), video retention (active creators 180 days, soft delete after 90 days inactivity), rate limit thresholds (100 requests/min per IP for playback, 20 uploads/day per user).
- Resource needs: Webhook replay harness, cost export script, Sentry dashboard template.
- Sequencing: Finalise security/compliance docs before operations/cost to unblock security review; run staging validations immediately after each doc draft to capture output in appendix.
- Additional directives: Each doc must include rollback plan, monitoring hooks, and QA checklist; avoid TBD placeholders—if unknown, state assumption and validation plan.
]]></content>
    </section>

    <section id="doc_blueprints" heading="Doc blueprints per deliverable">
      <content><![CDATA[
## 18. Doc blueprints per deliverable

### Signed Playback and Share Governance – `docs/playbook/security/signed-playback-and-sharing.md`
<docBlueprint path="docs/playbook/security/signed-playback-and-sharing.md" template="security-control" owner="Security Tech Writer">
#### 1. Summary
- Purpose: Enforce signed playback tokens tied to share lifecycle.
- Audience: Backend engineers, security reviewers.
- Outcome once delivered: Signed playback mandatory, share revocation auditable within 15 minutes.

#### 2. Context
- Problem statement: Current plan uses public playback; risks confidentiality.
- Background details: Share tokens stored in Vercel KV, Mux playback policy default public.
- Constraints: Must use existing Mux account and Clerk auth; no custom CDN.
- Related work: Codex REC-001, Qwen REC-001, Gemini REC-001.
- Key supporting links: Mux signed playback docs, Clerk middleware examples.

#### 3. Goals
- G1: Issue signed playback tokens with ≤15 minute TTL server-side.
- G2: Record share token issuance and revocation in audit log.

#### 4. Non-goals
- Monetised pay-per-view streams.

#### 5. Scope
##### In scope
- Signed playback policy configuration
- Share token TTL and revocation workflow
##### Out of scope
- Mobile-native playback clients
##### Boundaries and assumptions
- Assumption → Validation plan: Creators can tolerate 7-day share token TTL; validate via product sign-off.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Liam Patel | Security Lead | Approve controls, review threat model | Final sign-off | PagerDuty |
| Ava Chen | Product Lead | Confirm UX impacts | Approve TTL policy | Weekly sync |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-1 | Generate signed playback tokens server-side on authorised requests | P0 | Test via staging playback request |
| FR-2 | Revoke playback when share token revoked or expired | P0 | QA script verifying 403 response |
| FR-3 | Log playback events with share token ID | P1 | Use structured logging format |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Security | Unsigned playback attempts = 0 | Sentry alert | Security Lead |
| Privacy | Residency: AU primary region | Deployment config review | Compliance Officer |
| Reliability | Token generation latency < 300ms | Load test report | Backend Engineer |

#### 8. Approach
- Preferred approach: Use Mux signed playback tokens minted via server action; store share token metadata in Neon with Drizzle.
- Alternatives considered: Presigned Blob URLs (rejected—no adaptive streaming), long-lived playback IDs (rejected—security risk).
- Trade-offs: Slight server overhead vs confidentiality.

#### 9. Structure or design
- Overview: Sequence diagram from viewer request → Clerk validation → share token lookup → signed URL issuance.
- Components: API route `/api/share/[token]`, Neon tables `share_tokens`, logging middleware.
- Diagram links: `docs/diagrams/signed-playback-sequence.mmd`.

#### 10. Data
- Entities: ShareToken, PlaybackAudit.
- Sources and owners: Neon DB (Platform team), Sentry logs (Reliability team).
- Retention rules: Share tokens 7 days active, logs 365 days.
- Data quality checks: Daily job ensures revoked tokens not active.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| `/api/share/[token]` | inbound | Viewer client → Next.js | JSON {playbackUrl:string, expiresAt:string} | Clerk session + share token | Backend |

#### 12. Security, privacy, compliance
- Data classification: Share tokens = Sensitive; playback logs = Restricted.
- Threats/mitigations: Token brute force → 128-bit randomness + rate limiting; replay → TTL + revocation.
- Controls mapped: SOC2 CC6.1, GDPR Art.32 encryption-in-transit.
- Privacy notes: Document deletion workflow referencing retention doc.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
| Vendor API | Mux signed token docs | Ensure correct signing process | High | Platform Engineer |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 | Token TTL misconfigured | Medium | High | Include automated test & monitoring | Security Lead | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
| Revocation latency | Time from revoke request to blocked playback | N/A | <15 min | Audit log | Weekly |

##### 15.2 Acceptance summary
- Acceptance notes: Security Lead + Compliance Officer sign-off.
- Validation references: Staging test script `tests/signed-playback.spec.ts`.

#### 16. Rollout and operations
- Environments: Staging first, prod behind feature flag `SIGNED_PLAYBACK_ENFORCED`.
- Runbooks: Link to vendor outage doc for fallback.
- Observability: Sentry alert on unsigned playback attempt.
- Alerts/on-call: PagerDuty security service.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| None | — | — | Closed |

#### 18. References
- Mux signed playback documentation

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Initial blueprint | Codex | — |

#### 20. Implementation considerations
- Remaining work: Build staging validation script.
- Decision points: TTL configuration (default 15 min playback tokens, 7 day share window).
- Resource gaps: None.
- Sequencing: Draft doc before rate limiting guide to reference token enforcement.
- Additional directives: Include code samples for Clerk middleware.
</docBlueprint>

### Mux Upload and Webhook Reliability – `docs/playbook/platform/mux-upload-and-webhook-reliability.md`
<docBlueprint path="docs/playbook/platform/mux-upload-and-webhook-reliability.md" template="operational-runbook" owner="Platform Engineer">
#### 1. Summary
- Purpose: Ensure upload jobs survive retries and webhooks are authenticated, retried, and reconciled.
- Audience: Platform engineers, reliability engineers.
- Outcome once delivered: Zero orphaned videos, validated webhook signatures, automated DLQ replay.

#### 2. Context
- Problem statement: Execution plan assumes asset_id arrives immediately and webhook verification optional.
- Background: Using Mux direct uploads, Neon stores metadata, webhook endpoint on Next.js.
- Constraints: Must operate within Vercel function timeouts; rely on Neon and Vercel KV for state.
- Related work: Codex REC-002, Gemini REC-002/003, Claude REC-006.
- Key links: Mux webhook docs, Vercel cron jobs, Upstash/Vercel KV guides.

#### 3. Goals
- G1: Persist mux_upload_id and correlate to asset_id post-webhook.
- G2: Authenticate every webhook and provide DLQ + replay.

#### 4. Non-goals
- Live streaming ingestion or editing pipeline.

#### 5. Scope
##### In scope
- Upload initiation API, webhook handler, DLQ job.
##### Out of scope
- Client-side upload UI (covered elsewhere).
##### Boundaries and assumptions
- Assumption → Validation: Neon connection pooling sufficient; monitor via staging load test.

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
| Noah Hughes | Reliability Engineer | Approve runbook, monitor instrumentation | Final approval | Slack |
| Liam Patel | Security Lead | Validate signature verification | Approve security posture | PagerDuty |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
| FR-1 | Persist mux_upload_id + share ID when upload initiated | P0 | Verified via DB check |
| FR-2 | Validate webhook signatures using Mux secret | P0 | Negative test with invalid signature |
| FR-3 | Implement DLQ with replay cron job | P0 | Replay clears stuck uploads |
| FR-4 | Notify on DLQ retries >3 | P1 | Sentry alert |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
| Reliability | Webhook success ≥99.5% | Monitoring dashboard | Noah Hughes |
| Security | Spoofed webhook attempts detected 100% | Sentry alert log | Security Lead |
| Performance | Replay job < 1 min | Cron log | Platform Engineer |

#### 8. Approach
- Preferred: Store upload state in Neon, sign webhooks with Mux secret, use Vercel KV for DLQ pointer, schedule cron for replay.
- Alternatives: External queue (SQS) rejected for scope creep.
- Trade-offs: Slight complexity vs asset consistency.

#### 9. Structure or design
- Overview: Diagram showing upload initiation → Neon persist → webhook → validation → DB update → DLQ fallback.
- Components: `/api/uploads` route, `/api/webhooks/mux`, cron job `mux-dlq-replay`.
- Diagram link: `docs/diagrams/mux-webhook-sequence.mmd`.

#### 10. Data
- Entities: UploadJob, MuxAsset, WebhookEvent.
- Sources: Neon DB, KV DLQ store, Sentry logs.
- Retention: UploadJob 365 days, WebhookEvent 90 days.
- Data quality: Daily reconciliation job ensures asset + share status match.

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
| `/api/uploads` | inbound | Frontend → API | JSON payload with mux_upload_id | Clerk auth | Platform |
| `/api/webhooks/mux` | inbound | Mux → API | Mux webhook schema | HMAC signature | Platform |

#### 12. Security, privacy, compliance
- Classification: Upload metadata = Sensitive.
- Threats: Webhook spoofing (mitigate via signature), DLQ overflow (mitigate via monitoring).
- Controls: Map to SOC2 CC7, GDPR Art.32.
- DPIA: Reference data residency doc for storage locations.

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
| Vendor | Mux webhook docs | Validate HMAC algorithm | High | Platform Engineer |
| Tooling | Vercel Cron | Schedule DLQ replay | Medium | DevOps |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
| R1 | DLQ replay fails silently | Low | High | Add alert + manual runbook | Platform Engineer | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
| Webhook retries | Count of retries per day | Unknown | <5/day | Sentry | Daily |

##### 15.2 Acceptance summary
- Acceptance: Reliability Engineer + Security Lead.
- Validation: Replay harness logs, Sentry alert tests.

#### 16. Rollout and operations
- Environments: Staging first, production behind feature flag `MUX_WEBHOOK_DLQ_ENABLED`.
- Runbooks: Link to vendor outage doc for manual fallback.
- Observability: Dashboards for webhook success, DLQ depth.
- Alerts: PagerDuty Platform service for DLQ spikes.

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
| None | — | — | Closed |

#### 18. References
- Mux webhook signing docs

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| 2025-09-17 | 0.1.0 | Initial blueprint | Codex | — |

#### 20. Implementation considerations
- Remaining work: Build replay harness script.
- Decisions: Retry policy (exponential backoff up to 15 min).
- Resource gaps: Access to KV environment.
- Sequencing: Complete before SLO doc to feed metrics.
- Directives: Include DLQ clearing checklist.
</docBlueprint>
]]></content>
    </section>

    <section id="automation_tags" heading="Automation tags (optional)">
      <content><![CDATA[
## 19. Automation tags (optional)
<!-- None defined; add workPackage tags when automation tooling available. -->
]]></content>
    </section>

  </sections>

  <changeLog>
    <entry date="2025-09-17" version="0.1.0" author="Codex (GPT-5)">Initial brief synthesising Codex, Qwen, Gemini, and Claude recommendations with P0/P1/P2 deliverables defined.</entry>
  </changeLog>

</doc>
