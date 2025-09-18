<!-- ai:managed start file="docs/playbook/14-observability/14-04-alerting.md" responsibility="docs" strategy="replace" -->
---
title: "Alerting and Response – Motion Mavericks Portal"
doc_path: "docs/playbook/14-observability/14-04-alerting.md"
doc_type: "observability"
status: "Draft"
version: "0.2.0"
owner: "Reliability Partner"
reviewers: ["Security Specialist", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [alerting, response]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Alerting and Response – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="observability"
     path="docs/playbook/14-observability/14-04-alerting.md"
     version="0.2.0"
     status="Draft"
     owner="Reliability Partner">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>alerting, response</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document defines alerting rules and response processes for Motion Mavericks. It ensures rapid detection and response to incidents affecting milestones, tasks, assets, notifications, and share links. Alerting integrates with incident response (11-05) and reliability engineering (15-03) to uphold SLOs and compliance obligations.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal operates across serverless infrastructure with time-sensitive workflows. Without disciplined alerting, issues such as share link failures or delayed notifications could go unnoticed. Alerts must be meaningful, minimise noise, and cover privacy/security events.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Alert definitions for API availability, latency, asset streaming, notification delivery, backups, and security events.
- Routing policies, escalation paths, and on-call schedules.
- Alert validation and maintenance cadences.
- Excludes marketing analytics alerts.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Alert catalogue
| Alert | Condition | Destination | Priority |
|-------|-----------|-------------|----------|
| API availability degraded | SLI < 99.7% over 15 min | PagerDuty (Reliability on-call) | P1 |
| API latency breach | p95 > 320 ms for 10 min | PagerDuty | P1 |
| Share link failures | Success rate < 98% over 10 min | PagerDuty + `#share-alerts` | P1 |
| Asset playback delay | Mux TTFB > 3.5 s p95 for 5 min | PagerDuty | P1 |
| Notification backlog | >100 pending digests or fail status >2% | PagerDuty + `#notifications` | P2 |
| Backup failure | Nightly backup job failure | PagerDuty | P1 |
| RDS/Neon storage threshold | Utilisation >80% | PagerDuty (Reliability + Database SME) | P2 |
| Security anomaly | >10 failed login attempts from same IP within 5 min | PagerDuty + Security Slack | P1 |
| Error rate spike | 5xx >1% for 5 min | PagerDuty | P1 |
| Accessibility gate failure | CI accessibility suite failure | GitHub status + `#builds` | P2 |

### Routing and escalation
- **Primary on-call**: Reliability Partner (weekdays) or designated engineer (rotation). Secondary: Technical Lead.
- **Security alerts** escalate to Security Specialist who coordinates with Legal if privacy impact suspected.
- Unacknowledged P1 alerts escalate to Owen after 15 minutes.

### Runbook mapping
- Each alert links to runbook entry in 16-02; ensures responders have immediate instructions.
- PagerDuty incident includes references to relevant dashboards (14-05) and trace queries.

### Noise reduction
- Require two consecutive evaluation periods before triggering P1 alerts.
- Implement auto-silence during scheduled maintenance windows.
- Review alert thresholds quarterly to align with SLO changes and usage patterns.

### Testing
- Simulate alerts monthly using PagerDuty test incidents.
- QA team triggers synthetic share link failure to validate detection.
- Document results in reliability review notes.

### Communication
- On-call posts status updates in `#incidents` Slack channel every 30 minutes for P1 incidents.
- Communicate resolution and next steps upon closing alert.
- Client Success notified when customer-facing impact confirmed.

### Compliance
- Maintain alert configuration history in Git (`observability/alerts/`).
- Document response timelines for audits; integrate with incident report templates.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [14-02-metrics-sli-slo](14-02-metrics-sli-slo.md)
- [11-05-incident-response](../11-security-and-compliance/11-05-incident-response.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [14-05-dashboards](14-05-dashboards.md)
- [15-05-chaos-experiments](../15-performance-and-reliability/15-05-chaos-experiments.md)
- [16-02-runbooks](../16-documentation-and-training/16-02-runbooks.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we integrate SMS alerts for high-priority agencies requiring immediate comms?
- Do we need separate alert thresholds for pilot agencies with lower traffic to avoid noise?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- PagerDuty integrations configured for all monitoring tools (Grafana, Mux, Resend, Vercel).
- On-call rotation staffing levels sufficient for 24/7 coverage during launch phase.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- PagerDuty configuration exports
- Reliability scorecard (2025)
- Motion Mavericks incident logs
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
