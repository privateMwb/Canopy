# Firebase — Curriculum

Three levels, twelve stages — Firestore, Auth, and security rules first, then data modeling, Cloud Functions, and realtime behavior, built toward the cost control, architecture, and judgment to scale a Firebase backend or leave it.

## Level 1 — Junior

_Go from "I've heard Firebase is easy" to "I can build an app with Firestore, Auth, and security rules that actually protect the data."_

### 1.1 — Firebase Foundations

1. **What Firebase Is** — The product family, what runs where, and the problems it removes.
2. **Projects, the Console & the CLI** — Creating a project, the Firebase CLI, and how configuration is organized.
3. **Connecting a Web App** — The modular SDK, app configuration, and what is and isn't secret.
4. **The Firestore Data Model** — Collections, documents, subcollections, and field types.
5. **Reading & Writing Documents** — Setting, adding, updating, and deleting, and what each call returns.
6. **Checkpoint** _(unscaffolded)_ — Build a small notes or tasks app that reads and writes Firestore from the browser, with data you can inspect in the console.

### 1.2 — Firestore Queries

1. **Queries & Filters** — where clauses, comparison operators, and what Firestore can and cannot filter.
2. **Ordering, Limits & Pagination** — orderBy, limit, and cursor-based paging.
3. **Real-Time Listeners** — onSnapshot, local writes, and keeping the UI in sync.
4. **Data Types, References & Timestamps** — References, server timestamps, arrays, maps, and their quirks.
5. **Composite Indexes & Query Limits** — Why some queries need an index and how to read the error that tells you.
6. **Checkpoint** _(unscaffolded)_ — Add filtering, sorting, pagination, and live updates to the app, and explain which indexes each query needs.

### 1.3 — Authentication & Security Basics

1. **Firebase Authentication** — Email, social providers, and anonymous users.
2. **Auth State & User Management** — Tracking the signed-in user, sign-out, and account linking.
3. **Your First Security Rules** — The default locked state, match and allow, and why test mode is dangerous.
4. **Ownership-Based Rules** — Letting users read and write only their own data.
5. **Testing Rules with the Emulator** — Running rules locally and proving what is allowed and denied.
6. **Checkpoint** _(unscaffolded)_ — Lock the app down so each user can reach only their own data, and write emulator tests for every allow and deny case.

### 1.4 — Beyond Firestore

1. **Cloud Storage for Firebase** — Uploading files, access rules, and download URLs.
2. **Realtime Database vs. Firestore** — The older database, its model, and how to choose between the two.
3. **Firebase Hosting & Deployment** — Deploying a site, previews, and rollbacks.
4. **The Emulator Suite** — Developing and testing the whole stack locally.
5. **Environments & Configuration** — Separate projects for development and production, and managing their configs.
6. **Checkpoint** _(unscaffolded)_ — Deploy the app to Hosting with separate dev and production projects, user-uploaded files, and a full emulator-based test run.

## Level 2 — Intermediate

_Go from "it works in the demo" to "I can model data for reads, write real security rules, and add server logic safely."_

### 2.1 — Data Modeling

1. **Modeling for Reads** — Denormalization, duplicating data on purpose, and keeping copies consistent.
2. **Subcollections vs. Top-Level Collections** — Query scope, collection group queries, and the trade-offs.
3. **Counters & Aggregations** — Aggregate queries, distributed counters, and when to precompute.
4. **Transactions & Batched Writes** — Atomic multi-document updates and their limits.
5. **Offline Persistence & Sync** — Local caching, offline writes, and how conflicts resolve.
6. **Checkpoint** _(unscaffolded)_ — Design the data model for a chat or social app from its list of screens, and defend every duplicated field.

### 2.2 — Security Rules in Depth

1. **The Rules Language** — Functions, request and resource objects, and reading rules like code.
2. **Validating Data in Rules** — Enforcing types, required fields, and allowed changes.
3. **Role-Based & Attribute-Based Access** — Custom claims, membership documents, and sharing data between users.
4. **Rules Performance & Cost** — get() and exists() calls, their limits, and their billing.
5. **Testing & CI for Rules** — Automated rules tests that run on every change.
6. **Checkpoint** _(unscaffolded)_ — Write and test a rules file for a multi-user app with roles, field validation, and shared documents, with no unprotected path.

### 2.3 — Cloud Functions & Backend Logic

1. **Triggers: Firestore, Auth & HTTP** — Running code when data changes or a request arrives.
2. **Callable Functions & App Check** — Authenticated client calls, and verifying that requests come from your app.
3. **Scheduled & Background Work** — Cron-style jobs and long-running tasks.
4. **Idempotency, Retries & Errors** — Handling duplicate deliveries without duplicate effects.
5. **Configuration & Secrets** — Environment values, secret storage, and keeping keys out of code.
6. **Checkpoint** _(unscaffolded)_ — Add server logic for something clients must not do themselves, such as payments or role changes, and make it safe to retry.

### 2.4 — Realtime & Mobile Concerns

1. **The Realtime Database Model** — Tree data, queries, and the situations where it still wins.
2. **Listener Management & Read Costs** — Detaching listeners, and what a chatty UI costs on the bill.
3. **Offline Behavior & Conflict Handling** — Designing for flaky connections and concurrent edits.
4. **Cloud Messaging** — Push notifications and message handling on web and mobile.
5. **Remote Config & Analytics** — Changing behavior without a release, and measuring what users do.
6. **Checkpoint** _(unscaffolded)_ — Make an app behave well offline, reduce its read count by half with evidence, and add a feature flag and a push notification.

## Level 3 — Senior

_Go from "I use Firebase" to "I can control cost and scale, design the architecture, and decide whether Firebase is the right backend."_

### 3.1 — Scaling & Cost

1. **How Firebase Pricing Works** — Reads, writes, deletes, storage, and the traps that cause surprise bills.
2. **Hotspots & Write Limits** — Sequential keys, index hotspots, and per-document write rates.
3. **Index Design & Exemptions** — Controlling index storage and write cost.
4. **Pagination, Bundles & Caching at Scale** — Reducing reads for popular, read-heavy data.
5. **Quotas, Limits & Locations** — Hard limits, region choice, and planning around both.
6. **Checkpoint** _(unscaffolded)_ — Estimate the monthly cost of a real workload, find the three biggest cost drivers, and redesign to cut them.

### 3.2 — Architecture Patterns

1. **Direct Client Access vs. a Backend Layer** — When security rules are enough and when an API is safer.
2. **Multi-Tenancy** — Isolating customers in one project, and the limits of that approach.
3. **Data Lifecycle: TTL, Exports & Backups** — Expiring data, scheduled exports, and point-in-time recovery.
4. **Eventing & Analytics Integration** — Pub/Sub, BigQuery export, and feeding other systems.
5. **Adding Search** — Why Firestore has no full-text search and how to bolt it on.
6. **Checkpoint** _(unscaffolded)_ — Design a multi-tenant architecture for a SaaS product on Firebase, including its backup, search, and analytics paths.

### 3.3 — Security & Reliability

1. **Abuse Prevention & App Check** — Stopping scripted clients and quota exhaustion.
2. **Threat Modeling for Rules** — Reviewing rules as an attacker would.
3. **Admin SDK & Privileged Access** — What bypasses rules, and keeping that access minimal.
4. **Disaster Recovery** — Backups, restores, and the failure scenarios a managed service doesn't solve for you.
5. **Logging & Observability** — Function logs, alerts, and tracing a problem across services.
6. **Checkpoint** _(unscaffolded)_ — Run a security review of an existing Firebase project, report concrete findings ranked by risk, and fix the top three.

### 3.4 — Judgment & Migration

1. **Firebase or Postgres?** — A decision framework for relational versus document, and managed versus self-run.
2. **Vendor Lock-in & Exit Strategy** — What is portable, what isn't, and planning an exit before you need one.
3. **Migrating Data In and Out** — Exports, transformations, and moving without downtime.
4. **Cost Forecasting & Growth Planning** — What happens to the bill and the design at ten times the users.
5. **When Firebase Is the Wrong Tool** — Honest limits and the cases where another backend wins.
6. **Checkpoint** _(unscaffolded)_ — Write a design document for a real product: why Firebase, the data model, cost forecast, exit plan, and the risks you accept, argued for a skeptical reviewer.

