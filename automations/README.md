# Automations Workspace - Prompt-Driven Orchestration

Consolidates the agent prompts, orchestration specs, memory assets, and supporting scripts used to run the Motion Mavericks automation stack with a prompt-driven orchestration controller.

## Quick Start

```bash
# Run full orchestration
npm run automation:run:queue

# Test the prompt controller
npm run automation:prompt:test

# Execute specific prompts via CLI
npm run automation:prompt -- --intent full_run
```

## Layout

- `build-spec.yaml` – Source of truth for automation scope, guardrails, and required outputs.
- `lib/` – Core libraries for prompt-driven orchestration:
  - `prompt-controller.mjs` – Loads and executes prompts via LLM interface
  - `state-manager.mjs` – Manages run state and memory operations
  - `guard-evaluator.mjs` – Evaluates ticket guard specifications
  - `agent-executor.mjs` – Orchestrates agent execution chains
- `docs/` – Reference material for agents and operators:
  - `agent-orchestration.md` – Blueprint for agent coordination
  - `prompt-controller.md` – Detailed documentation for the prompt controller system
  - `guardrails.md` – Development and deployment constraints
- `prompts/` – Prompt templates grouped by responsibility:
  - `agents/` – Planner, Implementer, Reviewer, QA, Ops, Knowledge Steward prompts
  - `orchestrations/` – Command, Preflight, Run, and Postflight controller prompts
- `ticket-guards/` – JSON specifications for ticket prerequisites and guard checks
- `memory/` – Hybrid fact store with manifest, index, telemetry, replay buffers, and session scratchpads
- `scripts/` – Executable scripts:
  - `orchestrator-run.mjs` – Main prompt-driven orchestrator (replaces hard-coded guard runner)
  - `prompt-controller.mjs` – CLI for executing individual prompts
  - `test-prompt-controller.mjs` – Test suite for prompt controller
  - Memory utilities for validating/compacting memory and collecting telemetry
- `samples/` – Example telemetry payloads used for dry runs and tooling smoke tests

## Key Features

### Prompt-Driven Architecture
- Control flow determined by prompt responses, not hard-coded logic
- Each prompt returns structured JSON directing the next action
- Supports complex orchestration chains through `next_prompt` and `follow_on` directives

### Guard System
- Machine-checkable prerequisites defined in `ticket-guards/<ticket_id>.json`
- Multiple check types: pathExists, fileContainsAll, packageScripts, fileMatches, jsonPath
- Automatic blocking of tickets that fail guard checks with recommended actions

### Agent Execution Chain
- Sequential execution: implementer → reviewer → qa → ops-release → knowledge-steward
- Automatic retry logic (up to 3 attempts) with feedback loops
- State tracking throughout execution with phase management

### Memory & State Management
- Persistent run state in `run-state.json`
- Session tracking with heartbeat monitoring
- Telemetry collection and replay traces for learning
- Structured memory queries for context retrieval

## NPM Scripts

Automation-specific npm scripts live in the repository root `package.json` under the `automation:*` namespace:

- `automation:run:queue` – Execute full orchestration with prompt controller
- `automation:prompt` – CLI for executing individual prompts
- `automation:prompt:test` – Run prompt controller test suite
- `automation:memory:bootstrap` – Initialize memory for a run
- `automation:run-state:init` – Initialize run state from queue
- `automation:memory:validate` – Validate memory integrity
- `automation:memory:compact` – Compact memory storage

## LLM Integration

The system uses a pluggable LLM interface. Currently includes a stubbed implementation for testing. To integrate a real LLM, implement the interface in your code:

```javascript
class RealLLMInterface {
  async complete(prompt) {
    // Call your LLM API
    return responseString;
  }
}
```

See `docs/prompt-controller.md` for detailed integration instructions.

