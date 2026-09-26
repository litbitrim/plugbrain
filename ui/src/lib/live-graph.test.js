import { test, expect } from 'vitest';
import { toAtlasData } from './live-graph.js';

test('empty snapshots remain empty without example data', () => {
  expect(toAtlasData({ nodes: [], edges: [] }).NODES).toEqual([]);
});

test('stable IDs retain distinct files with the same display name', () => {
  const graph = {
    nodes: [
      { id: 'a/index.ts', name: 'index.ts', type: 'file' },
      { id: 'b/index.ts', name: 'index.ts', type: 'file' },
    ],
    edges: [{ sourceId: 'a/index.ts', targetId: 'b/index.ts', type: 'imports' }],
  };
  const data = toAtlasData(graph);
  expect(data.NODES.length).toBe(2);
  expect(data.EDGES).toEqual([['a/index.ts', 'b/index.ts', 'pre']]);
  expect(data.META['a/index.ts'].label).toBe('index.ts');
});

test('render limit reports full totals and excludes dangling visual edges', () => {
  const graph = {
    nodes: [{ id: 'a' }, { id: 'b' }],
    edges: [{ sourceId: 'a', targetId: 'b' }],
  };
  const data = toAtlasData(graph, 1);
  expect(data.totalNodes).toBe(2);
  expect(data.NODES.length).toBe(1);
  expect(data.EDGES.length).toBe(0);
});
