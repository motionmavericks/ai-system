<!-- ai:managed start file="docs/playbook/18-release-and-cutover/18-01-release-checklist.md" responsibility="docs" strategy="replace" -->
---
title: "Release Checklist – Motion Mavericks Portal"
doc_path: "docs/playbook/18-release-and-cutover/18-01-release-checklist.md"
doc_type: "release"
status: "Draft"
version: "0.2.0"
owner: "Technical Lead"
reviewers: ["Reliability Partner", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [release, checklist]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Release Checklist – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="release"
     path="docs/playbook/18-release-and-cutover/18-01-release-checklist.md"
     version="0.2.0"
     status="Draft"
     owner="Technical Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>release, checklist</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This checklist governs releases of the Motion Mavericks portal. It ensures quality, compliance, and stakeholder readiness before production deployment, covering technical, operational, legal, and communication checkpoints.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Releases impact Admin, Agency, and Guest users relying on accurate milestones, tasks, assets, notifications, and share links. Launches must maintain AU residency, RPO/RTO guarantees, and align with marketing/legal commitments. This checklist integrates requirements from testing, security, reliability, and GTM plans.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Applies to major and minor production releases.
- Includes ≥25 checks spanning engineering, QA, security, compliance, support, marketing.
- Excludes emergency hotfixes (see 13-05) though many steps reused.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Pre-flight checklist (≥25 items)
| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | CI pipeline green (lint, type-check, unit, integration, e2e) | Technical Lead | ☐ |
| 2 | Accessibility suite (12-06) passes without serious violations | QA Engineer | ☐ |
| 3 | Performance smoke tests (12-05) within SLO | Reliability Partner | ☐ |
| 4 | Load test review completed if major change | Reliability Partner | ☐ |
| 5 | Database migrations reviewed and applied to staging | Technical Lead | ☐ |
| 6 | Feature flags configured for staged rollout | Product Manager | ☐ |
| 7 | Security review sign-off (11-05) for new features | Security Specialist | ☐ |
| 8 | Privacy/terms updates published if required (17-03) | Legal Counsel | ☐ |
| 9 | Compliance checklist items validated (11-04) | Security Specialist | ☐ |
|10 | DR plan impact assessed (15-04) | Reliability Partner | ☐ |
|11 | Runbook updates merged (16-02) | Reliability Partner | ☐ |
|12 | User guides updated (16-05) | Client Success Lead | ☐ |
|13 | Support playbooks briefed on changes (16-03) | Client Success Lead | ☐ |
|14 | Change log draft entry prepared (20-03) | Docs Agent | ☐ |
|15 | Marketing assets ready (17-04) | Marketing Lead | ☐ |
|16 | Release notes drafted & reviewed | Product Manager | ☐ |
|17 | Agency communication plan approved (18-05) | Client Success Lead | ☐ |
|18 | Incident response playbook updated (11-05) | Security Specialist | ☐ |
|19 | Observability dashboards validated (14-05) | Reliability Partner | ☐ |
|20 | Alert thresholds tuned if required (14-04) | Reliability Partner | ☐ |
|21 | Backup status confirmed (Neon + Upstash) | Reliability Partner | ☐ |
|22 | Rollback plan updated (18-04) | Reliability Partner | ☐ |
|23 | Data migration scripts tested (18-03) | Technical Lead | ☐ |
|24 | Legal approvals recorded for marketing/terms | Legal Counsel | ☐ |
|25 | Finance notified of pricing changes (17-01) | Finance Lead | ☐ |
|26 | On-call schedule verified (19-01) | Reliability Partner | ☐ |
|27 | PagerDuty test alert completed | Reliability Partner | ☐ |
|28 | Production access audit performed | Security Specialist | ☐ |
|29 | Release branch tagged and signed | Technical Lead | ☐ |
|30 | Go/no-go meeting conducted with sign-offs | Owen (Founder) | ☐ |

### Release execution steps
1. Confirm checklist complete, gather sign-offs.
2. Promote build to staging; run smoke tests.
3. Deploy to production via Vercel promotion.
4. Validate smoke tests, share link functionality, asset playback, notifications.
5. Publish release notes, change log update, marketing comms.
6. Monitor metrics and alerts for minimum 60 minutes.
7. Close release ticket with summary and follow-up tasks.

### Sign-off roles
- Technical Lead (engineering readiness)
- Reliability Partner (SLO/operations)
- Client Success Lead (customer readiness)
- Legal Counsel (compliance)
- Marketing Lead (communications)
- Founder (final approval)
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [12-01-test-strategy](../12-testing-and-quality/12-01-test-strategy.md)
- [13-02-cd-and-release-strategy](../13-devops-ci-cd/13-02-cd-and-release-strategy.md)
- [18-04-rollback-plan](18-04-rollback-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [18-02-cutover-plan](18-02-cutover-plan.md)
- [18-05-launch-comms](18-05-launch-comms.md)
- [20-03-change-log](../20-archive-and-postmortems/20-03-change-log.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we automate checklist verification within CI/CD pipelines?
- Do we require external stakeholder approval for major UX changes before release?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- All stakeholders available for go/no-go meeting.
- Release tooling (Vercel, PagerDuty, Slack) functioning as expected.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Release retrospective notes (2024)
- Reliability readiness checklist drafts
- Marketing launch documentation
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
