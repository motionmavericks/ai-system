<!-- ai:managed start file="docs/playbook/08-frontend/08-07-internationalisation-i18n.md" responsibility="docs" strategy="replace" -->
---
title: "Internationalisation (i18n) – Motion Mavericks Portal"
doc_path: "docs/playbook/08-frontend/08-07-internationalisation-i18n.md"
doc_type: "frontend-guide"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Client Success Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [i18n]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-05-design-system.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Internationalisation (i18n) – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="frontend-guide"
     path="docs/playbook/08-frontend/08-07-internationalisation-i18n.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-05-design-system.md"/>
    <tags>i18n</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide outlines Motion Mavericks portal internationalisation strategy. MVP ships with en-AU copy, but content architecture supports future locales. Guidelines ensure copy consistency, date/time formatting, and translation readiness without impacting performance.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Agency partners primarily operate in Australia, yet clients may require regional language variants post-MVP. Preparing infrastructure now reduces future rework while ensuring en-AU tone across existing copy.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- String management, formatting, language detection, translation workflow preparation.
- Excludes marketing site languages and translation vendor selection.
- Assumes next-intl or similar library to be integrated post-MVP.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Current approach (MVP)
- Static copy stored in `packages/config/src/copy/en-AU.ts` to centralise wording.
- Components consume copy via helper `useCopy()` returning keys (e.g., `copy.dashboard.emptyState.title`).
- Dates/times formatted with `Intl.DateTimeFormat('en-AU', ...)` helper; timezone default `Australia/Melbourne`.
- Numbers/currency formatted using `Intl.NumberFormat` aligning with success metrics (e.g., percentage for milestone progress).

### Preparing for additional locales
- Keys designed to be descriptive (e.g., `projectActions.createProject`), no inline string concatenation.
- Avoid string interpolation via template; use `copy('share.expiryMessage', { date })` pattern to support translator control.
- Collect copy tokens in spreadsheets for future translation quoting.
- Ensure form validation messages come from central copy to facilitate translation.

### Language detection & switching (future)
- Plan to integrate `next-intl` with domain or path-based locale (`/en-au`, `/en-nz`).
- Store locale preference per user; default to tenant region.
- Evaluate fallback translation for share links (guests may prefer locale of client organisation).

### Accessibility
- Ensure `html lang` attribute matches locale to support screen readers.
- Provide locale-specific date/time formatting and explicit timezone context.
- Email templates (Resend) also centralised for translation readiness.

### Testing
- Snapshot tests verifying copy keys exist.
- Pseudo-localisation mode (via `en-XA`) to test layout resilience (post-MVP optional).

### Documentation
- Copy changes require updating central copy file and referencing success metrics for tone (declarative, inclusive).
- Track translation backlog items in product board for regions under consideration (NZ, SG).
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [03-05-design-system](../03-ux-and-design/03-05-design-system.md)
- [16-05-user-guides](../16-documentation-and-training/16-05-user-guides.md)
- [00-01-product-vision](../00-brief-and-vision/00-01-product-vision.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [08-04-forms-and-validation](08-04-forms-and-validation.md)
- [17-05-app-store-listing](../17-go-to-market-and-legal/17-05-app-store-listing.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Which locale should be prioritised after en-AU (en-NZ vs en-UK)?
- Do agencies require bilingual share links or per-recipient locale settings?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- All copy hosts within codebase manageable; no CMS integration required before expansion.
- Clients comfortable with en-AU for pilot launches; translation budget to be defined later.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Client success feedback on copy tone
- International expansion roadmap draft
- next-intl documentation (2025)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
