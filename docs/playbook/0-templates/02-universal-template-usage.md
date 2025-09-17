---
title: "Template Usage Guide"
doc_path: "docs/playbook/0-templates/02-universal-template-usage.md"
doc_type: "guide"
status: "Draft"
version: "0.5.0"
owner: "Docs"
reviewers: []
last_updated: "2025-09-17"
project: "Motion Mavericks MVP"
tags: [documentation, template]
---

# Template Usage Guide

> Use with `0-templates/01-universal-template.md` for all playbook documentation.

## 1. Why this structure
Industry guidance for modern product documentation and PRDs (Asana 2025, Aha! 2025, Simplexity 2024) recommends capturing: overview, objectives, target users, detailed requirements, risks, success metrics, dependencies, and release checkpoints. The template mirrors those expectations while keeping the XML wrapper so agents can parse content reliably.

## 2. Mandatory practices
- Australian English, declarative tone, and factual statements only.
- Resolve every front-matter field you retain; remove optional keys instead of leaving defaults.
- Keep the XML structure intact: `<doc>`, `<meta>`, `<sections>`, `<section>`, `<instructions>`, `<content><![CDATA[ ... ]]></content>`.
- Populate the required sections below; delete optional sections by removing the entire `<section>` block when not needed.
- Avoid placeholders, “TBD”, or TODO markers.

## 3. Required sections
Always include:
- `## Summary`
- `## Context`
- `## Scope`
- `## Details`
- `## References`

## 4. Optional sections and when to use them
- `## Objectives` – measurable outcomes or success criteria (aligns with PRD overview/objectives best practice).
- `## Users and stakeholders` – target audience and accountable roles.
- `## Requirements` – functional/non-functional requirements with identifiers (Simplexity PRD guidance).
- `## Risks` – material risks and mitigations.
- `## Metrics and acceptance` – success metrics, acceptance tests, release criteria (Aha! checklist).
- `## Dependencies` – external teams or systems required.
- `## Timeline and milestones` – key dates and decision points.
- `## Implementation notes` – sequencing, resourcing, or open decisions.
Remove any section that does not add value for the document you are writing.

## 5. Editing steps
1. Copy the template into the target folder and rename appropriately.
2. Fill the front matter and delete unused keys.
3. Write content inside each `<content><![CDATA[ ... ]]></content>` block.
4. Drop optional sections you do not need by deleting the entire `<section>` element.
5. When automation owns the file, wrap the Markdown body (between front matter and the closing `</doc>`) in:
   ```markdown
   <!-- ai:managed start file="docs/playbook/<path>/<file>.md" responsibility="docs" strategy="replace" -->
   ...
   <!-- ai:managed end -->
   ```
6. Update or append the change log section required by your team (many task list items call for it explicitly).

## 6. Writing standards
- Keep paragraphs short. Use tables for structured data.
- Document assumptions explicitly with a validation plan when facts are inferred.
- Redact sensitive values with `<REDACTED>` or `<PLACEHOLDER>`.
- Reference supporting material with relative paths in `## References`.

## 7. Quick checklist
- [ ] XML structure intact.
- [ ] Required sections populated.
- [ ] Optional sections removed or filled with substantive content.
- [ ] Objectives, users, requirements, risks, metrics, dependencies, and timeline documented when the task list calls for them.
- [ ] References provided and link targets verified.
