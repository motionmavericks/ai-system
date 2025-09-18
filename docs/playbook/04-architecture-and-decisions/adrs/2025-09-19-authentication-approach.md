<!-- ai:managed start file="docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-authentication-approach.md" responsibility="docs" strategy="replace" -->
---
title: "ADR 001 – Authentication Approach"
doc_path: "docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-authentication-approach.md"
doc_type: "adr"
status: "Accepted"
version: "0.1.0"
owner: "Owen (Founder)"
reviewers: ["Security Specialist", "Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [adr, authentication]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../../plan/HighLevel.Final.md"
  design: "../../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# ADR 001 – Authentication Approach

> Status: **Accepted** • Version: **0.1.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="adr"
     path="docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-authentication-approach.md"
     version="0.1.0"
     status="Accepted"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>adr, authentication</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Motion Mavericks will use Clerk’s passwordless magic-link authentication for Admin, Agency, and Guest roles. Sessions are maintained via HttpOnly cookies with SameSite=strict, and optional email verification for guest share links. This approach minimises onboarding friction while supporting compliance and audit needs.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal requires fast onboarding (<5 minutes) and minimal IT overhead for agencies, while enforcing tenancy isolation and auditing. Building bespoke auth would increase risk and time-to-launch. External identity provider must support AU residency options and audit logs.
]]></content>
    </section>

    <section id="decision" heading="Decision">
      <instructions>Document the decision and rationale.</instructions>
      <content><![CDATA[
## Decision
Adopt Clerk as the managed identity provider, using magic-link authentication for all roles. Invitations originate from the portal; Clerk issues one-time links. Sessions last 12 hours with inactivity timeouts. Admins may enable optional passkeys post-MVP. Share links remain separate, secured by signed tokens and optional passcodes.
]]></content>
    </section>

    <section id="consequences" heading="Consequences">
      <instructions>List positive and negative outcomes.</instructions>
      <content><![CDATA[
## Consequences
- **Positive**: Rapid onboarding, proven security baseline, audit logs, built-in email verification, reduced maintenance.
- **Positive**: Integrates with Vercel Edge middleware for protecting routes.
- **Negative**: Dependence on Clerk uptime and pricing; fallback requires business continuity plan.
- **Negative**: Some enterprise clients may request SSO/SCIM; documented as post-MVP consideration.
]]></content>
    </section>

    <section id="alternatives" heading="Alternatives considered">
      <instructions>Document options evaluated.</instructions>
      <content><![CDATA[
## Alternatives considered
1. **Self-hosted auth (NextAuth + custom magic links)** – rejected; higher maintenance, no built-in audit logging.
2. **Okta/enterprise IdP** – rejected for MVP due to setup complexity and cost, misaligned with small agency onboarding.
3. **Password-based accounts** – rejected; increases friction and support overhead.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [04-02-solution-architecture](../04-02-solution-architecture.md)
- [07-03-auth-and-authorisation](../07-apis-and-contracts/07-03-auth-and-authorisation.md)
- [11-01-security-baseline](../11-security-and-compliance/11-01-security-baseline.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [ADR 002 – Multi-tenant Data Model Enforcement](2025-09-19-multi-tenant-data-model.md)
- [02-01-user-stories](../../02-requirements-and-scope/02-01-user-stories.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should Admin accounts require passkeys post-MVP for higher assurance?
- Do government clients mandate integration with their IdP, requiring SSO extensions?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Clerk continues offering AU data residency via regional isolation policies.
- Magic-link UX meets the ≤5 minute onboarding target for agency producers.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Clerk product documentation (September 2025)
- Agency onboarding interviews (September 2025)
- Security advisor recommendations
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
