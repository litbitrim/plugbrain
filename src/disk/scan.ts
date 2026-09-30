/** Read-only directory inventory for the disk atlas. File bodies are never read. */
import { createHash, randomUUID } from 'node:crypto'
import { lstat, readdir, readFile } from 'node:fs/promises'
import { basename, dirname, join, parse, resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import { driveRoots } from '../coord/resources.ts'

export type DiskCategory = 'source' | 'dependencies' | 'cache' | 'build' | 'models' | 'games' | 'virtual-machines' | 'media' | 'downloads' | 'system' | 'other'
export interface DiskDirectory {
  path: string; parent: string | null; name: string; category: DiskCategory
  bytes: number; files: number; modifiedNewest: string | null; modifiedOldest: string | null
  reparsePoint: boolean; error: string | null; lockHash: string | null; duplicateGroup: string | null
}
export interface DiskScanState {
  scanId: string; startedAt: string; completedAt: string | null; running: boolean
  complete: boolean; roots: string[]; directories: number; files: number; bytes: number; inaccessible: number
  errors: string[]
}
export interface DiskScanOptions { roots?: string[]; concurrency?: number; onProgress?: (state: DiskScanState) => void; now?: () => Date; signal?: AbortSignal }

const SCHEMA = `
CREATE TABLE IF NOT EXISTS disk_scan_state (
  singleton INTEGER PRIMARY KEY CHECK(singleton = 1), scan_id TEXT NOT NULL, started_at TEXT NOT NULL,
  completed_at TEXT, running INTEGER NOT NULL, complete INTEGER NOT NULL DEFAULT 0, roots_json TEXT NOT NULL, directories INTEGER NOT NULL,
  files INTEGER NOT NULL, bytes INTEGER NOT NULL, inaccessible INTEGER NOT NULL, errors_json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS disk_scan_history (
  scan_id TEXT PRIMARY KEY, started_at TEXT NOT NULL, completed_at TEXT, running INTEGER NOT NULL,
  complete INTEGER NOT NULL, roots_json TEXT NOT NULL, directories INTEGER NOT NULL, files INTEGER NOT NULL,
  bytes INTEGER NOT NULL, inaccessible INTEGER NOT NULL, errors_json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS disk_directories (
  scan_id TEXT NOT NULL, path TEXT NOT NULL, parent TEXT, name TEXT NOT NULL, category TEXT NOT NULL,
  bytes INTEGER NOT NULL, files INTEGER NOT NULL, modified_newest TEXT, modified_oldest TEXT,
  reparse_point INTEGER NOT NULL, error TEXT, lock_hash TEXT, duplicate_group TEXT,
  PRIMARY KEY(scan_id, path)
);
CREATE INDEX IF NOT EXISTS idx_disk_directories_parent ON disk_directories(scan_id, parent);
CREATE TABLE IF NOT EXISTS disk_largest_files (
  scan_id TEXT NOT NULL, path TEXT NOT NULL, bytes INTEGER NOT NULL, modified_at TEXT,
  PRIMARY KEY(scan_id, path)
);
`

export function ensureDiskSchema(db: DatabaseSync): void {
  db.exec(SCHEMA)
  const columns = db.prepare('PRAGMA table_info(disk_scan_state)').all() as { name: string }[]
  if (!columns.some(column => column.name === 'complete')) db.exec('ALTER TABLE disk_scan_state ADD COLUMN complete INTEGER NOT NULL DEFAULT 0')
}

function categoryFor(path: string): DiskCategory {
  const parts = resolve(path).split(/[\\/]+/).filter(Boolean).map(p => p.toLowerCase())
  const name = parts.at(-1) ?? ''
  if (name === 'node_modules' || name === '.venv' || name === 'venv' || name === 'vendor') return 'dependencies'
  if (parts.some(p => p.includes('ollama') || p.includes('huggingface') || p === 'models') || /\.(gguf|safetensors)$/i.test(name)) return 'models'
  if (['cache', 'temp', 'tmp', '.npm', '.npm-cache', '_cacache', 'npm-cache', '.pnpm-store', 'pnpm', '.yarn', 'yarn', '.cache', 'pip', 'cargo', '.gradle', 'nuget'].includes(name)) return 'cache'
  if (['dist', 'build', 'out', 'target', '.next', 'coverage'].includes(name)) return 'build'
  if (parts.some(p => ['steamapps', 'epic games', 'riot games', 'battle.net'].includes(p))) return 'games'
  if (/\.(vhdx|vdi|vmdk|qcow2)$/i.test(name) || parts.some(p => ['docker', 'containers', 'wsl'].includes(p))) return 'virtual-machines'
  if (parts.some(p => ['music', 'videos', 'pictures', 'camera roll'].includes(p)) || /\.(mp[34]|wav|flac|mkv|mp4|mov|jpg|jpeg|png|raw)$/i.test(name)) return 'media'
  if (parts.some(p => p === 'downloads')) return 'downloads'
  if (/^(windows|program files|program files \(x86\)|programdata|system volume information)$/i.test(name)) return 'system'
  if (parts.some(p => p === '.git')) return 'source'
  return 'other'
}

function iso(value: Date | null): string | null { return value !== null && Number.isFinite(value.getTime()) ? value.toISOString() : null }
function minDate(a: string | null, b: string | null): string | null { return a === null ? b : b === null ? a : a < b ? a : b }
function maxDate(a: string | null, b: string | null): string | null { return a === null ? b : b === null ? a : a > b ? a : b }
function isReparse(stats: { isSymbolicLink(): boolean; attributes?: number }): boolean {
  return stats.isSymbolicLink() || ((stats.attributes ?? 0) & 0x400) !== 0
}

/** Keep a bounded min-heap so millions of files do not become a memory leak. */
function keepLargest(heap: { path: string; bytes: number; modifiedAt: string | null }[], item: typeof heap[number], limit = 1000): void {
  if (heap.length < limit) {
    heap.push(item)
    let index = heap.length - 1
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2)
      if (heap[parent]!.bytes <= heap[index]!.bytes) break
      ;[heap[parent], heap[index]] = [heap[index]!, heap[parent]!]
      index = parent
    }
    return
  }
  if (item.bytes <= heap[0]!.bytes) return
  heap[0] = item
  let index = 0
  while (true) {
    const left = index * 2 + 1; const right = left + 1
    let smallest = index
    if (left < heap.length && heap[left]!.bytes < heap[smallest]!.bytes) smallest = left
    if (right < heap.length && heap[right]!.bytes < heap[smallest]!.bytes) smallest = right
    if (smallest === index) break
    ;[heap[index], heap[smallest]] = [heap[smallest]!, heap[index]!]
    index = smallest
  }
}

export function currentDiskScan(db: DatabaseSync): DiskScanState | null {
  ensureDiskSchema(db)
  const row = db.prepare('SELECT * FROM disk_scan_state WHERE singleton=1').get() as Record<string, unknown> | undefined
  if (!row) return null
  return {
    scanId: String(row.scan_id), startedAt: String(row.started_at), completedAt: row.completed_at === null ? null : String(row.completed_at),
    running: Number(row.running) === 1, complete: Number(row.complete) === 1,
    roots: JSON.parse(String(row.roots_json)) as string[], directories: Number(row.directories),
    files: Number(row.files), bytes: Number(row.bytes), inaccessible: Number(row.inaccessible), errors: JSON.parse(String(row.errors_json)) as string[],
  }
}

export async function scanDisk(db: DatabaseSync, options: DiskScanOptions = {}): Promise<DiskScanState> {
  ensureDiskSchema(db)
  const now = options.now ?? (() => new Date())
  const roots = [...new Set((options.roots ?? driveRoots()).map(p => resolve(p)))]
  const state: DiskScanState = { scanId: randomUUID(), startedAt: now().toISOString(), completedAt: null, running: true, complete: false,
    roots, directories: 0, files: 0, bytes: 0, inaccessible: 0, errors: [] }
  db.exec('BEGIN IMMEDIATE')
  try {
    db.exec('DELETE FROM disk_scan_state;')
    db.prepare(`INSERT INTO disk_scan_state(singleton,scan_id,started_at,completed_at,running,complete,roots_json,directories,files,bytes,inaccessible,errors_json)
      VALUES (1,?,?,NULL,1,0,?,0,0,0,0,'[]')`).run(state.scanId, state.startedAt, JSON.stringify(roots))
    db.prepare(`INSERT INTO disk_scan_history(scan_id,started_at,completed_at,running,complete,roots_json,directories,files,bytes,inaccessible,errors_json)
      VALUES (?,?,NULL,1,0,?,0,0,0,0,'[]')`).run(state.scanId, state.startedAt, JSON.stringify(roots))
    db.exec('COMMIT')
  } catch (error) { db.exec('ROLLBACK'); throw error }

  const rows = new Map<string, DiskDirectory>()
  const largest: { path: string; bytes: number; modifiedAt: string | null }[] = []
  const errors = new Set<string>()
  const queue = roots.map(path => ({ path, parent: null as string | null }))
  const concurrency = Math.min(32, Math.max(1, options.concurrency ?? 8))
  let cursor = 0
  const worker = async (): Promise<void> => {
    while (!options.signal?.aborted) {
      const task = queue[cursor]
      if (!task) return
      cursor += 1
      let row: DiskDirectory = { path: task.path, parent: task.parent, name: basename(task.path) || task.path,
        category: categoryFor(task.path), bytes: 0, files: 0, modifiedNewest: null, modifiedOldest: null,
        reparsePoint: false, error: null, lockHash: null, duplicateGroup: null }
      try {
        const st = await lstat(task.path)
        row.reparsePoint = isReparse(st)
        row.modifiedNewest = row.modifiedOldest = iso(st.mtime)
        if (!st.isDirectory() || row.reparsePoint) { rows.set(row.path, row); continue }
        const children = await readdir(task.path, { withFileTypes: true })
        for (const child of children) {
          const childPath = join(task.path, child.name)
          try {
            const stChild = await lstat(childPath)
            const reparse = isReparse(stChild)
            if (reparse) {
              rows.set(childPath, { path: childPath, parent: task.path, name: child.name, category: categoryFor(childPath),
                bytes: 0, files: 0, modifiedNewest: iso(stChild.mtime), modifiedOldest: iso(stChild.mtime), reparsePoint: true, error: null,
                lockHash: null, duplicateGroup: null })
            } else if (stChild.isDirectory()) {
              queue.push({ path: childPath, parent: task.path })
            } else if (stChild.isFile()) {
              row.bytes += stChild.size; row.files += 1
              const fileCategory = categoryFor(childPath)
              if (row.category === 'other' && ['models', 'media', 'virtual-machines'].includes(fileCategory)) row.category = fileCategory
              const changed = iso(stChild.mtime)
              row.modifiedNewest = maxDate(row.modifiedNewest, changed); row.modifiedOldest = minDate(row.modifiedOldest, changed)
              if (['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'].includes(child.name.toLowerCase())) {
                // Lockfiles are the only contents the disk contract permits hashing.
                row.lockHash = createHash('sha256').update(await readFile(childPath)).digest('hex')
              }
              keepLargest(largest, { path: childPath, bytes: stChild.size, modifiedAt: changed })
              state.files += 1; state.bytes += stChild.size
            }
          } catch (error) { state.inaccessible += 1; errors.add(`${childPath}: ${error instanceof Error ? error.message : String(error)}`) }
        }
      } catch (error) { row.error = error instanceof Error ? error.message : String(error); state.inaccessible += 1; errors.add(`${task.path}: ${row.error}`) }
      rows.set(row.path, row)
      state.directories = rows.size
      if (state.directories % 256 === 0) {
        const snapshot = { ...state, errors: [...errors].slice(0, 100) }
        db.prepare(`UPDATE disk_scan_state SET directories=?,files=?,bytes=?,inaccessible=?,errors_json=? WHERE singleton=1 AND scan_id=?`)
          .run(snapshot.directories, snapshot.files, snapshot.bytes, snapshot.inaccessible, JSON.stringify(snapshot.errors), state.scanId)
        db.prepare(`UPDATE disk_scan_history SET directories=?,files=?,bytes=?,inaccessible=?,errors_json=? WHERE scan_id=?`)
          .run(snapshot.directories, snapshot.files, snapshot.bytes, snapshot.inaccessible, JSON.stringify(snapshot.errors), state.scanId)
        options.onProgress?.(snapshot)
      }
    }
  }
  try {
    await Promise.all(Array.from({ length: concurrency }, () => worker()))
  } catch (error) {
    state.running = false; state.complete = false; state.completedAt = now().toISOString(); state.errors = [...errors, String(error)].slice(0, 100)
    db.prepare(`UPDATE disk_scan_state SET running=0,complete=0,completed_at=?,inaccessible=?,errors_json=? WHERE singleton=1 AND scan_id=?`)
      .run(state.completedAt, state.inaccessible, JSON.stringify(state.errors), state.scanId)
    db.prepare(`UPDATE disk_scan_history SET running=0,complete=0,completed_at=?,inaccessible=?,errors_json=? WHERE scan_id=?`)
      .run(state.completedAt, state.inaccessible, JSON.stringify(state.errors), state.scanId)
    throw error
  }

  if (options.signal?.aborted) {
    state.running = false; state.complete = false; state.completedAt = now().toISOString()
    state.errors = [...errors, 'scan interrupted before completion'].slice(0, 100)
    db.prepare(`UPDATE disk_scan_state SET running=0,complete=0,completed_at=?,directories=?,files=?,bytes=?,inaccessible=?,errors_json=? WHERE singleton=1 AND scan_id=?`)
      .run(state.completedAt, state.directories, state.files, state.bytes, state.inaccessible, JSON.stringify(state.errors), state.scanId)
    db.prepare(`UPDATE disk_scan_history SET running=0,complete=0,completed_at=?,directories=?,files=?,bytes=?,inaccessible=?,errors_json=? WHERE scan_id=?`)
      .run(state.completedAt, state.directories, state.files, state.bytes, state.inaccessible, JSON.stringify(state.errors), state.scanId)
    options.onProgress?.(state)
    return state
  }

  // Aggregate child totals into parents without counting reparse points twice.
  for (const row of [...rows.values()].sort((a, b) => b.path.length - a.path.length)) {
    if (!row.parent || row.reparsePoint) continue
    const parent = rows.get(row.parent)
    if (parent) {
      parent.bytes += row.bytes; parent.files += row.files
      parent.modifiedNewest = maxDate(parent.modifiedNewest, row.modifiedNewest)
      parent.modifiedOldest = minDate(parent.modifiedOldest, row.modifiedOldest)
    }
  }
  const projects = [...rows.values()].filter(row => row.category === 'dependencies')
  for (const row of projects) {
    const parent = rows.get(dirname(row.path))
    if (parent?.lockHash) row.lockHash = parent.lockHash
  }
  const hashes = new Map<string, string[]>()
  for (const row of projects) if (row.lockHash) hashes.set(row.lockHash, [...(hashes.get(row.lockHash) ?? []), row.path])
  for (const row of projects) if (row.lockHash && (hashes.get(row.lockHash)?.length ?? 0) > 1) row.duplicateGroup = row.lockHash

  const insertDir = db.prepare(`INSERT INTO disk_directories VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`)
  const insertFile = db.prepare(`INSERT INTO disk_largest_files VALUES (?,?,?,?)`)
  db.exec('BEGIN IMMEDIATE')
  try {
    for (const row of rows.values()) insertDir.run(state.scanId, row.path, row.parent, row.name, row.category, row.bytes, row.files,
      row.modifiedNewest, row.modifiedOldest, row.reparsePoint ? 1 : 0, row.error, row.lockHash, row.duplicateGroup)
    largest.sort((a, b) => b.bytes - a.bytes)
    for (const file of largest.slice(0, 1000)) insertFile.run(state.scanId, file.path, file.bytes, file.modifiedAt)
    state.directories = rows.size; state.inaccessible = Math.max(state.inaccessible, [...rows.values()].filter(row => row.error !== null).length)
    state.errors = [...errors].slice(0, 100); state.running = false; state.complete = true; state.completedAt = now().toISOString()
    db.prepare(`UPDATE disk_scan_state SET completed_at=?,running=0,complete=1,directories=?,files=?,bytes=?,inaccessible=?,errors_json=? WHERE singleton=1`)
      .run(state.completedAt, state.directories, state.files, state.bytes, state.inaccessible, JSON.stringify(state.errors))
    db.prepare(`UPDATE disk_scan_history SET completed_at=?,running=0,complete=1,directories=?,files=?,bytes=?,inaccessible=?,errors_json=? WHERE scan_id=?`)
      .run(state.completedAt, state.directories, state.files, state.bytes, state.inaccessible, JSON.stringify(state.errors), state.scanId)
    db.exec('COMMIT')
  } catch (error) { db.exec('ROLLBACK'); throw error }
  options.onProgress?.(state)
  return state
}

export function diskTree(db: DatabaseSync, path: string | null = null): DiskDirectory[] {
  ensureDiskSchema(db)
  const state = currentDiskScan(db)
  if (!state) return []
  const parent = path === null ? null : resolve(path)
  const rows = db.prepare(`SELECT path,parent,name,category,bytes,files,modified_newest AS modifiedNewest,
    modified_oldest AS modifiedOldest,reparse_point AS reparsePoint,error,lock_hash AS lockHash,duplicate_group AS duplicateGroup
    FROM disk_directories WHERE scan_id=? AND parent IS ? ORDER BY bytes DESC,name`)
    .all(state.scanId, parent) as unknown as DiskDirectory[]
  return rows.map(row => ({ ...row, reparsePoint: Boolean(row.reparsePoint) }))
}

export function diskScanHistory(db: DatabaseSync, limit = 10): { scans: DiskScanState[]; largestGrowth: Array<{ path: string; bytes: number; previousBytes: number; deltaBytes: number }> } {
  ensureDiskSchema(db)
  const rows = db.prepare(`SELECT scan_id,started_at,completed_at,running,complete,roots_json,directories,files,bytes,inaccessible,errors_json
    FROM disk_scan_history ORDER BY started_at DESC LIMIT ?`).all(Math.max(2, Math.min(50, Math.trunc(limit)))) as Record<string, unknown>[]
  const scans = rows.map(row => ({
    scanId: String(row.scan_id), startedAt: String(row.started_at), completedAt: row.completed_at === null ? null : String(row.completed_at),
    running: Number(row.running) === 1, complete: Number(row.complete) === 1, roots: JSON.parse(String(row.roots_json)) as string[],
    directories: Number(row.directories), files: Number(row.files), bytes: Number(row.bytes), inaccessible: Number(row.inaccessible),
    errors: JSON.parse(String(row.errors_json)) as string[],
  }))
  const [latest, previous] = scans.filter(scan => scan.complete)
  if (!latest || !previous) return { scans, largestGrowth: [] }
  const latestRows = db.prepare('SELECT path,parent,bytes FROM disk_directories WHERE scan_id=? AND parent IS NOT NULL').all(latest.scanId) as Array<{ path: string; parent: string; bytes: number }>
  const previousRows = db.prepare('SELECT path,bytes FROM disk_directories WHERE scan_id=? AND parent IS NOT NULL').all(previous.scanId) as Array<{ path: string; bytes: number }>
  const before = new Map(previousRows.map(row => [row.path.toLowerCase(), Number(row.bytes)]))
  const deltas = latestRows.map(row => ({ path: row.path, bytes: Number(row.bytes), previousBytes: before.get(row.path.toLowerCase()) ?? 0,
    deltaBytes: Number(row.bytes) - (before.get(row.path.toLowerCase()) ?? 0) })).filter(row => row.deltaBytes > 0).sort((a, b) => b.deltaBytes - a.deltaBytes)
  const largestGrowth: typeof deltas = []
  for (const row of deltas) {
    if (largestGrowth.some(parent => row.path.toLowerCase().startsWith(`${parent.path.toLowerCase()}\\`))) continue
    largestGrowth.push(row)
    if (largestGrowth.length >= 12) break
  }
  return { scans, largestGrowth }
}

export function largestDiskFiles(db: DatabaseSync, limit = 1000): { path: string; bytes: number; modifiedAt: string | null }[] {
  ensureDiskSchema(db)
  const state = currentDiskScan(db)
  if (!state) return []
  return db.prepare(`SELECT path,bytes,modified_at AS modifiedAt FROM disk_largest_files WHERE scan_id=? ORDER BY bytes DESC LIMIT ?`)
    .all(state.scanId, Math.max(1, Math.min(1000, Math.trunc(limit)))) as unknown as { path: string; bytes: number; modifiedAt: string | null }[]
}

export function diskRoot(path: string): string { return parse(resolve(path)).root }
