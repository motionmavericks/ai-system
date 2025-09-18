<!-- ai:managed start file="docs/playbook/03-ux-and-design/03-02-journeys-and-flows.md" responsibility="docs" strategy="replace" -->
---
title: "Journeys and Flows – Motion Mavericks Portal"
doc_path: "docs/playbook/03-ux-and-design/03-02-journeys-and-flows.md"
doc_type: "ux-journeys"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Agency Partner Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [ux, journeys, flows]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-01-personas.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Journeys and Flows – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="ux-journeys"
     path="docs/playbook/03-ux-and-design/03-02-journeys-and-flows.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-01-personas.md"/>
    <tags>ux, journeys, flows</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
These journeys detail the critical portal flows for Admin, Agency, and Guest roles: creating projects and milestones, completing tasks with comments, and viewing share links. Each flow outlines intent, happy-path outcomes, and failure handling to guide UX, engineering, and QA alignment. They emphasise accessibility, residency, and notification requirements from the integrated brief.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Motion Mavericks replaces fragmented workflows with a single portal. Mapping journeys ensures the UI, API, and operations support fast onboarding, milestone transparency, and secure asset delivery, addressing agency and client expectations for reliability and compliance.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes three core flows: Admin project creation, Agency task execution with comments, Guest share link review.
- Out of scope: future roadmap flows (e.g. budgeting, marketplace) and integration-specific journeys.
- Assumes accessibility and performance requirements (WCAG 2.2 AA, p95 latency targets) apply across all steps.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Flow 1: Admin creates project and milestones
| Step | Actor | Intent | Happy path | Failure |
|------|-------|--------|------------|---------|
| 1 | Admin | Initiate new project | Clicks “Create project”, enters name, client, production dates | Form validation fails; missing required fields highlighted |
| 2 | Admin | Select milestone template | Picks “Commercial production” template preloaded with phases | Template fetch fails; display retry with system status |
| 3 | Admin | Customise milestones | Adjusts due dates, assigns agency lead from dropdown | Assignment fails if agency not onboarded; prompt to invite |
| 4 | Admin | Configure residency and compliance notes | Checks AU residency confirmation box, attaches compliance docs | Residency evidence service unavailable; show fallback instructions |
| 5 | Admin | Review summary and confirm | Sees timeline view, confirms creation | Conflict detected (duplicate project name); provide rename suggestion |

### Flow 2: Agency completes tasks and collaborates via comments
| Step | Actor | Intent | Happy path | Failure |
|------|-------|--------|------------|---------|
| 1 | Agency Producer | View assigned tasks | Opens dashboard filtered by due date | Query fails; show inline error with reload option |
| 2 | Agency Producer | Update task status | Marks task “In review” with completion date | Validation missing (e.g. no completion date); block update |
| 3 | Agency Producer | Upload deliverable | Adds asset to task, triggers Mux upload | Upload fails; show retry with Mux status code |
| 4 | Agency Producer | Mention teammate | Adds comment @editor with notes | Mention fails due to permission; prompt to adjust roles |
| 5 | Agency Producer | Resolve feedback | Marks comment thread resolved and logs decision | Audit log write fails; warn user and retry in background |
| 6 | Admin | Monitor progress | Receives notification digest highlighting updated status | Notification job fails; reliability partner alerted |

### Flow 3: Guest reviewer accesses share link
| Step | Actor | Intent | Happy path | Failure |
|------|-------|--------|------------|---------|
| 1 | Guest Reviewer | Open share link | Clicks link, sees branded landing page | Link revoked or expired; display support contact and request flow |
| 2 | Guest Reviewer | Authenticate with passcode | Enters access code, optionally verifies email | Incorrect passcode entry; offer retry, rate-limit after 5 attempts |
| 3 | Guest Reviewer | Review asset | Plays video with captions, toggles playback speed | Playback blocked by network; show troubleshooting tips, CDN diagnostics |
| 4 | Guest Reviewer | Submit feedback | Leaves comment or approves asset | Comment disabled by Admin; show read-only notice |
| 5 | Guest Reviewer | Exit flow | Receives confirmation and optional follow-up reminder scheduling | Analytics event fails; queue event for retry |
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [03-01-personas](03-01-personas.md)
- [02-02-acceptance-criteria](../02-requirements-and-scope/02-02-acceptance-criteria.md)
- [High-level portal brief](../../plan/HighLevel.Final.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [03-03-information-architecture](03-03-information-architecture.md)
- [07-03-auth-and-authorisation](../07-apis-and-contracts/07-03-auth-and-authorisation.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should the guest review flow include optional multi-factor prompts for high-sensitivity content?
- Do agency producers require an offline upload option when connectivity is limited on set?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Agency producers have stable upload bandwidth for 500 MB files; any exceptions trigger scheduling adjustments.
- Guest reviewers accept passcode plus email verification as sufficient security without full account creation.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Production workshop journey mapping outputs (September 2025)
- Agency onboarding sessions detailing current workflows
- Client feedback on previous share link processes
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
