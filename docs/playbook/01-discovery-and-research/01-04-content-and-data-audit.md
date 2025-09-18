<!-- ai:managed start file="docs/playbook/01-discovery-and-research/01-04-content-and-data-audit.md" responsibility="docs" strategy="replace" -->
---
title: "Content and Data Audit – Production Portal"
doc_path: "docs/playbook/01-discovery-and-research/01-04-content-and-data-audit.md"
doc_type: "data-audit"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [data, audit, content]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Content and Data Audit – Production Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="data-audit"
     path="docs/playbook/01-discovery-and-research/01-04-content-and-data-audit.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>data, audit, content</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This audit inventories key content and data sources Motion Mavericks relies on to run productions. It evaluates quality and freshness to inform import scripts, migration priorities, and retention policies for the new portal. Findings highlight where automation and governance improvements are required before pilot onboarding.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Existing project information is scattered across spreadsheets, email threads, cloud drives, and video platforms. This fragmentation makes it difficult to guarantee milestone accuracy, share link governance, and recovery commitments outlined in the high-level brief. Consolidating data into the portal requires understanding current ownership, quality, and update cadence.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes production artefacts spanning briefs, milestones, tasks, assets, approvals, and telemetry used by Admin, Agency, and Client stakeholders.
- Focuses on data stored within Motion Mavericks’ current systems (Google Workspace, Mux, spreadsheets, email archives).
- Excludes historical projects older than 36 months that will remain in cold storage post-launch.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details
| Source | Type | Owner | Quality | Freshness | Notes |
|--------|------|-------|---------|-----------|-------|
| Master production brief templates | Google Docs | Owen | High | Updated quarterly | Canonical structure for new projects; needs tagging for portal import |
| Active project milestone sheets | Google Sheets | Owen | Medium | Updated weekly | Inconsistent status fields; requires normalisation |
| Task assignment spreadsheet | Google Sheets | Agency partner | Low | Updated ad hoc | Missing audit trail; replace via portal tasks |
| Asset delivery folders | Google Drive | Owen | Medium | Updated daily | Mixed naming conventions; align with portal asset metadata |
| Shot lists | Google Sheets | Agency partner | High | Updated per shoot | Need linkage to milestones/tasks |
| Approval email threads | Gmail | Owen | Low | Updated daily | Hard to search; extract into portal comment history |
| Client feedback PDFs | Google Drive | Client liaison | Medium | Weekly | Convert to structured comments or attachments |
| Mux asset library | Mux | Owen | High | Daily ingest | Already signed; ensure metadata sync via webhooks |
| Resend email logs | Resend | Platform engineer | High | Real time | Provides notification delivery metrics |
| Slack transcript exports | Slack | Agency partner | Low | Weekly | Contains context; sensitive; only import curated decisions |
| Budget approval forms | Google Docs | Finance support | Medium | Monthly | Sensitive finance data; link references but do not migrate |
| Talent release forms | Dropbox | Legal advisor | Medium | Monthly | Requires secure storage; note retention requirements |
| Incident response notes | Notion | Reliability partner | Medium | Quarterly | Move to portal runbook repository |
| Accessibility audit reports | Google Drive | Design lead | High | Annual | Store in portal compliance section |
| Share link tracking spreadsheet | Google Sheets | Owen | Low | Ad hoc | Replace with portal analytics |
| Client onboarding checklist | Google Docs | Client Success Lead | Medium | Quarterly | Needs conversion to portal onboarding workflow |
| Backup verification logs | Neon console export | Reliability partner | High | Monthly | Feed into operations telemetry |
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [Operational reliability playbook](../15-observability-and-reliability/15-03-reliability-engineering.md)
- [Legacy MVP plan (context)](../../specs/legacy-mvp-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [06-01-drizzle-migrations](../06-data-model-and-storage/06-01-drizzle-migrations.md)
- [18-03-data-migration-runbook](../18-release-and-cutover/18-03-data-migration-runbook.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Do historic approval emails older than 24 months need to be migrated for compliance, or can they remain archived outside the portal?
- What redaction process is required before importing Slack transcripts containing client-sensitive details?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Agencies will provide structured exports (CSV/JSON) for milestone sheets when migration commences.
- Legal advisors will approve centralising talent release forms within the portal once access controls are demonstrated.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks asset inventory (August 2025)
- Agency partner data readiness workshop notes (September 2025)
- Reliability partner backup verification logs
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
