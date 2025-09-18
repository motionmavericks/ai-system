<!-- ai:managed start file="docs/playbook/17-go-to-market-and-legal/17-03-terms-and-privacy.md" responsibility="docs" strategy="replace" -->
---
title: "Terms and Privacy Overview – Motion Mavericks Portal"
doc_path: "docs/playbook/17-go-to-market-and-legal/17-03-terms-and-privacy.md"
doc_type: "legal"
status: "Draft"
version: "0.2.0"
owner: "Legal Counsel"
reviewers: ["Security Specialist", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [terms, privacy]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Terms and Privacy Overview – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="legal"
     path="docs/playbook/17-go-to-market-and-legal/17-03-terms-and-privacy.md"
     version="0.2.0"
     status="Draft"
     owner="Legal Counsel">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>terms, privacy</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This overview documents Motion Mavericks’ portal Terms of Service (ToS) and Privacy Policy. It outlines key commitments, change management process, data residency statements, and user responsibilities across Admin, Agency, and Guest roles. Content supports compliance and informs product/UX copy.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Legal counsel updated ToS and Privacy Policy to reflect portal operations, multi-tenant access, share link usage, and integrations. Policies must be accessible, align with AU Privacy Act/GDPR, and referenced in onboarding, notifications, and support flows. This doc summarises key clauses and operational requirements.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Summary of ToS/Privacy commitments and required UX links.
- Change management and versioning plan.
- Data residency, security, and user obligations.
- Excludes full legal text (stored in `/legal/` repo folder and CMS).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Document access
- ToS URL: `https://motionmavericks.au/legal/portal-terms`.
- Privacy Policy URL: `https://motionmavericks.au/legal/portal-privacy`.
- Latest version: v1.2 (effective 2025-09-30).
- PDF accessible version stored in knowledge base with alt-text for logos.

### Key ToS points
- Defines roles (Admin, Agency, Guest) with access rights and responsibilities.
- Sets availability SLA (99.9%) and recovery commitments (RPO ≤24 h, RTO ≤1 h).
- Outlines acceptable use (no illegal content, respect IP ownership, no credential sharing).
- Provides limitation of liability and indemnity clauses.
- Details support response targets linked to ticket severity.
- Requires agencies to obtain consent from clients when uploading personal data.

### Privacy highlights
- Data residency: primary storage in Australia (Neon syd1, Vercel Sydney where available, backed by Australian-based CDN nodes when possible).
- Data categories: contact info, project metadata, assets (video), audit logs, notification events.
- Legal basis: legitimate interest for production collaboration, consent for marketing email.
- Data subject rights: access, correction, deletion via documented DSR workflow (11-03).
- Retention: project data retained 24 months post completion; audit logs 12 months (extendable for compliance).
- Third-party processors: Mux, Neon, Resend, Clerk, Upstash with DPAs in place.

### Change management
- Version control in Git + CMS; change log entry appended for each update.
- Notify agencies 30 days prior to material changes via email and in-app banner.
- Summaries provided for readability; full legal text accessible for download.

### UX integration requirements
- Footer links: `Terms`, `Privacy`, `Support`, `Status`.
- Onboarding emails include link to policies and summary bullet points.
- Share link landing page displays short privacy notice and support contact.
- Notification digests include link to notification preferences and privacy statement.

### Compliance obligations
- Maintain record of consent for all Admin/Agency/Guest invites.
- Provide contact details for privacy queries (`privacy@motionmavericks.au`).
- Reassess policies annually or when adding new data categories (e.g., analytics).

### Documentation responsibilities
- Legal Counsel owns policy updates.
- Client Success ensures links present across help materials.
- Engineering verifies policy references remain accessible post deployment.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
- [17-02-legal-review](17-02-legal-review.md)
- [16-05-user-guides](16-05-user-guides.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [17-04-marketing-launch-plan](17-04-marketing-launch-plan.md)
- [18-05-launch-comms](../18-release-and-cutover/18-05-launch-comms.md)
- [19-03-feedback-loop](../19-post-launch/19-03-feedback-loop.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Will client-specific terms require bespoke privacy addendums for particular industries (e.g., healthcare)?
- Do we integrate cookie consent banner if analytics expands beyond essential telemetry?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- CMS hosting legal pages supports version history and accessibility features.
- Agencies accept updated terms electronically without wet signatures.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Legal policy drafts v1.2
- OAIC guidance materials
- GDPR controller checklist
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
