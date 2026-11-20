# Git & Collaboration Workflows — Curriculum

Three levels, twelve stages — commits, branches, remotes, and daily tooling first, then rewriting history, team collaboration, and debugging with history, built toward the internals, release strategy, and governance to design how a whole organization uses Git.

## Level 1 — Junior

_Go from "I copy folders called final_v2" to "I can track, branch, and share changes confidently."_

### 1.1 — Your First Repository

1. **Why Version Control & How Git Thinks** — Snapshots, commits, and the working tree, staging area, and repository.
2. **Installing, Configuring & Your First Commit** — init, add, commit, and setting your identity.
3. **Viewing History & Changes** — status, log, diff, and show for seeing what changed and why.
4. **Ignoring Files & Undoing Simple Mistakes** — .gitignore, unstaging, restoring files, and amending the last commit.
5. **Writing Commit Messages That Help** — Subject lines, bodies, and why small commits make history readable.
6. **Checkpoint** _(unscaffolded)_ — Start a repository for a small project, make a dozen meaningful commits with clear messages, ignore build output, and fix three deliberate mistakes without losing work.

### 1.2 — Branching & Merging

1. **Branches Are Just Pointers** — Creating, switching, and what HEAD actually is.
2. **Merging: Fast-Forward & Three-Way** — How merges combine history and when a merge commit appears.
3. **Resolving Merge Conflicts** — Reading conflict markers, choosing a resolution, and aborting safely.
4. **Branch Naming, Cleanup & Tags** — Conventions, deleting merged branches, and marking releases.
5. **Detached HEAD & Moving Around History** — Checking out commits and tags, relative references, and getting back safely.
6. **Checkpoint** _(unscaffolded)_ — Create two branches that edit the same lines, merge them, resolve the conflict, tag the result as v1.0, and recover from a detached HEAD.

### 1.3 — Working With Remotes

1. **Clone, Remotes & Origin** — What a remote is and how a local repository knows about one.
2. **Push, Fetch & Pull** — Upstream tracking, and why fetch and pull are different.
3. **Pull Requests & Code Review** — The basic hosted workflow and how to give and take review.
4. **Authentication & Keeping Secrets Out** — SSH keys, tokens, and what to do if you commit a secret.
5. **Repository Hygiene: README, License & Project Files** — The files that make a repository usable by other people.
6. **Checkpoint** _(unscaffolded)_ — Collaborate with a partner through a hosted repository: branch, push, open a pull request, review each other, and merge.

### 1.4 — Everyday Workflow & Tooling

1. **Terminal, Editor & Graphical Tools** — Using Git from the command line, an editor, and a visual client without getting lost.
2. **Configuration, Aliases & Dotfiles** — System, global, and local config, and shortcuts that save keystrokes.
3. **Line Endings, Whitespace & .gitattributes** — Why files show as changed across operating systems and how to stop it.
4. **Troubleshooting Common Beginner Errors** — Reading Git's messages and fixing the ten errors everyone hits.
5. **Checkpoint** _(unscaffolded)_ — Set up a clean machine for Git from scratch, then diagnose and fix five broken repositories using only status, log, and the documentation.

## Level 2 — Intermediate

_Go from "I follow the steps" to "I can rewrite, repair, and untangle history safely."_

### 2.1 — Rewriting History Safely

1. **Rebase vs. Merge** — Replaying commits, linear history, and the rule about shared branches.
2. **Interactive Rebase & Squashing** — Reordering, rewording, and combining commits before review.
3. **Cherry-Pick, Revert & Reset** — Three ways to move or undo changes, and what each one leaves behind.
4. **Reflog: The Safety Net** — Recovering commits you thought were gone.
5. **Amending, Splitting & Reordering Commits** — Turning one big commit into several and fixing old commits precisely.
6. **Checkpoint** _(unscaffolded)_ — Turn a messy twelve-commit branch into three clean commits, then deliberately destroy it with a hard reset and recover it from the reflog.

### 2.2 — Collaboration at Team Scale

1. **Fork & Pull Request Workflows** — Contributing to a repository you do not own and keeping a fork in sync.
2. **Writing Good Commits & Pull Requests** — Atomic commits, useful messages, and reviewable change sizes.
3. **Stash, Worktrees & Context Switching** — Handling interruptions without losing or mixing work.
4. **Hooks, Linting & Branch Protection** — Automating checks locally and enforcing rules on the server.
5. **Code Review at Scale** — Code owners, stacked pull requests, and keeping reviews fast and useful.
6. **Checkpoint** _(unscaffolded)_ — Set up a repository with a pre-commit hook, a protected main branch, and required reviews, and demonstrate that a bad commit is blocked.

### 2.3 — Debugging & Inspecting History

1. **Blame & Log Archaeology** — Finding who changed a line and when a string appeared or vanished.
2. **Bisect: Finding the Commit That Broke It** — Binary search through history, including automated bisecting.
3. **Submodules, Subtrees & Large Files** — Including other repositories and handling big binaries.
4. **Signing Commits & Verifying Authors** — Proving who made a commit.
5. **Diffs, Patches & Email Workflows** — diff, apply, format-patch, and am for sharing changes without a hosting site.
6. **Checkpoint** _(unscaffolded)_ — Given a repository with a hidden regression, find the breaking commit with bisect and explain the cause from its history.

### 2.4 — Advanced Everyday Tools

1. **Merge Strategies & Options** — The ort strategy, ours and theirs, and strategy options for stubborn merges.
2. **Recovering From a Bad Merge or Rebase** — Undoing merges that went wrong, including after they were pushed.
3. **Shallow, Partial & Sparse Clones** — Working with huge repositories without downloading all of them.
4. **Scripting With Git: Formats & Plumbing Output** — Porcelain output, format strings, and building small tools on top of Git.
5. **Checkpoint** _(unscaffolded)_ — Write a script that reports the stale branches, the largest files, and the top contributors of any repository using only Git commands.

## Level 3 — Senior

_Go from "I can fix any repository" to "I can design a team's branching, release, and repository strategy."_

### 3.1 — Git Internals

1. **Objects: Blobs, Trees, Commits & Tags** — The content-addressable store behind every commit.
2. **Refs, the Index & Packfiles** — Branches as files, the staging area as a data structure, and how storage is compacted.
3. **How Merge, Diff & Rebase Actually Work** — Merge bases, diff algorithms, and recorded conflict resolutions.
4. **Repository Health & Recovery** — fsck, garbage collection, and repairing or cleaning a damaged repository.
5. **Transport: How Push and Fetch Really Work** — Refspecs, the smart protocol, and what travels over the wire.
6. **Checkpoint** _(unscaffolded)_ — Build a commit by hand using only plumbing commands, then break and repair a repository's refs and objects.

### 3.2 — Branching & Release Strategy

1. **Trunk-Based Development vs. Git Flow** — What each model optimizes for and where each one hurts.
2. **Feature Flags & Release Branches** — Separating deployment from release, and handling hotfixes and backports.
3. **Monorepos vs. Polyrepos** — The trade-offs, and the Git features that make big repositories workable.
4. **Versioning, Changelogs & Release Automation** — Semantic versions, tags, and automated releases.
5. **Checkpoint** _(unscaffolded)_ — Choose a branching and release model for a team of 12 shipping weekly and defend it against the two alternatives.

### 3.3 — Scale, Security & Governance

1. **CI/CD Integration & Merge Queues** — Status checks, required builds, and keeping main green under load.
2. **Large Repositories & Performance** — Partial and shallow clones, commit graphs, and slow operations.
3. **Repository Security & Secret Response** — Scanning, rotating, history rewriting, and supply-chain risks.
4. **Designing a Team Git Policy** — Writing conventions people follow, and migrating a team to them.
5. **Access Control, Audits & Compliance** — Permissions, audit logs, and meeting regulatory requirements without slowing teams down.
6. **Checkpoint** _(unscaffolded)_ — Write a one-page Git policy for a real team, including branching, review, signing, secrets, and the exceptions you allow.

### 3.4 — Migration & Judgment

1. **Migrating From SVN, Perforce & Mercurial** — Converting history, mapping authors, and cutting over without losing trust.
2. **Rewriting History at Scale** — Splitting, merging, and cleaning repositories with filter-repo.
3. **Alternatives & the Wider Ecosystem** — Jujutsu, Mercurial, Fossil, and Sapling, and what they teach about Git's design.
4. **Teaching Git & Building a Team Culture** — Onboarding, shared habits, and reducing fear of the tool.
5. **Checkpoint** _(unscaffolded)_ — Plan the migration of a 10-year-old repository to a new structure, including the cutover, the rollback, and how you would train the team.
