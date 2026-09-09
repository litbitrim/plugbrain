/**
 * Vault plumbing for the standalone brain UI.
 *
 * The Brain is the single authority; this module only exposes what the daemon
 * already offers (galaxy listing, register, reindex) and remembers which vault
 * the human last had open — the Obsidian half of "standalone": open a folder,
 * get a graph, come back to it later. No indexer, no store, no second truth.
 *
 * The daemon's own watch loop keeps an open vault fresh (it re-indexes what
 * changed after every burst), so the graph updates itself once a folder is
 * in; the UI only has to make the "open a folder" gesture exist.
 */

const KEY = 'plugbrain.workspace'

export function lastWorkspace() {
  try { return localStorage.getItem(KEY) || '' } catch { return '' }
}

export function rememberWorkspace(id) {
  try { localStorage.setItem(KEY, id) } catch { /* private mode */ }
}

export async function galaxy() {
  const response = await fetch('/api/galaxy')
  if (!response.ok) throw new Error(`Galaxie: HTTP ${response.status}`)
  const payload = await response.json()
  if (!payload?.ok || !Array.isArray(payload.planets)) {
    throw new Error('Die Galaxie antwortet unvollständig.')
  }
  return payload.planets
}

/**
 * Make a folder a vault and give it a first index.
 *
 * Two calls on purpose: registration is idempotent identity (the same folder
 * is always the same workspace), indexing is work that can fail on its own. A
 * registered-but-unindexed vault is a real state and must not look like one
 * that simply has nothing to show.
 */
export async function openVault(root, name) {
  const register = await fetch('/api/workspaces', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ root, name }),
  })
  if (!register.ok) {
    const body = await register.json().catch(() => null)
    throw new Error(body?.error ?? `Registrieren: HTTP ${register.status}`)
  }
  const created = await register.json()
  if (!created?.ok || !created.workspace?.id) {
    throw new Error('Registrieren: unvollständige Antwort.')
  }
  await reindexWorkspace(created.workspace.id)
  return created.workspace.id
}

export async function reindexWorkspace(id) {
  const response = await fetch('/api/reindex', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workspace: id }),
  })
  if (!response.ok) throw new Error(`Indizieren: HTTP ${response.status}`)
  const payload = await response.json()
  if (!payload?.ok) throw new Error('Indizieren: unvollständige Antwort.')
  return payload.result
}