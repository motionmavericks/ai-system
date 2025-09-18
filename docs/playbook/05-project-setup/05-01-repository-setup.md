<!-- ai:managed start file="docs/playbook/05-project-setup/05-01-repository-setup.md" responsibility="docs" strategy="replace" -->
---
title: "Repository Setup – Motion Mavericks Portal"
doc_path: "docs/playbook/05-project-setup/05-01-repository-setup.md"
doc_type: "process"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [repository, setup]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Repository Setup – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="process"
     path="docs/playbook/05-project-setup/05-01-repository-setup.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>repository, setup</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide defines the Motion Mavericks portal repository structure, branch strategy, and release versioning. The repo must support coordinated work across Admin, Agency, and Guest features while enforcing CI quality gates aligned with non-functional targets. The setup emphasises automation and auditability for compliance.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal is delivered from a single mono-repo (`ai-system`) using pnpm, Next.js, and shared packages that span API, UI, and infrastructure code. Teams need predictable branching, semantic versioning for shared packages, and enforceable checks that maintain availability, residency, and accessibility commitments.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- In scope: repository layout, branch model, PR requirements, tagging/versioning, tooling initialisation.
- Out of scope: individual package coding standards (covered in 05-02) and environment secrets (05-03).
- Assumes GitHub as remote host and Vercel + Neon as deployment targets.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Directory structure
```
/
├── apps/
│   ├── web/              # Next.js 15 portal (App Router)
│   └── worker/           # Background job handlers (Vercel functions)
├── packages/
│   ├── api-contracts/    # Zod schemas shared between frontend/backends
│   ├── config/           # Shared config (feature flags, constants)
│   ├── monitoring/       # SLO helpers, logging adapters
│   └── ui/               # Shared component library (shadcn tokens)
├── docs/
│   └── playbook/         # Current documentation set
├── scripts/              # Automation, DB migrations, seeding
└── drizzle/              # Migration files generated via Drizzle kit
```

### Branch model
- `main` (protected): always deployable, mirrors production.
- `develop` (optional) disabled; small team works off `main` via feature branches.
- Feature branches named `feature/<ticket>-short-desc`.
- Release branches created as needed for major milestones (`release/0.3.0`).
- Hotfix branches `hotfix/<issue>` targeting `main` with back-merge to feature branches when necessary.

### Pull request requirements
- PR template enforced via `.github/pull_request_template.md` summarising scope, tests, and open questions.
- Required checks: lint (eslint, prettier), typecheck, unit tests, integration tests, Playwright E2E, accessibility (axe-check), build.
- All PRs require at least one reviewer (Owen or delegated lead) and passing status checks.
- PRs must reference documentation updates (playbook) before merge when relevant.

### Semantic versioning
- Shared packages under `packages/` use semver; release process increments versions via Changesets.
- Portal releases follow `vMajor.Minor.Patch`; patch releases for fixes, minor for new features, major for breaking contract changes.
- Tags pushed to GitHub (`v0.3.0`) trigger release notes and optional preview deployments.

### Tooling setup
- pnpm workspace with `pnpm install` to bootstrap.
- Turborepo pipeline configured to cache build/test outputs across CI and local to speed iteration.
- Husky-managed git hooks (pre-commit lint, test selection, etc.) defined in 05-05.
- `.nvmrc` pinned to LTS Node version consistent with Vercel runtime.

### Access control
- GitHub repo requires 2FA for all collaborators.
- Branch protections: no force pushes to `main`, linear history off, rebase merges preferred.
- Secrets committed only through secure storage (no `.env` files tracked).
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [05-02-coding-standards](05-02-coding-standards.md)
- [13-01-ci-pipeline](../13-devops-ci-cd/13-01-ci-pipeline.md)
- [High-level portal brief](../../plan/HighLevel.Final.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [05-03-environments-and-secrets](05-03-environments-and-secrets.md)
- [05-05-precommit-and-ci-conventions](05-05-precommit-and-ci-conventions.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Do we need a long-lived staging branch for agency demos, or will deploy previews suffice?
- Should we automate tag creation via Changesets or keep manual gating for now?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Contributors can run pnpm/Turborepo locally with Node LTS and corepack enabled.
- The team size stays small enough that feature branches plus PR reviews maintain quality without develop branch.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Repository audit (September 2025)
- DevOps consultation with reliability partner
- Changesets documentation
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
