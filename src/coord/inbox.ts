/**
 * Agent-to-agent inbox and topic channels (M4).
 * Supports personal inboxes, mission channels, delivery confirmation and long-polling.
 */
import { randomUUID } from 'node:crypto'
import type { DatabaseSync, SQLInputValue } from 'node:sqlite'
import { AccessDenied, registerAgent, requireAgent, requireWorkspace } from '../access.ts'
import { rowsAs } from '../store/rows.ts'
import { coordEvents } from './events.ts'
import type { InboxMessage } from './types.ts'

interface InboxDbRow {
  id: string
  workspace_id: string
  from_agent: string
  to_agent: string | null
  channel: string | null
  mission_id: string | null
  subject: string
  body: string
  created_at: string
  delivered_at: string | null
  read_at: string | null
}

const INBOX_SCHEMA = `
CREATE TABLE IF NOT EXISTS inbox_messages (
  id           TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  from_agent   TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  to_agent     TEXT REFERENCES agents(id) ON DELETE CASCADE,
  channel      TEXT,
  mission_id   TEXT,
  subject      TEXT NOT NULL DEFAULT '',
  body         TEXT NOT NULL,
  created_at   TEXT NOT NULL,
  delivered_at TEXT,
  read_at      TEXT
);
CREATE INDEX IF NOT EXISTS idx_inbox_to ON inbox_messages(workspace_id, to_agent, delivered_at);
CREATE INDEX IF NOT EXISTS idx_inbox_channel ON inbox_messages(workspace_id, channel, delivered_at);
`

export function ensureInboxSchema(db: DatabaseSync): void {
  db.exec(INBOX_SCHEMA)
}

function parseMessage(row: InboxDbRow): InboxMessage {
  return {
    id: row.id,
    workspaceId: row.workspace_id,
    fromAgent: row.from_agent,
    toAgent: row.to_agent,
    channel: row.channel,
    subject: row.subject,
    body: row.body,
    createdAt: row.created_at,
    deliveredAt: row.delivered_at,
    readAt: row.read_at,
  }
}

export interface SendMessageInput {
  workspaceId: string
  fromAgent: string
  toAgent?: string | null
  channel?: string | null
  missionId?: string | null
  subject?: string
  body: string
}

/**
 * A message needs both ends to exist, and the integrator is the recipient of
 * every report a running fleet sends — including the first one. An unregistered
 * integrator would turn a delivered report into "unknown agent" at the worst
 * possible moment, so the row is created on demand.
 */
export function ensureIntegrator(db: DatabaseSync, workspaceId: string, id = 'integrator'): void {
  registerAgent(db, id, id === 'integrator' ? 'Integrator' : id)
  db.prepare('UPDATE agents SET workspace_id = COALESCE(workspace_id, ?) WHERE id = ?').run(workspaceId, id)
}

export function sendMessage(db: DatabaseSync, input: SendMessageInput): InboxMessage {
  ensureInboxSchema(db)
  requireWorkspace(db, input.workspaceId)
  requireAgent(db, input.fromAgent)

  if (!input.toAgent && !input.channel && !input.missionId) {
    throw new AccessDenied('message must specify at least one recipient: toAgent, channel, or missionId')
  }

  if (input.toAgent) {
    requireAgent(db, input.toAgent)
  }

  const nowIso = new Date().toISOString()
  const id = `msg-${randomUUID().slice(0, 12)}`
  const subject = (input.subject ?? '').trim()
  const body = input.body

  db.prepare(`
    INSERT INTO inbox_messages (id, workspace_id, from_agent, to_agent, channel, mission_id, subject, body, created_at, delivered_at, read_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)
  `).run(
    id,
    input.workspaceId,
    input.fromAgent,
    input.toAgent ?? null,
    input.channel ?? null,
    input.missionId ?? null,
    subject,
    body,
    nowIso,
  )

  const msg: InboxMessage = {
    id,
    workspaceId: input.workspaceId,
    fromAgent: input.fromAgent,
    toAgent: input.toAgent ?? null,
    channel: input.channel ?? null,
    subject,
    body,
    createdAt: nowIso,
    deliveredAt: null,
    readAt: null,
  }

  coordEvents.notifyInbox(msg)
  return msg
}

export interface ReadInboxInput {
  workspaceId: string
  agentId: string
  channel?: string | null
  missionId?: string | null
  unreadOnly?: boolean
  waitMs?: number
}

export async function readInbox(db: DatabaseSync, input: ReadInboxInput): Promise<InboxMessage[]> {
  ensureInboxSchema(db)
  requireWorkspace(db, input.workspaceId)
  requireAgent(db, input.agentId)

  const queryMessages = (): InboxDbRow[] => {
    let sql = `
      SELECT * FROM inbox_messages
       WHERE workspace_id = ?
         AND (to_agent = ? OR to_agent IS NULL)
    `
    const params: SQLInputValue[] = [input.workspaceId, input.agentId]

    if (input.channel) {
      sql += ' AND channel = ?'
      params.push(input.channel)
    }
    if (input.missionId) {
      sql += ' AND mission_id = ?'
      params.push(input.missionId)
    }
    if (input.unreadOnly) {
      sql += ' AND read_at IS NULL'
    }

    sql += ' ORDER BY created_at ASC'
    return rowsAs<InboxDbRow>(db.prepare(sql).all(...params))
  }

  let rows = queryMessages()

  if (rows.length === 0 && input.waitMs && input.waitMs > 0) {
    await coordEvents.waitForMessage(input.agentId, input.channel, input.waitMs)
    rows = queryMessages()
  }

  const nowIso = new Date().toISOString()
  const messages: InboxMessage[] = []

  for (const row of rows) {
    if (row.delivered_at === null) {
      db.prepare('UPDATE inbox_messages SET delivered_at = ? WHERE id = ?').run(nowIso, row.id)
      row.delivered_at = nowIso
      coordEvents.emitLive('message.delivered', { messageId: row.id, agentId: input.agentId, deliveredAt: nowIso })
    }
    messages.push(parseMessage(row))
  }

  return messages
}

export function confirmDelivery(db: DatabaseSync, messageId: string, agentId: string): boolean {
  ensureInboxSchema(db)
  const nowIso = new Date().toISOString()
  const res = db.prepare(`
    UPDATE inbox_messages
       SET read_at = ?
     WHERE id = ? AND (to_agent = ? OR to_agent IS NULL) AND read_at IS NULL
  `).run(nowIso, messageId, agentId)
  return Number(res.changes) > 0
}
