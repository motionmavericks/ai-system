<!-- ai:managed start file="docs/playbook/00-brief-and-vision/00-03-stakeholders.md" responsibility="docs" strategy="replace" -->
---
title: "Motion Mavericks Stakeholders"
doc_path: "docs/playbook/00-brief-and-vision/00-03-stakeholders.md"
doc_type: "stakeholder-register"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [stakeholders, governance, collaboration]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-01-personas.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Motion Mavericks Stakeholders

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="stakeholder-register"
     path="docs/playbook/00-brief-and-vision/00-03-stakeholders.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-01-personas.md"/>
    <tags>stakeholders, governance, collaboration</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This register defines who influences, approves, or executes the Motion Mavericks portal rollout. It clarifies decision rights for core roles across Admin, Agency, Client, and specialist partners so accountability is baked into each milestone, task, and asset flow. Maintaining this structure keeps the lean team aligned while scaling agency participation.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal consolidates collaboration between Motion Mavericks, agency producers, and client stakeholders. Given Owen is the sole internal leader, clearly defined responsibilities are essential to avoid bottlenecks, especially when coordinating contracted security, reliability, and compliance specialists required for 99.9% availability, AU residency, and RPO/RTO commitments. This register supplements onboarding packs and runbooks.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Captures stakeholders directly engaged in portal delivery, onboarding, and steady-state operations during 2025 pilot projects.
- Excludes marketing collaborators or investors who review progress but do not influence backlog or release decisions.
- Assumes each external organisation provides a primary and backup contact recorded in contract documents.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details
| Role | Stakeholder/Group | Decision rights | RACI | Contact cadence |
|------|-------------------|-----------------|------|-----------------|
| Portal Admin & Product Lead | Owen (Founder) | Sets roadmap, approves releases, arbitrates scope trade-offs | Accountable | Daily stand-up; weekly status digest |
| Agency Producer Lead | MKTG production lead (named in contract) | Prioritises agency tasks, confirms milestone updates, approves asset readiness | Responsible | Daily during shoots; twice-weekly portal reviews |
| Client Stakeholder | Lead client contact per project | Accepts deliverables, confirms share link access, raises compliance concerns | Consulted | Weekly account call; ad-hoc for approvals |
| Guest Reviewer Delegates | Client-side reviewers added via share links | Provide review feedback within portal, flag playback issues | Informed | Within 48-hour review windows |
| Security Specialist | Contracted security consultancy | Signs off authentication, share link hardening, rate limiting | Responsible | Fortnightly control review; incident-driven escalation |
| Reliability & Operations Partner | External DevOps agency | Owns SLO monitoring, backup drills, incident response | Responsible | Weekly SLO check-in; monthly disaster-recovery rehearsal |
| Compliance & Privacy Advisor | External compliance firm | Validates residency, retention, consent workflows, handles DSARs | Consulted | Monthly compliance touchpoint; per-DSAR engagement |
| Finance & Procurement Support | External bookkeeper | Verifies vendor spend, tracks contract renewals | Consulted | Monthly financial review |
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [Legacy MVP plan (context)](../../specs/legacy-mvp-plan.md)
- [Portal onboarding playbook](../16-documentation-and-training/16-04-onboarding.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [00-01-product-vision](00-01-product-vision.md)
- [02-05-definition-of-done](../02-requirements-and-scope/02-05-definition-of-done.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Confirm backups for agency and compliance roles to ensure continuity during leave or peak shoots.
- Determine whether client stakeholders require direct access to error budget dashboards or curated summaries.
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Agencies agree to twice-weekly milestone reconciliations within the portal; validate in onboarding workshops.
- Compliance advisor can access residency and retention telemetry without breaching client confidentiality clauses.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks portal integrated execution brief (v0.3.0)
- Stakeholder conversations logged by Owen (September 2025)
- Draft agency contracts shared for portal pilot planning
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
