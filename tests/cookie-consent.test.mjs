import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const compiled = ts.transpileModule(readFileSync(new URL('../lib/cookie-consent.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
function harness(blocked = false) {
  const storage = new Map(), scripts = [], cookieWrites = [], events = new Map();
  let reloads = 0;
  const listen = (name, fn) => events.set(name, fn);
  const document = {
    createElement: () => ({}), head: { appendChild: script => scripts.push(script) },
    addEventListener: listen, removeEventListener() {},
    get cookie() { return '_ga=123; _ga_WZXRHNVVYV=456; _gid=789; session=keep'; },
    set cookie(value) { cookieWrites.push(value); },
  };
  const window = {
    location: { hostname: 'www.neogen.org.tw', pathname: '/2027/report', reload() { reloads++; } },
    addEventListener: listen, removeEventListener() {}, dispatchEvent(event) { events.get(event.type)?.(event); },
  };
  const context = vm.createContext({ exports: {}, window, document, Event,
    localStorage: { getItem: key => { if (blocked) throw Error(); return storage.get(key) ?? null; }, setItem: (key, value) => { if (blocked) throw Error(); storage.set(key,value); } },
    setTimeout: () => 1, clearTimeout() {},
  });
  vm.runInContext(compiled, context);
  return { api: context.exports, storage, scripts, cookieWrites, window, events, get reloads() { return reloads; } };
}

test('absent, corrupt, expired, future and outdated preferences never authorize analytics', () => {
  const { api } = harness(); const now = Date.now();
  for (const raw of [null, '', 'bad', '{}', JSON.stringify({version: 0, analytics:true, savedAt:now}), JSON.stringify({version:1, analytics:'yes', savedAt:now}), JSON.stringify({version:1, analytics:true,savedAt:now+1}), JSON.stringify({version:1,analytics:true,savedAt:now-api.CONSENT_DURATION})]) assert.equal(api.parseConsent(raw, now), null);
});

test('unknown and rejected choices do not insert a Google script or queue events', () => {
  const h = harness(); h.api.startAnalytics(); assert.equal(h.scripts.length, 0);
  h.api.saveConsent(false); h.api.startAnalytics(); assert.equal(h.scripts.length, 0);
  assert.equal(h.window.dataLayer, undefined);
  assert.equal(h.api.parseConsent(h.api.consentSnapshot()).analytics, false);
});

test('explicit acceptance loads one tag, with consent commands before config and ads disabled', () => {
  const h = harness(); h.api.saveConsent(true); h.api.startAnalytics(); h.api.startAnalytics();
  assert.equal(h.scripts.length, 1);
  assert.match(h.scripts[0].src, /gtag\/js\?id=G-WZXRHNVVYV$/);
  const commands = h.window.dataLayer.map(args => Array.from(args));
  assert.equal(commands[0][1], 'default'); assert.equal(commands[0][2].analytics_storage, 'denied');
  assert.equal(commands[1][2].analytics_storage, 'granted');
  for (const key of ['ad_storage','ad_user_data','ad_personalization']) assert.equal(commands[1][2][key], 'denied');
  const config = commands.find(args => args[0] === 'config')[2];
  assert.equal(config.cookie_expires, 15552000); assert.equal(config.cookie_update, false);
  assert.equal(config.allow_google_signals, false); assert.equal(config.allow_ad_personalization_signals, false);
});

test('withdrawal saves rejection before reload, disables GA and clears only analytics cookies', () => {
  const h = harness(); h.api.saveConsent(true); h.api.startAnalytics(); h.api.subscribeConsent(() => {});
  h.api.saveConsent(false);
  assert.equal(h.window['ga-disable-G-WZXRHNVVYV'], true); assert.equal(h.reloads, 1);
  assert.equal(h.api.parseConsent(h.api.consentSnapshot()).analytics, false);
  assert.ok(h.cookieWrites.some(cookie => cookie.includes('Domain=neogen.org.tw')));
  assert.ok(h.cookieWrites.every(cookie => /^_g/.test(cookie) && cookie.includes('Max-Age=0')));
  assert.ok(h.cookieWrites.every(cookie => !cookie.startsWith('session=')));
});

test('withdrawal in another tab disables and unloads analytics in this tab', () => {
  const h = harness(); h.api.saveConsent(true); h.api.startAnalytics(); h.api.subscribeConsent(() => {});
  h.storage.delete(h.api.CONSENT_KEY); h.events.get('storage')({key: h.api.CONSENT_KEY});
  assert.equal(h.window['ga-disable-G-WZXRHNVVYV'], true); assert.equal(h.reloads, 1);
});

test('blocked storage starts disabled and only explicit session consent can enable GA', () => {
  const h = harness(true); h.api.startAnalytics(); assert.equal(h.scripts.length,0);
  assert.equal(h.api.saveConsent(true), false); h.api.startAnalytics(); assert.equal(h.scripts.length,1);
  assert.equal(h.storage.size,0);
});

test('server HTML never embeds an executable GA tag before consent on any public page', () => {
  for (const route of ['index','team','2027','2027/program','2027/report','privacy']) {
    const html = readFileSync(new URL(`../.next/server/app/${route}.html`, import.meta.url),'utf8');
    assert.doesNotMatch(html, /<script[^>]+src="https:\/\/(?:www\.)?googletagmanager\.com/);
    assert.doesNotMatch(html, /id="_next-ga(?:-init)?"/);
    assert.match(html, /Cookie 設定/);
  }
});

test('public routes select their own visual theme without separate consent stores', () => {
  for (const route of ['index', 'team', 'privacy', '2027', '2027/program', '2027/report']) {
    const html = readFileSync(new URL(`../.next/server/app/${route}.html`, import.meta.url), 'utf8');
    const expected = route.startsWith('2027') ? 'event' : 'main';
    assert.match(html, new RegExp(`data-cookie-theme="${expected}"`));
    assert.equal((html.match(/data-cookie-theme=/g) ?? []).length, 1);
  }
});
