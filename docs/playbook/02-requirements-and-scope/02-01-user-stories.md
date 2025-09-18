<!-- ai:managed start file="docs/playbook/02-requirements-and-scope/02-01-user-stories.md" responsibility="docs" strategy="replace" -->
---
title: "User Stories – Motion Mavericks Portal"
doc_path: "docs/playbook/02-requirements-and-scope/02-01-user-stories.md"
doc_type: "requirements"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [requirements, user-stories]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# User Stories – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="requirements"
     path="docs/playbook/02-requirements-and-scope/02-01-user-stories.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>requirements, user-stories</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This catalogue captures user stories for the Motion Mavericks portal, covering Admin, Agency, and Guest roles. Stories are grouped by epic and mapped to success metric IDs defined in `00-02-success-metrics.md` (SM-01 to SM-07). They ensure functional scope aligns with onboarding, milestone coverage, share link performance, accessibility, availability, and notification targets.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The refreshed portal scope requires cohesive project tracking, asset delivery, and share link experiences. By codifying stories per epic, we anchor engineering, design, and QA around the required user outcomes and non-functional commitments such as AU residency and RPO/RTO. Each story provides traceability to success metrics used for launch gating.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Includes onboarding, project tracking, asset delivery, collaboration, share links, and notification epics.
- Stories cover MVP behaviours; advanced features (e.g. marketplace, deep integrations) remain out-of-scope.
- Assumes supporting infrastructure (Mux, Neon, Clerk, Resend, Vercel) delivers baseline capabilities.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details
| Epic | Story | Trace |
|------|-------|-------|
| Onboarding | As an Admin, I want to invite an agency producer via email so that they can access the portal without manual account setup. | SM-01 |
| Onboarding | As an Agency Producer, I want to authenticate via magic link so that I can log in within minutes without remembering a password. | SM-01 |
| Onboarding | As an Admin, I want to assign agency users to specific projects so that only relevant work appears in their dashboard. | SM-01, SM-02 |
| Onboarding | As a Guest reviewer, I want to activate access from a share link invite so that I can review assets without requesting additional credentials. | SM-04 |
| Project tracking | As an Admin, I want to create milestone templates so that new projects launch with consistent structure. | SM-02 |
| Project tracking | As an Agency Producer, I want to update task status with a single click so that progress reflects in dashboards instantly. | SM-02, SM-03 |
| Project tracking | As an Admin, I want to see overdue milestones highlighted so that I can escalate blockers early. | SM-02 |
| Project tracking | As a Client Stakeholder, I want to view milestone summaries so that I can confirm the production is on track. | SM-02, SM-03 |
| Asset delivery | As an Agency Producer, I want to upload assets directly to a milestone so that approvals stay linked to deliverables. | SM-02, SM-04 |
| Asset delivery | As an Admin, I want to enforce signed playback URLs so that asset access remains controlled. | SM-04, SM-06 |
| Asset delivery | As a Guest reviewer, I want to play videos reliably on corporate networks so that I can provide timely feedback. | SM-04, SM-06 |
| Collaboration | As an Agency Producer, I want to mention teammates in comments so that follow-up actions are clear. | SM-02, SM-07 |
| Collaboration | As an Admin, I want comment threads captured in audit logs so that compliance reviews have full context. | SM-02, SM-06 |
| Collaboration | As a Client Stakeholder, I want to upload reference files to a comment so that agencies have complete feedback. | SM-04 |
| Share links | As an Agency Producer, I want to generate expiring share links so that clients cannot access outdated assets. | SM-04, SM-06 |
| Share links | As a Guest reviewer, I want an optional access code so that I feel confident the link is secure. | SM-04 |
| Share links | As an Admin, I want to revoke a share link instantly so that I can respond to leaks or errors. | SM-04, SM-06 |
| Notifications | As an Agency Producer, I want a daily digest of due tasks so that nothing slips through overnight. | SM-02, SM-07 |
| Notifications | As a Guest reviewer, I want a reminder before my review window expires so that I do not miss feedback deadlines. | SM-04, SM-07 |
| Notifications | As an Admin, I want incident alerts when asset processing fails so that I can trigger recovery runbooks. | SM-06, SM-07 |
| Non-functional | As an Admin, I want residency dashboards so that I can prove data remains within Australia. | SM-06 |
| Non-functional | As a Reliability Partner, I want to schedule backup and restore drills so that RPO/RTO targets stay achievable. | SM-06 |
| Non-functional | As a Design Lead, I want automated accessibility scans so that each release meets WCAG 2.2 AA. | SM-05 |
| Non-functional | As an Admin, I want analytics on onboarding completion so that I can validate agencies hit the ≤5 minute target. | SM-01 |
| Collaboration | As an Agency Producer, I want to attach approvals to tasks so that completion accuracy stays within 2% variance. | SM-03 |
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [00-02-success-metrics](../00-brief-and-vision/00-02-success-metrics.md)
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [Legacy MVP plan (context)](../../specs/legacy-mvp-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [02-02-acceptance-criteria](02-02-acceptance-criteria.md)
- [03-02-journeys-and-flows](../03-ux-and-design/03-02-journeys-and-flows.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Should non-functional stories referencing SM-06 include explicit alert routing to on-call rotations, or is coverage in reliability docs sufficient?
- Do client stakeholders require separate stories for digest personalisation by asset type?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Success metric identifiers (SM-01…SM-07) remain stable; if updated, traces will be revised.
- Agencies are willing to adopt the defined comment tagging workflow to support audit trails.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks stakeholder interviews (August–September 2025)
- Prior portal backlog workshop notes
- Non-functional targets documented in docs/plan/HighLevel.Final.md
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
