---
title: "Motion Mavericks Product Vision"
doc_path: "docs/playbook/00-brief-and-vision/00-01-product-vision.md"
doc_type: "product-vision"
status: "Draft"
version: "0.1.0"
owner: "Owen (Founder)"
reviewers: []
last_updated: "2025-09-18"
project: "Motion Mavericks Portal"
tags: [vision, production-management, motion-mavericks]
source: ["legacy-spec", "repo"]
ai_managed: true
---

<!-- ai:managed start file="docs/playbook/00-brief-and-vision/00-01-product-vision.md" responsibility="docs" strategy="replace" -->
# Motion Mavericks Product Vision

> Status: **Draft** • Version: **0.1.0** • Updated: **2025-09-18**

<doc xmlns="urn:docs:universal"
     type="product-vision"
     path="docs/playbook/00-brief-and-vision/00-01-product-vision.md"
     version="0.1.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <tags>vision, production-management, motion-mavericks</tags>
  </meta>

  <sections>

    <section id="overview" heading="Overview">
      <instructions>High-level framing of the document.</instructions>
      <content><![CDATA[
## Overview
Motion Mavericks operates as a Melbourne-based production company that collaborates with agencies and client organisations on fast-moving creative projects. The MVP portal centralises milestones, tasks, assets, notifications, and shareable links so Owen can run every engagement from a single system while keeping agencies accountable and clients confident.
]]></content>
    </section>

    <section id="summary" heading="Summary">
      <instructions>Purpose and expected outcomes.</instructions>
      <content><![CDATA[
## Summary
- Deliver one secure, low-friction workspace for Motion Mavericks (Admin) and agency partners to manage projects end-to-end.
- Replace fragmented spreadsheets, email threads, and ad-hoc file drops with structured milestones, tasks, and deliverable tracking.
- Provide controlled guest access so client decision-makers can review assets without bypassing governance or risking leaks.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
- Owen is the sole internal operator juggling production schedules, creative approvals, contractor coordination, and client communications.
- Agencies such as MKTG, colour grading houses, and freelance crews rely on Motion Mavericks for direction yet struggle with inconsistent handovers and status visibility.
- Clients expect a polished, accountable experience with clear progress across pre-production, shoot, post, and delivery.
- The legacy plan targeted secure video delivery; the enduring need is broader—single source of truth for every milestone, task, asset, and notification across the production lifecycle.
]]></content>
    </section>

    <section id="objectives" heading="Objectives">
      <instructions>List measurable objectives or success criteria.</instructions>
      <content><![CDATA[
## Objectives
- Launch the Motion Mavericks portal supporting Admin, Agency, and Guest roles with audited access and share links.
- Centralise project tracking so 100% of active productions have milestones, tasks, and asset statuses recorded in the portal by pilot completion.
- Reduce agency onboarding time to under five minutes via magic-link login and tenant-aware navigation.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Covers all functionality needed for project management: tenant model, agency onboarding, project dashboards, milestone/task hierarchy, asset management, commenting, notifications, and shareable links.
- Includes foundational non-functional commitments: availability (99.9%), performance (ANZ p95 <400 ms TTFB), accessibility (WCAG 2.2 AA), Australian residency preference, and recovery targets (RPO ≤24 h, RTO ≤1 h).
- Assumes continued use of the defined stack (Vercel, Next.js, Neon, Drizzle, Mux, Vercel Blob, Resend, Sentry, Vercel KV) and integration with existing production workflows.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide supporting narrative for the mission and constraints.</instructions>
      <content><![CDATA[
## Details
- The portal treats Motion Mavericks as the admin tenant that provisions agencies (starting with MKTG) and associated users.
- Every project decomposes into milestones and tasks, enabling precise tracking from briefs through delivery while surfacing due dates and statuses.
- Assets (video, image, PDF, docs) live alongside commentary and share links, with Mux powering video processing and playback.
- Notifications span email (Resend) and in-app feeds to keep agencies and clients aligned without relying on external chat tools.
]]></content>
    </section>

    <section id="mission" heading="Mission">
      <instructions>Statement capturing purpose and ambition.</instructions>
      <content><![CDATA[
## Mission
Provide Motion Mavericks and its partner agencies with a single, secure portal that streamlines production management—from onboarding and milestones to deliverables and client review—without sacrificing control, privacy, or agility.
]]></content>
    </section>

    <section id="value" heading="Value proposition">
      <instructions>List differentiated value propositions.</instructions>
      <content><![CDATA[
## Value proposition
1. **Unified production command centre**: Admins and agencies share one truth for milestones, tasks, and assets, eliminating spreadsheet chaos.
2. **Secure collaborative delivery**: Mux-backed video, controlled share links, and audit trails ensure clients only see approved material.
3. **Frictionless agency onboarding**: Passwordless magic links and tenant-aware navigation reduce downtime for contracted crews.
4. **Client-ready transparency**: Guests receive polished, view-only experiences with optional passwords, expiry, and playback telemetry.
5. **Operational guardrails**: Built-in notifications, rate limiting, residency, and accessibility measures keep engagements compliant and resilient.
]]></content>
    </section>

    <section id="non_goals" heading="Non-goals">
      <instructions>Identify what the initiative will not attempt.</instructions>
      <content><![CDATA[
## Non-goals
- Delivering custom-branding, theming, or white-label deployments for agencies in the MVP.
- Introducing timecoded annotations, watermarking, or formal approval workflows.
- Integrating Slack, Microsoft Teams, or other chat ecosystems before core flows stabilise.
- Implementing SSO/SCIM, template automation, or complex budgeting modules in the initial release.
- Running on-premise or multi-region active-active infrastructure ahead of validation.
- Building public marketing sites or consumer-facing marketplaces within this scope.
]]></content>
    </section>

    <section id="out_of_scope" heading="Out-of-scope">
      <instructions>Detailed exclusions beyond non-goals.</instructions>
      <content><![CDATA[
## Out-of-scope
- Custom domains or agency-branded portals; Vercel-hosted domain is sufficient for MVP.
- Watermarking, download prevention beyond Mux’s baseline controls, and forensic watermarking.
- Automated approval workflows; approvals remain manual with comment threads.
- Automated template libraries for milestones/tasks; Owen defines structures per project manually in MVP.
- Rich integrations with third-party PM tools (Asana, Monday.com) or file storage beyond Vercel Blob.
- International data residency options beyond core AU-first deployment.
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents using relative links.</instructions>
      <content><![CDATA[
## References
- [Legacy MVP specification](../../specs/legacy-mvp-plan.md)
- [Tech stack reference](../0-templates/03-playbook-docs-orchestration-guide.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link supporting documents.</instructions>
      <content><![CDATA[
## Related
- [00-02-success-metrics](../00-brief-and-vision/00-02-success-metrics.md)
- [02-03-non-functional-requirements](../02-requirements-and-scope/02-03-non-functional-requirements.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Track unresolved points.</instructions>
      <content><![CDATA[
## Open questions
- Which agencies beyond MKTG will be onboarded in the first quarter after MVP launch, and do they require bespoke contractual terms?
- What reporting cadence do clients expect for milestone updates (e.g., weekly digest versus real-time notifications)?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>Document assumptions with validation intent.</instructions>
      <content><![CDATA[
## Assumptions
- Agencies accept portal-based commenting instead of email threads; validate during pilot onboarding.
- Guest viewers are satisfied with view-only experience without download access; capture feedback from first three client rollouts.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>List primary information sources.</instructions>
      <content><![CDATA[
## Sources
- Provided legacy scope specification (2023 draft)
- Motion Mavericks operational context from Owen
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
