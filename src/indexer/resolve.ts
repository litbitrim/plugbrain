/**
 * Scoped name resolution.
 *
 * The resolver this replaces did `symbolsByName.get(name)[0]` — a global
 * first match across the entire workspace. That produced edges marked
 * `resolved = 1` pointing at whichever module happened to be walked first, so
 * a bigger edge count meant more confident wrong answers, not more knowledge.
 *
 * Here a name is resolved against progressively wider scopes and the search
 * STOPS at the first scope that answers. Only a workspace-wide match that is
 * UNIQUE is accepted; several candidates produce an explicitly ambiguous edge
 * carrying the candidate count, which is information an agent can act on.
 * Guessing is never a resolution strategy.
 */

/** How a target was resolved, or why it was not. */
export type ResolutionKind =
  | 'same-file'        // defined in the file that used it
  | 'import-binding'   // reached through an explicit import in this file
  | 'namespace'        // reached through `import * as ns` / `ns.target`
  | 'unique-global'    // exactly one definition workspace-wide
  | 'ambiguous'        // several plausible definitions; refused to pick
  | 'unresolved'       // nothing in the workspace defines this name

export interface Resolution {
  symbolId: number | null
  fileId: number | null
  kind: ResolutionKind
  /** How many plausible definitions were found. 0, 1, or n for ambiguous. */
  candidates: number
}

/** A symbol as the resolver needs to see it. */
export interface SymbolRow {
  id: number
  fileId: number
  line: number
  name: string
  exported: boolean
  container: string | null
}

/** One local name an import brought into a file, already pointed at a file. */
export interface ResolvedBinding {
  local: string
  imported: string
  /** Target file id, or null when the specifier left the workspace. */
  targetFileId: number | null
}

export interface ResolveInput {
  /** The file whose reference is being resolved. */
  fileId: number
  target: string
  /** Text left of the dot in `receiver.target(...)`, else null. */
  receiver: string | null
  /** Enclosing symbol name in the using file, when known. */
  from: string | null
}

export interface ResolveContext {
  /** Symbols defined in a given file, by name. */
  symbolsByFile: Map<number, Map<string, SymbolRow[]>>
  /** Import bindings of a given file, by local name. */
  bindingsByFile: Map<number, Map<string, ResolvedBinding>>
  /**
   * Workspace-wide definition COUNT per name, plus the single id when the
   * count is exactly one. Deliberately not a full list: the only global fact
   * the resolver is allowed to act on is uniqueness.
   */
  globalByName: Map<string, { count: number; symbolId: number; fileId: number }>
}

const NOT_FOUND: Resolution = { symbolId: null, fileId: null, kind: 'unresolved', candidates: 0 }

/** The binding root of a receiver: `a.b.c` -> `a`. */
function receiverRoot(receiver: string): string {
  const dot = receiver.indexOf('.')
  return dot === -1 ? receiver : receiver.slice(0, dot)
}

/**
 * Pick from several same-named symbols in ONE file. A method on the class the
 * reference sits in beats a same-named method on another class in the same
 * file; otherwise a single candidate wins and a tie is ambiguous.
 */
function pickWithinFile(rows: SymbolRow[], from: string | null): Resolution | null {
  if (rows.length === 0) return null
  if (rows.length === 1) {
    return { symbolId: rows[0].id, fileId: rows[0].fileId, kind: 'same-file', candidates: 1 }
  }
  if (from !== null) {
    const inContainer = rows.filter(row => row.container === from)
    if (inContainer.length === 1) {
      return { symbolId: inContainer[0].id, fileId: inContainer[0].fileId, kind: 'same-file', candidates: 1 }
    }
  }
  // Several definitions of one name in one file and nothing to separate them:
  // an overload set or a shadowed local. Say so instead of choosing.
  return { symbolId: null, fileId: rows[0].fileId, kind: 'ambiguous', candidates: rows.length }
}

/** Find `name` inside `fileId`, preferring an exported definition. */
function lookupInFile(
  context: ResolveContext,
  fileId: number,
  name: string,
): SymbolRow[] {
  const byName = context.symbolsByFile.get(fileId)
  if (byName === undefined) return []
  const rows = byName.get(name)
  if (rows === undefined || rows.length === 0) return []
  const exported = rows.filter(row => row.exported)
  // A module's exported `run` is what an importer means by `run`; a private
  // helper with the same name in that module is not reachable from outside.
  return exported.length > 0 ? exported : rows
}

/**
 * Resolve one reference.
 *
 * Order is deliberate and each step is a real scope, not a heuristic:
 *   1. `this.x` / bare `x` defined in the same file
 *   2. `ns.x` where `ns` is an import binding of this file
 *   3. bare `x` where `x` itself is an import binding of this file
 *   4. exactly one definition in the whole workspace
 *   5. several definitions -> ambiguous; none -> unresolved
 */
export function resolveReference(context: ResolveContext, input: ResolveInput): Resolution {
  const { fileId, target, receiver, from } = input

  // 1. Same file. `this.x` can ONLY mean this file, so it never falls through.
  const local = lookupInFile(context, fileId, target)
  if (receiver === 'this') {
    return pickWithinFile(local, from) ?? NOT_FOUND
  }
  if (receiver === null) {
    const hit = pickWithinFile(local, from)
    if (hit !== null && hit.kind === 'same-file') return hit
  }

  const bindings = context.bindingsByFile.get(fileId)

  // 2. `ns.target` where `ns` is bound by an import in THIS file.
  if (receiver !== null) {
    const binding = bindings?.get(receiverRoot(receiver))
    if (binding !== undefined) {
      if (binding.targetFileId === null) {
        // An external package: honestly out of the indexed world.
        return { symbolId: null, fileId: null, kind: 'unresolved', candidates: 0 }
      }
      const rows = lookupInFile(context, binding.targetFileId, target)
      if (rows.length === 1) {
        return { symbolId: rows[0].id, fileId: rows[0].fileId, kind: 'namespace', candidates: 1 }
      }
      if (rows.length > 1) {
        return { symbolId: null, fileId: binding.targetFileId, kind: 'ambiguous', candidates: rows.length }
      }
      // The module is known and does not define it: not a workspace symbol.
      return { symbolId: null, fileId: binding.targetFileId, kind: 'unresolved', candidates: 0 }
    }
    // A receiver we cannot bind (a local variable, a parameter, a chained
    // expression). Falling through to a global name match here is exactly the
    // guess that produced wrong edges before, so we stop.
    return NOT_FOUND
  }

  // 3. Bare `target` that this file imported.
  const binding = bindings?.get(target)
  if (binding !== undefined) {
    if (binding.targetFileId === null) return NOT_FOUND
    const wanted = binding.imported === '*' || binding.imported === 'default' ? target : binding.imported
    const rows = lookupInFile(context, binding.targetFileId, wanted)
    if (rows.length === 1) {
      return { symbolId: rows[0].id, fileId: rows[0].fileId, kind: 'import-binding', candidates: 1 }
    }
    if (rows.length > 1) {
      return { symbolId: null, fileId: binding.targetFileId, kind: 'ambiguous', candidates: rows.length }
    }
    return { symbolId: null, fileId: binding.targetFileId, kind: 'unresolved', candidates: 0 }
  }

  // 4/5. Workspace-wide, and ONLY when unique.
  const global = context.globalByName.get(target)
  if (global === undefined) return NOT_FOUND
  if (global.count === 1) {
    return { symbolId: global.symbolId, fileId: global.fileId, kind: 'unique-global', candidates: 1 }
  }
  return { symbolId: null, fileId: null, kind: 'ambiguous', candidates: global.count }
}
