# Prompt — Merge “Codex-HighLevel.md” and “Claude-HighLevel.md” into one execution-ready plan

<role>
You are a senior programme editor. Merge two high-level plans into a single, delivery-ready document.  
Use Australian English. Be deterministic. No omissions.  
The output must strictly follow the structure defined in docs/playbook/0-templates/00-agent-execution-brief-template.md.
</role>

<inputs>
  <file path="/mnt/data/Codex-HighLevel.md" role="base"/>
  <file path="/mnt/data/Claude-HighLevel.md" role="compliance"/>
</inputs>

<merge-policy>
  <priority area="delivery-mechanics">Codex</priority>
  <priority area="security-privacy-compliance">Claude</priority>
  <conflict-resolution>
    Prefer Codex for scope, work packages, milestones, owners, backlog, Definition of Done, risks, dependencies, comms cadence.  
    Prefer Claude for GDPR/AU Privacy, data classification, security controls, logging, retention/residency, acceptance criteria, and playbooks.  
    If a direct contradiction remains, keep the stricter requirement and note it in merge-log.
  </conflict-resolution>
  <normalisation>
    Unify terminology, headings, numbering, and style. Keep section IDs stable.  
    Convert all acceptance criteria into Gherkin-style bullets where present.
  </normalisation>
</merge-policy>

<mapping>
  <from codex="Work packages / Owners / Milestones / P0-P1 backlog / DoD / Risks / Dependencies / Comms"/>
  <from claude="GDPR+Privacy Act alignment / Data sensitivity classes / Security+Resilience controls / Audit & monitoring / Retention & residency / Compliance acceptance checks / Runbooks+Playbooks"/>
  <rule>For each Codex work package, attach a “Compliance Acceptance” subsection sourced from the matched Claude sections.</rule>
</mapping>

<process>
  <step>Parse both files. Build a canonical outline from Codex sections.</step>
  <step>Construct a section crosswalk table. Map Claude content to the closest Codex section or subtask.</step>
  <step>Inline-merge content per merge-policy. Do not drop any normative requirement.</step>
  <step>Promote any global Claude controls to a top-level “Security, Privacy, and Compliance” chapter, then reference back into each relevant work package.</step>
  <step>Insert acceptance criteria and measurable success metrics into each work package. Keep Codex DoD; augment with Claude compliance checks.</step>
  <step>Resolve duplicates. Prefer single sources; keep alternatives in an appendix if meaning differs.</step>
  <step>Generate a traceability matrix: requirement → section → acceptance → owner → milestone.</step>
  <step>Run a consistency pass: terminology, tense, numbering, tables, and internal anchors.</step>
</process>

<output-format>
  <doc type="markdown">
    <template path="docs/playbook/0-templates/00-agent-execution-brief-template.md"/>
  </doc>
</output-format>

<deliverables>
  <file path="./docs/plan/HighLevel.Final.md">Final merged plan</file>
  <file path="./docs/plan/HighLevel.merge-log.md">Decision log with per-section diffs and rationale</file>
  <file path="./docs/plan/HighLevel.traceability.csv">req_id,section,accept_id,owner,milestone,control_ids</file>
  <file path="./docs/plan/HighLevel.gaps.md">Unmapped items, open questions, assumptions to validate</file>
  <table name="crosswalk">source_section,target_section,notes</table>
</deliverables>

<validation>
  <check>Every Codex work package appears once in merged doc with owner, milestone, DoD, and at least one acceptance.</check>
  <check>Every Claude control appears at least once, either globally or referenced by a work package.</check>
  <check>No TODOs without an owner and due date.</check>
  <check>All internal links resolve. Headings are unique. Numbering is sequential.</check>
</validation>

<constraints>
  <style>Concise. Actionable. No marketing language.</style>
  <safety>No content fabrication. If a required detail is missing, add a clearly marked TODO with owner suggestion.</safety>
</constraints>

<final-task>
Produce all deliverables in strict adherence to docs/playbook/0-templates/00-agent-execution-brief-template.md.  
Then print a 10-line executive summary of what changed and any blocking decisions.
</final-task>
