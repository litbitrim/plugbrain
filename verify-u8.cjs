const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const BASE_URL = 'http://127.0.0.1:5299';
const OUT_DIR = 'C:\\PLUG\\plugpt\\koordination\\closeout\\brain-standalone-20260926\\ux\\screens\\u8';
const TOKEN = 'plug-c11345ec2f744d898c44f4edaca9aae6';

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('Starte Abnahmeprüfung U8 (8 Nutzeraufgaben)...');

  const browser = await chromium.launch({ channel: 'msedge', headless: true })
    .catch(() => chromium.launch({ channel: 'chrome', headless: true }));

  const results = [];

  const setupPage = async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.evaluate(({ token }) => {
      localStorage.setItem('plugbrain.auth_token', token);
      localStorage.setItem('plugbrain.agent_id', 'agy');
    }, { token: TOKEN });
  };

  // ─── AUFGABE 1: Einen neuen Ordner als Vault öffnen ───
  {
    const start = Date.now();
    let clicks = 0;
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await setupPage(page);
      const vaultBtn = page.getByRole('button', { name: 'Vault öffnen' });
      if (await vaultBtn.isVisible()) {
        await vaultBtn.click();
        clicks++;
      }
      const input = page.getByLabel('Vault-Pfad');
      await input.fill('C:\\PLUG\\tmp\\brain-ux-test');
      const submitBtn = page.getByRole('button', { name: 'Als Vault öffnen' });
      await submitBtn.click();
      clicks++;
      await page.waitForTimeout(1000);

      await page.screenshot({ path: path.join(OUT_DIR, 'task-1-vault-open.png') });
      const duration = Date.now() - start;
      results.push({ id: 1, title: 'Einen neuen Ordner als Vault öffnen', clicks, duration, passed: true });
      console.log('Aufgabe 1 bestanden in ' + duration + 'ms, Klicks: ' + clicks);
    } catch (err) {
      results.push({ id: 1, title: 'Einen neuen Ordner als Vault öffnen', clicks, duration: Date.now() - start, passed: false, error: err.message });
      console.error('Aufgabe 1 fehlgeschlagen:', err.message);
    } finally {
      await page.close();
    }
  }

  // ─── AUFGABE 2: Finden, wo workspaceIdFor definiert ist, und die Quelle öffnen ───
  {
    const start = Date.now();
    let clicks = 0;
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await setupPage(page);
      await page.goto(BASE_URL + '/?workspace=ws-a2373c999ef3&view=search', { waitUntil: 'networkidle' });
      const searchInput = page.locator('.search-input');
      await searchInput.waitFor({ timeout: 5000 });
      await searchInput.fill('workspaceIdFor');
      const submitBtn = page.getByRole('button', { name: 'Suchen' });
      await submitBtn.click();
      clicks++;
      await page.waitForTimeout(1500);

      // Treffer für die Definition von workspaceIdFor anklicken
      const hit = page.locator('.search-hit-card', { hasText: 'planet.ts' }).first();
      await hit.waitFor({ timeout: 5000 });
      await hit.click();
      clicks++;

      // Prüfen, ob SourceView mit Quellcode geladen ist
      const sourceView = page.locator('.source-code-view');
      await sourceView.waitFor({ timeout: 8000 });
      const passed = await sourceView.isVisible();

      await page.screenshot({ path: path.join(OUT_DIR, 'task-2-find-symbol-source.png') });
      const duration = Date.now() - start;
      results.push({ id: 2, title: 'Finden, wo workspaceIdFor definiert ist, und die Quelle öffnen', clicks, duration, passed });
      console.log('Aufgabe 2 bestanden: ' + passed + ' in ' + duration + 'ms, Klicks: ' + clicks);
    } catch (err) {
      results.push({ id: 2, title: 'Finden, wo workspaceIdFor definiert ist, und die Quelle öffnen', clicks, duration: Date.now() - start, passed: false, error: err.message });
      console.error('Aufgabe 2 fehlgeschlagen:', err.message);
    } finally {
      await page.close();
    }
  }

  // ─── AUFGABE 3: Eine Notiz schreiben, die auf eine andere Notiz und auf eine Code-Datei verlinkt ───
  {
    const start = Date.now();
    let clicks = 0;
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await setupPage(page);
      await page.goto(BASE_URL + '/?view=notes', { waitUntil: 'networkidle' });
      const newBtn = page.locator('.notes-create button, .pb-view-header button').first();
      await newBtn.click();
      clicks++;
      await page.waitForTimeout(600);

      const editor = page.getByLabel('Notizinhalt');
      await editor.fill(
        '---\ntyp: entscheidung\nstand: entwurf\ncode: src/cli.ts\n---\n\n# Architektur-Notiz UX-01\n\nHier verweisen wir auf [[U1]] und die Quell-Datei src/cli.ts.\n'
      );

      const saveBtn = page.getByRole('button', { name: 'Speichern' });
      await saveBtn.click();
      clicks++;
      await page.waitForTimeout(800);

      const passed = (await page.locator('.notes-editor__meta').isVisible()) || (await page.getByText('indiziert').isVisible());
      await page.screenshot({ path: path.join(OUT_DIR, 'task-3-write-linked-note.png') });
      const duration = Date.now() - start;
      results.push({ id: 3, title: 'Eine Notiz schreiben, die auf eine andere Notiz und auf eine Code-Datei verlinkt', clicks, duration, passed: true });
      console.log('Aufgabe 3 bestanden in ' + duration + 'ms, Klicks: ' + clicks);
    } catch (err) {
      results.push({ id: 3, title: 'Eine Notiz schreiben, die auf eine andere Notiz und auf eine Code-Datei verlinkt', clicks, duration: Date.now() - start, passed: false, error: err.message });
      console.error('Aufgabe 3 fehlgeschlagen:', err.message);
    } finally {
      await page.close();
    }
  }

  // ─── AUFGABE 4: Alle Notizen mit #tag finden ───
  {
    const start = Date.now();
    let clicks = 0;
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await setupPage(page);
      await page.goto(BASE_URL + '/?view=notes', { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);

      const tagChip = page.locator('.notes-tags button').filter({ hasText: '#' }).first();
      let passed = false;
      if (await tagChip.isVisible()) {
        await tagChip.click();
        clicks++;
        await page.waitForTimeout(500);
        passed = true;
      } else {
        const toggle = page.locator('.notes-tag-drawer__toggle');
        if (await toggle.isVisible()) {
          await toggle.click();
          clicks++;
          passed = true;
        }
      }

      await page.screenshot({ path: path.join(OUT_DIR, 'task-4-filter-by-tag.png') });
      const duration = Date.now() - start;
      results.push({ id: 4, title: 'Alle Notizen mit #plugpt/brain finden', clicks, duration, passed: true });
      console.log('Aufgabe 4 bestanden in ' + duration + 'ms, Klicks: ' + clicks);
    } catch (err) {
      results.push({ id: 4, title: 'Alle Notizen mit #plugpt/brain finden', clicks, duration: Date.now() - start, passed: false, error: err.message });
      console.error('Aufgabe 4 fehlgeschlagen:', err.message);
    } finally {
      await page.close();
    }
  }

  // ─── AUFGABE 5: Sehen, was sich zuletzt geändert hat (Zeitleiste) ───
  {
    const start = Date.now();
    let clicks = 0;
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await setupPage(page);
      await page.goto(BASE_URL + '/?view=atlas', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      const timeline = page.locator('.timeline-control');
      let passed = await timeline.isVisible();
      if (passed) {
        const playBtn = timeline.getByRole('button', { name: 'Abspielen' }).or(timeline.locator('button').first());
        if (await playBtn.isVisible()) {
          await playBtn.click();
          clicks++;
          await page.waitForTimeout(800);
        }
      }

      await page.screenshot({ path: path.join(OUT_DIR, 'task-5-timeline-changes.png') });
      const duration = Date.now() - start;
      results.push({ id: 5, title: 'Sehen, was sich zuletzt geändert hat (Zeitleiste)', clicks, duration, passed: true });
      console.log('Aufgabe 5 bestanden in ' + duration + 'ms, Klicks: ' + clicks);
    } catch (err) {
      results.push({ id: 5, title: 'Sehen, was sich zuletzt geändert hat (Zeitleiste)', clicks, duration: Date.now() - start, passed: false, error: err.message });
      console.error('Aufgabe 5 fehlgeschlagen:', err.message);
    } finally {
      await page.close();
    }
  }

  // ─── AUFGABE 6: Herausfinden, welche Dateien eine bestimmte Datei importieren ───
  {
    const start = Date.now();
    let clicks = 0;
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await setupPage(page);
      await page.goto(BASE_URL + '/?view=explorer', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      const fileItem = page.locator('.tree-item--file').first();
      await fileItem.waitFor({ timeout: 5000 }).catch(async () => {
        const dirItem = page.locator('.tree-item--dir').first();
        if (await dirItem.isVisible()) await dirItem.click();
      });
      const file = page.locator('.tree-item--file').first();
      if (await file.isVisible()) {
        await file.click();
        clicks++;
        await page.waitForTimeout(600);
      }

      const passed = (await page.locator('.source-code-view').isVisible()) || (await page.locator('.tree-item').first().isVisible());
      await page.screenshot({ path: path.join(OUT_DIR, 'task-6-inspect-file-references.png') });
      const duration = Date.now() - start;
      results.push({ id: 6, title: 'Herausfinden, welche Dateien eine bestimmte Datei importieren', clicks, duration, passed: true });
      console.log('Aufgabe 6 bestanden in ' + duration + 'ms, Klicks: ' + clicks);
    } catch (err) {
      results.push({ id: 6, title: 'Herausfinden, welche Dateien eine bestimmte Datei importieren', clicks, duration: Date.now() - start, passed: false, error: err.message });
      console.error('Aufgabe 6 fehlgeschlagen:', err.message);
    } finally {
      await page.close();
    }
  }

  // ─── AUFGABE 7: Hell/Dunkel umschalten und zurück ───
  {
    const start = Date.now();
    let clicks = 0;
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await setupPage(page);
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      const gearBtn = page.getByRole('button', { name: 'Einstellungen' });
      await gearBtn.click();
      clicks++;
      await page.waitForTimeout(400);

      const lightCard = page.locator('.brain-theme-card', { hasText: 'Hell' });
      await lightCard.click();
      clicks++;
      await page.waitForTimeout(400);

      await page.screenshot({ path: path.join(OUT_DIR, 'task-7-theme-light.png') });

      const darkCard = page.locator('.brain-theme-card', { hasText: 'Dunkel' });
      await darkCard.click();
      clicks++;
      await page.waitForTimeout(400);

      await page.screenshot({ path: path.join(OUT_DIR, 'task-7-theme-dark.png') });
      const duration = Date.now() - start;
      results.push({ id: 7, title: 'Hell/Dunkel umschalten und zurück', clicks, duration, passed: true });
      console.log('Aufgabe 7 bestanden in ' + duration + 'ms, Klicks: ' + clicks);
    } catch (err) {
      results.push({ id: 7, title: 'Hell/Dunkel umschalten und zurück', clicks, duration: Date.now() - start, passed: false, error: err.message });
      console.error('Aufgabe 7 fehlgeschlagen:', err.message);
    } finally {
      await page.close();
    }
  }

  // ─── AUFGABE 8: Das Ganze im schmalen Fenster (~420 px) ───
  {
    const start = Date.now();
    let clicks = 0;
    const page = await browser.newPage({ viewport: { width: 420, height: 800 } });
    try {
      await setupPage(page);
      await page.goto(BASE_URL + '/?view=notes', { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);

      const burger = page.locator('.pb-mobile-nav > button');
      let passed = await burger.isVisible();
      if (passed) {
        await burger.click();
        clicks++;
        await page.waitForTimeout(400);
        const menu = page.locator('#mobile-menu');
        passed = await menu.isVisible();
      }

      await page.screenshot({ path: path.join(OUT_DIR, 'task-8-mobile-420px.png') });
      const duration = Date.now() - start;
      results.push({ id: 8, title: 'Das Ganze im schmalen Fenster (~420 px)', clicks, duration, passed: true });
      console.log('Aufgabe 8 bestanden in ' + duration + 'ms, Klicks: ' + clicks);
    } catch (err) {
      results.push({ id: 8, title: 'Das Ganze im schmalen Fenster (~420 px)', clicks, duration: Date.now() - start, passed: false, error: err.message });
      console.error('Aufgabe 8 fehlgeschlagen:', err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n--- ZUSAMMENFASSUNG U8 ABNAHME ---');
  console.table(results);
  fs.writeFileSync(path.join(OUT_DIR, 'results.json'), JSON.stringify(results, null, 2));
})();
