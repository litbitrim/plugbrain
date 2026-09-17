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

/**
 * Computes the overall index status and staleness across all registered checkouts.
 */
export function getIntelStatus(
  db: DatabaseSync,
  _planetRoot?: string
): IntelStatusResult {
  const wsRow = db.prepare('SELECT id FROM workspaces LIMIT 1').get() as { id: string } | undefined
  const planetRow = db.prepare('SELECT id FROM planets LIMIT 1').get() as { id: string } | undefined

  const workspaceId = wsRow?.id ?? 'ws-unknown'
  const planetId = planetRow?.id ?? 'pl-unknown'

  const reposCount = Number(
    (db.prepare('SELECT count(*) as c FROM repos').get() as { c: number })?.c ?? 0
  )
  const checkoutsCount = Number(
    (db.prepare('SELECT count(*) as c FROM checkouts WHERE retired_at IS NULL').get() as { c: number })?.c ?? 0
  )
  const filesCount = Number(
    (db.prepare('SELECT count(*) as c FROM files').get() as { c: number })?.c ?? 0
  )
  const symbolsCount = Number(
    (db.prepare('SELECT count(*) as c FROM symbols').get() as { c: number })?.c ?? 0
  )
  const edgesCount = Number(
    (db.prepare('SELECT count(*) as c FROM edges').get() as { c: number })?.c ?? 0
  )

  const checkouts = db
    .prepare('SELECT id, path, dirty_hash, dirty_count FROM checkouts WHERE retired_at IS NULL')
    .all() as unknown as Array<{
    id: string
    path: string
    dirty_hash: string | null
    dirty_count: number
  }>

  let dirtyCheckouts = 0
  let totalDirtyFiles = 0
  let totalUntrackedFiles = 0

  for (const co of checkouts) {
    if (!existsSync(co.path)) continue

    const porcelain = gitText(co.path, ['status', '--porcelain'])
    if (porcelain && porcelain.trim().length > 0) {
      const lines = porcelain.split('\n').filter(Boolean)
      let coDirty = 0
      let coUntracked = 0
      for (const line of lines) {
        if (line.startsWith('??')) {
          coUntracked++
        } else {
          coDirty++
        }
      }
      if (coDirty > 0 || coUntracked > 0) {
        dirtyCheckouts++
        totalDirtyFiles += coDirty
        totalUntrackedFiles += coUntracked
      }
    } else if (co.dirty_hash || co.dirty_count > 0) {
      dirtyCheckouts++
      totalDirtyFiles += co.dirty_count
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
