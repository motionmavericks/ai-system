<!-- ai:managed start file="docs/playbook/11-security-and-compliance/11-05-incident-response.md" responsibility="docs" strategy="replace" -->
---
title: "Incident Response – Motion Mavericks Portal"
doc_path: "docs/playbook/11-security-and-compliance/11-05-incident-response.md"
doc_type: "security"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Security Specialist", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [incident-response, security]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Incident Response – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="security"
     path="docs/playbook/11-security-and-compliance/11-05-incident-response.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>incident-response, security</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This incident response document outlines how Motion Mavericks detects, triages, and resolves security, privacy, and operational incidents impacting the production management portal. It defines severity levels, responder responsibilities, communication flows, and recovery expectations aligned with the 99.9% availability, AU residency, and RPO/RTO targets. The plan covers threats across Admin, Agency, and Guest interactions including share link misuse, asset compromise, and service outages.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal integrates Neon, Mux, Clerk, Resend, and Upstash Redis. Incidents affecting any service can disrupt project milestones, task tracking, or asset delivery, risking contractual penalties. Agencies and clients expect timely communication and recovery within one hour for critical outages. Privacy regulators require breach reporting within 72 hours when personal data is exposed.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Security, privacy, and availability incidents impacting portal infrastructure, data stores, or integrations.
- Includes share link abuse, credential compromise, data leakage, and critical service degradations.
- Excludes physical office events and agency-specific tooling incidents unless they affect portal data or users.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Roles and responsibilities
| Role | Primary contact | Responsibilities |
|------|-----------------|------------------|
| Incident Commander | Reliability Partner | Coordinate response, severity assignment, comms approvals |
| Security Lead | Security Specialist | Lead containment, forensic investigation, privacy liaison |
| Comms Lead | Client Success Lead | Manage stakeholder updates (Admin, Agency, Guest clients) |
| Scribe | Docs Agent | Capture timeline, actions, evidence |
| Technical SMEs | Assigned engineers | Restore services, validate fixes, run post-incident tests |
| Legal Liaison | Legal Counsel | Evaluate regulatory reporting obligations |

### Severity matrix
| Severity | Definition | Examples | Response target |
|----------|------------|----------|-----------------|
| SEV0 | Critical impact across tenants; data exfiltration likely | Neon breach exposing milestone data; share token leak used broadly | Immediate, RTO ≤1 h, notify stakeholders within 1 h |
| SEV1 | Major functionality loss or privacy suspicion | Mux streaming outage, Resend outage blocking notifications | Response within 30 min, recovery ≤4 h |
| SEV2 | Degraded performance or partial outage | Slow task updates, limited share link failures | Response within 2 h, recovery same business day |
| SEV3 | Minor incident, monitored | Access log anomaly, false positive alert | Document within 24 h |

Escalate severity if data integrity or residency controls are threatened.

### Response phases
1. **Detect**: Alerts from Sentry, Upstash rate limit monitors, Neon metrics, Mux webhooks. Teams also monitor support runbooks for user-reported issues.
2. **Assess**: Incident Commander assigns severity, opens incident channel `#inc-YYYYMMDD-<summary>`, logs start time, identifies impacted roles (Admin/Agency/Guest).
3. **Contain**: Isolate compromised components (revoke share tokens, disable affected features, rotate secrets). Capture forensic snapshot before cleanup.
4. **Eradicate**: Patch vulnerabilities, remove malicious access, restore configurations.
5. **Recover**: Validate data integrity; execute restore playbook if RPO breached; confirm asset playback and milestone integrity. Communicate resolution with action summary.
6. **Close**: Draft incident report using template (20-01). Capture lessons, backlog tasks, update change log.

### Communications cadence
- **Initial alert**: Within 15 minutes of SEV0/SEV1 detection to internal stakeholders (`incident@` list).
- **Client updates**: For SEV0/SEV1, send update email to impacted agencies/clients within 1 hour, referencing share link status and mitigation steps.
- **Regulator notice**: For confirmed personal data breaches, notify OAIC and EU authorities (if relevant) within 72 hours.
- **Internal summary**: Postmortem distributed within five business days.

### Tooling and artefacts
- PagerDuty or equivalent escalation tree for on-call (Reliability partner primary, Owen backup).
- Incident tracking board in Linear with template capturing severity, timeline, affected features, RPO/RTO status.
- Shared Google Drive folder `<REDACTED>` storing evidence, recordings, and signed postmortems.

### Testing and drills
- Quarterly tabletop exercise covering: Neon outage, share token leak, Mux DRM incident.
- Semi-annual full recovery drill invoking disaster recovery runbook (15-04).
- Monthly review of unresolved action items from prior incidents.

### Integration with privacy obligations
- For incidents involving personal data, immediately trigger DSR workflow freeze to prevent data loss.
- Legal Counsel reviews communication drafts before external distribution.
- Update compliance checklist evidence upon closure.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [HighLevel.Final](../../plan/HighLevel.Final.md)
- [11-03-privacy-and-data-protection](11-03-privacy-and-data-protection.md)
- [15-04-disaster-recovery](../15-performance-and-reliability/15-04-disaster-recovery.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
- [20-01-postmortems-template](../20-archive-and-postmortems/20-01-postmortems-template.md)
- [16-02-runbooks](../16-documentation-and-training/16-02-runbooks.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we procure third-party incident response retainer for forensic deep dives beyond internal capability?
- Do we need real-time SMS notifications for SEV0 incidents affecting agency principals?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- PagerDuty or alternative paging tool is configured with accurate contact rotation.
- Agencies maintain up-to-date contact lists for incident notifications.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Legacy incident postmortems (2024) stored in internal wiki
- PagerDuty incident response guide
- OAIC data breach reporting guide (2024)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
