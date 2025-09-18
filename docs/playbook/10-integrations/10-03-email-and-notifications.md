<!-- ai:managed start file="docs/playbook/10-integrations/10-03-email-and-notifications.md" responsibility="docs" strategy="replace" -->
---
title: "Email and Notifications Integration – Motion Mavericks Portal"
doc_path: "docs/playbook/10-integrations/10-03-email-and-notifications.md"
doc_type: "integration"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Client Success Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [integration, email, notifications]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Email and Notifications Integration – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="integration"
     path="docs/playbook/10-integrations/10-03-email-and-notifications.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>integration, email, notifications</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide explains how Motion Mavericks integrates with Resend for transactional email and manages notification templates. It covers template architecture, event triggers, deliverability, unsubscribe policy, and monitoring to support portal communication flows.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal sends onboarding invitations, asset updates, share link alerts, digests, and incidents. Emails must reach recipients quickly (<60 seconds) and comply with Australian privacy and anti-spam laws while supporting audit needs.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Resend configuration, template management, API usage, bounce handling, unsubscribe policy, deliverability monitoring.
- Excludes marketing campaigns (handled separately via marketing tools).
- Assumes Resend Business plan with AU-friendly infrastructure.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Configuration
- Resend domain: `mail.motionmavericks.com` with SPF, DKIM, DMARC set up (TXT records managed via DNS).
- API key stored per environment (`RESEND_API_KEY`), rotated every 90 days.
- Sender identity: `Motion Mavericks Portal <portal@motionmavericks.com>`.

### Templates
- Implemented with React Email components stored in `packages/email-templates`.
- Templates: `InviteEmail`, `AssetReadyEmail`, `AssetFailedEmail`, `ShareLinkEmail`, `ShareLinkReminderEmail`, `DailyDigestEmail`, `IncidentAlertEmail`.
- Each template includes plain-text fallback and accessible structure (semantic headings, alt text, sufficient contrast).
- Local preview via `pnpm email:preview`.

### Sending logic
- Use `Resend` Node SDK within Notification Service.
- Emails triggered by events: invitation creation, asset readiness/failure, share link created, share link 24h before expiry, daily digest, incident alerts.
- Rate limiting: share link email limited to 20/hour per tenant; failure returns error to user.

### Unsubscribe & preferences
- Transactional emails (critical updates) do not include unsubscribe link (per legal allowances).
- Digest emails include preference link directing to portal settings to adjust frequency.
- Resend suppression list integrated; bounces/complaints add email to suppression and mark in user preferences.

### Deliverability monitoring
- Resend analytics monitored weekly; alert if bounce rate >1% or complaint rate >0.3%.
- Sentry captures send failures; fallback tries once more after 5 minutes.
- Postmark or alternative vendors documented in risk register as contingency.

### Legal compliance
- Email footer includes Motion Mavericks contact, ABN, privacy notice link.
- Event data (recipient, template, send timestamp) stored in `notification_deliveries` table for audit.

### Testing
- Integration tests using Resend test mode ensure payload format.
- Staging environment uses sandbox domain to avoid sending real emails; test inbox monitored by team.

### Resend webhooks
- Webhook endpoint `/api/v1/webhooks/resend` handles `email.bounced`, `email.complained`, `email.delivered` (see 07-05). Updates suppression lists and logs events.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [07-05-webhooks-and-events](../07-apis-and-contracts/07-05-webhooks-and-events.md)
- [09-03-background-jobs](../09-backend/09-03-background-jobs.md)
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [08-04-forms-and-validation](../08-frontend/08-04-forms-and-validation.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do agencies require brand-specific senders (e.g., MKTG) or is Motion Mavericks sender sufficient for MVP?
- Should we integrate SMS fallback for incident alerts if email delivery fails?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Resend deliverability meets SLA; monitor vendor status.
- Agencies keep contact info updated so digests and reminders reach correct stakeholders.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Resend documentation (September 2025)
- Notification design workshop
- Legal review of transactional email policy
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
