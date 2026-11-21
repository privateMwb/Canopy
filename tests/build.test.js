// Exercises scripts/build-manifest.js against a miniature repo in a temp dir,
// so the tests are fast and never touch the real frontend/ files.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { PAGE, tmpDir, write } = require("./helpers");

const REPO = path.join(__dirname, "..");

function miniRepo() {
  const root = tmpDir("canopy-mini-");
  fs.mkdirSync(path.join(root, "scripts"));
  for (const f of ["build-manifest.js", "sw.template.js"]) {
    fs.copyFileSync(path.join(REPO, "scripts", f), path.join(root, "scripts", f));
  }
  write(root, {
    "frontend/index.html": '<link href="styles.css?v=x"><script src="icons.js?v=x"></script><script src="app.js?v=x"></script>',
    "frontend/styles.css": "body{}",
    "frontend/icons.js": "",
    "frontend/app.js": "",
    "content/categories/lang/meta.json": { title: "Languages" },
    "content/categories/lang/python/junior/stage-1.1-basics/01-intro/content.html": PAGE,
    "content/categories/lang/python/junior/stage-1.1-basics/02-types/content.html": PAGE,
  });
  return root;
}

const run = (root, ...args) =>
  spawnSync(process.execPath, [path.join(root, "scripts", "build-manifest.js"), ...args], { encoding: "utf8" });

test("build writes manifest, version, service worker and lesson copies", () => {
  const root = miniRepo();
  const r = run(root);
  assert.equal(r.status, 0, r.stderr);

  const manifest = JSON.parse(fs.readFileSync(path.join(root, "frontend", "manifest.json"), "utf8"));
  assert.equal(manifest.categories[0].title, "Languages");
  assert.equal(manifest.categories[0].leafTotal, 2);

  const copied = path.join(root, "frontend", "content", "lang", "python", "junior", "stage-1.1-basics", "01-intro.html");
  assert.ok(fs.existsSync(copied));

  const { version } = JSON.parse(fs.readFileSync(path.join(root, "frontend", "version.json"), "utf8"));
  assert.match(version, /^[0-9a-f]{10}$/);
  assert.ok(fs.readFileSync(path.join(root, "frontend", "sw.js"), "utf8").includes(version));
});

test("the version depends on content, not on file modification times", () => {
  const root = miniRepo();
  run(root);
  const v1 = JSON.parse(fs.readFileSync(path.join(root, "frontend", "version.json"), "utf8")).version;

  // Touch every source file: new mtimes, identical contents.
  const future = new Date(Date.now() + 86_400_000);
  const touch = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) touch(p);
      else fs.utimesSync(p, future, future);
    }
  };
  touch(path.join(root, "content"));
  run(root);
  const v2 = JSON.parse(fs.readFileSync(path.join(root, "frontend", "version.json"), "utf8")).version;
  assert.equal(v2, v1);

  // Changing one byte of content changes the version.
  const lesson = path.join(root, "content/categories/lang/python/junior/stage-1.1-basics/01-intro/content.html");
  fs.appendFileSync(lesson, "<!-- edit -->");
  run(root);
  const v3 = JSON.parse(fs.readFileSync(path.join(root, "frontend", "version.json"), "utf8")).version;
  assert.notEqual(v3, v1);
});

test("--check passes right after a build and does not modify anything", () => {
  const root = miniRepo();
  run(root);
  const before = fs.readFileSync(path.join(root, "frontend", "manifest.json"), "utf8");
  const r = run(root, "--check");
  assert.equal(r.status, 0, r.stderr);
  assert.equal(fs.readFileSync(path.join(root, "frontend", "manifest.json"), "utf8"), before);
});

test("--check fails when a lesson is edited without rebuilding", () => {
  const root = miniRepo();
  run(root);
  const lesson = path.join(root, "content/categories/lang/python/junior/stage-1.1-basics/01-intro/content.html");
  fs.appendFileSync(lesson, "<!-- edit -->");
  const r = run(root, "--check");
  assert.equal(r.status, 1);
  assert.match(r.stderr, /out of sync/);
  assert.match(r.stderr, /01-intro\.html differs from its source/);
});

test("--check fails when a lesson is deleted without rebuilding", () => {
  const root = miniRepo();
  run(root);
  fs.rmSync(path.join(root, "content/categories/lang/python/junior/stage-1.1-basics/02-types"), { recursive: true });
  const r = run(root, "--check");
  assert.equal(r.status, 1);
  assert.match(r.stderr, /manifest\.json is out of date/);
  assert.match(r.stderr, /02-types\.html is stale/);
});

test("--check fails when a lesson is added without rebuilding", () => {
  const root = miniRepo();
  run(root);
  write(root, { "content/categories/lang/python/junior/stage-1.1-basics/03-new/content.html": PAGE });
  const r = run(root, "--check");
  assert.equal(r.status, 1);
  assert.match(r.stderr, /03-new\.html is missing/);
});

test("--check ignores the machine-specific updated dates", () => {
  const root = miniRepo();
  run(root);
  const file = path.join(root, "frontend", "manifest.json");
  const text = fs.readFileSync(file, "utf8").replace(/"updated": "[^"]*"/g, '"updated": "1999-01-01"');
  fs.writeFileSync(file, text);
  assert.equal(run(root, "--check").status, 0);
});

test("the real repository's generated files are in sync", () => {
  const r = spawnSync(process.execPath, [path.join(REPO, "scripts", "build-manifest.js"), "--check"], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
});
