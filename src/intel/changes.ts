/**
 * Change Detection — Maps Git Diff Hunks to Indexed Symbols and Execution Flows.
 *
 * Requirement M3 §70:
 * "detect_changes: Diff-Hunks werden betroffenen Symbolen und Abläufen zugeordnet,
 * auch für uncommittete Änderungen"
 */
import type { DatabaseSync } from 'node:sqlite'
import { resolve } from 'node:path'
import type { DetectChangesResult, DiffSymbolChange } from './types.ts'
import { gitText } from '../indexer/git.ts'

export interface DetectChangesOptions {
  /** Required authority boundary: a diff may only inspect this workspace. */
  workspaceId: string
  checkoutPath?: string
  checkoutId?: string
  repoId?: string
  diffText?: string
}

interface SelectedCheckout {
  id: string
  repoId: string
  path: string
}

/**
 * `null` means this store has no planet and therefore keeps the legacy plain
 * workspace behavior. A planet with missing/unconfigured selection metadata is
 * deliberately `[]`: historical worktrees must not become a default diff
 * target merely because they still exist on disk.
 */
function selectedCheckouts(db: DatabaseSync, workspaceId: string): SelectedCheckout[] | null {
  const planet = db.prepare('SELECT id FROM planets WHERE workspace_id = ?').get(workspaceId) as
    { id: string } | undefined
  if (planet === undefined) return null
  const tableRows = db.prepare(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN (?, ?)")
    .all('planet_index_selections', 'planet_index_checkout_selections') as
    unknown as Array<{ name: string }>
  const tables = new Set(tableRows.map(row => row.name))
  if (!tables.has('planet_index_selections') || !tables.has('planet_index_checkout_selections')) return []
  return db.prepare(
    `SELECT c.id, c.repo_id AS repoId, c.path
       FROM checkouts c
       JOIN planet_index_selections p ON p.planet_id = c.planet_id
       JOIN planet_index_checkout_selections s
         ON s.planet_id = c.planet_id AND s.checkout_id = c.id
      WHERE c.planet_id = ? AND c.retired_at IS NULL
      ORDER BY c.rel_prefix`).all(planet.id) as unknown as SelectedCheckout[]
}

function activeFileScope(checkoutIds: string[] | null, column = 'checkout_id'):
{ sql: string; params: string[] } {
  if (checkoutIds === null) return { sql: '1 = 1', params: [] }
  if (checkoutIds.length === 0) return { sql: '0 = 1', params: [] }
  return { sql: `${column} IN (${checkoutIds.map(() => '?').join(', ')})`, params: checkoutIds }
}

function noChanges(checkoutId: string | null = null, repoId: string | null = null): DetectChangesResult {
  return {
    checkoutId,
    repoId,
    changedFiles: 0,
    changedSymbols: [],
    affectedFlows: [],
    riskLevel: 'low',
  }
}

interface ParsedFileHunk {
  filePath: string
  isDeleted: boolean
  isNew: boolean
  ranges: Array<{ start: number; end: number }>
}

/**
 * Parses raw git diff text into per-file changed line ranges.
 */
export function parseDiffHunks(diffText: string): ParsedFileHunk[] {
  const lines = diffText.split('\n')
  const results: ParsedFileHunk[] = []
  let currentFile: ParsedFileHunk | null = null

  for (const line of lines) {
    if (line.startsWith('diff --git ')) {
      if (currentFile) results.push(currentFile)
      // Extract b/ path: diff --git a/path b/path
      const parts = line.split(' ')
      let filePath = parts[3] ? parts[3].replace(/^b\//, '') : ''
      currentFile = {
        filePath,
        isDeleted: false,
        isNew: false,
        ranges: [],
      }
    } else if (line.startsWith('deleted file mode ') && currentFile) {
      currentFile.isDeleted = true
    } else if (line.startsWith('new file mode ') && currentFile) {
      currentFile.isNew = true
    } else if (line.startsWith('+++ b/') && currentFile) {
      currentFile.filePath = line.slice('+++ b/'.length).trim()
    } else if (line.startsWith('--- a/') && currentFile && !currentFile.filePath) {
      currentFile.filePath = line.slice('--- a/'.length).trim()
    } else if (line.startsWith('@@ ') && currentFile) {
      // Parse hunk header: @@ -oldStart,oldCount +newStart,newCount @@
      const match = line.match(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/)
      if (match) {
        const newStart = parseInt(match[3], 10)
        const newCount = match[4] !== undefined ? parseInt(match[4], 10) : 1
        const start = newStart
        const end = newStart + Math.max(1, newCount) - 1
        currentFile.ranges.push({ start, end })
      }
    }
  }
  if (currentFile) results.push(currentFile)

  return results
}

/**
 * Detects modified/added/deleted symbols and affected execution flows from git diff.
 */
export function detectChanges(
  db: DatabaseSync,
  options: DetectChangesOptions,
): DetectChangesResult {
  const workspaceId = options.workspaceId?.trim()
  if (!workspaceId) throw new Error('workspaceId is required for change detection')
  const workspace = db.prepare('SELECT id FROM workspaces WHERE id = ?').get(workspaceId) as
    { id: string } | undefined
  if (workspace === undefined) throw new Error(`unknown workspace: ${workspaceId}`)

  let checkoutPath = options.checkoutPath
  let checkoutId = options.checkoutId
  let repoId = options.repoId
  const active = selectedCheckouts(db, workspaceId)

  if (active !== null) {
    // A planet without a persisted vector is deliberately not allowed to pick
    // an arbitrary on-disk checkout. An explicit path/id is not an escape
    // hatch: it must name one of the selected rows.
    if (active.length === 0) return noChanges()
    const candidates = repoId === undefined
      ? active
      : active.filter(checkout => checkout.repoId === repoId)
    if (repoId !== undefined && candidates.length === 0) return noChanges()
    const selected = checkoutId
      ? candidates.find(checkout => checkout.id === checkoutId)
      : checkoutPath
        ? candidates.find(checkout => resolve(checkout.path).toLowerCase() === resolve(checkoutPath!).toLowerCase())
        : undefined
    if ((checkoutId || checkoutPath) && selected === undefined) return noChanges()
    if (selected !== undefined) {
      checkoutId = selected.id
      repoId = selected.repoId
      checkoutPath = selected.path
    }
  }

  if (!checkoutPath && !options.diffText) {
    // The no-argument route is allowed to pick only the first persisted
    // selection. Plain workspaces retain their earlier fallback because they
    // have no Planet checkout inventory at all.
    const checkoutRow = active === null
      ? db.prepare(
        `SELECT c.id, c.repo_id AS repoId, c.path
           FROM checkouts c JOIN planets p ON p.id = c.planet_id
          WHERE p.workspace_id = ? AND c.retired_at IS NULL
          ORDER BY c.rel_prefix LIMIT 1`)
        .get(workspaceId) as { id: string; repoId: string; path: string } | undefined
      : (repoId === undefined ? active[0] : active.find(checkout => checkout.repoId === repoId))
    if (checkoutRow !== undefined) {
      checkoutId = checkoutRow.id
      repoId = checkoutRow.repoId
      checkoutPath = checkoutRow.path
    }
  }

  let diffText = options.diffText
  if (!diffText && checkoutPath) {
    const absPath = resolve(checkoutPath)
    const trackedDiff =
      (gitText(absPath, ['diff', 'HEAD', '--unified=0', '--no-color']) ?? '') ||
      (gitText(absPath, ['diff', '--cached', '--unified=0', '--no-color']) ?? '') +
        (gitText(absPath, ['diff', '--unified=0', '--no-color']) ?? '')
    diffText = trackedDiff
  }

  if (!diffText || !diffText.trim()) return noChanges(checkoutId ?? null, repoId ?? null)

  const parsedHunks = parseDiffHunks(diffText)
  const selectedIds = active === null ? null : active.map(checkout => checkout.id)
  const fileScope = activeFileScope(selectedIds)
  const callerScope = activeFileScope(selectedIds, 'f.checkout_id')
  const changedSymbols: DiffSymbolChange[] = []
  const seenSymbolIds = new Set<number>()
  const affectedFlowsMap = new Map<string, Set<string>>()

  for (const hunk of parsedHunks) {
    const normHunkPath = hunk.filePath.replace(/\\/g, '/').toLowerCase()

    // Find matching file in database
    const fileRow = db
      .prepare(
        `SELECT id, path FROM files
          WHERE workspace_id = ? AND (${fileScope.sql})
            AND (LOWER(path) = ? OR LOWER(path) LIKE ?)
          LIMIT 1`
      )
      .get(workspaceId, ...fileScope.params, normHunkPath, `%/${normHunkPath}`) as
        { id: number; path: string } | undefined

    if (!fileRow) continue

    const symRows = db
      .prepare(
        `SELECT id, name, kind, line, end_line as endLine
           FROM symbols
          WHERE file_id = ?`
      )
      .all(fileRow.id) as unknown as Array<{
      id: number
      name: string
      kind: string
      line: number
      endLine: number | null
    }>

    for (const sym of symRows) {
      const symEnd = sym.endLine ?? sym.line
      // Check if any hunk range overlaps with symbol definition [sym.line, symEnd]
      const overlaps = hunk.ranges.some(r => r.start <= symEnd && r.end >= sym.line)
      if (overlaps && !seenSymbolIds.has(sym.id)) {
        seenSymbolIds.add(sym.id)
        const changeType: 'modified' | 'added' | 'deleted' = hunk.isNew
          ? 'added'
          : hunk.isDeleted
            ? 'deleted'
            : 'modified'
        changedSymbols.push({
          symbolId: sym.id,
          name: sym.name,
          kind: sym.kind,
          file: fileRow.path,
          line: sym.line,
          changeType,
        })

        // Find callers of this changed symbol
        const callers = db
          .prepare(
            `SELECT s.name as caller_name
              FROM edges e
               JOIN symbols s ON e.src_symbol = s.id
               JOIN files f ON f.id = e.src_file
              WHERE e.workspace_id = ? AND e.dst_symbol = ? AND e.kind = 'calls'
                AND ${callerScope.sql}`
          )
          .all(workspaceId, sym.id, ...callerScope.params) as unknown as Array<{ caller_name: string }>

        for (const caller of callers) {
          const flowLabel = `${caller.caller_name} -> ${sym.name}`
          if (!affectedFlowsMap.has(flowLabel)) {
            affectedFlowsMap.set(flowLabel, new Set())
          }
          affectedFlowsMap.get(flowLabel)!.add(sym.name)
        }
      }
    }
  }

  const affectedFlows = Array.from(affectedFlowsMap.entries()).map(([flow, set]) => ({
    flow,
    affectedBy: Array.from(set),
  }))

  let riskLevel: 'low' | 'medium' | 'high' = 'low'
  if (changedSymbols.length > 5 || affectedFlows.length > 3) {
    riskLevel = 'high'
  } else if (changedSymbols.length >= 2 || affectedFlows.length >= 1) {
    riskLevel = 'medium'
  }

  return {
    checkoutId: checkoutId ?? null,
    repoId: repoId ?? null,
    changedFiles: parsedHunks.length,
    changedSymbols,
    affectedFlows,
    riskLevel,
  }
}
