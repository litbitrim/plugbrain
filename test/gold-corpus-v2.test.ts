import { strict as assert } from 'node:assert'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { test } from 'node:test'

const root = resolve(import.meta.dirname, '..')
const corpus = JSON.parse(readFileSync(resolve(root, 'bench', 'gold-corpus-v2.json'), 'utf8')) as {
  schema: number; measurement: { tool: string; status: string }; cases: Array<{ id: string; class: string; repository: string; expected: { path: string; kind: string; error?: string } }>
}

test('M18a: gold corpus v2 covers every required answer and failure class without invented E1 scores', () => {
  assert.equal(corpus.schema, 2)
  assert.deepEqual(new Set(corpus.cases.map(entry => entry.class)), new Set([
    'code', 'build', 'notes', 'cross-repo', 'rename', 'delete', 'branch-error', 'rights-error',
  ]))
  assert.equal(corpus.measurement.tool, 'E1')
  assert.equal(corpus.measurement.status, 'PENDING_E1')
  assert.ok(corpus.cases.some(entry => entry.class === 'rename' && entry.expected.kind === 'read-only'))
  assert.ok(corpus.cases.some(entry => entry.class === 'rights-error' && entry.expected.error === 'FencingError'))
  for (const entry of corpus.cases.filter(entry => entry.repository === 'PlugBrain-Core')) {
    assert.ok(existsSync(resolve(root, entry.expected.path)), `${entry.id} target exists`)
  }
})
