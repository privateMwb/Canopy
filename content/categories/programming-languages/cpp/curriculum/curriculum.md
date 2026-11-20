# C++ — Curriculum

Three levels, twelve stages — memory, templates, and the standard library, built toward the judgment to write C++ that is fast, correct, and maintainable across a large codebase.

## Level 1 — Junior

_Go from "I've heard of pointers" to "I can write small C++ programs that manage their own resources safely, using the standard library instead of raw memory."_

### 1.1 — First Programs

1. **The Toolchain: Compile, Link & Run** — Preprocessor, compiler, linker, headers, and reading a compiler error.
2. **Types, Variables, const & auto** — Fundamental types, initialization forms, and constness as a design tool.
3. **Functions, References & Overloading** — Pass by value, reference, and const reference, and how overloads are resolved.
4. **Strings & std::string_view** — Owning vs. non-owning text, and the dangling-view trap.
5. **Streams & Input/Output** — iostream, formatted output, and reading input robustly.
6. **Checkpoint** _(unscaffolded)_ — Write a small console program (a text parser or calculator) built with a multi-file project and compiled with warnings enabled and clean.

### 1.2 — Memory & Pointers

1. **Pointers & References** — Addresses, dereferencing, nullptr, and what a reference really is.
2. **Stack vs. Heap & new/delete** — Automatic and dynamic storage, and why manual delete is a last resort.
3. **Arrays & std::array** — C-style array decay and bounds problems, and the safer replacements.
4. **RAII** — Tying resource lifetime to scope, and the idea that defines C++.
5. **Undefined Behavior & Sanitizers** — What UB is, why it's dangerous, and catching it with ASan and UBSan.
6. **Checkpoint** _(unscaffolded)_ — Given a C++ program with five planted memory bugs, find and fix every one using sanitizers, and convert it to RAII.

### 1.3 — Containers & Algorithms

1. **std::vector** — Contiguous storage, capacity vs. size, and invalidated iterators.
2. **Maps, Sets & Unordered Containers** — Ordered vs. hashed, key requirements, and the right container for the job.
3. **Iterators & &lt;algorithm&gt;** — sort, find, transform, and expressing intent instead of writing loops.
4. **Lambdas** — Capture lists, by value vs. by reference, and lambdas as arguments.
5. **pair, tuple, optional & variant** — Returning and holding more than one kind of thing without raw pointers or sentinels.
6. **Checkpoint** _(unscaffolded)_ — Write a data-processing program (a log analyzer or inventory tool) using containers and algorithms with no hand-written loops over indices.

### 1.4 — Classes & Ownership

1. **Classes, Constructors & Destructors** — Member initialization, initializer lists, and object lifetime.
2. **Copying & the Rule of 0/3/5** — When the compiler's defaults are right and when they're a bug.
3. **Smart Pointers** — unique_ptr, shared_ptr, weak_ptr, and expressing ownership in the type.
4. **Inheritance & Virtual Functions** — Polymorphism, virtual destructors, and slicing.
5. **Operators & const-Correctness** — Overloading sensibly, and marking what must not change.
6. **Checkpoint** _(unscaffolded)_ — Build a small class hierarchy (shapes or a plugin system) with clear ownership and no raw owning pointers, passing sanitizers cleanly.

## Level 2 — Intermediate

_Go from "I write safe C++" to "I write generic, move-aware, modern C++ using templates and the full standard library, and I build and test it properly."_

### 2.1 — Templates & Generic Programming

1. **Function & Class Templates** — Writing code once for many types, and how instantiation works.
2. **Deduction, Specialization & Overloads** — How the compiler picks a template, and customizing for special cases.
3. **Concepts** — Constraining templates, readable errors, and replacing SFINAE.
4. **Variadic Templates & Fold Expressions** — Functions that take any number of arguments, and expanding parameter packs.
5. **Type Traits & constexpr** — Computing at compile time and querying types with &lt;type_traits&gt;.
6. **Checkpoint** _(unscaffolded)_ — Write a generic container or algorithm library constrained with concepts, with a test that fails to compile on a misuse, on purpose.

### 2.2 — Move Semantics & Value Categories

1. **lvalues, rvalues & Value Categories** — What these terms mean and why the language distinguishes them.
2. **Move Constructors & Move Assignment** — Transferring resources instead of copying them, and leaving the source valid.
3. **Perfect Forwarding** — Universal references, std::forward, and writing wrappers that don't add copies.
4. **Copy Elision & Return Value Optimization** — When the compiler removes copies, and why std::move on a return is often wrong.
5. **Designing Move-Aware Types** — noexcept moves, strong guarantees, and making vector grow without copies.
6. **Checkpoint** _(unscaffolded)_ — Implement a resource-owning class with correct copy and move operations, and prove with a counter how many copies and moves each scenario causes.

### 2.3 — The Modern Standard Library

1. **Ranges & Views** — Composable, lazy pipelines that replace nested loops and temporaries.
2. **span, string_view & Non-Owning Types** — Cheap views into data, and the lifetime rules that keep them safe.
3. **Error Handling** — Exceptions vs. error codes, noexcept, and std::expected.
4. **chrono, filesystem & format** — The utilities that replace most hand-rolled platform code.
5. **Custom Iterators & Algorithms** — Making your own types work with the standard library.
6. **Checkpoint** _(unscaffolded)_ — Refactor a legacy-style program to modern C++ (ranges, span, expected), and show the diff in clarity and in safety.

### 2.4 — Threads & Build Systems

1. **Threads, Mutexes & Lock Guards** — std::thread, scoped locking, and avoiding data races.
2. **Condition Variables & Atomics** — Waiting for work correctly, and when an atomic is enough.
3. **Futures, async & jthread** — Higher-level concurrency and cooperative cancellation with stop_token.
4. **CMake in Practice** — Targets, dependencies, build types, and a project that builds anywhere.
5. **Testing & Sanitizers in CI** — GoogleTest or Catch2, plus running ASan, UBSan, and TSan automatically.
6. **Checkpoint** _(unscaffolded)_ — Build a multi-threaded program with a CMake project, tests, and a CI configuration that fails on any sanitizer finding.

## Level 3 — Senior

_Go from "I write good modern C++" to "I understand what the machine does with my code, I can reason about undefined behavior and the memory model, and I can make design calls across a large codebase."_

### 3.1 — Performance & the Machine

1. **Cache-Friendly Design & Data Layout** — Array of structs vs. struct of arrays, and why memory access dominates.
2. **Allocators & Memory Resources** — Custom allocation, std::pmr, and avoiding the general-purpose heap on hot paths.
3. **Compiler Optimization & Reading Assembly** — Inlining, vectorization, and using Compiler Explorer to see what you really got.
4. **Profiling & Benchmarking** — perf, flame graphs, and Google Benchmark — measuring without fooling yourself.
5. **Checkpoint** _(unscaffolded)_ — Take a slow program, find the bottleneck with a profiler, fix it, and show a benchmark proving the speedup and the reason for it.

### 3.2 — Concurrency & the Memory Model

1. **The C++ Memory Model** — Sequential consistency, acquire/release, and the orderings you can choose.
2. **Lock-Free Structures & Their Pitfalls** — CAS loops, the ABA problem, and when lock-free isn't worth it.
3. **Thread Pools, Executors & Coroutines** — Task scheduling and C++20 coroutines in depth.
4. **Finding Races with ThreadSanitizer** — Reading TSan reports and fixing races you didn't know you had.
5. **Checkpoint** _(unscaffolded)_ — Implement a small lock-free queue or thread pool, then stress-test it under ThreadSanitizer and explain each ordering you chose.

### 3.3 — Advanced Language & Safety

1. **Undefined Behavior in Depth** — Strict aliasing, signed overflow, and why the optimizer treats UB as a promise.
2. **Object Lifetime & Provenance** — When an object exists, when a pointer is valid, and the rules that follow.
3. **Type Erasure, CRTP & Policy-Based Design** — Advanced patterns for abstraction, and what each costs.
4. **ABI, Linking & Symbol Visibility** — Shared libraries, name mangling, and why ABI breaks are silent.
5. **Hardening & the Core Guidelines** — Static analysis, safe subsets, and reducing whole classes of bugs.
6. **Checkpoint** _(unscaffolded)_ — Audit a short piece of code for lifetime and UB hazards, classify each finding, and fix it without changing its behavior.

### 3.4 — Engineering & Judgment

1. **Library & API Design** — Stable interfaces, ownership in signatures, and designing for users who can't see your source.
2. **Large Codebases & Build Times** — Modules, forward declarations, precompiled headers, and caching builds.
3. **Debugging Crashes** — Core dumps, gdb and lldb, and reading a stack from a failure you can't reproduce.
4. **Interoperating with C & Other Languages** — extern "C", FFI boundaries, and Python bindings.
5. **C++ vs. Rust & Other Choices** — Where C++ wins, where its costs aren't worth it, and arguing either way.
6. **Checkpoint** _(unscaffolded)_ — Write a design document for a performance-critical component: ownership model, concurrency, error strategy, and the risks you accept.
