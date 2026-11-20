# Java — Curriculum

Three levels, twelve stages — object-oriented design, collections, and concurrency on the JVM, built toward the judgment to run, tune, and evolve Java services in production.

## Level 1 — Junior

_Go from "I've never compiled Java" to "I can design small object-oriented programs, use the collections framework, and write and test them with a real build tool."_

### 1.1 — Java Basics

1. **The JDK, the JVM & the Compile-Run Cycle** — What javac produces, what java runs, and how source becomes behavior.
2. **Types, Variables & Operators** — Primitives vs. reference types, widening and narrowing, and integer overflow.
3. **Control Flow & Methods** — Conditionals, loops, switch expressions, and writing and calling methods.
4. **Strings & Text** — Immutability, StringBuilder, comparing with equals, and text blocks.
5. **Arrays & Reading Input** — Fixed-size arrays, main(String[] args), and Scanner-style input.
6. **Checkpoint** _(unscaffolded)_ — Write a console program (a grade calculator or text-based game) from scratch, compiled and run on the command line with no IDE help.

### 1.2 — Object-Oriented Foundations

1. **Classes, Objects & Constructors** — Fields, methods, this, and how objects are created and referenced.
2. **Encapsulation & Packages** — Access modifiers, package structure, and hiding what shouldn't be touched.
3. **Inheritance, Polymorphism & Abstract Classes** — Subclassing, overriding, and dispatching on the runtime type.
4. **Interfaces** — Contracts, default and static methods, and programming to an interface.
5. **equals, hashCode, toString & Records** — The object contract, and records for immutable data carriers.
6. **Checkpoint** _(unscaffolded)_ — Model a small domain (a library or bank) with an inheritance hierarchy and interfaces, and justify every place you chose composition over inheritance.

### 1.3 — Collections & Generics

1. **ArrayList & LinkedList** — List behavior, performance tradeoffs, and picking between them.
2. **HashMap, HashSet & TreeMap** — How hashing makes lookups fast, ordering guarantees, and what breaks with a bad hashCode.
3. **Generics Basics** — Type parameters, generic methods, and why the compiler asks for them.
4. **Iterating, Comparable & Comparator** — for-each, Iterator, and sorting objects by more than one rule.
5. **Collections Utilities & Immutable Collections** — Collections methods, List.of, and defensive copying.
6. **Checkpoint** _(unscaffolded)_ — Build a data-processing program (an inventory report or log analyzer) using the right collection at every step, and defend each choice.

### 1.4 — Errors, I/O & Build Tools

1. **Exceptions** — Checked vs. unchecked, custom exceptions, and what to catch.
2. **try-with-resources & File I/O** — AutoCloseable, java.nio.file, and reading and writing files safely.
3. **Enums, Optional & Null Handling** — Modeling fixed sets, returning "maybe" values, and avoiding NullPointerException.
4. **Maven & Gradle Basics** — Project layout, dependencies, and building a jar from the command line.
5. **Testing with JUnit 5** — Writing, running, and organizing tests, with assertions and parameterized cases.
6. **Checkpoint** _(unscaffolded)_ — Build and test a multi-class application with Maven or Gradle, a JUnit suite, and file persistence, and run it from the built jar.

## Level 2 — Intermediate

_Go from "I write correct classes" to "I write modern, concurrent Java and build tested services on top of a standard framework."_

### 2.1 — Modern Java & Functional Style

1. **Lambdas & Functional Interfaces** — Function, Predicate, Supplier, method references, and capturing variables.
2. **The Streams API** — Pipelines, laziness, and when a stream is clearer than a loop (and when it isn't).
3. **Collectors & Optional in Depth** — groupingBy, partitioningBy, mapping, and composing Optionals without get().
4. **Records, Sealed Types & Pattern Matching** — Modeling closed hierarchies and switching over them exhaustively.
5. **Recent Language Features** — var, switch expressions, text blocks, and what the latest LTS releases changed.
6. **Checkpoint** _(unscaffolded)_ — Rewrite a loop-heavy 300-line program in a modern functional style, then decide which rewrites were genuinely better.

### 2.2 — Concurrency on the JVM

1. **Threads & ExecutorService** — Creating threads, pools, and why you almost never new Thread() directly.
2. **synchronized, volatile & Locks** — Visibility, atomicity, ReentrantLock, and what each tool actually guarantees.
3. **java.util.concurrent** — ConcurrentHashMap, blocking queues, atomics, and latches.
4. **CompletableFuture** — Composing asynchronous work, handling errors, and avoiding blocked pools.
5. **Virtual Threads & Structured Concurrency** — Lightweight threads, when they pay off, and how scoped tasks change cancellation.
6. **Checkpoint** _(unscaffolded)_ — Build a multi-threaded pipeline (a crawler or batch processor) first with executors, then with virtual threads, and compare correctness and throughput.

### 2.3 — Design & Generics in Depth

1. **Wildcards, Bounds & Type Erasure** — ? extends, ? super, PECS, and what generics can't do at runtime.
2. **SOLID Principles in Java** — Applying each principle to real code, and spotting when it's overapplied.
3. **Patterns in the JDK & Frameworks** — Builder, factory, strategy, and observer, seen where Java already uses them.
4. **Immutability & Value-Object Design** — Final fields, defensive copies, and safe sharing across threads.
5. **Checkpoint** _(unscaffolded)_ — Refactor a tangled class hierarchy into a clean design, with a short note explaining which patterns you used and which you rejected.

### 2.4 — Building Services

1. **Spring Boot Essentials** — Dependency injection, beans, auto-configuration, and the application lifecycle.
2. **Building REST APIs** — Controllers, validation, error handling, and status codes done properly.
3. **Persistence with JDBC & JPA** — Connections, entities, transactions, and recognizing the N+1 query problem.
4. **Testing Services** — Slice tests, Mockito, and integration tests with Testcontainers.
5. **Configuration, Logging & Packaging** — Profiles, structured logs, and building a runnable jar or container image.
6. **Checkpoint** _(unscaffolded)_ — Build a small REST service with a real database, a layered test suite, and a container image, and run it end to end from a clean checkout.

## Level 3 — Senior

_Go from "I build services that work" to "I understand what the JVM does with them, tune and diagnose them under load, and make architecture decisions I can defend."_

### 3.1 — JVM Internals

1. **Class Loading & Bytecode** — The loading lifecycle, reading output from javap, and classloader pitfalls.
2. **Runtime Memory Areas** — Heap, stack, metaspace, and where each kind of data lives.
3. **Garbage Collection** — Generational collection, G1, ZGC, and Shenandoah — what each one optimizes for.
4. **JIT Compilation & Warmup** — C1, C2, inlining, deoptimization, and why the first minute is slower.
5. **The Java Memory Model** — Happens-before, safe publication, and why unsynchronized code is wrong even when it works.
6. **Checkpoint** _(unscaffolded)_ — Read a real GC log, identify the collector's behavior and the problem it reveals, and propose a tuning change with a prediction.

### 3.2 — Performance & Diagnosis

1. **Profiling with JFR & async-profiler** — Low-overhead profiling of CPU, allocation, and lock contention in a live JVM.
2. **Benchmarking with JMH** — Why naive timing lies, and how to write a trustworthy microbenchmark.
3. **Memory Sizing & GC Tuning in Containers** — Heap vs. container limits, ergonomics, and the settings worth changing.
4. **Thread Dumps, Heap Dumps & Deadlocks** — Reading dumps to find stuck threads, leaks, and lock cycles.
5. **Checkpoint** _(unscaffolded)_ — Diagnose a service with a planted leak and a planted deadlock using only dumps and profiles, and document the evidence for each.

### 3.3 — Production Service Design

1. **Resilience: Timeouts, Retries & Circuit Breakers** — Containing failure instead of propagating it, and backpressure under load.
2. **Observability** — Metrics, distributed tracing, and structured logging with OpenTelemetry.
3. **Data Access at Scale** — Connection pools, transaction boundaries, caching, and avoiding lock contention.
4. **API Design & Evolution** — Versioning, compatibility, and changing a contract that other teams consume.
5. **Checkpoint** _(unscaffolded)_ — Add timeouts, retries, metrics, and tracing to a service, then break its dependency on purpose and show it degrades gracefully.

### 3.4 — Architecture & Judgment

1. **Modules & Large Codebases** — Multi-module builds, JPMS, and keeping dependencies directional.
2. **Upgrading Java & Managing Dependencies** — Moving across LTS versions, dependency conflicts, and reducing upgrade risk.
3. **Framework Tradeoffs** — Spring, Quarkus, and Micronaut — startup time, memory, and ecosystem, weighed honestly.
4. **When Java Is the Right Choice** — Where the JVM excels, where it costs more than it's worth, and how to argue either way.
5. **Checkpoint** _(unscaffolded)_ — Write an incident-style post-mortem for a latency or memory problem: symptoms, evidence, root cause, fix, and the design lesson.
