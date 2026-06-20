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

