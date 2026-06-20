# Known Issues & Limitations

## Content
- **About Me bio is stale.** The "Currently reading" and some description copy
  may not reflect Trevor's current situation. Needs a content refresh.
- **Project section may be out of date.** As new projects are completed they
  should be added; old or abandoned ones should be pruned.

## Dependencies
- **Bootstrap 4.5 requires jQuery.** This adds ~87 KB of JS just to support
  Bootstrap's JS components (navbar toggle, scroll-spy). Bootstrap 5 drops this
  dependency; worth addressing in a future redesign.
- **CDN dependencies.** The site relies on Bootstrap, jQuery, Font Awesome, and
  Google Fonts via CDN. If any CDN is unavailable, the site degrades visually.
  No local fallbacks are in place.
- **Bootstrap Icons 1.4.1 is old.** Many newer icons are not available at this
  version. Upgrading is a low-risk find-and-replace.

## Contact form
- **FCF requires a separate PHP host.** The contact form at the bottom of the
  page will not function when serving locally or on GitHub Pages without routing
  to a PHP-capable backend. There is no local testing path without a PHP server.

## Mobile
- **Divider images (`#writing`, `#zion`, `#candy`) display poorly on small
  screens.** The CSS uses `background-size: cover` but the aspect ratio of the
  images may clip unexpectedly on very narrow viewports.

## Internet Explorer
- **IE shiv is present but IE is dead.** The `<!--[if lt IE 9]>` conditional
  shiv in `<head>` is vestigial. Safe to remove in a future cleanup.
