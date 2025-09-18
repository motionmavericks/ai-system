#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const memoryDir = resolve(repoRoot, 'automation/memory');
const manifestPath = resolve(memoryDir, 'manifest.json');
const indexPath = resolve(memoryDir, 'index.json');

const args = process.argv.slice(2);
const shouldWrite = args.includes('--write') || args.includes('-w');

function canonicalStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(v => canonicalStringify(v)).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

async function loadJson(path, label) {
  try {
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Unable to read ${label} (${path}): ${err.message}`);
  }
}

function isoNow() {
  return new Date().toISOString();
}

function validateIndex(index) {
  const issues = [];
  if (!Array.isArray(index.facts)) {
    issues.push('`facts` must be an array.');
  } else {
    const seen = new Set();
    index.facts.forEach((fact, idx) => {
      if (!fact.id) issues.push(`facts[${idx}] missing id`);
      if (fact.id && seen.has(fact.id)) issues.push(`Duplicate fact id ${fact.id}`);
      if (fact.id) seen.add(fact.id);
      if (!fact.updatedAt) issues.push(`facts[${idx}] missing updatedAt`);
      if (fact.updatedAt && Number.isNaN(Date.parse(fact.updatedAt))) issues.push(`facts[${idx}] invalid updatedAt`);
    });
  }
  if (!Array.isArray(index.vectors)) {
    issues.push('`vectors` must be an array.');
  } else {
    index.vectors.forEach((vec, idx) => {
      if (!vec.id) issues.push(`vectors[${idx}] missing id`);
      if (!vec.ref) issues.push(`vectors[${idx}] missing ref`);
      if (!Array.isArray(vec.embedding)) issues.push(`vectors[${idx}] embedding must be array`);
      if (typeof vec.dimensions !== 'number') issues.push(`vectors[${idx}] dimensions must be number`);
    });
  }
  if (!index.graph || typeof index.graph !== 'object') {
    issues.push('`graph` must be an object.');
  } else {
    if (!Array.isArray(index.graph.nodes)) issues.push('`graph.nodes` must be an array.');
    if (!Array.isArray(index.graph.edges)) issues.push('`graph.edges` must be an array.');
  }
  return issues;
}

async function main() {
  const [manifest, index] = await Promise.all([
    loadJson(manifestPath, 'manifest'),
    loadJson(indexPath, 'index')
  ]);

  const issues = [];

  if (!manifest.schemaVersion) issues.push('Manifest missing schemaVersion.');
  if (!manifest.lastCompacted || Number.isNaN(Date.parse(manifest.lastCompacted))) {
    issues.push('Manifest lastCompacted must be ISO8601 string.');
  }
  if (!manifest.items || typeof manifest.items !== 'object') {
    issues.push('Manifest missing items counts.');
  }

  issues.push(...validateIndex(index));

  const canonical = canonicalStringify(index);
  const checksum = crypto.createHash('sha256').update(canonical).digest('hex');
  const counts = {
    facts: Array.isArray(index.facts) ? index.facts.length : 0,
    vectors: Array.isArray(index.vectors) ? index.vectors.length : 0,
    graphNodes: index.graph && Array.isArray(index.graph.nodes) ? index.graph.nodes.length : 0,
    graphEdges: index.graph && Array.isArray(index.graph.edges) ? index.graph.edges.length : 0
  };

  if (manifest.checksum !== checksum) {
    issues.push(`Checksum mismatch. Manifest=${manifest.checksum} Actual=${checksum}`);
  }

  for (const key of Object.keys(counts)) {
    if (manifest.items?.[key] !== counts[key]) {
      issues.push(`Count mismatch for ${key}. Manifest=${manifest.items?.[key]} Actual=${counts[key]}`);
    }
  }

  if (issues.length) {
    console.error('Memory validation issues found:');
    issues.forEach(issue => console.error(`  - ${issue}`));
    if (shouldWrite) {
      console.log('Attempting to reconcile manifest with current index...');
      const updated = {
        ...manifest,
        checksum,
        lastCompacted: isoNow(),
        items: counts
      };
      await writeFile(manifestPath, JSON.stringify(updated, null, 2) + '\n', 'utf8');
      console.log('Manifest updated. Re-run validation to confirm.');
      process.exitCode = 1;
      return;
    }
    process.exitCode = 1;
  } else {
    console.log('Memory validation passed.');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
