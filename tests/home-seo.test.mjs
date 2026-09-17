// Test the actual production HTML, not only the source metadata configuration.
// Run after: npm run build -- --webpack
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const origin = 'https://www.neogen.org.tw';
const html = readFileSync(new URL('../.next/server/app/index.html', import.meta.url), 'utf8');
const tags = name => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])));
const meta = tags('meta');
const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];

test('homepage has one title, description, canonical and Chinese language declaration', () => {
  assert.equal((html.match(/<title>/g) ?? []).length, 1);
  assert.match(html, /<title>臺灣新文化青年協會｜以青年之聲，寫臺灣新章<\/title>/);
  assert.match(html, /<html lang="zh-Hant-TW"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  const descriptions = meta.filter(tag => tag.name === 'description');
  assert.equal(descriptions.length, 1);
  assert.match(descriptions[0].content, /學生及社會青年/);
  assert.deepEqual(tags('link').filter(tag => tag.rel === 'canonical').map(tag => new URL(tag.href).href), [`${origin}/`]);
});

test('homepage sharing images and URLs use the primary host, not the event image', () => {
  assert.equal(new URL(meta.find(tag => tag.property === 'og:url').content).href, `${origin}/`);
  for (const key of ['og:image', 'twitter:image']) {
    const url = new URL(meta.find(tag => tag.property === key || tag.name === key).content);
    assert.equal(url.origin, origin);
    assert.equal(url.pathname, '/opengraph-image');
  }
  assert.equal(meta.find(tag => tag.name === 'twitter:card').content, 'summary_large_image');
});

test('association structured data includes the supplied legal identity and real logo', () => {
  const organization = graph.find(node => node['@type'] === 'Organization');
  assert.equal(organization.legalName, '社團法人臺灣新文化青年協會');
  assert.equal(organization.email, 'neogentaiwan2026@gmail.com');
  assert.equal(organization.identifier.find(item => item.name === '統一編號').value, '61490573');
  const logo = organization.logo;
  assert.equal(logo['@type'], 'ImageObject');
  const url = new URL(logo.url);
  assert.equal(url.origin, origin);
  const image = readFileSync(new URL(`../public${url.pathname}`, import.meta.url));
  assert.equal(image.readUInt32BE(16), logo.width);
  assert.equal(image.readUInt32BE(20), logo.height);
});

test('homepage WebPage links to the website, association and crawlable sections', () => {
  const website = graph.find(node => node['@type'] === 'WebSite');
  const page = graph.find(node => node['@type'] === 'WebPage');
  assert.equal(page.url, `${origin}/`);
  assert.equal(page.isPartOf['@id'], website['@id']);
  assert.equal(page.about['@id'], graph.find(node => node['@type'] === 'Organization')['@id']);
  assert.equal(page.description, meta.find(tag => tag.name === 'description').content);
  assert.ok(existsSync(new URL(`../public${new URL(page.primaryImageOfPage.url).pathname}`, import.meta.url)));
  for (const section of page.hasPart) {
    const url = new URL(section.url);
    if (url.hash) assert.ok(html.includes(`id="${url.hash.slice(1)}"`));
    else assert.ok(tags('a').some(tag => tag.href === url.pathname));
  }
  const hero = tags('img').find(tag => tag.alt === page.primaryImageOfPage.caption);
  assert.equal(hero.fetchPriority ?? hero.fetchpriority, 'high');
});
