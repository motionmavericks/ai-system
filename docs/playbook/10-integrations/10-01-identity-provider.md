<!-- ai:managed start file="docs/playbook/10-integrations/10-01-identity-provider.md" responsibility="docs" strategy="replace" -->
---
title: "Identity Provider Integration – Motion Mavericks Portal"
doc_path: "docs/playbook/10-integrations/10-01-identity-provider.md"
doc_type: "integration"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Security Specialist", "Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [integration, identity]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-01-personas.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Identity Provider Integration – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="integration"
     path="docs/playbook/10-integrations/10-01-identity-provider.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-01-personas.md"/>
    <tags>integration, identity</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This integration guide covers Clerk identity provider configuration for the Motion Mavericks portal. It details magic link setup, environment configuration, webhooks, session management, and monitoring to satisfy onboarding and compliance requirements.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Clerk provides passwordless authentication, session management, and audit logs needed for rapid agency onboarding and compliance. Integration must align with ADR 001 and support AU residency.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Clerk dashboard configuration, environment variables, magic link templates, webhooks, session policies, monitoring.
- Excludes potential future SSO/SCIM integrations (tracked separately).
- Assumes Clerk Pro plan with regional data residency.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Configuration steps
1. Create Clerk application `Motion Mavericks Portal` with environment set to `Production (AU)`.
2. Enable magic link authentication; disable password-based auth to reduce attack surface.
3. Configure session duration (12h inactivity, 30d absolute) and enable email code fallback.
4. Set allowed redirect URLs: `https://portal.motionmavericks.com/invite`, staging equivalent, localhost for dev.
5. Configure `After sign-in URL` to `/` (dashboard) and `after sign-out` to `/auth/sign-in`.
6. Customize email templates (invite, magic link) with Motion Mavericks branding and declarative copy.

### Environment variables
- `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_API_KEY`, `CLERK_JWT_KEY` stored per environment.
- Additional `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` for client side.
- Keys rotated every 180 days; tracked in secrets policy.

### Webhooks
- Clerk webhooks to `/api/v1/webhooks/clerk` for events: `user.created`, `user.updated`, `user.deleted`, `session.created`, `session.ended`.
- Sign webhook payloads using secret stored in Vercel env `CLERK_WEBHOOK_SECRET`.
- Handler updates Neon user table, logs audit event, revokes sessions when user disabled.

### Session management
- Next.js middleware checks `Clerk` session; sets custom headers `x-user-id`, `x-tenant-id`, `x-role` for server actions.
- Use Clerk React SDK for UI (profile dropdown, sign-out button).
- Force logout when user removed from tenant; triggered by webhook.

### Monitoring & alerts
- Clerk dashboard configured to send alerts on high login failure rate (>10% in hour) to security specialist.
- Webhook failure alerts sent via email; fallback manual check daily.
- Sentry instrumentation logs `auth.*` breadcrumbs for debugging.

### Dev/staging setup
- Use Clerk dev instance; invite developer emails; set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` for dev.
- Staging environment uses separate Clerk instance to prevent mixing with production data.
- Test accounts created via seed script hitting Clerk API.

### Compliance considerations
- Clerk data residency set to AU; vendor SOC2 + GDPR compliance docs stored for audits.
- Magic link emails include link expiry and contact for support.
- Invitations stored in Neon for governance; stale invites cleaned hourly.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [ADR 001 – Authentication Approach](../04-architecture-and-decisions/adrs/2025-09-19-authentication-approach.md)
- [07-03-auth-and-authorisation](../07-apis-and-contracts/07-03-auth-and-authorisation.md)
- [05-03-environments-and-secrets](../05-project-setup/05-03-environments-and-secrets.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [09-02-business-logic](../09-backend/09-02-business-logic.md)
- [11-01-security-baseline](../11-security-and-compliance/11-01-security-baseline.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we need passkey support for Admin accounts before pilot, or is post-launch acceptable?
- Should we enable SMS fallback for agencies with strict email filters?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Clerk continues offering AU data residency; monitor vendor updates.
- Agencies comfortable receiving magic link emails; if spam filtering occurs, coordinate allow-listing.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Clerk integration docs (September 2025)
- Security review meeting notes
- Agency onboarding feedback
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
