<!-- ai:managed start file="docs/playbook/04-architecture-and-decisions/04-04-threat-model.md" responsibility="docs" strategy="replace" -->
---
title: "Threat Model – Motion Mavericks Portal"
doc_path: "docs/playbook/04-architecture-and-decisions/04-04-threat-model.md"
doc_type: "threat-model"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Security Specialist", "Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [security, threat-model]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Threat Model – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="threat-model"
     path="docs/playbook/04-architecture-and-decisions/04-04-threat-model.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>security, threat-model</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This threat model analyses Motion Mavericks portal components using STRIDE. It identifies risks to authentication, multi-tenant data, asset pipeline, notifications, and share link security, documenting mitigations aligned with compliance and reliability targets. Outputs guide secure development and testing.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal handles sensitive production assets and client data. Threat modelling ensures share links, onboarding flows, and asset processing remain secure while meeting AU residency and availability requirements. Findings influence ADR decisions and security playbooks.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Covers authentication module, project/task services, asset pipeline, share link service, notification service, admin tooling.
- Assumes infrastructure on Vercel + Neon; excludes physical security or vendor-managed infrastructure internals.
- Data Flow Diagram reference: [DFD – Motion Mavericks Portal](<PLACEHOLDER_DFD_LINK>).
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### STRIDE analysis
| Component | STRIDE category | Threat description | Mitigation |
|-----------|-----------------|--------------------|------------|
| Authentication (Clerk + portal) | Spoofing | Attacker replays magic link | One-time tokens, 15-minute expiry, device binding via Clerk; audit log for reuse attempts |
| | Tampering | Manipulated invite payload | Signed JWT invites, server-side validation, encrypted storage |
| | Information disclosure | Token leakage via logs | Redacted secrets, structured logging with suppression, Sentry PII scrubbers |
| Tenant data access (Neon RLS) | Elevation of privilege | Agency escalates role through API | RLS enforcing tenant_id, server-side role checks, RBAC audit |
| | Repudiation | Agency denies task edits | Immutable audit log (append-only), timestamped with actor ID |
| Project/task service | Tampering | API manipulation altering milestones | Input validation, optimistic locking, Drizzle type guarantees |
| Asset pipeline (Mux) | DoS | Malicious large uploads saturate bandwidth | Upload size limits, rate limiting using Vercel Edge, alerts on 4XX/5XX spikes |
| | Information disclosure | Shared Mux playback URLs reused | Signed playback URLs with 5-minute expiry, token rotation |
| Share link service | Spoofing | Guessable URLs | UUIDv7 tokens, hashed storage, optional passcodes, minimum entropy controls |
| | Information disclosure | Link forwarded widely | Expiry defaults (7 days), view analytics, revocation controls |
| | Tampering | Link tampered to bypass expiry | Server validation of expiry/residency before playback |
| Notification service | Repudiation | User denies receiving alerts | Delivery logs (Resend), notification audit entries |
| | DoS | Notification flood via API | Rate limiting, abuse detection via Vercel KV, alerting |
| Admin tooling | Elevation of privilege | Stolen admin session | Session inactivity timeout, IP logging, option to enforce passkey for Admin post-MVP |
| Webhooks (Mux, Resend) | Spoofing | Forged webhook payload | HMAC signature verification, timestamp tolerance, nonce replay detection |
| Observability | Information disclosure | Sensitive data in logs | Structured logging with allowlists, hashing of emails, environment-based scrubbing |
| Backup & recovery | Tampering | Backup integrity compromised | Neon encrypted backups, checksum verification, restore drills |
| Cron jobs | DoS | Failure to run digest jobs | Monitoring with alerting, manual run fallback |

### Mitigation summary
- Strong authentication via Clerk with rate-limited invites.
- Neon RLS and Drizzle ensure tenant isolation; regular audits scheduled.
- Share links rely on signed URLs, hashed tokens, optional passcodes, and analytics.
- Webhooks validated via HMAC; failures captured in DLQ with replay controls.
- Observability sanitises PII; audit logs retained 365 days.

### Residual risks
- Guest users may share links voluntarily; mitigation relies on expiry and monitoring.
- Dependence on managed services (Clerk, Mux) introduces vendor risk; monitored via status pages and incident plans.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [11-01-security-baseline](../11-security-and-compliance/11-01-security-baseline.md)
- [ADR: share link security controls](adrs/2025-09-19-share-link-security-controls.md)
- [15-04-disaster-recovery](../15-observability-and-reliability/15-04-disaster-recovery.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [04-02-solution-architecture](04-02-solution-architecture.md)
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Do enterprise clients require penetration testing before launch, or will this threat model suffice temporarily?
- Should we enforce passcode complexity rules for share links (length, numbers) or leave optional for MVP?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Clerk’s HSM-backed keys provide sufficient assurance without additional token signing infrastructure.
- Vercel KV durability is adequate for rate limiting; if not, we will adopt Redis-backed service.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Security advisory review (September 2025)
- Vendor threat modelling documentation (Clerk, Mux, Neon)
- Legacy security backlog entries
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
