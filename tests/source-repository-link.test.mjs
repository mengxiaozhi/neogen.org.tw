// Verify that every public HTML page keeps a visible link to the open-source repository.
// Run after: npm run build -- --webpack
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const repository = "https://github.com/mengxiaozhi/neogen.org.tw";
const pages = [
  ["/", "../.next/server/app/index.html"],
  ["/team", "../.next/server/app/team.html"],
  ["/privacy", "../.next/server/app/privacy.html"],
  ["/2027", "../.next/server/app/2027.html"],
  ["/2027/program", "../.next/server/app/2027/program.html"],
  ["/2027/report", "../.next/server/app/2027/report.html"],
];

for (const [route, file] of pages) {
  test(`${route} links to the public source repository`, () => {
    const html = readFileSync(new URL(file, import.meta.url), "utf8");
    assert.match(html, new RegExp(`href="${repository.replaceAll(".", "\\.")}"`));
    assert.match(html, /GitHub 開放原始碼/);
  });
}

test("the public footer does not display the author's personal copyright notice", () => {
  const html = readFileSync(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
  assert.doesNotMatch(html.replace(/<script\b[\s\S]*?<\/script>/g, ""), /©\s*2026\s*劉訊志/);
});
