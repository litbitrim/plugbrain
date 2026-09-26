/**
 * Symbol Context (360-degree view) — Callers, Callees, References, Execution Flows.
 *
 * Requirement M3 §68:
 * "context: Aufrufer, Aufgerufene und Abläufe eines Symbols"
 */
import type { DatabaseSync, SQLInputValue } from 'node:sqlite'
import { basename } from 'node:path'
import type {
  ExecutionFlow,
  IntelSymbol,
  SymbolCall,
  SymbolContextResult,
} from './types.ts'
import { annotateSymbolVendor } from './vendor.ts'

export interface SymbolContextOptions {
  workspaceId?: string
  repoId?: string
  checkoutId?: string
  file?: string
}

function extractRepoPrefix(filePath: string): string {
  const norm = filePath.replace(/\\/g, '/')
  const match = norm.match(/^(?:code\/)?([^/]+)/i)
  return match ? match[1].toLowerCase() : ''
}

function isSameCommunity(fileA?: string, fileB?: string): boolean {
  if (!fileA || !fileB) return true
  return extractRepoPrefix(fileA) === extractRepoPrefix(fileB)
}

/**
 * Retrieves the 360-degree context of a code symbol.
 */
export function getSymbolContext(
  db: DatabaseSync,
  name: string,
  options?: SymbolContextOptions
): SymbolContextResult {
  let sql = `
    SELECT s.id, s.name, s.kind, f.path as file, s.line, s.end_line as endLine,
           s.exported, s.container, f.repo_id as repoId, f.checkout_id as checkoutId
      FROM symbols s
      JOIN files f ON s.file_id = f.id
     WHERE s.name = ?
  `
  const params: SQLInputValue[] = [name]
  if (options?.workspaceId) {
    sql += ' AND f.workspace_id = ?'
    params.push(options.workspaceId)
  }

  if (options?.repoId) {
    sql += ' AND f.repo_id = ?'
    params.push(options.repoId)
  }
  if (options?.checkoutId) {
    sql += ' AND f.checkout_id = ?'
    params.push(options.checkoutId)
  }
  if (options?.file) {
    sql += ' AND f.path LIKE ?'
    params.push(`%${options.file.replace(/\\/g, '/')}%`)
  }

  sql += ' ORDER BY s.id ASC LIMIT 50'

  const rawCandidates = db.prepare(sql).all(...params) as unknown as Array<{
    id: number
    name: string
    kind: string
    file: string
    line: number
    endLine: number | null
    exported: number
    container: string | null
    repoId: string | null
    checkoutId: string | null
  }>

  if (rawCandidates.length === 0) {
    return {
      status: 'not_found',
      symbol: null,
      incoming: { calls: [], references: [] },
      outgoing: { calls: [], references: [] },
      processes: [],
    }
  }

  const candidates: IntelSymbol[] = rawCandidates.map(c =>
    annotateSymbolVendor({
      id: c.id,
      name: c.name,
      kind: c.kind,
      file: c.file,
      line: c.line,
      endLine: c.endLine,
      exported: Boolean(c.exported),
      container: c.container,
      repoId: c.repoId,
      checkoutId: c.checkoutId,
    })
  )

  // If ambiguous across distinct files without file option
  if (candidates.length > 1 && !options?.file) {
    const distinctFiles = new Set(candidates.map(c => c.file))
    if (distinctFiles.size > 1) {
      return {
        status: 'ambiguous',
        candidates,
        symbol: null,
        incoming: { calls: [], references: [] },
        outgoing: { calls: [], references: [] },
        processes: [],
      }
    }
  }

  const target = candidates[0]

  // Incoming calls (dst_symbol = target.id, kind = 'calls')
  const incomingCallsRows = db
    .prepare(
      `
      SELECT e.id as edge_id, e.src_symbol, e.src_file, e.line, e.raw_target,
             s.name as sym_name, s.kind as sym_kind, f.path as file_path
        FROM edges e
        LEFT JOIN symbols s ON e.src_symbol = s.id
        LEFT JOIN files f ON (s.file_id = f.id OR e.src_file = f.id)
       WHERE e.dst_symbol = ? AND e.kind = 'calls'
       ORDER BY e.id ASC
    `
    )
    .all(target.id) as unknown as Array<{
    edge_id: number
    src_symbol: number | null
    src_file: number | null
    line: number
    raw_target: string | null
    sym_name: string | null
    sym_kind: string | null
    file_path: string | null
  }>

  const incomingCalls: SymbolCall[] = incomingCallsRows.map(r => ({
    id: r.src_symbol,
    name: r.sym_name ?? (r.file_path ? basename(r.file_path) : 'unknown'),
    kind: r.sym_kind ?? 'file',
    file: r.file_path ?? '',
    line: r.line,
    rawTarget: r.raw_target,
  }))

  // Incoming references (dst_symbol = target.id, kind IN ('references', 'imports'))
  const incomingRefRows = db
    .prepare(
      `
      SELECT e.id as edge_id, e.src_symbol, e.src_file, e.line, e.raw_target,
             s.name as sym_name, s.kind as sym_kind, f.path as file_path
        FROM edges e
        LEFT JOIN symbols s ON e.src_symbol = s.id
        LEFT JOIN files f ON (s.file_id = f.id OR e.src_file = f.id)
       WHERE e.dst_symbol = ? AND e.kind IN ('references', 'imports')
       ORDER BY e.id ASC
    `
    )
    .all(target.id) as unknown as Array<{
    edge_id: number
    src_symbol: number | null
    src_file: number | null
    line: number
    raw_target: string | null
    sym_name: string | null
    sym_kind: string | null
    file_path: string | null
  }>

  const incomingRefs: SymbolCall[] = incomingRefRows.map(r => ({
    id: r.src_symbol,
    name: r.sym_name ?? (r.file_path ? basename(r.file_path) : 'unknown'),
    kind: r.sym_kind ?? 'reference',
    file: r.file_path ?? '',
    line: r.line,
    rawTarget: r.raw_target,
  }))

  // Outgoing calls (src_symbol = target.id, kind = 'calls')
  const outgoingCallsRows = db
    .prepare(
      `
      SELECT e.id as edge_id, e.dst_symbol, e.dst_file, e.line, e.raw_target,
             s.name as sym_name, s.kind as sym_kind, f.path as file_path
        FROM edges e
        LEFT JOIN symbols s ON e.dst_symbol = s.id
        LEFT JOIN files f ON (s.file_id = f.id OR e.dst_file = f.id)
       WHERE e.src_symbol = ? AND e.kind = 'calls'
       ORDER BY e.id ASC
    `
    )
    .all(target.id) as unknown as Array<{
    edge_id: number
    dst_symbol: number | null
    dst_file: number | null
    line: number
    raw_target: string | null
    sym_name: string | null
    sym_kind: string | null
    file_path: string | null
  }>

  const outgoingCalls: SymbolCall[] = outgoingCallsRows.map(r => ({
    id: r.dst_symbol,
    name: r.sym_name ?? r.raw_target ?? 'unknown',
    kind: r.sym_kind ?? 'call',
    file: r.file_path ?? '',
    line: r.line,
    rawTarget: r.raw_target,
  }))

  // Outgoing references (src_symbol = target.id, kind IN ('references', 'imports'))
  const outgoingRefRows = db
    .prepare(
      `
      SELECT e.id as edge_id, e.dst_symbol, e.dst_file, e.line, e.raw_target,
             s.name as sym_name, s.kind as sym_kind, f.path as file_path
        FROM edges e
        LEFT JOIN symbols s ON e.dst_symbol = s.id
        LEFT JOIN files f ON (s.file_id = f.id OR e.dst_file = f.id)
       WHERE e.src_symbol = ? AND e.kind IN ('references', 'imports')
       ORDER BY e.id ASC
    `
    )
    .all(target.id) as unknown as Array<{
    edge_id: number
    dst_symbol: number | null
    dst_file: number | null
    line: number
    raw_target: string | null
    sym_name: string | null
    sym_kind: string | null
    file_path: string | null
  }>

  const outgoingRefs: SymbolCall[] = outgoingRefRows.map(r => ({
    id: r.dst_symbol,
    name: r.sym_name ?? r.raw_target ?? 'unknown',
    kind: r.sym_kind ?? 'reference',
    file: r.file_path ?? '',
    line: r.line,
    rawTarget: r.raw_target,
  }))

  // Build execution flows
  const processes: ExecutionFlow[] = []
  let flowIndex = 1

  if (incomingCalls.length > 0 && outgoingCalls.length > 0) {
    for (const caller of incomingCalls.slice(0, 3)) {
      for (const callee of outgoingCalls.slice(0, 2)) {
        const isCross =
          !isSameCommunity(caller.file, target.file) ||
          !isSameCommunity(target.file, callee.file)
        processes.push({
          id: `flow-${flowIndex++}`,
          label: `${caller.name} -> ${target.name} -> ${callee.name}`,
          processType: isCross ? 'cross_community' : 'intra_community',
          stepCount: 3,
          steps: [
            { step: 1, symbolName: caller.name, file: caller.file, kind: caller.kind },
            { step: 2, symbolName: target.name, file: target.file, kind: target.kind },
            { step: 3, symbolName: callee.name, file: callee.file, kind: callee.kind },
          ],
        })
      }
    }
  } else if (incomingCalls.length > 0) {
    for (const caller of incomingCalls.slice(0, 3)) {
      const isCross = !isSameCommunity(caller.file, target.file)
      processes.push({
        id: `flow-${flowIndex++}`,
        label: `${caller.name} -> ${target.name}`,
        processType: isCross ? 'cross_community' : 'intra_community',
        stepCount: 2,
        steps: [
          { step: 1, symbolName: caller.name, file: caller.file, kind: caller.kind },
          { step: 2, symbolName: target.name, file: target.file, kind: target.kind },
        ],
      })
    }
  } else if (outgoingCalls.length > 0) {
    for (const callee of outgoingCalls.slice(0, 3)) {
      const isCross = !isSameCommunity(target.file, callee.file)
      processes.push({
        id: `flow-${flowIndex++}`,
        label: `${target.name} -> ${callee.name}`,
        processType: isCross ? 'cross_community' : 'intra_community',
        stepCount: 2,
        steps: [
          { step: 1, symbolName: target.name, file: target.file, kind: target.kind },
          { step: 2, symbolName: callee.name, file: callee.file, kind: callee.kind },
        ],
      })
    }
  }

  return {
    status: 'found',
    symbol: target,
    incoming: {
      calls: incomingCalls,
      references: incomingRefs,
    },
    outgoing: {
      calls: outgoingCalls,
      references: outgoingRefs,
    },
    processes,
  }
}
