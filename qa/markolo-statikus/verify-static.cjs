const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  try {
    for (const width of [390, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(process.env.QA_URL || 'http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const measure = () => page.evaluate(() => {
        const rect = selector => {
          const { x, y, width, height, right, bottom } = document.querySelector(selector).getBoundingClientRect();
          return { x, y, width, height, right, bottom };
        };
        const art = document.querySelector('.hero-excavator');
        const svg = art.querySelector('svg');
        const bucket = art.querySelector('[data-joint="bucket"]');
        return {
          viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
          count: document.querySelectorAll('.hero-excavator').length,
          hero: rect('.hero'), content: rect('.hero-content'), trust: rect('.hero-trust'),
          layer: rect('.hero-excavator'), bucket: rect('[data-joint="bucket"]'),
          position: getComputedStyle(art).position, pointerEvents: getComputedStyle(art).pointerEvents,
          mask: getComputedStyle(art).maskImage, filter: getComputedStyle(svg).filter,
          viewBox: svg.getAttribute('viewBox'), pose: bucket.getAttribute('transform'),
          animations: art.getAnimations({ subtree: true }).length,
          inHero: art.parentElement.matches('.hero'),
        };
      });
      const initial = await measure();
      assert.equal(initial.documentWidth, width, 'No horizontal overflow');
      assert.equal(initial.count, 1);
      assert.equal(initial.position, 'absolute');
      assert.equal(initial.pointerEvents, 'none');
      assert.equal(initial.mask, 'none');
      assert.equal(initial.filter, 'none');
      assert.equal(initial.animations, 0);
      assert.equal(initial.inHero, true);
      assert.ok(initial.bucket.x >= 0 && initial.bucket.right <= width, 'Full bucket fits viewport');
      assert.ok(initial.bucket.bottom <= initial.hero.bottom, 'Bucket fits hero');
      if (width < 1024) assert.ok(initial.bucket.y >= initial.trust.bottom, 'Mobile bucket follows ratings');
      else assert.ok(initial.bucket.x >= initial.content.right, 'Desktop bucket clears text column');
      await page.locator('.hero').screenshot({ path: path.join(__dirname, `${width}-hero.png`) });
      for (const [name, selector] of [['termekek', '.products'], ['kiszallitas', '.delivery']]) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.locator(selector).screenshot({ path: path.join(__dirname, `${width}-${name}.png`) });
        const after = await measure();
        assert.equal(after.pose, initial.pose, 'Scroll does not change pose');
        assert.equal(after.documentWidth, width);
      }
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.mouse.move(width / 2, 450);
      await page.mouse.wheel(0, 250);
      await page.waitForTimeout(200);
      const normal = await measure();
      assert.equal(normal.pose, initial.pose, 'Normal motion and pointer input leave static pose');
      assert.equal(normal.animations, 0);
      assert.deepEqual(errors, []);
      results.push({ width, ...initial, normalPose: normal.pose, errors });
      await page.close();
    }
    await fs.writeFile(path.join(__dirname, 'meresek.json'), JSON.stringify(results, null, 2));
    console.log('PASS: 390, 768, 1024, 1440 px; hero-only art, clear bucket/text, no overflow, no animation/mask, unchanged pose after scroll/pointer/reduced-motion.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
