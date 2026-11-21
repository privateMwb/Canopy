# Security Policy

## Supported versions

Canopy is a small, individually maintained project. Security fixes are made on the `main` branch and shipped in the next release; older releases are not patched.

| Version | Supported |
|---|:-:|
| `main` and the latest release | ✅ |
| Anything older | ❌ |

## Reporting a vulnerability

**Please do not report a suspected vulnerability in a public issue, pull request or discussion.** Use GitHub's private reporting so a fix can be prepared before the details are public:

1. Open this repository's **Security** tab.
2. Choose **Report a vulnerability**.
3. Describe the problem.

A useful report says what is affected (the frontend, the build script, a specific lesson, a workflow), how to reproduce it and what an attacker gains.

## What is in scope

- **Script execution via content.** The site opens each lesson in a new tab with `document.write()`, so a lesson runs same-origin with the site. Lessons must therefore be script-free; `scripts/validate-content.js` rejects `<script>`, inline event handlers and `javascript:` links, and CI enforces it. A way around that check is in scope.
- **HTML injection from `meta.json`** (titles, descriptions, URLs) into the page or the lesson tab. All such text is meant to go through `escapeHtml`.
- **Workflow and supply-chain issues** in `.github/` (token permissions, unpinned or untrusted actions).
- **Third-party loads.** The frontend loads JSZip (cdnjs, pinned version) and Google Fonts. Report anything that makes those a risk.

## What is out of scope

Factual mistakes in a lesson are not security issues; please open a normal issue. The same goes for reports that need a modified local copy of the site or a compromised browser.

## Handling

Reports are handled on a best-effort basis by a single maintainer. You will be told whether the report is accepted and, if so, credited in the release notes unless you prefer otherwise.
