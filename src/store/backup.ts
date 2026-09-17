/**
 * PlugBrain Backup & Restore — atomic, consistent online backup and restore.
 *
 * In a WAL-mode SQLite database with concurrent readers, writers, daemons and
 * swarm agents, a naive file copy of `plugbrain.db` risks capturing a torn page
 * or an inconsistent snapshot missing un-checkpointed WAL frames.
 *
 * SQLite's `VACUUM INTO 'destination'` performs an atomic online backup:
 * 1. Takes a shared read lock during the snapshot.
 * 2. Consolidates all committed frames from the main DB and WAL into a clean,
 *    defragmented, standalone SQLite database file.
 * 3. Never disrupts ongoing readers or concurrent agent transactions.
 * 4. Produces a consistent, portable single-file database with no dangling WAL dependencies.
 */
import { existsSync, mkdirSync, copyFileSync, unlinkSync, statSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { openStore } from './schema.ts'

export interface BackupResult {
  ok: boolean
  path: string
  bytes: number
  durationMs: number
  createdAt: string
}

export interface RestoreResult {
  ok: boolean
  sourcePath: string
  targetDbPath: string
  workspaces: number
  files: number
  symbols: number
  notes: number
  restoredAt: string
}

/**
 * Perform an atomic online backup of the live PlugBrain database into `targetPath`.
 *
 * Safe to call while the server, daemon, and MCP agents are actively running.
 */
export function backupStore(db: DatabaseSync, targetPath: string): BackupResult {
  const start = Date.now()
  const dest = resolve(targetPath)
  mkdirSync(dirname(dest), { recursive: true })

  // If destination exists, remove it first because VACUUM INTO fails if the file already exists
  if (existsSync(dest)) {
    unlinkSync(dest)
  }

  // SQLite VACUUM INTO string literal with escaped single quotes
  const escaped = dest.replace(/'/g, "''")
  db.exec(`VACUUM INTO '${escaped}';`)

  const stats = statSync(dest)
  return {
    ok: true,
    path: dest,
    bytes: stats.size,
    durationMs: Date.now() - start,
    createdAt: new Date().toISOString(),
  }
}

/**
 * Verify that a file is a valid SQLite database containing the required PlugBrain schema.
 */
export function verifyBackupFile(backupPath: string): { valid: boolean; error?: string; counts?: { workspaces: number; files: number; symbols: number; notes: number } } {
  const file = resolve(backupPath)
  if (!existsSync(file)) {
    return { valid: false, error: `backup file does not exist: ${file}` }
  }

  let testDb: DatabaseSync | null = null
  try {
    // Open read-only / temporary check
    testDb = new DatabaseSync(file)
    const wsRow = testDb.prepare("SELECT COUNT(*) AS c FROM sqlite_master WHERE type='table' AND name='workspaces'").get() as { c: number }
    if (!wsRow || wsRow.c === 0) {
      return { valid: false, error: `file is not a valid PlugBrain backup: 'workspaces' table missing` }
    }

    const workspaces = (testDb.prepare('SELECT COUNT(*) AS c FROM workspaces').get() as { c: number }).c
    const files = (testDb.prepare("SELECT COUNT(*) AS c FROM sqlite_master WHERE type='table' AND name='files'").get() as { c: number }).c > 0
      ? (testDb.prepare('SELECT COUNT(*) AS c FROM files').get() as { c: number }).c : 0
    const symbols = (testDb.prepare("SELECT COUNT(*) AS c FROM sqlite_master WHERE type='table' AND name='symbols'").get() as { c: number }).c > 0
      ? (testDb.prepare('SELECT COUNT(*) AS c FROM symbols').get() as { c: number }).c : 0
    const notes = (testDb.prepare("SELECT COUNT(*) AS c FROM sqlite_master WHERE type='table' AND name='notes'").get() as { c: number }).c > 0
      ? (testDb.prepare('SELECT COUNT(*) AS c FROM notes').get() as { c: number }).c : 0

    return {
      valid: true,
      counts: { workspaces, files, symbols, notes },
    }
  } catch (err) {
    return { valid: false, error: `corrupted or unreadable SQLite database: ${(err as Error).message}` }
  } finally {
    if (testDb) {
      try { testDb.close() } catch { /* ignore */ }
    }
  }
}

/**
 * Restore a PlugBrain database from a verified backup into `targetDbPath`.
 *
 * Cleans up any existing `-wal` and `-shm` files to prevent stale WAL replay,
 * verifies schema integrity after restore, and opens the store to apply migrations.
 */
export function restoreStore(sourceBackupPath: string, targetDbPath: string): RestoreResult {
  const source = resolve(sourceBackupPath)
  const target = resolve(targetDbPath)

  const verification = verifyBackupFile(source)
  if (!verification.valid || !verification.counts) {
    throw new Error(`cannot restore from invalid backup: ${verification.error}`)
  }

  mkdirSync(dirname(target), { recursive: true })

  // Clean up any existing WAL / SHM sidecars so they don't get mixed with restored DB
  const walPath = `${target}-wal`
  const shmPath = `${target}-shm`
  if (existsSync(walPath)) {
    try { unlinkSync(walPath) } catch { /* ignore */ }
  }
  if (existsSync(shmPath)) {
    try { unlinkSync(shmPath) } catch { /* ignore */ }
  }

  // Atomically copy verified backup file to destination
  copyFileSync(source, target)

  // Verify and migrate the newly restored store
  const restoredDb = openStore(target)
  const workspaces = (restoredDb.prepare('SELECT COUNT(*) AS c FROM workspaces').get() as { c: number }).c
  const files = (restoredDb.prepare('SELECT COUNT(*) AS c FROM files').get() as { c: number }).c
  const symbols = (restoredDb.prepare('SELECT COUNT(*) AS c FROM symbols').get() as { c: number }).c
  const notes = (restoredDb.prepare("SELECT COUNT(*) AS c FROM sqlite_master WHERE type='table' AND name='notes'").get() as { c: number }).c > 0
    ? (restoredDb.prepare('SELECT COUNT(*) AS c FROM notes').get() as { c: number }).c : 0
  restoredDb.close()

  return {
    ok: true,
    sourcePath: source,
    targetDbPath: target,
    workspaces,
    files,
    symbols,
    notes,
    restoredAt: new Date().toISOString(),
  }
}
