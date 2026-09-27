import type { DatabaseSync, SQLInputValue } from 'node:sqlite'
import { requireWorkspace } from '../access.ts'
import { redactCredentialText } from './resources.ts'

export interface SwarmChronicleEvent {
  at: string
  type: string
  actor?: string | null
  taskId?: string
  title?: string
  subject?: string
  fromAgent?: string
  toAgent?: string | null
  state?: string
  summary?: string | null
  waitMs?: number
  durationMs?: number
  evidence?: string | null
  messageId?: string
  deliveredAt?: string | null
  readAt?: string | null
  leaseId?: string
  paths?: string[]
  account?: string
  remaining?: number
  unit?: string
}

export interface SwarmChronicle {
  workspaceId: string
  since: string
  generatedAt: string
  events: SwarmChronicleEvent[]
  sources: Array<{ name: string; available: boolean }>
  missingSources: string[]
  truncated: boolean
  omittedEvents: number
  sourceRowCapReached: boolean
}

type SqlRow = Record<string, unknown>
const MAX_SOURCE_ROWS = 500
const MAX_EVENTS = 1000

function hasTable(db: DatabaseSync, name: string): boolean {
  return db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(name) !== undefined
}

function sinceDate(value: string | undefined, now: number): number {
  if (value === undefined || value.trim() === '') return now - 2 * 60 * 60_000
  const relative = /^(\d+(?:\.\d+)?)(m|h|d)$/.exec(value.trim())
  if (relative) {
    const amount = Number(relative[1])
    const multiplier = relative[2] === 'm' ? 60_000 : relative[2] === 'h' ? 60 * 60_000 : 24 * 60 * 60_000
    return now - amount * multiplier
  }
  const parsed = Date.parse(value)
  if (!Number.isFinite(parsed)) throw new Error(`invalid --since value: ${value} (use an ISO timestamp or 2h)`)
  return parsed
}

const text = (row: SqlRow, key: string): string | null => {
  const value = row[key]
  return typeof value === 'string' ? value : null
}

function readTurnEvents(db: DatabaseSync, workspaceId: string, cutoff: number): { events: SwarmChronicleEvent[]; source: string | null; truncated: boolean } {
  const table = ['swarm_turn_history', 'swarm_turns', 'turn_history'].find(name => hasTable(db, name))
  if (!table) return { events: [], source: null, truncated: false }
  const columns = new Set((db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>).map(column => column.name))
  if (!columns.has('workspace_id')) return { events: [], source: null, truncated: false }
  const rows = db.prepare(`SELECT * FROM ${table} WHERE workspace_id = ? ORDER BY rowid DESC LIMIT ${MAX_SOURCE_ROWS + 1}`).all(workspaceId) as unknown as SqlRow[]
  const truncated = rows.length > MAX_SOURCE_ROWS
  const events: SwarmChronicleEvent[] = []
  for (const row of rows.slice(0, MAX_SOURCE_ROWS)) {
    const at = text(row, 'ended_at') ?? text(row, 'created_at') ?? text(row, 'at') ?? text(row, 'turn_state_at')
    const agent = text(row, 'agent_id') ?? text(row, 'agent')
    if (!at || !agent || Date.parse(at) < cutoff) continue
    events.push({
      at, type: 'turn.ended', actor: agent,
      state: text(row, 'state') ?? text(row, 'turn_state') ?? undefined,
      summary: text(row, 'summary') ?? text(row, 'turn_summary'),
    })
  }
  return { events, source: table, truncated }
}

/** Read only recorded swarm state and present it as a time-ordered handoff. */
export function buildSwarmChronicle(
  db: DatabaseSync,
  workspaceId: string,
  options: { since?: string; now?: number } = {},
): SwarmChronicle {
  requireWorkspace(db, workspaceId)
  const now = options.now ?? Date.now()
  const cutoff = sinceDate(options.since, now)
  const events: SwarmChronicleEvent[] = []
  let sourceTruncated = false
  const bounded = (sql: string, ...params: SQLInputValue[]): SqlRow[] => {
    const rows = db.prepare(sql).all(...params) as unknown as SqlRow[]
    if (rows.length > MAX_SOURCE_ROWS) sourceTruncated = true
    return rows.slice(0, MAX_SOURCE_ROWS)
  }
  const within = (at: string | null): at is string => at !== null && Number.isFinite(Date.parse(at)) && Date.parse(at) >= cutoff

  if (hasTable(db, 'queue_tasks')) {
    const columns = new Set((db.prepare('PRAGMA table_info(queue_tasks)').all() as Array<{ name: string }>).map(column => column.name))
    const summaryColumn = columns.has('delivered_summary') ? 'delivered_summary' : 'NULL AS delivered_summary'
    const tasks = bounded(`SELECT id, title, state, claimed_by, claimed_at, delivered_path, ${summaryColumn}, created_at, updated_at FROM queue_tasks WHERE workspace_id = ? ORDER BY updated_at DESC LIMIT ${MAX_SOURCE_ROWS + 1}`, workspaceId)
    for (const row of tasks) {
      const id = text(row, 'id')!
      const title = text(row, 'title')!
      const createdAt = text(row, 'created_at')
      const claimedAt = text(row, 'claimed_at')
      const updatedAt = text(row, 'updated_at')
      const state = text(row, 'state')
      const claimedBy = text(row, 'claimed_by')
      if (within(createdAt)) events.push({ at: createdAt, type: 'task.enqueued', taskId: id, title })
      if (within(claimedAt)) events.push({
        at: claimedAt, type: 'task.claimed', actor: claimedBy, taskId: id, title,
        waitMs: Math.max(0, Date.parse(claimedAt) - Date.parse(createdAt ?? claimedAt)),
      })
      if (state === 'delivered' && within(updatedAt)) events.push({
        at: updatedAt, type: 'task.delivered', actor: claimedBy, taskId: id, title,
        evidence: text(row, 'delivered_path'),
        summary: text(row, 'delivered_summary'),
        durationMs: claimedAt === null ? undefined : Math.max(0, Date.parse(updatedAt) - Date.parse(claimedAt)),
      })
      if (state === 'cancelled' && within(updatedAt)) events.push({ at: updatedAt, type: 'task.cancelled', taskId: id, title })
    }
  }

  if (hasTable(db, 'inbox_messages')) {
    const messages = bounded(`SELECT id, from_agent, to_agent, subject, created_at, delivered_at, read_at
      FROM inbox_messages WHERE workspace_id = ? ORDER BY COALESCE(read_at, delivered_at, created_at) DESC LIMIT ${MAX_SOURCE_ROWS + 1}`, workspaceId)
    for (const row of messages) {
      const common = {
        messageId: text(row, 'id')!, fromAgent: text(row, 'from_agent')!, toAgent: text(row, 'to_agent'),
        subject: text(row, 'subject')!,
      }
      const createdAt = text(row, 'created_at')
      const deliveredAt = text(row, 'delivered_at')
      const readAt = text(row, 'read_at')
      if (within(createdAt)) events.push({ at: createdAt, type: 'message.sent', actor: common.fromAgent, ...common })
      if (within(deliveredAt)) events.push({ at: deliveredAt, type: 'message.delivered', actor: common.toAgent, ...common })
      if (within(readAt)) events.push({ at: readAt, type: 'message.read', actor: common.toAgent, ...common })
    }
  }

  if (hasTable(db, 'leases')) {
    const leases = bounded(`SELECT id, agent_id, paths_json, created_at, released_at FROM leases WHERE workspace_id = ?
      ORDER BY COALESCE(released_at, created_at) DESC LIMIT ${MAX_SOURCE_ROWS + 1}`, workspaceId)
    for (const row of leases) {
      let paths: string[] = []
      try { paths = JSON.parse(text(row, 'paths_json') ?? '[]') as string[] } catch { /* malformed historical payload is omitted */ }
      const leaseId = text(row, 'id')!
      const actor = text(row, 'agent_id')
      const createdAt = text(row, 'created_at')
      const releasedAt = text(row, 'released_at')
      if (within(createdAt)) events.push({ at: createdAt, type: 'lease.acquired', actor, leaseId, paths })
      if (within(releasedAt)) events.push({ at: releasedAt, type: 'lease.released', actor, leaseId, paths })
    }
  }

  if (hasTable(db, 'resource_quotas')) {
    const quotas = bounded(`SELECT account, remaining, unit, reported_by, updated_at FROM resource_quotas ORDER BY updated_at DESC LIMIT ${MAX_SOURCE_ROWS + 1}`)
    for (const row of quotas) {
      const at = text(row, 'updated_at')
      if (within(at)) events.push({
        at, type: 'quota.reported', actor: text(row, 'reported_by'), account: text(row, 'account')!,
        remaining: Number(row.remaining), unit: text(row, 'unit')!,
      })
    }
  }

  const turnHistory = readTurnEvents(db, workspaceId, cutoff)
  sourceTruncated ||= turnHistory.truncated
  events.push(...turnHistory.events)
  for (const event of events) {
    for (const [key, value] of Object.entries(event)) {
      if (typeof value === 'string') event[key as keyof SwarmChronicleEvent] = redactCredentialText(value) as never
      else if (Array.isArray(value)) event[key as keyof SwarmChronicleEvent] = value.map(item =>
        typeof item === 'string' ? redactCredentialText(item) : item) as never
    }
  }
  events.sort((left, right) => Date.parse(left.at) - Date.parse(right.at) || left.type.localeCompare(right.type))
  const omittedEvents = Math.max(0, events.length - MAX_EVENTS)
  if (omittedEvents > 0) events.splice(0, omittedEvents)

  const historyAvailable = turnHistory.source !== null
  const sources = [
    { name: 'queue_tasks', available: hasTable(db, 'queue_tasks') },
    { name: 'inbox_messages', available: hasTable(db, 'inbox_messages') },
    { name: 'leases', available: hasTable(db, 'leases') },
    { name: 'resource_quotas', available: hasTable(db, 'resource_quotas') },
    { name: 'turn history', available: historyAvailable },
  ]
  const missingSources = sources.filter(source => !source.available).map(source => source.name === 'turn history'
    ? 'Turn-Verlauf erst ab Version mit Turn-Historie gespeichert.'
    : `Quelle fehlt: ${source.name}.`)
  if (historyAvailable) {
    missingSources.push('Turn-Verlauf erst ab Version mit Turn-Historie gespeichert; älterer Verlauf fehlt.')
  }
  return {
    workspaceId,
    since: new Date(cutoff).toISOString(),
    generatedAt: new Date(now).toISOString(),
    events,
    sources,
    missingSources,
    truncated: sourceTruncated || omittedEvents > 0,
    omittedEvents,
    sourceRowCapReached: sourceTruncated,
  }
}

export function formatSwarmChronicleMarkdown(chronicle: SwarmChronicle): string {
  const lines = [`# Swarm-Chronik`, '', `Zeitraum ab ${chronicle.since} · erzeugt ${chronicle.generatedAt}`, '', '## Ereignisse', '']
  if (chronicle.events.length === 0) lines.push('Keine gespeicherten Ereignisse in diesem Zeitraum.', '')
  for (const event of chronicle.events) {
    const detail = [event.title, event.subject ? `„${event.subject}“` : null, event.actor ? `von ${event.actor}` : null,
      event.state, event.evidence ? `Beleg: ${event.evidence}` : null,
      event.waitMs === undefined ? null : `Wartezeit ${Math.round(event.waitMs / 1000)} s`,
      event.durationMs === undefined ? null : `Dauer ${Math.round(event.durationMs / 1000)} s`,
      event.account ? `${event.account}: ${event.remaining} ${event.unit}` : null,
      event.paths?.length ? event.paths.join(', ') : null,
      event.summary,
    ].filter(Boolean).join(' · ')
    lines.push(`- ${event.at} **${event.type}**${detail ? ` — ${detail}` : ''}`)
  }
  lines.push('', '## Quellen', '', ...chronicle.sources.map(source => `- ${source.name}: ${source.available ? 'verfügbar' : 'fehlt'}`))
  if (chronicle.missingSources.length > 0) lines.push('', '## Nicht gespeichert', '', ...chronicle.missingSources.map(source => `- ${source}`))
  if (chronicle.truncated) lines.push('', 'Weitere Ereignisse ausgelassen.', `- Höchstens ${MAX_EVENTS} Ereignisse und ${MAX_SOURCE_ROWS} Datensätze je Quelle werden eingelesen.`)
  if (chronicle.omittedEvents > 0) lines.push(`- Durch das Ereignislimit entfernt: ${chronicle.omittedEvents}.`)
  if (chronicle.sourceRowCapReached) lines.push('- Mindestens eine Quelle hat das Datensatzlimit erreicht; weitere Quellzeilen wurden abgeschnitten.')
  lines.push('')
  return lines.join('\n')
}
