<!-- ai:managed start file="docs/playbook/05-project-setup/05-02-coding-standards.md" responsibility="docs" strategy="replace" -->
---
title: "Coding Standards – Motion Mavericks Portal"
doc_path: "docs/playbook/05-project-setup/05-02-coding-standards.md"
doc_type: "standards"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Design Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [standards, coding]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-05-design-system.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Coding Standards – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="standards"
     path="docs/playbook/05-project-setup/05-02-coding-standards.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-05-design-system.md"/>
    <tags>standards, coding</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Coding standards unify Motion Mavericks portal development across frontend, backend, and infrastructure. They ensure maintainability, accessibility, and compliance with residency and audit requirements. Adherence is enforced via tooling described here and CI checks.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal relies on TypeScript, Next.js, Drizzle, and shadcn/ui. Consistent conventions prevent regressions across milestones, tasks, assets, and share link features, while enabling external partners to contribute confidently.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes TypeScript patterns, UI conventions, API definitions, linting, formatting, documentation annotations.
- Excludes repo structure (05-01) and CI pipeline specifics (13-01).
- Assumes developers use VS Code with recommended extensions.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### TypeScript conventions
- Strict mode enabled (`"strict": true`), no `any` unless justified with TODO comment linking to ticket.
- Use `zod` schemas stored in `packages/api-contracts` for request/response validation.
- Prefer discriminated unions over enums for status fields (e.g., `milestoneStatus`).
- Domain models typed via `InferModel` from Drizzle to maintain parity across layers.
- Avoid default exports except Next.js route handlers per framework conventions.

### UI patterns (shadcn/ui + Tailwind)
- Components reside in `packages/ui` with atomic exports; pages compose them.
- Follow design system tokens for colour/spacing; no arbitrary Tailwind values without documented reason.
- Accessibility first: every interactive element includes ARIA labels, focus states per design system, and keyboard handlers.
- Use Radix primitives for complex interactions (dialogs, dropdowns) to ensure accessibility.

### API and backend standards
- Route handlers under `apps/web/src/app/api/...` follow RESTful naming; methods align with operations (GET/POST/PATCH/DELETE).
- Responses use shared `ApiResponse<T>` envelope with `data`, `error`, `meta` fields.
- Errors thrown using custom error classes (`PortalError`) carrying `code`, `status`, `userMessage`.
- Database migrations idempotent, named `YYYYMMDDHHMM_description.ts`; run via pnpm scripts.
- RLS policies versioned alongside schema; test coverage required.

### Linting and formatting
- ESLint extends `@typescript-eslint`, `eslint-config-next`, custom rules for import ordering and accessibility.
- Prettier standard config with 100 character line width.
- Stylelint for CSS-in-JS (Tailwind) ensures consistent class ordering using `tailwindcss` plugin.
- Commit-level lint enforced by Husky pre-commit hook.

### Testing conventions
- Unit tests colocated under `__tests__` using Vitest; file naming `<module>.test.ts`.
- Integration tests under `apps/web/tests/integration`; use unset network to catch unmocked requests.
- Playwright tests describe user journeys (invite→login, milestone update, share view) with fixtures for admin/agency/guest.
- Accessibility tests use `axe-playwright` integration; failing results block merge.

### Documentation annotations
- Source files include JSDoc for exported functions and public components.
- Complex logic annotated with inline comments explaining decisions (avoid restating code).
- All new features reference relevant playbook document in PR description.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [05-05-precommit-and-ci-conventions](05-05-precommit-and-ci-conventions.md)
- [08-05-ui-components](../08-frontend/08-05-ui-components.md)
- [12-01-test-strategy](../12-testing-and-quality/12-01-test-strategy.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [05-04-package-and-dependency-policy](05-04-package-and-dependency-policy.md)
- [07-01-api-style-guide](../07-apis-and-contracts/07-01-api-style-guide.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we formalise hooks naming conventions beyond the current `useFeature` pattern?
- Do we introduce automatic visual regression testing to complement Playwright flows?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- All contributors configure editor settings via `.vscode/extensions.json` provided in repo.
- Resend templates managed as React Email components adhere to coding standards described here.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Engineering onboarding notes (September 2025)
- Accessibility consultant checklists
- Agency feedback on previous inconsistent UI behaviour
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
