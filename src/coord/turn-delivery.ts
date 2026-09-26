import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied, requireWorkspace } from '../access.ts'
import { deliverTask, ensureQueueSchema, type QueueTask } from '../queue.ts'

/** Mark the worker's sole held task delivered at the turn boundary. */
export function currentTaskForTurnDelivery(
  db: DatabaseSync,
  workspaceId: string,
  agentId: string,
): string {
  ensureQueueSchema(db)
  requireWorkspace(db, workspaceId)
  const held = db.prepare(`SELECT id FROM queue_tasks
    WHERE workspace_id = ? AND claimed_by = ? AND state = 'claimed'
    ORDER BY claimed_at DESC, created_at DESC`).all(workspaceId, agentId) as Array<{ id: string }>
  if (held.length === 0) throw new AccessDenied(`${agentId} has no claimed task to deliver`)
  if (held.length > 1) throw new AccessDenied(`${agentId} has ${held.length} claimed tasks; deliver one with swarm deliver <agent> <taskId> --path <evidence>`)
  return held[0]!.id
}

export function deliverTaskAtTurnEnd(
  db: DatabaseSync,
  taskId: string,
  agentId: string,
  evidencePath: string,
  summary?: string,
): QueueTask {
  const evidence = evidencePath.trim()
  if (evidence === '') throw new AccessDenied('deliver evidence path cannot be empty')
  return deliverTask(db, taskId, agentId, evidence, summary)
}
