import type { DatabaseSync } from 'node:sqlite'
import { AccessDenied, requireWorkspace } from '../access.ts'
import { deliverTask, ensureQueueSchema, type QueueTask } from '../queue.ts'
import { ensureSupervisorSchema } from './supervisor.ts'
import { handleFleetAutomationEvent } from './fleet-automation.ts'
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
  const task = db.prepare('SELECT title, state, claimed_by FROM queue_tasks WHERE id = ? AND workspace_id = ?')
    .get(taskId, options.workspaceId) as { title: string; state: string; claimed_by: string | null } | undefined
  if (!task) throw new AccessDenied(`unknown task: ${taskId}`)
  // Check ownership before opening the evidence path supplied by the caller.
  // deliverTask repeats this check in its transaction to catch a concurrent change.
  if (task.state !== 'claimed') throw new AccessDenied(`task ${taskId} is ${task.state}, not claimed`)
  if (task.claimed_by !== agentId) {
    throw new AccessDenied(`task ${taskId} is held by ${task.claimed_by ?? 'nobody'}, not ${agentId}`)
  }
  const evidence = inspectDeliveryEvidence(options.workspaceRoot, evidencePath, {
    reviewRequired: options.reviewRequired || /^R-/i.test(task.title),
  })
  // Ensure supervisor schema exists for worker_task_attempts table
  ensureSupervisorSchema(db)
  // Compute attempt number: max of worker_task_attempts and queue_deliveries for this task+agent, then +1
  const attemptResult = db.prepare(
    `SELECT COALESCE(MAX(attempt), 0) AS maxAttempt FROM worker_task_attempts WHERE task_id = ? AND agent_id = ?`
  ).get(taskId, agentId)
  const maxAttemptFromWorkerTasks = attemptResult?.maxAttempt ?? 0
  const attemptResult2 = db.prepare(
    `SELECT COALESCE(MAX(delivery_attempt), 0) AS maxAttempt FROM queue_deliveries WHERE task_id = ? AND delivered_by = ?`
  ).get(taskId, agentId)
  const maxAttemptFromDeliveries = attemptResult2?.maxAttempt ?? 0
  const attempt = Math.max(maxAttemptFromWorkerTasks, maxAttemptFromDeliveries) + 1

  // Get workspace root for worktree resolution
  const workspaceRootRow = db.prepare(
    `SELECT root FROM workspaces WHERE id = ?`
  ).get(options.workspaceId)
  if (!workspaceRootRow) {
    throw new AccessDenied(`workspace not found: ${options.workspaceId}`)
  }
  const workspaceRoot = workspaceRootRow.root as string

  // Get agent's worktrees
  const agentRow = db.prepare(
    `SELECT worktrees FROM agents WHERE id = ?`
  ).get(agentId)
  let worktree = ''
  if (agentRow?.worktrees) {
    let worktrees: string[]
    try {
      worktrees = JSON.parse(agentRow.worktrees as string)
    } catch {
      worktrees = []
    }
    if (Array.isArray(worktrees)) {
      // Convert evidence.path (relative to workspace root) to absolute path
      const evidenceAbsolutePath = new URL(evidence.path, `file://${workspaceRoot}/`).pathname
      // Find the worktree that is a prefix of the evidence absolute path
      // Choose the longest match (most specific)
      let longestMatch = ''
      for (const wt of worktrees) {
        if (evidenceAbsolutePath.startsWith(wt) && wt.length > longestMatch.length) {
          longestMatch = wt
        }
      }
      worktree = longestMatch
    }
  }
  // Fallback: if no worktree matched, use first worktree or workspace root
  if (!worktree) {
    if (agentRow?.worktrees) {
      let worktrees: string[] = []
      try {
        worktrees = JSON.parse(agentRow.worktrees as string)
      } catch {
        worktrees = []
      }
      if (Array.isArray(worktrees) && worktrees.length > 0) {
        worktree = worktrees[0]
      } else {
        worktree = workspaceRoot
      }
    } else {
      worktree = workspaceRoot
    }
  }
  // Make worktree relative to workspace root for storage (as per brief: relativ zu workspace root)
  if (worktree.startsWith(workspaceRoot)) {
    worktree = '.' + worktree.slice(workspaceRoot.length) // relative path starting with .
    // Ensure forward slashes
    worktree = worktree.replace(/\\/g, '/')
    // Remove leading ./ if present
    if (worktree.startsWith('./')) {
      worktree = worktree.slice(2)
    }
    // If after removing ./ it becomes empty, set to "."
    if (worktree === '') {
      worktree = '.'
    }
  } else {
    // Fallback to relative path from workspace root (should not happen if we got it from worktrees)
    worktree = '.'
  }

  // Commit hash: use the sourceRevision from sourceRevision function (already 40-char) or empty string
  const commitHash = sourceRevision(options.repoPath ?? options.workspaceRoot) ?? ''

  const delivered = deliverTask(db, taskId, agentId, evidence.path, summary, {
    workspaceId: options.workspaceId,
    deliveredBy: agentId,
    sourceRevision: sourceRevision(options.repoPath ?? options.workspaceRoot),
    sha256: evidence.sha256,
    reviewJudgment: evidence.reviewJudgment,
    reviewedCommit: evidence.reviewedCommit,
    attempt,
    worktree,
    commitHash,
  })
  handleFleetAutomationEvent(db, options.workspaceId, {
    type: 'task.delivered', data: { taskId: delivered.id },
  })
  return delivered
}
