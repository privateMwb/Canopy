#!/usr/bin/env node
/**
 * build-catalog.js
 *
 * Generates the library catalog from frontend/manifest.json (so run it after
 * build-manifest.js):
 *
 *   README.md                       the "What's Inside" block: five category cards
 *                                   (between the CATALOG markers), each a link
 *   .github/assets/catalog/*.svg    one card image per category
 *   docs/catalog/<category>.md      a category page: its subjects in a table
 *   docs/catalog/<category>/<subject>.md
 *                                   a subject page: a Stage | Lessons table per level
 *
 * Plain links and Markdown tables only, no <details> fold-outs, so it renders
 * the same on desktop and in the GitHub mobile app. Titles, taglines and
 * descriptions come from each folder's meta.json; edit those, never the
 * generated output.
 *
 * Run:    node scripts/build-catalog.js
 * Check:  node scripts/build-catalog.js --check   (exit 1 if anything is stale)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const README = path.join(ROOT, "README.md");
const MANIFEST = path.join(ROOT, "frontend", "manifest.json");
const CARD_DIR = path.join(ROOT, ".github", "assets", "catalog");
const CARD_URL = ".github/assets/catalog";
const PAGE_DIR = path.join(ROOT, "docs", "catalog");
const PAGE_URL = "docs/catalog";
const START = "<!-- CATALOG:START -->";
const END = "<!-- CATALOG:END -->";

const LEVEL_EMOJI = { junior: "🟢", intermediate: "🟡", senior: "🔴" };
const PALETTE = ["#4ADE80", "#A3E635", "#2DD4BF", "#22D3EE", "#34D399"];
const BG0 = "#0B1110";
const BG1 = "#101716";
const BORDER = "#1F2D2A";
const SOFT = "#B7C6C1";
const INK = "#F4F1EA";
const SANS = "Helvetica, Arial, 'Segoe UI', sans-serif";

const plural = (n, word) => `${n.toLocaleString("en-US")} ${word}${n === 1 ? "" : "s"}`;

// Text inside HTML (<summary>, attributes): escape the characters that matter.
const html = (s) =>
  String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\s+/g, " ")
    .trim();

// Text inside Markdown: neutralise emphasis, links, tables and raw HTML.
const md = (s) =>
  String(s || "")
    .replace(/[\\`*_[\]|~]/g, "\\$&")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\s+/g, " ")
    .trim();

// A lesson title as an inline-code "chip". Backticks would end the code span
// and pipes would end the table cell, so neutralise both.
const chip = (s) => "`" + String(s || "").replace(/`/g, "'").replace(/\|/g, "\\|").replace(/\s+/g, " ").trim() + "`";

// Lessons in a subject = pages with content, minus its curriculum overview page.
function lessonCount(subject) {
  const overview = (subject.children || []).filter((c) => c.slug === "curriculum" && c.hasContent).length;
  return Math.max(0, (subject.leafWithContent || 0) - overview);
}

const categoryLessons = (cat) => (cat.children || []).reduce((n, s) => n + lessonCount(s), 0);

// ---------------------------------------------------------------- card images

function icon(slug, col) {
  const s = `fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  switch (slug) {
    case "computer-science":
      return `<g ${s}><rect x="-9" y="-9" width="18" height="18" rx="3"/><rect x="-4" y="-4" width="8" height="8" rx="1"/><path d="M-5-13v4M0-13v4M5-13v4M-5 9v4M0 9v4M5 9v4M-13-5h4M-13 0h4M-13 5h4M9-5h4M9 0h4M9 5h4"/></g>`;
    case "programming-languages":
      return `<g ${s}><path d="M-6-8L-14 0L-6 8M6-8L14 0L6 8M2-11L-2 11"/></g>`;
    case "web-development":
      return `<g ${s}><circle r="12"/><ellipse rx="5.5" ry="12"/><path d="M-12 0H12M-10-6H10M-10 6H10"/></g>`;
    case "database-systems":
      return `<g ${s}><ellipse cy="-8" rx="11" ry="4"/><path d="M-11-8V8C-11 11 -6 13 0 13S11 11 11 8V-8"/><path d="M-11 0C-11 3 -6 5 0 5S11 3 11 0"/></g>`;
    case "cloud-infrastructure":
      return `<g ${s}><path d="M-9 8a6 6 0 0 1-1-12 8 8 0 0 1 15-1 6 6 0 0 1 2 13z"/></g>`;
    default: // a generic folder
      return `<g ${s}><path d="M-13-8h9l3 4h14v15h-26z"/></g>`;
  }
}

function cardSvg(cat, index) {
  const col = PALETTE[index % PALETTE.length];
  const subjects = (cat.children || []).length;
  const lessons = categoryLessons(cat);
  const title = html(cat.title);
  const tagline = html(cat.tagline);
  const sLabel = plural(subjects, "subject");
  const lLabel = plural(lessons, "lesson");
  const w1 = Math.round(24 + sLabel.length * 5.8);
  const w2 = Math.round(24 + lLabel.length * 5.8);
  const titleY = tagline ? 44 : 52;
  const pillY = tagline ? 76 : 70;
  return `<svg width="420" height="112" viewBox="0 0 420 112" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}: ${sLabel}, ${lLabel}">
  <defs>
    <linearGradient id="p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#111A18"/><stop offset="1" stop-color="${BG0}"/></linearGradient>
    <radialGradient id="g" cx="0.12" cy="0.5" r="0.6"><stop offset="0" stop-color="${col}" stop-opacity="0.16"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect x="1" y="1" width="418" height="110" rx="18" fill="url(#p)" stroke="${BORDER}" stroke-width="1.5"/>
  <rect x="1" y="1" width="418" height="110" rx="18" fill="url(#g)"/>
  <rect x="1.75" y="22" width="4" height="68" rx="2" fill="${col}"/>
  <path d="M388 47 L398 56 L388 65" fill="none" stroke="${col}" stroke-opacity="0.8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="22" y="24" width="64" height="64" rx="16" fill="${BG0}" stroke="${col}" stroke-opacity="0.55" stroke-width="1.5"/>
  <g transform="translate(54 56)">${icon(cat.slug, col)}</g>
  <text x="106" y="${titleY}" font-family="${SANS}" font-size="20" font-weight="700" fill="${INK}">${title}</text>${
    tagline ? `\n  <text x="106" y="64" font-family="${SANS}" font-size="13" fill="${SOFT}">${tagline}</text>` : ""
  }
  <rect x="106" y="${pillY}" width="${w1}" height="22" rx="11" fill="${BG1}" stroke="${BORDER}"/>
  <text x="${106 + w1 / 2}" y="${pillY + 15}" text-anchor="middle" font-family="${SANS}" font-size="12" font-weight="600" fill="${col}">${sLabel}</text>
  <rect x="${114 + w1}" y="${pillY}" width="${w2}" height="22" rx="11" fill="${BG1}" stroke="${BORDER}"/>
  <text x="${114 + w1 + w2 / 2}" y="${pillY + 15}" text-anchor="middle" font-family="${SANS}" font-size="12" font-weight="600" fill="${col}">${lLabel}</text>
</svg>
`;
}

// file name -> svg text, for every category
function renderCards(manifest) {
  const out = new Map();
  (manifest.categories || []).forEach((cat, i) => out.set(`${cat.slug}.svg`, cardSvg(cat, i)));
  return out;
}

// ---------------------------------------------------------------- markdown

const badge = (label, value, color) =>
  `<img src="https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color}?style=for-the-badge&labelColor=0B1110" alt="${label}: ${value}">`;

// "Stage 1.1 — Core Data Structures" -> bold number over the name
function stageCell(title) {
  const m = /^Stage\s+([\d.]+)\s*[—–-]\s*(.+)$/.exec(String(title || "").trim());
  return m ? `**${md(m[1])}**<br>${md(m[2])}` : md(title);
}

// A subject has a page when it has levels with lessons in them.
function subjectHasPage(subject) {
  return !subject.url && subjectSections(subject).length > 0;
}

function subjectSections(subject) {
  const sections = [];
  const loose = [];
  for (const level of subject.children || []) {
    if (level.slug === "curriculum") continue;
    const stages = level.children || [];
    if (!stages.length) {
      if (level.hasContent) loose.push(level.title);
      continue;
    }
    const rows = [];
    for (const stage of stages) {
      const lessons = (stage.children || []).filter((l) => l.hasContent).map((l) => chip(l.title));
      if (lessons.length || stage.hasContent) rows.push(`| ${stageCell(stage.title)} | ${lessons.join(" ")} |`);
    }
    if (rows.length) {
      const emoji = LEVEL_EMOJI[level.slug];
      sections.push({ heading: `${emoji ? `${emoji} ` : ""}${md(level.title)}`, lines: ["| Stage | Lessons |", "|:--|:--|", ...rows] });
    }
  }
  if (loose.length) sections.push({ heading: "Lessons", lines: [loose.map(chip).join(" ")] });
  return sections;
}

function stageCount(subject) {
  return (subject.children || [])
    .filter((l) => l.slug !== "curriculum")
    .reduce((n, level) => n + (level.children || []).length, 0);
}

function levelCount(subject) {
  return (subject.children || []).filter((l) => l.slug !== "curriculum" && (l.children || []).length).length;
}

function renderSubjectPage(cat, subject) {
  const out = [];
  out.push(`[← ${md(cat.title)}](../${cat.slug}.md)`, "", `# ${md(subject.title)}`, "");
  if (subject.description) out.push(md(subject.description), "");
  const facts = [`**${plural(lessonCount(subject), "lesson")}**`];
  const lv = levelCount(subject);
  const st = stageCount(subject);
  if (lv) facts.push(plural(lv, "level"));
  if (st) facts.push(plural(st, "stage"));
  out.push(facts.join(" · "), "");
  for (const sec of subjectSections(subject)) out.push(`## ${sec.heading}`, "", ...sec.lines, "");
  out.push("---", "", `[← ${md(cat.title)}](../${cat.slug}.md) · [Back to Canopy](../../../README.md#whats-inside)`);
  return out.join("\n") + "\n";
}

function renderCategoryPage(cat) {
  const subs = cat.children || [];
  const out = [];
  out.push("[← What's Inside](../../README.md#whats-inside)", "", `# ${md(cat.title)}`, "");
  if (cat.tagline) out.push(`*${md(cat.tagline)}*`, "");
  if (cat.description) out.push(md(cat.description), "");
  out.push(`**${plural(subs.length, "subject")}** · **${plural(categoryLessons(cat), "lesson")}**`, "");
  out.push("| Subject | What it covers | Lessons |", "|:--|:--|--:|");
  for (const s of subs) {
    const name = subjectHasPage(s)
      ? `[**${md(s.title)}**](${cat.slug}/${s.slug}.md)`
      : s.url
        ? `[**${md(s.title)}**](${html(s.url)}) ↗`
        : `**${md(s.title)}**`;
    out.push(`| ${name} | ${md(s.description)} | ${lessonCount(s)} |`);
  }
  out.push("", "---", "", "[Back to Canopy](../../README.md#whats-inside)");
  return out.join("\n") + "\n";
}

// relative path (under docs/catalog) -> markdown, for every category and subject
function renderPages(manifest) {
  const pages = new Map();
  for (const cat of manifest.categories || []) {
    pages.set(`${cat.slug}.md`, renderCategoryPage(cat));
    for (const s of cat.children || []) {
      if (subjectHasPage(s)) pages.set(`${cat.slug}/${s.slug}.md`, renderSubjectPage(cat, s));
    }
  }
  return pages;
}

function renderCatalog(manifest) {
  const cats = manifest.categories || [];
  const subjects = cats.reduce((n, c) => n + (c.children || []).length, 0);
  const lessons = cats.reduce((n, c) => n + categoryLessons(c), 0);

  const out = [];
  out.push(
    '<p align="center">',
    `  ${badge("Categories", String(cats.length), "34D399")}`,
    `  ${badge("Subjects", subjects.toLocaleString("en-US"), "2DD4BF")}`,
    `  ${badge("Lessons", lessons.toLocaleString("en-US"), "A3E635")}`,
    "</p>",
    "",
    '<p align="center"><sub>Tap a category to browse its subjects</sub></p>',
    ""
  );
  for (const cat of cats) {
    const alt = `${html(cat.title)}: ${plural((cat.children || []).length, "subject")}, ${plural(categoryLessons(cat), "lesson")}`;
    out.push(
      '<p align="center">',
      `  <a href="${PAGE_URL}/${cat.slug}.md"><img src="${CARD_URL}/${cat.slug}.svg" alt="${alt}" width="420"></a>`,
      "</p>",
      ""
    );
  }
  return out.join("\n").trimEnd();
}

function inject(readme, block) {
  const a = readme.indexOf(START);
  const b = readme.indexOf(END);
  if (a === -1 || b === -1 || b < a) {
    throw new Error(`README.md must contain ${START} and ${END} (in that order)`);
  }
  return `${readme.slice(0, a + START.length)}\n${block}\n${readme.slice(b)}`;
}

// ---------------------------------------------------------------- CLI

function listFiles(dir, ext, base = dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) listFiles(full, ext, base, acc);
    else if (e.name.endsWith(ext)) acc.push(path.relative(base, full).split(path.sep).join("/"));
  }
  return acc.sort();
}

// Compare a generated set of files against a directory; returns the problems found.
function diffFiles(label, dir, ext, expected) {
  const problems = [];
  for (const [file, text] of expected) {
    const p = path.join(dir, file);
    if (!fs.existsSync(p)) problems.push(`${label}/${file} is missing`);
    else if (fs.readFileSync(p, "utf8") !== text) problems.push(`${label}/${file} is out of date`);
  }
  for (const file of listFiles(dir, ext)) if (!expected.has(file)) problems.push(`${label}/${file} is stale (no such category or subject)`);
  return problems;
}

function writeFiles(dir, ext, expected) {
  for (const [file, text] of expected) {
    const p = path.join(dir, file);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, text);
  }
  for (const file of listFiles(dir, ext)) if (!expected.has(file)) fs.rmSync(path.join(dir, file));
  // drop directories left empty by removed subjects
  if (fs.existsSync(dir)) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const sub = path.join(dir, e.name);
      if (e.isDirectory() && fs.readdirSync(sub).length === 0) fs.rmdirSync(sub);
    }
  }
}

function main() {
  const check = process.argv.includes("--check");
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const current = fs.readFileSync(README, "utf8");
  const nextReadme = inject(current, renderCatalog(manifest));
  const cards = renderCards(manifest);
  const pages = renderPages(manifest);

  const problems = [];
  if (nextReadme !== current) problems.push("README.md catalog is out of date");
  problems.push(...diffFiles(".github/assets/catalog", CARD_DIR, ".svg", cards));
  problems.push(...diffFiles("docs/catalog", PAGE_DIR, ".md", pages));

  if (check) {
    if (problems.length) {
      console.error(problems.slice(0, 20).map((p) => `  - ${p}`).join("\n"));
      if (problems.length > 20) console.error(`  ... and ${problems.length - 20} more`);
      console.error("\nRun `npm run build` and commit the result.");
      process.exit(1);
    }
    console.log("README catalog, category cards and catalog pages are up to date.");
    return;
  }

  writeFiles(CARD_DIR, ".svg", cards);
  writeFiles(PAGE_DIR, ".md", pages);
  if (nextReadme !== current) fs.writeFileSync(README, nextReadme);
  console.log(problems.length ? "README catalog, category cards and catalog pages updated." : "README catalog, category cards and catalog pages unchanged.");
}

if (require.main === module) main();

module.exports = { renderCatalog, renderCards, renderPages, inject, lessonCount };
