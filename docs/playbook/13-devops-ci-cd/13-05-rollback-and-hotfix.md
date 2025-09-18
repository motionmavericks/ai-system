<!-- ai:managed start file="docs/playbook/13-devops-ci-cd/13-05-rollback-and-hotfix.md" responsibility="docs" strategy="replace" -->
---
title: "Rollback and Hotfix – Motion Mavericks Portal"
doc_path: "docs/playbook/13-devops-ci-cd/13-05-rollback-and-hotfix.md"
doc_type: "devops"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [rollback, hotfix]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Rollback and Hotfix – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="devops"
     path="docs/playbook/13-devops-ci-cd/13-05-rollback-and-hotfix.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>rollback, hotfix</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document sets out rollback and hotfix procedures for the Motion Mavericks portal. It ensures rapid recovery from faulty releases affecting milestones, tasks, assets, share links, or notifications while meeting RTO ≤1 h and maintaining audit trails for compliance.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal serves multiple tenants and depends on Vercel, Neon, Mux, and Resend. Release issues can disrupt production schedules, so we need predefined rollback paths and hotfix workflows. Processes integrate with incident response (11-05) and disaster recovery (15-04).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Application rollback for Next.js deployments on Vercel.
- Database migration rollback and remediation steps.
- Hotfix branching model, approvals, and communication.
- Cache invalidation, share token revocation, and notification suppression during rollback.
- Excludes catastrophic infrastructure failure (handled in 15-04).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Rollback triggers
- P0/P1 incidents during or post-release (see 11-05 severity definitions).
- Significant regression in milestone/task operations, share link access, or notification delivery.
- Performance degradation breaching SLOs (>300 ms p95 or >1% error rate).
- Compliance risk identified (privacy bug, residency breach).

### Application rollback steps
1. Incident Commander authorises rollback.
2. Use Vercel CLI `vercel rollback <deployment-id>` to revert to previous stable deployment.
3. Confirm environment variables unchanged; reapply if release modified.
4. Run smoke tests: project dashboard load, asset playback, notification trigger.
5. Notify stakeholders (Slack `#portal-release`, email to agencies if externally visible).
6. Log action in incident report and change log.

### Database rollback
- Drizzle migrations versioned; use `pnpm db:rollback --to <timestamp>` when reversal safe.
- For destructive migrations, apply compensating migration (tracked in Linear) rather than raw rollback.
- Validate data integrity post-rollback with automated scripts (counts, audit log diff).
- If rollback fails, engage disaster recovery (restore from backup) per 15-04.

### Hotfix workflow
| Step | Action |
|------|--------|
| 1 | Branch from production tag `hotfix/<issue>` |
| 2 | Implement fix with targeted tests (unit/integration) |
| 3 | Run CI subset: lint, unit, integration, relevant Playwright smoke |
| 4 | Obtain approvals from Technical Lead + Reliability Partner |
| 5 | Deploy to staging, run smoke + regression as needed |
| 6 | Promote to production via release workflow, update change log |
| 7 | Monitor metrics + alerts for 60 minutes |

### Safeguards
- Freeze new feature deployments during hotfix window.
- Remove feature flags toggled during release to prevent stale state.
- Coordinate with Security Specialist if issue touches privacy or access control.

### Communication templates
- Internal update: "Rollback initiated at <time> due to <issue>. Expected impact <summary>.".
- External note (agencies/clients): "We temporarily reverted today’s update to protect asset access. Service remains available; no action needed.".
- Post-incident summary distributed within 24 hours.

### Audit and follow-up
- Capture timeline and remediation tasks in postmortem (20-01).
- Update root cause analysis, backlog items, and process improvements.
- Review release plan to prevent recurrence.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
- [15-04-disaster-recovery](../15-performance-and-reliability/15-04-disaster-recovery.md)
- [18-04-rollback-plan](../18-release-and-cutover/18-04-rollback-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [13-02-cd-and-release-strategy](13-02-cd-and-release-strategy.md)
- [18-02-cutover-plan](../18-release-and-cutover/18-02-cutover-plan.md)
- [20-01-postmortems-template](../20-archive-and-postmortems/20-01-postmortems-template.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we automate rollback triggers based on SLO breaches via Vercel APIs?
- Do we need a secondary staging environment dedicated to hotfix validation when staging already used by agencies?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Previous deployment remains viable and passes smoke tests when reactivated.
- Database migrations are reversible or have compensating scripts ready.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Vercel rollback documentation (2025)
- Motion Mavericks incident retrospectives (2024)
- Drizzle migration guidelines
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
