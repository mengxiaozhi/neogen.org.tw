// Verify the generated public sitemap and robots output after a production build.
// Run after: npm run build -- --webpack
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const origin = 'https://www.neogen.org.tw';
const output = path => readFileSync(new URL(`../.next/server/app/${path}`, import.meta.url), 'utf8');
const sitemap = output('sitemap.xml.body');
const robots = output('robots.txt.body');
const appPaths = JSON.parse(readFileSync(new URL('../.next/server/app-paths-manifest.json', import.meta.url), 'utf8'));
const publicPagePaths = Object.keys(appPaths)
  .filter(path => path.endsWith('/page') && !path.startsWith('/_'))
  .map(path => path.replace(/\/page$/, '') || '/')
  .toSorted();
const urlBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => block);
const locations = urlBlocks.map(block => block.match(/<loc>([^<]+)<\/loc>/)?.[1]);

test('sitemap contains every canonical public page exactly once', () => {
  assert.deepEqual(locations.map(location => new URL(location).pathname).toSorted(), publicPagePaths);
  assert.equal(new Set(locations).size, locations.length);
  assert.doesNotMatch(sitemap, /<loc>[^<]*\/(?:api|_next)\//);

  for (const path of publicPagePaths) {
    const artifact = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
    const html = output(artifact);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    assert.equal(new URL(canonical).href, new URL(path, `${origin}/`).href, path);
  }
});

test('sitemap uses valid dates and same-origin absolute image URLs', () => {
  for (const block of urlBlocks) {
    const lastModified = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (lastModified) assert.match(lastModified, /^\d{4}-\d{2}-\d{2}$/);

    for (const [, image] of block.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) {
      assert.equal(new URL(image).origin, origin);
    }
  }

  const report = urlBlocks.find(block => block.includes(`<loc>${origin}/2027/report</loc>`));
  assert.ok(report);
  assert.doesNotMatch(report, /<lastmod>/, 'do not invent an update date for live report data');
});

test('robots advertises the sitemap and keeps API routes out of crawl', () => {
  assert.match(robots, /User-Agent: \*/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Disallow: \/api\//);
  assert.match(robots, new RegExp(`Sitemap: ${origin}/sitemap\\.xml`));
  assert.match(robots, new RegExp(`Host: ${origin}`));
});
