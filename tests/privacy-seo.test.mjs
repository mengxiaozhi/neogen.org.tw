// Verify route-specific privacy metadata and structured data after a production build.
// Run after: npm run build -- --webpack
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const origin = 'https://www.neogen.org.tw';
const url = `${origin}/privacy`;
const html = readFileSync(new URL('../.next/server/app/privacy.html', import.meta.url), 'utf8');
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]));
const tags = name => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) => attributes(tag));
const meta = tags('meta');
const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];

test('privacy page has distinct canonical and share metadata', () => {
  assert.match(html, /<title>Cookie 與隱私說明｜臺灣新文化青年協會<\/title>/);
  assert.deepEqual(tags('link').filter(tag => tag.rel === 'canonical').map(tag => tag.href), [url]);
  assert.match(meta.find(tag => tag.name === 'description')?.content ?? '', /Google Analytics.*同意撤回/);
  assert.equal(meta.find(tag => tag.property === 'og:url')?.content, url);
  assert.match(meta.find(tag => tag.property === 'og:title')?.content ?? '', /Cookie 與隱私說明/);
  assert.match(meta.find(tag => tag.name === 'twitter:title')?.content ?? '', /Cookie 與隱私說明/);
  assert.equal(meta.find(tag => tag.name === 'twitter:card')?.content, 'summary_large_image');
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});

test('privacy JSON-LD identifies the page, publisher and breadcrumb', () => {
  const page = graph.find(node => node['@type'] === 'WebPage');
  const organization = graph.find(node => node['@type'] === 'Organization');
  const breadcrumb = graph.find(node => node['@type'] === 'BreadcrumbList');
  assert.equal(page.url, url);
  assert.equal(page['@id'], `${url}#webpage`);
  assert.equal(page.inLanguage, 'zh-Hant-TW');
  assert.equal(page.publisher['@id'], organization['@id']);
  assert.match(page.dateModified, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(breadcrumb.itemListElement.at(-1).item, url);
});

test('privacy page uses the main-site shell and exposes every policy section without JavaScript', () => {
  assert.match(html, /aria-label="主要導覽"/);
  assert.match(html, /aria-label="社群媒體"/);
  assert.match(html, /aria-label="頁尾導覽"/);
  assert.equal((html.match(/<h2\b/g) ?? []).length, 5);

  for (const id of ['choice', 'storage', 'processing', 'rights', 'contact']) {
    assert.match(html, new RegExp(`id="${id}"`));
    assert.match(html, new RegExp(`href="#${id}"`));
  }

  for (const content of ['Google Analytics', 'neogen:cookie-consent:v1', 'Google 地圖', '資料權利']) {
    assert.ok(html.includes(content), `${content} should remain readable in the initial HTML`);
  }
});
