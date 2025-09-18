<!-- ai:managed start file="docs/playbook/03-ux-and-design/03-05-design-system.md" responsibility="docs" strategy="replace" -->
---
title: "Design System – Motion Mavericks Portal"
doc_path: "docs/playbook/03-ux-and-design/03-05-design-system.md"
doc_type: "design-system"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Agency Partner Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [design, system, tokens]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-04-wireframes.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Design System – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="design-system"
     path="docs/playbook/03-ux-and-design/03-05-design-system.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-04-wireframes.md"/>
    <tags>design, system, tokens</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This design system definition sets out Motion Mavericks’ token library and component catalogue for the production portal. It supports consistent, accessible UI implementation across dashboards, projects, assets, share links, and notifications. Tokens reflect brand, compliance cues, and accessibility expectations, while component states guide engineering handoff.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Productions demand clarity, audit trails, and fast iteration. A design system ensures multi-agency teams build consistent UX, meeting WCAG 2.2 AA and share-link governance requirements. Tokens and components align with shadcn/ui and Tailwind foundations adopted in the tech stack.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes token definitions (colour, spacing, typography, elevations) and component catalogue (≥16 components) with states (default, hover, focus, disabled).
- Out of scope: marketing website design language; roadmap themes beyond MVP.
- Assumes implementation via Tailwind design tokens and shadcn/ui primitives.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Tokens table
| Name | Category | Example | Usage |
|------|----------|---------|-------|
| colour.brand.primary | Colour | #1F4B99 | Primary actions, CTAs (Create project, Share link) |
| colour.brand.secondary | Colour | #F05A28 | Alert highlights, status badges |
| colour.ui.background | Colour | #0F1520 | Dark surface background for dashboard |
| colour.ui.surface | Colour | #141C2B | Card backgrounds |
| colour.ui.border | Colour | #1E2A3D | Divider lines, input borders |
| colour.state.success | Colour | #1EAC74 | Success banners, milestone completed |
| colour.state.warning | Colour | #F4B23C | Pending approval badges |
| colour.state.error | Colour | #E15555 | Error banners, validation messages |
| colour.text.primary | Colour | #F8FAFD | Primary text |
| colour.text.secondary | Colour | #B4C0D4 | Secondary text |
| spacing.100 | Spacing | 4 px | Tight padding, icon gaps |
| spacing.200 | Spacing | 8 px | Input padding |
| spacing.300 | Spacing | 12 px | Internal card spacing |
| spacing.400 | Spacing | 16 px | Section padding |
| spacing.600 | Spacing | 24 px | Card gutters |
| typography.heading.lg | Typography | 28 px / 36 px, SemiBold | Page titles |
| typography.heading.md | Typography | 22 px / 30 px, SemiBold | Card headings |
| typography.body.base | Typography | 16 px / 24 px, Regular | Body copy |
| typography.caption | Typography | 14 px / 20 px, Medium | Metadata, timestamps |
| elevation.card | Elevation | 0 8px 24px rgba(0,0,0,0.35) | Portal cards, modals |
| radius.sm | Radius | 6 px | Inputs, chips |
| radius.lg | Radius | 12 px | Cards, modals |

### Component catalogue (≥16 components with states)
| Component | Default | Hover | Focus | Disabled |
|-----------|---------|-------|-------|----------|
| Primary Button | Filled primary background, white text | Darkened background, shadow lift | Outline with 2px focus ring (#F05A28) | Reduced opacity, no interaction |
| Secondary Button | Ghost with border | Border intensifies, subtle bg tint | Focus ring (#1F4B99) | 40% opacity, cursor not-allowed |
| Icon Button | Circular 40px, brand secondary icon | Background tint | Focus ring, tooltip visible | Muted icon, tooltip suppressed |
| Project Card | Title, KPI badges, status dot | Card elevation increases | Focus ring on entire card | Greyscale overlay, interactions blocked |
| Milestone Row | Timeline dot, progress bar | Row highlight | Keyboard focus on row actions | Row text muted |
| Task Row | Checkbox, assignee, due date | Background tint, action buttons visible | Focus ring on checkbox and row | Greyed text, actions hidden |
| Asset Tile | Thumbnail, duration, status chip | Shadow increases, quick actions show | Focus ring around tile | Desaturated thumbnail |
| Share Modal Header | Title + residency badge | Not hoverable | Focus when tabbed to close button | N/A |
| Share Settings Toggle | Switch component | Track highlight | Focus glow | Disabled track greyed |
| Notification Item | Icon, title, timestamp | Background tint | Focus ring, mark-as-read button shown | Faded icon, no interactions |
| Comment Thread | Bubble with metadata | Toolbar actions visible | Focus ring on editor | Editor locked, placeholder message |
| Breadcrumb | Inline link list | Underline on hover | Focus outline around link | Non-clickable text |
| Sidebar Nav Link | Icon + label | Brand secondary indicator | Focus ring left bar | Dimmed icon |
| Table Header | Label, sort icon | Sort icon highlight | Focus ring on sort button | Sort disabled |
| Form Input | Label, placeholder | Border highlight | Focus border (#1F4B99), helper text visible | Background muted |
| Date Picker | Selected date highlight | Hover circle | Focus outline, accessible tooltip | Control greyed |
| Toast Notification | Card with icon | Pause on hover | Focus trap via keyboard controls | Dismiss disabled |

### Usage guidance
- Components use Tailwind tokens mapped to design system variables for consistent theming.
- Focus treatments meet WCAG 2.2 AA colour contrast and 2px minimum thickness requirements.
- Disabled states maintain 4.5:1 contrast for readability while signalling non-interactivity.
- Residency badges appear in modals and asset tiles to reiterate AU storage compliance.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [03-04-wireframes](03-04-wireframes.md)
- [08-05-ui-components](../08-frontend/08-05-ui-components.md)
- [00-02-success-metrics](../00-brief-and-vision/00-02-success-metrics.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [08-04-forms-and-validation](../08-frontend/08-04-forms-and-validation.md)
- [16-05-user-guides](../16-documentation-and-training/16-05-user-guides.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Do we require a dark-mode variant beyond the current dark theme to support high-contrast accessibility preferences?
- Should residency badges be treated as a tokenised component for use across dashboard, modals, and emails?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Tailwind and shadcn/ui provide sufficient primitives; any gaps will be addressed via custom components documented here.
- Agencies will adhere to the design system when submitting feedback assets or embed guidelines in their workflows.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Design system audit (September 2025)
- Accessibility consultant recommendations
- Motion Mavericks branding guidelines (internal)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
