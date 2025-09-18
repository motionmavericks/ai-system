#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

function usage() {
  console.error('Usage: node automations/scripts/ticket-plan-from-task.mjs <task-md> <output-json> [ticketPrefix]');
  process.exit(1);
}

const [, , taskPath, outputPath, prefixArg] = process.argv;
if (!taskPath || !outputPath) usage();

const prefix = prefixArg || 'TASK';

function normaliseCells(line) {
  return line
    .split('|')
    .map((cell) => cell.trim())
    .filter((cell) => cell.length > 0);
}

function stripBackticks(value) {
  return value.replace(/`/g, '').trim();
}

function parseList(text) {
  if (!text || text.toLowerCase() === 'none') return [];
  return text
    .split(/[,;\n]/)
    .map((item) => stripBackticks(item))
    .filter((item) => item.length > 0);
}

function buildTicketId(rawId, index) {
  if (!rawId) return `${prefix}-${String(index + 1).padStart(3, '0')}`;
  const cleaned = rawId.replace(/[^0-9a-zA-Z-]/g, '').toUpperCase();
  if (/^[A-Z]+-\d+$/.test(cleaned)) return cleaned;
  return `${prefix}-${String(index + 1).padStart(3, '0')}`;
}

function toDocs(inputs) {
  return inputs.filter((entry) => entry.includes('/') || entry.endsWith('.md') || entry.endsWith('.yaml'));
}

function toFeatureFlags(inputs) {
  return inputs.filter((entry) => entry.startsWith('flag:')).map((entry) => entry.replace(/^flag:\s*/i, ''));
}

function toSummary(description, owner) {
  const ownerNote = owner ? ` Owner: ${owner}` : '';
  return `${description}${ownerNote}`.trim();
}

const taskFilePath = resolve(taskPath);
const outputFilePath = resolve(outputPath);

const fileText = await readFile(taskFilePath, 'utf8');
const tasksSectionMatch = fileText.match(/## Tasks([\s\S]*?)##/);
const tasksSection = tasksSectionMatch ? tasksSectionMatch[1] : fileText.split('## Tasks')[1];

if (!tasksSection) {
  console.error('Unable to locate tasks table in', taskFilePath);
  process.exit(1);
}

const lines = tasksSection
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.startsWith('|'));

const dataRows = lines
  .filter((line) => !line.startsWith('| ID'))
  .filter((line) => !/^\|[-\s]*\|$/.test(line));

const tickets = dataRows.reduce((acc, line, index) => {
  const cells = normaliseCells(line);
  if (!cells.length || /^-+$/.test(cells[0])) return acc;
  const [rawId, description, requiredInputsText, dependenciesText, acceptanceText, owner] = cells;
  const requiredInputs = parseList(requiredInputsText);
  const dependencies = parseList(dependenciesText).map((dep) => dep.toUpperCase());
  const acceptance = parseList(acceptanceText);
  const ticketId = buildTicketId(rawId, index);
  const docs = toDocs(requiredInputs);
  const featureFlags = toFeatureFlags(requiredInputs);
  acc.push({
    ticket_id: ticketId,
    title: description.length > 80 ? `${description.slice(0, 77)}…` : description,
    summary: toSummary(description, owner),
    dependencies,
    docs,
    acceptance,
    tests: [],
    feature_flags: featureFlags,
    telemetry: [],
    risk: 'medium'
  });
  return acc;
}, []);

await writeFile(outputFilePath, JSON.stringify(tickets, null, 2));
console.log(`Wrote ${tickets.length} tickets to ${outputFilePath}`);
