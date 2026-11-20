# Terraform & Infrastructure as Code — Curriculum

Three levels, twelve stages — the core workflow, variables, state, and a first real stack first, then modules, remote state, delivery pipelines, and working with providers, built toward planning internals, platform design, security at scale, and the judgment to know when infrastructure as code helps.

## Level 1 — Junior

_Go from "I click around a console" to "I can describe and create infrastructure from code."_

### 1.1 — Infrastructure as Code Basics

1. **Why Infrastructure as Code** — Drift, repeatability, and the difference between declarative and imperative.
2. **Installing Terraform & the Core Workflow** — init, plan, apply, and destroy.
3. **HCL Syntax: Blocks, Arguments & Expressions** — Reading and writing the configuration language.
4. **Providers & Your First Resource** — Configuring a provider and creating something real.
5. **Reading Provider Documentation & the Registry** — Finding arguments, attributes, and examples without guessing.
6. **Checkpoint** _(unscaffolded)_ — Write a configuration that creates a storage bucket and a file in it, apply it, change it, and destroy it, reading every plan first.

### 1.2 — Variables, Outputs & Data

1. **Input Variables & Types** — Parameterizing a configuration with typed, validated inputs.
2. **Outputs & Locals** — Exposing results and naming repeated expressions.
3. **Data Sources** — Reading existing infrastructure instead of creating it.
4. **Resource Dependencies & the Graph** — Implicit and explicit dependencies, and the order Terraform chooses.
5. **Built-In Functions & Type Conversions** — Strings, collections, and the functions that remove repetition.
6. **Checkpoint** _(unscaffolded)_ — Refactor a hard-coded configuration into one with variables, outputs, and a data source, and deploy it to two configurations without copying files.

### 1.3 — State & Safe Changes

1. **What State Is & Why It Matters** — The file that maps your code to real resources.
2. **Reading Plans Carefully** — Create, update, and replace, and spotting the change that destroys data.
3. **count, for_each & Lifecycle Rules** — Creating many resources and controlling replacement and deletion.
4. **Formatting, Validation & Version Constraints** — fmt, validate, provider versions, and the lock file.
5. **Debugging: Logs, Common Errors & Fixes** — Turning on TF_LOG and reading the errors you will meet most.
6. **Checkpoint** _(unscaffolded)_ — Change a resource in a way that forces replacement, predict it from the plan before applying, and then protect it with a lifecycle rule.

### 1.4 — A First Real Cloud Stack

1. **Networking Resources** — A network, subnets, routes, and gateways described in code.
2. **Compute & Security Rules** — A server, its access rules, and its identity.
3. **Storage & Database Resources** — Buckets, volumes, and a managed database with sensible defaults.
4. **Cleaning Up & Cost Awareness** — Destroying safely and avoiding forgotten, billable resources.
5. **Checkpoint** _(unscaffolded)_ — Build a small web stack with a network, a server, and a database from an empty directory, then destroy it and confirm nothing is left running.

## Level 2 — Intermediate

_Go from "it creates things" to "I can structure, share, and safely evolve infrastructure for a team."_

### 2.1 — Modules & Reuse

1. **Writing Modules** — Packaging resources into a reusable unit.
2. **Module Inputs, Outputs & Composition** — Designing interfaces and combining modules.
3. **Using the Registry & Versioning Modules** — Trusting, pinning, and upgrading shared modules.
4. **Expressions in Depth: Conditionals, for & Dynamic Blocks** — Making configuration flexible without making it unreadable.
5. **Module Design Patterns & Anti-Patterns** — What makes a module easy to use and hard to misuse.
6. **Checkpoint** _(unscaffolded)_ — Extract a network and a server from a flat configuration into two modules, and reuse them for a second environment.

### 2.2 — Remote State & Environments

1. **Remote Backends & State Locking** — Sharing state safely and preventing concurrent applies.
2. **Environments: Workspaces vs. Directories** — Separating dev, staging, and production.
3. **Importing & Refactoring Existing Infrastructure** — Bringing resources under management and renaming without recreating.
4. **Managing Secrets & Sensitive Values** — Keeping secrets out of code, plans, and state where possible.
5. **HCP Terraform & Other Backends** — Hosted state and runs, and how they compare with self-managed options.
6. **Checkpoint** _(unscaffolded)_ — Move local state to a locked remote backend, import a hand-made resource, and rename a resource without destroying it.

### 2.3 — Delivery Workflows

1. **Terraform in CI/CD** — Plans on pull requests and applies on merge.
2. **Testing: Validate, Lint & terraform test** — Catching mistakes before they reach an account.
3. **Policy as Code & Guardrails** — Enforcing rules automatically on every plan.
4. **Provider Authentication & Least Privilege** — Short-lived credentials and narrow permissions.
5. **Atlantis, Spacelift & Pull-Request Automation** — Tools that run Terraform from review comments.
6. **Checkpoint** _(unscaffolded)_ — Build a pipeline that posts the plan on a pull request, blocks a policy violation, and applies only after approval.

### 2.4 — Working With Real Providers

1. **Multiple Providers, Aliases & Regions** — Managing several accounts and regions in one configuration.
2. **Provisioners, terraform_data & Why to Avoid Them** — Running scripts as a last resort.
3. **Kubernetes & Helm Providers** — Managing cluster resources from Terraform, and where it gets awkward.
4. **Managing SaaS With Terraform** — GitHub, Cloudflare, and monitoring tools as code.
5. **Checkpoint** _(unscaffolded)_ — Manage a repository, a DNS record, and a cloud resource from one configuration using three different providers.

## Level 3 — Senior

_Go from "I can write Terraform" to "I can design an infrastructure platform and run it at team scale."_

### 3.1 — State & Internals

1. **How Terraform Plans: Graph, Refresh & Diff** — Building the graph and computing what must change.
2. **State Surgery & Recovery** — Moving, removing, and repairing state safely.
3. **Providers, the Plugin Protocol & Custom Resources** — How providers talk to Terraform and when to write one.
4. **Drift Detection & Reconciliation** — Finding and resolving changes made outside Terraform.
5. **Performance: Parallelism, Refresh & Large States** — Making slow plans fast.
6. **Checkpoint** _(unscaffolded)_ — Corrupt a copy of a state file in three different ways and recover from each without recreating real resources.

### 3.2 — Platform Design

1. **Repository & Stack Layout** — Deciding what goes in which state and which repository.
2. **Blast Radius, Layering & Dependencies Between Stacks** — Limiting the damage of one bad apply.
3. **Module Libraries & Governance** — Versioning, ownership, and deprecating shared modules.
4. **Multi-Account & Multi-Region Patterns** — Structuring configuration across accounts and regions.
5. **Terragrunt & Orchestration Tools** — Keeping many stacks consistent without copying code.
6. **Checkpoint** _(unscaffolded)_ — Design the repository and state layout for a company with three environments and four teams, and justify each boundary.

### 3.3 — Operations & Judgment

1. **Zero-Downtime Changes & Migrations** — Replacing resources and moving infrastructure without outages.
2. **Cost, Tagging & Compliance Automation** — Making cost and ownership visible by default.
3. **Terraform, OpenTofu, Pulumi & CloudFormation** — The licensing change, the alternatives, and how to choose.
4. **When IaC Hurts: Pragmatism & Exit Plans** — What not to manage in code, and how to leave a tool.
5. **Disaster Recovery for Infrastructure Code & State** — Rebuilding an environment when state or a whole account is lost.
6. **Checkpoint** _(unscaffolded)_ — Write an infrastructure-as-code standard for a company, including what is deliberately not managed by code and why.

### 3.4 — Security & Compliance at Scale

1. **Secrets & Sensitive Data Deep Dive** — Where secrets leak in Terraform and how to stop each leak.
2. **Policy Engines: Sentinel, OPA & Checkov Compared** — Choosing and operating a policy layer.
3. **Supply Chain: Provider & Module Trust** — Lock files, mirrors, signatures, and reviewing third-party code.
4. **Auditing Changes & Change Management** — Proving who changed what, when, and why.
5. **Checkpoint** _(unscaffolded)_ — Run a security review of a Terraform repository and produce a ranked list of its five most serious weaknesses with fixes.
