/**
 * Provenance carried by MCP intelligence answers.
 *
 * An agent must be able to tell whether an answer came from the indexed Brain,
 * which part of the Planet was consulted, and which checkout revisions that
 * answer describes.  This is deliberately metadata only: it never changes the
 * graph result or reaches outside the registered Brain store.
 */
import type { DatabaseSync } from 'node:sqlite'

export interface McpProvenance {
  source: {
    system: 'plugbrain'
    corpus: 'indexed-workspace'
    tool: string
  }
  scope: {
    workspaceIds: string[]
    repoIds: string[]
    checkoutIds: string[]
  }
  revisionVector: Array<{
    workspaceId: string
    generation: number
    checkouts: Array<{
      id: string
      repoId: string
      branch: string | null
      head: string | null
      revision: string | null
    }>
  }>
}

function strings(value: unknown): string[] {
  return typeof value === 'string' && value.trim() !== '' ? [value] : []
}

/**
 * Describe the index facts behind an MCP answer.  A scope that is not passed
 * explicitly is derived only from a checked-in identifier; we never infer an
 * on-disk root or silently scan every checkout.
 */
export function mcpProvenance(
  db: DatabaseSync,
  tool: string,
  args: Record<string, unknown>,
): McpProvenance {
  const requestedWorkspaces = strings(args.workspaceId)
  const requestedRepos = strings(args.repoId)
  const requestedCheckouts = strings(args.checkoutId)

  let workspaceIds = requestedWorkspaces
  if (workspaceIds.length === 0 && requestedCheckouts.length > 0) {
    workspaceIds = (db.prepare(
      `SELECT DISTINCT p.workspace_id AS id
         FROM checkouts c JOIN planets p ON p.id = c.planet_id
        WHERE c.id IN (${requestedCheckouts.map(() => '?').join(', ')})`,
    ).all(...requestedCheckouts) as Array<{ id: string }>).map(row => row.id)
  }
  if (workspaceIds.length === 0 && requestedRepos.length > 0) {
    workspaceIds = (db.prepare(
      `SELECT DISTINCT p.workspace_id AS id
         FROM repos r JOIN planets p ON p.id = r.planet_id
        WHERE r.id IN (${requestedRepos.map(() => '?').join(', ')})`,
    ).all(...requestedRepos) as Array<{ id: string }>).map(row => row.id)
  }

  const repoIds = new Set(requestedRepos)
  const checkoutIds = new Set(requestedCheckouts)
  const revisionVector: McpProvenance['revisionVector'] = []
  for (const workspaceId of workspaceIds) {
    const state = db.prepare(
      'SELECT generation FROM workspace_index_state WHERE workspace_id = ?',
    ).get(workspaceId) as { generation: number } | undefined
    const checks = db.prepare(
      `SELECT c.id, c.repo_id AS repoId, c.branch, c.head, c.revision
         FROM checkouts c JOIN planets p ON p.id = c.planet_id
        WHERE p.workspace_id = ? AND c.retired_at IS NULL
        ORDER BY c.id`,
    ).all(workspaceId) as Array<{
      id: string; repoId: string; branch: string | null; head: string | null; revision: string | null
    }>
    const scopedChecks = requestedCheckouts.length === 0
      ? checks
      : checks.filter(checkout => checkoutIds.has(checkout.id))
    for (const checkout of scopedChecks) {
      repoIds.add(checkout.repoId)
      checkoutIds.add(checkout.id)
    }
    revisionVector.push({
      workspaceId,
      generation: Number(state?.generation ?? 0),
      checkouts: scopedChecks,
    })
  }

  return {
    source: { system: 'plugbrain', corpus: 'indexed-workspace', tool },
    scope: {
      workspaceIds,
      repoIds: [...repoIds].sort(),
      checkoutIds: [...checkoutIds].sort(),
    },
    revisionVector,
  }
}
