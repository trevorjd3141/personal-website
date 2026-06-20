# HTML/CSS audit fixes

## Context
Audit of index.html and style.css revealed several correctness, performance, and
quality issues unrelated to the contact form (tracked separately in
replace-contact-form.md).

## Scope

### HTML
- Move `<nav>` inside `<body>` — currently appears before the opening `<body>` tag (invalid HTML)
- Fix `<meta name="Trevor Dalton">` → `<meta name="description">` so search engines pick up the description
- Add `defer` to Bootstrap JS bundle in `<head>` to stop it blocking HTML parsing
- Add `&display=swap` to Google Fonts URL to prevent flash of invisible text (FOIT)
- Fix wrong `alt` text on stack icons (Databricks/Spark/Snowflake say "neo4j icon", Airflow says "react icon", second MySQL says "javascript icon")

### CSS / JS
- Replace hand-rolled smooth-scroll JS (~20 lines) with `html { scroll-behavior: smooth; }` + `@media (prefers-reduced-motion)` override
- Fix bounce animation to use `transform: translateY()` instead of animating `margin` (margin triggers layout reflow every frame)
- Remove dead `text { }` rule — targets SVG `<text>`, never fires in HTML

### Docs
- Update CLAUDE.md: still references Bootstrap 4.5 and jQuery 3.5.1; site is on Bootstrap 5.3.3 with no jQuery

## Acceptance criteria
- HTML validates (nav inside body, correct meta name)
- Lighthouse performance score does not regress
- Bounce animation is smooth
- Smooth scroll works on anchor links, respects prefers-reduced-motion
- CLAUDE.md reflects Bootstrap 5.3.3, no jQuery
- No PHP/FCF assets touched (separate ticket)

## Dependencies
- None.
