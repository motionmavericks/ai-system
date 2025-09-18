import { resolve } from 'path';

const REQUIRED_KEYS = [
  'CLERK_SECRET_KEY',
  'NEON_CONNECTION_STRING_DEV',
  'RESEND_API_KEY',
  'MUX_TOKEN_ID',
  'MUX_TOKEN_SECRET',
  'UPSTASH_REDIS_URL',
  'SENTRY_DSN'
];

export async function execute({ repoRoot, writeIfMissing, readFile, writeFile, pathAccessible, ticket }) {
  await writeIfMissing('.env.example', REQUIRED_KEYS.map(key => `${key}=`).join('\n') + '\nFEATURE_FLAGS={}\n');

  const envPath = resolve(repoRoot, '.env.example');
  let contents = await readFile(envPath, 'utf8');
  let missing = REQUIRED_KEYS.filter(key => !contents.includes(`${key}=`));

  if (missing.length) {
    contents = contents.trimEnd() + '\n' + missing.map(key => `${key}=`).join('\n') + '\n';
    await writeFile(envPath, contents, 'utf8');
  }

  missing = REQUIRED_KEYS.filter(key => !contents.includes(`${key}=`));

  if (missing.length) {
    return {
      status: 'blocked',
      summary: `Environment template missing keys: ${missing.join(', ')}`,
      artefacts: { ticket: ticket.ticket_id, missing }
    };
  }

  return {
    status: 'done',
    summary: 'Environment template present with required secret keys (placeholders only)'
  };
}
