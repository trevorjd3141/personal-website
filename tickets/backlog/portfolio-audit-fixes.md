# Portfolio Audit Fixes (2026-06)

Status: backlog
Type: docs + frontend + content
Created: 2026-06-20
Source: external senior-principal UI/UX + frontend audit of the live site, judged
as a work sample for Frontend/UI and Design/UX roles.

## Context / why

The site is being shown to potential employers for Frontend/UI and Design/UX
roles, which means the site itself is a work sample. A reviewer for these roles
will not just look at the rendered page: they will open dev tools, run Lighthouse,
read the HTML source, and browse the GitHub repo. Several issues are invisible on
a casual laptop view but obvious under that kind of inspection, and they undercut
the "careful frontend engineer" signal the site is meant to send.

The "Terminal Light" redesign aesthetic is strong and should be preserved. This
ticket is about closing the gap between "looks polished" and "polished under
inspection." Findings are tiered by hiring impact, not by effort.

All file/line references were accurate as of commit at ticket creation; verify
line numbers before editing since they will drift.

## Acceptance criteria

- [ ] All P0 items resolved (credibility risks).
- [ ] All P1 items resolved (high hiring impact).
- [ ] P2 items resolved or explicitly deferred with a note.
- [ ] P3 content items addressed or consciously kept.
- [ ] Site still renders correctly on desktop and mobile, light and dark themes.
- [ ] No regression to the existing aesthetic or to the working items listed at
      the bottom of this ticket.
- [ ] Living docs updated (PROJECT.md, DECISIONS.md, BUGS.md) to match reality.

---

## P0 - Credibility risks (a reviewer will see these)

### P0.1 Stale docs contradict the live stack
- Where: `README.md`, `AGENTS.md`, `CLAUDE.md` (Tech Stack), `PROJECT.md`.
- Problem: `README.md` still claims Bootstrap 4.5 + jQuery 3.5.1, Bootstrap Icons
  1.4.1 + Font Awesome, and an FCF PHP contact form in `fcf-assets/`. `AGENTS.md`
  still says Bootstrap 4.5 + jQuery 3.5.1. The real site is Bootstrap 5.3, no
  jQuery, a mailto contact, and `fcf-assets/` no longer exists. `PROJECT.md`
  lists the role as "Data Analytics Engineer," a title that appears nowhere on
  the site (site says Senior Data Engineer / Data Engineer).
- Why it matters: the README is the first thing anyone reads on GitHub. Self-
  contradicting docs read as careless. Highest ROI fix in the audit.
- Fix: rewrite README.md, AGENTS.md, the CLAUDE.md Tech Stack section, and
  PROJECT.md to match the current stack (Bootstrap 5.3, no jQuery, mailto
  contact, no FCF, Raleway + DM Mono fonts). Remove all FCF references.

### P0.2 Broken heading outline (h1 jumps straight to h5)
- Where: section titles at `index.html` section-header blocks (experience,
  education, projects); project card titles use `<h5>`.
- Problem: the only real heading is the hero `<h1>`. Section titles are styled
  `<div>`/`<span>`, not headings. Project titles are `<h5>`. The resulting
  outline is h1 then h5 x8 with no h2/h3, and the three main sections are not
  headings at all. Breaks screen-reader heading navigation and weakens SEO.
- Fix: make section titles `<h2>`, project card titles `<h3>`. Give each
  `<section>` an `aria-labelledby` that points at its heading id. Preserve the
  existing terminal "# name" visual styling on the new heading elements.

### P0.3 Two icon libraries loaded, used zero times
- Where: `index.html` head: Bootstrap Icons CSS link, and the Font Awesome kit
  script (`use.fontawesome.com/...js`, render-blocking).
- Problem: grep of the markup shows no `bi-` or `fa-` classes anywhere. The
  design uses text glyphs instead. Both libraries are dead weight; the Font
  Awesome kit is a blocking script.
- Fix: remove both the Bootstrap Icons stylesheet link and the Font Awesome
  script. Confirm nothing visually changes.

### P0.4 Color contrast fails WCAG on real content (both themes)
- Where: `style.css` custom properties, `--color-text-faint` (light `#adb5bd`,
  dark `#495057`); used by `exp-date-inline`, `exp-sep`, `exp-date-range`.
- Problem: `#adb5bd` on white is about 1.9:1 (WCAG AA needs 4.5:1 body, 3:1
  large). The dark faint tier fails similarly. These are small (10-12px) and
  faint, so they fail on size and contrast together. `--color-text-muted`
  (`#6c757d`) is borderline OK (~4.7:1); the faint tier is the real problem.
- Fix: darken the faint tier in both themes so date/separator text meets at
  least AA for its size. Re-check muted text used at small sizes too.

### P0.5 Dead / contradictory files in the repo
- Where: `thank-you.html`; commented-out blocks in `index.html` (Clearhome card,
  four archived project cards).
- Problem: `thank-you.html` is an unreachable orphan still on Bootstrap 4.5 +
  Open Sans, with an IE9 `html5shiv`, and links a stylesheet
  (`fcf-assets/css/thank-you.css`) and image (`pics/contact/checkmark.png`) that
  no longer exist. The commented-out card blocks violate the project standard of
  deleting unused code rather than commenting it out.
- Fix: delete `thank-you.html`. Remove the commented-out card blocks from
  `index.html`. If any archived project is coming back soon, track it in a ticket
  instead of leaving commented HTML.

---

## P1 - High impact (directly affects how the site lands)

### P1.1 No Open Graph / Twitter Card metadata
- Where: `index.html` head (no `og:` or `twitter:` tags exist).
- Problem: the site is marketed via LinkedIn, where the URL gets shared in posts
  and DMs. With no OG tags it renders as a bare link with no image, title, or
  description.
- Fix: add `og:title`, `og:description`, `og:image` (a 1200x630 card image),
  `og:url`, `og:type`, and Twitter card equivalents. Add a canonical link too.
  Create and commit the share image (suggest `pics/og-card.png`).

### P1.2 Certs and resume are missing from the site
- Where: `assets/aws-cert.pdf`, `assets/neo4j-cert.pdf` exist but are linked
  nowhere; resume PDF was previously removed.
- Problem: for active job hunting, recruiters often want a one-click resume, and
  verifiable certs are hidden in the repo doing nothing.
- Fix: decide and execute one of: (a) surface a Certifications line/section that
  links the two cert PDFs, and/or add a resume download button; or (b) if not
  surfacing them, remove the unused PDFs. Do not leave them linked from nowhere.

### P1.3 External links do not open in a new tab, and the arrow icon implies they do
- Where: hero CTA links, project `card-link`s, company links in experience.
- Problem: no link has `target="_blank"`. Off-site clicks navigate the visitor
  away from the portfolio. The `↗` glyph is the universal "opens externally"
  affordance, so the icon promises behavior the link does not deliver.
- Fix: add `target="_blank" rel="noopener noreferrer"` to off-site links
  (socials, project demos, company sites). Keep in-page anchor links as normal
  same-tab navigation.

### P1.4 Dark-mode toggle is hidden inside the mobile hamburger
- Where: `theme-toggle` button lives inside `.collapse.navbar-collapse`.
- Problem: on mobile the toggle is invisible until the hamburger is expanded.
  Theme switching is a primary delight feature and most recruiters view on
  mobile first.
- Fix: move the theme toggle out of the collapsing region so it is always
  visible in the navbar on mobile. Keep desktop placement/appearance intact.

### P1.5 Performance: layout shift and eager image loading
- Where: project card `<img>` tags; overall page weight.
- Problem: card images have no `width`/`height` attributes, causing cumulative
  layout shift (CLS) as they load. None use `loading="lazy"`, so below-the-fold
  images load eagerly. Separately, the full Bootstrap 5 CSS+JS bundle (~230KB)
  is shipped to power a navbar and a grid that is now mostly custom CSS.
- Fix: add intrinsic `width`/`height` (or `aspect-ratio`) to card images and
  `loading="lazy"` to below-the-fold images. Add `preconnect` for
  fonts.gstatic.com. Evaluate whether Bootstrap still earns its weight; if it is
  only the navbar + grid, consider replacing with custom CSS (larger change,
  defer if risky).

### P1.6 ~5MB of orphaned images in the repo
- Where: `pics/writing-original.jpg` (~2.0MB), `pics/zion.jpg` (~1.5MB),
  `pics/jumbotron.jpg`, `pics/writing.jpg`, `pics/tablet_jumbotron.jpg`,
  `pics/headshot.jpg`, `pics/candy.jpg`, `pics/bagel-bullet*.png`.
- Problem: none are referenced by `index.html` after the redesign. They bloat
  the repo a reviewer browses; a 2MB `*-original.jpg` is a careless-engineer
  tell.
- Fix: confirm each is unreferenced, then delete. If any are sentimental, move
  to a separate branch or release rather than keeping in the main tree.

---

## P2 - Polish (senior-level details)

### P2.1 Percentage horizontal padding does not scale
- Where: `section { padding: 60px 25% }`, `#hero { ... 25% }`,
  `#projects { ... 20% }` in `style.css`.
- Problem: inconsistent values (25% vs 20%); on wide monitors this wastes large
  margins while experience bullets stretch to unreadable line lengths (ideal is
  60-80 characters).
- Fix: introduce a `max-width` content container with `margin-inline: auto` and
  consistent padding. Cap text line length for readability.

### P2.2 Body centered then overridden everywhere
- Where: `body { text-align: center }` plus many `text-align: left` overrides.
- Fix: default to left alignment, center only the few elements that need it.

### P2.3 Fixed px line-height on body
- Where: `body { line-height: 25px }`.
- Fix: use a unitless line-height (for example `1.6`) so it scales with font
  size.

### P2.4 Dead and competing CSS
- Where: `.nav-item::after` hover underline, `.nav-link { transition }`,
  `.nav-pills .active`, and `html { scroll-behavior: auto }` in `style.css`;
  unnecessary `-webkit-` prefixes on the card image transition/transform.
- Problem: these compete with the real active-nav rule (`#my-nav .nav-link.active`)
  and include a no-op default.
- Fix: remove dead/competing rules and redundant prefixes; keep one clear
  active-nav styling path.

### P2.5 DECISIONS.md describes an implementation that does not exist
- Where: `DECISIONS.md` claims `data-bs-spy="scroll"` scrollspy and a 1000ms
  smooth scroll.
- Problem: scrollspy is hand-rolled in JS in `index.html`, and the smooth-scroll
  duration is 500ms. Docs do not match code.
- Fix: update DECISIONS.md to describe the actual JS scrollspy and the real
  duration.

### P2.6 Alt-text typo
- Where: ASCII converter card image alt text reads "Ascii Converted".
- Fix: correct to "ASCII Converter" (or a more descriptive alt).

### P2.7 Active nav link missing aria-current
- Where: scrollspy JS toggles an `active` class only.
- Fix: also set `aria-current="page"` (or `true`) on the active link and clear
  it on the others. Consider adding a skip-to-content link.

### P2.8 Masonry reading order
- Where: `.projects-grid { column-count: 3 }`.
- Problem: CSS columns flow top-to-bottom per column, so visual reading order is
  "all of column 1, then column 2." If card order implies priority, this
  scrambles it.
- Fix: if ordering matters, switch to CSS grid with row flow so order reads
  left-to-right, top-to-bottom.

### P2.9 Verify mobile navbar source order
- Where: the navbar toggler appears before the brand in source.
- Fix: confirm on a real mobile viewport that the hamburger/brand layout looks
  intentional; reorder if it renders awkwardly.

---

## P3 - Content and voice

### P3.1 Hero bio buries the value prop and will go stale
- Where: hero bio paragraph.
- Problem: opens strong (agentic pipelines) then adds personal trivia including
  a specific current book. The named book is a maintenance liability: if it is
  not updated, a reader can date the last site edit and infer neglect.
- Fix: keep personality but drop the specific book title (or move personal lines
  lower so the value prop leads).

### P3.2 Tonal inconsistency in project copy
- Where: the Datadrip project card.
- Problem: long and marketing-fluffy ("maximizing returns effortlessly,"
  "exemplifies the evolving landscape") while the other cards are terse and
  human. The seam reads like generated copy.
- Fix: tighten Datadrip to match the concrete, short, engineer-to-engineer voice
  of the other cards.

### P3.3 Title tag is bare
- Where: `<title>Trevor Dalton</title>`.
- Fix: use "Trevor Dalton - Senior Data Engineer" for SEO, tab clarity, and
  bookmark legibility.

---

## Suggested execution order (batching)

1. Quick credibility batch: P0.1 docs, P0.3 remove icon libs, P0.5 delete dead
   files, P0.2 heading outline, P0.4 contrast. Clears every P0.
2. Hiring-impact batch: P1.1 OG tags, P1.2 resume/certs, P1.3 new-tab links,
   P1.4 mobile theme toggle, P1.5 image perf, P1.6 prune images.
3. Polish batch: P2 items (container refactor, dead CSS, doc fixes).
4. Content pass: P3 copy/title/voice.

## Dependencies / notes

- Static site: no build step, no tests, no type-checking. Verification is manual
  (render desktop + mobile, light + dark, then deploy to trevorjdalton.com).
- Keep all content in `index.html` and all custom CSS in `style.css` per project
  rules.
- Avoid em-dashes in any copy added to the site or docs (project style).
- The Bootstrap-removal option inside P1.5 is the only larger-risk change; treat
  it as optional and defer if it threatens the layout.

## What is working (do not break)

- Strong, coherent "Terminal Light" aesthetic (monospace, greyscale, terminal
  motifs).
- Pre-paint inline theme script correctly prevents the dark-mode flash and
  respects `prefers-color-scheme`.
- `prefers-reduced-motion` is honored for the cursor animation and smooth scroll.
- Real `<main>`, `<nav>`, `<footer>` landmarks present.
- Dropping jQuery and the PHP form were correct, well-reasoned calls.
- Clean CSS custom-property two-theme token system (only the contrast values
  need tuning, not the architecture).
