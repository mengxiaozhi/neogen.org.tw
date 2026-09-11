// Verify rendered output, including Next.js metadata inheritance and file-based OG images.
// Run after: npm run build -- --webpack
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const origin = 'https://www.neogen.org.tw';
const pages = ['/2027', '/2027/program', '/2027/report'];
const output = path => readFileSync(new URL(`../.next/server/app/${path}`, import.meta.url), 'utf8');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) => attributes(tag));
const documents = pages.map(path => ({ path, html: output(`${path.slice(1)}.html`) }));

for (const { path, html } of documents) {
  test(`${path}: canonical and share URLs use the live primary host`, () => {
    assert.deepEqual(tags(html, 'link').filter(tag => tag.rel === 'canonical').map(tag => tag.href), [`${origin}${path}`]);
    const meta = tags(html, 'meta');
    assert.equal(meta.find(tag => tag.property === 'og:url')?.content, `${origin}${path}`);
    assert.match(meta.find(tag => tag.name === 'description')?.content ?? '', /2027.*青年參議院/);
    for (const key of ['og:image', 'twitter:image']) {
      const url = meta.find(tag => tag.property === key || tag.name === key)?.content;
      assert.ok(url, `${key} is present`);
      assert.equal(new URL(url).origin, origin);
      assert.equal(new URL(url).pathname, '/2027/opengraph-image');
    }
    assert.doesNotMatch(meta.find(tag => tag.name === 'robots')?.content ?? '', /noindex/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  });

  test(`${path}: JSON-LD describes the same page and real section anchors`, () => {
    const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, value]) => JSON.parse(value));
    assert.equal(graphs.length, 1);
    const graph = graphs[0]['@graph'];
    const page = graph.find(node => node['@type'] === 'WebPage');
    assert.equal(page.url, `${origin}${path}`);
    assert.equal(page['@id'], `${page.url}#webpage`);
    assert.equal(page.inLanguage, 'zh-Hant-TW');
    const breadcrumb = graph.find(node => node['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumb['@id'], page.breadcrumb['@id']);
    assert.equal(breadcrumb.itemListElement.at(-1).item, page.url);
    assert.equal(breadcrumb.itemListElement[0].item, `${origin}/`);
    for (const section of page.hasPart.filter(node => node['@type'] === 'WebPageElement')) {
      assert.ok(html.includes(`id="${new URL(section.url).hash.slice(1)}"`), section.url);
    }
    // Venue and ticket availability are not yet confirmed.
    assert.ok(graph.every(node => !['Event', 'Offer'].includes(node['@type'])));
  });
}

test('each event page has a distinct concise title and description', () => {
  const titles = documents.map(({ html }) => html.match(/<title>([^<]+)<\/title>/)?.[1]);
  assert.equal(new Set(titles).size, 3);
  assert.ok(titles.every(title => title && title.length < 65));
  assert.match(titles[0], /活動理念/);
  assert.match(titles[1], /報名費用與三天流程/);
  const descriptions = documents.map(({ html }) => tags(html, 'meta').find(tag => tag.name === 'description')?.content);
  assert.equal(new Set(descriptions).size, 3);
});

test('sitemap, robots and association homepage agree on the primary host', () => {
  const sitemap = output('sitemap.xml.body');
  const robots = output('robots.txt.body');
  for (const path of pages) assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`));
  assert.ok(sitemap.includes('<lastmod>2026-09-11</lastmod>'));
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.ok(robots.includes('Disallow: /api/'));
  for (const text of [sitemap, robots, ...documents.map(page => page.html)]) assert.doesNotMatch(text, /https:\/\/neogen\.org\.tw/);
  assert.deepEqual(tags(output('index.html'), 'link').filter(tag => tag.rel === 'canonical').map(tag => new URL(tag.href).href), [`${origin}/`]);
});
