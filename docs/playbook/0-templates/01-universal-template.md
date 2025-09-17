---
title: "{{title}}"
doc_path: "{{doc.path}}"
doc_type: "{{doc.type}}"
status: "{{status|draft}}"
version: "{{version|0.1.0}}"
owner: "{{owner.name}}"
reviewers: [{{reviewers.csv}}]
last_updated: "{{date.today}}"
project: "{{project.name}}"
tags: [{{tags}}]
links:
  repo: "{{repo.url}}"
  ticket: "{{tracker.url}}"
  design: "{{design.url}}"
  spec: "{{spec.url}}"
language: "en-AU"
tone: "Declarative"
---

# {{title}}

> Status: **{{status}}** • Version: **{{version}}** • Updated: **{{last_updated}}**

<doc xmlns="urn:docs:universal"
     type="{{doc.type}}"
     path="{{doc.path}}"
     version="{{version}}"
     status="{{status}}"
     owner="{{owner.name}}">

  <meta>
    <link rel="repo" href="{{repo.url}}"/>
    <link rel="ticket" href="{{tracker.url}}"/>
    <link rel="design" href="{{design.url}}"/>
    <link rel="spec" href="{{spec.url}}"/>
    <tags>{{tags}}</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
]]></content>
    </section>

    <section id="objectives" heading="Objectives">
      <instructions>List measurable objectives or success criteria. Delete if not relevant.</instructions>
      <content><![CDATA[
## Objectives
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
]]></content>
    </section>

    <section id="users" heading="Users and stakeholders">
      <instructions>Summarise target users or personas and key stakeholders with roles. Remove if not needed.</instructions>
      <content><![CDATA[
## Users and stakeholders
]]></content>
    </section>

    <section id="details" heading="Details">
      <instructions>Provide the core information the team needs (flows, architecture, tables, etc.). Use subsections as required.</instructions>
      <content><![CDATA[
## Details
]]></content>
    </section>

    <section id="requirements" heading="Requirements">
      <instructions>Capture functional and non-functional requirements with identifiers. Remove if none.</instructions>
      <content><![CDATA[
## Requirements
]]></content>
    </section>

    <section id="risks" heading="Risks">
      <instructions>Document material risks with mitigation and owner. Remove if none.</instructions>
      <content><![CDATA[
## Risks
]]></content>
    </section>

    <section id="metrics" heading="Metrics and acceptance">
      <instructions>Include success metrics, acceptance tests, or release criteria. Remove if unnecessary.</instructions>
      <content><![CDATA[
## Metrics and acceptance
]]></content>
    </section>

    <section id="dependencies" heading="Dependencies">
      <instructions>List dependencies, lead teams, and status. Remove if none.</instructions>
      <content><![CDATA[
## Dependencies
]]></content>
    </section>

    <section id="timeline" heading="Timeline and milestones">
      <instructions>Record key dates, decision points, or rollout stages. Remove if not applicable.</instructions>
      <content><![CDATA[
## Timeline and milestones
]]></content>
    </section>

    <section id="implementation" heading="Implementation notes">
      <instructions>Capture sequencing, open decisions, or resourcing notes. Remove if not needed.</instructions>
      <content><![CDATA[
## Implementation notes
]]></content>
    </section>

    <section id="references" heading="References">
      <instructions>List supporting documents, tickets, or code paths using relative links where possible.</instructions>
      <content><![CDATA[
## References
]]></content>
    </section>

  </sections>
</doc>
