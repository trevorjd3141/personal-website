# Mobile hamburger menu

## Context
Replace the current two-row mobile topbar (brand + tab strip) with a single-row
topbar containing the brand text and a hamburger icon. Tapping the hamburger opens
a right-side drawer that shows the nav links and the dark/light mode toggle.

See full design spec: `docs/superpowers/specs/2026-06-21-mobile-hamburger-menu-design.md`

## Acceptance criteria
- [ ] Mobile topbar is a single row: brand text left, hamburger icon right
- [ ] Hamburger icon animates into an X when the drawer is open (CSS transitions)
- [ ] Drawer slides in from the right (75% width), dark background, left border
- [ ] Nav links (experience, education, projects) stagger into the drawer one by one
- [ ] Dark mode toggle appears last in the drawer with no divider line above it
- [ ] Tapping a nav link closes the drawer and scrolls to the section
- [ ] Tapping the X or outside the drawer closes it
- [ ] Desktop nav is unchanged
- [ ] Dark mode toggle is removed from the mobile topbar (lives in drawer only)

## Dependencies
None — self-contained mobile CSS/JS change.

## Branch
`feature/mobile-hamburger-menu`
