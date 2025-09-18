<!-- ai:managed start file="docs/playbook/02-requirements-and-scope/02-02-acceptance-criteria.md" responsibility="docs" strategy="replace" -->
---
title: "Acceptance Criteria – Motion Mavericks Portal"
doc_path: "docs/playbook/02-requirements-and-scope/02-02-acceptance-criteria.md"
doc_type: "acceptance"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Quality Lead", "Agency Partner Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [requirements, acceptance, testing]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Acceptance Criteria – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="acceptance"
     path="docs/playbook/02-requirements-and-scope/02-02-acceptance-criteria.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>requirements, acceptance, testing</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document defines Gherkin scenarios validating critical Motion Mavericks portal workflows. Scenarios cover onboarding, project tracking, asset upload, commenting, share link viewing, notifications, and failure handling. They ensure delivery teams have a shared definition of done aligned with success metrics and non-functional targets.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Motion Mavericks requires automated and manual tests demonstrating 99.9% availability, AU residency, and frictionless agency onboarding. By codifying acceptance criteria now, we align engineering, QA, and agency partners on the behaviours required for launch readiness and post-launch reliability.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Covers invite-to-login, milestone updates, asset upload, comment threads, share link access, notifications, and resilience behaviours.
- Includes positive and negative scenarios for authentication, share security, and playback failure conditions.
- Excludes future roadmap capabilities (e.g., integrations, template automation).
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Scenarios
```gherkin
Feature: Agency onboarding via magic link
  Scenario: Admin invites an agency producer successfully
    Given an Admin is authenticated
    When the Admin sends an invitation to agency@example.com
    Then the agency producer receives a magic link email within 60 seconds
    And the invitation status is recorded as "Sent"

  Scenario: Agency producer redeems invite and lands on dashboard
    Given an agency invitation is valid and unexpired
    When the producer clicks the magic link
    Then the producer is authenticated without a password
    And the producer sees the project dashboard within 10 seconds

  Scenario: Invite fails when link is expired (negative)
    Given an agency invitation expired after 72 hours
    When the producer clicks the magic link
    Then the portal blocks access and displays guidance to request a new invitation
```
```gherkin
Feature: Milestone management
  Scenario: Admin creates milestone template
    Given an Admin is on the project setup page
    When the Admin creates a "Pre-production" milestone template with tasks
    Then the template appears in the template library

  Scenario: Agency updates task status
    Given a task is assigned to an agency producer
    When the producer marks the task complete
    Then the milestone progress updates and is visible to Admin and Client users

  Scenario: Task update rejected when required fields missing (negative)
    Given a task requires an actual completion date
    When the producer marks the task complete without setting the date
    Then the portal blocks the update and prompts for the missing field
```
```gherkin
Feature: Asset upload and processing
  Scenario: Agency uploads asset to milestone
    Given an agency producer is on a milestone page
    When the producer uploads a 500 MB video file
    Then the portal stores the asset and shows processing status within 5 seconds

  Scenario: Asset processing failure triggers alert (negative)
    Given a video upload reaches the processing stage
    When Mux returns an error
    Then the portal notifies the Admin and Reliability partner with remediation guidance
```
```gherkin
Feature: Commenting and audit
  Scenario: Agency mentions teammate in comment
    Given a task has an open comment thread
    When the producer mentions @teammate
    Then the teammate receives a notification and the mention is captured in the audit log

  Scenario: Guest attempts to post without permission (negative)
    Given a guest reviewer has view-only access
    When the guest tries to post a comment
    Then the portal blocks the action and explains comment access is limited
```
```gherkin
Feature: Share links
  Scenario: Producer generates expiring share link
    Given an approved asset exists
    When the producer creates a share link with a 7-day expiry and passcode
    Then the portal issues a signed URL, records the expiry, and shows the passcode configuration

  Scenario: Guest views share link within expiry
    Given a valid share link and passcode
    When the guest enters the correct passcode
    Then the asset plays back within 3 seconds at 25 Mbps connection speed

  Scenario: Share link revoked after incident (negative)
    Given an Admin revokes a share link
    When the guest refreshes the link
    Then the portal returns an expiry message and logs the access attempt
```
```gherkin
Feature: Notifications and digests
  Scenario: Daily digest summarises due tasks
    Given tasks due in the next 24 hours exist
    When the daily digest job runs
    Then agency users with due tasks receive a single email summarising actions

  Scenario: Reminder sent before share review window closes
    Given a share link expires in 24 hours
    When the reminder job executes
    Then guests receive an email prompting them to review before expiry
```
```gherkin
Feature: Residency and recovery
  Scenario: Residency dashboard displays AU status
    Given the Admin opens the residency dashboard
    When the system fetches storage region metadata
    Then the dashboard confirms all assets and backups reside in Australia

  Scenario: Backup restore meets RTO target
    Given a disaster recovery drill is initiated
    When the restore completes
    Then the portal is fully operational within 60 minutes per RTO requirement
```
```

### Negative scenarios summary
- Invite redemption after expiry is blocked with guidance.
- Task completion without required fields is rejected.
- Asset processing errors trigger alerts.
- Guest comment attempts without permission are blocked.
- Revoked share links deny playback and log attempts.
```
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [02-01-user-stories](02-01-user-stories.md)
- [00-02-success-metrics](../00-brief-and-vision/00-02-success-metrics.md)
- [High-level portal brief](../../plan/HighLevel.Final.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [02-05-definition-of-done](02-05-definition-of-done.md)
- [07-01-api-surface](../07-apis-and-contracts/07-01-api-surface.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should residency checks verify both primary and backup storage layers per drill, or will dashboards suffice?
- Do we need explicit negative scenarios for notification throttling when rate limiting is reached?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Automated tests can simulate Mux failure responses to validate alerting behaviour.
- Notification jobs run on Vercel Cron with sufficient capacity to meet the ≤60 second delivery target.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- QA planning sessions with agency partners (September 2025)
- Motion Mavericks incident rehearsal notes
- docs/plan/HighLevel.Final.md non-functional targets
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
