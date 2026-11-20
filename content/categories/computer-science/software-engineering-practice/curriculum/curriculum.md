# Software Engineering Practice — Curriculum

Three levels, twelve stages — testing, version control, and design, from your first unit test to leading how a codebase evolves.

## Level 1 — Junior

_Go from "my code runs" to "I write a test before I trust a change, keep names and functions readable, make commits other people can review, and structure a small program with clear responsibilities."_

### 1.1 — Writing Your First Tests

1. **Why We Test: Confidence, Regression & Fast Feedback** — What tests are really for, the cost of a bug found late, and why untested code gets harder to change.
2. **Anatomy of a Unit Test: Arrange, Act, Assert** — Structure a test so it fails for one reason, reads like a spec, and needs no hidden setup.
3. **Choosing Cases: Boundaries & Equivalence Classes** — Picking the few inputs that catch most bugs: empty, one, many, off-by-one, and the edge of every range.
4. **Test-Driven Development: Red, Green, Refactor** — Write the failing test first, make it pass the simplest way, then clean up, and when the discipline is worth it.
5. **Checkpoint** _(unscaffolded)_ — Write a test suite for a function that parses and validates dates, with at least ten cases covering boundaries and bad input, then fix a planted bug using TDD.

### 1.2 — Writing Readable Code

1. **Naming Things: Variables, Functions & Types** — Names that reveal intent, the cost of abbreviations and vague words, and renaming as the cheapest refactoring.
2. **Small Functions with One Job** — Why long functions hide bugs, how to split by level of abstraction, and when a function is small enough.
3. **Comments: What to Say and What the Code Should** — Comments that explain why rather than what, and the ones that quietly rot into lies.
4. **Duplication, DRY & the Rule of Three** — Telling real duplication from coincidental similarity, and why the wrong abstraction costs more than a copy.
5. **Code Smells: Recognizing Trouble Early** — Long parameter lists, feature envy, magic numbers, and the other signals that a design is straining.
6. **Checkpoint** _(unscaffolded)_ — Take a 120-line messy function, add tests that pin down its behavior, list its smells, then rewrite it into named, single-purpose pieces.

### 1.3 — Commit Hygiene & Shipping Changes

1. **Atomic Commits & Messages Worth Reading** — One logical change per commit, the shape of a good message, and why history is documentation.
2. **.gitignore, Tags & Semantic Versioning** — What never belongs in a repo, marking releases with tags, and what MAJOR.MINOR.PATCH actually promises.
3. **Writing a Pull Request Reviewers Can Finish** — Small diffs, a description that gives context, and reviewing your own change before asking anyone else.
4. **Receiving Review: Feedback Without Friction** — Reading comments as information about the code, replying clearly, and knowing when to push back.
5. **Checkpoint** _(unscaffolded)_ — Split a 400-line change into a series of atomic commits with clear messages, then write the pull request description a reviewer would want.

### 1.4 — Structuring Programs

1. **Abstraction & Encapsulation** — Hiding detail behind a small interface so callers depend on what a thing does, not how it does it.
2. **Composition over Inheritance** — Why deep class hierarchies turn brittle, and how has-a relationships keep code flexible.
3. **Coupling & Cohesion** — The two measures behind most design advice, and how to see them in a dependency diagram.
4. **The SOLID Principles as Rules of Thumb** — Five guidelines for classes and modules, with each one followed and each one violated.
5. **Pure Functions, Immutability & Side Effects** — Code that depends only on its inputs is easy to test and reason about; where to push the side effects instead.
6. **Checkpoint** _(unscaffolded)_ — Design a small order-processing module with a clear public interface, separate its pure logic from I/O, and justify every dependency you allowed.

## Level 2 — Intermediate

_Go from "I write tests and tidy code" to "I can design a test suite that earns trust, refactor with confidence, use design patterns where they help, and shape Git history and reviews so a team moves faster."_

### 2.1 — Testing Strategy

1. **The Test Pyramid & Where Tests Belong** — Unit, integration, and end-to-end tests, their cost and speed tradeoffs, and the alternative shapes teams use.
2. **Test Doubles: Stubs, Mocks, Fakes & Spies** — What each one replaces, how over-mocking couples tests to implementation, and when a fake beats a mock.
3. **Designing for Testability: Dependency Injection & Seams** — Passing collaborators in rather than reaching for them, so clocks, files, and networks can be swapped in tests.
4. **Integration & Contract Tests** — Testing against real databases and service boundaries, and keeping consumers and providers honest without full end-to-end runs.
5. **Flaky Tests: Causes & Cures** — Shared state, timing, ordering, and randomness: finding the source, and deciding when to quarantine.
6. **Coverage, Mutation Testing & What Metrics Can't Tell You** — What line coverage measures, what mutation testing adds, and why a high number can still miss the bug.
7. **Checkpoint** _(unscaffolded)_ — Design the test suite for a service with a database and an external API: choose what to test at each level, write a fake for the API, and cut a ten-minute suite to under two.

### 2.2 — Refactoring

1. **Refactoring Safely: Small Steps Under Test** — Behavior-preserving changes in tiny increments, and how to know the last step didn't break anything.
2. **The Core Moves: Extract, Inline, Rename & Move** — The handful of mechanical refactorings behind most real cleanup, and when your IDE can do them for you.
3. **Replacing Conditionals & Primitives** — Turning repeated switch statements into polymorphism, and bare strings and ints into small value types.
4. **Characterization Tests & Legacy Code** — Pinning down what untested code actually does, finding seams, and making the first safe change.
5. **Technical Debt: Recognizing and Tracking It** — Deliberate versus accidental debt, the interest it charges, and keeping a record the team will actually use.
6. **Checkpoint** _(unscaffolded)_ — Take a legacy module with no tests, write characterization tests, then refactor it in at least five small committed steps, every one of them green.

### 2.3 — Design Patterns

1. **Why Patterns Exist: A Shared Vocabulary** — Where patterns came from, what problem each family solves, and why they are names for solutions, not templates.
2. **Creational Patterns: Factory, Builder & Singleton** — Controlling how objects get made, and why Singleton so often becomes hidden global state.
3. **Structural Patterns: Adapter, Decorator & Facade** — Wrapping existing code to change its interface, add behavior, or hide a messy subsystem.
4. **Behavioral Patterns: Strategy, Observer & Command** — Swapping algorithms at runtime, notifying dependents of change, and turning actions into objects.
5. **State & Template Method: Behavior That Varies by Context** — Objects that change behavior as their state changes, and an algorithm skeleton whose steps subclasses fill in.
6. **Over-Engineering: When Not to Use a Pattern** — Spotting speculative generality and pattern fever, and the simpler language feature that already does the job.
7. **Checkpoint** _(unscaffolded)_ — Refactor a notification system with five hard-coded channels using the patterns that fit, and write a short note on one pattern you chose not to use and why.

### 2.4 — Git Under the Hood & Review Craft

1. **How Git Works: Objects, Trees & the Commit Graph** — Blobs, trees, commits, and refs: why branches are cheap and what a hash actually identifies.
2. **Shaping History: Interactive Rebase, Fixup & Cherry-Pick** — Reordering, squashing, and moving commits so a branch reviews well, and the rules for shared history.
3. **Hunting Regressions: bisect, blame & the Pickaxe** — Binary-searching history for the commit that broke something, and tracing a line back to its reasons.
4. **Reviewing Code: What to Look For and How to Say It** — Design, correctness, tests, then readability, in that order, with comments that teach rather than judge.
5. **Automating the Nitpicks: Hooks, Linters & Formatters** — Pre-commit hooks, formatters, and static checks that take style out of review so people can discuss design.
6. **Checkpoint** _(unscaffolded)_ — Use bisect to find a planted regression, rewrite the offending branch into a clean series, and review a teammate's pull request in writing.

## Level 3 — Senior

_Go from "I apply the practices" to "I can set the testing, architecture, and version-control approach for a team, steer large changes safely, and explain tradeoffs to the people who have to approve them."_

### 3.1 — Advanced Testing

1. **Property-Based Testing & Fuzzing** — Stating rules that must always hold, letting a tool hunt for counterexamples, and shrinking failures to a minimal case.
2. **Testing Concurrent & Time-Dependent Code** — Deterministic clocks, controlled schedulers, and strategies for races that appear once in a thousand runs.
3. **Hermetic Tests & Managing Test Data** — Fixtures, factories, and containers that make every run independent, repeatable, and quick to set up.
4. **Testing in Production: Canaries, Flags & Observability** — What no pre-release suite can cover, and how gradual rollout and monitoring act as the last layer of testing.
5. **Suite Health: Budgets, Ownership & Test Culture** — Treating the suite as a product: speed budgets, deleting low-value tests, and getting a team to care.
6. **Checkpoint** _(unscaffolded)_ — Audit a slow, untrusted test suite and write a plan with measurable targets, what to delete, what to add, and who owns what.

### 3.2 — Architecture & Design at Scale

1. **Layered, Hexagonal & Clean Architecture** — Ports and adapters, the dependency rule, and keeping business logic free of frameworks and databases.
2. **Domain-Driven Design: Bounded Contexts & Ubiquitous Language** — Modeling the business in code, drawing boundaries where words change meaning, and aggregates as units of consistency.
3. **Stable Interfaces & Backward Compatibility** — Designing module and API boundaries that can evolve: versioning, deprecation, and Hyrum's law.
4. **Dependencies & the Cost of Coupling** — Third-party libraries, internal packages, and dependency direction as long-term liabilities.
5. **Evolutionary Architecture: Fitness Functions & Decision Records** — Automated checks that guard architectural intent, and ADRs that record why a choice was made.
6. **Checkpoint** _(unscaffolded)_ — Review a tangled codebase's dependency graph, propose a target architecture, and write two decision records for the choices hardest to reverse.

### 3.3 — Version Control at Scale

1. **Trunk-Based Development & Feature Flags** — Merging small and often behind flags, and why long-lived branches cost more than they appear.
2. **Monorepo vs. Polyrepo** — Atomic changes and shared tooling against build scale and ownership, and what large-repo tooling is for.
3. **Release Management: Branching, Backports & Hotfixes** — Release branches, cherry-picked fixes, supporting several versions at once, and when to cut a release.
4. **Conventional Commits, Changelogs & Automated Releases** — Structured messages that drive version bumps, changelogs, and publishing, tied back to semantic versioning.
5. **Repository Surgery: Packfiles, filter-repo & Recovery** — Removing secrets and large files from history, repairing corruption, and what rewriting shared history costs.
6. **Checkpoint** _(unscaffolded)_ — Choose a branching and release strategy for a team of thirty shipping a library and a service, and write the workflow document, including hotfix and rollback paths.

### 3.4 — Engineering Judgment & Communication

1. **Large-Scale Refactors: Strangler Fig & Branch by Abstraction** — Replacing a system while it runs: incremental migration, parallel runs, and keeping every commit shippable.
2. **Refactor or Rewrite: Deciding Under Uncertainty** — Why rewrites usually take longer than planned, the cases where they are right, and how to measure before you decide.
3. **Leading Code Review: Standards, Mentoring & Culture** — Setting expectations, keeping review latency low, and using review to grow engineers rather than gatekeep.
4. **Writing Design Docs & RFCs** — Context, options, tradeoffs, and a recommendation, and getting useful feedback before anything is built.
5. **Explaining Technical Tradeoffs to Non-Engineers** — Turning debt, risk, and delay into costs and options a product or executive audience can decide on.
6. **Checkpoint** _(unscaffolded)_ — Write a design doc proposing a legacy module's migration to a new architecture: options considered, migration plan, risks, and a one-page summary for leadership.
