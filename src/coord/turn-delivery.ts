import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied, requireWorkspace } from '../access.ts'
import { deliverTask, ensureQueueSchema, type QueueTask } from '../queue.ts'
import { inspectDeliveryEvidence, sourceRevision } from './delivery-evidence.ts'

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
  summary: string | undefined,
  options: { workspaceId: string; workspaceRoot: string; repoPath?: string; reviewRequired?: boolean },
): QueueTask {
  return deliverTaskWithEvidence(db, taskId, agentId, evidencePath, summary, options)
}

export function deliverTaskWithEvidence(
  db: DatabaseSync,
  taskId: string,
  agentId: string,
  evidencePath: string,
  summary: string | undefined,
  options: { workspaceId: string; workspaceRoot: string; repoPath?: string; reviewRequired?: boolean },
): QueueTask {
  const task = db.prepare('SELECT title FROM queue_tasks WHERE id = ? AND workspace_id = ?').get(taskId, options.workspaceId) as { title: string } | undefined
  if (!task) throw new AccessDenied(`unknown task: ${taskId}`)
  const evidence = inspectDeliveryEvidence(options.workspaceRoot, evidencePath, {
    reviewRequired: options.reviewRequired || /^R-/i.test(task.title),
  })
  return deliverTask(db, taskId, agentId, evidence.path, summary, {
    workspaceId: options.workspaceId,
    deliveredBy: agentId,
    sourceRevision: sourceRevision(options.repoPath ?? options.workspaceRoot),
    sha256: evidence.sha256,
    reviewJudgment: evidence.reviewJudgment,
    reviewedCommit: evidence.reviewedCommit,
  })
}
