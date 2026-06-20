# Visual Redesign — Design Spec
Date: 2026-06-20

## Overview

A ground-up visual and structural redesign of trevorjdalton.com. The goal is a cohesive, modern aesthetic that replaces the organically-accumulated design accumulated since 2018. The new design is called **Terminal Light**: a clean, professional single-column layout with monospace typography, a terminal-inspired visual language, and full dark mode support via CSS custom properties.

The site structure (sections, content, single-page layout) is unchanged. The parallax hero photo and three photo dividers are removed. Everything else is kept and restyled.

Work happens on a feature branch. Nothing merges to `main` without explicit user sign-off.

---

## Design Language

**Terminal Light** — clean and professional with a developer personality. Monospace font (`DM Mono`) for all structural elements (brand, nav, section headers, labels, tags, code-style text). Raleway for body copy. Open Sans for any remaining headings. The site reads like a beautifully typeset technical document.

---

## Color Palette

Defined entirely as CSS custom properties on `:root` (light) and `[data-theme="dark"]` (dark). A single class swap on `<html>` switches the full theme.

### Light mode (default)
```css
--color-bg:           #ffffff;
--color-bg-subtle:    #fafafa;
--color-border:       #e9ecef;
--color-border-muted: #f1f3f5;
--color-text:         #212529;
--color-text-muted:   #6c757d;
--color-text-faint:   #adb5bd;
--color-accent:       #0096c7;
--color-accent-light: #00b4d8;
```

### Dark mode
```css
--color-bg:           #111318;
--color-bg-subtle:    #1a1e25;
--color-border:       #1e2229;
--color-border-muted: #2c3038;
--color-text:         #e9ecef;
--color-text-muted:   #868e96;
--color-text-faint:   #495057;
--color-accent:       #0096c7;
--color-accent-light: #00b4d8;
```

Accent color is the same in both modes. Only backgrounds and text shift.

---

## Typography

| Role | Font | Weight |
|---|---|---|
| Brand, nav links, section headers, labels, dates, tags | DM Mono | 400 / 700 |
| Body copy, project descriptions, bio | Raleway | 400 |
| Hero name | DM Mono | 700 |
| Card/item company names | DM Mono | 700 |

Font sizes remain close to current values. Section body text stays at ~13–14px. Hero name is large (~40px on desktop, scales down on mobile).

---

## Dark Mode

- Toggled by setting `data-theme="dark"` on `<html>`.
- Default: `prefers-color-scheme` media query sets the initial value on page load.
- Override: a toggle button in the navbar lets the user switch manually.
- Persistence: the user's choice is saved to `localStorage` as `"theme"` and read on page load before first paint (inline `<script>` in `<head>` to avoid flash).
- Toggle button label: `☀ light` / `☾ dark` in DM Mono, styled as a small pill in the navbar.

---

## Navigation

- Fixed-top navbar, full-width, `--color-bg` background with a bottom border.
- Left: `~/trevordalton` in DM Mono (replaces current `TD` brand).
- Right: nav links in DM Mono lowercase (`about`, `experience`, `education`, `projects`), then the dark mode toggle pill.
- Hover effect: growing underline animation carried forward from the current site. Underline color is `--color-accent-light` (`#00b4d8`). Transition: `width 0.3s ease` from 0 to full link width, positioned at the bottom of the navbar.
- Bootstrap scrollspy retained for active-link tracking.

---

## Hero Section

Replaces the full-screen parallax photo. Single-column text block, left-aligned, generous top padding.

Structure:
```
$ whoami                          ← DM Mono prompt, muted color
Trevor Dalton█                    ← Large DM Mono name + blinking cursor
// Senior Data Engineer · AI/ML · LLMs   ← DM Mono subtitle, muted
[bio paragraph in Raleway]
[Email me]  ↗ LinkedIn  ↗ GitHub  ↗ Resume PDF   ← CTAs
```

- Blinking cursor: CSS `animation: blink 1s step-end infinite` on a thin `<span>`.
- The `$ ` prompt prefix and `//` comment prefix are styled with `--color-accent`.
- No background image. Background is `--color-bg`.
- Section bottom: a thin `--color-border` rule separating hero from first content section.

---

## Section Headers

Each section (`#experience`, `#education`, `#projects`) opens with a terminal-style header and ruled line:

```html
<div class="section-header">
  <span class="hash">#</span>
  <span class="section-name">experience</span>
  <div class="section-rule"></div>
</div>
```

- `#` in `--color-accent`.
- Section name in DM Mono, `--color-text`.
- Rule is a `flex: 1` `<div>` with `height: 1px; background: --color-border`.

---

## Experience Section

Each entry is a left-bordered block:

```
│  M Science                              2022 – present
│  Senior Data Engineer (2026–) · Data Engineer (2022–2025)
│
│  → Bullet point one
│  → Bullet point two
│
│  [python] [databricks] [spark] ...     ← DM Mono tags
```

- Left border: `2px solid --color-border`.
- Company name: DM Mono bold, `--color-text`.
- Date: DM Mono, `--color-text-faint`, right-aligned.
- Role: DM Mono small, `--color-text-muted`.
- Bullets: `→` in `--color-accent`, body text in Raleway.
- Stack icon grids (existing `pics/icons/` images): retained below bullets on desktop, hidden on mobile (existing `.remove-mobile` behavior).
- Tags: DM Mono, 10px, `1px solid --color-border`, `2px 8px` padding, `border-radius: 2px`.

---

## Education Section

Same left-bordered block structure as experience. Each entry has a degree title, dates, a short prose description, and a list of coursework tags.

The coursework tag lists use bagel bullets (not `→` arrows — those are only used in experience):

- Bullet image: `pics/bagel-bullet-large.png` at `14px × 14px`.
- Light mode: no filter (black bagel on white).
- Dark mode: `filter: invert(1)` (white bagel on dark background).
- Implemented as `<ul class="bagel-list">` with `list-style: none` and flex rows (`img` + text).

---

## Projects Section

3-column masonry card grid (existing `.projects-grid` column-count layout). Cards are terminal-ified:

- Card border: `1px solid --color-border`, `border-radius: 8px`, light `box-shadow`.
- Card image: retained, `max-height: 200px`, `object-fit: cover`. Hover: `transform: scale(1.03)` (carried forward).
- Card title: DM Mono bold, 13px.
- Card description: Raleway, 13px, expanded — not constrained to a fixed card height. Full project descriptions, not truncated summaries.
- Card link: DM Mono `↗ Link text` replacing Bootstrap `.btn.btn-primary`. Styled as a plain text link in `--color-accent`.
- No Bootstrap button styling anywhere in the card.

Responsive breakpoints inherited from current site (2-col at ≤1300px, 1-col at ≤767px).

---

## About Section

The current `#about-me` text-box with headshot and social links. This section sits below the hero and keeps its existing `<h1>About Me</h1>` heading (it does not get the `# section-name` terminal header treatment — the hero already serves as the about intro). Restyled to match the terminal aesthetic:

- Text box border becomes `1px solid --color-border` (no more thick blue border).
- Headshot retained, circular, same position.
- Social links (LinkedIn, GitHub, Instagram icons) retained.
- "Source Code" button restyled as a DM Mono `↗ Source code` text link.
- `title-separator` line replaced by a plain `--color-border` rule, consistent with other section dividers.

---

## Footer

Dark background (`#212529` in light mode, `#0d0f12` in dark mode — slightly deeper than page bg to maintain contrast). White/light text.

- `# reach out` header in DM Mono with ruled line (white rule).
- Bio line in Raleway.
- `mailto:` link restyled as DM Mono text link: `→ trevorjd3141@gmail.com` in `--color-accent-light`.
- Copyright line retained below footer.

---

## Micro-interactions & Animations

| Element | Behavior |
|---|---|
| Nav links | Growing underline on hover (existing, carried forward) |
| Hero cursor | Blinking block cursor after name |
| Project card images | `scale(1.03)` on card hover (existing, carried forward) |
| Stack icons | `scale(1.03)` on hover (existing, carried forward) |
| Smooth scroll | `scroll-behavior: smooth` with `prefers-reduced-motion` override (existing, carried forward) |
| Dark mode toggle | Instant theme swap, no transition (avoids flash) |

No new animations introduced beyond the blinking cursor.

---

## CSS Architecture

- All colors via `--color-*` custom properties (no hardcoded hex values in rules).
- All existing hardcoded colors (`#0099ff`, `#434242`, `#47d5ff`, `#343a40`, etc.) replaced with variables.
- `[data-theme="dark"]` block on `:root` or `html` overrides all color variables.
- The `style.css` file is refactored in-place — no new files added.
- Bootstrap CDN links and all existing CDN dependencies are unchanged.

---

## Files Changed

| File | Change |
|---|---|
| `style.css` | Full refactor — CSS custom properties, terminal light aesthetic, dark mode rules |
| `index.html` | Hero section replaced, section header markup updated, navbar updated (brand + dark toggle), card link markup updated, bagel list markup updated |
| `pics/bagel-bullet-large.png` | New asset (already created) |

No other files change. No new dependencies added.

---

## Out of Scope

- Substantive content changes (bio text, experience bullets, education entries stay as-is). Project description text is expanded visually by removing the card height constraint — no new copy is written.
- New sections.
- JavaScript frameworks or build tooling.
- Font changes (DM Mono, Raleway, Open Sans all already loaded via CDN).
- Removing Bootstrap — it stays as the grid/responsive foundation.
