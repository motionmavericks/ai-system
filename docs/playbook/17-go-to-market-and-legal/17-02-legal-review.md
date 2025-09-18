<!-- ai:managed start file="docs/playbook/17-go-to-market-and-legal/17-02-legal-review.md" responsibility="docs" strategy="replace" -->
---
title: "Legal Review Summary – Motion Mavericks Portal"
doc_path: "docs/playbook/17-go-to-market-and-legal/17-02-legal-review.md"
doc_type: "legal"
status: "Draft"
version: "0.2.0"
owner: "Legal Counsel"
reviewers: ["Security Specialist", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [legal, compliance]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Legal Review Summary – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="legal"
     path="docs/playbook/17-go-to-market-and-legal/17-02-legal-review.md"
     version="0.2.0"
     status="Draft"
     owner="Legal Counsel">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>legal, compliance</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This summary captures counsel review of Motion Mavericks’ portal covering contracts, privacy, data residency, intellectual property, and risk mitigations. Findings ensure Admin, Agency, and Guest workflows comply with Australian Privacy Act, GDPR, and contractual commitments with production partners.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal centralises sensitive production data and relies on third-party services (Mux, Neon, Resend, Clerk). Legal review validates licensing, data processing agreements, and user terms, ensuring share link distribution, asset storage, and notifications meet regulatory requirements. Contracts must address AU residency, RPO/RTO, and access rights.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Assessment of master services agreements, privacy policy, and terms of service.
- Data processing agreements (DPAs) with third-party providers.
- Regulatory considerations: AU Privacy Act, GDPR, spam compliance, IP rights.
- Excludes corporate governance matters outside portal operations.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Key findings
| Area | Summary | Status | Owner |
|------|---------|--------|-------|
| Master services agreement | Updated to include portal scope, uptime commitments (99.9%), RPO/RTO clauses, liability caps aligned with production value | Approved | Legal Counsel |
| Privacy policy | Expanded to cover portal data flows, share link tracking, data subject rights, AU residency statement | Drafted – awaiting publication | Legal Counsel |
| Terms of service | Clarified role definitions (Admin, Agency, Guest), acceptable use, audit rights | Approved | Legal Counsel |
| DPAs | Signed with Mux, Neon, Resend, Clerk, Upstash including SCCs and AU residency notes | Approved | Security Specialist |
| Intellectual property | Portal retains Motion Mavericks IP; agencies hold rights to uploaded assets; license granted for operational use | Approved | Legal Counsel |
| Spam compliance | Notification digests include unsubscribe links, preference centre documented | Approved | Client Success Lead |
| Accessibility/legal obligations | Terms accessible in WCAG compliant format; translation plan for key markets | In progress | UX Lead |

### Outstanding actions
- Publish updated privacy policy and terms before go-live (17-03).
- Add clause for optional guest download (if enabled post-MVP) – pending product decision.
- Review consent wording in onboarding emails to ensure clarity on data usage.
- Finalise incident notification template referencing OAIC reporting requirements.

### Risk mitigation
- Maintain compliance register (11-04) with evidence of reviews and DPAs.
- Schedule annual legal review to align with service updates and new agency contracts.
- Include indemnification clause covering misuse of share links by agency users.

### Contractual dependencies
- Agency contracts require addendum accepting portal usage terms.
- Client statements of work reference portal as primary collaboration tool.
- Insurance coverage reviewed to cover cyber liability associated with portal.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [17-03-terms-and-privacy](17-03-terms-and-privacy.md)
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
- [11-04-compliance-checklist](../11-security-and-compliance/11-04-compliance-checklist.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [17-01-pricing-and-packaging](17-01-pricing-and-packaging.md)
- [18-02-cutover-plan](../18-release-and-cutover/18-02-cutover-plan.md)
- [20-03-change-log](../20-archive-and-postmortems/20-03-change-log.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we require additional contractual assurance for agencies storing sensitive client PII within asset metadata?
- Should we introduce standard contract clause for optional guest password protection once implemented?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Third-party vendors will notify Motion Mavericks of material changes to their terms with 30-day notice.
- Agencies accept updated terms prior to portal access.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Legal counsel memo (September 2025)
- DPAs signed with vendors
- OAIC guidance on notifiable data breaches
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
