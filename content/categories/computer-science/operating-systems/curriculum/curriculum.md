# Operating Systems — Curriculum

Three levels, twelve stages — processes, threads, and memory management, from first principles to production diagnosis.

## Level 1 — Junior

_Go from "I use programs" to "I can explain what the OS does for a running program, and write small C programs that create processes, threads, and memory safely."_

### 1.1 — Core OS Concepts

1. **What an Operating System Does** — Resource management and abstraction — the OS as the layer between programs and hardware.
2. **User Mode, Kernel Mode & System Calls** — The privilege boundary, and how a program asks the kernel to do something on its behalf.
3. **Kernel Structure & the Boot Process** — Monolithic vs. microkernel designs, and what happens between power-on and your first process.
4. **Files & File Descriptors** — Why 'everything is a file' in Unix, and what stdin, stdout, and stderr really are.
5. **Checkpoint** _(unscaffolded)_ — Run a small program under strace and explain, line by line, which system calls it made and why.

### 1.2 — Processes

1. **What Is a Process** — Address space, program counter, and the process control block (PCB).
2. **Process States & Context Switching** — New, ready, running, blocked — and what the OS saves and restores when it swaps processes.
3. **Creating Processes: fork, exec & wait** — How every Unix process is born, replaced, and reaped.
4. **Signals & Exit Status** — Asynchronous notifications, handlers, zombies, and orphans.
5. **Pipes & Basic IPC** — Connecting processes with pipes and redirecting their input and output.
6. **Checkpoint** _(unscaffolded)_ — Write a tiny shell in C that runs commands, supports | pipes, and reaps its children correctly.

### 1.3 — Threads

1. **Threads vs. Processes** — What threads share, what they keep private, and when each is the right tool.
2. **Creating & Joining Threads** — The pthreads API — create, join, detach, and passing arguments safely.
3. **Race Conditions** — Why `counter++` isn't atomic, and how to see a race happen on demand.
4. **Mutexes & Critical Sections** — Locking shared data, choosing what a lock protects, and keeping critical sections small.
5. **Threading Models** — User-level vs. kernel-level threads and the many-to-one, one-to-one, and many-to-many mappings.
6. **Checkpoint** _(unscaffolded)_ — Write a multi-threaded counter that visibly races, then fix it two different ways and measure the cost.

### 1.4 — Memory Fundamentals

1. **Process Address Space Layout** — Code, data, heap, stack, and where each kind of variable actually lives.
2. **The Stack & Function Calls** — Stack frames, return addresses, and what happens on a call and a return.
3. **Dynamic Allocation: malloc & free** — Requesting heap memory, ownership, and the rules for releasing it.
4. **Memory Bugs** — Leaks, use-after-free, double free, and buffer overflows — how each one shows up.
5. **Fragmentation & Basic Allocation Strategies** — Internal vs. external fragmentation, and first-fit, best-fit, and worst-fit placement.
6. **Checkpoint** _(unscaffolded)_ — Given a C program with five planted memory bugs, find and fix every one using Valgrind or AddressSanitizer.

## Level 2 — Intermediate

_Go from "I know what processes, threads, and memory are" to "I can reason about scheduling, synchronization, and virtual memory well enough to predict how a system behaves under load."_

### 2.1 — CPU Scheduling

1. **Scheduling Goals & Metrics** — Turnaround, response time, throughput, and fairness — and why they pull against each other.
2. **FCFS, SJF & Round Robin** — The classic algorithms, worked by hand on a Gantt chart.
3. **Priority Scheduling & Multilevel Feedback Queues** — Starvation, aging, and how MLFQ approximates SJF without knowing job lengths.
4. **Linux Scheduling: CFS & EEVDF** — Virtual runtime, nice values, and how a production scheduler divides CPU time.
5. **Multiprocessor Scheduling & CPU Affinity** — Per-core run queues, load balancing, and why migrating a thread has a cost.
6. **Checkpoint** _(unscaffolded)_ — Build a scheduler simulator and compare FCFS, RR, and MLFQ on the same workload using turnaround and response time.

### 2.2 — Synchronization & Deadlock

1. **Semaphores** — Counting and binary semaphores, and using them for both mutual exclusion and signaling.
2. **Condition Variables & Monitors** — Waiting for a condition safely — and why the wait goes in a loop.
3. **Classic Synchronization Problems** — Producer–consumer, readers–writers, and dining philosophers.
4. **Deadlock: Conditions, Prevention & Detection** — The four necessary conditions, lock ordering, and resource-allocation graphs.
5. **Spinlocks vs. Sleeping Locks** — When busy-waiting beats blocking, and the cost of each on a multicore machine.
6. **Checkpoint** _(unscaffolded)_ — Implement a bounded buffer with several producers and consumers using condition variables, with no deadlock and no lost wakeups.

### 2.3 — Virtual Memory

1. **Why Virtual Memory** — Isolation, abstraction, and the illusion of a private, contiguous address space.
2. **Paging & Page Tables** — Pages, frames, and translating a virtual address by hand.
3. **Multi-Level Page Tables & the TLB** — Shrinking page tables, and caching translations to avoid a memory access per access.
4. **Page Faults & Demand Paging** — Minor vs. major faults, lazy loading, and what the OS does when a page is missing.
5. **Page Replacement Algorithms** — FIFO, LRU, Clock, and Belady's anomaly.
6. **Copy-on-Write & Shared Pages** — How `fork` is cheap, and how pages are shared between processes safely.
7. **Checkpoint** _(unscaffolded)_ — Write a simulator that translates addresses through a page table and TLB, handles faults, and compares replacement policies on one trace.

### 2.4 — Allocators & Mapped Memory

1. **How malloc Works** — brk, mmap, arenas, and size classes underneath a single malloc call.
2. **Allocator Designs: Free Lists, Buddy & Slab** — Splitting, coalescing, and picking a design for the allocation pattern.
3. **mmap & Shared Memory** — Memory-mapped files, anonymous mappings, and sharing memory between processes.
4. **Memory Management Across Languages** — Manual, RAII, reference counting, and garbage collection — what each costs the OS and the program.
5. **Checkpoint** _(unscaffolded)_ — Implement a free-list malloc with splitting and coalescing, and test it against a randomized allocation workload.

## Level 3 — Senior

_Go from "I understand how the mechanisms work" to "I can design concurrent and memory-heavy systems, diagnose them in production, and explain the tradeoffs clearly to others."_

### 3.1 — Advanced Concurrency

1. **Atomics & Memory Ordering** — Compare-and-swap, acquire/release semantics, and why the compiler and CPU reorder your code.
2. **Lock-Free Data Structures & the ABA Problem** — Building a lock-free stack, and the failure modes that make lock-free hard.
3. **Futexes & How Locks Are Built** — The fast path in user space, the slow path in the kernel, and how a mutex is actually implemented.
4. **Thread Pools, Work Stealing & Async I/O** — Scheduling work across threads, and epoll and io_uring as alternatives to a thread per connection.
5. **Checkpoint** _(unscaffolded)_ — Implement a lock-free MPSC queue or a work-stealing thread pool, and defend every memory-ordering choice in writing.

### 3.2 — Memory Hierarchy & Pressure

1. **Caches, Coherence & False Sharing** — How cache lines move between cores, and why two unrelated variables can slow each other down.
2. **NUMA & Memory Placement** — Local vs. remote memory, first-touch policy, and pinning threads next to their data.
3. **Huge Pages & TLB Reach** — Trading fragmentation for fewer TLB misses, and when transparent huge pages help or hurt.
4. **Overcommit, Swapping & the OOM Killer** — What happens when memory runs out, and how Linux chooses what to kill.
5. **Checkpoint** _(unscaffolded)_ — Given a slow, memory-heavy service, diagnose whether the cause is faults, NUMA, TLB misses, or swap — and prove it with measurements.

### 3.3 — Isolation & Virtualization

1. **Namespaces: What a Container Really Is** — PID, mount, network, and user namespaces — isolation without a separate kernel.
2. **cgroups & Resource Limits** — CPU shares, CPU throttling, and memory limits — and why containers get OOM-killed.
3. **Sandboxing & Memory Protection** — seccomp, capabilities, ASLR, NX, and stack canaries as layers of defense.
4. **Virtualization & Hypervisors** — Trap-and-emulate, hardware virtualization, and nested page tables.
5. **Checkpoint** _(unscaffolded)_ — Build a minimal container by hand using namespaces and cgroups, then show what it can and cannot isolate.

### 3.4 — Diagnosis & Design Judgment

1. **Observing a Live System: strace, perf, /proc & eBPF** — Choosing the tool that answers your question without perturbing the system.
2. **Diagnosing CPU, Memory & Lock Contention** — A systematic method for finding the bottleneck instead of guessing.
3. **Debugging Deadlocks, Leaks & Crashes** — Reading core dumps, thread dumps, and sanitizer reports for bugs you can't reproduce on demand.
4. **Processes vs. Threads vs. Async: Design Tradeoffs** — Choosing a concurrency model for a real workload and defending the choice.
5. **Checkpoint** _(unscaffolded)_ — Write an incident-style post-mortem for a hang or memory blowup: symptoms, evidence, root cause, fix, and the design lesson.
