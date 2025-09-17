---
title: "Motion Mavericks Constraints"
doc_path: "docs/playbook/00-brief-and-vision/00-04-constraints.md"
doc_type: "constraint-pack"
status: "Draft"
version: "0.1.0"
owner: "Owen (Founder)"
reviewers: []
last_updated: "2025-09-18"
project: "Motion Mavericks MVP"
tags: [constraints, governance]
source: ["00-agent-execution-brief", "repo"]
ai_managed: true
---

<!-- ai:managed start file="docs/playbook/00-brief-and-vision/00-04-constraints.md" responsibility="docs" strategy="replace" -->
# Motion Mavericks Constraints

> Status: **Draft** • Version: **0.1.0** • Updated: **2025-09-18**

<doc xmlns="urn:docs:universal"
     type="constraint-pack"
     path="docs/playbook/00-brief-and-vision/00-04-constraints.md"
     version="0.1.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <tags>constraints, governance, motion-mavericks</tags>
  </meta>

  <sections>

    <section id="overview" heading="Overview">
      <instructions>Summarise constraint landscape.</instructions>
      <content><![CDATA[
## Overview
Motion Mavericks operates with a single internal stakeholder and relies on contracted partners, so the MVP must respect rigorous time, budget, technical, and regulatory constraints while minimising coordination overhead.
]]></content>
    </section>

    <section id="summary" heading="Summary">
      <instructions>Highlight key constraints.</instructions>
      <content><![CDATA[
## Summary
- Calendar: P0 documentation approvals by 2025-09-29 and enterprise security review on 2025-10-15.
- Budget: Deliver within existing vendor plans and lean operational spend.
- Technical: Stay aligned with vetted stack versions and vendor trust boundaries.
- Regulatory: Demonstrate GDPR and Australian Privacy Principles compliance for client crews and agencies.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Explain drivers.</instructions>
      <content><![CDATA[
## Context
Independent multi-agent reviews exposed critical control gaps that must be remediated before enterprise pilots. With no internal departments to delegate to, Owen needs codified constraints to guide when external partners engage and how trade-offs are evaluated.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>Define applicability.</instructions>
      <content><![CDATA[
## Scope
- Applies to all MVP activities across product, engineering, security, compliance, and finance managed by Owen.
- Excludes future expansion phases where additional tooling or hires may be approved.
- Assumes external partners adhere to the same constraints via contractual terms.
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide constraint specifics.</instructions>
      <content><![CDATA[
## Details
Constraints are grouped below to provide clear guardrails for planning, procurement, and execution when coordinating agencies or client crews.
]]></content>
    </section>

    <section id="time" heading="Time">
      <instructions>Document time constraints.</instructions>
      <content><![CDATA[
## Time
- P0 documentation (security, compliance, operational playbooks) must be ready for advisor review by 2025-09-22 to allow feedback before the 2025-09-29 approval deadline.
- Staging validation window closes 2025-10-10 to prepare the 2025-10-15 enterprise security review.
- Agency engagements must respect ≤2 hours/week of combined availability to stay within retainer agreements.
- Incident rehearsals and vendor assurance updates must complete by 2025-10-08.
]]></content>
    </section>

    <section id="budget" heading="Budget">
      <instructions>Document budget constraints.</instructions>
      <content><![CDATA[
## Budget
- Operate within current subscription tiers for Mux, Clerk, Neon, Vercel, Resend, and Sentry.
- Maintain spend variance within ±5% of forecast; deviations require Owen’s approval and explanation to bookkeeping services.
- Additional tooling or agency scope increases demand prior cost-benefit justification and documented approval.
]]></content>
    </section>

    <section id="technical" heading="Technical">
      <instructions>Document technical constraints.</instructions>
      <content><![CDATA[
## Technical
- Mandatory stack versions: Next.js 15+ App Router, Clerk v5+, Neon (Sydney), Drizzle ORM v0.33+, Vercel KV/Cron/Blob, Sentry v8+, Resend API v2+.
- Architecture must preserve vendor trust boundaries that underpin signed playback, DLQ management, and audit logging.
- Infrastructure remains on Vercel + Neon; multi-region and self-hosted variants are deferred until after MVP validation.
- Observability must leverage existing tooling without deploying new agents in production environments.
]]></content>
    </section>

    <section id="regulatory" heading="Regulatory">
      <instructions>Document regulatory constraints.</instructions>
      <content><![CDATA[
## Regulatory
- GDPR Article 32 and Australian Privacy Principles compliance must be evidenced through documentation and system behaviour.
- Contracts with client crews require 30-day erasure workflows, lawful basis mapping, and consent management records.
- Annual vendor assurance (Mux, Clerk, Neon, Vercel) must be logged even when handled by external agencies.
- Privacy notices and consent copy need legal review before production deployment.
]]></content>
    </section>

    <section id="implications" heading="Implications">
      <instructions>Describe consequences of constraints.</instructions>
      <content><![CDATA[
## Implications
- Work sequencing must prioritise documentation and validation before feature expansion to avoid missing review dates.
- Budget rigidity pushes towards automation and repeatable scripts rather than manual interventions by agencies.
- Technical guardrails constrain experimentation; deviations require formal risk assessments and advisor approval.
- Regulatory expectations add lead time for legal consultation and client crew sign-off, influencing delivery velocity.
]]></content>
    </section>

    <section id="related" heading="Related">
      <instructions>Cross-link references.</instructions>
      <content><![CDATA[
## Related
- [00-05-risks-and-assumptions](../00-brief-and-vision/00-05-risks-and-assumptions.md)
- [04-04-threat-model](../04-architecture-and-decisions/04-04-threat-model.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <instructions>Outstanding clarifications.</instructions>
      <content><![CDATA[
## Open questions
- What notice period do agencies require before increasing their involvement beyond the standard retainer hours?
- Will enterprise clients mandate third-party attestations earlier than the planned annual cadence?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <instructions>Document assumptions.</instructions>
      <content><![CDATA[
## Assumptions
- External partners can deliver within the documented constraints; confirm during contract reviews.
- Enterprise security review timeline remains fixed; validate with the prospect’s procurement contact fortnightly.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <instructions>Provide references.</instructions>
      <content><![CDATA[
## Sources
- docs/plan/HighLevel.Final.md (with stakeholder clarification from Owen)
- docs/playbook/0-templates/03-playbook-docs-orchestration-guide.md
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
