/**
 * Package-boundary resolution for bare JS/TS specifiers.
 *
 * A bare import is not a licence to connect every same-named source file in a
 * planet. It must cross an explicit package dependency and the target must
 * expose the requested entry point. Everything else remains unresolved.
 */
import { readFileSync } from 'node:fs'
import { join, posix } from 'node:path'

interface PackageManifest {
  name: string
  root: string
  dependencies: Set<string>
  exports: unknown
  main: string | null
  module: string | null
  types: string | null
}

const dependencyFields = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'] as const

const packageNameOf = (specifier: string): { name: string; subpath: string } | null => {
  if (specifier.startsWith('.') || specifier.startsWith('/') || specifier.includes(':')) return null
  const parts = specifier.split('/')
  const count = specifier.startsWith('@') ? 2 : 1
  if (parts.length < count || parts.slice(0, count).some(part => part === '')) return null
  return { name: parts.slice(0, count).join('/'), subpath: parts.slice(count).join('/') }
}

const firstString = (value: unknown): string | null => {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    for (const item of value) {
      const hit = firstString(item)
      if (hit !== null) return hit
    }
  }
  if (value !== null && typeof value === 'object') {
    const fields = value as Record<string, unknown>
    for (const key of ['import', 'default', 'require', 'types']) {
      const hit = firstString(fields[key])
      if (hit !== null) return hit
    }
  }
  return null
}

const asString = (value: unknown): string | null => typeof value === 'string' ? value : null

/**
 * Resolve internal package imports from the already-indexed file corpus.
 * Filesystem reads are limited to visible package manifests under the already
 * registered workspace root; package contents and dependencies are never read.
 */
export class PackageResolver {
  private readonly manifests: PackageManifest[]
  private readonly manifestByRoot: Map<string, PackageManifest>
  private readonly workspaceRoot: string
  private readonly known: Set<string>

  constructor(workspaceRoot: string, known: Set<string>) {
    this.workspaceRoot = workspaceRoot
    this.known = known
    this.manifests = []
    this.manifestByRoot = new Map()
    for (const manifestPath of known) {
      if (!manifestPath.endsWith('/package.json') && manifestPath !== 'package.json') continue
      const root = posix.dirname(manifestPath) === '.' ? '' : posix.dirname(manifestPath)
      try {
        const raw = JSON.parse(readFileSync(join(workspaceRoot, ...manifestPath.split('/')), 'utf8')) as Record<string, unknown>
        if (typeof raw.name !== 'string' || raw.name.length === 0) continue
        const dependencies = new Set<string>()
        for (const field of dependencyFields) {
          const values = raw[field]
          if (values === null || typeof values !== 'object' || Array.isArray(values)) continue
          for (const key of Object.keys(values as Record<string, unknown>)) dependencies.add(key)
        }
        const manifest: PackageManifest = {
          name: raw.name, root, dependencies, exports: raw.exports,
          main: asString(raw.main), module: asString(raw.module), types: asString(raw.types),
        }
        this.manifests.push(manifest)
        this.manifestByRoot.set(root, manifest)
      } catch {
        // An invalid manifest cannot prove a package boundary.
      }
    }
  }

  resolve(fromRel: string, specifier: string): string | null {
    const requested = packageNameOf(specifier)
    if (requested === null) return null
    const source = this.owningPackage(fromRel)
    if (source === null || !source.dependencies.has(requested.name)) return null
    const candidates = this.manifests.filter(manifest => manifest.name === requested.name)
    if (candidates.length !== 1) return null // duplicate package identities are ambiguous
    const entry = this.exportedEntry(candidates[0], requested.subpath)
    return entry === null ? null : this.knownEntry(candidates[0].root, entry)
  }

  /** Package entry files the manifest explicitly exposes to consumers. */
  entries(): Array<{ packageName: string; path: string }> {
    const entries: Array<{ packageName: string; path: string }> = []
    for (const manifest of this.manifests) {
      const entry = this.exportedEntry(manifest, '')
      if (entry === null) continue
      const path = this.knownEntry(manifest.root, entry)
      if (path !== null) entries.push({ packageName: manifest.name, path })
    }
    return entries
  }

  private owningPackage(rel: string): PackageManifest | null {
    let dir = posix.dirname(rel)
    while (dir !== '.' && dir !== '') {
      const manifest = this.manifestByRoot.get(dir)
      if (manifest !== undefined) return manifest
      dir = posix.dirname(dir)
    }
    return this.manifestByRoot.get('') ?? null
  }

  private exportedEntry(manifest: PackageManifest, subpath: string): string | null {
    const key = subpath === '' ? '.' : `./${subpath}`
    if (manifest.exports !== undefined && manifest.exports !== null) {
      if (typeof manifest.exports === 'string' || Array.isArray(manifest.exports)) {
        return key === '.' ? firstString(manifest.exports) : null
      }
      const map = manifest.exports as Record<string, unknown>
      return firstString(map[key])
    }
    if (subpath !== '') return `./${subpath}`
    return manifest.module ?? manifest.main ?? manifest.types
  }

  private knownEntry(root: string, entry: string): string | null {
    if (!entry.startsWith('./')) return null
    const base = posix.normalize(root === '' ? entry.slice(2) : `${root}/${entry.slice(2)}`)
    const candidates = [
      base, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.jsx`, `${base}.mjs`, `${base}.cjs`,
      base.replace(/\.js$/i, '.ts'), base.replace(/\.js$/i, '.tsx'),
      `${base}/index.ts`, `${base}/index.tsx`, `${base}/index.js`, `${base}/index.jsx`,
    ]
    return candidates.find(candidate => this.known.has(candidate)) ?? null
  }
}
