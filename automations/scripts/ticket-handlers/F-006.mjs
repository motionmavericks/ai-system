import { resolve } from 'path';

const DOC_PATH = 'docs/playbook/05-project-setup/05-02-coding-standards.md';

const DEFAULT_CONTENT = `# Coding Standards\n\n- Use pnpm workspaces and keep dependencies managed centrally.\n- Enforce ESLint + Prettier in CI and pre-commit.\n- Prefer TypeScript with \"strict\" configuration.\n- Use conventional commits and branch naming (feature/<ticket-id>).\n`;

export async function execute({ repoRoot, writeIfMissing, pathAccessible, readFile, ticket }) {
  await writeIfMissing(DOC_PATH, DEFAULT_CONTENT);

  if (!(await pathAccessible(DOC_PATH))) {
    return {
      status: 'blocked',
      summary: 'Coding standards document missing after attempted generation',
      artefacts: { ticket: ticket.ticket_id }
    };
  }

  const contents = await readFile(resolve(repoRoot, DOC_PATH), 'utf8');
  if (!contents.includes('# Coding Standards')) {
    return {
      status: 'blocked',
      summary: 'Coding standards document exists but missing main header'
    };
  }

  return {
    status: 'done',
    summary: 'Coding standards documentation present'
  };
}
