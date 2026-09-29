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
  delivery_key?: string | null
  processed_at?: string | null
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
  read_at      TEXT,
  delivery_key TEXT,
  processed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_inbox_to ON inbox_messages(workspace_id, to_agent, delivered_at);
CREATE INDEX IF NOT EXISTS idx_inbox_channel ON inbox_messages(workspace_id, channel, delivered_at);
CREATE TABLE IF NOT EXISTS inbox_delivery_receipts (
  message_id TEXT NOT NULL REFERENCES inbox_messages(id) ON DELETE CASCADE,
  agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  delivered_at TEXT,
  acknowledged_at TEXT,
  processed_at TEXT,
  PRIMARY KEY (message_id, agent_id)
);
CREATE INDEX IF NOT EXISTS idx_inbox_receipt_agent ON inbox_delivery_receipts(agent_id, acknowledged_at);
CREATE TABLE IF NOT EXISTS inbox_consumer_cursors (
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  last_message_id TEXT,
  last_rowid INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (workspace_id, agent_id)
);
`

export function ensureInboxSchema(db: DatabaseSync): void {
  db.exec(INBOX_SCHEMA)
  const columns = db.prepare('PRAGMA table_info(inbox_messages)').all() as Array<{ name: string }>
  if (!columns.some(column => column.name === 'delivery_key')) db.exec('ALTER TABLE inbox_messages ADD COLUMN delivery_key TEXT')
  if (!columns.some(column => column.name === 'processed_at')) db.exec('ALTER TABLE inbox_messages ADD COLUMN processed_at TEXT')
  db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_inbox_delivery_key
    ON inbox_messages(workspace_id, delivery_key, ifnull(to_agent, '*')) WHERE delivery_key IS NOT NULL`)
  // Upgrade existing direct messages into durable per-consumer intents.
  db.exec(`INSERT OR IGNORE INTO inbox_delivery_receipts(message_id, agent_id, delivered_at, acknowledged_at)
    SELECT id, to_agent, delivered_at, read_at FROM inbox_messages WHERE to_agent IS NOT NULL`)
  db.exec(`INSERT OR IGNORE INTO inbox_delivery_receipts(message_id, agent_id, delivered_at, acknowledged_at)
    SELECT m.id, a.id, m.delivered_at, m.read_at FROM inbox_messages m CROSS JOIN agents a
      WHERE m.to_agent IS NULL`)
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
    acknowledgedAt: row.read_at,
    processedAt: row.processed_at ?? null,
  }
}

/**
 * Make sure a coordinating identity exists, so a message the Brain sends on
 * its own (a release notice, a silence alert) has a real sender. `sendMessage`
 * refuses an unknown `fromAgent`, and minting one silently at send time would
 * hide a typo in the caller's own `--from`.
 */
export function ensureSystemAgent(db: DatabaseSync, workspaceId: string, agentId = 'integrator'): void {
  ensureInboxSchema(db)
  registerAgent(db, agentId, agentId === 'integrator' ? 'Integrator' : agentId)
  db.prepare('UPDATE agents SET workspace_id = COALESCE(workspace_id, ?) WHERE id = ?').run(workspaceId, agentId)
}

export interface SendMessageInput {
  workspaceId: string
  fromAgent: string
  toAgent?: string | null
  channel?: string | null
  missionId?: string | null
  subject?: string
  body: string
  /** Stable event/task/attempt identity; repeats return the original message. */
  deliveryKey?: string
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
    INSERT OR IGNORE INTO inbox_messages
      (id, workspace_id, from_agent, to_agent, channel, mission_id, subject, body, created_at, delivered_at, read_at, delivery_key)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, ?)
  `).run(id, input.workspaceId, input.fromAgent, input.toAgent ?? null, input.channel ?? null,
    input.missionId ?? null, subject, body, nowIso, input.deliveryKey ?? null)

  const row = (input.deliveryKey === undefined
    ? db.prepare('SELECT * FROM inbox_messages WHERE id = ?').get(id)
    : db.prepare(`SELECT * FROM inbox_messages
        WHERE workspace_id = ? AND delivery_key = ? AND to_agent IS ? ORDER BY rowid LIMIT 1`)
      .get(input.workspaceId, input.deliveryKey, input.toAgent ?? null)) as unknown as InboxDbRow | undefined
  if (!row) throw new Error('message insert did not produce a durable row')
  const inserted = row.id === id
  if (row.to_agent !== null) {
    db.prepare(`INSERT OR IGNORE INTO inbox_delivery_receipts(message_id, agent_id, delivered_at, acknowledged_at)
      VALUES (?, ?, ?, ?)`)
      .run(row.id, row.to_agent, row.delivered_at, row.read_at)
  } else {
    db.prepare(`INSERT OR IGNORE INTO inbox_delivery_receipts(message_id, agent_id)
      SELECT ?, id FROM agents`).run(row.id)
  }

  const msg = parseMessage(row)
  if (inserted) coordEvents.notifyInbox(msg)
  return msg
}

export interface ReadInboxInput {
  workspaceId: string
  agentId: string
  channel?: string | null
  missionId?: string | null
  unreadOnly?: boolean
  /** Resume after the latest contiguous receipt ACK recorded for this consumer. */
  afterCursor?: boolean
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

    if (input.afterCursor) {
      const cursor = db.prepare(`SELECT last_rowid FROM inbox_consumer_cursors
        WHERE workspace_id = ? AND agent_id = ?`).get(input.workspaceId, input.agentId) as { last_rowid: number } | undefined
      sql += ' AND inbox_messages.rowid > ?'
      params.push(cursor?.last_rowid ?? 0)
    }

    if (input.channel) {
      sql += ' AND channel = ?'
      params.push(input.channel)
    }
    if (input.missionId) {
      sql += ' AND mission_id = ?'
      params.push(input.missionId)
    }
    if (input.unreadOnly) {
      sql += ` AND NOT EXISTS (SELECT 1 FROM inbox_delivery_receipts receipt
        WHERE receipt.message_id = inbox_messages.id AND receipt.agent_id = ? AND receipt.acknowledged_at IS NOT NULL)`
      params.push(input.agentId)
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
    db.prepare(`INSERT OR IGNORE INTO inbox_delivery_receipts(message_id, agent_id)
      VALUES (?, ?)`).run(row.id, input.agentId)
    const receipt = db.prepare(`SELECT delivered_at, acknowledged_at, processed_at
      FROM inbox_delivery_receipts WHERE message_id = ? AND agent_id = ?`)
      .get(row.id, input.agentId) as { delivered_at: string | null; acknowledged_at: string | null; processed_at: string | null }
    if (row.delivered_at === null) {
      db.prepare('UPDATE inbox_messages SET delivered_at = ? WHERE id = ?').run(nowIso, row.id)
      row.delivered_at = nowIso
    }
    if (receipt.delivered_at === null) {
      db.prepare('UPDATE inbox_delivery_receipts SET delivered_at = ? WHERE message_id = ? AND agent_id = ?')
        .run(nowIso, row.id, input.agentId)
      coordEvents.emitLive('message.delivered', { messageId: row.id, agentId: input.agentId, deliveredAt: nowIso })
    }
    messages.push({ ...parseMessage(row), acknowledgedAt: receipt.acknowledged_at, processedAt: receipt.processed_at })
  }

  return messages
}

export function confirmDelivery(db: DatabaseSync, messageId: string, agentId: string): boolean {
  ensureInboxSchema(db)
  const msg = db.prepare('SELECT workspace_id, to_agent FROM inbox_messages WHERE id = ?').get(messageId) as
    { workspace_id: string; to_agent: string | null } | undefined
  if (!msg || (msg.to_agent !== null && msg.to_agent !== agentId)) return false
  const nowIso = new Date().toISOString()
  db.prepare('INSERT OR IGNORE INTO inbox_delivery_receipts(message_id, agent_id) VALUES (?, ?)').run(messageId, agentId)
  const res = db.prepare(`UPDATE inbox_delivery_receipts SET acknowledged_at = COALESCE(acknowledged_at, ?)
    WHERE message_id = ? AND agent_id = ? AND acknowledged_at IS NULL`).run(nowIso, messageId, agentId)
  if (Number(res.changes) === 0) return false
  if (msg.to_agent === agentId) {
    db.prepare('UPDATE inbox_messages SET read_at = COALESCE(read_at, ?) WHERE id = ?').run(nowIso, messageId)
  }
  advanceConsumerCursor(db, msg.workspace_id, agentId)
  return true
}

export interface ConsumerCursor { messageId: string | null; rowid: number; updatedAt: string }

/** The contiguous ACK cursor for one consumer; processing never advances it. */
export function getConsumerCursor(db: DatabaseSync, workspaceId: string, agentId: string): ConsumerCursor | null {
  ensureInboxSchema(db)
  const row = db.prepare(`SELECT last_message_id, last_rowid, updated_at FROM inbox_consumer_cursors
    WHERE workspace_id = ? AND agent_id = ?`).get(workspaceId, agentId) as
    { last_message_id: string | null; last_rowid: number; updated_at: string } | undefined
  return row ? { messageId: row.last_message_id, rowid: Number(row.last_rowid), updatedAt: row.updated_at } : null
}

function advanceConsumerCursor(db: DatabaseSync, workspaceId: string, agentId: string): void {
  const messages = db.prepare(`SELECT m.rowid, m.id, r.acknowledged_at
    FROM inbox_messages m JOIN inbox_delivery_receipts r ON r.message_id = m.id AND r.agent_id = ?
    WHERE m.workspace_id = ? AND (m.to_agent = ? OR m.to_agent IS NULL)
    ORDER BY m.rowid ASC`).all(agentId, workspaceId, agentId) as
    Array<{ rowid: number; id: string; acknowledged_at: string | null }>
  let last: { rowid: number; id: string } | null = null
  for (const message of messages) {
    if (message.acknowledged_at === null) break
    last = { rowid: Number(message.rowid), id: message.id }
  }
  if (last === null) return
  const now = new Date().toISOString()
  db.prepare(`INSERT INTO inbox_consumer_cursors(workspace_id, agent_id, last_message_id, last_rowid, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(workspace_id, agent_id) DO UPDATE SET
        last_message_id = CASE WHEN excluded.last_rowid > inbox_consumer_cursors.last_rowid THEN excluded.last_message_id ELSE inbox_consumer_cursors.last_message_id END,
        last_rowid = MAX(inbox_consumer_cursors.last_rowid, excluded.last_rowid), updated_at = excluded.updated_at`)
    .run(workspaceId, agentId, last.id, last.rowid, now)
}

export function getMessageDeliveryState(
  db: DatabaseSync, messageId: string, agentId: string,
): { acknowledgedAt: string | null; processedAt: string | null } | null {
  ensureInboxSchema(db)
  const row = db.prepare(`SELECT acknowledged_at, processed_at FROM inbox_delivery_receipts
    WHERE message_id = ? AND agent_id = ?`).get(messageId, agentId) as
    { acknowledged_at: string | null; processed_at: string | null } | undefined
  return row ? { acknowledgedAt: row.acknowledged_at, processedAt: row.processed_at } : null
}

/** Record completed handling independently of the receipt ACK. */
export function markMessageProcessed(db: DatabaseSync, messageId: string, agentId: string): boolean {
  ensureInboxSchema(db)
  const msg = db.prepare('SELECT to_agent FROM inbox_messages WHERE id = ?').get(messageId) as
    { to_agent: string | null } | undefined
  if (!msg || (msg.to_agent !== null && msg.to_agent !== agentId)) return false
  db.prepare('INSERT OR IGNORE INTO inbox_delivery_receipts(message_id, agent_id) VALUES (?, ?)').run(messageId, agentId)
  const nowIso = new Date().toISOString()
  const result = db.prepare(`UPDATE inbox_delivery_receipts SET processed_at = COALESCE(processed_at, ?)
    WHERE message_id = ? AND agent_id = ? AND processed_at IS NULL`).run(nowIso, messageId, agentId)
  if (Number(result.changes) > 0 && msg.to_agent === agentId) {
    db.prepare('UPDATE inbox_messages SET processed_at = COALESCE(processed_at, ?) WHERE id = ?').run(nowIso, messageId)
  }
  return Number(result.changes) > 0
}
