<!-- ai:managed start file="docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-notification-delivery-strategy.md" responsibility="docs" strategy="replace" -->
---
title: "ADR 004 – Notification Delivery Strategy"
doc_path: "docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-notification-delivery-strategy.md"
doc_type: "adr"
status: "Accepted"
version: "0.1.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [adr, notifications]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../../plan/HighLevel.Final.md"
  design: "../../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# ADR 004 – Notification Delivery Strategy

> Status: **Accepted** • Version: **0.1.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="adr"
     path="docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-notification-delivery-strategy.md"
     version="0.1.0"
     status="Accepted"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>adr, notifications</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
The portal will deliver notifications through an in-app feed backed by Neon and email via Resend. Scheduled digests and real-time alerts are orchestrated using Vercel Cron. This strategy provides timely updates while respecting rate limits and compliance requirements.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Stakeholders need reliable notifications for due tasks, share link activity, and incidents. Fragmented email and chat threads previously caused missed approvals. We require predictable delivery within ≤60 seconds for transactional messages and daily digests for summary information.
]]></content>
    </section>

    <section id="decision" heading="Decision">
      <instructions>Document the decision and rationale.</instructions>
      <content><![CDATA[
## Decision
Implement notifications as: 1) Neon-backed in-app feed with per-user unread counters stored in Vercel KV; 2) Resend transactional emails triggered synchronously (task assignments, share link sent, incident alerts); 3) Vercel Cron-driven digests summarising due tasks and upcoming milestones; 4) Alert escalation to reliability partner via Resend + SMS fallback (post-MVP). Rate limiting enforced at edge middleware.
]]></content>
    </section>

    <section id="consequences" heading="Consequences">
      <content><![CDATA[
## Consequences
- **Positive**: Unified notification log for audit; digest scheduling meets metric SM-07.
- **Positive**: Leveraging Resend reduces delivery complexity while providing analytics.
- **Negative**: Dependence on Resend; require monitoring and fallback if service degraded.
- **Negative**: Additional logic to sync in-app feed and email preferences.
]]></content>
    </section>

    <section id="alternatives" heading="Alternatives considered">
      <content><![CDATA[
## Alternatives considered
1. **Full messaging bus (Kafka)** – rejected for MVP; overkill and operationally heavy.
2. **Third-party notification platform (Courier)** – rejected due to cost and limited residency guarantees.
3. **Email-only strategy** – rejected; lacks in-app audit trail and accessibility for quick review.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [04-02-solution-architecture](../04-02-solution-architecture.md)
- [07-05-webhooks-and-events](../../07-apis-and-contracts/07-05-webhooks-and-events.md)
- [15-03-reliability-engineering](../../15-observability-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [08-03-state-management](../../08-frontend/08-03-state-management.md)
- [16-03-support-playbooks](../../16-documentation-and-training/16-03-support-playbooks.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should SMS or Slack channels be introduced for critical incidents before post-MVP roadmap?
- Do clients require configurable digest frequency beyond daily summaries?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Resend maintains deliverability ≥98% within 60 seconds for transactional emails.
- Vercel Cron scheduling meets reliability needs; fallback manual triggers documented in runbooks.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Resend SLA documentation
- Agency interviews on notification preferences
- Reliability partner consultation on incident workflows
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
