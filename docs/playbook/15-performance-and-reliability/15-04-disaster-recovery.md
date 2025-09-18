<!-- ai:managed start file="docs/playbook/15-performance-and-reliability/15-04-disaster-recovery.md" responsibility="docs" strategy="replace" -->
---
title: "Disaster Recovery – Motion Mavericks Portal"
doc_path: "docs/playbook/15-performance-and-reliability/15-04-disaster-recovery.md"
doc_type: "reliability"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Security Specialist", "Technical Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [disaster-recovery, resilience]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Disaster Recovery – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="reliability"
     path="docs/playbook/15-performance-and-reliability/15-04-disaster-recovery.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>disaster-recovery, resilience</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This disaster recovery (DR) plan ensures Motion Mavericks meets RPO ≤24 h and RTO ≤1 h. It covers recovery workflows for portal infrastructure, databases, asset storage, and notification pipelines following incidents such as Neon outages, Mux downtime, or major security events.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal coordinates active productions; downtime disrupts agency collaboration and client approvals. Services run in Australian regions, with dependencies on Neon, Vercel, Mux, Upstash, and Resend. DR planning must preserve data integrity, comply with privacy laws, and integrate with incident response (11-05).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Recovery procedures for application, database, asset pipeline, notifications, and audit logs.
- Backup schedules, verification, and failover processes.
- Communication plans and documentation requirements.
- Excludes corporate IT and office infrastructure.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Recovery matrix
| Service | RPO | RTO | Strategy |
|---------|-----|-----|----------|
| Vercel application | 0 (stateless) | ≤30 min | Deploy previous stable build, update DNS if region impacted |
| Neon database | ≤24 h | ≤60 min | Nightly backups + point-in-time restore, read replica promotion |
| Upstash Redis | ≤30 min | ≤30 min | Automated snapshot + warm standby deployment |
| Mux assets | ≤12 h (metadata), streaming immediate on recovery | ≤60 min | Use Mux redundancy, reissue playback tokens |
| Resend notifications | ≤1 h | ≤30 min | Retry queue, backup provider (SendGrid) manual fallback |
| Audit logs | ≤24 h | ≤4 h | Stored in Neon; included in backup strategy |

### Backup procedures
- Neon: PITR enabled, nightly full backups stored in encrypted S3 (Sydney). Weekly restore drill verifying integrity.
- Upstash: Daily snapshots stored in Upstash + exported to S3 via scheduled job.
- Vercel: Infrastructure code stored in Git; environment variables exported weekly to encrypted vault.
- Mux: Asset metadata exported weekly; assets replicated via Mux’s redundancy.
- Resend: Webhook events stored in Neon to allow replays.

### Failover workflow (Neon outage)
1. Incident Commander declares DR event.
2. Promote read replica (syd1) or restore from latest backup to new database.
3. Update connection strings (feature flags, environment variables) via Terraform.
4. Run migration validation script.
5. Resume traffic; monitor for consistency issues.
6. Post-event, perform data reconciliation and document actions.

### Application failover
- Deploy to backup Vercel project configured in separate region (Singapore) if Sydney region unavailable.
- Ensure data residency maintained by pointing app to AU databases; only stateless layer moves.
- Update DNS via automated script, TTL 5 minutes.

### Communication plan
- Internal: Notify via PagerDuty + `#incidents` channel with timeline updates every 30 minutes.
- External: Email agencies/clients summarising impact, expected recovery, and data status.
- Regulatory: Coordinate with Legal if privacy impact suspected.

### Testing cadence
- Quarterly DR drill alternating scenarios (Neon outage, Mux downtime, Resend outage).
- Document results, action items, and update runbooks.
- Include share link integrity verification post-drill.

### Documentation
- Maintain DR checklist in runbook (16-02) with step-by-step commands.
- Store critical credentials in 1Password; verify access during drills.
- Capture configuration snapshots before and after DR events.

### Post-recovery validation
- Smoke tests: project dashboard, milestone update, asset playback, notification send, share link view.
- Verify audit log continuity and share link audit events.
- Confirm backups still scheduled and functioning.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [15-01-load-and-stress-testing](15-01-load-and-stress-testing.md)
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
- [18-04-rollback-plan](../18-release-and-cutover/18-04-rollback-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [15-05-chaos-experiments](15-05-chaos-experiments.md)
- [18-03-data-migration-runbook](../18-release-and-cutover/18-03-data-migration-runbook.md)
- [20-01-postmortems-template](../20-archive-and-postmortems/20-01-postmortems-template.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we implement multi-region read replicas for Neon to accelerate failover beyond 60 minutes?
- Do we require contractual guarantees from Mux for AU-first failover paths?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Network connectivity between primary and backup environments remains intact during regional incident.
- Backup storage remains accessible and passes integrity checks.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Neon disaster recovery documentation
- Mux redundancy whitepaper
- Motion Mavericks DR tabletop outputs (2025)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
