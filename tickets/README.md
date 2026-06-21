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
4. [x] [replace-contact-form.md](completed/replace-contact-form.md) — replace broken PHP form with static-friendly alternative

## Design / UX
4. [x] [visual-redesign.md](completed/visual-redesign.md) — Terminal Light redesign: dark mode, terminal aesthetic, CSS custom properties, greyscale accent

## Audit follow-ups
5. [x] [portfolio-audit-fixes.md](completed/portfolio-audit-fixes.md) — fixes from the 2026-06 senior UI/UX + frontend audit (stale docs, heading outline, unused icon libs, contrast, dead files, OG tags, perf, polish)
6. [ ] [mobile-uiux-audit-fixes.md](backlog/mobile-uiux-audit-fixes.md) — fixes from the 2026-06 mobile UI/UX review (navbar wrap at 320px, hamburger jump on open, small tap targets, dead brand link, mobile date de-dup)

## Mobile UX
7. [ ] [mobile-hamburger-menu.md](backlog/mobile-hamburger-menu.md) — replace tab-strip topbar with animated right-drawer hamburger menu

---
Notes:
- This is a static site — no build step, no tests, no type-checking.
- Definition of Done: content is accurate, site renders correctly on desktop and
  mobile, and changes are deployed to trevorjdalton.com.
- Update `PROJECT.md` when significant sections change.
