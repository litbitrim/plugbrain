import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const sourceView = readFileSync(join(import.meta.dirname, '..', 'ui', 'src', 'views', 'SourceView.tsx'), 'utf8')

test('SourceView renders the file independently from optional Git metadata', () => {
  assert.match(sourceView, /sourceReadWithin\(readAgentFile\(workspaceId, path\)\)/)
  assert.match(sourceView, /setFileData\(null\)[\s\S]*?setGitState\(null\)[\s\S]*?setProv\(null\)[\s\S]*?setBacklinks\(\[\]\)/)
  assert.match(sourceView, /setFileData\(result\)[\s\S]*?setLoading\(false\)/)
  assert.match(sourceView, /void fetchGitState\(workspaceId\)\.then/)
  assert.match(sourceView, /Git metadata is optional/)
  assert.doesNotMatch(sourceView, /Promise\.allSettled\(\[/)
})
