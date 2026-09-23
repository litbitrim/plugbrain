/**
 * Blast Radius / Impact Analysis.
 *
 * Requirement M3 §69:
 * "impact: Blast-Radius nach oben und unten mit Tiefe"
 */
import type { DatabaseSync } from 'node:sqlite'
import type { BlastRadiusResult, ImpactNode } from './types.ts'

export interface BlastRadiusOptions {
  workspaceId?: string
  direction?: 'upstream' | 'downstream' | 'both'
  maxDepth?: number
  repoId?: string
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

  // Find initial symbol
  let initialSymbol: { id: number; name: string; file: string } | null = null

  if (targetId !== undefined) {
    const row = db
      .prepare(
        `SELECT s.id, s.name, f.path as file
           FROM symbols s JOIN files f ON s.file_id = f.id
          WHERE s.id = ?${options?.workspaceId ? ' AND f.workspace_id = ?' : ''}`
      )
      .get(targetId, ...(options?.workspaceId ? [options.workspaceId] : [])) as { id: number; name: string; file: string } | undefined
    if (row) initialSymbol = row
  }

  if (!initialSymbol) {
    let sql = `SELECT s.id, s.name, f.path as file
                 FROM symbols s JOIN files f ON s.file_id = f.id
                WHERE s.name = ?`
    const params: unknown[] = [targetName]
    if (options?.workspaceId) { sql += ' AND f.workspace_id = ?'; params.push(options.workspaceId) }
    if (targetFile) {
      sql += ' AND f.path LIKE ?'
      params.push(`%${targetFile.replace(/\\/g, '/')}%`)
    }
    if (options?.repoId) {
      sql += ' AND f.repo_id = ?'
      params.push(options.repoId)
    }
    sql += ' ORDER BY s.id ASC LIMIT 1'
    const row = db.prepare(sql).get(...params) as
      | { id: number; name: string; file: string }
      | undefined
    if (row) initialSymbol = row
  }

  if (!initialSymbol) {
    return {
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

  for (let d = 1; d <= maxDepth && currentLevelIds.length > 0; d++) {
    const nextLevelNodes: ImpactNode[] = []
    const placeholders = currentLevelIds.map(() => '?').join(',')
    const confidence = Math.round(0.9 * Math.pow(0.85, d - 1) * 100) / 100

    if (direction === 'upstream' || direction === 'both') {
      const upstreamSql = `
        SELECT DISTINCT s.id, s.name, s.kind, f.path as file,
                        f.repo_id as repoId, f.checkout_id as checkoutId,
                        e.kind as relationType
          FROM edges e
          JOIN symbols s ON e.src_symbol = s.id
          JOIN files f ON s.file_id = f.id
         WHERE e.dst_symbol IN (${placeholders})
           AND e.src_symbol IS NOT NULL
           ${options?.workspaceId ? 'AND e.workspace_id = ?' : ''}
      `
      const rows = db.prepare(upstreamSql).all(...currentLevelIds, ...(options?.workspaceId ? [options.workspaceId] : [])) as unknown as Array<{
        id: number
        name: string
        kind: string
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

    if (direction === 'downstream' || direction === 'both') {
      const downstreamSql = `
        SELECT DISTINCT s.id, s.name, s.kind, f.path as file,
                        f.repo_id as repoId, f.checkout_id as checkoutId,
                        e.kind as relationType
          FROM edges e
          JOIN symbols s ON e.dst_symbol = s.id
          JOIN files f ON s.file_id = f.id
         WHERE e.src_symbol IN (${placeholders})
           AND e.dst_symbol IS NOT NULL
           ${options?.workspaceId ? 'AND e.workspace_id = ?' : ''}
      `
      const rows = db.prepare(downstreamSql).all(...currentLevelIds, ...(options?.workspaceId ? [options.workspaceId] : [])) as unknown as Array<{
        id: number
        name: string
        kind: string
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
    currentLevelIds = nextLevelNodes.map(n => n.id)
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
