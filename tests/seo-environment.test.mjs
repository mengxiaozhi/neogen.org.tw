import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(readFileSync(new URL('../lib/seo.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

for (const [environment, expected] of [['production', true], ['preview', false], ['development', false], [undefined, true]]) {
  test(`${environment ?? 'local build'} has the correct indexing policy for both Google and other crawlers`, () => {
    const context = vm.createContext({ exports: {}, process: { env: { VERCEL_ENV: environment } } });
    vm.runInContext(source, context);
    const robots = context.exports.sharedRobots;
    assert.equal(robots.index, expected);
    assert.equal(robots.googleBot.index, expected);
    assert.equal(robots.follow, true);
    assert.equal(robots.googleBot.follow, true);
  });
}
