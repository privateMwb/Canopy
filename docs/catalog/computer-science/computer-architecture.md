[← Computer Science](../computer-science.md)

# Computer Architecture

CPUs, caches, and pipelines, from logic gates to performance.

**50 lessons** · 3 levels · 12 stages

## 🟢 Junior

| Stage | Lessons |
|:--|:--|
| **1.1**<br>Data Representation & Logic | `Bits, Bytes & Number Systems` `Integers: Unsigned, Two's Complement & Overflow` `Floating Point & Its Surprises` `Logic Gates & Building an Adder` |
| **1.2**<br>The Instruction Set & the CPU | `The Fetch-Decode-Execute Cycle` `Registers, Memory & Addressing Modes` `Instructions: Arithmetic, Control Flow & the Stack` `From C to Assembly` `RISC vs. CISC: x86-64, ARM & RISC-V` |
| **1.3**<br>The Memory Hierarchy | `Why Memory Is a Hierarchy` `Locality: Temporal & Spatial` `Caches: Lines, Hits & Misses` `Data Layout: Arrays, Structs & Alignment` |
| **1.4**<br>Performance Basics | `The CPU Performance Equation` `Measuring Performance Honestly` `Amdahl's Law` `Power, Frequency & the End of Free Speedups` |

## 🟡 Intermediate

| Stage | Lessons |
|:--|:--|
| **2.1**<br>Pipelining & Hazards | `The Five-Stage Pipeline` `Data Hazards, Forwarding & Stalls` `Control Hazards & Branch Prediction` `Branch Misprediction in Real Code` |
| **2.2**<br>Cache Design in Depth | `Set-Associative Caches & Replacement` `Write Policies: Write-Through, Write-Back & Allocation` `The Three Cs: Compulsory, Capacity & Conflict Misses` `Multilevel Caches & AMAT` `Prefetching & Cache-Friendly Code` |
| **2.3**<br>DRAM & the Memory System | `DRAM: Rows, Banks & Refresh` `Memory Bandwidth vs. Latency` `Address Translation Hardware: TLBs & Page Walks` `Storage: SSDs, HDDs & the Latency Gap` |
| **2.4**<br>Instruction-Level Parallelism | `Superscalar & Out-of-Order Execution` `Register Renaming, the Reorder Buffer & Speculation` `SIMD & Vectorization` `Hardware Performance Counters` |

## 🔴 Senior

| Stage | Lessons |
|:--|:--|
| **3.1**<br>Multicore, Coherence & Consistency | `Cache Coherence: MESI & Directories` `The Cost of Coherence` `Memory Consistency Models: TSO vs. Weak Ordering` `Atomic Instructions & Synchronization Hardware` |
| **3.2**<br>Speculation & Hardware Security | `Inside an Out-of-Order Core` `Speculative Execution & Spectre-Class Flaws` `Side Channels: Caches, Timing & Rowhammer` `Mitigations & Their Performance Cost` |
| **3.3**<br>Accelerators & Parallel Hardware | `GPUs: SIMT, Warps & Memory` `Matrix Engines & Why ML Runs on Accelerators` `Heterogeneous Systems & Data Movement` `FPGAs, ASICs & the Efficiency Tradeoff` |
| **3.4**<br>Performance Engineering & Design Judgment | `The Roofline Model` `Top-Down Microarchitecture Analysis` `Data-Oriented Design` `Explaining Hardware Tradeoffs` |

---

[← Computer Science](../computer-science.md) · [Back to Canopy](../../../README.md#whats-inside)
