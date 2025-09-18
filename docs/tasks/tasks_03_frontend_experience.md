# Motion Mavericks Task Plan – Phase 03 Frontend Experience
Generated: 2025-09-18T06:09:28+00:00
Context:
- Craft the Motion Mavericks Portal UI/UX for Admin, Agency, and Guest personas using Next.js App Router, TanStack Query, and shared design system tokens.
- Ensure accessibility, localisation, and responsive behaviour align with playbook standards.

## Tasks
| ID | Description | Required Inputs | Dependencies | Acceptance Criteria | Owner |
|----|-------------|-----------------|--------------|---------------------|-------|
| FE-001 | Implement global layout, Nav, Shell, and authentication guard using Clerk components and TanStack Query hydration. | `docs/playbook/08-frontend/08-02-routing-and-navigation.md`; `docs/playbook/03-ux-and-design/03-02-journeys-and-flows.md` | B-001 | Authenticated shell renders per role; loading skeletons present; unauthorised routes redirect appropriately. | Agent: Implementer |
| FE-002 | Build Admin dashboard panels (pipeline metrics, milestone timeline, incident banner, quick actions) with responsive design. | `docs/playbook/08-frontend/08-05-ui-components.md`; `docs/playbook/03-ux-and-design/03-05-design-system.md` | FE-001; B-002 | Dashboard surfaces live data; layout responsive; E2E smoke test green. | Agent: Implementer |
| FE-003 | Create project detail page with milestone management, dependency graph, approvals, and inline comment threads. | `docs/playbook/03-ux-and-design/03-04-wireframes.md`; `docs/playbook/09-backend/09-02-business-logic.md` | FE-002; B-002 | Milestone CRUD works; comments render with reactions; optimistic updates revert gracefully; tests cover scenarios. | Agent: Implementer |
| FE-004 | Develop Agency Kanban/task board UI with drag-and-drop, assignment chips, due-date indicators, and inline discussion composer. | `docs/playbook/03-ux-and-design/03-02-journeys-and-flows.md`; `docs/playbook/08-frontend/08-03-state-management.md` | FE-003; B-003 | Drag/drop persists state; keyboard navigation supported; due warnings color-coded; telemetry events emitted. | Agent: Implementer |
| FE-005 | Implement asset library (upload modal, progress tracker, preview player, permission toggle, share link view). | `docs/playbook/10-integrations/10-05-third-party-webhooks.md`; `docs/playbook/08-frontend/08-04-forms-and-validation.md` | FE-003; B-004 | Upload progress accurate; playback accessible; permission toggles sync with backend; UI handles error states cleanly. | Agent: Implementer |
| FE-006 | Deliver Guest share-link experience (hero messaging, asset playback, optional download request, expiration warnings). | `docs/playbook/03-ux-and-design/03-06-accessibility-a11y.md`; `docs/playbook/07-apis-and-contracts/07-02-endpoints-and-contracts.md` | FE-005; B-004 | Share link loads without auth; expiration countdown correct; download requests trigger notifications; analytics events recorded. | Agent: Implementer |
| FE-007 | Build notification preference center, digest schedule UI, and Slack toggle; integrate with backend preferences API. | `docs/playbook/10-integrations/10-03-email-and-notifications.md`; `docs/playbook/08-frontend/08-04-forms-and-validation.md` | FE-002; B-005 | Preference changes persisted; digests preview shows next send; Slack option toggles state; tests cover invalid inputs. | Agent: Implementer |
| FE-008 | Establish design system tokens, component library, and Storybook documentation for shared UI primitives. | `docs/playbook/03-ux-and-design/03-05-design-system.md`; `docs/playbook/08-frontend/08-05-ui-components.md` | FE-001 | Tokens exported; Storybook stories for buttons, cards, tables, modals; visual regression baseline captured. | Agent: Implementer |
| FE-009 | Implement accessibility and localisation features (ARIA, keyboard traps, screen reader labels, locale switch, translation plumbing). | `docs/playbook/08-frontend/08-06-accessibility-a11y.md`; `docs/playbook/08-frontend/08-07-internationalisation-i18n.md` | FE-008 | axe tests pass; manual screen reader checks completed; locale switch updates copy; fallback logic documented. | Agent: Implementer |

## Sequencing & Notes
- Build shell (FE-001) prior to downstream pages; FE-008/FE-009 ensure design system and accessibility compliance before final QA.
- Storybook rollout addresses open question on component documentation timeline.

## Follow-Up Signals
- Telemetry: Track frontend performance metrics (FCP, TTI), task board engagement, share link views via analytics plan.
- Review: Design Lead and Technical Delivery Lead approve UI per personas; Accessibility lead signs off after FE-009.
- Next Re-evaluation: After FE-009 or ahead of QA automation phase.
