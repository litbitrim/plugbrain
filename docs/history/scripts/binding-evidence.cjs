// Read-only probe: confirm the index-id derivation and gather the REAL on-disk
// evidence for both the legacy checkout and the canonical components, so any new
// durable row can be written from observed state instead of invented state.
const { createHash } = require('node:crypto')
const { existsSync, readFileSync, readdirSync } = require('node:fs')
const { execFileSync } = require('node:child_process')
const { join } = require('node:path')

// Copied verbatim from packages/plug/brain/src/index-lifecycle.ts (canonicalWorkspace + gitNexusIndexId).
const canonicalWorkspace = p => p.replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase()
const gitNexusIndexId = p => 'gx-' + createHash('sha256').update(canonicalWorkspace(p), 'utf8').digest('hex').slice(0, 8)

const legacy = 'C:\\PLUG-RESTORED-20260829\\workspaces\\cloud-foundry\\plugharness'
console.log('legacy canonical  =', canonicalWorkspace(legacy))
console.log('legacy index id   =', gitNexusIndexId(legacy), '(row in index-rows.json says gx-6f56d91c)')
console.log('legacy exists     =', existsSync(legacy))
if (existsSync(legacy)) {
  try {
    const head = execFileSync('git', ['-C', legacy, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
    console.log('legacy HEAD       =', head, '(row claims headCommit ac1a7792edb961b0f9a2286d9ad712963d630ac7)')
  } catch (error) { console.log('legacy HEAD       = unreadable:', error.message) }
}

const code = 'C:\\PLUG\\plugpt\\Code'
const names = readdirSync(code, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort()
console.log('\n--- canonical components under', code, '---')
for (const name of names) {
  const path = join(code, name)
  const meta = join(path, '.gitnexus', 'meta.json')
  const hasGit = existsSync(join(path, '.git'))
  const id = gitNexusIndexId(path)
  let head = null
  try { head = execFileSync('git', ['-C', path, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim() } catch { /* not a repo */ }
  let metaCommit = null
  if (existsSync(meta)) {
    try {
      const parsed = JSON.parse(readFileSync(meta, 'utf8'))
      metaCommit = parsed.commit ?? parsed.lastCommit ?? parsed.headCommit ?? Object.keys(parsed).slice(0, 8).join(',')
    } catch (error) { metaCommit = 'unreadable: ' + error.message }
  }
  console.log(JSON.stringify({ name, id, hasGit, hasIndex: existsSync(join(path, '.gitnexus')), metaCommit, head }))
}
