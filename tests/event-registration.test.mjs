import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { REGISTRATION_FORM_URL } from '../lib/event-registration.ts';

const routeSource = ts.transpileModule(readFileSync(new URL('../app/api/2027/registration/route.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function routeHarness(enabled) {
  const context = vm.createContext({
    exports: {}, Response,
    require: path => path === '@/lib/event-features' ? { isEventRegistrationEnabled: () => enabled } : { REGISTRATION_FORM_URL },
    fetch: () => { throw new Error('Retired route must not contact any upstream'); },
  });
  vm.runInContext(routeSource, context);
  return context.exports.POST;
}

test('registration URL points to the newly supplied public form', () => {
  const published = new URL(REGISTRATION_FORM_URL);
  assert.equal(published.origin, 'https://docs.google.com');
  assert.equal(published.pathname, '/forms/d/e/1FAIpQLSe-Rg7S0rSBlEUfXWQH12bRS86au6uT-kU2L6lhFkhfUKZ0ng/viewform');
});

test('closed registration returns 404 without reading personal data or exposing a form link', async () => {
  const post = routeHarness(false);
  const request = new Proxy({}, { get() { throw new Error('Must not read submitted data'); } });
  const response = await post(request);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: '找不到此功能。' });
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('enabled preview retires the six-field API and points only to the new form', async () => {
  const post = routeHarness(true);
  const request = new Proxy({}, { get() { throw new Error('Must not read or forward submitted data'); } });
  const response = await post(request);
  assert.equal(response.status, 410);
  const result = await response.json();
  assert.equal(result.formUrl, REGISTRATION_FORM_URL);
  assert.equal(result.ok, undefined);
  assert.equal(result.receipt, undefined);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex');
});

test('retired Apps Script refuses submissions without opening or modifying either form', () => {
  const context = vm.createContext({
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: value => ({ setMimeType: () => JSON.parse(value) }) },
    FormApp: { openById() { throw new Error('Must preserve existing form data'); } },
  });
  vm.runInContext(readFileSync(new URL('../scripts/google-registration.gs', import.meta.url), 'utf8'), context);
  const request = new Proxy({}, { get() { throw new Error('Must not read personal data'); } });
  const result = context.doPost(request);
  assert.equal(result.ok, false);
  assert.equal(result.code, 'CLOSED');
  assert.equal(result.reason, 'FORM_REPLACED');
  assert.equal(result.formUrl, REGISTRATION_FORM_URL);
  assert.equal(context.doGet().configured, false);
  assert.throws(() => context.setupRegistration(), /retired/);
});
