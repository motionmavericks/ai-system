<!-- ai:managed start file="docs/playbook/03-ux-and-design/03-04-wireframes.md" responsibility="docs" strategy="replace" -->
---
title: "Wireframes – Motion Mavericks Portal"
doc_path: "docs/playbook/03-ux-and-design/03-04-wireframes.md"
doc_type: "ux-wireframes"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Agency Partner Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [ux, wireframes]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-05-design-system.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Wireframes – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="ux-wireframes"
     path="docs/playbook/03-ux-and-design/03-04-wireframes.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-05-design-system.md"/>
    <tags>ux, wireframes</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Wireframes capture key Motion Mavericks portal states—empty, loading, error, and success—for dashboards, project detail, tasks, assets, share modal, and notifications drawer. They guide UI implementation and ensure accessibility, share link governance, and residency cues are represented visually. Asset placeholders reference Figma frames awaiting final export.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Current workflows lack consistent UI patterns across states. Wireframes provide a baseline before high-fidelity design, ensuring features like share link management and notifications support portal goals and compliance messaging.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Covers tenant dashboard, project detail, milestone/task panels, asset library, share modal, and notifications drawer.
- Includes empty, loading, error, and success states per surface.
- Out of scope: marketing site wireframes or roadmap features (e.g. budgeting views).
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Wireframe asset index (≥10 references)
| ID | Surface | State | Link |
|----|---------|-------|------|
| WF-01 | Tenant dashboard | Empty state | <PLACEHOLDER_DASHBOARD_EMPTY> |
| WF-02 | Tenant dashboard | Loading skeleton | <PLACEHOLDER_DASHBOARD_LOADING> |
| WF-03 | Tenant dashboard | Error banner | <PLACEHOLDER_DASHBOARD_ERROR> |
| WF-04 | Tenant dashboard | Success (populated KPIs) | <PLACEHOLDER_DASHBOARD_SUCCESS> |
| WF-05 | Project detail | Milestones empty | <PLACEHOLDER_PROJECT_EMPTY> |
| WF-06 | Project detail | Task board loading | <PLACEHOLDER_PROJECT_LOADING> |
| WF-07 | Project detail | Task board error | <PLACEHOLDER_PROJECT_ERROR> |
| WF-08 | Asset gallery | Populated success | <PLACEHOLDER_ASSET_SUCCESS> |
| WF-09 | Share modal | Configuration view | <PLACEHOLDER_SHARE_MODAL> |
| WF-10 | Share modal | Error (revoked link) | <PLACEHOLDER_SHARE_MODAL_ERROR> |
| WF-11 | Notifications drawer | Loading shimmer | <PLACEHOLDER_NOTIFICATIONS_LOADING> |
| WF-12 | Notifications drawer | Success list | <PLACEHOLDER_NOTIFICATIONS_SUCCESS> |

### Empty states
- Dashboard emphasises call-to-action “Create your first project” and highlights residency compliance note once configured.
- Project detail empty state explains how to import milestone templates or set up from scratch, with link to onboarding documentation.
- Asset gallery empty card encourages uploading first asset, referencing max file size and residency policy.

### Loading states
- Skeleton screens for dashboard cards, milestone timeline, and asset thumbnails maintain layout to prevent layout shift.
- Share modal displays spinner with copy “Securing signed playback token…” referencing security posture.
- Notifications drawer uses shimmer rows and preserves filter controls for keyboard navigation.

### Error states
- Dashboard displays inline alert with retry options and link to status page for availability transparency.
- Project task board error includes instructions to contact reliability partner if problem persists after retry.
- Share modal error shows revocation confirmation and prompts Admin to generate a new link.

### Success states
- Dashboard populated view surfaces top KPIs (onboarding completion, milestones due, share link open rate).
- Project detail success includes timeline with colour-coded milestone statuses and quick actions for comment review.
- Share modal success confirms expiry, passcode, and includes “Copy link” plus “Send digest” actions.
- Notifications drawer success groups events by type with unread indicators adhering to accessibility contrast standards.

### Share modal considerations
- Displays residency badge to reassure clients asset remains in AU region.
- Provides toggles for expiry duration (7, 14, custom) and passcode generation with strength indicator.
- Includes playback preview to confirm asset selection before sharing.

### Notifications drawer considerations
- Supports keyboard navigation with focus order top-to-bottom, left-to-right.
- Offers filter chips for tasks, assets, incidents, and system alerts.
- Provides “Mark all as read” action with confirm dialogue to prevent accidental clearing.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [03-03-information-architecture](03-03-information-architecture.md)
- [00-02-success-metrics](../00-brief-and-vision/00-02-success-metrics.md)
- [02-02-acceptance-criteria](../02-requirements-and-scope/02-02-acceptance-criteria.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [03-05-design-system](03-05-design-system.md)
- [08-05-ui-components](../08-frontend/08-05-ui-components.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should notifications drawer support grouped bulk actions (e.g. acknowledge all incident alerts) in MVP?
- Do we need a dedicated wireframe for residency evidence export to satisfy compliance stakeholders?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Placeholder assets will be replaced with Figma links once design artefacts are published to the shared library.
- Skeleton states are acceptable to agencies as long as load times remain within p95 latency targets.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Design sprint wireframe workshops (September 2025)
- Accessibility reviews for dashboard and notifications interactions
- Agency feedback on desired share modal controls
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
