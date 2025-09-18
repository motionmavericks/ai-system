<!-- ai:managed start file="docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-multi-tenant-data-model.md" responsibility="docs" strategy="replace" -->
---
title: "ADR 002 – Multi-tenant Data Model Enforcement"
doc_path: "docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-multi-tenant-data-model.md"
doc_type: "adr"
status: "Accepted"
version: "0.1.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [adr, data, tenancy]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../../plan/HighLevel.Final.md"
  design: "../../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# ADR 002 – Multi-tenant Data Model Enforcement

> Status: **Accepted** • Version: **0.1.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="adr"
     path="docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-multi-tenant-data-model.md"
     version="0.1.0"
     status="Accepted"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>adr, data, tenancy</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
We will enforce multi-tenancy using Neon PostgreSQL row-level security (RLS) with tenant-scoped keys and service-layer context. Every query includes tenant_id derived from authenticated session claims. This preserves agency isolation and supports audit logging.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Motion Mavericks manages multiple agencies and clients within a single portal. Prior workflows risked cross-project data leaks. The solution must maintain isolation while supporting cross-tenant admin oversight and share link distribution.
]]></content>
    </section>

    <section id="decision" heading="Decision">
      <instructions>Document the decision and rationale.</instructions>
      <content><![CDATA[
## Decision
Apply tenant_id to all user, project, milestone, task, asset, comment, share_link, and notification tables. Enable RLS policies enforcing tenant_id match for SELECT/UPDATE/DELETE, with Admin role allowed cross-tenant only where explicitly granted. Middleware injects tenant_id context on every request, validated against Clerk session claims.
]]></content>
    </section>

    <section id="consequences" heading="Consequences">
      <instructions>List positive and negative outcomes.</instructions>
      <content><![CDATA[
## Consequences
- **Positive**: Strong isolation reduces accidental leaks, simplifies compliance audits.
- **Positive**: Supports extension to multi-agency scaling without schema redesign.
- **Negative**: Requires careful seeding and testing to avoid missing tenant filters.
- **Negative**: Cross-tenant admin actions need explicit bypass policies, increasing complexity.
]]></content>
    </section>

    <section id="alternatives" heading="Alternatives considered">
      <content><![CDATA[
## Alternatives considered
1. **Separate databases per tenant** – rejected due to operational overhead, cost, and reporting complexity.
2. **Application-level filtering without RLS** – rejected; higher risk of developer error.
3. **Hybrid approach (shared + tenant-specific schemas)** – rejected for MVP; consider post-launch if tenancy scale demands.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [06-01-schema-design](../../06-data-model-and-storage/06-01-schema-design.md)
- [04-03-data-flows](../04-03-data-flows.md)
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [ADR 001 – Authentication Approach](2025-09-19-authentication-approach.md)
- [09-01-service-boundaries](../../09-backend/09-01-service-boundaries.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do compliance stakeholders require per-tenant encryption keys in future iterations?
- Should we add tenant-level rate limits beyond global thresholds to prevent resource hogging?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Neon RLS performance meets latency targets; monitor and optimise indexes accordingly.
- Admin cross-tenant views are limited to reporting contexts with explicit policies.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Neon RLS documentation
- Security advisor recommendation for tenant isolation
- Historical incidents involving cross-project leakage in legacy tools
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
