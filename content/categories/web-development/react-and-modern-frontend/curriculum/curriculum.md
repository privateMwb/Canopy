# React & Modern Frontend — Curriculum

Three levels, twelve stages — components, state, effects, and data fetching, built toward React applications that are fast, testable, and easy for a team to change.

## Level 1 — Junior

_Go from "I know HTML, CSS, and JavaScript" to "I can build and compose React components, manage local state, and render data from an API."_

### 1.1 — Thinking in Components

1. **What React Is & Why It Exists** — Declarative UI, components, and the problem they solve.
2. **Setting Up a Project** — Vite, the file layout, and running a dev server.
3. **JSX** — Writing markup in JavaScript, expressions, and the rules that surprise beginners.
4. **Components & Props** — Function components, passing data down, and children.
5. **Rendering Lists & Conditionals** — map, keys, and showing the right UI for the data.
6. **Checkpoint** _(unscaffolded)_ — Build a static product-catalog UI from a design using only composed components and props.

### 1.2 — State & Events

1. **useState** — Holding values that change and re-render the UI.
2. **Handling Events** — Click, change, and submit handlers in React.
3. **Controlled Inputs & Forms** — Keeping the input value in state.
4. **Lifting State Up** — Sharing state between sibling components.
5. **How Rendering Works** — Renders, batching, and why state updates are asynchronous.
6. **Checkpoint** _(unscaffolded)_ — Build a filterable, sortable product list with a search box and controlled inputs.

### 1.3 — Effects & Data

1. **useEffect** — Synchronizing with the outside world, and dependency arrays.
2. **Fetching Data** — Loading, error, and success states.
3. **Cleanup & Race Conditions** — Aborting requests and avoiding stale data.
4. **useRef & the DOM** — Reaching the real DOM safely.
5. **You Might Not Need an Effect** — Deriving values during render and avoiding extra effects.
6. **Checkpoint** _(unscaffolded)_ — Build a user-search UI that fetches data, shows all three states, and never displays stale results.

### 1.4 — Building a Complete App

1. **Component Design & Folder Structure** — Splitting components and naming them well.
2. **Routing with React Router** — Pages, links, params, and nested routes.
3. **Styling Approaches** — CSS Modules, utility classes, and component libraries.
4. **Custom Hooks** — Extracting reusable logic.
5. **Debugging & React DevTools** — The profiler, the component tree, and common errors.
6. **Checkpoint** _(unscaffolded)_ — Build a multi-page movie-browser app with routing and a custom hook, and deploy a live demo.

## Level 2 — Intermediate

_Go from "I can build React components" to "I manage complex state, fetch server data well, test thoroughly, and keep an app fast as it grows."_

### 2.1 — State at Scale

1. **useReducer** — Modeling complex state transitions.
2. **Context & Its Limits** — Sharing data without prop drilling, and the re-render costs.
3. **Client State Libraries** — Zustand, Redux Toolkit, and when you need one.
4. **Forms at Scale** — React Hook Form, validation schemas, and accessibility.
5. **Derived & Normalized State** — Avoiding duplicated data and out-of-sync UI.
6. **Checkpoint** _(unscaffolded)_ — Build a multi-step checkout flow with validated forms and a reducer-driven state machine.

### 2.2 — Server State & Data Fetching

1. **Why Server State Is Different** — Caching, staleness, and synchronization problems.
2. **TanStack Query** — Queries, mutations, and cache invalidation.
3. **Optimistic Updates** — Making the UI feel instant and recovering from errors.
4. **Pagination & Infinite Scroll** — Large lists without loading everything.
5. **Suspense & Error Boundaries** — Declarative loading and failure handling.
6. **Checkpoint** _(unscaffolded)_ — Build a data-heavy dashboard with caching, optimistic updates, and graceful failure for every request.

### 2.3 — Performance & Patterns

1. **Rendering Performance** — Profiling, memoization, and when it doesn't help.
2. **The React Compiler & Memoization** — What is automatic now, and what is still on you.
3. **Code Splitting & Lazy Loading** — Smaller bundles with lazy and Suspense.
4. **Component Patterns** — Composition, compound components, and render props.
5. **Accessibility in React** — Focus management, ARIA, and keyboard support.
6. **Checkpoint** _(unscaffolded)_ — Take a sluggish app, profile it, and cut its interaction latency in half, with profiler evidence.

### 2.4 — Testing & TypeScript

1. **TypeScript with React** — Typing props, state, events, and hooks.
2. **Testing Components** — React Testing Library, and testing behavior rather than implementation.
3. **Mocking the Network** — MSW and realistic API tests.
4. **End-to-End Tests** — Playwright flows for critical paths.
5. **Linting, CI & Code Quality** — ESLint rules for hooks and automated checks.
6. **Checkpoint** _(unscaffolded)_ — Convert an app to TypeScript and add a test suite that catches a deliberately injected regression.

## Level 3 — Senior

_Go from "I build good React apps" to "I understand how React works inside, design front-end architectures for teams, and can defend technical choices."_

### 3.1 — Inside React

1. **The Render and Commit Phases** — What React does between a state change and the screen.
2. **Reconciliation & Keys** — How React decides what to update.
3. **Concurrent Rendering** — Transitions, deferred values, and time slicing.
4. **Server Components** — What runs where, and the boundary between server and client.
5. **Hooks Internals & Pitfalls** — How hooks are stored, and why the rules exist.
6. **Checkpoint** _(unscaffolded)_ — Explain, with a trace, exactly what React does for one state update in a non-trivial component tree.

### 3.2 — Front-End Architecture

1. **Feature-Based Architecture** — Organizing a large codebase by domain.
2. **Design Systems & Component Libraries** — Building and versioning shared UI.
3. **Monorepos & Micro-Frontends** — Splitting a front end across teams, and when not to.
4. **State Architecture Decisions** — Choosing where each kind of state lives.
5. **Error Handling & Observability** — Boundaries, logging, and tracing for front ends.
6. **Checkpoint** _(unscaffolded)_ — Design an architecture for a large product UI, including state boundaries, package structure, and team ownership.

### 3.3 — Rendering Strategies & Delivery

1. **CSR, SSR, SSG & Streaming** — Choosing how each page is rendered.
2. **Hydration & Its Costs** — Why hydration is expensive, and how to reduce it.
3. **Core Web Vitals in React** — Measuring and fixing LCP, INP, and CLS.
4. **Bundling, Tree Shaking & Delivery** — Analyzing and shrinking what ships.
5. **Security in React Apps** — XSS, dependency risks, and safe patterns.
6. **Checkpoint** _(unscaffolded)_ — Take a client-rendered app to a server-rendered architecture and report the Web Vitals before and after.

### 3.4 — Judgment & Communication

1. **React vs. Alternatives** — Honest comparisons with other frameworks and plain JavaScript.
2. **Upgrading & Migrating Large React Apps** — Planning risky changes safely.
3. **Code Review & Mentoring** — Reviewing component design and growing a team.
4. **Writing Technical Decisions Down** — RFCs and ADRs for front-end work.
5. **Checkpoint** _(unscaffolded)_ — Write a design document for a real front-end migration, with the risks you accept and a rollback plan.
