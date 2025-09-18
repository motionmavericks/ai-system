<!-- ai:managed start file="docs/playbook/17-go-to-market-and-legal/17-01-pricing-and-packaging.md" responsibility="docs" strategy="replace" -->
---
title: "Pricing and Packaging – Motion Mavericks Portal"
doc_path: "docs/playbook/17-go-to-market-and-legal/17-01-pricing-and-packaging.md"
doc_type: "gtm"
status: "Draft"
version: "0.2.0"
owner: "Client Success Lead"
reviewers: ["Owen (Founder)", "Finance Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [pricing, gtm]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Pricing and Packaging – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="gtm"
     path="docs/playbook/17-go-to-market-and-legal/17-01-pricing-and-packaging.md"
     version="0.2.0"
     status="Draft"
     owner="Client Success Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>pricing, gtm</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document defines Motion Mavericks’ portal pricing and packaging for agency and client rollout. It aligns product value with production management outcomes, covering tiers, feature entitlements, billing, and rollout strategy. Packaging supports Admin, Agency, and Guest roles while accommodating AU residency and compliance requirements.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal replaces fragmented tools with a unified production workspace. Initial launch targets existing agency partners with subscription pricing tied to active productions. Pricing must balance platform costs (Vercel, Neon, Mux) and agency willingness to pay while supporting share links, asset streaming, and collaboration features.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Pricing tiers, inclusions, and overage policies.
- Contracting model (term, payment cadence, bundling with production services).
- Launch incentives and migration plan from legacy processes.
- Excludes detailed financial forecasts (maintained by Finance).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Value proposition
1. Centralised milestone/task visibility for agencies and clients.
2. Secure share links with audit trails and expiry controls.
3. Integrated asset management via Mux with AU ingest.
4. Automated notifications, digests, and access logs for compliance.
5. Reduced manual reporting and email coordination.

### Pricing tiers
| Tier | Monthly fee (AUD) | Included projects | Asset quota | Share link quota | Support | Target customer |
|------|-------------------|-------------------|-------------|------------------|---------|-----------------|
| Launch | $1,250 | Up to 5 concurrent | 500 GB storage, 2 TB streaming | 200 active | Email within 1 business day | Boutique agencies |
| Growth | $2,400 | Up to 12 concurrent | 1.5 TB storage, 6 TB streaming | 500 active | Priority (4 hr) | Mid-size agencies |
| Enterprise | Custom (from $4,500) | Unlimited | Custom (≥3 TB storage) | Unlimited (with fair use) | Dedicated CSM, 24/7 pager | Large agencies, studio groups |

- Additional projects: $180 per project/month on Launch, $150 on Growth.
- Additional storage: $0.28/GB-month; streaming overage aligns with Mux contract.
- Notification overage: $0.008 per email beyond allocation (10k Launch, 25k Growth).

### Contracting
- Standard 12-month agreement with quarterly billing; early renewal discount 10%.
- Onboarding fee $1,000 includes training and data migration.
- Agencies can bundle with Motion Mavericks production services; discount up to 15% for multi-year commitments.

### Feature entitlements
| Capability | Launch | Growth | Enterprise |
|------------|--------|--------|------------|
| Admin seats | 3 | 5 | 10 |
| Agency seats | 20 | 50 | 150 |
| Guest viewers | Unlimited | Unlimited | Unlimited |
| Custom branding | ✓ | ✓ | ✓ with advanced themes |
| API access | — | ✓ (read) | ✓ (read/write) |
| SOC 2 / ISO reports | — | On request | Included |
| Dedicated staging tenant | Shared | Dedicated | Dedicated + sandbox |
| SSO (SAML) | — | Optional add-on | Included |

### Rollout strategy
- **Pilot**: MKTG and two additional agencies on Launch tier; evaluate after 90 days.
- **Expansion**: Offer Growth tier to agencies managing >5 active productions.
- **Enterprise**: Target studio partners requiring custom workflows; roadmap includes white-label options.

### Incentives
- Early adopter discount: 20% off first six months (contract signed by 2025-12-31).
- Referral bonus: 1 month free per referred agency that signs contract (cap 3 months).
- Training bundle: complimentary additional sessions (16-04) for first-year customers.

### Pricing governance
- Review pricing semi-annually; adjust to reflect cost changes (Mux, Neon).
- Finance Lead maintains margin analysis; ensure hardware and software costs covered.
- Communicate price changes with 60-day notice, emphasising roadmap improvements.

### KPIs
- Net revenue retention ≥110%.
- Time-to-value: agencies complete first project setup within 7 days.
- Share link adoption: ≥80% of deliverables shared via portal.
- Support cost per agency ≤$250/month.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [17-04-marketing-launch-plan](17-04-marketing-launch-plan.md)
- [19-05-roadmap-prioritisation](../19-post-launch/19-05-roadmap-prioritisation.md)
- [11-04-compliance-checklist](../11-security-and-compliance/11-04-compliance-checklist.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [17-02-legal-review](17-02-legal-review.md)
- [18-01-release-checklist](../18-release-and-cutover/18-01-release-checklist.md)
- [16-03-support-playbooks](../16-documentation-and-training/16-03-support-playbooks.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we introduce a self-serve tier for smaller production teams post-launch?
- Do we bundle analytics add-ons (custom dashboards) as paid extras or include in Growth tier?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Agencies prefer subscription pricing over per-project billing; validated during pilot interviews.
- Vendor costs remain stable within ±10% of current contracts.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Legacy pricing model notes
- Agency interviews (August 2025)
- Finance cost analysis spreadsheet
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
