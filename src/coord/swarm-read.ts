import type { DatabaseSync } from 'node:sqlite'
import { agentsBoard } from './swarm-ops.ts'

export type SwarmTurnRow = {
  id: string
  agentId: string
  taskId: string | null
  startedAt: string
  endedAt: string | null
  state: string | null
  summary: string | null
}

export function swarmBoard(db: DatabaseSync, workspaceId: string) {
  const board = agentsBoard(db, workspaceId, { gitStatus: true })
  return {
    measuredAt: board.measuredAt,
    overlaps: board.overlaps,
    agents: board.agents.map(({ resourceKey: _resourceKey, ...worker }) => worker),
  }
}

export function swarmTurns(db: DatabaseSync, workspaceId: string, limit = 1000): {
  historyAvailable: boolean
  turns: SwarmTurnRow[]
} {
  const exists = db.prepare("SELECT 1 AS found FROM sqlite_master WHERE type = 'table' AND name = 'swarm_turn_history'").get()
  if (!exists) return { historyAvailable: false, turns: [] }
  const bounded = Math.min(5000, Math.max(1, Math.floor(Number.isFinite(limit) ? limit : 1000)))
  const turns = db.prepare(`
    SELECT id, agent_id AS agentId, task_id AS taskId, started_at AS startedAt,
           ended_at AS endedAt, end_state AS state, summary
      FROM swarm_turn_history WHERE workspace_id = ?
     ORDER BY started_at DESC LIMIT ?
  `).all(workspaceId, bounded) as unknown as SwarmTurnRow[]
  return { historyAvailable: true, turns: turns.reverse() }
}

export function swarmMessages(db: DatabaseSync, workspaceId: string, limit = 1000) {
  const bounded = Math.min(5000, Math.max(1, Math.floor(Number.isFinite(limit) ? limit : 1000)))
  return db.prepare(`
    SELECT id, from_agent AS fromAgent, to_agent AS toAgent, channel, subject, body,
           created_at AS createdAt, delivered_at AS deliveredAt, read_at AS readAt
      FROM inbox_messages WHERE workspace_id = ?
     ORDER BY created_at DESC LIMIT ?
  `).all(workspaceId, bounded).reverse()
}

export function swarmApprovals(db: DatabaseSync, workspaceId: string, limit = 500) {
  const bounded = Math.min(2000, Math.max(1, Math.floor(Number.isFinite(limit) ? limit : 500)))
  return db.prepare(`
    SELECT id, from_agent AS byAgent, to_agent AS agentId, subject, body,
           created_at AS approvedAt, read_at AS acknowledgedAt
      FROM inbox_messages WHERE workspace_id = ?
       AND lower(subject) = 'commit freigegeben'
     ORDER BY created_at DESC LIMIT ?
  `).all(workspaceId, bounded).reverse()
}
