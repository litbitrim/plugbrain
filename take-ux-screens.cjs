const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const BASE_URL = 'http://127.0.0.1:5299';
const OUT_DIR = 'C:\\PLUG\\plugpt\\koordination\\closeout\\brain-standalone-20260926\\ux\\screens\\u7';

const SIZES = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '800x600', width: 800, height: 600 },
  { name: '420x800', width: 420, height: 800 },
];

(async () => {
  console.log('Starte Screenshot-Erfassung für U7...');
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ channel: 'msedge', headless: true })
    .catch(() => chromium.launch({ channel: 'chrome', headless: true }));

  for (const size of SIZES) {
    const page = await browser.newPage({
      viewport: { width: size.width, height: size.height },
    });

    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(1000);

      // 1. Topbar with Repos & Settings icon
      const topbarFile = path.join(OUT_DIR, `topbar-controls_${size.name}.png`);
      await page.screenshot({ path: topbarFile });
      console.log(`Gespeichert: ${topbarFile}`);

      // 2. Open Settings modal (Appearance tab by default)
      const gearBtn = page.getByRole('button', { name: 'Einstellungen' });
      if (await gearBtn.isVisible()) {
        await gearBtn.click();
        await page.waitForTimeout(500);

        const appearFile = path.join(OUT_DIR, `settings-appearance_${size.name}.png`);
        await page.screenshot({ path: appearFile });
        console.log(`Gespeichert: ${appearFile}`);

        // 3. Switch to Repos tab
        const reposTab = page.getByLabel('Einstellungskategorien').getByRole('button', { name: 'Repos wählen' });
        if (await reposTab.isVisible()) {
          await reposTab.click();
          await page.waitForTimeout(500);
          const reposFile = path.join(OUT_DIR, `settings-repos_${size.name}.png`);
          await page.screenshot({ path: reposFile });
          console.log(`Gespeichert: ${reposFile}`);
        }

        // 4. Switch to Advanced tab
        const advTab = page.getByRole('button', { name: 'Erweitert' });
        if (await advTab.isVisible()) {
          await advTab.click();
          await page.waitForTimeout(500);
          const advFile = path.join(OUT_DIR, `settings-advanced_${size.name}.png`);
          await page.screenshot({ path: advFile });
          console.log(`Gespeichert: ${advFile}`);
        }

        // 5. Test theme switch: switch to light theme
        const appTab = page.getByLabel('Einstellungskategorien').getByRole('button', { name: 'Erscheinungsbild' });
        if (await appTab.isVisible()) {
          await appTab.click();
          await page.waitForTimeout(300);
          const lightBtn = page.locator('.brain-theme-card', { hasText: 'Hell' });
          if (await lightBtn.isVisible()) {
            await lightBtn.click();
            await page.waitForTimeout(500);
            const lightFile = path.join(OUT_DIR, `settings-theme-light_${size.name}.png`);
            await page.screenshot({ path: lightFile });
            console.log(`Gespeichert: ${lightFile}`);
            // Switch back to dark
            const darkBtn = page.locator('.brain-theme-card', { hasText: 'Dunkel' });
            if (await darkBtn.isVisible()) await darkBtn.click();
          }
        }
      }
    } catch (err) {
      console.error(`Fehler bei ${size.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Alle U7-Screenshots erfolgreich erstellt!');
})();
