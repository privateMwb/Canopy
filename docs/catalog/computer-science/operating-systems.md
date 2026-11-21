[← Computer Science](../computer-science.md)

# Operating Systems

Processes, threads, and memory, from fork() to page tables.

**55 lessons** · 3 levels · 12 stages

## 🟢 Junior

| Stage | Lessons |
|:--|:--|
| **1.1**<br>Core OS Concepts | `What an Operating System Does` `User Mode, Kernel Mode & System Calls` `Kernel Structure & the Boot Process` `Files & File Descriptors` |
| **1.2**<br>Processes | `What Is a Process` `Process States & Context Switching` `Creating Processes: fork, exec & wait` `Signals & Exit Status` `Pipes & Basic IPC` |
| **1.3**<br>Threads | `Threads vs. Processes` `Creating & Joining Threads` `Race Conditions` `Mutexes & Critical Sections` `Threading Models` |
| **1.4**<br>Memory Fundamentals | `Process Address Space Layout` `The Stack & Function Calls` `Dynamic Allocation: malloc & free` `Memory Bugs` `Fragmentation & Basic Allocation Strategies` |

## 🟡 Intermediate

| Stage | Lessons |
|:--|:--|
| **2.1**<br>CPU Scheduling | `Scheduling Goals & Metrics` `FCFS, SJF & Round Robin` `Priority Scheduling & Multilevel Feedback Queues` `Linux Scheduling: CFS & EEVDF` `Multiprocessor Scheduling & CPU Affinity` |
| **2.2**<br>Synchronization & Deadlock | `Semaphores` `Condition Variables & Monitors` `Classic Synchronization Problems` `Deadlock: Conditions, Prevention & Detection` `Spinlocks vs. Sleeping Locks` |
| **2.3**<br>Virtual Memory | `Why Virtual Memory` `Paging & Page Tables` `Multi-Level Page Tables & the TLB` `Page Faults & Demand Paging` `Page Replacement Algorithms` `Copy-on-Write & Shared Pages` |
| **2.4**<br>Allocators & Mapped Memory | `How malloc Works` `Allocator Designs: Free Lists, Buddy & Slab` `mmap & Shared Memory` `Memory Management Across Languages` |

## 🔴 Senior

| Stage | Lessons |
|:--|:--|
| **3.1**<br>Advanced Concurrency | `Atomics & Memory Ordering` `Lock-Free Data Structures & the ABA Problem` `Futexes & How Locks Are Built` `Thread Pools, Work Stealing & Async I/O` |
| **3.2**<br>Memory Hierarchy & Pressure | `Caches, Coherence & False Sharing` `NUMA & Memory Placement` `Huge Pages & TLB Reach` `Overcommit, Swapping & the OOM Killer` |
| **3.3**<br>Isolation & Virtualization | `Namespaces: What a Container Really Is` `cgroups & Resource Limits` `Sandboxing & Memory Protection` `Virtualization & Hypervisors` |
| **3.4**<br>Diagnosis & Design Judgment | `Observing a Live System: strace, perf, /proc & eBPF` `Diagnosing CPU, Memory & Lock Contention` `Debugging Deadlocks, Leaks & Crashes` `Processes vs. Threads vs. Async: Design Tradeoffs` |

---

[← Computer Science](../computer-science.md) · [Back to Canopy](../../../README.md#whats-inside)
