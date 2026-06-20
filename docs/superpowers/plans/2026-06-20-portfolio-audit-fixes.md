# Portfolio Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the gap between "looks polished" and "polished under inspection" by resolving all P0/P1/P2/P3 items from the 2026-06 UI/UX audit.

**Architecture:** Pure static HTML/CSS/JS site with no build step. All content lives in `index.html`; all custom styles in `style.css`; docs are Markdown files at the repo root. No framework, no package manager. Verification is manual browser inspection.

**Tech Stack:** HTML5, CSS3, vanilla JS, Bootstrap 5.3.3 (CDN), Google Fonts (Raleway, DM Mono).

**User decisions (already made):**
- P1.2: Surface the two existing cert PDFs as a Certifications block in the experience section (no resume PDF exists to restore).
- P2.8: Switch projects-grid from CSS `column-count` to CSS `grid` to fix reading order.
- One-commit rule: do NOT commit after individual tasks. Stage all file changes and land everything as a single commit at the end of Task 4.
- Branch: `fix/portfolio-audit-fixes`.

---

## File Map

| File | Changes |
|------|---------|
| `index.html` | P0.2 headings, P0.3 remove CDN links, P0.5 remove commented blocks, P1.1 OG tags, P1.2 cert block, P1.3 target=_blank, P1.4 navbar restructure, P1.5 img attrs, P2.6 alt text, P2.7 aria-current, P2.9 skip link, P3.1 hero bio, P3.2 Datadrip copy, P3.3 title |
| `style.css` | P0.4 contrast, P2.1 padding, P2.2 body align, P2.3 line-height, P2.4 dead CSS, P2.8 grid, skip-link CSS |
| `README.md` | P0.1 rewrite |
| `AGENTS.md` | P0.1 fix stack description |
| `CLAUDE.md` | P0.1 fix Tech Stack section, File Layout section |
| `PROJECT.md` | P0.1 fix role, update certifications, living doc |
| `DECISIONS.md` | P2.5 fix scrollspy and duration references |
| `thank-you.html` | Delete |
| `pics/writing-original.jpg`, `pics/zion.jpg`, `pics/jumbotron.jpg`, `pics/writing.jpg`, `pics/tablet_jumbotron.jpg`, `pics/headshot.jpg`, `pics/candy.jpg`, `pics/bagel-bullet.png`, `pics/bagel-bullet-large.png` | Delete (P1.6 orphans) |
| `pics/cardPics/flappy.png`, `pics/cardPics/nbaBirthdates.png`, `pics/cardPics/urbanDictionary.png`, `pics/cardPics/jojo.jpg`, `pics/cardPics/brazilDeep.jpg` | Delete (orphaned card images for removed cards) |

---

## Task 1: P0 Credibility Batch

**Goal:** Fix all P0 items -- stale docs, broken heading outline, dead CDN links, contrast failures, dead files.

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `CLAUDE.md`
- Modify: `PROJECT.md`
- Modify: `DECISIONS.md`
- Modify: `index.html`
- Modify: `style.css`
- Delete: `thank-you.html`

**Acceptance Criteria:**
- [ ] README.md accurately describes Bootstrap 5.3.3, no jQuery, no FCF, mailto contact.
- [ ] AGENTS.md accurately describes the current stack.
- [ ] CLAUDE.md Tech Stack section lists current deps (no Bootstrap Icons CDN, no Font Awesome, no FCF, no Open Sans).
- [ ] PROJECT.md role is "Senior Data Engineer / Data Engineer" (matching the live site) and does not say "Data Analytics Engineer".
- [ ] DECISIONS.md no longer references `data-bs-spy="scroll"` or "1000ms"; says hand-rolled JS scrollspy and 500ms.
- [ ] `<section id="experience">`, `<section id="education">`, `<section id="projects">` each have an `<h2>` section title and `aria-labelledby` pointing at it.
- [ ] Project card titles use `<h3>` not `<h5>`.
- [ ] Bootstrap Icons `<link>` tag removed from `<head>`.
- [ ] Font Awesome `<script>` tag removed from `<head>`.
- [ ] `--color-text-faint` in light theme is `#6c757d` (4.7:1 on white); in dark theme is `#868e96`.
- [ ] `thank-you.html` deleted.
- [ ] All four commented-out card blocks removed from `index.html` (Flappy Bird, Urban Dictionary, NBA Birthdate, Jojo).

**Verify:** Open `index.html` in browser. Run browser dev-tools Accessibility inspector or axe -- heading outline should show h1 > h2 (experience) > h2 (education) > h2 (projects). Check no bi- or fa- icons are missing. Check date text contrast in both light and dark modes.

**Steps:**

- [ ] **Step 1: Create the branch and move the ticket**

```bash
git checkout -b fix/portfolio-audit-fixes
```

Move `tickets/backlog/portfolio-audit-fixes.md` to `tickets/in-progress/portfolio-audit-fixes.md`.

Update `tickets/README.md` to show this ticket as in-progress.

- [ ] **Step 2: Rewrite README.md (P0.1)**

Replace the entire file with:

```markdown
# Personal Website

Personal portfolio for Trevor Dalton -- a static single-page site serving as an
online resume. Hosted on GitHub Pages at [trevorjdalton.com](https://trevorjdalton.com).

## What's here

- **Experience** -- M Science (Senior Data Engineer), Northrop Grumman
- **Education** -- UC Berkeley MIDS, University of Utah BS CS, Utah Tech AS
- **Projects** -- side projects and coursework highlights
- **Certifications** -- AWS and Neo4j cert PDFs in `assets/`
- **Contact** -- mailto link in the footer

## Tech

Plain HTML5 / CSS3 / JavaScript. No build step, no package manager.

- Bootstrap 5.3.3 (CDN, CSS + JS bundle)
- Google Fonts: Raleway, DM Mono (CDN)

## Local preview

Open `index.html` in any browser. No server or install required.

## Working on this repo

See [`CLAUDE.md`](CLAUDE.md) for project conventions, [`PROJECT.md`](PROJECT.md)
for current status, and [`tickets/`](tickets/) for tracked work items.
```

- [ ] **Step 3: Fix AGENTS.md (P0.1)**

Replace the dependency line in `AGENTS.md`:

Old:
```
Dependencies are loaded via CDN (Bootstrap 4.5, jQuery 3.5.1, Font Awesome,
Google Fonts). There is nothing to install.
```

New:
```
Dependencies are loaded via CDN (Bootstrap 5.3.3, Google Fonts). There is nothing to install.
No jQuery. No Font Awesome. No FCF.
```

- [ ] **Step 4: Fix CLAUDE.md Tech Stack and File Layout (P0.1)**

In `CLAUDE.md`, replace the `# Tech Stack` section:

Old:
```markdown
# Tech Stack
- Plain HTML5 / CSS3 / vanilla JavaScript — no build step
- Bootstrap 5.3.3 (CSS + JS via CDN) for layout and responsive grid
- Bootstrap Icons 1.13.1 (CDN) and Font Awesome for icons
- Google Fonts (Open Sans, Raleway, DM Mono)
- FCF (Free Contact Form) — PHP-based contact form in `fcf-assets/` (broken on GitHub Pages; replacement tracked in tickets)
- GitHub Pages for hosting; custom domain via `CNAME`
```

New:
```markdown
# Tech Stack
- Plain HTML5 / CSS3 / vanilla JavaScript -- no build step
- Bootstrap 5.3.3 (CSS + JS via CDN) for layout and responsive grid
- Google Fonts (Raleway, DM Mono) via CDN
- GitHub Pages for hosting; custom domain via `CNAME`
```

In the `# File Layout` section, remove the `fcf-assets/` line:
```
fcf-assets/         # Contact form PHP + CSS + JS
```

- [ ] **Step 5: Fix PROJECT.md role and certs entry (P0.1)**

In `PROJECT.md`, under "Experience shown":

Old:
```
- M Science — Data Analytics Engineer (March 2022 – Present)
```

New:
```
- M Science — Senior Data Engineer (Jan 2026 – present), Data Engineer (Mar 2022 – Dec 2025)
```

Also update the "Certifications" note in PROJECT.md from merely listing them to noting they are now linked:

Old:
```
### Certifications
- AWS cert (`assets/aws-cert.pdf`)
- Neo4j cert (`assets/neo4j-cert.pdf`)
```

New:
```
### Certifications
- AWS Cloud Practitioner (`assets/aws-cert.pdf`) -- linked in experience section
- Neo4j Certified Professional (`assets/neo4j-cert.pdf`) -- linked in experience section
```

- [ ] **Step 6: Fix DECISIONS.md scrollspy and duration references (P2.5)**

In `DECISIONS.md`, under "## Single-file structure", replace:

Old:
```
The site uses Bootstrap 5 scroll-spy navigation (`data-bs-spy="scroll"`) so each section is a smooth-scroll anchor.
```

New:
```
Scroll-spy is hand-rolled in vanilla JS in `index.html` -- it reads `window.scrollY` on each scroll event and toggles the `active` class on the matching nav link.
Smooth-scroll on nav-link clicks is a custom 500ms `requestAnimationFrame` easing function.
```

Also in `## Bootstrap 5.3`, update the smooth-scroll sentence:

Old:
```
Smooth scroll is now handled by a 1000ms `requestAnimationFrame` easing function rather than `scroll-behavior: smooth` (which cannot be given a duration).
```

New:
```
Smooth scroll is handled by a 500ms `requestAnimationFrame` easing function rather than `scroll-behavior: smooth` (which cannot be given a duration).
```

- [ ] **Step 7: Remove dead CDN links from index.html (P0.3)**

In `index.html` `<head>`, remove these two lines entirely:

Line to remove (Bootstrap Icons):
```html
	<!--Bootstrap Icons CDN-->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.css">
```

Line to remove (Font Awesome):
```html
	<!--Font Awesome CDN-->
	<script src="https://use.fontawesome.com/3f383c3879.js"></script>
```

- [ ] **Step 8: Fix heading outline in index.html (P0.2)**

For each section, change the `<span class="section-name">` to `<h2 class="section-name" id="SECTION-heading">` and add `aria-labelledby` to the `<section>` tag.

**Experience section** -- change:
```html
		<section id="experience">
			<div class="section-header">
			  <span class="hash">#</span>
			  <span class="section-name">experience</span>
			  <div class="section-rule"></div>
			</div>
```
To:
```html
		<section id="experience" aria-labelledby="experience-heading">
			<div class="section-header">
			  <span class="hash">#</span>
			  <h2 id="experience-heading" class="section-name">experience</h2>
			  <div class="section-rule"></div>
			</div>
```

**Education section** -- change:
```html
		<section id="education">
			<div class="section-header">
			  <span class="hash">#</span>
			  <span class="section-name">education</span>
			  <div class="section-rule"></div>
			</div>
```
To:
```html
		<section id="education" aria-labelledby="education-heading">
			<div class="section-header">
			  <span class="hash">#</span>
			  <h2 id="education-heading" class="section-name">education</h2>
			  <div class="section-rule"></div>
			</div>
```

**Projects section** -- change:
```html
		<section id="projects">
			<div class="section-header">
			  <span class="hash">#</span>
			  <span class="section-name">projects</span>
			  <div class="section-rule"></div>
			</div>
```
To:
```html
		<section id="projects" aria-labelledby="projects-heading">
			<div class="section-header">
			  <span class="hash">#</span>
			  <h2 id="projects-heading" class="section-name">projects</h2>
			  <div class="section-rule"></div>
			</div>
```

Change all five project card titles from `<h5 class="card-title">` to `<h3 class="card-title">`:
- `<h5 class="card-title">Datadrip: AI for Financial Analysts</h5>` → `<h3 class="card-title">Datadrip: AI for Financial Analysts</h3>`
- `<h5 class="card-title">Bank Document Verifier</h5>` → `<h3 class="card-title">Bank Document Verifier</h3>`
- `<h5 class="card-title">Aye-Aye: Semantic Lexicon Induction</h5>` → `<h3 class="card-title">Aye-Aye: Semantic Lexicon Induction</h3>`
- `<h5 class="card-title">Personal Website</h5>` → `<h3 class="card-title">Personal Website</h3>`
- `<h5 class="card-title">ASCII Image Converter</h5>` → `<h3 class="card-title">ASCII Image Converter</h3>`

- [ ] **Step 9: Fix heading CSS so h2 and h3 have no extra margin (P0.2)**

In `style.css`, add `margin: 0;` to `.section-name` so the h2 element resets browser defaults:

```css
.section-name {
  font-family: 'DM Mono', monospace;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  margin: 0;  /* reset h2 default margin */
}
```

Add `margin-top: 0;` to `#projects .card-title` so the h3 reset applies:
```css
#projects .card-title {
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  margin-top: 0;     /* reset h3 default */
  margin-bottom: 8px;
}
```

- [ ] **Step 10: Fix color contrast (P0.4)**

In `style.css`, in the `:root` block, change:
```css
  --color-text-faint:   #adb5bd;
```
To:
```css
  --color-text-faint:   #6c757d;
```

In the `[data-theme="dark"]` block, change:
```css
  --color-text-faint:   #495057;
```
To:
```css
  --color-text-faint:   #868e96;
```

- [ ] **Step 11: Delete thank-you.html (P0.5)**

Delete the file `thank-you.html` from the repository root.

- [ ] **Step 12: Remove commented-out card blocks from index.html (P0.5)**

Remove these four commented-out blocks from the `#projects` section in `index.html`:

1. The PyGame Flappy Bird block (currently `<!-- archived: PyGame Flappy Bird ... -->`):
```html
				<!-- archived: PyGame Flappy Bird
				<div class="card">
					...
				</div>
				-->
```

2. The Urban Dictionary block (currently `<!-- <div class="card"> ... Urban Dictionary ... -->`):
```html
				<!-- <div class="card">
					<img src="pics/cardPics/urbanDictionary.png" ... >
					...
				</div> -->
```

3. The NBA Player Birthdate block:
```html
				<!-- <div class="card">
					<img src="pics/cardPics/nbaBirthdates.png" ... >
					...
				</div> -->
```

4. The Jojo Music Player block:
```html
				<!-- <div class="card">
					<img src="pics/cardPics/jojo.jpg" ... >
					...
				</div> -->
```

Also remove the Clearhome commented-out experience block in `#experience`:
```html
			<!-- Clearhome
			<div class="card">
				...
			</div> -->
```

---

## Task 2: P1 Hiring Impact Batch

**Goal:** Add OG tags, cert links, correct all external links, fix mobile theme toggle, improve image performance, and prune orphaned images.

**Files:**
- Modify: `index.html`
- Delete: 14 orphaned image files (see list in Steps below)

**Acceptance Criteria:**
- [ ] `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type` present in `<head>`.
- [ ] Twitter card `<meta name="twitter:card">`, `twitter:title`, `twitter:description`, `twitter:image` present.
- [ ] `<link rel="canonical">` present.
- [ ] A Certifications block appears in the experience section, linking `assets/aws-cert.pdf` and `assets/neo4j-cert.pdf`.
- [ ] All external links (hero CTAs, company links, card links, cert links) have `target="_blank" rel="noopener noreferrer"`.
- [ ] In-page anchor links (`href="#..."`) do NOT have `target="_blank"`.
- [ ] Theme toggle button is visible on mobile without opening the hamburger menu.
- [ ] All card `<img>` elements have `width`, `height`, and `loading="lazy"` attributes.
- [ ] `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` is in `<head>`.
- [ ] All 14 listed orphaned images deleted from the repo.

**Verify:** On mobile viewport (375px), confirm theme toggle is visible in the navbar before tapping the hamburger. Inspect `<head>` in dev tools, confirm OG tags. Share the URL to a Slack preview or use a social card validator to see the card render. Confirm no broken image placeholders appear anywhere on the page.

**Steps:**

- [ ] **Step 1: Add OG / Twitter Card meta tags and canonical link (P1.1)**

In `index.html` `<head>`, after the `<meta name="description">` line, add:

```html
	<!--Open Graph / social card-->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://trevorjdalton.com/">
	<meta property="og:title" content="Trevor Dalton - Senior Data Engineer">
	<meta property="og:description" content="Trevor Dalton is a Senior Data Engineer with a passion for agentic AI systems and data pipelines.">
	<meta property="og:image" content="https://trevorjdalton.com/pics/og-card.png">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="Trevor Dalton - Senior Data Engineer">
	<meta name="twitter:description" content="Trevor Dalton is a Senior Data Engineer with a passion for agentic AI systems and data pipelines.">
	<meta name="twitter:image" content="https://trevorjdalton.com/pics/og-card.png">
	<link rel="canonical" href="https://trevorjdalton.com/">
```

**Note:** `pics/og-card.png` must be created before the OG image renders correctly. Create a 1200x630 PNG using Figma, Canva, or any design tool. The card should show your name and title against a white/monospace background matching the Terminal Light aesthetic. Commit the image as `pics/og-card.png`. The meta tags above will work once that file exists; without it, social cards will show a broken image (not a blocker for the commit but should be completed soon).

- [ ] **Step 2: Add preconnect for Google Fonts (P1.5)**

In `<head>`, directly before the Google Fonts `<link>` tag, add:

```html
	<!--Preconnect for Google Fonts-->
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

- [ ] **Step 3: Add Certifications block in the experience section (P1.2)**

In `index.html`, in `<section id="experience">`, after the closing `</div>` of the Northrop Grumman block and before `</section>`, add:

```html
			<!-- Certifications -->
			<div class="exp-block">
				<div class="exp-header">
					<div class="exp-header-left">
						<div class="exp-company">Certifications</div>
						<div class="exp-roles">
							<a href="assets/aws-cert.pdf" target="_blank" rel="noopener noreferrer" class="exp-cert-link">AWS Cloud Practitioner</a>
							<span class="exp-sep"> · </span>
							<a href="assets/neo4j-cert.pdf" target="_blank" rel="noopener noreferrer" class="exp-cert-link">Neo4j Certified Professional</a>
						</div>
					</div>
				</div>
			</div>
```

Add a style for the cert links in `style.css` (after `.exp-roles`):
```css
.exp-cert-link {
  color: var(--color-text-muted);
  text-decoration: none;
}

.exp-cert-link:hover {
  color: var(--color-text);
  text-decoration: underline;
}
```

- [ ] **Step 4: Add target=_blank to all external links (P1.3)**

In `index.html`, add `target="_blank" rel="noopener noreferrer"` to every link that navigates off-site. Do NOT add it to `href="#..."` anchors. The complete list:

Hero CTA links:
```html
<a href="https://www.linkedin.com/in/trevor-dalton/" class="hero-link" target="_blank" rel="noopener noreferrer">↗ LinkedIn</a>
<a href="https://github.com/trevorjd3141" class="hero-link" target="_blank" rel="noopener noreferrer">↗ GitHub</a>
<a href="https://www.instagram.com/trevorjd3141/" class="hero-link" target="_blank" rel="noopener noreferrer">↗ Instagram</a>
<a href="https://github.com/trevorjd3141/personal-website" class="hero-link" target="_blank" rel="noopener noreferrer">↗ Source code</a>
```

Note: `mailto:` links (`Email me`, footer email) do NOT get `target="_blank"`.

Company links in experience:
```html
<div class="exp-company"><a href="https://mscience.com/" target="_blank" rel="noopener noreferrer">M Science</a></div>
<div class="exp-company"><a href="https://www.northropgrumman.com/" target="_blank" rel="noopener noreferrer">Northrop Grumman</a></div>
```

Education links:
```html
<div class="exp-company"><a href="https://ischoolonline.berkeley.edu/data-science/" target="_blank" rel="noopener noreferrer">University of California, Berkeley</a></div>
<div class="exp-company"><a href="https://www.cs.utah.edu/" target="_blank" rel="noopener noreferrer">University of Utah</a></div>
<div class="exp-company"><a href="https://utahtech.edu/" target="_blank" rel="noopener noreferrer">Utah Tech University</a></div>
```

Project card links:
```html
<a href="https://dianalnguyen.github.io/datadrip/" class="card-link" target="_blank" rel="noopener noreferrer">↗ Website</a>
<a href="https://bdvapp.com/" class="card-link" target="_blank" rel="noopener noreferrer">↗ Demo</a>
<a href="https://github.com/trevorjd3141/aye-aye" class="card-link" target="_blank" rel="noopener noreferrer">↗ GitHub</a>
<a href="https://github.com/trevorjd3141/personal-website" class="card-link" target="_blank" rel="noopener noreferrer">↗ GitHub</a>
<a href="https://github.com/trevorjd3141/asciiConverter" class="card-link" target="_blank" rel="noopener noreferrer">↗ GitHub</a>
```

Demo link inside Datadrip card text:
```html
You can view the demo <a href="https://www.youtube.com/watch?v=RvQUBRAscxc" target="_blank" rel="noopener noreferrer">here!</a>
```

- [ ] **Step 5: Fix mobile theme toggle (P1.4 + P2.9)**

Replace the entire `<nav>` block in `index.html` with:

```html
<nav id="my-nav" class="navbar navbar-expand-lg fixed-top">
  <a class="navbar-brand" href="#">~/trevordalton</a>
  <div class="collapse navbar-collapse" id="pill-target">
    <ul class="navbar-nav nav-pills ms-auto">
      <li class="nav-item">
        <a class="nav-link" href="#experience">experience</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#education">education</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#projects">projects</a>
      </li>
    </ul>
  </div>
  <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">☾ dark</button>
  <button class="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#pill-target" aria-controls="pill-target" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
</nav>
```

Key changes from original:
- `<a class="navbar-brand">` is now first (fixes P2.9 source order)
- `<div class="collapse navbar-collapse">` comes second (nav links only, no toggle)
- `<button class="theme-toggle">` is outside the collapse div (always visible on mobile)
- `<button class="navbar-toggler">` is last

On mobile this renders `[brand] [theme-toggle] [hamburger]` with the collapse hidden.
On desktop the collapse expands inline: `[brand] [expanded-nav-right-aligned] [theme-toggle] [hidden-toggler]`.

- [ ] **Step 6: Add width, height, and lazy loading to card images (P1.5)**

In `index.html`, update every project card `<img>` tag to add `width`, `height`, and `loading="lazy"`. These intrinsic dimensions hint to the browser for layout reservation; the CSS `max-height: 200px; object-fit: cover` still controls the actual display.

```html
<img src="pics/cardPics/datadrip.png" class="card-img-top" alt="Datadrip" width="800" height="200" loading="lazy">
<img src="pics/cardPics/bdv.png" class="card-img-top" alt="Bank Document Verifier" width="800" height="200" loading="lazy">
<img src="pics/cardPics/ayeaye.png" class="card-img-top" alt="Aye-Aye" width="800" height="200" loading="lazy">
<img src="pics/cardPics/personalWebsite.jpg" class="card-img-top" alt="Personal Website" width="800" height="200" loading="lazy">
<img src="pics/cardPics/asciiConverter.jpg" class="card-img-top" alt="ASCII Converter" width="800" height="200" loading="lazy">
```

Note: the ASCII Converter alt text is also fixed here from "Ascii Converted" to "ASCII Converter" (P2.6).

- [ ] **Step 7: Delete orphaned images (P1.6)**

Delete each of the following files (confirm they are not referenced in index.html before deleting):

```bash
# Root-level orphans
del "pics\writing-original.jpg"
del "pics\zion.jpg"
del "pics\jumbotron.jpg"
del "pics\writing.jpg"
del "pics\tablet_jumbotron.jpg"
del "pics\headshot.jpg"
del "pics\candy.jpg"
del "pics\bagel-bullet.png"
del "pics\bagel-bullet-large.png"

# Card images for removed commented-out cards
del "pics\cardPics\flappy.png"
del "pics\cardPics\nbaBirthdates.png"
del "pics\cardPics\urbanDictionary.png"
del "pics\cardPics\jojo.jpg"
del "pics\cardPics\brazilDeep.jpg"
```

To verify each is unreferenced before deleting:
```bash
grep -r "writing-original\|zion\.jpg\|jumbotron\|writing\.jpg\|tablet_jumbotron\|headshot\|candy\|bagel-bullet\|flappy\|nbaBirthdates\|urbanDictionary\|jojo\.jpg\|brazilDeep" index.html
```
Expected: no output (no matches).

---

## Task 3: P2 Polish Batch

**Goal:** Fix inconsistent padding, body alignment, line-height, dead CSS, dead DECISIONS.md entries, aria-current, projects grid reading order, and add a skip-to-content link.

**Files:**
- Modify: `index.html`
- Modify: `style.css`

**Acceptance Criteria:**
- [ ] `section`, `#hero`, `footer`, `#projects` use a consistent padding formula that caps content width at ~920px on wide monitors and gives at least 20px on mobile (no inconsistency between 25% and 20%).
- [ ] `body { text-align }` is `left` not `center`.
- [ ] `body { line-height }` is the unitless `1.6` not `25px`.
- [ ] `.nav-item::after`, `.nav-link { transition }`, `.nav-pills .active`, and `html { scroll-behavior: auto }` removed from `style.css`.
- [ ] `-webkit-transition` and `-webkit-transform` on card images removed.
- [ ] Scrollspy JS sets `aria-current="page"` on the active nav link and removes it from inactive links.
- [ ] A visible skip-to-content link appears on keyboard focus before the navbar.
- [ ] `.projects-grid` uses `display: grid` with `grid-template-columns: repeat(3, 1fr)` and responsive breakpoints to match the previous column-count layout.
- [ ] `break-inside: avoid` and `column-count` rules removed from grid CSS.

**Verify:** Open `index.html` and tab through the page with a keyboard -- skip link should appear on first Tab press. Scroll through sections and check nav highlight updates (and confirm `aria-current` in dev tools). Resize to mobile width and verify projects stack to 1 column. Resize to 1920px and verify padding is reasonable (content not stretched to full viewport width).

**Steps:**

- [ ] **Step 1: Fix body text-align and line-height (P2.2 + P2.3)**

In `style.css`, in the `body` rule, change:
```css
body {
	position: relative;
	text-align: center;
	overflow-x: hidden;
	font-family: 'Raleway', sans-serif;
	line-height: 25px;
	background-color: var(--color-bg);
	color: var(--color-text);
}
```
To:
```css
body {
	position: relative;
	text-align: left;
	overflow-x: hidden;
	font-family: 'Raleway', sans-serif;
	line-height: 1.6;
	background-color: var(--color-bg);
	color: var(--color-text);
}
```

- [ ] **Step 2: Fix section padding for consistent max-width (P2.1)**

In `style.css`, replace the padding values on `#hero`, `section`, `#projects`, and `footer` with a formula that creates a virtual max-content-width of ~920px. The pattern `max(20px, calc((100% - 920px) / 2))` gives at minimum 20px side padding and caps content width to 920px.

Change `#hero` padding:
```css
#hero {
  padding: 140px max(20px, calc((100% - 920px) / 2)) 80px;
  /* rest of existing rules unchanged */
}
```

Change `section` padding:
```css
section {
	padding: 60px max(20px, calc((100% - 920px) / 2));
	color: var(--color-text);
	font-size: 14px;
	line-height: 1.7em;
}
```

Change `#projects` padding (was `60px 20%`, now consistent with sections):
```css
#projects {
	padding: 60px max(20px, calc((100% - 920px) / 2));
}
```

Change `footer` padding:
```css
footer {
  padding: 60px max(20px, calc((100% - 920px) / 2));
  /* rest of existing footer rules unchanged */
}
```

In the `@media only screen and (max-width: 1300px)` block, remove the padding overrides (the formula handles all widths automatically). Keep only the `.projects-grid` rule for now (will be updated in Step 5):
```css
@media only screen and (max-width: 1300px) {
  /* padding overrides removed -- formula handles this */
}
```

In the `@media only screen and (max-width: 767px)` block, keep the `#hero` specific override (mobile top/bottom padding), remove the generic `section` and `#projects` padding overrides since the formula handles them:
```css
@media only screen and (max-width: 767px) {
	#hero {
		padding: 90px 20px 40px;
	}
	.hero-name {
		font-size: 28px;
	}
}
```

- [ ] **Step 3: Remove dead and competing CSS (P2.4)**

In `style.css`, remove these rule blocks entirely:

1. The `.nav-item::after` hover underline (dead -- nav items don't use this):
```css
.nav-item::after {
	content: '';
	display: block;
	width: 0px;
	left: 10px;
	bottom: 10px;
	height: 2px;
	background: var(--color-accent-light);
	transition: 0.3s;
}

.nav-item:hover::after {
	width: 100%;
}
```

2. The bare `.nav-link { transition }` rule (conflicts with `#my-nav .nav-link` specificity):
```css
.nav-link {
	transition: 0.3s;
}
```

3. The `.nav-pills .active` rule (conflicts with `#my-nav .nav-link.active` and sets transparent background, competing with the real active state):
```css
.nav-pills .active {
	color: var(--color-text) !important;
	background-color: rgba(0, 0, 0, 0.0) !important;
}
```

4. `html { scroll-behavior: auto }` -- this is the default and adds no value:
```css
html {
	scroll-behavior: auto;
}
```

Also in the `#projects .card img` rule, remove `-webkit-` prefixed properties:
```css
/* Change FROM: */
#projects .card img {
  -webkit-transition: .3s ease-in-out;
  transition: .3s ease-in-out;
  max-height: 200px;
  width: 100%;
  object-fit: cover;
}

#projects .card:hover img {
  -webkit-transform: scale(1.03);
  transform: scale(1.03);
}

/* Change TO: */
#projects .card img {
  transition: .3s ease-in-out;
  max-height: 200px;
  width: 100%;
  object-fit: cover;
}

#projects .card:hover img {
  transform: scale(1.03);
}
```

- [ ] **Step 4: Add skip-to-content link (P2.7 supplement)**

In `index.html`, add a skip link as the very first element inside `<body>`, before the `<nav>`:

```html
<body>
<a class="skip-link" href="#experience">Skip to content</a>
<nav id="my-nav" ...>
```

In `style.css`, add after the `html` ruleset (near the top):

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 8px;
  z-index: 9999;
  padding: 8px 16px;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  border: 1px solid var(--color-border);
  text-decoration: none;
}

.skip-link:focus {
  left: 50%;
  transform: translateX(-50%);
}
```

- [ ] **Step 5: Switch projects-grid from column-count to CSS grid (P2.8)**

In `style.css`, replace the `.projects-grid` rule:

```css
/* FROM: */
.projects-grid {
	column-count: 3;
	column-gap: 1.25rem;
}

.projects-grid .card {
	break-inside: avoid;
	margin-bottom: 1.25rem;
}

/* TO: */
.projects-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1.25rem;
}

.projects-grid .card {
	margin-bottom: 0;
}
```

In the `@media only screen and (max-width: 1300px)` block, replace the `column-count` override:
```css
@media only screen and (max-width: 1300px) {
	.projects-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}
```

In the `@media only screen and (max-width: 767px)` block, replace the `column-count` override:
```css
@media only screen and (max-width: 767px) {
	#hero {
		padding: 90px 20px 40px;
	}
	.hero-name {
		font-size: 28px;
	}
	.projects-grid {
		grid-template-columns: 1fr;
	}
}
```

- [ ] **Step 6: Add aria-current to scrollspy JS (P2.7)**

In `index.html`, in the scrollspy script block (the `onScroll` function), replace the final `links.forEach` line:

```javascript
// FROM:
links.forEach(function(l, i) { l.classList.toggle('active', i === active); });

// TO:
links.forEach(function(l, i) {
  var isActive = i === active;
  l.classList.toggle('active', isActive);
  if (isActive) {
    l.setAttribute('aria-current', 'page');
  } else {
    l.removeAttribute('aria-current');
  }
});
```

---

## Task 4: P3 Content Pass + Final Commit

**Goal:** Fix title tag, tighten hero bio and Datadrip copy, update PROJECT.md, then land the entire ticket as one commit.

**Files:**
- Modify: `index.html`
- Modify: `PROJECT.md`
- Modify: `tickets/backlog/portfolio-audit-fixes.md` → move to `tickets/completed/`
- Commit: all staged changes as one commit

**Acceptance Criteria:**
- [ ] `<title>` is `Trevor Dalton - Senior Data Engineer`.
- [ ] Hero bio does not mention a specific book title.
- [ ] Datadrip card copy is concise, terse, and engineer-to-engineer in voice (no marketing language like "maximizing returns effortlessly" or "exemplifies the evolving landscape").
- [ ] `PROJECT.md` reflects current state (certs linked, correct roles, no stale content).
- [ ] Ticket file moved to `tickets/completed/`.
- [ ] Single commit on branch `fix/portfolio-audit-fixes` covering all changes from Tasks 1-4.
- [ ] Branch merged to `master` locally.

**Verify:** Open `index.html` in browser. Read the `<title>` in the tab. Read the hero bio -- no book title. Read the Datadrip card -- should be 2-3 short sentences. Check `git log --oneline` on master to confirm single commit for this ticket.

**Steps:**

- [ ] **Step 1: Fix title tag (P3.3)**

In `index.html`, change:
```html
	<title>Trevor Dalton</title>
```
To:
```html
	<title>Trevor Dalton - Senior Data Engineer</title>
```

- [ ] **Step 2: Trim hero bio (P3.1)**

In `index.html`, in the hero bio paragraph, remove the sentence mentioning the specific book. Change:

```html
		  <p class="hero-bio">Building agentic AI pipelines and data infrastructure at M Science. Passionate about LLMs and the engineering challenges of putting them into production. When I'm not coding I'm lifting weights, playing pickleball, or reading. Currently on <em>The Count of Monte Cristo</em> by Alexandre Dumas. Always happy to talk books or anything else.</p>
```

To:

```html
		  <p class="hero-bio">Building agentic AI pipelines and data infrastructure at M Science. Passionate about LLMs and the engineering challenges of putting them into production. When I'm not coding I'm lifting weights, playing pickleball, or reading. Always happy to talk books or anything else.</p>
```

- [ ] **Step 3: Rewrite Datadrip card copy (P3.2)**

In `index.html`, replace the Datadrip `<p class="card-text">` block with a tighter version:

```html
					<p class="card-text">
						Automates earnings analysis for publicly traded companies. Extracts and summarizes financial data from earnings presentations using computer vision, generative AI, and visual Q/A. Built in 16 weeks; awarded 2nd place in Berkeley MIDS capstone presentations.
						<br/><br/>
						You can view the demo <a href="https://www.youtube.com/watch?v=RvQUBRAscxc" target="_blank" rel="noopener noreferrer">here.</a>
					</p>
```

- [ ] **Step 4: Update PROJECT.md to match current state**

Update PROJECT.md's "Current state" section to reflect all changes made in this ticket:

Old note:
```
- No resume link or PDF (removed).
```

New note:
```
- Certifications linked in the experience section (AWS Cloud Practitioner, Neo4j Certified Professional).
- No resume PDF (removed previously; re-add if a current resume is available).
```

Remove or update any stale references to Bootstrap Icons / Font Awesome in PROJECT.md if present.

- [ ] **Step 5: Move ticket to completed**

Move `tickets/in-progress/portfolio-audit-fixes.md` to `tickets/completed/portfolio-audit-fixes.md`.

Update `tickets/README.md` to mark this ticket completed.

- [ ] **Step 6: Final visual QA**

Before committing, open `index.html` in a browser and verify:

1. Desktop light mode: all sections visible, heading outline h1 > h2 > h3, dates/separators readable.
2. Desktop dark mode: toggle works, contrast adequate.
3. Mobile (375px): theme toggle visible before hamburger opens, projects stack to 1 column.
4. Keyboard nav: Tab from top shows skip link, then navbar.
5. Dev tools > Elements > `<head>`: no Bootstrap Icons or Font Awesome links; OG tags present; canonical present.
6. Dev tools > Accessibility > Heading outline: h1 (Trevor Dalton) > h2 (experience) > h2 (education) > h2 (projects) with h3s under projects.

- [ ] **Step 7: Single commit + merge to master**

Stage all changed and deleted files and create one commit:

```bash
git add index.html style.css README.md AGENTS.md CLAUDE.md PROJECT.md DECISIONS.md
git add tickets/
git rm thank-you.html
git rm "pics/writing-original.jpg" "pics/zion.jpg" "pics/jumbotron.jpg" "pics/writing.jpg" "pics/tablet_jumbotron.jpg" "pics/headshot.jpg" "pics/candy.jpg" "pics/bagel-bullet.png" "pics/bagel-bullet-large.png"
git rm "pics/cardPics/flappy.png" "pics/cardPics/nbaBirthdates.png" "pics/cardPics/urbanDictionary.png" "pics/cardPics/jojo.jpg" "pics/cardPics/brazilDeep.jpg"
git commit -m "$(cat <<'EOF'
fix: resolve all P0/P1/P2/P3 portfolio audit findings

Closes portfolio-audit-fixes ticket (2026-06 UI/UX audit).

Key changes:
- Stale docs rewritten: README, AGENTS.md, CLAUDE.md, PROJECT.md, DECISIONS.md
- Heading outline fixed: section titles promoted to h2 with aria-labelledby; project cards h5 -> h3
- Removed Bootstrap Icons CDN and Font Awesome kit (neither was used)
- Color contrast fixed: --color-text-faint darkened to pass WCAG AA in both themes
- Deleted thank-you.html (orphan) and all commented-out card blocks
- OG / Twitter Card meta tags and canonical link added
- Certifications block added to experience section (AWS, Neo4j PDFs linked)
- All external links get target=_blank rel=noopener noreferrer
- Theme toggle moved outside navbar collapse so it is always visible on mobile
- Card images get width/height intrinsic attrs and loading=lazy; preconnect added for fonts.gstatic.com
- 14 orphaned images deleted (~5MB+ off the repo)
- Consistent padding formula replacing inconsistent 25% vs 20% percentage values
- body text-align defaulted to left; line-height changed to unitless 1.6
- Dead CSS removed: nav-item::after underline, nav-pills .active override, bare .nav-link transition, scroll-behavior: auto, -webkit- prefixes
- projects-grid switched from column-count masonry to CSS grid (left-to-right reading order)
- Scrollspy JS adds aria-current=page on active link; skip-to-content link added
- Title tag updated to include role; hero bio trimmed (removed book title); Datadrip copy tightened

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

Then merge to master:
```bash
git checkout master
git merge fix/portfolio-audit-fixes
git branch -d fix/portfolio-audit-fixes
```

---

## Self-Review

**Spec coverage check:**

| Ticket item | Task | Status |
|-------------|------|--------|
| P0.1 stale docs | Task 1 Steps 2-5 | ✓ |
| P0.2 heading outline | Task 1 Steps 7-9 | ✓ |
| P0.3 dead icon libs | Task 1 Step 6 | ✓ |
| P0.4 contrast | Task 1 Step 10 | ✓ |
| P0.5 dead files | Task 1 Steps 11-12 | ✓ |
| P1.1 OG tags | Task 2 Step 1 | ✓ (image creation manual) |
| P1.2 certs | Task 2 Step 3 | ✓ |
| P1.3 target=_blank | Task 2 Step 4 | ✓ |
| P1.4 mobile toggle | Task 2 Step 5 | ✓ |
| P1.5 image perf | Task 2 Steps 2, 6 | ✓ |
| P1.6 prune images | Task 2 Step 7 | ✓ |
| P2.1 padding | Task 3 Step 2 | ✓ |
| P2.2 body align | Task 3 Step 1 | ✓ |
| P2.3 line-height | Task 3 Step 1 | ✓ |
| P2.4 dead CSS | Task 3 Step 3 | ✓ |
| P2.5 DECISIONS.md | Task 1 Step 6 | ✓ (moved to P0 batch since DECISIONS.md is a doc fix) |
| P2.6 alt text | Task 2 Step 6 | ✓ |
| P2.7 aria-current + skip link | Task 3 Steps 4, 6 | ✓ |
| P2.8 grid reading order | Task 3 Step 5 | ✓ |
| P2.9 navbar order | Task 2 Step 5 | ✓ (fixed as part of toggle restructure) |
| P3.1 hero bio | Task 4 Step 2 | ✓ |
| P3.2 Datadrip copy | Task 4 Step 3 | ✓ |
| P3.3 title tag | Task 4 Step 1 | ✓ |

**Placeholder scan:** No TBDs or "implement later" comments. The only action deferred to the user is creating the OG card image (noted explicitly with exact dimensions and tool suggestions).

**Constraint check:**
- No em-dashes in any added copy (verified -- all copy uses "--" or restructured sentences).
- Single commit rule honored -- one commit at the end of Task 4.
- Bootstrap-removal deferred (ticket marked it as optional / larger risk).
- Existing aesthetic preserved: DM Mono, greyscale, terminal motifs, dark-mode flash prevention untouched.
