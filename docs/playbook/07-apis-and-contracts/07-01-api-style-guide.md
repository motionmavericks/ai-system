<!-- ai:managed start file="docs/playbook/07-apis-and-contracts/07-01-api-style-guide.md" responsibility="docs" strategy="replace" -->
---
title: "API Style Guide – Motion Mavericks Portal"
doc_path: "docs/playbook/07-apis-and-contracts/07-01-api-style-guide.md"
doc_type: "api-guide"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [api, style]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# API Style Guide – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="api-guide"
     path="docs/playbook/07-apis-and-contracts/07-01-api-style-guide.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>api, style</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This style guide establishes Motion Mavericks portal API conventions for REST endpoints, error envelopes, rate limiting, and schema validation. It ensures consistent integration across frontend, backend, and external tooling while satisfying compliance, telemetry, and reliability requirements.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
APIs power onboarding, project tracking, asset pipeline, notifications, and share links. Consistent design accelerates development, improves documentation, and supports agency integrations. Style choices align with Next.js Route Handlers, Drizzle, and Zod schemas.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes endpoint naming, versioning, payload standards, error handling, rate limit headers, JSON schema patterns.
- Excludes specific endpoint definitions (see 07-02) and auth details (07-03).
- Assumes APIs served via Next.js `/api` routes with JSON responses.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Base principles
- RESTful resources with nouns (`/api/v1/projects`, `/api/v1/projects/{projectId}/milestones`).
- HTTP methods map to operations: GET (read), POST (create), PATCH (partial update), PUT (rare, full replace), DELETE (soft delete when supported).
- Responses encoded as JSON with UTF-8.
- Use snake_case for database fields, camelCase for JSON payloads.

### Versioning
- Prefix routes with `/api/v1/`. Breaking changes require new version (`v2`). deprecations communicated at least one quarter in advance.
- Internal APIs may use `/internal/` prefix but follow same conventions; accessible only behind auth.

### Response envelope
```
{
  "data": { ... },
  "error": null,
  "meta": {
    "requestId": "3e2970f0-7a0f-4a6a-93c4-fa3f6c7b8c1f",
    "pagination": { "page": 1, "pageSize": 20, "total": 125 }
  }
}
```
- `data`: payload object or array.
- `error`: null on success; otherwise object `{ code, message, details? }`.
- `meta`: optional metadata (pagination, cursors, rate limit, residency indicators).

### Error handling
- Use standard HTTP status codes (200, 201, 202, 204, 400, 401, 403, 404, 409, 422, 429, 500).
- Error payload example:
```
{
  "data": null,
  "error": {
    "code": "TASK_VALIDATION_FAILED",
    "message": "Task completion date is required when status is completed.",
    "details": {
      "field": "completedAt"
    }
  },
  "meta": { "requestId": "..." }
}
```
- Sensitive information never exposed in error messages; logs capture detail for debugging.

### Rate limit headers
- Responses include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (epoch seconds) for endpoints subject to throttling (auth, share links, comments).
- On 429 responses, include `Retry-After` header and error code `RATE_LIMIT_EXCEEDED`.

### JSON schema / validation
- Zod schemas stored in `packages/api-contracts` and exported for reuse.
- Example request schema (creating task):
```ts
export const createTaskSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().max(2000).optional(),
  dueDate: z.coerce.date(),
  assigneeId: z.string().uuid(),
  status: z.enum(['pending', 'in_review', 'completed']).default('pending'),
  effortEstimate: z.number().int().min(1).max(40).optional()
});
```
- Response schema wraps data in `ApiResponse<T>` to maintain envelope.
- Schema versioning documented with release notes when fields change.

### Pagination & filtering
- Use cursor-based pagination where possible: `?cursor=<opaque>&limit=20`. Fallback to page/size for simple lists.
- Sorting via `sort=dueDate:asc` query format.
- Filtering via `filter[status]=pending` to support multiple filters.

### Idempotency & concurrency
- Idempotency keys required for asset upload initialisation and share link creation: `Idempotency-Key` header.
- PATCH endpoints use optimistic concurrency with `If-Match` header containing entity `version` (incrementing integer).

### Security headers
- Responses include `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Share link endpoints implement `Cache-Control: no-store` to prevent caching of sensitive tokens.

### Documentation expectations
- Each endpoint documented in 07-02 with request/response examples, error codes, rate limits.
- API reference generated via Typedoc + custom script from Zod schemas.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [07-02-endpoints-and-contracts](07-02-endpoints-and-contracts.md)
- [07-04-rate-limiting-and-quota](07-04-rate-limiting-and-quota.md)
- [00-02-success-metrics](../00-brief-and-vision/00-02-success-metrics.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [07-03-auth-and-authorisation](07-03-auth-and-authorisation.md)
- [08-03-state-management](../08-frontend/08-03-state-management.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we support GraphQL or remain REST-only for MVP integrations?
- Do agency partners need webhook callbacks beyond Mux/Resend to mirror project updates?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Consumers can handle envelope format; provide helper client in `packages/api-client`.
- Rate limit headers suffice; no immediate need for `Retry-After` body content.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Internal API review (September 2025)
- OWASP API Security Top 10
- Stakeholder interviews on integration needs
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
