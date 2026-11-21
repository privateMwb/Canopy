# Contributing to Canopy

Issues and pull requests are welcome. This guide covers setup, what CI checks and how a change gets merged.

## Setting up

```bash
git clone https://github.com/privateMwb/Canopy.git
cd Canopy
npm ci
npm run serve     # http://localhost:8080
```

Requirements: Node.js 20+ (CI tests 20 and 22). There are no runtime dependencies; `npm ci` installs the linter only.

## The workflow

1. Create a branch from `main`.
2. Make your change (a lesson, a subject, or code).
3. Run `npm run build` if you touched anything under `content/` or `frontend/`, then `npm run verify`.
4. Open a pull request. CI runs on it; merge once everything passes.

## Checks to run locally

CI enforces all of these (`npm run verify` runs them together):

```bash
npm run validate   # content rules
npm run check      # generated files in sync with content/
npm run lint       # oxlint, warnings are errors in CI
npm test           # node:test suite
```

If `npm run check` fails, run `npm run build` and commit the changed files. The generated files are committed deliberately, so you will see `frontend/content/...` in your diff.

## Writing lessons

Read [docs/CONTENT.md](docs/CONTENT.md) first. The rules CI enforces:

- Folder names are lowercase letters, digits, `.`, `-`, `_`. Lessons are `NN-slug`, stages are `stage-X.Y-slug`.
- No two siblings share a lesson number or a stage number.
- A folder is either a page (`content.html`) or a shelf (subfolders), never both.
- Lessons must not contain `<script>` tags, inline `on...=` handlers or `javascript:` links. The site opens lessons same-origin, so they run with the site's privileges.
- Don't hand-edit anything under `frontend/content/` or `frontend/manifest.json`, the catalog between the `CATALOG` markers in `README.md`, or anything under `docs/catalog/` or `.github/assets/catalog/`; edit the source in `content/` (a subject's `meta.json` `title` / `description` feed the catalog) and rebuild.

## Code changes

Changes to `frontend/app.js`, `scripts/` or `.github/` are owned by the maintainer in [CODEOWNERS](.github/CODEOWNERS). Escape any text from `meta.json` with `escapeHtml` before putting it in HTML. Add or update tests in `tests/` for behaviour changes to the build or validator.

## Reporting security issues

Please don't open a public issue. See [SECURITY.md](SECURITY.md).
