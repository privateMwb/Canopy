# JavaScript — Curriculum

Three levels, twelve stages — types, closures, the event loop, and async code, built toward the judgment to ship fast, safe, typed JavaScript on both the client and the server.

## Level 1 — Junior

_Go from "I've copied some JavaScript" to "I can write, run, and debug JavaScript that manipulates data and responds to the browser."_

### 1.1 — Language Basics

1. **Running JavaScript** — The browser console, script tags, Node, and ES modules — the places your code can live.
2. **Values, Types & Coercion** — Primitives vs. objects, typeof, null vs. undefined, and why == and === differ.
3. **let, const, var & Scope** — Block vs. function scope, hoisting, and the temporal dead zone.
4. **Functions & Arrow Functions** — Declarations, expressions, defaults, rest parameters, and first-class functions.
5. **Control Flow & Truthiness** — Conditionals, loops, optional chaining, nullish coalescing, and the falsy values.
6. **Checkpoint** _(unscaffolded)_ — Write a small program (a unit converter or text-adventure engine) that runs in both the console and Node, with no accidental type coercion.

### 1.2 — Data & Collections

1. **Strings & Template Literals** — String methods, Unicode, and building text safely.
2. **Arrays & Array Methods** — map, filter, reduce, find, and sort — and which ones mutate.
3. **Objects, Destructuring & Spread** — Property access, shorthand syntax, and copying or merging objects.
4. **Map, Set & JSON** — When a Map beats an object, what a Set gives you, and round-tripping data through JSON.
5. **References, Copies & Immutability** — Why assignment shares objects, shallow vs. deep copies, and structuredClone.
6. **Checkpoint** _(unscaffolded)_ — Take a nested JSON dataset and answer five questions about it using only array methods and destructuring, with no mutation of the original.

### 1.3 — Functions in Depth

1. **Closures** — Functions that remember their scope, and the classic loop-variable bug.
2. **this, call, apply & bind** — How this is decided at call time, and why arrow functions behave differently.
3. **Prototypes & Classes** — The prototype chain underneath class syntax, getters, setters, and private fields.
4. **Modules: ESM & CommonJS** — import/export, default vs. named exports, and the two module systems you'll meet.
5. **Errors & Debugging** — try/catch, Error types, stack traces, and the browser DevTools debugger.
6. **Checkpoint** _(unscaffolded)_ — Build a small module-based utility library (a shopping cart or event emitter) using closures and classes, and debug three planted bugs with DevTools.

### 1.4 — The Browser & First Async

1. **The DOM** — Selecting, creating, and changing elements, and what the DOM actually is.
2. **Events & Event Delegation** — Listeners, bubbling, preventDefault, and handling many elements with one handler.
3. **Callbacks & Promises** — Why async exists, callback pitfalls, and chaining with .then and .catch.
4. **async/await & fetch** — Writing asynchronous code that reads top to bottom, and calling an HTTP API.
5. **Forms, Storage & Simple State** — Reading form input, localStorage, and keeping UI and data in sync by hand.
6. **Checkpoint** _(unscaffolded)_ — Build a to-do or weather page that fetches data, handles loading and failure states, and persists across reloads, with no framework.

## Level 2 — Intermediate

_Go from "I can make a page work" to "I understand how asynchronous JavaScript is scheduled, I use types, and I can build full-stack apps with real tooling."_

### 2.1 — The Event Loop & Async in Depth

1. **The Call Stack, Tasks & Microtasks** — How the event loop orders your code, and why promise callbacks run before setTimeout.
2. **Promise Combinators & Error Handling** — all, allSettled, race, any — and where unhandled rejections come from.
3. **Cancellation & Concurrency Control** — AbortController, timeouts, and running N requests at a time instead of all at once.
4. **Blocking the Main Thread** — Long tasks, requestAnimationFrame, and keeping a UI responsive.
5. **Web Workers & Streams** — Moving work off the main thread and processing data as it arrives.
6. **Checkpoint** _(unscaffolded)_ — Predict the output of six tricky async-ordering snippets, then build a rate-limited, cancellable batch fetcher.

### 2.2 — TypeScript

1. **Why TypeScript & Basic Types** — What static types catch, what they don't, and how TS compiles away.
2. **Unions, Narrowing & Generics** — Modeling data precisely and letting the compiler follow your checks.
3. **Utility, Mapped & Conditional Types** — Deriving types from other types instead of copying them.
4. **Typing Real Code** — tsconfig, strict mode, third-party type definitions, and migrating a JS file at a time.
5. **Checkpoint** _(unscaffolded)_ — Migrate a 400-line JavaScript module to strict TypeScript, and list the real bugs the compiler found.

### 2.3 — Node.js & Tooling

1. **The Node Runtime** — Modules, fs, streams, process, and what Node adds beyond the language.
2. **Building an HTTP Server** — The http module, then Express or Fastify: routing, middleware, and error handling.
3. **npm, package.json & Semver** — Dependencies, lockfiles, scripts, and what a version range really permits.
4. **Bundlers & Build Tools** — What Vite and esbuild do, and when you actually need a build step.
5. **Testing JavaScript** — Vitest, Jest, or node:test: unit tests, mocks, and async assertions.
6. **Checkpoint** _(unscaffolded)_ — Build a tested REST API with validation, error handling, and a build pipeline, and run it from a clean checkout.

### 2.4 — Browser Apps in Practice

1. **UI State & Rendering** — Why frameworks exist: state, derived views, and the component mental model.
2. **Fetching Data & Handling Failure** — Loading, error, and stale states, caching, and retry behavior in a real UI.
3. **Routing, History & Browser APIs** — Client-side routing, URL state, IntersectionObserver, and the platform features you don't need a library for.
4. **Accessibility Basics** — Semantic HTML, keyboard navigation, focus, and ARIA used sparingly.
5. **Web Performance Basics** — Core Web Vitals, loading strategy, and what to measure first.
6. **Checkpoint** _(unscaffolded)_ — Audit a small app with Lighthouse and an accessibility checker, fix the top five issues, and show the measurements before and after.

## Level 3 — Senior

_Go from "I build apps that work" to "I understand what the engine does with my code, secure and scale it, and can make architecture calls and defend them."_

### 3.1 — Engine & Language Internals

1. **How V8 Runs Your Code** — Parsing, the Ignition interpreter, and TurboFan optimization.
2. **Hidden Classes, Inline Caches & Deoptimization** — Why object shape matters and how code silently loses its fast path.
3. **Garbage Collection & Memory Leaks** — Generational GC, what keeps objects alive, and the common leak patterns.
4. **Proxy, Reflect, Symbols & the Prototype Chain** — Metaprogramming tools, and when they are warranted.
5. **Module Resolution & Tree Shaking** — How ESM and CommonJS are resolved, interop traps, and why dead code can't always be removed.
6. **Checkpoint** _(unscaffolded)_ — Find and fix a memory leak in a long-running page or service using heap snapshots, and explain the retaining path.

### 3.2 — Advanced Async & Runtime Internals

1. **Async Iterators, Generators & Streams** — Backpressure-aware pipelines in both the browser and Node.
2. **Workers, SharedArrayBuffer & Atomics** — Real shared-memory parallelism in JavaScript, and what it costs.
3. **libuv, the Thread Pool & Node Internals** — What actually runs off the main thread in Node, and what blocks it.
4. **Resilient Async Design** — Retries, idempotency, timeouts, and failure handling across unreliable calls.
5. **Checkpoint** _(unscaffolded)_ — Reproduce an event-loop stall in a Node service, trace it to its cause, and fix it without adding workers blindly.

### 3.3 — Performance & Security

1. **Profiling in the Browser & Node** — DevTools performance panels, CPU profiles, and flame graphs.
2. **Bundle Size & Loading Performance** — Code splitting, lazy loading, and measuring what users actually download.
3. **Web Security: XSS, CSP & Prototype Pollution** — How injection happens in JavaScript apps and the layered defenses against it.
4. **npm Supply Chain & Dependency Hygiene** — Lockfiles, install scripts, auditing, and deciding what to depend on.
5. **Checkpoint** _(unscaffolded)_ — Take a small app with seeded security and performance flaws, find and fix each one, and write up the evidence.

### 3.4 — Architecture & Judgment

1. **Monorepos & Large Codebases** — Workspaces, shared packages, and keeping builds fast as a codebase grows.
2. **Designing & Publishing Libraries** — Dual ESM/CommonJS packages, exports maps, and API stability.
3. **SSR, Edge & Where Code Should Run** — Server, client, and edge: choosing where each piece of work belongs.
4. **Observability for JavaScript** — Error tracking, source maps, tracing, and diagnosing user-side failures you can't reproduce.
5. **Choosing & Defending Technology** — JS vs. TS, framework and runtime choices, and communicating tradeoffs to a team.
6. **Checkpoint** _(unscaffolded)_ — Write an architecture decision record for a real project: stack, runtime, rendering strategy, and the risks you're accepting.
