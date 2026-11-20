# SQLite — Curriculum

Three levels, twelve stages — the SQL and file model first, then performance, concurrency, and the feature set, built toward the internals and judgment to run SQLite in production and know when to outgrow it.

## Level 1 — Junior

_Go from "I've seen a .db file" to "I can create schemas, query data, and embed SQLite in an application correctly."_

### 1.1 — Getting Started with SQLite

1. **What SQLite Is** — A serverless, single-file, embedded database, and where it's already running.
2. **The sqlite3 Shell & Dot Commands** — Opening a database, exploring it, and the commands that aren't SQL.
3. **Type Affinity & Storage Classes** — SQLite's flexible typing, what affinity means, and the surprises it causes.
4. **Creating Tables & Constraints** — Primary keys, rowid, NOT NULL, UNIQUE, CHECK, and STRICT tables.
5. **Inserting, Updating & Deleting** — Changing data and checking the result.
6. **Checkpoint** _(unscaffolded)_ — Model a small personal-finance or notes database with constraints that reject bad data, and load sample rows.

### 1.2 — Querying Data

1. **SELECT, Filtering & Sorting** — Selecting, WHERE, ORDER BY, and LIMIT with offsets.
2. **Joins & Aggregation** — Combining tables and summarizing with GROUP BY.
3. **Subqueries & CTEs** — Building queries in readable steps.
4. **Date, Time & Text Functions** — SQLite's date functions and string handling, and storing time sensibly.
5. **Views & Basic Indexes** — Reusable queries, and the first index you add.
6. **Checkpoint** _(unscaffolded)_ — Answer a set of reporting questions on a sample dataset with single readable queries and a couple of well-chosen indexes.

### 1.3 — Using SQLite in Applications

1. **Drivers & Language Bindings** — Opening databases from Python, JavaScript, and other languages.
2. **Parameterized Queries** — Binding values and avoiding SQL injection.
3. **Transactions & Autocommit** — Grouping changes, and why many small writes are slow.
4. **Schema Migrations with user_version** — Versioning a schema inside the file and upgrading it safely.
5. **Embedding SQLite in Apps** — Mobile, desktop, and CLI use, and where to keep the file.
6. **Checkpoint** _(unscaffolded)_ — Build a small app that stores its data in SQLite, with migrations, parameterized queries, and a test suite.

### 1.4 — Files, Backups & Tools

1. **Anatomy of a Database File** — One file, its sidecar files, and what portability means.
2. **Backups: .backup & VACUUM INTO** — Copying a live database safely.
3. **Import & Export** — CSV, SQL dumps, and moving data between systems.
4. **Inspecting with Tools** — GUI and command-line tools for debugging a database.
5. **Foreign Keys, Pragmas & Defaults** — The settings that are off by default and why you should turn them on.
6. **Checkpoint** _(unscaffolded)_ — Ship the app with a safe backup command, foreign keys enforced, and a documented procedure for restoring from a backup.

## Level 2 — Intermediate

_Go from "it works" to "I can make it fast, handle concurrent access, and use its advanced features."_

### 2.1 — Performance

1. **EXPLAIN QUERY PLAN** — Reading scans, searches, and why a query chose its plan.
2. **Covering, Partial & Expression Indexes** — Indexes beyond the basics and their write cost.
3. **ANALYZE & the Query Planner** — Statistics, and helping the planner choose well.
4. **Performance PRAGMAs** — cache_size, synchronous, journal_mode, and what each trades.
5. **Batching & Bulk Loading** — Transactions, prepared statements, and loading a million rows quickly.
6. **Checkpoint** _(unscaffolded)_ — Take a slow workload, measure it, and speed it up by an order of magnitude, showing which change contributed what.

### 2.2 — Concurrency & Durability

1. **The Locking Model** — Shared, reserved, and exclusive locks, and what blocks what.
2. **Rollback Journal vs. WAL Mode** — How each works, and why WAL changes the concurrency story.
3. **Transaction Types & Busy Handling** — DEFERRED, IMMEDIATE, EXCLUSIVE, and busy timeouts that behave.
4. **Durability & the synchronous Setting** — What survives a power loss under each configuration.
5. **Multi-Process Access & Pitfalls** — Several writers, network file systems, and why they don't mix.
6. **Checkpoint** _(unscaffolded)_ — Stress a database with concurrent readers and writers, trigger and fix SQLITE_BUSY, and document the guarantees you ended up with.

### 2.3 — Advanced Features

1. **JSON Functions** — Storing, querying, and indexing JSON in SQLite.
2. **Full-Text Search with FTS5** — Building a search index, ranking, and keeping it in sync.
3. **Window Functions & Generated Columns** — Analytics and computed columns inside SQLite.
4. **Triggers & UPSERT** — Reacting to changes, and insert-or-update in one statement.
5. **STRICT Tables & Constraints Revisited** — Getting real type safety out of a flexible engine.
6. **Checkpoint** _(unscaffolded)_ — Add search, JSON queries, and an audit trail to an existing app using only built-in SQLite features.

### 2.4 — Extending & Integrating

1. **User-Defined Functions** — Registering your own functions from application code.
2. **Virtual Tables** — Exposing other data as tables, and how FTS and R-Tree use them.
3. **Loadable Extensions** — Adding capabilities such as vectors or geospatial indexes.
4. **ORMs & Query Builders** — What they help with, and where they fight SQLite.
5. **Testing with SQLite** — In-memory databases, fixtures, and the risk of testing against a different engine than production.
6. **Checkpoint** _(unscaffolded)_ — Integrate SQLite with a larger application using an ORM and a custom extension, and write tests that run against a realistic database.

## Level 3 — Senior

_Go from "I use SQLite" to "I understand how it works inside, I can run it in production, and I know when to move on."_

### 3.1 — SQLite Internals

1. **The B-Tree File Format** — Pages, the file header, and how tables and indexes are stored.
2. **The Pager & Page Cache** — Reading, caching, and writing pages.
3. **WAL Internals & Checkpointing** — The WAL file, the wal-index, and when checkpoints run.
4. **The Query Planner & the VDBE** — How SQL becomes bytecode, and how to read it.
5. **Atomic Commit & Crash Recovery** — Why SQLite stays consistent through power loss.
6. **Checkpoint** _(unscaffolded)_ — Inspect a real database file at the byte level, then trace one transaction through the pager and journal, and write up what you found.

### 3.2 — Scaling Up & Out

1. **Read/Write Patterns & the Single Writer** — Designing around one writer at a time.
2. **Per-Tenant Databases** — Sharding by file and what it makes simpler or harder.
3. **Replication & Sync** — Streaming backups and replication tools such as Litestream, LiteFS, and rqlite.
4. **SQLite at the Edge** — Hosted and distributed variants such as libSQL and Cloudflare D1.
5. **Large Databases & Limits** — Size, row, and parameter limits, and how big is too big.
6. **Checkpoint** _(unscaffolded)_ — Design a multi-tenant SQLite deployment with replication and backups, and state exactly what it can and can't survive.

### 3.3 — Reliability & Security

1. **Corruption: Causes & Detection** — How databases get damaged and how integrity_check finds it.
2. **Backup Strategy & Restore Testing** — Schedules, retention, and rehearsing the restore.
3. **Encryption & Security** — SQLCipher, file permissions, and injection risks.
4. **Migrations at Scale** — Changing schemas across many deployed files and clients.
5. **Observability** — Measuring slow queries and lock waits in an embedded engine.
6. **Checkpoint** _(unscaffolded)_ — Write a reliability plan for a shipped product covering corruption, backups, encryption, and rolling out a schema change to thousands of installs.

### 3.4 — Judgment & Design

1. **When SQLite Is Enough** — Where it matches or beats a server database, and the evidence.
2. **SQLite as an Application File Format** — Using a database file as a document format.
3. **Choosing Between SQLite and Postgres** — A decision framework based on concurrency, scale, and operations.
4. **Migrating to a Server Database** — Planning a path out before you need it.
5. **Case Studies in Production Use** — How real products use SQLite, and what they learned.
6. **Checkpoint** _(unscaffolded)_ — Write a design document for a real product: why SQLite, the concurrency model, backups, the migration trigger, and the risks you accept, argued for a skeptical reviewer.

