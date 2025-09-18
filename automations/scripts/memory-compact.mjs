#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const memoryDir = resolve(repoRoot, 'automations/memory');
const manifestPath = resolve(memoryDir, 'manifest.json');
const indexPath = resolve(memoryDir, 'index.json');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run') || args.includes('-d');

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
  const raw = await readFile(path, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in ${label}: ${err.message}`);
  }
}

function isoNow() {
  return new Date().toISOString();
}

function dedupe(array, key) {
  const seen = new Map();
  array.forEach(item => {
    if (!item) return;
    const dedupeKey = key ? item[key] : canonicalStringify(item);
    if (!dedupeKey) return;
    seen.set(dedupeKey, { ...item });
  });
  const sorted = Array.from(seen.values());
  return key
    ? sorted.sort((a, b) => String(a[key]).localeCompare(String(b[key])))
    : sorted.sort((a, b) => canonicalStringify(a).localeCompare(canonicalStringify(b)));
}

async function main() {
  const [manifest, index] = await Promise.all([
    loadJson(manifestPath, 'manifest'),
    loadJson(indexPath, 'index')
  ]);

  const compacted = { ...index };
  compacted.facts = Array.isArray(index.facts) ? dedupe(index.facts, 'id') : [];
  compacted.vectors = Array.isArray(index.vectors) ? dedupe(index.vectors, 'id') : [];

  if (compacted.graph && Array.isArray(compacted.graph.nodes)) {
    compacted.graph.nodes = dedupe(compacted.graph.nodes, 'id');
  } else {
    compacted.graph = { nodes: [], edges: [] };
  }
  if (Array.isArray(compacted.graph.edges)) {
    const originalFirst = compacted.graph.edges[0] || {};
    compacted.graph.edges = dedupe(compacted.graph.edges, 'id' in originalFirst ? 'id' : null);
    const edgeKey = edge => `${edge.from ?? ''}::${edge.to ?? ''}::${edge.type ?? ''}`;
    if (!('id' in originalFirst)) {
      const seen = new Map();
      compacted.graph.edges.forEach(edge => {
        if (!edge) return;
        const key = edgeKey(edge);
        if (!seen.has(key)) seen.set(key, edge);
      });
      compacted.graph.edges = Array.from(seen.values()).sort((a, b) => edgeKey(a).localeCompare(edgeKey(b)));
    }
    // Remove edges whose nodes are missing
    const nodeIds = new Set(compacted.graph.nodes.map(n => n.id));
    compacted.graph.edges = compacted.graph.edges.filter(edge => nodeIds.has(edge.from) && nodeIds.has(edge.to));
  }

  const canonical = canonicalStringify(compacted);
  const checksum = crypto.createHash('sha256').update(canonical).digest('hex');
  const counts = {
    facts: compacted.facts.length,
    vectors: compacted.vectors.length,
    graphNodes: compacted.graph.nodes.length,
    graphEdges: compacted.graph.edges.length
  };

  if (dryRun) {
    console.log('Dry run; no files updated. Calculated checksum:', checksum);
    console.table(counts);
    return;
  }

  await writeFile(indexPath, JSON.stringify(compacted, null, 2) + '\n', 'utf8');
  const updatedManifest = {
    ...manifest,
    checksum,
    lastCompacted: isoNow(),
    items: counts
  };
  await writeFile(manifestPath, JSON.stringify(updatedManifest, null, 2) + '\n', 'utf8');
  console.log('Memory compacted and manifest updated.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
