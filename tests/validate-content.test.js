const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { validateTree } = require("../scripts/validate-content");
const { PAGE, tmpDir, write } = require("./helpers");

function tree(files) {
  return write(tmpDir(), files);
}
const errorsOf = (files) => validateTree(tree(files)).errors;

test("a well-formed tree has no errors or warnings", () => {
  const r = validateTree(
    tree({
      "lang/meta.json": { title: "Languages", order: 1 },
      "lang/python/meta.json": { title: "Python", accent: "#336699", order: 1 },
      "lang/python/junior/stage-1.1-basics/01-intro/content.html": PAGE,
      "lang/python/junior/stage-1.1-basics/02-types/content.html": PAGE,
      "lang/python/junior/stage-1.2-more/01-loops/content.html": PAGE,
    })
  );
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.warnings, []);
  assert.equal(r.lessons, 3);
});

test("invalid meta.json is an error", () => {
  const errs = errorsOf({ "a/meta.json": "{ not json", "a/b/content.html": PAGE });
  assert.equal(errs.length, 1);
  assert.match(errs[0], /invalid JSON/);
});

test("meta.json fields are type-checked", () => {
  const errs = errorsOf({
    "a/b/content.html": PAGE,
    "a/b/meta.json": {
      title: 5,
      accent: "teal",
      order: "1",
      updated: "yesterday",
      compileRoot: "yes",
      url: "http://insecure.example",
    },
  });
  for (const field of ["title", "accent", "order", "updated", "compileRoot", "url"]) {
    assert.ok(errs.some((e) => e.includes(`"${field}"`)), `expected an error for ${field}`);
  }
});

test("unknown meta.json keys are warnings, not errors", () => {
  const r = validateTree(tree({ "a/b/content.html": PAGE, "a/b/meta.json": { titel: "typo" } }));
  assert.deepEqual(r.errors, []);
  assert.match(r.warnings[0], /unknown key "titel"/);
});

test("a folder with both content.html and subfolders is an error", () => {
  const errs = errorsOf({ "a/content.html": PAGE, "a/b/content.html": PAGE });
  assert.ok(errs.some((e) => /content\.html AND 1 subfolder/.test(e)));
});

test("an empty leaf folder is an error, unless it links out with a url", () => {
  assert.ok(errorsOf({ "a/b/.gitkeep": "" }).some((e) => /empty folder/.test(e)));
  assert.deepEqual(errorsOf({ "a/b/meta.json": { url: "https://example.com" } }), []);
});

test("a tiny content.html is an error", () => {
  assert.ok(errorsOf({ "a/b/content.html": "<p>hi</p>" }).some((e) => /bytes/.test(e)));
});

test("duplicate lesson numbers among siblings are an error", () => {
  const errs = errorsOf({
    "a/s/03-buildkit-and-secrets/content.html": PAGE,
    "a/s/03-buildkit-secrets/content.html": PAGE,
  });
  assert.ok(errs.some((e) => /share number 03/.test(e)));
});

test("duplicate stage numbers among siblings are an error", () => {
  const errs = errorsOf({
    "a/junior/stage-1.3-data-and-apps/01-x/content.html": PAGE,
    "a/junior/stage-1.3-data-apps/01-x/content.html": PAGE,
  });
  assert.ok(errs.some((e) => /stages share number 1\.3/.test(e)));
});

test("duplicate order values are a warning", () => {
  const r = validateTree(
    tree({
      "a/x/content.html": PAGE,
      "a/x/meta.json": { order: 1 },
      "a/y/content.html": PAGE,
      "a/y/meta.json": { order: 1 },
    })
  );
  assert.deepEqual(r.errors, []);
  assert.ok(r.warnings.some((w) => /share order 1/.test(w)));
});

test("folder names must be hash-safe", () => {
  assert.ok(errorsOf({ "a/Has Space/content.html": PAGE }).some((e) => /must be lowercase/.test(e)));
  assert.ok(errorsOf({ "a/UPPER/content.html": PAGE }).some((e) => /must be lowercase/.test(e)));
});

test("real javascript: links are errors, escaped examples are not", () => {
  const live = PAGE.replace("</body>", '<a href="javascript:alert(1)">x</a></body>');
  assert.ok(errorsOf({ "a/b/content.html": live }).some((e) => /javascript: URL/.test(e)));

  // Security lessons show this as escaped text inside a code block.
  const escaped = PAGE.replace("</body>", '<pre><code>&lt;a href="javascript:alert(1)"&gt;x&lt;/a&gt;</code></pre></body>');
  assert.deepEqual(errorsOf({ "a/b/content.html": escaped }), []);
});

test("<script> tags and inline event handlers are errors; escaped examples are not", () => {
  const withScript = PAGE.replace("</body>", "<script>alert(1)</script></body>");
  assert.ok(errorsOf({ "a/b/content.html": withScript }).some((e) => /<script> tag/.test(e)));

  const withHandler = PAGE.replace("<p>", '<p onclick="alert(1)">');
  assert.ok(errorsOf({ "a/b/content.html": withHandler }).some((e) => /inline event handler in <p>/.test(e)));

  const escaped = PAGE.replace("</body>", "<pre><code>&lt;script&gt;alert(1)&lt;/script&gt; &lt;p onclick=&quot;x&quot;&gt;</code></pre></body>");
  assert.deepEqual(errorsOf({ "a/b/content.html": escaped }), []);
});

test("plain http:// links are warnings", () => {
  const html = PAGE.replace("</body>", '<a href="http://example.com">x</a></body>');
  const r = validateTree(tree({ "a/b/content.html": html }));
  assert.deepEqual(r.errors, []);
  assert.ok(r.warnings.some((w) => /plain http/.test(w)));
});

test("a missing content directory is an error", () => {
  const r = validateTree(path.join(tmpDir(), "nope"));
  assert.equal(r.errors.length, 1);
});

test("the real content/ tree has no errors", () => {
  const real = path.join(__dirname, "..", "content", "categories");
  assert.ok(fs.existsSync(real));
  const r = validateTree(real);
  assert.deepEqual(r.errors, []);
});
