// Keeps the release machinery consistent: the version in package.json must have
// a changelog section and a release notes file, and release.yml must publish
// that file. Bumping the version without writing the notes fails here, not on
// the release page.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), "utf8");
const { version } = JSON.parse(read("package.json"));

test("package.json has a semantic version", () => {
  assert.match(version, /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/);
});

test("the changelog has a dated section for the current version and an Unreleased section", () => {
  const log = read("CHANGELOG.md");
  assert.match(log, /^## \[Unreleased\]$/m);
  assert.match(log, new RegExp(`^## \\[${version.replace(/\./g, "\\.")}\\] - \\d{4}-\\d{2}-\\d{2}$`, "m"));
  assert.match(log, new RegExp(`^\\[${version.replace(/\./g, "\\.")}\\]: https://github\\.com/privateMwb/Canopy/releases/tag/v${version.replace(/\./g, "\\.")}$`, "m"));
});

test("there is a release notes file for the current version, with real content", () => {
  const file = path.join(ROOT, ".github", "releases", `v${version}.md`);
  assert.ok(fs.existsSync(file), `missing .github/releases/v${version}.md`);
  const notes = fs.readFileSync(file, "utf8");
  assert.match(notes, new RegExp(`^# Canopy v${version.replace(/\./g, "\\.")}$`, "m"));
  assert.ok(notes.length > 500, "release notes look empty");
});

test("release.yml publishes the notes file, verifies the tree and handles pre-releases", () => {
  const wf = read(".github", "workflows", "release.yml");
  assert.match(wf, /body_path: \$\{\{ steps\.notes\.outputs\.path \}\}/);
  assert.match(wf, /\.github\/releases\/\$\{\{ steps\.resolve_tag\.outputs\.tag \}\}\.md/);
  assert.match(wf, /generate_release_notes: \$\{\{ steps\.notes\.outputs\.path == '' \}\}/);
  assert.match(wf, /prerelease: \$\{\{ contains\(steps\.resolve_tag\.outputs\.tag, '-'\) \}\}/);
  for (const cmd of ["validate-content.js", "build-manifest.js --check", "build-catalog.js --check"]) assert.ok(wf.includes(cmd), cmd);
  assert.match(wf, /tags:\s*\n\s*- "v\*"/);
});
