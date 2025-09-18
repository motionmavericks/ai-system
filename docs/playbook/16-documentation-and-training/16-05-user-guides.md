<!-- ai:managed start file="docs/playbook/16-documentation-and-training/16-05-user-guides.md" responsibility="docs" strategy="replace" -->
---
title: "User Guides – Motion Mavericks Portal"
doc_path: "docs/playbook/16-documentation-and-training/16-05-user-guides.md"
doc_type: "documentation"
status: "Draft"
version: "0.2.0"
owner: "Client Success Lead"
reviewers: ["UX Lead", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [user-guides, training]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# User Guides – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="documentation"
     path="docs/playbook/16-documentation-and-training/16-05-user-guides.md"
     version="0.2.0"
     status="Draft"
     owner="Client Success Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>user-guides, training</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This user guide library provides task-based instructions for Admin and Agency users. It features step-by-step flows, screenshot placeholders, tips, and accessibility notes covering project setup, milestones, tasks, assets, notifications, and share links. Content supports consistent production workflows across Motion Mavericks and agency partners.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Agencies previously relied on spreadsheets and email to manage productions. The portal centralises activity, requiring clear guidance to adopt new workflows while meeting privacy and residency requirements. Guides focus on top tasks (≥10) across Admin and Agency roles.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Task instructions for Admin (Owen + team) and Agency Producers.
- Screenshot placeholders (annotated) to be replaced with actual captures.
- Accessibility tips and troubleshooting for each task.
- Excludes Guest-only instructions (handled in share link quick start) and marketing usage.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Admin tasks
1. **Create a new production project**
   - Steps: Navigate to Projects → New Project → enter name, client, due dates → assign agency.
   - Placeholder: `![New Project Form](<PLACEHOLDER>/img/admin-new-project.png)`
   - Tips: Use templates to pre-fill milestones; ensure timezone set to Australia/Sydney.

2. **Define milestones and tasks**
   - Steps: Add milestone → set due date → add tasks with owners → attach assets if known.
   - Placeholder: `![Milestone Board](<PLACEHOLDER>/img/milestone-board.png)`
   - Tip: Colour-coded statuses respect WCAG contrast.

3. **Invite agency users**
   - Steps: Admin Settings → Users → Invite → enter email and role.
   - Tip: Remind agency to complete privacy acknowledgment.

4. **Generate share links**
   - Steps: Assets → Select deliverable → Create share link → set expiry and passphrase.
   - Placeholder: `![Share Link Modal](<PLACEHOLDER>/img/share-link-modal.png)`
   - Tip: Keep expiry 14 days; change for sensitive content.

5. **Schedule notification digest**
   - Steps: Notifications → Digest settings → select frequency → preview email.
   - Tip: Provide agencies view-only digest for awareness.

### Agency tasks
6. **Accept invitation and set profile**
   - Steps: Open magic link → confirm details → set display name.
   - Tip: Remind to enable two-factor if available.

7. **Update milestone status**
   - Steps: Dashboard → select milestone → change status → add note.
   - Placeholder: `![Milestone Update](<PLACEHOLDER>/img/milestone-update.png)`
   - Tip: Use keyboard shortcuts for accessibility.

8. **Upload assets to Mux**
   - Steps: Assets → Upload → drag file or select → confirm metadata (title, aspect ratio).
   - Tip: Provide captions file if available.

9. **Respond to client feedback**
   - Steps: Comments panel → reply → attach revised file → mark task complete.
   - Tip: Mention teammates using `@` to trigger notification.

10. **Manage share link permissions**
    - Steps: Share Links → select link → adjust access to specific guests → resend notification.

11. **Trigger notification resend**
    - Steps: Notifications → Sent items → choose message → Resend.

12. **Export project summary**
    - Steps: Reports → Choose project → export PDF/CSV.
    - Tip: Captures audit log; share with client.

### Accessibility & compliance notes
- All guides remind users to provide alt text for uploaded images and captions for video when available.
- Privacy: Do not include personal emails in screenshot; use placeholders.
- Residency: Data stored in AU; avoid uploading assets containing restricted information without approval.

### Troubleshooting quick tips
| Issue | Resolution |
|-------|------------|
| Share link expired | Generate new link; communicate via notification template |
| Notification not received | Check spam, confirm digest schedule, contact support |
| Asset upload stalled | Ensure <20 GB, stable connection, retry; if persists, contact reliability |
| Unable to edit milestone | Verify role; request admin to adjust permissions |

### How-to video plan
- Record 3-minute clips for: project setup, asset upload, share link management, feedback loop.
- Host on internal Vimeo with access restricted to partners.

### Feedback loop
- Include feedback form link in knowledge base; auto-route suggestions to Client Success and Product.
- Review monthly; update guide with improvements.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [03-02-journeys-and-flows](../03-ux-and-design/03-02-journeys-and-flows.md)
- [16-03-support-playbooks](16-03-support-playbooks.md)
- [17-04-marketing-launch-plan](../17-go-to-market-and-legal/17-04-marketing-launch-plan.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [16-04-onboarding](16-04-onboarding.md)
- [16-01-developer-docs](16-01-developer-docs.md)
- [18-05-launch-comms](../18-release-and-cutover/18-05-launch-comms.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Should we provide guest-specific quick start cards for clients with limited technical literacy?
- Do we need translated guides for agencies operating outside Australia?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Knowledge base platform supports embedded video, accessible tables, and version history.
- Agencies commit to reviewing guides during onboarding sessions.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Pilot agency feedback (2025)
- Motion Mavericks knowledge base drafts
- UX copy guidelines
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
