<!-- ai:managed start file="docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-share-link-security-controls.md" responsibility="docs" strategy="replace" -->
---
title: "ADR 005 – Share Link Security Controls"
doc_path: "docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-share-link-security-controls.md"
doc_type: "adr"
status: "Accepted"
version: "0.1.0"
owner: "Owen (Founder)"
reviewers: ["Security Specialist", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [adr, share-links, security]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../../plan/HighLevel.Final.md"
  design: "../../03-ux-and-design/03-04-wireframes.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# ADR 005 – Share Link Security Controls

> Status: **Accepted** • Version: **0.1.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="adr"
     path="docs/playbook/04-architecture-and-decisions/adrs/2025-09-19-share-link-security-controls.md"
     version="0.1.0"
     status="Accepted"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../../03-ux-and-design/03-04-wireframes.md"/>
    <tags>adr, share-links, security</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
Share links will be secured using signed tokens with short TTLs, optional passcodes, and audit logging. Tokens are stored hashed, and playback requires server validation plus Mux signed URLs. This balances ease-of-access for guests with compliance and anti-leak safeguards.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Client stakeholders need frictionless review experiences, yet assets must remain confidential. Legacy share workflows lacked expiry controls and analytics. We must satisfy success metrics (SM-04) for open rate and <1% playback error while preventing leaks.
]]></content>
    </section>

    <section id="decision" heading="Decision">
      <instructions>Document the decision and rationale.</instructions>
      <content><![CDATA[
## Decision
Create share links with UUIDv7 identifiers, hashed and salted before storage. Default expiry set to 7 days; Admins/Agencies can extend to 14 days or set custom. Optional passcodes (min 8 characters) stored via Argon2 hash. Playback requires token validation plus signed Mux playback URL with 5-minute TTL. Analytics captured per open, IP, user agent for anomaly detection. Rate limiting applied to prevent brute force.
]]></content>
    </section>

    <section id="consequences" heading="Consequences">
      <content><![CDATA[
## Consequences
- **Positive**: Strong defence against leaked links, audit-ready logs, compliance alignment.
- **Positive**: Supports revocation and monitoring to maintain <1% playback error target.
- **Negative**: Passcodes introduce optional friction; training required for agencies.
- **Negative**: Additional storage for analytics requires retention policy enforcement.
]]></content>
    </section>

    <section id="alternatives" heading="Alternatives considered">
      <content><![CDATA[
## Alternatives considered
1. **Always require full account creation** – rejected; slows guest access, conflicts with onboarding metric.
2. **Use static signed URLs without portal mediation** – rejected; lacks analytics, revocation, and compliance controls.
3. **Third-party secure delivery service** – rejected due to cost and limited integration flexibility.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [04-04-threat-model](../04-04-threat-model.md)
- [07-02-endpoints-and-contracts](../../07-apis-and-contracts/07-02-endpoints-and-contracts.md)
- [11-03-privacy-and-data-protection](../11-security-and-compliance/11-03-privacy-and-data-protection.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [ADR 003 – Asset Pipeline with Mux](2025-09-19-asset-pipeline-mux.md)
- [02-02-acceptance-criteria](../../02-requirements-and-scope/02-02-acceptance-criteria.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we integrate IP allow-listing for high-security clients post-launch?
- Do we require additional watermarking or DRM for government engagements?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Token hashing and expiry enforcement maintain <1% playback error by preventing stale link usage.
- Agencies will adopt optional passcodes for sensitive deliveries without significant drop-off.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Security consultant recommendations
- Client compliance questionnaires (2025)
- Mux signed URL implementation guides
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
