# Docker & Containers — Curriculum

Three levels, twelve stages — containers, images, Compose, and everyday fluency first, then smaller and safer images, running containers well, and local orchestration, built toward the kernel mechanisms, supply-chain security, and platform judgment to run container workloads on purpose.

## Level 1 — Junior

_Go from "it works on my machine" to "I can package an app in a container and run several together."_

### 1.1 — Containers From Zero

1. **What Containers Are (and Aren't)** — How containers differ from virtual machines and what problem they solve.
2. **Installing Docker & Running Your First Container** — run, ps, stop, rm, and logs.
3. **Images, Tags & Registries** — Pulling images, tags versus digests, and where images live.
4. **Working Inside Containers** — Exec, published ports, environment variables, and cleaning up.
5. **The Container Lifecycle & Cleanup** — Created, running, stopped, and removed, plus naming, restart behavior, and pruning.
6. **Checkpoint** _(unscaffolded)_ — Run a web server and a database from public images, reach them from your host, change a setting with an environment variable, and remove everything cleanly.

### 1.2 — Building Images

1. **Writing a Dockerfile** — FROM, COPY, RUN, and CMD for a small application.
2. **Build Context & .dockerignore** — What gets sent to the builder and how to keep it small.
3. **CMD vs. ENTRYPOINT & Configuration** — Exec form, environment variables, and build arguments.
4. **Layers & the Build Cache** — Ordering instructions so rebuilds take seconds.
5. **Language Recipes: Node, Python, Java & Go** — Idiomatic Dockerfiles for four common stacks.
6. **Checkpoint** _(unscaffolded)_ — Containerize a small web app, then reorder the Dockerfile so changing one source file does not reinstall dependencies.

### 1.3 — Data & Multi-Container Apps

1. **Volumes & Bind Mounts** — Keeping data when a container is replaced.
2. **Container Networking Basics** — Bridge networks, container DNS, and published ports.
3. **Docker Compose** — Describing a multi-container app in one file.
4. **A Full Stack in Compose** — An app, database, and cache with health checks and a development workflow.
5. **Configuration Across Environments** — .env files, overrides, and keeping secrets out of the repository.
6. **Checkpoint** _(unscaffolded)_ — Bring up an app, a database, and a cache with one command, prove the data survives a restart, and tear it all down.

### 1.4 — CLI Fluency & Troubleshooting

1. **CLI Power Use** — Formatting, filtering, inspecting, and the commands worth memorizing.
2. **Docker Desktop, Contexts & Alternatives** — Desktop, Colima, Podman, and switching between engines.
3. **Docker on Windows, macOS & Linux** — File-sharing performance, WSL2, and the Linux VM underneath.
4. **Reading Errors: Common Failures & Fixes** — The ten failures everyone meets and how to diagnose each.
5. **Checkpoint** _(unscaffolded)_ — Diagnose and fix five broken container setups using only logs, inspect, and the documentation.

## Level 2 — Intermediate

_Go from "it runs" to "my images are small, fast to build, secure, and ready for CI."_

### 2.1 — Better Images

1. **Multi-Stage Builds** — Compiling in one stage and shipping only the result.
2. **Choosing Base Images** — Full, slim, Alpine, and distroless, and what each costs you.
3. **BuildKit, Cache Mounts & Build Secrets** — Faster builds and passing secrets without leaking them into layers.
4. **Reproducible & Multi-Platform Builds** — Pinning versions and building for amd64 and arm64.
5. **Image Size Forensics** — Inspecting layers, finding bloat, and slimming an image methodically.
6. **Checkpoint** _(unscaffolded)_ — Cut a 1 GB image to under 100 MB without breaking it, and show the before and after layer sizes.

### 2.2 — Running Containers Well

1. **Resource Limits & Restart Policies** — Memory and CPU limits, and what happens when they are hit.
2. **Health Checks & Graceful Shutdown** — Signals, PID 1, and stopping without dropping requests.
3. **Logging & Debugging Containers** — Reading logs, inspecting state, and debugging minimal images.
4. **Networking in Depth** — User-defined networks, DNS, aliases, and the host and none modes.
5. **Runtime Configuration & Secrets** — Delivering configuration and credentials to a running container safely.
6. **Checkpoint** _(unscaffolded)_ — Make a service that survives a crash, shuts down cleanly on SIGTERM, and reports its own health, and prove each with a test.

### 2.3 — Registries, CI & Security Basics

1. **Registries & Image Promotion** — Tagging strategy, private registries, and moving images between environments.
2. **Docker in CI/CD Pipelines** — Building, testing, pushing, and caching in automation.
3. **Non-Root Users & Least Privilege** — Running as a normal user, read-only filesystems, and dropping capabilities.
4. **Scanning Images & Managing Vulnerabilities** — Scanners, software bills of materials, and keeping images current.
5. **Dev Containers & Reproducible Dev Environments** — Using containers as the development machine for a team.
6. **Checkpoint** _(unscaffolded)_ — Write a pipeline that builds, scans, and publishes an image, failing the build on serious vulnerabilities.

### 2.4 — Compose in Depth & Single-Host Production

1. **Compose Profiles, Overrides & Multiple Files** — One project description that serves development, testing, and production.
2. **Hot Reload, Watch Mode & Debuggers** — Fast edit loops and attaching a debugger to a container.
3. **Testing With Containers** — Integration tests against real databases using disposable containers.
4. **Single-Host Production: Reverse Proxy & TLS** — Running Compose behind Traefik or Caddy with automatic certificates.
5. **Checkpoint** _(unscaffolded)_ — Deploy a Compose stack to a single server with HTTPS, automatic restarts, and a documented update and rollback procedure.

## Level 3 — Senior

_Go from "I can containerize anything" to "I understand what a container is in the kernel and can set a platform's standards."_

### 3.1 — Under the Hood

1. **Namespaces & cgroups** — The two kernel features that create isolation and limits.
2. **Union Filesystems & Image Layers** — How layers are stored, shared, and described by the OCI image format.
3. **The Runtime Stack: containerd, runc & OCI** — What actually runs when you type docker run.
4. **Container Networking Internals** — Virtual interfaces, bridges, and the firewall rules that make ports work.
5. **Storage Drivers, Volumes & I/O Performance** — How data reaches disk and why container filesystems can be slow.
6. **Checkpoint** _(unscaffolded)_ — Build a minimal container by hand using only unshare, chroot, and cgroup files, and explain each isolation it provides.

### 3.2 — Hardening & Supply Chain

1. **The Container Security Model & Isolation Limits** — A shared kernel, seccomp, and what a container escape looks like.
2. **Image Provenance, Signing & SBOMs** — Proving where an image came from and what is inside it.
3. **Secrets, Configuration & Runtime Policy** — Delivering secrets safely and enforcing what containers may do.
4. **Threat Modeling a Container Platform** — Where attackers go and which controls actually matter.
5. **Rootless Mode, User Namespaces & Sandboxed Runtimes** — gVisor, Kata, and when a container is not enough isolation.
6. **Checkpoint** _(unscaffolded)_ — Threat-model a small container platform and rank the five controls you would add first, with reasons.

### 3.3 — Platform Practice & Judgment

1. **Image Standards & Golden Base Images** — Maintaining approved bases, update cadence, and policies teams will follow.
2. **Observability & Performance of Containers** — Metrics, CPU throttling, out-of-memory kills, and noisy neighbors.
3. **Single Host, Compose, or an Orchestrator?** — How far one machine goes before you need more.
4. **Migration & When Containers Aren't the Answer** — Moving legacy workloads and recognizing poor fits.
5. **Checkpoint** _(unscaffolded)_ — Write a container platform standard for a 20-engineer company: base images, builds, security, runtime limits, and exceptions.

### 3.4 — Tooling, Automation & Alternatives

1. **Podman, containerd & nerdctl in Practice** — Running the same workloads without the Docker daemon.
2. **BuildKit Frontends & buildx bake** — Declarative, repeatable builds for many images and platforms.
3. **The Engine API & Automation** — Driving Docker from code with SDKs and the HTTP API.
4. **WebAssembly, microVMs & Other Alternatives** — Where containers sit among newer isolation and packaging models.
5. **Checkpoint** _(unscaffolded)_ — Build a small tool that uses the Engine API to find and report containers that break your platform standard.
