<!-- ai:managed start file="docs/playbook/02-requirements-and-scope/02-04-scope-boundaries.md" responsibility="docs" strategy="replace" -->
---
title: "Scope Boundaries – Motion Mavericks Portal"
doc_path: "docs/playbook/02-requirements-and-scope/02-04-scope-boundaries.md"
doc_type: "scope"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Compliance Advisor"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [scope, governance]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Scope Boundaries – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="scope"
     path="docs/playbook/02-requirements-and-scope/02-04-scope-boundaries.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>scope, governance</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document defines the boundaries of the Motion Mavericks MVP, clarifying what features and operational commitments are included, deferred, or subject to de-scoping. It ensures stakeholders align on production management priorities while preserving non-functional targets for availability, residency, and recovery. The structure supports informed trade-offs during delivery.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The refreshed portal focus replaces ad-hoc security work with a comprehensive production management scope spanning milestones, tasks, assets, notifications, and share links. With tight timelines and resource constraints, the team needs explicit guardrails to prevent scope creep and maintain compliance commitments.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- In scope: multi-tenant portal, role-based dashboards, milestone/task hierarchy, asset pipeline, comment threads, notifications, expiring share links, telemetry, AU residency, RPO/RTO rehearsals, accessibility compliance, and onboarding/runbooks.
- Out of scope: enterprise integrations, advanced review tooling, white-labelling, multi-region redundancy, budgeting modules, and marketplace features.
- Assumptions: vendor stack (Vercel, Neon, Mux, Clerk, Resend, Sentry) remains stable; agencies participate in onboarding and reporting cadences.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### In-scope deliverables
- Project setup flows with milestone templates, due dates, and dependencies.
- Task management with status, assignment, completion audit, and notifications.
- Asset ingestion via Mux and Vercel Blob with processing telemetry and signed playback.
- Share link creation with expiry, access codes, analytics, and revocation controls.
- Commenting with mentions, attachments, and audit logging.
- Residency dashboard, backup/recovery procedures, and compliance evidence storage.
- Onboarding kits for Admin, Agency, and Guests; runbooks for incident response and cutover.

### Out-of-scope items
- Automated budget tracking, invoicing, or procurement approvals.
- Native chat, presence, or real-time co-editing features.
- API marketplace or public SDK for agency-custom automation.
- SSO/SCIM integrations and complex role inheritance beyond Admin/Agency/Guest.
- Multi-brand theming or custom domain configuration per agency.
- Active-active multi-region deployments or customer-managed encryption keys.
- Watermarking, DRM overlays, or forensic fingerprinting beyond Mux defaults.

### De-scoping rules
- Any new feature must tie directly to success metrics (SM-01 to SM-07) and not jeopardise non-functional targets.
- If development velocity slips, prioritise completion of onboarding, milestone tracking, asset delivery, and share link controls before collaboration enhancements.
- Non-functional reductions (e.g. lower availability) require approval from Owen and documented remediation plans before deferment.
- New integration requests require cost/benefit analysis demonstrating time savings ≥10% for pilot agencies.

### Assumptions for validation
- Agencies will adopt portal workflows if onboarding completes within two weeks and success metrics are met.
- Client stakeholders accept view-only share links when supported by compliance evidence and digest notifications.
- Reliability partner can meet quarterly restore drills within retainer hours.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [00-01-product-vision](../00-brief-and-vision/00-01-product-vision.md)
- [02-03-non-functional-requirements](02-03-non-functional-requirements.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [02-05-definition-of-done](02-05-definition-of-done.md)
- [18-02-cutover-plan](../18-release-and-cutover/18-02-cutover-plan.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should customer-branded share link experiences be treated as an MVP stretch goal or deferred entirely to post-launch?
- What governance process approves exceptions to residency requirements if a client requests offshore collaboration?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Success metrics remain the primary gating mechanism for release decisions.
- Agencies agree to provide milestone data in portal-compatible formats during cutover.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks roadmap workshops (September 2025)
- Agency partner expectations gathered through interviews
- docs/plan/HighLevel.Final.md scope directives
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
