# MongoDB — Curriculum

Three levels, twelve stages — the document model and queries first, then aggregation, indexing, and consistency, built toward the internals and judgment to model, shard, and operate MongoDB at scale.

## Level 1 — Junior

_Go from "I've seen JSON in a database" to "I can model documents, write real queries, and connect an application safely."_

### 1.1 — Documents & the Shell

1. **The Document Model & BSON** — Documents, fields, arrays, and the BSON types behind the JSON you see.
2. **Installing MongoDB, mongosh & Atlas** — Running a local server, the shell, and a free hosted cluster.
3. **Databases, Collections & _id** — How data is organized, ObjectId, and why every document has a key.
4. **CRUD Basics** — insertOne, find, updateOne, deleteOne, and their many-document forms.
5. **Query Operators & Projection** — $gt, $in, $and, and returning only the fields you need.
6. **Checkpoint** _(unscaffolded)_ — Model a small product catalog as documents, load sample data, and answer ten questions with find queries alone.

### 1.2 — Working with Data

1. **Update Operators & Arrays** — $set, $inc, $push, $pull, and changing documents without rewriting them.
2. **Querying Nested Documents & Arrays** — Dot notation, $elemMatch, and the array query traps.
3. **Sorting, Pagination & Cursors** — sort, limit, skip, and range-based paging that stays fast.
4. **Validation & JSON Schema** — Adding structure to a flexible database without giving up flexibility.
5. **Import, Export & Backup Tools** — mongoimport, mongoexport, mongodump, and mongorestore.
6. **Checkpoint** _(unscaffolded)_ — Import a messy dataset, add schema validation that rejects bad documents, and write the updates that clean up the rest.

### 1.3 — Modeling Documents

1. **Embedding vs. Referencing** — The central modeling decision, and how to make it from the access pattern.
2. **One-to-Many & Many-to-Many** — Arrays of subdocuments, references, and the pitfalls of each.
3. **Modeling from Access Patterns** — Start from the queries, not the entities.
4. **Document Growth & Size Limits** — The 16 MB limit, unbounded arrays, and why they hurt long before the limit.
5. **A First Look at Common Patterns** — Subset, bucket, and computed values, introduced through small examples.
6. **Checkpoint** _(unscaffolded)_ — Design a document model for a blog or ordering system from a list of required queries, and defend every embed and reference.

### 1.4 — Using MongoDB from Code

1. **Drivers & Connection Strings** — Connecting from application code, pooling, and handling secrets.
2. **Native Driver vs. ODMs** — What Mongoose-style layers add, and what they hide.
3. **Indexes Basics** — Single-field, unique, and TTL indexes, and what happens without them.
4. **Errors, Duplicates & Retries** — Handling duplicate keys, timeouts, and retryable operations.
5. **Atlas, Users & Network Access** — Creating least-privilege users and locking down who can connect.
6. **Checkpoint** _(unscaffolded)_ — Build a small API over MongoDB with indexes, validation, and error handling, then deploy it against a hosted cluster.

## Level 2 — Intermediate

_Go from "my queries return data" to "I can aggregate, index for performance, and reason about consistency and transactions."_

### 2.1 — The Aggregation Framework

1. **Pipelines, $match, $group & $project** — Thinking in stages, and replacing application loops with a pipeline.
2. **$lookup & Joining Collections** — Left outer joins in MongoDB and when a join is a sign of a model problem.
3. **$unwind, $facet & $bucket** — Reshaping arrays and computing several results in one pass.
4. **Pipeline Optimization** — Stage ordering, using indexes early, and reading pipeline explain output.
5. **Views, $merge & $out** — Materializing results and building reusable read models.
6. **Checkpoint** _(unscaffolded)_ — Build a reporting pipeline with grouping, joins, and facets, then optimize it with evidence from explain.

### 2.2 — Indexes & Query Performance

1. **How Indexes Work** — B-trees over documents, multikey indexes, and what an index costs on writes.
2. **Compound Indexes & the ESR Rule** — Ordering fields by equality, sort, and range.
3. **Reading explain()** — Query plans, stages, keys examined, and spotting a collection scan.
4. **Partial, Sparse, Text & Wildcard Indexes** — Indexing only what you need, and the specialized types.
5. **Covered Queries & the Profiler** — Answering from the index and finding slow operations in production.
6. **Checkpoint** _(unscaffolded)_ — Take a slow workload, find its worst queries with the profiler, and fix each with a justified index.

### 2.3 — Consistency & Transactions

1. **Write Concern & Durability** — w, j, and what acknowledged actually means.
2. **Read Concern & Read Preference** — Reading from secondaries and the staleness you accept.
3. **Multi-Document Transactions** — When you need them, what they cost, and how to keep them short.
4. **Atomic Single-Document Operations** — Designing so most updates need no transaction at all.
5. **Change Streams** — Reacting to changes in real time, and resuming after a failure.
6. **Checkpoint** _(unscaffolded)_ — Implement a money-transfer or inventory flow two ways, with and without transactions, and compare their guarantees and costs.

### 2.4 — Advanced Modeling

1. **The Pattern Catalog** — Bucket, outlier, extended reference, computed, and polymorphic patterns.
2. **Schema Versioning & Migrations** — Evolving documents in place without downtime.
3. **Time Series Collections** — Storing and querying measurements efficiently.
4. **Anti-Patterns to Avoid** — Unbounded arrays, massive documents, and over-normalizing.
5. **Search & Vector Search** — Atlas Search, vector indexes, and when you need a search engine alongside the database.
6. **Checkpoint** _(unscaffolded)_ — Refactor a poorly modeled collection using at least three patterns, with before-and-after query and storage measurements.

## Level 3 — Senior

_Go from "I use MongoDB" to "I understand how it stores and replicates data, and I can shard, secure, and defend a design."_

### 3.1 — MongoDB Internals

1. **The WiredTiger Storage Engine** — B-trees, document-level concurrency, and compression.
2. **Journaling, Checkpoints & Durability** — What survives a crash and how recovery works.
3. **The Cache & Memory Behavior** — WiredTiger cache sizing, eviction, and working-set thinking.
4. **The Oplog & Replication Mechanics** — How changes flow to secondaries and what the oplog window means.
5. **The Query Planner & Plan Cache** — How plans are chosen, cached, and invalidated.
6. **Checkpoint** _(unscaffolded)_ — Trace one write from the client through the journal and oplog to a secondary, and explain each durability setting involved.

### 3.2 — Replication & Sharding

1. **Replica Sets & Elections** — Roles, voting, and what happens when a primary disappears.
2. **Failover, Rollback & Trade-offs** — Write concern against data loss, and how rollbacks happen.
3. **Sharding Fundamentals** — Shards, mongos, config servers, and routing.
4. **Choosing a Shard Key** — Cardinality, frequency, monotonicity, and the cost of a wrong choice.
5. **Balancing, Hotspots & Resharding** — Chunk migration, uneven load, and changing a key later.
6. **Checkpoint** _(unscaffolded)_ — Design a sharded topology and shard key for a high-volume workload, and show how it behaves under hotspots and node failure.

### 3.3 — Operations & Security

1. **Backups & Restores** — Dumps, snapshots, and point-in-time recovery, and proving they work.
2. **Monitoring & Capacity Planning** — The metrics that matter and sizing for growth.
3. **Authentication, RBAC & Encryption** — Users and roles, TLS, and encryption at rest and in use.
4. **Upgrades & Compatibility** — Version upgrades, feature compatibility, and rollback plans.
5. **Incident Response** — Slow clusters, replication lag, and disk pressure under pressure.
6. **Checkpoint** _(unscaffolded)_ — Write a runbook for a production cluster covering backup, restore, upgrade, and the three incidents you most expect.

### 3.4 — Judgment & Design

1. **Modeling Trade-offs at Scale** — Where flexibility turns into cost, and where it pays off.
2. **MongoDB or a Relational Database?** — A decision framework that avoids both fashion and prejudice.
3. **Migrating To and From MongoDB** — Moving data and application code without a big bang.
4. **Vector & AI Workloads** — Embeddings, retrieval, and where a document store fits.
5. **When MongoDB Is the Wrong Tool** — Honest limits and the cases where another store wins.
6. **Checkpoint** _(unscaffolded)_ — Write a design document for a real service: data model, indexes, sharding plan, consistency choices, and the risks you accept, argued for a skeptical reviewer.

