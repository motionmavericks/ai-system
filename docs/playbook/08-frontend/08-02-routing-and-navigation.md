<!-- ai:managed start file="docs/playbook/08-frontend/08-02-routing-and-navigation.md" responsibility="docs" strategy="replace" -->
---
title: "Routing and Navigation – Motion Mavericks Portal"
doc_path: "docs/playbook/08-frontend/08-02-routing-and-navigation.md"
doc_type: "frontend-guide"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Technical Delivery Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [routing, frontend]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Routing and Navigation – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="frontend-guide"
     path="docs/playbook/08-frontend/08-02-routing-and-navigation.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>routing, frontend</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide explains Motion Mavericks portal routing architecture using Next.js 15 App Router. It covers tenant-aware navigation, layout hierarchy, protected routes, share link pages, and skeleton/loading states to maintain performance and accessibility.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Users rely on consistent navigation to monitor projects, tasks, assets, and notifications. Routing must enforce authentication, tenant scoping, and share link access while supporting server rendering and streaming updates.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Layout hierarchy, protected routes, tenant parameter handling, share page architecture.
- Excludes microcopy and component design (covered elsewhere).
- Assumes Next.js 15 App Router with server components.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Directory structure
```
app/
├── layout.tsx                # Root layout (theme, fonts, analytics)
├── (auth)/                   # Auth routes (login, invite confirmation)
│   └── invite/
├── (dashboard)/
│   ├── layout.tsx            # Authenticated layout (sidebar, header)
│   ├── page.tsx              # Tenant dashboard
│   ├── projects/
│   │   ├── page.tsx          # Project list
│   │   └── [projectId]/
│   │       ├── layout.tsx    # Project shell with tabs
│   │       ├── page.tsx      # Overview
│   │       ├── milestones/page.tsx
│   │       ├── tasks/page.tsx
│   │       ├── assets/page.tsx
│   │       └── comments/page.tsx
│   ├── notifications/page.tsx
│   └── settings/
│       ├── tenants/page.tsx
│       ├── users/page.tsx
│       └── residency/page.tsx
└── share/
    └── [shareToken]/page.tsx  # Guest share experience
```

### Layout hierarchy
- **Root layout**: sets HTML lang `en-AU`, global styles, Sentry instrumentation, Clerk provider.
- **Authenticated layout**: renders sidebar, top navigation, notifications drawer; wraps all `(dashboard)` routes. Includes `RequireAuth` component verifying session and tenant context.
- **Project layout**: handles tab navigation via nested layouts; fetches project metadata once and passes to children via context.

### Tenant-aware routing
- Tenant ID resolved server-side via Clerk session; stored in React context and appended to API requests.
- Multi-tenant URLs use slug: `/tenant/{tenantSlug}/projects/...`? For MVP we keep single admin perspective; optional query parameter for cross-tenant view accessible to Admin only.
- Edge middleware checks `tenantSlug` against session; 404 if mismatch.

### Protected routes
- `(dashboard)` tree wrapped with `NoCache` directive to prevent caching of personalised data.
- Role-based guards enforce route access (e.g., `/settings/tenants` admin-only).
- Guests redirected to share page; no access to dashboard.

### Share page architecture
- `/share/[shareToken]` uses dynamic route with Route Segment Config: `runtime = 'edge'`, `dynamic = 'force-dynamic'` to fetch token metadata.
- Renders without authenticated layout; includes optional passcode form, playback, comment read-only view.
- Suspense boundaries show skeleton while verifying token and retrieving asset.

### Loading, error, and not-found states
- Each route defines `loading.tsx` (skeleton) and `error.tsx` (retry, support link).
- `not-found.tsx` for invalid project/task; includes quick navigation back to dashboard.
- Share page `error.tsx` handles revoked/expired tokens with support contact.

### Navigation patterns
- Sidebar built from config file `navItems.ts` aligning with information architecture.
- Breadcrumb component auto-generates from route segments.
- Deep links maintained via `Link` components with `prefetch` enabled for frequent pages; prefetch disabled on share page to avoid token leakage.

### Performance & SEO
- Critical routes use `revalidateTag` when tasks/milestones change to keep caching efficient.
- `robots.txt` disallows share routes and dashboard; only marketing pages indexed (handled elsewhere).

### Testing
- Playwright coverage includes navigation flows: login → dashboard, project navigation, share link view.
- Route guards tested via integration tests verifying 403 cases.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [03-02-journeys-and-flows](../03-ux-and-design/03-02-journeys-and-flows.md)
- [07-03-auth-and-authorisation](../07-apis-and-contracts/07-03-auth-and-authorisation.md)
- [12-04-e2e-tests](../12-testing-and-quality/12-04-e2e-tests.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [08-03-state-management](08-03-state-management.md)
- [04-01-system-context](../04-architecture-and-decisions/04-01-system-context.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should tenant slug be surfaced in URL for admin cross-tenant access at MVP, or remain implicit?
- Do we need offline fallback pages for share links when network is unstable?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Next.js 15 App Router features (loading/error) meet UX requirements; monitor for framework regressions.
- Guest users access share page without session; security handled via signed tokens as defined.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Frontend routing workshop (September 2025)
- Accessibility review for navigation patterns
- Security assessment of share routing
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
