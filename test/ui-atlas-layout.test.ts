import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const root = join(import.meta.dirname, '..', 'ui', 'src')

test('Atlas reserves separate legend, list and counter tracks', () => {
  const app = readFileSync(join(root, 'App.tsx'), 'utf8')
  const css = readFileSync(join(root, 'styles', 'app.css'), 'utf8')
  assert.match(app, /id="app" className="atlas-app"/, 'only Atlas opts into the layout')
  assert.match(css, /\.atlas-app > aside \{ display: grid; grid-template-rows: auto auto auto minmax\(0, 1fr\) auto;/)
  assert.match(css, /\.atlas-app > aside \.listwrap \{ min-height: 0; \}/)
})
