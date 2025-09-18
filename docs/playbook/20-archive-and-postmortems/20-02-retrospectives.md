<!-- ai:managed start file="docs/playbook/20-archive-and-postmortems/20-02-retrospectives.md" responsibility="docs" strategy="replace" -->
---
title: "Retrospectives – Motion Mavericks Portal"
doc_path: "docs/playbook/20-archive-and-postmortems/20-02-retrospectives.md"
doc_type: "operations"
status: "Draft"
version: "0.2.0"
owner: "Product Manager"
reviewers: ["Reliability Partner", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [retrospective, continuous-improvement]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Retrospectives – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="operations"
     path="docs/playbook/20-archive-and-postmortems/20-02-retrospectives.md"
     version="0.2.0"
     status="Draft"
     owner="Product Manager">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>retrospective, continuous-improvement</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This retrospective framework drives continuous improvement for the Motion Mavericks portal. It defines cadence, participants, agenda, artefacts, and follow-up for evaluating releases, projects, and quarterly initiatives.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
As the portal scales, teams must reflect on successes and issues across development, reliability, support, and GTM. Retrospectives complement postmortems (20-01) and feedback loops (19-03), ensuring learnings feed into roadmap prioritisation (19-05) and operational runbooks (16-02).
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Retrospective cadences: sprint, monthly release, quarterly business review.
- Agenda structure, facilitation guidelines, documentation expectations.
- Excludes individual performance reviews.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Cadence overview
| Cadence | Participants | Focus |
|---------|-------------|-------|
| Sprint (bi-weekly) | Engineering, QA, Product, Reliability | Delivery process, code quality, testing gaps |
| Monthly | Product, Client Success, Marketing, Reliability | Release outcomes, support trends, customer feedback |
| Quarterly | Leadership + cross-functional | Strategic alignment, KPI review, roadmap adjustments |

### Agenda template (60 min)
1. Check-in (5 min): quick sentiment, highlight wins.
2. Review of goals/metrics (10 min): sprint/release targets, SLO status, adoption metrics.
3. What went well (10 min): capture successes to repeat.
4. What needs improvement (15 min): capture issues; group by theme (process, tooling, collaboration, compliance).
5. Actions and owners (15 min): convert insights into tasks with deadlines.
6. Wrap-up (5 min): recap actions, gratitude, next retrospective date.

### Facilitation guidelines
- Rotate facilitator between Product, Reliability, Client Success.
- Collect inputs asynchronously via shared doc or tool 24 hours prior.
- Use inclusive language, ensure all roles heard (Admin, Agency, Guest perspectives represented).
- Track psychological safety and avoid blame.

### Documentation
- Store notes in `/docs/retrospectives/YYYY-MM-DD.md` under AI-managed block.
- Include attendees, summary, agreed actions, status updates.
- Link to relevant postmortems, feedback items, analytics reports.

### Action tracking
- Actions entered into Linear project `Operations::Retro` with priority and due dates.
- Review outstanding items at start of next retrospective.
- Escalate persistent blockers to leadership.

### Integration with other processes
- Feed high-impact actions into roadmap (19-05) or reliability backlog (15-03).
- Update runbooks (16-02) and user guides (16-05) if process changes required.
- Reference change log (20-03) when actions lead to user-facing updates.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [20-01-postmortems-template](20-01-postmortems-template.md)
- [19-03-feedback-loop](../19-post-launch/19-03-feedback-loop.md)
- [19-05-roadmap-prioritisation](19-05-roadmap-prioritisation.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [16-02-runbooks](../16-documentation-and-training/16-02-runbooks.md)
- [18-01-release-checklist](../18-release-and-cutover/18-01-release-checklist.md)
- [20-03-change-log](20-03-change-log.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should agency partners participate in quarterly retrospectives?
- Do we record retrospectives for asynchronous review or keep notes only?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Teams allocate time for retrospectives without impacting release cadence.
- Tooling (Miro/Notion) available for collaborative brainstorming.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Agile ceremony guidelines
- Motion Mavericks operations manual
- Pilot retrospective notes
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
