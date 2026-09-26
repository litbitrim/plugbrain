const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const BASE_URL = 'http://127.0.0.1:5299';
const OUT_DIR = 'C:\\PLUG\\plugpt\\koordination\\closeout\\brain-standalone-20260926\\ux\\screens\\x0';
const U8_OUT_DIR = 'C:\\PLUG\\plugpt\\koordination\\closeout\\brain-standalone-20260926\\ux\\screens\\u8';
const TOKEN = 'plug-c11345ec2f744d898c44f4edaca9aae6';
const WS_ID = 'ws-a2373c999ef3';

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(U8_OUT_DIR, { recursive: true });
  console.log('Starte Verifizierung X0: 420px Anti-Overflow & Farben...');

  const browser = await chromium.launch({ channel: 'msedge', headless: true })
    .catch(() => chromium.launch({ channel: 'chrome', headless: true }));

  const setupPage = async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.evaluate(({ token }) => {
      localStorage.setItem('plugbrain.auth_token', token);
      localStorage.setItem('plugbrain.agent_id', 'agy');
    }, { token: TOKEN });
  };

  const views = [
    { id: 'notes', name: 'Notizen' },
    { id: 'atlas', name: 'Graph' },
    { id: 'explorer', name: 'Dateien' },
    { id: 'search', name: 'Suche' },
    { id: 'packs', name: 'Kontext-Pakete' },
    { id: 'queue', name: 'Aufgaben' },
    { id: 'mesh', name: 'Agenten-Netz' },
    { id: 'city', name: 'Code-Stadt' },
    { id: 'settings', name: 'Einstellungen' },
  ];

  let allPassed = true;
  const reports = [];

  for (const v of views) {
    const page = await browser.newPage({ viewport: { width: 420, height: 800 } });
    try {
      await setupPage(page);
      await page.goto(`${BASE_URL}/?view=${v.id}&workspace=${WS_ID}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);

      // In notes view: click first note to test stacked editor
      if (v.id === 'notes') {
        const firstNote = page.locator('.notes-item').first();
        if (await firstNote.isVisible()) {
          await firstNote.click();
          await page.waitForTimeout(400);
        }
      }

      // Check overflow
      const metrics = await page.evaluate(() => {
        return {
          docScrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          innerWidth: window.innerWidth,
          appScrollWidth: document.querySelector('.pb-app')?.scrollWidth || 0,
        };
      });

      const hasOverflow = metrics.docScrollWidth > metrics.innerWidth || metrics.bodyScrollWidth > metrics.innerWidth;
      const passed = !hasOverflow;
      if (!passed) allPassed = false;

      const screenPath = path.join(OUT_DIR, `view-${v.id}-420px.png`);
      await page.screenshot({ path: screenPath });

      reports.push({
        view: v.id,
        name: v.name,
        innerWidth: metrics.innerWidth,
        docScrollWidth: metrics.docScrollWidth,
        bodyScrollWidth: metrics.bodyScrollWidth,
        passed,
      });

      console.log(`[${passed ? 'PASS' : 'FAIL'}] View ${v.id}: innerWidth=${metrics.innerWidth}, docScrollWidth=${metrics.docScrollWidth}, bodyScrollWidth=${metrics.bodyScrollWidth}`);
    } catch (err) {
      allPassed = false;
      console.error(`Fehler bei View ${v.id}:`, err.message);
      reports.push({ view: v.id, passed: false, error: err.message });
    } finally {
      await page.close();
    }
  }

  // Check Quellansicht Fokus Badge Colors
  console.log('\nPrüfe Quellansicht Fokus Badge Styles...');
  const testPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await setupPage(testPage);
    await testPage.goto(`${BASE_URL}/?view=search&workspace=${WS_ID}`, { waitUntil: 'networkidle' });
    const searchInput = testPage.locator('.search-input');
    await searchInput.fill('workspaceIdFor');
    await testPage.waitForTimeout(400);
    const hit = testPage.locator('.search-hit').first();
    if (await hit.isVisible()) {
      await hit.click();
      await testPage.waitForTimeout(500);
      const badgeStyle = await testPage.evaluate(() => {
        const badge = document.querySelector('.source-badge--highlight');
        if (!badge) return null;
        const comp = window.getComputedStyle(badge);
        return {
          color: comp.color,
          backgroundColor: comp.backgroundColor,
          border: comp.border,
        };
      });
      console.log('Fokus-Badge computed styles:', badgeStyle);
    }
  } catch (err) {
    console.error('Fehler bei Badge-Prüfung:', err.message);
  } finally {
    await testPage.close();
  }

  // AUFGABE 8 ehrlich neu abnehmen:
  console.log('\nNehme Aufgabe 8 ehrlich neu ab (420px mit Burger-Menü)...');
  const u8Page = await browser.newPage({ viewport: { width: 420, height: 800 } });
  try {
    await setupPage(u8Page);
    await u8Page.goto(`${BASE_URL}/?view=notes&workspace=${WS_ID}`, { waitUntil: 'networkidle' });
    await u8Page.waitForTimeout(600);

    // Klick erste Notiz
    const firstNote = u8Page.locator('.notes-item').first();
    if (await firstNote.isVisible()) {
      await firstNote.click();
      await u8Page.waitForTimeout(400);
    }

    // Burger öffnen
    let clicks = 1;
    const burger = u8Page.locator('.pb-mobile-nav > button');
    let burgerVisible = await burger.isVisible();
    if (burgerVisible) {
      await burger.click();
      clicks++;
      await u8Page.waitForTimeout(400);
    }

    const u8Metrics = await u8Page.evaluate(() => {
      return {
        docScrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        bodyScrollWidth: document.body.scrollWidth,
      };
    });

    const u8Passed = u8Metrics.docScrollWidth <= u8Metrics.innerWidth && u8Metrics.bodyScrollWidth <= u8Metrics.innerWidth;
    console.log(`Aufgabe 8 Ergebnis: ${u8Passed ? 'BESTANDEN' : 'NICHT BESTANDEN'}, docScrollWidth=${u8Metrics.docScrollWidth}, innerWidth=${u8Metrics.innerWidth}`);

    await u8Page.screenshot({ path: path.join(U8_OUT_DIR, 'task-8-mobile-420px.png') });
    await u8Page.screenshot({ path: path.join(OUT_DIR, 'task-8-mobile-retest.png') });

    // Update results.json in u8
    const u8ResultsPath = path.join(U8_OUT_DIR, 'results.json');
    if (fs.existsSync(u8ResultsPath)) {
      const list = JSON.parse(fs.readFileSync(u8ResultsPath, 'utf8'));
      const t8 = list.find(t => t.id === 8);
      if (t8) {
        t8.passed = u8Passed;
        t8.clicks = clicks;
        fs.writeFileSync(u8ResultsPath, JSON.stringify(list, null, 2), 'utf8');
      }
    }
  } catch (err) {
    console.error('Fehler bei Aufgabe 8:', err.message);
  } finally {
    await u8Page.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(OUT_DIR, 'reports.json'), JSON.stringify(reports, null, 2), 'utf8');
  console.log('\nX0 Verifizierung abgeschlossen. Gesamt-Ergebnis:', allPassed ? 'ALLE BESTANDEN' : 'EINIGE FEHLGESCHLAGEN');
})();
