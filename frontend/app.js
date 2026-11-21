const app = document.getElementById("app");
const azSidebar = document.getElementById("az-sidebar");
const searchInput = document.getElementById("search-input");
const siteTitleEl = document.getElementById("site-title");
const siteFooterEl = document.getElementById("site-footer");
const themeToggle = document.getElementById("theme-toggle");

function currentTheme() {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeToggleState() {
  const t = currentTheme();
  themeToggle.setAttribute("data-current", t);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", t === "dark" ? "#0C1110" : "#F4F1EA");
}

themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // private browsing / storage disabled — theme just won't persist across reloads
  }
  applyThemeToggleState();
  route(); // re-render so an open lesson's embedded theme updates immediately too
});

// If the person never picked a theme, keep following the system setting live.
try {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch {}
    if (saved !== "light" && saved !== "dark") {
      document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      applyThemeToggleState();
    }
  });
} catch {}

applyThemeToggleState();

let MANIFEST = null;
let SITE = { title: "Canopy", description: "", footer: {} };
let VERSION = "";
let activeLetter = null;
let searchQuery = "";
let alphaSort = false; // false = manifest/order-defined sequence, true = forced A-Z

// In-memory cache of fetched lesson content, keyed by contentPath — each
// lesson is only ever fetched once per page load, regardless of how many
// times you navigate back to it.
const contentCache = new Map();

async function loadData() {
  // version.json is tiny and always fetched fresh — it's the thing that
  // tells us whether anything else needs busting out of cache.
  try {
    const versionRes = await fetch("version.json", { cache: "no-store" });
    if (versionRes.ok) {
      const v = await versionRes.json();
      VERSION = v.version || "";
    }
  } catch {
    VERSION = ""; // fine — just means no cache-busting this load
  }

  const [manifestRes, siteRes] = await Promise.all([
    fetch(withVersion("manifest.json")),
    fetch(withVersion("site.json")).catch(() => null),
  ]);
  MANIFEST = await manifestRes.json();
  if (siteRes && siteRes.ok) {
    SITE = await siteRes.json();
  }
  siteTitleEl.textContent = SITE.title;
  document.title = SITE.title;
  renderFooter();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {
      // fine if this fails (e.g. sandboxed preview, unsupported browser) — just no offline fallback
    });
  }
}

function withVersion(url) {
  if (!VERSION) return url;
  return url + (url.includes("?") ? "&" : "?") + "v=" + VERSION;
}

// Opens a lesson in a real new tab instead of embedding it inline.
// window.open() is called FIRST, synchronously, inside the click handler —
// before any async fetch — so browsers don't treat it as a blocked popup.
// The tab then gets filled in once the content (likely already cached)
// resolves.
async function openLessonInNewTab(node) {
  const newWin = window.open("", "_blank");
  if (newWin) {
    newWin.document.write(
      `<title>${escapeHtml(node.title)}</title><p style="font-family:sans-serif;padding:48px;color:#666">Loading “${escapeHtml(node.title)}”…</p>`
    );
  }
  try {
    const html = await fetchLeafContent(node);
    const themed = html.replace(/<html([^>]*)>/i, (m, attrs) => {
      const cleaned = attrs.replace(/\sdata-theme="[^"]*"/i, "");
      return `<html${cleaned} data-theme="${currentTheme()}">`;
    });
    if (newWin) {
      newWin.document.open();
      newWin.document.write(themed);
      newWin.document.close();
    }
  } catch (err) {
    if (newWin) {
      newWin.document.body.textContent = `Could not load this lesson — ${err.message || err}`;
    }
  }
}

async function fetchLeafContent(node) {
  if (!node.contentPath) return null;
  if (contentCache.has(node.contentPath)) return contentCache.get(node.contentPath);
  const res = await fetch(withVersion(node.contentPath));
  if (!res.ok) throw new Error(`Could not load ${node.contentPath} (${res.status})`);
  const text = await res.text();
  contentCache.set(node.contentPath, text);
  return text;
}

function renderFooter() {
  const f = SITE.footer || {};
  const linksHtml = (f.links || [])
    .map((l) => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`)
    .join(" · ");
  siteFooterEl.innerHTML = `
    ${LOGO_SVG("foot-mark")}
    ${f.tagline ? `<p>${escapeHtml(f.tagline)}</p>` : ""}
    ${linksHtml ? `<p class="mono">${linksHtml}</p>` : ""}
  `;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function findNode(path) {
  let nodes = MANIFEST.categories;
  let node = null;
  for (const slug of path) {
    node = nodes.find((n) => n.slug === slug);
    if (!node) return null;
    nodes = node.children;
  }
  return node;
}

// ---------- design helpers ----------
// These pairs must match the role gradients in scripts/build-manifest.js.
const TONES = {
  brand: ["#0F766E", "#34D399"],      // categories
  subject: ["#1D4ED8", "#60A5FA"],    // subjects
  curriculum: ["#6D28D9", "#C084FC"], // curriculum roadmap
};
const LEVEL_PAIRS = [["#86EFAC", "#15803D"], ["#FEF08A", "#A16207"], ["#FCA5A5", "#B91C1C"]];
const LEVEL_RE = /^(junior|intermediate|senior|beginner|advanced|expert)\b/i;
const AZ_MIN = 2; // the A-Z bar shows on any shelf of subjects/topics with 2+ items

// Subjects that have their own bespoke design (see [data-subject] in styles.css).
const SUBJECT_THEMES = new Set([
  "python", "javascript", "java", "csharp", "cpp",
  "data-structures-algorithms", "operating-systems", "networking", "computer-architecture", "linux-devops",
  "sql-and-relational-databases", "security", "software-engineering-practice", "compilers-language-implementation", "machine-learning",
  "html-and-semantic-markup", "css-and-responsive-layout", "browser-javascript-and-the-dom", "react-and-modern-frontend",
  "full-stack-frameworks", "backend-and-apis", "web-performance", "web-accessibility",
  "mongodb", "postgresql", "firebase", "redis", "sqlite", "git", "docker", "kubernetes", "terraform", "aws",
]);
function themedSubject(path) {
  if (!path || path.length < 2) return "";
  return SUBJECT_THEMES.has(path[1]) ? path[1] : "default";
}

// Stages, levels, curriculum and lesson lists are ordered sequences, so A-Z
// jumping makes no sense there. Everything else (categories, subjects) gets it.
function isSequence(nodes) {
  return nodes.every((n) => n.hasContent || isCurriculum(n) || splitStage(n.title) || LEVEL_RE.test(n.title));
}

const I_ARROW = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const I_OUT = '<svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>';
const I_DOWN = '<svg viewBox="0 0 24 24"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>';
const I_CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

function LOGO_SVG(cls) {
  return `<svg class="logo-mark ${cls || ""}" viewBox="0 0 32 32" aria-hidden="true"><path class="lm-t" d="M16 3.5c5.2 3.6 5.2 9.6 0 13-5.2-3.4-5.2-9.4 0-13z"/><path class="lm-t" d="M16 24c-7 0-10.5-3.6-10.5-8.6 6.8 0 10.5 3.2 10.5 8.6z"/><path class="lm-t" d="M16 22c0-5.6 3.8-8.6 10.5-8.6 0 5-3.5 8.6-10.5 8.6z"/><path class="lm-a" d="M16 28.5V12"/></svg>`;
}

function splitStage(title) {
  const m = /^Stage\s+([\d.]+)\s*[—–-]\s*(.+)$/.exec(title || "");
  return m ? { num: m[1], name: m[2] } : null;
}

function isCurriculum(n) { return /^curriculum$/i.test(n.title || ""); }

// Real lessons under a node (the roadmap page itself isn't a lesson).
function lessonCount(n) {
  if (n._lc !== undefined) return n._lc;
  if (!n.children || n.children.length === 0) {
    n._lc = n.hasContent && !isCurriculum(n) ? 1 : 0;
  } else {
    n._lc = n.children.reduce((s, c) => s + lessonCount(c), 0);
  }
  return n._lc;
}

function unitFor(item, depth) {
  const ch = item.children || [];
  if (!ch.length) return null;
  if (ch.every((c) => c.hasContent && !isCurriculum(c))) return { one: "lesson", many: "lessons", n: ch.length, isLessons: true };
  if (ch.every((c) => isCurriculum(c) || splitStage(c.title))) {
    return { one: "stage", many: "stages", n: ch.filter((c) => splitStage(c.title)).length };
  }
  if (ch.some((c) => LEVEL_RE.test(c.title))) {
    return { one: "level", many: "levels", n: ch.filter((c) => LEVEL_RE.test(c.title)).length };
  }
  return depth === 0 ? { one: "subject", many: "subjects", n: ch.length } : { one: "topic", many: "topics", n: ch.length };
}

function countsHtml(item, depth) {
  const u = unitFor(item, depth);
  if (!u) return `<span class="card-count">leaf node</span>`;
  const parts = [`<b>${u.n}</b> ${u.n === 1 ? u.one : u.many}`];
  const lessons = lessonCount(item);
  if (!u.isLessons && lessons > 0) parts.push(`<b>${lessons}</b> ${lessons === 1 ? "lesson" : "lessons"}`);
  return `<span class="card-count">${parts.join(" · ")}</span>`;
}

function chipsHtml(item, depth) {
  const u = unitFor(item, depth);
  const chips = [];
  if (u) chips.push(`<span class="chip"><b>${u.n}</b> ${u.n === 1 ? u.one : u.many}</span>`);
  const lessons = lessonCount(item);
  if (lessons > 0 && !(u && u.isLessons)) chips.push(`<span class="chip"><b>${lessons}</b> ${lessons === 1 ? "lesson" : "lessons"}</span>`);
  return chips.length ? `<div class="chips">${chips.join("")}</div>` : "";
}

function toneOf(item) {
  for (const [name, pair] of Object.entries(TONES)) {
    if (item.accent === pair[0] && item.accentEnd === pair[1]) return name;
  }
  if (LEVEL_PAIRS.some((p) => p[0] === item.accent && p[1] === item.accentEnd)) return "level";
  return "custom";
}

// Category / subject / curriculum cards take their colors from the theme (so dark mode can
// brighten them); level and custom cards carry their own colors inline.
function toneAttrs(item, idx) {
  const tone = toneOf(item);
  const stagger = `--i:${Math.min(idx || 0, 12)}`;
  const own = tone in TONES ? "" : `;--card-accent:${item.accent};--card-accent-end:${item.accentEnd || item.accent}`;
  const subj = SUBJECT_THEMES.has(item.slug) && tone === "subject" ? ` data-subject="${item.slug}"` : "";
  return `data-tone="${tone}"${subj} data-slug="${escapeHtml(item.slug || "")}" style="${stagger}${own}"`;
}

function breadcrumbHtml(path) {
  if (path.length === 0) return "";
  const parts = [`<a href="#/">Library</a>`];
  for (let i = 0; i < path.length - 1; i++) {
    const sub = path.slice(0, i + 1);
    const n = findNode(sub);
    parts.push(`<a href="#/path/${sub.join("/")}">${escapeHtml(n ? n.title : sub[i])}</a>`);
  }
  return `<nav class="crumbs" aria-label="Breadcrumb">${parts.join(I_CHEV)}</nav>`;
}

function cardHtml(item, parentPath, idx, depth) {
  const hasChildren = item.children && item.children.length > 0;
  const isLink = !!item.url;
  const isEmbedded = !!item.hasContent && !hasChildren;
  const fullPath = [...parentPath, item.slug].join("/");
  const attrs = toneAttrs(item, idx);

  // Icon: a numbered badge for stages (with a generated mark from the stage
  // name), otherwise a keyword/generated icon.
  const stage = splitStage(item.title);
  const picked = CanopyIcons.pick(stage ? { title: stage.name, slug: item.slug } : item);
  const tile = stage
    ? `<span class="card-icon badge">${escapeHtml(stage.num)}</span>`
    : `<span class="card-icon">${CanopyIcons.svg(picked.inner)}</span>`;
  const mark = `<span class="card-art" aria-hidden="true"><i></i></span><span class="card-mark" aria-hidden="true">${CanopyIcons.svg(picked.inner)}</span>`;
  const title = stage ? stage.name : item.title;
  const body = `
    <div class="card-head">${tile}</div>
    <p class="card-title">${escapeHtml(title)}</p>
    <p class="card-desc">${escapeHtml(item.description || "")}</p>`;
  const go = (svg) => `<span class="card-go">${svg}</span>`;

  if (hasChildren && item.compileRoot && item.leafWithContent > 0) {
    return `
      <a class="card" href="#/path/${fullPath}" ${attrs}>
        ${mark}${body}
        <div class="card-foot">
          ${countsHtml(item, depth)}
          <button class="card-zip-inline" data-zip-path="${fullPath}" type="button" title="Download as .zip">${I_DOWN.replace("<svg", '<svg aria-hidden="true"')}ZIP</button>
        </div>
      </a>`;
  }

  if (isEmbedded) {
    // Opens in a new tab. href points at the real static file for the deployed
    // site (works with zero JS, middle-click, etc.); the click handler also
    // supports the preview sandbox, where that file isn't a servable URL.
    return `
      <a class="card" href="${item.contentPath ? escapeHtml(item.contentPath) : "#"}" target="_blank" rel="noopener" data-open-path="${fullPath}" ${attrs}>
        ${mark}${body}
        <div class="card-foot"><span class="card-count">${isCurriculum(item) ? "full roadmap · new tab" : "open in new tab"}</span>${go(I_OUT)}</div>
      </a>`;
  }

  const href = isLink ? escapeHtml(item.url) : `#/path/${fullPath}`;
  const extra = isLink ? `target="_blank" rel="noopener"` : "";
  return `
    <a class="card" href="${href}" ${extra} ${attrs}>
      ${mark}${body}
      <div class="card-foot">${isLink ? `<span class="card-count">external link</span>` : countsHtml(item, depth)}${go(isLink ? I_OUT : I_ARROW)}</div>
    </a>`;
}


// ---------- Subject page extras: progress, start helper, outcomes, related ----------
const PROGRESS_KEY = "canopy.progress.v1";
const MINUTES_PER_LESSON = 15;
const LEVEL_WHO = {
  junior: "New to it — start from the basics",
  intermediate: "You know the basics and want depth",
  senior: "You work with it and want internals and judgment",
};
const OUTCOMES = {
  "html-and-semantic-markup": ["Write valid, semantic pages with forms and media", "Build accessible, enhanced markup with native interactivity", "Reason about browser parsing and markup at scale"],
  "css-and-responsive-layout": ["Style complete pages with the cascade and Flexbox", "Build layouts with Grid and container queries", "Reason about layout, painting, and CSS architecture"],
  "browser-javascript-and-the-dom": ["Select, change, and react to elements on a page", "Build robust apps with async code and Web APIs", "Tune performance and secure browser apps"],
  "react-and-modern-frontend": ["Build and compose components with state and effects", "Manage server state, performance, and tests", "Design front-end architecture and rendering strategy"],
  "full-stack-frameworks": ["Build and deploy a multi-page full-stack app", "Add auth, APIs, caching, and CI/CD", "Design scalable, secure systems and defend platform choices"],
  "backend-and-apis": ["Build an HTTP server with a database and login", "Design fast, secure, well-tested APIs", "Architect services that scale and fail gracefully"],
  "web-performance": ["Measure speed and fix images, fonts, and scripts", "Diagnose bottlenecks with profiling and real-user data", "Design performance into systems and build the culture"],
  "web-accessibility": ["Spot barriers and build accessible basics", "Build accessible components and test with assistive tech", "Lead accessibility programs and defend decisions"],
  postgresql: ["Design schemas, write real SQL, and connect an app safely", "Read query plans, index well, and master concurrency and operations", "Understand internals, scale with replication, and defend a design"],
  firebase: ["Build an app with Firestore, Auth, and rules that protect the data", "Model data for reads, write real rules, and add safe server logic", "Control cost and scale, design the architecture, and judge when to leave"],
  mongodb: ["Model documents, write real queries, and connect an app safely", "Aggregate, index for speed, and reason about transactions", "Understand internals, shard, secure, and defend a design"],
  python: ["Run, debug, and test small Python programs", "Write typed, concurrent, packaged Python", "Design libraries and reason about CPython internals"],
  javascript: ["Build interactive pages with data and async code", "Write TypeScript, Node.js tools, and browser apps", "Tune performance and judge architecture trade-offs"],
  java: ["Write, compile, and test object-oriented Java", "Build concurrent, tested services on a framework", "Tune the JVM and diagnose production problems"],
  csharp: ["Build and test small C# apps with LINQ", "Write async C# and ASP.NET Core services", "Tune, diagnose, and architect .NET systems"],
  cpp: ["Write C++ that manages memory and ownership safely", "Use templates, move semantics, and modern libraries", "Reason about the memory model and undefined behavior"],
  "data-structures-algorithms": ["Pick the right structure for a problem", "Solve tree, graph, and dynamic-programming problems", "Reason about advanced algorithms and trade-offs"],
  "operating-systems": ["Explain processes, threads, and memory layout", "Reason about scheduling, locks, and virtual memory", "Diagnose concurrency and memory problems in production"],
  networking: ["Trace a request from DNS to HTTP", "Explain TCP, TLS, and HTTP performance", "Choose protocols and debug networks at scale"],
  "computer-architecture": ["Explain how a CPU runs instructions", "Reason about pipelines, caches, and memory systems", "Analyze multicore performance and hardware limits"],
  "linux-devops": ["Work confidently in the Linux shell and Git", "Containerize apps and automate CI/CD", "Run Kubernetes platforms with observability"],
  "sql-and-relational-databases": ["Query and design relational databases", "Tune queries, indexes, and transactions", "Reason about replication, sharding, and data architecture"],
  security: ["Handle passwords, sessions, and common web flaws", "Apply cryptography, OAuth, and web security in depth", "Threat-model systems and plan detection and response"],
  "software-engineering-practice": ["Write tests and readable, well-structured code", "Refactor with patterns and a solid testing strategy", "Design for scale and make sound engineering calls"],
  "compilers-language-implementation": ["Build a lexer, parser, and tree-walking interpreter", "Add type checking, bytecode VMs, and optimizations", "Generate native code and weigh language-design trade-offs"],
  "machine-learning": ["Train a first model with the Python data stack", "Build full pipelines, neural networks, and CV/NLP models", "Lead ML systems, research, and experimentation"],
  redis: ["Use Redis data structures for caching, sessions, and counters", "Build streams, queues, locks, and replication that survives failure", "Understand internals, run Cluster, and judge when Redis should hold the data"],
  sqlite: ["Query, embed, and safely back up a SQLite database", "Tune queries, understand locking and WAL, and use built-in features", "Understand file-format internals, scale it, and know when to move on"],
  git: ["Commit, branch, merge, and share changes confidently", "Rewrite history safely, work at team scale, and debug with history", "Understand internals, set branching strategy, and govern repos at scale"],
  docker: ["Build images, run containers, and use volumes and Compose", "Ship smaller, faster, safer images and run containers well", "Explain kernel internals, harden the supply chain, and use tooling beyond Docker"],
  kubernetes: ["Deploy, expose, configure, and debug an app on a cluster", "Scale, schedule, route, and release stateful and stateless workloads", "Operate, secure, and extend clusters, and judge whether Kubernetes is worth it"],
  terraform: ["Write, plan, and apply a first real cloud stack with state", "Build modules, remote state, environments, and delivery pipelines", "Design platforms and secure Terraform at scale, with sound operational judgment"],
  aws: ["Set up a safe account and run a small app on core services", "Build scalable, resilient apps with managed services and infrastructure as code", "Design for reliability, security, and cost, and defend the trade-offs"],
};
const RELATED = {
  "html-and-semantic-markup": ["css-and-responsive-layout", "web-accessibility", "browser-javascript-and-the-dom"],
  "css-and-responsive-layout": ["html-and-semantic-markup", "web-performance", "react-and-modern-frontend"],
  "browser-javascript-and-the-dom": ["javascript", "react-and-modern-frontend", "web-performance"],
  "react-and-modern-frontend": ["browser-javascript-and-the-dom", "full-stack-frameworks", "css-and-responsive-layout"],
  "full-stack-frameworks": ["react-and-modern-frontend", "backend-and-apis", "sql-and-relational-databases"],
  "backend-and-apis": ["sql-and-relational-databases", "security", "networking"],
  "web-performance": ["browser-javascript-and-the-dom", "react-and-modern-frontend", "networking"],
  "web-accessibility": ["html-and-semantic-markup", "css-and-responsive-layout", "react-and-modern-frontend"],
  python: ["data-structures-algorithms", "sql-and-relational-databases", "machine-learning"],
  javascript: ["browser-javascript-and-the-dom", "react-and-modern-frontend", "security"],
  java: ["data-structures-algorithms", "operating-systems", "software-engineering-practice"],
  csharp: ["sql-and-relational-databases", "networking", "software-engineering-practice"],
  cpp: ["operating-systems", "computer-architecture", "compilers-language-implementation"],
  "data-structures-algorithms": ["python", "cpp", "compilers-language-implementation"],
  "operating-systems": ["computer-architecture", "linux-devops", "cpp"],
  networking: ["security", "backend-and-apis", "linux-devops"],
  "computer-architecture": ["operating-systems", "cpp", "compilers-language-implementation"],
  "linux-devops": ["operating-systems", "networking", "security"],
  "sql-and-relational-databases": ["python", "software-engineering-practice", "security"],
  security: ["networking", "linux-devops", "sql-and-relational-databases"],
  "software-engineering-practice": ["linux-devops", "python", "security"],
  "compilers-language-implementation": ["cpp", "data-structures-algorithms", "computer-architecture"],
  "machine-learning": ["python", "data-structures-algorithms", "sql-and-relational-databases"],
  mongodb: ["sql-and-relational-databases", "backend-and-apis", "security"],
  firebase: ["backend-and-apis", "security", "postgresql"],
  postgresql: ["sql-and-relational-databases", "backend-and-apis", "mongodb"],
  redis: ["postgresql", "backend-and-apis", "mongodb"],
  sqlite: ["sql-and-relational-databases", "postgresql", "backend-and-apis"],
  git: ["linux-devops", "docker", "software-engineering-practice"],
  docker: ["kubernetes", "linux-devops", "git"],
  kubernetes: ["docker", "terraform", "linux-devops"],
  terraform: ["aws", "kubernetes", "git"],
  aws: ["terraform", "networking", "security"],
};
const I_CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

function readProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || { paths: {}, last: {} }; } catch { return { paths: {}, last: {} }; }
}
function writeProgress(p) { try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch { /* private mode: progress just won't persist */ } }
function recordOpen(fullPath) {
  const parts = (fullPath || "").split("/").filter(Boolean);
  if (parts.length < 3) return;
  const p = readProgress();
  p.paths[parts.join("/")] = Date.now();
  p.last[parts.slice(0, 2).join("/")] = parts.join("/");
  writeProgress(p);
}
function resetProgress(subjectPath) {
  const p = readProgress();
  const prefix = subjectPath + "/";
  Object.keys(p.paths).forEach((k) => { if (k.startsWith(prefix)) delete p.paths[k]; });
  delete p.last[subjectPath];
  writeProgress(p);
}
function progressFor(path) {
  const p = readProgress();
  const key = path.join("/");
  const opened = Object.keys(p.paths).filter((k) => k.startsWith(key + "/")).length;
  return { opened, last: p.last[key] || null };
}
function levelNodes(node) { return (node.children || []).filter((l) => !isCurriculum(l)); }
function subjectPathBySlug(slug) {
  for (const c of MANIFEST.categories) {
    const s = (c.children || []).find((x) => x.slug === slug);
    if (s) return [c.slug, s.slug];
  }
  return null;
}
function progressInner(path, node) {
  const total = lessonCount(node);
  const { opened, last } = progressFor(path);
  const pct = total ? Math.min(100, Math.round((opened / total) * 100)) : 0;
  const key = path.join("/");
  const ln = last ? findNode(last.split("/")) : null;
  let action = "";
  if (ln && ln.contentPath) {
    const stage = findNode(last.split("/").slice(0, -1));
    const st = stage && splitStage(stage.title);
    action = `<a class="btn-primary resume-btn" href="${escapeHtml(ln.contentPath)}" target="_blank" rel="noopener" data-open-path="${escapeHtml(last)}"><span class="btn-label">Resume<span class="btn-sub">${st ? "Stage " + escapeHtml(st.num) + " · " : ""}${escapeHtml(ln.title)}</span></span>${I_ARROW}</a>`;
  } else {
    const first = levelNodes(node)[0];
    if (first) action = `<a class="btn-primary" href="#/path/${key}/${first.slug}"><span class="btn-label">Start learning<span class="btn-sub">Begin with ${escapeHtml(first.title)}</span></span>${I_ARROW}</a>`;
  }
  return `
    <div class="progress-head"><span class="panel-label">Your progress</span><span class="progress-count"><b>${opened}</b> of ${total} lessons opened</span></div>
    <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i></div>
    <div class="progress-actions">
      ${action}
      <button class="card-zip-inline panel-zip" data-zip-path="${key}" type="button" title="Download all lessons as .zip">${I_DOWN.replace("<svg", '<svg aria-hidden="true"')}Download ZIP</button>
    </div>
    ${opened ? `<button class="progress-reset" type="button" data-reset-progress="${key}">Reset progress</button>` : ""}`;
}
function subjectTopHtml(path, node) {
  const key = path.join("/");
  const rows = levelNodes(node).map((l) => `
      <a class="start-row" data-slug="${escapeHtml(l.slug)}" href="#/path/${key}/${l.slug}">
        <span class="start-pill">${escapeHtml(l.title)}</span>
        <span class="start-who">${escapeHtml(LEVEL_WHO[l.slug] || l.description || "")}</span>
        <span class="start-go">${I_ARROW}</span>
      </a>`).join("");
  return `
    <div class="panel-pair panel-pair--top">
      <section class="panel panel-progress" data-progress-for="${key}">${progressInner(path, node)}</section>
      <section class="panel">
        <h2 class="panel-label">Where should you start?</h2>
        <div class="start-rows">${rows}</div>
      </section>
    </div>`;
}
function subjectBottomHtml(path, node) {
  const outcomes = OUTCOMES[path[1]] || levelNodes(node).map((l) => l.description).filter(Boolean);
  const cat = findNode(path.slice(0, 1));
  const relSlugs = RELATED[path[1]] || ((cat && cat.children) || []).map((c) => c.slug).filter((s) => s !== path[1]).slice(0, 3);
  const rel = relSlugs.map((s) => {
    const p = subjectPathBySlug(s); const n = p && findNode(p);
    return n ? `<a class="topic topic-link" href="#/path/${p.join("/")}">${escapeHtml(n.title)}</a>` : "";
  }).join("");
  return `
    <div class="panel-pair">
      ${outcomes.length ? `<section class="panel"><h2 class="panel-label">What you’ll be able to do</h2><ul class="outcomes">${outcomes.map((o) => `<li>${I_CHECK}<span>${escapeHtml(o)}</span></li>`).join("")}</ul></section>` : ""}
      ${rel ? `<section class="panel"><h2 class="panel-label">Pairs well with</h2><div class="topic-list">${rel}</div></section>` : ""}
    </div>`;
}
function refreshProgress() {
  const el = document.querySelector("[data-progress-for]");
  if (!el) return;
  const path = el.dataset.progressFor.split("/");
  const node = findNode(path);
  if (node) el.innerHTML = progressInner(path, node);
}

function lessonRowHtml(item, parentPath, idx) {
  const fullPath = [...parentPath, item.slug].join("/");
  const attrs = toneAttrs(item, idx);
  return `
    <li><a class="lesson-row" href="${item.contentPath ? escapeHtml(item.contentPath) : "#"}" target="_blank" rel="noopener" data-open-path="${fullPath}" ${attrs}>
      <span class="lesson-num">${String(idx + 1).padStart(2, "0")}</span>
      <span class="lesson-body">
        <p class="lesson-title">${escapeHtml(item.title)}</p>
        <p class="lesson-desc">${escapeHtml(item.description || "")}</p>
      </span>
      <span class="lesson-meta"><span class="lesson-go">${I_OUT}</span></span>
    </a></li>`;
}

async function triggerDownload(filename, data, btn) {
  const originalLabel = btn.textContent;

  if (typeof window.claude !== "undefined" && typeof window.claude.use === "function") {
    try {
      const downloads = await window.claude.use("downloads");
      if (downloads) {
        btn.textContent = "Preparing…";
        await downloads.save({ filename, data });
        btn.textContent = originalLabel;
        return;
      }
    } catch (err) {
      btn.textContent = originalLabel;
      if (err && err.code === "declined") return;
    }
  }

  const blob = data instanceof Blob ? data : new Blob([data], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Builds the folder structure synchronously (JSZip's .folder()/.file() are
// just bookkeeping, no I/O), while collecting every leaf that still needs
// fetching into a flat list. Nothing awaited here — this just lays out the
// shape of the zip and notes what work is left.
function layoutZipStructure(node, zipFolder, pending) {
  if (node.children && node.children.length > 0) {
    if (node.leafWithContent === 0) return;
    const sub = zipFolder.folder(node.slug);
    node.children.forEach((child) => layoutZipStructure(child, sub, pending));
  } else if (node.hasContent) {
    pending.push({ node, folder: zipFolder });
  }
}

async function buildAndDownloadZip(node, btn) {
  const originalLabel = btn.textContent;
  const zip = new JSZip();
  const pending = [];
  node.children.forEach((child) => layoutZipStructure(child, zip, pending));

  // Fetch every lesson in parallel instead of one at a time — the only
  // part of this that scales badly as more categories/lessons get added.
  // fetchLeafContent still caches, so anything already opened this session
  // resolves instantly; everything else goes out as one batch of requests.
  btn.textContent = `Fetching ${pending.length}…`;
  const texts = await Promise.all(pending.map((p) => fetchLeafContent(p.node)));
  pending.forEach((p, i) => p.folder.file(`${p.node.slug}.html`, texts[i]));

  btn.textContent = "Zipping…";
  const blob = await zip.generateAsync({ type: "blob" });
  btn.textContent = originalLabel;
  triggerDownload(`${node.slug}.zip`, blob, btn);
}

function applySort(nodes) {
  if (!alphaSort) return nodes;
  return [...nodes].sort((a, b) => a.title.localeCompare(b.title));
}

// Search is scoped to whatever's currently on screen — the current folder's
// direct children only, not the whole site. Typing while inside Junior
// filters Junior's own stages, nothing from outside it.
function applySearchFilter(nodes) {
  const q = searchQuery.trim().toLowerCase();
  if (!q) return nodes;
  return nodes.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      (n.description || "").toLowerCase().includes(q)
  );
}

function renderAzSidebar(currentNodes) {
  if (currentNodes.length < AZ_MIN || isSequence(currentNodes)) {
    azSidebar.hidden = true;
    azSidebar.innerHTML = "";
    return;
  }
  azSidebar.hidden = false;
  const presentLetters = new Set(currentNodes.map((n) => n.title.charAt(0).toUpperCase()));
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const isDefault = activeLetter === null && !alphaSort;
  const resetBtn = `<button class="az-letter az-reset ${isDefault ? "active" : ""}" data-letter="" title="Show all">✶</button>`;
  const sortBtn = `<button class="az-letter az-sort ${alphaSort ? "active" : ""}" data-action="sort" title="Force alphabetical order">A↓Z</button><div class="az-reset-divider"></div>`;
  const letterBtns = letters.map((L) => {
    const has = presentLetters.has(L);
    const isActive = activeLetter === L;
    return `<button class="az-letter ${has ? "" : "disabled"} ${isActive ? "active" : ""}" data-letter="${L}" ${has ? "" : "disabled"}>${L}</button>`;
  }).join("");
  azSidebar.innerHTML = resetBtn + sortBtn + letterBtns;
}

function applyAzFilter(nodes) {
  if (!activeLetter) return nodes;
  return nodes.filter((n) => n.title.charAt(0).toUpperCase() === activeLetter);
}

function gridHtml(nodes, parentPath, depth, listMode) {
  if (listMode) return `<ol class="lesson-list">${nodes.map((c, i) => lessonRowHtml(c, parentPath, i)).join("")}</ol>`;
  return `<div class="grid">${nodes.map((c, i) => cardHtml(c, parentPath, i, depth)).join("")}</div>`;
}

function renderHome() {
  delete app.dataset.subject; delete app.dataset.level;
  searchInput.disabled = false;
  searchInput.placeholder = "Search categories & subjects…";
  const cats = applySort(MANIFEST.categories);
  renderAzSidebar(cats);
  let filtered = applyAzFilter(cats);
  filtered = applySearchFilter(filtered);
  const q = searchQuery.trim();

  const subjects = MANIFEST.categories.reduce((s, c) => s + (c.children || []).length, 0);
  const lessons = MANIFEST.categories.reduce((s, c) => s + lessonCount(c), 0);
  const nCat = MANIFEST.categories.length;
  const chips = `<div class="chips">
      <span class="chip"><b>${nCat}</b> ${nCat === 1 ? "category" : "categories"}</span>
      <span class="chip"><b>${subjects}</b> ${subjects === 1 ? "subject" : "subjects"}</span>
      <span class="chip"><b>${lessons}</b> ${lessons === 1 ? "lesson" : "lessons"}</span>
    </div>`;

  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">library</p>
      <h1><span class="grad-text">${escapeHtml(SITE.title)}</span></h1>
      <p class="lede">${escapeHtml(SITE.description)}</p>
      ${chips}
    </section>
    ${filtered.length === 0
      ? `<div class="empty">${q ? `Nothing here matches "${escapeHtml(q)}".` : activeLetter ? `Nothing starting with "${activeLetter}".` : `No categories yet. Add a folder under <code>content/categories/</code> and run the build script.`}</div>`
      : gridHtml(filtered, [], 0, false)
    }
  `;
}

async function renderNode(path) {
  const node = findNode(path);
  if (!node) {
    azSidebar.hidden = true;
    azSidebar.innerHTML = "";
    app.innerHTML = `<div class="empty">Not found.</div>`;
    return;
  }

  // Leaf content nodes are no longer hash-routable — they open in a new
  // tab via the card's own click handler. If someone lands on this hash
  // directly (an old bookmark, a shared link), send them one level up
  // instead of showing a blank page.
  if (node.hasContent && !(node.children && node.children.length)) {
    const parentPath = path.slice(0, -1);
    location.hash = parentPath.length ? `#/path/${parentPath.join("/")}` : "#/";
    return;
  }

  const themed = themedSubject(path);
  if (themed) app.dataset.subject = themed; else delete app.dataset.subject;
  const lvl = themed ? path[2] : "";
  if (["junior", "intermediate", "senior"].includes(lvl)) app.dataset.level = lvl; else delete app.dataset.level;
  searchInput.disabled = false;
  searchInput.placeholder = "Search in this folder…";
  const allChildren = node.children || [];
  const children = applySort(allChildren);
  renderAzSidebar(children);
  let filtered = applyAzFilter(children);
  filtered = applySearchFilter(filtered);
  const q = searchQuery.trim();
  const listMode = allChildren.length > 0 && allChildren.every((c) => c.hasContent && !isCurriculum(c));

  // Subject page banner: topic chips (real stage names) + a big faint logo behind them
  let topicsHtml = "", logoHtml = "", topHtml = "", bottomHtml = "", heroChips = chipsHtml(node, path.length - 1);
  const showExtras = path.length === 2 && !q && !activeLetter;
  if (path.length === 2) {
    const stages = levelNodes(node).reduce((s, l) => s + (l.children || []).length, 0);
    const hours = Math.max(1, Math.round((lessonCount(node) * MINUTES_PER_LESSON) / 60));
    heroChips = heroChips.replace(/<\/div>$/, `<span class="chip"><b>${stages}</b> stages</span><span class="chip"><b>≈ ${hours}</b> h to finish</span></div>`);
    if (showExtras) { topHtml = subjectTopHtml(path, node); bottomHtml = subjectBottomHtml(path, node); }
    const topics = [];
    (node.children || []).filter((l) => !isCurriculum(l)).forEach((l) => {
      (l.children || []).slice(0, 2).forEach((st) => { const s = splitStage(st.title); topics.push(s ? s.name : st.title); });
    });
    if (topics.length) topicsHtml = `<div class="hero-topics"><p class="hero-topics-label">Inside</p><div class="topic-list">${topics.map((t) => `<span class="topic">${escapeHtml(t)}</span>`).join("")}</div></div>`;
    const pk = CanopyIcons.pick(node);
    logoHtml = `<span class="hero-logo" aria-hidden="true">${CanopyIcons.svg(pk.inner)}</span>`;
  }
  app.innerHTML = `
    ${breadcrumbHtml(path)}
    <section class="hero${path.length === 2 ? " hero--subject" : ""}">
      <span class="hero-art" aria-hidden="true"><i></i></span>
      ${logoHtml}
      <h1>${escapeHtml(node.title)}</h1>
      <p class="lede">${escapeHtml(node.description || "")}</p>
      ${heroChips}
      ${topicsHtml}
    </section>
    ${bottomHtml}
    ${topHtml ? `<div class="section-break" role="separator"><span>Start learning</span></div>${topHtml}` : ""}
    ${filtered.length === 0
      ? `<div class="empty">${q ? `Nothing in ${escapeHtml(node.title)} matches "${escapeHtml(q)}".` : activeLetter ? `Nothing starting with "${activeLetter}".` : `Nothing nested here yet — this is a leaf. Add a folder under this one in <code>content/categories/</code> and run the build script.`}</div>`
      : gridHtml(filtered, path, path.length, listMode)
    }
  `;
}

function route() {
  const hash = location.hash || "#/";
  const match = hash.match(/^#\/path\/(.+)/);
  if (match) {
    const path = decodeURIComponent(match[1]).split("/").filter(Boolean);
    renderNode(path);
  } else {
    renderHome();
  }
}

// ---- Scroll behavior (hybrid) ----
// Going forward (tapping a card or crumb) opens the new page at its top.
// Going back/forward (browser or phone back button) returns to where you
// were on that page. Positions are remembered per page for this tab.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const SCROLL_KEY = "canopy-scroll";
let scrollPositions = {};
try { scrollPositions = JSON.parse(sessionStorage.getItem(SCROLL_KEY) || "{}"); } catch {}
function persistScroll() {
  try { sessionStorage.setItem(SCROLL_KEY, JSON.stringify(scrollPositions)); } catch {}
}
const hashKey = (h) => h || "#/";
let forwardNav = false;

// An in-app link click means "forward"; anything else that changes the hash
// (back/forward buttons, typing a URL) is treated as history navigation.
document.addEventListener("click", (e) => {
  const link = e.target.closest && e.target.closest('a[href^="#/"]');
  if (!link || link.getAttribute("href") === location.hash) return;
  forwardNav = true;
  setTimeout(() => { forwardNav = false; }, 400);
}, true);

window.addEventListener("hashchange", (e) => {
  // The old page is still on screen, so scrollY is its position — save it.
  const prev = hashKey(new URL(e.oldURL).hash);
  scrollPositions[prev] = Math.round(window.scrollY);
  persistScroll();

  activeLetter = null;
  searchQuery = "";
  searchInput.value = "";
  route();

  const saved = scrollPositions[hashKey(location.hash)];
  window.scrollTo(0, forwardNav || !saved ? 0 : saved);
  forwardNav = false;
});

// Reloading the tab (or returning to it) keeps your place too.
window.addEventListener("pagehide", () => {
  scrollPositions[hashKey(location.hash)] = Math.round(window.scrollY);
  persistScroll();
});

azSidebar.addEventListener("click", (e) => {
  const btn = e.target.closest(".az-letter");
  if (!btn || btn.disabled) return;

  if (btn.dataset.action === "sort") {
    alphaSort = !alphaSort;
    activeLetter = null;
    route();
    return;
  }

  const letter = btn.dataset.letter;
  if (letter === "") {
    activeLetter = null;
    alphaSort = false;
  } else {
    activeLetter = activeLetter === letter ? null : letter;
    alphaSort = false;
  }
  route();
});

app.addEventListener("click", (e) => {
  const zipBtn = e.target.closest(".card-zip-inline");
  if (zipBtn) {
    e.preventDefault();
    e.stopPropagation();
    const path = zipBtn.dataset.zipPath.split("/").filter(Boolean);
    const node = findNode(path);
    if (node) buildAndDownloadZip(node, zipBtn);
    return;
  }

  const resetBtn = e.target.closest("[data-reset-progress]");
  if (resetBtn) {
    resetProgress(resetBtn.dataset.resetProgress);
    refreshProgress();
    return;
  }

  const openCard = e.target.closest("[data-open-path]");
  if (openCard) {
    if (openCard.matches(".lesson-row, .resume-btn")) { recordOpen(openCard.dataset.openPath); setTimeout(refreshProgress, 150); }
    e.preventDefault(); // always intercept — the real href only works on the deployed site, not this preview
    const path = openCard.dataset.openPath.split("/").filter(Boolean);
    const node = findNode(path);
    if (node) openLessonInNewTab(node);
  }
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  activeLetter = null;
  route();
});

document.addEventListener("keydown", (e) => {
  const tag = (document.activeElement && document.activeElement.tagName) || "";
  if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA" && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    searchInput.focus();
  }
});

document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshProgress(); });

loadData().then(() => {
  route();
  const nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  const saved = scrollPositions[hashKey(location.hash)];
  if (saved && nav && (nav.type === "reload" || nav.type === "back_forward")) window.scrollTo(0, saved);
}).catch((err) => {
  app.innerHTML = `<div class="empty">Could not load library data — ${escapeHtml(String(err))}</div>`;
});
