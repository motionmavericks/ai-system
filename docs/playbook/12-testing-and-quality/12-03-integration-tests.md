<!-- ai:managed start file="docs/playbook/12-testing-and-quality/12-03-integration-tests.md" responsibility="docs" strategy="replace" -->
---
title: "Integration Tests – Motion Mavericks Portal"
doc_path: "docs/playbook/12-testing-and-quality/12-03-integration-tests.md"
doc_type: "quality"
status: "Draft"
version: "0.2.0"
owner: "QA Engineer"
reviewers: ["Technical Lead", "Backend Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [integration-testing, quality]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Integration Tests – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="quality"
     path="docs/playbook/12-testing-and-quality/12-03-integration-tests.md"
     version="0.2.0"
     status="Draft"
     owner="QA Engineer">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>integration-testing, quality</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Integration tests validate Motion Mavericks’ APIs, server actions, and background workers interacting with Neon, Mux, Resend, Clerk, and Upstash. They ensure that multi-tenant operations, share link issuance, and notification workflows behave as expected before end-to-end validation. Tests run in CI and staging to catch contract regressions early.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal relies on Next.js route handlers and edge functions, with Drizzle ORM managing Neon. Webhooks from Mux and Resend update asset status and notification metrics. Without dedicated integration tests, previous releases broke agency task updates and share link revocations.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- API route handlers under `/app/api/*`.
- Server actions manipulating milestones, tasks, notifications.
- Webhook consumers (Mux asset status, Resend event tracking).
- Background jobs (share token expiry sweeps, reminder digests).
- Excludes browser rendering and UI flows (covered in 12-04).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Test harness
- Run via Vitest in Node environment using `supertest` against Next.js test server (`next-test-api-route-handler`).
- Neon interactions executed against dockerised Postgres seeded with Drizzle migrations; use schema fixtures for Admin/Agency/Guest tenants.
- External services mocked using `msw` and `nock` with realistic payloads (Mux upload/update, Resend event JSON).
- Upstash Redis emulated locally with `ioredis-mock` for rate limit and token cache validation.

### Key scenarios
| Area | Scenarios |
|------|-----------|
| Authentication | Magic link validation, session creation, tenant scoping, suspended account rejection |
| Projects & milestones | Create/update milestones, enforce role permissions, check RPO metadata fields |
| Tasks | CRUD operations, assignment re-balance, notification triggers when due date breached |
| Assets | Asset upload handshake with Mux, ingest callback handling, AU residency flag propagation |
| Share links | Create with TTL, revoke endpoint, guest view audit logging, token reuse prevention |
| Notifications | Resend send API integration, digest scheduling, bounce webhook handling |
| Audit logs | Event writing, PII redaction, retention enforcement |
| Backup/restore hooks | Trigger RPO status update after backup completion (integration with reliability tooling) |

### Data setup and teardown
- `beforeAll`: run migrations; insert baseline data for one Admin tenant, one Agency partner, one Guest.
- Each test: wrap operations in transaction and roll back to maintain isolation.
- After suite: drop database if running locally to avoid cross-suite contamination.

### Execution cadence
- Triggered on pull requests touching `app/api`, `services`, `lib`, `drizzle` directories.
- Nightly full run on `main`, with results stored in CI artefacts for audit.
- Staging environment executes integration suite post-deploy to validate env-specific configs (Resend keys, Mux environment).

### Failure handling
- CI annotates failing tests with logs and request/response payloads.
- Engineers triage within four hours; recurring failures escalate to reliability review.
- Document root cause and fix in incident log if failure impacts release timeline.

### Metrics
- Track pass rate, mean runtime, and coverage of critical endpoints.
- Aim for <12 minutes total runtime to keep feedback loop tight.
- Record proportion of tests covering negative cases (target ≥30%).
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [07-02-endpoints-and-contracts](../07-apis-and-contracts/07-02-endpoints-and-contracts.md)
- [06-01-drizzle-migrations](../06-data-model-and-storage/06-01-drizzle-migrations.md)
- [10-02-mux-integration](../10-integrations/10-02-mux-integration.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [12-04-e2e-tests](12-04-e2e-tests.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
- [14-03-logging-and-tracing](../14-observability/14-03-logging-and-tracing.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we integrate contract snapshots (e.g., JSON schema diffing) to catch inadvertent API changes for agency clients?
- Will we provision ephemeral databases per CI workflow run to improve isolation at scale?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Docker-based Postgres instance mirrors Neon behaviour for required extensions.
- Webhook payloads remain stable; versioning handled via providers if changed.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- `app/api` route specifications
- Mux webhook documentation (2025)
- Resend event schema reference
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
