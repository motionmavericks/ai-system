<!-- ai:managed start file="docs/playbook/11-security-and-compliance/11-02-secrets-management.md" responsibility="docs" strategy="replace" -->
---
title: "Secrets Management – Motion Mavericks Portal"
doc_path: "docs/playbook/11-security-and-compliance/11-02-secrets-management.md"
doc_type: "security"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Security Specialist", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [security, secrets]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Secrets Management – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="security"
     path="docs/playbook/11-security-and-compliance/11-02-secrets-management.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>security, secrets</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document details how Motion Mavericks manages operational secrets for the portal, covering storage, access controls, rotation cadence, auditing, and breach response. It ensures credentials for Clerk, Mux, Neon, Resend, and other services remain secure and traceable.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Multiple managed services require API keys and secrets. Manual handling risks exposure, so structured management is vital for compliance and incident readiness. Secrets policy complements environment documentation (05-03).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Storage mechanisms, rotation schedule, access policy, auditing, leak response.
- Excludes infrastructure secrets managed by vendors internally.
- Assumes Vercel environment variable store and 1Password vault.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Storage
- Primary: Vercel environment variables per environment (dev/staging/prod). Access restricted to Owen + reliability partner.
- Secondary: 1Password Business shared vault `Motion Mavericks Portal` for backup and manual access (requires 2FA).
- Local development uses `.env.local` generated via `pnpm env:sync` pulling from doppler/1Password CLI.

### Access control
- Access granted on need-to-know basis; documented in access register.
- All secret retrievals require 2FA; 1Password logs review monthly.
- Contractors provided time-limited access; revoked after engagement.

### Rotation cadence
| Secret | Rotation | Responsible |
|--------|----------|-------------|
| Clerk secret key | 180 days | Security specialist |
| Mux tokens | 120 days | Reliability partner |
| Resend API key | 90 days | Client success lead |
| Neon passwords (app/migrations) | 90 days | Reliability partner |
| Sentry auth token | 180 days | Technical lead |
| Share JWT secret | 365 days | Security specialist (requires reissue plan) |
| Resend webhook secret | 180 days | Reliability partner |

Rotation tracked in `docs/playbook/05-project-setup/_rotation-log.md` (to be maintained). Rotations performed first on staging, validated, then applied to production.

### Auditing
- Rotation actions recorded in GitHub issues with label `security::secrets`.
- Vercel provides change history; exported quarterly for compliance.
- 1Password access logs reviewed monthly; anomalies investigated.

### Leak response
1. Revoke compromised secret immediately in provider console.
2. Update affected environments; redeploy.
3. Invalidate sessions or tokens associated (e.g., share links) if relevant.
4. Conduct root cause analysis; document in incident report.
5. Notify impacted stakeholders and update security baseline.

### Tooling
- Optionally evaluate Doppler/Infisical for centralised secret delivery post-MVP.
- Git secrets scanning (pre-commit) prevents committing secrets; failing push blocked.

### Training
- Developers instructed not to share secrets over email/chat; use 1Password secure notes if needed.
- Onboarding includes secrets policy orientation.

### Compliance
- Secrets policy aligns with AU Privacy and GDPR expectations for data minimisation and access control.
- Evidence captured for enterprise security reviews.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [05-03-environments-and-secrets](../05-project-setup/05-03-environments-and-secrets.md)
- [11-01-security-baseline](11-01-security-baseline.md)
- [11-05-incident-response](11-05-incident-response.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
- [20-01-postmortems-template](../20-archive-and-postmortems/20-01-postmortems-template.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we adopt automated reminders for rotations rather than manual calendar events?
- Do we need HSM-backed secret storage for high-sensitivity keys post-MVP?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Current team size manageable with Vercel + 1Password approach; revisit if headcount grows.
- Vendors provide timely alerts for potential credential leaks.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Security specialist policy draft
- Vercel environment management documentation
- Prior incident learnings from Motion Mavericks ops
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
