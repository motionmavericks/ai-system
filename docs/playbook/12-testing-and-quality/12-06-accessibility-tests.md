<!-- ai:managed start file="docs/playbook/12-testing-and-quality/12-06-accessibility-tests.md" responsibility="docs" strategy="replace" -->
---
title: "Accessibility Tests – Motion Mavericks Portal"
doc_path: "docs/playbook/12-testing-and-quality/12-06-accessibility-tests.md"
doc_type: "quality"
status: "Draft"
version: "0.2.0"
owner: "UX Lead"
reviewers: ["QA Engineer", "Accessibility Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [accessibility, testing]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Accessibility Tests – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="quality"
     path="docs/playbook/12-testing-and-quality/12-06-accessibility-tests.md"
     version="0.2.0"
     status="Draft"
     owner="UX Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>accessibility, testing</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Accessibility testing confirms the portal meets WCAG 2.2 AA standards across Admin, Agency, and Guest experiences. Automation and manual reviews ensure inclusive navigation for milestone management, asset review, notifications, and share links. Accessibility gates block releases when critical issues remain.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal replaces disparate tools used by agencies and clients with varying accessibility needs. Government and enterprise prospects require WCAG compliance evidence. Key flows include keyboard-driven navigation, screen reader support for asset descriptions, and accessible notification settings. Automated checks complement manual audits.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Automated accessibility checks within Playwright (axe-core) for all critical pages.
- Manual audits on staging for high-traffic workflows (dashboard, asset viewer, share page, notifications, settings).
- Screen reader verification (NVDA, VoiceOver) for milestone boards and asset playback controls.
- Excludes marketing microsites managed externally.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Automation coverage
| Page | Checks | Tooling |
|------|--------|---------|
| Dashboard (Admin) | Landmark structure, keyboard traps, colour contrast of status badges | Playwright + axe-core |
| Project detail (Agency) | Focus order, form labels, error messaging for milestone edits | Playwright + axe-core |
| Asset review (Guest) | Captions availability, playback controls, transcript toggle | Playwright + custom assertions |
| Notifications settings | Toggle descriptions, ARIA states, digest frequency dropdown | Playwright + axe-core |
| Share link page | Skip links, responsive scaling, high contrast mode | Playwright + axe-core |

`expect(page).toPassAxe()` integrated post-navigation, with suppressions documented in `tests/a11y/waivers.md` (expires within one sprint).

### Manual audit protocol
1. Monthly NVDA run-through on Windows for Admin and Agency flows.
2. Quarterly VoiceOver audit on macOS for Guest share link flow.
3. Colour contrast validation using Stark plugin; ensure 4.5:1 ratio.
4. Keyboard-only navigation ensuring no hidden focus states.
5. Assistive technology checks for notifications (ARIA live regions).

### Acceptance criteria
- No `serious` or `critical` axe violations allowed in CI.
- Manual audits produce report signed by UX Lead; high severity issues resolved within two sprints.
- Accessibility statement updated when new features launch.

### Integration with design and development
- Component library (`08-02`) embeds accessible patterns; new components require design checklists.
- Figma annotations document semantic roles and focus management expectations.
- Engineers include accessibility acceptance criteria in user stories.

### Reporting
- Accessibility dashboard tracks issue trends, time to resolution, and manual audit outcomes.
- Release checklist (18-01) includes verifying latest audit completion (<90 days).
- Document accessibility bugs in dedicated Linear project for triage.

### Training
- Quarterly workshops on inclusive copy, accessible video playback, and assistive tech usage.
- Provide quick reference guide for accessible share link creation (alt text, transcripts, captions).
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [03-04-accessibility-guidelines](../03-ux-and-design/03-04-accessibility-guidelines.md)
- [08-02-component-library](../08-frontend/08-02-component-library.md)
- [18-01-release-checklist](../18-release-and-cutover/18-01-release-checklist.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [12-04-e2e-tests](12-04-e2e-tests.md)
- [14-02-monitoring-instrumentation](../14-observability/14-02-monitoring-instrumentation.md)
- [16-05-user-guides](../16-documentation-and-training/16-05-user-guides.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we include Android TalkBack testing for guest share links consumed on mobile?
- Do we need to budget for third-party accessibility audit prior to enterprise roll-out?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Team members have access to NVDA and VoiceOver capable devices for audits.
- Video assets provided include captions or transcripts supplied by production teams.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- WCAG 2.2 AA guidelines (W3C)
- Motion Mavericks accessibility workshop notes (2025)
- Inclusive design checklist maintained by UX team
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
