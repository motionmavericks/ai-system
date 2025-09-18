<!-- ai:managed start file="docs/playbook/05-project-setup/05-04-package-and-dependency-policy.md" responsibility="docs" strategy="replace" -->
---
title: "Package and Dependency Policy – Motion Mavericks Portal"
doc_path: "docs/playbook/05-project-setup/05-04-package-and-dependency-policy.md"
doc_type: "policy"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [dependencies, policy]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-05-design-system.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Package and Dependency Policy – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="policy"
     path="docs/playbook/05-project-setup/05-04-package-and-dependency-policy.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-05-design-system.md"/>
    <tags>dependencies, policy</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This policy governs dependency selection, updates, and monitoring across the Motion Mavericks portal. It minimises supply chain risk, keeps performance predictable, and aligns with compliance commitments. The policy applies to Node packages, Mux SDKs, and infrastructure tooling.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal relies on open-source packages (Next.js, Drizzle, shadcn/ui, TanStack Query) and vendor SDKs. Without defined policies, updates could introduce regressions or security issues, jeopardising uptime and residency guarantees.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- In scope: package approval process, update cadence, auditing, lockfile management.
- Excludes container/runtime dependencies handled by Vercel (managed service).
- Assumes pnpm workspace usage.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Selection criteria
- Prefer maintained packages with ≥90% TypeScript coverage and active releases within past 6 months.
- Evaluate licence compatibility (MIT, Apache 2.0 preferred); reject copyleft licences unless approved by counsel.
- Assess bundle size impact; use Bundlephobia for frontend packages.
- Security review required for packages handling auth, cryptography, or PII.

### Approval workflow
1. Raise issue describing need, alternatives, package popularity, security posture.
2. Obtain thumbs-up from security specialist (for sensitive domains) and technical lead.
3. Add dependency via `pnpm add` on feature branch; update Changeset if package is part of shared workspace.
4. Update documentation if package introduces new patterns.

### Lockfile management
- `pnpm-lock.yaml` is the source of truth; commit with every dependency change.
- Automated CI job ensures lockfile integrity (`pnpm install --frozen-lockfile`).
- Renovate or Dependabot scheduled weekly to open update PRs with aggregated changes.

### Update cadence
- Security patches applied within 72 hours of advisory release.
- Minor updates grouped monthly; major updates planned quarterly with testing plan.
- Vendor SDK updates follow vendor advisories; coordinate with integrations docs.

### Auditing and monitoring
- `pnpm audit` and `npm audit` run in CI; high severity vulnerabilities block merge.
- OWASP dependency-check executed monthly; reports stored in `docs/playbook/11-security-and-compliance/_reports`.
- Snyk optional integration evaluated after pilot.

### Removal policy
- Deprecated packages removed within one release cycle; ensure migrations complete.
- Document reasoning in changelog and notify agencies if behaviour changes.

### Infrastructure tooling
- Drizzle CLI, Turborepo, Playwright versions pinned in `package.json`; upgrade following same cadence.
- GitHub Actions pinned to commit SHAs to prevent supply chain tampering.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [05-02-coding-standards](05-02-coding-standards.md)
- [11-02-secrets-management](../11-security-and-compliance/11-02-secrets-management.md)
- [13-01-ci-pipeline](../13-devops-ci-cd/13-01-ci-pipeline.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [05-05-precommit-and-ci-conventions](05-05-precommit-and-ci-conventions.md)
- [12-01-test-strategy](../12-testing-and-quality/12-01-test-strategy.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we adopt a private package proxy for caching and tamper resistance?
- Do agencies require notice when upstream packages change telemetry behaviour?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Dependabot or Renovate remains operational to surface updates timely.
- Team has capacity to evaluate major updates quarterly without impacting delivery milestones.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Dependency review meeting notes (September 2025)
- OWASP guidance on supply chain security
- Vendor advisory feeds (Mux, Clerk, Resend)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
