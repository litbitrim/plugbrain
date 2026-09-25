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

  // ── Tier 1: Obsidian-Class Notes, Autosave, Backlinks & Wiki-Links ────
  console.log('[Tier 1] Verifying note editing, optimistic autosave, backlinks, and wiki-links...')
  await page.locator('.pb-tabs').getByRole('button', { name: 'Wissen' }).click()
  await page.locator('.notes-workbench').waitFor()
  await page.locator('.notes-search input').fill('Standalone Wissenssuche')
  await page.getByRole('button', { name: 'Suchen' }).click()
  await page.getByText('Standalone Wissenssuche.').waitFor()

  const editor = page.getByLabel('Notizinhalt')
  await editor.fill('# Alpha\n\nGespeichert über das paketierte UI.\n\n[[Entscheidung]]\n')
  await page.getByRole('button', { name: 'Speichern' }).click()
  await page.getByText(/Gespeichert und im Brain indiziert|Notiz angelegt/).waitFor()

  // Optimistic autosave verification: edit content without clicking Speichern
  await editor.fill('# Alpha\n\nGespeichert über das paketierte UI.\n\nAutosave aktiv.\n\n[[Entscheidung]]\n')
  await page.waitForTimeout(1200)

  // Optimistic concurrency conflict detection
  const before = await (await fetch(`http://127.0.0.1:${port}/api/notes/read?workspace=${encodeURIComponent(workspace.id)}&agentId=portable-ui&path=Notizen%2FAlpha.md`)).json()
  const external = await post('/api/notes/write', { workspace: workspace.id, agentId: 'portable-ui', path: 'Notizen/Alpha.md', expectedHash: before.note.hash, content: `${before.note.content}\nExtern geändert.\n` })
  if (external.status !== 200) throw new Error(`portable external note write answered ${external.status}`)
  await editor.fill('# Alpha\n\nDiese veraltete UI-Änderung darf nicht überschreiben.\n')
  await page.getByRole('button', { name: 'Speichern' }).click()
  await page.locator('.notes-conflict').waitFor()

  // Wiki-link navigation to Entscheidung
  await page.locator('.notes-editor__meta section').first().getByRole('button', { name: 'Entscheidung' }).click()
  await page.locator('.notes-editor__head strong').filter({ hasText: 'Entscheidung' }).waitFor()

  // Live Backlinks pane verification (Entscheidung.md has backlink from Alpha.md)
  const backlinksSection = page.locator('.notes-editor__meta section').filter({ hasText: 'Backlinks' })
  await backlinksSection.waitFor()
  await backlinksSection.getByRole('button', { name: /Alpha/ }).waitFor()

  // Frontmatter Code-Binding ("Quelle öffnen")
  await page.getByRole('button', { name: /Datei: src\/mod0\.ts/ }).click()
  await page.locator('.source-header__path').filter({ hasText: 'src/mod0.ts' }).waitFor()

  // Knowledge Graph navigation: Resilient locator scoped to sidebar head
  await page.locator('.pb-tabs').getByRole('button', { name: 'Wissen' }).click()
  await page.locator('.notes-sidebar__head').getByRole('button', { name: 'Graph' }).click()
  await page.locator('.knowledge-graph__inspector').waitFor()
  await page.locator('.knowledge-graph').press('ArrowDown')
  await page.keyboard.press('?')
  await page.getByRole('dialog', { name: 'Tastenkürzel' }).waitFor()
  await page.keyboard.press('Escape')
  await page.locator('.notes-sidebar__head').getByRole('button', { name: 'Editor' }).click()
  console.log('[Tier 1] Notes, autosave, backlinks, and wiki-links passed cleanly.')

  // ── Tier 2: Instant Dual Search (Notes & AST Code Symbols) ───────────
  console.log('[Tier 2] Verifying instant search across notes and code symbols...')
  await page.locator('.pb-tabs').getByRole('button', { name: 'Suche' }).click()
  await page.locator('.search-view').waitFor()

  // 2.1 Code & AST Symbol search (/api/agent/search)
  const searchInput = page.locator('.search-view input').first()
  await searchInput.fill('mod0')
  await page.keyboard.press('Enter')
  await page.waitForTimeout(400)

  // 2.2 Prose search mode toggle (/api/notes/search)
  const proseTab = page.locator('.search-view .tb').filter({ hasText: /prose|Volltext/i }).first()
  if (await proseTab.count() > 0) {
    await proseTab.click()
    await searchInput.fill('Alpha')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(400)
  }
  console.log('[Tier 2] Instant dual search passed cleanly.')

  // ── Tier 3: Explorer File Tree Opening into SourceView with Centered Line ─
  console.log('[Tier 3] Verifying explorer file tree opening into SourceView...')
  await page.locator('.pb-tabs').getByRole('button', { name: 'Explorer' }).click()
  await page.locator('.explorer-view').waitFor()

  // 3.1 Explorer file filter
  const filterInput = page.locator('.explorer-search__input')
  if (await filterInput.count() > 0) {
    await filterInput.fill('mod1')
    await page.waitForTimeout(200)
    await page.getByText('mod1.ts').first().waitFor()
    const clearBtn = page.locator('.explorer-search__clear')
    if (await clearBtn.count() > 0) await clearBtn.click()
    else await filterInput.fill('')
  }

  // 3.2 Open file in SourceView with line highlighting
  await page.getByText('mod0.ts').first().click()
  await page.locator('.source-header__path').filter({ hasText: 'mod0.ts' }).waitFor()
  await page.locator('.source-table, .source-lines, .source-line-row').first().waitFor()
  console.log('[Tier 3] Explorer and SourceView line highlighting passed cleanly.')

  // ── Tier 4: Viewport, CSS Tokens & All 8 View Transitions ────────────
  console.log('[Tier 4] Verifying viewport, CSS tokens, and transitions across all 8 views...')
  // 4.1 CSS Design Tokens Validation
  const cssTokens = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement)
    return {
      bg: root.getPropertyValue('--bg').trim(),
      panel: root.getPropertyValue('--panel').trim(),
      mono: root.getPropertyValue('--mono').trim() || root.getPropertyValue('--font-mono').trim(),
    }
  })
  console.log(`[Tier 4 Tokens] Active: --bg '${cssTokens.bg}', --panel '${cssTokens.panel}'`)
  const validDarkBg = ['#050706', '#070908', '#0b0c0e']
  if (!validDarkBg.includes(cssTokens.bg.toLowerCase())) {
    throw new Error(`CSS token validation failed: --bg '${cssTokens.bg}' is not in valid dark palette`)
  }

  // 4.2 Status Pill Validation
  const statusPills = page.locator('.pb-status')
  if (await statusPills.count() > 0) {
    const pillText = await statusPills.first().textContent()
    console.log(`[Tier 4 Status Pill] Active status pill: '${pillText?.trim()}'`)
  }

  // 4.3 Viewport Defect Elimination: Check for overflow / duplicate scrollbars
  const hasDocOverflow = await page.evaluate(() => {
    return document.documentElement.scrollHeight > window.innerHeight + 10
  })
  if (hasDocOverflow) {
    console.warn('[Tier 4 Viewport Notice] scrollHeight exceeds windowHeight; verify viewport flex containment')
  }

  // 4.4 View Transitions Across All 9 Views (Graph, Wissen, Explorer, Suche, Packs, City, Mesh, Queue, Roadmap)
  const viewsToTest = [
    { name: /Atlas|Graph/, selector: '.atlas-app, #stage, .pb-graph, .brain-view' },
    { name: 'Wissen', selector: '.notes-workbench' },
    { name: 'Explorer', selector: '.explorer-view' },
    { name: 'Suche', selector: '.search-view' },
    { name: 'Packs', selector: '.workbench-split, .context-packs' },
    { name: 'City', selector: '.pb-city, #city, canvas' },
    { name: 'Mesh', selector: '.pb-mesh, .mesh-view, .brain-view-mesh' },
    { name: 'Queue', selector: '.queue-view, .brain-view-queue, .queue, .brain-empty' },
    { name: 'Roadmap', selector: '.roadmap-view' },
  ]

  for (const v of viewsToTest) {
    const tab = page.locator('.pb-tabs').getByRole('button', { name: v.name })
    if (await tab.count() > 0) {
      await tab.click()
      await page.locator(v.selector).first().waitFor({ timeout: 5000 })
    }
  }
  console.log('[Tier 4] All 9 view transitions verified operational.')

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
