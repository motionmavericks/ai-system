<!-- ai:managed start file="docs/playbook/07-apis-and-contracts/07-02-endpoints-and-contracts.md" responsibility="docs" strategy="replace" -->
---
title: "Endpoints and Contracts – Motion Mavericks Portal"
doc_path: "docs/playbook/07-apis-and-contracts/07-02-endpoints-and-contracts.md"
doc_type: "api-contracts"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Technical Delivery Lead", "Quality Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [api, contracts]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Endpoints and Contracts – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="api-contracts"
     path="docs/playbook/07-apis-and-contracts/07-02-endpoints-and-contracts.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>api, contracts</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This catalogue documents Motion Mavericks portal REST endpoints covering authentication, projects, milestones, tasks, assets, comments, notifications, and share links. Each entry defines request/response schemas (success and failure), examples, and relevant rate limits to guide frontend and integration work.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Consistent API contracts enable the portal UI, automation scripts, and potential agency integrations. Schemas align with the API style guide and uphold security, residency, and reliability commitments. Contracts generated from Zod definitions ensure compile-time validation.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes primary endpoints for auth, projects, milestones, tasks, assets, comments, notifications, share links.
- Excludes webhooks (see 07-05) and rate limiting detail (07-04).
- Assumes `/api/v1` prefix and JSON envelope described in style guide.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Authentication
**POST /api/v1/auth/invitations**
- Request:
```json
{
  "email": "zara.producer@example.mav",
  "role": "agency",
  "tenantId": "agency-mktg"
}
```
- Response 201:
```json
{
  "data": {
    "invitationId": "1f5cbe5b-ef8d-4945-9a70-55cd34e7a0ad",
    "expiresAt": "2025-09-22T02:15:00.000Z"
  },
  "error": null,
  "meta": { "requestId": "..." }
}
```
- Failure 409 (`INVITE_ALREADY_EXISTS`). Rate limit: 10/min/IP.

**POST /api/v1/auth/magic-links/consume**
- Request:
```json
{
  "token": "<magic-token>"
}
```
- Response 200: returns session cookie via Set-Cookie header, `data` includes profile summary.
- Failure 401 (`TOKEN_INVALID_OR_EXPIRED`).

### Projects & milestones
**GET /api/v1/projects?status=active&cursor=...**
- Response 200:
```json
{
  "data": [
    {
      "id": "proj_123",
      "title": "Brand Launch",
      "clientName": "Acme Retail",
      "status": "active",
      "startDate": "2025-09-01",
      "endDate": "2025-10-15"
    }
  ],
  "error": null,
  "meta": {
    "requestId": "...",
    "pagination": { "cursor": "eyJpZCI6InByb2pfMTIz" }
  }
}
```

**POST /api/v1/projects**
- Request uses `createProjectSchema`.
- Response 201 includes created project.
- Failure 422 with validation errors (e.g., missing title).

**PATCH /api/v1/projects/{projectId}**
- Supports partial updates, concurrency via `If-Match: W/"version"` header.

**POST /api/v1/projects/{projectId}/milestones**
- Request includes `title`, `dueDate`, `templateId?`.
- Response 201 returns milestone with `sequence`.

### Tasks
**POST /api/v1/milestones/{milestoneId}/tasks**
- Request defined in style guide sample.
- Response 201 includes `version`, `status`, `isOverdue`.
- Failure 409 if duplicate title in same milestone.

**PATCH /api/v1/tasks/{taskId}**
- Request example:
```json
{
  "status": "completed",
  "completedAt": "2025-09-19T04:30:00.000Z"
}
```
- Response 200 returns updated task.
- Failure 422 if `completedAt` missing.

### Assets
**POST /api/v1/assets/upload-url**
- Request:
```json
{
  "projectId": "proj_123",
  "milestoneId": "mile_456",
  "fileName": "rough-cut.mp4",
  "fileSize": 524288000,
  "contentType": "video/mp4"
}
```
- Response 201:
```json
{
  "data": {
    "uploadUrl": "https://blob.vercel.store/...",
    "assetId": "asset_789",
    "muxUploadId": "u-12345"
  },
  "error": null,
  "meta": { "requestId": "..." }
}
```
- Failure 413 if file exceeds limit; failure 403 if user lacks permission.

**GET /api/v1/assets/{assetId}** returns metadata including `playbackUrl` (signed) and `shareLinks` summary.

### Comments
**POST /api/v1/tasks/{taskId}/comments**
- Request:
```json
{
  "body": "Please tighten the pacing around scene two.",
  "attachments": []
}
```
- Response 201 with comment data.
- Failure 403 if guest tries to comment where not allowed.

**DELETE /api/v1/comments/{commentId}**
- Response 204 no content.

### Notifications
**GET /api/v1/notifications?unread=true**
- Response 200 list of notifications with `type`, `payload`, `createdAt`.
- Includes pagination metadata.

**POST /api/v1/notifications/acknowledge**
- Request: `{ "notificationIds": ["notif_123", "notif_124"] }`
- Response 200 with counts of acknowledged items.

### Share links
**POST /api/v1/assets/{assetId}/share-links**
- Request:
```json
{
  "expiresInDays": 7,
  "requirePasscode": true,
  "passcode": "84213975"
}
```
- Response 201:
```json
{
  "data": {
    "shareLinkId": "share_abc",
    "url": "https://portal.motionmavericks.com/share/abc123",
    "expiresAt": "2025-09-26T00:00:00.000Z",
    "status": "active"
  },
  "error": null,
  "meta": {
    "requestId": "...",
    "rateLimit": {
      "limit": 20,
      "remaining": 19,
      "reset": 1695091200
    }
  }
}
```
- Failure 422 for weak passcode, 403 if user lacks access, 429 if exceeding rate limit.

**POST /api/v1/share-links/{shareLinkId}/revoke**
- Response 200 returns updated status.

### Share link analytics
**GET /api/v1/share-links/{shareLinkId}/analytics**
- Returns aggregated opens, unique views, playback errors.
- Failure 404 if link expired and purged.

### Error codes reference
| Code | HTTP status | Description |
|------|-------------|-------------|
| INVITE_ALREADY_EXISTS | 409 | Invitation for email + tenant exists |
| TOKEN_INVALID_OR_EXPIRED | 401 | Magic link consumed or expired |
| TASK_VALIDATION_FAILED | 422 | Missing required fields |
| ASSET_UPLOAD_TOO_LARGE | 413 | File exceeds configured limit |
| SHARE_PASSCODE_WEAK | 422 | Passcode does not meet complexity |
| RATE_LIMIT_EXCEEDED | 429 | Rate limit triggered |
| TENANT_ACCESS_FORBIDDEN | 403 | User attempted cross-tenant access |

All responses include `requestId` for tracing.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [07-01-api-style-guide](07-01-api-style-guide.md)
- [06-01-schema-design](../06-data-model-and-storage/06-01-schema-design.md)
- [02-02-acceptance-criteria](../02-requirements-and-scope/02-02-acceptance-criteria.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [07-03-auth-and-authorisation](07-03-auth-and-authorisation.md)
- [07-05-webhooks-and-events](07-05-webhooks-and-events.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should share link creation support custom domains in MVP or remain on portal hostname?
- Do agencies require export endpoints for analytics beyond current scope?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- API consumers will adopt the provided TypeScript client; CLI integration deferred.
- Rate limits configurable via environment variables; defaults in 07-04 suffice for pilot.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- API design workshops (September 2025)
- User story mapping sessions
- Legacy asset delivery API drafts
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
