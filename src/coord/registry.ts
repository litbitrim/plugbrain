/**
 * Agent Registry and Presence Management (M4).
 * Tracks agent capabilities, hosts, work assignments, and liveness heartbeats.
 */
import type { DatabaseSync } from 'node:sqlite'
import { registerAgent, requireAgent, requireWorkspace } from '../access.ts'
import { coordEvents } from './events.ts'
import type { AgentRegistration, PresenceState } from './types.ts'

interface ColumnInfo {
  name: string
}

export function ensureCoordSchema(db: DatabaseSync): void {
  const columns = db.prepare(`PRAGMA table_info(agents)`).all() as unknown as ColumnInfo[]
  const has = (name: string) => columns.some(c => c.name === name)

  if (!has('model')) db.exec('ALTER TABLE agents ADD COLUMN model TEXT')
  if (!has('host')) db.exec('ALTER TABLE agents ADD COLUMN host TEXT')
  if (!has('workspace_id')) db.exec('ALTER TABLE agents ADD COLUMN workspace_id TEXT')
  if (!has('checkout_id')) db.exec('ALTER TABLE agents ADD COLUMN checkout_id TEXT')
  if (!has('task_id')) db.exec('ALTER TABLE agents ADD COLUMN task_id TEXT')
  if (!has('mission_id')) db.exec('ALTER TABLE agents ADD COLUMN mission_id TEXT')
  if (!has('last_heartbeat')) db.exec('ALTER TABLE agents ADD COLUMN last_heartbeat TEXT')
  if (!has('heartbeat_ttl_ms')) db.exec('ALTER TABLE agents ADD COLUMN heartbeat_ttl_ms INTEGER NOT NULL DEFAULT 60000')
}

export interface RegisterSwarmAgentInput {
  agentId: string
  name?: string
  model?: string
  host?: string
  workspaceId: string
  checkoutId?: string
  taskId?: string
  missionId?: string
  heartbeatTtlMs?: number
}

interface AgentDbRow {
  id: string
  name: string
  color: string
  hue: number
  model: string | null
  host: string | null
  workspace_id: string | null
  checkout_id: string | null
  task_id: string | null
  mission_id: string | null
  last_heartbeat: string | null
  heartbeat_ttl_ms: number | null
  first_seen: string
  last_seen: string
}

export function registerSwarmAgent(db: DatabaseSync, input: RegisterSwarmAgentInput): AgentRegistration {
  ensureCoordSchema(db)
  requireWorkspace(db, input.workspaceId)

  const identity = registerAgent(db, input.agentId, input.name)
  const now = new Date().toISOString()
  const ttl = input.heartbeatTtlMs ?? 60000

  db.prepare(`
    UPDATE agents
       SET model = ?,
           host = ?,
           workspace_id = ?,
           checkout_id = ?,
           task_id = ?,
           mission_id = ?,
           last_heartbeat = ?,
           heartbeat_ttl_ms = ?,
           last_seen = ?
     WHERE id = ?
  `).run(
    input.model ?? null,
    input.host ?? null,
    input.workspaceId,
    input.checkoutId ?? null,
    input.taskId ?? null,
    input.missionId ?? null,
    now,
    ttl,
    now,
    input.agentId,
  )

  const registration: AgentRegistration = {
    id: identity.id,
    name: identity.name,
    color: identity.color,
    hue: identity.hue,
    model: input.model ?? null,
    host: input.host ?? null,
    workspaceId: input.workspaceId,
    checkoutId: input.checkoutId ?? null,
    taskId: input.taskId ?? null,
    missionId: input.missionId ?? null,
    lastHeartbeat: now,
    heartbeatTtlMs: ttl,
    presence: 'active',
    isExpired: false,
  }

  coordEvents.emitLive('agent.registered', registration)
  return registration
}

export function heartbeatAgent(db: DatabaseSync, agentId: string, taskId?: string): { agentId: string; lastHeartbeat: string; taskId?: string } {
  ensureCoordSchema(db)
  requireAgent(db, agentId)

  const now = new Date().toISOString()
  if (taskId !== undefined) {
    db.prepare(`
      UPDATE agents
         SET last_heartbeat = ?,
             last_seen = ?,
             task_id = ?
       WHERE id = ?
    `).run(now, now, taskId, agentId)
  } else {
    db.prepare(`
      UPDATE agents
         SET last_heartbeat = ?,
             last_seen = ?
       WHERE id = ?
    `).run(now, now, agentId)
  }

  const payload = { agentId, lastHeartbeat: now, ...(taskId ? { taskId } : {}) }
  coordEvents.emitLive('agent.heartbeat', payload)
  return payload
}

export function getAgentPresence(db: DatabaseSync, options?: { workspaceId?: string; agentId?: string }): AgentRegistration[] {
  ensureCoordSchema(db)

  let sql = 'SELECT * FROM agents WHERE 1=1'
  const params: unknown[] = []

  if (options?.workspaceId) {
    sql += ' AND (workspace_id = ? OR workspace_id IS NULL)'
    params.push(options.workspaceId)
  }
  if (options?.agentId) {
    sql += ' AND id = ?'
    params.push(options.agentId)
  }

  sql += ' ORDER BY first_seen ASC'

  const rows = db.prepare(sql).all(...params) as unknown as AgentDbRow[]
  const now = Date.now()

  return rows.map((row) => {
    const hbStr = row.last_heartbeat ?? row.last_seen
    const hbMs = Date.parse(hbStr)
    const ttl = row.heartbeat_ttl_ms && row.heartbeat_ttl_ms > 0 ? row.heartbeat_ttl_ms : 60000
    const isExpired = Number.isFinite(hbMs) ? (now - hbMs > ttl) : false

    let presence: PresenceState
    if (isExpired) {
      presence = 'dead'
    } else if (row.task_id) {
      presence = 'active'
    } else {
      presence = 'idle'
    }

    return {
      id: row.id,
      name: row.name,
      color: row.color,
      hue: row.hue,
      model: row.model,
      host: row.host,
      workspaceId: row.workspace_id ?? '',
      checkoutId: row.checkout_id,
      taskId: row.task_id,
      missionId: row.mission_id,
      lastHeartbeat: hbStr,
      heartbeatTtlMs: ttl,
      presence,
      isExpired,
    }
  })
}

export function isAgentDead(db: DatabaseSync, agentId: string): boolean {
  ensureCoordSchema(db)
  const list = getAgentPresence(db, { agentId })
  if (list.length === 0) return true
  return list[0].presence === 'dead'
}
