import './helpers/isolated-home.ts'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { openStore } from '../src/store/schema.ts'
import { backupStore, restoreStore, verifyBackupFile } from '../src/store/backup.ts'
import { serve } from '../src/server/api.ts'
import * as coord from '../src/coord/index.ts'
import * as access from '../src/access.ts'

interface BackupVerifyPayload {
  ok: boolean
  valid: boolean
  counts?: { workspaces?: number }
}

interface AgentInspectPayload {
  ok: boolean
  agent: { id: string; model: string; taskId: string; checkoutId: string }
  claims: Array<{ paths: string[] }>
  dateiereignisse: Array<{ path: string }>
  messages: Array<{ subject: string }>
}

test('M5: backupStore creates consistent standalone database from live WAL state', () => {
  const tmp = join(tmpdir(), `plugbrain-test-backup-${Date.now()}`)
  mkdirSync(tmp, { recursive: true })

  try {
    const dbPath = join(tmp, 'plugbrain.db')
    const db = openStore(dbPath)

    // Register a workspace and write some data
    const wsId = 'ws-test-backup'
    db.prepare(`INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)`).run(
      wsId, 'Backup Test WS', tmp, new Date().toISOString()
    )
    db.prepare(`INSERT INTO files (workspace_id, path, size, mtime, hash, loc, ext) VALUES (?, ?, ?, ?, ?, ?, ?)`).run(
      wsId, 'src/index.ts', 120, 1000, 'hash1', 42, '.ts'
    )
    db.prepare(`INSERT INTO symbols (file_id, name, kind, line) VALUES (?, ?, ?, ?)`).run(
      1, 'MainApp', 'class', 10
    )

    // Register an agent and write uncheckpointed activity
    access.registerAgent(db, 'agent-backup', 'Agent Backup Tester')
    db.prepare(`INSERT INTO activity (workspace_id, agent_id, path, action, at) VALUES (?, ?, ?, ?, ?)`).run(
      wsId, 'agent-backup', 'src/index.ts', 'write', new Date().toISOString()
    )

    // Uncheckpointed WAL writes are present
    const backupPath = join(tmp, 'backups', 'live_backup.db')
    const result = backupStore(db, backupPath)

    assert.equal(result.ok, true)
    assert.equal(existsSync(backupPath), true)
    assert.ok(result.bytes > 0)
    assert.ok(result.durationMs >= 0)

    // Verify backup file independently
    const verification = verifyBackupFile(backupPath)
    assert.equal(verification.valid, true)
    assert.equal(verification.counts?.workspaces, 1)
    assert.equal(verification.counts?.files, 1)
    assert.equal(verification.counts?.symbols, 1)

    db.close()
  } finally {
    try { rmSync(tmp, { recursive: true, force: true }) } catch { /* ignore */ }
  }
})

test('M5: verifyBackupFile returns false for nonexistent or invalid files', () => {
  const tmp = join(tmpdir(), `plugbrain-test-verify-${Date.now()}`)
  mkdirSync(tmp, { recursive: true })

  try {
    // Nonexistent file
    const noFile = verifyBackupFile(join(tmp, 'does_not_exist.db'))
    assert.equal(noFile.valid, false)
    assert.match(noFile.error ?? '', /does not exist/)

    // Invalid / garbage file
    const badFile = join(tmp, 'corrupt.db')
    writeFileSync(badFile, 'THIS_IS_NOT_A_SQLITE_DATABASE')
    const corrupt = verifyBackupFile(badFile)
    assert.equal(corrupt.valid, false)
    assert.ok(corrupt.error !== undefined)
  } finally {
    try { rmSync(tmp, { recursive: true, force: true }) } catch { /* ignore */ }
  }
})

test('M5: restoreStore restores database, clears WAL/SHM, and retains identity & data', () => {
  const tmp = join(tmpdir(), `plugbrain-test-restore-${Date.now()}`)
  mkdirSync(tmp, { recursive: true })

  try {
    const originalDbPath = join(tmp, 'original.db')
    const originalDb = openStore(originalDbPath)

    originalDb.prepare(`INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)`).run(
      'ws-orig', 'Original WS', tmp, new Date().toISOString()
    )
    originalDb.prepare(`INSERT INTO files (workspace_id, path, size, mtime, hash, loc, ext) VALUES (?, ?, ?, ?, ?, ?, ?)`).run(
      'ws-orig', 'src/hello.ts', 200, 2000, 'hash2', 100, '.ts'
    )
    const backupFile = join(tmp, 'snapshot.db')
    backupStore(originalDb, backupFile)
    originalDb.close()

    // Restore to a fresh target directory with existing stale wal/shm
    const targetDir = join(tmp, 'restored_dir')
    mkdirSync(targetDir, { recursive: true })
    const targetDbPath = join(targetDir, 'plugbrain.db')
    writeFileSync(`${targetDbPath}-wal`, 'stale wal bytes')
    writeFileSync(`${targetDbPath}-shm`, 'stale shm bytes')

    const restoreRes = restoreStore(backupFile, targetDbPath)
    assert.equal(restoreRes.ok, true)
    assert.equal(restoreRes.workspaces, 1)
    assert.equal(restoreRes.files, 1)

    // Stale WAL and SHM files were removed
    assert.equal(existsSync(`${targetDbPath}-wal`), false)
    assert.equal(existsSync(`${targetDbPath}-shm`), false)

    // Open restored store and check data integrity
    const restored = openStore(targetDbPath)
    const ws = restored.prepare('SELECT id, name FROM workspaces WHERE id = ?').get('ws-orig') as { id: string; name: string }
    assert.equal(ws.name, 'Original WS')
    const file = restored.prepare('SELECT path, loc FROM files WHERE workspace_id = ?').get('ws-orig') as { path: string; loc: number }
    assert.equal(file.path, 'src/hello.ts')
    assert.equal(file.loc, 100)
    restored.close()
  } finally {
    try { rmSync(tmp, { recursive: true, force: true }) } catch { /* ignore */ }
  }
})

test('M5: HTTP API /api/backup, /api/backup/verify and /api/agent/inspect serve real data', async () => {
  const tmp = join(tmpdir(), `plugbrain-test-http-m5-${Date.now()}`)
  mkdirSync(tmp, { recursive: true })

  let handle: any
  try {
    const dbPath = join(tmp, 'plugbrain.db')
    const db = openStore(dbPath)
    const wsId = 'ws-http-m5'
    db.prepare(`INSERT INTO workspaces (id, name, root, created_at) VALUES (?, ?, ?, ?)`).run(
      wsId, 'HTTP M5 WS', tmp, new Date().toISOString()
    )

    // Register swarm agent with model and host
    coord.registerSwarmAgent(db, {
      agentId: 'agent-inspect-1',
      name: 'Agent Inspector',
      model: 'gemini-2.5-pro',
      host: 'worker-node-1',
      workspaceId: wsId,
      checkoutId: 'repo-core',
      taskId: 'task-inspect-42',
      missionId: 'M5-INSPECT',
    })

    // Acquire lease
    coord.acquireLease(db, wsId, {
      agentId: 'agent-inspect-1',
      taskId: 'task-inspect-42',
      paths: ['src/main.ts'],
      mode: 'write',
      ttlMs: 60000,
    })

    // File activity
    db.prepare(`INSERT INTO activity (workspace_id, agent_id, path, action, at) VALUES (?, ?, ?, ?, ?)`).run(
      wsId, 'agent-inspect-1', 'src/main.ts', 'write', new Date().toISOString()
    )

    // Register second agent
    coord.registerSwarmAgent(db, {
      agentId: 'agent-inspect-2',
      name: 'Agent Two',
      workspaceId: wsId,
    })

    // Message
    coord.sendMessage(db, {
      workspaceId: wsId,
      fromAgent: 'agent-inspect-1',
      toAgent: 'agent-inspect-2',
      subject: 'Handoff ready',
      body: 'Inspect data ready',
    })

    const authKey = 'test-token-m5'
    handle = await serve({ db, uiRoot: null, authKey, requireAuth: true }, 0)
    const port = handle.port

    // 1. Unauthenticated backup fails with 401
    const unauth = await fetch(`http://127.0.0.1:${port}/api/backup`, { method: 'POST' })
    assert.equal(unauth.status, 401)

    // 2. Authenticated backup succeeds
    const backupDest = join(tmp, 'api_backup.db')
    const backupRes = await fetch(`http://127.0.0.1:${port}/api/backup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authKey}`,
      },
      body: JSON.stringify({ targetPath: backupDest }),
    })
    assert.equal(backupRes.status, 200)
    const backupData = await backupRes.json() as { ok: boolean }
    assert.equal(backupData.ok, true)
    assert.equal(existsSync(backupDest), true)

    // 3. /api/backup/verify
    const verifyRes = await fetch(`http://127.0.0.1:${port}/api/backup/verify?path=${encodeURIComponent(backupDest)}`)
    assert.equal(verifyRes.status, 200)
    const verifyData = await verifyRes.json() as BackupVerifyPayload
    assert.equal(verifyData.ok, true)
    assert.equal(verifyData.valid, true)
    assert.equal(verifyData.counts?.workspaces, 1)

    // 4. /api/agent/inspect
    const inspectRes = await fetch(`http://127.0.0.1:${port}/api/agent/inspect?agentId=agent-inspect-1&workspace=${wsId}`)
    assert.equal(inspectRes.status, 200)
    const inspectData = await inspectRes.json() as AgentInspectPayload
    assert.equal(inspectData.ok, true)
    assert.equal(inspectData.agent.id, 'agent-inspect-1')
    assert.equal(inspectData.agent.model, 'gemini-2.5-pro')
    assert.equal(inspectData.agent.taskId, 'task-inspect-42')
    assert.equal(inspectData.agent.checkoutId, 'repo-core')
    assert.equal(inspectData.claims.length, 1)
    assert.deepEqual(inspectData.claims[0].paths, ['src/main.ts'])
    assert.equal(inspectData.dateiereignisse.length, 1)
    assert.equal(inspectData.dateiereignisse[0].path, 'src/main.ts')
    assert.equal(inspectData.messages.length, 1)
    assert.equal(inspectData.messages[0].subject, 'Handoff ready')

    // 5. Negative inspect test: non-existent agent returns 404
    const notFoundRes = await fetch(`http://127.0.0.1:${port}/api/agent/inspect?agentId=unknown-agent`)
    assert.equal(notFoundRes.status, 404)

    db.close()
  } finally {
    if (handle) await handle.close()
    try { rmSync(tmp, { recursive: true, force: true }) } catch { /* ignore */ }
  }
})
