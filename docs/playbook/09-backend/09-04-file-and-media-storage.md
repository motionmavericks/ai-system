<!-- ai:managed start file="docs/playbook/09-backend/09-04-file-and-media-storage.md" responsibility="docs" strategy="replace" -->
---
title: "File and Media Storage – Motion Mavericks Portal"
doc_path: "docs/playbook/09-backend/09-04-file-and-media-storage.md"
doc_type: "architecture"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Reliability Partner", "Security Specialist"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [storage, media]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# File and Media Storage – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="architecture"
     path="docs/playbook/09-backend/09-04-file-and-media-storage.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>storage, media</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document details Motion Mavericks portal file and media storage architecture, including Vercel Blob staging, Mux processing, Neon metadata, and retention policies. It ensures assets remain in Australian regions, support signed playback, and satisfy backup and compliance requirements.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Video-heavy productions demand reliable upload, transcoding, and playback with strict access controls. The portal integrates Mux for media handling, Vercel Blob for staging, and Neon for metadata. Storage decisions account for residency, throughput, and cost.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Covers asset upload flow, storage locations, access controls, retention, backups, and incident handling for files.
- Excludes static marketing assets.
- Assumes Mux Pro account with AU PoPs and Vercel Blob in same region.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Upload pipeline
1. Agency requests upload URL via `/api/v1/assets/upload-url`.
2. Server validates file size (<5 GB), type (video/mp4, mov, image, pdf), and milestone association.
3. Generates signed Vercel Blob URL (temporary 15-minute expiry) for client upload.
4. Client uploads file to Blob; server triggers Mux Direct Upload using Blob reference.
5. Asset record created in Neon with status `processing`; includes storage checksum, uploader ID, version.
6. On Mux webhook `asset.ready`, update status `ready`, store playback IDs, gather metadata (duration, aspect).

### Storage layers
- **Vercel Blob**: transient staging; objects auto-expire after 48 hours via TTL policy.
- **Mux**: primary media storage/distribution; data stored per vendor in AU region (confirmed). Assets accessible via signed playback.
- **Neon**: metadata (file name, size, checksum, status, version). No binary storage.
- **Downloadable files (non-video)**: served via Vercel Blob direct download with signed URL (if required), or stored in encrypted S3 (future optional).

### Access control
- Upload URLs signed per user and scoped to asset; token includes tenant ID.
- Playback URLs signed via Mux with 5-minute expiry; share link security overlay controls optional passcode.
- Admin can revoke asset: triggers deletion request to Mux and removes metadata.

### Retention
- Latest asset versions retained; previous versions archived (status `archived`) and stored in Mux with tag `archived`. Clean-up job purges archived versions after 90 days unless flagged.
- Deleted projects trigger asset purge; share links revoked before deletion.
- Staging environment uses seeded sample assets; automatically purged weekly.

### Backups & recovery
- Mux handles redundancy; ensure assets available via vendor SLA. For compliance, maintain metadata snapshot of assets with checksum. If Mux outage, share link playback fails; fallback to manual download via Vercel Blob not maintained for MVP.
- Metadata backups part of Neon backup plan; re-link assets via Mux API after restore.

### Monitoring
- Observability: track upload success, processing time, playback error rate (<1%).
- Alerts triggered for Mux processing failures, high error rate, or Blob upload errors >5% per hour.

### Incident handling
- Asset processing failure triggers incident runbook: notify reliability partner, attempt reupload, inform agency.
- If asset leak suspected, revoke share links, delete asset from Mux, rotate share token salt.

### Cost controls
- Monitor Mux minutes, storage, streaming; dashboards highlight consumption relative to budget.
- Large raw files >5 GB require manual handling (external transfer). Document in operations runbook.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [ADR 003 – Asset Pipeline with Mux](../04-architecture-and-decisions/adrs/2025-09-19-asset-pipeline-mux.md)
- [07-05-webhooks-and-events](../07-apis-and-contracts/07-05-webhooks-and-events.md)
- [15-02-capacity-planning](../15-performance-and-reliability/15-02-capacity-planning.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [06-04-backup-and-restore](../06-data-model-and-storage/06-04-backup-and-restore.md)
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we need to support downloadable proxies for offline client review in future iterations?
- Should we invest in watermarking or DRM options for high-sensitivity content post-MVP?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Mux retains AU residency; confirm quarterly with vendor updates.
- Agencies comfortable with 48-hour staging retention; if longer needed, adjust TTL policy.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Mux architecture consultation (September 2025)
- Vercel Blob documentation
- Compliance advisor requirements
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
