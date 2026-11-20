# Library

A self-updating site: add a folder, run one script, it shows up on the page. No frontend code to touch when you add new content.

## How it works

```
content/
  categories/
    machine-learning/          <- a category (folder name auto-detected)
      meta.json                <- optional: title, description, accent color
    programming-languages/
      python/                  <- a subject inside that category
        meta.json
      javascript/
        meta.json

frontend/
  index.html / styles.css / app.js   <- reads manifest.json, renders cards
  manifest.json                       <- auto-generated, do not hand-edit

scripts/
  build-manifest.js            <- scans content/categories/, writes manifest.json
```

**Adding a new category or subject:** make a new folder under `content/categories/` (or inside an existing category for a subject). Optionally drop a `meta.json` in it:

```json
{
  "title": "Rust",
  "description": "Ownership, borrowing, and zero-cost abstractions.",
  "accent": "#B7410E"
}
```

No `meta.json`? The folder name is auto-titled (`machine-learning` → "Machine Learning") and given a color from a fixed palette. Either way, run:

```bash
node scripts/build-manifest.js
```

That's it — `frontend/manifest.json` is rewritten, and the next time the site loads, your new folder appears.

## Running locally

No build step, no dependencies. From `frontend/`:

```bash
cd frontend
python3 -m http.server 8080
# visit http://localhost:8080
```

(Any static server works — `npx serve`, VS Code's Live Server, etc.)

## Deploying

### GitHub Pages
1. Push this repo to GitHub.
2. Settings → Pages → set source to the `frontend/` folder on your main branch.
3. Done — it auto-deploys on every push.

### Vercel
1. Push this repo to GitHub.
2. Import it in Vercel.
3. Set **Root Directory** to `frontend`, leave Build Command empty (static site, no build step).
4. Deploy — auto-redeploys on every push.

Either works fine for this project as-is. If you later want the manifest to rebuild automatically on deploy (instead of running the script by hand before each push), add `node scripts/build-manifest.js` as a pre-deploy step — ask if you want that wired up.
