# Redis — Curriculum

Three levels, twelve stages — data structures and common patterns first, then streams, caching strategy, and replication, built toward the internals and judgment to cluster, secure, and defend a Redis design.

## Level 1 — Junior

_Go from "I've heard Redis is a cache" to "I can use its data structures and build caching, sessions, and rate limiting correctly."_

### 1.1 — Getting Started with Redis

1. **What Redis Is & When to Use It** — An in-memory data structure server, and the problems it is actually good at.
2. **Installing Redis & Using redis-cli** — Running a server, the command line, and exploring keys.
3. **Strings, Keys & Expiration** — GET, SET, TTLs, and the commands that touch every value.
4. **Naming Keys & Key Design** — Namespaces, conventions, and keeping a keyspace understandable.
5. **Atomic Counters & INCR** — Why single commands are atomic and how that replaces a lot of locking.
6. **Checkpoint** _(unscaffolded)_ — Build a page-view counter, a URL shortener, and a temporary-token store using only strings, counters, and TTLs.

### 1.2 — Core Data Structures

1. **Lists** — Pushing, popping, and using lists as stacks, queues, and timelines.
2. **Hashes** — Storing objects as field-value maps and updating single fields.
3. **Sets** — Uniqueness, membership, and set algebra across keys.
4. **Sorted Sets** — Scores, ranges, and leaderboards that stay ordered automatically.
5. **Choosing the Right Structure** — Matching the data structure to the access pattern, and the cost of getting it wrong.
6. **Checkpoint** _(unscaffolded)_ — Model a leaderboard, a tag system, and a session store, each with the structure that fits, and explain why not the others.

### 1.3 — Common Patterns

1. **Cache-Aside Caching** — Reading through the cache, filling on a miss, and setting sensible TTLs.
2. **Sessions & Rate Limiting** — Storing login state and limiting requests per user or IP.
3. **Pub/Sub Messaging** — Publishing and subscribing, and what fire-and-forget implies.
4. **Leaderboards & Counting at Scale** — Ranking, top-N queries, and approximate counting.
5. **Using Redis from Application Code** — Client libraries, connection reuse, and serialization choices.
6. **Checkpoint** _(unscaffolded)_ — Add caching, rate limiting, and a live notification feed to a small web app, and measure what each one saves.

### 1.4 — Persistence & Basic Operations

1. **RDB Snapshots vs. AOF** — The two persistence models and what each one can lose.
2. **Memory Limits & Eviction Policies** — maxmemory, LRU and LFU, and what Redis does when it is full.
3. **Configuration & Basic Security** — Binding, passwords, ACL users, and not exposing Redis to the internet.
4. **Monitoring with INFO & SLOWLOG** — Reading the server's own metrics and finding slow commands.
5. **Connections & Pooling** — Client limits, timeouts, and avoiding connection storms.
6. **Checkpoint** _(unscaffolded)_ — Run a Redis instance with persistence, a memory limit, an ACL user, and a dashboard of its key metrics, then restart it and verify what survived.

## Level 2 — Intermediate

_Go from "it works on my machine" to "I can design caches and queues that survive stampedes, failures, and restarts."_

### 2.1 — Beyond the Basics

1. **Streams & Consumer Groups** — An append-only log with acknowledgements and multiple consumers.
2. **Transactions: MULTI, EXEC & WATCH** — Batching commands and optimistic locking without blocking.
3. **Lua Scripting & Functions** — Atomic server-side logic and where it helps or hurts.
4. **Pipelining & Batching** — Cutting round trips and measuring the effect.
5. **Bitmaps, HyperLogLog & Geospatial** — Compact structures for flags, unique counts, and location queries.
6. **Checkpoint** _(unscaffolded)_ — Implement an atomic inventory reservation using WATCH and then using Lua, and compare their behavior under contention.

### 2.2 — Caching Done Right

1. **Invalidation Strategies** — TTLs, explicit deletes, and event-driven invalidation, with the trade-off of each.
2. **Cache Stampedes** — What happens when a hot key expires, and how locking and early refresh prevent it.
3. **TTL Design & Jitter** — Choosing lifetimes and spreading expirations so they don't all land at once.
4. **Write-Through & Write-Behind** — Keeping cache and database in step, and what failure does to each.
5. **Consistency with the Source of Truth** — Stale reads, race conditions, and the guarantees a cache can honestly make.
6. **Checkpoint** _(unscaffolded)_ — Build a cached read path that survives a thundering herd, then prove with a load test that it did.

### 2.3 — Redis as Infrastructure

1. **Job Queues & Reliable Processing** — Lists, streams, retries, and not losing work when a worker dies.
2. **Distributed Locks** — Lock patterns, expiry, fencing, and why the simple versions are unsafe.
3. **Rate Limiting Algorithms** — Fixed window, sliding window, and token bucket, implemented correctly.
4. **Pub/Sub vs. Streams** — Delivery guarantees and choosing between them for a real feature.
5. **JSON, Search & Other Modules** — Document storage, secondary indexes, and what modules add.
6. **Checkpoint** _(unscaffolded)_ — Build a job queue with retries, a dead-letter path, and a rate limiter, and kill workers mid-job to show nothing is lost.

### 2.4 — Persistence & Replication

1. **AOF Rewrite & fsync Policies** — What each setting trades between speed and data loss.
2. **RDB, Forking & Latency** — How snapshots use fork and why they can cause latency spikes.
3. **Replication Basics** — Asynchronous replicas, full and partial resync, and replication lag.
4. **Sentinel & Automatic Failover** — Monitoring, electing a new primary, and client behavior during failover.
5. **Backups & Disaster Recovery** — Copying data safely and restoring it under pressure.
6. **Checkpoint** _(unscaffolded)_ — Stand up a primary with replicas and Sentinel, kill the primary, and document exactly what was lost and how clients recovered.

## Level 3 — Senior

_Go from "I use Redis" to "I understand its internals, I can cluster and operate it, and I know when it shouldn't hold the data."_

### 3.1 — Redis Internals

1. **The Event Loop & I/O Threads** — Why Redis is mostly single-threaded and what that means for latency.
2. **Encodings & Data Structure Internals** — Listpack, skiplists, and hash tables, and when Redis switches between them.
3. **Memory Management & Fragmentation** — Allocators, overhead per key, and finding where memory goes.
4. **Eviction & Expiry Internals** — How keys expire, how eviction samples, and the cost of big keys.
5. **Latency Analysis** — Slow commands, blocking operations, and measuring tail latency.
6. **Checkpoint** _(unscaffolded)_ — Profile a memory-hungry and a slow workload, explain each from the internals, and cut memory use measurably.

### 3.2 — Scaling with Redis Cluster

1. **Hash Slots & Cluster Topology** — How the keyspace is split and routed.
2. **Multi-Key Operations & Hash Tags** — What breaks across slots and how to design around it.
3. **Resharding & Rebalancing** — Moving slots live and what clients see.
4. **Failure Detection & Cluster Failover** — Gossip, quorum, and when a cluster stops accepting writes.
5. **Cluster-Aware Clients** — Redirections, topology refresh, and client-side routing.
6. **Checkpoint** _(unscaffolded)_ — Design a cluster for a workload with multi-key access, shard it, and show how it behaves when a node fails mid-reshard.

### 3.3 — Production Operations

1. **Capacity Planning & Memory Sizing** — Estimating footprint, headroom, and growth.
2. **Security Hardening** — ACL design, TLS, network isolation, and dangerous commands.
3. **Observability & Alerting** — The metrics that predict trouble before users notice it.
4. **Upgrades & Rolling Changes** — Version changes without downtime.
5. **Managed vs. Self-Hosted** — What a cloud service takes off your plate and what it hides.
6. **Checkpoint** _(unscaffolded)_ — Write an operations runbook covering sizing, security, upgrades, and the incidents you most expect.

### 3.4 — Judgment & Design

1. **Cache or Database?** — Durability, data loss on failover, and what you can safely keep only in Redis.
2. **Failure Modes & Consistency** — What actually happens during partitions, restarts, and failover.
3. **The Redis Ecosystem & Licensing** — Valkey, alternatives like Memcached, and how licensing history affects the choice.
4. **Architecture Patterns** — Where Redis sits in real systems, and which patterns create hidden coupling.
5. **When Not to Use Redis** — Honest limits and the cases where another store is the better answer.
6. **Checkpoint** _(unscaffolded)_ — Write a design document for a real service using Redis: roles, durability, failure behavior, and the risks you accept, argued for a skeptical reviewer.

