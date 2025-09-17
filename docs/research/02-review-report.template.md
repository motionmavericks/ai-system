<metadata schema_version="1.0">
  <doc_control>
    <doc_id>{{TEMPLATE_DOC_ID}}</doc_id>
    <doc_type>review_template</doc_type>
    <title>REVIEW.md Template</title>
    <version>1.0.0</version>
    <status>released</status>
    <created>{{DATE_YYYY_MM_DD}}</created>
    <updated>{{DATE_YYYY_MM_DD}}</updated>
    <owner>{{DOC_OWNER}}</owner>
  </doc_control>
  <governance>
    <jurisdiction>AU</jurisdiction>
    <language>en-AU</language>
    <classification>Confidential</classification>
    <licence>Internal-Use-Only</licence>
  </governance>
  <tags>
    <tag>template</tag><tag>review</tag><tag>architecture</tag>
  </tags>
</metadata>

# Recommended Additions and Changes

## Review context
- **AI agent:** {{ai_agent_used}}
- **Model:** {{model_used}}
- **Spec reference:** {{spec_ref}}
- **Review date:** {{DATE_YYYY_MM_DD}}

## Executive summary
- One‑paragraph summary of key risks and wins.
- Top outcomes if all P0 items land.

## Top priorities (P0)
- REC-001 — {{title}}
- REC-002 — {{title}}
- REC-003 — {{title}}

## Recommendation table
| ID      | Area            | Type     | Priority | Rationale                                               | Proposed change                                         | Impact | Effort | Risk | Dependencies |
|---------|-----------------|----------|----------|---------------------------------------------------------|---------------------------------------------------------|--------|--------|------|--------------|
| REC-001 | {{area}}        | Addition | P0       | {{why}}                                                 | {{what}}                                                | H      | M      | M    | {{deps}}     |

## Detailed recommendations

### REC-001 · {{short title}}
- **Area:** {{area}}
- **Type:** Addition | Change | Removal
- **Problem:** {{what is missing or incorrect}}
- **Recommendation:** {{clear directive}}
- **Impact:** H/M/L
- **Effort:** S/M/L/XL
- **Risk:** H/M/L
- **Dependencies:** {{systems, teams, decisions}}
- **Acceptance criteria:**
  - {{measurable criterion 1}}
  - {{measurable criterion 2}}
- **Notes:** {{links or brief references}}

### REC-002 · {{short title}}
- **Area:** {{area}}
- **Type:** {{type}}
- **Problem:** {{problem}}
- **Recommendation:** {{recommendation}}
- **Impact:** {{impact}}
- **Effort:** {{effort}}
- **Risk:** {{risk}}
- **Dependencies:** {{deps}}
- **Acceptance criteria:**
  - {{criterion}}
- **Notes:** {{notes}}

## Gaps and omissions discovered
- {{gap}} → covered by REC-{{id}}

## Conflicts and ambiguities
- {{conflict}} → resolved by REC-{{id}}

## Open questions for the spec owner
1) {{question}} [VERIFY]
2) {{question}} [VERIFY]

## Coverage checklist
- Product scope: ✅/N/A
- Domain model: ✅/N/A
- APIs: ✅/N/A
- Security and privacy: ✅/N/A
- Compliance: ✅/N/A
- Access control and tenancy: ✅/N/A
- Performance and capacity: ✅/N/A
- Reliability and SLOs: ✅/N/A
- Observability: ✅/N/A
- CI/CD and environments: ✅/N/A
- Testing: ✅/N/A
- Migrations and rollout: ✅/N/A
- Cost model: ✅/N/A
- Accessibility and i18n: ✅/N/A
- Analytics: ✅/N/A
- Documentation and ops: ✅/N/A
