# Mobile UI/UX Audit Fixes (2026-06)

Status: backlog
Type: frontend + a11y
Created: 2026-06-20
Source: external mobile UI/UX review of the live site. Inspected via code review
plus headless Chromium (Playwright) renders at 320 / 360 / 390 / 430 / 768 px and
844px landscape, light and dark, with the navbar captured in both closed and open
states. Tap targets and horizontal overflow were measured programmatically.

## Context / why

The site is shown to recruiters, most of whom open it on a phone first. The
desktop experience is strong, but a few mobile-only layout and touch issues read
as broken or unpolished on small phones. None of these reproduce on a laptop, so
they are easy to miss without device-width testing.

Good baseline confirmed during the review (do not regress): no horizontal scroll
at any width, viewport meta does not lock zoom, images carry width/height +
loading="lazy", project cards use a full-card click overlay, and dark mode renders
cleanly at every width.

All file/line references were accurate at ticket creation; verify before editing
since line numbers drift.

## Acceptance criteria

- [ ] P1 items resolved.
- [ ] P2 items resolved or explicitly deferred with a note.
- [ ] P3 items addressed or consciously kept.
- [ ] Navbar fits one row at 320px and the hamburger stays anchored top-right when
      the menu opens.
- [ ] Primary touch controls meet a comfortable tap height (target ~44px).
- [ ] No regression on desktop or to the existing aesthetic, light and dark.
- [ ] Living docs (PROJECT.md / BUGS.md) updated if behavior changes.

---

## P1 - Mobile layout bugs

### P1.1 Navbar wraps to two rows on small phones (<= ~360px)
- Where: `#my-nav` in `index.html` (brand, `.theme-toggle`, `.navbar-toggler`);
  `.theme-toggle` sizing in `style.css` (`min-width: 76px`, `margin-left: 16px`).
- Problem: measured nav height is 89px at 320px vs 57px at 390px. The brand
  `~/trevordalton` plus the always-visible `dark` toggle fill row one, forcing the
  hamburger button onto a second row beneath the brand. Reads as broken on an
  iPhone SE / older Android.
- Fix: ensure all three top-bar controls fit one row at 320px. Options: reduce the
  brand font-size at small widths, make the theme toggle icon-only below ~360px,
  and/or trim its `min-width` and `margin-left`. Keep the desktop bar unchanged.

### P1.2 Hamburger button jumps position when the menu opens
- Where: `.navbar-toggler` and `#theme-toggle` sit as direct flex children of
  `#my-nav`, outside `#pill-target`.
- Problem: the nav is a centered flex row, so when the collapse expands the nav
  grows tall and the toggler slides from top-right down to the vertical middle of
  the expanded menu (confirmed at 320px and 390px open state). The control moves
  out from under the user's finger, making the menu feel buggy to close.
- Fix: anchor the toggler and theme button to the top row when the menu is open
  (for example `align-self: flex-start` on the controls, or restructure so the
  collapsing list occupies its own full-width row below a fixed-height top bar).

### P1.3 Primary touch targets below recommended size
- Where: `.hero-link` (`style.css`), `.theme-toggle`, `.footer-email`.
- Problem: measured heights are below the ~44px touch recommendation, and the
  hero links (~22px) and footer email (~18px) fall under the WCAG 2.2 SC 2.5.8
  24px floor. Hero CTAs are the primary contact actions.
  - Hero links (Email / LinkedIn / GitHub / Instagram / Source): ~22px tall
  - Theme toggle: 76x29px
  - Footer email: ~18px tall
- Fix: add vertical padding to reach ~44px touch height. Visual text size can stay
  small using transparent padding so the look is unchanged. Open nav links
  (328x37px) and the full-card project links are already fine; no change needed.

---

## P2 - Polish

### P2.1 Brand link is a dead tap
- Where: `<a class="navbar-brand" href="#">` in `index.html`; the smooth-scroll
  script returns early on `href === '#'`.
- Problem: tapping the brand/name does nothing. Users expect the logo to scroll to
  top.
- Fix: point the brand at `#hero`, or add an explicit scroll-to-top handler.

### P2.2 Redundant date display in experience headers squeezes on mobile
- Where: `.exp-header` blocks in `index.html` (`.exp-roles` inline dates vs
  `.exp-date-range`).
- Problem: the role line already shows precise dates, e.g. `(Jan 2026-present)`,
  while the right column repeats a coarser `2022 - present`. On narrow screens the
  flex row keeps both, squeezing the right column. Cosmetic, not a bug.
- Fix: consider hiding the right-side `.exp-date-range` on mobile, or otherwise
  de-duplicate the date info at small widths.

---

## P3 - Verify on real hardware

### P3.1 Real-device confirmation pass
- Headless Chromium cannot fully verify touch feedback, momentum scrolling, iOS
  Safari font rendering, or the fixed navbar under the notch.
- Fix: after P1/P2 land, confirm on a real iPhone and Android that the navbar,
  open menu, and tap targets feel right.

---

## Suggested execution order

1. Layout bugs: P1.1 navbar wrap, P1.2 toggler anchor, P1.3 tap targets.
2. Polish: P2.1 brand link, P2.2 mobile date de-dupe.
3. Real-device pass: P3.1.

## Dependencies / notes

- Static site: no build step, no tests. Verification is manual (render at mobile
  widths, light + dark, then deploy to trevorjdalton.com).
- Keep all content in `index.html` and all custom CSS in `style.css` per project
  rules.
- Avoid em-dashes in any copy added to the site or docs (project style).
- P1.4 of the prior portfolio audit already moved the theme toggle out of the
  hamburger so it is always visible; this ticket builds on that by fixing the
  small-width wrap it can cause.
