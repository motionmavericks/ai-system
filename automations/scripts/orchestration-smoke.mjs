#!/usr/bin/env node
import { readFile, readdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

const requiredArtifacts = [
  'automations/build-spec.yaml',
  'automations/docs/guardrails.md',
  'automations/docs/agent-orchestration.md',
  'automations/docs/ci-bootstrap.md',
  'automations/docs/dry-run-report.md',
  'automations/docs/memory-backend.md',
  'automations/prompts/orchestrations/preflight.prompt.md',
  'automations/prompts/orchestrations/run.prompt.md',
  'automations/prompts/orchestrations/postflight.prompt.md'
];

async function ensureReadable(path) {
  const fullPath = resolve(repoRoot, path);
  try {
    await readFile(fullPath, 'utf8');
    return { path, status: 'ok' };
  } catch (err) {
    return { path, status: 'err', message: err.message };
  }
}

async function ensureNoLegacyPaths(path) {
  const fullPath = resolve(repoRoot, path);
  const text = await readFile(fullPath, 'utf8');
  if (text.includes('automation/')) {
    throw new Error(`Legacy reference "automation/" found in ${path}`);
  }
}

async function listPromptFiles(subdir) {
  const dirPath = resolve(repoRoot, 'automations/prompts', subdir);
  const files = await readdir(dirPath);
  return files
    .filter(name => name.endsWith('.prompt.md'))
    .map(name => resolve(dirPath, name));
}

async function main() {
  const checks = await Promise.all(requiredArtifacts.map(ensureReadable));
  const failures = checks.filter(check => check.status === 'err');
  if (failures.length) {
    console.error('Required artefacts missing or unreadable:');
    for (const failure of failures) {
      console.error(`  - ${failure.path}: ${failure.message}`);
    }
    process.exit(1);
  }

  const agentPrompts = await listPromptFiles('agents');
  const orchestrationPrompts = await listPromptFiles('orchestrations');
  const promptFiles = [...agentPrompts, ...orchestrationPrompts];

  await Promise.all(promptFiles.map(async promptPath => {
    const relPath = promptPath.slice(repoRoot.length + 1);
    await ensureNoLegacyPaths(relPath);
  }));

  await ensureNoLegacyPaths('automations/build-spec.yaml');
  await ensureNoLegacyPaths('automations/docs/agent-orchestration.md');

  console.log('✅ Orchestration smoke-check passed. Prompts and docs are readable and legacy paths eliminated.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
