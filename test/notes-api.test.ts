import { strict as assert } from 'node:assert'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { serve } from '../src/server/api.ts'
import * as access from '../src/access.ts'

test('knowledge API writes with a version fence, keeps attachments in-vault, and exports real ZIP bytes', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-notes-api-'))
  const root = join(dir, 'vault')
  mkdirSync(join(root, 'Notizen'), { recursive: true })
  writeFileSync(join(root, 'Notizen', 'start.md'), '# Start\n\n[[other]]\n', 'utf8')
  const db = openStore(join(dir, 'brain.db'))
  const workspace = 'notes-api'
  db.prepare('INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)').run(workspace, 'vault', root, new Date().toISOString())
  access.registerAgent(db, 'reader', 'Local reader')
  const server = await serve({ db, uiRoot: null, authKey: 'local-test-token' }, 0)
  const base = `http://127.0.0.1:${server.port}`
  const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer local-test-token' }
  try {
    const created = await fetch(`${base}/api/notes/write`, { method: 'POST', headers, body: JSON.stringify({ workspace, agentId: 'reader', path: 'Notizen/other.md', content: '# Other\n\n#tag\n' }) })
    assert.equal(created.status, 200)
    const first = await (await fetch(`${base}/api/notes/read?workspace=${workspace}&agentId=reader&path=Notizen%2Fother.md`)).json() as { note: { hash: string; content: string } }
    assert.equal(first.note.content, '# Other\n\n#tag\n')

    const changed = await fetch(`${base}/api/notes/write`, { method: 'POST', headers, body: JSON.stringify({ workspace, agentId: 'reader', path: 'Notizen/other.md', content: '# Changed\n', expectedHash: first.note.hash }) })
    assert.equal(changed.status, 200)
    const conflict = await fetch(`${base}/api/notes/write`, { method: 'POST', headers, body: JSON.stringify({ workspace, agentId: 'reader', path: 'Notizen/other.md', content: '# Stale\n', expectedHash: first.note.hash }) })
    assert.equal(conflict.status, 409, 'stale editor content is never overwritten')

    const attachment = await fetch(`${base}/api/notes/attachment`, { method: 'POST', headers, body: JSON.stringify({ workspace, agentId: 'reader', note: 'Notizen/other.md', name: 'proof.txt', base64: Buffer.from('attachment proof').toString('base64') }) })
    assert.equal(attachment.status, 200)
    const listed = await (await fetch(`${base}/api/notes/attachments?workspace=${workspace}&note=Notizen%2Fother.md`)).json() as { attachments: Array<{ name: string; path: string }> }
    assert.deepEqual(listed.attachments.map(item => item.name), ['proof.txt'])
    assert.match(listed.attachments[0].path, /^Notizen\/attachments\/other\/proof\.txt$/)
    const opened = await fetch(`${base}/api/notes/attachment?workspace=${workspace}&agentId=reader&note=Notizen%2Fother.md&name=proof.txt`)
    assert.equal(await opened.text(), 'attachment proof')

    const archive = await fetch(`${base}/api/notes/export?workspace=${workspace}&agentId=reader`)
    assert.equal(archive.status, 200)
    assert.equal((await archive.arrayBuffer()).slice(0, 4).byteLength, 4)
    assert.deepEqual([...new Uint8Array((await (await fetch(`${base}/api/notes/export?workspace=${workspace}&agentId=reader`)).arrayBuffer()).slice(0, 4))], [0x50, 0x4b, 0x03, 0x04])
  } finally {
    await server.close(); db.close(); rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
  }
})
