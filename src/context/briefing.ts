/**
 * Agent briefing — what a starting agent inherits.
 *
 * CodeGraph and GitNexus answer "what is in this project". That is table
 * stakes. The contract asks for more: an agent that starts NOW must also learn
 * who else is live, which files they are holding, and what the recent changes
 * have already affected — before it touches anything. A collision the brain
 * could have predicted must never be discovered by two agents editing the same
 * file in parallel.
 *
 * Everything here is derived from the provenance ledger and the code graph.
 * Nothing is estimated: if the ledger is empty, the briefing says so rather
 * than inventing plausible activity.
 */
import type { DatabaseSync } from 'node:sqlite'
import { requireWorkspace } from '../access.ts'

/** An agent counts as live if it touched the workspace within this window. */
const LIVE_WINDOW_MS = 15 * 60 * 1000

export interface LiveAgent {
  id: string
  name: string
  color: string
  lastSeen: string
  holding: { path: string; action: string; at: string }[]
}

export interface Briefing {
  workspace: { id: string; name: string; root: string; indexedAt: string | null }
  scale: { files: number; symbols: number; edges: number; unresolvedEdges: number }
  live: LiveAgent[]
  recentChanges: { path: string; agent: string | null; color: string | null; action: string; at: string }[]
  contested: { path: string; agents: { id: string; name: string; color: string }[] }[]
  impacts: { path: string; dependents: number; sample: string[] }[]
  stale: number
  notes: string[]
}

/**
 * Build the briefing for `agentId` joining `workspaceId`.
 * The joining agent is excluded from "live" — it is not news to itself.
 */
export function buildBriefing(db: DatabaseSync, workspaceId: string, agentId: string): Briefing {
  const ws = requireWorkspace(db, workspaceId)
  const meta = db.prepare('SELECT indexed_at FROM workspaces WHERE id = ?').get(workspaceId) as
    { indexed_at: string | null }
  const notes: string[] = []

  const files = (db.prepare('SELECT COUNT(*) c FROM files WHERE workspace_id = ?').get(workspaceId) as { c: number }).c
  const symbols = (db.prepare(
    'SELECT COUNT(*) c FROM symbols WHERE file_id IN (SELECT id FROM files WHERE workspace_id = ?)')
    .get(workspaceId) as { c: number }).c
  const edges = (db.prepare('SELECT COUNT(*) c FROM edges WHERE workspace_id = ?').get(workspaceId) as { c: number }).c
  const unresolved = (db.prepare(
    'SELECT COUNT(*) c FROM edges WHERE workspace_id = ? AND resolved = 0').get(workspaceId) as { c: number }).c

  if (meta.indexed_at === null) notes.push('This workspace has never been indexed — the graph is empty.')

  // Files written but not re-indexed since: the brain knows it is behind.
  const stale = (db.prepare(
    'SELECT COUNT(*) c FROM files WHERE workspace_id = ? AND indexed_at IS NULL').get(workspaceId) as { c: number }).c
  if (stale > 0) notes.push(`${stale} file(s) changed since the last index pass; their symbols may be out of date.`)

  const since = new Date(Date.now() - LIVE_WINDOW_MS).toISOString()

  // ── who else is live, and what are they holding ────────────────────────
  const liveRows = db.prepare(
    `SELECT DISTINCT ac.agent_id, ag.name, ag.color, ag.last_seen
       FROM activity ac JOIN agents ag ON ag.id = ac.agent_id
      WHERE ac.workspace_id = ? AND ac.at >= ? AND ac.agent_id IS NOT NULL AND ac.agent_id <> ?
      ORDER BY ag.last_seen DESC`
  ).all(workspaceId, since, agentId) as
    { agent_id: string; name: string; color: string; last_seen: string }[]

  const live: LiveAgent[] = liveRows.map(row => ({
    id: row.agent_id,
    name: row.name,
    color: row.color,
    lastSeen: row.last_seen,
    holding: db.prepare(
      `SELECT path, action, at FROM activity
        WHERE workspace_id = ? AND agent_id = ? AND at >= ? AND action IN ('write','create')
        GROUP BY path ORDER BY at DESC LIMIT 10`
    ).all(workspaceId, row.agent_id, since) as { path: string; action: string; at: string }[],
  }))

  // ── what changed recently, and by whom ─────────────────────────────────
  const recentChanges = db.prepare(
    `SELECT ac.path, ag.name AS agent, ag.color, ac.action, ac.at
       FROM activity ac LEFT JOIN agents ag ON ag.id = ac.agent_id
      WHERE ac.workspace_id = ? AND ac.action IN ('write','create','delete')
      ORDER BY ac.id DESC LIMIT 20`
  ).all(workspaceId) as Briefing['recentChanges']

  // ── contested files: more than one agent wrote the same path recently ──
  const contestedPaths = db.prepare(
    `SELECT path FROM activity
      WHERE workspace_id = ? AND at >= ? AND action IN ('write','create') AND agent_id IS NOT NULL
      GROUP BY path HAVING COUNT(DISTINCT agent_id) > 1`
  ).all(workspaceId, since) as { path: string }[]

  const contested = contestedPaths.map(row => ({
    path: row.path,
    agents: db.prepare(
      `SELECT DISTINCT ag.id, ag.name, ag.color
         FROM activity ac JOIN agents ag ON ag.id = ac.agent_id
        WHERE ac.workspace_id = ? AND ac.path = ? AND ac.at >= ? AND ac.action IN ('write','create')`
    ).all(workspaceId, row.path, since) as { id: string; name: string; color: string }[],
  }))
  if (contested.length > 0) {
    notes.push(`${contested.length} file(s) were written by more than one agent in the last 15 minutes.`)
  }

  // ── blast radius of those changes, straight from the import graph ──────
  const impacts: Briefing['impacts'] = []
  const changedPaths = [...new Set(recentChanges.map(c => c.path))].slice(0, 8)
  for (const path of changedPaths) {
    const file = db.prepare('SELECT id FROM files WHERE workspace_id = ? AND path = ?')
      .get(workspaceId, path) as { id: number } | undefined
    if (!file) continue
    const dependents = db.prepare(
      `SELECT DISTINCT f.path FROM edges e JOIN files f ON f.id = e.src_file
        WHERE e.workspace_id = ? AND e.kind = 'imports' AND e.dst_file = ? LIMIT 200`
    ).all(workspaceId, file.id) as { path: string }[]
    if (dependents.length > 0) {
      impacts.push({ path, dependents: dependents.length, sample: dependents.slice(0, 5).map(d => d.path) })
    }
  }

  if (live.length === 0) notes.push('No other agent has been active in the last 15 minutes.')

  return {
    workspace: { id: ws.id, name: ws.name, root: ws.root, indexedAt: meta.indexed_at },
    scale: { files, symbols, edges, unresolvedEdges: unresolved },
    live, recentChanges, contested, impacts, stale, notes,
  }
}

/** Render a briefing as the markdown an agent actually reads at turn start. */
export function renderBriefing(b: Briefing): string {
  const lines: string[] = []
  lines.push(`# Workspace briefing — ${b.workspace.name}`)
  lines.push('')
  lines.push(`Root: \`${b.workspace.root}\``)
  lines.push(`Indexed: ${b.workspace.indexedAt ?? 'never'}`)
  lines.push(`Scale: ${b.scale.files} files · ${b.scale.symbols} symbols · ${b.scale.edges} edges` +
    (b.scale.unresolvedEdges > 0 ? ` (${b.scale.unresolvedEdges} unresolved)` : ''))
  lines.push('')

  lines.push('## Who else is working here')
  if (b.live.length === 0) {
    lines.push('Nobody. You are the only agent active in this workspace right now.')
  } else {
    for (const agent of b.live) {
      lines.push(`- **${agent.name}** (last seen ${agent.lastSeen})`)
      for (const held of agent.holding) lines.push(`  - ${held.action} \`${held.path}\``)
      if (agent.holding.length === 0) lines.push('  - no writes yet, reads only')
    }
  }
  lines.push('')

  if (b.contested.length > 0) {
    lines.push('## Contested files — coordinate before editing')
    for (const c of b.contested) {
      lines.push(`- \`${c.path}\` — ${c.agents.map(a => a.name).join(', ')}`)
    }
    lines.push('')
  }

  if (b.recentChanges.length > 0) {
    lines.push('## Recent changes')
    for (const c of b.recentChanges.slice(0, 10)) {
      lines.push(`- ${c.action} \`${c.path}\` by ${c.agent ?? 'unattributed'} at ${c.at}`)
    }
    lines.push('')
  }

  if (b.impacts.length > 0) {
    lines.push('## What those changes reach')
    for (const i of b.impacts) {
      lines.push(`- \`${i.path}\` is imported by ${i.dependents} file(s): ${i.sample.map(s => `\`${s}\``).join(', ')}`)
    }
    lines.push('')
  }

  if (b.notes.length > 0) {
    lines.push('## Notes')
    for (const note of b.notes) lines.push(`- ${note}`)
  }
  return lines.join('\n')
}
