import { resolve } from 'path';

const REQUIRED_SCRIPTS = {
  'db:migrate': "echo 'TODO: implement migrate'",
  'db:rollback': "echo 'TODO: implement rollback'",
  'db:seed': "echo 'TODO: implement seed'",
  'db:drift': "echo 'TODO: implement drift check'"
};

export async function execute({ repoRoot, readFile, writeFile }) {
  const pkgPath = resolve(repoRoot, 'package.json');
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
  pkg.scripts = pkg.scripts ?? {};

  let mutated = false;
  for (const [script, command] of Object.entries(REQUIRED_SCRIPTS)) {
    if (!pkg.scripts[script]) {
      pkg.scripts[script] = command;
      mutated = true;
    }
  }

  if (mutated) {
    await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
  }

  const missing = Object.keys(REQUIRED_SCRIPTS).filter(script => !pkg.scripts[script]);
  if (missing.length) {
    return {
      status: 'blocked',
      summary: `Missing database scripts: ${missing.join(', ')}`,
      artefacts: { scripts: missing }
    };
  }

  return {
    status: 'done',
    summary: 'Database migration/rollback/seed/drift scripts defined in package.json'
  };
}
