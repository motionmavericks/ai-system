<!-- ai:managed start file="docs/playbook/09-backend/09-02-business-logic.md" responsibility="docs" strategy="replace" -->
---
title: "Business Logic – Motion Mavericks Portal"
doc_path: "docs/playbook/09-backend/09-02-business-logic.md"
doc_type: "architecture"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Quality Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [backend, business-logic]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Business Logic – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="architecture"
     path="docs/playbook/09-backend/09-02-business-logic.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>backend, business-logic</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document captures core business rules for Motion Mavericks portal services. It covers onboarding, milestone/task transitions, asset processing, share link lifecycles, notifications, and audit logging to ensure consistent behaviour across frontend, backend, and integrations.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Reliable automation lowers coordination overhead for Owen and agency partners. Documenting rules prevents regressions, supports testing, and clarifies how rate limits, residency, and compliance goals translate into application logic.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes workflow rules for onboarding, projects, milestones, tasks, assets, comments, share links, notifications, compliance logging.
- Excludes detailed API contracts (07-02) and UI behaviour (08-05).
- Assumes Neon + Drizzle schema described in 06-01.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Onboarding
1. Admin invitations require tenant assignment; duplicates blocked within 24 h.
2. Magic link consumption logs audit event with IP hash and user agent.
3. First login triggers onboarding wizard to confirm timezone and notification preferences; must complete before accessing dashboard.
4. Agencies must accept portal terms (versioned) before accessing projects; acceptance stored per user.

### Project lifecycle
1. Project status transitions: `draft → active → delivering → completed → archived`. Rollback allowed from `delivering` to `active` only.
2. Activating project requires at least one milestone and one agency user assigned.
3. Completing project requires zero pending tasks and all share links revoked or marked delivered.
4. Archiving project soft-deletes notifications and share links after 30 days; assets remain until retention policy triggers purge.

### Milestones
1. Milestone statuses: `planned`, `in_progress`, `at_risk`, `completed`.
2. `at_risk` triggers if >2 tasks overdue or asset pipeline error occurs; automatic email sent to Admin + agency lead.
3. `completed` requires all tasks completed and deliverables approved; validation occurs server-side.
4. Milestone due dates auto-adjust when project timeline shifted; adjustments logged.

### Tasks
1. Task statuses: `pending`, `in_review`, `blocked`, `completed`, `cancelled`.
2. Moving to `in_review` requires asset reference or comment explaining review request.
3. `blocked` requires blocker reason string; recorded for reporting.
4. `completed` requires `completedAt` timestamp; triggers notification to Admin and relevant clients.
5. Task completion accuracy metric calculates delta between due date and completion; fed to success metric SM-03.

### Assets & processing
1. Asset upload pipeline assigns `processing` status until Mux webhook ready.
2. On `ready`, asset `playbackUrl` generated and share link invites optional.
3. On `errored`, incident created; asset remains with `failed` status; user prompted to re-upload.
4. Asset versioning: uploading new version increments `version`; previous version archived, share links automatically point to latest unless locked.

### Share link lifecycle
1. Creation requires asset status `ready`. Default expiry 7 days, max 30 days.
2. Optional passcode stored hashed; access validated before playback.
3. View events increment counters; after 50 views, owner notified to confirm ongoing access.
4. Expiry job sets status `expired`, revokes Mux playback token, logs event.
5. Revocation manual or automatic triggers notification to guest if email provided.

### Comments & approvals
1. Comments support @mentions; mention triggers notification.
2. Marking thread as resolved requires role `admin` or original author; unresolved comments visible in reporting.
3. Uploading attachments scanned for type/size; stored via Blob with reference.

### Notifications
1. Event types: `task_due`, `task_status_changed`, `asset_ready`, `asset_failed`, `share_expiring`, `share_opened`, `incident`, `digest`.
2. Notification preferences default: Admin all, Agency all but can opt out of digests, Guests share-specific.
3. Digest job summarises tasks due next 24 h, overdue items, new assets, share links expiring.
4. Notification retention 180 days; read/unread tracked for query performance.

### Compliance & audit
1. Every project/asset/share event logs entry with actor, action, before/after snapshot.
2. Residency evidence generated weekly using aggregated Neon + Mux region data.
3. DSAR requests log events capturing request ID, status transitions (received, verified, fulfilled).
4. Backup restore adds audit entry referencing restore branch ID and duration.

### Rate limiting logic
- Rate limit enforcement described in 07-04; business logic ensures helpful error messaging and disables immediate retry for share links after repeated failure.

### Telemetry
- All key operations emit events to analytics service: `project_created`, `milestone_completed`, `task_completed`, `asset_uploaded`, `share_link_created`, `share_link_viewed`, `notification_sent`.
- Events used for dashboards and success metrics.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [06-01-schema-design](../06-data-model-and-storage/06-01-schema-design.md)
- [07-02-endpoints-and-contracts](../07-apis-and-contracts/07-02-endpoints-and-contracts.md)
- [02-02-acceptance-criteria](../02-requirements-and-scope/02-02-acceptance-criteria.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [09-03-background-jobs](09-03-background-jobs.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should asset failure automatically roll back milestone status to `at_risk`, or leave manual intervention?
- Do clients need automated approval records beyond comment threads (e.g., digital signatures)?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Business rules remain stable through MVP; adjustments recorded with corresponding test updates.
- Notification digests delivered once daily suffice for agencies; evaluate additional cadences post-launch.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- User story mapping workshops
- Agency producer interviews (September 2025)
- Compliance advisor input on audit requirements
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
