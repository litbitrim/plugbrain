/**
 * The one deliberate cast point for node:sqlite rows.
 *
 * node:sqlite types every result row as `Record<string, SQLOutputValue>`, an
 * index signature our hand-written row interfaces do not overlap with. Casting
 * at each call site therefore meant either a TS2352 (`as Row`) or an
 * `as unknown as Row` smear, repeated across the whole store. Narrowing once,
 * here, keeps every other file honest: the caller names the shape it expects
 * and the compiler checks the rest of the function against it.
 */

/** A single row, or `undefined` when the statement matched nothing. */
export function rowAs<T>(row: unknown): T | undefined {
  return row as T | undefined
}

/** A result set with a caller-named row shape. */
export function rowsAs<T>(rows: unknown): T[] {
  return rows as T[]
}
