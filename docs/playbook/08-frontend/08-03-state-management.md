<!-- ai:managed start file="docs/playbook/08-frontend/08-03-state-management.md" responsibility="docs" strategy="replace" -->
---
title: "State Management – Motion Mavericks Portal"
doc_path: "docs/playbook/08-frontend/08-03-state-management.md"
doc_type: "frontend-guide"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Design Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [state, frontend]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# State Management – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="frontend-guide"
     path="docs/playbook/08-frontend/08-03-state-management.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>state, frontend</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide outlines Motion Mavericks portal frontend state management practices using TanStack Query, React context, and local component state. It ensures consistent data fetching, optimistic updates, offline resilience, and telemetry alignment with success metrics.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Production tracking requires real-time updates across projects, tasks, assets, and notifications. State management must respect tenant isolation, support optimistic UI for agencies, and degrade gracefully when offline or on unreliable networks.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Server and client state handling, query caching, optimistic updates, React context usage, offline strategy.
- Excludes form-specific logic (08-04) and component-level details.
- Assumes TanStack Query v5 and Next.js 15 App Router.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Data fetching with TanStack Query
- Queries defined in `packages/api-client` using typed fetchers.
- Key structure: `['projects', tenantId, filters]`, `['tasks', projectId]`, `['shareLinks', assetId]`.
- Default stale time: 30 seconds for dashboard metrics, 5 seconds for tasks, 60 seconds for analytics.
- Revalidation: `refetchOnWindowFocus` enabled for active modules; disabled on share page to avoid token reuse.
- Error handling: query-level error boundaries render inline error components with retry.

### Optimistic updates
- Task status updates: mutate `['tasks', projectId]` cache with optimistic status change; rollback on failure.
- Comments: optimistic append to comment list with temp ID; replaced with server response once saved.
- Share link creation: optimistic entry added with `status='pending'`; replaced on success or removed on failure.

### Mutations
- Wrapped via `useMutation` with `onMutate`, `onError`, `onSuccess` to manage optimistic state and invalidations.
- `invalidateQueries` used sparingly to avoid unnecessary network calls; targeted invalidation per entity.

### React context
- `TenantContext` provides `tenantId`, `role`, `permissions` for descendant components.
- `NotificationContext` stores in-app feed state, unread counts (synced with TanStack Query).
- `PlaybackContext` on share page manages playback telemetry events.

### Offline and caching strategy
- TanStack Query persistent cache enabled via `@tanstack/query-sync-storage-persister` storing to IndexedDB for tasks and notifications (max 1 hour) to support on-set usage.
- Offline detection via `navigator.onLine` toggles toasts and defers mutations with background sync queue (see service worker evaluation post-MVP).

### State separation
- Server components handle data fetching when possible; client components wrap for interactivity.
- Avoid storing derived state when selectors suffice; use memoisation (`useMemo`, `useCallback`) for performance.

### Telemetry integration
- Query events instrumented via `onSuccess` to record latency metrics (p95 target <300 ms) feeding into analytics.
- Mutation success/failure logs sent to Sentry with sanitized metadata for monitoring.

### Testing
- Use `@testing-library/react` with `QueryClient` test wrapper; tests assert loading/empty/error states.
- Playwright tests validate offline queue by simulating network loss and verifying sync once reconnected.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [08-04-forms-and-validation](08-04-forms-and-validation.md)
- [07-02-endpoints-and-contracts](../07-apis-and-contracts/07-02-endpoints-and-contracts.md)
- [12-02-unit-tests](../12-testing-and-quality/12-02-unit-tests.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [03-02-journeys-and-flows](../03-ux-and-design/03-02-journeys-and-flows.md)
- [05-02-coding-standards](../05-project-setup/05-02-coding-standards.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we persist notification cache beyond 1 hour for agencies needing offline reference?
- Do we require background sync for asset upload metadata in case of temporary failures?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Users operate in modern browsers supporting IndexedDB and Service Worker APIs; fallback gracefully if unavailable.
- TanStack Query remains primary data layer; no additional global state library needed.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Frontend state management workshop (September 2025)
- TanStack Query documentation
- Agency feedback on offline requirements
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
