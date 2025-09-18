#!/usr/bin/env node
import { readFile, writeFile, mkdir, access } from 'fs/promises';
import { existsSync, constants } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const runQueuePath = resolve(repoRoot, 'automations/run-queue.json');
const runStatePath = resolve(repoRoot, 'automations/run-state.json');

async function readJson(path) {
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw);
}

async function writeJson(path, value) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function execCommand(command, args = []) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, { stdio: 'inherit', cwd: repoRoot });
    child.on('close', code => {
      if (code !== 0) {
        rejectPromise(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
      } else {
        resolvePromise();
      }
    });
  });
}

function pickRunId(runState) {
  if (runState && runState.run_id) {
    return runState.run_id;
  }
  const now = new Date();
  const pad = value => value.toString().padStart(2, '0');
  return `RUN-${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}-${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;
}

async function ensureRunState(runId) {
  if (existsSync(runStatePath)) {
    const state = await readJson(runStatePath);
    if (state.run_id === runId) {
      return state;
    }
  }

  const args = ['npm', 'run', 'automation:run-state:init', '--', '--run-id', runId, '--force'];
  await execCommand(args[0], args.slice(1));
  return readJson(runStatePath);
}

async function ensureBootstrap(runId) {
  const sessionDir = resolve(repoRoot, 'automations/memory/sessions', runId);
  const heartbeatPath = join(sessionDir, 'heartbeat.json');
  if (existsSync(heartbeatPath)) {
    return heartbeatPath;
  }
  await execCommand('npm', ['run', 'automation:memory:bootstrap', '--', '--run-id', runId]);
  return heartbeatPath;
}

function dependenciesMet(ticketId, runState, queueMap) {
  const deps = queueMap.get(ticketId).dependencies ?? [];
  return deps.every(dep => runState.tickets[dep]?.status === 'done');
}

function selectNextTicket(queue, runState, queueMap) {
  for (const ticket of queue) {
    const ticketState = runState.tickets[ticket.ticket_id];
    if (!ticketState) continue;
    if (ticketState.status === 'done' || ticketState.status === 'blocked') continue;
    if (dependenciesMet(ticket.ticket_id, runState, queueMap)) {
      return ticket.ticket_id;
    }
  }
  return null;
}

async function appendHistory(state, ticketId, entry) {
  const ticket = state.tickets[ticketId];
  ticket.history.push(entry);
  ticket.phase = entry.phase;
  ticket.status = entry.status;
  state.updatedAt = new Date().toISOString();
  await writeJson(runStatePath, state);
}

async function writeArtefact(dir, filename, payload) {
  await mkdir(dir, { recursive: true });
  const path = join(dir, filename);
  await writeJson(path, payload);
}

async function updateHeartbeat(runId, phase) {
  const heartbeatPath = resolve(repoRoot, 'automations/memory/sessions', runId, 'heartbeat.json');
  if (!existsSync(heartbeatPath)) {
    return;
  }
  const heartbeat = await readJson(heartbeatPath).catch(() => null) ?? {};
  heartbeat.status = 'running';
  heartbeat.phase = phase;
  heartbeat.updatedAt = new Date().toISOString();
  await writeJson(heartbeatPath, heartbeat);
}

async function pathAccessible(relPath) {
  try {
    await access(resolve(repoRoot, relPath), constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

const guardDir = resolve(repoRoot, 'automations/ticket-guards');

const guardEvaluators = {
  async pathExists(check) {
    const ok = await pathAccessible(check.path);
    if (ok) return { ok: true };
    return {
      ok: false,
      reason: `Missing required path: ${check.path}`
    };
  },
  async fileContainsAll(check) {
    const abs = resolve(repoRoot, check.path);
    if (!existsSync(abs)) {
      return { ok: false, reason: `Missing required file: ${check.path}` };
    }
    const contents = await readFile(abs, 'utf8');
    const missing = (check.needles ?? []).filter(needle => !contents.includes(needle));
    if (missing.length) {
      return { ok: false, reason: `${check.path} missing tokens: ${missing.join(', ')}` };
    }
    return { ok: true };
  },
  async packageScripts(check) {
    const pkg = JSON.parse(await readFile(resolve(repoRoot, 'package.json'), 'utf8'));
    const scripts = pkg.scripts ?? {};
    const missing = (check.scripts ?? []).filter(script => !scripts[script]);
    if (missing.length) {
      return { ok: false, reason: `package.json missing scripts: ${missing.join(', ')}` };
    }
    return { ok: true };
  }
};

async function loadTicketGuard(ticketId) {
  const guardPath = resolve(guardDir, `${ticketId}.json`);
  if (!existsSync(guardPath)) {
    return null;
  }
  return readJson(guardPath);
}

async function evaluateTicket(ticketId) {
  const guard = await loadTicketGuard(ticketId);
  if (!guard) {
    return {
      status: 'blocked',
      summary: `No guard definition found for ${ticketId}.` ,
      recommended_actions: ['Update ticket planning to include automations/ticket-guards entry.']
    };
  }

  const failures = [];
  const actions = [];

  for (const check of guard.checks ?? []) {
    const evaluator = guardEvaluators[check.type];
    if (!evaluator) {
      failures.push(`Unknown guard check type: ${check.type}`);
      if (check.fix) actions.push(check.fix);
      continue;
    }
    const result = await evaluator(check);
    if (!result.ok) {
      failures.push(result.reason);
      if (check.fix) actions.push(check.fix);
    }
  }

  if (failures.length) {
    return {
      status: 'blocked',
      summary: guard.summaryOnFailure ?? `Guard checks failed for ${ticketId}.`,
      details: failures,
      recommended_actions: actions
    };
  }

  return {
    status: 'done',
    summary: guard.summaryOnSuccess ?? `Guard checks passed for ${ticketId}.`
  };
}

async function markBlocked(runId, ticketId, state, summary) {
  await updateHeartbeat(runId, `${ticketId}:blocked`);
  await appendHistory(state, ticketId, {
    phase: 'blocked',
    status: 'blocked',
    summary,
    timestamp: new Date().toISOString()
  });
  state.tickets[ticketId].status = 'blocked';
  state.tickets[ticketId].phase = 'blocked';
  state.updatedAt = new Date().toISOString();
  await writeJson(runStatePath, state);
}

async function processTicket(runId, ticketId, state) {
  const result = await evaluateTicket(ticketId);
  const phase = result.status === 'done' ? 'knowledge' : 'blocked';

  await updateHeartbeat(runId, `${ticketId}:${phase}`);
  await appendHistory(state, ticketId, {
    phase,
    status: result.status,
    summary: result.summary,
    details: result.details,
    recommended_actions: result.recommended_actions,
    timestamp: new Date().toISOString()
  });

  const telemetryDir = resolve(repoRoot, 'automations/memory/telemetry', runId);
  await writeArtefact(telemetryDir, `${ticketId}-${phase}.json`, {
    ticket_id: ticketId,
    phase,
    summary: result.summary,
    status: result.status,
    details: result.details,
    recommended_actions: result.recommended_actions,
    timestamp: new Date().toISOString()
  });

  const replayDir = resolve(repoRoot, 'automations/memory/replay', runId);
  await writeArtefact(replayDir, `${ticketId}-${phase}.json`, {
    ticket_id: ticketId,
    agent: phase,
    events: [{ type: 'log', detail: result.summary, timestamp: new Date().toISOString() }]
  });

  state.tickets[ticketId].status = result.status;
  state.tickets[ticketId].phase = phase;
  state.updatedAt = new Date().toISOString();
  await writeJson(runStatePath, state);
  await updateHeartbeat(runId, `${ticketId}:${result.status}`);

  return result;
}

async function main() {
  const queue = await readJson(runQueuePath);
  const queueMap = new Map(queue.map(ticket => [ticket.ticket_id, ticket]));

  const existingState = existsSync(runStatePath) ? await readJson(runStatePath) : null;
  const runId = pickRunId(existingState);
  const runState = await ensureRunState(runId);
  await ensureBootstrap(runId);

  const blocked = [];

  while (true) {
    const ticketId = selectNextTicket(queue, runState, queueMap);
    if (!ticketId) {
      break;
    }

    const result = await processTicket(runId, ticketId, runState);
    if (result.status !== 'done') {
      blocked.push(ticketId);
      break;
    }
  }

  const unfinished = queue
    .map(ticket => ticket.ticket_id)
    .filter(id => !['done', 'blocked'].includes(runState.tickets[id]?.status));

  for (const ticketId of unfinished) {
    await markBlocked(runId, ticketId, runState, 'Blocked because dependencies failed acceptance checks.');
    blocked.push(ticketId);
  }

  await updateHeartbeat(runId, blocked.length ? 'blocked' : 'postflight');

  if (blocked.length) {
    console.error(`❌ Queue halted. Blocked tickets: ${blocked.join(', ')}.`);
    console.error('Refer to automations/run-state.json for detailed guard failures.');
    process.exit(1);
  }

  console.log('✅ All tickets passed automated checks.');
}

main().catch(err => {
  console.error(err.message ?? err);
  process.exit(1);
});
