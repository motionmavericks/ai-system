<!-- ai:managed start file="docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-asset-pipeline-mux.md" responsibility="docs" strategy="replace" -->
---
title: "ADR 003 – Asset Pipeline with Mux"
doc_path: "docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-asset-pipeline-mux.md"
doc_type: "adr"
status: "Accepted"
version: "0.1.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Agency Partner Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [adr, media, mux]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../../plan/HighLevel.Final.md"
  design: "../../03-ux-and-design/03-04-wireframes.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# ADR 003 – Asset Pipeline with Mux

> Status: **Accepted** • Version: **0.1.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="adr"
     path="docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-asset-pipeline-mux.md"
     version="0.1.0"
     status="Accepted"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../../03-ux-and-design/03-04-wireframes.md"/>
    <tags>adr, media, mux</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Motion Mavericks will use Mux Direct Upload and Playback APIs for the asset pipeline. Files upload via signed URLs (Vercel Blob staging) before ingestion to Mux, which handles transcoding, storage, and analytics. The pipeline integrates with Neon for metadata and share link generation.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Productions rely heavily on video assets requiring low-latency playback, analytics, and secure sharing. Building custom transcoding infrastructure is infeasible. Mux already features heavily in the legacy plan and supports signed playback with AU edge delivery.
]]></content>
    </section>

    <section id="decision" heading="Decision">
      <instructions>Document the decision and rationale.</instructions>
      <content><![CDATA[
## Decision
Adopt Mux Direct Upload for asset ingest with Vercel Blob as optional staging. Upon upload, Motion Mavericks server requests Mux upload URLs, stores pending asset record in Neon, and listens for webhooks signalling processing completion or failure. Playback served via signed Mux URLs with 5-minute TTL. Analytics forwarded to portal for share link reporting.
]]></content>
    </section>

    <section id="consequences" heading="Consequences">
      <content><![CDATA[
## Consequences
- **Positive**: Reliable transcoding, global CDN, analytics; minimal infrastructure overhead.
- **Positive**: Built-in signed playback supports secure share links.
- **Negative**: Dependency on Mux uptime and pricing; need formal SLA review.
- **Negative**: Upload bandwidth limited by network conditions; requires guidance for on-set producers.
]]></content>
    </section>

    <section id="alternatives" heading="Alternatives considered">
      <content><![CDATA[
## Alternatives considered
1. **Self-hosted FFmpeg on object storage** – rejected due to operational burden and limited SLA.
2. **Vimeo Enterprise** – rejected; slower API, less flexible integration, residency uncertainty.
3. **AWS MediaConvert** – rejected; heavier provisioning, requires AWS expertise absent in team.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [04-02-solution-architecture](../04-02-solution-architecture.md)
- [07-05-webhooks-and-events](../../07-apis-and-contracts/07-05-webhooks-and-events.md)
- [15-02-capacity-planning](../../15-performance-and-reliability/15-02-capacity-planning.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [ADR 005 – Share Link Security Controls](2025-09-19-share-link-security-controls.md)
- [09-04-file-and-media-storage](../../09-backend/09-04-file-and-media-storage.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we need to store low-resolution proxies locally for offline review by agencies?
- Should we enable Mux Asset Passthrough for large raw files beyond portal streaming needs?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Mux maintains AU-based edge presence with acceptable latency; monitor analytics.
- Vercel Blob retention policy ensures temporary staging storage expunged within 24 hours.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Mux solution architect consultation (September 2025)
- Legacy MVP integration notes
- Agency playback requirements from user interviews
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
