#!/usr/bin/env node
import { createPromptController } from '../lib/prompt-controller.mjs';
import { createStateManager, createMemoryManager } from '../lib/state-manager.mjs';
import { createGuardEvaluator } from '../lib/guard-evaluator.mjs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

/**
 * Prompt Controller CLI
 *
 * Usage:
 *   npm run automation:prompt -- --prompt <path> [--context <json>]
 *   npm run automation:prompt -- --intent <intent> [--ticket <id>]
 */

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    prompt: null,
    intent: null,
    ticket: null,
    context: {},
    help: false
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--prompt':
      case '-p':
        options.prompt = args[++i];
        break;
      case '--intent':
      case '-i':
        options.intent = args[++i];
        break;
      case '--ticket':
      case '-t':
        options.ticket = args[++i];
        break;
      case '--context':
      case '-c':
        options.context = JSON.parse(args[++i]);
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
    }
  }

  return options;
}

function showHelp() {
  console.log(`
Prompt Controller CLI

Execute orchestration and agent prompts with the prompt controller.

Usage:
  prompt-controller.mjs --prompt <path> [--context <json>]
  prompt-controller.mjs --intent <intent> [--ticket <id>]
  prompt-controller.mjs --help

Options:
  -p, --prompt <path>     Execute a specific prompt file
  -i, --intent <intent>   Execute based on intent (full_run, ticket_plan, etc.)
  -t, --ticket <id>       Specify ticket ID for ticket_execution intent
  -c, --context <json>    Additional context as JSON string
  -h, --help             Show this help message

Examples:
  # Execute command prompt with full_run intent
  prompt-controller.mjs --intent full_run

  # Execute specific prompt with context
  prompt-controller.mjs --prompt automations/prompts/orchestrations/preflight.prompt.md \\
    --context '{"run_id":"RUN-20250918-1234"}'

  # Execute single ticket
  prompt-controller.mjs --intent ticket_execution --ticket MMP-001
`);
}

async function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  if (!options.prompt && !options.intent) {
    console.error('Error: Either --prompt or --intent must be specified');
    showHelp();
    process.exit(1);
  }

  try {
    // Initialize components
    const controller = createPromptController();
    const stateManager = createStateManager();
    const guardEvaluator = createGuardEvaluator();

    // Load current state
    const runState = await stateManager.loadRunState();
    const queue = await stateManager.loadQueue();
    const runId = stateManager.generateRunId(runState);

    // Build base context
    let context = {
      run_id: runId,
      run_state: runState,
      queue: queue,
      timestamp: new Date().toISOString(),
      ...options.context
    };

    let promptPath = options.prompt;

    // Determine prompt based on intent
    if (options.intent && !promptPath) {
      context.operator_intent = options.intent;

      if (options.intent === 'ticket_execution' && options.ticket) {
        context.ticket_id = options.ticket;
        const ticket = queue.find(t => t.ticket_id === options.ticket);
        if (ticket) {
          context.current_ticket = ticket;
        }
      }

      promptPath = 'automations/prompts/orchestrations/command.prompt.md';
    }

    // Validate prompt exists
    const fullPath = resolve(repoRoot, promptPath);
    if (!existsSync(fullPath)) {
      console.error(`Error: Prompt file not found: ${promptPath}`);
      process.exit(1);
    }

    console.log(`\n📄 Executing prompt: ${promptPath}`);
    console.log(`📊 Context:`, JSON.stringify(context, null, 2).substring(0, 500) + '...\n');

    // Execute the prompt
    const result = await controller.executePrompt(promptPath, context);

    // Display results
    console.log('\n📋 Result:');
    console.log(JSON.stringify(result, null, 2));

    if (result.next_prompt) {
      console.log(`\n➡️  Next prompt: ${result.next_prompt}`);
    }

    if (result.follow_on && result.follow_on.length > 0) {
      console.log('\n📑 Follow-on prompts:');
      result.follow_on.forEach(p => console.log(`  - ${p}`));
    }

    if (result.notes) {
      console.log(`\n📝 Notes: ${result.notes}`);
    }

    if (result.updates) {
      console.log('\n🔄 Updates:');
      if (result.updates.run_state) {
        console.log('  Run state will be updated');
      }
      if (result.updates.memory) {
        console.log(`  Memory paths: ${result.updates.memory.join(', ')}`);
      }
      if (result.updates.telemetry) {
        console.log(`  Telemetry: ${result.updates.telemetry.length} items`);
      }
    }

    // Check if control loop should continue
    if (result.next_prompt) {
      console.log('\n💡 To continue, run:');
      const nextContext = { ...context };
      if (result.updates) {
        Object.assign(nextContext, result.updates);
      }
      console.log(`  prompt-controller.mjs --prompt ${result.next_prompt} --context '${JSON.stringify(nextContext).substring(0, 100)}...'`);
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

export { main as runPromptController };