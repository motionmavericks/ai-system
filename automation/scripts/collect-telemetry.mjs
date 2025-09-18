#!/usr/bin/env node
import { readFile, writeFile, readdir, stat, mkdir } from 'fs/promises';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--input' || arg === '-i') {
      out.input = argv[++i];
    } else if (arg === '--output' || arg === '-o') {
      out.output = argv[++i];
    } else if (arg === '--merge' || arg === '-m') {
      out.merge = true;
    } else if (arg === '--run-id') {
      out.runId = argv[++i];
    }
  }
  return out;
}

function normalisePath(p) {
  if (!p) return null;
  return resolve(repoRoot, p);
}

async function collectFiles(path) {
  const stats = await stat(path);
  if (stats.isDirectory()) {
    const files = await readdir(path);
    const jsonFiles = [];
    for (const file of files) {
      const full = resolve(path, file);
      if ((await stat(full)).isDirectory()) continue;
      if (extname(full).toLowerCase() === '.json') jsonFiles.push(full);
    }
    return jsonFiles;
  }
  return [path];
}

async function loadTelemetry(files) {
  const entries = [];
  for (const file of files) {
    try {
      const raw = await readFile(file, 'utf8');
      const data = JSON.parse(raw);
      entries.push({ file, data });
    } catch (err) {
      console.warn(`Skipping ${file}: ${err.message}`);
    }
  }
  return entries;
}

function aggregate(entries) {
  const result = {
    status: 'pass',
    commands: [],
    metrics: {},
    issues: [],
    artefacts: [],
    rewards: [],
    sources: entries.map(e => e.file)
  };

  const metricAccumulators = new Map();
  let failures = 0;

  entries.forEach(({ data }) => {
    if (!data || typeof data !== 'object') return;
    if (data.status && !['pass', 'success'].includes(String(data.status).toLowerCase())) {
      failures += 1;
      result.status = 'fail';
    }
    if (Array.isArray(data.commands)) {
      result.commands.push(...data.commands);
    }
    if (Array.isArray(data.artefacts)) {
      result.artefacts.push(...data.artefacts);
    }
    if (Array.isArray(data.issues)) {
      result.issues.push(...data.issues);
    }
    if (data.metrics && typeof data.metrics === 'object') {
      Object.entries(data.metrics).forEach(([key, value]) => {
        if (typeof value !== 'number') return;
        if (!metricAccumulators.has(key)) {
          metricAccumulators.set(key, { sum: 0, count: 0, min: value, max: value });
        }
        const acc = metricAccumulators.get(key);
        acc.sum += value;
        acc.count += 1;
        acc.min = Math.min(acc.min, value);
        acc.max = Math.max(acc.max, value);
      });
    }
    if (data.reward !== undefined) {
      const rewardValue = typeof data.reward === 'number' ? data.reward : data.reward.qa_score ?? data.reward.ops_score;
      if (typeof rewardValue === 'number') result.rewards.push(rewardValue);
    }
  });

  const metrics = {};
  metricAccumulators.forEach((acc, key) => {
    metrics[key] = {
      average: acc.sum / acc.count,
      min: acc.min,
      max: acc.max,
      samples: acc.count
    };
  });

  result.metrics = metrics;
  result.summary = failures > 0
    ? `Detected ${failures} failing telemetry payload(s).`
    : `Aggregated ${entries.length} telemetry payload(s).`;
  if (result.rewards.length) {
    const total = result.rewards.reduce((sum, value) => sum + value, 0);
    result.reward = {
      average: total / result.rewards.length,
      min: Math.min(...result.rewards),
      max: Math.max(...result.rewards),
      samples: result.rewards.length
    };
  }
  return result;
}

async function maybeMerge(outputPath, aggregatePayload) {
  try {
    const raw = await readFile(outputPath, 'utf8');
    const existing = JSON.parse(raw);
    aggregatePayload.previous = existing;
  } catch (err) {
    // ignore missing file
  }
}

async function main() {
  const { input, output, merge, runId } = parseArgs(process.argv.slice(2));
  if (!input) {
    console.error('collect-telemetry requires --input <path>.');
    process.exit(1);
  }
  const inputPath = normalisePath(input);
  const outputPath = normalisePath(output ?? `automation/memory/telemetry/${runId ?? 'RUN-manual'}/aggregate.json`);

  const files = await collectFiles(inputPath);
  const entries = await loadTelemetry(files);
  const aggregatePayload = aggregate(entries);
  aggregatePayload.generatedAt = new Date().toISOString();
  aggregatePayload.runId = runId ?? 'RUN-manual';

  if (merge) {
    await maybeMerge(outputPath, aggregatePayload);
  }

  const outputDir = dirname(outputPath);
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, JSON.stringify(aggregatePayload, null, 2) + '\n', 'utf8');
  console.log(`Telemetry aggregated into ${outputPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
