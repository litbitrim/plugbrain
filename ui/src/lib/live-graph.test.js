import test from 'node:test';
import assert from 'node:assert/strict';
import { toAtlasData } from './live-graph.js';

test('empty snapshots remain empty without example data', () => {
  assert.deepEqual(toAtlasData({ nodes: [], edges: [] }).NODES, []);
});
test('stable IDs retain distinct files with the same display name', () => {
  const graph = { nodes: [
    { id: 'a/index.ts', name: 'index.ts', type: 'file' },
    { id: 'b/index.ts', name: 'index.ts', type: 'file' },
  ], edges: [{ sourceId: 'a/index.ts', targetId: 'b/index.ts', type: 'imports' }] };
  const data = toAtlasData(graph);
  assert.equal(data.NODES.length, 2);
  assert.deepEqual(data.EDGES, [['a/index.ts', 'b/index.ts', 'pre']]);
  assert.equal(data.META['a/index.ts'].label, 'index.ts');
});
test('render limit reports full totals and excludes dangling visual edges', () => {
  const graph = { nodes: [{ id: 'a' }, { id: 'b' }], edges: [{ sourceId: 'a', targetId: 'b' }] };
  const data = toAtlasData(graph, 1);
  assert.equal(data.totalNodes, 2);
  assert.equal(data.NODES.length, 1);
  assert.equal(data.EDGES.length, 0);
});
