<!-- ai:managed start file="docs/playbook/00-brief-and-vision/00-01-product-vision.md" responsibility="docs" strategy="replace" -->
---
title: "Motion Mavericks Product Vision"
doc_path: "docs/playbook/00-brief-and-vision/00-01-product-vision.md"
doc_type: "product-vision"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [vision, production-management, motion-mavericks, agency-collaboration]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Motion Mavericks Product Vision

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="product-vision"
     path="docs/playbook/00-brief-and-vision/00-01-product-vision.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>vision, production-management, motion-mavericks, agency-collaboration</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
The Motion Mavericks portal delivers a single command centre for Admin, Agency, and Guest roles to coordinate every production milestone, task, and asset. It replaces scattered spreadsheets, shared drives, and email approvals with auditable workflows, role-aware navigation, and secure share links. Success means faster onboarding, confident client reviews, and operational discipline across availability, residency, and recovery targets.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Motion Mavericks currently juggles projects across isolated tools, forcing Owen to mediate updates between agency partners and client stakeholders. Agencies such as MKTG lack real-time visibility on milestones, creating duplicated effort, delayed handovers, and risk of missed shoot or delivery dates. Clients receive ad-hoc file shares without traceability, undermining trust and complicating compliance obligations. The refreshed brief mandates a tenant-aware portal with 99.9% availability, AU-first data residency, RPO ≤24 hours, and RTO ≤1 hour to safeguard commercial work while keeping production velocity high.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- In scope: Admin provisioning of agencies, project dashboard, milestone and task hierarchies, asset library with Mux-powered playback, comment threads, in-app and email notifications, and tokenised share links with expiry and optional passwords.
- Non-functional scope: 99.9% monthly availability, p95 API latency <300 ms, p95 TTFB <400 ms across ANZ, p95 video start <3 s on 25 Mbps, WCAG 2.2 AA compliance, audit logging, Australian data residency with documented RPO/RTO drills.
- Supporting scope: KPI telemetry, onboarding guides, and ops playbooks to sustain agency adoption and support rotations after launch.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details
- The portal positions Owen as the Admin who invites agencies, assigns producer leads, and governs cross-project visibility; agencies manage their deliverables while respecting tenant boundaries enforced by Neon row-level policies.
- Each project lifecycle covers brief intake, milestone definition, linked tasks, asset delivery, review cycles, and completion sign-off, surfaced through dashboards and notification digests.
- Share links generate signed, expiring tokens that log opens, playback quality, and feedback, ensuring guests can review content without exposing raw storage.
- Operational guardrails integrate Telemetry (Sentry, analytics dashboards), automated backups, and incident escalation paths to protect continuity while meeting AU Privacy and GDPR commitments.
]]></content>
    </section>

    <section id="value" heading="Value proposition">
      <instructions>List differentiated value propositions.</instructions>
      <content><![CDATA[
## Value proposition
1. **Unified production source of truth**: Centralises milestones, tasks, and deliverable statuses so every stakeholder sees accurate progress without reconciling spreadsheets.
2. **Agency velocity with governance**: Tenant-aware navigation, magic-link onboarding, and audited updates let agency producers operate quickly while Owen retains oversight.
3. **Client-ready share experience**: Expiring, branded share links with playback analytics and optional access codes reduce leakage risk and boost engagement confidence.
4. **Resilient, compliant operations**: Built-in residency controls, recovery playbooks, and WCAG-aligned workflows satisfy procurement and legal checks for enterprise clients.
]]></content>
    </section>

    <section id="non_goals" heading="Non-goals">
      <instructions>Identify what the initiative will not attempt.</instructions>
      <content><![CDATA[
## Non-goals
- Delivering custom production budgeting, invoicing, or resource scheduling modules in the MVP.
- Introducing automated approval routing with timecoded annotations or advanced review tooling.
- Providing deep integrations with Asana, Slack, or other third-party orchestration platforms prior to validation.
- Supporting multi-region active-active deployments or customer-managed encryption keys at launch.
- Offering public-facing marketing sites, discovery feeds, or marketplace capabilities.
- Extending portal theming or white-labelling beyond Motion Mavericks branding in the first release.
]]></content>
    </section>

    <section id="out_of_scope" heading="Out-of-scope">
      <instructions>Detailed exclusions beyond non-goals.</instructions>
      <content><![CDATA[
## Out-of-scope
- Automated import of historical project archives beyond curated CSV uploads handled during cutover.
- SSO, SCIM provisioning, or Just-In-Time account creation for agency partners.
- Watermarking, DRM overlays, or offline download prevention technologies beyond Mux defaults.
- Real-time chat, commenting reactions, or presence indicators within the portal.
- Automated talent or contractor scheduling workflows tied to milestones.
- International data residency options, including EU or US storage, before compliance reviews are complete.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [Legacy MVP plan (context only)](../../specs/legacy-mvp-plan.md)
- [Playbook orchestration guide](../0-templates/03-playbook-docs-orchestration-guide.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [00-02-success-metrics](00-02-success-metrics.md)
- [02-03-non-functional-requirements](../02-requirements-and-scope/02-03-non-functional-requirements.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Confirm rollout order for subsequent agency partners after MKTG and determine contractual onboarding requirements.
- Decide whether client stakeholders require scheduled digest emails in addition to event-driven notifications.
- Validate the need for optional guest download permissions for specific deliverables after pilot feedback.
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Agencies will adopt portal-based milestone updates when given concise training and accountability metrics.
- Client guests prefer view-only share links with optional passcodes over receiving raw file transfers.
- Motion Mavericks can sustain 99.9% availability on the defined Vercel and Neon stack with current budget envelopes.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks portal integrated execution brief (version 0.3.0)
- Legacy MVP security scope (contextual reference)
- Owen’s guidance on agency collaboration pain points (September 2025)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
