---
title: "Template usage guide"
doc_path: "docs/playbook/0-templates/02-universal-template-usage.md"
doc_type: "guide"
status: "draft"
version: "0.1.0"
owner: "Docs"
reviewers: []
last_updated: "{{date.today}}"
project: "{{project.name}}"
tags: [documentation, template]
---

# Template usage guide

> Applies to every file in `docs/playbook/**` except `TASK-TEMPLATE.md` and `ADR-TEMPLATE.md`.

## 1. Rules
- Use Australian English. Short sentences. No filler.
- One Markdown file per doc.
- Keep the section order. Do not delete headings.
- If unknown, write `TBD – Owner: <name> – Due: <YYYY-MM-DD>`.
- If not applicable, write `Not applicable` and give one‑line reason.
- Document concrete details that allow task planning; avoid checklists unless a section explicitly requires them.
- Dates use ISO 8601. Times 24h. Numbers as digits.
- Tables use GitHub pipe syntax.
- Use relative links inside the repo.

## 2. Variables
Fill the moustache tokens before publishing. Defaults mirror the template and should be overridden when the real value is known.

| Token | Meaning | Default/Notes |
|-------|---------|---------------|
| `{{title}}` | Human title | Required |
| `{{doc.path}}` | Repo path to this file | Required |
| `{{doc.type}}` | Doc category (e.g. research, api, security) | Required |
| `{{status|draft}}` | Lifecycle state | Replace with `reviewing` or `approved` as appropriate |
| `{{version|0.1.0}}` | SemVer | Bump on each approved change |
| `{{owner.name}}` | Single accountable owner | Required |
| `{{reviewers.csv}}` | Comma-separated reviewers | Leave blank if none yet |
| `{{date.today}}` | ISO date | Resolve to the current date |
| `{{project.name}}` | Project name | Required |
| `{{module|core}}` | Optional module tag | Delete the `module` line if not used |
| `{{tags}}` | Comma-separated tags | Remove the `tags` line if empty |
| `{{repo.url}}` | Primary repository link | Remove if irrelevant |
| `{{tracker.url}}` | Issue or ticket URL | Remove if not tracked |
| `{{design.url}}` | Design document URL | Remove if not applicable |
| `{{spec.url}}` | Specification URL | Remove if not applicable |
| `{{pii|false}}` | Whether PII is handled | Set to `true` when applicable, otherwise delete line |
| `{{security_review_required|false}}` | Security review requirement | Set to `true` or delete if not tracked |
| `{{compliance.items}}` | Compliance scope list | Supply comma-separated items or remove the `compliance_scope` key |

Remove unused keys from the front matter and `<meta>` block rather than leaving placeholder values.

## 3. How to use the universal template
1. Copy `01-universal-template.md` to the target folder and rename to the required filename.
2. Replace all front matter tokens, deleting optional keys you do not use.
3. Update the `<doc>` attributes and `<meta>` links with real values. If a link or attribute is unknown, either mark the section `Not applicable – reason` or remove the element entirely.
4. Keep the XML `<doc>`, `<section>`, `<instructions>`, and `<content>` tags.
5. Write content only inside each `<content><![CDATA[ ... ]]></content>` block.
6. Leave `<instructions>` in place until the doc is approved. Remove them only after approval if you want a cleaner file.
7. Keep the “Specialised tags” block only when you add domain tags; delete the heading and XML comment if unused.

## 4. Section guidance
- **1 Summary**: 3–5 sentences. No roadmap or solutions.
- **2 Context**: Problem, background, constraints, related work.
- **3 Goals**: Measurable outcomes. Keep <=7.
- **4 Non-goals**: Explicit exclusions to prevent scope creep.
- **5 Scope**: In/out lists, boundaries, assumptions plus validation plan.
- **6 Stakeholders and roles**: Table with authority and contact details.
- **7 Requirements**: Functional and non-functional tables with acceptance and ownership.
- **8 Approach**: Preferred method, alternatives considered, trade-offs.
- **9 Structure or design**: Architecture, research plan, or process map. Link diagrams.
- **10 Data**: Entities, ownership, retention, quality rules.
- **11 Interfaces and contracts**: APIs, events, files with auth details.
- **12 Security, privacy, compliance**: Classification, threats, controls, DPIA notes.
- **13 Dependencies**: Inbound/outbound dependencies with risk of lateness.
- **14 Risks and mitigations**: Risk register with owner and status.
- **15 Metrics and acceptance**: KPIs, baselines, targets, acceptance summary.
- **16 Rollout and operations**: Flags, environments, runbooks, SLOs, alerts, support handover.
- **17 Open questions**: Track owner and needed-by date.
- **18 References**: Curated links and citations.
- **19 Change log**: Append row per change with date, version, author.
- **20 Implementation considerations**: Narrative summary of outstanding activities, decisions, dependencies, and resources needed for planning. Avoid checklists unless required.

## 5. Domain tags (optional)
Use the “Specialised tags” block for structured items. Examples:
- API route:
  ```xml
  <route method="POST" path="/api/auth/magic-link" auth="none" tenantScope="n/a"/>
  ```
- Secrets and env:
  ```xml
  <env var="MUX_SIGNING_PRIVATE_KEY" required="true">JWT signing</env>
  <secret name="clerk-secret-key" rotation="180d">Clerk secret</secret>
  ```
- These align with existing tag docs that use `stage`, `task`, `route`, `env`, `secret`, `policy`, `migration`, and `test`.
- If you keep this section, ensure every XML example is wrapped in a matching code fence. If no specialised tags are needed, delete the heading and `<section>` block from the document.

## 6. Quality checks
Before marking approved:
- Front matter tokens resolved.
- All sections populated or marked `Not applicable`.
- Security and privacy reviewed if `pii: true` or `security_review_required: true`.
- Success metrics list targets and data sources.
- Implementation considerations capture remaining activities, decisions, sequencing, and resource needs.
- Change log updated with date and version.
- Links valid and relative.

## 7. File naming and scope
- Keep the provided filenames in each folder.
- Do not use this template for `TASK-TEMPLATE.md` or `ADR-TEMPLATE.md`.
- ADRs follow their own format and index.

## 8. Change control
- Update the Change log section on each edit.
- Use Conventional Commits in the repo.
