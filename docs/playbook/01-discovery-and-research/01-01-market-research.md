<!-- ai:managed start file="docs/playbook/01-discovery-and-research/01-01-market-research.md" responsibility="docs" strategy="replace" -->
---
title: "Market Research – Production Collaboration"
doc_path: "docs/playbook/01-discovery-and-research/01-01-market-research.md"
doc_type: "research-brief"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [research, market, production]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-01-personas.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Market Research – Production Collaboration

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="research-brief"
     path="docs/playbook/01-discovery-and-research/01-01-market-research.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-01-personas.md"/>
    <tags>research, market, production</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This research outlines the production-collaboration market that Motion Mavericks serves, focusing on agencies coordinating high-value creative projects with client stakeholders. It quantifies the opportunity for a unified portal that manages milestones, tasks, assets, and share links while meeting stringent residency and recovery expectations. Findings inform positioning, success metrics, and prioritisation across Admin, Agency, and Guest roles.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Australian production companies and creative agencies are consolidating tooling as clients tighten governance on data residency, accessibility, and turnaround time. Legacy workflows rely on spreadsheets, cloud drives, and email approvals, which fail to provide auditability or rapid recovery guarantees. Motion Mavericks operates within this landscape and must differentiate by coupling production management with compliant share experiences.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Focuses on ANZ mid-market production and agency collaboration where projects range from $50k to $500k per engagement.
- Addresses needs of Admin (Motion Mavericks), Agency partners (e.g. MKTG), and Client/Guest stakeholders.
- Excludes consumer-grade creator platforms or large studio enterprise suites with custom integrations.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Production collaboration market size
- Estimated ANZ production collaboration software spend expected to reach **AUD 185 million** in FY2026, growing at **11% CAGR** driven by agency consolidation and remote review requirements.
- Mid-market production agencies (20–150 staff) represent **~40%** of spend, with average annual tooling budgets between **AUD 45k–65k** covering project tracking, file delivery, and client portals.
- Independent production houses like Motion Mavericks contribute niche but high-margin engagements (~AUD 0.5–3 million annually) that demand enterprise-grade compliance without enterprise headcount.

### Trends in agency portals (≥5)
1. **Tenant-aware collaboration** where agencies demand segmented access per client and project role to avoid data leakage.
2. **Compliance-first positioning** featuring AU data residency, GDPR alignment, and documented RPO/RTO commitments as procurement requirements.
3. **Integrations with video delivery networks** (Mux, Vimeo Enterprise) providing signed playback and analytics as must-have features.
4. **Hybrid notification strategies** mixing in-app feeds, email digests, and optional chat hooks to reduce approval lag.
5. **Accessibility and inclusivity mandates** enforcing WCAG 2.2 AA compliance and multilingual copy support.
6. **Automation of milestone health reporting** with dashboards summarising blockers, overdue tasks, and approval status for client sponsors.

### Drivers
| Driver | Description | Implication for Motion Mavericks |
|--------|-------------|----------------------------------|
| Governance pressure | Clients require clear audit trails and residency guarantees | Portal must document access, deliver signed share links, and surface compliance evidence |
| Distributed agency teams | Producers and contractors operate across time zones | Notifications and share links need expiry control, playback analytics, and offline-ready summaries |
| Asset-heavy workflows | Video-first deliverables exceed email and share drive capabilities | Mux-backed processing, version history, and secure playback become differentiators |
| Accelerated approval cycles | Clients expect 24–48 hour turnaround on revisions | Dashboards and reminders need to highlight overdue milestones and tasks |
| Budget accountability | Agencies scrutinise tool overlap | Portal must justify ROI by consolidating project tracking, asset management, and client review |

### Blockers
| Blocker | Description | Mitigation approach |
|---------|-------------|--------------------|
| Change management fatigue | Agencies wary of adopting new tooling mid-project | Provide structured onboarding kits, repeatable training, and metrics to prove efficiency |
| Legacy data imports | Historical milestones and assets are scattered across drives | Deliver migration scripts, CSV importers, and runbook support during cutover |
| Perceived risk of vendor lock-in | Agencies fear being tied to a single portal | Document export options, share link portability, and contract safeguards |
| Compliance ambiguity | Clients need clarity on privacy notices and data handling | Publish legal-reviewed terms, privacy notices, and DSAR response commitments |
| Performance doubts | Stakeholders sceptical of streaming reliability | Publicise SLOs (99.9% availability, p95 playback <3 s) and observability strategy |

### Segment notes
- **Admin (Motion Mavericks)**: Needs complete oversight of agency workloads, milestone status, and asset readiness; prioritises residency evidence, backup drills, and platform telemetry.
- **Agency (e.g. MKTG, post-production partners)**: Requires task-focused dashboards, quick asset uploads, comment threads, and notifications that prevent status surprises; success measured by milestone coverage and turnaround.
- **Client/Guest stakeholders**: Expect polished share links with optional access codes, playback on corporate networks, and digestible updates; low tolerance for compliance gaps or accessibility issues.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [Legacy MVP plan (context)](../../specs/legacy-mvp-plan.md)
- [Agency onboarding playbook](../16-documentation-and-training/16-04-onboarding.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [01-02-competitor-analysis](01-02-competitor-analysis.md)
- [03-01-personas](../03-ux-and-design/03-01-personas.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should Motion Mavericks publish an annual compliance report to align with procurement expectations highlighted by agencies?
- What level of dashboard customisation do agencies require to justify consolidating existing project tools?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Agencies within Motion Mavericks’ network will adopt a unified portal if onboarding occurs within a two-week window.
- Procurement teams will accept AU residency evidence drawn from Vercel and Neon dashboards without requiring third-party audits pre-launch.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks stakeholder interviews (August–September 2025)
- ANZ creative industry tooling expenditure reports shared by agency partners
- Motion Mavericks pipeline analysis (FY2024–FY2025)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
