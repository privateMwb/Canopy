# Changelog

All notable changes to Canopy are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Project documents: `LICENSE` (MIT), `CONTRIBUTING.md`, `SECURITY.md`, this changelog, and `docs/` (`CONTENT.md`, `ARCHITECTURE.md`, `DEPLOYMENT.md`). The README was rewritten.
- `scripts/validate-content.js` (`npm run validate`): checks `meta.json` shape, duplicate lesson and stage numbers, shelves that also hold a page, empty folders, tiny lesson files, and `<script>`, inline handlers and `javascript:` links in lessons.
- `node scripts/build-manifest.js --check` (`npm run check`): rebuilds into a temp copy and fails if the committed generated files are stale.
- Test suite in `tests/` (`node:test`) for the validator and the build script.
- `package.json` scripts (`build`, `check`, `validate`, `lint`, `test`, `serve`, `verify`) and an oxlint config (`.oxlintrc.json`).
- GitHub Actions: `build.yml` (sync check), `content.yml`, `lint.yml`, `test.yml` (Node 20 and 22), `codeql.yml`, `deploy.yml` (GitHub Pages), `release.yml` (tagged releases with the site zip).
- `.github/`: `dependabot.yml`, `CODEOWNERS`, banner, divider and back-to-top assets, and two rulesets: `main-protection.json` (pull requests plus five required checks) and `release-tags.json` (protects `v*` tags from deletion and moves). A test keeps the required check names in sync with the workflow job names.
- `.gitignore`, `.editorconfig`, `frontend/vercel.json` (security and cache headers).
- `scripts/build-catalog.js`: generates the library catalog from `manifest.json`. The README's "What's Inside" is five tappable category cards (generated into `.github/assets/catalog/`). Each opens a generated category page with a table of its subjects, and each subject opens a page with a Stage | Lessons table per level (`docs/catalog/`). It uses plain links and tables, no `<details>` fold-outs, so it renders the same in the GitHub mobile app. `npm run build` updates it and `npm run check` / CI fail if anything is stale.
- Optional category `tagline` in `meta.json` (up to 40 characters) for the card; the validator type-checks it and warns when it is too long.
- README redesigned to match the Shrtn format: animated banner, divider and back-to-top SVGs in `.github/assets/`, grouped CI badges, a Table of Contents, per-section back-to-top links, diagrams and callouts.
- A GitHub link in the site footer (`frontend/site.json`).

### Changed

- The content version in `version.json` is now a hash of file **contents** instead of paths, mtimes and sizes. It used to change on every fresh clone, which made the generated files impossible to verify in CI.
- The fallback site title in `app.js` is now "Canopy" (it said "Library").
- Deployment docs: GitHub Pages is deployed with an Actions workflow. The old README told readers to point Pages at the `frontend/` folder, which the branch-based option does not allow.

### Fixed

- Removed 41 duplicate folders in the Docker and Git subjects: 33 near-duplicate lessons (e.g. `03-buildkit-cache-mounts-and-build-secrets` next to `...-build-secrets`) and 8 older, shorter copies of whole stages. In each case the version with more content was kept. The site shipped 65 duplicate pages before.
- The lesson tab's loading placeholder wrote the lesson title into the page without escaping it; it is now escaped, and the error message is set as text.
- Lint cleanups in `app.js`, `icons.js`, `sw.template.js` and `build-manifest.js` (unused catch variables, an unused function, useless escapes).

### Removed

- Two stray `content.html` files in `machine-learning/intermediate` and `machine-learning/senior`. The build never rendered them because those folders have subfolders (the shelf wins). They remain in git history.
