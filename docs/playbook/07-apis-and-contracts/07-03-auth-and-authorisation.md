<!-- ai:managed start file="docs/playbook/07-apis-and-contracts/07-03-auth-and-authorisation.md" responsibility="docs" strategy="replace" -->
---
title: "Auth and Authorisation – Motion Mavericks Portal"
doc_path: "docs/playbook/07-apis-and-contracts/07-03-auth-and-authorisation.md"
doc_type: "api-guide"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Security Specialist", "Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [auth, security]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-01-personas.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Auth and Authorisation – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="api-guide"
     path="docs/playbook/07-apis-and-contracts/07-03-auth-and-authorisation.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-01-personas.md"/>
    <tags>auth, security</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide documents Motion Mavericks portal authentication and authorisation flows using Clerk magic links, session cookies, role-based checks, share token signing, and passcode hashing. It ensures security controls meet availability and compliance requirements while maintaining low onboarding friction.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal must support Admin, Agency, and Guest roles with minimal credential management. Magic-link authentication provides quick onboarding, while share links require additional security for external reviewers. Controls must integrate with Neon RLS and audit logging.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Magic link issuance, session management, role enforcement, share token signing, passcode hashing.
- Excludes third-party SSO/SCIM (post-MVP) and OAuth flows for external integrations.
- Assumes Clerk as IdP and Mux for media playback tokens.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Invitation & magic link issuance
1. Admin calls `/api/v1/auth/invitations` with email + role.
2. Backend generates Clerk invitation via Admin API; Clerk emails magic link containing single-use token.
3. Token TTL: 72 hours; Clerk stores hashed token.
4. Upon consumption, Session created with metadata: `tenantId`, `role`, `agencyId?`.
5. Portal records invitation status in Neon for auditing and onboarding metrics (SM-01).

### Session cookies
- Stored as HttpOnly, Secure, SameSite=Strict cookies named `__session` (from Clerk) and `mm_session` (portal context).
- Session contains `sub (userId)`, `tenantId`, `role`, `permissions` array.
- Inactivity timeout: 12 hours; absolute lifetime: 30 days for Admin/Agency, 7 days for Guest.
- Edge middleware validates session on each request, fetching Clerk session if necessary; attaches `x-user-id`, `x-tenant-id` headers for downstream logic.

### Role-based access checks
- Roles: `admin`, `agency`, `guest`.
- Permissions table in code mapping roles to actions (e.g., `projects:create`, `share:revoke`).
- Middleware ensures endpoint-level authorisation before hitting handlers; failure returns 403 `TENANT_ACCESS_FORBIDDEN`.
- Neon RLS double-enforces tenant access; `SET app.role` used for additional checks (guests read-only, agencies restricted to assigned projects).

### Share link token signing
- Tokens generated as UUIDv7, hashed using Argon2id with unique salt per link (`share_links.hashed_token`).
- Actual share URL includes signed JWT containing `shareLinkId`, `assetId`, `tenantId`, `exp` (≤5 minutes). JWT signed with server secret `SHARE_JWT_SECRET` rotated every 180 days.
- On access, server validates JWT, fetches share link record, checks hashed token via constant-time comparison, and ensures `expires_at` not passed.
- Playback requests proxied to Mux with signed playback URL (5-minute TTL).

### Share link passcodes
- Optional; when enabled, passcode hashed with Argon2id (memory cost 64 MB, time cost 3) stored in `passcode_hash`.
- Passcode policy: min 8 digits, cannot match top 10k PIN list.
- Guests allowed five attempts before temporary lock (15 minutes). Lock events logged.

### API tokens & secrets
- No API tokens exposed to agencies at MVP; future integration would generate scoped tokens with expiry.
- Webhook endpoints (Mux, Resend) require HMAC signatures; secret stored in Vercel env. Replay protection by storing nonce in Redis (Vercel KV) for 10 minutes.

### Audit & monitoring
- Successful logins, failed attempts, invitation sends, share accesses recorded in `audit_logs` with IP hash.
- Sentry captures auth failures with sanitized metadata.
- Admin dashboard displays account activity for compliance.

### Revocation & logout
- Admin can revoke sessions via `/api/v1/auth/sessions/{sessionId}`; calls Clerk API and records event.
- Share link revocation sets status to `revoked`, increments `revokedBy` metadata, triggers notification to asset owner.
- Logout endpoint clears cookies and invalidates session in Clerk.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [ADR 001 – Authentication Approach](../04-architecture-and-decisions/adrs/2025-09-19-authentication-approach.md)
- [04-04-threat-model](../04-architecture-and-decisions/04-04-threat-model.md)
- [07-04-rate-limiting-and-quota](07-04-rate-limiting-and-quota.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [07-02-endpoints-and-contracts](07-02-endpoints-and-contracts.md)
- [11-01-security-baseline](../11-security-and-compliance/11-01-security-baseline.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should Admin accounts require passkeys post-MVP for higher assurance?
- Do government clients mandate IP allow-listing for share link access?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Clerk’s AU data residency meets compliance needs; confirm via vendor evidence.
- Share link JWT expiry of five minutes balances security and UX; adjust based on feedback.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Security advisory review (September 2025)
- Clerk and Mux implementation guides
- Client security questionnaires
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
