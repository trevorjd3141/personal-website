# Replace PHP contact form

## Context
The site uses a PHP-based contact form (fcf-assets/) which does not work on
GitHub Pages (static hosting only). Visitors who try to send a message get no
feedback or a silent failure.

## Scope
- Remove fcf-assets/ directory and its CSS/JS includes.
- Replace with a static-friendly alternative. Options:
  a. Formspree (free tier, form submits via their API — no backend needed)
  b. Simple mailto: link
- Keep the Contact section if a form is added; otherwise repurpose or remove it.

## Acceptance criteria
- Contact mechanism works end-to-end on the live GitHub Pages site.
- No PHP assets remain in the repo.

## Dependencies
- None.
