# Browser JavaScript & the DOM — Curriculum

Three levels, twelve stages — the DOM, events, and the Web APIs the browser provides, built toward interactive apps that are fast, resilient, and secure. The language itself lives in the JavaScript subject; this one is about the browser around it.

## Level 1 — Junior

_Go from "I know some JavaScript" to "I can select, change, and respond to elements on a page, fetch data from an API, and keep state in the browser."_

### 1.1 — The DOM

1. **Scripts in the Browser** — script tags, defer, modules, and the console.
2. **The DOM Tree** — Nodes, elements, and how HTML becomes an object tree.
3. **Selecting Elements** — querySelector, collections, and live vs. static lists.
4. **Changing the Page** — textContent, attributes, classList, and creating elements.
5. **Debugging in DevTools** — Breakpoints, the Elements panel, and logging effectively.
6. **Checkpoint** _(unscaffolded)_ — Build a to-do list that adds, removes, and marks items done, entirely through DOM manipulation.

### 1.2 — Events

1. **Event Listeners** — addEventListener, handlers, and removing listeners.
2. **The Event Object** — target, currentTarget, and preventDefault.
3. **Bubbling, Capturing & Delegation** — How events travel, and why one listener can serve many elements.
4. **Keyboard, Mouse & Pointer Events** — Input events and gesture basics.
5. **Form Handling** — Reading values, submitting, and validating in script.
6. **Checkpoint** _(unscaffolded)_ — Build a keyboard-accessible tabbed interface using one delegated listener.

### 1.3 — Talking to Servers

1. **HTTP in the Browser** — Requests, responses, status codes, and headers from the browser's side.
2. **fetch & Promises** — Making requests and handling asynchronous results.
3. **async/await & Error Handling** — Cleaner async code and failures that don't break the page.
4. **JSON & Rendering Data** — Parsing responses and turning data into DOM.
5. **CORS Basics** — Why cross-origin requests fail, and what the headers mean.
6. **Checkpoint** _(unscaffolded)_ — Build a search UI that fetches from a public API and shows loading and error states, so the user is never left guessing.

### 1.4 — Storing State in the Browser

1. **localStorage & sessionStorage** — Persisting simple data, and its limits.
2. **Cookies** — Setting, reading, and the attributes that matter.
3. **URLs, History & Routing Basics** — The location object, query strings, and the History API.
4. **Modules & Organizing Code** — ES modules, imports, and splitting scripts into files.
5. **Tooling: npm, Vite & Formatting** — A modern dev setup for front-end projects.
6. **Checkpoint** _(unscaffolded)_ — Build a notes app that persists to localStorage, reflects state in the URL, and is split into modules.

## Level 2 — Intermediate

_Go from "I can script a page" to "I build robust, performant browser apps with the right Web APIs, clean architecture, and real tests."_

### 2.1 — Asynchronous Browser Programming

1. **The Event Loop, Tasks & Microtasks** — What runs when, and why the order matters.
2. **Promises in Depth** — Chaining, Promise.all, allSettled, race, and unhandled rejections.
3. **Cancellation & Timeouts** — AbortController and avoiding stale responses.
4. **Timers, requestAnimationFrame & Idle Callbacks** — Scheduling work without blocking the UI.
5. **Web Workers** — Moving heavy work off the main thread.
6. **Checkpoint** _(unscaffolded)_ — Build a type-ahead search that debounces, cancels stale requests, and offloads filtering to a worker.

### 2.2 — Powerful Web APIs

1. **IntersectionObserver & ResizeObserver** — Lazy loading, infinite scroll, and responsive behavior in script.
2. **Clipboard, Files & Drag-and-Drop** — Reading files and moving data between apps.
3. **Canvas & SVG in Script** — Drawing, charts, and when to pick each.
4. **Notifications, Geolocation & Permissions** — Asking for access responsibly.
5. **IndexedDB & the Cache API** — Structured storage and offline-capable data.
6. **Checkpoint** _(unscaffolded)_ — Build an image-upload tool with drag-and-drop, preview, and an offline queue stored in IndexedDB.

### 2.3 — Architecture & State

1. **Separating Concerns** — Models, views, and controllers without a framework.
2. **State Management Patterns** — A single source of truth, events, and one-way data flow.
3. **Custom Events & Pub/Sub** — Decoupled communication between parts of an app.
4. **Web Components for Behavior** — Using custom elements to package interactive behavior.
5. **Rendering Strategies** — Direct DOM updates, templates, and batching.
6. **Checkpoint** _(unscaffolded)_ — Refactor a 500-line script into modules with clear state flow, and write down which coupling you removed.

### 2.4 — Testing & Quality

1. **Unit Testing with Vitest or Jest** — Testing logic in isolation.
2. **Testing the DOM** — Testing Library principles and querying by role.
3. **End-to-End Tests with Playwright** — Driving a real browser in CI.
4. **Linting, Types & TypeScript** — ESLint, JSDoc types, and gradual typing.
5. **Error Monitoring & Logging** — window.onerror, reporting, and source maps.
6. **Checkpoint** _(unscaffolded)_ — Add unit, DOM, and end-to-end tests to an app so that a deliberately injected bug is caught at the right layer.

## Level 3 — Senior

_Go from "I build solid browser apps" to "I understand the browser runtime and security model, tune real-world performance, and can defend architecture decisions."_

### 3.1 — Inside the Browser Runtime

1. **The Rendering Pipeline from Script** — Style, layout, paint, and what JavaScript can trigger.
2. **Memory & Garbage Collection** — Leaks from event listeners, closures, and detached DOM.
3. **Main Thread, Long Tasks & INP** — Measuring responsiveness and breaking up work.
4. **Module Loading & Bundling** — How the browser loads modules, and what bundlers change.
5. **Profiling with DevTools** — Reading flame charts and heap snapshots.
6. **Checkpoint** _(unscaffolded)_ — Find and fix a memory leak and a long task in a real app, with before-and-after profiles.

### 3.2 — Security in the Browser

1. **The Same-Origin Policy** — What the browser isolates, and why.
2. **XSS & Trusted Types** — Injection defenses and safe DOM APIs.
3. **Content Security Policy** — Writing and rolling out a strict CSP.
4. **CSRF, Cookies & Auth in the Browser** — SameSite, tokens, and session handling.
5. **Third-Party Scripts & Supply Chain** — Isolating, auditing, and limiting what you load.
6. **Checkpoint** _(unscaffolded)_ — Threat-model a browser app, then harden it with a strict CSP and prove an injected script no longer runs.

### 3.3 — Advanced Platform Capabilities

1. **Service Workers & Offline-First** — Caching strategies and update flows.
2. **Progressive Web Apps** — Manifests, installability, and push notifications.
3. **WebSockets, SSE & Real-Time** — Choosing a transport for live data.
4. **WebAssembly & Native Interop** — Where Wasm helps, and where it doesn't.
5. **Streams & Large Data** — Processing big responses incrementally.
6. **Checkpoint** _(unscaffolded)_ — Build an installable, offline-capable app with a safe update strategy and a documented cache policy.

### 3.4 — Judgment & Communication

1. **Frameworks vs. the Platform** — What a framework earns you, and what the browser already does.
2. **Performance Budgets & Real-User Monitoring** — Setting limits and measuring real users.
3. **Browser Support & Enhancement Policy** — Deciding who you support and how.
4. **Writing Technical Decisions Down** — Design docs and ADRs for front-end systems.
5. **Checkpoint** _(unscaffolded)_ — Write a design document for a real front-end feature, arguing for your approach against alternatives for a skeptical reviewer.
