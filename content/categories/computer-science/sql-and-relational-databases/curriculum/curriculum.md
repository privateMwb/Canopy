# SQL & Relational Databases — Curriculum

Three levels, twelve stages — how data is modeled, stored, queried, and kept correct, built toward the judgment to tune a slow system, design for failure, and defend a data architecture.

## Level 1 — Junior

_Go from "I've heard of SQL" to "I can design a small schema, write the queries to work with it, and use it safely from application code."_

### 1.1 — Relational Foundations

1. **What a Database Is & Why We Use One** — What a DBMS does that a pile of files can't, and where relational databases fit.
2. **The Relational Model: Tables, Keys & Relationships** — Rows, columns, primary keys, foreign keys, and how tables point at each other.
3. **SQL Basics: SELECT, WHERE & Sorting** — Reading data: projecting columns, filtering rows, ordering, and limiting results.
4. **Modifying Data: INSERT, UPDATE & DELETE** — Writing data, and the habits that keep an UPDATE without a WHERE from ruining your day.
5. **Data Types, NULL & Constraints** — Choosing types, how NULL's three-valued logic surprises people, and letting the database enforce rules.
6. **Checkpoint** _(unscaffolded)_ — Create a small database from scratch with tables, keys, and constraints, load sample data, and answer five questions about it with queries.

### 1.2 — Querying with SQL

1. **Joins: Combining Tables** — INNER, LEFT, and the other joins, and how to reason about which rows survive.
2. **Aggregation & GROUP BY** — COUNT, SUM, AVG, grouping, and the difference between WHERE and HAVING.
3. **Subqueries & CTEs** — Nesting queries, naming intermediate results, and keeping long queries readable.
4. **Set Operations, CASE & Handling NULLs** — UNION, INTERSECT, EXCEPT, conditional expressions, and COALESCE.
5. **Checkpoint** _(unscaffolded)_ — Given an unfamiliar schema and ten business questions, write the queries, then explain what each join and grouping is doing.

### 1.3 — Designing Schemas

1. **Entity-Relationship Modeling** — Turning a description of a business into entities, attributes, and relationships.
2. **Normalization: 1NF Through 3NF** — Removing redundancy step by step, and the update anomalies each form prevents.
3. **One-to-Many, Many-to-Many & Junction Tables** — Modeling each relationship shape, including relationships that carry their own data.
4. **Denormalization & When to Break the Rules** — Trading redundancy for read speed, deliberately and with eyes open.
5. **Schema Migrations: Changing a Schema Safely** — Versioned migration files, adding and dropping columns, and keeping dev and prod in step.
6. **Checkpoint** _(unscaffolded)_ — Model a small product (for example a bookstore or a ride-sharing app) from a written brief, normalize it, and justify any denormalization.

### 1.4 — Using a Database from Code

1. **Connecting from an Application** — Drivers, connection strings, and the lifecycle of a connection.
2. **Parameterized Queries & SQL Injection** — How string-built SQL gets exploited, and why placeholders fix it.
3. **Transactions & ACID Basics** — BEGIN, COMMIT, ROLLBACK, and what atomicity and durability actually promise.
4. **ORMs vs. Raw SQL** — What an ORM buys you, where it leaks, and reading the SQL it generates.
5. **Checkpoint** _(unscaffolded)_ — Build a small command-line or web app backed by a real database, using parameterized queries and a transaction for a multi-step update.

## Level 2 — Intermediate

_Go from "I can build with a database" to "I can make it fast, reason about concurrent users, and pick the right data model for the job."_

### 2.1 — Indexes & Query Performance

1. **How B-Tree Indexes Work** — Why an index turns a table scan into a handful of page reads.
2. **Composite, Covering & Partial Indexes** — Column order, index-only scans, and indexing only the rows you query.
3. **Reading EXPLAIN Plans** — Scan types, join strategies, row estimates, and spotting where the time goes.
4. **The Query Planner & Table Statistics** — How the optimizer chooses a plan, and why stale statistics cause bad ones.
5. **Common Slow-Query Patterns** — N+1 queries, SELECT *, functions on indexed columns, and unbounded OFFSET.
6. **Checkpoint** _(unscaffolded)_ — Take a slow query against a million-row table, diagnose it with EXPLAIN, fix it, and show before-and-after timings.

### 2.2 — Transactions & Concurrency

1. **Isolation Levels & Anomalies** — Dirty reads, non-repeatable reads, phantoms, and what each level prevents.
2. **Locking, Deadlocks & Lock Contention** — Row and table locks, how deadlocks form, and how databases resolve them.
3. **MVCC: Readers Without Blocking** — Row versions and snapshots, and why reads rarely wait for writes.
4. **Optimistic vs. Pessimistic Concurrency** — Version columns, SELECT FOR UPDATE, and choosing by how often conflicts happen.
5. **Checkpoint** _(unscaffolded)_ — Reproduce a lost update and a deadlock with two concurrent sessions, then fix each and explain why the fix works.

### 2.3 — Advanced SQL & Data Modeling

1. **Window Functions** — Ranking, running totals, and comparing a row to its neighbors without collapsing rows.
2. **Recursive CTEs & Hierarchical Data** — Org charts, category trees, and the tradeoffs of adjacency lists vs. other tree models.
3. **JSON & Semi-Structured Data in SQL** — Storing, querying, and indexing JSON columns, and knowing when it's the wrong choice.
4. **Views, Triggers & Stored Procedures** — Logic that lives inside the database, and the maintenance cost it carries.
5. **Checkpoint** _(unscaffolded)_ — Write an analytics report using window functions and a recursive query, and decide in writing which logic belongs in SQL and which in the app.

### 2.4 — Beyond Relational

1. **The NoSQL Landscape** — Key-value, document, wide-column, and graph stores, and the problem each was built for.
2. **Document Databases & Data Modeling** — Embedding vs. referencing, and designing around access patterns instead of entities.
3. **Redis & Caching Patterns** — Cache-aside, write-through, expiry, and invalidation, the hard part.
4. **Choosing Between SQL and NoSQL** — A practical decision framework, and why 'it needs to scale' is rarely enough.
5. **Checkpoint** _(unscaffolded)_ — Model the same application in a relational database and a document store, compare the queries each needs, and recommend one.

## Level 3 — Senior

_Go from "I can build and tune a database-backed app" to "I can explain how the engine works, design for scale and failure, run it in production, and defend a data architecture."_

### 3.1 — Storage Engine Internals

1. **Pages, Heap Files & the Buffer Pool** — How rows are laid out on disk and how memory caches them.
2. **B-Trees vs. LSM-Trees** — Read-optimized vs. write-optimized storage, compaction, and write amplification.
3. **Write-Ahead Logging & Crash Recovery** — How a database stays durable and consistent after power loss.
4. **Query Execution & Join Algorithms** — Nested loop, hash, and merge joins, and when the planner picks each.
5. **Checkpoint** _(unscaffolded)_ — Build a tiny key-value store with a write-ahead log, kill it mid-write, and show that it recovers correctly.

### 3.2 — Replication, Partitioning & Distributed Data

1. **Replication: Leaders, Followers & Lag** — Sync vs. async replication, failover, and reading stale data.
2. **Partitioning & Sharding** — Choosing a shard key, hotspots, rebalancing, and the queries sharding breaks.
3. **CAP, PACELC & Consistency Models** — What 'eventual' and 'strong' consistency mean in practice, beyond the slogan.
4. **Distributed Transactions: 2PC & Sagas** — Coordinating changes across databases, and living with partial failure.
5. **Checkpoint** _(unscaffolded)_ — Design the replication and sharding strategy for a growing multi-region application, and walk through what happens during a failover.

### 3.3 — Operating Databases in Production

1. **Backups, Point-in-Time Recovery & Disaster Recovery** — RPO and RTO, and why an untested backup is a hope, not a backup.
2. **Zero-Downtime Schema Migrations** — Expand-and-contract, backfills, and avoiding the table lock that takes the site down.
3. **Connection Pooling, Capacity & Monitoring** — Pool sizing, the metrics that matter, and spotting trouble before users do.
4. **Database Security: Roles, Row-Level Security & Encryption** — Least privilege, tenant isolation, encryption at rest and in transit, and auditing.
5. **Checkpoint** _(unscaffolded)_ — Write a runbook for restoring a database to a point in time, and perform the restore against a practice dataset.

### 3.4 — Data Architecture & Design Judgment

1. **OLTP vs. OLAP & Columnar Warehouses** — Why analytics needs a different storage layout, and how data gets there.
2. **Change Data Capture, Event Sourcing & the Outbox Pattern** — Keeping systems in sync without dual writes.
3. **Diagnosing a Slow or Failing Production Database** — A structured method: workload, locks, I/O, plans, then the application.
4. **Designing and Defending a Data Architecture** — Making tradeoffs explicit and explaining them to engineers and non-engineers.
5. **Checkpoint** _(unscaffolded)_ — Given a set of product requirements and traffic numbers, propose a data architecture and write a short design document that defends it.
