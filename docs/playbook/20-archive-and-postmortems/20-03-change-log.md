<!-- ai:managed start file="docs/playbook/20-archive-and-postmortems/20-03-change-log.md" responsibility="docs" strategy="replace" -->
---
title: "Change Log – Motion Mavericks Portal Documentation"
doc_path: "docs/playbook/20-archive-and-postmortems/20-03-change-log.md"
doc_type: "operations"
status: "Draft"
version: "0.2.0"
owner: "Docs Agent"
reviewers: ["Owen (Founder)", "Product Manager"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [change-log, documentation]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Change Log – Motion Mavericks Portal Documentation

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="operations"
     path="docs/playbook/20-archive-and-postmortems/20-03-change-log.md"
     version="0.2.0"
     status="Draft"
     owner="Docs Agent">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>change-log, documentation</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This change log records material updates to the Motion Mavericks portal playbook. Each entry lists the date, scope, and owner so stakeholders can track documentation history and coordinate reviews.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal playbook spans security, testing, operations, GTM, release, and post-launch domains. Maintaining an auditable log supports compliance (11-04), change management, and communication with agencies and internal teams.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

| Date | Change summary | Sections | Author |
|------|----------------|----------|--------|
| 2025-09-19 | Extended portal documentation from security (11-03) through archive (20-04); standardised framework baseline on Next.js 15/React 19 stack; regenerated context JSON and automation specs. | 11-03 → 20-04, `_generated/context.json` | Docs Agent |

> Add new rows chronologically with most recent first.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [20-01-postmortems-template](20-01-postmortems-template.md)
- [20-02-retrospectives](20-02-retrospectives.md)
- [docs/playbook/_generated/context.json](_generated/context.json)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [18-01-release-checklist](../18-release-and-cutover/18-01-release-checklist.md)
- [19-03-feedback-loop](../19-post-launch/19-03-feedback-loop.md)
- [17-04-marketing-launch-plan](../17-go-to-market-and-legal/17-04-marketing-launch-plan.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we automate diff summaries for future documentation runs?
- Do agency stakeholders require a public-facing changelog extract?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Future updates follow AI-managed block protocol to simplify logging.
- Dates recorded in AEST; adjust if process changes.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Documentation automation run outputs (2025-09-19)
- HighLevel Final brief
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
