# Upgrade to Bootstrap 5

## Context
The site currently uses Bootstrap 4.5 + jQuery 3.5.1. Bootstrap 5 drops the
jQuery requirement entirely, fixes the deprecated card-columns layout, and
provides a more modern utility/grid system.

## Scope
- Replace Bootstrap 4.5 CDN links with Bootstrap 5.
- Remove jQuery CDN (no longer needed by Bootstrap 5).
- Replace deprecated `card-columns` layout in the Projects section with Bootstrap 5
  grid or CSS columns.
- Update any Bootstrap 4 component classes that changed in Bootstrap 5
  (e.g., `ml-*`/`mr-*` → `ms-*`/`me-*`, `text-left` → `text-start`, etc.).
- Upgrade Bootstrap Icons from 1.4.1 to latest.
- Remove the Internet Explorer HTML5 shiv (IE is end-of-life).
- Remove or clean up commented-out dead code (Clearhome card, etc.).

## Acceptance criteria
- Site renders correctly on desktop and mobile after the upgrade.
- No jQuery loaded; no Bootstrap 4 CDN references remain.
- No deprecated Bootstrap 4 classes in use.

## Dependencies
- None — can be done independently, but should precede the visual redesign.
