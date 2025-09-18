<!-- ai:managed start file="docs/playbook/03-ux-and-design/03-03-information-architecture.md" responsibility="docs" strategy="replace" -->
---
title: "Information Architecture – Motion Mavericks Portal"
doc_path: "docs/playbook/03-ux-and-design/03-03-information-architecture.md"
doc_type: "information-architecture"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [ux, ia]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Information Architecture – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="information-architecture"
     path="docs/playbook/03-ux-and-design/03-03-information-architecture.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>ux, ia</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document outlines the Motion Mavericks portal’s information architecture, including sitemap hierarchy and content model entities. It ensures navigation, data relationships, and UX align with multi-tenant production management requirements. The structure supports compliance, accessibility, and resilience goals.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Current workflows span multiple tools. The portal must unify project tracking, asset management, share links, and notifications while preserving tenant isolation. A clear IA ensures Admin, Agency, and Guest users can navigate efficiently and that data models map cleanly to UX.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes sitemap for primary navigation, secondary navigation, and contextual surfaces.
- Defines content model covering ≥7 core entities mapped to data design.
- Excludes future roadmap modules (marketplace, budgeting) not in MVP.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Sitemap
- **Tenant dashboard** (default landing)
  - Project health cards (milestones due, tasks overdue, share link status)
  - Notifications feed (recent events, alerts)
  - Residency status widget (AU compliance indicator)
- **Projects**
  - Project list (filters: active, archived, agency)
  - Project detail
    - Overview (milestones timeline, key contacts)
    - Tasks board (list and timeline views)
    - Assets gallery (inline playback, version history)
    - Comments & decisions (threaded, filterable)
    - Activity log (audit trail)
- **Assets** (cross-project library)
  - Search and filters (project, agency, status)
  - Asset detail (metadata, playback, share links)
- **Notifications**
  - Inbox view (grouped by type: tasks, approvals, incidents)
  - Digest preferences (frequency, channels)
- **Settings**
  - Tenant settings (branding, compliance documents)
  - User management (invite, roles, access matrix)
  - Share link policies (expiry defaults, passcode policy)
  - Integrations (Mux, Clerk, Resend, Sentry)
  - Residency & audit exports
- **Support (contextual footer)**
  - Runbooks, help articles, escalation contacts

### Content model (≥7 entities)
| Entity | Description | Key fields | Relationships |
|--------|-------------|------------|---------------|
| Tenant | Represents Motion Mavericks and partner agencies | id, name, residency_policy, branding | Has many users, projects, settings |
| User | Portal accounts (Admin, Agency, Guest) | id, role, email, status, last_login | Belongs to tenant, associated with tasks, comments |
| Project | Production engagement | id, tenant_id, client_name, status, start_date, end_date | Has many milestones, tasks, assets, share links |
| Milestone | Major phase within a project | id, project_id, title, due_date, status | Has many tasks, assets |
| Task | Actionable work item | id, milestone_id, assignee_id, status, due_date, completed_at | Has many comments, attachments |
| Asset | Uploaded deliverable or reference | id, project_id, milestone_id, mux_asset_id, version, status | Linked to share links, comments |
| ShareLink | External viewing link | id, asset_id, expires_at, passcode_hash, status | Generates notifications, audit logs |
| Comment | Threaded annotation on task/asset | id, parent_type, parent_id, author_id, body, created_at | Triggers notifications |
| Notification | Event delivered to users | id, user_id, type, payload, delivered_at | Linked to tasks, assets, share links |
| AuditLog | Immutable event record | id, actor_id, action, entity_type, entity_id, metadata | References users, projects, share links |
| ResidencyEvidence | Compliance artefact | id, tenant_id, storage_region, generated_at | Linked to audit logs |

### Navigation principles
- Primary navigation surfaces (Dashboard, Projects, Assets, Notifications, Settings) accessible via persistent sidebar with keyboard shortcuts.
- Secondary navigation appears within project detail to switch between overview, tasks, assets, comments, activity.
- Contextual actions (share, invite, upload) surfaced in consistent top-right action bar.
- Breadcrumbs show tenant → project → view to support cross-project navigation.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [06-01-schema-design](../06-data-model-and-storage/06-01-schema-design.md)
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [03-02-journeys-and-flows](03-02-journeys-and-flows.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [03-04-wireframes](03-04-wireframes.md)
- [08-02-routing-and-navigation](../08-frontend/08-02-routing-and-navigation.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should assets be accessible directly from the dashboard for fast follow-up, or remain scoped within projects to enforce tenancy boundaries?
- Do we need a dedicated compliance hub in primary navigation for legal stakeholders?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Sidebar navigation performs well on desktop and tablet resolutions primarily used by agencies and clients.
- Audit log access remains limited to Admin role to avoid information overload for agency users.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks IA workshops (September 2025)
- Schema drafts provided by engineering team
- Accessibility heuristic review outcomes
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
