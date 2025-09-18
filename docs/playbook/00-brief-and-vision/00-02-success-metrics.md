<!-- ai:managed start file="docs/playbook/00-brief-and-vision/00-02-success-metrics.md" responsibility="docs" strategy="replace" -->
---
title: "Motion Mavericks Success Metrics"
doc_path: "docs/playbook/00-brief-and-vision/00-02-success-metrics.md"
doc_type: "metric-pack"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [metrics, governance, operations]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Motion Mavericks Success Metrics

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="metric-pack"
     path="docs/playbook/00-brief-and-vision/00-02-success-metrics.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>metrics, governance, operations</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This metric pack defines how Motion Mavericks measures portal adoption, operational reliability, and client satisfaction during the production-management rollout. Each KPI links directly to the high-level brief priorities: rapid onboarding, full milestone coverage, resilient share links, inclusive accessibility, and dependable recovery. Meeting these targets is mandatory before expanding agency participation beyond the pilot cohort.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Owen must demonstrate to agencies and client stakeholders that the portal eliminates fragmented coordination while upholding compliance obligations. Metrics therefore emphasise onboarding friction, project completeness, playback reliability, accessibility, and operational guardrails such as residency, RPO/RTO, and incident response cadence. Cadences align with automation rhythms and the lightweight staffing model Motion Mavericks operates.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- In scope: launch-readiness and early post-launch indicators for Admin, Agency, and Guest experiences across projects, milestones, assets, and notifications.
- Excludes revenue or marketing metrics; these will be defined once the portal proves production effectiveness.
- Assumes data pipelines from Vercel Analytics, Neon, Mux, Clerk, and Resend are available without additional licensing hurdles.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details
| Metric | Definition | Target | Data source | Cadence | Owner |
|--------|------------|--------|-------------|---------|-------|
| Agency onboarding time | Median time from invitation email to first authenticated dashboard view | ≤5 minutes | Clerk invite logs, Vercel Analytics | Weekly | Owen (Founder) |
| Milestone coverage | Percentage of active project milestones represented in portal with status and due date | 100% for pilot projects | Project DB snapshots, admin audit exports | Twice weekly | Agency Partner Lead |
| Task completion accuracy | Variance between reported task completion in portal and actual delivery sign-off | ≤2% variance | Portal task logs, project retros | Weekly | Agency Producer Representative |
| Share link engagement | Percentage of share links opened within 48 hours and playback error rate | ≥80% opens; <1% playback errors | Mux analytics, share link audit table | Weekly | Client Success Lead |
| Accessibility compliance | WCAG 2.2 AA automated scan pass rate for critical flows | 100% pass across smoke suite | Axe CI reports, manual audit log | Sprintly | Design Lead (external) |
| Availability and recovery | Achieved uptime and recovery metrics vs targets (99.9% availability, RPO ≤24 h, RTO ≤1 h) | Targets met with ≤20% error budget burn | Vercel status, Neon backup reports, incident log | Weekly | Reliability Partner |
| Notification delivery | Successful delivery rate for transactional notifications within 60 seconds | ≥98% delivered ≤60 s | Resend delivery stats, in-app event log | Weekly | Platform Engineer (contract) |
]]></content>
    </section>

    <section id="metrics" heading="Metrics and acceptance">
      <instructions>Include success metrics, acceptance tests, or release criteria. Remove if unnecessary.</instructions>
      <content><![CDATA[
## Metrics and acceptance
- Go-live requires three consecutive reporting cycles hitting all targets; any breach triggers root-cause review and remediation plan before progressing.
- Availability, recovery, and notification delivery metrics double as SLO monitors; exceeding error budget halts new feature rollout until stability restored.
- Accessibility compliance must be evidenced with automated scan artefacts and a signed manual audit checklist prior to agency onboarding.
]]></content>
    </section>

    <section id="dependencies" heading="Dependencies">
      <instructions>List dependencies, lead teams, and status. Remove if none.</instructions>
      <content><![CDATA[
## Dependencies
- Vercel Analytics and Neon audit exports must be available to Owen and the reliability partner for timely reporting.
- Mux analytics integration requires API keys rotated every 180 days; share link dashboards depend on this feed.
- Accessibility scans rely on the design partner delivering Axe configuration and manual testing scripts.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [Legacy MVP plan (context only)](../../specs/legacy-mvp-plan.md)
- [Playbook orchestration guide](../0-templates/03-playbook-docs-orchestration-guide.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [00-01-product-vision](00-01-product-vision.md)
- [02-02-acceptance-criteria](../02-requirements-and-scope/02-02-acceptance-criteria.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Track unresolved points.</instructions>
      <content><![CDATA[
## Open questions
- Determine whether agencies need per-milestone variance dashboards or if aggregate reporting suffices for launch.
- Confirm if guest playback telemetry must be surfaced to clients directly or summarised in weekly digests.
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>Document assumptions with validation plans.</instructions>
      <content><![CDATA[
## Assumptions
- Clerk and Resend logs can be exported without breaching privacy commitments; validate with compliance advisor.
- Pilot agencies will update milestones twice weekly; confirm cadence during onboarding workshops.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>List primary information sources.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks portal integrated execution brief (v0.3.0)
- Motion Mavericks stakeholder interviews (August–September 2025 notes)
- WCAG 2.2 AA compliance checklist maintained by design partner
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
