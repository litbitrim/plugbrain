const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const BASE_URL = 'http://127.0.0.1:5299';
const OUT_DIR = 'C:\\PLUG\\plugpt\\koordination\\closeout\\brain-standalone-20260926\\ux\\screens';

const SIZES = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '800x600', width: 800, height: 600 },
  { name: '420x800', width: 420, height: 800 },
];

const TARGETS = [
  { milestone: 'u6', view: 'packs', label: 'packs-inspector' },
  { milestone: 'u6', view: 'queue', label: 'queue-tasks' },
  { milestone: 'u6', view: 'mesh', label: 'mesh-trace' },
  { milestone: 'u6', view: 'city', label: 'city-3d' },
];

(async () => {
  console.log('Starte Screenshot-Erfassung...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
    .catch(() => chromium.launch({ channel: 'chrome', headless: true }));

  for (const target of TARGETS) {
    const dir = path.join(OUT_DIR, target.milestone);
    fs.mkdirSync(dir, { recursive: true });

    for (const size of SIZES) {
      const page = await browser.newPage({
        viewport: { width: size.width, height: size.height },
      });

      const url = target.view ? `${BASE_URL}/?view=${target.view}` : BASE_URL;
      console.log(`Lade ${url} (${size.name})...`);
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
        await page.waitForTimeout(1000); // UI rendern lassen

        const outFile = path.join(dir, `${target.label}_${size.name}.png`);
        await page.screenshot({ path: outFile, fullPage: false });
        console.log(`Gespeichert: ${outFile}`);
      } catch (err) {
        console.error(`Fehler bei ${target.label} ${size.name}:`, err.message);
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();
  console.log('Alle Screenshots erfolgreich erstellt!');
})();
