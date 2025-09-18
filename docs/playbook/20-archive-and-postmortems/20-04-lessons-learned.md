<!-- ai:managed start file="docs/playbook/20-archive-and-postmortems/20-04-lessons-learned.md" responsibility="docs" strategy="replace" -->
---
title: "Lessons Learned – Motion Mavericks Portal"
doc_path: "docs/playbook/20-archive-and-postmortems/20-04-lessons-learned.md"
doc_type: "operations"
status: "Draft"
version: "0.2.0"
owner: "Product Manager"
reviewers: ["Reliability Partner", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [lessons, continuous-improvement]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Lessons Learned – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="operations"
     path="docs/playbook/20-archive-and-postmortems/20-04-lessons-learned.md"
     version="0.2.0"
     status="Draft"
     owner="Product Manager">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>lessons, continuous-improvement</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document tracks major lessons from Motion Mavericks portal delivery and operations. It captures themes, insights, and improvement actions across agency onboarding, share link adoption, performance, and compliance.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Lessons originate from postmortems (20-01), retrospectives (20-02), support rotation (19-01), and analytics reviews (19-04). Recording them prevents repeated mistakes and informs future roadmap and operational decisions.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Lessons grouped by theme (agency onboarding, share links, performance, compliance, collaboration).
- Each lesson includes context, insight, action, owner, status.
- Excludes individual action tracking (handled in respective backlogs).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

| ID | Theme | Insight | Action | Owner | Status |
|----|-------|---------|--------|-------|--------|
| LL-01 | Agency onboarding | Agencies adopt faster when provided sample projects prior to training. | Embed sample project creation in onboarding runbook (16-02). | Client Success Lead | Planned |
| LL-02 | Share links | Expired links caused confusion during pilot; need self-service regeneration. | Add “Regenerate” button with audit logging. | Product Manager | In progress |
| LL-03 | Notifications | Digest emails lacked clear CTA; reduced engagement. | Update templates with action buttons, track clicks. | Marketing Lead | Completed |
| LL-04 | Performance | Heavy asset uploads slowed API due to missing index. | Add DB index, expand load tests scenario. | Technical Lead | Completed |
| LL-05 | Compliance | Privacy notices need simplified language for guests. | Revise copy, add summary bullet list. | Legal Counsel | Planned |
| LL-06 | Collaboration | Cross-team release readiness improved when go/no-go captured in shared doc. | Make release readiness doc mandatory (18-01). | Reliability Partner | Completed |
| LL-07 | Analytics | Lack of agency-specific dashboards limited feedback. | Build agency view dashboard (14-05). | Product Analyst | In progress |

### Maintenance process
- Update table after each postmortem/retrospective.
- Review lessons quarterly; archive completed items to history section.
- Share highlights in quarterly strategy meeting.

### History archive
```
## Archive (closed lessons)
- 2025-08-10: Improved share link audit logging (LL-XX) – Completed.
```

### Knowledge sharing
- Incorporate key lessons into onboarding materials (16-04) and marketing collateral (17-05).
- Use lessons to update change log narratives (20-03) for transparency.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [20-01-postmortems-template](20-01-postmortems-template.md)
- [20-02-retrospectives](20-02-retrospectives.md)
- [19-03-feedback-loop](../19-post-launch/19-03-feedback-loop.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [16-04-onboarding](../16-documentation-and-training/16-04-onboarding.md)
- [18-01-release-checklist](../18-release-and-cutover/18-01-release-checklist.md)
- [20-03-change-log](20-03-change-log.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we automate lesson capture from retrospectives or keep manual for now?
- Do we share key lessons externally with agencies to reinforce partnership transparency?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Owners update actions promptly to maintain accuracy.
- Lessons remain accessible via knowledge base with search.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Pilot project debrief (July 2025)
- Support reports
- Reliability retrospectives
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
