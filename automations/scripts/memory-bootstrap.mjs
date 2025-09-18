#!/usr/bin/env node
import { mkdir, writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const memoryRoot = resolve(repoRoot, 'automations/memory');

function parseArgs(argv) {
  const args = { daemon: false, interval: 5000 };
  for (let i = 2; i < argv.length; i++) {
    const token = argv[i];
    if (token === '--run-id' || token === '--runId') {
      args.runId = argv[++i];
    } else if (token === '--daemon') {
      args.daemon = true;
    } else if (token === '--interval') {
      args.interval = Number(argv[++i]);
    } else if (token === '--phase') {
      args.phase = argv[++i];
    } else if (token === '--help' || token === '-h') {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${token}`);
    }
  }
  return args;
}

function defaultRunId() {
  const now = new Date();
  const pad = value => value.toString().padStart(2, '0');
  const stamp = [
    now.getUTCFullYear(),
    pad(now.getUTCMonth() + 1),
    pad(now.getUTCDate()),
    pad(now.getUTCHours()),
    pad(now.getUTCMinutes()),
    pad(now.getUTCSeconds())
  ].join('');
  return `RUN-${stamp}`;
}

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

async function writeJson(path, value) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function ensureManifest(runId) {
  const manifestPath = resolve(memoryRoot, 'manifest.json');
  if (!existsSync(manifestPath)) {
    throw new Error('Memory manifest missing. Run automation:memory:validate first.');
  }
  const manifestLinkPath = resolve(memoryRoot, 'sessions', runId, '_manifest.json');
  await writeJson(manifestLinkPath, { linkedManifest: 'automations/memory/manifest.json' });
}

async function bootstrap(runId, phase = 'preflight') {
  const sessionDir = resolve(memoryRoot, 'sessions', runId);
  const replayDir = resolve(memoryRoot, 'replay', runId);
  const telemetryDir = resolve(memoryRoot, 'telemetry', runId);

  await Promise.all([
    ensureDir(sessionDir),
    ensureDir(replayDir),
    ensureDir(telemetryDir)
  ]);

  const heartbeatPath = join(sessionDir, 'heartbeat.json');
  const heartbeat = {
    status: 'running',
    runId,
    phase,
    updatedAt: new Date().toISOString()
  };
  await writeJson(heartbeatPath, heartbeat);

  const sessionPath = join(sessionDir, 'session.json');
  if (!existsSync(sessionPath)) {
    await writeJson(sessionPath, {
      runId,
      phases: [],
      createdAt: new Date().toISOString()
    });
  }

  await ensureManifest(runId);

  return { heartbeatPath, sessionPath };
}

function printHelp() {
  console.log(`Usage: node automations/scripts/memory-bootstrap.mjs [--run-id RUN-YYYYMMDD-HHMMSS] [--phase preflight] [--daemon] [--interval ms]

Initialises session/replay/telemetry directories and writes a heartbeat file. With --daemon it refreshes the
heartbeat periodically until interrupted.
`);
}

async function main() {
  const options = parseArgs(process.argv);
  if (options.help) {
    printHelp();
    return;
  }

  const runId = options.runId ?? defaultRunId();
  const phase = options.phase ?? 'preflight';
  const { heartbeatPath } = await bootstrap(runId, phase);

  console.log(`Memory bootstrap ready for ${runId} (phase: ${phase}).`);

  if (!options.daemon) {
    return;
  }

  const interval = Math.max(options.interval || 5000, 1000);
  console.log(`Heartbeat daemon active (interval ${interval}ms). Press Ctrl+C to stop.`);
  const timer = setInterval(async () => {
    try {
      await writeJson(heartbeatPath, {
        status: 'running',
        runId,
        phase,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error(`Failed to update heartbeat: ${err.message}`);
    }
  }, interval);

  process.on('SIGINT', async () => {
    clearInterval(timer);
    await writeJson(heartbeatPath, {
      status: 'stopped',
      runId,
      phase,
      updatedAt: new Date().toISOString()
    });
    console.log('\nHeartbeat daemon stopped.');
    process.exit(0);
  });
}

main().catch(err => {
  console.error(err.message ?? err);
  process.exit(1);
});

