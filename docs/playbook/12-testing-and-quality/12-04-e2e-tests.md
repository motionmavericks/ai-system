<!-- ai:managed start file="docs/playbook/12-testing-and-quality/12-04-e2e-tests.md" responsibility="docs" strategy="replace" -->
---
title: "End-to-End Tests – Motion Mavericks Portal"
doc_path: "docs/playbook/12-testing-and-quality/12-04-e2e-tests.md"
doc_type: "quality"
status: "Draft"
version: "0.2.0"
owner: "QA Engineer"
reviewers: ["Frontend Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [end-to-end, playwright]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# End-to-End Tests – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="quality"
     path="docs/playbook/12-testing-and-quality/12-04-e2e-tests.md"
     version="0.2.0"
     status="Draft"
     owner="QA Engineer">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>end-to-end, playwright</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Playwright end-to-end tests cover critical Motion Mavericks workflows from invite to asset approval. They simulate Admin, Agency, and Guest roles interacting with milestones, tasks, assets, notifications, and share links. Suites provide deployment gating and regression confidence for accessible, performant experiences.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Single-page interactions with latency-sensitive components require end-to-end coverage. The portal uses server components and streaming, so we must confirm UI states, notifications, and cross-tenant permissions in browsers. Prior manual testing missed regressions in guest share flows and comment visibility, motivating automation.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Playwright test suites executing against deployed environments (preview/staging).
- Fixtures covering Admin, Agency Producer, Client Stakeholder, Guest Reviewer personas.
- Visual checkpoints for key views (project dashboard, asset review, notifications panel).
- Excludes browser compatibility beyond evergreen (Chrome, Firefox) and mobile specifics (tracked separately).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Core suites
| Suite | Flow coverage | Notes |
|-------|---------------|-------|
| `invite-and-onboard.spec.ts` | Admin invites agency user, user completes Clerk magic link login, accepts terms, views assigned projects | Validates copy, accessibility of forms, email intercept for invites |
| `milestone-management.spec.ts` | Agency updates milestone status, uploads deliverables, triggers notifications | Checks real-time updates, verifies timeline component |
| `task-collaboration.spec.ts` | Admin assigns tasks, agency comments, guest leaves feedback via share link | Confirms permissions, comment visibility, mention notifications |
| `asset-share-link.spec.ts` | Admin generates share link, guest accesses, playback via Mux, audit log entry | Uses signed token, ensures expiry handling |
| `notifications-digest.spec.ts` | Agency enables digest, check email preview, unsubscribes | Validates Resend templates, ensures compliance footer |
| `settings-and-access.spec.ts` | Admin revokes agency user, rotates share token, checks audit entries | Ensures access control surfaces remain consistent |

### Fixtures and data
- Use seeded data script `pnpm e2e:seed` creating minimal dataset.
- Emails intercepted via local SMTP server (MailHog) for preview in tests.
- Playwright storage states stored in `tests/.auth` to speed login; invalidated each run to avoid stale sessions.

### Execution
- Trigger `pnpm test:e2e --project=chromium` on PRs touching `app`, `components`, `routes`, `services`.
- Nightly run executes across Chromium and Firefox with trace retention.
- Staging run executed pre-release with `--headed` for debugging, storing video recordings for 7 days.

### Observability
- Upload traces and screenshots to CI artefacts; link from release checklists.
- Track flakiness via Playwright report JSON; integrate with GitHub issue automation.

### Accessibility and performance hooks
- Embed `await expect(page).toPassAxe()` within critical pages to pair coverage with accessibility gating (coordinated with 12-06).
- Capture Web Vitals via Playwright API (LCP, FID proxies) to detect regressions early.

### Maintenance guidelines
- Keep selectors resilient using `data-testid` attributes defined in components.
- Reuse page object models for navigation and component interactions.
- Document known waits using auto-wait features; avoid `page.waitForTimeout`.
- When features flagged by experiments, parameterise tests to cover both states.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [08-02-component-library](../08-frontend/08-02-component-library.md)
- [09-02-backend-services](../09-backend/09-02-backend-services.md)
- [18-01-release-checklist](../18-release-and-cutover/18-01-release-checklist.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [12-05-performance-tests](12-05-performance-tests.md)
- [12-06-accessibility-tests](12-06-accessibility-tests.md)
- [16-05-user-guides](../16-documentation-and-training/16-05-user-guides.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we add Safari coverage via Playwright AWS Lambda runners prior to enterprise client onboarding?
- Should we run smoke E2E on production post-deploy, or rely solely on staging synthetic checks?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Playwright infrastructure cost remains manageable with parallel workers.
- Email interception via MailHog sufficiently mimics Resend for E2E flows.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Playwright test plan internal doc (2025)
- Legacy manual QA scripts for share links
- Resend email template previews
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
