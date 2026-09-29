/** Recommendations and reinstallation checklist built only from inventory metadata. */
import { existsSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import type { CensusReport } from '../machine/git-census.ts'
import { currentDiskScan, type DiskCategory, type DiskDirectory } from './scan.ts'

export type DiskRisk = 'recoverable' | 'review' | 'keep'
export interface DiskRecommendation { category: DiskCategory | 'worktree'; paths: string[]; bytes: number; gb: number; risk: DiskRisk; reason: string; recovery: string }
export interface DiskRecommendations { scanId: string | null; totalsGb: Record<DiskRisk, number>; recommendations: DiskRecommendation[] }
export interface WipeCheckItem { path: string; bytes: number; reason: string }
export interface WipeCheck { checkedAt: string; items: WipeCheckItem[]; totalGb: number; unavailable: string[] }

const GB = 1024 ** 3
function daysOld(iso: string | null, now: number): number | null { return iso ? Math.floor((now - Date.parse(iso)) / 86_400_000) : null }
function gb(bytes: number): number { return Math.round(bytes / GB * 10) / 10 }

function rowsFor(db: DatabaseSync): DiskDirectory[] {
  const state = currentDiskScan(db)
  if (!state) return []
  return db.prepare(`SELECT path,parent,name,category,bytes,files,modified_newest AS modifiedNewest,
    modified_oldest AS modifiedOldest,reparse_point AS reparsePoint,error,lock_hash AS lockHash,duplicate_group AS duplicateGroup
    FROM disk_directories WHERE scan_id=?`).all(state.scanId) as unknown as DiskDirectory[]
}

export function diskRecommendations(db: DatabaseSync, census?: CensusReport, now = new Date()): DiskRecommendations {
  const state = currentDiskScan(db)
  const rows = rowsFor(db)
  const repoMap = new Map((census?.repos ?? []).map(repo => [resolve(repo.path).toLowerCase(), repo]))
  const items: DiskRecommendation[] = []
  for (const row of rows) {
    if (row.reparsePoint || row.error) continue
    const age = daysOld(row.modifiedNewest, now.getTime())
    if (row.category === 'dependencies' && row.lockHash) {
      items.push({ category: row.category, paths: [row.path], bytes: row.bytes, gb: gb(row.bytes), risk: 'recoverable',
        reason: `Lockfile fingerprint ${row.lockHash.slice(0, 12)} is available${age === null ? '' : `; last changed ${age} days ago`}.`, recovery: 'npm ci, pnpm install, or yarn install' })
    } else if (row.category === 'cache' || row.category === 'build') {
      items.push({ category: row.category, paths: [row.path], bytes: row.bytes, gb: gb(row.bytes), risk: 'recoverable',
        reason: `${row.category === 'cache' ? 'Package cache' : 'Generated build output'}; source files are retained.`, recovery: row.category === 'cache' ? 'download again from the package registry' : 'rebuild from source' })
    } else if (row.category === 'downloads' && age !== null && age >= 180) {
      items.push({ category: row.category, paths: [row.path], bytes: row.bytes, gb: gb(row.bytes), risk: 'review',
        reason: `Downloads directory last changed ${age} days ago; contents were not read.`, recovery: 'verify each file can be downloaded or recreated' })
    } else if (row.name.toLowerCase() === '.git') {
      const repo = repoMap.get(resolve(row.parent ?? row.path).toLowerCase())
      if (repo && (repo.dirtyFiles ?? 0) + (repo.untrackedFiles ?? 0) + repo.unpushed.length + repo.stashes > 0) {
        items.push({ category: 'source', paths: [row.parent ?? row.path], bytes: row.bytes, gb: gb(row.bytes), risk: 'keep',
          reason: 'Git census reports uncommitted, unpushed or stashed work.', recovery: 'back up the repository, its refs and working files' })
      } else if (repo && repo.orphanWorktrees > 0) {
        items.push({ category: 'worktree', paths: [row.parent ?? row.path], bytes: 0, gb: 0, risk: 'review',
          reason: `Git census reports ${repo.orphanWorktrees} orphaned worktree registration(s).`, recovery: 'inspect the worktree list and confirm every worktree is backed up before pruning' })
      } else if (age !== null && age >= 365) {
        items.push({ category: 'source', paths: [row.parent ?? row.path], bytes: row.bytes, gb: gb(row.bytes), risk: 'review',
          reason: `Repository metadata last changed ${age} days ago; check owner and remotes.`, recovery: 'clone again from its remote after confirming all local refs are backed up' })
      } else if (repo) {
        items.push({ category: 'source', paths: [row.parent ?? row.path], bytes: row.bytes, gb: gb(row.bytes), risk: 'keep',
          reason: 'Git census found no unsaved work; repository ownership and purpose should remain explicit.', recovery: 'retain the repository and its remote reference' })
      }
    }
  }
  const groups = new Map<string, DiskRecommendation[]>()
  for (const item of items) if (item.category === 'dependencies') {
    const row = rows.find(candidate => candidate.path === item.paths[0])
    if (row?.duplicateGroup) groups.set(row.duplicateGroup, [...(groups.get(row.duplicateGroup) ?? []), item])
  }
  for (const group of groups.values()) if (group.length > 1) {
    const sorted = [...group].sort((a, b) => b.bytes - a.bytes)
    const duplicates = sorted.slice(1)
    const paths = duplicates.flatMap(item => item.paths)
    const bytes = duplicates.reduce((sum, item) => sum + item.bytes, 0)
    items.push({ category: 'dependencies', paths, bytes, gb: gb(bytes), risk: 'recoverable',
      reason: `${group.length} dependency trees have the same lockfile hash; one copy can be kept.`, recovery: 'recreate an individual tree with the matching package manager' })
    const duplicatePaths = new Set(paths)
    for (let index = items.length - 2; index >= 0; index -= 1) {
      const item = items[index]!
      if (item.category === 'dependencies' && item.paths.some(path => duplicatePaths.has(path))) items.splice(index, 1)
    }
  }
  items.sort((a, b) => b.bytes - a.bytes)
  const totalsGb: Record<DiskRisk, number> = { recoverable: 0, review: 0, keep: 0 }
  for (const item of items) totalsGb[item.risk] += item.gb
  return { scanId: state?.scanId ?? null, totalsGb, recommendations: items }
}

export function diskWipeCheck(db: DatabaseSync, census?: CensusReport, now = new Date(), home = homedir()): WipeCheck {
  const rows = rowsFor(db)
  const byPath = new Map(rows.map(row => [resolve(row.path).toLowerCase(), row]))
  const items = new Map<string, WipeCheckItem>()
  const repoPaths = (census?.repos ?? []).map(repo => resolve(repo.path).toLowerCase())
  const add = (path: string, reason: string): void => {
    const normalized = resolve(path)
    if (!existsSync(normalized)) return
    const row = byPath.get(normalized.toLowerCase())
    let bytes = row?.bytes ?? 0
    if (!row) { try { bytes = statSync(normalized).size } catch { /* reported as zero when metadata cannot be read */ } }
    items.set(normalized.toLowerCase(), { path: normalized, bytes, reason })
  }
  for (const repo of census?.repos ?? []) {
    if ((repo.dirtyFiles ?? 0) > 0 || (repo.untrackedFiles ?? 0) > 0 || repo.unpushed.length > 0 || (repo.stashes ?? 0) > 0) {
      add(repo.path, 'Git census found work that is uncommitted, unpushed or stashed.')
    }
  }
  for (const name of ['.ssh', '.gitconfig', '.claude', '.codex', '.config']) add(join(home, name), 'Personal configuration or credentials metadata; copy securely.')
  for (const row of rows) if (row.name === '.obsidian') add(row.parent ?? row.path, 'Workspace contains an Obsidian vault configuration.')
  for (const row of rows) {
    const inHome = row.path.toLowerCase().startsWith(`${resolve(home).toLowerCase()}\\`)
    const inRepo = repoPaths.some(repo => row.path.toLowerCase() === repo || row.path.toLowerCase().startsWith(`${repo}\\`))
    const age = daysOld(row.modifiedNewest, now.getTime())
    if (inHome && !inRepo && age !== null && age <= 90 && !row.reparsePoint) add(row.path, 'Non-repository user-profile folder changed in the last 90 days.')
  }
  const unavailable = currentDiskScan(db)?.errors ?? []
  const result = [...items.values()].sort((a, b) => b.bytes - a.bytes)
  return { checkedAt: now.toISOString(), items: result, totalGb: gb(result.reduce((sum, item) => sum + item.bytes, 0)), unavailable }
}
