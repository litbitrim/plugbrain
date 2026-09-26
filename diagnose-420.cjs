const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true })
    .catch(() => chromium.launch({ channel: 'chrome', headless: true }));
  const context = await browser.newContext({ viewport: { width: 420, height: 800 } });
  const page = await context.newPage();

  // Auth setup
  await page.addInitScript(() => {
    localStorage.setItem('plugbrain.auth_token', 'plug-c11345ec2f744d898c44f4edaca9aae6');
    localStorage.setItem('plugbrain.agent_id', 'agy');
  });

  const views = ['notes', 'atlas', 'explorer', 'search', 'packs', 'queue', 'mesh', 'city', 'settings'];

  for (const v of views) {
    const url = `http://127.0.0.1:5299/?view=${v}&workspace=ws-a2373c999ef3`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const metrics = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const bodyW = document.body.scrollWidth;

      // Find overflowing elements
      const overflowing = [];
      const all = document.querySelectorAll('*');
      for (const el of all) {
        const rect = el.getBoundingClientRect();
        if (rect.right > winW + 1 || el.scrollWidth > winW + 1) {
          overflowing.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className || '').toString().slice(0, 50),
            rectRight: Math.round(rect.right),
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
          });
        }
      }
      return { docW, winW, bodyW, overflowCount: overflowing.length, topOverflows: overflowing.slice(0, 10) };
    });

    console.log(`\n=== View: ${v} ===`);
    console.log(`scrollWidth: ${metrics.docW}, innerWidth: ${metrics.winW}, bodyScrollWidth: ${metrics.bodyW}`);
    if (metrics.docW > metrics.winW) {
      console.log(`OVERFLOW! Overflowing elements:`, metrics.topOverflows);
    } else {
      console.log(`OK! No horizontal scroll.`);
    }
  }

  await browser.close();
})();
