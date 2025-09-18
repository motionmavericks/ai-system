<!-- ai:managed start file="docs/playbook/08-frontend/08-04-forms-and-validation.md" responsibility="docs" strategy="replace" -->
---
title: "Forms and Validation – Motion Mavericks Portal"
doc_path: "docs/playbook/08-frontend/08-04-forms-and-validation.md"
doc_type: "frontend-guide"
status: "Draft"
version: "0.2.0"
owner: "Owen (Founder)"
reviewers: ["Design Lead", "Quality Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [forms, validation]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-05-design-system.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Forms and Validation – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="frontend-guide"
     path="docs/playbook/08-frontend/08-04-forms-and-validation.md"
     version="0.2.0"
     status="Draft"
     owner="Owen (Founder)">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-05-design-system.md"/>
    <tags>forms, validation</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This guide describes Motion Mavericks portal form architecture using React Hook Form, Zod validation, and design system components. It ensures consistent UX across project, milestone, share link, and notification preference forms while meeting accessibility and error-handling standards.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Forms power key workflows: onboarding agencies, creating projects and milestones, updating tasks, configuring share links, and managing notifications. They must provide real-time validation, accessible feedback, and optimistic submissions with rollback.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Form framework usage, schema integration, error handling, submission patterns, accessibility, share modal specifics.
- Excludes backend validation (covered in API docs) and low-level component design (08-05).
- Assumes React Hook Form v7 + Zod integration.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Architecture
- Each form created using `useForm` with `zodResolver(schema)` to ensure parity with backend validation.
- Form components reside in `packages/ui/forms` (Input, Select, DatePicker, Checkbox, Toggle, TextArea).
- Submit handlers call `mutateAsync` functions from TanStack Query; results drive success/error UI.

### Validation patterns
- Synchronous validation via Zod; async validation used sparingly (e.g., verifying unique project slug via API).
- Display validation errors inline near fields plus summary at top for screen readers.
- Example (share link form):
```ts
const shareLinkSchema = z.object({
  expiresInDays: z.number().int().min(1).max(30),
  requirePasscode: z.boolean().default(false),
  passcode: z.string().min(8).regex(/^[0-9]{8}$/).optional().refine((val, ctx) => {
    if (ctx.parent.requirePasscode && !val) return false;
    return true;
  }, 'Passcode is required when enable passcode is selected'),
  allowDownload: z.boolean().default(false)
});
```

### UX patterns
- Loading states disable submit button, show spinner, add `aria-busy="true"` to form.
- Success states display toast or inline message; share link form shows created link plus copy actions.
- Errors: highlight field border, display helper text, set `aria-describedby` to ensure screen reader support.
- Auto-save forms (notification preferences) debounce inputs and show “Saved” indicator.

### Specific forms
- **Project creation**: multi-step wizard (details → milestones template → review). Steps managed via `useState`; validations per step.
- **Milestone update**: inline editing using `FormProvider` to share methods across rows.
- **Task status change**: quick toggle with date picker; modal ensures completion date provided.
- **Share modal**: uses `react-hook-form` within dialog; matches security rules (passcode, expiry) and displays rate limit warnings from API.
- **Notification preferences**: checkbox list with categories; `onSubmit` saves per-user preferences.

### Accessibility
- All inputs labelled with `<Label htmlFor>` bound to input IDs; required fields use `aria-required` and describe requirement text.
- Error summaries include links to fields for keyboard navigation.
- Date picker accessible with keyboard shortcuts; fallback text input for screen readers.

### Testing
- Component tests verify validation and error messages using Testing Library.
- Playwright coverage ensures share modal prevents submission without passcode when required.
- Snapshot tests for success/error states reviewed after design system updates.

### Optimistic submission & rollback
- On create/update, `mutate` adds optimistic content; on failure, revert to previous state and show error toast with Recovery instructions.
- For share links, failure clears optimistic entry and displays reason (e.g., rate limit).
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [08-05-ui-components](08-05-ui-components.md)
- [07-02-endpoints-and-contracts](../07-apis-and-contracts/07-02-endpoints-and-contracts.md)
- [02-02-acceptance-criteria](../02-requirements-and-scope/02-02-acceptance-criteria.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [05-02-coding-standards](../05-project-setup/05-02-coding-standards.md)
- [03-04-wireframes](../03-ux-and-design/03-04-wireframes.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we introduce auto-save for project creation wizard to handle browser refresh mid-setup?
- Do clients require custom validation messages per region (future localisation)?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Forms remain relatively small; no need for additional form state libraries.
- Users comfortable with numeric passcodes; evaluate interest in passphrases post-MVP.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- UX form reviews (September 2025)
- Security requirements for share link passcodes
- Agency feedback on task update workflow
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
