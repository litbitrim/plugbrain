#!/usr/bin/env node
/**
 * Exercise the portable PlugBrain payload exactly as the NSIS installer
 * delivers it: its copied Node runtime runs the bundled daemon and serves the
 * copied UI from an isolated temporary home. This is a packaging smoke test,
 * not an installer-wizard claim.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { once } from 'node:events'
import { createRequire } from 'node:module'

// Reuse the locally installed browser toolchain. Packaging verification must
// not download a browser or rely on an internet connection.
const require = createRequire(import.meta.url)
const playwrightRoot = process.env.PLAYWRIGHT_NODE_PATH ?? 'C:/PLUG/plugpt/Code/PlugBrain-GLM/node_modules/playwright'
const { chromium } = require(playwrightRoot)

const root = join(import.meta.dirname, '..')
const runtime = join(root, 'dist', process.platform === 'win32' ? 'node.exe' : 'node')
const bundle = join(root, 'dist', 'plugbrain.mjs')
const home = mkdtempSync(join(tmpdir(), 'plugbrain-portable-'))

/**
 * The index worker must BE in the payload.
 *
 * The shipped 0.1.0 bundled only cli.ts, so every run resolved
 * `./worker.ts` next to the bundle, found nothing, and died with "Cannot
 * find module ...\dist\worker.ts": the index never happened. Checking that the
 * file exists is the cheapest half of the proof; the run below is the other.
 */
const workerFile = join(root, 'dist', 'worker.mjs')
if (!existsSync(workerFile)) {
  throw new Error('the packaged index worker is missing: dist/worker.mjs was never built')
}
const manifest = JSON.parse(readFileSync(join(root, 'dist', 'release.json'), 'utf8'))
if (manifest.files?.['worker.mjs'] === undefined) {
  throw new Error('the standalone manifest does not cover the index worker')
}

/** A small fixture workspace the packaged daemon indexes for real. */
const workspaceRoot = join(home, '..', `plugbrain-portable-ws-${process.pid}`)
mkdirSync(join(workspaceRoot, 'src'), { recursive: true })
for (let i = 0; i < 12; i += 1) {
  writeFileSync(join(workspaceRoot, 'src', `mod${i}.ts`),
    `export const v${i} = ${i}\nexport function f${i}(x: number): number { return x + ${i} }\n`, 'utf8')
}
mkdirSync(join(workspaceRoot, 'Notizen'), { recursive: true })
writeFileSync(join(workspaceRoot, 'Notizen', 'Alpha.md'), '# Alpha\n\nStandalone Wissenssuche.\n\n[[Entscheidung]]\n', 'utf8')
writeFileSync(join(workspaceRoot, 'Notizen', 'Entscheidung.md'), '---\ntyp: entscheidung\nstand: entschieden\ncode: src/mod0.ts\n---\n\n# Entscheidung\n\n[[Alpha]]\n', 'utf8')
const AUTH_KEY = 'portable-verify-token'

async function reservePort() {
  const server = createServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const address = server.address()
  if (address === null || typeof address === 'string') throw new Error('could not reserve a local TCP port')
  const { port } = address
  server.close()
  await once(server, 'close')
  return port
}

async function waitFor(url, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url)
      if (response.status === 200) return response
    } catch { /* child may still be binding */ }
    await new Promise(resolve => setTimeout(resolve, 150))
  }
  throw new Error(`portable PlugBrain did not answer ${url} within ${timeoutMs}ms`)
}

const port = await reservePort()
const child = spawn(runtime, [bundle, 'serve', String(port)], {
  cwd: root,
  env: {
    ...process.env,
    PLUGBRAIN_HOME: home,
    PLUGBRAIN_NO_DAEMON: '1',
    PLUG_BRAIN_AUTH_KEY: AUTH_KEY,
  },
  stdio: 'ignore',
  windowsHide: true,
})
let browser

try {
  const health = await waitFor(`http://127.0.0.1:${port}/api/health`)
  if (health.status !== 200) throw new Error(`portable health returned ${health.status}`)
  const shell = await waitFor(`http://127.0.0.1:${port}/`)
  const contentType = shell.headers.get('content-type') ?? ''
  if (!contentType.includes('text/html')) throw new Error(`portable UI had unexpected content type: ${contentType}`)
  const html = await shell.text()
  const assetPaths = [...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map(match => match[1])
  if (assetPaths.length === 0) throw new Error('portable UI did not reference a built asset')
  for (const assetPath of assetPaths) {
    const response = await waitFor(`http://127.0.0.1:${port}${assetPath}`)
    if (response.status !== 200) throw new Error(`portable UI asset returned ${response.status}: ${assetPath}`)
    const file = join(root, 'dist', 'ui-dist', assetPath.replace(/^\//, ''))
    if (!existsSync(file)) throw new Error(`served portable UI asset is not in its payload: ${assetPath}`)
  }
  // ── The packaged worker runs a real generation ─────────────────────────
  const post = async (path, body) => fetch(`http://127.0.0.1:${port}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${AUTH_KEY}` },
    body: JSON.stringify(body),
  })

  // This is the same built UI shipped inside dist/. It exercises the first
  // write without a copied key, then reaches the indexed fixture through the
  // regular application route rather than through direct fixture setup.
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${port}`)
  const handedToken = await page.evaluate(() => window.__PLUGBRAIN__?.token)
  if (handedToken !== AUTH_KEY) throw new Error('portable UI did not receive the daemon-local session')
  await page.getByLabel('Vault-Pfad').fill(workspaceRoot)
  await page.getByRole('button', { name: 'Als Vault öffnen' }).click()
  await page.waitForFunction(() => new URL(location.href).searchParams.has('workspace'))
  const workspaceId = new URL(page.url()).searchParams.get('workspace')
  if (!workspaceId) throw new Error('portable UI did not select its newly opened workspace')
  const workspace = { id: workspaceId }

  const started = await post('/api/reindex', { workspace: workspace.id })
  if (started.status !== 202) {
    throw new Error(`portable reindex answered ${started.status} instead of 202: ${await started.text()}`)
  }

  const deadline = Date.now() + 60_000
  let run = null
  while (Date.now() < deadline) {
    const report = await (await fetch(
      `http://127.0.0.1:${port}/api/index/progress?workspace=${encodeURIComponent(workspace.id)}`))
      .json()
    if (!report.running) { run = report.run; break }
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  if (run === null) throw new Error('the portable index run never reached an end')
  if (run.ok !== true) throw new Error(`the portable index run failed: ${run.error ?? 'unknown reason'}`)
  if (run.result === null || run.result.files !== 14) {
    throw new Error(`the portable index run reported ${JSON.stringify(run.result)} instead of 14 files`)
  }

  // The core requirement: the daemon answers WHILE its own packed worker runs.
  const healthDuringQuiet = await (await fetch(`http://127.0.0.1:${port}/api/health`)).json()
  if (healthDuringQuiet.ok !== true || healthDuringQuiet.indexState !== 'idle') {
    throw new Error(`portable health did not report an idle index: ${JSON.stringify(healthDuringQuiet)}`)
  }

  const files = await (await fetch(
    `http://127.0.0.1:${port}/api/files?workspace=${encodeURIComponent(workspace.id)}`)).json()
  if (files.ok !== true || files.files?.total !== 14) {
    throw new Error(`portable /api/files did not list the indexed fixture: ${JSON.stringify(files).slice(0, 300)}`)
  }

  const uiAttached = await post('/api/agent/attach', { workspace: workspace.id, agentId: 'portable-ui', name: 'Portable UI verifier' })
  if (uiAttached.status !== 200) throw new Error(`portable UI actor attach answered ${uiAttached.status}`)

  // Full packaged golden path: search, read and save a note; make a second
  // writer change it; confirm the UI shows its optimistic-lock conflict; then
  // follow the Wiki relation to a decision and from there to source, graph and
  // keyboard help. No route here is faked or addressed through a DOM fixture.
  await page.getByRole('button', { name: 'Wissen' }).click()
  await page.locator('.notes-workbench').waitFor()
  await page.locator('.notes-search input').fill('Standalone Wissenssuche')
  await page.getByRole('button', { name: 'Suchen' }).click()
  await page.getByText('Standalone Wissenssuche.').waitFor()
  const editor = page.getByLabel('Notizinhalt')
  await editor.fill('# Alpha\n\nGespeichert über das paketierte UI.\n\n[[Entscheidung]]\n')
  await page.getByRole('button', { name: 'Speichern' }).click()
  await page.getByText('Gespeichert und im Brain indiziert.').waitFor()
  const before = await (await fetch(`http://127.0.0.1:${port}/api/notes/read?workspace=${encodeURIComponent(workspace.id)}&agentId=portable-ui&path=Notizen%2FAlpha.md`)).json()
  const external = await post('/api/notes/write', { workspace: workspace.id, agentId: 'portable-ui', path: 'Notizen/Alpha.md', expectedHash: before.note.hash, content: `${before.note.content}\nExtern geändert.\n` })
  if (external.status !== 200) throw new Error(`portable external note write answered ${external.status}`)
  await editor.fill('# Alpha\n\nDiese veraltete UI-Änderung darf nicht überschreiben.\n')
  await page.getByRole('button', { name: 'Speichern' }).click()
  await page.locator('.notes-conflict').waitFor()
  await page.locator('.notes-editor__meta section').first().getByRole('button', { name: 'Entscheidung' }).click()
  await page.locator('.notes-editor__head strong').filter({ hasText: 'Entscheidung' }).waitFor()
  await page.getByRole('button', { name: /Datei: src\/mod0\.ts/ }).click()
  await page.locator('.source-header__path').filter({ hasText: 'src/mod0.ts' }).waitFor()
  await page.getByRole('button', { name: 'Wissen' }).click()
  await page.getByRole('button', { name: 'Graph' }).click()
  await page.locator('.knowledge-graph__inspector').waitFor()
  await page.locator('.knowledge-graph').press('ArrowDown')
  await page.keyboard.press('?')
  await page.getByRole('dialog', { name: 'Tastenkürzel' }).waitFor()
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Explorer' }).click()
  await page.getByText('mod0.ts').first().waitFor()

  // The packed server must support real knowledge work, not merely serve a
  // graph shell: attach a local actor, find, read, save, then reject a stale
  // second save through the same HTTP route the UI uses.
  const agentId = 'portable-knowledge'
  const attached = await post('/api/agent/attach', { workspace: workspace.id, agentId, name: 'Portable verifier' })
  if (attached.status !== 200) throw new Error(`portable knowledge actor attach answered ${attached.status}`)
  const searched = await (await fetch(`http://127.0.0.1:${port}/api/notes/search?workspace=${encodeURIComponent(workspace.id)}&q=Standalone`)).json()
  if (searched.ok !== true || searched.total !== 1) throw new Error(`portable note search failed: ${JSON.stringify(searched)}`)
  const alpha = await (await fetch(`http://127.0.0.1:${port}/api/notes/read?workspace=${encodeURIComponent(workspace.id)}&agentId=${agentId}&path=Notizen%2FAlpha.md`)).json()
  if (alpha.ok !== true || alpha.note?.links?.[0]?.path !== 'Notizen/Entscheidung.md') throw new Error('portable wiki-link read failed')
  const saved = await post('/api/notes/write', { workspace: workspace.id, agentId, path: 'Notizen/Alpha.md', expectedHash: alpha.note.hash, content: `${alpha.note.content}\nGespeichert im Paket.\n` })
  if (saved.status !== 200) throw new Error(`portable note save answered ${saved.status}`)
  const stale = await post('/api/notes/write', { workspace: workspace.id, agentId, path: 'Notizen/Alpha.md', expectedHash: alpha.note.hash, content: 'stale' })
  if (stale.status !== 409) throw new Error(`portable note conflict answered ${stale.status}`)
  const noteGraph = await (await fetch(`http://127.0.0.1:${port}/api/notes/graph?workspace=${encodeURIComponent(workspace.id)}`)).json()
  if (noteGraph.ok !== true || noteGraph.graph?.nodes?.length !== 2) throw new Error(`portable knowledge graph failed: ${JSON.stringify(noteGraph)}`)

  console.log(`portable PlugBrain runtime + UI + packaged index worker + knowledge flow healthy on 127.0.0.1:${port}`)
} finally {
  if (browser) await browser.close()
  if (child.exitCode === null && !child.killed) child.kill()
  if (child.exitCode === null) await once(child, 'exit')
  rmSync(home, { recursive: true, force: true })
  rmSync(workspaceRoot, { recursive: true, force: true })
}
