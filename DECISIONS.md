# Architectural Decisions

## Static HTML — no framework
The site is pure HTML/CSS/JS with no build step. Rationale: the content is
simple (one page, mostly text and images), and a framework would add complexity
with no real benefit. GitHub Pages deploys straight from the repo root with zero
configuration. If the site grows significantly (blog, dynamic content), a static
site generator like Astro or Next.js would be the upgrade path.

## Bootstrap 4.5 (not 5)
Bootstrap 4.5 was chosen when the site was first built for its mature ecosystem
and solid documentation. Upgrading to Bootstrap 5 would remove the jQuery
dependency and clean up some CSS class names, but there's no urgent reason to
do so — a future redesign is the right moment for that upgrade.

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
scroll-spy navigation (`data-spy="scroll"`) so each section is a smooth-scroll
anchor. This keeps deployment trivial and avoids any routing concerns.

## Image storage: local `pics/`
Project card images and tech stack icons are stored locally in `pics/` rather
than a CDN. At this scale, repo size is not a concern, and it avoids external
image dependencies.
