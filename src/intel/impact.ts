/**
 * Blast Radius / Impact Analysis.
 *
 * Requirement M3 §69:
 * "impact: Blast-Radius nach oben und unten mit Tiefe"
 */
import type { DatabaseSync, SQLInputValue } from 'node:sqlite'
import type { BlastRadiusResult, ImpactNode } from './types.ts'
import { activePlanetFileScope } from '../planet.ts'

export interface BlastRadiusOptions {
  workspaceId?: string
  direction?: 'upstream' | 'downstream' | 'both'
  maxDepth?: number
  repoId?: string
  checkoutId?: string
  file?: string
}

/**
 * Computes the blast radius (impact graph) for a target symbol.
 */
export function getBlastRadius(
  db: DatabaseSync,
  targetInput: string | { name: string; file?: string; id?: number },
  options?: BlastRadiusOptions
): BlastRadiusResult {
  const targetName = typeof targetInput === 'string' ? targetInput : targetInput.name
  const targetFile = typeof targetInput === 'object' ? targetInput.file : options?.file
  const targetId = typeof targetInput === 'object' ? targetInput.id : undefined

  const direction = options?.direction ?? 'both'
  const maxDepth = Math.max(1, Math.min(5, options?.maxDepth ?? 3))
  const fileScope = options?.workspaceId
    ? activePlanetFileScope(db, options.workspaceId, 'f.checkout_id', 'f.path')
    : null
  const scopeSql = fileScope === null ? '' : ` AND f.workspace_id = ? AND ${fileScope.sql}`
  const scopeParams: SQLInputValue[] = options?.workspaceId
    ? [options.workspaceId, ...fileScope!.params] : []
  const targetCheckoutSql = options?.checkoutId ? ' AND f.checkout_id = ?' : ''
  const targetCheckoutParams: SQLInputValue[] = options?.checkoutId ? [options.checkoutId] : []

  // Find initial symbol
  let initialSymbol: { id: number; name: string; file: string; fileId: number } | null = null

  if (targetId !== undefined) {
    const row = db
      .prepare(
        `SELECT s.id, s.name, f.path as file, f.id as fileId
           FROM symbols s JOIN files f ON s.file_id = f.id
          WHERE s.id = ?${scopeSql}${targetCheckoutSql}${options?.repoId ? ' AND f.repo_id = ?' : ''}`
      )
      .get(targetId, ...scopeParams, ...targetCheckoutParams, ...(options?.repoId ? [options.repoId] : [])) as { id: number; name: string; file: string; fileId: number } | undefined
    if (row) initialSymbol = row
  }

  if (!initialSymbol && targetId === undefined) {
    let sql = `SELECT s.id, s.name, f.path as file, f.id as fileId
                 FROM symbols s JOIN files f ON s.file_id = f.id
                WHERE s.name = ?`
    const params: SQLInputValue[] = [targetName]
    sql += scopeSql
    params.push(...scopeParams)
    sql += targetCheckoutSql
    params.push(...targetCheckoutParams)
    if (targetFile) {
      sql += ' AND f.path LIKE ?'
      params.push(`%${targetFile.replace(/\\/g, '/')}%`)
    }
    if (options?.repoId) {
      sql += ' AND f.repo_id = ?'
      params.push(options.repoId)
    }
    sql += ' ORDER BY s.id ASC LIMIT 51'
    const rows = db.prepare(sql).all(...params) as Array<{ id: number; name: string; file: string; fileId: number }>
    if (rows.length > 1) {
      return {
        status: 'ambiguous',
        candidates: rows.map(row => ({ id: row.id, file: row.file })),
        target: { name: targetName }, direction, maxDepth,
        totalImpacted: 0, nodes: {}, risk: 'low',
      }
    }
    if (rows[0]) initialSymbol = rows[0]
  }

  if (!initialSymbol) {
    return {
      status: 'not_found',
      target: { name: targetName },
      direction,
      maxDepth,
      totalImpacted: 0,
      nodes: {},
      risk: 'low',
    }
  }

  const visited = new Set<number>([initialSymbol.id])
  const nodesByDepth: Record<number, ImpactNode[]> = {}
  let currentLevelIds = [initialSymbol.id]
  const impactedRepos = new Set<string>()
  const upstreamSymbolFileDepth = new Map<number, number>()
  const shadowedExport = db.prepare(
    'SELECT 1 FROM symbols WHERE file_id = ? AND name = ? AND exported = 1 LIMIT 1'
  )
  // An import binding proves symbol impact only for a unique exported symbol.
  const exported = db.prepare(
    'SELECT id FROM symbols WHERE file_id = ? AND name = ? AND exported = 1 LIMIT 2'
  ).all(initialSymbol.fileId, initialSymbol.name) as Array<{ id: number }>
  type ImportTarget = { fileId: number; name: string }
  let importFrontier: ImportTarget[] = exported.length === 1 && exported[0].id === initialSymbol.id
    ? [{ fileId: initialSymbol.fileId, name: initialSymbol.name }] : []
  const seenImportTargets = new Set(importFrontier.map(target => `${target.fileId}:${target.name}`))

  for (let d = 1; d <= maxDepth && (currentLevelIds.length > 0 || importFrontier.length > 0); d++) {
    const nextLevelNodes: ImpactNode[] = []
    const nextImportFrontier: ImportTarget[] = []
    const placeholders = currentLevelIds.length > 0 ? currentLevelIds.map(() => '?').join(',') : 'NULL'
    const confidence = Math.round(0.9 * Math.pow(0.85, d - 1) * 100) / 100

    if (direction === 'upstream' || direction === 'both') {
      const upstreamSql = `
        SELECT DISTINCT s.id, s.name, s.kind, f.id as fileId, f.path as file,
                        f.repo_id as repoId, f.checkout_id as checkoutId,
                        e.kind as relationType
          FROM edges e
          JOIN symbols s ON e.src_symbol = s.id
          JOIN files f ON s.file_id = f.id
         WHERE e.dst_symbol IN (${placeholders})
           AND e.src_symbol IS NOT NULL
           ${options?.workspaceId ? 'AND e.workspace_id = ?' : ''}
           ${scopeSql}
      `
      const rows = db.prepare(upstreamSql).all(...currentLevelIds, ...(options?.workspaceId ? [options.workspaceId] : []), ...scopeParams) as unknown as Array<{
        id: number
        name: string
        kind: string
        fileId: number
        file: string
        repoId: string | null
        checkoutId: string | null
        relationType: string
      }>

      for (const r of rows) {
        if (!visited.has(r.id)) {
          visited.add(r.id)
          if (!upstreamSymbolFileDepth.has(r.fileId)) upstreamSymbolFileDepth.set(r.fileId, d)
          if (r.repoId) impactedRepos.add(r.repoId)
          nextLevelNodes.push({
            depth: d,
            id: r.id,
            name: r.name,
            kind: r.kind,
            file: r.file,
            repoId: r.repoId,
            checkoutId: r.checkoutId,
            relationType: r.relationType,
            confidence,
          })
        }
      }

      // Fallback on level 1: check unresolved call edges by their raw target.
      if (d === 1) {
        try {
          const rawSql = `
            SELECT DISTINCT s.id, s.name, s.kind, f.id as fileId, f.path as file,
                            f.repo_id as repoId, f.checkout_id as checkoutId,
                            e.kind as relationType
              FROM edges e
              JOIN symbols s ON e.src_symbol = s.id
              JOIN files f ON s.file_id = f.id
             WHERE e.raw_target = ?
               AND e.src_symbol IS NOT NULL
               ${options?.workspaceId ? 'AND e.workspace_id = ?' : ''}
               ${scopeSql}
             LIMIT 50
          `
          const rawRows = db.prepare(rawSql).all(initialSymbol.name, ...(options?.workspaceId ? [options.workspaceId] : []), ...scopeParams) as typeof rows
          for (const r of rawRows) {
            if (!visited.has(r.id)) {
              visited.add(r.id)
              if (!upstreamSymbolFileDepth.has(r.fileId)) upstreamSymbolFileDepth.set(r.fileId, d)
              if (r.repoId) impactedRepos.add(r.repoId)
              nextLevelNodes.push({
                depth: d,
                id: r.id,
                name: r.name,
                kind: r.kind,
                file: r.file,
                repoId: r.repoId,
                checkoutId: r.checkoutId,
                relationType: r.relationType,
                confidence: confidence * 0.9,
              })
            }
          }

        } catch {}
      }

      // Follow named bindings and explicit star re-exports through resolved
      // file edges. Plain namespace/default imports cannot identify a symbol.
      for (const target of importFrontier) {
        const importSql = `
          SELECT DISTINCT -f.id as id, f.id as fileId,
                          f.path as name, 'file' as kind, f.path as file,
                          f.repo_id as repoId, f.checkout_id as checkoutId,
                          fi.local_name as localName, fi.imported_name as importedName
            FROM file_imports fi
            JOIN files f ON fi.file_id = f.id
            JOIN edges e ON e.workspace_id = fi.workspace_id
                        AND e.kind = 'imports' AND e.resolved = 1
                        AND e.src_file = fi.file_id AND e.raw_target = fi.specifier
                        AND e.dst_file = ?
           WHERE (fi.imported_name = ? OR (fi.local_name = '*' AND fi.imported_name = '*'))
             AND f.id != ?
             ${options?.workspaceId ? 'AND fi.workspace_id = ?' : ''}
             ${scopeSql}
           LIMIT 50
        `
        const importRows = db.prepare(importSql).all(
          target.fileId, target.name, target.fileId,
          ...(options?.workspaceId ? [options.workspaceId] : []), ...scopeParams,
        ) as Array<{
          id: number; fileId: number; name: string; kind: string; file: string
          repoId: string | null; checkoutId: string | null
          localName: string | null; importedName: string | null
        }>
        for (const r of importRows) {
          const starReexport = r.localName === '*' && r.importedName === '*'
          if (starReexport && shadowedExport.get(r.fileId, target.name)) continue
          if (starReexport) {
            const key = `${r.fileId}:${target.name}`
            if (!seenImportTargets.has(key)) {
              seenImportTargets.add(key)
              nextImportFrontier.push({ fileId: r.fileId, name: target.name })
            }
          }
          if (visited.has(r.id)) continue
          visited.add(r.id)
          if (r.repoId) impactedRepos.add(r.repoId)
          nextLevelNodes.push({
            depth: d,
            id: r.id,
            name: r.name,
            kind: r.kind,
            file: r.file,
            repoId: r.repoId,
            checkoutId: r.checkoutId,
            relationType: 'imports',
            confidence: confidence * 0.8,
          })
        }
      }
    }

    if (direction === 'downstream' || direction === 'both') {
      const downstreamSql = `
        SELECT DISTINCT s.id, s.name, s.kind, f.id as fileId, f.path as file,
                        f.repo_id as repoId, f.checkout_id as checkoutId,
                        e.kind as relationType
          FROM edges e
          JOIN symbols s ON e.dst_symbol = s.id
          JOIN files f ON s.file_id = f.id
         WHERE e.src_symbol IN (${placeholders})
           AND e.dst_symbol IS NOT NULL
           ${options?.workspaceId ? 'AND e.workspace_id = ?' : ''}
           ${scopeSql}
      `
      const rows = db.prepare(downstreamSql).all(...currentLevelIds, ...(options?.workspaceId ? [options.workspaceId] : []), ...scopeParams) as unknown as Array<{
        id: number
        name: string
        kind: string
        fileId: number
        file: string
        repoId: string | null
        checkoutId: string | null
        relationType: string
      }>

      for (const r of rows) {
        if (!visited.has(r.id)) {
          visited.add(r.id)
          if (r.repoId) impactedRepos.add(r.repoId)
          nextLevelNodes.push({
            depth: d,
            id: r.id,
            name: r.name,
            kind: r.kind,
            file: r.file,
            repoId: r.repoId,
            checkoutId: r.checkoutId,
            relationType: r.relationType,
            confidence,
          })
        }
      }
    }

    nodesByDepth[d] = nextLevelNodes
    currentLevelIds = nextLevelNodes.filter(node => node.id > 0).map(node => node.id)
    importFrontier = nextImportFrontier
  }

  // Prefer a proven upstream caller at the same or earlier depth. Keep an
  // earlier direct import, and never hide an upstream import for a downstream
  // callee in the same file.
  for (const [depth, list] of Object.entries(nodesByDepth)) {
    nodesByDepth[Number(depth)] = list.filter(node =>
      node.kind !== 'file' || (upstreamSymbolFileDepth.get(-node.id) ?? Infinity) > node.depth)
  }

  let totalImpacted = 0
  for (const list of Object.values(nodesByDepth)) {
    totalImpacted += list.length
  }

  let risk: 'low' | 'medium' | 'high' = 'low'
  if (totalImpacted > 8 || impactedRepos.size > 1) {
    risk = 'high'
  } else if (totalImpacted >= 3) {
    risk = 'medium'
  }

  return {
    status: 'found',
    target: {
      name: initialSymbol.name,
      file: initialSymbol.file,
      id: initialSymbol.id,
    },
    direction,
    maxDepth,
    totalImpacted,
    nodes: nodesByDepth,
    risk,
  }
}
