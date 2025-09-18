import { resolve } from 'path';

const DOC_PATH = 'docs/playbook/04-architecture-and-decisions/04-01-system-context.md';

export async function execute({ repoRoot, writeIfMissing, pathAccessible, readFile, writeFile }) {
  await writeIfMissing(DOC_PATH, `# System Context\n\n> Placeholder architecture context.\n`);

  const docAbs = resolve(repoRoot, DOC_PATH);
  const docContents = await readFile(docAbs, 'utf8');
  if (!docContents.includes('# System Context')) {
    return {
      status: 'blocked',
      summary: 'System context doc exists but missing header',
      artefacts: { path: DOC_PATH }
    };
  }

  return {
    status: 'done',
    summary: 'Architecture context document present'
  };
}
