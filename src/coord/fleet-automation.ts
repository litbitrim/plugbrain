import type { DatabaseSync } from 'node:sqlite'
import { enqueueTask } from '../queue.ts'
import { ensureSystemAgent, sendMessage } from './inbox.ts'
import { routeReviewForAuthor } from './watchdog.ts'
import { ensureCoordSchema } from './registry.ts'
import { resolveReviewIndependence } from './model-family.ts'

export interface FleetAutomationEvent {
  id?: string | number
  type: string
  data: unknown
}

export interface FleetAutomationResult {
  action: 'review-queued' | 'fix-queued' | 'integration-queued' | 'lead-decision-required' | 'ignored' | 'duplicate'
  taskId?: string
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS fleet_automation_events (
  workspace_id TEXT NOT NULL,
  event_key TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (workspace_id, event_key)
);
CREATE TABLE IF NOT EXISTS fleet_automation_cases (
  workspace_id TEXT NOT NULL,
  source_task_id TEXT NOT NULL,
  author_id TEXT NOT NULL,
  fix_round INTEGER NOT NULL DEFAULT 0,
  state TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (workspace_id, source_task_id)
);
CREATE TABLE IF NOT EXISTS fleet_automation_tasks (
  workspace_id TEXT NOT NULL,
  task_id TEXT NOT NULL,
  source_task_id TEXT NOT NULL,
  role TEXT NOT NULL,
  PRIMARY KEY (workspace_id, task_id)
);
`

function object(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
}

function string(value: unknown): string | null {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null
}

function eventKey(event: FleetAutomationEvent): string | null {
  const data = object(event.data)
  if (event.type === 'task.delivered') {
    const taskId = string(data.taskId)
    return taskId === null ? null : `task.delivered:${taskId}`
  }
  if (event.type === 'agent.turn' && data.state === 'blocked') {
    const agentId = string(data.agentId)
    return agentId === null ? null : `agent.blocked:${agentId}:${string(data.at) ?? event.id ?? 'unknown'}`
  }
  if (event.type === 'watchdog.silent') {
    const agentId = string(data.agentId)
    const workingSince = string(data.workingSince) ?? string(data.at) ?? event.id ?? 'unknown'
    const lastContact = string(data.lastContactAt) ?? 'no-contact'
    const heldTask = string(data.heldTaskId) ?? 'no-held-task'
    return agentId === null ? null : `watchdog.silent:${agentId}:${workingSince}:${lastContact}:${heldTask}`
  }
  return null
}

function linkTask(db: DatabaseSync, workspaceId: string, taskId: string, sourceTaskId: string, role: string): void {
  db.prepare(`INSERT OR IGNORE INTO fleet_automation_tasks (workspace_id, task_id, source_task_id, role)
              VALUES (?, ?, ?, ?)`)
    .run(workspaceId, taskId, sourceTaskId, role)
}

function markEvent(db: DatabaseSync, workspaceId: string, key: string, action: string): void {
  db.prepare(`INSERT OR IGNORE INTO fleet_automation_events (workspace_id, event_key, action, created_at)
              VALUES (?, ?, ?, ?)`)
    .run(workspaceId, key, action, new Date().toISOString())
}

function queueReview(db: DatabaseSync, workspaceId: string, authorId: string, taskId: string, caseSourceTaskId = taskId): FleetAutomationResult {
  const route = routeReviewForAuthor(db, workspaceId, authorId)
  const reviewTaskId = route.taskId
  if (reviewTaskId !== undefined) {
    linkTask(db, workspaceId, taskId, caseSourceTaskId, caseSourceTaskId === taskId ? 'source' : 'fix')
    linkTask(db, workspaceId, reviewTaskId, caseSourceTaskId, 'review')
    if (caseSourceTaskId === taskId) {
      db.prepare(`INSERT OR IGNORE INTO fleet_automation_cases
        (workspace_id, source_task_id, author_id, fix_round, state, created_at, updated_at)
        VALUES (?, ?, ?, 0, 'review-pending', ?, ?)`)
        .run(workspaceId, taskId, authorId, new Date().toISOString(), new Date().toISOString())
    }
    db.prepare(`UPDATE fleet_automation_cases SET state = 'review-pending', updated_at = ?
      WHERE workspace_id = ? AND source_task_id = ? AND state NOT IN ('integration-ready', 'awaiting-lead')`)
      .run(new Date().toISOString(), workspaceId, caseSourceTaskId)
    return { action: route.routed ? 'review-queued' : 'duplicate', taskId: reviewTaskId }
  }
  return { action: 'lead-decision-required' }
}

function leadDecision(db: DatabaseSync, workspaceId: string, subject: string, body: string): void {
  ensureCoordSchema(db)
  ensureSystemAgent(db, workspaceId)
  sendMessage(db, { workspaceId, fromAgent: 'integrator', toAgent: 'integrator', subject, body })
}

function processDelivered(db: DatabaseSync, workspaceId: string, taskId: string): FleetAutomationResult {
  const task = db.prepare(`SELECT id, title, claimed_by, state FROM queue_tasks WHERE workspace_id = ? AND id = ?`)
    .get(workspaceId, taskId) as { id: string; title: string; claimed_by: string | null; state: string } | undefined
  if (task === undefined || task.state !== 'delivered') return { action: 'ignored' }

  const mapped = db.prepare(`SELECT source_task_id, role FROM fleet_automation_tasks
    WHERE workspace_id = ? AND task_id = ?`).get(workspaceId, taskId) as { source_task_id: string; role: string } | undefined
  if (mapped?.role === 'review') {
    const review = db.prepare(`SELECT review_judgment FROM queue_deliveries WHERE task_id = ?`).get(taskId) as { review_judgment: string | null } | undefined
    const judgment = review?.review_judgment?.toUpperCase()
    const sourceTaskId = mapped.source_task_id
    const current = db.prepare(`SELECT author_id, fix_round, state FROM fleet_automation_cases
      WHERE workspace_id = ? AND source_task_id = ?`).get(workspaceId, sourceTaskId) as { author_id: string; fix_round: number; state: string } | undefined
    if (current === undefined) return { action: 'ignored' }
    const identity = db.prepare(`
      SELECT r.author_id, r.reviewer_id, author.account AS author_account, reviewer.account AS reviewer_account,
             reviewer.retired_at
        FROM review_routes r
        JOIN agents author ON author.id = r.author_id
        JOIN agents reviewer ON reviewer.id = r.reviewer_id
       WHERE r.workspace_id = ? AND r.task_id = ?
    `).get(workspaceId, taskId) as {
      author_id: string; reviewer_id: string; author_account: string | null; reviewer_account: string | null; retired_at: string | null
    } | undefined
    const independence = identity === undefined ? null
      : resolveReviewIndependence(db, identity.author_id, identity.reviewer_id)
    if (identity === undefined || identity.author_id !== current.author_id || identity.retired_at !== null
      || !identity.author_account || !identity.reviewer_account || identity.author_account === identity.reviewer_account
      || independence === null || 'reason' in independence) {
      db.prepare(`UPDATE fleet_automation_cases SET state = 'awaiting-lead', updated_at = ?
        WHERE workspace_id = ? AND source_task_id = ?`).run(new Date().toISOString(), workspaceId, sourceTaskId)
      leadDecision(db, workspaceId, `Review independence needs decision: ${sourceTaskId}`,
        `Review task ${taskId} no longer has verifiable independent reviewer account and model-family metadata. No automatic integration or fix routing was created.`)
      return { action: 'lead-decision-required' }
    }
    if (judgment === 'PASS' || judgment === 'PASS_MIT_AUFLAGEN') {
      if (current.state === 'integration-ready') return { action: 'duplicate' }
      const source = db.prepare('SELECT title FROM queue_tasks WHERE id = ?').get(sourceTaskId) as { title: string }
      const integrationTask = enqueueTask(db, workspaceId, {
        title: `Integrate: ${source.title}`,
        body: `Candidate task: ${sourceTaskId}\nReview task: ${taskId}\nReviewer: ${task.claimed_by ?? 'unknown'}\nReview judgment: ${judgment}\nCreate or advance the integration candidate after checking the delivered evidence.`,
        addressedTo: 'integrator', requestedBy: 'integrator',
      })
      linkTask(db, workspaceId, integrationTask.id, sourceTaskId, 'integration')
      db.prepare(`UPDATE fleet_automation_cases SET state = 'integration-ready', updated_at = ?
        WHERE workspace_id = ? AND source_task_id = ?`).run(new Date().toISOString(), workspaceId, sourceTaskId)
      return { action: 'integration-queued', taskId: integrationTask.id }
    }
    if (judgment === 'FAIL' && current.fix_round < 2) {
      const nextRound = current.fix_round + 1
      const source = db.prepare('SELECT title FROM queue_tasks WHERE id = ?').get(sourceTaskId) as { title: string }
      const fixTask = enqueueTask(db, workspaceId, {
        title: `Fix: ${source.title} (round ${nextRound} of 2)`,
        body: `Author: ${current.author_id}\nSource task: ${sourceTaskId}\nReview task: ${taskId}\n` +
          `The review verdict is blocking FAIL. Address the findings in the existing candidate, deliver again, and preserve review evidence. This is fix round ${nextRound} of at most 2.`,
        addressedTo: current.author_id, requestedBy: 'integrator',
      })
      linkTask(db, workspaceId, fixTask.id, sourceTaskId, 'fix')
      db.prepare(`UPDATE fleet_automation_cases SET fix_round = ?, state = 'fix-pending', updated_at = ?
        WHERE workspace_id = ? AND source_task_id = ?`).run(nextRound, new Date().toISOString(), workspaceId, sourceTaskId)
      return { action: 'fix-queued', taskId: fixTask.id }
    }
    db.prepare(`UPDATE fleet_automation_cases SET state = ?, updated_at = ?
      WHERE workspace_id = ? AND source_task_id = ?`).run('awaiting-lead', new Date().toISOString(), workspaceId, sourceTaskId)
    leadDecision(db, workspaceId, `Review needs decision: ${sourceTaskId}`,
      `The review for source task ${sourceTaskId} needs a lead decision. Verdict: ${judgment ?? 'missing or invalid'}. ` +
      `Author: ${current.author_id}. Fix rounds used: ${current.fix_round} of 2. Review task: ${taskId}.`)
    return { action: 'lead-decision-required' }
  }

  if (mapped?.role === 'fix') {
    const authorId = task.claimed_by
    if (authorId === null) return { action: 'ignored' }
    const result = queueReview(db, workspaceId, authorId, taskId, mapped.source_task_id)
    if (result.action === 'lead-decision-required') {
      leadDecision(db, workspaceId, `Fix review needs decision: ${task.title}`,
        `Delivered fix task ${taskId} by ${authorId} has no independent reviewer available in the configured review pool.`)
    }
    return result
  }

  if (task.claimed_by === null || /^review:/i.test(task.title)) return { action: 'ignored' }
  const result = queueReview(db, workspaceId, task.claimed_by, taskId)
  if (result.action === 'lead-decision-required') {
    leadDecision(db, workspaceId, `Review routing needs decision: ${task.title}`,
      `Delivered task ${taskId} by ${task.claimed_by} has no independent reviewer available in the configured review pool.`)
  }
  return result
}

/** Apply one event from the existing Brain event bus to the existing queue. */
export function handleFleetAutomationEvent(
  db: DatabaseSync,
  workspaceId: string,
  event: FleetAutomationEvent,
): FleetAutomationResult {
  db.exec(SCHEMA)
  const key = eventKey(event)
  if (key === null) return { action: 'ignored' }

  db.exec('BEGIN IMMEDIATE')
  try {
    const duplicate = db.prepare(`SELECT 1 AS yes FROM fleet_automation_events WHERE workspace_id = ? AND event_key = ?`)
      .get(workspaceId, key)
    if (duplicate !== undefined) { db.exec('COMMIT'); return { action: 'duplicate' } }

    let result: FleetAutomationResult
    if (event.type === 'task.delivered') {
      const taskId = string(object(event.data).taskId)
      result = taskId === null ? { action: 'ignored' } : processDelivered(db, workspaceId, taskId)
    } else {
      const data = object(event.data)
      const agentId = string(data.agentId)
      const task = agentId === null ? undefined : db.prepare(`SELECT id, title FROM queue_tasks
        WHERE workspace_id = ? AND claimed_by = ? AND state = 'claimed' ORDER BY claimed_at DESC LIMIT 1`)
        .get(workspaceId, agentId) as { id: string; title: string } | undefined
      if (agentId === null || task === undefined) result = { action: 'ignored' }
      else {
        if (event.type === 'watchdog.silent') {
          leadDecision(db, workspaceId, `Silent work needs decision: ${task.title}`,
            `${agentId} has been silent while holding task ${task.id}. Decide whether to continue, reassign, or retire the worker.`)
          db.prepare('UPDATE agents SET silence_alerted_at = ? WHERE workspace_id = ? AND id = ?')
            .run(string(data.at) ?? new Date().toISOString(), workspaceId, agentId)
        } else {
          leadDecision(db, workspaceId, `Blocked work needs decision: ${task.title}`,
            `${agentId} ended its turn blocked while holding task ${task.id}. Summary: ${string(data.summary) ?? 'none'}. Decide how this work should proceed.`)
        }
        result = { action: 'lead-decision-required' }
      }
    }
    markEvent(db, workspaceId, key, result.action)
    db.exec('COMMIT')
    return result
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}
