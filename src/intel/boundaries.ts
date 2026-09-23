/** Explicit package entry points, test coverage, and a reviewable impact slice. */
import type { DatabaseSync } from 'node:sqlite'
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
): TestCoverageResult {
  const requested = typeof target === 'string' ? { name: target } : target
  let candidates: Array<{ id: number; name: string; file: string }>
  if (requested.id !== undefined) {
    candidates = db.prepare('SELECT s.id, s.name, f.path AS file FROM symbols s JOIN files f ON f.id = s.file_id WHERE s.id = ?')
      .all(requested.id) as Array<{ id: number; name: string; file: string }>
  } else {
    let sql = 'SELECT s.id, s.name, f.path AS file FROM symbols s JOIN files f ON f.id = s.file_id WHERE s.name = ?'
    const params: unknown[] = [requested.name]
    if (requested.file !== undefined) { sql += ' AND f.path LIKE ?'; params.push(`%${requested.file.replace(/\\/g, '/')}%`) }
    candidates = db.prepare(sql).all(...params) as Array<{ id: number; name: string; file: string }>
  }
  if (candidates.length === 0) return { status: 'not_found', symbol: null, tests: [] }
  if (candidates.length !== 1) return { status: 'ambiguous', symbol: null, tests: [] }
  const symbol = candidates[0]
  const raw = db.prepare(`
    SELECT f.path, src.name AS symbol, e.line, e.kind AS relation
      FROM edges e JOIN files f ON f.id = e.src_file
      LEFT JOIN symbols src ON src.id = e.src_symbol
     WHERE e.dst_symbol = ? AND e.kind IN ('calls', 'references') ORDER BY f.path, e.line
  `).all(symbol.id) as Array<{ path: string; symbol: string | null; line: number; relation: string }>
  return { status: 'found', symbol, tests: raw.filter(row => isTestPath(row.path)) }
}

/** One target, its resolved dependency radius, and the tests that actually reach it. */
export function getImpactSlice(
  db: DatabaseSync, target: string | { name: string; file?: string; id?: number }, options?: BlastRadiusOptions,
): { coverage: TestCoverageResult; impact: ReturnType<typeof getBlastRadius> } {
  const coverage = getTestCoverage(db, target)
  const resolved = coverage.symbol === null
    ? target
    : { name: coverage.symbol.name, id: coverage.symbol.id, file: coverage.symbol.file }
  return { coverage, impact: getBlastRadius(db, resolved, options) }
}
