/**
 * Workspace City: a deterministic projection of the indexed graph.
 *
 * The city is not a second truth and not a decoration. Every district,
 * building and road here is a row that already exists in the index, and the
 * projection adds only layout-independent facts. If the city disagrees with
 * the graph, the city is wrong.
 *
 * Two properties the renderer depends on:
 *
 *   STABLE IDS.  A building is keyed by its FILE ROW ID, not by its path and
 *                not by its position. The indexer keeps that id across edits
 *                and across renames, so a renamed file MOVES in the city
 *                instead of the old one vanishing and a stranger appearing.
 *
 *   DELTAS.      `cityDelta` answers "what changed since generation N" from
 *                `files.generation` and the tombstones, so a one-file edit
 *                repaints one building. Rebuilding the whole scene on every
 *                render is what made the previous city unusable on a real
 *                workspace, and it is also what made its layout jump.
 *
 * Layout is deliberately NOT computed here. Positions belong to the renderer
 * and are persisted per building id, so business data and layout can change
 * independently.
 */
import type { DatabaseSync } from 'node:sqlite'

/** Simple generation-scoped cache for expensive per-generation sums. */
interface CacheEntry<T> {
  generation: number
  value: T
}

const districtTotalsCache = new Map<string, CacheEntry<CityDistrict[]>>()
const symbolCountsCache = new Map<string, CacheEntry<Map<number, number>>>()

function cacheKey(workspaceId: string, generation: number): string {
  return `${workspaceId}:${generation}`
}

function getCached<T>(cache: Map<string, CacheEntry<T>>, key: string, generation: number): T | null {
  const entry = cache.get(key)
  if (entry && entry.generation === generation) return entry.value
  return null
}

function setCached<T>(cache: Map<string, CacheEntry<T>>, key: string, generation: number, value: T): void {
  cache.set(key, { generation, value })
}

/** Invalidate cache entries for a workspace at or after a generation. */
export function invalidateCityCache(workspaceId: string, fromGeneration: number): void {
  for (const [key, entry] of districtTotalsCache.entries()) {
    if (key.startsWith(`${workspaceId}:`) && entry.generation >= fromGeneration) {
      districtTotalsCache.delete(key)
    }
  }
  for (const [key, entry] of symbolCountsCache.entries()) {
    if (key.startsWith(`${workspaceId}:`) && entry.generation >= fromGeneration) {
      symbolCountsCache.delete(key)
    }
  }
}

/** How tall a building is. The renderer may switch metric; the data is honest. */
export type HeightMetric = 'symbols' | 'loc'

export interface CityBuilding {
  /** Stable across edits and renames: the file row id. */
  id: string
  fileId: number
  path: string
  /** District this building sits in: the top-level module. */
  district: string
  ext: string
  lang: string | null
  loc: number
  symbolCount: number
  /** The generation that last wrote this file row. */
  generation: number
  /** Present only when the index attributes the file to an agent. */
  ownerAgentId: string | null
  ownerAt: string | null
}

export interface CityDistrict {
  id: string
  name: string
  buildings: number
  symbols: number
  loc: number
}

export interface CityRoad {
  id: string
  fromFileId: number
  toFileId: number
  kind: 'imports'
  /** How many import edges run this way. */
  weight: number
}

export interface CityTombstone {
  path: string
  reason: string
  generation: number
  deletedAt: string
}

export interface CitySnapshot {
  schema: 1
  workspaceId: string
  /** The COMPLETE generation this snapshot describes. */
  generation: number
  gitHead: string | null
  heightMetric: HeightMetric
  districts: CityDistrict[]
  buildings: CityBuilding[]
  roads: CityRoad[]
  tombstones: CityTombstone[]
  totals: { buildings: number; districts: number; roads: number; symbols: number }
  /** Legend the UI must render, so the encoding is never guessed at. */
  legend: Record<string, string>
}

export interface CityDelta {
  schema: 1
  workspaceId: string
  fromGeneration: number
  toGeneration: number
  /** Buildings whose row was written at or after `fromGeneration`. */
  changed: CityBuilding[]
  /** Buildings that no longer exist, by stable id. */
  removed: string[]
  tombstones: CityTombstone[]
  /** Roads are recomputed only for the districts that changed. */
  roads: CityRoad[]
  unchangedBuildings: number
}

export const CITY_LEGEND: Record<string, string> = {
  district: 'a top-level module or package directory',
  building: 'one indexed file; its id is the stable file row id',
  height: 'the selected metric: exported+internal symbol count, or lines of code',
  road: 'a resolved import edge between two indexed files; weight is edge count',
  pulse: 'the file row was written by the current generation',
  tombstone: 'a path deleted or renamed away, kept for one generation',
  owner: 'the agent the index attributes the file to; absent means unattributed',
}

/** The district a path belongs to: its first path segment, or the root. */
export function districtOf(path: string): string {
  const slash = path.indexOf('/')
  return slash === -1 ? '(root)' : path.slice(0, slash)
}

interface FileRow {
  id: number; path: string; ext: string; lang: string | null
  loc: number; generation: number
}

function buildingsFrom(
  db: DatabaseSync,
  workspaceId: string,
  where: string,
  params: readonly unknown[],
  generation?: number,
): CityBuilding[] {
  const files = db.prepare(
    `SELECT id, path, ext, lang, loc, generation FROM files
      WHERE workspace_id = ?${where} ORDER BY path ASC`)
    .all(workspaceId, ...params) as unknown as FileRow[]
  if (files.length === 0) return []

  const ids = files.map(row => row.id)
  
  // Use cached symbol counts if we have a generation and cache hit
  let counts: Map<number, number>
  if (generation !== undefined) {
    const cacheKeyStr = cacheKey(workspaceId, generation)
    const cached = getCached(symbolCountsCache, cacheKeyStr, generation)
    if (cached) {
      counts = cached
    } else {
      counts = new Map<number, number>()
      for (const row of db.prepare(
        `SELECT file_id AS fileId, COUNT(*) AS n FROM symbols
          WHERE file_id IN (${ids.map(() => '?').join(',')}) GROUP BY file_id`)
        .all(...ids) as unknown as Array<{ fileId: number; n: number }>) {
        counts.set(row.fileId, Number(row.n))
      }
      setCached(symbolCountsCache, cacheKeyStr, generation, counts)
    }
  } else {
    counts = new Map<number, number>()
    for (const row of db.prepare(
      `SELECT file_id AS fileId, COUNT(*) AS n FROM symbols
        WHERE file_id IN (${ids.map(() => '?').join(',')}) GROUP BY file_id`)
      .all(...ids) as unknown as Array<{ fileId: number; n: number }>) {
      counts.set(row.fileId, Number(row.n))
    }
  }
  
  const owners = new Map<string, { agentId: string | null; at: string }>()
  for (const row of db.prepare(
    `SELECT path, agent_id AS agentId, at FROM path_owner WHERE workspace_id = ?`)
    .all(workspaceId) as unknown as Array<{ path: string; agentId: string | null; at: string }>) {
    owners.set(row.path, { agentId: row.agentId, at: row.at })
  }

  return files.map(row => ({
    id: `building:${row.id}`,
    fileId: row.id,
    path: row.path,
    district: districtOf(row.path),
    ext: row.ext,
    lang: row.lang,
    loc: Number(row.loc),
    symbolCount: counts.get(row.id) ?? 0,
    generation: Number(row.generation),
    ownerAgentId: owners.get(row.path)?.agentId ?? null,
    ownerAt: owners.get(row.path)?.at ?? null,
  }))
}

/** Import roads between indexed files, aggregated by direction. */
function roadsFor(db: DatabaseSync, workspaceId: string, fileIds?: readonly number[]): CityRoad[] {
  const scope = fileIds === undefined || fileIds.length === 0
    ? ''
    : ` AND (src_file IN (${fileIds.map(() => '?').join(',')})`
      + ` OR dst_file IN (${fileIds.map(() => '?').join(',')}))`
  const params = fileIds === undefined || fileIds.length === 0 ? [] : [...fileIds, ...fileIds]
  const rows = db.prepare(
    `SELECT src_file AS fromFileId, dst_file AS toFileId, COUNT(*) AS weight
       FROM edges
      WHERE workspace_id = ? AND kind = 'imports' AND resolved = 1
        AND src_file IS NOT NULL AND dst_file IS NOT NULL${scope}
      GROUP BY src_file, dst_file
      ORDER BY src_file ASC, dst_file ASC`)
    .all(workspaceId, ...params) as unknown as Array<{ fromFileId: number; toFileId: number; weight: number }>
  return rows.map(row => ({
    id: `road:${row.fromFileId}->${row.toFileId}`,
    fromFileId: Number(row.fromFileId),
    toFileId: Number(row.toFileId),
    kind: 'imports' as const,
    weight: Number(row.weight),
  }))
}

function tombstonesFor(db: DatabaseSync, workspaceId: string, sinceGeneration = 0): CityTombstone[] {
  return db.prepare(
    `SELECT path, reason, generation, deleted_at AS deletedAt FROM file_tombstones
      WHERE workspace_id = ? AND generation >= ? ORDER BY path ASC`)
    .all(workspaceId, sinceGeneration) as unknown as CityTombstone[]
}

/** The whole city at the current published generation. */
export function citySnapshot(
  db: DatabaseSync,
  workspaceId: string,
  options: { heightMetric?: HeightMetric } = {},
): CitySnapshot {
  const state = db.prepare(
    `SELECT generation, git_head FROM workspace_index_state WHERE workspace_id = ?`)
    .get(workspaceId) as { generation: number; git_head: string | null } | undefined
  const generation = state?.generation ?? 0

  // Use cached buildings with symbol counts for this generation
  const buildings = buildingsFrom(db, workspaceId, '', [], generation)
  
  // Check cache for district totals
  const cacheKeyStr = cacheKey(workspaceId, generation)
  let districts = getCached(districtTotalsCache, cacheKeyStr, generation)
  if (!districts) {
    const byDistrict = new Map<string, CityDistrict>()
    for (const building of buildings) {
      let district = byDistrict.get(building.district)
      if (district === undefined) {
        district = { id: `district:${building.district}`, name: building.district, buildings: 0, symbols: 0, loc: 0 }
        byDistrict.set(building.district, district)
      }
      district.buildings += 1
      district.symbols += building.symbolCount
      district.loc += building.loc
    }
    districts = [...byDistrict.values()].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    setCached(districtTotalsCache, cacheKeyStr, generation, districts)
  }
  
  const roads = roadsFor(db, workspaceId)

  return {
    schema: 1,
    workspaceId,
    generation,
    gitHead: state?.git_head ?? null,
    heightMetric: options.heightMetric ?? 'symbols',
    districts,
    buildings,
    roads,
    tombstones: tombstonesFor(db, workspaceId),
    totals: {
      buildings: buildings.length,
      districts: districts.length,
      roads: roads.length,
      symbols: buildings.reduce((sum, building) => sum + building.symbolCount, 0),
    },
    legend: CITY_LEGEND,
  }
}

/**
 * What changed since a generation the client already has.
 *
 * `removed` is derived from the tombstones plus the client's own knowledge:
 * we return the tombstoned PATHS and the ids that are gone, so the renderer
 * can drop exactly those buildings without re-fetching the scene.
 */
export function cityDelta(db: DatabaseSync, workspaceId: string, fromGeneration: number): CityDelta {
  const state = db.prepare(
    `SELECT generation FROM workspace_index_state WHERE workspace_id = ?`)
    .get(workspaceId) as { generation: number } | undefined
  const toGeneration = state?.generation ?? 0

  // Pass toGeneration so buildingsFrom can use cached symbol counts
  const changed = buildingsFrom(db, workspaceId, ' AND generation > ?', [fromGeneration], toGeneration)
  const total = Number((db.prepare(
    'SELECT COUNT(*) AS n FROM files WHERE workspace_id = ?')
    .get(workspaceId) as { n: number }).n)
  const tombstones = tombstonesFor(db, workspaceId, fromGeneration + 1)

  // A tombstoned path whose row is gone is a removed building. A renamed path
  // is NOT removed - its row moved, and it shows up in `changed` under its new
  // path with the same stable id.
  const livePaths = new Set((db.prepare(
    'SELECT path FROM files WHERE workspace_id = ?').all(workspaceId) as unknown as Array<{ path: string }>)
    .map(row => row.path))
  const removed = tombstones
    .filter(tomb => tomb.reason === 'deleted' && !livePaths.has(tomb.path))
    .map(tomb => `path:${tomb.path}`)

  return {
    schema: 1,
    workspaceId,
    fromGeneration,
    toGeneration,
    changed,
    removed,
    tombstones,
    roads: roadsFor(db, workspaceId, changed.map(building => building.fileId)),
    unchangedBuildings: Math.max(0, total - changed.length),
  }
}
