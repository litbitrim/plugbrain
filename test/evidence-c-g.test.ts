/**
 * BRAIN-BE-01 / B5: Evidence C and G as tests.
 *
 * C — Voll gegen Delta: after real changes, renames and deletions, the
 * incremental index and the full index produce the same symbols and edges
 * (numbers plus hash).
 *
 * G — Backup und Restore: there and back, including notes, properties, links
 * and provenance (activity + chronicle), on an isolated home.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { openStore } from '../src/store/schema.ts'
import { backupStore, restoreStore, verifyBackupFile } from '../src/store/backup.ts'
import { indexPlanetWorkspace } from '../src/planet.ts'
import { planetHistory } from '../src/planet.ts'
import * as vault from '../src/notes/vault.ts'
import * as access from '../src/access.ts'
import * as chronicle from '../src/chronicle.ts'

interface GraphSnapshot {
  symbolCount: number
  edgeCount: number
  symbolHash: string
  edgeHash: string
}

/** Symbols and edges by CONTENT — ids differ between runs, meaning must not. */
function snapshot(db: DatabaseSync, workspaceId: string): GraphSnapshot {
  const symbols = db.prepare(`
    SELECT f.path AS file, s.name AS name, s.kind AS kind, s.line AS line,
           s.exported AS exported, s.container AS container
      FROM symbols s JOIN files f ON f.id = s.file_id
      WHERE f.workspace_id = ? ORDER BY file, name, kind, line, exported, container
  `).all(workspaceId)
  const edges = db.prepare(`
    SELECT ef.path AS srcFile, ss.name AS srcSymbol, ss.kind AS srcKind,
           df.path AS dstFile, ds.name AS dstSymbol,
           e.kind AS kind, e.resolved AS resolved, e.raw_target AS rawTarget, e.line AS line
      FROM edges e
      LEFT JOIN symbols ss ON ss.id = e.src_symbol
      LEFT JOIN symbols ds ON ds.id = e.dst_symbol
      LEFT JOIN files ef ON ef.id = e.src_file
      LEFT JOIN files df ON df.id = e.dst_file
      WHERE e.workspace_id = ?
      ORDER BY srcFile, srcSymbol, srcKind, kind, dstFile, dstSymbol, line, rawTarget
  `).all(workspaceId)
  const hash = (rows: unknown[]): string =>
    createHash('sha256').update(JSON.stringify(rows)).digest('hex').slice(0, 16)
  return {
    symbolCount: symbols.length,
    edgeCount: edges.length,
    symbolHash: hash(symbols),
    edgeHash: hash(edges),
  }
}

function registerWorkspace(db: DatabaseSync, id: string, root: string): void {
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(id, 'Evidence Workspace', root, new Date().toISOString())
}

test('B5-C: after edits, renames and deletions, incremental and full index agree (numbers plus hash)', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-ev-c-'))
  const root = join(dir, 'ws')
  mkdirSync(join(root, 'notes'), { recursive: true })
  mkdirSync(join(root, 'src'), { recursive: true })
  const db = openStore(join(dir, 'brain.db'))
  try {
    registerWorkspace(db, 'ws-ev-c', root)

    writeFileSync(join(root, 'notes', 'alpha.md'),
      '---\nstatus: draft\n---\n# Alpha\n\nSiehe [[beta]] und die Funktion add.\n')
    writeFileSync(join(root, 'notes', 'beta.md'), '# Beta\n\nDas Ziel der Arbeit.\n')
    writeFileSync(join(root, 'src', 'util.ts'),
      'export function add(a: number, b: number): number {\n  return a + b\n}\n')
    writeFileSync(join(root, 'src', 'main.ts'),
      "import { add } from './util.ts'\nexport function main(): number {\n  return add(1, 2)\n}\n")

    const full1 = indexPlanetWorkspace(db, 'ws-ev-c', { full: true })
    assert.strictEqual(full1.mode, 'full')
    const before = snapshot(db, 'ws-ev-c')
    assert.ok(before.symbolCount > 0, 'the full index must produce symbols')
    assert.ok(before.edgeCount > 0, 'the full index must produce edges')

    // ── Echte Änderungen: Änderung, Umbenennung, Löschung, Hinzufügung ──
    writeFileSync(join(root, 'src', 'util.ts'),
      'export function add(a: number, b: number): number {\n  return a + b\n}\nexport function mul(a: number, b: number): number {\n  return a * b\n}\n')
    writeFileSync(join(root, 'notes', 'alpha.md'),
      '---\nstatus: open\n---\n# Alpha\n\nSiehe [[gamma]] und die Funktion mul.\n')
    renameSync(join(root, 'notes', 'beta.md'), join(root, 'notes', 'gamma.md'))
    rmSync(join(root, 'src', 'main.ts'))
    writeFileSync(join(root, 'src', 'extra.ts'), 'export function extra(): string {\n  return "extra"\n}\n')

    // ── Delta-Index (incremental) ────────────────────────────────────────
    const delta = indexPlanetWorkspace(db, 'ws-ev-c', {})
    assert.strictEqual(delta.mode, 'incremental', 'a second pass over a changed tree must be incremental')
    assert.ok(delta.changed.added >= 1, 'the added file must be classified')
    assert.ok(delta.changed.modified >= 1, 'the edited files must be classified')
    assert.ok(delta.changed.renamed >= 1, 'the rename must be classified')
    assert.ok(delta.changed.deleted >= 1, 'the deletion must be classified')
    assert.ok(delta.parsed <= 4, `the delta must re-parse only the touched files, got ${delta.parsed}`)

    const afterDelta = snapshot(db, 'ws-ev-c')

    // ── Voll-Index über demselben geänderten Baum ────────────────────────
    const full2 = indexPlanetWorkspace(db, 'ws-ev-c', { full: true })
    assert.strictEqual(full2.mode, 'full')
    const afterFull = snapshot(db, 'ws-ev-c')

    assert.strictEqual(afterDelta.symbolCount, afterFull.symbolCount,
      `symbols: delta ${afterDelta.symbolCount} vs full ${afterFull.symbolCount}`)
    assert.strictEqual(afterDelta.symbolHash, afterFull.symbolHash,
      'the delta and full symbol sets must be identical (hash)')
    assert.strictEqual(afterDelta.edgeCount, afterFull.edgeCount,
      `edges: delta ${afterDelta.edgeCount} vs full ${afterFull.edgeCount}`)
    assert.strictEqual(afterDelta.edgeHash, afterFull.edgeHash,
      'the delta and full edge sets must be identical (hash)')

    // The rename is reflected, the deletion is tombstoned with provenance.
    const paths = (db.prepare("SELECT path FROM files WHERE workspace_id = 'ws-ev-c' ORDER BY path").all() as
      Array<{ path: string }>).map((r) => r.path)
    assert.ok(paths.includes('notes/gamma.md'), 'the renamed note must be indexed under its new path')
    assert.ok(!paths.includes('notes/beta.md'), 'the old note path must be gone')
    const tombstones = planetHistory(db, 'ws-ev-c')
    assert.ok(tombstones.some((t) => t.path === 'src/main.ts' && t.deletedAt !== null),
      'the deleted file must carry a tombstone with a timestamp')
  } finally {
    try { db.close() } catch { /* ignore */ }
    try { rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }) } catch { /* best effort */ }
  }
})

test('B5-G: backup and restore round-trip preserves notes, properties, links and provenance', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-ev-g-'))
  const root = join(dir, 'ws')
  mkdirSync(join(root, 'notes'), { recursive: true })
  const dbFile = join(dir, 'brain.db')
  let db: DatabaseSync = openStore(dbFile)
  try {
    registerWorkspace(db, 'ws-ev-g', root)
    access.registerAgent(db, 'nv01', 'Worker')

    // ── Notizen, Eigenschaften, Links — über den echten Schreibpfad ─────
    vault.writeNote(db, 'ws-ev-g', 'nv01', 'notes/plan.md',
      '# Plan\n\nB0 bis B5, nacheinander.\n', { createOnly: true })
    vault.writeNote(db, 'ws-ev-g', 'nv01', 'notes/idea.md',
      '---\nstatus: open\nowner: nv01\n---\n# Idee\n\nSiehe [[plan]].\n\n#brain #evidence\n', { createOnly: true })
    indexPlanetWorkspace(db, 'ws-ev-g', { full: true })

    // ── Provenienz: chronicle + activity ─────────────────────────────────
    chronicle.record(db, 'ws-ev-g', 'turn-nv01', 'note', 'B4 abgeschlossen, Q-Kette grün.',
      { agentId: 'nv01' })

    // ── Backup ───────────────────────────────────────────────────────────
    const backupPath = join(dir, 'backup.db')
    const backup = backupStore(db, backupPath)
    assert.ok(backup.bytes > 0, 'the backup must carry the data')
    assert.ok(existsSync(backupPath))
    const verified = verifyBackupFile(backupPath)
    assert.strictEqual(verified.valid, true, `verifyBackupFile: ${verified.error ?? ''}`)

    // The live note body, for the round-trip comparison.
    const liveIdea = vault.readNote(db, 'ws-ev-g', 'nv01', 'notes/idea.md')
    const liveProps = db.prepare(`
      SELECT key, value, raw, ordinal, is_link, line FROM note_properties
        WHERE workspace_id = 'ws-ev-g' ORDER BY key, ordinal
    `).all()
    const liveLinks = db.prepare(`
      SELECT target, alias, section, embed, source, status, line FROM note_links
        WHERE workspace_id = 'ws-ev-g' ORDER BY target, line
    `).all()
    const liveChronicle = db.prepare(`
      SELECT turn_id, kind, body, agent_id FROM chronicle
        WHERE workspace_id = 'ws-ev-g' ORDER BY id
    `).all()
    const liveActivity = db.prepare(`
      SELECT path, agent_id, action FROM activity
        WHERE workspace_id = 'ws-ev-g' ORDER BY id
    `).all()

    // ── Restore ──────────────────────────────────────────────────────────
    db.close()
    const restored = restoreStore(backupPath, dbFile)
    assert.strictEqual(restored.ok, true, 'restoreStore failed')
    db = openStore(dbFile)

    // ── Hin und zurück ───────────────────────────────────────────────────
    assert.strictEqual((db.prepare("SELECT id FROM workspaces WHERE id = 'ws-ev-g'").get() as { id: string } | undefined)?.id,
      'ws-ev-g', 'the workspace identity must survive the round-trip')

    const restoredIdea = vault.readNote(db, 'ws-ev-g', 'nv01', 'notes/idea.md')
    assert.strictEqual(restoredIdea.content, liveIdea.content, 'the note body must survive')

    const restoredProps = db.prepare(`
      SELECT key, value, raw, ordinal, is_link, line FROM note_properties
        WHERE workspace_id = 'ws-ev-g' ORDER BY key, ordinal
    `).all()
    assert.deepStrictEqual(restoredProps, liveProps, 'the properties must survive')

    const restoredLinks = db.prepare(`
      SELECT target, alias, section, embed, source, status, line FROM note_links
        WHERE workspace_id = 'ws-ev-g' ORDER BY target, line
    `).all()
    assert.deepStrictEqual(restoredLinks, liveLinks, 'the wiki links must survive')
    assert.ok((restoredLinks as Array<{ status: string }>).some((l) => l.status === 'resolved'),
      'the [[plan]] link must be resolved on both sides')

    const restoredChronicle = db.prepare(`
      SELECT turn_id, kind, body, agent_id FROM chronicle
        WHERE workspace_id = 'ws-ev-g' ORDER BY id
    `).all()
    assert.deepStrictEqual(restoredChronicle, liveChronicle, 'the chronicle provenance must survive')

    const restoredActivity = db.prepare(`
      SELECT path, agent_id, action FROM activity
        WHERE workspace_id = 'ws-ev-g' ORDER BY id
    `).all()
    assert.deepStrictEqual(restoredActivity, liveActivity, 'the activity provenance must survive')
  } finally {
    try { db.close() } catch { /* ignore */ }
    try { rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }) } catch { /* best effort */ }
  }
})
