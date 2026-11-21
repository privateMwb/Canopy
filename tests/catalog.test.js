const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("path");
const { spawnSync } = require("child_process");
const { renderCatalog, inject, lessonCount } = require("../scripts/build-catalog");

const lesson = (title) => ({ slug: title, title, hasContent: true, children: [] });

const manifest = {
  categories: [
    {
      title: "Languages & Tools",
      description: "Some <b>languages</b>.",
      children: [
        {
          slug: "py",
          title: "Python",
          description: "A fast & friendly language",
          leafWithContent: 5,
          children: [
            { slug: "curriculum", title: "Curriculum", hasContent: true, children: [] },
            {
              slug: "junior",
              title: "Junior",
              children: [
                {
                  slug: "stage-1.1-basics",
                  title: "Stage 1.1 — Basics",
                  children: [lesson("Intro"), lesson("*args & **kwargs"), lesson("a | b"), lesson("List<T>")],
                },
              ],
            },
          ],
        },
        { slug: "go", title: "Go", description: "", leafWithContent: 0, children: [] },
        { slug: "docs", title: "Official Docs", description: "External", url: "https://example.com/docs", children: [] },
      ],
    },
  ],
};

test("lessonCount excludes the curriculum overview page", () => {
  assert.equal(lessonCount(manifest.categories[0].children[0]), 4);
  assert.equal(lessonCount(manifest.categories[0].children[1]), 0);
});

test("renderCatalog opens with total badges and a short hint, and nests category > subject", () => {
  const out = renderCatalog(manifest);
  assert.match(out, /alt="Categories: 1"/);
  assert.match(out, /alt="Subjects: 3"/);
  assert.match(out, /alt="Lessons: 4"/);
  assert.match(out, /Tap a category to explore/);
  assert.match(out, /<summary><b>📂 Languages &amp; Tools<\/b><br><sub>3 subjects · 4 lessons<\/sub><\/summary>/);
  assert.match(out, /<summary><b>Python<\/b> <sub>· 4 lessons<\/sub><br><sub>A fast &amp; friendly language<\/sub><\/summary>/);
});

test("known categories get their own icon", () => {
  const m = { categories: [{ slug: "web-development", title: "Web", children: [] }] };
  assert.match(renderCatalog(m), /<b>🌐 Web<\/b>/);
});

test("every <details> is closed and nothing is expanded by default", () => {
  const out = renderCatalog(manifest);
  const open = (out.match(/<details>/g) || []).length;
  const close = (out.match(/<\/details>/g) || []).length;
  assert.equal(open, close);
  assert.ok(!/<details open/.test(out));
});

test("levels, stages and lessons are listed inside the subject", () => {
  const out = renderCatalog(manifest);
  assert.match(out, /\*\*Junior\*\*/);
  assert.match(out, /- \*\*Stage 1\.1 — Basics\*\* · Intro · /);
  assert.ok(!out.includes("Curriculum"), "the curriculum overview page is not listed as a lesson");
});

test("markdown and HTML specials in titles are escaped", () => {
  const out = renderCatalog(manifest);
  assert.match(out, /\\\*args & \\\*\\\*kwargs/);
  assert.match(out, /a \\\| b/);
  assert.match(out, /List&lt;T&gt;/);
  assert.match(out, /Some &lt;b&gt;languages&lt;\/b&gt;\./);
});

test("a subject with no lessons is a plain line, and a link-out subject is a link", () => {
  const out = renderCatalog(manifest);
  assert.match(out, /^- \*\*Go\*\*$/m);
  assert.match(out, /<a href="https:\/\/example\.com\/docs"><b>Official Docs<\/b><\/a> ↗/);
});

test("renderCatalog is deterministic", () => {
  assert.equal(renderCatalog(manifest), renderCatalog(JSON.parse(JSON.stringify(manifest))));
});

test("inject replaces only the marked block and is idempotent", () => {
  const doc = "before\n<!-- CATALOG:START -->\nold\n<!-- CATALOG:END -->\nafter\n";
  const once = inject(doc, "NEW");
  assert.equal(once, "before\n<!-- CATALOG:START -->\nNEW\n<!-- CATALOG:END -->\nafter\n");
  assert.equal(inject(once, "NEW"), once);
});

test("inject throws when the markers are missing", () => {
  assert.throws(() => inject("no markers", "x"), /CATALOG:START/);
});

test("the real README catalog is up to date", () => {
  const r = spawnSync(process.execPath, [path.join(__dirname, "..", "scripts", "build-catalog.js"), "--check"], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
});
