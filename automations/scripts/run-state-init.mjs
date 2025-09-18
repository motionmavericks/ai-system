#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const runQueuePath = resolve(repoRoot, 'automations/run-queue.json');
const runStatePath = resolve(repoRoot, 'automations/run-state.json');

function parseArgs(argv) {
  const options = {};
  for (let i = 2; i < argv.length; i++) {
    const token = argv[i];
    if (token === '--run-id' || token === '--runId') {
      options.runId = argv[++i];
    } else if (token === '--force') {
      options.force = true;
    } else if (token === '--help' || token === '-h') {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${token}`);
    }
  }
  return options;
}

function help() {
  console.log(`Usage: node automations/scripts/run-state-init.mjs [--run-id RUN-YYYYMMDD-HHMMSS] [--force]

Reads automations/run-queue.json and creates automations/run-state.json with initial ticket statuses.
Use --force to overwrite an existing run-state.json.
`);
}

function defaultRunId() {
  const now = new Date();
  const pad = value => value.toString().padStart(2, '0');
  return [
    now.getUTCFullYear(),
    pad(now.getUTCMonth() + 1),
    pad(now.getUTCDate()),
    pad(now.getUTCHours()),
    pad(now.getUTCMinutes()),
    pad(now.getUTCSeconds())
  ].reduce((acc, part, index) => {
    if (index === 0) return `RUN-${part}`;
    return `${acc}${index === 3 ? '-' : ''}${part}`;
  }, '');
}

async function loadRunQueue() {
  try {
    const raw = await readFile(runQueuePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Unable to read run queue at ${runQueuePath}: ${err.message}`);
  }
}

function buildTicketState(ticket) {
  return {
    status: 'pending',
    phase: 'planner',
    dependencies: ticket.dependencies ?? [],
    artefacts: {},
    history: []
  };
}

function buildRunState(runId, queue) {
  const tickets = {};
  for (const ticket of queue) {
    tickets[ticket.ticket_id] = buildTicketState(ticket);
  }
  const stamp = new Date().toISOString();
  return {
    run_id: runId,
    createdAt: stamp,
    updatedAt: stamp,
    heartbeat: `automations/memory/sessions/${runId}/heartbeat.json`,
    tickets
  };
}

async function writeRunState(state, force) {
  if (existsSync(runStatePath) && !force) {
    throw new Error('automations/run-state.json already exists. Use --force to overwrite.');
  }
  await writeFile(runStatePath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    help();
    return;
  }

  const queue = await loadRunQueue();
  if (!Array.isArray(queue) || queue.length === 0) {
    throw new Error('Run queue is empty; nothing to initialise.');
  }

  const runId = args.runId ?? defaultRunId();
  const state = buildRunState(runId, queue);
  await writeRunState(state, args.force ?? false);

  console.log(`Created automations/run-state.json for ${runId} with ${queue.length} tickets.`);
}

main().catch(err => {
  console.error(err.message ?? err);
  process.exit(1);
});

