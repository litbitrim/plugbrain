const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const BASE_URL = 'http://127.0.0.1:5299';
const OUT_DIR = 'C:\\PLUG\\plugpt\\koordination\\closeout\\brain-standalone-20260926\\ux\\screens\\ux02\\x1';
const TOKEN = 'plug-c11345ec2f744d898c44f4edaca9aae6';
const WS_ID = 'ws-a2373c999ef3';

const BRIEFING_FIXTURE = {
  workspace: WS_ID,
  name: 'PlugPT Workspace',
  summary: 'PlugPT ist eine modulare Entwicklungs- und Wissensplattform mit nativem Agenten-Schwarm und persistentem Wissensgraphen.',
  stats: {
    repos: 4,
    files: 19198,
    symbols: 395408,
    notes: 463,
    languages: [
      { name: 'TypeScript', files: 12000 },
      { name: 'Markdown', files: 4500 },
      { name: 'CSS', files: 2698 },
    ],
  },
  entrypoints: [
    { path: 'src/cli.ts', why: 'Zentraler Einstiegspunkt der CLI-Befehle' },
    { path: 'src/planet.ts', why: 'Workspace- und Planet-Auflösung' },
  ],
  recentChanges: [
    { path: 'src/planet.ts', when: '2026-09-26T01:40:00Z', kind: 'modified' },
    { path: 'ui/src/views/NotesView.tsx', when: '2026-09-26T01:15:00Z', kind: 'modified' },
  ],
  hotspots: [
    { path: 'src/home.ts', degree: 104 },
    { path: 'src/planet.ts', degree: 88 },
  ],
  unavailable: [],
};

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('Starte Verifizierung X1: Briefing-Startseite...');

  const browser = await chromium.launch({ channel: 'msedge', headless: true })
    .catch(() => chromium.launch({ channel: 'chrome', headless: true }));

  const setupPage = async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.evaluate(({ token }) => {
      localStorage.setItem('plugbrain.auth_token', token);
      localStorage.setItem('plugbrain.agent_id', 'agy');
    }, { token: TOKEN });
  };

  // 1. Reale Route ohne Fixture: Ehrlicher Leer-/Unavailable-Zustand
  console.log('1. Prüfe realen Kern ohne /api/briefing (ehrlicher Zustand)...');
  const realPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await setupPage(realPage);
    await realPage.goto(`${BASE_URL}/?view=briefing&workspace=${WS_ID}`, { waitUntil: 'networkidle' });
    await realPage.waitForTimeout(600);

    const isUnavailable = await realPage.locator('.briefing-card--unavailable').isVisible();
    console.log('Ehrlicher Zustand sichtbar:', isUnavailable);
    await realPage.screenshot({ path: path.join(OUT_DIR, 'briefing-real-unavailable-1440px.png') });
  } finally {
    await realPage.close();
  }

  // 2. Mit Vertrags-Fixture in allen drei Auflösungen
  const viewports = [
    { name: '1440px', width: 1440, height: 900 },
    { name: '800px', width: 800, height: 600 },
    { name: '420px', width: 420, height: 800 },
  ];

  for (const vp of viewports) {
    console.log(`2. Prüfe Briefing mit Fixture bei ${vp.name}...`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    try {
      // Mock /api/briefing
      await page.route('**/api/briefing*', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(BRIEFING_FIXTURE),
        });
      });

      await setupPage(page);
      await page.goto(`${BASE_URL}/?view=briefing&workspace=${WS_ID}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);

      const metrics = await page.evaluate(() => ({
        docScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth,
      }));

      const noOverflow = metrics.docScrollWidth <= metrics.innerWidth && metrics.bodyScrollWidth <= metrics.innerWidth;
      console.log(`[${noOverflow ? 'PASS' : 'FAIL'}] Briefing ${vp.name}: inner=${metrics.innerWidth}, docScroll=${metrics.docScrollWidth}`);

      await page.screenshot({ path: path.join(OUT_DIR, `briefing-fixture-${vp.name}.png`) });

      // Bei 1440px: Teste Klick auf Einstiegspunkt
      if (vp.width === 1440) {
        const link = page.locator('.briefing-link-btn', { hasText: 'src/cli.ts' }).first();
        if (await link.isVisible()) {
          await link.click();
          await page.waitForTimeout(500);
          const sourceOpen = await page.locator('.source-code-view').isVisible();
          console.log('Quellcode nach Klick auf Einstiegspunkt geöffnet:', sourceOpen);
          await page.screenshot({ path: path.join(OUT_DIR, 'briefing-entrypoint-source-opened.png') });
        }
      }
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('X1 Verifizierung erfolgreich abgeschlossen.');
})();
