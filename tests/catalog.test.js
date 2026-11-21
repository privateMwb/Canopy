const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { renderCatalog, renderCards, renderPages, inject, lessonCount } = require("../scripts/build-catalog");

const lesson = (title) => ({ slug: title, title, hasContent: true, children: [] });

const python = {
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
          children: [lesson("Intro"), lesson("*args & **kwargs"), lesson("a | b"), lesson("List<T>"), lesson("a `tick`")],
        },
      ],
    },
    { slug: "mentor", title: "Mentor", children: [{ slug: "s", title: "Odd stage name", children: [lesson("One")] }] },
  ],
};

const manifest = {
  categories: [
    {
      slug: "web-development",
      title: "Web & Apps",
      tagline: "Semantic HTML to apps",
      description: "Some <b>web</b> things.",
      children: [
        python,
        { slug: "go", title: "Go", description: "", leafWithContent: 0, children: [] },
        { slug: "docs", title: "Official Docs", description: "External", url: "https://example.com/docs", children: [] },
      ],
    },
    { slug: "brand-new", title: "Brand New", children: [] },
  ],
};

test("lessonCount excludes the curriculum overview page", () => {
  assert.equal(lessonCount(python), 4);
  assert.equal(lessonCount(manifest.categories[0].children[1]), 0);
});

test("the README block is total badges, a hint and one linked card per category", () => {
  const out = renderCatalog(manifest);
  assert.match(out, /alt="Categories: 2"/);
  assert.match(out, /alt="Subjects: 3"/);
  assert.match(out, /alt="Lessons: 4"/);
  assert.match(out, /Tap a category to browse its subjects/);
  assert.match(
    out,
    /<a href="docs\/catalog\/web-development\.md"><img src="\.github\/assets\/catalog\/web-development\.svg" alt="Web &amp; Apps: 3 subjects, 4 lessons" width="420"><\/a>/
  );
  assert.match(out, /<a href="docs\/catalog\/brand-new\.md">/);
});

test("the README block has no <details> fold-outs", () => {
  assert.ok(!/<details|<summary/.test(renderCatalog(manifest)));
  for (const page of renderPages(manifest).values()) assert.ok(!/<details|<summary/.test(page));
});

test("renderPages makes a category page and a page for each subject that has levels", () => {
  assert.deepEqual([...renderPages(manifest).keys()], ["web-development.md", "web-development/py.md", "brand-new.md"]);
});

test("a category page is a heading, tagline, description, counts and a subject table", () => {
  const page = renderPages(manifest).get("web-development.md");
  assert.match(page, /^\[← What's Inside\]\(\.\.\/\.\.\/README\.md#whats-inside\)\n\n# Web & Apps\n\n\*Semantic HTML to apps\*/);
  assert.match(page, /Some &lt;b&gt;web&lt;\/b&gt; things\./);
  assert.match(page, /\*\*3 subjects\*\* · \*\*4 lessons\*\*/);
  assert.match(page, /\| Subject \| What it covers \| Lessons \|\n\|:--\|:--\|--:\|/);
  assert.match(page, /\| \[\*\*Python\*\*\]\(web-development\/py\.md\) \| A fast & friendly language \| 4 \|/);
});

test("a subject without levels is a plain row, and a link-out subject links out", () => {
  const page = renderPages(manifest).get("web-development.md");
  assert.match(page, /^\| \*\*Go\*\* \|  \| 0 \|$/m);
  assert.match(page, /\| \[\*\*Official Docs\*\*\]\(https:\/\/example\.com\/docs\) ↗ \| External \| 0 \|/);
});

test("a subject page has a back link, facts, a level heading and a Stage | Lessons table", () => {
  const page = renderPages(manifest).get("web-development/py.md");
  assert.match(page, /^\[← Web & Apps\]\(\.\.\/web-development\.md\)\n\n# Python\n\nA fast & friendly language\n\n\*\*4 lessons\*\* · 2 levels · 2 stages/);
  assert.match(page, /## 🟢 Junior\n\n\| Stage \| Lessons \|\n\|:--\|:--\|\n\| \*\*1\.1\*\*<br>Basics \|/);
  assert.match(page, /## Mentor\n\n\| Stage \| Lessons \|/, "an unknown level has a plain heading");
  assert.match(page, /\| Odd stage name \| `One` \|/, "a stage without a number has no bold prefix");
  assert.match(page, /\[Back to Canopy\]\(\.\.\/\.\.\/\.\.\/README\.md#whats-inside\)\n$/);
});

test("lessons are code chips with pipes and backticks neutralised, and the curriculum page is not listed", () => {
  const page = renderPages(manifest).get("web-development/py.md");
  assert.match(page, /`Intro` `\*args & \*\*kwargs` `a \\\| b` `List<T>` `a 'tick'`/);
  assert.ok(!page.includes("Curriculum"));
});

test("renderCards makes one card per category with title, tagline, counts and a chevron", () => {
  const cards = renderCards(manifest);
  assert.deepEqual([...cards.keys()], ["web-development.svg", "brand-new.svg"]);
  const svg = cards.get("web-development.svg");
  assert.match(svg, /^<svg /);
  assert.match(svg, />Web &amp; Apps<\/text>/);
  assert.match(svg, />Semantic HTML to apps<\/text>/);
  assert.match(svg, />3 subjects<\/text>/);
  assert.match(svg, />4 lessons<\/text>/);
  assert.match(svg, /aria-label="Web &amp; Apps: 3 subjects, 4 lessons"/);
  assert.match(svg, /<path d="M388 47 L398 56 L388 65"/);
});

test("a category without a tagline still renders", () => {
  const svg = renderCards(manifest).get("brand-new.svg");
  assert.match(svg, />Brand New<\/text>/);
  assert.match(svg, />0 subjects<\/text>/);
  assert.ok(!svg.includes('y="64"'), "no tagline line");
});

test("the output is deterministic", () => {
  const copy = JSON.parse(JSON.stringify(manifest));
  assert.equal(renderCatalog(manifest), renderCatalog(copy));
  assert.deepEqual([...renderCards(manifest)], [...renderCards(copy)]);
  assert.deepEqual([...renderPages(manifest)], [...renderPages(copy)]);
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

test("the real README, cards and catalog pages are up to date", () => {
  const r = spawnSync(process.execPath, [path.join(__dirname, "..", "scripts", "build-catalog.js"), "--check"], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
});

test("every relative link and image in the README and catalog pages resolves", () => {
  const root = path.join(__dirname, "..");
  const files = ["README.md"];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".md")) files.push(path.relative(root, p));
    }
  })(path.join(root, "docs", "catalog"));
  assert.ok(files.length > 1);
  const broken = [];
  for (const f of files) {
    const text = fs.readFileSync(path.join(root, f), "utf8");
    for (const m of text.matchAll(/(?:\]\(|href="|src=")(?!https?:|#)([^)"#]+)/g)) {
      if (!fs.existsSync(path.join(root, path.dirname(f), m[1]))) broken.push(`${f} -> ${m[1]}`);
    }
  }
  assert.deepEqual(broken, []);
});
