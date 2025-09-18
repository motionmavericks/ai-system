<!-- ai:managed start file="docs/playbook/04-architecture-and-decisions/adrs/README.md" responsibility="docs" strategy="replace" -->
---
title: "ADR Index – Motion Mavericks Portal"
doc_path: "docs/playbook/04-architecture-and-decisions/adrs/README.md"
doc_type: "adr-index"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [adr, index]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../../plan/HighLevel.Final.md"
  design: "../../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# ADR Index – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="adr-index"
     path="docs/playbook/04-architecture-and-decisions/adrs/README.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>adr, index</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This index tracks architectural decisions for the Motion Mavericks portal. It lists ADRs covering authentication, tenancy, asset pipeline, notification delivery, and share link security. The index supports governance, audits, and onboarding of contributors.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The refreshed portal requires clear documentation of decisions affecting security, compliance, and reliability. ADRs provide traceability for implementation and future review, aligning with orchestration guide expectations.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details
| ADR | Title | Status | Date | Owner |
|-----|-------|--------|------|-------|
| [ADR 001](2025-09-19-authentication-approach.md) | Authentication Approach | Accepted | 2025-09-19 | Owen |
| [ADR 002](2025-09-19-multi-tenant-data-model.md) | Multi-tenant Data Model Enforcement | Accepted | 2025-09-19 | Owen |
| [ADR 003](2025-09-19-asset-pipeline-mux.md) | Asset Pipeline with Mux | Accepted | 2025-09-19 | Owen |
| [ADR 004](2025-09-19-notification-delivery-strategy.md) | Notification Delivery Strategy | Accepted | 2025-09-19 | Owen |
| [ADR 005](2025-09-19-share-link-security-controls.md) | Share Link Security Controls | Accepted | 2025-09-19 | Owen |
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [04-02-solution-architecture](../04-02-solution-architecture.md)
- [07-01-api-style-guide](../../07-apis-and-contracts/07-01-api-style-guide.md)
- [11-01-security-baseline](../../11-security-and-compliance/11-01-security-baseline.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [04-04-threat-model](../04-04-threat-model.md)
- [15-03-reliability-engineering](../../15-observability-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Do we require ADRs for analytics instrumentation or can those live within integration docs?
- Should future ADR numbering follow chronological order or thematic grouping?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- New ADRs will be appended with incremental numbering and cross-links updated here.
- All team members review ADRs before implementing significant architectural changes.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Architecture working session minutes (September 2025)
- Orchestration guide templates
- Historical ADR tooling guidance from Motion Mavericks repo
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
