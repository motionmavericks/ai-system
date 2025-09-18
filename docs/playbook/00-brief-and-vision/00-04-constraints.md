<!-- ai:managed start file="docs/playbook/00-brief-and-vision/00-04-constraints.md" responsibility="docs" strategy="replace" -->
---
title: "Motion Mavericks Constraints"
doc_path: "docs/playbook/00-brief-and-vision/00-04-constraints.md"
doc_type: "constraint-pack"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Compliance Advisor"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [constraints, governance, compliance]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  ticket: "<PLACEHOLDER>"
  design: "../03-ux-and-design/03-03-information-architecture.md"
language: "en-AU"
tone: "Declarative"
---

# Motion Mavericks Constraints

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="constraint-pack"
     path="docs/playbook/00-brief-and-vision/00-04-constraints.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>constraints, governance, compliance</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
The Motion Mavericks portal must launch inside tight time, budget, technical, and regulatory guardrails. These constraints ensure the unified production-management experience delivers reliable milestones, AU data residency, rapid recovery, and compliant share links without overspending. They guide trade-offs across Admin, Agency, and Guest workflows.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Owen manages production engagements solo while coordinating agency partners and client stakeholders. The refreshed brief commits to 99.9% availability, AU-first residency, WCAG 2.2 AA compliance, and RPO/RTO targets. With limited internal bandwidth, constraints provide a shared rulebook for external specialists and protect the launch timeline aligned to the 2025-10-15 enterprise review.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Applies to portal design, engineering, QA, security, compliance, documentation, and release activities through pilot completion.
- Excludes speculative enhancements (e.g. marketplace features, multi-region expansion) that sit outside MVP agreements.
- Assumes contracted partners operate within these limits and escalate breaches immediately.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details
Constraints are grouped into time, budget, technical, and regulatory categories to inform planning, sequencing, and risk reviews.
]]></content>
    </section>

    <section id="time" heading="Time">
      <instructions>Document time constraints.</instructions>
      <content><![CDATA[
## Time
- Pilot-ready portal demo due 2025-09-30 for agency walkthroughs; allows a fortnight for remediation before 2025-10-15 enterprise review.
- Disaster-recovery drill (backup restore + failover) must complete by 2025-10-05 to evidence RPO ≤24 h and RTO ≤1 h.
- Accessibility audit sign-off scheduled for 2025-10-03; any WCAG gaps trigger immediate fix window capped at three working days.
- Change freeze begins 2025-10-08 except for severity-one fixes approved by Owen and reliability partner.
]]></content>
    </section>

    <section id="budget" heading="Budget">
      <instructions>Document budget constraints.</instructions>
      <content><![CDATA[
## Budget
- Operate within current vendor plans: Vercel Pro, Neon Business AU, Mux Pro Reseller, Clerk Pro, Resend Business, Sentry Team.
- Maintain total monthly spend variance within ±5% of forecast; overages demand written rationale and approval before invoicing.
- Agency retainers capped at 20 hours/month per specialist practice; extra work requires change request signed by Owen.
- Avoid introducing new paid tooling unless it replaces an existing vendor at net-neutral cost.
]]></content>
    </section>

    <section id="technical" heading="Technical">
      <instructions>Document technical constraints.</instructions>
      <content><![CDATA[
## Technical
- Deploy exclusively on Vercel (ANZ edge) with Neon (Sydney) for AU residency; no multi-region replication prior to validation.
- Enforce role-based access using Clerk magic links, Neon RLS, and signed share tokens; no bypass mechanisms permitted.
- Maintain p95 API latency <300 ms and video start <3 s measured in Sydney; breaches trigger incident response runbook.
- Instrument observability through Sentry, Vercel Analytics, and custom dashboards; additional agents require security review.
]]></content>
    </section>

    <section id="regulatory" heading="Regulatory">
      <instructions>Document regulatory constraints.</instructions>
      <content><![CDATA[
## Regulatory
- Comply with Australian Privacy Principles and GDPR, including DSAR responses within 30 days and consent logging for guest viewers.
- Store production data, audit logs, and backups within Australian regions unless legal counsel approves exceptions.
- Implement retention policies: 90-day application logs, 365-day audit logs, and share link tokens expiring within 14 days unless extended by client agreement.
- Provide legal-reviewed privacy notice and share link terms before onboarding first guest reviewer.
]]></content>
    </section>

    <section id="implications" heading="Implications">
      <instructions>Describe consequences of constraints.</instructions>
      <content><![CDATA[
## Implications
- Sequencing prioritises foundational platform stability and compliance evidence before feature enhancements.
- Budget ceilings necessitate automation for onboarding, reporting, and telemetry to minimise manual agency labour.
- Technical guardrails restrict experimentation with unvetted services; proofs-of-concept must run in isolated sandboxes.
- Regulatory duties drive documentation overhead (DSAR process, audit trails) that informs Definition of Done checklists.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [Legacy MVP plan (context)](../../specs/legacy-mvp-plan.md)
- [Security and privacy baseline](../../plan/HighLevel.Final.md#security)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [00-05-risks-and-assumptions](00-05-risks-and-assumptions.md)
- [02-03-non-functional-requirements](../02-requirements-and-scope/02-03-non-functional-requirements.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Confirm whether enterprise review requires independent penetration test evidence before launch.
- Determine if share link retention policy must vary for government clients with stricter archival needs.
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Vendor SLAs quoted today remain accurate through launch; monitor for policy changes fortnightly.
- Agencies can meet retainer hour caps while delivering required drills and documentation outputs.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks portal integrated execution brief (v0.3.0)
- Contract discussions with MKTG and compliance advisor (September 2025)
- Vendor SLA documentation (Vercel, Neon, Mux, Clerk) reviewed August–September 2025
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
