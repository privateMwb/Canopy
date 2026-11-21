# Architecture

Canopy is a static site generated from a folder tree. There is no server and no framework.

```
content/categories/**         scripts/build-manifest.js            frontend/
  meta.json, content.html  ──►  scans, orders, colors, hashes  ──►  manifest.json  version.json
                                                                    sw.js  index.html (stamps)
                                                                    content/**/<lesson>.html
```

## The build (`scripts/build-manifest.js`)

1. Walks `content/categories/` recursively. Each folder becomes a node: `slug`, `title`, `description`, `accent`/`accentEnd`, `icon`, `url`, `hasContent`, `contentPath`, `updated`, `leafTotal`, `leafWithContent`, `compileRoot`, `children`.
2. Orders siblings by `meta.json` `order`, then alphabetically.
3. Applies the page-or-shelf rule: a folder with subfolders is a shelf, and its `content.html` is ignored with a warning.
4. Picks colors: `accent` from `meta.json`, else a level color (junior/intermediate/senior), else a category or subject gradient.
5. Copies each leaf `content.html` to `frontend/content/<path>.html`, after deleting the old copies so removed lessons don't linger.
6. Writes `manifest.json`, `version.json` and `sw.js` (from `sw.template.js`), and stamps `?v=<hash>` onto the CSS/JS tags in `index.html`.
7. `scripts/build-catalog.js` then renders the catalog from `manifest.json`: a card image per category (`.github/assets/catalog/<slug>.svg`) linked from the README's "What's Inside", a page per category (`docs/catalog/<category>.md`, a table of its subjects) and a page per subject (`docs/catalog/<category>/<subject>.md`, a Stage | Lessons table per level). It uses plain links and Markdown tables only, with no `<details>` fold-outs, so it renders the same on desktop and in the GitHub mobile app. `npm run build` runs both scripts, and `--check` verifies the README, the cards and the pages.

`--check` runs the same build into a temporary copy of `frontend/` and compares. It ignores each node's `updated` date and `builtAt`, which legitimately differ between machines. `scripts/validate-content.js` is separate and checks the source tree.

## Versioning and caching

- `version.json` holds a 10-character SHA-1 over every file's relative path and **contents** under `content/categories/`. It changes exactly when content changes.
- The app fetches `version.json` with `cache: "no-store"` and appends `?v=<version>` to the manifest, site config and lesson requests.
- The shell files (`styles.css`, `icons.js`, `app.js`) get their own hash stamped in `index.html`, so a redesign is never masked by a cached stylesheet.
- `sw.js` is network-first (`cache: "no-cache"`), falling back to its cache offline. The cache name is `learning-library-<version>` (legacy prefix), and older caches are deleted on activate.

## The frontend (`frontend/`)

- **Routing:** hash-based. `#/` is home and `#/path/<slug>/<slug>...` is a folder. No server rewrites are needed, and relative URLs work under a subpath.
- **Opening a lesson:** `window.open` is called synchronously in the click handler (avoids popup blockers), then the lesson HTML is fetched and written with `document.write`, with `data-theme` set to the current theme.
- **Search, A-Z bar, sorting:** client-side filters over the manifest.
- **Theme:** `localStorage` key `theme`, applied before first paint.
- **Progress:** `localStorage` key `canopy.progress.v1` (opened lessons and last position per subject); time estimates assume 15 minutes per lesson. Scroll positions use `sessionStorage` key `canopy-scroll`.
- **Zip download:** JSZip (cdnjs, pinned) builds the folder structure in the browser.

## Security model

Lessons run same-origin with the site because of `document.write`, so they are treated as trusted code. Two layers protect that: all `meta.json` text is escaped with `escapeHtml` before it reaches HTML, and the validator rejects scripts, inline handlers and `javascript:` links in lessons. See [SECURITY.md](../SECURITY.md).

## CI map

| Workflow | Job (required check) | Verifies |
|---|---|---|
| `build.yml` | Generated files in sync | `build-manifest.js --check` |
| `content.yml` | Validate content | `validate-content.js` |
| `lint.yml` | Lint (oxlint) | oxlint, warnings denied |
| `test.yml` | Unit tests (Node 20 / 22) | `node --test` |
| `codeql.yml` | Analyze (javascript-typescript) | CodeQL, also weekly |
| `deploy.yml` | n/a | validate, check, publish `frontend/` to Pages |
| `release.yml` | n/a | on `v*` tags: verify, zip site, create release |
