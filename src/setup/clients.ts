/**
 * Writing PlugBrain into the config files of the AI coding clients.
 *
 * Seven clients, three file formats, one idea: each of them already knows how
 * to start an MCP server, and each of them keeps that knowledge in a file we
 * can write. This module finds those files, adds ONE entry named `plugbrain`,
 * and leaves everything else exactly as it was.
 *
 * Four rules make that safe:
 *
 *   1. PATH-INDEPENDENT.  The entry names an absolute node and an absolute
 *      path to our own CLI, so it runs even when `plugbrain` is not on PATH.
 *   2. BACKED UP.  Before a file changes at all, a copy named
 *      `<file>.plugbrain-backup-<stamp>` is written next to it; `--undo`
 *      restores the newest one.
 *   3. IDEMPOTENT.  A second run that would write the same entry writes
 *      nothing and takes no backup.
 *   4. NO IDS, NO TOKENS.  The args are just `mcp`; the workspace comes from
 *      the folder the client starts us in (see workspace-from-cwd.ts).
 *
 * Everything takes an explicit `home`, so tests can point at a temp folder and
 * never touch the owner's real configuration.
 */
import {
  copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync,
} from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { homedir } from 'node:os'

export type ClientFormat = 'json' | 'toml' | 'yaml'

export interface ClientDefinition {
  /** Stable CLI name (`plugbrain setup cursor`). */
  id: string
  /** Human label for the report. */
  label: string
  /** Config path relative to the user's home. */
  configPath: string
  format: ClientFormat
  /**
   * Where the map of servers lives: the JSON key (`mcpServers`), the TOML
   * table (`mcp_servers`) or the YAML mapping (`mcp_servers`). The entry is
   * always a child named `plugbrain`.
   */
  mapKey: string
}

/** The seven clients, in the order the brief lists them. */
export const CLIENTS: ClientDefinition[] = [
  { id: 'claude', label: 'Claude Code', configPath: '.claude.json', format: 'json', mapKey: 'mcpServers' },
  { id: 'codex', label: 'Codex', configPath: '.codex/config.toml', format: 'toml', mapKey: 'mcp_servers' },
  { id: 'cursor', label: 'Cursor', configPath: '.cursor/mcp.json', format: 'json', mapKey: 'mcpServers' },
  { id: 'windsurf', label: 'Windsurf', configPath: '.codeium/windsurf/mcp_config.json', format: 'json', mapKey: 'mcpServers' },
  { id: 'hermes', label: 'Hermes', configPath: '.hermes/config.yaml', format: 'yaml', mapKey: 'mcp_servers' },
  { id: 'agy', label: 'AGY', configPath: '.gemini/antigravity/mcp_config.json', format: 'json', mapKey: 'mcpServers' },
  { id: 'opencode', label: 'OpenCode', configPath: '.config/opencode/opencode.json', format: 'json', mapKey: 'mcp' },
]

export interface SetupEntry {
  command: string
  args: string[]
}

/** A client resolved against a concrete home directory. */
export interface ClientTarget {
  def: ClientDefinition
  path: string
  /** Installed on this machine: its config file or its folder exists. */
  detected: boolean
}

/**
 * Build the entry that runs our own CLI as an MCP server.
 *
 * `node` and the CLI are absolute so PATH is irrelevant. When the CLI is still
 * a `.ts` source file (running from a checkout) node needs the strip-types
 * flag; a built bundle is a plain `.js` and is passed directly.
 */
export function buildEntry(cliPath: string, node: string = process.execPath): SetupEntry {
  const absolute = resolve(cliPath)
  const args = absolute.endsWith('.ts')
    ? ['--experimental-strip-types', absolute, 'mcp']
    : [absolute, 'mcp']
  return { command: node, args }
}

/**
 * Resolve the seven clients against `home`.
 *
 * Detection is deliberately conservative: Claude Code keeps its file directly
 * in the home, so only the file counts for it — every other client owns a
 * folder, and that folder existing means the client is installed even before
 * it has a config file.
 */
export function resolveClientTargets(home: string = homedir()): ClientTarget[] {
  const root = resolve(home)
  return CLIENTS.map(def => {
    const path = join(root, def.configPath)
    const folder = dirname(path)
    const detected = existsSync(path) || (folder !== root && existsSync(folder))
    return { def, path, detected }
  })
}

/** The backup a config file gets before its first real change. */
export function backupPathFor(path: string, at: Date = new Date()): string {
  const stamp = at.toISOString().replace(/[:.]/g, '-')
  return `${path}.plugbrain-backup-${stamp}`
}

/** The newest backup next to `path`, or null when there is none. */
export function findLatestBackup(path: string): string | null {
  const folder = dirname(path)
  if (!existsSync(folder)) return null
  const prefix = `${basename(path)}.plugbrain-backup-`
  const names = readdirSync(folder).filter(name => name.startsWith(prefix)).sort()
  return names.length === 0 ? null : join(folder, names[names.length - 1]!)
}

function jsonString(value: string): string {
  return JSON.stringify(value)
}

/** A YAML scalar safe for Windows paths: single quotes, backslashes literal. */
function yamlScalar(value: string): string {
  return `'${value.replace(/'/g, "''")}'`
}

function tomlBlock(table: string, entry: SetupEntry): string {
  return `[${table}.plugbrain]\ncommand = ${jsonString(entry.command)}\nargs = [${entry.args.map(jsonString).join(', ')}]`
}

function yamlSubBlock(entry: SetupEntry): string[] {
  return [
    '  plugbrain:',
    `    command: ${yamlScalar(entry.command)}`,
    '    args:',
    ...entry.args.map(arg => `      - ${yamlScalar(arg)}`),
  ]
}

/** Deep equality for an entry, so an unchanged file is never rewritten. */
function sameEntry(a: unknown, b: SetupEntry): boolean {
  if (a === null || typeof a !== 'object') return false
  const e = a as { command?: unknown; args?: unknown }
  return e.command === b.command
    && Array.isArray(e.args)
    && e.args.length === b.args.length
    && e.args.every((value, i) => value === b.args[i])
}

/**
 * Render a client config with the plugbrain entry added or refreshed.
 *
 * Returns the new text and whether it differs from what is on disk. Formatting
 * of every other entry is preserved: JSON is re-serialised with two spaces,
 * while TOML and YAML are edited in place so comments and layout survive.
 */
export function renderClientConfig(
  def: ClientDefinition, existing: string | null, entry: SetupEntry,
): { text: string; changed: boolean } {
  const before = existing ?? ''
  if (def.format === 'json') return renderJson(def, existing, entry)
  if (def.format === 'toml') return renderToml(def, before, entry)
  return renderYaml(def, before, entry)
}

function renderJson(
  def: ClientDefinition, existing: string | null, entry: SetupEntry,
): { text: string; changed: boolean } {
  let parsed: Record<string, unknown> | null = null
  if (existing !== null && existing.trim() !== '') {
    try { parsed = JSON.parse(existing) as Record<string, unknown> }
    catch { throw new Error(`${def.label}: ${def.configPath} is not valid JSON; refusing to rewrite it`) }
  }
  const map = parsed?.[def.mapKey]
  const current = map !== null && typeof map === 'object'
    ? (map as Record<string, unknown>).plugbrain : undefined
  if (sameEntry(current, entry)) return { text: existing ?? '', changed: false }
  const root = parsed ?? {}
  const nextMap = map !== null && typeof map === 'object' && !Array.isArray(map)
    ? { ...(map as Record<string, unknown>) } : {}
  nextMap.plugbrain = { command: entry.command, args: entry.args }
  root[def.mapKey] = nextMap
  return { text: `${JSON.stringify(root, null, 2)}\n`, changed: true }
}

function renderToml(
  def: ClientDefinition, before: string, entry: SetupEntry,
): { text: string; changed: boolean } {
  const block = tomlBlock(def.mapKey, entry)
  if (before.trim() === '') return { text: `${block}\n`, changed: true }
  const lines = before.split(/\r?\n/)
  const header = `[${def.mapKey}.plugbrain]`
  const idx = lines.findIndex(line => line.trim() === header)
  if (idx === -1) {
    return { text: `${before.replace(/\s*$/, '\n')}${block}\n`, changed: true }
  }
  let end = idx + 1
  while (end < lines.length && !/^\s*\[/.test(lines[end]!)) end += 1
  let regionEnd = end
  while (regionEnd - 1 > idx && lines[regionEnd - 1]!.trim() === '') regionEnd -= 1
  const next = [...lines.slice(0, idx), ...block.split('\n'), ...lines.slice(regionEnd)]
  const text = `${next.join('\n').replace(/\s*$/, '\n')}`
  return { text, changed: text.trimEnd() !== before.trimEnd() }
}

function renderYaml(
  def: ClientDefinition, before: string, entry: SetupEntry,
): { text: string; changed: boolean } {
  const sub = yamlSubBlock(entry)
  if (before.trim() === '') return { text: `${def.mapKey}:\n${sub.join('\n')}\n`, changed: true }
  const lines = before.split(/\r?\n/)
  const idx = lines.findIndex(line => line.trimEnd() === `${def.mapKey}:`)
  if (idx === -1) {
    return { text: `${before.replace(/\s*$/, '\n')}${def.mapKey}:\n${sub.join('\n')}\n`, changed: true }
  }
  let end = idx + 1
  while (end < lines.length) {
    const line = lines[end]!
    if (line.trim() !== '' && !line.startsWith(' ') && !line.startsWith('#')) break
    end += 1
  }
  let subStart = -1
  for (let i = idx + 1; i < end; i += 1) {
    if (/^ {2}plugbrain:/.test(lines[i]!)) { subStart = i; break }
  }
  if (subStart !== -1) {
    let subEnd = subStart + 1
    while (subEnd < end) {
      const line = lines[subEnd]!
      if (line.startsWith('    ') || line.trim() === '' || /^ {2}#/.test(line)) { subEnd += 1; continue }
      break
    }
    const next = [...lines.slice(0, subStart), ...sub, ...lines.slice(subEnd)]
    const text = next.join('\n').replace(/\s*$/, '\n')
    return { text, changed: text.trimEnd() !== before.trimEnd() }
  }
  let insertAt = end
  while (insertAt - 1 > idx && lines[insertAt - 1]!.trim() === '') insertAt -= 1
  const next = [...lines.slice(0, insertAt), ...sub, ...lines.slice(insertAt)]
  const text = next.join('\n').replace(/\s*$/, '\n')
  return { text, changed: text.trimEnd() !== before.trimEnd() }
}

export type ClientAction = 'created' | 'updated' | 'unchanged' | 'skipped' | 'dry-run' | 'undone' | 'error'

/** What happened to one client, in a form the CLI can print and tests can assert. */
export interface ClientSetupResult {
  id: string
  label: string
  path: string
  action: ClientAction
  changed: boolean
  detected: boolean
  backupPath: string | null
  restoredFrom: string | null
  /** Text before the change, for a `--dry-run` diff. */
  before: string | null
  /** Text after the change, for a `--dry-run` diff. */
  after: string | null
  error?: string
}

export interface SetupClientsOptions {
  /** The user's home; every config path is resolved under it. */
  home?: string
  /** Entry to write; build it with `buildEntry`. */
  entry: SetupEntry
  /** Restrict to these client ids; undefined means every detected client. */
  only?: string[]
  /** Show the change without touching disk or writing a backup. */
  dryRun?: boolean
  /** Restore the newest backup of each selected client instead of writing. */
  undo?: boolean
  /** Client targets; resolved from `home` when omitted (a test seam). */
  targets?: ClientTarget[]
}

/** Client ids that are neither `--all` nor flags; unknown ids are refused. */
export function parseClientSelection(args: string[]): { only: string[] | null; unknown: string[] } {
  if (args.includes('--all')) return { only: null, unknown: [] }
  const ids: string[] = []
  const unknown: string[] = []
  for (const arg of args) {
    if (arg.startsWith('-')) continue
    if (CLIENTS.some(client => client.id === arg)) ids.push(arg)
    else unknown.push(arg)
  }
  return { only: ids.length === 0 ? null : ids, unknown }
}

/**
 * Write (or undo) the plugbrain entry across the selected clients.
 *
 * Backups happen only when a file actually changes, so running `setup` twice
 * leaves exactly one backup from the first real write. A dry run touches
 * nothing at all. Errors on one client never stop the others: each result
 * carries its own outcome.
 */
export function setupClients(options: SetupClientsOptions): ClientSetupResult[] {
  const targets = options.targets ?? resolveClientTargets(options.home)
  const wanted = options.only === undefined || options.only === null ? null : new Set(options.only)
  return targets.map(target => {
    const base: ClientSetupResult = {
      id: target.def.id, label: target.def.label, path: target.path,
      action: 'skipped', changed: false, detected: target.detected,
      backupPath: null, restoredFrom: null, before: null, after: null,
    }
    try {
      if (wanted !== null && !wanted.has(target.def.id)) return base
      if (!target.detected) return { ...base, action: 'skipped' }
      if (options.undo === true) return undoClient(target, base)
      return applyClient(target, options.entry, options.dryRun === true, base)
    } catch (error) {
      return { ...base, action: 'error', error: error instanceof Error ? error.message : String(error) }
    }
  })
}

function applyClient(
  target: ClientTarget, entry: SetupEntry, dryRun: boolean, base: ClientSetupResult,
): ClientSetupResult {
  const existing = existsSync(target.path) ? readFileSync(target.path, 'utf8') : null
  const rendered = renderClientConfig(target.def, existing, entry)
  if (!rendered.changed) {
    return { ...base, action: 'unchanged', before: existing, after: existing }
  }
  if (dryRun) {
    return { ...base, action: 'dry-run', changed: true, before: existing, after: rendered.text }
  }
  let backup: string | null = null
  if (existing !== null) {
    backup = backupPathFor(target.path)
    copyFileSync(target.path, backup)
  }
  writeFileSync(target.path, rendered.text)
  return {
    ...base,
    action: existing === null ? 'created' : 'updated',
    changed: true,
    backupPath: backup,
    before: existing,
    after: rendered.text,
  }
}

function undoClient(target: ClientTarget, base: ClientSetupResult): ClientSetupResult {
  const backup = findLatestBackup(target.path)
  if (backup === null) return { ...base, action: 'unchanged' }
  const current = existsSync(target.path) ? readFileSync(target.path, 'utf8') : null
  const restored = readFileSync(backup, 'utf8')
  copyFileSync(backup, target.path)
  return {
    ...base, action: 'undone', changed: true, restoredFrom: backup,
    before: current, after: restored,
  }
}
