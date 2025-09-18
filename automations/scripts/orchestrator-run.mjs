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

const ticketChecks = {
  async F_001() {
    const requiredPaths = ['pnpm-workspace.yaml', 'apps/web', 'packages/db', 'packages/api', 'packages/config'];
    const missing = [];
    for (const item of requiredPaths) {
      if (!(await pathAccessible(item))) {
        missing.push(item);
      }
    }
    return missing.length === 0
      ? { status: 'done', summary: 'Repository scaffold present.' }
      : { status: 'blocked', summary: `Missing scaffold artefacts: ${missing.join(', ')}` };
  },
  async F_002() {
    if (!(await pathAccessible('.env.example'))) {
      return { status: 'blocked', summary: 'Missing .env.example template.' };
    }
    const contents = await readFile(resolve(repoRoot, '.env.example'), 'utf8');
    const requiredKeys = ['CLERK_SECRET_KEY', 'NEON_CONNECTION_STRING_DEV', 'RESEND_API_KEY', 'MUX_TOKEN_ID', 'MUX_TOKEN_SECRET', 'UPSTASH_REDIS_URL', 'SENTRY_DSN'];
    const missingKeys = requiredKeys.filter(key => !contents.includes(key));
    return missingKeys.length === 0
      ? { status: 'done', summary: 'Environment template configured.' }
      : { status: 'blocked', summary: `Missing env keys: ${missingKeys.join(', ')}` };
  },
  async F_003() {
    const diagram = await pathAccessible('docs/playbook/04-architecture-and-decisions/04-01-system-context.md');
    return diagram
      ? { status: 'done', summary: 'Architecture doc available.' }
      : { status: 'blocked', summary: 'Architecture diagram/ADR missing.' };
  },
  async F_004() {
    const schemaFile = await pathAccessible('packages/db/src/schema.ts');
    return schemaFile
      ? { status: 'done', summary: 'Drizzle schema found.' }
      : { status: 'blocked', summary: 'Drizzle schema skeleton not present.' };
  },
  async F_005() {
    const migrateScript = await pathAccessible('package.json');
    if (!migrateScript) {
      return { status: 'blocked', summary: 'package.json missing migration scripts.' };
    }
    const pkg = JSON.parse(await readFile(resolve(repoRoot, 'package.json'), 'utf8'));
    const scripts = pkg.scripts ?? {};
    const required = ['db:migrate', 'db:rollback', 'db:seed'];
    const missing = required.filter(name => !scripts[name]);
    return missing.length === 0
      ? { status: 'done', summary: 'Migration scripts defined.' }
      : { status: 'blocked', summary: `Missing migration scripts: ${missing.join(', ')}` };
  },
  async F_006() {
    const standards = await pathAccessible('docs/playbook/05-project-setup/05-02-coding-standards.md');
    return standards
      ? { status: 'done', summary: 'Coding standards doc present.' }
      : { status: 'blocked', summary: 'Coding standards documentation absent.' };
  }
};

async function evaluateTicket(ticketId) {
  const checker = ticketChecks[ticketId.replace('-', '_')];
  if (!checker) {
    return { status: 'blocked', summary: 'No automation check defined; manual review required.' };
  }
  return checker();
}

async function processTicket(runId, ticketId, state) {
  const result = await evaluateTicket(ticketId);
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
      const succeeded = await processTicket(runId, ticketId, runState);
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
