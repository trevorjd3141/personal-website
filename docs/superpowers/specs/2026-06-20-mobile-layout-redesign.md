# Mobile Layout Redesign — Design Spec
**Date:** 2026-06-20
**Scope:** Mobile only (≤767px breakpoint). Desktop layout is unchanged.

---

## Goal

Give mobile visitors a clean, navigable experience that preserves the terminal aesthetic of the desktop site. The current mobile layout is a straight vertical scroll with no structural adaptation — section jumping is awkward and the top bar gets crowded.

---

## Design

### Scroll-Snap Sections

Each of the four page sections (hero, experience, education, projects) is a full-viewport snap point. Scrolling snaps to the next section rather than free-scrolling continuously. Within a section that has more content than fits (e.g. experience), the content scrolls internally.

```css
/* Container */
html, body { scroll-snap-type: y mandatory; }

/* Each section */
section, #hero { scroll-snap-align: start; min-height: 100dvh; }
```

### Top Bar — Two States

The top bar changes based on which snap section is active:

**Hero screen:** Standard brand bar — `~/trevordalton` on the left, theme toggle on the right. Same as desktop.

**All other screens (experience, education, projects):** Nameplate replaces the brand bar — name and role on the left, theme toggle on the right.

```
┌─────────────────────────────────┐
│ Trevor Dalton      ☾ dark       │
│ // Senior Data Engineer         │
└─────────────────────────────────┘
```

State is toggled via a CSS class (`body.off-hero`) driven by an IntersectionObserver watching the hero section.

### Bottom Navigation — B1a Style

A slim fixed bar at the bottom of the viewport with three items: `experience`, `education`, `projects`. The active section is indicated by a short horizontal line above its label. Inactive labels are muted grey.

```
┌───────────┬────────────┬──────────┐
│   ─────   │            │          │
│ experience│  education │ projects │
└───────────┴────────────┴──────────┘
```

- Tapping a nav item scrolls (snap-jumps) to that section.
- On the hero screen, no item is active — all labels are muted.
- Active state is set by the same IntersectionObserver that controls the top bar.

### Hero Section

Unchanged from desktop in content and layout. The hero fills the full mobile viewport. CTA links remain: Email me, LinkedIn, GitHub, Instagram, Source code.

### Experience / Education / Projects Sections

Content and markup are unchanged. These sections get `min-height: 100dvh` and `scroll-snap-align: start`. Long sections scroll internally within their snap window.

---

## JavaScript — IntersectionObserver

A single observer watches all four sections. On intersection change it:

1. Identifies the most-visible section.
2. Adds/removes `body.off-hero` to swap the top bar state.
3. Updates the `.active` class on the bottom nav item matching the current section.

Only runs when `window.innerWidth <= 767`. Resize listener re-evaluates and tears down/re-initialises if the viewport crosses the breakpoint.

Estimated size: ~40 lines, no dependencies.

---

## CSS Changes

All new rules are wrapped in `@media (max-width: 767px)` to keep desktop untouched.

| What | Change |
|------|--------|
| `html, body` | `scroll-snap-type: y mandatory; height: 100%` |
| `#hero`, `section` | `scroll-snap-align: start; min-height: 100dvh` |
| `.mobile-topbar` | New element; hidden on desktop, visible on mobile |
| `.mobile-topbar.nameplate` | Name + role layout; shown when `body.off-hero` |
| `.mobile-topbar.brand` | `~/trevordalton` layout; shown when not `body.off-hero` |
| `.mobile-bottom-nav` | New fixed bar; hidden on desktop |
| `.mobile-bottom-nav .active` | Line indicator above label |
| Existing `#my-nav` | Hidden on mobile (`display: none`) |

---

## HTML Changes

- Add `.mobile-topbar` element above the existing `<nav>` (hidden on desktop via CSS).
- Add `.mobile-bottom-nav` element after `</main>` (hidden on desktop via CSS).
- Existing `<nav>` and its contents remain for desktop — no changes to desktop markup.
- The theme toggle button is duplicated inside `.mobile-topbar`. Both buttons call the same existing JS handler. The original button inside `#my-nav` is hidden on mobile via CSS.

---

## Out of Scope

- Desktop layout — no changes.
- Section content — no changes to copy, links, or ordering.
- Resume link — not added anywhere.
- Dark/light theme toggle logic — unchanged; the toggle button moves into the mobile top bar but calls the same existing JS handler.

---

## Open Questions

None. All design decisions were settled during the mockup review.
