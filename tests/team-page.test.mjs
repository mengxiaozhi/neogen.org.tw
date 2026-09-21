// Test the production HTML emitted for the standalone association team page.
// Run after: npm run build -- --webpack
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const origin = 'https://www.neogen.org.tw';
const html = readFileSync(new URL('../.next/server/app/team.html', import.meta.url), 'utf8');
const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/g, '');
const tags = name => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])));
const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];

test('team page has distinct metadata, canonical URL and one primary heading', () => {
  assert.match(html, /<title>協會團隊｜臺灣新文化青年協會<\/title>/);
  assert.deepEqual(tags('link').filter(tag => tag.rel === 'canonical').map(tag => tag.href), [`${origin}/team`]);
  const meta = tags('meta');
  assert.equal(meta.find(tag => tag.property === 'og:url')?.content, `${origin}/team`);
  assert.match(meta.find(tag => tag.name === 'description')?.content ?? '', /理事長.*秘書處/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});

test('all supplied members and organizational groups are visible without JavaScript', () => {
  const memberNames = [
    '陳庭楚', '吳憶祖', '江珮綺', '莊智程', '呂佳倪', '廖冠霆',
    '尤偉哲', '許程富', '林妤蕎', '鄧述維', '陳柏睿', '吳梓瑜',
    '李家緯', '劉訊志', '陳冠聿', '劉曉陽',
  ];

  for (const name of memberNames) assert.ok(visibleHtml.includes(name), `${name} should be rendered`);
  for (const heading of ['理事長與副理事長', '理事成員', '監事成員', '秘書處']) {
    assert.ok(visibleHtml.includes(heading), `${heading} should be rendered`);
  }
  assert.doesNotMatch(visibleHtml, /協會由理監事會與秘書處共同推動運作/);
});

test('supplied portraits are rendered by Next Image for the matching members', () => {
  const portraits = tags('img')
    .map(tag => tag['data-member-portrait'])
    .filter(Boolean);

  assert.deepEqual(portraits.toSorted(), ['劉訊志', '陳庭楚'].toSorted());
  assert.equal(portraits.length, 2);
});

test('team JSON-LD exposes the page relationship and a 16-person roster', () => {
  const page = graph.find(node => node['@type'] === 'WebPage');
  const roster = graph.find(node => node['@type'] === 'ItemList');
  assert.equal(page.url, `${origin}/team`);
  assert.equal(page.mainEntity['@id'], roster['@id']);
  assert.equal(roster.numberOfItems, 16);
  assert.equal(roster.itemListElement.length, 16);
  assert.ok(roster.itemListElement.every(entry => entry.item['@type'] === 'Person' && entry.item.jobTitle));
});

test('team page is linked from the homepage and included in the sitemap', () => {
  const home = readFileSync(new URL('../.next/server/app/index.html', import.meta.url), 'utf8');
  const sitemap = readFileSync(new URL('../.next/server/app/sitemap.xml.body', import.meta.url), 'utf8');
  assert.match(home, /href="\/team"/);
  assert.match(sitemap, new RegExp(`<loc>${origin}/team</loc>`));
});
