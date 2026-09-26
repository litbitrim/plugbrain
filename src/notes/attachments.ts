/**
 * Attachments belong to a note, but remain normal files inside the vault.
 *
 * The directory is deterministic and deliberately does not accept a client
 * supplied relative path. That makes attachment list/open/write compose with
 * the normal access boundary without turning this route into a file browser.
 */
import { readdirSync, statSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import type { DatabaseSync } from 'node:sqlite'
import * as access from '../access.ts'
import { isNotePath } from './vault.ts'

export interface AttachmentView { name: string; path: string; bytes: number }

export class AttachmentParentMissingError extends Error {
  constructor(path: string) {
    super(`attachment parent note '${path}' does not exist; save the note first`)
    this.name = 'AttachmentParentMissingError'
  }
}

function notePath(notePath: string): string {
  const normalized = notePath.replace(/\\/g, '/').replace(/^\/+/, '')
  if (!normalized.toLowerCase().endsWith('.md') || normalized.split('/').some(part => part === '' || part === '.' || part === '..')) {
    throw new Error('attachment parent must be a vault Markdown note')
  }
  return normalized
}

function safeName(name: string): string {
  const clean = basename(name).replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').trim()
  if (clean === '' || clean === '.' || clean === '..') throw new Error('attachment name is invalid')
  return clean
}

/** Beside its note, under a visible vault-relative attachments directory. */
export function attachmentPath(note: string, name: string): string {
  const parent = notePath(note)
  const stem = basename(parent, '.md')
  return `${dirname(parent).replace(/\\/g, '/')}/attachments/${stem}/${safeName(name)}`
    .replace(/^\.\//, '')
}

function assertNote(db: DatabaseSync, workspaceId: string, note: string): string {
  const path = notePath(note)
  access.requireWorkspace(db, workspaceId)
  if (!isNotePath(db, workspaceId, path)) throw new Error(`'${path}' is outside the note scope`)
  return path
}

/** Attachments are evidence for an existing note, never a side channel that
 * creates an orphan directory before the note itself passed its version fence. */
function assertExistingNote(db: DatabaseSync, workspaceId: string, agentId: string, note: string): string {
  const path = assertNote(db, workspaceId, note)
  try {
    access.readFile(db, workspaceId, agentId, path)
  } catch {
    throw new AttachmentParentMissingError(path)
  }
  return path
}

export function listAttachments(db: DatabaseSync, workspaceId: string, note: string): AttachmentView[] {
  const path = assertNote(db, workspaceId, note)
  const workspace = access.requireWorkspace(db, workspaceId)
  const relDir = attachmentPath(path, '.probe').split('/').slice(0, -1)
  const dir = join(workspace.root, ...relDir)
  try {
    return readdirSync(dir, { withFileTypes: true })
      .filter(entry => entry.isFile())
      .map(entry => {
        const rel = attachmentPath(path, entry.name)
        return { name: entry.name, path: rel, bytes: statSync(join(dir, entry.name)).size }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (error: any) {
    if (error?.code === 'ENOENT') return []
    throw error
  }
}

export function writeAttachment(
  db: DatabaseSync, workspaceId: string, agentId: string, note: string, name: string, base64: string,
): AttachmentView {
  const path = assertExistingNote(db, workspaceId, agentId, note)
  const data = Buffer.from(base64, 'base64')
  if (data.byteLength === 0 && base64 !== '') throw new Error('attachment payload is not valid base64')
  if (data.byteLength > 25 * 1024 * 1024) throw new Error('attachment exceeds the 25 MiB local-vault limit')
  const rel = attachmentPath(path, name)
  const written = access.writeFile(db, workspaceId, agentId, rel, data, `task-note-attachment-${agentId}`)
  return { name: safeName(name), path: written.path, bytes: written.bytes }
}

export function readAttachment(
  db: DatabaseSync, workspaceId: string, agentId: string, note: string, name: string,
): { name: string; path: string; content: Buffer } {
  const path = assertNote(db, workspaceId, note)
  const file = access.readBinaryFile(db, workspaceId, agentId, attachmentPath(path, name))
  return { name: safeName(name), path: file.path, content: file.content }
}
