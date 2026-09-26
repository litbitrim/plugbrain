/**
 * Prose search over the vault, and the line that makes a hit clickable.
 *
 * The acceptance asks for search results "with context" in under a second and a
 * click that opens the REAL note AT the passage. Names and paths were always
 * searchable; the prose was not, and a hit without a line is a hit nobody can
 * land on. These tests pin both halves, including the cases where the honest
 * answer is "no line" rather than a plausible-looking wrong one.
 */
import { strict as assert } from 'node:assert'
import { mkdirSync, mkdtempSync, rmSync, unlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import * as access from '../src/access.ts'
import { indexPlanetWorkspace, registerPlanet, setPlanetIndexSelection, workspaceIdFor } from '../src/planet.ts'
import { openStore } from '../src/store/schema.ts'
import { searchNotesWithLines } from '../src/notes/vault.ts'
import { lineOf, searchNotes, termsOf } from '../src/notes/search.ts'

const AGENT = 'search-reader'

/** A note whose only mention of the special phrase is on line 5. */
const NOTIZ = [
  '---',
  'typ: "notiz"',
  'stand: "offen"',
  '---',
  '',
  'Hier steht der Kanonische Gateway Owner in Zeile fuenf.',
  '',
  'Und danach nichts mehr dazu.',
].join('\n')

interface Fixture {
  dir: string
  root: string
  db: ReturnType<typeof openStore>
  workspaceId: string
  cleanup: () => void
}

function fixture(): Fixture {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-notesearch-'))
  const root = join(dir, 'plugpt')
  const write = (rel: string, content: string): void => {
    const abs = join(root, ...rel.split('/'))
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, content, 'utf8')
  }
  write('Master/Notiz.md', NOTIZ)
  write('Auftrag/Bericht.md', '# Bericht\n\nDer Kanonische Gateway Owner ist hier schon in Zeile drei genannt.\n')

  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = workspaceIdFor(root)
  const planet = registerPlanet(db, root, 'plugpt')
  setPlanetIndexSelection(db, planet.workspaceId, [])
  indexPlanetWorkspace(db, workspaceId, { full: true })
  access.registerAgent(db, AGENT, 'search reader')
  return {
    dir, root, db, workspaceId,
    cleanup: () => {
      try { db.close() } catch { /* already closed */ }
      rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
    },
  }
}

test('prose that lives in a note body is searchable, with a snippet as evidence', () => {
  const fx = fixture()
  try {
    const result = searchNotes(fx.db, fx.workspaceId, 'Kanonische Gateway Owner')
    assert.equal(result.total, 2, 'both notes mention it')
    assert.equal(result.hits.length, 2)
    for (const hit of result.hits) {
      assert.ok(hit.snippet !== null, `${hit.path} must carry the sentence that matched`)
      // The markers are the contract the UI renders; a snippet without them is
      // a snippet the reader cannot see the match in.
      assert.match(hit.snippet, /\[[^\]]+\]/)
      assert.equal(hit.line, null, 'without asking, no file is read and no line is claimed')
    }
  } finally { fx.cleanup() }
})

test('a hit can be located: the line is the first line that actually matches', () => {
  const fx = fixture()
  try {
    const result = searchNotesWithLines(fx.db, fx.workspaceId, AGENT, 'Kanonische Gateway Owner', {
      lines: true,
    })
    const byPath = new Map(result.hits.map(hit => [hit.path, hit.line]))
    assert.equal(byPath.get('Master/Notiz.md'), 6, 'the phrase is in the sixth line of that note')
    assert.equal(byPath.get('Auftrag/Bericht.md'), 3)

    // And the line is verifiable by reading the file the way a reader would.
    for (const hit of result.hits) {
      const content = access.readFile(fx.db, fx.workspaceId, AGENT, hit.path).content
      assert.equal(lineOf(content, 'Kanonische Gateway Owner'), hit.line)
    }
  } finally { fx.cleanup() }
})

test('a term that appears nowhere yields nothing, not a plausible near-miss', () => {
  const fx = fixture()
  try {
    const none = searchNotesWithLines(fx.db, fx.workspaceId, AGENT, 'Zeppelinwartungshandbuch', {
      lines: true,
    })
    assert.equal(none.total, 0)
    assert.deepEqual(none.hits, [])
    assert.deepEqual(termsOf('   '), [], 'a query with no terms searches for nothing')
    assert.equal(lineOf(NOTIZ, 'Zeppelinwartungshandbuch'), null)
  } finally { fx.cleanup() }
})

test('a hit whose note vanished from disk reports no line instead of failing the search', () => {
  const fx = fixture()
  try {
    unlinkSync(join(fx.root, 'Master', 'Notiz.md'))
    // The index still knows the note until the next pass; the search must not
    // turn a missing file into a broken search.
    const result = searchNotesWithLines(fx.db, fx.workspaceId, AGENT, 'Kanonische Gateway Owner', {
      lines: true,
    })
    assert.ok(result.total >= 1)
    const gone = result.hits.find(hit => hit.path === 'Master/Notiz.md')
    if (gone !== undefined) {
      assert.equal(gone.line, null, 'a note that is gone has no line to open')
    }
  } finally { fx.cleanup() }
})

test('search terms survive punctuation the way a reader types them', () => {
  assert.deepEqual(termsOf('"Gateway Owner"'), ['gateway', 'owner'])
  // The token as written comes first, so an exact `path:line` wins; the looser
  // reading is only a fallback.
  assert.deepEqual(termsOf('auth-key.ts:12'), ['auth-key.ts:12', 'auth-key.ts', '12'])
  assert.deepEqual(termsOf('a b c'), [], 'one-letter noise is not a search term')
  assert.deepEqual(termsOf('  '), [])
})
