/**
 * A workspace opened through a link is still one workspace.
 *
 * The root a person types can itself be a link: a Windows junction, a symlink,
 * or macOS's temp and /tmp paths (/var -> /private/var). Registration keeps the
 * path as typed, and the containment check must compare it with the real root
 * like with like. Before the fix every read in such a workspace was refused as
 * "path escapes the workspace", so a vault opened under /var or through a
 * junction showed search hits it could not open. The escape guards must hold
 * all the same.
 */
import './helpers/isolated-home.ts'
import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import * as access from '../src/access.ts'
import { openStore } from '../src/store/schema.ts'

// 'junction' needs no privilege on Windows and is ignored elsewhere.
const linkDir = (target: string, path: string): void => symlinkSync(target, path, 'junction')

test('a workspace registered through a linked root reads its files and still refuses escapes', () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-linked-root-'))
  try {
    const real = join(dir, 'real')
    const outside = join(dir, 'outside')
    mkdirSync(join(real, 'Notizen'), { recursive: true })
    mkdirSync(outside, { recursive: true })
    writeFileSync(join(real, 'Notizen', 'Alpha.md'), '# Alpha\n\nStandalone Wissenssuche.\n', 'utf8')
    writeFileSync(join(outside, 'secret.txt'), 'SECRET', 'utf8')
    linkDir(outside, join(real, 'escape'))
    const linkedRoot = join(dir, 'linked')
    linkDir(real, linkedRoot)

    const db = openStore(join(dir, 'store.db'))
    try {
      db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)')
        .run('ws-linked', 'linked', linkedRoot, new Date().toISOString())
      access.registerAgent(db, 'agent-linked', 'Linked root probe')

      const note = access.readFile(db, 'ws-linked', 'agent-linked', 'Notizen/Alpha.md')
      assert.match(note.content, /Standalone Wissenssuche\./)

      assert.throws(
        () => access.readFile(db, 'ws-linked', 'agent-linked', 'escape/secret.txt'),
        access.AccessDenied,
        'a link inside the workspace that leaves it stays refused',
      )
      assert.throws(
        () => access.readFile(db, 'ws-linked', 'agent-linked', '../outside/secret.txt'),
        access.AccessDenied,
        'a lexical traversal stays refused',
      )
    } finally {
      db.close()
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
