import { resolve } from 'path';

export async function execute({ repoRoot, mkdir, writeIfMissing, pathAccessible, ticket }) {
  const requiredDirs = ['apps/web', 'packages/db/src', 'packages/api/src', 'packages/config'];
  await Promise.all(requiredDirs.map(async rel => mkdir(resolve(repoRoot, rel), { recursive: true })));

  await writeIfMissing('pnpm-workspace.yaml', `packages:\n  - 'apps/*'\n  - 'packages/*'\n`);
  await writeIfMissing('apps/web/README.md', '# Web App\n\nPlaceholder for Next.js portal scaffold.\n');
  await writeIfMissing('packages/db/README.md', '# Database Package\n\nPlaceholder for Drizzle schema package.\n');
  await writeIfMissing('packages/api/README.md', '# API Package\n\nPlaceholder for shared API logic.\n');
  await writeIfMissing('packages/config/README.md', '# Config Package\n\nPlaceholder for shared tooling configuration.\n');

  const missing = [];
  for (const rel of ['pnpm-workspace.yaml', ...requiredDirs]) {
    if (!(await pathAccessible(rel))) {
      missing.push(rel);
    }
  }

  if (missing.length) {
    return {
      status: 'blocked',
      summary: `Scaffold incomplete: ${missing.join(', ')}`,
      artefacts: { ticket: ticket.ticket_id, missing }
    };
  }

  return {
    status: 'done',
    summary: 'Repository scaffold present (workspace file + base packages)'
  };
}
