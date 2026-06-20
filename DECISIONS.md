# Architectural Decisions

## Static HTML — no framework
The site is pure HTML/CSS/JS with no build step. Rationale: the content is
simple (one page, mostly text and images), and a framework would add complexity
with no real benefit. GitHub Pages deploys straight from the repo root with zero
configuration. If the site grows significantly (blog, dynamic content), a static
site generator like Astro or Next.js would be the upgrade path.

## Bootstrap 5.3
Upgraded from Bootstrap 4.5 to 5.3 (June 2026). Bootstrap 5 drops the jQuery
dependency entirely, which removed ~87 KB of JS from the page. The `card-columns`
class was removed in Bootstrap 5; replaced with a custom `projects-grid` CSS
class using `column-count` (3 columns desktop → 2 at 1300px → 1 at 767px).
Smooth scroll is handled by a 500ms `requestAnimationFrame` easing function rather than `scroll-behavior: smooth` (which cannot be given a duration).

## Contact section: mailto link
The original FCF PHP form never worked on GitHub Pages (static hosting only).
Replaced with a `mailto:` button in the footer. Formspree was considered but
rejected: the free tier's 50 submissions/month cap and third-party dependency
aren't worth it for a portfolio site. A mailto link is zero-dependency and
never breaks.

## Hosting: GitHub Pages + custom domain
Zero cost, automatic deploys on push to `master`, HTTPS via Let's Encrypt.
The `CNAME` file pins the custom domain `trevorjdalton.com`. No CDN or edge
configuration needed for a static portfolio of this size.

## Single-file structure
All content is in one `index.html` rather than split across pages. Scroll-spy is hand-rolled in vanilla JS in `index.html` -- it reads `window.scrollY` on each scroll event and toggles the `active` class on the matching nav link. Smooth-scroll on nav-link clicks is a custom 500ms `requestAnimationFrame` easing function. This keeps deployment trivial and avoids any routing concerns.

## Image storage: local `pics/`
Project card images and tech stack icons are stored locally in `pics/` rather
than a CDN. At this scale, repo size is not a concern, and it avoids external
image dependencies.
