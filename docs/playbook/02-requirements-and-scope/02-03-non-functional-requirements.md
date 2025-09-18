<!-- ai:managed start file="docs/playbook/02-requirements-and-scope/02-03-non-functional-requirements.md" responsibility="docs" strategy="replace" -->
---
title: "Non-functional Requirements – Motion Mavericks Portal"
doc_path: "docs/playbook/02-requirements-and-scope/02-03-non-functional-requirements.md"
doc_type: "nfr"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Compliance Advisor"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [requirements, nfr]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Non-functional Requirements – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="nfr"
     path="docs/playbook/02-requirements-and-scope/02-03-non-functional-requirements.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>requirements, nfr</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This table details Motion Mavericks’ non-functional requirements covering availability, latency, accessibility, residency, security, resilience, and observability. Targets align with the integrated execution brief and success metrics to ensure the portal can support production workloads, agency adoption, and client compliance expectations. Each entry lists measurement methods and environments.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Agencies and clients demand reliable access to milestones, tasks, and share links while meeting regulatory obligations such as AU residency and WCAG compliance. With limited headcount, Motion Mavericks must codify targets that external partners can operate against, ensuring SLOs, backup drills, and telemetry keep the portal resilient.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes performance, availability, accessibility, security, residency, playback, auditing, rate limiting, backup, and observability expectations.
- Applies to production and staging environments unless noted.
- Excludes roadmap features beyond MVP (e.g. multi-region failover).
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details
| Area | SLI/SLO | Target | Method | Env |
|------|---------|--------|--------|-----|
| Availability | Monthly uptime | ≥99.9% | Vercel uptime dashboard, 3rd-party ping | Prod |
| API latency | p95 response latency | <300 ms in ANZ | Vercel Analytics, synthetic tests | Prod |
| Web TTFB | p95 time to first byte | <400 ms (ANZ) | Web vitals telemetry | Prod |
| Video playback | p95 start time | <3 s at 25 Mbps | Mux analytics | Prod |
| Onboarding | Invite-to-login completion | ≤5 min median | Clerk logs, analytics funnel | Prod |
| Accessibility | WCAG 2.2 AA conformance | 100% critical flows | Axe CI + manual audit | Staging, Prod |
| Residency | AU data storage rate | 100% | Neon region reports, Vercel residency logs | Prod |
| Recovery | RPO | ≤24 h | Backup restore reports | Prod |
| Recovery | RTO | ≤1 h | Disaster-recovery drills | Prod |
| Notification delivery | Delivery success ≤60 s | ≥98% | Resend metrics, synthetic tests | Prod |
| Rate limiting | Share link abuse throttling | ≥98% abusive requests blocked | Edge middleware logs | Prod |
| Security | Magic link token expiry | ≤15 minutes validity | Auth audit logs | Prod |
| Audit logging | Event capture completeness | 100% admin + asset actions | Log aggregation, sampling | Prod |
| Observability | Alerting coverage | All P0/P1 routes monitored | Sentry alert catalogue, runbook review | Prod |
| Testing | E2E regression suite | 95% critical path coverage | Playwright CI reports | Staging |
| Backup drills | Frequency | Quarterly full restore | Runbook evidence | Staging, Prod |
| Incident response | Time to acknowledge | ≤15 minutes for P1 | Pager alerts, incident tooling | Prod |
| Privacy | DSAR completion | ≤30 days | Request tracker | Prod |
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [00-02-success-metrics](../00-brief-and-vision/00-02-success-metrics.md)
- [15-03-reliability-engineering](../15-observability-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [02-05-definition-of-done](02-05-definition-of-done.md)
- [15-04-disaster-recovery](../15-observability-and-reliability/15-04-disaster-recovery.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should share link rate limiting differentiate between geographic regions or rely on global thresholds?
- Do we need additional SLIs for mobile playback performance given client usage patterns?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Vercel and Neon dashboards expose residency and uptime metrics granular enough to satisfy audits.
- Mux analytics provides Australian edge data; confirm coverage before pilot launch.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks reliability workshops (September 2025)
- Vendor SLA documentation (Vercel, Neon, Mux, Clerk, Resend)
- Accessibility audit reports from design partner
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
