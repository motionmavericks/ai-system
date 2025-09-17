---
# Set every front matter field before publishing.
title: "{{title}}"
doc_path: "{{doc.path}}"
doc_type: "{{doc.type}}"
# Override status before merging; defaults to draft.
status: "{{status|draft}}"
# Bump the version with each approved change.
version: "{{version|0.1.0}}"
owner: "{{owner.name}}"
reviewers: [{{reviewers.csv}}]
last_updated: "{{date.today}}"
project: "{{project.name}}"
# Drop module if unused.
module: "{{module|core}}"
# Remove the tags line if no tags apply.
tags: [{{tags}}]
# Delete unused links to avoid stale placeholders.
links:
  repo: "{{repo.url}}"
  ticket: "{{tracker.url}}"
  design: "{{design.url}}"
  spec: "{{spec.url}}"
# Set to true for docs handling PII; delete if not applicable.
pii: {{pii|false}}
# Set to true when a security review is required; delete if not tracked.
security_review_required: {{security_review_required|false}}
# Remove compliance_scope if you do not track formal obligations.
compliance_scope: [{{compliance.items}}]
---

# {{title}}

> Status: **{{status}}** • Version: **{{version}}** • Updated: **{{last_updated}}**

<!-- Root XML descriptor for structured authoring -->
<doc xmlns="urn:docs:universal"
     type="{{doc.type}}"
     path="{{doc.path}}"
     version="{{version}}"
     status="{{status}}"
     owner="{{owner.name}}">

  <meta>
    <link rel="repo" href="{{repo.url}}"/>
    <link rel="ticket" href="{{tracker.url}}"/>
    <link rel="design" href="{{design.url}}"/>
    <link rel="spec" href="{{spec.url}}"/>
    <tags>{{tags}}</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>3–5 sentences. Purpose, audience, outcome. No hype.</instructions>
      <content><![CDATA[
## 1. Summary
TBD – Owner: {{owner.name}} – Due: {{date.today}}
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Problem, background, constraints, related work. Key links inline.</instructions>
      <content><![CDATA[
## 2. Context
- Problem:
- Background:
- Constraints:
- Related:
- Key links: [Spec]({{spec.url}}) | [Design]({{design.url}}) | [Ticket]({{tracker.url}})
]]></content>
    </section>

    <section id="goals" heading="Goals">
      <instructions>Measurable goals. Max 7.</instructions>
      <content><![CDATA[
## 3. Goals
- G1:
- G2:
]]></content>
    </section>

    <section id="non-goals" heading="Non-goals">
      <instructions>Explicit exclusions to prevent scope creep.</instructions>
      <content><![CDATA[
## 4. Non-goals
- Not doing:
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>In, out, boundaries, assumptions with validation plan.</instructions>
      <content><![CDATA[
## 5. Scope
### In scope
- Item
### Out of scope
- Item
### Boundaries and assumptions
- Assumption → Validation plan:
]]></content>
    </section>

    <section id="stakeholders" heading="Stakeholders and roles">
      <instructions>Use a table. Include authority and contact.</instructions>
      <content><![CDATA[
## 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
|      |      |                  |           |         |
]]></content>
    </section>

    <section id="requirements" heading="Requirements">
      <instructions>Functional and non-functional. Tables. Link to tests if known.</instructions>
      <content><![CDATA[
## 7. Requirements
### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-1 |  | P1 |  |

### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Performance |  |  |  |
| Reliability |  |  |  |
| Security |  |  |  |
| A11y |  |  |  |
| i18n |  |  |  |
]]></content>
    </section>

    <section id="approach" heading="Approach">
      <instructions>Method, options considered, trade-offs.</instructions>
      <content><![CDATA[
## 8. Approach
- Preferred approach:
- Alternatives and why rejected:
- Trade-offs:
]]></content>
    </section>

    <section id="structure_or_design" heading="Structure or design">
      <instructions>Architecture, research plan, or process map as fits the doc. Link diagrams.</instructions>
      <content><![CDATA[
## 9. Structure or design
- Overview:
- Components or steps:
- Links to diagrams/prototypes:
]]></content>
    </section>

    <section id="data" heading="Data">
      <instructions>Entities, sources, ownership, retention, quality rules.</instructions>
      <content><![CDATA[
## 10. Data
- Entities:
- Sources and owners:
- Retention and deletion:
- Data quality rules:
]]></content>
    </section>

    <section id="interfaces" heading="Interfaces and contracts">
      <instructions>APIs, events, files. Include auth and ownership.</instructions>
      <content><![CDATA[
## 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
|           |           |                   |                 |      |       |
]]></content>
    </section>

    <section id="security_privacy" heading="Security, privacy, compliance">
      <instructions>Classification, threats, controls, DPIA notes.</instructions>
      <content><![CDATA[
## 12. Security, privacy, compliance
- Data classification:
- Threats and mitigations:
- Controls mapped to standards:
- Privacy/DPIA notes:
]]></content>
    </section>

    <section id="dependencies" heading="Dependencies">
      <instructions>Inbound, outbound, cross-team. Risk if late.</instructions>
      <content><![CDATA[
## 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
|      |      |            |              |       |
]]></content>
    </section>

    <section id="risks" heading="Risks and mitigations">
      <instructions>Risk register with owner and status.</instructions>
      <content><![CDATA[
## 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 |      | Low/Med/High | Low/Med/High |        |       | Open |
]]></content>
    </section>

    <section id="metrics_acceptance" heading="Metrics and acceptance">
      <instructions>Define KPIs and acceptance summary.</instructions>
      <content><![CDATA[
## 15. Metrics and acceptance
### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
|        |            |          |        |        |                |

### 15.2 Acceptance criteria summary
- Given/When/Then scenarios:
- Links to detailed acceptance:
]]></content>
    </section>

    <section id="ops" heading="Rollout and operations">
      <instructions>Flags, environments, runbooks, SLOs, alerts, support handover.</instructions>
      <content><![CDATA[
## 16. Rollout and operations
- Environments and flags:
- Runbooks and on-call:
- Logging, metrics, tracing:
- Alerts and thresholds:
- Support handover:
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Each with owner and needed-by date.</instructions>
      <content><![CDATA[
## 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
|          |       |           | Open   |
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>Links and citations.</instructions>
      <content><![CDATA[
## 18. References
- Link:
]]></content>
    </section>

    <section id="changelog" heading="Change log">
      <instructions>Append a row per change.</instructions>
      <content><![CDATA[
## 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
| {{last_updated}} | {{version}} | Initial draft | {{owner.name}} | {{doc.path}} |
]]></content>
    </section>

    <section id="implementation_considerations" heading="Implementation considerations">
      <instructions>Summarise outstanding activities, decision points, resource needs, and sequencing notes to inform downstream task planning. Use narrative prose; only add checklists if mandated.</instructions>
      <content><![CDATA[
## 20. Implementation considerations
- Outstanding activities:
- Decision points and owners:
- Resource or capability needs:
- Sequencing or timing constraints:
- Additional notes for task planning:
]]></content>
    </section>

    <!-- Optional specialised tags block for domain-specific entries -->
    <section id="specialised_tags" heading="Specialised tags (optional)">
      <instructions>Embed structured tags as needed. Keep under this block.</instructions>
      <content><![CDATA[
<!-- Examples: add only if relevant to this doc -->
<stage id="" title=""/>
<task id="" title="" owner="" priority="" estimate="">
  <subtask id="" title="" owner="" acceptance=""/>
  <route method="" path="" auth="" tenantScope=""/>
  <schema name=""/>
  <env var="" required="true"></env>
  <secret name="" rotation=""/>
  <policy name=""></policy>
  <migration id=""></migration>
  <test type="" id=""></test>
</task>
]]></content>
    </section>

  </sections>
</doc>
