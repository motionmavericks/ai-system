<!-- ai:managed start file="docs/playbook/15-performance-and-reliability/15-02-capacity-planning.md" responsibility="docs" strategy="replace" -->
---
title: "Capacity Planning – Motion Mavericks Portal"
doc_path: "docs/playbook/15-performance-and-reliability/15-02-capacity-planning.md"
doc_type: "reliability"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "Finance Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [capacity, reliability]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Capacity Planning – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="reliability"
     path="docs/playbook/15-performance-and-reliability/15-02-capacity-planning.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>capacity, reliability</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This capacity plan projects infrastructure and service requirements to support Motion Mavericks’ portal as agency adoption grows. It covers Vercel, Neon, Upstash, Mux, and Resend limits, ensuring adequate headroom for Admin, Agency, and Guest workloads and compliance with RPO/RTO.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Initial pilots involve two agencies; roadmap anticipates scaling to seven agencies and hundreds of guest reviewers. Capacity must support peak campaign periods with high asset streaming and notification volumes. Budget constraints require efficient scaling while maintaining Australian data residency.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Compute, storage, bandwidth, and third-party service limits.
- Growth assumptions for projects, milestones, tasks, assets, and notifications.
- Upgrade triggers and procurement lead times.
- Excludes general corporate IT capacity.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Demand projections
| Metric | Current (Q3 2025) | Q1 2026 | Q3 2026 |
|--------|------------------|---------|---------|
| Active agencies | 2 | 5 | 7 |
| Active projects | 12 | 35 | 50 |
| Milestones | 140 | 400 | 600 |
| Assets uploaded/month | 320 | 900 | 1,400 |
| Share link views/month | 2,500 | 7,500 | 12,000 |
| Notification emails/month | 1,200 | 3,600 | 6,000 |

### Service capacity and scaling
| Service | Current tier | Max safe utilisation | Upgrade trigger | Next tier |
|---------|--------------|----------------------|-----------------|----------|
| Vercel | Pro plan w/ 2 concurrent builds | 70% edge function CPU | 10% error budget spend or >80% CPU over 3 days | Enterprise tier |
| Neon | `pro` 2 vCPU 4 GB | 60% CPU, 70% storage | DB CPU >65% sustained, storage >75% | 4 vCPU 8 GB + read replica |
| Upstash Redis | Standard 1 | 60 req/s | >55 req/s sustained, >80% memory | Standard 2 |
| Mux | Standard 1080p | 1,000 min streaming/day | >75% stream minutes usage | Custom plan w/ reserved minutes |
| Resend | Business plan (100k emails) | 70% | >70k emails/month | Enterprise contract |
| Storage (S3-compatible) | 5 TB | 80% | >4 TB | Expand bucket, apply lifecycle rules |

### Headroom policy
- Maintain 30% buffer across compute, storage, and bandwidth.
- Use auto-scaling rules where available (Vercel concurrency, Neon read replicas) with upper bounds defined.

### Monitoring
- Grafana dashboards track utilisation; alerts at 70% and 85% thresholds.
- Monthly capacity review meeting with Reliability, Finance, Technical Lead.
- Quarterly forecast update based on actual adoption metrics and planned campaigns.

### Cost projections
| Service | Current monthly cost | Q1 2026 forecast | Notes |
|---------|----------------------|------------------|-------|
| Vercel | $1,200 | $1,800 | Enterprise upgrade assumed Q2 2026 |
| Neon | $600 | $1,200 | Additional replica + storage |
| Mux | $900 | $1,400 | Additional streaming minutes |
| Resend | $80 | $150 | Business tier sufficient through Q1 |
| Upstash | $40 | $70 | Upgrading to Standard 2 |

Budget confirmed with Finance Lead for FY26 subject to actual utilisation.

### Contingency plans
- If usage exceeds projections by >20%, trigger fast-track review within one week.
- Pre-negotiate burst capacity with Mux and Resend to avoid throttling.
- Keep pre-provisioned Neon replica ready for immediate promotion.

### Documentation and compliance
- Update risk register if capacity constraints risk SLO breach.
- Record vendor upgrade approvals in compliance checklist (11-04).
- Align capacity changes with disaster recovery plan (15-04).
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [15-01-load-and-stress-testing](15-01-load-and-stress-testing.md)
- [13-02-cd-and-release-strategy](../13-devops-ci-cd/13-02-cd-and-release-strategy.md)
- [19-05-roadmap-prioritisation](../19-post-launch/19-05-roadmap-prioritisation.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [15-03-reliability-engineering](15-03-reliability-engineering.md)
- [18-02-cutover-plan](../18-release-and-cutover/18-02-cutover-plan.md)
- [11-04-compliance-checklist](../11-security-and-compliance/11-04-compliance-checklist.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we reserve dedicated CDN capacity for high-profile launches to guarantee playback quality?
- Do we need to budget for an EU data replica if an agency expands outside AU sooner than expected?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Agency growth follows planned onboarding schedule without sudden spikes beyond 20% variance.
- Vendor pricing remains stable; significant increases trigger renegotiation.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Forecast spreadsheet (August 2025)
- Vendor pricing sheets (Vercel, Neon, Mux, Resend)
- Historical usage metrics from pilot projects
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
