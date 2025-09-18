<!-- ai:managed start file="docs/playbook/13-devops-ci-cd/13-03-infrastructure-as-code.md" responsibility="docs" strategy="replace" -->
---
title: "Infrastructure as Code – Motion Mavericks Portal"
doc_path: "docs/playbook/13-devops-ci-cd/13-03-infrastructure-as-code.md"
doc_type: "devops"
status: "Draft"
version: "0.2.0"
owner: "Technical Lead"
reviewers: ["Reliability Partner", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [iac, terraform]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Infrastructure as Code – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="devops"
     path="docs/playbook/13-devops-ci-cd/13-03-infrastructure-as-code.md"
     version="0.2.0"
     status="Draft"
     owner="Technical Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>iac, terraform</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document captures the infrastructure-as-code (IaC) approach for Motion Mavericks. It defines how we manage Vercel projects, Neon databases, Upstash Redis, and ancillary services through Terraform and provider-specific tooling to guarantee repeatable environments aligned with AU residency, RPO/RTO, and security requirements.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Initial environments were provisioned manually, increasing drift risk and complicating compliance audits. IaC enables consistent rollout for Admin, Agency, and Guest services across development, staging, and production. Sensitive values managed separately via secrets policy (11-02).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Terraform modules for Vercel projects, environment variables, and preview deployments.
- Neon database provisioning, roles, backup policies.
- Upstash Redis instances for share token caching and rate limiting.
- Monitoring integrations (Sentry, Grafana) where supported via IaC.
- Excludes Mux (managed via dashboard API) and Resend (API provisioning) but documents manual steps.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Repository structure
```
infra/
  environments/
    dev/
    staging/
    prod/
  modules/
    vercel-site/
    neon-db/
    upstash-redis/
    sentry-project/
  terragrunt.hcl
```

- Each environment inherits base configuration, overriding residency (AU), scaling, and feature flags.
- State stored in Terraform Cloud workspace `<REDACTED>` with role-based access.

### Core modules
| Module | Purpose | Key variables |
|--------|---------|---------------|
| `vercel-site` | Creates Vercel project, domains, environment variables | `project_name`, `framework`, `env_secrets`, `team_id` |
| `neon-db` | Provisions Neon branch, roles, storage | `project_id`, `branch_name`, `region=syd1`, `backup_retention_days` |
| `upstash-redis` | Instantiates Redis database for share tokens | `region=ap-southeast-1`, `eviction_policy=noeviction`, `read_only_token` |
| `sentry-project` | Configures Sentry project + alert rules | `team_slug`, `project_slug`, `dsn` |

### Workflow
1. Developer updates Terraform module or environment configuration.
2. Run `terraform plan`/`terragrunt plan` locally; review diff for drift.
3. Submit PR; CI runs `terraform fmt`, `validate`, and `plan` (output as artefact).
4. Upon approval, merge triggers Terraform Cloud apply with manual confirmation for production.
5. Record change in change log and compliance register if impacting residency or security.

### Secrets and sensitive data
- Terraform references placeholders; actual secrets stored in 1Password and injected via Vercel API after provisioning.
- For Neon, use separate script to set passwords post-create to avoid storing in state.

### Drift detection
- Scheduled weekly `terraform plan` against all environments; alerts posted if drift detected.
- Manual changes discouraged; if necessary, record and codify in IaC within 24 hours.

### Backup and recovery
- Neon module enforces PITR backups, retention 7 days dev, 14 staging, 30 prod.
- Upstash backups configured to daily snapshots.
- Document rediscovery steps in 15-04 for disaster recovery.

### Compliance
- Terraform code reviewed by Security Specialist for production changes.
- Use tags to label resources for cost allocation (`env`, `owner`, `data_class`).
- Retain Terraform plans (prod) for 24 months for audit.

### Manual configuration registry
| Service | Manual steps | Owner |
|---------|--------------|-------|
| Mux | Upload presets, configure signing keys | Reliability Partner |
| Resend | Create domains, verify DKIM/SPF | Client Success Lead |
| Clerk | Configure magic link settings, role mappings | Technical Lead |

Document manual steps in runbooks (16-02) and align with compliance checklist.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [06-02-data-storage-policies](../06-data-model-and-storage/06-02-data-storage-policies.md)
- [11-02-secrets-management](../11-security-and-compliance/11-02-secrets-management.md)
- [15-02-capacity-planning](../15-performance-and-reliability/15-02-capacity-planning.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [13-04-environment-configs](13-04-environment-configs.md)
- [18-03-data-migration-runbook](../18-release-and-cutover/18-03-data-migration-runbook.md)
- [20-02-retrospectives](../20-archive-and-postmortems/20-02-retrospectives.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we adopt Pulumi or Terraform Cloud run tasks for policy-as-code (e.g., residency validation)?
- Do we integrate cost management tooling (Infracost) into plan reviews?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Providers offer stable APIs for Vercel, Neon, Upstash at required features.
- Terraform state remains accessible and encrypted per workspace policy.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Terraform module prototypes (2025)
- Vendor API docs (Vercel, Neon, Upstash)
- Motion Mavericks ops wiki (infrastructure chapter)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
