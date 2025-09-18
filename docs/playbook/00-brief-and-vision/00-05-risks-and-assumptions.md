<!-- ai:managed start file="docs/playbook/00-brief-and-vision/00-05-risks-and-assumptions.md" responsibility="docs" strategy="replace" -->
---
title: "Motion Mavericks Risks and Assumptions"
doc_path: "docs/playbook/00-brief-and-vision/00-05-risks-and-assumptions.md"
doc_type: "risk-register"
status: "Draft"
version: "0.1.0"
owner: "Owen (Founder)"
reviewers: ["Security Specialist", "Compliance Advisor"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [risks, assumptions, governance]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  ticket: "<PLACEHOLDER>"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
language: "en-AU"
tone: "Declarative"
---

# Motion Mavericks Risks and Assumptions

> Status: **Draft** • Version: **0.1.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="risk-register"
     path="docs/playbook/00-brief-and-vision/00-05-risks-and-assumptions.md"
     version="0.1.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>risks, assumptions, governance</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This register captures critical risks and working assumptions for Motion Mavericks’ production-management portal. It focuses on adoption, data residency, compliance, operational resilience, and share link integrity. Mitigations align with the portal’s non-functional targets—99.9% availability, AU-first residency, WCAG compliance, RPO ≤24 h, and RTO ≤1 h.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
With a single internal owner, Motion Mavericks must rely on disciplined risk management to coordinate agencies, clients, and contracted specialists. The updated brief broadens scope beyond security into project tracking, notifications, and asset delivery, introducing new dependencies. Documenting risks ensures each stakeholder understands escalation triggers and mitigation owners.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Covers MVP development, staging validation, launch, and early post-launch support for Admin, Agency, and Guest experiences.
- Excludes long-term roadmap risks (e.g., marketplace expansion) that will be handled by future reviews.
- Assumes contracted partners retain capacity to deliver mitigations within agreed retainer hours.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details
| ID | Risk | Prob | Impact | RAG | Mitigation | Owner |
|----|------|------|--------|-----|------------|-------|
| R-01 | Agencies delay portal adoption, continuing to rely on spreadsheets | Medium | High | Amber | Run onboarding workshops, enforce twice-weekly portal updates, add onboarding checklist to Definition of Done | Owen (Founder) |
| R-02 | Milestone data incomplete in portal causing missed deadlines | Medium | High | Amber | Implement milestone completion metric, automate reminders, require project health review each Friday | Agency Partner Lead |
| R-03 | Share link tokens leaked or not revoked promptly | Low | High | Amber | Enforce token expiry ≤14 days, add immediate revoke controls, monitor atypical playback patterns | Security Specialist |
| R-04 | AU residency breached by misconfigured storage or CDN | Low | High | Amber | Lock storage regions, monitor residency dashboards, document quarterly audits | Compliance Advisor |
| R-05 | RPO/RTO targets missed during incident | Medium | High | Amber | Schedule quarterly backup restores, document DR runbook, include RPO/RTO checks in release checklist | Reliability Partner |
| R-06 | Notification latency exceeds 60 seconds impacting approvals | Medium | Medium | Amber | Instrument notification delivery metric, add alerting threshold at 45 seconds, include load test for notification spikes | Platform Engineer (contract) |
| R-07 | Accessibility regressions breach WCAG 2.2 AA | Medium | Medium | Amber | Automate Axe scans in CI, book manual audit before launch, add accessibility checks to DoD | Design Lead (external) |
| R-08 | Guest reviewers require download access, creating leak risk | Low | Medium | Green | Capture requirement during pilot feedback, provide secure alternative via managed transfers if absolutely necessary | Client Success Lead |
| R-09 | Vendor pricing shifts push spend beyond ±5% variance | Medium | Medium | Amber | Review vendor invoices monthly, negotiate annual commitments, create contingency buffer in budget | Finance Support |
| R-10 | Webhooks fail to replay, breaking asset processing pipeline | Medium | High | Amber | Implement DLQ with automated retry, add replay runbook, monitor queue depth via dashboards | Reliability Partner |
| R-11 | Multi-agency collaboration introduces conflicting permissions | Low | Medium | Green | Apply tenant-aware access matrix, run permission smoke tests per release, audit logs weekly | Owen (Founder) |
| R-12 | Legal review delays privacy notice approval | Medium | Medium | Amber | Engage legal counsel early, provide draft by 2025-09-25, maintain tracked changes log | Compliance Advisor |
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [Legacy MVP plan (context)](../../specs/legacy-mvp-plan.md)
- [Operational reliability playbook](../15-observability-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [00-04-constraints](00-04-constraints.md)
- [02-05-definition-of-done](../02-requirements-and-scope/02-05-definition-of-done.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Do government clients require additional attestations beyond the documented privacy controls?
- Will agencies need automation to bulk-upload legacy milestones during cutover, increasing operational risk?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Pilot agencies commit to portal usage metrics and provide feedback within agreed timeframes.
- Vendors maintain current regional availability and logging capabilities for residency evidence.
- Contracted specialists remain available during incident rehearsal windows.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks portal integrated execution brief (v0.3.0)
- Stakeholder interviews (August–September 2025)
- Vendor SLA documentation (Vercel, Neon, Mux, Clerk, Resend)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
