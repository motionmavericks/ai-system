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

  * `/docs/playbook/0-templates/TASK-TEMPLATE.md`
  * `/docs/playbook/0-templates/ADR-TEMPLATE.md`
* **Existing docs**: any already present Markdown under `/docs/playbook`.
* **Repo context**: code, configs, READMEs for facts.

---

## 3) Outputs

* All files listed in the tree are present, completed, and linked.
* New or updated content wrapped in AI blocks (see §7).
* `20-archive-and-postmortems/change-log.md` appended with a run entry.
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

* Link sibling docs: `../04-architecture-and-decisions/system-context.md`.
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

* `product-vision.md`: Sections = Mission, Value proposition (≥3), Non‑goals (≥3), Out‑of‑scope (≥5).
* `success-metrics.md`: Table columns = Metric, Definition, Target, Data source, Cadence, Owner. Rows ≥5.
* `stakeholders.md`: Table columns = Role, Person, Decision rights, RACI, Contact. Rows ≥5.
* `constraints.md`: Sections = Time, Budget, Technical, Regulatory, Implications.
* `risks-and-assumptions.md`: Risk register table columns = ID, Risk, Prob, Impact, RAG, Mitigation, Owner. Rows ≥10.

**01‑discovery-and-research/**

* `market-research.md`: Sections = Market size, Trends (≥5), Drivers, Blockers, Segment notes.
* `competitor-analysis.md`: Matrix table columns = Capability columns across ≥6 rows for ≥3 competitors. Summary section = Gaps (≥5).
* `user-interviews.md`: Sections = Screener, Guide (≥10 questions), Synthesis template, Consent statement.
* `content-and-data-audit.md`: Inventory table columns = Source, Type, Owner, Quality, Freshness, Notes. Rows ≥15.

**02‑requirements-and-scope/**

* `user-stories.md`: Group by epic. Each story format = "As a…, I want…, so that…". Count ≥20. Trace column = Metric ID.
* `acceptance-criteria.md`: Use Gherkin. Critical paths ≥10 scenarios. Include negative cases ≥3.
* `non-functional-requirements.md`: Table columns = Area, SLI/SLO, Target, Method, Env. Rows ≥12.
* `scope-boundaries.md`: Sections = In‑scope, Out‑of‑scope, De‑scoping rules, Assumptions.
* `definition-of-done.md`: Checklists = Engineering, Design, QA, Security, Docs. Each list ≥8 items.

**03‑ux-and-design/**

* `personas.md`: 3–5 personas. Each = Goals, JTBD (≥3), Frictions (≥5), Accessibility needs, Key quotes (≤2).
* `journeys-and-flows.md`: At least 3 flows. Each with steps table = Step, Actor, Intent, Happy path, Failure.
* `information-architecture.md`: Sections = Sitemap, Content model (entities ≥6).
* `wireframes.md`: Link list to assets (≥10). For each, note state coverage = Empty, Error, Loading.
* `design-system.md`: Tokens table = Name, Category, Example, Usage. Components list ≥15 with states.

**04‑architecture-and-decisions/**

* `system-context.md`: C4 L1 diagram link. Text = External systems (≥5), Trust boundaries.
* `solution-architecture.md`: Sections = Runtime, Components (≥8), Data stores, Queues, Deployment.
* `data-flows.md`: CRUD map table (entities ≥6). Event flows list ≥10 with producer/consumer.
* `threat-model.md`: STRIDE table per component. Include DFD link. Mitigations per threat.
* `adrs/README.md`: ADR index table columns = ADR, Title, Status, Date, Owner. Link each ADR.

**05‑project-setup/**

* `repository-setup.md`: Sections = Layout, Branch model, Protections, Required reviews.
* `coding-standards.md`: Per language rules. Lint and format config names. Commit message spec.
* `environments-and-secrets.md`: Envs = dev, staging, prod. Table columns = Name, Source, Rotation, Owner.
* `package-and-dependency-policy.md`: Pinning policy, Update cadence, Audit tool, Allowlist/Denylist.
* `precommit-and-ci-conventions.md`: Hooks list ≥5. CI stages = Lint, Test, Build, Scan, Package.

**06‑data-model-and-storage/**

* `schema-design.md`: ERD link. Table spec per entity = Columns, Types, PK, FKs, Indexes, Ownership.
* `migrations-plan.md`: Tooling, Ordering, Rollback, Idempotency, Drift checks.
* `seed-and-fixtures.md`: Minimal seeds list ≥10. Anonymisation rules.
* `backup-and-restore.md`: RPO/RTO targets, Schedules, Test cadence quarterly, Restore steps.
* `data-governance.md`: Classification levels, Retention policy table, DPO contact, Access reviews.

**07‑apis-and-contracts/**

* `api-style-guide.md`: Versioning, Pagination, Errors, Idempotency, Trace headers, Timeouts.
* `endpoints-and-contracts.md`: ≥15 endpoints or all discovered. For each: Method, Path, Summary, Auth, Scopes, Request schema, Response schema, Status codes, Errors, Rate‑limit headers, Idempotency key.
* `auth-and-authorisation.md`: Flows = Sign‑in, Refresh, MFA, Passwordless. Roles and scopes table.
* `rate-limiting-and-quota.md`: Algorithm, Limits per plan, Headers, Retry policy, 429 body spec.
* `webhooks-and-events.md`: Topics ≥10. Payload schema per topic. Retries with backoff. HMAC signing.

**08‑frontend/**

* `tech-stack.md`: Framework, Rendering modes, Build, Bundle targets, Performance budgets.
* `routing-and-navigation.md`: Route table = Path, Auth, Guard, Layout, 404/500.
* `state-management.md`: Stores, Cache policy, Invalidation matrix, Persistence rules.
* `forms-and-validation.md`: Schema lib, Error UX, Async validation, i18n notes.
* `ui-components.md`: Catalogue ≥25. API props table per component. Accessibility notes.
* `accessibility-a11y.md`: Targets = WCAG 2.2 AA. Testing tools, Keyboard support grid.
* `internationalisation-i18n.md`: Locales, Message strategy, Plurals, Dates/Numbers, RTL support (if any).

**09‑backend/**

* `service-boundaries.md`: Modules/services ≥8. Ownership table.
* `business-logic.md`: Core invariants (≥10). Conflict rules. Idempotency.
* `background-jobs.md`: Queues, Schedules, Retries, DLQs, Observability.
* `file-and-media-storage.md`: Classes, Lifecycle, Virus scan, PII, CDN.
* `caching-strategy.md`: Layers, TTLs, Keys, Busting, Consistency.

**10‑integrations/**

* `identity-provider.md`: IdP choice, OIDC/OAuth flows, SCIM/JIT, Mapping.
* `payments.md`: Provider, PCI scope, Webhooks, Refunds, Disputes.
* `email-and-notifications.md`: Providers, Templates (≥15), Rate limits, Unsubscribe.
* `analytics-and-product-events.md`: Taxonomy table ≥25 events with properties.
* `third-party-webhooks.md`: Inbound contracts, Security, Replay defence.

**11‑security-and-compliance/**

* `security-baseline.md`: Map to ASD Essential Eight and CIS. Control status table.
* `secrets-management.md`: Vault design, Rotation, Access, Break‑glass.
* `privacy-and-data-protection.md`: Data classes, DPIA summary, SAR/DSR flow, Retention.
* `compliance-checklist.md`: SOC2/ISO27001 control map. Evidence locations.
* `incident-response.md`: Severity matrix, RACI, Runbooks, Comms templates, Post‑incident review.

**12‑testing-and-quality/**

* `test-strategy.md`: Pyramid targets, Env matrix, Quality gates.
* `unit-tests.md`: Coverage target, Examples, Mocks policy.
* `integration-tests.md`: Contract tests, Fixtures, Data reset.
* `e2e-tests.md`: Critical journeys ≥10, Flake policy, Retries.
* `performance-tests.md`: Tools, SLIs/SLOs, Thresholds, CI gating.
* `accessibility-tests.md`: Tooling, Manual checks, Assistive tech list.

**13‑devops-ci-cd/**

* `ci-pipeline.md`: Stages, Caching, Artefacts, Parallelism.
* `cd-and-release-strategy.md`: Env promos, Approvals, Feature flags, Canary.
* `infrastructure-as-code.md`: Tool, State, Review, Drift detection.
* `environment-configs.md`: Per‑env diffs table. Secret sources.
* `rollback-and-hotfix.md`: Triggers, Steps, Owner, Comms.

**14‑observability/**

* `logging.md`: Structure, Redaction, Retention, Sampling.
* `metrics-sli-slo.md`: SLIs ≥12 with SLOs and alert rules.
* `tracing.md`: Propagation, Span naming, Sampling, Exemplars.
* `alerting.md`: Policies, Channels, On‑call, Noise rules.
* `dashboards.md`: Required views, Owners, Links.

**15‑performance-and-reliability/**

* `load-and-stress-testing.md`: Scenarios, VUs, Targets, Scripts.
* `capacity-planning.md`: Growth model, Budgets, Headroom policy.
* `reliability-engineering.md`: Error budgets, Toil targets, SLO breach flow.
* `disaster-recovery.md`: Scenarios, RTO/RPO, Drill cadence.
* `chaos-experiments.md`: Hypotheses, Guardrails, Rollback.

**16‑documentation-and-training/**

* `developer-docs.md`: Local setup, Common tasks, Gotchas.
* `runbooks.md`: ≥10 tasks. Each step‑by‑step with pre‑reqs and rollback.
* `support-playbooks.md`: Tiers, Scripts, SLAs, Escalation paths.
* `onboarding.md`: 30/60/90 plan, Access matrix, Checklists.
* `user-guides.md`: Top tasks ≥10. Screenshot placeholders and tips.

**17‑go-to-market-and-legal/**

* `pricing-and-packaging.md`: Tiers, Limits, Upgrade paths, Overage policy.
* `legal-review.md`: Counsel notes, Flags, Required changes.
* `terms-and-privacy.md`: Links, Change policy, Data locations.
* `marketing-launch-plan.md`: Channels, Assets, Dates, Owners, KPIs.
* `app-store-listing.md`: Copy blocks, Metadata, Image specs.

**18‑release-and-cutover/**

* `release-checklist.md`: Pre‑flight checks ≥25. Sign‑offs.
* `cutover-plan.md`: Timeline, Roles, Rollback point, Dry run.
* `data-migration-runbook.md`: Steps, Verification, Backout, Timing.
* `rollback-plan.md`: Triggers, Scripts, Data plan, Comms.
* `launch-comms.md`: Templates per audience ≥5.

**19‑post-launch/**

* `support-rotation.md`: Roster, Coverage, Escalation.
* `bug-triage-and-sla.md`: Sev matrix, Intake, SLA times.
* `feedback-loop.md`: Sources, Cadence, Backlog intake.
* `analytics-review-cadence.md`: Weekly and monthly rituals, Owners.
* `roadmap-prioritisation.md`: Method, Scoring model, Intake.

**20‑archive-and-postmortems/**

* `postmortems-template.md`: Fields, Timeline, Impact, 5 Whys, Actions with owners.
* `retrospectives.md`: Cadence, Format, Action tracking.
* `change-log.md`: Date, Change, Author. Append on each run.
* `lessons-learned.md`: Distilled improvements grouped by theme.

### 9.2 File‑specific hard rules (overrides)

* `04-architecture-and-decisions/adrs/*.md`: Must follow ADR template. Status ∈ {Proposed, Accepted, Superseded, Rejected}. Include Consequences.
* `07-apis-and-contracts/endpoints-and-contracts.md`: Every schema must be JSON Schema draft 2020‑12 or OpenAPI 3.1 snippet. Include examples.
* `11-security-and-compliance/incident-response.md`: Include contact list, paging method, and comms templates for internal, customers, regulators.
* `14-observability/metrics-sli-slo.md`: Include alert routing keys and quiet hours.
* `18-release-and-cutover/data-migration-runbook.md`: Include dry‑run data set size and expected duration.

### 9.3 Programmatic checks (regex/keys)

* Headings must match `^#{2}\s` for section titles after front matter.
* Tables must have `|` header row and at least one data row.
* Link check: relative paths must exist.
* Count checks use `_min` rules above.

---

## 10) ADR and task creation rules

* Create an ADR for any choice with material trade‑offs. Use `/04-architecture-and-decisions/adrs/NNNN-kebab-title.md`. Increment NNNN. Populate from `ADR-TEMPLATE.md`. Set `Status: Proposed` initially.
* For gaps or actions, append a task to the most relevant doc under `## Open questions` and also create a task file under `/docs/playbook/16-documentation-and-training/runbooks.md` or a per‑area TODO file if substantial. Use `TASK-TEMPLATE.md`.

---

## 11) Validation gates

Run after generation:

* All files in the tree exist.
* No `<TBD>` remains. Use `<PLACEHOLDER>` only with a paired task.
* All docs have front matter and an AI block.
* All links resolve inside repo.
* Spelling in `en-AU`.
* Each file references at least two related docs.
* `change-log.md` contains this run entry.

---

## 12) Re‑run behaviour

* Re‑parse brief. Update `context.json`.
* For each file:

  * If file missing → create with skeleton and content.
  * If present → replace only inside AI block. Leave human sections untouched.
* If sections are deprecated by new brief content, mark them under "Assumptions" as superseded and create an ADR if architectural.

---

## 13) Change logging

Append to `/docs/playbook/20-archive-and-postmortems/change-log.md`:

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

`docs/playbook/07-apis-and-contracts/auth-and-authorisation.md`

```markdown
---
title: "Auth and Authorisation"
status: "Draft"
owner: "Docs Agent"
last_updated: "YYYY-MM-DD"
source: ["00-agent-execution-brief","repo"]
ai_managed: true
---

<!-- ai:managed start file="docs/playbook/07-apis-and-contracts/auth-and-authorisation.md" responsibility="docs" strategy="replace" -->

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
- ../07-apis-and-contracts/endpoints-and-contracts.md
- ../10-integrations/identity-provider.md

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
