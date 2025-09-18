<!-- ai:managed start file="docs/playbook/04-architecture-and-decisions/04-03-data-flows.md" responsibility="docs" strategy="replace" -->
---
title: "Data Flows – Motion Mavericks Portal"
doc_path: "docs/playbook/04-architecture-and-decisions/04-03-data-flows.md"
doc_type: "architecture"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [architecture, data]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Data Flows – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="architecture"
     path="docs/playbook/04-architecture-and-decisions/04-03-data-flows.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>architecture, data</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document captures Motion Mavericks portal data flows across CRUD operations and event-driven processes. It ensures engineering, QA, and operations teams understand how entities interact, how events propagate, and where residency, auditing, and recovery controls apply.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal manages multi-tenant production data, assets, and notifications. Tracking CRUD paths and events clarifies how Neon, Mux, Resend, and Vercel services coordinate, enabling reliable onboarding, playback, and compliance evidence.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes CRUD matrix for ≥8 entities plus ≥12 event flows across systems.
- Covers both synchronous (HTTP) and asynchronous (webhooks, Cron) interactions.
- Excludes low-level schema details (documented in 06-01-schema-design).
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### CRUD map
| Entity | Create | Read | Update | Delete |
|--------|--------|------|--------|--------|
| Tenant | Admin via portal setup | Admin dashboard | Admin updates branding/compliance settings | Admin (soft delete; archive) |
| User | Admin invites; Clerk enrolment | Admin, self, audit logs | Admin (role change), user profile update | Admin deactivates (soft delete) |
| Project | Admin creates | Admin, Agency, Client | Admin edits details, status | Admin archives |
| Milestone | Admin or template | Admin, Agency, Client | Agency updates status/dates | Admin removes (if unused) |
| Task | Agency creates/duplicate | Admin, Agency | Agency updates status, assignees | Agency deletes (if pending) |
| Asset | Agency upload via signed URL | Admin, Agency, Guest (via share) | Agency replaces version, updates metadata | Admin or Agency archive version |
| ShareLink | Agency generates with expiry | Admin, Agency (logs), Guest (view) | Admin/Agency extend expiry or revoke | Admin/Agency revoke (soft delete) |
| Comment | Admin/Agency/Guest (if allowed) | All participants per role | Author edit within limited window | Author/Admin delete per policy |
| Notification | System generated | Intended recipient | Mark as read | Auto-pruned after retention |
| AuditLog | System generated | Admin, Compliance | Append-only | Never deleted (archived after retention) |

### Event flows (≥12)
1. **invite_created**: Admin invites agency → Clerk sends magic link → Notification service records invite status.
2. **invite_expired**: Cron identifies expired invites → Clerk invalidates token → Email prompts Admin to reissue.
3. **project_created**: Admin creates project → Project service stores record → Notification service alerts assigned agency.
4. **milestone_template_applied**: Admin applies template → Template engine seeds milestones/tasks → Audit log entry recorded.
5. **task_status_changed**: Agency updates task → Project service writes status → Notifications send digest updates → Analytics increments completion metric.
6. **asset_uploaded**: Agency upload to Vercel Blob → Signed URL passes file to Mux → Asset pipeline stores pending status.
7. **mux_asset_ready**: Mux webhook confirms processing → Pipeline updates asset status, generates playback token, notifies stakeholders.
8. **asset_process_failed**: Mux webhook error → Pipeline logs failure, triggers incident alert, schedules retry.
9. **share_link_created**: Share service generates token → Stores hashed token in Neon, caches metadata, sends email to guest.
10. **share_link_opened**: Guest accesses link → Edge middleware validates token, logs event, updates analytics, optionally notifies owner.
11. **share_link_revoked**: Admin revokes link → Share service invalidates token, logs action, notifies guests and Admin.
12. **comment_added**: User posts comment → Comment service saves record, triggers notifications, updates audit log.
13. **notification_digest_sent**: Cron aggregates due tasks → Resend sends digest email, logs in Neon.
14. **residency_report_generated**: Weekly job aggregates asset storage regions → Saves evidence to Neon, emails compliance advisor.
15. **backup_restore_tested**: Reliability partner runs restore → Logs success/failure, updates audit log, triggers incident if failure.
16. **error_budget_breach**: Sentry monitors SLO; when threshold crossed → Alert to reliability partner, change freeze triggered.

### Data flow considerations
- All data interactions comply with AU residency; Mux playback tokens signed via server to enforce region and expiry.
- Audit logs capture create/update/delete events for regulated entities (projects, assets, share links, notifications).
- Event flows integrate with SLO monitoring to maintain 99.9% availability and ≤1% playback errors.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [06-01-schema-design](../06-data-model-and-storage/06-01-schema-design.md)
- [07-05-webhooks-and-events](../07-apis-and-contracts/07-05-webhooks-and-events.md)
- [15-03-reliability-engineering](../15-observability-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [04-02-solution-architecture](04-02-solution-architecture.md)
- [10-04-analytics-and-product-events](../10-integrations/10-04-analytics-and-product-events.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Do we need additional events for compliance exports or will weekly residency reports suffice?
- Should share link open events trigger rate-limited notifications to prevent spam during high-volume reviews?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Neon + Drizzle can support event logging without dedicated event store; revisit if throughput exceeds projections.
- Resend webhooks for bounces will integrate with notification flows in post-MVP stage.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Engineering discovery sessions (September 2025)
- Vendor documentation for Mux webhooks and Clerk events
- Historical production project data flows
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
