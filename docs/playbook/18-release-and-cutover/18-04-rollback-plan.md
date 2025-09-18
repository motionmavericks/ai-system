<!-- ai:managed start file="docs/playbook/18-release-and-cutover/18-04-rollback-plan.md" responsibility="docs" strategy="replace" -->
---
title: "Release Rollback Plan – Motion Mavericks Portal"
doc_path: "docs/playbook/18-release-and-cutover/18-04-rollback-plan.md"
doc_type: "release"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Technical Lead", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [rollback, release]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Release Rollback Plan – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="release"
     path="docs/playbook/18-release-and-cutover/18-04-rollback-plan.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>rollback, release</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This plan documents how to revert a Motion Mavericks portal release. It specifies triggers, procedures, roles, communication, and validation to restore service quickly while maintaining data integrity and compliance.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
While releases follow rigorous testing, defects may still emerge. Rollback must be fast (<30 minutes) to meet RTO targets and protect agency deliverables. Plan complements 13-05 but focuses on release event scenarios.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Rollback of application deployments, feature flags, and database migrations during release window.
- Communication with agencies, clients, and internal teams.
- Post-rollback validation and follow-up.
- Excludes catastrophic infrastructure failure (see 15-04).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Rollback triggers
- P0/P1 incidents caused by release (e.g., share link failure, asset upload outage).
- Security/privacy regression discovered post-release.
- Performance/SLO breach persisting >10 minutes.
- Failed migration causing data integrity issues.

### Decision flow
1. Incident Commander assesses severity with Technical Lead and Security Specialist.
2. If rollback criteria met, obtain approval from Founder + Client Success Lead (within 5 minutes).
3. Announce rollback in `#incidents` channel and PagerDuty incident timeline.

### Rollback procedure
1. **Freeze**: Disable feature flags added in release via LaunchDarkly.
2. **Application rollback**: `vercel rollback <prev-deployment>`.
3. **Database**: If migration applied, run rollback or compensating script; if data corruption suspected, switch to backup database snapshot (per 15-04) or restore from point-in-time.
4. **Cache**: Clear Upstash caches or revert schema-specific changes.
5. **Verification**: Run smoke tests (project view, milestone update, asset playback, share link open, notification trigger).
6. **Monitoring**: Confirm metrics return to normal, alerts clear.
7. **Communications**: Send rollback notice to agencies/clients with expected impact and next steps.

### Communication templates
- Internal: “Rollback initiated for release vX.Y.Z due to <issue>. Expect <impact>. Next update in 15 minutes.”
- External: “We rolled back today’s portal update to maintain reliability. Features remain available; no action required. We will advise when rescheduled.”
- Post-incident summary: Provide root cause, resolution, follow-up timeline.

### Data integrity checks post-rollback
- Compare database row counts vs pre-release snapshot.
- Validate share link tokens and expiry.
- Confirm notification queue empty of duplicates.
- Review audit log entries for unusual activity.

### Post-rollback actions
- Freeze releases until root cause identified and fix tested.
- Conduct incident review (20-01) within 3 business days.
- Update release plan with corrective measures and new timeline.
- Notify agencies of rescheduled release and key changes.

### Documentation
- Record rollback decision, timeline, and outcomes in change log (20-03).
- Attach monitoring graphs, logs, and tests to incident ticket.
- Update runbooks and testing coverage if gaps identified.

### Tooling readiness
- Maintain `prev-deployment` identifier list pre-release.
- Ensure migrations created with down scripts or compensating strategies.
- Keep backup share signing key available in case new key introduced.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [13-05-rollback-and-hotfix](../13-devops-ci-cd/13-05-rollback-and-hotfix.md)
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
- [15-04-disaster-recovery](../15-performance-and-reliability/15-04-disaster-recovery.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [18-01-release-checklist](18-01-release-checklist.md)
- [18-02-cutover-plan](18-02-cutover-plan.md)
- [20-01-postmortems-template](../20-archive-and-postmortems/20-01-postmortems-template.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we automate rollbacks via pipeline triggers for specific alert thresholds?
- Do we provide agencies with proactive alert when rollback occurs or wait for impact assessment?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Previous deployment remains stable and available for rollback.
- Feature flags allow immediate disablement of new functionality.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Incident retrospectives (2024)
- Vercel rollback documentation
- Reliability playbook drafts
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
