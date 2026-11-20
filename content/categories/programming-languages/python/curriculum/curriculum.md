# Python — Curriculum

Three levels, twelve stages — the syntax, data structures, and standard library, built toward the judgment to package, test, tune, and ship Python that a team can live with.

## Level 1 — Junior

_Go from "I've seen Python" to "I can write, run, and debug scripts that use Python's data structures and standard library fluently."_

### 1.1 — Running Python

1. **Running Python & Your First Script** — The interpreter, the REPL, and what actually happens when you run a .py file.
2. **Values, Types & Variables** — Names bound to objects, the core types, and what dynamic typing really means.
3. **Operators, Truthiness & Control Flow** — if/elif/else, loops, and which values Python treats as true or false.
4. **Functions** — Parameters, defaults, *args and **kwargs, return values, and scope.
5. **Reading Errors & Debugging** — Tracebacks, print debugging, and stepping through code with pdb.
6. **Checkpoint** _(unscaffolded)_ — Write a command-line script (a number-guessing game or text-statistics tool) with functions, input validation, and no crashes on bad input.

### 1.2 — Core Data Structures

1. **Strings & Formatting** — Slicing, methods, f-strings, and Unicode without surprises.
2. **Lists & Tuples** — Mutability, slicing, unpacking, and when to reach for each.
3. **Dictionaries & Sets** — Hash-based lookup, membership tests, and the idioms that replace most loops.
4. **Comprehensions & Iteration** — List, dict, and set comprehensions, plus enumerate, zip, and sorted.
5. **Mutability & Object Identity** — Aliasing, shallow vs. deep copies, and the mutable-default-argument trap.
6. **Checkpoint** _(unscaffolded)_ — Build a word-frequency analyzer for a text file using only built-in structures, and explain why you chose a dict, a set, or a list at each step.

### 1.3 — Files, Errors & Modules

1. **Reading & Writing Files** — open(), context managers, pathlib, and text encodings.
2. **Exceptions** — try/except/else/finally, raising your own errors, and catching only what you can handle.
3. **Modules, Imports & Packages** — How import finds code, the __name__ == "__main__" guard, and splitting a script into modules.
4. **Virtual Environments & pip** — Isolating dependencies with venv and recording them so the project is reproducible.
5. **JSON, CSV & a Standard Library Tour** — json, csv, datetime, collections, and random — the batteries that are included.
6. **Checkpoint** _(unscaffolded)_ — Write a script that reads a messy CSV, cleans and summarizes it, and writes JSON, with clear error messages for every bad-input case.

### 1.4 — Classes & First Tests

1. **Classes & Objects** — Attributes, methods, __init__, and what self actually is.
2. **Special Methods** — __repr__, __eq__, __len__, __iter__, and making your objects behave like built-ins.
3. **Inheritance & Composition** — Subclassing, super(), and when "has a" beats "is a."
4. **Dataclasses & Enums** — Replacing boilerplate classes with @dataclass, and naming fixed choices with Enum.
5. **Testing with pytest** — Writing assertions, running tests, and using fixtures and parametrization for the basics.
6. **Checkpoint** _(unscaffolded)_ — Build a small inventory or library-tracker with classes and a pytest suite, then refactor it without breaking a single test.

## Level 2 — Intermediate

_Go from "I write working scripts" to "I write idiomatic Python that uses the language's protocols, is type-checked, and ships as a package."_

### 2.1 — The Data Model & Idioms

1. **Iterators & the Iteration Protocol** — What a for loop calls, and how to make any object iterable.
2. **Generators & Lazy Evaluation** — yield, generator expressions, and processing data bigger than memory.
3. **Closures & Decorators** — Functions as objects, capturing state, and writing decorators that preserve metadata.
4. **Context Managers & contextlib** — The with statement, __enter__/__exit__, and @contextmanager for clean setup and teardown.
5. **itertools, functools & collections** — The standard-library tools that replace hand-written loops: chain, groupby, lru_cache, Counter, deque.
6. **Checkpoint** _(unscaffolded)_ — Build a lazy log-processing pipeline from generators that streams a multi-gigabyte file in constant memory.

### 2.2 — Type Hints & Modern Python

1. **Type Hints Fundamentals** — Annotating functions, variables, and collections, and what hints do and don't do at runtime.
2. **Generics, Protocols & Structural Typing** — TypeVar, Protocol, and describing "anything that quacks like this."
3. **Static Checking with mypy & pyright** — Running a type checker, reading its errors, and adopting it gradually.
4. **Pattern Matching & Recent Syntax** — match statements, the walrus operator, and what the last few Python releases added.
5. **Validating Data at the Boundary** — dataclasses, attrs, and Pydantic for turning untrusted input into trusted objects.
6. **Checkpoint** _(unscaffolded)_ — Take an untyped 500-line module, annotate it until the checker passes cleanly, and report which real bugs the types exposed.

### 2.3 — Concurrency & Performance

1. **Threads & the GIL** — What the Global Interpreter Lock allows, what it blocks, and where threads still help.
2. **multiprocessing & concurrent.futures** — Using multiple cores with process pools, and the cost of moving data between processes.
3. **asyncio Fundamentals** — Coroutines, tasks, the event loop, and when async beats threads.
4. **Profiling with cProfile & timeit** — Measuring before optimizing: finding the hot spot instead of guessing.
5. **Making Python Faster** — Better algorithms, built-ins, caching, and vectorization before reaching for anything exotic.
6. **Checkpoint** _(unscaffolded)_ — Take a slow program, profile it, and get a 10x speedup, with before-and-after profiles showing where the time went.

### 2.4 — Packaging & Maintainable Code

1. **Project Layout & pyproject.toml** — src layout, metadata, and declaring dependencies in one standard file.
2. **Building & Publishing Packages** — Wheels, sdists, PyPI, and modern tooling like uv.
3. **Testing in Depth** — Fixtures, mocking, parametrization, coverage, and testing code that touches the network or disk.
4. **Logging, Configuration & CLIs** — The logging module, environment-based config, and argparse, click, or typer.
5. **Linting, Formatting & CI** — ruff, a formatter, pre-commit hooks, and running it all on every push.
6. **Checkpoint** _(unscaffolded)_ — Publish a small installable CLI package with tests, type checking, and a CI pipeline, and install it from a clean environment.

## Level 3 — Senior

_Go from "I write good Python" to "I understand what CPython does underneath, design libraries other teams depend on, and can defend when Python is — and isn't — the right choice."_

### 3.1 — Inside CPython

1. **How CPython Runs Your Code** — Source to bytecode to the evaluation loop, read with the dis module.
2. **Memory: Reference Counting & the Cycle Collector** — Object layout, refcounts, the garbage collector, and why leaks still happen.
3. **Descriptors, Attribute Lookup & __slots__** — How obj.attr is resolved, how properties and methods really work, and what slots save.
4. **Metaclasses & Class Creation** — type(), __init_subclass__, and the narrow cases where metaclasses are warranted.
5. **The GIL, Free-Threading & the JIT** — What the experimental builds change, and what they don't, for your code.
6. **Checkpoint** _(unscaffolded)_ — Reproduce a memory leak caused by a reference cycle, find it with tracemalloc and gc, and explain exactly why the collector missed it.

### 3.2 — Advanced Async & Native Code

1. **asyncio in Production** — TaskGroups, cancellation, timeouts, and backpressure so one slow dependency doesn't take you down.
2. **Mixing Sync, Async & Threads** — Offloading blocking calls, avoiding event-loop stalls, and bridging old code to new.
3. **Native Extensions** — ctypes, cffi, Cython, and Rust via PyO3 — choosing a boundary and paying its costs.
4. **Profiling a Live Process** — py-spy, memory profilers, and flame graphs without restarting production.
5. **Checkpoint** _(unscaffolded)_ — Diagnose a stalled async service from a live profile, fix the blocking call, and show the latency distribution before and after.

### 3.3 — Designing Libraries & APIs

1. **Public API Design** — What to expose, what to hide, and designing for the callers you haven't met yet.
2. **Backwards Compatibility & Deprecation** — Semantic versioning, deprecation warnings, and changing an API without breaking users.
3. **Plugin Architectures & Entry Points** — Letting others extend your code without forking it.
4. **Dependency Management & Supply Chain** — Lockfiles, hash pinning, auditing, and deciding what you're willing to depend on.
5. **Checkpoint** _(unscaffolded)_ — Design a small library's public API, write the versioning and deprecation policy, and ship a release that deprecates something safely.

### 3.4 — Production Judgment & Communication

1. **Python Services in Production** — ASGI vs. WSGI, worker models, deployment shape, and what actually limits throughput.
2. **Debugging Production Failures** — Structured logging, tracebacks in the wild, and reading evidence from a system you can't attach a debugger to.
3. **Upgrading Python & Migrating Large Codebases** — Moving versions, adopting types gradually, and managing risk across a big repo.
4. **When Python Is the Wrong Tool** — Honest limits — performance, deployment, and correctness — and how to weigh them against its strengths.
5. **Checkpoint** _(unscaffolded)_ — Write a design document for a real service: language choice, concurrency model, packaging, and the risks you accept, argued for a skeptical reviewer.
