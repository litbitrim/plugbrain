/**
 * Index Status and Staleness Detection.
 *
 * Requirement M3 §73:
 * "Indexstatus mit Staleness, die uncommittete Änderungen einschließt"
 */
import type { DatabaseSync } from 'node:sqlite'
import { existsSync } from 'node:fs'
import type { IntelStatusResult } from './types.ts'
import { gitText } from '../indexer/git.ts'
import { activePlanetFileScope } from '../planet.ts'

/** Return explicit, on-disk checkout selections for this status workspace. */
function selectedCheckouts(db: DatabaseSync, planetId: string | null): Array<{
  id: string; repoId: string; path: string; dirtyHash: string | null; dirtyCount: number
}> {
  if (planetId === null) return []
  const tableRows = db.prepare(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN (?, ?)")
    .all('planet_index_selections', 'planet_index_checkout_selections') as
    unknown as Array<{ name: string }>
  const tables = new Set(tableRows.map(row => row.name))
  if (!tables.has('planet_index_selections') || !tables.has('planet_index_checkout_selections')) return []
  if (db.prepare('SELECT 1 AS present FROM planet_index_selections WHERE planet_id = ?')
    .get(planetId) === undefined) return []
  return db.prepare(
    `SELECT c.id, c.repo_id AS repoId, c.path,
            c.dirty_hash AS dirtyHash, c.dirty_count AS dirtyCount
       FROM checkouts c
       JOIN planet_index_checkout_selections s
         ON s.planet_id = c.planet_id AND s.checkout_id = c.id
      WHERE c.planet_id = ? AND c.retired_at IS NULL
      ORDER BY c.rel_prefix`).all(planetId) as unknown as Array<{
        id: string; repoId: string; path: string; dirtyHash: string | null; dirtyCount: number
      }>
}

/**
 * Computes the overall index status and staleness across the explicitly
 * selected checkouts. Discovered but unselected worktrees remain inventory;
 * they cannot make the active Brain look dirty or inflate its live totals.
 */
export function getIntelStatus(
  db: DatabaseSync,
  workspaceId: string,
): IntelStatusResult {
  if (!workspaceId || workspaceId.trim() === '') {
    throw new Error('workspaceId is required for Intel status')
  }
  const wsRow = db.prepare('SELECT id FROM workspaces WHERE id = ?').get(workspaceId) as
    { id: string } | undefined
  if (wsRow === undefined) throw new Error(`unknown workspace: ${workspaceId}`)
  const planetRow = db.prepare(
    'SELECT id FROM planets WHERE workspace_id = ?').get(wsRow.id) as { id: string } | undefined

  const planetId = planetRow?.id ?? 'pl-unknown'
  const checkouts = selectedCheckouts(db, planetRow?.id ?? null)
  const fileScope = activePlanetFileScope(db, workspaceId)
  const symbolScope = activePlanetFileScope(db, workspaceId, 'f.checkout_id', 'f.path')
  const sourceScope = activePlanetFileScope(db, workspaceId, 'src.checkout_id', 'src.path')
  const destinationScope = activePlanetFileScope(db, workspaceId, 'dst.checkout_id', 'dst.path')

  const reposCount = new Set(checkouts.map(checkout => checkout.repoId)).size
  const checkoutsCount = checkouts.length
  const filesCount = Number((db.prepare(
    `SELECT count(*) AS c FROM files WHERE workspace_id = ? AND ${fileScope.sql}`)
    .get(workspaceId, ...fileScope.params) as { c: number })?.c ?? 0)
  const symbolsCount = Number((db.prepare(
    `SELECT count(*) AS c FROM symbols s JOIN files f ON f.id = s.file_id
      WHERE f.workspace_id = ? AND ${symbolScope.sql}`)
    .get(workspaceId, ...symbolScope.params) as { c: number })?.c ?? 0)
  const edgesCount = Number((db.prepare(
    `SELECT count(*) AS c FROM edges e
      JOIN files src ON src.id = e.src_file
      LEFT JOIN files dst ON dst.id = e.dst_file
      WHERE e.workspace_id = ? AND ${sourceScope.sql}
        AND (e.dst_file IS NULL OR (${destinationScope.sql}))`)
    .get(workspaceId, ...sourceScope.params, ...destinationScope.params) as { c: number })?.c ?? 0)

  let dirtyCheckouts = 0
  let totalDirtyFiles = 0
  let totalUntrackedFiles = 0

  for (const checkout of checkouts) {
    if (!existsSync(checkout.path)) continue

    const porcelain = gitText(checkout.path, ['status', '--porcelain'])
    if (porcelain && porcelain.trim().length > 0) {
      const lines = porcelain.split('\n').filter(Boolean)
      let checkoutDirty = 0
      let checkoutUntracked = 0
      for (const line of lines) {
        if (line.startsWith('??')) {
          checkoutUntracked++
        } else {
          checkoutDirty++
        }
      }
      if (checkoutDirty > 0 || checkoutUntracked > 0) {
        dirtyCheckouts++
        totalDirtyFiles += checkoutDirty
        totalUntrackedFiles += checkoutUntracked
      }
    } else if (checkout.dirtyHash || checkout.dirtyCount > 0) {
      dirtyCheckouts++
      totalDirtyFiles += checkout.dirtyCount
    }
  }

  const isStale = totalDirtyFiles > 0 || totalUntrackedFiles > 0

  return {
    planetId,
    workspaceId,
    repos: reposCount,
    checkouts: checkoutsCount,
    files: filesCount,
    symbols: symbolsCount,
    edges: edgesCount,
    dirtyCheckouts,
    staleness: {
      isStale,
      dirtyFiles: totalDirtyFiles,
      untrackedFiles: totalUntrackedFiles,
    },
  }
}
