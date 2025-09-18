<!-- ai:managed start file="docs/playbook/08-frontend/08-05-ui-components.md" responsibility="docs" strategy="replace" -->
---
title: "UI Components – Motion Mavericks Portal"
doc_path: "docs/playbook/08-frontend/08-05-ui-components.md"
doc_type: "frontend-guide"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [ui, components]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-05-design-system.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# UI Components – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="frontend-guide"
     path="docs/playbook/08-frontend/08-05-ui-components.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-05-design-system.md"/>
    <tags>ui, components</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This catalogue records core Motion Mavericks portal UI components, their props, and state behaviour (default, hover, focus, disabled). Components align with the design system and support accessibility, performance, and compliance requirements across dashboards, projects, assets, and share links.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Consistent components reduce development time and maintain UX quality for agencies and clients. Components must handle loading, error, and success states gracefully while reflecting residency and security cues.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- At least 16 components with state descriptions and key props.
- Excludes design tokens (03-05) and accessibility guidelines (08-06) except where relevant.
- Assumes components live in `packages/ui` and exported via index.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Component catalogue
| Component | Key props | Default | Hover | Focus | Disabled |
|-----------|-----------|---------|-------|-------|----------|
| `ButtonPrimary` | `variant`, `loading`, `icon` | Solid brand background, white text | Darker shade, drop shadow | 2px orange focus ring, keyboard accessible | Reduced opacity, pointer disabled |
| `ButtonSecondary` | `variant='outline'` | Transparent with border | Border intensifies | Focus ring brand blue | Border faded |
| `IconButton` | `icon`, `ariaLabel` | Circular 40px, subtle bg | Fill increases | Focus ring around circle | Icon muted |
| `SidebarNavItem` | `href`, `icon`, `active` | Label + icon | Background tint when hover | Left focus rail | 40% opacity |
| `ProjectCard` | `title`, `status`, `metrics[]` | Card with KPI badges | Elevation + accent border | Full focus outline | Desaturated, no pointer |
| `MilestoneTimeline` | `milestones[]` | Dots with connectors | Dot enlarge | Focus on active milestone via keyboard | Greyed dots |
| `TaskRow` | `task`, `onUpdate` | Checkbox + details | Background highlight, actions visible | Focus ring on row | Text muted, actions hidden |
| `TaskStatusBadge` | `status` | Colour-coded pill | Slight scale | Focus border (for keyboard toggles) | Grey variant |
| `AssetTile` | `asset`, `onOpen` | Thumbnail + status chip | Quick actions slide in | Focus ring around tile | Thumbnail greyscale |
| `ShareModal` | `asset`, `onSubmit` | Dialog with forms | Not hoverable (modal) | Focus trapped, header close button focusable | Submit button disabled |
| `PasscodeInput` | `digits` | Display masked digits | Border highlight | Focus cursor with aria-live instructions | Input locked |
| `NotificationItem` | `type`, `timestamp`, `unread` | Icon + message | Background tint | Focus ring, mark-as-read button visible | Faded icon |
| `NotificationBell` | `count` | Bell icon with badge | Icon bounce micro-interaction | Focus ring on trigger | Badge hidden |
| `CommentThread` | `comments[]`, `allowReply` | Threaded list with metadata | Reply button highlight | Focus ring on editor | Reply hidden |
| `Breadcrumbs` | `items` | Inline links | Underline on hover | Focus ring per link | Plain text |
| `DatePicker` | `value`, `onChange` | Input with calendar icon | Icon highlight | Focus on calendar button and cells | Input greyed |
| `Toggle` | `checked`, `label` | Switch track grey | Track brand lighten | Focus ring around knob | Track locked |
| `EmptyState` | `title`, `cta` | Icon, message, CTA | Card lifts slightly | Focus ring around CTA | CTA disabled |
| `LoadingSkeleton` | `variant` | Animated shimmer blocks | N/A | N/A | N/A |
| `ErrorBanner` | `message`, `action` | Red background, icon | Slight shadow | Focus ring on action button | Muted action |
| `ResidencyBadge` | `status` | Chip labelled "AU hosted" | Tooltip shows CDN details | Focus ring for keyboard | Greyed when status unknown |

### Implementation notes
- Components export TypeScript types for props (`ButtonPrimaryProps`).
- Compose Radix primitives for accessibility (Dialog, Switch, Tooltip).
- Support forwardRef for integration with forms.
- Provide story examples (post-MVP) for each state; documentation auto-generated.

### Usage guidelines
- Buttons default to primary for high emphasis actions (Create, Share). Secondary for neutral actions.
- TaskRow used within `TaskList`; handles drag-and-drop (future enhancement) using `@dnd-kit`.
- ShareModal orchestrates forms described in 08-04; integrates with `useMutation` for submission.
- ResidencBadge appears on share modal and asset view emphasising AU hosting compliance.

### Testing
- Component tests ensure state classes apply via `data-state` attributes.
- Visual diff optional: capture baseline via Playwright screenshot in CI for critical components.

### Performance
- Icons from Lucide tree-shaken via import `lucide-react`; avoid dynamic import for small icons.
- Lazy load heavy components (ShareModal) using Next dynamic import without SSR to reduce initial bundle.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [03-05-design-system](../03-ux-and-design/03-05-design-system.md)
- [08-04-forms-and-validation](08-04-forms-and-validation.md)
- [12-03-integration-tests](../12-testing-and-quality/12-03-integration-tests.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [05-02-coding-standards](../05-project-setup/05-02-coding-standards.md)
- [08-06-accessibility-a11y](08-06-accessibility-a11y.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we introduce a Chart component for performance metrics, or rely on table summaries at MVP?
- Do share link recipients need a simplified component set separate from portal UI?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Components suffice for MVP flows; additional components documented when added.
- CSS variables cover theming needs; no per-component inline styling required.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Component inventory workshop (September 2025)
- Design tokens spec (03-05)
- QA feedback on component behaviours
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
