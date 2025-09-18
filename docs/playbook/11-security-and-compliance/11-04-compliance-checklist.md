<!-- ai:managed start file="docs/playbook/11-security-and-compliance/11-04-compliance-checklist.md" responsibility="docs" strategy="replace" -->
---
title: "Compliance Checklist – Motion Mavericks Portal"
doc_path: "docs/playbook/11-security-and-compliance/11-04-compliance-checklist.md"
doc_type: "compliance"
status: "Draft"
version: "0.2.0"
owner: "Security Specialist"
reviewers: ["Legal Counsel", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [compliance, audit, privacy]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-03-information-architecture.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Compliance Checklist – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="compliance"
     path="docs/playbook/11-security-and-compliance/11-04-compliance-checklist.md"
     version="0.2.0"
     status="Draft"
     owner="Security Specialist">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-03-information-architecture.md"/>
    <tags>compliance, audit, privacy</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This checklist captures Motion Mavericks’ compliance obligations for the production management portal. It aggregates controls spanning privacy, security, data residency, and operational resilience, enabling Admin, Agency, and Guest flows to meet AU Privacy Act, GDPR, and contractual expectations. Each control specifies the owning role, required evidence, and verification cadence.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal manages sensitive production timelines, assets, and communications. Clients mandate Australian data residency and demonstrable disaster recovery (RPO ≤24 h, RTO ≤1 h). Agency partners expect verifiable access governance, while guests interact through signed share links. Compliance evidence must be ready for audits, vendor reviews, and contract renewals.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Privacy, security, and operational compliance controls directly influencing portal delivery and operations.
- Applies to production, staging, and development environments when personal data is present.
- Excludes finance-specific compliance (handled by corporate accounting) and physical security of partner agencies.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Control register
| Requirement | Control | Evidence | Owner | Frequency |
|-------------|---------|----------|-------|-----------|
| AU Privacy APP 1 (Open and transparent) | Publish portal privacy notice and contact | Hosted policy at `/legal/privacy`, change log entry | Legal Counsel | Review biannually |
| AU Privacy APP 6 (Use/disclosure) | Role-based access enforcement for Admin/Agency/Guest | Access tests in CI, audit log extracts | Security Specialist | Quarterly |
| GDPR Art. 30 Records | Maintain processing activity log | `privacy-processing-register.csv` updated | Legal Counsel | Quarterly |
| GDPR Art. 33 Breach notification | Incident response plan referencing privacy timeline | Signed PDF of IR playbook (11-05) | Reliability Partner | Annual drill |
| Data residency commitment | Neon hosted in `syd1`, Mux AU ingest, Resend privacy addendum | Vendor contracts, infrastructure screenshots | Technical Lead | Annual review |
| RPO ≤24 h | Automated daily backups + restore test results | Backup job logs, restore report | Reliability Partner | Quarterly |
| RTO ≤1 h | Documented disaster recovery runbook and drill results | DR drill report (15-04) | Reliability Partner | Semi-annual |
| Share link governance | Signed token expiry default 14 days, revocation API | Test logs, API contract excerpt | Admin Lead | Quarterly |
| Access reviews | 1Password + Vercel membership audit | Audit report with sign-off | Security Specialist | Quarterly |
| Email compliance | Resend unsubscribe + bounce handling | Email templates, suppression list export | Client Success Lead | Quarterly |
| Vendor DPIAs | Completed assessments for Clerk, Mux, Resend | DPIA forms stored in Drive | Legal Counsel | Annual |
| Data subject requests | DSR workflow outputs | Request log with timestamps | Support Lead | Per request |
| WCAG 2.2 AA (privacy notices) | Accessibility review of legal pages | Audit results, screenshot evidence | UX Lead | Annual |
| Change management | Change log entry for compliance updates | `20-03-change-log.md` appended | Docs Agent | Per change |

### Pre-launch compliance gate (run before production release)
- Confirm all control evidence less than six months old.
- Validate production environment secrets rotated within SLA.
- Ensure onboarding emails include privacy and terms references.
- Verify share link audit trail tested with Guest role.
- Conduct accessibility scan on account settings and legal pages.
- Confirm disaster recovery drill achieves target RTO in staging.
- Review vendor contracts for current year and capture renewal dates.

### Ongoing compliance cadence
| Cadence | Activities |
|---------|-----------|
| Monthly | Review access anomalies, check failed login/reporting metrics, confirm no overdue DSRs. |
| Quarterly | Rotate secrets as per schedule, export audit logs, conduct privacy control sampling, review RPO evidence. |
| Semi-annual | Execute incident tabletop with privacy scenario, test DR restoration, refresh compliance training for team. |
| Annual | Re-run DPIAs, renew vendor agreements, update privacy policy, complete WCAG AA manual review, review legal terms with counsel. |

### Audit preparation checklist
1. Collate control evidence (tables above) into single repository (<REDACTED> shared drive).
2. Generate access review summary exported from Vercel, Neon, 1Password.
3. Produce anonymised sample of share link audit logs demonstrating expiry enforcement.
4. Document outstanding risks and mitigation progress (tie to 00-05 risk register).
5. Ensure context JSON and change log align with latest compliance updates.
6. Schedule auditor walkthrough with Security Specialist and Legal Counsel.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [HighLevel.Final](../../plan/HighLevel.Final.md)
- [11-01-security-baseline](11-01-security-baseline.md)
- [11-03-privacy-and-data-protection](11-03-privacy-and-data-protection.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [11-05-incident-response](11-05-incident-response.md)
- [15-04-disaster-recovery](../15-performance-and-reliability/15-04-disaster-recovery.md)
- [17-02-legal-review](../17-go-to-market-and-legal/17-02-legal-review.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we require an external penetration test before go-live to satisfy client security clauses?
- Should we formalise ISO 27001 alignment now or defer until post-launch growth phase?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- All third-party DPAs include updated Standard Contractual Clauses for EU data subjects.
- Auditor access to evidence repositories is brokered through secure read-only links.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Motion Mavericks compliance workbook (2025)
- AU Privacy Act 1988 summaries
- GDPR controller checklist (Office of the Australian Information Commissioner guidance)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
