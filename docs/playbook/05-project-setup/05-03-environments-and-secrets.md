<!-- ai:managed start file="docs/playbook/05-project-setup/05-03-environments-and-secrets.md" responsibility="docs" strategy="replace" -->
---
title: "Environments and Secrets – Motion Mavericks Portal"
doc_path: "docs/playbook/05-project-setup/05-03-environments-and-secrets.md"
doc_type: "process"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [environments, secrets]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Environments and Secrets – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="process"
     path="docs/playbook/05-project-setup/05-03-environments-and-secrets.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>environments, secrets</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide defines Motion Mavericks portal environments (local, dev, staging, production) and secret management practices. It ensures compliance with AU residency, rotation schedules, and access controls across Clerk, Mux, Resend, Neon, and other services. Documentation underpins audits and incident response.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal relies on multiple managed services, each requiring API keys and webhook secrets. With limited staff, secrets must be stored centrally, rotated on schedule, and audited. Residency and recovery targets demand environment parity for testing backup drills.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Covers environment tiers, secret storage, rotation cadence, access control, and incident response for credential leaks.
- Excludes per-service configuration details (documented in integration playbooks).
- Assumes GitHub, Vercel, and Neon provide required audit trails.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Environment tiers
| Tier | Purpose | Hosting | Data residency | Notes |
|------|---------|---------|----------------|-------|
| Local | Developer iteration | Laptop + Docker (Neon sandbox) | N/A | Uses `.env.local` sample values without production data |
| Dev | Automated previews, early QA | Vercel preview deployments, Neon dev branch | AU | Data reset nightly; seeded fixtures |
| Staging | Pre-production validation, incident drills | Vercel staging project, Neon staging DB | AU | Mirrors production configs, includes anonymised real data snapshots |
| Production | Live tenant portal | Vercel production, Neon production | AU | Full monitoring, backup schedule, audit retention |

### Secret storage & access
- **Primary store**: Vercel environment variables per environment. Sensitive secrets encrypted at rest, accessible only to authorised maintainers.
- **Secondary store**: 1Password Business vault for break-glass recovery (Owen + reliability partner). Access changes logged.
- **Local development**: `.env.local` sourced from doppler CLI or 1Password; never committed.
- **Neon**: Roles and passwords rotated via Neon console and stored in Vercel envs; use least-privilege accounts (app, migrations, read-only).

### Required secrets (non-exhaustive)
| Key | Description | Rotation cadence | Owner |
|-----|-------------|------------------|-------|
| `CLERK_SECRET_KEY` | Auth server key | 180 days | Security specialist |
| `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET` | Video processing keys | 120 days | Reliability partner |
| `RESEND_API_KEY` | Email delivery | 90 days | Client success lead |
| `NEON_DATABASE_URL` | App database URL | 90 days (password rotation) | Reliability partner |
| `NEON_MIGRATIONS_URL` | Elevated migrations role | 90 days | Owen |
| `SENTRY_AUTH_TOKEN` | Error monitoring auth | 180 days | Technical delivery lead |
| `RESIDENCY_REPORT_SECRET` | Signed URL secret for compliance exports | 180 days | Owen |
| `SHARE_LINK_HASH_SALT` | Salt for token hashing | 365 days (requires data rehash plan) | Security specialist |

### Rotation process
1. Create change request in issue tracker referencing secret and environment.
2. Generate new key in service provider console.
3. Update Vercel environment variables (staging first, then production after validation).
4. Redeploy environment to pick up secret.
5. Update secondary storage (1Password) and document timestamp in rotation log (`docs/playbook/05-project-setup/_rotation-log.md` to be created).
6. Close change request after confirming monitoring shows no regressions.

### Incident response for secret leak
- Immediately revoke compromised credential in provider console.
- Notify stakeholders (security specialist, reliability partner, affected agencies) within 1 hour.
- Rotate dependent secrets, trigger forced logout if Clerk involved.
- Conduct post-incident review captured in `20-01-postmortems-template.md`.

### Compliance considerations
- Secrets never transmitted via email or chat; use 1Password share link with expiry.
- Logs and analytics scrub secret values before storage.
- EU or US environments not provisioned; ensures residency compliance.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [05-04-package-and-dependency-policy](05-04-package-and-dependency-policy.md)
- [11-02-secrets-management](../11-security-and-compliance/11-02-secrets-management.md)
- [15-04-disaster-recovery](../15-observability-and-reliability/15-04-disaster-recovery.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [05-05-precommit-and-ci-conventions](05-05-precommit-and-ci-conventions.md)
- [10-01-identity-provider](../10-integrations/10-01-identity-provider.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we adopt Doppler or Vault for centralised workflow post-MVP?
- Do compliance auditors require automated rotation evidence beyond manual log entries?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Vercel and Neon logs suffice for residency and access audits; validate quarterly.
- Agencies do not need environment access; all credentials managed centrally.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Reliability partner environment audit (September 2025)
- Security advisor rotation policy
- Vendor documentation (Clerk, Mux, Resend, Neon)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
