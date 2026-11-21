#!/usr/bin/env node
/**
 * build-manifest.js
 *
 * Recursively scans content/categories/ to ANY depth and auto-detects every
 * folder as a node in the tree.
 *
 * meta.json per folder (all fields optional):
 *   {
 *     "title": "...",
 *     "description": "...",
 *     "accent": "#RRGGBB",       // gradient start — omit to auto-assign
 *     "accentEnd": "#RRGGBB",    // gradient end — omit to auto-assign
 *     "icon": "network",         // optional: force an icon (see frontend/icons.js); omit to auto-pick
 *     "order": 1,                // pins position among siblings (lower first)
 *     "updated": "2026-01-15",   // overrides the auto-detected last-modified date
 *     "compileRoot": true,       // this node gets a "Download all (.zip)" button
 *     "url": "https://..."       // this node links out externally instead of navigating in
 *   }
 *
 * LAZY CONTENT: a folder's content.html is NOT embedded into manifest.json
 * anymore. Instead it's copied to frontend/content/<full-path>.html, and the
 * manifest just records a "contentPath" pointing at it. The frontend fetches
 * that file only when the card is actually opened — keeps the manifest small
 * no matter how much content exists.
 *
 * VERSIONING: a hash of every file under content/categories/ is written to
 * frontend/version.json. The frontend appends this as a ?v= query string on
 * every fetch (manifest, content files), so a stale cached copy on a static
 * host gets bypassed automatically the moment content actually changes.
 *
 * Run:    node scripts/build-manifest.js
 * Check:  node scripts/build-manifest.js --check
 *         Builds into a temp copy of frontend/ and exits non-zero if the
 *         committed manifest.json, version.json, sw.js, index.html or
 *         content/** differ from what the source would produce. Used by CI.
 * Output: frontend/manifest.json, frontend/version.json, frontend/sw.js,
 *         frontend/index.html (asset stamps), frontend/content/**
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");

const CHECK = process.argv.includes("--check");

const CONTENT_DIR = path.join(__dirname, "..", "content", "categories");
const REAL_FRONTEND_DIR = path.join(__dirname, "..", "frontend");
// In --check mode everything is written to a throwaway copy of frontend/
// (minus the generated content/ folder) so the real files are never touched.
const CHECK_DIR = CHECK ? fs.mkdtempSync(path.join(os.tmpdir(), "canopy-check-")) : null;
if (CHECK) {
  fs.cpSync(REAL_FRONTEND_DIR, CHECK_DIR, {
    recursive: true,
    filter: (src) => path.relative(REAL_FRONTEND_DIR, src) !== "content",
  });
}
const FRONTEND_DIR = CHECK ? CHECK_DIR : REAL_FRONTEND_DIR;
const OUT_MANIFEST = path.join(FRONTEND_DIR, "manifest.json");
const OUT_VERSION = path.join(FRONTEND_DIR, "version.json");
const OUT_CONTENT_DIR = path.join(FRONTEND_DIR, "content");
const SW_TEMPLATE = path.join(__dirname, "sw.template.js");
const SW_OUT = path.join(FRONTEND_DIR, "sw.js");

// Colors are assigned by ROLE, so the library reads as one system:
//   categories (top level)       -> one teal/mint gradient
//   subjects (inside a category) -> one blue gradient
//   Curriculum roadmap page      -> one purple gradient
//   junior / intermediate / senior keep their own semantic green / amber / red
// Any folder can still override via meta.json.
// NOTE: frontend/app.js detects these exact values (toneOf) to let the theme
// supply brighter dark-mode colors — change both together.
const CATEGORY_GRADIENT = ["#0F766E", "#34D399"];
const SUBJECT_GRADIENT = ["#1D4ED8", "#60A5FA"];
const CURRICULUM_GRADIENT = ["#6D28D9", "#C084FC"];

const LEVEL_COLORS = [
  [["junior", "beginner", "entry", "basic"], ["#86EFAC", "#15803D"]],
  [["intermediate", "mid", "middle"], ["#FEF08A", "#A16207"]],
  [["senior", "advanced", "expert"], ["#FCA5A5", "#B91C1C"]],
];

function titleCase(slug) {
  return slug.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function readRawMeta(dirPath) {
  const metaPath = path.join(dirPath, "meta.json");
  if (!fs.existsSync(metaPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(metaPath, "utf8"));
  } catch {
    console.warn(`  ! Could not parse ${metaPath}, falling back to defaults`);
    return {};
  }
}

function listSubfolders(dirPath) {
  return fs.readdirSync(dirPath, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
}

function orderedChildSlugs(dirPath) {
  const slugs = listSubfolders(dirPath);
  const entries = slugs.map((slug) => ({ slug, order: readRawMeta(path.join(dirPath, slug)).order }));
  entries.sort((a, b) => {
    const aHas = typeof a.order === "number";
    const bHas = typeof b.order === "number";
    if (aHas && bHas) return a.order - b.order;
    if (aHas) return -1;
    if (bHas) return 1;
    return a.slug.localeCompare(b.slug);
  });
  return entries.map((e) => e.slug);
}

function resolveColor(slug, title, indexAtLevel, depth, forcedColor, meta) {
  if (meta.accent) return { color: [meta.accent, meta.accentEnd || meta.accent], childForced: forcedColor };
  if (forcedColor) return { color: forcedColor, childForced: forcedColor };
  const key = `${slug} ${title}`.toLowerCase().replace(/[-_]/g, " ");
  const levelMatch = LEVEL_COLORS.find(([keywords]) => keywords.some((kw) => new RegExp(`\\b${kw}\\b`).test(key)));
  if (levelMatch) return { color: levelMatch[1], childForced: levelMatch[1] };
  if (/^curriculum$/.test(slug) || /^curriculum$/i.test(title)) return { color: CURRICULUM_GRADIENT, childForced: forcedColor };
  return { color: depth === 1 ? CATEGORY_GRADIENT : SUBJECT_GRADIENT, childForced: forcedColor };
}

function formatDate(d) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

// Hash every file under content/categories/ (relative path + file contents)
// into one short version string — changes the instant any content actually
// changes. Contents, not mtimes: mtimes differ on every fresh git clone, which
// would make the version (and everything stamped with it) non-reproducible.
const versionHash = crypto.createHash("sha1");
function hashWalk(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      hashWalk(full);
    } else {
      versionHash.update(`${path.relative(CONTENT_DIR, full)}\n`);
      versionHash.update(fs.readFileSync(full));
      versionHash.update("\n");
    }
  }
}

function buildNode(dirPath, slug, indexAtLevel, depth, forcedColor, ancestorSlugs) {
  const meta = readRawMeta(dirPath);
  const title = meta.title || titleCase(slug);
  const fullSlugPath = [...ancestorSlugs, slug];

  const contentFile = path.join(dirPath, "content.html");
  let hasContent = fs.existsSync(contentFile);
  let contentPath = null;
  let updated = null;

  const { color: [accent, accentEnd], childForced } = resolveColor(slug, title, indexAtLevel, depth, forcedColor, meta);

  const childSlugs = orderedChildSlugs(dirPath);
  const children = childSlugs.map((childSlug, i) =>
    buildNode(path.join(dirPath, childSlug), childSlug, i, depth + 1, childForced, fullSlugPath)
  );

  // A folder is either a page (content.html, no subfolders) or a shelf
  // (subfolders). If both exist, the shelf wins — otherwise a stray overview
  // file would hide every stage and lesson inside the folder.
  if (hasContent && children.length > 0) {
    console.warn(`  ! ${fullSlugPath.join("/")}: content.html ignored because the folder has ${children.length} subfolder(s). Delete it, or move it into its own folder (like curriculum/).`);
    hasContent = false;
  }
  if (hasContent) {
    contentPath = `content/${fullSlugPath.join("/")}.html`;
    const destPath = path.join(FRONTEND_DIR, contentPath);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(contentFile, destPath);
    updated = meta.updated || formatDate(fs.statSync(contentFile).mtime);
  }

  let leafTotal, leafWithContent;
  if (children.length === 0) {
    leafTotal = 1;
    leafWithContent = hasContent ? 1 : 0;
  } else {
    leafTotal = children.reduce((sum, c) => sum + c.leafTotal, 0);
    leafWithContent = children.reduce((sum, c) => sum + c.leafWithContent, 0);
  }

  return {
    slug, title, description: meta.description || "", tagline: meta.tagline || "", accent, accentEnd,
    icon: meta.icon || null,
    url: meta.url || null,
    hasContent,
    contentPath,
    updated,
    leafTotal,
    leafWithContent,
    compileRoot: !!meta.compileRoot,
    children,
  };
}

function build() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`No content directory found at ${CONTENT_DIR}`);
    process.exit(1);
  }

  // Clean previously-copied content files so deleted/renamed lessons don't linger
  fs.rmSync(OUT_CONTENT_DIR, { recursive: true, force: true });

  const topSlugs = orderedChildSlugs(CONTENT_DIR);
  const categories = topSlugs.map((slug, i) => buildNode(path.join(CONTENT_DIR, slug), slug, i, 1, null, []));

  fs.writeFileSync(OUT_MANIFEST, JSON.stringify({ categories }, null, 2));

  hashWalk(CONTENT_DIR);
  const version = versionHash.digest("hex").slice(0, 10);
  fs.writeFileSync(OUT_VERSION, JSON.stringify({ version, builtAt: new Date().toISOString() }, null, 2));

  if (fs.existsSync(SW_TEMPLATE)) {
    const swSrc = fs.readFileSync(SW_TEMPLATE, "utf8").replace(/__CACHE_VERSION__/g, version);
    fs.writeFileSync(SW_OUT, swSrc);
  }

  console.log(`Wrote ${OUT_MANIFEST}`);
  // Stamp the app shell (styles/scripts) with its own hash, so a redesign is
  // never masked by a browser or static server caching the old files.
  const shellHash = crypto.createHash("sha1");
  for (const f of ["styles.css", "icons.js", "app.js"]) {
    const fp = path.join(FRONTEND_DIR, f);
    if (fs.existsSync(fp)) shellHash.update(fs.readFileSync(fp));
  }
  const shellVersion = shellHash.digest("hex").slice(0, 10);
  const indexPath = path.join(FRONTEND_DIR, "index.html");
  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, "utf8").replace(/(styles\.css|icons\.js|app\.js)\?v=[^"]*/g, `$1?v=${shellVersion}`);
    fs.writeFileSync(indexPath, html);
    console.log(`Stamped index.html shell assets (v=${shellVersion})`);
  }
  console.log(`Wrote ${OUT_VERSION} (version ${version})`);
  console.log(`Copied content files into ${OUT_CONTENT_DIR}`);
  const log = (nodes, depth) => {
    nodes.forEach((n) => {
      console.log(`${"  ".repeat(depth + 1)}- ${n.title} (${n.children.length} child${n.children.length === 1 ? "" : "ren"}${n.hasContent ? ", content" : ""})`);
      log(n.children, depth + 1);
    });
  };
  log(categories, 0);
}

// ---------------------------------------------------------------------------
// --check: compare the temp build against the committed files.
// Ignores the fields that legitimately vary between machines: each node's
// "updated" date (derived from file mtimes) and version.json's builtAt.
// ---------------------------------------------------------------------------
function stripUpdated(node) {
  if (Array.isArray(node)) return node.map(stripUpdated);
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) if (k !== "updated") out[k] = stripUpdated(v);
    return out;
  }
  return node;
}

function listFiles(dir, base = dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) listFiles(full, base, acc);
    else acc.push(path.relative(base, full).split(path.sep).join("/"));
  }
  return acc.sort();
}

function check() {
  const problems = [];
  const read = (dir, f) => (fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f)) : null);

  const jsonOf = (dir, f) => {
    const b = read(dir, f);
    return b ? JSON.parse(b.toString("utf8")) : null;
  };
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  if (!same(stripUpdated(jsonOf(REAL_FRONTEND_DIR, "manifest.json")), stripUpdated(jsonOf(FRONTEND_DIR, "manifest.json")))) {
    problems.push("manifest.json is out of date");
  }
  const vReal = jsonOf(REAL_FRONTEND_DIR, "version.json");
  const vNew = jsonOf(FRONTEND_DIR, "version.json");
  if (!vReal || vReal.version !== vNew.version) problems.push("version.json is out of date");
  for (const f of ["sw.js", "index.html"]) {
    const a = read(REAL_FRONTEND_DIR, f);
    const b = read(FRONTEND_DIR, f);
    if (!a || !b || !a.equals(b)) problems.push(`${f} is out of date`);
  }

  const realContent = path.join(REAL_FRONTEND_DIR, "content");
  const newContent = path.join(FRONTEND_DIR, "content");
  const realFiles = listFiles(realContent);
  const newFiles = listFiles(newContent);
  const realSet = new Set(realFiles);
  const newSet = new Set(newFiles);
  for (const f of newFiles) if (!realSet.has(f)) problems.push(`content/${f} is missing`);
  for (const f of realFiles) if (!newSet.has(f)) problems.push(`content/${f} is stale (no source lesson)`);
  for (const f of newFiles) {
    if (realSet.has(f) && !fs.readFileSync(path.join(realContent, f)).equals(fs.readFileSync(path.join(newContent, f)))) {
      problems.push(`content/${f} differs from its source`);
    }
  }

  fs.rmSync(CHECK_DIR, { recursive: true, force: true });
  if (problems.length) {
    console.error(`\nGenerated files are out of sync with content/ (${problems.length} problem${problems.length === 1 ? "" : "s"}):`);
    problems.slice(0, 20).forEach((p) => console.error(`  - ${p}`));
    if (problems.length > 20) console.error(`  ... and ${problems.length - 20} more`);
    console.error("\nRun `node scripts/build-manifest.js` and commit the result.");
    process.exit(1);
  }
  console.log("\nGenerated files are in sync with content/.");
}

build();
if (CHECK) check();
