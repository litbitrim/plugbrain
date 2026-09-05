// The visual subset is bounded independently of the authoritative index.
// No example objects are substituted when the service is empty or unavailable.
export function toAtlasData(graph, limit = 300) {
  if (!graph || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) {
    throw new Error('PlugBrain returned an invalid graph snapshot.');
  }
  const valid = graph.nodes.filter(n => n && typeof n.id === 'string');
  const selected = valid.slice().sort((a, b) => a.id.localeCompare(b.id)).slice(0, limit);
  const ids = new Set(selected.map(n => n.id));
  const types = [...new Set(selected.map(n => n.type || 'unknown'))].sort();
  const CLUSTERS = types.map((id, i) => ({
    id, name: id.replaceAll('_', ' '),
    dark: `hsl(${(i * 137.508) % 360}, 48%, 77%)`,
    light: `hsl(${(i * 137.508) % 360}, 45%, 34%)`,
    anchor: [Math.cos(i * 2.4), Math.sin(i * 1.7), Math.sin(i * 2.4)],
  }));
  const META = Object.fromEntries(selected.map(n => [n.id, {
    label: n.label || n.name || n.id,
    kind: n.type || 'unknown',
    path: n.properties?.path || n.properties?.filePath || n.uri || '',
    status: n.properties?.status || 'Im aktuellen Graph-Snapshot',
    prov: [n.id, n.updatedAt].filter(Boolean).join(' · '),
  }]));
  return {
    CLUSTERS, META,
    NODES: selected.map(n => [n.id, n.type || 'unknown', n.type === 'file' ? 3 : 2, n.label || n.name || n.id]),
    EDGES: graph.edges.filter(e => ids.has(e.sourceId) && ids.has(e.targetId))
      .map(e => [e.sourceId, e.targetId, ['links_to', 'references'].includes(e.type) ? 'rel' : 'pre']),
    totalNodes: valid.length,
    totalEdges: graph.edges.length,
  };
}
