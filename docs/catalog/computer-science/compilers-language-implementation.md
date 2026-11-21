[← Computer Science](../computer-science.md)

# Compilers & Language Implementation

Parsing, type checking, and code generation, from lexer to native code.

**54 lessons** · 3 levels · 12 stages

## 🟢 Junior

| Stage | Lessons |
|:--|:--|
| **1.1**<br>The Big Picture | `What a Language Implementation Does` `Meet Twig` `Grammars & EBNF` `Abstract Syntax Trees` |
| **1.2**<br>Lexing & Parsing | `Scanning: Characters to Tokens` `Source Positions & Lexical Errors` `Recursive Descent Parsing` `Operator Precedence & Pratt Parsing` `Syntax Errors & Recovery` |
| **1.3**<br>Evaluating Programs | `Evaluating Expressions` `Environments & Lexical Scope` `Control Flow & Loops` `Functions, Calls & Return` `Closures & Captured Variables` |
| **1.4**<br>Data, Diagnostics & Testing | `Values, Truthiness & Dynamic Typing` `Arrays & Records` `Error Messages That Help` `Testing a Language Implementation` |

## 🟡 Intermediate

| Stage | Lessons |
|:--|:--|
| **2.1**<br>Static Analysis & Type Checking | `Name Resolution & Symbol Tables` `Static vs. Dynamic Typing` `Type Checking Expressions & Statements` `Type Inference & Unification` `Generics & Subtyping` |
| **2.2**<br>Intermediate Representations | `Why Intermediate Representations` `Three-Address Code & Lowering` `Control-Flow Graphs & Basic Blocks` `Static Single Assignment` |
| **2.3**<br>Bytecode Virtual Machines | `Stack Machines vs. Register Machines` `Designing an Instruction Set` `Compiling the AST to Bytecode` `The VM Loop & Dispatch` `Calls, Frames & Closures in a VM` `Garbage Collection: Mark-Sweep` |
| **2.4**<br>Optimization | `Constant Folding & Propagation` `Dataflow Analysis & Dead Code Elimination` `Inlining & Loop Optimizations` `Proving an Optimization Correct` |

## 🔴 Senior

| Stage | Lessons |
|:--|:--|
| **3.1**<br>Native Code Generation | `Instruction Selection` `Register Allocation` `Calling Conventions & ABIs` `Object Files, Linking & Loading` `Targeting an Existing Backend` |
| **3.2**<br>Advanced Runtime Systems | `Generational & Copying Garbage Collection` `Concurrent GC & Pause-Time Tradeoffs` `Making Interpreters Fast` `JIT Compilation & Tiered Execution` |
| **3.3**<br>Advanced Language Features | `Pattern Matching & Algebraic Data Types` `Exceptions & Non-Local Control Flow` `Coroutines, Generators & Async` `Implementing Generics: Monomorphization vs. Erasure` |
| **3.4**<br>Correctness, Tooling & Design Judgment | `Testing Compilers: Differential Testing & Fuzzing` `Language Servers & Incremental Compilation` `Language Design Tradeoffs` `Writing & Defending a Design Document` |

---

[← Computer Science](../computer-science.md) · [Back to Canopy](../../../README.md#whats-inside)
