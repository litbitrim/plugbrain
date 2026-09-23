import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const app = readFileSync(join(import.meta.dirname, '..', 'ui', 'src', 'App.tsx'), 'utf8')

test('first start explains the real folder-index-empty flow and exposes keyboard help', () => {
  assert.match(app, /brain-first-run/)
  assert.match(app, /Ordner wählen/)
  assert.match(app, /Index abwarten/)
  assert.match(app, /Leere Vaults bleiben ehrlich leer/)
  assert.match(app, /Tastenkürzel/)
  assert.match(app, /event\.key === '\?'/)
  assert.match(app, /event\.key\.toLowerCase\(\) === 'o'/)
})
