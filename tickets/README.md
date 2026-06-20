# Tickets — build order

Canonical order of work. As a ticket progresses, move its file between the
lifecycle folders (it stays listed here regardless of which folder it's in):

- `backlog/` — planned, not yet started
- `in-progress/` — actively being worked on
- `completed/` — finished (kept for history)

Check items off below as they move to `completed/`.

## Content updates
1. [x] [refresh-about-content.md](completed/refresh-about-content.md) — update bio, current role, reading list; remove resume link

## Technical
2. [x] [upgrade-bootstrap-5.md](completed/upgrade-bootstrap-5.md) — migrate from Bootstrap 4 + jQuery to Bootstrap 5; clean up dead code
3. [x] [html-css-audit-fixes.md](completed/html-css-audit-fixes.md) — fix invalid HTML structure, meta description, alt text, perf issues, dead CSS
4. [ ] [replace-contact-form.md](backlog/replace-contact-form.md) — replace broken PHP form with static-friendly alternative

## Design / UX
4. [ ] [visual-redesign.md](backlog/visual-redesign.md) — AI-assisted redesign + AI/human toggle + dark mode (AI theme only); depends on Bootstrap 5

---
Notes:
- This is a static site — no build step, no tests, no type-checking.
- Definition of Done: content is accurate, site renders correctly on desktop and
  mobile, and changes are deployed to trevorjdalton.com.
- Update `PROJECT.md` when significant sections change.
