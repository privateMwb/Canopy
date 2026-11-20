# Full-Stack Frameworks — Curriculum

Three levels, twelve stages — routing, rendering, data, and deployment in a modern framework such as Next.js, built toward full-stack apps that are secure, fast, and maintainable. The concepts carry over to Remix, Nuxt, and SvelteKit.

## Level 1 — Junior

_Go from "I know React" to "I can build and deploy a multi-page full-stack app with routing, data fetching, forms, and a database."_

### 1.1 — Framework Fundamentals

1. **What a Full-Stack Framework Gives You** — Routing, rendering, data, and build tooling in one package.
2. **Project Setup & File-Based Routing** — Folders as routes, layouts, and dynamic segments.
3. **Server vs. Client Components** — What runs where, and how to choose.
4. **Navigation & Links** — Client-side navigation, prefetching, and loading states.
5. **Styling in the Framework** — CSS Modules, Tailwind, and global styles.
6. **Checkpoint** _(unscaffolded)_ — Build a five-page site with shared layouts, dynamic routes, and clear server and client boundaries.

### 1.2 — Data Fetching & Rendering

1. **Fetching on the Server** — Async components and data close to where it's used.
2. **Static vs. Dynamic Rendering** — When pages are built, and when they are built per request.
3. **Caching & Revalidation** — Time-based and on-demand revalidation.
4. **Loading & Error UI** — Streaming skeletons and error boundaries per route.
5. **Metadata & SEO** — Titles, Open Graph, sitemaps, and robots.
6. **Checkpoint** _(unscaffolded)_ — Build a blog that renders statically, revalidates on publish, and has complete SEO metadata.

### 1.3 — Forms, Mutations & Databases

1. **Server Actions & Form Handling** — Submitting forms without writing separate API routes.
2. **Connecting a Database** — An ORM such as Prisma or Drizzle and a hosted Postgres.
3. **CRUD End to End** — Create, read, update, and delete with validation.
4. **Validation with Zod** — Validating input on both the client and the server.
5. **Environment Variables & Secrets** — Config that stays out of the repo and the browser.
6. **Checkpoint** _(unscaffolded)_ — Build a task manager with a real database, validated forms, and persisted data.

### 1.4 — Shipping

1. **Deploying to Vercel** — Previews, production, and environment config.
2. **Domains, HTTPS & DNS Basics** — Pointing a domain at your app.
3. **Git Workflow & Preview Deployments** — Branches, pull requests, and reviewing live previews.
4. **Debugging Full-Stack Apps** — Logs, the network tab, and server errors.
5. **Project Structure & Conventions** — Keeping a growing codebase readable.
6. **Checkpoint** _(unscaffolded)_ — Deploy your task manager on a custom domain with a preview deployment for every pull request.

## Level 2 — Intermediate

_Go from "I can build a full-stack app" to "I implement authentication, design APIs, optimize rendering, and test an app that real users depend on."_

### 2.1 — Authentication & Authorization

1. **Sessions, Cookies & JWTs** — How logins actually persist.
2. **Auth Libraries & Providers** — Auth.js, Clerk, and OAuth flows.
3. **Protecting Routes & Data** — Middleware and server-side checks.
4. **Roles & Permissions** — Modeling access control.
5. **Passwords, MFA & Account Recovery** — Doing the unglamorous parts safely.
6. **Checkpoint** _(unscaffolded)_ — Add sign-in, role-based access, and protected API routes to an app, and prove an unauthorized request is rejected on the server.

### 2.2 — APIs & Backend Logic

1. **Route Handlers & API Design** — Building REST endpoints inside the framework.
2. **Middleware & the Edge Runtime** — Running code before a request and near the user.
3. **Background Jobs & Webhooks** — Handling work that outlives a request.
4. **File Uploads & External Services** — Storage, email, and payments integrations.
5. **Rate Limiting & Abuse Prevention** — Protecting endpoints from misuse.
6. **Checkpoint** _(unscaffolded)_ — Build a webhook-driven feature (payments or email) with signature verification and retries.

### 2.3 — Performance & Rendering Strategy

1. **Streaming & Suspense** — Showing useful content as soon as it's ready.
2. **Caching Layers** — Data cache, full-route cache, CDN, and invalidation.
3. **Image, Font & Script Optimization** — Built-in optimization and what it replaces.
4. **Partial Prerendering & Rendering Modes** — Mixing static and dynamic content on one page.
5. **Measuring with Web Vitals & Lighthouse** — Field data vs. lab data.
6. **Checkpoint** _(unscaffolded)_ — Take a slow app, apply caching and streaming, and show Web Vitals improving with real numbers.

### 2.4 — Testing & Quality

1. **Unit & Integration Testing** — Testing components and server logic.
2. **End-to-End Tests with Playwright** — Critical user flows in CI.
3. **Testing Server Actions & APIs** — Contract and integration tests.
4. **Type Safety End to End** — Shared types from database to UI.
5. **CI/CD & Environments** — Pipelines, staging, and safe releases.
6. **Checkpoint** _(unscaffolded)_ — Build a CI pipeline that runs types, tests, and a preview deployment on every pull request.

## Level 3 — Senior

_Go from "I ship full-stack apps" to "I design systems that scale, understand framework internals, and can defend architecture and platform choices."_

### 3.1 — Framework Internals

1. **The Build & Compilation Pipeline** — What the bundler and compiler do to your code.
2. **Routing, Rendering & the RSC Payload** — How the server and client exchange UI.
3. **Caching Internals** — How each cache layer decides what is fresh.
4. **Edge vs. Node Runtimes** — Capabilities, limits, and cold starts.
5. **Self-Hosting vs. Platforms** — What a managed platform does that you would have to rebuild.
6. **Checkpoint** _(unscaffolded)_ — Trace a request through the framework's layers and explain, with evidence, why it was served from cache or rendered fresh.

### 3.2 — Architecture & Data

1. **Data Access Layers** — Keeping database code out of components.
2. **Multi-Tenancy & Scaling Patterns** — Isolating customers and growing safely.
3. **Database Migrations & Scaling** — Schema changes without downtime.
4. **Queues, Events & Eventual Consistency** — Designing workflows that tolerate delay.
5. **Observability** — Logs, traces, metrics, and alerts for full-stack apps.
6. **Checkpoint** _(unscaffolded)_ — Design the architecture for a multi-tenant SaaS app, including data isolation, background work, and observability.

### 3.3 — Security & Reliability

1. **Threat Modeling Full-Stack Apps** — Finding where the trust boundaries sit.
2. **Common Vulnerabilities** — XSS, CSRF, SSRF, and injection in framework apps.
3. **Secrets, Supply Chain & Dependency Risk** — Locking down what you ship.
4. **Resilience & Failure Modes** — Timeouts, retries, and graceful degradation.
5. **Compliance & Privacy Basics** — Handling personal data responsibly.
6. **Checkpoint** _(unscaffolded)_ — Run a security review of a real app, fix the top findings, and write the residual-risk report.

### 3.4 — Judgment & Communication

1. **Choosing a Framework** — Next.js, Remix, Nuxt, SvelteKit, and when plain beats all of them.
2. **Cost & Performance Trade-offs** — Serverless economics and scaling limits.
3. **Migrations & Long-Term Maintenance** — Upgrading without freezing development.
4. **Writing Architecture Decisions** — Design docs and RFCs for full-stack systems.
5. **Checkpoint** _(unscaffolded)_ — Write an architecture decision record for choosing a framework and hosting model, argued for a skeptical reviewer.
