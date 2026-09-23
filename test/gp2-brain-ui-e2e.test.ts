import { strict as assert } from 'node:assert'
import { createRequire } from 'node:module'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { openStore } from '../src/store/schema.ts'
import { serve } from '../src/server/api.ts'

// Playwright is deliberately resolved from the already-installed local browser
// toolchain.  GP-2 must not download a browser merely to prove a local UI.
const require = createRequire(import.meta.url)
const playwrightRoot = process.env.PLAYWRIGHT_NODE_PATH ?? 'C:/PLUG/plugpt/Code/PlugBrain-GLM/node_modules/playwright'
const { chromium } = require(playwrightRoot) as { chromium: any }

test('GP-2: a human can complete standalone knowledge work through the real Brain UI', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'plugbrain-gp2-ui-'))
  const vault = join(dir, 'vault')
  mkdirSync(join(vault, 'Notizen'), { recursive: true })
  mkdirSync(join(vault, 'src'), { recursive: true })
  writeFileSync(join(vault, 'src', 'source.ts'), 'export const source = "real"\n', 'utf8')
  writeFileSync(join(vault, 'Notizen', 'Alpha.md'), '# Alpha\n\nDie eindeutige GP2-Suche findet diese Notiz.\n\n[[Entscheidung]]\n', 'utf8')
  writeFileSync(join(vault, 'Notizen', 'Entscheidung.md'), [
    '---', 'typ: entscheidung', 'stand: entschieden', 'code: src/source.ts', 'revision: nicht-git', 'agentenlauf: gp2-agent', '---', '',
    '# Entscheidung', '', 'Diese Entscheidung verweist zurück auf [[Alpha]].', '',
  ].join('\n'), 'utf8')
  const dbFile = join(dir, 'brain.db')
  const db = openStore(dbFile)
  const authKey = 'gp2-local-token'
  const server = await serve({ db, dbFile, uiRoot: join(import.meta.dirname, '..', 'ui-dist'), authKey }, 0)
  const base = `http://127.0.0.1:${server.port}`
  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.goto(base)
    assert.equal(await page.evaluate(() => window.__PLUGBRAIN__?.token), authKey, 'the real served shell hands its local session to the UI')
    await assert.doesNotReject(page.getByText('Ordner wählen').waitFor())
    await page.getByLabel('Vault-Pfad').fill(vault)
    await page.getByRole('button', { name: 'Als Vault öffnen' }).click()
    await page.waitForTimeout(1200)
    const openError = await page.locator('.brain-vault__error').allTextContents()
    assert.deepEqual(openError, [], `opening fixture vault failed: ${openError.join(' ')}`)
    await page.waitForFunction(() => new URL(location.href).searchParams.has('workspace'))
    await page.getByRole('button', { name: 'Wissen' }).waitFor()
    await page.getByRole('button', { name: 'Wissen' }).click()
    await page.locator('.notes-workbench').waitFor()

    // Search and open are normal UI actions; no direct note API is used here.
    await page.locator('.notes-search input').fill('GP2-Suche')
    await page.getByRole('button', { name: 'Suchen' }).click()
    await page.getByText('Die eindeutige GP2-Suche findet diese Notiz.').waitFor()

    const editor = page.getByLabel('Notizinhalt')
    await editor.fill('# Alpha\n\nLokale Änderung über die UI.\n\n[[Entscheidung]]\n')
    await page.getByRole('button', { name: 'Speichern' }).click()
    await page.getByText('Gespeichert und im Brain indiziert.').waitFor()

    // A second writer changes the exact version the UI has read. The following
    // UI save has to surface its optimistic-concurrency conflict instead of
    // overwriting that edit.
    const workspace = new URL(page.url()).searchParams.get('workspace')
    assert.ok(workspace, 'the UI selected the workspace it just opened')
    const before = await (await fetch(`${base}/api/notes/read?workspace=${workspace}&agentId=agy&path=Notizen%2FAlpha.md`)).json() as { note: { hash: string; content: string } }
    const external = await fetch(`${base}/api/notes/write`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authKey}` },
      body: JSON.stringify({ workspace, agentId: 'agy', path: 'Notizen/Alpha.md', expectedHash: before.note.hash, content: `${before.note.content}\nExtern geändert.\n` }),
    })
    assert.equal(external.status, 200)
    await editor.fill('# Alpha\n\nDiese veraltete UI-Änderung darf nicht überschreiben.\n')
    await page.getByRole('button', { name: 'Speichern' }).click()
    await page.locator('.notes-conflict').waitFor()

    // Link -> decision -> source is a visible, navigable K2 knowledge path.
    await page.locator('.notes-editor__meta section').first().getByRole('button', { name: 'Entscheidung' }).click()
    await page.locator('.notes-editor__head strong').filter({ hasText: 'Entscheidung' }).waitFor()
    await page.getByRole('button', { name: /Datei: src\/source\.ts/ }).click()
    await page.locator('.source-header__path').filter({ hasText: 'src/source.ts' }).waitFor()

    await page.getByRole('button', { name: 'Wissen' }).click()
    await page.getByRole('button', { name: 'Graph' }).click()
    await page.locator('.knowledge-graph__inspector').waitFor()
    await page.locator('.knowledge-graph').press('ArrowDown')

    await page.keyboard.press('?')
    await page.getByRole('dialog', { name: 'Tastenkürzel' }).waitFor()
    await page.keyboard.press('Escape')
    await page.getByRole('button', { name: 'Explorer' }).click()
    await page.getByText('source.ts').first().waitFor()
  } finally {
    await browser.close()
    await server.close()
    try { db.close() } catch { /* closed by server on error paths */ }
    rmSync(dir, { recursive: true, force: true, maxRetries: 10 })
  }
})
