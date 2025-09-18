<!-- ai:managed start file="docs/playbook/12-testing-and-quality/12-01-test-strategy.md" responsibility="docs" strategy="replace" -->
---
title: "Test Strategy – Motion Mavericks Portal"
doc_path: "docs/playbook/12-testing-and-quality/12-01-test-strategy.md"
doc_type: "quality"
status: "Draft"
version: "0.2.0"
owner: "Technical Lead"
reviewers: ["QA Engineer", "Reliability Partner"]
last_updated: "2025-09-19"
project: "Motion Mavericks Portal"
tags: [testing, quality]
links:
  repo: "https://github.com/maverick/ai-system"
  spec: "../../plan/HighLevel.Final.md"
  design: "../03-ux-and-design/03-02-journeys-and-flows.md"
  ticket: "<PLACEHOLDER>"
language: "en-AU"
tone: "Declarative"
---

# Test Strategy – Motion Mavericks Portal

> Status: **Draft** • Version: **0.2.0** • Updated: **2025-09-19**

<doc xmlns="urn:docs:universal"
     type="quality"
     path="docs/playbook/12-testing-and-quality/12-01-test-strategy.md"
     version="0.2.0"
     status="Draft"
     owner="Technical Lead">

  <meta>
    <link rel="repo" href="https://github.com/maverick/ai-system"/>
    <link rel="spec" href="../../plan/HighLevel.Final.md"/>
    <link rel="design" href="../03-ux-and-design/03-02-journeys-and-flows.md"/>
    <tags>testing, quality</tags>
  </meta>

  <sections>

    <section id="summary" heading="Summary">
      <instructions>Describe the purpose and expected outcome in 3–5 sentences.</instructions>
      <content><![CDATA[
## Summary
This strategy governs quality assurance for the Motion Mavericks production management portal. It balances unit, integration, end-to-end, performance, and accessibility testing to guarantee reliable milestone, task, asset, notification, and share link flows. Quality controls must support rapid releases while meeting availability, residency, and compliance obligations.
]]></content>
    </section>

    <section id="context" heading="Context">
      <instructions>Outline the current situation, problem, drivers, and constraints.</instructions>
      <content><![CDATA[
## Context
The portal orchestrates Admin, Agency, and Guest experiences through Next.js 15 (App Router), Neon, Mux, Resend, and Clerk. High collaboration throughput and strict recovery targets require automated confidence. Legacy processes lacked regression coverage, causing production bugs in share links and notifications. This strategy aligns testing cadence with CI pipelines and release management.
]]></content>
    </section>

    <section id="scope" heading="Scope">
      <instructions>State in-scope items, out-of-scope exclusions, and key assumptions.</instructions>
      <content><![CDATA[
## Scope
- Covers automated and manual testing for front-end, API, data model, integrations, and edge functions.
- Includes non-functional checks: performance (load, streaming), accessibility, security smoke tests.
- Excludes vendor-managed infrastructure tests (e.g., Mux internal SLA coverage).
]]></content>
    </section>

    <section id="details" heading="Details">
      <content><![CDATA[
## Details

### Test pyramid targets
| Layer | Objective | Tooling | Coverage goal |
|-------|-----------|---------|---------------|
| Unit | Validate pure functions, utilities, hooks | Vitest + Testing Library | ≥80% statements, focus on milestone calculations, notification builders, share token helpers |
| Integration | Ensure API routes + Neon + external services interact correctly | Vitest (API layer), Supertest, Mock Service Worker | Critical contracts covered, 90% of REST actions |
| End-to-end | Validate user journeys with real data and browser automation | Playwright | All critical flows (invite → login → project view, asset upload/review, share link guest view, notifications) |
| Non-functional | Confirm performance, accessibility, resilience | k6, Playwright traces, axe-playwright, pa11y | Targets per doc 12-05, 12-06 |

### Environments
- **Local**: Developers run unit/integration tests with mocked dependencies; Playwright smoke suite available with seeded data.
- **CI (Vercel + GitHub Actions)**: Executes unit, integration, and targeted E2E suites on pull requests; full regression on `main` nightly.
- **Staging**: Hosts performance and accessibility suites; share token tests run against temporary data with auto teardown.
- **Production monitoring**: Synthetic checks monitor share endpoints, asset streaming, and notification webhooks (see 14-02).

### Quality gates
1. PR merges require unit + integration suites green, plus targeted Playwright smoke (`smoke-admin`, `smoke-agency`).
2. Release candidate branch triggers full regression (E2E + accessibility + performance smoke) before tag.
3. Deployment blocks if availability SLO monitors degrade or test coverage falls below thresholds.
4. Manual QA sign-off for new agency onboarding features or share link permission changes.

### Test data management
- Use seeding scripts via Drizzle migrations to create tenants (`Admin`, `Agency`, `Guest` fixtures) with milestones, tasks, assets.
- Assets for tests stored as 5-second clips or placeholder stills to reduce Mux usage.
- Provide anonymised production scenarios for training (residing within AU to maintain residency commitments).

### Reporting and observability
- Test results exported to Allure dashboards for trend analysis.
- Flaky test tracker maintained in Linear; remediation SLA three days.
- Accessibility failures flagged as regression blockers.
- Performance trends feed into observability dashboards (Sentry, Grafana).

### Collaboration
- QA Engineer chairs weekly quality sync covering defect trends, test debt, and upcoming features.
- Security Specialist reviews any tests touching secrets or token generation.
- Reliability Partner ensures performance and resilience checks align with SLOs.
]]></content>
    </section>

    <section id="references" heading="References">
      <content><![CDATA[
## References
- [HighLevel.Final](../../plan/HighLevel.Final.md)
- [07-02-endpoints-and-contracts](../07-apis-and-contracts/07-02-endpoints-and-contracts.md)
- [15-03-reliability-engineering](../15-performance-and-reliability/15-03-reliability-engineering.md)
]]></content>
    </section>

    <section id="related" heading="Related">
      <content><![CDATA[
## Related
- [12-02-unit-tests](12-02-unit-tests.md)
- [12-04-e2e-tests](12-04-e2e-tests.md)
- [14-02-monitoring-instrumentation](../14-observability/14-02-monitoring-instrumentation.md)
]]></content>
    </section>

    <section id="open_questions" heading="Open questions">
      <content><![CDATA[
## Open questions
- Do we introduce contract testing (e.g., Pact) between backend and frontend immediately or defer post-launch?
- Should nightly regression run on staging or dedicated QA environment to avoid agency sandbox overlap?
]]></content>
    </section>

    <section id="assumptions" heading="Assumptions">
      <content><![CDATA[
## Assumptions
- GitHub Actions capacity supports parallel Playwright shards without exceeding budget.
- Agencies provide staging tenants for E2E tests without conflicting with live review cycles.
]]></content>
    </section>

    <section id="sources" heading="Sources">
      <content><![CDATA[
## Sources
- Legacy QA retrospectives (2024)
- Vercel CI pipeline configuration notes
- Motion Mavericks engineering handbook draft (quality chapter)
]]></content>
    </section>

  </sections>
</doc>
<!-- ai:managed end -->
