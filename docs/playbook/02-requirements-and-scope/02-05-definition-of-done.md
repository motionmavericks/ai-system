<!-- ai:managed start file="docs/playbook/02-requirements-and-scope/02-05-definition-of-done.md" responsibility="docs" strategy="replace" -->
---
title: "Definition of Done – Motion Mavericks Portal"
doc_path: "docs/playbook/02-requirements-and-scope/02-05-definition-of-done.md"
doc_type: "process"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Quality Lead", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [process, quality, governance]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Definition of Done – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="process"
     path="docs/playbook/02-requirements-and-scope/02-05-definition-of-done.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>process, quality, governance</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This Definition of Done (DoD) ensures every Motion Mavericks portal increment satisfies engineering, design, QA, security, and documentation standards. The checklists align with success metrics, non-functional targets, and compliance requirements, guaranteeing consistent delivery quality before release.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
With distributed agencies and a lean internal team, Motion Mavericks needs a rigorous DoD to maintain reliability, residency, and accessibility commitments. Each discipline contributes distinct checks so the portal launches with confidence and remains sustainable post-release.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Applies to all features touching onboarding, project tracking, asset delivery, share links, notifications, and operations tooling.
- Encompasses engineering, design, QA, security, and documentation deliverables.
- Excludes speculative experiments executed in isolated sandboxes.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Engineering checklist
1. Code reviewed by at least one engineer or Owen, with comments resolved.
2. Automated tests (unit/integration/E2E) added or updated with >80% coverage for touched modules.
3. Feature flags documented if used, with default states aligned to rollout plan.
4. Performance budgets checked: p95 latency impact validated via profiling or synthetic tests.
5. Multitenancy and RLS checks confirmed with fixtures covering Admin, Agency, and Guest contexts.
6. Telemetry (metrics, logs, traces) instrumented with meaningful tags for residency and playback monitoring.
7. Infrastructure configuration (Vercel/Neon) updated via code, not manual console changes.
8. Secrets, env vars, and access keys validated against `_shared/env-config.final.md`.
9. Migration scripts tested locally and in staging with rollback verified.

### Design checklist
1. UX flows reviewed against personas and journeys, confirming accessibility requirements.
2. Mock-ups or prototypes updated in the design repository with version history.
3. Interactive states (loading, empty, error) documented and validated.
4. Colour contrast, focus order, and keyboard navigation audited per WCAG 2.2 AA.
5. Copy reviewed for Australian English, inclusive language, and declarative tone.
6. Component usage aligns with design system tokens; deviations documented.
7. Asset previews specify fallback imagery and captions where applicable.
8. Responsive behaviour validated for desktop, tablet, and mobile breakpoints.
9. Stakeholder walkthrough completed with recorded feedback and sign-off.

### QA checklist
1. Acceptance criteria scenarios automated or executed manually with evidence stored.
2. Regression suite executed with zero unresolved P1/P2 defects.
3. Cross-browser smoke test (Chrome, Safari, Edge) completed for impacted flows.
4. Accessibility tooling (Axe or equivalent) run with no critical violations.
5. Performance test confirms p95 API latency <300 ms and playback start <3 s in staging.
6. Residency and localisation smoke checks executed to prevent regional leakage.
7. Test data anonymised and tagged for cleanup after runs.
8. Negative cases validated (expired share links, invalid invites, permission blocks).
9. Release candidate tagged with build artefacts and test report linked.

### Security checklist
1. Authentication flows verified for token expiry, magic link one-time use, and logout.
2. Role-based access tests confirm tenancy isolation across Admin, Agency, Guest.
3. Share link generation audited for expiry, passcode, and revocation compliance.
4. Input validation and output encoding reviewed for XSS/CSRF protection.
5. Rate limiting thresholds and alerts validated for abusive traffic scenarios.
6. Dependency scans reviewed; critical vulnerabilities patched or risk accepted with plan.
7. Secrets rotation dates checked and documented if nearing expiry.
8. Audit logs capture the new feature’s critical events with retention tags set.
9. Security review notes filed with mitigation status before release approval.

### Documentation checklist
1. Relevant playbook files updated following the universal template requirements.
2. Change log entry drafted for `docs/playbook/20-03-change-log.md`.
3. Runbooks or onboarding materials updated where workflows change.
4. API and contract documentation refreshed if schemas or endpoints are affected.
5. `_generated/context.json` flagged for regeneration when facts change.
6. Screenshots or screencasts captured for user guides with accessibility annotations.
7. Open questions list reviewed; resolved items removed or updated.
8. Assumptions validated or assigned owners with due dates.
9. References checked for accuracy and relative linking.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [00-01-product-vision](../00-brief-and-vision/00-01-product-vision.md)
- [02-03-non-functional-requirements](02-03-non-functional-requirements.md)
- [15-05-chaos-experiments](../15-observability-and-reliability/15-05-chaos-experiments.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [02-02-acceptance-criteria](02-02-acceptance-criteria.md)
- [16-02-runbooks](../16-documentation-and-training/16-02-runbooks.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should QA include mandatory manual playback testing with assistive technology before each release?
- Do documentation updates require a peer review checklist similar to code reviews?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Each discipline has the capacity to complete all steps before the pilot launch timeline.
- External partners (design, reliability, security) can access required tooling to provide evidence.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks delivery workshops (September 2025)
- Agency partner QA expectations documented in interviews
- docs/plan/HighLevel.Final.md non-functional commitments
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
