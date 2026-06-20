# Bootstrap 5 Migration Design

Date: 2026-06-19

## Scope

Migrate the static portfolio site from Bootstrap 4.5 + jQuery 3.5.1 to Bootstrap 5.3.
Remove jQuery entirely, replace the deprecated `card-columns` layout, update all
Bootstrap 4 data attributes and class names, upgrade Bootstrap Icons, and remove the IE shiv.
Commented-out archived card blocks (Clearhome, Flappy Bird, etc.) are intentional and must not be removed.

## CDN Updates (`index.html` `<head>`)

| Before | After |
|--------|-------|
| `maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css` | `cdn.jsdelivr.net/npm/bootstrap@5.3.x/dist/css/bootstrap.min.css` |
| `cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css` | `cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.css` |
| `ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js` | *(removed)* |
| `maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js` | `cdn.jsdelivr.net/npm/bootstrap@5.3.x/dist/js/bootstrap.bundle.min.js` |
| Second jQuery tag at bottom of `<body>` | *(removed)* |

The Bootstrap 5 bundle includes Popper — no separate script tags needed.

## IE Shiv

Remove the `<!--[if lt IE 9]>` comment block from `<head>`. IE is end-of-life.

## Attribute / Class Changes in `index.html`

**Navbar toggler** (Bootstrap 5 renamed `data-*` to `data-bs-*`):
- `data-toggle="collapse"` → `data-bs-toggle="collapse"`
- `data-target="#pill-target"` → `data-bs-target="#pill-target"`

**Scrollspy on `<body>`**:
- `data-spy="scroll"` → `data-bs-spy="scroll"`
- `data-target="#my-nav"` → `data-bs-target="#my-nav"`
- `data-offset="10"` → `data-bs-offset="10"`

**Projects container**:
- `<div class="card-columns">` → `<div class="projects-grid">`
  (`card-columns` was removed in Bootstrap 5)

## Smooth Scroll Replacement

Remove the jQuery smooth-scroll `<script>` block at the bottom of `<body>`:
```html
<script src="...jquery/3.2.0/jquery.min.js"></script>
<script>
  $('a[href^="#"]').on('click', ...) { ... }
</script>
```

Replace with a single CSS rule in `style.css`:
```css
html { scroll-behavior: smooth; }
```

Native `scroll-behavior` is supported in all modern browsers and requires no JavaScript.

## `style.css` Changes

1. Add `html { scroll-behavior: smooth; }` near the top of the file.
2. Replace the `.card-columns { column-count: 2; }` rule inside the `max-width: 1300px`
   media query with `.projects-grid { column-count: 2; }`.
3. Add a default `.projects-grid { column-count: 3; }` rule at normal (desktop) breakpoint
   to preserve the existing masonry layout outside the media query.

## `tickets/README.md`

Mark `refresh-about-content` as complete (checkbox `[ ]` → `[x]`); the file is already
in `tickets/completed/` but the index was not updated.

## Out of Scope

- Commented-out archived cards (Clearhome, Flappy Bird, Urban Dictionary, NBA Birthdates,
  Jojo) — intentionally preserved for potential future use; do not remove.
- No visual redesign; site appearance should be unchanged after migration.
- The FCF contact form CSS/JS is independent and not affected by this migration.

## Acceptance Criteria

- No jQuery CDN references anywhere in `index.html`.
- No Bootstrap 4 CDN references anywhere in `index.html`.
- No deprecated `data-toggle` / `data-target` / `data-spy` attributes.
- No `card-columns` class; Projects section uses `.projects-grid` with CSS `column-count`.
- Bootstrap Icons upgraded to 1.13.1.
- IE shiv removed.
- Navbar collapse, scrollspy, and smooth scroll all work correctly.
- Site renders correctly on desktop and mobile.
