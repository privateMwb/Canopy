# Web Performance — Curriculum

Three levels, twelve stages — measurement, loading, rendering, and delivery, built toward the judgment to find what is slow, fix it, and keep it fast.

## Level 1 — Junior

_Go from "my page feels slow" to "I can measure how fast a page is, explain the metrics, and fix the most common problems."_

### 1.1 — Why Performance Matters

1. **Speed, Users & Business Outcomes** — How performance affects conversion, retention, and trust.
2. **What Happens When You Load a Page** — DNS, TCP, TLS, request, response, and render.
3. **Core Web Vitals** — LCP, INP, and CLS in plain language.
4. **Lab Data vs. Field Data** — Lighthouse vs. real users, and why both matter.
5. **Your First Lighthouse Audit** — Running and reading a report.
6. **Checkpoint** _(unscaffolded)_ — Audit a real site, explain each Core Web Vital, and list three fixes ranked by expected impact.

### 1.2 — Images, Fonts & Media

1. **Image Formats & Compression** — JPEG, WebP, AVIF, and SVG.
2. **Responsive Images** — srcset, sizes, and serving the right size.
3. **Lazy Loading** — Deferring offscreen images and iframes.
4. **Web Fonts Done Right** — font-display, subsetting, and preloading.
5. **Video & Animation Costs** — When video, GIFs, and animation hurt.
6. **Checkpoint** _(unscaffolded)_ — Cut an image-heavy page's transfer size by at least 60% without visible quality loss.

### 1.3 — Loading JavaScript & CSS

1. **Render-Blocking Resources** — How CSS and JavaScript delay first paint.
2. **defer, async & Modules** — Loading scripts without blocking.
3. **Minification, Compression & Bundling** — Gzip, Brotli, and smaller files.
4. **Removing Unused Code** — Finding dead JavaScript and CSS.
5. **Third-Party Scripts** — Measuring and containing analytics, chat widgets, and ads.
6. **Checkpoint** _(unscaffolded)_ — Fix every render-blocking resource on a sample page and show the before-and-after filmstrip.

### 1.4 — Caching Basics

1. **HTTP Caching Headers** — Cache-Control, ETag, and freshness.
2. **Browser Cache vs. CDN Cache** — Where each layer lives.
3. **Static Asset Fingerprinting** — Long cache lifetimes with safe updates.
4. **Using a CDN** — What it gives you, and how to set one up.
5. **Measuring Cache Hits** — Verifying that caching actually works.
6. **Checkpoint** _(unscaffolded)_ — Configure caching for a static site so repeat visits transfer almost nothing, and prove it in the network panel.

## Level 2 — Intermediate

_Go from "I can fix obvious problems" to "I diagnose real bottlenecks with profiling and field data, and optimize loading, rendering, and interaction."_

### 2.1 — Measuring Properly

1. **DevTools Performance Panel** — Reading flame charts and the main thread.
2. **WebPageTest & Waterfalls** — Reading request waterfalls like a detective.
3. **Real User Monitoring** — Collecting field metrics with the web-vitals library.
4. **Performance Budgets** — Setting and enforcing limits in CI.
5. **Statistics for Performance Data** — Percentiles, noise, and not fooling yourself.
6. **Checkpoint** _(unscaffolded)_ — Set up real-user monitoring and a CI budget for a site, and produce a baseline report.

### 2.2 — Optimizing Loading

1. **The Critical Rendering Path** — Getting the first meaningful content out fast.
2. **Resource Hints & Priorities** — preload, preconnect, and fetchpriority.
3. **Optimizing LCP** — Finding the LCP element and speeding it up.
4. **HTTP/2, HTTP/3 & Connection Costs** — What the protocol upgrades change.
5. **Server Response Time** — TTFB, caching, and edge rendering.
6. **Checkpoint** _(unscaffolded)_ — Improve a page's LCP from poor to good, documenting each change's measured effect.

### 2.3 — Rendering & Interaction

1. **Layout, Paint & Composite Costs** — What triggers each stage.
2. **Fixing CLS** — Reserving space and avoiding layout shifts.
3. **Optimizing INP** — Breaking up long tasks and yielding to the browser.
4. **Animation Performance** — Smooth motion with compositor-friendly properties.
5. **Virtualization & Large Lists** — Rendering only what's visible.
6. **Checkpoint** _(unscaffolded)_ — Take a janky interface, fix its long tasks and layout shifts, and show INP and CLS improving in a trace.

### 2.4 — JavaScript & Bundle Performance

1. **Analyzing Bundles** — Treemaps, and finding what's heavy.
2. **Code Splitting & Dynamic Imports** — Shipping only what the page needs.
3. **Tree Shaking & Dependency Choices** — Smaller libraries and import discipline.
4. **Web Workers & Off-Main-Thread Work** — Keeping the UI responsive.
5. **Framework Performance Pitfalls** — Hydration, re-renders, and state cost.
6. **Checkpoint** _(unscaffolded)_ — Cut a framework app's JavaScript payload by 40% and show the change in Time to Interactive.

## Level 3 — Senior

_Go from "I make pages fast" to "I design performance into systems, own budgets and culture, and can defend trade-offs with data."_

### 3.1 — Browser & Network Internals

1. **The Browser's Loading Pipeline** — The preload scanner, parser, and scheduler.
2. **Networking Deep Dive** — TCP slow start, TLS handshakes, QUIC, and head-of-line blocking.
3. **Memory & Garbage Collection** — Leaks and long-lived pages.
4. **The Scheduler & Task Prioritization** — scheduler.postTask and yielding.
5. **Speculation Rules & Prerendering** — Making navigations feel instant.
6. **Checkpoint** _(unscaffolded)_ — Explain, with traces, why two nearly identical pages load at very different speeds.

### 3.2 — Architecture for Speed

1. **Rendering Strategy Trade-offs** — SSR, SSG, ISR, streaming, and islands.
2. **Edge Computing & CDNs in Depth** — Logic near users, and cache design.
3. **Data Fetching Architecture** — Waterfalls, batching, and prefetching.
4. **Offline & Service Worker Strategy** — Caching strategies and update risks.
5. **Mobile & Low-End Device Performance** — Designing for slow CPUs and bad networks.
6. **Checkpoint** _(unscaffolded)_ — Redesign a slow page's architecture for a low-end phone on a 3G connection and prove the gain with real-device tests.

### 3.3 — Performance at Scale

1. **Performance Culture & Ownership** — Budgets, reviews, and making speed a habit.
2. **Continuous Performance Testing** — Automated lab tests and regression alerts.
3. **Debugging Regressions** — Bisecting, diffing traces, and finding the commit.
4. **Third-Party & Tag Governance** — Controlling what marketing and ads add.
5. **Cost vs. Performance** — Bandwidth, compute, and the economics of optimization.
6. **Checkpoint** _(unscaffolded)_ — Build a performance regression pipeline that blocks a deliberately slow change before it ships.

### 3.4 — Judgment & Communication

1. **Prioritizing the Work** — What to fix first when everything is slow.
2. **Connecting Performance to Business Impact** — Proving the value with experiments.
3. **Performance vs. Accessibility vs. Features** — Resolving competing goals.
4. **Presenting Findings & Roadmaps** — Making the case to leadership.
5. **Checkpoint** _(unscaffolded)_ — Write a performance strategy and roadmap for a real product, argued for a skeptical executive.
