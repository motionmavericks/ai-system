---
# Set every front matter field before publishing.
title: "{{title}}"
doc_path: "{{doc.path}}"
doc_type: "{{doc.type|agent_requirements}}"
# Override status before execution; defaults to draft.
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

<!-- Root XML descriptor to support structured ingestion by Agentis coding agents -->
<doc xmlns="urn:docs:agent-execution"
     type="{{doc.type|agent_requirements}}"
     path="{{doc.path}}"
     version="{{version}}"
     status="{{status}}"
     owner="{{owner.name}}">

  <meta>
    <!-- Delete link rows not in use to avoid stale pointers. -->
    <link rel="repo" href="{{repo.url}}"/>
    <link rel="ticket" href="{{tracker.url}}"/>
    <link rel="design" href="{{design.url}}"/>
    <link rel="spec" href="{{spec.url}}"/>
    <!-- Remove the tags element if tags are not supplied. -->
    <tags>{{tags}}</tags>
  </meta>

  <sections>

    <section id="objective" heading="Objective and success definition">
      <instructions>Describe why this agent brief exists, the business value, and what success looks like once all `docs/playbook/**` files are generated.</instructions>
      <content><![CDATA[
## 1. Objective and success definition
- Problem this brief solves:
- Desired outcomes once documentation is generated:
- Success metrics for the Agentis coding agent:
]]></content>
    </section>

    <section id="doc_inventory" heading="Documentation inventory">
      <instructions>Enumerate every Markdown deliverable the agent must create or refresh under `docs/playbook/**`. Include relative path, document purpose, and priority.</instructions>
      <content><![CDATA[
## 2. Documentation inventory
| Relative path | Purpose | Priority (P0/P1/P2) | Notes |
|---------------|---------|---------------------|-------|
|               |         |                     |       |
]]></content>
    </section>

    <section id="source_materials" heading="Source materials and truth set">
      <instructions>List artefacts, SMEs, datasets, or systems the agent should consult. Include access details, freshness expectations, and contact owners.</instructions>
      <content><![CDATA[
## 3. Source materials and truth set
- Primary references:
- SME contacts and availability:
- Data repositories or dashboards:
- Validation approach for conflicting information:
]]></content>
    </section>

    <section id="style_guidance" heading="Style and formatting directives">
      <instructions>Capture language, tone, formatting, link strategy, terminology, and any domain-specific writing rules beyond the universal template.</instructions>
      <content><![CDATA[
## 4. Style and formatting directives
- Language and tone:
- Terminology and glossary references:
- Citation and linking rules:
- Diagram or asset expectations:
- Accessibility or localisation requirements:
]]></content>
    </section>

    <section id="structure_alignment" heading="Template alignment">
      <instructions>Explain how each target doc maps to available templates (e.g., universal, ADR, task). Include deviations or additional sections required.</instructions>
      <content><![CDATA[
## 5. Template alignment
| Target doc | Base template | Additional sections | Deviations or notes |
|------------|---------------|---------------------|---------------------|
|            |               |                     |                     |
]]></content>
    </section>

    <section id="naming_scope" heading="File naming and scope rules">
      <instructions>Detail naming conventions, folder placement, module tags, and scope boundaries the agent must follow.</instructions>
      <content><![CDATA[
## 6. File naming and scope rules
- Naming conventions:
- Folder placement guidance:
- Module or tag usage:
- Scope inclusions and exclusions:
]]></content>
    </section>

    <section id="context" heading="Business and technical context">
      <instructions>Provide domain overview, system architecture highlights, user personas, and key constraints that influence documentation.</instructions>
      <content><![CDATA[
## 7. Business and technical context
- Domain overview:
- Core systems and integrations:
- User personas and needs:
- Regulatory or contractual constraints:
]]></content>
    </section>

    <section id="stakeholders" heading="Stakeholders and decision-makers">
      <instructions>List stakeholders with decision authority, review responsibilities, and preferred communication channels.</instructions>
      <content><![CDATA[
## 8. Stakeholders and decision-makers
| Name | Role | Responsibility | Decision authority | Contact cadence |
|------|------|----------------|--------------------|-----------------|
|      |      |                |                    |                 |
]]></content>
    </section>

    <section id="constraints" heading="Operational constraints">
      <instructions>Capture technical, resource, security, or scheduling constraints that affect the agent's execution.</instructions>
      <content><![CDATA[
## 9. Operational constraints
- Technical limitations:
- Resource or tooling constraints:
- Security and privacy considerations:
- Time or sequencing constraints:
]]></content>
    </section>

    <section id="access" heading="Access and tooling requirements">
      <instructions>Document credentials, environments, APIs, or scripts the agent requires, including how to request access and any audit requirements.</instructions>
      <content><![CDATA[
## 10. Access and tooling requirements
- Required credentials and how to obtain them:
- Tooling and automation scripts:
- Audit or logging requirements:
- Support contacts for access issues:
]]></content>
    </section>

    <section id="data_sensitivity" heading="Data sensitivity and compliance">
      <instructions>Describe data classifications, handling procedures, retention requirements, and compliance checkpoints relevant to documentation.</instructions>
      <content><![CDATA[
## 11. Data sensitivity and compliance
- Data classification summary:
- Handling and redaction rules:
- Compliance frameworks to reference:
- Escalation path for incidents:
]]></content>
    </section>

    <section id="deliverable_acceptance" heading="Deliverable acceptance criteria">
      <instructions>Define what "done" means for each deliverable, including review steps, validation scripts, and sign-off authorities.</instructions>
      <content><![CDATA[
## 12. Deliverable acceptance criteria
- Narrative acceptance criteria:
- Automated validation or linting requirements:
- Review and approval workflow:
- Sign-off authorities:
]]></content>
    </section>

    <section id="timeline" heading="Timeline and sequencing">
      <instructions>Provide target dates, dependencies between documents, and milestones the agent should follow.</instructions>
      <content><![CDATA[
## 13. Timeline and sequencing
| Milestone | Description | Target date | Dependencies | Owner |
|-----------|-------------|-------------|--------------|-------|
|           |             |             |              |       |
]]></content>
    </section>

    <section id="risks" heading="Risks and mitigations">
      <instructions>List risks specific to agent-led documentation, with mitigation strategies and trigger conditions.</instructions>
      <content><![CDATA[
## 14. Risks and mitigations
| ID | Risk | Trigger | Impact | Mitigation | Owner | Status |
|----|------|---------|--------|------------|-------|--------|
|    |      |         |        |            |       |        |
]]></content>
    </section>

    <section id="change_management" heading="Change management and versioning">
      <instructions>Describe how updates are requested, tracked, and communicated once documentation is generated.</instructions>
      <content><![CDATA[
## 15. Change management and versioning
- Request intake process:
- Versioning rules and tooling:
- Communication plan for updates:
- Responsibilities for ongoing maintenance:
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Track unresolved items that block execution, with owners and due dates.</instructions>
      <content><![CDATA[
## 16. Open questions
| Question | Owner | Due date | Status | Notes |
|----------|-------|---------|--------|-------|
|          |       |         | Open   |       |
]]></content>
    </section>

    <section id="implementation_considerations" heading="Implementation considerations">
      <instructions>Summarise outstanding activities, decision points, resource needs, and sequencing notes tailored for the Agentis coding agent.</instructions>
      <content><![CDATA[
## 17. Implementation considerations
- Outstanding activities:
- Decision points and owners:
- Resource or capability needs:
- Sequencing or timing constraints:
- Additional directives for the agent:
]]></content>
    </section>

    <section id="doc_blueprints" heading="Doc blueprints per deliverable">
      <instructions>For every file listed in Section 2, duplicate the blueprint block. Capture enough detail for the Agentis coding agent to draft the full universal template without guessing. Keep Australian English. Short sentences. Use universal rules for `TBD` and `Not applicable` statements.</instructions>
      <content><![CDATA[
## 18. Doc blueprints per deliverable
<!-- Duplicate the block below for each target document. Replace placeholders and delete unused guidance once populated. -->
### Document title – `relative/path.md`
<docBlueprint path="" template="UNIVERSAL-TEMPLATE.md" owner="">
#### 1. Summary
- Purpose:
- Audience:
- Outcome once delivered:

#### 2. Context
- Problem statement:
- Background details:
- Constraints:
- Related work or precedents:
- Key supporting links:

#### 3. Goals
- G1:
- G2:

#### 4. Non-goals
- Explicit exclusions:

#### 5. Scope
##### In scope
- Item
##### Out of scope
- Item
##### Boundaries and assumptions
- Assumption → Validation plan:

#### 6. Stakeholders and roles
| Name | Role | Responsibilities | Authority | Contact |
|------|------|------------------|-----------|---------|
|      |      |                  |           |         |

#### 7. Requirements
##### 7.1 Functional
| ID | Requirement | Priority | Acceptance notes |
|----|-------------|----------|------------------|
| FR-1 |  | P1 |  |

##### 7.2 Non-functional
| Category | Target | Evidence method | Owner |
|----------|--------|-----------------|-------|
| Performance |  |  |  |
| Reliability |  |  |  |
| Security |  |  |  |
| A11y |  |  |  |
| i18n |  |  |  |

#### 8. Approach
- Preferred approach:
- Alternatives considered:
- Trade-offs:

#### 9. Structure or design
- Overview:
- Components or steps:
- Diagram links:

#### 10. Data
- Entities:
- Sources and owners:
- Retention rules:
- Data quality checks:

#### 11. Interfaces and contracts
| Interface | Direction | Consumer/Provider | Contract/Schema | Auth | Owner |
|-----------|-----------|-------------------|-----------------|------|-------|
|           |           |                   |                 |      |       |

#### 12. Security, privacy, compliance
- Data classification:
- Threats and mitigations:
- Controls mapped to standards:
- Privacy/DPIA notes:

#### 13. Dependencies
| Type | Name | Why needed | Risk if late | Owner |
|------|------|------------|--------------|-------|
|      |      |            |              |       |

#### 14. Risks and mitigations
| ID | Risk | Likelihood | Impact | Mitigation | Owner | Status |
|----|------|------------|--------|------------|-------|--------|
| R1 |      | Low/Med/High | Low/Med/High |        |       | Open |

#### 15. Metrics and acceptance
##### 15.1 Success metrics
| Metric | Definition | Baseline | Target | Source | Review cadence |
|--------|------------|----------|--------|--------|----------------|
|        |            |          |        |        |                |

##### 15.2 Acceptance summary
- Acceptance notes:
- Validation references:

#### 16. Rollout and operations
- Environments and flags:
- Runbooks and support:
- Observability expectations:
- Alerts and on-call:

#### 17. Open questions
| Question | Owner | Needed by | Status |
|----------|-------|-----------|--------|
|          |       |           | Open   |

#### 18. References
- Link:

#### 19. Change log
| Date | Version | Change | Author | Link |
|------|---------|--------|--------|------|
|        |         |        |        |        |

#### 20. Implementation considerations
- Remaining work before drafting:
- Decision points and owners:
- Resource or tooling gaps:
- Sequencing notes:
- Additional directives:
</docBlueprint>
]]></content>
    </section>

    <!-- Optional specialised tags block for domain-specific automation inputs -->
    <section id="automation_tags" heading="Automation tags (optional)">
      <instructions>Embed structured tags the agent or downstream tooling can parse (e.g., work packages, commands, datasets).</instructions>
      <content><![CDATA[
## 19. Automation tags (optional)
<!-- Examples: add only if relevant -->
<workPackage id="" title="" priority="">
  <task id="" type="doc" targetPath="" template=""/>
  <dependency ref=""/>
</workPackage>
<command name="" script="" description=""/>
<dataset name="" location="" refresh=""/>
<qaScenario id="" description=""/>
]]></content>
    </section>

  </sections>
</doc>
