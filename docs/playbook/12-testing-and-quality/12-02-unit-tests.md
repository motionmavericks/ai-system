<!-- ai:managed start file="docs/playbook/12-testing-and-quality/12-02-unit-tests.md" responsibility="docs" strategy="replace" -->
---
title: "Unit Tests – Motion Mavericks Portal"
doc_path: "docs/playbook/12-testing-and-quality/12-02-unit-tests.md"
doc_type: "quality"
status: "Draft"
version: "0.2.0"
owner: "QA Engineer"
reviewers: ["Technical Lead", "Frontend Lead"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [unit-testing, quality]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Unit Tests – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="quality"
     path="docs/playbook/12-testing-and-quality/12-02-unit-tests.md"
     version="0.2.0"
     status="Draft"
     owner="QA Engineer">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>unit-testing, quality</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This document specifies Motion Mavericks’ unit testing approach. It targets deterministic coverage of core logic powering milestones, tasks, notifications, share link tokens, and asset workflows. Unit tests provide rapid feedback and protect against regression as agencies and guests expand usage.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
Key modules are implemented in TypeScript using Next.js 15 App Router and server actions. Past issues arose from untested date calculations, misconfigured notification payloads, and token expiry logic. Unit coverage ensures correctness before integration with Neon, Mux, and Resend.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Functions, hooks, and utilities contained within application packages (`lib`, `services`, `hooks`).
- Shared packages for domain logic (milestones, tasks, notifications, share links).
- Excludes integration with external services (handled in 12-03) and Playwright flows.
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Coverage matrix
| Module | Description | Key assertions | Target coverage |
|--------|-------------|----------------|-----------------|
| `lib/milestones/schedule.ts` | Calculates milestone status, lateness, notifications | Edge cases for timezone (AU), partial completion, RPO alerts | ≥90% |
| `lib/tasks/assignment.ts` | Assigns tasks to Agency/Guest based on role | Role resolution, escalation backlog | ≥85% |
| `services/share/tokens.ts` | Generates signed share tokens, TTL, revocation flags | Token expiry, signature validation, guest scope | ≥95% |
| `services/notifications/builder.ts` | Composes Resend payloads, digest logic | Localisation, unsubscribe header, asset link generation | ≥90% |
| `lib/assets/ingest.ts` | Validates file metadata prior to Mux upload | MIME filtering, size thresholds, error messages | ≥85% |
| `hooks/useTenant.ts` | Resolves tenant context in UI | Multi-tenant guard rails, default fallback | ≥80% |
| `utils/audit.ts` | Formats audit events for logging | PII redaction, share link event shapes | ≥90% |
| `lib/auth/roles.ts` | Maps Clerk session to Admin/Agency/Guest roles | Role precedence, suspended accounts | ≥95% |

### Tooling and configuration
- **Test runner**: Vitest with TypeScript support, `jsdom` for React hooks, Node for pure logic.
- **Mocking**: `vi.mock` for external modules; custom fixtures for Neon queries replaced with stub repositories.
- **Snapshots**: Avoid except for large payloads (e.g., notification templates). Keep snapshots under 50 lines to ease review.
- **Code coverage**: `pnpm test:unit --coverage` exports LCOV for CI; threshold enforced via `vitest.config.ts`.

### Best practices
- Enforce AAA (Arrange-Act-Assert) format with descriptive test names emphasising role context.
- Include negative tests for invalid share link usage, asset size limits, and timezone mismatches.
- Guard against reliance on system clock by using `vi.setSystemTime` and resetting after each suite.
- Verify that secrets are not logged; use dummy `<PLACEHOLDER>` values.

### Reporting and maintenance
- CI pipeline fails if coverage drops below thresholds or when new files lack tests.
- Developers responsible for test updates when modifying module behaviour; QA reviews coverage diff in PR template.
- Flaky tests flagged with `@flaky` tag disallowed in `main`; they trigger immediate remediation tasks.

### Developer workflow
1. Run `pnpm test:unit` locally before pushing.
2. For new modules, create `__tests__` folder adjacent to implementation.
3. Document complex fixtures inside tests for reuse across integration suites.
4. Align test data with Australian regional settings (dates, currency) to avoid locale regressions.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [07-01-api-surface](../07-apis-and-contracts/07-01-api-surface.md)
- [08-01-app-router-structure](../08-frontend/08-01-app-router-structure.md)
- [12-03-integration-tests](12-03-integration-tests.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [05-02-development-tooling](../05-project-setup/05-02-development-tooling.md)
- [15-05-chaos-experiments](../15-performance-and-reliability/15-05-chaos-experiments.md)
- [16-01-developer-docs](../16-documentation-and-training/16-01-developer-docs.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we standardise factory helpers for Neon row fixtures to reduce duplication across tests?
- Should we introduce mutation testing to validate the effectiveness of share token tests?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- Developers follow lint rules preventing uncovered branches without explicit waivers.
- Vitest performance is acceptable for parallel execution within CI time budgets.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- `vitest.config.ts`
- Legacy share link bug reports (2024)
- Engineering stand-up notes (September 2025)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
