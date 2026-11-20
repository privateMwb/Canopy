# Backend & APIs — Curriculum

Three levels, twelve stages — HTTP, servers, data, and authentication, built toward backend services that are reliable, secure, and easy for others to integrate with. Examples use Node.js, but the concepts apply to any backend stack.

## Level 1 — Junior

_Go from "I can build a front end" to "I can build, run, and test a small HTTP server that stores data in a database and protects it with login."_

### 1.1 — How the Backend Works

1. **Clients, Servers & HTTP** — Requests, responses, methods, status codes, and headers.
2. **Your First Server** — Building a server in Node.js and handling routes.
3. **Routing & Middleware** — Express-style routing and the middleware chain.
4. **Request Parsing & Validation** — Query strings, JSON bodies, and rejecting bad input.
5. **Testing Endpoints by Hand** — curl, Postman, and reading raw responses.
6. **Checkpoint** _(unscaffolded)_ — Build a small server with five routes, input validation, and correct status codes for every error case.

### 1.2 — Data & Persistence

1. **Relational Databases & SQL Basics** — Tables, queries, and why databases exist.
2. **Connecting from Code** — Drivers, connection pools, and parameterized queries.
3. **ORMs & Query Builders** — Prisma and Drizzle: benefits and costs.
4. **Schema Design Basics** — Keys, relations, and normalization.
5. **Migrations** — Evolving a schema safely over time.
6. **Checkpoint** _(unscaffolded)_ — Build a notes API with a real database, migrations, and a schema that supports users and tags.

### 1.3 — REST API Design

1. **REST Principles & Resources** — Nouns, verbs, and designing URLs.
2. **CRUD Endpoints** — Create, read, update, and delete done correctly.
3. **Status Codes & Error Responses** — Consistent, helpful error shapes.
4. **Pagination, Filtering & Sorting** — Lists that don't return everything.
5. **API Documentation with OpenAPI** — A contract that doubles as docs and tests.
6. **Checkpoint** _(unscaffolded)_ — Design and document a REST API for a small product, then implement it so it matches its OpenAPI spec.

### 1.4 — Authentication Basics

1. **Passwords & Hashing** — bcrypt and argon2, salts, and why not to roll your own.
2. **Sessions & Cookies** — Server-side sessions and secure cookie settings.
3. **Tokens & JWTs** — Stateless auth and its trade-offs.
4. **Authorization Basics** — Who can do what, enforced on the server.
5. **Environment Config & Secrets** — Keeping credentials out of code.
6. **Checkpoint** _(unscaffolded)_ — Add registration, login, and protected routes to your API, and show that another user's data is inaccessible.

## Level 2 — Intermediate

_Go from "I can build a working API" to "I build reliable, secure, well-tested services with caching, background jobs, and real-world integrations."_

### 2.1 — API Design in Depth

1. **Versioning & Evolution** — Changing an API without breaking clients.
2. **Idempotency & Retries** — Making unsafe operations safe to retry.
3. **GraphQL Fundamentals** — Schemas, resolvers, and when GraphQL fits.
4. **Realtime APIs** — WebSockets and server-sent events.
5. **gRPC & Internal APIs** — Contracts between services.
6. **Checkpoint** _(unscaffolded)_ — Build the same feature as REST and as GraphQL, then argue which suits it better.

### 2.2 — Data & Performance

1. **Indexes & Query Performance** — Reading query plans and fixing slow queries.
2. **Transactions & Concurrency** — ACID, isolation levels, and race conditions.
3. **Caching with Redis** — Cache-aside, TTLs, and invalidation.
4. **Background Jobs & Queues** — Moving slow work out of the request.
5. **File Storage & Third-Party Integrations** — Object storage, email, and payments.
6. **Checkpoint** _(unscaffolded)_ — Take a slow endpoint, profile it, add the right index and cache, and show the latency improvement.

### 2.3 — Security

1. **The OWASP API Top Ten** — The most common API vulnerabilities.
2. **Input Validation & Injection** — SQL injection, command injection, and safe handling.
3. **OAuth 2.0 & OpenID Connect** — Delegated login and tokens done right.
4. **Rate Limiting, CORS & Hardening** — Protecting a public API.
5. **Secrets Management & Auditing** — Rotating keys and knowing who did what.
6. **Checkpoint** _(unscaffolded)_ — Audit your API against the OWASP Top Ten and fix every finding you can reproduce.

### 2.4 — Testing & Operations

1. **Unit & Integration Testing** — Testing logic and endpoints against a test database.
2. **Contract Testing** — Keeping clients and servers in agreement.
3. **Logging, Metrics & Tracing** — Seeing inside a running service.
4. **Docker for Backend Services** — Packaging and running consistently.
5. **CI/CD & Deployments** — Automated releases with rollbacks.
6. **Checkpoint** _(unscaffolded)_ — Containerize your API, add CI with tests, and deploy it with health checks and structured logs.

## Level 3 — Senior

_Go from "I build solid services" to "I design systems that scale, fail gracefully, and evolve, and can defend architectural decisions."_

### 3.1 — Architecture

1. **Monoliths, Modules & Microservices** — Choosing boundaries, and the cost of splitting.
2. **Domain Modeling & Clean Boundaries** — Keeping business logic independent.
3. **Event-Driven Architecture** — Queues, streams, and eventual consistency.
4. **API Gateways & BFFs** — Shaping APIs for different clients.
5. **Multi-Tenancy & Data Isolation** — Serving many customers safely.
6. **Checkpoint** _(unscaffolded)_ — Design the backend architecture for a product, justifying each boundary and the failure modes it creates.

### 3.2 — Scale & Reliability

1. **Horizontal Scaling & Load Balancing** — Stateless services, and where state hides.
2. **Database Scaling** — Replication, partitioning, and sharding.
3. **Resilience Patterns** — Timeouts, circuit breakers, bulkheads, and backpressure.
4. **Distributed Systems Pitfalls** — Clocks, partial failure, and consistency trade-offs.
5. **Load Testing & Capacity Planning** — Finding limits before users do.
6. **Checkpoint** _(unscaffolded)_ — Load-test a service, find its first bottleneck, fix it, and document the capacity you now have.

### 3.3 — Operating in Production

1. **Observability Practice** — SLIs, SLOs, alerting, and dashboards that help.
2. **Incident Response & Postmortems** — Debugging live systems and learning from outages.
3. **Zero-Downtime Deploys & Migrations** — Expand and contract, feature flags, and rollbacks.
4. **Cost & Performance Engineering** — Finding waste and speeding up hot paths.
5. **Security Operations** — Dependency scanning, secrets rotation, and incident readiness.
6. **Checkpoint** _(unscaffolded)_ — Write a runbook and a postmortem for a simulated production outage, including the fix and a prevention plan.

### 3.4 — Judgment & Communication

1. **Designing APIs for Other Teams** — Treating consumers as customers.
2. **Build vs. Buy** — Evaluating services, frameworks, and platforms.
3. **Technical Debt & Migration Strategy** — Paying down risk deliberately.
4. **Writing Design Docs & RFCs** — Getting buy-in for technical change.
5. **Checkpoint** _(unscaffolded)_ — Write a design document for a real backend change, with alternatives, risks, and a rollout plan, argued for a skeptical reviewer.
