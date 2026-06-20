# Known Issues & Limitations

## Content
- **Project section may be out of date.** As new projects are completed they
  should be added; old or abandoned ones should be pruned.

## Dependencies
- **CDN dependencies.** The site relies on Bootstrap, Font Awesome, and
  Google Fonts via CDN. If any CDN is unavailable, the site degrades visually.
  No local fallbacks are in place.

## Contact form
- **FCF requires a separate PHP host.** The contact form at the bottom of the
  page will not function when serving locally or on GitHub Pages without routing
  to a PHP-capable backend. There is no local testing path without a PHP server.

## Mobile
- **Divider images (`#writing`, `#zion`, `#candy`) display poorly on small
  screens.** The CSS uses `background-size: cover` but the aspect ratio of the
  images may clip unexpectedly on very narrow viewports.

## OG Card Image Missing

`pics/og-card.png` is referenced by the Open Graph and Twitter Card meta tags but does not exist in the repo. Social card previews (LinkedIn shares, Slack unfurls, Twitter cards) will show a broken image until this is created.

**Fix:** Create a 1200x630 PNG at `pics/og-card.png` using a design tool (Figma, Canva, etc.) matching the Terminal Light aesthetic (white background, DM Mono typography, name and title). Commit it to the repo.

