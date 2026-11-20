# Computer Architecture — Curriculum

Three levels, twelve stages — CPUs, caches, and pipelines, from logic gates to performance engineering.

## Level 1 — Junior

_Go from "computers run code" to "I can explain how numbers, instructions, and memory work at the hardware level, read simple assembly, and predict basic performance."_

### 1.1 — Data Representation & Logic

1. **Bits, Bytes & Number Systems** — Binary and hexadecimal, and how everything a computer stores reduces to bits.
2. **Integers: Unsigned, Two's Complement & Overflow** — How negative numbers are stored, and why 127 + 1 can equal -128.
3. **Floating Point & Its Surprises** — IEEE 754 layout, rounding, and why 0.1 + 0.2 is not 0.3.
4. **Logic Gates & Building an Adder** — AND, OR, XOR, and how a handful of gates add two numbers.
5. **Checkpoint** _(unscaffolded)_ — Build a 4-bit adder from logic gates in a simulator, verify it against a truth table, and explain a two's complement overflow case.

### 1.2 — The Instruction Set & the CPU

1. **The Fetch-Decode-Execute Cycle** — The loop every CPU runs, and the program counter that drives it.
2. **Registers, Memory & Addressing Modes** — Where operands live, and the ways an instruction can name them.
3. **Instructions: Arithmetic, Control Flow & the Stack** — Reading and writing basic assembly with RISC-V as the teaching ISA.
4. **From C to Assembly** — Reading compiler output, and seeing how loops, calls, and arrays become instructions.
5. **RISC vs. CISC: x86-64, ARM & RISC-V** — How instruction sets differ, and why the same program compiles to different machine code.
6. **Checkpoint** _(unscaffolded)_ — Hand-trace a short assembly loop that sums an array, tracking registers and memory, then confirm it against a simulator or compiler output.

### 1.3 — The Memory Hierarchy

1. **Why Memory Is a Hierarchy** — Registers, caches, DRAM, and SSD, with the speed and size gaps between them.
2. **Locality: Temporal & Spatial** — The program behavior that makes caches work.
3. **Caches: Lines, Hits & Misses** — Cache lines, hit rate, and average memory access time.
4. **Data Layout: Arrays, Structs & Alignment** — How layout in memory decides how many cache lines you touch.
5. **Checkpoint** _(unscaffolded)_ — Write a program that times array traversals at different sizes and strides, graph the results, and explain each jump in cost.

### 1.4 — Performance Basics

1. **The CPU Performance Equation** — Instruction count, cycles per instruction, and clock rate, and what each one depends on.
2. **Measuring Performance Honestly** — Timing, warm-up, variance, and benchmarks that mean something.
3. **Amdahl's Law** — Why speeding up part of a program caps the overall gain.
4. **Power, Frequency & the End of Free Speedups** — Why clock rates stopped rising and cores multiplied instead.
5. **Checkpoint** _(unscaffolded)_ — Given two CPUs and a workload profile, predict which is faster using the performance equation and Amdahl's law, then check with a benchmark.

## Level 2 — Intermediate

_Go from "I know the parts" to "I can explain why code runs fast or slow: pipeline stalls, cache misses, memory limits, and parallelism inside a single core."_

### 2.1 — Pipelining & Hazards

1. **The Five-Stage Pipeline** — Overlapping instructions to raise throughput, and what it does to latency.
2. **Data Hazards, Forwarding & Stalls** — When one instruction needs another's result, and how hardware hides the wait.
3. **Control Hazards & Branch Prediction** — Why branches hurt a pipeline, and how static and dynamic predictors guess.
4. **Branch Misprediction in Real Code** — Why a sorted array can be faster to scan, and how to measure the cost.
5. **Checkpoint** _(unscaffolded)_ — Simulate a pipeline on a short instruction sequence with and without forwarding, count stalls, and measure branch misprediction cost in a real program.

### 2.2 — Cache Design in Depth

1. **Set-Associative Caches & Replacement** — Tag, index, and offset arithmetic, and how LRU-style policies choose a victim.
2. **Write Policies: Write-Through, Write-Back & Allocation** — What happens on a store, and why it matters for bandwidth.
3. **The Three Cs: Compulsory, Capacity & Conflict Misses** — Classifying misses to know which fix will help.
4. **Multilevel Caches & AMAT** — L1, L2, L3, and computing average access time across levels.
5. **Prefetching & Cache-Friendly Code** — Hardware prefetchers, loop tiling, and structuring loops for locality.
6. **Checkpoint** _(unscaffolded)_ — Write a cache simulator driven by an address trace, vary size, associativity, and line size, and explain the change in miss rate.

### 2.3 — DRAM & the Memory System

1. **DRAM: Rows, Banks & Refresh** — Why access pattern changes DRAM speed, and what a row buffer is.
2. **Memory Bandwidth vs. Latency** — Two different limits, and how to tell which one your program hits.
3. **Address Translation Hardware: TLBs & Page Walks** — The hardware side of virtual memory, and the cost of a TLB miss.
4. **Storage: SSDs, HDDs & the Latency Gap** — Where flash and disk sit in the hierarchy, and what their numbers mean.
5. **Checkpoint** _(unscaffolded)_ — Measure memory latency and bandwidth on your machine, compare them to the datasheet, and explain the gap.

### 2.4 — Instruction-Level Parallelism

1. **Superscalar & Out-of-Order Execution** — Issuing several instructions per cycle and running them in a different order than written.
2. **Register Renaming, the Reorder Buffer & Speculation** — How an out-of-order core stays correct while running ahead.
3. **SIMD & Vectorization** — One instruction on many data elements, and writing loops compilers can vectorize.
4. **Hardware Performance Counters** — Using perf to read IPC, cache misses, and branch misses.
5. **Checkpoint** _(unscaffolded)_ — Take a slow loop, use performance counters to identify whether branches, cache, or compute limits it, and speed it up with a measured change.

## Level 3 — Senior

_Go from "I understand how one core works" to "I can reason about multicore behavior, hardware security limits, and accelerators, find a bottleneck in a real program, and explain the tradeoffs."_

### 3.1 — Multicore, Coherence & Consistency

1. **Cache Coherence: MESI & Directories** — How cores keep their private caches consistent, and how it scales.
2. **The Cost of Coherence** — Invalidations, ping-ponging lines, and why shared writes limit scaling.
3. **Memory Consistency Models: TSO vs. Weak Ordering** — What reorderings the hardware allows, and why x86 and ARM differ.
4. **Atomic Instructions & Synchronization Hardware** — Compare-and-swap, load-linked/store-conditional, and memory fences.
5. **Checkpoint** _(unscaffolded)_ — Write litmus tests for store buffering and message passing, run them on your hardware, and explain the observed outcomes using the memory model.

### 3.2 — Speculation & Hardware Security

1. **Inside an Out-of-Order Core** — Front end, back end, execution ports, and where the bottlenecks sit.
2. **Speculative Execution & Spectre-Class Flaws** — How running ahead can leak data, explained conceptually.
3. **Side Channels: Caches, Timing & Rowhammer** — How hardware behavior leaks information, and why software can't always see it.
4. **Mitigations & Their Performance Cost** — Fences, isolation, and microcode, and what each costs.
5. **Checkpoint** _(unscaffolded)_ — Write an analysis of one speculative-execution vulnerability class: what it leaks, why it works, and the tradeoffs of each mitigation, with no exploit code.

### 3.3 — Accelerators & Parallel Hardware

1. **GPUs: SIMT, Warps & Memory** — Thousands of threads, how they execute in groups, and what makes a GPU kernel slow.
2. **Matrix Engines & Why ML Runs on Accelerators** — Tensor cores, TPUs, and the arithmetic intensity of neural networks.
3. **Heterogeneous Systems & Data Movement** — PCIe, unified memory, and the cost of moving data between devices.
4. **FPGAs, ASICs & the Efficiency Tradeoff** — Flexibility versus efficiency, and when specialized hardware pays off.
5. **Checkpoint** _(unscaffolded)_ — For a given kernel and machine, estimate whether it is compute-bound or memory-bound and predict the speedup from moving it to a GPU.

### 3.4 — Performance Engineering & Design Judgment

1. **The Roofline Model** — Plotting a program against compute and bandwidth ceilings to see what limits it.
2. **Top-Down Microarchitecture Analysis** — A method for attributing lost cycles to front end, back end, speculation, or retirement.
3. **Data-Oriented Design** — Array-of-structs vs. struct-of-arrays, and shaping data for the hardware.
4. **Explaining Hardware Tradeoffs** — Choosing machines, cores, and memory for a workload, and defending the choice.
5. **Checkpoint** _(unscaffolded)_ — Take a compute-heavy program, find and fix its top bottleneck with top-down analysis, and write the case study with before and after numbers.
