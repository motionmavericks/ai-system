<!-- ai:managed start file="docs/playbook/06-data-model-and-storage/06-01-schema-design.md" responsibility="docs" strategy="replace" -->
---
title: "Schema Design – Motion Mavericks Portal"
doc_path: "docs/playbook/06-data-model-and-storage/06-01-schema-design.md"
doc_type: "data-model"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [schema, data]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Schema Design – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="data-model"
     path="docs/playbook/06-data-model-and-storage/06-01-schema-design.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>schema, data</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This schema design outlines the Motion Mavericks portal relational model in Neon PostgreSQL. It captures tenants, projects, milestones, tasks, assets, share links, notifications, comments, and audit logs with residency, recovery, and compliance requirements. Design supports multi-tenancy via row-level security and efficient querying for dashboards and analytics.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal replaces spreadsheets and ad-hoc storage. Data must remain in Australia, provide audit trails, and support 99.9% availability plus RPO ≤24 h. Schema choices must enable rapid milestone reporting, share link analytics, and backup/restore workflows.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes entity definitions, relationships, indexes, constraints, and RLS considerations.
- Excludes low-level migration code (see 06-02) and seed data (06-03).
- Assumes PostgreSQL 15+ features available in Neon (UUID v7, JSONB, generated columns).
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Entity overview
| Table | Purpose | Key columns | Notes |
|-------|---------|-------------|-------|
| tenants | Represents Motion Mavericks and agency tenants | `id UUID`, `name`, `type (admin|agency)`, `residency_policy`, `branding` | RLS root; Admin tenant has `type=admin` |
| users | Portal accounts | `id UUID`, `tenant_id`, `role (admin|agency|guest)`, `email`, `status`, `last_login_at` | `tenant_id` references tenants; RLS restricts by tenant |
| projects | Production engagements | `id UUID`, `tenant_id`, `client_name`, `title`, `status`, `start_date`, `end_date` | Index on `(tenant_id, status)` for dashboards |
| milestones | Project phases | `id UUID`, `project_id`, `title`, `due_date`, `status`, `sequence` | Unique constraint `(project_id, title)` |
| tasks | Action items | `id UUID`, `milestone_id`, `assignee_id`, `title`, `status`, `due_date`, `completed_at`, `effort_estimate` | Partial index on `status='pending'` |
| assets | Uploaded deliverables | `id UUID`, `project_id`, `milestone_id`, `uploader_id`, `mux_asset_id`, `version`, `status`, `duration`, `storage_checksum` | Index `(project_id, status)` |
| share_links | External view tokens | `id UUID`, `asset_id`, `tenant_id`, `hashed_token`, `expires_at`, `passcode_hash`, `status`, `view_limit`, `view_count` | Unique on `hashed_token`; partial index on `status='active'` |
| comments | Feedback threads | `id UUID`, `parent_type ('task'|'asset')`, `parent_id`, `author_id`, `body`, `metadata JSONB`, `created_at` | GIN index on `metadata` for filters |
| notifications | User events | `id UUID`, `tenant_id`, `user_id`, `type`, `payload JSONB`, `delivered_at`, `read_at` | Index `(user_id, read_at)` |
| audit_logs | Immutable change log | `id UUID`, `tenant_id`, `actor_id`, `action`, `entity_type`, `entity_id`, `before JSONB`, `after JSONB`, `created_at` | Partitioned monthly for retention |
| residency_evidence | Compliance snapshots | `id UUID`, `tenant_id`, `generated_at`, `report_url`, `checksum` | Serves residency proof |
| webhook_events | Tracks inbound Mux/Resend events | `id UUID`, `source`, `event_id`, `payload JSONB`, `status`, `processed_at`, `retry_count` | Unique `source+event_id` |
| job_runs | Background job ledger | `id UUID`, `job_name`, `started_at`, `completed_at`, `result`, `metadata JSONB` | Helps audit Cron tasks |

### Relationships
- `tenants 1..n users`, `tenants 1..n projects`, `tenants 1..n share_links`.
- `projects 1..n milestones`, `milestones 1..n tasks`, `projects 1..n assets` (with optional milestone link).
- `assets 1..n share_links`, `tasks 1..n comments`, `assets 1..n comments` (polymorphic `parent_type`).
- `users 1..n notifications`, `users 1..n audit_logs` (via `actor_id`).

### Indexes & constraints
- `projects`: index `idx_projects_tenant_status` for dashboard queries.
- `milestones`: composite index `(project_id, due_date)` for timeline sort.
- `tasks`: partial index `idx_tasks_pending_due` on `(milestone_id, due_date)` where status in ('pending','in_review').
- `assets`: unique `(project_id, version)` ensures sequential versioning.
- `share_links`: `hashed_token` unique, enforced via constraint; index on `expires_at` for cleanup job.
- `comments`: `GIN` index on `to_tsvector('english', body)` for search.
- `notifications`: partial index on `read_at IS NULL` for unread counts.
- `audit_logs`: partition by month using `created_at` for retention; indexes on `entity_type` and `entity_id`.

### Row-level security (RLS)
- Enabled on `users`, `projects`, `milestones`, `tasks`, `assets`, `share_links`, `comments`, `notifications`, `audit_logs`.
- Policy: `tenant_id = current_setting('app.tenant_id')::uuid` except Admin role where `tenant_id` derived from allowed set.
- System contexts set via `SET app.tenant_id` upon connection using session middleware.

### Generated columns & triggers
- `tasks` computed column `is_overdue BOOLEAN GENERATED ALWAYS AS (status <> 'completed' AND due_date < now()) STORED` for dashboards.
- `share_links` trigger updates `view_count` and `status` when `expires_at` passed.
- `audit_logs` inserted via event triggers for `INSERT/UPDATE/DELETE` on key tables (projects, tasks, assets, share_links).

### Data protection
- PII limited to `users.email`, `users.name`. `comments` scrubbed of PII using content filters before insert.
- Soft deletes use `status` columns; background processes purge data per retention policy (share links 90 days, notifications 180 days, audit logs 365 days).
- Time zones stored in UTC; UI handles localisation for en-AU.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [04-02-solution-architecture](../04-architecture-and-decisions/04-02-solution-architecture.md)
- [04-03-data-flows](../04-architecture-and-decisions/04-03-data-flows.md)
- [06-02-migrations-plan](06-02-migrations-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [06-05-data-governance](06-05-data-governance.md)
- [15-02-capacity-planning](../15-performance-and-reliability/15-02-capacity-planning.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we require encrypted columns for sensitive metadata, or does limited PII make row-level policies sufficient?
- Should audit logs be streamed to external cold storage for long-term retention beyond 365 days?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Neon supports UUIDv7 generation once publicly available; fallback to v4 if necessary.
- Partitioning on audit_logs is manageable within Neon Business tier limits.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Schema workshop (September 2025)
- Drizzle ORM design docs
- Compliance advisor guidance on retention
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
