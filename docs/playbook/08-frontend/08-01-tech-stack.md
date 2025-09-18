<!-- ai:managed start file="docs/playbook/08-frontend/08-01-tech-stack.md" responsibility="docs" strategy="replace" -->
---
title: "Frontend Tech Stack – Motion Mavericks Portal"
doc_path: "docs/playbook/08-frontend/08-01-tech-stack.md"
doc_type: "tech-stack"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [frontend, tech-stack]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-05-design-system.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Frontend Tech Stack – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="tech-stack"
     path="docs/playbook/08-frontend/08-01-tech-stack.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-05-design-system.md"/>
    <tags>frontend, tech-stack</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document describes the Motion Mavericks portal frontend technology stack, including frameworks, libraries, and tooling that support production management workflows. The stack prioritises performance, accessibility, and multi-tenant security while enabling rapid iteration with a small team.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal must deliver dashboards, asset playback, notifications, and share links to Admin, Agency, and Guest roles. The frontend leverages Next.js 15 App Router, shadcn/ui, and supporting libraries to maintain consistency and accessibility across flows.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Frameworks, libraries, tooling, state management, styling, testing.
- Excludes detailed components (08-05) and routing specifics (08-02).
- Assumes deployment on Vercel with serverless and edge runtime.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Framework and runtime
- **Next.js 15 (App Router)** on Vercel for file-based routing, server actions, and streaming.
- Edge middleware for authentication and rate limiting.
- Incremental Static Regeneration (ISR) used minimally; portal primarily server-rendered due to personalised data.

### Language
- **TypeScript** with strict mode, enabling shared types across frontend/backend via `packages/api-contracts`.

### Styling and UI
- **Tailwind CSS** for utility-first styling with design tokens defined in design system.
- **shadcn/ui** + **Radix UI** primitives for accessible components.
- Custom theming for dark UI palette; tokens stored in CSS variables.

### State and data fetching
- **TanStack Query** for server state caching, revalidation, optimistic updates.
- React context for tenant + session metadata; no Redux requirement.
- Server Actions used for direct data mutations where appropriate, wrapped with Zod validation.

### Forms and validation
- **React Hook Form** with `@hookform/resolvers/zod` for type-safe forms (detailed in 08-04).

### Testing & quality
- **Playwright** for E2E flows, `@testing-library/react` for component tests.
- **Storybook** (optional) for component visual regression (post-MVP evaluation).
- **axe-playwright** for accessibility checks.

### Tooling
- pnpm workspace, Turborepo for caching.
- ESLint, Prettier, Stylelint enforcing standards.
- Bundle analysis via `@next/bundle-analyzer` in CI.

### Analytics & observability
- **Vercel Analytics** for web vitals.
- **Sentry** for client-side error monitoring with PII redaction.
- Custom telemetry events via analytics client (post to `/api/v1/analytics/events`).

### Accessibility
- WCAG 2.2 AA compliance; components adhere to design system focus states.
- Lighthouse audits run in CI to track accessibility/performance scores.

### Internationalisation
- Primary locale `en-AU`; future locales planned via next-intl (documented in 08-07).

### Dependencies overview
| Category | Library |
|----------|---------|
| Framework | Next.js, React 19 |
| UI | shadcn/ui, Radix UI, Framer Motion (limited use), Lucide icons |
| State | TanStack Query, React Hook Form |
| Validation | Zod |
| Auth | Clerk React SDK |
| Media | Mux Player React components |
| Notifications | Resend React Email templates |
| Testing | Playwright, Testing Library, Vitest (for shared utils) |

### Performance considerations
- Code splitting per route; share link page lightweight (<150 kB).
- Video playback uses Mux Player lazy-loaded.
- Analytics scripts loaded async to avoid blocking.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [03-05-design-system](../03-ux-and-design/03-05-design-system.md)
- [08-03-state-management](08-03-state-management.md)
- [12-04-e2e-tests](../12-testing-and-quality/12-04-e2e-tests.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [08-02-routing-and-navigation](08-02-routing-and-navigation.md)
- [09-01-service-boundaries](../09-backend/09-01-service-boundaries.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we introduce Storybook before GA release to improve component documentation?
- Should we adopt React Server Components for share link rendering to reduce JS payload further?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Team comfortable with Next.js 15 App Router; training materials provided in onboarding.
- Vercel build minutes sufficient; monitor and optimise bundling as app grows.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Frontend architecture workshop (September 2025)
- Vendor documentation (Vercel, shadcn/ui, TanStack)
- Accessibility consultant reports
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
