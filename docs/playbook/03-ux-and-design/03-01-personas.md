<!-- ai:managed start file="docs/playbook/03-ux-and-design/03-01-personas.md" responsibility="docs" strategy="replace" -->
---
title: "Personas – Motion Mavericks Portal"
doc_path: "docs/playbook/03-ux-and-design/03-01-personas.md"
doc_type: "ux-personas"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Agency Partner Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [ux, personas]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Personas – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="ux-personas"
     path="docs/playbook/03-ux-and-design/03-01-personas.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>ux, personas</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
These personas represent the primary Motion Mavericks portal users: Admin Owen, an Agency Producer, a Client Stakeholder, and a Guest Reviewer. Each profile captures goals, jobs-to-be-done, frictions, accessibility needs, and representative quotes. They guide experience design, prioritisation, and success metrics.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal replaces fragmented tools across production lifecycles. Understanding user motivations and pain points ensures features such as milestone dashboards, share links, and notifications address real-world needs while meeting compliance obligations and accessibility standards.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes four personas covering Admin, Agency Producer, Client Stakeholder, and Guest Reviewer roles.
- Out of scope: contractor-only roles and future feature-specific personas.
- Assumes interview insights from September 2025 remain representative for MVP.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Persona: Owen Clarke – Admin
- **Goals**: Maintain full visibility on productions; ensure agencies deliver on time; meet compliance expectations; reduce time spent reconciling spreadsheets.
- **Jobs-to-be-done**:
  1. Coordinate milestones and tasks across multiple agencies in a single view.
  2. Provide clients with trustworthy status updates and audit evidence.
  3. Trigger recovery plans quickly when failures occur.
- **Frictions**:
  1. Manual data entry across spreadsheets.
  2. Lack of real-time notifications when assets fail to process.
  3. Difficulty proving AU residency to procurement teams.
  4. No single audit trail for comments and approvals.
  5. Vendor dashboards scattered across multiple logins.
- **Accessibility needs**: High-contrast dashboards for review in varied lighting, keyboard shortcuts for rapid navigation, screen reader labels on controls for occasional screen-reader usage.
- **Key quotes**:
  - “I can’t keep chasing agencies across email, drive links, and text messages to know if a milestone is safe.”

### Persona: Zara Mitchell – Agency Producer
- **Goals**: Complete deliverables on schedule, collaborate with creatives, keep clients informed, minimise duplicate effort.
- **Jobs-to-be-done**:
  1. Upload assets tied to specific milestones and track approval status.
  2. Assign tasks and monitor progress for crew members.
  3. Manage share links and revoke them when superseded.
- **Frictions**:
  1. Switching between project trackers and video review tools.
  2. Losing context from client feedback buried in email threads.
  3. Share link governance unclear, risking outdated files being accessed.
  4. Notification overload without actionable summaries.
  5. Inefficient onboarding to new tools with complex setup.
- **Accessibility needs**: Caption support for review content shared in noisy environments, scalable text for long production days, responsive design for tablet use on set.
- **Key quotes**:
  - “Give me one place to see what’s due today and what assets still need approvals.”

### Persona: Priya Desai – Client Stakeholder
- **Goals**: Gain confidence in production progress, review assets quickly, meet compliance standards, and minimise meeting overhead.
- **Jobs-to-be-done**:
  1. View milestone summaries and outstanding approvals.
  2. Review share links securely and leave consolidated feedback.
  3. Export evidence for internal compliance reporting.
- **Frictions**:
  1. Receiving multiple share links without clear expiry or status.
  2. Difficulty tracking which assets are final versus work-in-progress.
  3. Lack of visibility into recovery plans when outages occur.
  4. Accessibility gaps (e.g. missing captions) hinder review sessions.
  5. Forced tool switching to share feedback with wider stakeholders.
- **Accessibility needs**: WCAG-compliant playback controls, captions/transcripts for video, ability to adjust playback speed, clear focus states for keyboard navigation.
- **Key quotes**:
  - “I need assurance that every file I approve is current and compliant.”

### Persona: Leo Tan – Guest Reviewer
- **Goals**: Provide targeted feedback quickly, avoid IT hurdles, protect sensitive content, stay informed about deadlines.
- **Jobs-to-be-done**:
  1. Access share links without creating full accounts.
  2. View assets reliably on employer-managed networks.
  3. Submit concise feedback or sign-off decisions.
- **Frictions**:
  1. Links expiring without warning.
  2. Playback blocked by corporate firewalls.
  3. No central record of feedback provided across projects.
  4. Unclear instructions when access codes fail.
  5. Accessibility issues (contrast, zoom) on smaller devices.
- **Accessibility needs**: High-contrast playback UI, scalable fonts, instructions conveyed visually and textually, minimal motion animations to avoid fatigue.
- **Key quotes**:
  - “If the link doesn’t just work in my browser, I’ll email feedback late or not at all.”
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [01-03-user-interviews](../01-discovery-and-research/01-03-user-interviews.md)
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [Legacy MVP plan (context)](../../specs/legacy-mvp-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [03-02-journeys-and-flows](03-02-journeys-and-flows.md)
- [03-05-design-system](03-05-design-system.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Do we need a dedicated persona for compliance officers who may access the portal purely for audit evidence?
- Should personas capture mobile-first behaviours in more depth for on-set producers?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Interview insights accurately reflect the first cohort of agencies and clients.
- Guest reviewers will continue to prefer passwordless access provided security assurances are clear.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Production stakeholder interviews (August–September 2025)
- Agency retrospective notes from prior projects
- Client procurement questionnaires reviewed in 2025
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
