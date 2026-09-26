/** Explicit package entry points, test coverage, and a reviewable impact slice. */
import type { DatabaseSync, SQLInputValue } from 'node:sqlite'
import { PackageResolver } from '../indexer/packages.ts'
import { getBlastRadius, type BlastRadiusOptions } from './impact.ts'

export interface PackageEntryPoint {
  packageName: string
  path: string
  symbols: Array<{ id: number; name: string; kind: string; line: number }>
}

export interface TestCoverageResult {
  status: 'found' | 'not_found' | 'ambiguous'
  symbol: { id: number; name: string; file: string } | null
  tests: Array<{ path: string; symbol: string | null; line: number; relation: string }>
}

export interface TestCoverageOptions {
  /** A route that already chose a workspace must never resolve its target in another Planet. */
  workspaceId?: string
}

const isTestPath = (path: string): boolean =>
  /(?:^|\/)(?:test|tests|__tests__)(?:\/|$)|\.(?:test|spec)\.[cm]?[jt]sx?$/i.test(path)

export function getPackageEntryPoints(db: DatabaseSync, workspaceId: string): PackageEntryPoint[] {
  const workspace = db.prepare('SELECT root FROM workspaces WHERE id = ?').get(workspaceId) as { root: string } | undefined
  if (workspace === undefined) return []
  const files = db.prepare('SELECT id, path FROM files WHERE workspace_id = ?').all(workspaceId) as Array<{ id: number; path: string }>
  const ids = new Map(files.map(file => [file.path, file.id]))
  const resolver = new PackageResolver(workspace.root, new Set(ids.keys()))
  return resolver.entries().map(entry => ({
    ...entry,
    symbols: (db.prepare('SELECT id, name, kind, line FROM symbols WHERE file_id = ? AND exported = 1 ORDER BY line')
      .all(ids.get(entry.path)) as Array<{ id: number; name: string; kind: string; line: number }>),
  }))
}

export function getTestCoverage(
  db: DatabaseSync, target: string | { name: string; file?: string; id?: number },
  options: TestCoverageOptions = {},
): TestCoverageResult {
  const requested = typeof target === 'string' ? { name: target } : target
  let candidates: Array<{ id: number; name: string; file: string; fileId: number }>
  if (requested.id !== undefined) {
    candidates = db.prepare(`SELECT s.id, s.name, f.path AS file, f.id AS fileId
      FROM symbols s JOIN files f ON f.id = s.file_id
      WHERE s.id = ?${options.workspaceId === undefined ? '' : ' AND f.workspace_id = ?'}`)
      .all(requested.id, ...(options.workspaceId === undefined ? [] : [options.workspaceId])) as
      Array<{ id: number; name: string; file: string; fileId: number }>
  } else {
    let sql = 'SELECT s.id, s.name, f.path AS file, f.id AS fileId FROM symbols s JOIN files f ON f.id = s.file_id WHERE s.name = ?'
    const params: SQLInputValue[] = [requested.name]
    if (options.workspaceId !== undefined) { sql += ' AND f.workspace_id = ?'; params.push(options.workspaceId) }
    if (requested.file !== undefined) { sql += ' AND f.path LIKE ?'; params.push(`%${requested.file.replace(/\\/g, '/')}%`) }
    candidates = db.prepare(sql).all(...params) as Array<{ id: number; name: string; file: string; fileId: number }>
  }
  if (candidates.length === 0) return { status: 'not_found', symbol: null, tests: [] }
  if (candidates.length !== 1) return { status: 'ambiguous', symbol: null, tests: [] }
  const symbol = candidates[0]
  const direct = db.prepare(`
    SELECT f.path, src.name AS symbol, e.line, e.kind AS relation
      FROM edges e JOIN files f ON f.id = e.src_file
      LEFT JOIN symbols src ON src.id = e.src_symbol
     WHERE e.dst_symbol = ? AND e.kind IN ('calls', 'references')
       ${options.workspaceId === undefined ? '' : 'AND e.workspace_id = ?'}
     ORDER BY f.path, e.line
  `).all(symbol.id, ...(options.workspaceId === undefined ? [] : [options.workspaceId])) as
    Array<{ path: string; symbol: string | null; line: number; relation: string }>
  const directTests = direct.filter(row => isTestPath(row.path))
  const directPaths = new Set(directTests.map(row => row.path))
  // A test that imports the target module but does not emit a resolvable call
  // is useful review context, but not evidence that it invokes this symbol.
  // It is deliberately labelled separately so a caller cannot mistake a
  // module-level candidate for direct coverage.
  const moduleImports = db.prepare(`
    SELECT f.path, NULL AS symbol, e.line, 'module_import' AS relation
      FROM edges e JOIN files f ON f.id = e.src_file
     WHERE e.dst_file = ? AND e.kind = 'imports'
       ${options.workspaceId === undefined ? '' : 'AND e.workspace_id = ?'}
     ORDER BY f.path, e.line
  `).all(symbol.fileId, ...(options.workspaceId === undefined ? [] : [options.workspaceId])) as
    Array<{ path: string; symbol: string | null; line: number; relation: string }>
  const tests = [...directTests, ...moduleImports.filter(row => isTestPath(row.path) && !directPaths.has(row.path))]
    .sort((left, right) => left.path.localeCompare(right.path) || left.line - right.line)
  return { status: 'found', symbol: { id: symbol.id, name: symbol.name, file: symbol.file }, tests }
}

/** One target, its resolved dependency radius, and the tests that actually reach it. */
export function getImpactSlice(
  db: DatabaseSync, target: string | { name: string; file?: string; id?: number }, options?: BlastRadiusOptions,
): { coverage: TestCoverageResult; impact: ReturnType<typeof getBlastRadius> } {
  const coverage = getTestCoverage(db, target, { workspaceId: options?.workspaceId })
  const resolved = coverage.symbol === null
    ? target
    : { name: coverage.symbol.name, id: coverage.symbol.id, file: coverage.symbol.file }
  return { coverage, impact: getBlastRadius(db, resolved, options) }
}
