# Authoring guide

Everything the site shows comes from folders under `content/categories/`. This page covers the folder rules, `meta.json` and the lesson page format.

## Folder rules

```
content/categories/<category>/<subject>/<level>/<stage>/<lesson>/content.html
```

- A folder is **either a page** (has `content.html`, no subfolders) **or a shelf** (has subfolders). If it has both, the build ignores the page and the validator reports an error.
- Names use lowercase letters, digits, `.`, `-` and `_` (they become the URL hash).
- Lessons are named `NN-slug` and stages `stage-X.Y-slug`. No two siblings may share `NN` or `X.Y`.
- Siblings are ordered by `meta.json` `order` when present, otherwise alphabetically.
- Each subject has a `curriculum/` folder with a `content.html` (shown on the site) and a `curriculum.md` (a plain-text outline for authors; the build does not read it).

## meta.json

Optional everywhere. Without one, the folder name is title-cased.

| Field | Type | Meaning |
|---|---|---|
| `title` | string | Display name |
| `description` | string | Subtitle on the card |
| `order` | number | Sort position among siblings |
| `accent`, `accentEnd` | `#RRGGBB` | Card gradient colors (levels named junior/intermediate/senior get green/yellow/red automatically) |
| `icon` | string | Icon key from `frontend/icons.js` |
| `updated` | `YYYY-MM-DD` | Overrides the "updated" date (default: file modification time) |
| `compileRoot` | boolean | Adds a "download all as .zip" action on that folder |
| `url` | `https://...` | Makes the card an outbound link; no `content.html` needed |

Unknown keys are reported as warnings.

A category or subject's `title` and `description` also appear in the README catalog, so write the description as one short sentence about what the subject covers.

## Lesson page format

A lesson is one self-contained HTML file. Existing lessons share a skeleton you can copy from any file in `content/`:

- `<head>` with charset, viewport, `<title>`, Google Fonts link and one inline `<style>`.
- CSS variables on `:root` (`--bg`, `--card`, `--ink`, `--muted`, `--line`, `--accent`, `--accent-soft`, `--code-bg`, `--code-ink`).
- Dark mode in two blocks: `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ... } }` and `:root[data-theme="dark"] { ... }`. The site injects `data-theme` into `<html>` when it opens a lesson, so both blocks are needed.
- Body: `div.wrap` containing a `p.crumb`, `h1`, `p.lede`, `h2` sections (with `span.num`), `pre` code blocks, tables, and a closing `footer`.

**Not allowed:** `<script>`, inline event handlers (`onclick=`) and `javascript:` links. Lessons open same-origin with the site, so the validator rejects them. Show code samples as escaped text (`&lt;script&gt;`) inside `<pre>`.

## Workflows

**Add a lesson:** create `NN-slug/content.html` (and a `meta.json`) in the right stage folder, then `npm run build`.

**Add a stage, level or subject:** create the folders, add a `meta.json` with a title and `order`, add lessons, rebuild.

**Add a category:** create `content/categories/<name>/` with a `meta.json`; subjects go inside.

Finish with `npm run verify`.

## Validator messages

| Message | Fix |
|---|---|
| `lessons share number 03` | Two folders start with `03-`; delete or renumber one |
| `stages share number 2.1` | Two `stage-2.1-*` folders; merge or delete one |
| `has content.html AND N subfolder(s)` | Move the page into its own folder (like `curriculum/`) or delete it |
| `empty folder` | Add a `content.html` or a `meta.json` `url` |
| `contains a <script> tag` / `inline event handler` | Remove it; use escaped text for examples |
