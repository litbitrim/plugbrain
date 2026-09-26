// Read-only inspection of the canonical brain store: which workspace objects and
// checkouts the planet knows, and which of them are outside C:\PLUG\plugpt\Code.
// Nothing here writes; it exists so the binding question is answered from rows,
// not from a guess.
const { DatabaseSync } = require('node:sqlite')

const db = new DatabaseSync('C:/PLUG/plugpt/.plugbrain/plugbrain.db', { readOnly: true })

console.log('--- planets ---')
for (const r of db.prepare('SELECT * FROM planets').all()) console.log(JSON.stringify(r))

console.log('--- workspace_index_state ---')
for (const r of db.prepare('SELECT * FROM workspace_index_state').all()) console.log(JSON.stringify(r))

console.log('--- repos ---')
for (const r of db.prepare('SELECT id,name,common_dir FROM repos ORDER BY name').all()) console.log(JSON.stringify(r))

const inCode = path => /^c:\\plug\\plugpt\\code\\/i.test(String(path).replace(/\//g, '\\'))
console.log('--- checkouts NOT under C:\\PLUG\\plugpt\\Code ---')
let outside = 0
for (const r of db.prepare('SELECT id,repo_id,name,path,is_primary,retired_at FROM checkouts ORDER BY path').all()) {
  if (!inCode(r.path)) { outside++; console.log(JSON.stringify(r)) }
}
console.log(`outside=${outside} total=${db.prepare('SELECT COUNT(*) c FROM checkouts').get().c}`)

console.log('--- primary checkouts ---')
for (const r of db.prepare('SELECT repo_id,name,path FROM checkouts WHERE is_primary=1 ORDER BY name').all()) console.log(JSON.stringify(r))

console.log('--- git_state ---')
for (const r of db.prepare('SELECT workspace_id,is_repo,is_repo_root,root,branch,head,dirty_count FROM git_state').all()) console.log(JSON.stringify(r))

// Any trace of the legacy frozen tree anywhere in the store?
console.log('--- legacy path occurrences ---')
for (const t of ['files', 'note_properties', 'path_owner', 'file_owner', 'edges', 'activity', 'trace_events', 'repos', 'checkouts']) {
  try {
    const cols = db.prepare(`PRAGMA table_info(${t})`).all().map(c => c.name)
    const text = cols.filter(c => c !== 'id')
    if (text.length === 0) continue
    const where = text.map(c => `CAST(${c} AS TEXT) LIKE '%plug-restored%'`).join(' OR ')
    const n = db.prepare(`SELECT COUNT(*) c FROM ${t} WHERE ${where}`).get().c
    if (n > 0) console.log(`${t}: ${n} row(s) mention the legacy tree`)
  } catch (error) {
    console.log(`${t}: unreadable (${error.message})`)
  }
}
db.close()
