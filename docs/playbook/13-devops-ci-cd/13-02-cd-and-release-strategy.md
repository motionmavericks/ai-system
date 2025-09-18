<!-- ai:managed start file="docs/playbook/13-devops-ci-cd/13-02-cd-and-release-strategy.md" responsibility="docs" strategy="replace" -->
---
title: "CD and Release Strategy – Motion Mavericks Portal"
doc_path: "docs/playbook/13-devops-ci-cd/13-02-cd-and-release-strategy.md"
doc_type: "devops"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [cd, release-management]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# CD and Release Strategy – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="devops"
     path="docs/playbook/13-devops-ci-cd/13-02-cd-and-release-strategy.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>cd, release-management</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document defines the continuous delivery and release strategy for the Motion Mavericks portal. It describes environment progression, promotion rules, feature flag usage, and communication cadences required to launch updates safely to Admin, Agency, and Guest users while meeting availability, residency, and compliance commitments.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal deploys on Vercel with serverless functions, Neon database, and Mux for assets. Agencies depend on stable milestone tracking, and clients rely on share links with minimal downtime. Releases must coordinate with notifications and legal obligations, aligning with RPO/RTO and change management requirements.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Deployment pipeline from development previews through staging and production.
- Versioning, release cadence, change management communication.
- Feature flags and rollout strategies (A/B, tenant gating).
- Excludes infrastructure provisioning (see 13-03) and incident rollback specifics (see 13-05).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Environments and promotion
| Environment | Purpose | Trigger | Validation |
|-------------|---------|---------|------------|
| Preview | PR-specific builds for review | Automatic on PR via Vercel preview | CI required checks, stakeholder visual review |
| Staging | Integrated test bed mirroring production config | Merge to `main` | Full regression (E2E, accessibility, performance smoke), data seeded |
| Production | Live tenant environment | Manual promotion via release workflow | Release checklist sign-off, change log update |

Promotion is linear; no direct deploy from preview to production.

### Release cadence
- **Regular release window**: Twice weekly (Tue/Thu 10:00 AEST) to minimise agency disruption.
- **Hotfix window**: Any time with approval from Reliability Partner + Client Success Lead.
- **Freeze periods**: During major client events; schedule communicated two weeks in advance.

### Release process
1. Create release branch `release/vX.Y.Z` from `main`.
2. Run staging regression suite; address blockers.
3. Update version metadata (package.json, docs as required).
4. Circulate release notes highlighting milestones, tasks, asset updates, share link changes.
5. Conduct release readiness review (Technical Lead, QA, Client Success, Security).
6. Deploy to production via Vercel promotion.
7. Execute smoke tests post-deploy (asset upload, share view, notification trigger).
8. Update change log (20-03) and support bulletin.

### Feature flags and gradual rollout
- Use LaunchDarkly (or Vercel Edge Config fallback) to control new features.
- Flags scoped by tenant (Admin, Agency), roles, or percentages for limited release.
- Example: new milestone analytics flag enabled for Motion Mavericks internal team first, then agencies.
- Flags must have rollback plan and removal timeline (≤2 sprints post-global launch).

### Communication plan
- Release notes emailed to agencies and internal stakeholders after deployment.
- Slack updates to `#portal-release` summarising user-facing changes and testing status.
- Client Success schedules optional walk-through for significant features (e.g., new share link workflows).

### Compliance and audit
- Maintain release artefacts (test reports, approvals) in `<REDACTED>` drive for 24 months.
- Verify privacy policy reference unchanged or update coordinated with Legal (see 17-03).
- Ensure `HighLevel.Final` and context JSON remain current after major release.

### Metrics
- Deployment frequency target: ≥2 per week.
- Change failure rate: <15% (tracked via incidents/sev metrics).
- Mean time to restore: ≤1 h per severity commitments.
- Track feature flag lifetime to avoid tech debt.

### Dependency management
- Upgrades (Next.js, Drizzle, Mux SDK) scheduled monthly; release notes flagged for testing focus.
- Security patches expedited via hotfix but still follow release documentation.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [18-01-release-checklist](../18-release-and-cutover/18-01-release-checklist.md)
- [15-04-disaster-recovery](../15-performance-and-reliability/15-04-disaster-recovery.md)
- [11-04-compliance-checklist](../11-security-and-compliance/11-04-compliance-checklist.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [13-05-rollback-and-hotfix](13-05-rollback-and-hotfix.md)
- [12-04-e2e-tests](../12-testing-and-quality/12-04-e2e-tests.md)
- [16-02-runbooks](../16-documentation-and-training/16-02-runbooks.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we implement canary deployments using Vercel regions before full production rollout?
- Do we require sign-off from agency partners for breaking UI changes prior to deployment?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Vercel supports required rollback features and environment promotion APIs.
- Agency partners accept twice-weekly release cadence with notice.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Motion Mavericks release process retrospective (2024)
- Vercel deployment documentation
- LaunchDarkly rollout best practices
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
