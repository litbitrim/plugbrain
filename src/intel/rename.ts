/** Read-only, graph-backed symbol rename preview for agents. */
import type { DatabaseSync } from 'node:sqlite'

export interface RenamePreviewOptions {
  symbolId?: number
  name?: string
  repoId?: string
  checkoutId?: string
  workspaceId?: string
}

export interface RenamePreview {
  status: 'ready' | 'not_found' | 'ambiguous'
  target: { id: number; name: string; kind: string; path: string; line: number } | null
  newName: string
  edits: Array<{
    kind: 'declaration' | 'reference'
    path: string
    line: number
    replacement: string
    confidence: 'high' | 'medium'
  }>
  unresolvedReferences: Array<{ path: string; line: number; rawTarget: string | null }>
  requiresManualReview: boolean
}

/**
 * Plans no file mutations.  Resolved graph edges become candidate references;
 * unresolved raw targets are exposed to the caller instead of guessed at.
 */
export function previewRename(
  db: DatabaseSync,
  newName: string,
  options: RenamePreviewOptions,
): RenamePreview {
  const cleanName = newName.trim()
  if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(cleanName)) {
    throw new Error('newName must be a valid identifier')
  }
  if (options.symbolId === undefined && !options.name?.trim()) {
    throw new Error('symbolId or name is required')
  }

  let sql = `SELECT s.id, s.name, s.kind, s.line, f.path, f.repo_id AS repoId, f.checkout_id AS checkoutId
      FROM symbols s JOIN files f ON f.id = s.file_id WHERE 1 = 1`
  const params: unknown[] = []
  if (options.workspaceId) {
    sql += ' AND f.workspace_id = ?'
    params.push(options.workspaceId)
  }
  if (options.symbolId !== undefined) {
    sql += ' AND s.id = ?'
    params.push(options.symbolId)
  } else {
    sql += ' AND s.name = ?'
    params.push(options.name!.trim())
  }
  if (options.repoId) {
    sql += ' AND f.repo_id = ?'
    params.push(options.repoId)
  }
  if (options.checkoutId) {
    sql += ' AND f.checkout_id = ?'
    params.push(options.checkoutId)
  }
  const candidates = db.prepare(sql + ' ORDER BY s.id LIMIT 51').all(...params) as Array<{
    id: number; name: string; kind: string; line: number; path: string; repoId: string | null; checkoutId: string | null
  }>
  if (candidates.length === 0) {
    return { status: 'not_found', target: null, newName: cleanName, edits: [], unresolvedReferences: [], requiresManualReview: true }
  }
  if (candidates.length > 1) {
    return { status: 'ambiguous', target: null, newName: cleanName, edits: [], unresolvedReferences: [], requiresManualReview: true }
  }

  const target = candidates[0]
  const refs = db.prepare(
    `SELECT e.kind, e.line, f.path
       FROM edges e JOIN files f ON f.id = e.src_file
      WHERE e.dst_symbol = ? AND e.kind IN ('calls', 'references', 'imports')
      ORDER BY f.path, e.line, e.id`,
  ).all(target.id) as Array<{ kind: string; line: number | null; path: string }>
  const unresolved = db.prepare(
    `SELECT f.path, e.line, e.raw_target AS rawTarget
       FROM edges e JOIN files f ON f.id = e.src_file
      WHERE e.workspace_id = (SELECT workspace_id FROM files WHERE id = ?)
        AND e.dst_symbol IS NULL AND e.raw_target = ?
      ORDER BY f.path, e.line, e.id`,
  ).all(target.id, target.name) as Array<{ path: string; line: number | null; rawTarget: string | null }>

  return {
    status: 'ready',
    target: { id: target.id, name: target.name, kind: target.kind, path: target.path, line: target.line },
    newName: cleanName,
    edits: [
      { kind: 'declaration', path: target.path, line: target.line, replacement: cleanName, confidence: 'high' },
      ...refs.filter(ref => ref.line !== null).map(ref => ({
        kind: 'reference' as const,
        path: ref.path,
        line: Number(ref.line),
        replacement: cleanName,
        confidence: ref.kind === 'references' || ref.kind === 'imports' ? 'high' as const : 'medium' as const,
      })),
    ],
    unresolvedReferences: unresolved.filter(ref => ref.line !== null).map(ref => ({
      path: ref.path, line: Number(ref.line), rawTarget: ref.rawTarget,
    })),
    requiresManualReview: true,
  }
}
