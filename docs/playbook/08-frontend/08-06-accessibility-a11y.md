<!-- ai:managed start file="docs/playbook/08-frontend/08-06-accessibility-a11y.md" responsibility="docs" strategy="replace" -->
---
title: "Accessibility (A11y) – Motion Mavericks Portal"
doc_path: "docs/playbook/08-frontend/08-06-accessibility-a11y.md"
doc_type: "accessibility"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Quality Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [accessibility, wcag]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-05-design-system.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Accessibility (A11y) – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="accessibility"
     path="docs/playbook/08-frontend/08-06-accessibility-a11y.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-05-design-system.md"/>
    <tags>accessibility, wcag</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide documents Motion Mavericks portal accessibility requirements aligning with WCAG 2.2 AA. It covers navigation, focus management, form error messaging, media accessibility, and testing to ensure agencies and clients with diverse needs can use the portal.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Production stakeholders include users with varied accessibility requirements. Compliance with WCAG 2.2 AA supports procurement, reduces legal risk, and improves usability. Accessibility is enforced across design, development, and testing stages.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Keyboard navigation, focus management, colour contrast, media alternatives, notifications, assistive tech testing.
- Excludes marketing site accessibility (handled separately).
- Assumes React + shadcn/ui components integrated with Radix for accessible primitives.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Keyboard & focus
- All interactive elements reachable via Tab/Shift+Tab; focus order matches visual order.
- Visible focus indicator with 2px outline and 3:1 contrast ratio (design system tokens enforce).
- Skip link provided at top of page to main content.
- Modals (ShareModal) trap focus; close on Escape.

### Forms & error messaging
- Each input bound to `<label>` with `htmlFor` attribute.
- Required fields indicated in text, not only colour; use `aria-required`.
- Errors announced via `aria-live="polite"` region at top of form summarising issues with anchor links.
- Inline error message connected via `aria-describedby`.

### Colour contrast & theme
- Colour palette meets AA contrast: text/background >= 4.5:1, large text >= 3:1.
- Icons combined with text or accessible labels; status indicated by icon + text.
- High-contrast mode planned for post-MVP (tracked in backlog).

### Media accessibility
- Video assets using Mux Player support captions/subtitles if provided; portal encourages uploads with caption track.
- Player includes keyboard shortcuts, focusable controls, adjustable playback speed.
- Share page displays alternative text for thumbnails, transcripts when available.

### Notifications
- Toasts and in-app notifications use `aria-live="assertive"` for urgent messages, `aria-live="polite"` for general updates.
- Provide dismissal controls accessible via keyboard.

### Responsiveness
- Layout responsive across large desktop, laptop, tablet, and mobile for share pages; ensures target sizes meet 2.2 guidelines.

### Testing regimen
- Automated: Playwright + axe across critical flows each CI run.
- Manual: quarterly screen reader testing (NVDA + VoiceOver), keyboard-only review, colour-blindness simulation.
- Accessibility checklist completed before release (documented in definition of done).

### Documentation
- Accessibility notes included in component stories and user guides.
- Known limitations tracked with mitigation plans; no blockers allowed for MVP release.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [03-05-design-system](../03-ux-and-design/03-05-design-system.md)
- [12-06-accessibility-tests](../12-testing-and-quality/12-06-accessibility-tests.md)
- [02-05-definition-of-done](../02-requirements-and-scope/02-05-definition-of-done.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [08-05-ui-components](08-05-ui-components.md)
- [16-05-user-guides](../16-documentation-and-training/16-05-user-guides.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do clients require audio descriptions for video assets, and if so, can agencies supply them during upload?
- Should we offer user-configurable high-contrast or reduced-motion toggles at MVP or defer to post-launch?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Agencies provide caption files for final deliverables; portal enforces requirement via upload checklist.
- Accessibility audits remain part of release checklist; resource availability confirmed with design partner.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Accessibility consultant audit (September 2025)
- WCAG 2.2 AA guidelines
- Agency feedback on share link accessibility
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
