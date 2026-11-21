#!/usr/bin/env node
/**
 * build-catalog.js
 *
 * Writes the "What's Inside" catalog into README.md, between the
 * <!-- CATALOG:START --> and <!-- CATALOG:END --> markers, from
 * frontend/manifest.json (so run it after build-manifest.js).
 *
 * The catalog is collapsed by default so the README stays short:
 *   category (click)  ->  subject (click)  ->  levels, stages and lessons
 * Titles and descriptions come from each folder's meta.json; edit those,
 * never the generated block.
 *
 * Run:    node scripts/build-catalog.js
 * Check:  node scripts/build-catalog.js --check   (exit 1 if README is stale)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const README = path.join(ROOT, "README.md");
const MANIFEST = path.join(ROOT, "frontend", "manifest.json");
const START = "<!-- CATALOG:START -->";
const END = "<!-- CATALOG:END -->";

const plural = (n, word) => `${n.toLocaleString("en-US")} ${word}${n === 1 ? "" : "s"}`;

// Text inside HTML (<summary>): escape the three characters that matter.
const html = (s) =>
  String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\s+/g, " ").trim();

// Text inside Markdown (list items): neutralise emphasis, links, tables and raw HTML.
const md = (s) =>
  String(s || "")
    .replace(/[\\`*_[\]|~]/g, "\\$&")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\s+/g, " ")
    .trim();

// One icon per category folder; anything else gets a generic folder.
const ICONS = {
  "computer-science": "💻",
  "programming-languages": "⌨️",
  "web-development": "🌐",
  "database-systems": "🗄️",
  "cloud-infrastructure": "☁️",
};

// Same flat style as the badges at the top of the README.
const badge = (label, value, color) =>
  `<img src="https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color}?style=for-the-badge&labelColor=0B1110" alt="${label}: ${value}">`;

// Lessons in a subject = pages with content, minus its curriculum overview page.
function lessonCount(subject) {
  const overview = (subject.children || []).filter((c) => c.slug === "curriculum" && c.hasContent).length;
  return Math.max(0, (subject.leafWithContent || 0) - overview);
}

function subjectBody(subject) {
  const out = [];
  const loose = [];
  for (const level of subject.children || []) {
    if (level.slug === "curriculum") continue;
    const stages = level.children || [];
    if (!stages.length) {
      if (level.hasContent) loose.push(level.title);
      continue;
    }
    out.push(`**${md(level.title)}**`, "");
    for (const stage of stages) {
      const lessons = (stage.children || []).filter((l) => l.hasContent).map((l) => md(l.title));
      if (lessons.length) out.push(`- **${md(stage.title)}** · ${lessons.join(" · ")}`);
      else if (stage.hasContent) out.push(`- ${md(stage.title)}`);
    }
    out.push("");
  }
  if (loose.length) out.push(loose.map(md).join(" · "), "");
  return out;
}

function renderSubject(subject) {
  const title = html(subject.title);
  const blurb = subject.description ? `<br><sub>${html(subject.description)}</sub>` : "";
  if (subject.url) {
    return [`- <a href="${html(subject.url)}"><b>${title}</b></a> ↗${blurb}`, ""];
  }
  const n = lessonCount(subject);
  const body = subjectBody(subject);
  if (!body.length) return [`- **${md(subject.title)}**${subject.description ? ` — ${md(subject.description)}` : ""}`, ""];
  return [
    "<details>",
    `<summary><b>${title}</b> <sub>· ${plural(n, "lesson")}</sub>${blurb}</summary>`,
    "",
    ...body,
    "</details>",
    "",
  ];
}

function renderCatalog(manifest) {
  const cats = manifest.categories || [];
  const subjects = cats.reduce((n, c) => n + (c.children || []).length, 0);
  const lessons = cats.reduce((n, c) => n + (c.children || []).reduce((m, s) => m + lessonCount(s), 0), 0);

  const out = [];
  out.push(
    '<p align="center">',
    `  ${badge("Categories", String(cats.length), "34D399")}`,
    `  ${badge("Subjects", subjects.toLocaleString("en-US"), "2DD4BF")}`,
    `  ${badge("Lessons", lessons.toLocaleString("en-US"), "A3E635")}`,
    "</p>",
    "",
    '<p align="center"><sub>Tap a category to explore</sub></p>',
    ""
  );
  for (const cat of cats) {
    const subs = cat.children || [];
    const n = subs.reduce((m, s) => m + lessonCount(s), 0);
    const icon = ICONS[cat.slug] || "📂";
    out.push(
      "<details>",
      `<summary><b>${icon} ${html(cat.title)}</b><br><sub>${plural(subs.length, "subject")} · ${plural(n, "lesson")}</sub></summary>`,
      ""
    );
    if (cat.description) out.push(`<sub>${html(cat.description)}</sub>`, "");
    for (const s of subs) out.push(...renderSubject(s));
    out.push("</details>", "");
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

function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const current = fs.readFileSync(README, "utf8");
  const next = inject(current, renderCatalog(manifest));
  if (process.argv.includes("--check")) {
    if (next !== current) {
      console.error("README.md catalog is out of date. Run `npm run build` and commit the result.");
      process.exit(1);
    }
    console.log("README.md catalog is up to date.");
    return;
  }
  if (next !== current) fs.writeFileSync(README, next);
  console.log(next === current ? "README.md catalog unchanged." : "README.md catalog updated.");
}

if (require.main === module) main();

module.exports = { renderCatalog, inject, lessonCount };
