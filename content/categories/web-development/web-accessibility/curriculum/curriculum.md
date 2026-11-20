# Web Accessibility — Curriculum

Three levels, twelve stages — semantics, keyboard support, assistive technology, and WCAG, built toward products that are accessible by design rather than by audit.

## Level 1 — Junior

_Go from "I've heard of accessibility" to "I can recognize common barriers, build accessible basics, and test with a keyboard and a screen reader."_

### 1.1 — Why Accessibility

1. **Who Uses the Web** — Disability, situational limits, and the diversity of users.
2. **Assistive Technologies** — Screen readers, magnifiers, switch devices, and voice control.
3. **WCAG & the POUR Principles** — Perceivable, Operable, Understandable, Robust.
4. **Law, Standards & Business Cases** — ADA, the European Accessibility Act, and why it matters.
5. **Your First Accessibility Audit** — Using a checker, and learning its limits.
6. **Checkpoint** _(unscaffolded)_ — Audit a real page with an automated tool, then manually find three issues the tool missed.

### 1.2 — Semantic HTML & Content

1. **Headings, Landmarks & Structure** — Navigating by structure.
2. **Text Alternatives** — Writing useful alt text, and handling decorative images.
3. **Links, Buttons & Names** — Clear accessible names for controls.
4. **Lists, Tables & Reading Order** — Structures that read correctly aloud.
5. **Plain Language & Readability** — Writing content people can understand.
6. **Checkpoint** _(unscaffolded)_ — Fix an inaccessible article page using only semantic HTML, and verify the result with a screen reader.

### 1.3 — Keyboard & Focus

1. **Keyboard Operation** — Tab order, Enter, Space, and Escape.
2. **Focus Visibility** — Never hiding focus, and designing strong focus styles.
3. **Skip Links & Bypass Blocks** — Letting users jump past repeated content.
4. **Focus Order & Focus Traps** — Keeping order logical, and avoiding traps.
5. **Pointer & Touch Targets** — Sizes, spacing, and alternatives to gestures.
6. **Checkpoint** _(unscaffolded)_ — Make a page fully operable with the keyboard alone, with a visible and logical focus order throughout.

### 1.4 — Color, Contrast & Visual Design

1. **Color Contrast** — Ratios, tools, and meeting AA.
2. **Not Relying on Color Alone** — Redundant cues and patterns.
3. **Text Size, Spacing & Zoom** — Supporting 200% zoom and user text spacing.
4. **Motion & Flashing** — Respecting reduced motion and avoiding seizure triggers.
5. **Dark Mode & High Contrast** — Supporting user preferences and forced colors.
6. **Checkpoint** _(unscaffolded)_ — Review a UI design for color, contrast, and motion problems, and fix them with measured results.

## Level 2 — Intermediate

_Go from "I can build accessible basics" to "I build accessible interactive components, test with assistive technology, and bake accessibility into a team's workflow."_

### 2.1 — Forms & Interactive Controls

1. **Labels, Instructions & Errors** — Accessible forms that explain themselves.
2. **Validation & Error Recovery** — Announcing errors and guiding fixes.
3. **Custom Controls & Native First** — When to use native elements, and when to build your own.
4. **Autocomplete & Input Purpose** — Helping users and password managers.
5. **Time Limits & Re-authentication** — Not punishing users for being slow.
6. **Checkpoint** _(unscaffolded)_ — Build an accessible multi-step form with clear errors that works with a screen reader and voice control.

### 2.2 — ARIA & Dynamic Content

1. **ARIA Roles, States & Properties** — What ARIA does, and the rules for using it.
2. **The First Rule of ARIA** — Don't use ARIA when native HTML works.
3. **Live Regions & Announcements** — Telling users about updates.
4. **Managing Focus in SPAs** — Route changes, modals, and dynamic content.
5. **Widgets from the ARIA Authoring Practices** — Tabs, menus, comboboxes, and dialogs.
6. **Checkpoint** _(unscaffolded)_ — Build a tabs widget and a modal dialog to the ARIA Authoring Practices and test both with two screen readers.

### 2.3 — Testing with Assistive Technology

1. **Screen Reader Basics** — NVDA, VoiceOver, and TalkBack.
2. **Testing with Keyboard & Voice Control** — Repeatable manual checks.
3. **Automated Testing** — axe, Lighthouse, and CI integration.
4. **Browser & Screen Reader Differences** — Where behavior diverges, and how to cope.
5. **Testing with People with Disabilities** — Learning from real users.
6. **Checkpoint** _(unscaffolded)_ — Write and run a repeatable accessibility test plan for a feature, covering automated, manual, and assistive-technology checks.

### 2.4 — Accessible Components & Media

1. **Accessible Modals, Menus & Tooltips** — The hardest common patterns.
2. **Data Tables & Charts** — Making data understandable without sight.
3. **Video, Audio & Captions** — Captions, transcripts, and audio description.
4. **Documents & PDFs** — Accessible downloads.
5. **Accessibility in Design Systems** — Baking it into shared components.
6. **Checkpoint** _(unscaffolded)_ — Make a data dashboard with charts and tables accessible, including text equivalents and keyboard navigation.

## Level 3 — Senior

_Go from "I build accessible components" to "I lead accessibility across products and teams, interpret standards in depth, and can defend decisions to stakeholders."_

### 3.1 — Standards & Compliance

1. **WCAG 2.2 in Depth** — Success criteria, techniques, and failures.
2. **Conformance Reports & VPATs** — Documenting accessibility honestly.
3. **Legal Landscape & Risk** — Regulations across regions.
4. **Accessibility Statements & Feedback Channels** — Communicating openly with users.
5. **Beyond WCAG: Cognitive & Emerging Needs** — Where the guidelines end and users' needs continue.
6. **Checkpoint** _(unscaffolded)_ — Produce a conformance report for a real product, with evidence, gaps, and a remediation timeline.

### 3.2 — Accessibility at Scale

1. **Building an Accessibility Program** — Roles, training, and ownership.
2. **Shifting Left** — Design reviews, linting, and a definition of done.
3. **Design System Governance** — Keeping components accessible as they evolve.
4. **Procurement & Third-Party Components** — Evaluating vendors.
5. **Metrics & Continuous Monitoring** — Tracking progress without gaming it.
6. **Checkpoint** _(unscaffolded)_ — Create an accessibility program plan for an organization, with measurable goals and a rollout schedule.

### 3.3 — Advanced Technical Topics

1. **The Accessibility Tree & Browser APIs** — How platforms expose semantics.
2. **Complex Widgets & Custom Components** — Grids, trees, and rich editors.
3. **Accessibility in Canvas, WebGL & Games** — Making non-DOM content usable.
4. **Mobile & Native Accessibility** — Platform guidance beyond the web.
5. **Internationalization & Accessibility** — Right-to-left, language, and reading level.
6. **Checkpoint** _(unscaffolded)_ — Make a complex custom widget (a data grid or rich text editor) accessible and document its keyboard model.

### 3.4 — Judgment & Communication

1. **Prioritizing Barriers by User Impact** — Not every violation is equal.
2. **Influencing Teams & Leadership** — Persuading without lecturing.
3. **Remediating Legacy Products** — Fixing at scale, incrementally.
4. **Inclusive Design Thinking** — Designing with people rather than for them.
5. **Checkpoint** _(unscaffolded)_ — Present an accessibility remediation strategy for a legacy product to a skeptical leadership team, with priorities, costs, and outcomes.
