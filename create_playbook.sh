#!/usr/bin/env bash
# create_docs_structure.sh
# Creates:
#  - docs/research with initial research + review docs (separate from playbook)
#  - docs/playbook with phased folders and numbered stub .md files
# Safe to re-run. Skips existing files.

set -euo pipefail

# ---------- Research & Review (pre-playbook) ----------
RESEARCH_BASE="docs/research"
declare -A RESEARCH_FILES
RESEARCH_FILES["$RESEARCH_BASE"]="00-high-level-overview.md 01-review-guide.md 02-review-report.template.md README.md"

mkdir -p "$RESEARCH_BASE"
for DIR in "${!RESEARCH_FILES[@]}"; do
  mkdir -p "$DIR"
  for FILE in ${RESEARCH_FILES[$DIR]}; do
    PATH_F="$DIR/$FILE"
    if [[ ! -f "$PATH_F" ]]; then
      case "$FILE" in
        "README.md")
          cat > "$PATH_F" <<'EOF'
# Research & Review

This folder contains pre-playbook work: a high-level brief, review instructions, and a review output template.

Files:
- `00-high-level-overview.md` — one-page context and objectives.
- `01-review-guide.md` — step-by-step instructions and checklist for the reviewer.
- `02-review-report.template.md` — fill-in template for the reviewer’s output.
EOF
          ;;
        "00-high-level-overview.md")
          cat > "$PATH_F" <<'EOF'
# High-Level Overview

## Purpose
- What problem is being solved and for whom.

## Objectives
- Target outcomes and constraints.

## Scope Assumptions
- In-scope / out-of-scope.

## Evidence Links
- Research sources and artifacts.
EOF
          ;;
        "01-review-guide.md")
          cat > "$PATH_F" <<'EOF'
# Review Guide

## Steps
1. Read `00-high-level-overview.md`.
2. Validate assumptions against sources.
3. Identify risks, gaps, dependencies.
4. Complete `02-review-report.template.md`.

## Checklist
- [ ] Problem statement is testable.
- [ ] Success metrics are defined.
- [ ] Constraints are explicit.
- [ ] Risks have owners and mitigations.

## Acceptance
- Reviewer submits a completed report with actionable recommendations.
EOF
          ;;
        "02-review-report.template.md")
          cat > "$PATH_F" <<'EOF'
# Review Report

## Executive Summary
- Key findings and recommended next steps.

## Findings
- Evidence-backed observations.

## Risks & Mitigations
- Risk:
- Impact:
- Likelihood:
- Mitigation:

## Open Questions
- Question:
- Owner:
- Due date:

## References
- Source:
- Relevance:
EOF
          ;;
        *)
          : # no-op
          ;;
      esac
    fi
  done
done

# ---------- Playbook (phased) ----------
PLAYBOOK_BASE="docs/playbook"

# Phase → space-separated file slugs (no .md). Auto-numbered per folder.
declare -A FILES

# 0-templates (not numbered)
FILES["$PLAYBOOK_BASE/0-templates"]="TASK-TEMPLATE ADR-TEMPLATE"

FILES["$PLAYBOOK_BASE/00-brief-and-vision"]="product-vision success-metrics stakeholders constraints risks-and-assumptions"
FILES["$PLAYBOOK_BASE/01-discovery-and-research"]="market-research competitor-analysis user-interviews content-and-data-audit"
FILES["$PLAYBOOK_BASE/02-requirements-and-scope"]="user-stories acceptance-criteria non-functional-requirements scope-boundaries definition-of-done"
FILES["$PLAYBOOK_BASE/03-ux-and-design"]="personas journeys-and-flows information-architecture wireframes design-system"
FILES["$PLAYBOOK_BASE/04-architecture-and-decisions"]="system-context solution-architecture data-flows threat-model"
FILES["$PLAYBOOK_BASE/04-architecture-and-decisions/adrs"]="README"
FILES["$PLAYBOOK_BASE/05-project-setup"]="repository-setup coding-standards environments-and-secrets package-and-dependency-policy precommit-and-ci-conventions"
FILES["$PLAYBOOK_BASE/06-data-model-and-storage"]="schema-design migrations-plan seed-and-fixtures backup-and-restore data-governance"
FILES["$PLAYBOOK_BASE/07-apis-and-contracts"]="api-style-guide endpoints-and-contracts auth-and-authorisation rate-limiting-and-quota webhooks-and-events"
FILES["$PLAYBOOK_BASE/08-frontend"]="tech-stack routing-and-navigation state-management forms-and-validation ui-components accessibility-a11y internationalisation-i18n"
FILES["$PLAYBOOK_BASE/09-backend"]="service-boundaries business-logic background-jobs file-and-media-storage caching-strategy"
FILES["$PLAYBOOK_BASE/10-integrations"]="identity-provider payments email-and-notifications analytics-and-product-events third-party-webhooks"
FILES["$PLAYBOOK_BASE/11-security-and-compliance"]="security-baseline secrets-management privacy-and-data-protection compliance-checklist incident-response"
FILES["$PLAYBOOK_BASE/12-testing-and-quality"]="test-strategy unit-tests integration-tests e2e-tests performance-tests accessibility-tests"
FILES["$PLAYBOOK_BASE/13-devops-ci-cd"]="ci-pipeline cd-and-release-strategy infrastructure-as-code environment-configs rollback-and-hotfix"
FILES["$PLAYBOOK_BASE/14-observability"]="logging metrics-sli-slo tracing alerting dashboards"
FILES["$PLAYBOOK_BASE/15-performance-and-reliability"]="load-and-stress-testing capacity-planning reliability-engineering disaster-recovery chaos-experiments"
FILES["$PLAYBOOK_BASE/16-documentation-and-training"]="developer-docs runbooks support-playbooks onboarding user-guides"
FILES["$PLAYBOOK_BASE/17-go-to-market-and-legal"]="pricing-and-packaging legal-review terms-and-privacy marketing-launch-plan app-store-listing"
FILES["$PLAYBOOK_BASE/18-release-and-cutover"]="release-checklist cutover-plan data-migration-runbook rollback-plan launch-comms"
FILES["$PLAYBOOK_BASE/19-post-launch"]="support-rotation bug-triage-and-sla feedback-loop analytics-review-cadence roadmap-prioritisation"
FILES["$PLAYBOOK_BASE/20-archive-and-postmortems"]="postmortems-template retrospectives change-log lessons-learned"

# Create numbered files
for DIR in "${!FILES[@]}"; do
  mkdir -p "$DIR"
  rel="${DIR#"$PLAYBOOK_BASE/"}"
  top="${rel%%/*}"
  phase_prefix="${top%%-*}"

  i=1
  for SLUG in ${FILES[$DIR]}; do
    if [[ "$DIR" == "$PLAYBOOK_BASE/0-templates" ]]; then
      fname="${SLUG}.md"
    elif [[ "$DIR" == "$PLAYBOOK_BASE/04-architecture-and-decisions/adrs" && "$SLUG" == "README" ]]; then
      fname="README.md"
    else
      printf -v idx "%02d" "$i"
      fname="${phase_prefix}-${idx}-${SLUG}.md"
      i=$((i+1))
    fi

    if [[ ! -f "$DIR/$fname" ]]; then
      {
        title="# ${SLUG//-/ }"
        echo "$title"
        echo
        echo "> Phase ${phase_prefix} • ${SLUG}"
        echo
        echo "## Objective"
        echo "- "
        echo
        echo "## Tasks"
        echo "- [ ] "
        echo
        echo "## Acceptance Criteria"
        echo "- [ ] "
        echo
        echo "## Notes"
        echo
      } > "$DIR/$fname"
    fi
  done
done

# Playbook README (no code fences to avoid formatter conflicts)
mkdir -p "$PLAYBOOK_BASE"
cat > "$PLAYBOOK_BASE/README.md" <<'EOF'
# Playbook

End-to-end application build phases. Each folder contains numbered `.md` subtasks.
Numbering format: <phase>-<nn>-<name>.md

Example:
- 02-01-user-stories.md
- 02-02-acceptance-criteria.md

Populate files using templates in `0-templates/`.
EOF

echo "Created:"
echo " - $RESEARCH_BASE with initial research and review docs"
echo " - $PLAYBOOK_BASE with numbered stub .md files and README.md"
