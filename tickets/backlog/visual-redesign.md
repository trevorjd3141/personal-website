# Visual redesign with AI/human toggle

## Context
The site will have two themes: an AI-assisted redesign (default) and the
original human-coded design. Visitors can switch between them via a toggle.
Content (copy, sections) is identical in both; only design differs.

## Scope
- Refactor styles to use CSS custom properties so a single class on `<body>`
  switches between the two themes.
- **Human theme:** preserve the current design as-is (colors, typography, layout).
- **AI theme:** modernize the look and feel — new color scheme, typography,
  spacing, animations, micro-interactions, and a more dynamic section layout.
- Add a toggle button in the navbar to switch between themes; default to AI theme.
- Dark mode toggle (AI theme only — it's an AI design decision):
  - Toggle button in the navbar within the AI theme.
  - Implemented via CSS custom properties; persists via localStorage.
  - Defaults to OS preference (prefers-color-scheme).
- Keep the single-page structure and existing sections (About, Experience,
  Education, Projects).
- Ensure both themes look correct on desktop and mobile.

## Acceptance criteria
- TBD — to be defined during design phase.

## Dependencies
- Should be done after the Bootstrap 5 upgrade (ticket: upgrade-bootstrap-5.md).
