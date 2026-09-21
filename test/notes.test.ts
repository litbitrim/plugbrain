/**
 * M2 — the Obsidian replacement.
 *
 * The acceptance criteria are checked here against a real vault on a real disk
 * and the real SQLite store, and the interesting half of the file is the
 * REFERENCE PARSER: a second, deliberately independent implementation of what
 * "read this note" means. Comparing an extractor against itself proves nothing,
 * so the reference reads the bytes the plain way — line by line, with its own
 * scanner — and the two are compared note by note. If they disagree, either the
 * indexer or the reference is wrong, and both are worth knowing about.
 *
 * Every case is an acceptance criterion, and each one has a failure mode that
 * looks fine in a demo:
 *
 *   - a link written `[[Welle R12\|R12]]` (the escaped pipe a Markdown table
 *     needs) that resolves to nothing, forever, because the trailing backslash
 *     became part of the note's name;
 *   - a property query that finds no gates because the vault writes
 *     `typ: "gate"` and the query compares against `gate` with the quotes on;
 *   - an "edit" that overwrites a colleague's save because the caller's version
 *     was never checked;
 *   - a save that is invisible until the next full pass, so the next reader
 *     sees stale text and believes it.
 */
import { strict as assert } from 'node:assert'
import { execFileSync } from 'node:child_process'
import {
  existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { test } from 'node:test'
import * as access from '../src/access.ts'
import {
  discoverCheckouts, indexPlanetWorkspace, registerPlanet, setPlanetIndexSelection, workspaceIdFor,
} from '../src/planet.ts'
import { refreshFile } from '../src/indexer/index.ts'
import { openStore } from '../src/store/schema.ts'
import {
  backlinksOf, groupColor, isNotePath, listNotes, noteGraph, queryNotes, readNote, writeNote,
  NoteConflictError, NoteGeneratedError,
} from '../src/notes/vault.ts'
import { searchNotes } from '../src/notes/search.ts'

const HAS_GIT = ((): boolean => {
  try { execFileSync('git', ['--version'], { stdio: 'ignore' }); return true } catch { return false }
})()
const git = (cwd: string, args: string[]): string =>
  execFileSync('git', ['-c', 'user.email=brain@test', '-c', 'user.name=brain',
    '-c', 'commit.gpgsign=false', ...args], {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  }).trim()

/* ─────────────────────────────────────────────────────────────────────────────
 * The reference parser.
 *
 * Written to the CONTRACT, not to the implementation: frontmatter until the
 * closing rule, inline and block lists, values unquoted, wiki links with an
 * alias and a section, fenced code never scanned. It shares no code with
 * src/indexer/markdown.ts, on purpose.
 * ────────────────────────────────────────────────────────────────────────── */

interface RefLink { target: string; alias: string | null; section: string | null; embed: boolean; source: 'body' | 'property' }
interface RefNote { properties: Array<{ key: string; value: string }>; links: RefLink[]; tags: string[] }

/** Remove the parts of a line that are code: fenced blocks and inline spans. */
function refBlankCode(lines: string[]): string[] {
  const out: string[] = []
  let inside = false
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) { inside = !inside; out.push(''); continue }
    out.push(inside ? '' : line.replace(/`[^`]*`/g, ''))
  }
  return out
}

/** `[[target|alias]]` / `[[target\|alias]]` / `[[target#Section]]` → its parts. */
function refSplitWiki(body: string): RefLink {
  const pipeAt = body.indexOf('|')
  const head = pipeAt === -1 ? body : body.slice(0, pipeAt)
  // The escaped pipe is what a table cell needs; the alias is the other half.
  const alias = pipeAt === -1 ? null : body.slice(pipeAt + 1).replace(/\\\|/g, '|').trim() || null
  const hashAt = head.indexOf('#')
  const target = (hashAt === -1 ? head : head.slice(0, hashAt)).replace(/\\+$/, '').trim()
  const section = hashAt === -1 ? null : head.slice(hashAt + 1).trim() || null
  return { target, alias, section, embed: false, source: 'body' }
}

/** Split `["a", "b"]` without breaking on a comma inside quotes. */
function refListItems(text: string): string[] {
  if (!(text.startsWith('[') && text.endsWith(']'))) return []
  const inner = text.slice(1, -1)
  const items: string[] = []
  let current = ''
  let quote: string | null = null
  for (const char of inner) {
    if (quote !== null) { current += char; if (char === quote) quote = null; continue }
    if (char === '"' || char === "'") { quote = char; current += char; continue }
    if (char === ',') { items.push(current); current = ''; continue }
    current += char
  }
  items.push(current)
  return items.map(item => item.trim()).filter(item => item !== '')
}

/** A raw frontmatter value as a fact: unquoted, or the link's target. */
function refNormalize(raw: string): { value: string; isLink: boolean } {
  const text = raw.trim()
  const wiki = /^\[\[([\s\S]+?)\]\]$/.exec(text)
  if (wiki) {
    const body = wiki[1]
    const pipeAt = body.indexOf('|')
    const head = pipeAt === -1 ? body : body.slice(0, pipeAt)
    const hashAt = head.indexOf('#')
    const target = (hashAt === -1 ? head : head.slice(0, hashAt)).replace(/\\+$/, '').trim()
    return { value: target, isLink: true }
  }
  if (text.length >= 2) {
    const first = text[0]
    const last = text[text.length - 1]
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return { value: text.slice(1, -1).replace(/\\\|/g, '|').trim(), isLink: false }
    }
  }
  return { value: text, isLink: false }
}

function referenceNote(content: string): RefNote {
  const lines = content.split('\n')
  const note: RefNote = { properties: [], links: [], tags: [] }

  let bodyStart = 0
  const first = (lines[0] ?? '').replace(/^\uFEFF/, '').trim()
  if (first === '---') {
    let end = -1
    for (let i = 1; i < lines.length; i += 1) {
      const line = lines[i].trim()
      if (line === '---' || line === '...') { end = i; break }
    }
    if (end !== -1) {
      bodyStart = end + 1
      const push = (key: string, raw: string): void => {
        const { value, isLink } = refNormalize(raw)
        note.properties.push({ key, value })
        if (isLink) note.links.push({ target: value, alias: null, section: null, embed: false, source: 'property' })
      }
      for (let i = 1; i < end; i += 1) {
        const line = lines[i]
        if (line.trim() === '' || line.trim().startsWith('#')) continue
        const kv = /^([A-Za-z0-9_][A-Za-z0-9_\- ]*?):(?:\s+(.*))?$/.exec(line)
        if (!kv) continue
        const key = kv[1].trim()
        const rest = (kv[2] ?? '').trim()
        if (rest === '') {
          const items: string[] = []
          let j = i + 1
          for (; j < end; j += 1) {
            const item = /^\s*-\s+(.*)$/.exec(lines[j])
            if (!item) break
            items.push(item[1].trim())
          }
          if (items.length > 0) { for (const item of items) push(key, item); i = j - 1; continue }
        }
        const items = refListItems(rest)
        if (items.length > 0) for (const item of items) push(key, item)
        else push(key, rest)
      }
    }
  }

  const body = refBlankCode(lines).slice(bodyStart)
  for (const line of body) {
    if (/^#{1,6}\s+/.test(line)) continue
    for (const match of line.matchAll(/(!?)\[\[([^\]\n]+)\]\]/g)) {
      const link = refSplitWiki(match[2])
      if (link.target === '') continue
      note.links.push({ ...link, embed: match[1] === '!' })
    }
    for (const match of line.matchAll(/(?:^|\s)#([a-z][a-z0-9_/-]{1,40})\b/gi)) {
      link: {
        const tag = match[1].toLowerCase()
        if (!note.tags.includes(tag)) note.tags.push(tag)
        break link
      }
    }
  }
  for (const property of note.properties) {
    if (property.key.toLowerCase() !== 'tags' || property.value === '') continue
    const tag = property.value.replace(/^#/, '').toLowerCase()
    if (!note.tags.includes(tag)) note.tags.push(tag)
  }
  return note
}

/* ─────────────────────────────────────────────────────────────────────────────
 * The fixture: a small planet whose every note is chosen to break something.
 * ────────────────────────────────────────────────────────────────────────── */

const REGELN = [
  '---',
  'typ: "regel"',
  'stand: "offen"',
  'tags: ["plugpt/master", "regeln"]',
  'owner: "[[Welle R12]]"',
  'abhaengig_von: []',
  '---',
  '',
  '# Regeln',
  '',
  'Die Welle steht in [[Welle R12\\|R12]] und der Audit in [[Selbst Audit|der Audit]].',
  'Ein Link auf [[Gibt es nicht]] bleibt offen.',
  '',
  '```js',
  'const example = "[[Kein Link]]"',
  '```',
  '',
  'Text mit #hardening und #plugpt/gate als Tags.',
  '',
].join('\n')

const WELLE12 = [
  '---',
  'typ: "gate"',
  'stand: "offen"',
  'gate_id: "R12"',
  '---',
  '',
  '# Welle R12',
  '',
  'Zurück zu [[00 Regeln]].',
  '',
  '## Teilabschnitt',
  '',
  'Siehe [[Selbst Audit#Kriterien|die Kriterien]].',
  '',
].join('\n')

const WELLE13 = [
  '---',
  'typ: "gate"',
  'stand: "erledigt"',
  'gate_id: "R13"',
  '---',
  '',
  '# Welle R13',
  '',
  'Ohne Links, aber mit Stand erledigt.',
  '',
].join('\n')

const AUDIT = [
  '---',
  'typ: "audit"',
  'stand: "offen"',
  'tags:',
  '  - plugpt/audit',
  '---',
  '',
  '# Selbst Audit',
  '',
  '## Kriterien',
  '',
  'Ein eigentümliches Wort steht mitten in diesem Satz: Zwischenbericht.',
  'Kein Link, nur Prosa.',
  '',
].join('\n')

const UEBERSICHT = [
  '---',
  'typ: "uebersicht"',
  '---',
  '',
  '# Übersicht',
  '',
  'Alles beginnt bei [[Welle R12]].',
  '',
].join('\n')

/** A generated note: the tracker owns it and says so. */
const GENERIERT = [
  '---',
  'typ: "regel"',
  'stand: "offen"',
  '---',
  '',
  '# Generierte Regeln',
  '',
  '%% Automatisch erzeugt von plugpt-tracker — nicht von Hand ändern. %%',
  '',
].join('\n')

/** A note inside a dot-folder: the note scope excludes those. */
const TRASH = ['---', 'typ: "gate"', 'stand: "offen"', '---', '', '# Alte Notiz', ''].join('\n')

interface NoteFixture {
  dir: string
  planetRoot: string
  db: DatabaseSync
  workspaceId: string
  /** Planet-relative paths of every note the reference parser should see. */
  expected: string[]
  cleanup: () => void
}

function noteFixture(): NoteFixture {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-notes-'))
  const planetRoot = join(dir, 'plugpt')
  const write = (rel: string, content: string): void => {
    const abs = join(planetRoot, ...rel.split('/'))
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, content)
    const future = new Date(Date.now() + 2000)
    utimesSync(abs, future, future)
  }

  write('Master/00 Regeln.md', REGELN)
  write('Master/Welle R12.md', WELLE12)
  write('Master/Welle R13.md', WELLE13)
  write('Roadmap/Selbst Audit.md', AUDIT)
  write('00 Übersicht.md', UEBERSICHT)
  write('Auftrag/Generierte Regeln.md', GENERIERT)
  write('Master/.trash/Alte Notiz.md', TRASH)
  write('PLUG-Ordner/Notiz mit Leerzeichen.md', '# Notiz mit Leerzeichen\n\nOhne Frontmatter, mit [[Welle R13]].\n')

  // A repository under Code\ whose README links INTO the vault. That is the
  // cross-scope case: a code document's link has to find the note, and the
  // note's backlinks have to list the code document.
  const repo = join(planetRoot, 'Code', 'PlugBeispiel')
  mkdirSync(repo, { recursive: true })
  if (HAS_GIT) {
    git(repo, ['init', '-q'])
    writeFileSync(join(repo, 'README.md'), [
      '# PlugBeispiel',
      '',
      'Siehe [[Welle R12]] aus dem Code heraus.',
      '',
    ].join('\n'))
    writeFileSync(join(repo, 'index.ts'), 'export const wert = 1\n')
    git(repo, ['add', '.'])
    git(repo, ['commit', '-q', '-m', 'init'])
    git(repo, ['branch', '-M', 'main'])
  }

  const db = openStore(join(dir, 'brain.db'))
  const workspaceId = workspaceIdFor(planetRoot)
  return {
    dir, planetRoot, db, workspaceId,
    expected: [
      'Master/00 Regeln.md', 'Master/Welle R12.md', 'Master/Welle R13.md',
      'Roadmap/Selbst Audit.md', '00 Übersicht.md', 'Auftrag/Generierte Regeln.md',
      'PLUG-Ordner/Notiz mit Leerzeichen.md',
    ],
    cleanup: () => { try { db.close() } catch { /* closed */ } rmSync(dir, { recursive: true, force: true }) },
  }
}

const byKey = (rows: Array<{ key: string; value: string }>): string[] =>
  rows.map(row => `${row.key.toLowerCase()}=${row.value}`).sort()

const linksAsSet = (links: Array<{ target: string; alias: string | null; section: string | null; embed: boolean; source?: string }>): string[] =>
  links.map(link => `${link.target}|${link.alias ?? ''}|${link.section ?? ''}|${link.embed ? 'embed' : 'link'}`).sort()

/* ─────────────────────────────────────────────────────────────────────────────
 * The milestone.
 * ────────────────────────────────────────────────────────────────────────── */

test('M2: the note scope is walked, and the dot-folders and code are not', () => {
  const fx = noteFixture()
  try {
    const planet = registerPlanet(fx.db, fx.planetRoot, 'plugpt')
    assert.equal(planet.workspaceId, fx.workspaceId)
    setPlanetIndexSelection(fx.db, fx.workspaceId, [])
    indexPlanetWorkspace(fx.db, fx.workspaceId, { full: true })

    const listed = listNotes(fx.db, fx.workspaceId, { limit: 100 })
    const paths = listed.notes.map(note => note.path).sort()
    assert.deepEqual(paths, [...fx.expected].sort(),
      'exactly the notes of the registered roots, and nothing else')

    // The dot-folder is excluded by the note rule, the code file is not a note
    // at all, and the code README is a document of its checkout, not a note.
    assert.equal(paths.some(path => path.includes('.trash')), false, 'a dot-folder is not note scope')
    assert.equal(paths.some(path => path.startsWith('Code/')), false, 'Code\\ is not note scope')
    assert.equal(isNotePath(fx.db, fx.workspaceId, 'Master/Welle R12.md'), true)
    assert.equal(isNotePath(fx.db, fx.workspaceId, 'Code/PlugBeispiel/README.md'), false)
    assert.equal(isNotePath(fx.db, fx.workspaceId, 'Master/.trash/Alte Notiz.md'), false,
      'a dot-folder inside a note root is out of scope — the write path must refuse it too')
  } finally { fx.cleanup() }
})

test('M2: links, backlinks and properties agree with an independent reference parser', () => {
  const fx = noteFixture()
  try {
    const planet = registerPlanet(fx.db, fx.planetRoot, 'plugpt')
    // This cross-scope acceptance deliberately includes the one code checkout;
    // the production contract requires that choice to be explicit.
    setPlanetIndexSelection(fx.db, fx.workspaceId,
      discoverCheckouts(join(fx.planetRoot, 'Code'), planet.planetId).map(checkout => checkout.checkoutId))
    indexPlanetWorkspace(fx.db, fx.workspaceId, { full: true })
    access.registerAgent(fx.db, 'test-reader', 'test reader')

    // Expected link names, so "resolved" is not taken on trust either.
    const noteBasenames = new Set(fx.expected.map(path =>
      (path.split('/').pop() ?? path).replace(/\.md$/i, '').toLowerCase()))
    // Every document that can link into the vault: the notes AND the code
    // document, because a backlink from a checkout is still a backlink.
    const sources = HAS_GIT
      ? [...fx.expected, 'Code/PlugBeispiel/README.md']
      : [...fx.expected]
    let compared = 0

    for (const rel of fx.expected) {
      const content = readFileSync(join(fx.planetRoot, ...rel.split('/')), 'utf8')
      const reference = referenceNote(content)
      const note = readNote(fx.db, fx.workspaceId, 'test-reader', rel)

      assert.deepEqual(byKey(note.properties), byKey(reference.properties),
        `properties of ${rel} disagree with the reference parser`)

      assert.deepEqual(linksAsSet(note.links), linksAsSet(reference.links),
        `links of ${rel} disagree with the reference parser`)

      assert.deepEqual([...note.tags].sort(), [...reference.tags].sort(),
        `tags of ${rel} disagree`)

      // Status is checked against an independently built picture: a link whose
      // target names one of these notes has to be resolved or self, and one
      // that names nothing has to say so instead of pointing somewhere.
      for (const link of note.links) {
        const known = noteBasenames.has(link.target.toLowerCase().replace(/\.md$/, ''))
        if (known) {
          assert.ok(link.status === 'resolved' || link.status === 'self',
            `${rel}: '${link.target}' names a note but is '${link.status}'`)
          assert.ok(link.path !== null, `${rel}: '${link.target}' is resolved without a path`)
        } else {
          assert.equal(link.status, 'missing', `${rel}: '${link.target}' resolves to a note that does not exist`)
          assert.equal(link.path, null)
        }
      }

      // Backlinks in the fixture are exact: the whole vault is known here, so
      // every document whose reference-parsed links point at this basename
      // counts — including the one under Code\.
      const basename = (rel.split('/').pop() ?? rel).replace(/\.md$/i, '').toLowerCase()
      const expectedBacklinks: string[] = []
      for (const other of sources) {
        const otherContent = readFileSync(join(fx.planetRoot, ...other.split('/')), 'utf8')
        const points = referenceNote(otherContent).links.some(link =>
          link.target.toLowerCase().replace(/\.md$/, '') === basename)
        if (points) expectedBacklinks.push(other)
      }
      assert.deepEqual([...new Set(note.backlinks.map(back => back.path))].sort(),
        [...new Set(expectedBacklinks)].sort(),
        `backlinks of ${rel} disagree with the reference parser`)

      compared += 1
    }
    assert.equal(compared, fx.expected.length)

    // The table-escaped pipe: the link that a naive scanner turns into the
    // note name 'Welle R12\' and never resolves again.
    const regeln = readNote(fx.db, fx.workspaceId, 'test-reader', 'Master/00 Regeln.md')
    const escaped = regeln.links.find(link => link.alias === 'R12')
    assert.ok(escaped, 'the table-escaped [[Welle R12\\|R12]] link is missing')
    assert.equal(escaped.target, 'Welle R12', 'the trailing backslash must not become part of the name')
    assert.equal(escaped.status, 'resolved', 'an escaped pipe must not stop a link from resolving')
    assert.equal(escaped.path, 'Master/Welle R12.md')

    // A link into the vault from a code document is a backlink of the note.
    const welle12 = readNote(fx.db, fx.workspaceId, 'test-reader', 'Master/Welle R12.md')
    assert.ok(welle12.backlinks.some(back => back.path === 'Code/PlugBeispiel/README.md'),
      'a code document linking into the vault must appear as a backlink')

    // A link inside a fenced block is code, not a link.
    assert.equal(regeln.links.some(link => link.target === 'Kein Link'), false,
      'a wiki link inside a fenced code block is not a link')
  } finally { fx.cleanup() }
})

test('M2: typ=gate UND stand=offen returns exactly the open gates', () => {
  const fx = noteFixture()
  try {
    registerPlanet(fx.db, fx.planetRoot, 'plugpt')
    setPlanetIndexSelection(fx.db, fx.workspaceId, [])
    indexPlanetWorkspace(fx.db, fx.workspaceId, { full: true })

    const result = queryNotes(fx.db, fx.workspaceId, 'typ=gate UND stand=offen')
    assert.deepEqual(result.notes.map(note => note.path), ['Master/Welle R12.md'])
    assert.equal(result.total, 1)

    // The expectation comes from the vault itself, parsed independently: every
    // note whose frontmatter says gate AND offen, and no other.
    const expected = fx.expected.filter(rel => {
      const reference = referenceNote(readFileSync(join(fx.planetRoot, ...rel.split('/')), 'utf8'))
      const value = (key: string): string[] => reference.properties
        .filter(property => property.key.toLowerCase() === key).map(property => property.value.toLowerCase())
      return value('typ').includes('gate') && value('stand').includes('offen')
    })
    assert.deepEqual(result.notes.map(note => note.path).sort(), [...expected].sort())
    assert.ok(result.notes.every(note => note.matched.length > 0),
      'a matched note has to explain which condition caught it')

    // Spelling variations of the same question must agree.
    for (const variant of ['typ="gate" AND stand="offen"', 'stand=offen UND typ=gate', '(typ=gate) && (stand=offen)']) {
      assert.deepEqual(queryNotes(fx.db, fx.workspaceId, variant).notes.map(note => note.path),
        result.notes.map(note => note.path), `'${variant}' must ask the same question`)
    }

    // Negation and existence are meaningful, and an absent key matches nothing.
    assert.deepEqual(queryNotes(fx.db, fx.workspaceId, 'typ=gate AND NOT stand=offen').notes.map(n => n.path),
      ['Master/Welle R13.md'])
    assert.deepEqual(queryNotes(fx.db, fx.workspaceId, 'typ=gate AND stand!=offen').notes.map(n => n.path),
      ['Master/Welle R13.md'])
    assert.deepEqual(queryNotes(fx.db, fx.planetRoot === '' ? 'x' : fx.workspaceId, 'gibt_es_nicht=1').notes, [])
    // A bare key asks whether the key exists. `abhaengig_von: []` is a declared
    // key that holds nothing, which is a different fact from an absent key —
    // and exactly one note in the fixture declares it.
    const declared = queryNotes(fx.db, fx.workspaceId, 'abhaengig_von')
    assert.equal(declared.total, 1)
    assert.deepEqual(declared.notes.map(note => note.path), ['Master/00 Regeln.md'])
    assert.equal(queryNotes(fx.db, fx.workspaceId, 'gibt_es_nicht').total, 0,
      'a key nobody declares matches nothing')

    // A typo is refused, not answered with silence.
    assert.throws(() => queryNotes(fx.db, fx.workspaceId, 'typ=gate AND'), /needs a value|expected/)
    assert.throws(() => queryNotes(fx.db, fx.workspaceId, 'typ=gate)'), /unexpected|parenthes/)
  } finally { fx.cleanup() }
})

test('M2: full-text search finds a sentence in the middle of a note', () => {
  const fx = noteFixture()
  try {
    registerPlanet(fx.db, fx.planetRoot, 'plugpt')
    setPlanetIndexSelection(fx.db, fx.workspaceId, [])
    indexPlanetWorkspace(fx.db, fx.workspaceId, { full: true })

    const hit = searchNotes(fx.db, fx.workspaceId, 'Zwischenbericht')
    assert.equal(hit.total, 1, 'the word is in one note only')
    assert.equal(hit.hits[0].path, 'Roadmap/Selbst Audit.md')
    assert.ok(hit.hits[0].snippet?.includes('[Zwischenbericht]'),
      `the hit must show the matching text, got ${JSON.stringify(hit.hits[0].snippet)}`)

    // A word that appears only in frontmatter is still the note's text.
    assert.equal(searchNotes(fx.db, fx.workspaceId, 'regeln').total >= 1, true)

    // Code is searchable through its names, the vault through its prose; a
    // word nobody wrote yields nothing rather than everything.
    assert.equal(searchNotes(fx.db, fx.workspaceId, 'schiefgegangeneswort').total, 0)
    assert.equal(searchNotes(fx.db, fx.workspaceId, '   ').total, 0)
    // FTS syntax in the query is text, not syntax: quoting keeps it literal.
    assert.equal(searchNotes(fx.db, fx.workspaceId, 'Zwischenbericht OR').total, 0,
      'a stray operator must not turn into an FTS expression')
  } finally { fx.cleanup() }
})

test('M2: a note edited on disk is current after a reindex, and a save is current at once', () => {
  const fx = noteFixture()
  try {
    registerPlanet(fx.db, fx.planetRoot, 'plugpt')
    setPlanetIndexSelection(fx.db, fx.workspaceId, [])
    indexPlanetWorkspace(fx.db, fx.workspaceId, { full: true })
    access.registerAgent(fx.db, 'test-reader', 'test reader')

    const abs = join(fx.planetRoot, 'Master', 'Welle R13.md')
    const before = readNote(fx.db, fx.workspaceId, 'test-reader', 'Master/Welle R13.md')
    assert.equal(before.indexStale, false)

    // Edit on disk, outside the brain entirely.
    const edited = before.content.replace('stand: "erledigt"', 'stand: "offen"').replace(
      'Ohne Links, aber mit Stand erledigt.', 'Jetzt mit einem Link auf [[Welle R12]].')
    writeFileSync(abs, edited)
    const future = new Date(Date.now() + 5000)
    utimesSync(abs, future, future)

    // The read reports staleness instead of pretending the index is right.
    assert.equal(readNote(fx.db, fx.workspaceId, 'test-reader', 'Master/Welle R13.md').indexStale, true)
    assert.equal(queryNotes(fx.db, fx.workspaceId, 'typ=gate UND stand=offen').total, 1,
      'before the pass the index still holds the old truth')

    indexPlanetWorkspace(fx.db, fx.workspaceId)
    const after = readNote(fx.db, fx.workspaceId, 'test-reader', 'Master/Welle R13.md')
    assert.equal(after.indexStale, false)
    assert.equal(after.properties.find(property => property.key === 'stand')?.value, 'offen')
    assert.deepEqual(queryNotes(fx.db, fx.workspaceId, 'typ=gate UND stand=offen')
      .notes.map(note => note.path).sort(),
      ['Master/Welle R12.md', 'Master/Welle R13.md'])
    assert.ok(after.links.some(link => link.target === 'Welle R12' && link.status === 'resolved'),
      'the new link is resolved after the pass')
    assert.equal(refreshFile(fx.db, fx.workspaceId, 'Master/Welle R13.md'), true)

    // A save through the brain is current immediately: same process, no pass.
    const reader = 'test-writer'
    access.registerAgent(fx.db, reader, 'test writer')
    const current = readNote(fx.db, fx.workspaceId, reader, 'Master/Welle R13.md')
    const saved = writeNote(fx.db, fx.workspaceId, reader, 'Master/Welle R13.md',
      `${current.content}\nNachtrag mit [[Selbst Audit]].\n`, { expectedHash: current.hash })
    assert.equal(saved.created, false)
    assert.equal(saved.indexed, true, 'a saved note is indexed by the save')
    const reread = readNote(fx.db, fx.workspaceId, reader, 'Master/Welle R13.md')
    assert.equal(reread.indexStale, false)
    assert.ok(reread.links.some(link => link.target === 'Selbst Audit' && link.status === 'resolved'))
    assert.equal(searchNotes(fx.db, fx.workspaceId, 'Nachtrag').total, 1,
      'the saved text is searchable without a full pass')
    assert.ok(backlinksOf(fx.db, fx.workspaceId, 'Roadmap/Selbst Audit.md')
      .some(back => back.path === 'Master/Welle R13.md'),
      'the new link is a backlink of its target right away')
  } finally { fx.cleanup() }
})

test('M2: an edit conflict is detected and nothing is overwritten', () => {
  const fx = noteFixture()
  try {
    registerPlanet(fx.db, fx.planetRoot, 'plugpt')
    setPlanetIndexSelection(fx.db, fx.workspaceId, [])
    indexPlanetWorkspace(fx.db, fx.workspaceId, { full: true })
    const agent = 'test-writer'
    access.registerAgent(fx.db, agent, 'test writer')

    const rel = 'Master/Welle R12.md'
    const ours = readNote(fx.db, fx.workspaceId, agent, rel)

    // Somebody else writes the file after we read it.
    const theirs = ours.content.replace('# Welle R12', '# Welle R12 (geändert von jemand anderem)')
    writeFileSync(join(fx.planetRoot, 'Master', 'Welle R12.md'), theirs)
    const future = new Date(Date.now() + 6000)
    utimesSync(join(fx.planetRoot, 'Master', 'Welle R12.md'), future, future)

    let conflict: NoteConflictError | null = null
    try {
      writeNote(fx.db, fx.workspaceId, agent, rel, 'ÜBERSCHRIEBEN', { expectedHash: ours.hash })
      assert.fail('the stale write must be refused')
    } catch (error) {
      assert.ok(error instanceof NoteConflictError, `expected a conflict, got ${String(error)}`)
      conflict = error
    }
    assert.equal(conflict?.detail.actual, conflict?.detail.actual)
    assert.notEqual(conflict?.detail.expected, conflict?.detail.actual)
    assert.equal(conflict?.detail.indexStale, true, 'the conflict has to say the index is behind')
    assert.equal(readFileSync(join(fx.planetRoot, 'Master', 'Welle R12.md'), 'utf8'), theirs,
      'the refused write must not have touched the file')

    // A write against the CURRENT version succeeds; the conflict was about
    // versions, not about permission.
    const fresh = readNote(fx.db, fx.workspaceId, agent, rel)
    writeNote(fx.db, fx.workspaceId, agent, rel, `${fresh.content}\nErgänzt.\n`, { expectedHash: fresh.hash })
    assert.ok(readFileSync(join(fx.planetRoot, 'Master', 'Welle R12.md'), 'utf8').includes('Ergänzt.'))

    // Creating a note that the caller believes exists is a conflict too.
    assert.throws(
      () => writeNote(fx.db, fx.workspaceId, agent, 'Master/Gibt es nicht.md', 'neu', { expectedHash: 'deadbeef' }),
      NoteConflictError)

    // And the note the tracker owns refuses an edit unless it is asked twice.
    assert.throws(
      () => writeNote(fx.db, fx.workspaceId, agent, 'Auftrag/Generierte Regeln.md', '# kaputt', {}),
      NoteGeneratedError)
    const forced = writeNote(fx.db, fx.workspaceId, agent, 'Auftrag/Generierte Regeln.md',
      '# absichtlich geändert\n', { allowGenerated: true })
    assert.equal(forced.created, false)
  } finally { fx.cleanup() }
})

test('M2: the graph carries type colour groups, filters and a focus', () => {
  const fx = noteFixture()
  try {
    registerPlanet(fx.db, fx.planetRoot, 'plugpt')
    setPlanetIndexSelection(fx.db, fx.workspaceId, [])
    indexPlanetWorkspace(fx.db, fx.workspaceId, { full: true })

    const graph = noteGraph(fx.db, fx.workspaceId, { limit: 100 })
    assert.equal(graph.coverage.notesInScope, fx.expected.length)
    assert.equal(graph.nodes.length, fx.expected.length)

    // Groups are the note types, each with a stable colour derived from its
    // own name: the same type is the same colour after a restart.
    const groups = new Map(graph.groups.map(group => [group.name, group]))
    assert.ok(groups.has('gate') && groups.has('regel') && groups.has('audit') && groups.has('uebersicht'))
    assert.equal(groups.get('gate')?.count, 2)
    assert.equal(groups.get('gate')?.color, noteGraph(fx.db, fx.workspaceId, { limit: 100 })
      .groups.find(group => group.name === 'gate')?.color)
    assert.equal(groups.get('gate')?.color, groupColor('gate').color,
      'the colour of a type is derived from its name, so it survives a restart')

    // Filters reuse the property language, so the graph and the query agree.
    const filtered = noteGraph(fx.db, fx.workspaceId, { filter: 'typ=gate', limit: 100 })
    assert.deepEqual(filtered.nodes.map(node => node.path).sort(),
      ['Master/Welle R12.md', 'Master/Welle R13.md'])
    assert.equal(filtered.coverage.filter, 'typ=gate')

    // Focus walks the link graph from one note, outwards, both directions.
    const focused = noteGraph(fx.db, fx.workspaceId, { focus: 'Master/Welle R12.md', depth: 1, limit: 100 })
    const focusNode = focused.nodes.find(node => node.focus)
    assert.ok(focusNode, 'the focus note is in its own graph')
    assert.equal(focusNode?.depth, 0)
    assert.ok(focused.nodes.some(node => node.path === 'Master/00 Regeln.md'), 'the backlink is one step away')
    assert.ok(focused.nodes.some(node => node.path === '00 Übersicht.md'), 'a note that links here is one step away')
    assert.ok(focused.edges.some(edge => edge.direction === 1), 'an outgoing link is marked as such')
    assert.ok(focused.edges.some(edge => edge.direction === 2), 'an incoming link is marked as such')
    assert.ok(focused.nodes.every(node => node.depth >= 0 && node.depth <= 1))

    // A focus nobody knows is not an error, it is an empty graph with the
    // coverage that says why.
    const lonely = noteGraph(fx.db, fx.workspaceId, { focus: 'Master/Gibt es nicht.md', depth: 2 })
    assert.equal(lonely.nodes.length, 0)
    assert.equal(lonely.coverage.notesInScope, fx.expected.length)
  } finally { fx.cleanup() }
})

/* ─────────────────────────────────────────────────────────────────────────────
 * The real vault.
 *
 * The acceptance criterion says "20 randomly chosen notes", and a fixture
 * cannot satisfy it: the fixture is written to be understood. This runs against
 * whichever planet store PLUGBRAIN_HOME points at, picks its notes with a
 * seeded shuffle so a failure is reproducible, and compares each of them with
 * the same reference parser. It skips — loudly — when no indexed planet is
 * available, because a test that silently passes on an empty database is worse
 * than one that does not run.
 * ────────────────────────────────────────────────────────────────────────── */

function realStore(): { db: DatabaseSync; workspaceId: string; close: () => void } | null {
  const home = process.env.PLUGBRAIN_HOME
  if (!home) return null
  const file = join(home, 'plugbrain.db')
  if (!existsSync(file)) return null
  const db = openStore(file)
  const row = db.prepare(
    `SELECT workspace_id AS workspaceId, COUNT(*) AS n FROM note_body
      GROUP BY workspace_id ORDER BY n DESC LIMIT 1`).get() as { workspaceId: string; n: number } | undefined
  if (row === undefined || Number(row.n) === 0) { db.close(); return null }
  return { db, workspaceId: row.workspaceId, close: () => db.close() }
}

/** Deterministic PRNG, so "randomly chosen" is still reproducible. */
function shuffled<T>(items: T[], seed: number): T[] {
  const out = [...items]
  let state = seed >>> 0
  const next = (): number => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0x100000000
  }
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1))
    const swap = out[i]
    out[i] = out[j]
    out[j] = swap
  }
  return out
}

test('M2: twenty randomly chosen notes of the real vault agree with the reference parser', async (t) => {
  const store = realStore()
  if (store === null) {
    t.skip('no indexed planet under PLUGBRAIN_HOME — set it to run the real-vault comparison')
    return
  }
  try {
    const { db, workspaceId } = store
    access.registerAgent(db, 'test-reader', 'test reader')
    const root = (db.prepare('SELECT root FROM workspaces WHERE id = ?').get(workspaceId) as { root: string }).root
    const all = (db.prepare(
      `SELECT path FROM files WHERE workspace_id = ? AND checkout_id IS NULL
        ORDER BY path`).all(workspaceId) as unknown as Array<{ path: string }>).map(row => row.path)
    assert.ok(all.length >= 20, `the real vault should hold notes, found ${all.length}`)

    const chosen = shuffled(all, 20260917).slice(0, 20)
    const noteNames = new Set(all.map(path =>
      (path.split('/').pop() ?? path).replace(/\.md$/i, '').toLowerCase()))
    let compared = 0
    let propertyRows = 0
    let linkRows = 0
    let backlinkRows = 0

    for (const rel of chosen) {
      const content = readFileSync(join(root, ...rel.split('/')), 'utf8')
      const reference = referenceNote(content)
      const view = readNote(db, workspaceId, 'test-reader', rel)

      assert.deepEqual(byKey(view.properties), byKey(reference.properties),
        `properties of ${rel} disagree with the reference parser`)
      assert.deepEqual(linksAsSet(view.links), linksAsSet(reference.links),
        `links of ${rel} disagree with the reference parser`)
      assert.deepEqual([...view.tags].sort(), [...reference.tags].sort(), `tags of ${rel} disagree`)
      assert.equal(view.indexStale, false, `${rel} is indexed but reports staleness`)

      for (const link of view.links) {
        const known = noteNames.has(link.target.toLowerCase().replace(/\.md$/, ''))
        if (known && link.status !== 'resolved' && link.status !== 'self' && link.status !== 'ambiguous') {
          assert.fail(`${rel}: '${link.target}' names a note but is '${link.status}'`)
        }
      }

      // Backlinks are compared over the NOTE scope, which is the part of the
      // vault the reference parser can read without walking 100 000 files of
      // source checkouts. The cross-scope case (a code document linking in) is
      // covered exactly by the fixture above.
      const basename = (rel.split('/').pop() ?? rel).replace(/\.md$/i, '').toLowerCase()
      const expectedBacklinks = all.filter(other => {
        if (other === rel) return true
        const text = readFileSync(join(root, ...other.split('/')), 'utf8')
        return referenceNote(text).links.some(link =>
          link.target.toLowerCase().replace(/\.md$/, '') === basename)
      })
      const actualBacklinks = [...new Set(view.backlinks.map(back => back.path))]
        .filter(path => path !== rel)
      assert.deepEqual(actualBacklinks.sort(), expectedBacklinks.filter(path => path !== rel).sort(),
        `backlinks of ${rel} disagree with the reference parser`)

      propertyRows += view.properties.length
      linkRows += view.links.length
      backlinkRows += view.backlinks.length
      compared += 1
    }

    assert.equal(compared, 20)
    console.log(`        real vault: ${all.length} notes, 20 compared, ` +
      `${propertyRows} properties, ${linkRows} links, ${backlinkRows} backlinks`)
  } finally { store.close() }
})
