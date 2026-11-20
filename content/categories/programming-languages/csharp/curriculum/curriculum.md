# C# — Curriculum

Three levels, twelve stages — types, LINQ, and async/await on .NET, built toward the judgment to build, diagnose, and evolve production applications.

## Level 1 — Junior

_Go from "I've never used .NET" to "I can write, test, and debug small C# applications using classes, collections, and LINQ."_

### 1.1 — .NET & C# Basics

1. **The .NET SDK, the CLR & the dotnet CLI** — Creating, building, and running a project, and what the runtime does for you.
2. **Types, Variables & Value vs. Reference Types** — Structs vs. classes, stack vs. heap, and what copying means for each.
3. **Control Flow & Methods** — Conditionals, loops, switch expressions, and writing clear methods.
4. **Strings & Interpolation** — Immutability, StringBuilder, formatting, and culture traps.
5. **Nullable Reference Types** — Annotating nullability and letting the compiler catch null errors.
6. **Checkpoint** _(unscaffolded)_ — Write a console app (a budget tracker or text game) with clean methods, nullable warnings enabled, and no warnings left.

### 1.2 — Object-Oriented C#

1. **Classes, Properties & Encapsulation** — Fields vs. properties, init-only setters, and controlling access.
2. **Inheritance & Polymorphism** — Virtual, override, abstract, and sealed — and when not to inherit.
3. **Interfaces** — Contracts, default interface methods, and programming to abstractions.
4. **Records, Structs & Enums** — Immutable data with records, value semantics, and modeling fixed choices.
5. **Equality, ToString & the Object Contract** — Reference vs. value equality, overriding Equals and GetHashCode safely.
6. **Checkpoint** _(unscaffolded)_ — Model a small domain (inventory, library, or bank) using records, interfaces, and inheritance only where it earns its place.

### 1.3 — Collections, LINQ & Errors

1. **List, Dictionary & HashSet** — The core collections, their costs, and choosing between them.
2. **Generics Basics** — Generic types and methods, and how the compiler checks them.
3. **LINQ Basics** — Where, Select, OrderBy, GroupBy, and reading query chains.
4. **Exceptions & IDisposable** — try/catch/finally, using statements, and releasing resources reliably.
5. **Delegates, Events & Lambdas** — Passing behavior as data, and publishing and subscribing to events.
6. **Checkpoint** _(unscaffolded)_ — Build a data-processing app (log analyzer or sales report) using LINQ throughout, with explicit handling for every failure case.

### 1.4 — Files, Testing & Tools

1. **File I/O & System.Text.Json** — Reading, writing, and serializing data with the built-in libraries.
2. **Projects, Solutions & NuGet** — The csproj file, multi-project solutions, and managing packages.
3. **Unit Testing with xUnit** — Writing, running, and organizing tests, with theories for parameterized cases.
4. **Debugging** — Breakpoints, watches, conditional breakpoints, and reading exceptions in your IDE.
5. **Checkpoint** _(unscaffolded)_ — Build a multi-project solution with a tested class library and a console app, and run the tests from the command line.

## Level 2 — Intermediate

_Go from "I write correct C#" to "I write idiomatic async C#, build web services on ASP.NET Core, and design for testability."_

### 2.1 — LINQ & Functional Style

1. **Deferred Execution, IEnumerable & IQueryable** — When a query actually runs, and why that matters with a database.
2. **Iterators & yield** — Writing lazy sequences, and what the compiler generates for you.
3. **Pattern Matching & Switch Expressions** — Type, property, and relational patterns, and exhaustive handling.
4. **Extension Methods & Expression Trees** — Extending types you don't own, and code that can be inspected as data.
5. **Immutability with Records & with-Expressions** — Non-destructive mutation and designing around immutable models.
6. **Checkpoint** _(unscaffolded)_ — Refactor an imperative 300-line program into a LINQ and pattern-matching style, and decide which changes were really improvements.

### 2.2 — async/await & Concurrency

1. **Tasks & async/await Fundamentals** — What a Task is, what await does, and the shape of async code.
2. **Async Pitfalls** — Deadlocks from blocking on async, ConfigureAwait, and why async void is dangerous.
3. **Cancellation, IAsyncEnumerable & Channels** — CancellationToken, streaming results, and producer-consumer pipelines.
4. **Threads, Locks & Concurrent Collections** — lock, SemaphoreSlim, ConcurrentDictionary, and thread-safety by design.
5. **Parallel Programming** — Parallel.ForEach, PLINQ, and when CPU-bound work benefits from parallelism.
6. **Checkpoint** _(unscaffolded)_ — Build a concurrent downloader or batch processor with cancellation, bounded parallelism, and a test that proves it cancels cleanly.

### 2.3 — ASP.NET Core & Data

1. **Minimal APIs & Controllers** — Routing, model binding, and returning correct HTTP results.
2. **Dependency Injection & Middleware** — Service lifetimes, the request pipeline, and writing your own middleware.
3. **Entity Framework Core** — Models, migrations, queries, tracking, and recognizing the N+1 problem.
4. **Configuration, Logging & the Options Pattern** — Environment-based settings, structured logging, and typed options.
5. **Authentication & Authorization Basics** — JWT bearer tokens, policies, and protecting endpoints.
6. **Checkpoint** _(unscaffolded)_ — Build a small authenticated API with a database, migrations, and structured logging, and run it from a clean checkout.

### 2.4 — Quality & Design

1. **Generics & Constraints** — where clauses, variance, and writing reusable generic code.
2. **SOLID & Dependency Injection in Practice** — Applying the principles to real services, and noticing over-engineering.
3. **Testing Services** — Mocks, fakes, and integration tests with WebApplicationFactory.
4. **Analyzers, Code Style & CI** — Roslyn analyzers, .editorconfig, and failing the build on real problems.
5. **Checkpoint** _(unscaffolded)_ — Add unit and integration tests and a CI pipeline to your API, with coverage on the paths that matter and analyzers set to enforce.

## Level 3 — Senior

_Go from "I build services that work" to "I understand what the runtime does with my code, diagnose and tune it under load, and make architecture calls I can defend."_

### 3.1 — Runtime Internals

1. **IL, the JIT & Tiered Compilation** — From C# to intermediate language to machine code, and what tiering and Native AOT change.
2. **The Garbage Collector** — Generations, the large object heap, GC modes, and what makes allocations expensive.
3. **Span&lt;T&gt;, Memory&lt;T&gt; & ref structs** — Slicing and parsing without allocating, and the rules that keep it safe.
4. **Boxing, Allocation & Value Semantics** — Where hidden allocations come from and how to find them.
5. **Reflection & Source Generators** — Runtime inspection, its costs, and generating code at compile time instead.
6. **Checkpoint** _(unscaffolded)_ — Reduce a parsing hot path's allocations to near zero using spans, and show the allocation profile before and after.

### 3.2 — Performance & Diagnostics

1. **Benchmarking with BenchmarkDotNet** — Writing trustworthy microbenchmarks and reading the results.
2. **Tracing, Counters & Dumps** — dotnet-trace, dotnet-counters, and dotnet-dump on a live process.
3. **Memory Leaks & Finalizers** — Event-handler leaks, finalization, IDisposable patterns, and heap analysis.
4. **Async Internals** — State machines, ValueTask, and synchronization contexts.
5. **Checkpoint** _(unscaffolded)_ — Diagnose a service with a planted memory leak and thread-pool starvation using only dumps and counters, and write up the evidence.

### 3.3 — Production Services

1. **Resilience: Polly & HttpClientFactory** — Timeouts, retries, and circuit breakers without socket exhaustion.
2. **Observability with OpenTelemetry** — Distributed traces, metrics, and structured logs that answer real questions.
3. **Data Access at Scale** — EF Core performance, caching, batching, and transaction boundaries.
4. **Deployment: Containers, Config & Native AOT** — Packaging, configuration, and choosing between JIT and AOT.
5. **Checkpoint** _(unscaffolded)_ — Add resilience policies and tracing to a service, break a dependency on purpose, and show it degrades gracefully.

### 3.4 — Architecture & Judgment

1. **Application Architecture** — Clean architecture, vertical slices, and the modular monolith.
2. **Library Design & NuGet Publishing** — Public API surface, versioning, and shipping a package others depend on.
3. **Upgrading .NET & Migrating from .NET Framework** — Moving versions, porting legacy code, and managing risk incrementally.
4. **When .NET Is the Right Choice** — Where the platform excels, where it costs more than it's worth, and how to argue either way.
5. **Checkpoint** _(unscaffolded)_ — Write an architecture decision record for a real service: structure, data access, deployment model, and the risks you accept.
