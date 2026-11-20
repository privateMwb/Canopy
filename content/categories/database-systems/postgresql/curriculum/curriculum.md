# PostgreSQL — Curriculum

Three levels, twelve stages — SQL and schema design first, then indexes, concurrency, and operations, built toward the internals and judgment to scale, extend, and defend a Postgres design.

## Level 1 — Junior

_Go from "I've heard of Postgres" to "I can design a schema, write real queries, and connect an application to it safely."_

### 1.1 — Getting Started with Postgres

1. **Installing Postgres & Using psql** — Running a server, connecting with psql, and the meta-commands that make exploring painless.
2. **Clusters, Databases, Schemas & Roles** — How the pieces nest, what a schema is for, and why roles own everything.
3. **Data Types That Matter** — Integers, numeric, text, boolean, timestamptz, uuid — and the types that cause quiet bugs.
4. **Creating Tables & Constraints** — Primary keys, NOT NULL, UNIQUE, CHECK, and defaults that make bad data impossible.
5. **Inserting, Updating & Deleting** — INSERT, UPDATE, DELETE, and RETURNING — changing data deliberately and seeing what changed.
6. **Checkpoint** _(unscaffolded)_ — Model a small bookstore or library in SQL with constraints that reject every invalid row, then load realistic seed data.

### 1.2 — Querying Data

1. **SELECT, WHERE & Sorting** — Projecting columns, filtering rows, ORDER BY, LIMIT, and pagination basics.
2. **Joins** — INNER, LEFT, and the other joins — and how to tell which one a question needs.
3. **Aggregation & GROUP BY** — COUNT, SUM, AVG, GROUP BY, HAVING, and the rule about every selected column.
4. **Subqueries & CTEs** — WITH queries, correlated subqueries, and writing SQL that reads top to bottom.
5. **NULLs, Dates & Text Functions** — Three-valued logic, date arithmetic, intervals, and string functions you will actually use.
6. **Checkpoint** _(unscaffolded)_ — Answer ten reporting questions against a sample dataset, each with a single readable query and no application-side loops.

### 1.3 — Designing Schemas

1. **Modeling Entities & Relationships** — One-to-many, many-to-many, and join tables, drawn before they are built.
2. **Normalization in Practice** — The normal forms as a design tool, and the few cases where you break them on purpose.
3. **Foreign Keys & Referential Integrity** — ON DELETE choices, orphan rows, and letting the database enforce what the code assumes.
4. **Transactions & ACID Basics** — BEGIN, COMMIT, ROLLBACK, and what atomicity and durability actually promise.
5. **Views, Sequences & Identity Columns** — Reusable queries, generated keys, and why gaps in IDs are normal.
6. **Checkpoint** _(unscaffolded)_ — Design a normalized schema for a small booking or ordering system from a written spec, defend each key, and write the migration that creates it.

### 1.4 — Using Postgres from Code

1. **Connections, Roles & Authentication** — Connection strings, least-privilege roles, and what pg_hba.conf decides.
2. **Drivers & Parameterized Queries** — Talking to Postgres from application code and stopping SQL injection at the source.
3. **Connection Pooling Basics** — Why connections are expensive, and what a pooler like PgBouncer changes.
4. **Schema Migrations** — Versioned, repeatable schema changes, and tools that apply them safely.
5. **Import, Export & Backups** — COPY, pg_dump, pg_restore, and proving a backup can actually be restored.
6. **Checkpoint** _(unscaffolded)_ — Build a small API on a Postgres schema using migrations and parameterized queries only, then back it up and restore it to a fresh server.

## Level 2 — Intermediate

_Go from "my queries work" to "I can make them fast, reason about concurrent writers, and operate a database in production."_

### 2.1 — Indexes & Query Performance

1. **Reading EXPLAIN & EXPLAIN ANALYZE** — Plans, costs, row estimates, and finding the node where the time really goes.
2. **B-tree Indexes** — What a B-tree index serves, what it can't, and how it speeds up filters, sorts, and joins.
3. **Composite, Partial & Expression Indexes** — Column order, indexing a subset of rows, and indexing a computed value.
4. **Covering Indexes & Index-Only Scans** — INCLUDE columns, the visibility map, and avoiding trips to the heap.
5. **Statistics, ANALYZE & the Planner** — How the planner estimates, why stale statistics cause bad plans, and extended statistics.
6. **Checkpoint** _(unscaffolded)_ — Take a deliberately slow multi-million-row workload, find the five worst queries, and fix each with evidence from EXPLAIN ANALYZE.

### 2.2 — Advanced SQL

1. **Window Functions** — Running totals, ranking, and lag/lead without self-joins.
2. **Recursive CTEs & Hierarchies** — Trees, org charts, and graph walks in plain SQL.
3. **JSONB & Semi-Structured Data** — Storing documents, querying with operators, and indexing with GIN.
4. **Full-Text Search** — tsvector, tsquery, ranking, and when built-in search is enough.
5. **Upserts, ON CONFLICT & Locking Reads** — INSERT ... ON CONFLICT, SELECT ... FOR UPDATE, and idempotent writes.
6. **Checkpoint** _(unscaffolded)_ — Build a reporting and search feature using window functions, JSONB, and full-text search, with the indexes each one needs.

### 2.3 — Concurrency & Transactions

1. **MVCC Explained** — Row versions, snapshots, and why readers never block writers.
2. **Isolation Levels** — Read Committed, Repeatable Read, Serializable, and the anomalies each one allows.
3. **Locks & Deadlocks** — Row and table locks, lock queues, and reading pg_locks when things hang.
4. **Queues, Advisory Locks & SKIP LOCKED** — Building a safe job queue and coordinating work without extra infrastructure.
5. **Long Transactions & Bloat** — How one idle transaction holds back cleanup and quietly slows everything down.
6. **Checkpoint** _(unscaffolded)_ — Reproduce a lost update, a write skew, and a deadlock on purpose, then fix each with the lightest correct tool.

### 2.4 — Operating Postgres

1. **Roles, Privileges & Row-Level Security** — GRANT, default privileges, and policies that filter rows per user.
2. **Configuration That Matters** — shared_buffers, work_mem, maintenance settings, and tuning from evidence rather than folklore.
3. **Monitoring & pg_stat_statements** — Finding the slowest and most frequent queries, and logs worth reading.
4. **Vacuum & Autovacuum** — Dead tuples, freezing, and tuning autovacuum for a busy table.
5. **WAL Archiving & Point-in-Time Recovery** — Continuous backups and restoring to the minute before a mistake.
6. **Checkpoint** _(unscaffolded)_ — Stand up a monitored Postgres instance with least-privilege roles, tuned autovacuum, and a rehearsed point-in-time restore.

## Level 3 — Senior

_Go from "I run Postgres" to "I understand how it works inside, and I can scale, extend, and defend a design."_

### 3.1 — Postgres Internals

1. **Heap Pages, Tuples & TOAST** — How rows are laid out on disk and where large values go.
2. **WAL, Checkpoints & Crash Recovery** — Why writes are logged first, what a checkpoint does, and how recovery replays.
3. **The Planner & Join Algorithms** — Nested loop, hash, and merge joins, and how cost estimates choose between them.
4. **Index Internals: B-tree, GIN, GiST & BRIN** — What each index type stores and the workloads each one is built for.
5. **Memory, Processes & the Buffer Cache** — The process-per-connection model, shared buffers, and the OS page cache.
6. **Checkpoint** _(unscaffolded)_ — Use pageinspect and EXPLAIN (BUFFERS) to trace one query from plan to buffers to disk, and write up what you found.

### 3.2 — Scaling & High Availability

1. **Streaming Replication** — Standbys, synchronous versus asynchronous, and replication lag.
2. **Failover & Switchover** — Promoting a standby, avoiding split-brain, and the tools that automate it.
3. **Logical Replication & CDC** — Replicating selected tables, zero-downtime moves, and change data capture.
4. **Declarative Partitioning** — Range, list, and hash partitions, pruning, and maintaining them over time.
5. **Read Replicas & Consistency** — Routing reads safely when replicas lag behind the primary.
6. **Checkpoint** _(unscaffolded)_ — Design a primary plus replicas topology with partitioned tables and a tested failover plan, and state what each failure costs you.

### 3.3 — Extensions & Specialized Workloads

1. **Extensions & the Ecosystem** — CREATE EXTENSION, trusted extensions, and evaluating third-party ones.
2. **PL/pgSQL, Functions & Triggers** — Server-side logic, and how to decide what belongs in the database.
3. **PostGIS & Geospatial Data** — Geometry types, spatial indexes, and distance queries.
4. **pgvector & Similarity Search** — Embeddings, vector indexes, and the trade-off between recall and speed.
5. **Foreign Data Wrappers & Analytics Patterns** — Querying other systems from Postgres and shaping data for reporting.
6. **Checkpoint** _(unscaffolded)_ — Add geospatial and vector search to an existing schema, and justify each extension against the simpler alternative.

### 3.4 — Judgment & Operations

1. **Zero-Downtime Schema Changes** — Expand-and-contract migrations, lock levels, and changing big tables safely.
2. **Major Upgrades** — pg_upgrade, logical upgrades, and planning rollback.
3. **Key & Schema Design at Scale** — Bigint versus UUID keys, multi-tenancy models, and decisions that are painful to reverse.
4. **Incident Response** — Runaway queries, lock pileups, disk full, and transaction ID wraparound.
5. **When Postgres Is the Wrong Tool** — Honest limits and the cases where another store is the better answer.
6. **Checkpoint** _(unscaffolded)_ — Write a design document for a real service: schema, indexing, scaling plan, failure modes, and the risks you accept, argued for a skeptical reviewer.

