// Verify the built page and share image, including Next.js metadata inheritance.
// Run after: npm run build -- --webpack
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const origin = 'https://www.neogen.org.tw';
const pageUrl = `${origin}/rainbow2026`;
const sharePath = '/rainbow2026/opengraph-image';
const output = path => readFileSync(new URL(`../.next/server/app/${path}`, import.meta.url), 'utf8');
const html = output('rainbow2026.html');
const home = output('index.html');
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|#39|#x[\da-f]+|#\d+);/gi, entity => {
  const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&#39;': "'" };
  if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
  return String.fromCodePoint(/^&#x/i.test(entity) ? parseInt(entity.slice(3, -1), 16) : parseInt(entity.slice(2, -1), 10));
});
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
const tags = (source, name) => [...source.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) => attributes(tag));
const meta = tags(html, 'meta');
const homeMeta = tags(home, 'meta');
const singleMeta = (key, source = meta) => {
  const matches = source.filter(tag => tag.property === key || tag.name === key);
  assert.equal(matches.length, 1, `${key} must appear exactly once`);
  return matches[0].content;
};
const readable = source => decode(source.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? '';
const visible = readable(main);
const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '');
const linkedData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, value]) => JSON.parse(value));
const graph = linkedData[0]?.['@graph'] ?? [];
const node = type => {
  const matches = graph.filter(item => item['@type'] === type);
  assert.equal(matches.length, 1, `${type} must appear exactly once in the page graph`);
  return matches[0];
};

test('rainbow page has one descriptive title, H1 and primary-host canonical', () => {
  assert.equal((html.match(/<title>/g) ?? []).length, 1);
  assert.match(title, /2026.*臺灣同志遊行/);
  assert.ok(title.includes('聲做伙聽，路做伙行'));
  assert.ok(title.includes('臺灣新文化青年協會'));
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  const heading = readable(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
  assert.match(heading, /2026.*第\s*24\s*屆臺灣同志遊行/);
  assert.match(html, /<html lang="zh-Hant-TW"/);
  assert.deepEqual(tags(html, 'link').filter(tag => tag.rel === 'canonical').map(tag => tag.href), [pageUrl]);
  assert.equal(singleMeta('og:url'), pageUrl);
  const description = singleMeta('description');
  assert.match(description, /2026.*10\s*月\s*31\s*日/);
  assert.ok(description.includes('聲做伙聽，路做伙行'));
  assert.ok(description.includes('臺灣新文化青年協會'));
  assert.match(visible, /2026 年 10 月 31 日/);
  assert.ok(visible.includes('Our Voices, Our Journey'));
  const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0] ?? '';
  assert.doesNotMatch(head, /https?:\/\/(?:localhost|127\.0\.0\.1)|https:\/\/[^/"\s]+\.vercel\.app|https:\/\/neogen\.org\.tw/);
});

test('rainbow social metadata uses its dedicated landscape image without inherited homepage artwork', () => {
  for (const key of ['og:image', 'twitter:image']) {
    const image = new URL(singleMeta(key));
    assert.equal(image.origin, origin);
    assert.equal(image.pathname, sharePath);
  }
  assert.equal(singleMeta('og:title'), title);
  assert.equal(singleMeta('twitter:title'), title);
  assert.equal(singleMeta('og:description'), singleMeta('description'));
  assert.equal(singleMeta('twitter:description'), singleMeta('description'));
  assert.equal(singleMeta('og:type'), 'website');
  assert.equal(singleMeta('og:locale'), 'zh_TW');
  assert.equal(singleMeta('og:site_name'), '臺灣新文化青年協會');
  assert.equal(singleMeta('twitter:card'), 'summary_large_image');
  assert.equal(singleMeta('og:image:width'), '1200');
  assert.equal(singleMeta('og:image:height'), '630');
  assert.equal(singleMeta('og:image:type'), 'image/png');
  const alt = singleMeta('og:image:alt');
  assert.match(alt, /同志遊行|彩虹/);
  assert.equal(singleMeta('twitter:image:alt'), alt);
  assert.notEqual(singleMeta('og:title'), singleMeta('og:title', homeMeta));
  assert.notEqual(singleMeta('og:description'), singleMeta('og:description', homeMeta));
  assert.notEqual(new URL(singleMeta('og:image')).pathname, new URL(singleMeta('og:image', homeMeta)).pathname);
});

test('rainbow indexing metadata follows the same build-environment policy as the homepage', () => {
  for (const key of ['robots', 'googlebot']) {
    const value = singleMeta(key);
    assert.equal(value, singleMeta(key, homeMeta));
    const directives = value.split(',').map(part => part.trim());
    assert.equal(directives.filter(part => ['index', 'noindex'].includes(part)).length, 1);
    assert.ok(directives.includes('follow'));
    assert.ok(!directives.includes('nofollow'));
  }
  assert.ok(singleMeta('googlebot').includes('max-image-preview:large'));
});

test('rainbow JSON-LD identifies the association as publisher and resolves its page relationships', () => {
  assert.equal(linkedData.length, 1);
  assert.equal(linkedData[0]['@context'], 'https://schema.org');
  assert.ok(Array.isArray(linkedData[0]['@graph']));
  const organization = node('Organization');
  const website = node('WebSite');
  const page = node('WebPage');
  assert.equal(organization.name, '臺灣新文化青年協會');
  assert.equal(organization.legalName, '社團法人臺灣新文化青年協會');
  assert.equal(organization.url, `${origin}/`);
  assert.equal(page.url, pageUrl);
  assert.equal(page['@id'], `${pageUrl}#webpage`);
  assert.equal(page.name, title);
  assert.equal(page.description, singleMeta('description'));
  assert.equal(page.inLanguage, 'zh-Hant-TW');
  assert.match(page.dateModified, /^\d{4}-\d{2}-\d{2}$/);
  assert.deepEqual(page.publisher, { '@id': organization['@id'] });
  assert.equal(page.isPartOf['@id'], website['@id']);
  assert.equal(website.publisher['@id'], organization['@id']);
  assert.ok(visible.includes(organization.name));
  assert.ok(page.about, 'the graph describes the visible subject');
  for (const subject of Array.isArray(page.about) ? page.about : [page.about]) {
    const target = subject['@id'] ? graph.find(item => item['@id'] === subject['@id']) : subject;
    assert.ok(target, 'about references an included graph node');
    if (target.name) assert.ok(visible.includes(target.name), `visible subject: ${target.name}`);
  }
  const breadcrumb = node('BreadcrumbList');
  assert.equal(page.breadcrumb['@id'], breadcrumb['@id']);
  assert.equal(breadcrumb.itemListElement[0].item, `${origin}/`);
  assert.equal(breadcrumb.itemListElement.at(-1).item, pageUrl);
  assert.deepEqual(breadcrumb.itemListElement.map(item => item.position), breadcrumb.itemListElement.map((_, index) => index + 1));
  assert.doesNotMatch(JSON.stringify(graph), /https?:\/\/(?:localhost|127\.0\.0\.1)|https:\/\/[^/"\s]+\.vercel\.app|https:\/\/neogen\.org\.tw/);
});

test('rainbow structured sections and official sources match readable HTML without registration data', () => {
  const page = node('WebPage');
  const links = tags(main, 'a').map(tag => tag.href);
  const expectedSources = [
    'https://www.taiwanpride.lgbt/',
    'https://www.taiwanpride.lgbt/2026-info-1',
    'https://www.facebook.com/share/p/1A1NaCkAq4/',
  ];
  assert.deepEqual(new Set(page.relatedLink), new Set(expectedSources));
  for (const source of page.relatedLink) assert.ok(links.includes(source), `visible source link: ${source}`);
  assert.ok(visible.includes('臺灣彩虹公民行動協會'));
  assert.ok(page.hasPart.length >= 3);
  for (const section of page.hasPart) {
    assert.equal(section['@type'], 'WebPageElement');
    const url = new URL(section.url);
    assert.equal(url.origin, origin);
    assert.equal(url.pathname, '/rainbow2026');
    assert.ok(url.hash);
    assert.ok(tags(main, 'section').some(tag => tag.id === url.hash.slice(1)), `rendered section: ${section.url}`);
    assert.ok(visible.includes(section.name), `readable section name: ${section.name}`);
  }
  assert.equal(tags(main, 'form').length, 0);
  assert.ok(!links.some(link => /forms\.gle|docs\.google\.com\/forms|registration/.test(link)));
  assert.doesNotMatch(visible, /報名/);
  assert.doesNotMatch(JSON.stringify(graph), /"@type":"(?:Event|Offer|AggregateOffer)"|"offers":/);
});

test('rainbow landscape share PNG stays independent of the visible portrait poster ImageObject', () => {
  const image = readFileSync(new URL('../.next/server/app/rainbow2026/opengraph-image.body', import.meta.url));
  const homeImage = readFileSync(new URL('../.next/server/app/opengraph-image.body', import.meta.url));
  const poster = readFileSync(new URL('../public/rainbow2026/event-poster.png', import.meta.url));
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.ok(image.subarray(0, 8).equals(pngSignature));
  assert.equal(image.toString('ascii', 12, 16), 'IHDR');
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
  assert.ok(image.length < 5 * 1024 * 1024);
  assert.ok(!image.equals(homeImage), 'the activity has distinct share artwork');
  assert.ok(!image.equals(poster), 'the original portrait poster remains separate');
  const structuredImage = node('ImageObject');
  const posterUrl = new URL(structuredImage.url);
  assert.equal(posterUrl.origin, origin);
  assert.equal(posterUrl.pathname, '/rainbow2026/event-poster.png');
  assert.equal(structuredImage.width, poster.readUInt32BE(16));
  assert.equal(structuredImage.height, poster.readUInt32BE(20));
  const primary = node('WebPage').primaryImageOfPage;
  assert.equal(primary['@id'], structuredImage['@id']);
  assert.ok(tags(main, 'img').some(tag => {
    const url = new URL(tag.src, origin);
    return (url.searchParams.get('url') ?? url.pathname) === posterUrl.pathname;
  }), 'primaryImageOfPage is an image present in the readable page');
});

test('rainbow OG deployment trace includes every local runtime asset', () => {
  const traceUrl = new URL('../.next/server/app/rainbow2026/opengraph-image/route.js.nft.json', import.meta.url);
  const trace = JSON.parse(readFileSync(traceUrl, 'utf8'));
  assert.ok(Array.isArray(trace.files));
  const traceDirectory = fileURLToPath(new URL('.', traceUrl));
  const tracedFiles = new Set(trace.files.map(file => resolve(traceDirectory, file)));
  for (const name of ['rainbow-og-serif-heavy.otf', 'rainbow-og-flower.svg', 'LICENSE-SourceHanSerif.txt']) {
    const asset = fileURLToPath(new URL(`../app/rainbow2026/assets/${name}`, import.meta.url));
    assert.ok(tracedFiles.has(asset), `${name} must be packaged with the OG route`);
    assert.ok(existsSync(asset), `${name} must exist at the traced absolute path`);
  }
});
