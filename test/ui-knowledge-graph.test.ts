import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const view = readFileSync(join(import.meta.dirname, '..', 'ui', 'src', 'views', 'KnowledgeGraphView.tsx'), 'utf8')
const notes = readFileSync(join(import.meta.dirname, '..', 'ui', 'src', 'views', 'NotesView.tsx'), 'utf8')

test('knowledge graph has a bounded keyboard list and a real note inspector', () => {
  assert.match(view, /fetchNoteGraph\(workspaceId, \{ focus, depth, limit \}\)/)
  assert.match(view, /option value=\{60\}/)
  assert.match(view, /option value=\{120\}/)
  assert.match(view, /option value=\{300\}/)
  assert.match(view, /ArrowDown/)
  assert.match(view, /ArrowUp/)
  assert.match(view, /event\.key === 'Enter'/)
  assert.match(view, /Notiz öffnen/)
  assert.doesNotMatch(view, /<canvas/)
})

test('knowledge editor creates decision and contradiction notes behind a create-only fence', () => {
  assert.match(notes, /<option value="entscheidung">Entscheidung<\/option>/)
  assert.match(notes, /<option value="widerspruch">Widerspruch<\/option>/)
  assert.match(notes, /typ: \$\{kind\}/)
  assert.match(notes, /active\.hash === ''/)
  assert.match(notes, /Notiz zuerst speichern/)
})
