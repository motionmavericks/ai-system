<!-- ai:managed start file="docs/playbook/09-backend/09-05-caching-strategy.md" responsibility="docs" strategy="replace" -->
---
title: "Caching Strategy – Motion Mavericks Portal"
doc_path: "docs/playbook/09-backend/09-05-caching-strategy.md"
doc_type: "architecture"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [caching]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Caching Strategy – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="architecture"
     path="docs/playbook/09-backend/09-05-caching-strategy.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>caching</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This strategy outlines caching layers for Motion Mavericks portal, including Vercel edge caching, TanStack Query client cache, Vercel KV storage, and HTTP caching for share pages. It balances performance, data freshness, and compliance with residency and security requirements.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal must remain responsive while presenting up-to-date project data. Cached content cannot expose stale or unauthorised information. Caching decisions consider multi-tenant security and share link sensitivity.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Server-side caching, client caches, share page strategies, invalidation, and tooling.
- Excludes CDN for marketing sites.
- Assumes Vercel edge network and Neon as source of truth.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Server-side cache
- Next.js caching via `fetch` options; default `cache: 'no-store'` for personalised data.
- Use `revalidateTag` for dashboards aggregated metrics (project summary). Tag invalidated on mutations (task update, asset upload).
- Tenant-level caching to avoid cross-tenant leakage: revalidation events include tenantId.

### Edge caching
- Public share pages: disable caching (`Cache-Control: no-store`) to enforce real-time validation.
- Static assets (JS/CSS) served via Vercel CDN with standard caching.

### Vercel KV usage
- Stores rate limiting counters, notification unread counts, share link view metrics.
- TTL-based entries (60 seconds to 24 hours). Ensures data ephemeral and complies with residency (KV stored in region; confirm via Vercel config).
- KV keys namespaced by tenant: `tenant:{tenantId}:rateLimit:{endpoint}`.

### Client-side cache
- TanStack Query caches server data per key with configured `staleTime` (see 08-03). Persisted to IndexedDB for offline support; limited to non-sensitive data (tasks, notifications). Share link data not persisted.
- Cache invalidation triggered via `invalidateQueries` after mutations and WebSocket events (future optional). Current approach uses `onSuccess` from mutations.

### HTTP headers
- API responses include `Cache-Control: private, no-store` by default.
- Static assets served via `Cache-Control: public, max-age=31536000, immutable`.
- Residency badge fetch uses short cache (60 seconds) to avoid redundant queries.

### Invalidation triggers
- Asset processing webhook invalidates tasks and asset queries for affected project.
- Share link revocation invalidates share analytics cache and removes playback tokens.
- Notification updates clear unread count in KV and re-fetch via query.

### Observability
- Monitor cache hit/miss ratios via Vercel Analytics and custom metrics.
- Log invalidation events to audit (useful for debugging stale data).

### Security considerations
- Avoid caching responses containing PII or share tokens.
- Ensure KV keys do not include raw emails or share tokens; use hashed identifiers.
- Clear persisted client caches upon logout or tenant switch.

### Future enhancements
- Consider server-sent events or WebSockets to push updates, reducing reliance on frequent polling.
- Explore CDN caching for anonymised analytics endpoints with tenant-safe tokens.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [08-03-state-management](../08-frontend/08-03-state-management.md)
- [07-04-rate-limiting-and-quota](../07-apis-and-contracts/07-04-rate-limiting-and-quota.md)
- [04-03-data-flows](../04-architecture-and-decisions/04-03-data-flows.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [09-02-business-logic](09-02-business-logic.md)
- [15-02-capacity-planning](../15-performance-and-reliability/15-02-capacity-planning.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we introduce incremental static regeneration for public marketing-like pages after MVP?
- Do we need to purge KV entries manually post-tenant removal to avoid residual data?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Vercel KV resides in AU region; confirm and monitor.
- TanStack Query persistence not required for guest share pages; clients use network connection during review.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Frontend caching review (September 2025)
- Vercel caching documentation
- Reliability partner performance analysis
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
