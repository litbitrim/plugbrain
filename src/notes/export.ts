/** Minimal standards-compliant ZIP export for Markdown knowledge.
 *
 * Keeping it here avoids a heavyweight archive dependency in the local-only
 * Brain. Entries are stored (not compressed), which is predictable and opens
 * in Explorer, Finder and every normal unzip tool.
 */
import type { DatabaseSync } from 'node:sqlite'
import * as access from '../access.ts'
import { listNotes } from './vault.ts'

function crc32(data: Buffer): number {
  let value = 0xffffffff
  for (const byte of data) {
    value ^= byte
    for (let i = 0; i < 8; i += 1) value = (value >>> 1) ^ (value & 1 ? 0xedb88320 : 0)
  }
  return (value ^ 0xffffffff) >>> 0
}

function u16(value: number): Buffer { const out = Buffer.alloc(2); out.writeUInt16LE(value & 0xffff); return out }
function u32(value: number): Buffer { const out = Buffer.alloc(4); out.writeUInt32LE(value >>> 0); return out }

export function markdownZip(entries: Array<{ name: string; content: Buffer }>): Buffer {
  const parts: Buffer[] = []
  const central: Buffer[] = []
  let offset = 0
  for (const entry of entries) {
    const name = Buffer.from(entry.name.replace(/\\/g, '/'), 'utf8')
    const crc = crc32(entry.content)
    const local = Buffer.concat([
      u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc),
      u32(entry.content.byteLength), u32(entry.content.byteLength), u16(name.byteLength), u16(0), name, entry.content,
    ])
    parts.push(local)
    central.push(Buffer.concat([
      u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc),
      u32(entry.content.byteLength), u32(entry.content.byteLength), u16(name.byteLength), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), name,
    ]))
    offset += local.byteLength
  }
  const directory = Buffer.concat(central)
  return Buffer.concat([...parts, directory, Buffer.concat([
    u32(0x06054b50), u16(0), u16(0), u16(entries.length), u16(entries.length), u32(directory.byteLength), u32(offset), u16(0),
  ])])
}

export function exportNote(db: DatabaseSync, workspaceId: string, agentId: string, path: string): Buffer {
  const note = access.readBinaryFile(db, workspaceId, agentId, path)
  return markdownZip([{ name: note.path, content: note.content }])
}

export function exportVault(db: DatabaseSync, workspaceId: string, agentId: string): Buffer {
  const listed = listNotes(db, workspaceId, { limit: 5000 })
  return markdownZip(listed.notes.map(note => {
    const file = access.readBinaryFile(db, workspaceId, agentId, note.path)
    return { name: file.path, content: file.content }
  }))
}
