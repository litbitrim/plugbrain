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
  checkoutPath?: string
  checkoutId?: string
  repoId?: string
  diffText?: string
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
  options?: DetectChangesOptions
): DetectChangesResult {
  let checkoutPath = options?.checkoutPath
  let checkoutId = options?.checkoutId
  let repoId = options?.repoId

  if (!checkoutPath && !options?.diffText) {
    // Look up active checkout from DB
    const checkoutRow = db
      .prepare('SELECT id, repo_id, path FROM checkouts WHERE retired_at IS NULL LIMIT 1')
      .get() as { id: string; repo_id: string; path: string } | undefined
    if (checkoutRow) {
      checkoutId = checkoutRow.id
      repoId = checkoutRow.repo_id
      checkoutPath = checkoutRow.path
    }
  }

  let diffText = options?.diffText
  if (!diffText && checkoutPath) {
    const absPath = resolve(checkoutPath)
    const trackedDiff =
      (gitText(absPath, ['diff', 'HEAD', '--unified=0', '--no-color']) ?? '') ||
      (gitText(absPath, ['diff', '--cached', '--unified=0', '--no-color']) ?? '') +
        (gitText(absPath, ['diff', '--unified=0', '--no-color']) ?? '')
    diffText = trackedDiff
  }

  if (!diffText || !diffText.trim()) {
    return {
      checkoutId: checkoutId ?? null,
      repoId: repoId ?? null,
      changedFiles: 0,
      changedSymbols: [],
      affectedFlows: [],
      riskLevel: 'low',
    }
  }

  const parsedHunks = parseDiffHunks(diffText)
  const changedSymbols: DiffSymbolChange[] = []
  const seenSymbolIds = new Set<number>()
  const affectedFlowsMap = new Map<string, Set<string>>()

  for (const hunk of parsedHunks) {
    const normHunkPath = hunk.filePath.replace(/\\/g, '/').toLowerCase()

    // Find matching file in database
    const fileRow = db
      .prepare(
        `SELECT id, path FROM files
          WHERE LOWER(path) = ? OR LOWER(path) LIKE ?
          LIMIT 1`
      )
      .get(normHunkPath, `%/${normHunkPath}`) as { id: number; path: string } | undefined

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
              WHERE e.dst_symbol = ? AND e.kind = 'calls'`
          )
          .all(sym.id) as unknown as Array<{ caller_name: string }>

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
