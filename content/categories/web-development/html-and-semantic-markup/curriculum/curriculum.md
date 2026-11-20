# HTML & Semantic Markup — Curriculum

Three levels, twelve stages — document structure, forms, media, and the interactive elements built into HTML, built toward markup that is semantic, accessible, and resilient.

## Level 1 — Junior

_Go from "I've seen a page's source" to "I can write a well-structured, valid page with text, links, images, tables, and forms that works in any browser."_

### 1.1 — Document Basics

1. **How the Web Delivers a Page** — The HTTP request, the HTML response, and what the browser does with it.
2. **Anatomy of an HTML Document** — doctype, html, head, body, plus the encoding and viewport meta tags.
3. **Text & Headings** — Headings, paragraphs, lists, emphasis, and quotes, and building a clear outline.
4. **Links & URLs** — Anchors, absolute vs. relative paths, fragments, and target and rel basics.
5. **Editor, DevTools & Validation** — Inspecting the DOM, viewing source, and running the W3C validator.
6. **Checkpoint** _(unscaffolded)_ — Hand-write a personal profile page with a heading outline, lists, and links that passes the validator with zero errors.

### 1.2 — Structure & Semantics

1. **Sectioning Elements** — header, nav, main, article, section, aside, and footer, and when each one fits.
2. **Choosing the Right Element** — Semantic vs. generic tags, and what each choice tells browsers and assistive tech.
3. **Images & Figures** — img, alt text, figure and figcaption, and sizing images to avoid layout shift.
4. **Tables for Tabular Data** — caption, thead and tbody, th scope, and when not to use a table.
5. **Audio, Video & Embeds** — audio, video, captions with track, and iframes with sensible defaults.
6. **Checkpoint** _(unscaffolded)_ — Mark up an article page with full semantic structure, a figure, and a data table, then explain why each tag was chosen over a div.

### 1.3 — Forms & Input

1. **Form Basics** — form, action, method, and what actually happens on submit.
2. **Input Types & Attributes** — text, email, number, date, and the attributes that shape each one.
3. **Labels & Accessible Controls** — label and for, fieldset and legend, and why a placeholder is not a label.
4. **Built-in Validation** — required, pattern, min and max, the Constraint Validation API, and custom messages.
5. **Selects, Textareas & Buttons** — select and option groups, textarea, button types, and datalist.
6. **Checkpoint** _(unscaffolded)_ — Build a sign-up form with at least six input types, native validation, and labels that work with a screen reader.

### 1.4 — Metadata & Publishing

1. **The head Element** — title, description, canonical, favicons, and what belongs in head.
2. **Social & Search Metadata** — Open Graph, social cards, and descriptions that search engines show.
3. **Language, Direction & Encoding** — lang, dir, UTF-8, and pages that work in more than one language.
4. **File Structure & Naming** — Folders, index.html, relative paths, and keeping a small site maintainable.
5. **Publishing a Static Site** — Hosting on GitHub Pages or Netlify, and checking that it works live.
6. **Checkpoint** _(unscaffolded)_ — Publish a three-page personal site with consistent metadata and share it by URL.

## Level 2 — Intermediate

_Go from "I can write a valid page" to "I write semantic, accessible, progressively enhanced markup and use the platform's built-in interactive elements before reaching for JavaScript."_

### 2.1 — Semantics in Depth

1. **The Accessibility Tree & Roles** — How browsers turn markup into what assistive technology sees.
2. **Landmarks & the Document Outline** — Landmark roles, skip links, and headings that work as navigation.
3. **Text-Level Semantics** — time, abbr, code, mark, data, and the small elements most pages skip.
4. **Microdata & Structured Data** — Schema.org and JSON-LD for search engines.
5. **Reading the Spec** — Using the HTML Living Standard and MDN to settle "can I use this tag?" questions.
6. **Checkpoint** _(unscaffolded)_ — Take a div-soup page and rewrite it semantically, then compare its accessibility tree before and after.

### 2.2 — Native Interactivity

1. **details, summary & Disclosure** — Native accordions without JavaScript.
2. **dialog & Popover** — Modal dialogs, the popover attribute, and the focus behavior you get for free.
3. **Buttons, Links & Menus** — When to use a button vs. a link, and building navigation menus semantically.
4. **Advanced Form Controls** — range, color, file, progress, meter, output, and input modes for mobile keyboards.
5. **Autofill & Autocomplete** — Helping browsers fill forms correctly and reducing effort for users.
6. **Checkpoint** _(unscaffolded)_ — Build an FAQ page and a settings form using only native elements and attributes, with no custom JavaScript.

### 2.3 — Media & Responsive Content

1. **Responsive Images** — srcset, sizes, and picture for art direction.
2. **Modern Image Formats** — WebP, AVIF, and SVG, and choosing a format by content.
3. **Lazy Loading & Priority Hints** — loading="lazy", fetchpriority, and decoding hints.
4. **Video, Captions & Transcripts** — Accessible media with tracks, controls, and poster images.
5. **Inline SVG & Icons** — SVG in markup, accessible names, and icon strategies.
6. **Checkpoint** _(unscaffolded)_ — Make a media-rich gallery page that serves the right image size per device and passes a Lighthouse image audit.

### 2.4 — Progressive Enhancement & Quality

1. **Progressive Enhancement** — Building a working baseline first, then layering behavior on top.
2. **Validating & Linting Markup** — HTML validators, linters, and automated checks in CI.
3. **Script Loading & Resource Hints** — defer, async, module, preload, and prefetch.
4. **Feature Support & Fallbacks** — Can I Use, @supports, and graceful degradation.
5. **Markup Security Basics** — rel=noopener, sandboxed iframes, and not trusting user-supplied HTML.
6. **Checkpoint** _(unscaffolded)_ — Ship a content page that works fully with JavaScript disabled, then add one enhancement layer without breaking the baseline.

## Level 3 — Senior

_Go from "I write good markup" to "I understand how browsers parse HTML, design markup systems for teams, and can defend choices on accessibility, performance, and long-term maintainability."_

### 3.1 — How Browsers Parse HTML

1. **The Parsing Algorithm** — Tokenization, tree construction, and why invalid HTML still renders.
2. **The DOM, CSSOM & Render Tree** — How the pieces combine into pixels.
3. **Error Recovery & Quirks Mode** — Why browsers forgive mistakes, and how the doctype changes behavior.
4. **Streaming HTML & Early Flushing** — Chunked responses and how parsing overlaps with downloading.
5. **Parser-Blocking Resources** — How scripts and styles delay rendering, and the spec behind it.
6. **Checkpoint** _(unscaffolded)_ — Trace a slow page through the browser's pipeline in DevTools and explain exactly which markup decisions delayed first paint.

### 3.2 — Web Components & Custom Elements

1. **Custom Elements** — Defining your own tags with lifecycle callbacks.
2. **Shadow DOM & Encapsulation** — Scoped markup and styles, slots, and parts.
3. **Templates & Slots** — template, slot, and composing reusable markup.
4. **Forms & Accessibility in Components** — Form-associated custom elements and keeping ARIA correct inside shadow trees.
5. **When Not to Use Web Components** — Honest trade-offs against framework components.
6. **Checkpoint** _(unscaffolded)_ — Build a small accessible component (tabs or a combobox) as a custom element and test it with a keyboard and a screen reader.

### 3.3 — Markup at Scale

1. **Design Systems & Markup Contracts** — Documenting patterns so every team writes the same HTML.
2. **Templating & Server-Rendered HTML** — Layouts, partials, and keeping output valid.
3. **Sanitizing & Securing User HTML** — XSS, allowlists, and the Sanitizer API.
4. **Internationalization & Right-to-Left** — bdi, language tagging, and locale-aware markup.
5. **Migrating Legacy Markup** — Modernizing a large site without a rewrite.
6. **Checkpoint** _(unscaffolded)_ — Write a markup style guide and migration plan for a legacy site, with measurable accessibility and performance goals.

### 3.4 — Standards, Judgment & Communication

1. **How HTML Evolves** — WHATWG, the proposal process, and reading browser standards positions.
2. **Native vs. Custom** — A decision framework for building an interaction natively or from scratch.
3. **Auditing Real Pages** — Evidence-based reviews with axe, Lighthouse, and manual testing.
4. **Explaining Trade-offs to Stakeholders** — Making the case for semantics and quality to non-engineers.
5. **Checkpoint** _(unscaffolded)_ — Audit a real public page, rank the findings by user impact, and write a recommendation for a skeptical stakeholder.
