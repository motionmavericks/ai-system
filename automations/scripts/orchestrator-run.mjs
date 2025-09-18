#!/usr/bin/env node
import { readFile, writeFile, mkdir, access } from 'fs/promises';
import { existsSync, constants } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
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

async function writeIfMissing(relPath, content) {
  const abs = resolve(repoRoot, relPath);
  if (existsSync(abs)) {
    return;
  }
  await mkdir(dirname(abs), { recursive: true });
  await writeFile(abs, content, 'utf8');
}

const handlersDir = resolve(repoRoot, 'automations/scripts/ticket-handlers');

async function loadTicketHandler(ticketId) {
  const modulePath = resolve(handlersDir, `${ticketId}.mjs`);
  if (!existsSync(modulePath)) {
    return null;
  }
  const moduleUrl = pathToFileURL(modulePath).href;
  return import(moduleUrl);
}

async function processTicket(runId, ticketId, state, queueMap) {
  const handler = await loadTicketHandler(ticketId);
  let result;

  if (handler && typeof handler.execute === 'function') {
    const context = {
      repoRoot,
      runId,
      ticket: queueMap.get(ticketId),
      runStatePath,
      writeJson,
      readFile,
      writeFile,
      mkdir,
      access,
      existsSync,
      pathAccessible,
      writeIfMissing
    };
    result = await handler.execute(context);
  } else {
    result = {
      status: 'blocked',
      summary: `No automated handler defined for ${ticketId}; manual intervention required.`
    };
  }

  if (!result || !result.status) {
    result = {
      status: 'blocked',
      summary: `Handler for ${ticketId} returned no status.`
    };
  }
  const phase = result.status === 'done' ? 'knowledge' : 'blocked';

  await updateHeartbeat(runId, `${ticketId}:${phase}`);
  await appendHistory(state, ticketId, {
    phase,
    status: result.status,
    summary: result.summary,
    timestamp: new Date().toISOString()
  });

  const telemetryDir = resolve(repoRoot, 'automations/memory/telemetry', runId);
  await writeArtefact(telemetryDir, `${ticketId}-${phase}.json`, {
    ticket_id: ticketId,
    phase,
    summary: result.summary,
    status: result.status,
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

  return result.status === 'done';
}

async function main() {
  const queue = await readJson(runQueuePath);
  const queueMap = new Map(queue.map(ticket => [ticket.ticket_id, ticket]));

  const existingState = existsSync(runStatePath) ? await readJson(runStatePath) : null;
  const runId = pickRunId(existingState);
  const runState = await ensureRunState(runId);
  await ensureBootstrap(runId);

  const pending = new Set(queue.map(ticket => ticket.ticket_id));

  const blocked = [];

  while (pending.size > 0) {
    let progressed = false;
    for (const ticketId of Array.from(pending)) {
      if (!dependenciesMet(ticketId, runState, queueMap)) {
        continue;
      }
      const succeeded = await processTicket(runId, ticketId, runState, queueMap);
      if (!succeeded) {
        blocked.push(ticketId);
      }
      pending.delete(ticketId);
      progressed = true;
    }

    if (!progressed) {
      for (const ticketId of pending) {
        await updateHeartbeat(runId, `${ticketId}:blocked`);
        await appendHistory(runState, ticketId, {
          phase: 'blocked',
          status: 'blocked',
          summary: 'Blocked because dependencies failed acceptance checks.',
          timestamp: new Date().toISOString()
        });
        runState.tickets[ticketId].status = 'blocked';
        runState.tickets[ticketId].phase = 'blocked';
        blocked.push(ticketId);
      }
      await writeJson(runStatePath, runState);
      break;
    }
  }

  await updateHeartbeat(runId, blocked.length ? 'blocked' : 'postflight');

  if (blocked.length) {
    console.error(`❌ Queue halted. Blocked tickets: ${blocked.join(', ')}`);
    process.exit(1);
  }

  console.log('✅ All tickets passed automated checks.');
}

main().catch(err => {
  console.error(err.message ?? err);
  process.exit(1);
});
