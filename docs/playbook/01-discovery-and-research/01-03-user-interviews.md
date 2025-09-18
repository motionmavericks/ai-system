<!-- ai:managed start file="docs/playbook/01-discovery-and-research/01-03-user-interviews.md" responsibility="docs" strategy="replace" -->
---
title: "User Interviews – Production Portal"
doc_path: "docs/playbook/01-discovery-and-research/01-03-user-interviews.md"
doc_type: "research-plan"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Agency Partner Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [research, interviews, ux]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-01-personas.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# User Interviews – Production Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="research-plan"
     path="docs/playbook/01-discovery-and-research/01-03-user-interviews.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-01-personas.md"/>
    <tags>research, interviews, ux</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This interview plan captures how Motion Mavericks will validate production portal needs across Admin, Agency, and Client roles. It defines participant screening, a 12-question guide covering project tracking, asset review, notifications, and security, plus synthesis and consent frameworks compliant with Australian privacy law. Insights feed into personas, requirements, and UX flows.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Motion Mavericks is consolidating production operations into a single portal. Agencies and clients currently rely on fragmented tools, resulting in delayed approvals, poor visibility, and compliance risk. Interviews will surface workflow realities, friction points, and expectations for share links, notifications, and residency commitments to inform MVP scope.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Targets Admin (Owen), Agency producers, and Client stakeholders who interact with milestones, tasks, and assets.
- Covers pre-production through delivery workflows, including share link review and notification cadence.
- Excludes contractor-only participants who lack decision-making authority on tooling.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details

### Screener criteria
| Segment | Must have | Nice to have |
|---------|-----------|--------------|
| Admin | Responsible for coordinating multi-agency productions for at least 12 months | Has run incident response or recovery drills |
| Agency Producer | Oversees 3+ concurrent projects and uses at least two tools (e.g. spreadsheets + Frame.io) | Experience with clients insisting on AU data residency |
| Client Stakeholder | Approves creative deliverables, reviews share links, influences procurement decisions | Works within regulated industries (finance, government, health) |

### Interview guide (≥12 questions)
1. Describe your current process for receiving or sharing production milestones.
2. How do you track task ownership and progress when multiple agencies are involved?
3. What tools do you rely on for asset review, and what frustrates you about them?
4. Tell me about a recent approval cycle that went smoothly—what made it work?
5. Tell me about a recent approval cycle that went poorly—what broke down?
6. How do you currently manage guest access or share links for client reviewers?
7. What residency or compliance requirements do your clients enforce on shared assets?
8. How do you prefer to receive notifications or reminders about upcoming deliverables?
9. When an issue occurs (e.g. missed milestone, playback failure), how do you coordinate resolution?
10. What information do you need to feel confident a production is on track at any point?
11. How do accessibility considerations (captions, contrast, assistive tech) influence your workflow?
12. If you could automate one repetitive task in your production process, what would it be and why?
13. How quickly do you expect a system to recover from an outage before you escalate?
14. What would make you hesitate to adopt a new production portal today?

### Synthesis template
| Interviewee | Segment | Key goals | Pain points | Opportunities | Follow-up actions |
|-------------|---------|-----------|-------------|---------------|-------------------|
| Name/ID | Admin / Agency / Client | Desired outcomes | Frictions and blockers | Ideas or needs Motion Mavericks can address | Owner + due date |

### Consent statement (Australian privacy compliance)
> “Thank you for participating in this Motion Mavericks research session. We will record notes so we can improve our production management portal. Your participation is voluntary, and you may withdraw at any time. We will store your contact details and interview notes securely in Australia, accessible only to Motion Mavericks and approved research partners. We will not publish your name or individual responses without your consent. Do you agree to proceed under these terms?”
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
- [High-level portal brief](../../plan/HighLevel.Final.md)
- [Agency onboarding playbook](../16-documentation-and-training/16-04-onboarding.md)
- [Legacy MVP plan (context)](../../specs/legacy-mvp-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link neighbouring documents.</instructions>
      <content><![CDATA[
## Related
- [01-01-market-research](01-01-market-research.md)
- [03-01-personas](../03-ux-and-design/03-01-personas.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Document unresolved considerations.</instructions>
      <content><![CDATA[
## Open questions
- Do client stakeholders require a separate consent flow when recordings include agency personnel from multiple organisations?
- Should interviews capture telemetry preferences (e.g. analytics dashboards) beyond notifications?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>List assumptions to validate.</instructions>
      <content><![CDATA[
## Assumptions
- Participants will allow note-taking without audio recording; confirm preference at session start.
- Agency partners will provide at least two producer contacts who meet the screener criteria.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Attribute primary information inputs.</instructions>
      <content><![CDATA[
## Sources
- Motion Mavericks stakeholder interviews (August–September 2025)
- Australian Privacy Principles guidance (OAIC, 2025)
- Agency partner feedback on previous onboarding workshops
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
