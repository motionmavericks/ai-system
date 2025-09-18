import { resolve } from 'path';

const SCHEMA_PATH = 'packages/db/src/schema.ts';

const DEFAULT_SCHEMA = `import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const tenants = pgTable('tenants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  tenantId: serial('tenant_id').references(() => tenants.id),
  email: text('email').notNull()
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  tenantId: serial('tenant_id').references(() => tenants.id),
  name: text('name').notNull()
});

export const assets = pgTable('assets', {
  id: serial('id').primaryKey(),
  projectId: serial('project_id').references(() => projects.id),
  url: text('url').notNull()
});

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  tenantId: serial('tenant_id').references(() => tenants.id),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});
`;

export async function execute({ repoRoot, mkdir, writeIfMissing, pathAccessible, ticket }) {
  await mkdir(resolve(repoRoot, 'packages/db/src'), { recursive: true });
  await writeIfMissing(SCHEMA_PATH, DEFAULT_SCHEMA);

  if (!(await pathAccessible(SCHEMA_PATH))) {
    return {
      status: 'blocked',
      summary: 'Drizzle schema file missing after generation',
      artefacts: { ticket: ticket.ticket_id, path: SCHEMA_PATH }
    };
  }

  return {
    status: 'done',
    summary: 'Drizzle schema skeleton exists (tenants/users/projects/assets/notifications)'
  };
}
