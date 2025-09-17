# 03-playbook-docs-orchestration-guide.md

> Audience: autonomous AI agent.
> Goal: generate and maintain the full `/docs/playbook` tree from a single brief created with `00-agent-execution-brief-template.md`.

---

## 1) Scope

Create or update every Markdown file in `/docs/playbook` to a complete first draft. Keep runs idempotent. Preserve human edits outside AI‑managed blocks.

---

## 2) Inputs

* **Primary brief**: a single file authored from `00-agent-execution-brief-template.md`. Detect by either:

  * YAML front matter `type: agent-execution-brief`, or
  * Filename pattern in `/docs/playbook/00-brief-and-vision/*brief*.md`, else search repo for heading `# Agent Execution Brief`.
* **Templates**

  * `/docs/playbook/0-templates/01-universal-template.md`
  * `/docs/playbook/0-templates/00-agent-execution-brief-template.md`
* **Existing docs**: any already present Markdown under `/docs/playbook`.
* **Repo context**: code, configs, READMEs for facts.

---

## 3) Outputs

* All files listed in the tree are present, completed, and linked.
* New or updated content wrapped in AI blocks (see §7).
* `20-archive-and-postmortems/20-03-change-log.md` appended with a run entry.
* A machine‑readable context file: `/docs/playbook/_generated/context.json`.

---

## 4) Global rules

* Language: Australian English.
* Tone: concise, technical, declarative. No marketing tone in technical docs.
* No secrets, tokens, or private keys. Use `<REDACTED>` or `<PLACEHOLDER>`.
* Always include sources section when you infer from code or tickets.
* Cross‑link related docs using relative paths.
* Add "Open questions" and "Assumptions" sections where needed.
* Never delete human content outside AI blocks. Merge carefully.

---

## 5) Brief parsing → context model

Extract and normalise facts from the brief into `/docs/playbook/_generated/context.json`.

**Context schema (JSON):**

```json
{
  "meta": { "productName": "", "repo": "", "lastParsed": "YYYY-MM-DD", "version": "" },
  "vision": { "mission": "", "nonGoals": [], "successMetrics": [] },
  "stakeholders": [{ "role": "", "name": "", "contact": "", "responsibilities": [] }],
  "constraints": { "time": "", "budget": "", "regulatory": [], "tech": [] },
  "risks": [{ "name": "", "probability": "low|med|high", "impact": "low|med|high", "mitigation": "" }],
  "personas": [{ "id": "", "summary": "" }],
  "targetUsers": [],
  "useCases": [],
  "requirements": { "functional": [], "nonFunctional": [] },
  "stack": { "frontend": [], "backend": [], "data": [], "infra": [], "thirdParty": [] },
  "security": { "baseline": [], "dataClasses": [], "threats": [] },
  "compliance": [],
  "environments": ["dev","staging","prod"],
  "events": { "domainEvents": [], "analyticsEvents": [] },
  "apis": { "style": "", "auth": "", "endpoints": [] },
  "i18n": { "locales": [] },
  "a11y": { "targets": ["WCAG 2.2 AA"] },
  "glossary": [{ "term": "", "definition": "" }]
}
```

Heuristics:

* If the brief provides free text, split into bullets by sentence boundaries.
* Infer missing obvious pairs (e.g. if Next.js present, likely Node runtime). Flag as assumption.

---

## 6) File header and skeleton

Add this YAML front matter to every generated or updated doc:

```yaml
---
title: "<Auto: derive from filename>"
status: "Draft"
owner: "Docs Agent"
last_updated: "YYYY-MM-DD"
source: ["00-agent-execution-brief", "repo"]
ai_managed: true
---
```

After the header, follow the file's expected sections (see §9). Append:

* `## Open questions`
* `## Assumptions`
* `## Sources`

---

## 7) AI‑managed block protocol

Wrap AI‑generated sections so re‑runs can update safely.

```
<!-- ai:managed start file="<relative-path>" responsibility="docs" strategy="replace" -->
...generated content...
<!-- ai:managed end -->
```

Rules:

* Only one top‑level AI block per file by default. You may nest smaller blocks for tables.
* On re‑run, replace content inside AI blocks. Do not touch content outside.

---

## 8) Cross‑linking and references

* Link sibling docs: `../04-architecture-and-decisions/04-01-system-context.md`.
* Reference ADRs as `[ADR-0003](../04-architecture-and-decisions/adrs/0003-title.md)`.
* Each doc must have a "Related" list at bottom with at least two links.

---

## 9) Per‑file content contracts

Applies to every file unless overridden below.

### 9.0 Global baseline

Must include sections in this order:

* Overview
* Body sections (per file contract)
* Related
* Open questions
* Assumptions
* Sources

"Related" has ≥2 working relative links.

No `<TBD>`. Use `<PLACEHOLDER>` only with a matching task in "Open questions".

Tables must include header rows. Lists must have ≥3 items if `*_min: 3`.

### 9.1 Folder‑level defaults

For each folder, add these sections and minimums to the baseline.

**00‑brief-and-vision/**

* `00-01-product-vision.md`: Sections = Mission, Value proposition (≥3), Non‑goals (≥3), Out‑of‑scope (≥5).
* `00-02-success-metrics.md`: Table columns = Metric, Definition, Target, Data source, Cadence, Owner. Rows ≥5.
* `00-03-stakeholders.md`: Table columns = Role, Person, Decision rights, RACI, Contact. Rows ≥5.
* `00-04-constraints.md`: Sections = Time, Budget, Technical, Regulatory, Implications.
* `00-05-risks-and-assumptions.md`: Risk register table columns = ID, Risk, Prob, Impact, RAG, Mitigation, Owner. Rows ≥10.

**01‑discovery-and-research/**

* `01-01-market-research.md`: Sections = Market size, Trends (≥5), Drivers, Blockers, Segment notes.
* `01-02-competitor-analysis.md`: Matrix table columns = Capability columns across ≥6 rows for ≥3 competitors. Summary section = Gaps (≥5).
* `01-03-user-interviews.md`: Sections = Screener, Guide (≥10 questions), Synthesis template, Consent statement.
* `01-04-content-and-data-audit.md`: Inventory table columns = Source, Type, Owner, Quality, Freshness, Notes. Rows ≥15.

**02‑requirements-and-scope/**

* `02-01-user-stories.md`: Group by epic. Each story format = "As a…, I want…, so that…". Count ≥20. Trace column = Metric ID.
* `02-02-acceptance-criteria.md`: Use Gherkin. Critical paths ≥10 scenarios. Include negative cases ≥3.
* `02-03-non-functional-requirements.md`: Table columns = Area, SLI/SLO, Target, Method, Env. Rows ≥12.
* `02-04-scope-boundaries.md`: Sections = In‑scope, Out‑of‑scope, De‑scoping rules, Assumptions.
* `02-05-definition-of-done.md`: Checklists = Engineering, Design, QA, Security, Docs. Each list ≥8 items.

**03‑ux-and-design/**

* `03-01-personas.md`: 3–5 personas. Each = Goals, JTBD (≥3), Frictions (≥5), Accessibility needs, Key quotes (≤2).
* `03-02-journeys-and-flows.md`: At least 3 flows. Each with steps table = Step, Actor, Intent, Happy path, Failure.
* `03-03-information-architecture.md`: Sections = Sitemap, Content model (entities ≥6).
* `03-04-wireframes.md`: Link list to assets (≥10). For each, note state coverage = Empty, Error, Loading.
* `03-05-design-system.md`: Tokens table = Name, Category, Example, Usage. Components list ≥15 with states.

**04‑architecture-and-decisions/**

* `04-01-system-context.md`: C4 L1 diagram link. Text = External systems (≥5), Trust boundaries.
* `04-02-solution-architecture.md`: Sections = Runtime, Components (≥8), Data stores, Queues, Deployment.
* `04-03-data-flows.md`: CRUD map table (entities ≥6). Event flows list ≥10 with producer/consumer.
* `04-04-threat-model.md`: STRIDE table per component. Include DFD link. Mitigations per threat.
* `adrs/README.md`: ADR index table columns = ADR, Title, Status, Date, Owner. Link each ADR.

**05‑project-setup/**

* `05-01-repository-setup.md`: Sections = Layout, Branch model, Protections, Required reviews.
* `05-02-coding-standards.md`: Per language rules. Lint and format config names. Commit message spec.
* `05-03-environments-and-secrets.md`: Envs = dev, staging, prod. Table columns = Name, Source, Rotation, Owner.
* `05-04-package-and-dependency-policy.md`: Pinning policy, Update cadence, Audit tool, Allowlist/Denylist.
* `05-05-precommit-and-ci-conventions.md`: Hooks list ≥5. CI stages = Lint, Test, Build, Scan, Package.

**06‑data-model-and-storage/**

* `06-01-schema-design.md`: ERD link. Table spec per entity = Columns, Types, PK, FKs, Indexes, Ownership.
* `06-02-migrations-plan.md`: Tooling, Ordering, Rollback, Idempotency, Drift checks.
* `06-03-seed-and-fixtures.md`: Minimal seeds list ≥10. Anonymisation rules.
* `06-04-backup-and-restore.md`: RPO/RTO targets, Schedules, Test cadence quarterly, Restore steps.
* `06-05-data-governance.md`: Classification levels, Retention policy table, DPO contact, Access reviews.

**07‑apis-and-contracts/**

* `07-01-api-style-guide.md`: Versioning, Pagination, Errors, Idempotency, Trace headers, Timeouts.
* `07-02-endpoints-and-contracts.md`: ≥15 endpoints or all discovered. For each: Method, Path, Summary, Auth, Scopes, Request schema, Response schema, Status codes, Errors, Rate‑limit headers, Idempotency key.
* `07-03-auth-and-authorisation.md`: Flows = Sign‑in, Refresh, MFA, Passwordless. Roles and scopes table.
* `07-04-rate-limiting-and-quota.md`: Algorithm, Limits per plan, Headers, Retry policy, 429 body spec.
* `07-05-webhooks-and-events.md`: Topics ≥10. Payload schema per topic. Retries with backoff. HMAC signing.

**08‑frontend/**

* `08-01-tech-stack.md`: Framework, Rendering modes, Build, Bundle targets, Performance budgets.
* `08-02-routing-and-navigation.md`: Route table = Path, Auth, Guard, Layout, 404/500.
* `08-03-state-management.md`: Stores, Cache policy, Invalidation matrix, Persistence rules.
* `08-04-forms-and-validation.md`: Schema lib, Error UX, Async validation, i18n notes.
* `08-05-ui-components.md`: Catalogue ≥25. API props table per component. Accessibility notes.
* `08-06-accessibility-a11y.md`: Targets = WCAG 2.2 AA. Testing tools, Keyboard support grid.
* `08-07-internationalisation-i18n.md`: Locales, Message strategy, Plurals, Dates/Numbers, RTL support (if any).

**09‑backend/**

* `09-01-service-boundaries.md`: Modules/services ≥8. Ownership table.
* `09-02-business-logic.md`: Core invariants (≥10). Conflict rules. Idempotency.
* `09-03-background-jobs.md`: Queues, Schedules, Retries, DLQs, Observability.
* `09-04-file-and-media-storage.md`: Classes, Lifecycle, Virus scan, PII, CDN.
* `09-05-caching-strategy.md`: Layers, TTLs, Keys, Busting, Consistency.

**10‑integrations/**

* `10-01-identity-provider.md`: IdP choice, OIDC/OAuth flows, SCIM/JIT, Mapping.
* `10-02-payments.md`: Provider, PCI scope, Webhooks, Refunds, Disputes.
* `10-03-email-and-notifications.md`: Providers, Templates (≥15), Rate limits, Unsubscribe.
* `10-04-analytics-and-product-events.md`: Taxonomy table ≥25 events with properties.
* `10-05-third-party-webhooks.md`: Inbound contracts, Security, Replay defence.

**11‑security-and-compliance/**

* `11-01-security-baseline.md`: Map to ASD Essential Eight and CIS. Control status table.
* `11-02-secrets-management.md`: Vault design, Rotation, Access, Break‑glass.
* `11-03-privacy-and-data-protection.md`: Data classes, DPIA summary, SAR/DSR flow, Retention.
* `11-04-compliance-checklist.md`: SOC2/ISO27001 control map. Evidence locations.
* `11-05-incident-response.md`: Severity matrix, RACI, Runbooks, Comms templates, Post‑incident review.

**12‑testing-and-quality/**

* `12-01-test-strategy.md`: Pyramid targets, Env matrix, Quality gates.
* `12-02-unit-tests.md`: Coverage target, Examples, Mocks policy.
* `12-03-integration-tests.md`: Contract tests, Fixtures, Data reset.
* `12-04-e2e-tests.md`: Critical journeys ≥10, Flake policy, Retries.
* `12-05-performance-tests.md`: Tools, SLIs/SLOs, Thresholds, CI gating.
* `12-06-accessibility-tests.md`: Tooling, Manual checks, Assistive tech list.

**13‑devops-ci-cd/**

* `13-01-ci-pipeline.md`: Stages, Caching, Artefacts, Parallelism.
* `13-02-cd-and-release-strategy.md`: Env promos, Approvals, Feature flags, Canary.
* `13-03-infrastructure-as-code.md`: Tool, State, Review, Drift detection.
* `13-04-environment-configs.md`: Per‑env diffs table. Secret sources.
* `13-05-rollback-and-hotfix.md`: Triggers, Steps, Owner, Comms.

**14‑observability/**

* `14-01-logging.md`: Structure, Redaction, Retention, Sampling.
* `14-02-metrics-sli-slo.md`: SLIs ≥12 with SLOs and alert rules.
* `14-03-tracing.md`: Propagation, Span naming, Sampling, Exemplars.
* `14-04-alerting.md`: Policies, Channels, On‑call, Noise rules.
* `14-05-dashboards.md`: Required views, Owners, Links.

**15‑performance-and-reliability/**

* `15-01-load-and-stress-testing.md`: Scenarios, VUs, Targets, Scripts.
* `15-02-capacity-planning.md`: Growth model, Budgets, Headroom policy.
* `15-03-reliability-engineering.md`: Error budgets, Toil targets, SLO breach flow.
* `15-04-disaster-recovery.md`: Scenarios, RTO/RPO, Drill cadence.
* `15-05-chaos-experiments.md`: Hypotheses, Guardrails, Rollback.

**16‑documentation-and-training/**

* `16-01-developer-docs.md`: Local setup, Common tasks, Gotchas.
* `16-02-runbooks.md`: ≥10 tasks. Each step‑by‑step with pre‑reqs and rollback.
* `16-03-support-playbooks.md`: Tiers, Scripts, SLAs, Escalation paths.
* `16-04-onboarding.md`: 30/60/90 plan, Access matrix, Checklists.
* `16-05-user-guides.md`: Top tasks ≥10. Screenshot placeholders and tips.

**17‑go-to-market-and-legal/**

* `17-01-pricing-and-packaging.md`: Tiers, Limits, Upgrade paths, Overage policy.
* `17-02-legal-review.md`: Counsel notes, Flags, Required changes.
* `17-03-terms-and-privacy.md`: Links, Change policy, Data locations.
* `17-04-marketing-launch-plan.md`: Channels, Assets, Dates, Owners, KPIs.
* `17-05-app-store-listing.md`: Copy blocks, Metadata, Image specs.

**18‑release-and-cutover/**

* `18-01-release-checklist.md`: Pre‑flight checks ≥25. Sign‑offs.
* `18-02-cutover-plan.md`: Timeline, Roles, Rollback point, Dry run.
* `18-03-data-migration-runbook.md`: Steps, Verification, Backout, Timing.
* `18-04-rollback-plan.md`: Triggers, Scripts, Data plan, Comms.
* `18-05-launch-comms.md`: Templates per audience ≥5.

**19‑post-launch/**

* `19-01-support-rotation.md`: Roster, Coverage, Escalation.
* `19-02-bug-triage-and-sla.md`: Sev matrix, Intake, SLA times.
* `19-03-feedback-loop.md`: Sources, Cadence, Backlog intake.
* `19-04-analytics-review-cadence.md`: Weekly and monthly rituals, Owners.
* `19-05-roadmap-prioritisation.md`: Method, Scoring model, Intake.

**20‑archive-and-postmortems/**

* `20-01-postmortems-template.md`: Fields, Timeline, Impact, 5 Whys, Actions with owners.
* `20-02-retrospectives.md`: Cadence, Format, Action tracking.
* `20-03-change-log.md`: Date, Change, Author. Append on each run.
* `20-04-lessons-learned.md`: Distilled improvements grouped by theme.

### 9.2 File‑specific hard rules (overrides)

* `04-architecture-and-decisions/adrs/*.md`: Must follow ADR template. Status ∈ {Proposed, Accepted, Superseded, Rejected}. Include Consequences.
* `07-apis-and-contracts/07-02-endpoints-and-contracts.md`: Every schema must be JSON Schema draft 2020‑12 or OpenAPI 3.1 snippet. Include examples.
* `11-security-and-compliance/11-05-incident-response.md`: Include contact list, paging method, and comms templates for internal, customers, regulators.
* `14-observability/14-02-metrics-sli-slo.md`: Include alert routing keys and quiet hours.
* `18-release-and-cutover/18-03-data-migration-runbook.md`: Include dry‑run data set size and expected duration.

### 9.3 Programmatic checks (regex/keys)

* Headings must match `^#{2}\s` for section titles after front matter.
* Tables must have `|` header row and at least one data row.
* Link check: relative paths must exist.
* Count checks use `_min` rules above.

---

## 10) ADR and task creation rules

* Create an ADR for any choice with material trade‑offs. Use `/04-architecture-and-decisions/adrs/NNNN-kebab-title.md`. Increment NNNN. Populate from `01-universal-template.md`. Set `Status: Proposed` initially.
* For gaps or actions, append a task to the most relevant doc under `## Open questions` and also create a task file under `/docs/playbook/16-documentation-and-training/16-02-runbooks.md` or a per‑area TODO file if substantial. Use `01-universal-template.md`.

---

## 11) Validation gates

Run after generation:

* All files in the tree exist.
* No `<TBD>` remains. Use `<PLACEHOLDER>` only with a paired task.
* All docs have front matter and an AI block.
* All links resolve inside repo.
* Spelling in `en-AU`.
* Each file references at least two related docs.
* `20-03-change-log.md` contains this run entry.

---

## 12) Re‑run behaviour

* Re‑parse brief. Update `context.json`.
* For each file:

  * If file missing → create with skeleton and content.
  * If present → replace only inside AI block. Leave human sections untouched.
* If sections are deprecated by new brief content, mark them under "Assumptions" as superseded and create an ADR if architectural.

---

## 13) Change logging

Append to `/docs/playbook/20-archive-and-postmortems/20-03-change-log.md`:

```
## YYYY-MM-DD – Docs Agent run
- Created: N files
- Updated: M files
- New ADRs: [ADR-000X, ...]
- Notes: brief hash <hash-short>
```

---

## 14) Minimal algorithm (pseudocode)

```
brief = detect_brief()
ctx = parse_and_write_context(brief)
targets = enumerate_required_files()
for file in targets:
  ensure_dirs(file)
  current = read(file) if exists else ""
  draft = render_from_context(file, ctx)   // per §9 expectations
  wrapped = apply_ai_block(current, draft) // per §7
  write(file, wrapped, header=front_matter(file))
validate_all()
log_change_run()
```

---

## 15) Front matter helper

Derive `title` from filename:

* Replace `-` with space. Capitalise words. Drop extension.

---

## 16) Security checks

* Strip secrets and private keys.
* Mask sample tokens.
* If copying configs, redact `.env` values.

---

## 17) Example stub (apply pattern to all files)

`docs/playbook/07-apis-and-contracts/07-03-auth-and-authorisation.md`

```markdown
---
title: "Auth and Authorisation"
status: "Draft"
owner: "Docs Agent"
last_updated: "YYYY-MM-DD"
source: ["00-agent-execution-brief","repo"]
ai_managed: true
---

<!-- ai:managed start file="docs/playbook/07-apis-and-contracts/07-03-auth-and-authorisation.md" responsibility="docs" strategy="replace" -->

## Overview
High‑level auth model from context. Identity provider, session vs token, scopes.

## Flows
- Sign‑in
- Token refresh
- Passwordless or MFA
Sequence diagrams as text with links to images.

## Roles and scopes
Table: role → scopes → permitted endpoints.

## Sessions and expiry
Defaults, rotation, revocation.

## Data handling
PII classes, storage, retention.

## Error handling
Standard codes and messages.

## Related
- ../07-apis-and-contracts/07-02-endpoints-and-contracts.md
- ../10-integrations/10-01-identity-provider.md

<!-- ai:managed end -->

## Open questions
- <PLACEHOLDER> IdP confirmation.

## Assumptions
- <ASSUMPTION> Access tokens are JWT with RS256.

## Sources
- 00-agent-execution-brief
- code: /api/auth/*
```

---

## 18) Repository hygiene

* Create `/docs/playbook/README.md` with a generated index of all docs.
* Do not alter non‑playbook directories.

---

## 19) Completion criteria

* 100% of required files exist with front matter and AI blocks.
* All validation gates pass.
* At least one ADR exists if any non‑trivial decision is present in the brief.
* Change log updated.

---

## 20) Failure handling

* If the brief is missing, create `/docs/playbook/00-brief-and-vision/README.md` with instructions to supply it. Abort further generation.
* If templates are missing, generate minimal fallbacks inside AI blocks and write a task to recreate the official templates.

---

## 21) Run configuration

* Date format: `YYYY-MM-DD`.
* Line width: soft 100.
* File encoding: UTF‑8.
* EOL: `\n`.

---

Execute this guide in full on each run.
