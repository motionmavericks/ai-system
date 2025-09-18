<!-- ai:managed start file="docs/playbook/13-devops-ci-cd/13-04-environment-configs.md" responsibility="docs" strategy="replace" -->
---
title: "Environment Configurations – Motion Mavericks Portal"
doc_path: "docs/playbook/13-devops-ci-cd/13-04-environment-configs.md"
doc_type: "devops"
status: "Draft"
version: "0.2.0"
owner: "Technical Lead"
reviewers: ["Reliability Partner", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [environment, configuration]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Environment Configurations – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="devops"
     path="docs/playbook/13-devops-ci-cd/13-04-environment-configs.md"
     version="0.2.0"
     status="Draft"
     owner="Technical Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>environment, configuration</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document details configuration profiles for Motion Mavericks environments (development, staging, production). It captures environment variables, feature flags, integrations, and safeguards ensuring consistent behaviour for Admin, Agency, and Guest flows while maintaining AU residency, RPO/RTO, and compliance commitments.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Differences between environments previously caused share link token mismatches and notification errors. Aligning configurations ensures reliability, simplifies onboarding, and supports compliance audits. Configurations interact with secrets management (11-02) and IaC (13-03).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Environment variables across dev, staging, prod.
- Feature flag defaults per environment.
- Integration endpoints (Mux, Resend, Clerk, Neon, Upstash, Sentry).
- Logging and monitoring configuration overrides.
- Excludes local developer overrides (documented separately).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Environment summary
| Key | Development | Staging | Production |
|-----|-------------|---------|------------|
| Domain | dev.portal.motionmavericks.au | staging.portal.motionmavericks.au | portal.motionmavericks.au |
| Neon branch | `dev` (syd1) | `staging` (syd1) | `prod` (syd1) |
| Upstash Redis | `mm-dev` | `mm-staging` | `mm-prod` |
| Clerk instance | `clerk-mm-dev` | `clerk-mm-staging` | `clerk-mm-prod` |
| Resend domain | `dev.motionmavericks.au` | `staging.motionmavericks.au` | `motionmavericks.au` |
| Mux environment | Sandbox | Sandbox | Production |
| Feature flags | Experimental features on by default for internal testers | Enabled per QA plan | Off by default until release |
| Monitoring | Sentry project `mm-dev` | `mm-staging` | `mm-prod` |

### Core environment variables (non-sensitive)
| Variable | Description | Dev | Staging | Prod |
|----------|-------------|-----|---------|------|
| `NEXT_PUBLIC_APP_ENV` | Environment tag for UI | `development` | `staging` | `production` |
| `NEXT_PUBLIC_API_BASE_URL` | API hostname | `https://dev-api.motionmavericks.au` | `https://staging-api.motionmavericks.au` | `https://api.motionmavericks.au` |
| `NEXT_PUBLIC_MUX_ENV_KEY` | Playback environment label | `dev` | `staging` | `prod` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Support contact | `support+dev@motionmavericks.au` | `support+staging@motionmavericks.au` | `support@motionmavericks.au` |
| `NEXT_PUBLIC_ANALYTICS_WRITE_KEY` | Segment/analytics key | `<PLACEHOLDER>` | `<PLACEHOLDER>` | `<PLACEHOLDER>` |

Sensitive variables (API keys, secrets) referenced from secrets vault per environment.

### Feature flag defaults
| Flag | Purpose | Dev | Staging | Prod |
|------|---------|-----|---------|------|
| `milestone_analytics` | Enhanced reporting | ON | ON (selected tenants) | OFF (enable post-go-live) |
| `asset_batch_upload` | Upload multiple files | ON | ON | OFF |
| `guest_commenting` | Allow guests to comment | ON | ON (pilot clients) | OFF until legal approval |
| `digest_notifications_v2` | Improved digest format | ON | ON | ON |

### Logging & monitoring
- Dev: Verbose logging, sampling 100% for debugging. Alerting disabled.
- Staging: Sanitised logs, sampling 50%, alerts to `#staging-alerts`.
- Production: PII redaction enforced, sampling 25%, alerts to on-call rotation.
- Audit logs stored in Neon with retention 365 days staging/prod, 30 days dev.

### Deployment guardrails
- Staging requires manual sign-off before production promotion.
- Production environment variables updated via IaC pipeline to ensure audit trail.
- Backups scheduled nightly for all DBs; dev backup retention shorter (7 days).

### Data policies
- Dev uses synthetic data only; no real client assets.
- Staging may include anonymised sample assets with client consent; ensure share links hashed to prevent external access.
- Production strictly controlled; share link TTL default 14 days.

### Configuration change process
1. Update Terraform or environment configuration file.
2. Submit PR with rationale, risk assessment, testing plan.
3. Security review required for production changes affecting privacy or residency.
4. Post-change, validate via smoke tests (share link, notifications) and log results.
5. Document in change log and compliance register if material.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [05-03-environments-and-secrets](../05-project-setup/05-03-environments-and-secrets.md)
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
- [12-05-performance-tests](../12-testing-and-quality/12-05-performance-tests.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [13-03-infrastructure-as-code](13-03-infrastructure-as-code.md)
- [15-04-disaster-recovery](../15-performance-and-reliability/15-04-disaster-recovery.md)
- [18-02-cutover-plan](../18-release-and-cutover/18-02-cutover-plan.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we introduce a QA environment distinct from staging to support agency training sessions?
- Do we enable partial production data masking for staging analytics while protecting privacy?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Vercel environment configs support required overrides without manual drift.
- Agency partners will adopt staging for pre-release validation when provided credentials.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Env configuration spreadsheet (2025 refresh)
- Vercel environment documentation
- Internal compliance notes on data residency
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
