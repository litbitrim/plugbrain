/* Drive the Codebase City from the authoritative PlugBrain snapshot.
   The city's own module exposes register/grow/event; this adapter is the only
   thing that decides WHICH real objects become districts and buildings, so the
   engine keeps knowing nothing about PlugBrain and PlugBrain keeps knowing
   nothing about city geometry.

   No example objects are ever substituted: when the snapshot carries no
   indexed nodes, nothing is grown and the caller reports the empty index. */
import { api, workspaces } from './city/repo.js'
import { folderName } from './workspace-name.js'

/** Workspaces already registered with the engine, and the paths grown per workspace. */
const grown = new Map()

/** A node's real on-disk path, or null when the index has not resolved one. */
function pathOf(node) {
  const p = node?.properties?.path || node?.properties?.filePath || node?.uri
  return typeof p === 'string' && p.length > 0 ? p : null
}

/** Lines of code when the index knows them, else a neutral height. */
function locOf(node) {
  const raw = node?.properties?.loc ?? node?.properties?.lines ?? node?.properties?.size
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? Math.min(4000, Math.round(n)) : 40
}

/**
 * Apply one snapshot. Safe to call on every poll: buildings already grown are
 * skipped, so a workspace that has not changed produces no churn.
 * Returns what is actually on the map, for honest status copy.
 */
export function feedCity(snapshot) {
  const ws = snapshot?.workspace
  const nodes = snapshot?.graph?.nodes
  if (!ws?.id || !Array.isArray(nodes)) return { workspaces: grown.size, buildings: 0, added: 0 }

  const id = String(ws.id)
  if (!grown.has(id)) {
    // The district carries the same short label the header shows, so a
    // legacy path-shaped name never reaches the map as a full canonical path.
    api.register({ id, name: folderName(ws.name || id) })
    grown.set(id, new Set())
    // Registration is the first evidence-bearing write to the city. There is no
    // synthetic district to clear: the map only contains this real workspace.
    for (const w of workspaces.slice()) {
      if (w.sim && w.id !== id) api.unregister(w.id)
    }
  }
  const seen = grown.get(id)

  // Outgoing references per node id, resolved to paths, so a building knows
  // what it depends on rather than standing alone.
  const edges = Array.isArray(snapshot.graph.edges) ? snapshot.graph.edges : []
  const byId = new Map(nodes.filter(n => n && typeof n.id === 'string').map(n => [n.id, n]))
  const depsOf = new Map()
  for (const e of edges) {
    const from = byId.get(e?.sourceId), to = byId.get(e?.targetId)
    if (!from || !to) continue
    const tp = pathOf(to)
    if (!tp) continue
    if (!depsOf.has(from.id)) depsOf.set(from.id, [])
    depsOf.get(from.id).push(tp)
  }

  // Keep every indexed file. The renderer grows its GPU buffers on demand, so
  // a large workspace is not silently turned into a partial city by a demo
  // sized demo capacity. Sorting keeps the layout deterministic across polls.
  const withPaths = []
  for (const node of nodes) {
    const path = pathOf(node)
    if (path) withPaths.push({ node, path })
  }
  withPaths.sort((a, b) => a.path.localeCompare(b.path))
  let added = 0
  for (const { node, path } of withPaths) {
    if (seen.has(path)) continue
    seen.add(path)
    const props = node.properties || {}
    api.grow(id, {
      path, loc: locOf(node), deps: depsOf.get(node.id) || [], note: node.type || '',
      // The brain already resolved who owns this file; the city just paints it.
      // Written wins over read: authorship is the stronger claim on a building.
      agentColor: props.agentColor || props.readerColor || null,
      agentName: props.agentName || props.readerName || null,
      access: props.agentColor ? 'write' : props.readerColor ? 'read' : null,
    })
    added += 1
  }
  if (added > 0) api.event(id, `${added} indexed object${added === 1 ? '' : 's'} added`)
  return {
    workspaces: grown.size,
    buildings: seen.size,
    added,
    total: withPaths.length,
    truncated: false,
  }
}

/** Compatibility read for older callers; the production city never simulates. */
export const isSimulated = () => api.simulated()
