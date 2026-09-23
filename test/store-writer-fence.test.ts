/**
 * The writer fence: a store remembers the newest writer generation that wrote
 * it, and an older build may still read it but never write it.
 *
 * The case it exists for happened on 23.09.2026: an installed 0.1.1 Core was
 * started at every sign-in against a planet that 0.2.0 had already pruned and
 * re-indexed with different rules.
 */
import { strict as assert } from 'node:assert'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore, storedWriterGeneration, WRITER_GENERATION } from '../src/store/schema.ts'

function store() {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-fence-'))
  return { file: join(dir, 'brain.db'), cleanup: () => rmSync(dir, { recursive: true, force: true }) }
}

const addWorkspace = (db: ReturnType<typeof openStore>, id: string): void => {
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
    .run(id, id, `C:\\planet\\${id}`, new Date().toISOString())
}

test('a new store records the writer generation of the build that created it', () => {
  const s = store()
  try {
    const db = openStore(s.file)
    db.close()
    assert.equal(storedWriterGeneration(s.file), WRITER_GENERATION)
  } finally { s.cleanup() }
})

test('an older build opens a newer store read-only: reads work, writes are refused', () => {
  const s = store()
  const errors: string[] = []
  const write = process.stderr.write.bind(process.stderr)
  try {
    const newer = openStore(s.file, { writerGeneration: WRITER_GENERATION + 1 })
    addWorkspace(newer, 'ws-newer')
    newer.close()

    process.stderr.write = ((chunk: string | Uint8Array) => { errors.push(String(chunk)); return true }) as typeof process.stderr.write
    const older = openStore(s.file)
    process.stderr.write = write
    try {
      assert.match(errors.join(''), /Opened READ-ONLY/)
      const row = older.prepare('SELECT id FROM workspaces').get() as { id: string }
      assert.equal(row.id, 'ws-newer', 'the older build still reads')
      assert.throws(() => addWorkspace(older, 'ws-older'), /readonly/i, 'and cannot write')
    } finally { older.close() }
    assert.equal(storedWriterGeneration(s.file), WRITER_GENERATION + 1, 'the fence is not lowered')
  } finally {
    process.stderr.write = write
    s.cleanup()
  }
})

test('the same or a newer build writes, and a newer build raises the fence', () => {
  const s = store()
  try {
    openStore(s.file, { writerGeneration: WRITER_GENERATION - 1 }).close()
    assert.equal(storedWriterGeneration(s.file), WRITER_GENERATION - 1)
    const current = openStore(s.file)
    addWorkspace(current, 'ws-current')
    current.close()
    assert.equal(storedWriterGeneration(s.file), WRITER_GENERATION)
    const inspect = openStore(s.file, { readOnly: true })
    assert.throws(() => addWorkspace(inspect, 'ws-inspect'), /readonly/i, 'an explicit read-only open writes nothing')
    inspect.close()
  } finally { s.cleanup() }
})
