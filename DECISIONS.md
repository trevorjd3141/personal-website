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
Smooth scroll is now handled by a 1000ms `requestAnimationFrame` easing function
rather than `scroll-behavior: smooth` (which cannot be given a duration).

## Contact form: FCF (Free Contact Form)
The contact form uses the FCF PHP library (`fcf-assets/`) which sends email via
PHPMailer/SMTP. It was integrated because GitHub Pages doesn't support
server-side code — FCF runs on a separate PHP-capable host. For a future
redesign, a form service like Formspree or Resend would be simpler.

## Hosting: GitHub Pages + custom domain
Zero cost, automatic deploys on push to `master`, HTTPS via Let's Encrypt.
The `CNAME` file pins the custom domain `trevorjdalton.com`. No CDN or edge
configuration needed for a static portfolio of this size.

## Single-file structure
All content is in one `index.html` rather than split across pages. The site uses
Bootstrap 5 scroll-spy navigation (`data-bs-spy="scroll"`) so each section is a
smooth-scroll anchor. This keeps deployment trivial and avoids any routing concerns.

## Image storage: local `pics/`
Project card images and tech stack icons are stored locally in `pics/` rather
than a CDN. At this scale, repo size is not a concern, and it avoids external
image dependencies.
