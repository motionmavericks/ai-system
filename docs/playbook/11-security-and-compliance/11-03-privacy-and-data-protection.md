<!-- ai:managed start file="docs/playbook/11-security-and-compliance/11-03-privacy-and-data-protection.md" responsibility="docs" strategy="replace" -->
---
title: "Privacy and Data Protection – Motion Mavericks Portal"
doc_path: "docs/playbook/11-security-and-compliance/11-03-privacy-and-data-protection.md"
doc_type: "security"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Security Specialist", "Legal Counsel"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [privacy, compliance, data-protection]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Privacy and Data Protection – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="security"
     path="docs/playbook/11-security-and-compliance/11-03-privacy-and-data-protection.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>privacy, compliance, data-protection</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document defines how Motion Mavericks safeguards personal and production data across the portal. It codifies privacy principles, data handling controls, residency guarantees for Australian productions, and alignment with AU Privacy Act and GDPR. It informs Admin, Agency, and Guest usage patterns, especially for milestones, tasks, assets, notifications, and share links.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal aggregates production metadata, file assets streamed via Mux, agency collaboration notes, and client feedback. Sensitive personal data is limited to contact details, comments, and audit trails, but exposure risk is heightened by multi-tenant access, share links, and cross-border processors. Compliance targets mandate Australian residency preference, documented data subject response processes, RPO ≤24 h, and RTO ≤1 h.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Data classification, handling, retention, deletion, and residency rules for portal data stores and integrated services.
- Consent, transparency, and notification obligations related to Admin, Agency, and Guest users.
- Data subject request (DSR) workflow, incident escalation linkage, and privacy impact checkpoints.
- Excludes deeply technical security hardening (see 11-01) and secrets operations (see 11-02), but references those controls.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Data classification and residency
| Data class | Examples | Residency target | Retention | Access roles |
|------------|----------|------------------|-----------|--------------|
| Contact/profile | Names, emails, agency affiliation | Primary storage in Neon (Sydney) | Active + 12 months post offboarding | Admin, Agency (same tenant) |
| Project metadata | Milestones, tasks, statuses, checklists | Neon (Sydney) | Project duration + 24 months (audit) | Admin, Agency |
| Asset metadata | File names, codecs, Mux asset IDs | Neon (Sydney) + Mux (AU edge) | Lifecycle of asset + client retention request | Admin, Agency, Guest (read via share link) |
| Asset content | Video files, thumbnails | Mux storage (global CDN, AU ingest) | Active project + 12 months, extendable by Admin approval | Admin upload, Agency manage, Guests via signed URL |
| Comments & feedback | Thread messages, annotations | Neon (Sydney) | Project duration + 24 months | Admin, Agency, Guest (per share permissions) |
| Audit & notifications | Activity logs, email digest history | Neon (Sydney) + Resend logs (regionally distributed) | 365 days minimum, 90-day digest logs | Admin, Security specialist |
| Authentication & share tokens | Clerk session IDs, share link tokens | Clerk (regional, AU-first) + Redis cache | Session life + revocation TTL (≤30 days) | Admin, Security specialist |

Residency exceptions require Legal Counsel approval and documented justification stored in compliance register.

### Data lifecycle controls
1. **Collection**: Capture minimal attributes needed for project coordination. Onboarding collects name, email, role, agency. Optional phone stored only if provided.
2. **Use**: Apply least privilege; features display only relevant data (e.g., Guests cannot see agency-only tasks). Notification payloads include minimal context.
3. **Storage**: Encrypt at rest via Neon, Mux default, and Vercel-managed secrets. Apply role-based policies per data class.
4. **Sharing**: Share links rely on signed tokens with configurable expiry (default 14 days). Optional passphrase enforcement by Admin for sensitive deliveries.
5. **Deletion**: Support soft delete for audit, with hard delete scheduled weekly for PII flagged by DSR completion.

### Privacy controls
- **Consent and transparency**: Invitations include privacy notice referencing AU Privacy principles. Portal footer links to Terms and Privacy docs (17-03).
- **Access logging**: Every asset view via share link triggers audit event with timestamp, IP (redacted to /24), and role classification.
- **Notification hygiene**: Emails avoid embedding raw PII; include unsubscribe controls for non-transactional digests.
- **Minimisation**: Comments auto-redact `<REDACTED>` tokens to prevent accidental secret leakage; attachments limited to approved formats.
- **Children’s data**: Not collected; flagged as non-goal in mission docs.

### Data subject request (DSR) workflow
1. Intake via support queue or privacy@ mailbox (monitored daily).
2. Verify requestor identity (Clerk re-auth + manual cross-check with Admin).
3. Run export script: `pnpm privacy:export --email <user>` generating shareable package within 10 business days.
4. For deletion requests, queue anonymisation job removing personal identifiers while retaining project statistics.
5. Record outcome in compliance log and notify requester.
6. Update analytics to remove associated identifiers (Segment suppression list, if used).

### Third-party processors
| Service | Purpose | Data handled | Region assurance | Contract owner |
|---------|---------|--------------|------------------|----------------|
| Clerk | Authentication, session tokens | Email, name, metadata | AU edge; global with EU backup | Security specialist |
| Neon | Primary database | Project, tasks, audit logs | syd1 primary, encrypted backups | Technical lead |
| Vercel | Hosting, serverless runtimes | Transient request data | Sydney region for edge functions | Technical lead |
| Mux | Video ingest and playback | Video assets, thumbnails | Global CDN, AU ingest path; data processing agreement in place | Reliability partner |
| Resend | Email delivery | Recipient name/email, transactional content | Global; ensure privacy addendum, logs purged 90 days | Client success lead |
| Upstash Redis | Share token cache, rate limits | Token metadata, IP hash | Global; data TTL ≤30 days, hashed identifiers only | Reliability partner |

Review third-party compliance annually and maintain signed agreements in knowledge base.

### Monitoring and assurance
- Quarterly privacy impact review across core flows (onboarding, asset delivery, share links).
- Monthly audit of access logs focusing on unusual Guest activity.
- Automated tests verifying share link expiry and revocation across Admin/Agency/Guest roles.
- Backup verification logs stored to confirm RPO ≤24 h and restore tests ≤1 h RTO.

### Incident alignment
- Privacy breaches escalate via incident response (11-05) within 1 hour of detection.
- Notify affected users within 72 hours, aligning with GDPR Article 33.
- Maintain forensic copy of impacted data (hash-signed) for investigation; purge once incident closed and legal approves.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [HighLevel.Final](../../plan/HighLevel.Final.md)
- [11-01-security-baseline](11-01-security-baseline.md)
- [05-04-audit-logging](../05-project-setup/05-04-audit-logging.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [11-02-secrets-management](11-02-secrets-management.md)
- [11-05-incident-response](11-05-incident-response.md)
- [17-03-terms-and-privacy](../17-go-to-market-and-legal/17-03-terms-and-privacy.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we require Data Protection Impact Assessments for each new agency onboarded post-MVP?
- Should Guest share links support optional view analytics anonymisation toggles for privacy-sensitive clients?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- All Neon instances support regional redundancies satisfying residency needs; confirm during infrastructure review.
- Agencies agree to updated privacy terms before gaining portal access.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Motion Mavericks legacy MVP plan (privacy appendix)
- Mux Data Processing Addendum 2025
- Internal compliance playbook notes (September 2025)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
