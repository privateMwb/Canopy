#!/usr/bin/env node
/**
 * validate-content.js
 *
 * Lints everything under content/categories/ so mistakes fail in CI instead of
 * showing up as a missing card, a hidden lesson or a duplicated page.
 *
 * ERRORS (exit code 1):
 *   - meta.json is not valid JSON, or a field has the wrong type/shape
 *   - a folder has BOTH a content.html and subfolders (the build ignores the
 *     content.html — the "shelf wins" rule — so the page silently disappears)
 *   - a leaf folder has no content.html (an empty card) and no meta.json "url"
 *   - content.html is empty or implausibly small
 *   - two siblings share a lesson number ("03-a" and "03-b") or a stage number
 *     ("stage-2.1-x" and "stage-2.1-y")
 *   - a folder name is not URL-hash safe (lowercase a-z, 0-9, ".", "-", "_")
 *   - a lesson links to a javascript: URL
 *   - a lesson contains a <script> tag or an inline event handler (onclick=...).
 *     The site opens lessons with document.write() in a same-origin window, so
 *     a script in a lesson would run with the site's full privileges.
 *
 * WARNINGS (printed, exit code 0):
 *   - unknown meta.json keys (usually typos)
 *   - two siblings share the same meta.json "order"
 *   - a lesson links to plain http://
 *
 * Usage:  node scripts/validate-content.js [contentDir]
 * API:    const { validateTree } = require("./validate-content");
 */

const fs = require("fs");
const path = require("path");

const DEFAULT_CONTENT_DIR = path.join(__dirname, "..", "content", "categories");

const KNOWN_META_KEYS = new Set([
  "title", "description", "accent", "accentEnd", "icon", "order", "updated", "compileRoot", "url",
]);
const HEX = /^#[0-9a-fA-F]{6}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9][a-z0-9._-]*$/;
const MIN_LESSON_BYTES = 200;

function readMeta(dir, rel, issues) {
  const file = path.join(dir, "meta.json");
  if (!fs.existsSync(file)) return {};
  let meta;
  try {
    meta = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    issues.errors.push(`${rel}/meta.json: invalid JSON (${e.message})`);
    return {};
  }
  if (meta === null || typeof meta !== "object" || Array.isArray(meta)) {
    issues.errors.push(`${rel}/meta.json: must be a JSON object`);
    return {};
  }
  const bad = (field, want) => issues.errors.push(`${rel}/meta.json: "${field}" must be ${want}`);
  for (const key of Object.keys(meta)) {
    if (!KNOWN_META_KEYS.has(key)) issues.warnings.push(`${rel}/meta.json: unknown key "${key}"`);
  }
  for (const f of ["title", "description", "icon"]) {
    if (f in meta && typeof meta[f] !== "string") bad(f, "a string");
  }
  for (const f of ["accent", "accentEnd"]) {
    if (f in meta && !(typeof meta[f] === "string" && HEX.test(meta[f]))) bad(f, "a #RRGGBB hex color");
  }
  if ("order" in meta && !(typeof meta.order === "number" && Number.isFinite(meta.order))) bad("order", "a number");
  if ("updated" in meta && !(typeof meta.updated === "string" && DATE.test(meta.updated))) bad("updated", "a YYYY-MM-DD date");
  if ("compileRoot" in meta && typeof meta.compileRoot !== "boolean") bad("compileRoot", "true or false");
  if ("url" in meta && !(typeof meta.url === "string" && /^https:\/\/\S+$/.test(meta.url))) bad("url", "an https:// URL");
  return meta;
}

function checkLessonHtml(file, rel, issues) {
  const html = fs.readFileSync(file, "utf8");
  if (Buffer.byteLength(html) < MIN_LESSON_BYTES) {
    issues.errors.push(`${rel}/content.html: only ${Buffer.byteLength(html)} bytes — is it empty?`);
    return;
  }
  // Only look inside real tags. Escaped examples ("&lt;a href=...&gt;" in a
  // code block, as security lessons show) are text, not links, and must not
  // be flagged. Comments, <script> and <style> bodies are skipped as well.
  const noComments = html.replace(/<!--[\s\S]*?-->/g, "");
  if (/<script\b/i.test(noComments)) {
    issues.errors.push(`${rel}/content.html: contains a <script> tag (lessons run same-origin; scripts are not allowed)`);
  }
  const markup = noComments.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "");
  for (const tag of markup.matchAll(/<[a-zA-Z][^>]*>/g)) {
    if (/\son[a-z]+\s*=/i.test(tag[0])) {
      issues.errors.push(`${rel}/content.html: inline event handler in <${tag[0].slice(1).split(/[\s>]/)[0]}> (not allowed)`);
    }
    for (const m of tag[0].matchAll(/\b(?:href|src)\s*=\s*["']\s*([^"']*)["']/gi)) {
      const url = m[1].trim().toLowerCase();
      if (url.startsWith("javascript:")) issues.errors.push(`${rel}/content.html: javascript: URL in a link`);
      else if (url.startsWith("http://")) issues.warnings.push(`${rel}/content.html: plain http:// link (${m[1].trim().slice(0, 60)})`);
    }
  }
}

function walk(dir, relParts, issues, stats) {
  const rel = relParts.join("/") || ".";
  const subdirs = fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  const meta = relParts.length ? readMeta(dir, rel, issues) : {};
  const contentFile = path.join(dir, "content.html");
  const hasContent = fs.existsSync(contentFile);

  if (relParts.length) {
    const name = relParts[relParts.length - 1];
    if (!SLUG.test(name)) {
      issues.errors.push(`${rel}: folder name "${name}" must be lowercase letters, digits, ".", "-" or "_"`);
    }
  }

  if (hasContent && subdirs.length > 0) {
    issues.errors.push(`${rel}: has content.html AND ${subdirs.length} subfolder(s) — the page is ignored by the build. Move it into its own folder or delete it`);
  }
  if (hasContent && subdirs.length === 0) {
    stats.lessons += 1;
    checkLessonHtml(contentFile, rel, issues);
  }
  if (!hasContent && subdirs.length === 0 && relParts.length > 0 && !meta.url) {
    issues.errors.push(`${rel}: empty folder — add a content.html (or a meta.json "url")`);
  }

  // Sibling checks: lesson numbers, stage numbers, order values.
  const byNumber = new Map();
  const byStage = new Map();
  const byOrder = new Map();
  for (const name of subdirs) {
    const num = /^(\d{2,})-/.exec(name);
    if (num) byNumber.set(num[1], [...(byNumber.get(num[1]) || []), name]);
    const stage = /^stage-(\d+\.\d+)-/.exec(name);
    if (stage) byStage.set(stage[1], [...(byStage.get(stage[1]) || []), name]);
    const childMetaFile = path.join(dir, name, "meta.json");
    if (fs.existsSync(childMetaFile)) {
      try {
        const o = JSON.parse(fs.readFileSync(childMetaFile, "utf8")).order;
        if (typeof o === "number") byOrder.set(o, [...(byOrder.get(o) || []), name]);
      } catch {
        /* reported when that folder is visited */
      }
    }
  }
  for (const [n, names] of byNumber) {
    if (names.length > 1) issues.errors.push(`${rel}: lessons share number ${n}: ${names.join(", ")}`);
  }
  for (const [n, names] of byStage) {
    if (names.length > 1) issues.errors.push(`${rel}: stages share number ${n}: ${names.join(", ")}`);
  }
  for (const [o, names] of byOrder) {
    if (names.length > 1) issues.warnings.push(`${rel}: siblings share order ${o}: ${names.join(", ")}`);
  }

  for (const name of subdirs.sort()) walk(path.join(dir, name), [...relParts, name], issues, stats);
}

function validateTree(contentDir = DEFAULT_CONTENT_DIR) {
  const issues = { errors: [], warnings: [] };
  const stats = { lessons: 0 };
  if (!fs.existsSync(contentDir)) {
    issues.errors.push(`content directory not found: ${contentDir}`);
    return { ...issues, ...stats };
  }
  walk(contentDir, [], issues, stats);
  return { ...issues, ...stats };
}

function main() {
  const dir = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_CONTENT_DIR;
  const result = validateTree(dir);
  for (const w of result.warnings) console.warn(`warning: ${w}`);
  for (const e of result.errors) console.error(`error:   ${e}`);
  console.log(
    `\nChecked ${result.lessons} lessons: ${result.errors.length} error(s), ${result.warnings.length} warning(s).`
  );
  process.exit(result.errors.length ? 1 : 0);
}

if (require.main === module) main();

module.exports = { validateTree };
