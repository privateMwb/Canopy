# Linux & DevOps — Curriculum

Three levels, twelve stages — the command line and scripting, containers, pipelines, and deployment, from first commands to running delivery platforms.

## Level 1 — Junior

_Go from "I click through a GUI" to "I can work fluently in a Linux shell, write safe scripts, administer a machine, and collaborate through Git."_

### 1.1 — The Command Line

1. **Navigating the Filesystem & the FHS** — Paths, the directory tree, and where Linux keeps programs, config, logs, and user data.
2. **Files, Permissions & Ownership** — Read, write, and execute bits, chmod and chown, and why 'permission denied' happens.
3. **Searching & Viewing: grep, find & less** — Finding files and finding text inside them, without opening an editor.
4. **Pipes, Redirection & Streams** — Chaining small tools together, and splitting stdout from stderr on purpose.
5. **Processes & Job Control** — Foreground and background jobs, ps, top, kill, and signals from the shell.
6. **Checkpoint** _(unscaffolded)_ — Given a messy directory of log files, use only shell tools to report the ten most frequent error messages and which files they came from.

### 1.2 — Shell Scripting

1. **Variables, Quoting & Expansion** — Why "$var" and $var differ, and how the shell rewrites your command before running it.
2. **Conditionals, Loops & Exit Codes** — if, for, while, and using $? as the contract between commands.
3. **Functions & Arguments** — Positional parameters, getopts, and structuring a script so it can be reused.
4. **Text Processing: sed, awk & cut** — Reshaping columns, rewriting lines, and extracting fields from command output.
5. **Writing Safe Scripts** — set -euo pipefail, trap, temporary files, and linting with ShellCheck.
6. **Checkpoint** _(unscaffolded)_ — Write a backup script that takes arguments, validates input, fails loudly on any error, cleans up after itself, and passes ShellCheck.

### 1.3 — Administering a Linux Machine

1. **Users, Groups & sudo** — Who can do what, the root account, and granting privileges without handing out root.
2. **Package Management** — apt and dnf, repositories, and what 'installing' a package actually puts on disk.
3. **Services with systemd** — Units, start and enable, dependencies, and writing your own service file.
4. **Logs: journalctl & /var/log** — Reading, filtering, and following logs to find out what a service is doing.
5. **SSH & Key-Based Access** — Key pairs, authorized_keys, ssh config, and copying files securely.
6. **Checkpoint** _(unscaffolded)_ — Provision a fresh VM from scratch: create a user, lock down SSH to keys only, install a service, and run it under systemd so it survives a reboot.

### 1.4 — Git & Collaboration

1. **Commits, Branches & History** — Snapshots, the staging area, and reading history with log and diff.
2. **Merging vs. Rebasing** — Two ways to combine work, what each does to history, and when to use which.
3. **Remotes, Pull Requests & Code Review** — Pushing, pulling, and the review loop that every CI pipeline hangs off.
4. **Undoing Mistakes: reset, revert & reflog** — Recovering lost commits and choosing the right undo for shared vs. local history.
5. **Checkpoint** _(unscaffolded)_ — Resolve a three-way merge conflict, rewrite a messy branch into clean commits, and recover a deleted commit using the reflog.

## Level 2 — Intermediate

_Go from "I can use Linux and Git" to "I can package an application into a container, build a pipeline that tests and ships it, and deploy it to a server without downtime."_

### 2.1 — Containers with Docker

1. **Images, Layers & the Container Runtime** — How the namespaces and cgroups from the OS track become docker run, and what an image really is.
2. **Running Containers: Ports, Volumes & Environment** — Publishing ports, persisting data, and passing configuration into a container.
3. **Writing Dockerfiles** — FROM, COPY, RUN, CMD vs. ENTRYPOINT, and building an image for a real app.
4. **Build Caching & Multi-Stage Builds** — Ordering layers for fast rebuilds, and shipping small images without compilers in them.
5. **Container Networking & Docker Compose** — Bridge networks, service discovery by name, and running a multi-container app from one file.
6. **Registries, Tags & Image Hygiene** — Pushing and pulling, why 'latest' is a trap, and pinning versions and digests.
7. **Checkpoint** _(unscaffolded)_ — Containerize a small web app with a database: a multi-stage Dockerfile under 100 MB, a Compose file, persistent data, and no secrets baked into the image.

### 2.2 — CI/CD Pipelines

1. **Anatomy of a Pipeline** — Triggers, stages, jobs, and what continuous integration and continuous delivery each promise.
2. **GitHub Actions: Workflows, Jobs & Runners** — YAML workflows, matrix builds, and how a job maps onto a fresh runner.
3. **Tests, Caching & Artifacts in CI** — Making pipelines fast and trustworthy, and passing build output between jobs.
4. **Secrets & Credentials in Pipelines** — Encrypted secrets, scoping, and why a pull request from a fork must not see them.
5. **Building & Publishing Images from CI** — Tagging by commit, pushing to a registry, and promoting the same artifact across environments.
6. **Checkpoint** _(unscaffolded)_ — Build a pipeline that lints, tests on two language versions, builds a container image, and pushes it to a registry only when the main branch passes.

### 2.3 — Deploying to Servers

1. **Reverse Proxies & TLS with nginx** — Terminating HTTPS, routing by host and path, and getting certificates with Let's Encrypt.
2. **Deploying to a VM: SSH, systemd & Containers** — The simplest real deployment, scripted so it is repeatable instead of hand-typed.
3. **Rolling, Blue-Green & Canary Releases** — Three ways to replace a running version, and what each costs in risk and capacity.
4. **Configuration & Environments** — The twelve-factor approach: config in the environment, and keeping dev, staging, and prod honest.
5. **Rollbacks & Database Migrations** — Why code rolls back easily and schemas don't, and the expand-and-contract pattern.
6. **Checkpoint** _(unscaffolded)_ — Deploy a containerized app behind nginx with HTTPS, push a new version with zero dropped requests, then roll it back.

### 2.4 — Infrastructure as Code

1. **Cloud Building Blocks** — Compute, networks, storage, and IAM — the four primitives under every cloud provider.
2. **Terraform Basics: Providers, Resources & Variables** — Declaring infrastructure in code instead of clicking through a console.
3. **State, Plans & Drift** — What the state file is, reading a plan before applying it, and detecting out-of-band changes.
4. **Configuration Management & Idempotency with Ansible** — Playbooks that converge a machine to a described state, and safe to run twice.
5. **Modules, Environments & Safe Changes** — Reusing infrastructure code and reviewing infrastructure changes like application code.
6. **Checkpoint** _(unscaffolded)_ — Define a network, a VM, and a firewall in Terraform, configure the VM with Ansible, then tear it all down and rebuild it from nothing with two commands.

## Level 3 — Senior

_Go from "I can build and ship a service" to "I can design delivery platforms, keep them reliable and secure under failure, and explain the tradeoffs clearly to others."_

### 3.1 — Orchestration with Kubernetes

1. **Why Orchestrators: Desired State & Reconciliation** — Control loops, declarative config, and what problem Kubernetes solves that Compose doesn't.
2. **Pods, Deployments & Services** — The core objects, how traffic finds a pod, and how a rollout replaces replicas.
3. **Config, Secrets & Persistent Storage** — ConfigMaps, Secrets, volumes, and running stateful workloads without losing data.
4. **Requests, Limits & Scheduling** — How cgroups surface as CPU and memory limits, throttling, evictions, and OOM kills.
5. **Probes, Autoscaling & Safe Rollouts** — Readiness and liveness probes, horizontal scaling, and rolling updates that don't drop traffic.
6. **Checkpoint** _(unscaffolded)_ — Deploy a multi-service app to a cluster with probes, resource limits, autoscaling, and a rolling update, then break it on purpose and explain each failure.

### 3.2 — Observability & Reliability

1. **Metrics, Logs & Traces** — The three pillars, what question each answers, and instrumenting a service to emit them.
2. **SLIs, SLOs & Error Budgets** — Turning 'reliable enough' into a number, and using the budget to decide when to ship.
3. **Alerting That Doesn't Cry Wolf** — Symptom-based alerts, paging rules, and the cost of noisy on-call.
4. **Incident Response & Blameless Postmortems** — Running an incident, communicating during it, and learning from it without finding a scapegoat.
5. **Checkpoint** _(unscaffolded)_ — Define SLOs for a service, build a dashboard and two alerts from them, then run a game-day failure and write the postmortem.

### 3.3 — Security & Supply Chain

1. **Least Privilege for Hosts & Containers** — Non-root users, dropped capabilities, read-only filesystems, and scoped IAM roles.
2. **Secrets Management & Workload Identity** — Vaults, short-lived credentials, and OIDC so pipelines hold no long-lived keys.
3. **Image Scanning, SBOMs & Supply-Chain Risk** — Dependency and base-image vulnerabilities, provenance, and signing what you ship.
4. **Hardening Pipelines & Policy as Code** — Treating CI as an attack surface, and enforcing rules automatically instead of by review.
5. **Checkpoint** _(unscaffolded)_ — Threat-model a CI/CD pipeline end to end, then fix the three worst findings and justify what you chose to accept.

### 3.4 — Operating & Designing Platforms

1. **Debugging Production: Linux & Container Internals** — Using strace, /proc, nsenter, and cgroup files to diagnose what a container is really doing.
2. **Capacity, Cost & Performance Tradeoffs** — Right-sizing, autoscaling economics, and spending reliability where it matters.
3. **Designing a Delivery Platform** — Golden paths, environments, and promotion flows that make the right thing the easy thing.
4. **Runbooks, ADRs & Leading Operational Change** — Writing down decisions and procedures, and persuading a team to adopt a new way of working.
5. **Checkpoint** _(unscaffolded)_ — Write a design doc for a delivery platform serving ten teams: architecture, rollout plan, failure modes, cost, and the tradeoffs you rejected.
