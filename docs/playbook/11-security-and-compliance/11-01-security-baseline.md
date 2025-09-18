<!-- ai:managed start file="docs/playbook/11-security-and-compliance/11-01-security-baseline.md" responsibility="docs" strategy="replace" -->
---
title: "Security Baseline – Motion Mavericks Portal"
doc_path: "docs/playbook/11-security-and-compliance/11-01-security-baseline.md"
doc_type: "security"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Security Specialist", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [security, baseline]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Security Baseline – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="security"
     path="docs/playbook/11-security-and-compliance/11-01-security-baseline.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>security, baseline</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This baseline summarises Motion Mavericks portal security controls covering identity, access, data protection, application security, operations, and monitoring. It aligns with compliance obligations (AU Privacy, GDPR) and supports success metrics around availability and share link security.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal coordinates sensitive production data for agencies and clients. With a lean team, strong defaults and managed services reduce risk. Baseline serves as reference for audits, threat modelling, and change management.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Identity, authentication, access control, data protection, application security, infrastructure, monitoring, incident response.
- Excludes physical security, vendor internal controls beyond due diligence.
- Assumes infrastructure described in 04-02.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Identity & access
- Clerk magic-link auth with enforced 2FA for admin accounts post-MVP.
- RBAC: Admin, Agency, Guest roles with least privilege; Neon RLS prevents cross-tenant access.
- GitHub requires SSO + 2FA; branch protections enforced.
- Vercel, Neon, Mux access limited to Owen + reliability partner via least privilege accounts.

### Data protection
- Neon data encrypted at rest; TLS enforced in transit.
- Mux signed playback ensures content only accessible via tokens.
- Share link tokens hashed with Argon2; passcodes optional but recommended.
- Secrets stored in Vercel; rotated per schedule (05-03).
- Backups stored in AU region; restore drills quarterly.

### Application security
- Input validation via Zod schemas; output encoding handled by React.
- CSRF mitigated via same-site cookies + anti-CSRF tokens for share forms.
- Rate limiting enforced at edge (07-04).
- Dependency scanning via pnpm audit + GitHub Dependabot; high severity issues patched within 72 hours.

### Infrastructure
- Vercel serverless functions; environment variables managed via UI with audit trail.
- Neon Business tier includes point-in-time recovery.
- Logging via structured pino logs; PII redacted before sending to Sentry.
- CDN security: HSTS, strict CSP, X-Frame-Options DENY.

### Monitoring & detection
- Sentry for error/performance alerts; SLO dashboards monitor availability and latency.
- Audit logs capture all admin actions, share link changes, asset events.
- Security incidents tracked in Notion runbook; severity categories align with incident response doc.

### Incident response
- Incident runbook in 11-05; P1 incidents require response within 15 minutes, escalation to reliability partner; P0 requires immediate rollback.
- Post-incident review within 48 hours using postmortem template.

### Compliance & governance
- Residency evidence generated weekly; stored for 5 years.
- DSAR workflow defined (06-05, 11-03).
- Annual vendor review for Clerk, Mux, Resend, Neon, Vercel.

### Training & awareness
- Security checklist part of Definition of Done (02-05).
- Agency onboarding includes portal security briefing and share link best practices.

### Future improvements
- Consider enabling passkeys for admin accounts, implementing automated pen-test tooling, exploring CSP nonce enforcement for inline scripts.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [04-04-threat-model](../04-architecture-and-decisions/04-04-threat-model.md)
- [11-02-secrets-management](11-02-secrets-management.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [11-03-privacy-and-data-protection](11-03-privacy-and-data-protection.md)
- [11-05-incident-response](11-05-incident-response.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do enterprise clients require third-party penetration testing evidence prior to go-live?
- Should we adopt automated secrets scanning (e.g., GitHub Advanced Security) before general release?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Managed services maintain their security posture; vendor incidents monitored via status feeds.
- Portal access pattern remains manageable; if multi-agency load increases, revisit rate limits and monitoring thresholds.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Security advisory review (September 2025)
- Vendor trust reports (Clerk, Mux, Neon, Resend, Vercel)
- Motion Mavericks policy documents
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
