/**
 * Graph model: turns an atlas snapshot into what the graph view draws.
 *
 * Kept free of rendering and React so it can be tested on its own. The
 * snapshot is the brain's system of record for the view; nothing here invents
 * nodes, edges or groups that the snapshot does not contain.
 */

export type NodeKind = 'file' | 'class' | 'interface' | 'note' | 'other'

export interface GraphNode {
  id: string
  label: string
  kind: NodeKind
  /** Workspace-relative path of the file this node lives in, when known. */
  path: string | null
  /** Checkout or top folder the node belongs to; drives colour and legend. */
  group: string
  lines: number | null
  lang: string | null
  degree: number
}

export interface GraphEdge {
  source: string
  target: string
  kind: string
}

export interface GraphGroup {
  name: string
  count: number
  /** Index into the categorical palette, or -1 for the neutral "other" bucket. */
  slot: number
}

export interface GraphModel {
  nodes: GraphNode[]
  edges: GraphEdge[]
  groups: GraphGroup[]
  byId: Map<string, GraphNode>
  /** Neighbour ids per node, both directions. */
  neighbours: Map<string, Set<string>>
  kindCounts: Record<NodeKind, number>
}

/** How many groups get their own colour; the rest share the neutral bucket. */
export const COLOURED_GROUPS = 8

/** The bucket every uncoloured group falls into. */
export const OTHER_GROUP = 'Weitere'

interface RawNode {
  id?: unknown
  type?: unknown
  name?: unknown
  label?: unknown
  properties?: { path?: unknown; lines?: unknown; lang?: unknown } | null
}

interface RawEdge {
  sourceId?: unknown
  targetId?: unknown
  source?: unknown
  target?: unknown
  type?: unknown
}

const KNOWN_KINDS: ReadonlySet<string> = new Set(['file', 'class', 'interface', 'note'])

function asKind(value: unknown): NodeKind {
  return typeof value === 'string' && KNOWN_KINDS.has(value) ? value as NodeKind : 'other'
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value !== '' ? value : null
}

function asCount(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

/**
 * The group of a path. Paths in a planet look like `Code/<checkout>/src/...`,
 * and the checkout is the unit a person thinks in. Anything else groups by its
 * first folder; a path at the root groups as the workspace itself.
 */
export function groupOf(path: string | null): string {
  if (path === null) return OTHER_GROUP
  const parts = path.split('/').filter(Boolean)
  if (parts.length >= 2 && parts[0] === 'Code') return parts[1]!
  if (parts.length >= 2) return parts[0]!
  return 'Workspace'
}

export function buildGraphModel(raw: { nodes: unknown[]; edges: unknown[] }): GraphModel {
  const byId = new Map<string, GraphNode>()
  const kindCounts: Record<NodeKind, number> = { file: 0, class: 0, interface: 0, note: 0, other: 0 }

  for (const item of raw.nodes as RawNode[]) {
    const id = asString(item?.id)
    if (id === null || byId.has(id)) continue
    const path = asString(item.properties?.path)
    const kind = asKind(item.type)
    const label = asString(item.label) ?? asString(item.name) ?? (path?.split('/').pop() ?? id)
    byId.set(id, {
      id,
      label,
      kind,
      path,
      group: groupOf(path),
      lines: asCount(item.properties?.lines),
      lang: asString(item.properties?.lang),
      degree: 0,
    })
    kindCounts[kind] += 1
  }

  // An edge is kept only when both ends are nodes of this snapshot. A dangling
  // edge would draw a line to nowhere, which is exactly the kind of invented
  // relationship the view must not show.
  const edges: GraphEdge[] = []
  const neighbours = new Map<string, Set<string>>()
  const seen = new Set<string>()
  for (const item of raw.edges as RawEdge[]) {
    const source = asString(item?.sourceId) ?? asString(item?.source)
    const target = asString(item?.targetId) ?? asString(item?.target)
    if (source === null || target === null || source === target) continue
    const a = byId.get(source)
    const b = byId.get(target)
    if (a === undefined || b === undefined) continue
    const kind = asString(item.type) ?? 'link'
    const key = `${source}\u0000${target}\u0000${kind}`
    if (seen.has(key)) continue
    seen.add(key)
    edges.push({ source, target, kind })
    a.degree += 1
    b.degree += 1
    if (!neighbours.has(source)) neighbours.set(source, new Set())
    if (!neighbours.has(target)) neighbours.set(target, new Set())
    neighbours.get(source)!.add(target)
    neighbours.get(target)!.add(source)
  }

  const counts = new Map<string, number>()
  for (const node of byId.values()) counts.set(node.group, (counts.get(node.group) ?? 0) + 1)
  const ranked = [...counts.entries()].sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0]))
  const groups: GraphGroup[] = ranked.map(([name, count], index) => ({
    name,
    count,
    slot: index < COLOURED_GROUPS && name !== OTHER_GROUP ? index : -1,
  }))

  return { nodes: [...byId.values()], edges, groups, byId, neighbours, kindCounts }
}

/** Case-insensitive match on label and path; an empty query matches nothing. */
export function matchesQuery(node: GraphNode, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (q === '') return false
  return node.label.toLowerCase().includes(q) || (node.path?.toLowerCase().includes(q) ?? false)
}

/** Nodes ranked the way the side list shows them: best connected first. */
export function rankNodes(nodes: readonly GraphNode[]): GraphNode[] {
  return [...nodes].sort((a, b) => b.degree - a.degree || a.label.localeCompare(b.label))
}
