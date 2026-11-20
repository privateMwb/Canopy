# Compilers & Language Implementation — Curriculum

Three levels, twelve stages — how a language is parsed, type-checked, compiled, and run, built around one small toy language, Twig, and aimed at the judgment to design an implementation and defend its tradeoffs.

## Level 1 — Junior

_Go from "I use programming languages" to "I can build a lexer, parser, and tree-walking interpreter for a small language, and give useful error messages."_

### 1.1 — The Big Picture

1. **What a Language Implementation Does** — The pipeline from source text to running program, and how interpreters, compilers, and VMs differ.
2. **Meet Twig** — The toy language used throughout the course: its syntax, its semantics, and what it deliberately leaves out.
3. **Grammars & EBNF** — Describing syntax precisely with rules, and why ambiguity is the enemy.
4. **Abstract Syntax Trees** — Why programs become trees, and how to design a node type for each construct.
5. **Checkpoint** _(unscaffolded)_ — Write the EBNF for a new Twig construct, then hand-draw the AST for three programs that use it.

### 1.2 — Lexing & Parsing

1. **Scanning: Characters to Tokens** — Token types, lexemes, and a hand-written scanner that walks the source one character at a time.
2. **Source Positions & Lexical Errors** — Tracking line and column, handling comments and string escapes, and reporting bad characters usefully.
3. **Recursive Descent Parsing** — One function per grammar rule, lookahead, and building the AST as you go.
4. **Operator Precedence & Pratt Parsing** — Binding power, associativity, and parsing expressions without a rule per precedence level.
5. **Syntax Errors & Recovery** — Reporting the first error clearly, then resynchronizing so parsing can continue and find the next one.
6. **Checkpoint** _(unscaffolded)_ — Build a lexer and parser for all of Twig that produces an AST, with test inputs for every grammar rule and every error path.

### 1.3 — Evaluating Programs

1. **Evaluating Expressions** — Walking the AST recursively, runtime values, and arithmetic, comparison, and logic.
2. **Environments & Lexical Scope** — Variables, shadowing, nested blocks, and chains of environments.
3. **Control Flow & Loops** — if, while, and for as tree walks, plus break and short-circuit evaluation.
4. **Functions, Calls & Return** — Parameters, arguments, the call stack, and implementing return without special cases everywhere.
5. **Closures & Captured Variables** — Functions that remember the environment they were defined in, and the classic counter example.
6. **Checkpoint** _(unscaffolded)_ — Finish the interpreter and pass a test suite of programs: recursive Fibonacci, FizzBuzz, a counter closure, and a handful of runtime-error cases.

### 1.4 — Data, Diagnostics & Testing

1. **Values, Truthiness & Dynamic Typing** — How an interpreter represents values at runtime, and the rules for equality and truthiness.
2. **Arrays & Records** — Adding compound data to the language, from parsing the syntax to indexing and field access at runtime.
3. **Error Messages That Help** — Source spans, carets under the offending code, and the difference between syntax, static, and runtime errors.
4. **Testing a Language Implementation** — Golden-file tests, one feature per test program, and keeping error messages from regressing.
5. **Checkpoint** _(unscaffolded)_ — Add arrays and records to Twig with golden tests, including at least five error cases that produce precise, readable diagnostics.

## Level 2 — Intermediate

_Go from "I can interpret a program" to "I can type-check it, lower it to an intermediate representation, optimize it, and run it on a bytecode VM with garbage collection."_

### 2.1 — Static Analysis & Type Checking

1. **Name Resolution & Symbol Tables** — A resolver pass that binds every identifier to its declaration before anything runs.
2. **Static vs. Dynamic Typing** — What a type system buys, what it costs, and which errors it moves from run time to compile time.
3. **Type Checking Expressions & Statements** — Typing rules written as inference rules, then turned into a checker.
4. **Type Inference & Unification** — Inferring types from use, type variables, and the idea behind Hindley–Milner.
5. **Generics & Subtyping** — Parametric polymorphism, subtyping, and where soundness holes come from.
6. **Checkpoint** _(unscaffolded)_ — Add a static type checker to Twig that rejects ill-typed programs with clear errors and accepts every valid program in the test suite.

### 2.2 — Intermediate Representations

1. **Why Intermediate Representations** — Separating the front end from the back end, and what makes a good IR.
2. **Three-Address Code & Lowering** — Flattening nested expressions and control flow into simple, explicit instructions.
3. **Control-Flow Graphs & Basic Blocks** — Splitting code into blocks, drawing edges for jumps, and why analyses want a graph.
4. **Static Single Assignment** — One definition per variable, phi nodes, and why SSA makes optimizations simpler.
5. **Checkpoint** _(unscaffolded)_ — Lower Twig to a control-flow-graph IR, with a printer and a verifier that catches malformed blocks and undefined values.

### 2.3 — Bytecode Virtual Machines

1. **Stack Machines vs. Register Machines** — Two ways to design a VM, and what each does to code size and speed.
2. **Designing an Instruction Set** — Opcodes, operands, constant pools, and a compact binary format.
3. **Compiling the AST to Bytecode** — Emitting code for expressions, variables, jumps, and loops.
4. **The VM Loop & Dispatch** — The fetch-decode-execute loop, the value stack, and where the time goes.
5. **Calls, Frames & Closures in a VM** — Call frames, locals on the stack, and upvalues for captured variables.
6. **Garbage Collection: Mark-Sweep** — Heap objects, finding roots, and reclaiming memory nobody can reach.
7. **Checkpoint** _(unscaffolded)_ — Replace the tree-walking interpreter with a bytecode VM that has a mark-sweep collector, and check it against the interpreter on every test program.

### 2.4 — Optimization

1. **Constant Folding & Propagation** — Computing at compile time what is already known, and where doing so is unsafe.
2. **Dataflow Analysis & Dead Code Elimination** — Liveness and reaching definitions as iterative analyses, and removing code that can't matter.
3. **Inlining & Loop Optimizations** — Inlining calls, hoisting invariant code, and strength reduction.
4. **Proving an Optimization Correct** — Semantics preservation, undefined behavior, and testing passes against an unoptimized baseline.
5. **Checkpoint** _(unscaffolded)_ — Implement three optimization passes on the IR, show before-and-after instruction counts, and verify every program still gives identical output.

## Level 3 — Senior

_Go from "I can build the pipeline" to "I can generate native code, tune a runtime, implement advanced language features, and defend design decisions to other engineers."_

### 3.1 — Native Code Generation

1. **Instruction Selection** — Mapping IR operations onto machine instructions, tree-pattern matching, and addressing modes.
2. **Register Allocation** — Live ranges, interference graphs, linear scan, and spilling to the stack.
3. **Calling Conventions & ABIs** — Argument registers, caller-saved vs. callee-saved registers, and stack frame layout.
4. **Object Files, Linking & Loading** — Sections, symbols, relocations, and how separate pieces become a running executable.
5. **Targeting an Existing Backend** — Emitting LLVM-style IR or WebAssembly instead of writing your own code generator.
6. **Checkpoint** _(unscaffolded)_ — Compile a subset of Twig to native assembly for one real architecture, assemble and link it, and handle register spills correctly.

### 3.2 — Advanced Runtime Systems

1. **Generational & Copying Garbage Collection** — Semispaces, the generational hypothesis, and write barriers.
2. **Concurrent GC & Pause-Time Tradeoffs** — Tri-color marking, incremental collection, and trading throughput for latency.
3. **Making Interpreters Fast** — Value tagging, NaN boxing, threaded dispatch, and inline caches.
4. **JIT Compilation & Tiered Execution** — Profiling hot code, compiling it at run time, and deoptimizing when assumptions break.
5. **Checkpoint** _(unscaffolded)_ — Replace the mark-sweep collector with a copying one, verify heap integrity under randomized stress, and report pause times and throughput for both.

### 3.3 — Advanced Language Features

1. **Pattern Matching & Algebraic Data Types** — Compiling match expressions into decision trees, and checking exhaustiveness.
2. **Exceptions & Non-Local Control Flow** — Unwinding the stack, running cleanup code, and the cost of the happy path.
3. **Coroutines, Generators & Async** — Turning suspendable functions into state machines or continuations.
4. **Implementing Generics: Monomorphization vs. Erasure** — Code size, speed, and separate-compilation tradeoffs for each strategy.
5. **Checkpoint** _(unscaffolded)_ — Add one of these features to Twig end to end — syntax, type checking, lowering, and execution — and write up the compilation strategy you chose.

### 3.4 — Correctness, Tooling & Design Judgment

1. **Testing Compilers: Differential Testing & Fuzzing** — Generating random programs, comparing implementations, and reducing a failing case.
2. **Language Servers & Incremental Compilation** — Error-tolerant parsing, caching, and recomputing only what changed.
3. **Language Design Tradeoffs** — Weighing a feature's cost to implement, to teach, and to the rest of the language.
4. **Writing & Defending a Design Document** — Stating the problem, the alternatives, and the risks so reviewers can disagree usefully.
5. **Checkpoint** _(unscaffolded)_ — Write a design proposal for a new Twig feature covering semantics, implementation plan, risks, and alternatives, then answer three hostile review questions.
