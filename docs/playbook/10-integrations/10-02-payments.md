<!-- ai:managed start file="docs/playbook/10-integrations/10-02-payments.md" responsibility="docs" strategy="replace" -->
---
title: "Commercial Considerations – Motion Mavericks Portal"
doc_path: "docs/playbook/10-integrations/10-02-payments.md"
doc_type: "integration"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Finance Support", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [commercial, integrations]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Commercial Considerations – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="integration"
     path="docs/playbook/10-integrations/10-02-payments.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>commercial, integrations</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Payments are out of scope for the Motion Mavericks MVP. This document records commercial considerations, placeholders for future invoicing integration, and the plan for manual processes during pilot. It ensures stakeholders understand current limitations and future paths.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Motion Mavericks currently manages invoicing and agency billing outside the portal (Xero, manual reconciliations). MVP focuses on production management; implementing payment rails would delay launch and add compliance overhead. Documenting deferral avoids confusion.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Defines existing manual billing workflow, placeholders for future integrations, and guardrails for referencing commercial data inside portal.
- Explicitly states that no payment processing, invoicing, or quoting occurs in MVP.
- Assumes external finance tools remain authoritative source of truth.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Current process (manual)
1. Owen generates estimates and invoices via Xero; agencies receive PDF invoices via email.
2. Project budgets tracked in spreadsheets; portal references project codes but not financial amounts.
3. Payment status communicated manually through weekly check-ins; not reflected in portal UI.
4. Expenses (contractor fees, Mux charges) reconciled monthly by finance support service.

### Portal placeholders
- Project entity includes optional `externalReference` (Xero invoice ID) for cross-linking; hidden from agency/client users.
- Settings page displays note: “Billing managed externally; contact Owen for invoice support.”
- Notification templates avoid referencing amounts, focusing on deliverables and approvals.

### Future integration roadmap (post-MVP)
- Potential integrations: Xero API for invoice status, Stripe for payment collection, or agency-specific portals.
- Requirements gathering scheduled after pilot to assess automation value and compliance cost.
- Any financial integration will require updated security/privacy review and potential PCI considerations.

### Governance
- Finance support retains authority for billing; portal documentation must not imply automated payments.
- Portal analytics exclude financial metrics; success metrics focus on production efficiency.

### Risks & mitigations
- **Risk**: Stakeholders expect billing automation. **Mitigation**: Communicate limitations in onboarding materials and portal UI.
- **Risk**: Manual process leads to data mismatch. **Mitigation**: Weekly reconciliation meeting; store notes in project overview.

### Communication
- Include statement in product vision and onboarding guides clarifying out-of-scope status.
- For future integrations, maintain ADR and update change log.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [00-04-constraints](../00-brief-and-vision/00-04-constraints.md)
- [00-05-risks-and-assumptions](../00-brief-and-vision/00-05-risks-and-assumptions.md)
- [16-05-user-guides](../16-documentation-and-training/16-05-user-guides.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [17-01-pricing-and-packaging](../17-go-to-market-and-legal/17-01-pricing-and-packaging.md)
- [18-04-rollback-plan](../18-release-and-cutover/18-04-rollback-plan.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do agencies expect portal-based cost tracking before we roll out to additional partners?
- Should we provide API hooks for exporting project metadata to finance tools ahead of full integration?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Manual billing process remains viable through MVP pilot.
- Clients accept invoices delivered outside the portal with references to project codes.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Finance support consultation (September 2025)
- Client procurement feedback on billing expectations
- Motion Mavericks operations plan
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
