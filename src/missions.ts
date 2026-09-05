/**
 * Missions — agent isolation and the verified change pipeline (Vertical 3).
 *
 * Five of the fifteen invariants live here:
 *   3.  no agent writes directly to main
 *   4.  every mission gets an isolated branch and worktree
 *   9.  no agent releases its own change
 *   10. no commit without an independent review
 *   11. no merge without a post-commit regression proof
 *
 * They are enforced as state transitions, not as advice: `commit` refuses
 * without a passing review by a DIFFERENT agent, and `merge` refuses without a
 * verification recorded against the actual commit sha. A mission that fails a
 * gate goes to `repair` and main is left untouched.
 *
 *   draft -> running -> review -> (repair) -> committed -> verified -> merged
 */
import { execFileSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { requireWorkspace } from './access.ts'

export type MissionState =
  | 'draft' | 'running' | 'review' | 'repair' | 'committed' | 'verified' | 'merged' | 'abandoned'

export class MissionError extends Error {}

const git = (cwd: string, args: string[]): string =>
  execFileSync('git', ['-C', cwd, ...args], {
    encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()

const SCHEMA = `
CREATE TABLE IF NOT EXISTS missions (
  id            TEXT PRIMARY KEY,
  workspace_id  TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  acceptance    TEXT NOT NULL DEFAULT '[]',
  state         TEXT NOT NULL,
  agent_id      TEXT REFERENCES agents(id) ON DELETE SET NULL,
  base_branch   TEXT NOT NULL,
  base_sha      TEXT NOT NULL,          -- the exact main this mission started from
  branch        TEXT NOT NULL,
  worktree      TEXT NOT NULL,
  commit_sha    TEXT,
  created_at    TEXT NOT NULL,
  updated_at    TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_missions_ws ON missions(workspace_id, state);

-- Reviews and verifications are separate rows with their own actor, because
-- "who signed this off" is the whole point of the gate.
CREATE TABLE IF NOT EXISTS mission_gates (
  id           INTEGER PRIMARY KEY,
  mission_id   TEXT NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
  kind         TEXT NOT NULL,           -- 'review' | 'verification'
  actor_id     TEXT NOT NULL,
  passed       INTEGER NOT NULL,
  target_sha   TEXT,                    -- verification is bound to a commit
  notes        TEXT,
  at           TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_gates_mission ON mission_gates(mission_id, kind);
`

export interface Mission {
  id: string; workspace_id: string; title: string; acceptance: string
  state: MissionState; agent_id: string | null
  base_branch: string; base_sha: string; branch: string; worktree: string
  commit_sha: string | null; created_at: string; updated_at: string
}

export function ensureMissionSchema(db: DatabaseSync): void { db.exec(SCHEMA) }

const load = (db: DatabaseSync, id: string): Mission => {
  const row = db.prepare('SELECT * FROM missions WHERE id = ?').get(id) as Mission | undefined
  if (!row) throw new MissionError(`unknown mission: ${id}`)
  return row
}

const touch = (db: DatabaseSync, id: string, state: MissionState, extra: Record<string, string> = {}): void => {
  const sets = ['state = ?', 'updated_at = ?']
  const values: unknown[] = [state, new Date().toISOString()]
  for (const [column, value] of Object.entries(extra)) { sets.push(`${column} = ?`); values.push(value) }
  db.prepare(`UPDATE missions SET ${sets.join(', ')} WHERE id = ?`).run(...values, id)
}

/**
 * Open a mission: pin the base commit, cut an isolated branch and a real git
 * worktree. The agent works there and nowhere else.
 */
export function startMission(
  db: DatabaseSync, workspaceId: string, agentId: string,
  title: string, acceptance: string[] = [],
): Mission {
  ensureMissionSchema(db)
  const ws = requireWorkspace(db, workspaceId)

  let baseBranch: string
  let baseSha: string
  try {
    baseBranch = git(ws.root, ['rev-parse', '--abbrev-ref', 'HEAD'])
    baseSha = git(ws.root, ['rev-parse', 'HEAD'])
  } catch {
    throw new MissionError('workspace is not a git repository with a commit — cannot isolate a mission')
  }

  const id = `m-${randomUUID().slice(0, 8)}`
  const branch = `mission/${id}`
  // Worktrees live beside the repository, never inside it: a checkout nested in
  // the source tree would be indexed as part of the workspace it isolates.
  const worktree = join(ws.root, '..', `.plugbrain-worktrees`, `${ws.id}-${id}`)

  try {
    git(ws.root, ['worktree', 'add', '-b', branch, worktree, baseSha])
  } catch (error) {
    throw new MissionError(
      `could not create worktree: ${error instanceof Error ? error.message : String(error)}`)
  }

  const now = new Date().toISOString()
  db.prepare(
    `INSERT INTO missions
       (id, workspace_id, title, acceptance, state, agent_id, base_branch, base_sha, branch, worktree, created_at, updated_at)
     VALUES (?, ?, ?, ?, 'running', ?, ?, ?, ?, ?, ?, ?)`
  ).run(id, workspaceId, title, JSON.stringify(acceptance), agentId, baseBranch, baseSha, branch, worktree, now, now)
  return load(db, id)
}

/** The agent declares its work finished. It may not approve itself. */
export function submitForReview(db: DatabaseSync, missionId: string): Mission {
  const mission = load(db, missionId)
  if (mission.state !== 'running' && mission.state !== 'repair') {
    throw new MissionError(`mission is ${mission.state}; only running or repair work can be submitted`)
  }
  touch(db, missionId, 'review')
  return load(db, missionId)
}

/**
 * An INDEPENDENT agent reviews. Invariant 9 is enforced here rather than
 * trusted: the mission's own agent is refused outright.
 */
export function review(
  db: DatabaseSync, missionId: string, reviewerId: string, passed: boolean, notes = '',
): Mission {
  const mission = load(db, missionId)
  if (mission.state !== 'review') throw new MissionError(`mission is ${mission.state}, not awaiting review`)
  if (reviewerId === mission.agent_id) {
    throw new MissionError('an agent cannot review its own mission — invariant 9')
  }
  db.prepare(
    `INSERT INTO mission_gates (mission_id, kind, actor_id, passed, target_sha, notes, at)
     VALUES (?, 'review', ?, ?, NULL, ?, ?)`
  ).run(missionId, reviewerId, passed ? 1 : 0, notes, new Date().toISOString())
  touch(db, missionId, passed ? 'review' : 'repair')
  return load(db, missionId)
}

/** Commit inside the worktree. Refused without a passing independent review. */
export function commitMission(db: DatabaseSync, missionId: string, message: string): Mission {
  const mission = load(db, missionId)
  if (mission.state !== 'review') throw new MissionError(`mission is ${mission.state}, not ready to commit`)

  const approved = db.prepare(
    `SELECT actor_id FROM mission_gates
      WHERE mission_id = ? AND kind = 'review' AND passed = 1
      ORDER BY id DESC LIMIT 1`).get(missionId) as { actor_id: string } | undefined
  if (!approved) throw new MissionError('no passing review on record — invariant 10')

  if (!existsSync(mission.worktree)) throw new MissionError(`worktree is gone: ${mission.worktree}`)
  const dirty = git(mission.worktree, ['status', '--porcelain'])
  if (!dirty) throw new MissionError('nothing to commit — the mission changed no files')

  git(mission.worktree, ['add', '-A'])
  git(mission.worktree, ['commit', '-m', message])
  const sha = git(mission.worktree, ['rev-parse', 'HEAD'])
  touch(db, missionId, 'committed', { commit_sha: sha })
  return load(db, missionId)
}

/**
 * Post-commit verification by a third party, bound to the actual sha. A
 * verification recorded against a different commit does not count.
 */
export function verify(
  db: DatabaseSync, missionId: string, verifierId: string, passed: boolean, notes = '',
): Mission {
  const mission = load(db, missionId)
  if (mission.state !== 'committed') throw new MissionError(`mission is ${mission.state}, nothing committed to verify`)
  if (verifierId === mission.agent_id) {
    throw new MissionError('an agent cannot verify its own commit — invariant 9')
  }
  db.prepare(
    `INSERT INTO mission_gates (mission_id, kind, actor_id, passed, target_sha, notes, at)
     VALUES (?, 'verification', ?, ?, ?, ?, ?)`
  ).run(missionId, verifierId, passed ? 1 : 0, mission.commit_sha, notes, new Date().toISOString())
  touch(db, missionId, passed ? 'verified' : 'repair')
  return load(db, missionId)
}

/** Merge into the base branch. Refused without a verification of THIS commit. */
export function merge(db: DatabaseSync, missionId: string): Mission {
  const mission = load(db, missionId)
  if (mission.state !== 'verified') throw new MissionError(`mission is ${mission.state}, not verified`)

  const proof = db.prepare(
    `SELECT target_sha FROM mission_gates
      WHERE mission_id = ? AND kind = 'verification' AND passed = 1
      ORDER BY id DESC LIMIT 1`).get(missionId) as { target_sha: string | null } | undefined
  if (!proof || proof.target_sha !== mission.commit_sha) {
    throw new MissionError('no verification bound to this commit — invariant 11')
  }

  const ws = requireWorkspace(db, mission.workspace_id)
  git(ws.root, ['merge', '--no-ff', mission.branch, '-m', `merge ${mission.id}: ${mission.title}`])
  touch(db, missionId, 'merged')
  return load(db, missionId)
}

/** Release the worktree once the mission is finished, keeping the branch. */
export function closeMission(db: DatabaseSync, missionId: string): void {
  const mission = load(db, missionId)
  const ws = requireWorkspace(db, mission.workspace_id)
  try { git(ws.root, ['worktree', 'remove', '--force', mission.worktree]) } catch { /* already gone */ }
}

export function listMissions(db: DatabaseSync, workspaceId: string): (Mission & { gates: unknown[] })[] {
  ensureMissionSchema(db)
  const rows = db.prepare(
    'SELECT * FROM missions WHERE workspace_id = ? ORDER BY created_at DESC').all(workspaceId) as Mission[]
  return rows.map(m => ({
    ...m,
    gates: db.prepare(
      'SELECT kind, actor_id, passed, target_sha, notes, at FROM mission_gates WHERE mission_id = ? ORDER BY id')
      .all(m.id),
  }))
}
