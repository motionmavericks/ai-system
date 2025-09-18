<!-- ai:managed start file="docs/playbook/01-discovery-and-research/01-02-competitor-analysis.md" responsibility="docs" strategy="replace" -->
---
title: "Competitor Analysis – Production Portals"
doc_path: "docs/playbook/01-discovery-and-research/01-02-competitor-analysis.md"
doc_type: "competitive-analysis"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [research, competitor, strategy]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Competitor Analysis – Production Portals

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="competitive-analysis"
     path="docs/playbook/01-discovery-and-research/01-02-competitor-analysis.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>research, competitor, strategy</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This analysis compares Motion Mavericks with three leading collaboration tools used by agencies: Frame.io, Asana, and Monday.com. It evaluates capability gaps across milestones, asset review, share links, notifications, permissions, and residency commitments. The findings reinforce differentiation opportunities for Motion Mavericks, guiding roadmap and messaging decisions.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Agencies currently stitch together project tracking, asset review, and communications across multiple platforms. Frame.io excels at video review but lacks full project governance, while Asana and Monday.com handle tasks but fall short on secure playback and residency assurances. Motion Mavericks needs a unified alternative that addresses both production logistics and compliant asset delivery for ANZ clients.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Compares production-collaboration capabilities relevant to Admin, Agency, and Guest roles.
- Focuses on default functionality; marketplace integrations or enterprise add-ons are excluded.
- Evaluates tools based on publicly available documentation and agency partner interviews.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Capability comparison
| Capability | Motion Mavericks (Target) | Frame.io | Asana | Monday.com |
|------------|---------------------------|----------|-------|------------|
| Milestone & task tracking | Hierarchical milestones/tasks with status roll-ups and audit history | Basic project folders; no milestone hierarchy | Strong task/section structure, lacks asset linkage | Robust boards but no native asset audit | 
| Asset review & playback | Mux-backed playback, signed URLs, asset lifecycle tied to milestones | Best-in-class video review, limited task context | Requires external storage integrations, no native playback | File preview only; no advanced video pipeline |
| Share links & guest access | Tokenised links with expiry, optional passcodes, view-only guests | Share links, watermarking; limited to asset review | Public share links without granular expiry controls | Shareable dashboards; permission granularity weak |
| Notifications & digests | In-app feed + email digests tuned to milestones and tasks | Asset-centric notifications, no project health digests | Task notifications configurable but noisy | Automations configurable; lacks role-aware digests |
| Permissions & tenancy | Multi-tenant model with Neon RLS, agency scoping, audit logs | Workspace-based; no tenant isolation | Project-based permissions; guests limited | Workspace permissions; no per-client tenant boundaries |
| Residency & compliance | AU-first residency, documented RPO/RTO, privacy notices reviewed | Hosts in US/EU; AU residency by request only | Global hosting, no AU assurance | Global hosting, requires enterprise upgrade for regional control |
| Recovery objectives | RPO ≤24 h, RTO ≤1 h with rehearsed runbooks | Enterprise plan only, no public RTO commitment | Backup features limited; no published RPO/RTO | No published RPO/RTO guarantees |

### Differentiation gaps (≥5)
1. **Integrated milestone-to-asset linkage**: Competitors either manage tasks or assets, not both within the same workflow.
2. **Australian data residency**: None of the compared tools guarantee AU storage without enterprise negotiations.
3. **Operational resilience transparency**: Published RPO/RTO commitments are absent elsewhere, creating a trust gap Motion Mavericks can fill.
4. **Role-aware notifications**: Current tools deliver either asset or task notifications; none blend milestone health with share link events.
5. **Guest experience governance**: Expiring, passcode-protected share links with audit trails are unique compared with generic public shares.
6. **Tenant isolation for agencies**: Motion Mavericks’ multi-tenant enforcement prevents cross-client data exposure, unlike workspace-per-project setups.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- Frame.io, Asana, Monday.com public product documentation (accessed September 2025)
- [Agency onboarding playbook](../16-documentation-and-training/16-04-onboarding.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [01-01-market-research](01-01-market-research.md)
- [01-03-user-interviews](01-03-user-interviews.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should Motion Mavericks prioritise publishing regional compliance attestations to counter enterprise positioning by Frame.io and Monday.com?
- Do agencies require integration with existing task tools (e.g. Asana) for gradual migration, or is a full replacement viable?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Agencies will value a platform that combines milestone governance with asset delivery enough to consolidate existing tools.
- Public documentation remains accurate regarding residency and RPO/RTO commitments; verify during vendor due diligence if required.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Agency partner interviews (MKTG, September 2025)
- Vendor product pages and trust centres (Frame.io, Asana, Monday.com, accessed September 2025)
- Motion Mavericks operational requirements (docs/plan/HighLevel.Final.md)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
