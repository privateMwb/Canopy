# CSS & Responsive Layout — Curriculum

Three levels, twelve stages — the cascade, the box model, Flexbox, Grid, and modern CSS, built toward interfaces that are responsive, maintainable, and fast to render.

## Level 1 — Junior

_Go from "I can change a color" to "I can style a complete page, control spacing and layout with Flexbox, and make it work on a phone."_

### 1.1 — Selectors & the Cascade

1. **Adding CSS to a Page** — link, style, and inline styles, and how the browser applies them.
2. **Selectors & Specificity** — Type, class, ID, attribute, and pseudo selectors, and which rule wins.
3. **The Cascade & Inheritance** — Origin, importance, order, and which properties inherit.
4. **Colors, Units & Values** — Hex, rgb, hsl, px vs. rem vs. %, and calc().
5. **DevTools for CSS** — Inspecting, toggling, and debugging styles live.
6. **Checkpoint** _(unscaffolded)_ — Style a plain article page with a type scale and color palette using only classes, then explain the specificity of every rule.

### 1.2 — The Box Model & Typography

1. **The Box Model** — Content, padding, border, margin, and box-sizing: border-box.
2. **Margin Collapsing & Spacing** — Why margins combine, and spacing strategies that avoid surprises.
3. **Typography Basics** — Font families, sizes, line height, weight, and web fonts.
4. **Backgrounds, Borders & Shadows** — Gradients, images, radius, and layered effects.
5. **Display, Position & Overflow** — Block vs. inline, relative, absolute, and sticky, and handling overflow.
6. **Checkpoint** _(unscaffolded)_ — Recreate a card component closely from a design, using spacing tokens defined as custom properties.

### 1.3 — Flexbox

1. **Flex Container Basics** — display: flex, direction, wrapping, and the main vs. cross axis.
2. **Alignment & Distribution** — justify-content, align-items, gap, and centering without hacks.
3. **Flex Items: Grow, Shrink & Basis** — How items size themselves along the main axis.
4. **Common Flex Patterns** — Navbars, card rows, sticky footers, and media objects.
5. **Flexbox Pitfalls** — min-width: auto, overflow, and why items sometimes won't shrink.
6. **Checkpoint** _(unscaffolded)_ — Build a responsive navbar and a card row with Flexbox that survive long text and missing images.

### 1.4 — Responsive Basics

1. **The Viewport & Mobile-First** — The viewport meta tag and designing from small screens up.
2. **Media Queries** — Breakpoints, min-width vs. max-width, and content-driven breakpoints.
3. **Fluid Layouts & Relative Units** — Percentages, vw and vh, clamp(), and letting content flow.
4. **Responsive Media in CSS** — object-fit, aspect-ratio, and max-width: 100%.
5. **Testing on Real Devices** — Device emulation, real phones, and common mobile bugs.
6. **Checkpoint** _(unscaffolded)_ — Make a three-section landing page that looks right from 320px to 1440px with no horizontal scroll.

## Level 2 — Intermediate

_Go from "I can style a page" to "I build layouts with Grid and modern CSS, structure stylesheets that scale, and design components that adapt to their container."_

### 2.1 — CSS Grid

1. **Grid Fundamentals** — Rows, columns, tracks, fr units, and gap.
2. **Placing Items & Named Areas** — Line numbers, spans, and grid-template-areas.
3. **Auto-Placement & Responsive Grids** — auto-fit, auto-fill, minmax(), and grids with no media queries.
4. **Subgrid & Alignment** — Aligning nested content to a parent grid.
5. **Grid vs. Flexbox** — Choosing the right layout system for each job.
6. **Checkpoint** _(unscaffolded)_ — Build a magazine-style page layout with Grid that reflows from one to four columns without a single media query.

### 2.2 — Modern CSS Features

1. **Custom Properties** — Variables, scoping, fallbacks, and theming.
2. **Logical Properties & Writing Modes** — Inline and block axes, margin-inline, and layouts for any writing direction.
3. **Container Queries** — Components that respond to their container instead of the viewport.
4. **:has(), :is() & :where()** — Selecting parents, grouping, and controlling specificity.
5. **Cascade Layers & @scope** — Taming specificity with @layer and scoped rules.
6. **Checkpoint** _(unscaffolded)_ — Build a card component that adapts to its container, themes with custom properties, and has zero specificity conflicts.

### 2.3 — Animation & Interaction

1. **Transitions** — Animating state changes with the right timing.
2. **Keyframe Animations** — @keyframes, fill modes, and orchestrating sequences.
3. **Transforms & 3D** — translate, scale, rotate, and perspective.
4. **Performant Animation** — Compositor-only properties, will-change, and avoiding layout thrash.
5. **Scroll-Driven Animation & View Transitions** — Animating on scroll and between pages with the newer APIs.
6. **Checkpoint** _(unscaffolded)_ — Add motion to a page that respects prefers-reduced-motion and holds 60fps in a performance trace.

### 2.4 — Architecture & Tooling

1. **Naming & Organization** — BEM, utility-first, and choosing a convention.
2. **Utility-First CSS & Tailwind** — Strengths, costs, and when it fits.
3. **Preprocessors & PostCSS** — Sass, native nesting, and build steps.
4. **Design Tokens & Theming** — Dark mode, density, and tokens shared across code and design.
5. **Linting & Visual Regression Testing** — Stylelint and screenshot tests that catch regressions.
6. **Checkpoint** _(unscaffolded)_ — Refactor a messy stylesheet into a layered, tokenized system and prove with screenshots that nothing changed visually.

## Level 3 — Senior

_Go from "I write good CSS" to "I understand how browsers lay out and paint, design CSS architectures for large teams, and can defend CSS decisions on performance and maintainability."_

### 3.1 — How CSS Is Computed & Rendered

1. **From Style Sheet to Pixels** — Style calculation, layout, paint, and composite.
2. **The Layout Algorithms** — How block, inline, flex, and grid layout engines work.
3. **Stacking Contexts & Painting Order** — Why z-index fails and how to reason about layers.
4. **Containment & Rendering Performance** — contain, content-visibility, and the cost of selectors.
5. **Reading Performance Traces** — Finding layout and paint bottlenecks in DevTools.
6. **Checkpoint** _(unscaffolded)_ — Diagnose a janky page from a trace, fix the layout thrash, and report the before-and-after frame times.

### 3.2 — Advanced Layout & Visual Systems

1. **Advanced Grid Patterns** — Overlap, intrinsic sizing, and complex page layouts.
2. **Fluid Type & Space Systems** — clamp()-based scales and fluid design tokens.
3. **Responsive Component Strategy** — Container, viewport, and preference queries working together.
4. **Complex Visual Effects** — Masks, clip-path, filters, blend modes, and when they cost too much.
5. **Print & Alternate Media** — Print stylesheets and paged media.
6. **Checkpoint** _(unscaffolded)_ — Design a responsive dashboard with a fluid system that is fully themeable and prints cleanly.

### 3.3 — CSS at Scale

1. **Design System Architecture** — Tokens, primitives, components, and governance.
2. **Styling Strategies Compared** — CSS Modules, CSS-in-JS, utility CSS, and native CSS trade-offs.
3. **Critical CSS & Delivery** — Inlining, splitting, and loading CSS without blocking render.
4. **Cross-Browser Strategy** — Support policies, progressive enhancement, and polyfills.
5. **Migrating Large Stylesheets** — Incremental refactors with measurable safety nets.
6. **Checkpoint** _(unscaffolded)_ — Write an architecture proposal and migration plan for a 50,000-line stylesheet, with risks and rollback steps.

### 3.4 — Judgment & Communication

1. **Accessibility in CSS** — Focus styles, contrast, motion, forced colors, and zoom.
2. **Evaluating New CSS Features** — When to adopt, polyfill, or wait.
3. **Reviewing CSS in Code Review** — What to look for and what to leave alone.
4. **Making the Case for Quality** — Explaining CSS debt and design-system investment to stakeholders.
5. **Checkpoint** _(unscaffolded)_ — Review a real production stylesheet, rank its problems by user impact, and present a prioritized plan to a skeptical team.
