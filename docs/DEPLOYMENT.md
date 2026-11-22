# Deployment

The site is the `frontend/` folder. It needs no build step on the host, because the generated files are committed. All URLs are relative and routing uses the hash, so it works at a domain root or under a subpath (e.g. `https://user.github.io/Canopy/`).

## GitHub Pages (recommended)

The branch-based Pages option only serves `/` or `/docs`, so it can't serve `frontend/`. Use the workflow instead:

1. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`. `.github/workflows/deploy.yml` validates, checks the generated files are in sync, and publishes `frontend/`.
3. You can also run it manually from the **Actions** tab.

## Vercel

Import the repository and set **Root Directory** to `frontend`, with no build command and no output directory. `frontend/vercel.json` adds security headers and `no-cache` on `sw.js`, `version.json`, `manifest.json` and `site.json`.

## Any other static host

Publish the `frontend/` directory (Netlify, Cloudflare Pages, S3, nginx). Optionally send `Cache-Control: no-cache` for the four files above; the app also cache-busts them itself.

## Releases

1. Move the changelog's `[Unreleased]` entries under a new version heading, and make sure `package.json` has that version.
2. Write the release notes in `.github/releases/v<version>.md`.
3. Merge both through a pull request, then tag `main` and push the tag:

```bash
git checkout main && git pull
git tag v1.0.0 && git push origin v1.0.0
```

`release.yml` verifies the tree and creates a GitHub Release whose body is the notes file, with `canopy-site-<tag>.zip` (the contents of `frontend/`) attached. If no notes file exists for the tag, GitHub generates notes from the merged pull requests instead. A tag with a hyphen, such as `v0.2.0-rc.1`, is published as a pre-release.

## Recommended repository settings

These live on GitHub and aren't applied by the repository's files:

- Import both rulesets under **Settings → Rules → Rulesets → New ruleset → Import a ruleset**:
  - `.github/rulesets/main-protection.json` protects `main`: no deletion or force-push, changes go through a pull request, and the five required checks must pass.
  - `.github/rulesets/release-tags.json` protects `v*` release tags from deletion and from being moved.
  The required check names are job names from `.github/workflows/`; `tests/rulesets.test.js` fails if they drift apart.
- Enable **Private vulnerability reporting** under **Settings → Code security** (referenced by `SECURITY.md`).
- Enable Dependabot alerts.
