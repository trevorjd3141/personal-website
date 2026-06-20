# Visual redesign

## Context
The site's current design has accumulated organically since 2018 and could use a
cohesive modernization pass. A single redesigned theme will replace the existing
look.

## Scope
- Modernize the look and feel — new color scheme, typography, spacing, animations,
  and micro-interactions.
- Refactor styles to use CSS custom properties for easier theming and maintenance.
- Add a dark mode toggle in the navbar:
  - Implemented via CSS custom properties; persists via localStorage.
  - Defaults to OS preference (prefers-color-scheme).
- Keep the single-page structure and existing sections (About, Experience,
  Education, Projects).
- Ensure the redesign looks correct on desktop and mobile.

## Acceptance criteria
- TBD — to be defined during design phase.

## Dependencies
- Should be done after the Bootstrap 5 upgrade (ticket: upgrade-bootstrap-5.md).
