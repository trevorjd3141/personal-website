# Visual Redesign — Terminal Light Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle trevorjdalton.com with the Terminal Light aesthetic: CSS custom properties, dark mode, terminal-inspired section headers, and a `$ whoami` hero — no new dependencies, no build step.

**Architecture:** All changes are confined to `index.html` and `style.css`. A CSS custom-property layer (`--color-*`) drives full theming; a `[data-theme="dark"]` attribute on `<html>` switches modes. An inline `<script>` in `<head>` reads `localStorage`/`prefers-color-scheme` before first paint to avoid flash.

**Tech Stack:** Plain HTML5, CSS3 with custom properties, vanilla JS (< 30 lines total), Bootstrap 5.3.3 (retained, no changes to CDN links).

**User decisions (already made):**
- "Terminal Light" aesthetic — single-column doc style, DM Mono for structural elements, Raleway for body copy
- Electric Cyan accent: `#0096c7` / `#00b4d8`; near-black dark bg: `#111318`
- Dark mode required, defaults to OS preference, persists via `localStorage`, toggled in navbar
- Nav: growing underline animation retained, brand changes to `~/trevordalton`
- Hero: `$ whoami` terminal text hero replaces parallax photo; parallax dividers removed entirely
- Projects: 3-column image card grid kept, terminal-ified, expanded descriptions
- Bagel bullets: `pics/bagel-bullet-large.png` at 14px; `filter: invert(1)` on dark mode
- "Don't merge any changes without my say-so in case I choose to reverse course" — nothing merges to `main` without explicit sign-off

---

## File Map

| File | What changes |
|------|-------------|
| `index.html` | Hero replaced, navbar updated (brand + toggle), section headers converted to `# name` pattern, experience/education cards replaced with left-bordered blocks, project btn-primary links replaced, bagel-list markup added, footer restyled |
| `style.css` | Full refactor — all hardcoded hex colors → `--color-*` vars, dark mode block added, new component styles added, old component styles (`.divider-img`, `.bagel-bullets`, `.bubble-tags`, `#name-area`) removed |
| `pics/bagel-bullet-large.png` | Already created — no changes needed |

---

## Task 1: Create feature branch

**Goal:** Create the `feature/visual-redesign` branch so all work stays off `main` until explicit sign-off.

**Files:**
- No file changes

**Acceptance Criteria:**
- [ ] Branch `feature/visual-redesign` exists and is checked out
- [ ] `git status` shows clean working tree on the new branch

**Verify:** `git branch --show-current` → `feature/visual-redesign`

**Steps:**

- [ ] **Step 1: Create and switch to feature branch**

```bash
git checkout -b feature/visual-redesign
```

Expected: `Switched to a new branch 'feature/visual-redesign'`

- [ ] **Step 2: Verify**

```bash
git branch --show-current
```

Expected: `feature/visual-redesign`

---

## Task 2: CSS custom properties + dark mode infrastructure

**Goal:** Add the `--color-*` CSS custom property layer, dark mode overrides, and the inline theme-detection script — the foundation every subsequent task builds on.

**Files:**
- Modify: `style.css` (add custom properties block at top, update `body` and `section` base styles)
- Modify: `index.html` (add inline `<script>` in `<head>` before `style.css`)

**Acceptance Criteria:**
- [ ] All `--color-*` variables defined on `:root` (light) and `[data-theme="dark"]`
- [ ] `body` uses `var(--color-bg)` and `var(--color-text)`
- [ ] `section` uses `var(--color-text)` (replaces hardcoded `#434242`)
- [ ] Inline script in `<head>` reads `localStorage` and `prefers-color-scheme` before first paint
- [ ] Setting `data-theme="dark"` on `<html>` in DevTools switches page to dark background

**Verify:** Open `index.html` in browser, open DevTools console, run `document.documentElement.setAttribute('data-theme','dark')` — page background should switch to `#111318`.

**Steps:**

- [ ] **Step 1: Add CSS custom properties at the top of `style.css`**

Insert this block at the very top of `style.css`, before all existing rules:

```css
/* ── CSS Custom Properties ─────────────────────────────── */
:root {
  --color-bg:           #ffffff;
  --color-bg-subtle:    #fafafa;
  --color-border:       #e9ecef;
  --color-border-muted: #f1f3f5;
  --color-text:         #212529;
  --color-text-muted:   #6c757d;
  --color-text-faint:   #adb5bd;
  --color-accent:       #0096c7;
  --color-accent-light: #00b4d8;
}

[data-theme="dark"] {
  --color-bg:           #111318;
  --color-bg-subtle:    #1a1e25;
  --color-border:       #1e2229;
  --color-border-muted: #2c3038;
  --color-text:         #e9ecef;
  --color-text-muted:   #868e96;
  --color-text-faint:   #495057;
  --color-accent:       #0096c7;
  --color-accent-light: #00b4d8;
}
```

- [ ] **Step 2: Update `body` rule in `style.css` to use CSS vars**

Find the existing `body` rule and replace it:

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

- [ ] **Step 3: Update `section` rule to use CSS vars**

Find the existing `section` rule and replace `color: #434242` with `color: var(--color-text)`:

```css
section {
  padding: 150px 25%;
  color: var(--color-text);
  font-size: 13pt;
  line-height: 1.7em;
}
```

- [ ] **Step 4: Add inline theme-detection script to `index.html` `<head>`**

Add this inline `<script>` block immediately **before** the `<link href="style.css" ...>` line:

```html
<!-- Inline: read theme preference before first paint to avoid flash -->
<script>
  (function() {
    var stored = localStorage.getItem('theme');
    if (stored) {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
</script>
```

- [ ] **Step 5: Commit**

```bash
git add style.css index.html
git commit -m "feat: add CSS custom properties and dark mode infrastructure"
```

---

## Task 3: Navbar — brand, link styles, dark mode toggle

**Goal:** Update the navbar with the `~/trevordalton` brand, DM Mono lowercase nav links, and a dark mode toggle pill button.

**Files:**
- Modify: `index.html` (navbar HTML + JS toggle handler near `</body>`)
- Modify: `style.css` (navbar CSS, nav underline, toggle button)

**Acceptance Criteria:**
- [ ] Brand shows `~/trevordalton` in DM Mono
- [ ] Nav links are lowercase in DM Mono
- [ ] Dark mode toggle pill visible in navbar; clicking it switches `data-theme` and persists to `localStorage`
- [ ] Toggle label shows `☾ dark` on light mode and `☀ light` on dark mode
- [ ] Growing underline animation on nav link hover uses `--color-accent-light`
- [ ] Navbar background is `--color-bg` (white on light, `#111318` on dark)

**Verify:** Open `index.html`, click the toggle button, confirm background switches; refresh the page, confirm the saved preference is restored.

**Steps:**

- [ ] **Step 1: Replace the `<nav>` block in `index.html`**

Replace the entire `<nav id="my-nav" ...>...</nav>` with:

```html
<nav id="my-nav" class="navbar navbar-expand-lg fixed-top">
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#pill-target" aria-controls="pill-target" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">~/trevordalton</a>
  <div class="collapse navbar-collapse" id="pill-target">
    <ul class="navbar-nav nav-pills ms-auto">
      <li class="nav-item">
        <a class="nav-link" href="#about-me">about</a>
      </li>
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
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">☾ dark</button>
  </div>
</nav>
```

- [ ] **Step 2: Add toggle JS just before `</body>` in `index.html`**

```html
<script>
  (function() {
    var btn = document.getElementById('theme-toggle');
    var html = document.documentElement;
    function updateLabel() {
      btn.textContent = html.getAttribute('data-theme') === 'dark' ? '☀ light' : '☾ dark';
    }
    updateLabel();
    btn.addEventListener('click', function() {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateLabel();
    });
  })();
</script>
```

- [ ] **Step 3: Replace the `#my-nav` rule in `style.css`**

```css
#my-nav {
  --bs-navbar-padding-x: 1rem;
  background-color: var(--color-bg) !important;
  border-bottom: 1px solid var(--color-border);
}

#my-nav .navbar-brand {
  font-family: 'DM Mono', monospace;
  font-size: 14px;
  color: var(--color-text) !important;
}

#my-nav .nav-link {
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  color: var(--color-text-muted) !important;
}

#my-nav .nav-link:hover,
#my-nav .nav-link.active {
  color: var(--color-text) !important;
  background-color: transparent !important;
}

.navbar-toggler {
  border-color: var(--color-border);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(73,80,87,0.75)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

[data-theme="dark"] .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(233,236,239,0.75)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
```

- [ ] **Step 4: Update the nav underline and `.nav-pills .active` rules in `style.css`**

Replace the existing `.nav-item::after`, `.nav-item:hover::after`, `.nav-link`, and `.nav-pills .active` rules with:

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

.nav-link {
  transition: 0.3s;
}

.nav-pills .active {
  color: var(--color-text) !important;
  background-color: rgba(0, 0, 0, 0.0) !important;
}
```

- [ ] **Step 5: Add theme toggle button styles to `style.css`**

```css
.theme-toggle {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 4px 12px;
  color: var(--color-text-muted);
  cursor: pointer;
  margin-left: 16px;
  transition: border-color 0.2s, color 0.2s;
}

.theme-toggle:hover {
  border-color: var(--color-accent-light);
  color: var(--color-text);
}
```

- [ ] **Step 6: Commit**

```bash
git add index.html style.css
git commit -m "feat: restyle navbar with terminal brand, DM Mono links, dark mode toggle"
```

---

## Task 4: Hero section — replace parallax with terminal hero

**Goal:** Remove the `#name-area` parallax hero and replace it with a `$ whoami` terminal text hero with a blinking cursor.

**Files:**
- Modify: `index.html` (remove `#name-area` section, add `#hero` section)
- Modify: `style.css` (remove `#name-area`, `#top-chevron`, related `@keyframes bounce`; add `.hero-*` styles and `@keyframes blink`)

**Acceptance Criteria:**
- [ ] No parallax/background-image hero remains
- [ ] `$ whoami` prompt visible in muted DM Mono with `$` in accent color
- [ ] "Trevor Dalton" name in large DM Mono bold (~40px) with a blinking cyan block cursor
- [ ] `// Senior Data Engineer · AI/ML · LLMs` subtitle in muted DM Mono
- [ ] Short bio paragraph in Raleway below subtitle
- [ ] CTA links: "Email me", "↗ LinkedIn", "↗ GitHub", "↗ Resume PDF" in DM Mono accent color
- [ ] Hero has `border-bottom: 1px solid var(--color-border)` separating it from the about section
- [ ] Hero is left-aligned and responsive

**Verify:** Open `index.html` — confirm the terminal hero renders, the cursor blinks, and the page looks correct in both light and dark modes.

**Steps:**

- [ ] **Step 1: Replace the `#name-area` section in `index.html`**

Remove this entire block:

```html
<!--Main title with my name in huge letters-->
<section class="remove-mobile" id="name-area">
  <i class="bi bi-chevron-left"></i>
  <p>Trevor Dalton</p>
  <i class="bi bi-chevron-right"></i>

  <!--The down arrow-->
  <a href="#about-me">
    <i id="top-chevron" class="bi bi-chevron-down" aria-hidden="true"></i>
  </a>
</section>
```

Replace it with:

```html
<!-- Terminal hero -->
<section id="hero">
  <div class="hero-prompt"><span class="hero-prefix">$ </span>whoami</div>
  <h1 class="hero-name">Trevor Dalton<span class="hero-cursor">█</span></h1>
  <div class="hero-role"><span class="hero-comment">// </span>Senior Data Engineer · AI/ML · LLMs</div>
  <p class="hero-bio">Senior Data Engineer at M Science, building agentic AI pipelines and data infrastructure. Passionate about LLMs and the engineering challenges of putting them into production. When I'm not coding I'm lifting weights, playing pickleball, or reading.</p>
  <div class="hero-cta">
    <a href="mailto:trevorjd3141@gmail.com" class="hero-link">Email me</a>
    <a href="https://www.linkedin.com/in/trevor-dalton/" class="hero-link">↗ LinkedIn</a>
    <a href="https://github.com/trevorjd3141" class="hero-link">↗ GitHub</a>
    <a href="assets/trevor_dalton_resume.pdf" class="hero-link" target="_blank">↗ Resume PDF</a>
  </div>
</section>
```

- [ ] **Step 2: Remove old `#name-area` and `#top-chevron` rules from `style.css`**

Delete these blocks entirely:

```css
#name-area {
  padding: 375px 15% 200px;
  font-size: 54pt;
  color: white;
  background-image: url(pics/jumbotron.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

#top-chevron {
  font-size: 120%;
  display: block;
  color: white;
  margin: 0px auto 350px;
  left: 50%;
  animation: bounce 0.75s ease-in-out 4;
}

#top-chevron:hover {
  color: #434242;
}

#name-area p {
  text-align: center;
  font-family: 'DM Mono', monospace;
  display: inline;
  font-size: 100%;
}

@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(20px); }
  100% { transform: translateY(0); }
}
```

Also remove this from the `@media only screen and (max-width: 1300px)` block:

```css
#name-area {
  font-size: 40pt;
  padding: 350px 5% 5px;
  background-image: url(pics/tablet_jumbotron.jpg);
}
```

- [ ] **Step 3: Add hero styles to `style.css`**

```css
#hero {
  padding: 140px 25% 80px;
  text-align: left;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.hero-prompt {
  font-family: 'DM Mono', monospace;
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.hero-prefix,
.hero-comment {
  color: var(--color-accent);
}

.hero-name {
  font-family: 'DM Mono', monospace;
  font-size: 40px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
  margin-bottom: 12px;
}

.hero-cursor {
  display: inline-block;
  color: var(--color-accent);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.hero-role {
  font-family: 'DM Mono', monospace;
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 24px;
}

.hero-bio {
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  color: var(--color-text);
  line-height: 1.7;
  max-width: 600px;
  margin-bottom: 24px;
  text-align: left;
}

.hero-cta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-link {
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  color: var(--color-accent);
  text-decoration: none;
}

.hero-link:hover {
  color: var(--color-accent-light);
  text-decoration: underline;
}

@media only screen and (max-width: 1300px) {
  #hero {
    padding: 120px 10% 60px;
  }
}

@media only screen and (max-width: 767px) {
  #hero {
    padding: 90px 20px 40px;
  }
  .hero-name {
    font-size: 28px;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: replace parallax hero with terminal whoami hero"
```

---

## Task 5: Remove parallax dividers

**Goal:** Delete the three `.divider-img` spacer divs and their CSS — they no longer belong in the Terminal Light aesthetic.

**Files:**
- Modify: `index.html` (remove 3 `<div class="divider-img" ...>` elements)
- Modify: `style.css` (remove `.divider-img`, `#candy`, `#zion`, `#writing` rules; remove mobile override for `.divider-img`)

**Acceptance Criteria:**
- [ ] No `divider-img` elements remain in `index.html`
- [ ] No `.divider-img`, `#candy`, `#zion`, `#writing` rules remain in `style.css`

**Verify:** Open `index.html` — no photo dividers between sections; sections flow directly into each other.

**Steps:**

- [ ] **Step 1: Remove divider divs from `index.html`**

Delete these three lines (each is a standalone div between sections):

```html
<div class="divider-img" id="writing"></div>
```
```html
<div class="divider-img" id="zion"></div>
```
```html
<div class="divider-img" id="candy"></div>
```

- [ ] **Step 2: Remove divider rules from `style.css`**

Delete this block:

```css
/*individual background images.  Name of ID is the name of picture*/
#candy { background-image: url("pics/candy.jpg"); }
#zion { background-image: url("pics/zion.jpg"); }
#writing { background-image: url("pics/writing.jpg"); }
```

Delete this block:

```css
.divider-img {
    /* Set a specific height */
    min-height: 200px; 

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
```

Delete this block from inside the `@media only screen and (max-width: 767px)` rule:

```css
.divider-img {
  background-color: #434242;
  min-height: 50px;
  background-image: none;
}
```

- [ ] **Step 3: Commit**

```bash
git add index.html style.css
git commit -m "chore: remove parallax photo dividers"
```

---

## Task 6: About section restyling

**Goal:** Restyle the `#about-me` section to match the terminal aesthetic — updated border, restyled "Source Code" link, and updated title separator.

**Files:**
- Modify: `index.html` (Source Code button → DM Mono text link)
- Modify: `style.css` (`.text-box` border, `.title-separator`, about section colors)

**Acceptance Criteria:**
- [ ] `.text-box` border is `1px solid var(--color-border)` with a light box-shadow (no more thick blue border)
- [ ] "Source Code" Bootstrap button is replaced by `↗ Source code` DM Mono text link in accent color
- [ ] `.title-separator` is a 1px `--color-border` line (not blue)
- [ ] Headshot, social icons, and bio text remain unchanged

**Verify:** Open `index.html` — about section shows the restyled card with a subtle border and the text link instead of the blue button.

**Steps:**

- [ ] **Step 1: Replace the "Source Code" button in `index.html`**

Find:

```html
<a href="https://github.com/trevorjd3141/personal-website" class="btn btn-primary" type="button">Source Code</a>
```

Replace with:

```html
<a href="https://github.com/trevorjd3141/personal-website" class="about-source-link">↗ Source code</a>
```

- [ ] **Step 2: Update `.text-box` in `style.css`**

Replace:

```css
.text-box {
  border-radius: 25px;
  border: 2px solid #0099ff;
  padding: 40px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 14px 0 rgba(0, 0, 0, 0.19);
}
```

With:

```css
.text-box {
  border-radius: 12px;
  border: 1px solid var(--color-border);
  padding: 40px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
```

- [ ] **Step 3: Update `.title-separator` in `style.css`**

Replace:

```css
.title-separator {
  display: block;
  width: 350px;
  height: 3px;
  background: #0099ff;
  margin: auto auto 40px;
  float: none;
}
```

With:

```css
.title-separator {
  display: block;
  width: 100%;
  height: 1px;
  background: var(--color-border);
  margin: auto auto 24px;
  float: none;
}
```

Also remove the mobile override for `.title-separator` width (the `width: 200px` in the 767px media query) — it's no longer needed since we now use `width: 100%`.

- [ ] **Step 4: Add the `about-source-link` style and update `#about-me` icon colors in `style.css`**

Add:

```css
.about-source-link {
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  color: var(--color-accent);
  text-decoration: none;
}

.about-source-link:hover {
  color: var(--color-accent-light);
  text-decoration: underline;
}
```

Update `#about-me` in the `@media only screen and (max-width: 767px)` block — the `.text-box` override there sets `border: 1px solid rgba(0,0,0,.125)`. Remove that override (the new base style is already correct for mobile):

```css
@media only screen and (max-width: 767px) {
  #about-me {
    padding: 100px 25px 25px;
  }

  /* Remove the .text-box override — base style now handles it */
  #about-me .title-separator {
    margin: auto;
  }

  #projects {
    padding: 100px 25px 25px;
  }
  /* ... rest of media query unchanged ... */
}
```

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: restyle about section with terminal aesthetic"
```

---

## Task 7: Terminal section headers

**Goal:** Replace the `<h1>X</h1><div class="title-separator">` pattern in experience, education, and projects with the `# section-name` terminal header markup.

**Files:**
- Modify: `index.html` (3 section headers updated)
- Modify: `style.css` (add `.section-header`, `.hash`, `.section-name`, `.section-rule` styles)

**Acceptance Criteria:**
- [ ] Experience, education, and projects sections each have the `#` + section-name + horizontal rule header
- [ ] `#` symbol is in `--color-accent`
- [ ] Section name is in DM Mono bold, `--color-text`
- [ ] Rule is a `flex: 1` line in `--color-border`
- [ ] Old `<h1>` + `.title-separator` pattern removed from those three sections

**Verify:** Open `index.html` — each content section opens with the terminal-style header.

**Steps:**

- [ ] **Step 1: Replace section header in `#experience`**

Find:

```html
<h1>Experience</h1>
<div class="title-separator"></div>
```

Replace with:

```html
<div class="section-header">
  <span class="hash">#</span>
  <span class="section-name">experience</span>
  <div class="section-rule"></div>
</div>
```

- [ ] **Step 2: Replace section header in `#education`**

Find:

```html
<h1>Education</h1>
<div class="title-separator"></div>
```

Replace with:

```html
<div class="section-header">
  <span class="hash">#</span>
  <span class="section-name">education</span>
  <div class="section-rule"></div>
</div>
```

- [ ] **Step 3: Replace section header in `#projects`**

Find:

```html
<h1>Projects</h1>
<div class="title-separator"></div>
```

Replace with:

```html
<div class="section-header">
  <span class="hash">#</span>
  <span class="section-name">projects</span>
  <div class="section-rule"></div>
</div>
```

- [ ] **Step 4: Add section header styles to `style.css`**

```css
.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
}

.hash {
  font-family: 'DM Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
}

.section-name {
  font-family: 'DM Mono', monospace;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
}

.section-rule {
  flex: 1;
  height: 1px;
  background: var(--color-border);
}
```

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: add terminal section headers"
```

---

## Task 8: Experience section — left-bordered blocks

**Goal:** Replace Bootstrap cards in `#experience` with left-bordered terminal blocks, `→` arrow bullets, DM Mono company/role labels, and small tech tags.

**Files:**
- Modify: `index.html` (`#experience` section content)
- Modify: `style.css` (add `.exp-block`, `.exp-header`, `.exp-company`, `.exp-roles`, `.exp-date-range`, `.arrow-list`, `.exp-tags`, `.exp-tag`; remove old `#experience .card` and `.bagel-bullets` rules)

**Acceptance Criteria:**
- [ ] Two `.exp-block` entries (M Science, Northrop Grumman) replace Bootstrap cards
- [ ] Left border `2px solid var(--color-border)` on each block
- [ ] Company name in DM Mono bold linked to company URL
- [ ] Roles and date range in DM Mono muted/faint
- [ ] Bullet points use `→` in accent color via CSS `::before` (no image bullets)
- [ ] Stack icon grid (`.stack-icons`) retained unchanged inside each block
- [ ] DM Mono tech tags (`[python]`, `[databricks]`, etc.) below stack icons

**Verify:** Open `index.html` — experience section shows two left-bordered blocks with arrow bullets and tech tags. Stack icon grid still visible on desktop.

**Steps:**

- [ ] **Step 1: Replace the M Science card in `index.html`**

Remove the entire `<!--M Science Full-Time-->` Bootstrap card block and replace it with:

```html
<!-- M Science -->
<div class="exp-block">
  <div class="exp-header">
    <div class="exp-header-left">
      <div class="exp-company"><a href="https://mscience.com/">M Science</a></div>
      <div class="exp-roles">
        <span class="exp-role">Senior Data Engineer</span> <span class="exp-date-inline">(Jan 2026–present)</span>
        <span class="exp-sep"> · </span>
        <span class="exp-role">Data Engineer</span> <span class="exp-date-inline">(Mar 2022–Dec 2025)</span>
      </div>
    </div>
    <div class="exp-date-range">2022 – present</div>
  </div>
  <ul class="arrow-list">
    <li>Designed an agentic eReceipt tagging pipeline using LangGraph, BM25 retrieval, and OpenAI/Anthropic LLMs to automatically classify thousands of daily transactions against a video game product taxonomy</li>
    <li>Fine-tuned multiple BERT-based classification models using PyTorch and Hugging Face to automate large-scale data labeling and improve data accuracy with F1-scores above 98%. Deployed models with MLflow, streamlining operations and cutting manual effort by 50%</li>
    <li>Derived actionable insights from large-scale video game sales data using SQL and Python, uncovering user behavior trends to inform client product strategy and marketing decisions</li>
    <li>Construct PySpark/SQL ETL pipelines for full raw-to-deliverable processing of large-scale data</li>
    <li>Optimize AWS EC2 configurations to cut pipeline costs and runtime by as much as 60%</li>
    <li>Developed DataOps-controlled pipeline orchestration systems, reducing runtimes by over 20%</li>
  </ul>
  <div class="row row-cols-6 mt-4 stack-icons remove-mobile">
    <div class="col"><img alt="python icon" src="pics/icons/python.png"><p>Python</p></div>
    <div class="col"><img alt="databricks icon" src="pics/icons/databricks.png"><p>Databricks</p></div>
    <div class="col"><img alt="apache spark icon" src="pics/icons/spark.png"><p>Apache Spark</p></div>
    <div class="col"><img alt="pytorch icon" src="pics/icons/pytorch.png"><p>PyTorch</p></div>
    <div class="col"><img alt="hugging face icon" src="pics/icons/huggingface.png"><p>Hugging Face</p></div>
    <div class="col"><img alt="snowflake icon" src="pics/icons/snowflake.png"><p>Snowflake</p></div>
    <div class="col"><img alt="aws icon" src="pics/icons/aws.png"><p>AWS</p></div>
    <div class="col"><img alt="apache airflow icon" src="pics/icons/airflow.png"><p>Apache Airflow</p></div>
    <div class="col"><img alt="mysql icon" src="pics/icons/mysql.png"><p>MySQL</p></div>
    <div class="col"><img alt="git icon" src="pics/icons/git.png"><p>Git</p></div>
    <div class="col"><img alt="langchain icon" src="pics/icons/langchain.png"><p>LangChain</p></div>
    <div class="col"><img alt="anthropic icon" src="pics/icons/claude.png"><p>Anthropic</p></div>
  </div>
  <div class="exp-tags">
    <span class="exp-tag">python</span>
    <span class="exp-tag">databricks</span>
    <span class="exp-tag">pyspark</span>
    <span class="exp-tag">pytorch</span>
    <span class="exp-tag">hugging face</span>
    <span class="exp-tag">langgraph</span>
    <span class="exp-tag">mlflow</span>
    <span class="exp-tag">snowflake</span>
    <span class="exp-tag">aws</span>
    <span class="exp-tag">airflow</span>
  </div>
</div>
```

- [ ] **Step 2: Replace the Northrop Grumman card in `index.html`**

Remove the entire `<!--Northrop Grumman-->` Bootstrap card block and replace it with:

```html
<!-- Northrop Grumman -->
<div class="exp-block">
  <div class="exp-header">
    <div class="exp-header-left">
      <div class="exp-company"><a href="https://www.northropgrumman.com/">Northrop Grumman</a></div>
      <div class="exp-roles">
        <span class="exp-role">Data Engineer</span> <span class="exp-date-inline">(May 2021–Mar 2022)</span>
        <span class="exp-sep"> · </span>
        <span class="exp-role">Data Engineering Intern</span> <span class="exp-date-inline">(May 2020–May 2021)</span>
      </div>
    </div>
    <div class="exp-date-range">2020 – 2022</div>
  </div>
  <ul class="arrow-list">
    <li>Engineered a JavaScript multi-source ETL pipeline to connect, aggregate and analyze data</li>
    <li>Designed frontend interface for a master data pipeline to derive insights from enterprise application data</li>
    <li>Developed an Ontology-driven ETL Orchestration tool used by 50+ developers using React</li>
    <li>Built scalable desktop applications using React, Node.js, TypeScript, and Electron</li>
    <li>Developed machine learning and graph database models for supply chain and maintenance forecasting to mitigate risk and reduce lifetime costs of advanced weapons systems</li>
    <li>Delivered valuable insights on large datasets using statistical analysis and MatPlotLib visualizations</li>
  </ul>
  <div class="row row-cols-6 mt-4 stack-icons remove-mobile">
    <div class="col"><img alt="python icon" src="pics/icons/python.png"><p>Python</p></div>
    <div class="col"><img alt="typescript icon" src="pics/icons/typescript.png"><p>TypeScript</p></div>
    <div class="col"><img alt="javascript icon" src="pics/icons/javascript.png"><p>JavaScript</p></div>
    <div class="col"><img alt="node.js icon" src="pics/icons/nodejs.png"><p>Node.js</p></div>
    <div class="col"><img alt="react icon" src="pics/icons/react.png"><p>React</p></div>
    <div class="col"><img alt="neo4j icon" src="pics/icons/neo4j.png"><p>Neo4j</p></div>
    <div class="col"><img alt="apollo icon" src="pics/icons/apollo.png"><p>Apollo</p></div>
    <div class="col"><img alt="graphql icon" src="pics/icons/graphql.png"><p>GraphQL</p></div>
    <div class="col"><img alt="mongodb icon" src="pics/icons/mongodb.png"><p>mongoDB</p></div>
    <div class="col"><img alt="mysql icon" src="pics/icons/mysql.png"><p>MySQL</p></div>
    <div class="col"><img alt="aws icon" src="pics/icons/aws.png"><p>AWS</p></div>
    <div class="col"><img alt="git icon" src="pics/icons/git.png"><p>Git</p></div>
  </div>
  <div class="exp-tags">
    <span class="exp-tag">python</span>
    <span class="exp-tag">javascript</span>
    <span class="exp-tag">typescript</span>
    <span class="exp-tag">react</span>
    <span class="exp-tag">node.js</span>
    <span class="exp-tag">neo4j</span>
    <span class="exp-tag">graphql</span>
    <span class="exp-tag">aws</span>
  </div>
</div>
```

- [ ] **Step 3: Add experience styles to `style.css` and remove old card rules**

Remove these old rules:

```css
#education .card, #experience .card {
  margin: auto auto 40px;
  border-radius: 10px;
}

#education h4, #experience h4 {
  color: black;
}

#education a, #experience a {
  text-decoration: none;
}

#education a:hover, #experience a:hover {
  text-decoration: underline;
}
```

Remove the `.bagel-bullets` rule:

```css
.bagel-bullets {
  list-style-image: url(pics/bagel-bullet.png);
  list-style-position: inside;
  text-align: left;
  list-style-type: circle;
}
```

Add new experience styles:

```css
.exp-block {
  border-left: 2px solid var(--color-border);
  padding-left: 20px;
  margin-bottom: 40px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
}

.exp-company {
  font-family: 'DM Mono', monospace;
  font-weight: 700;
  font-size: 15px;
  color: var(--color-text);
  margin-bottom: 4px;
}

.exp-company a {
  color: var(--color-text);
  text-decoration: none;
}

.exp-company a:hover {
  color: var(--color-accent);
}

.exp-roles {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.exp-role {
  color: var(--color-text-muted);
}

.exp-date-inline {
  color: var(--color-text-faint);
}

.exp-sep {
  color: var(--color-text-faint);
}

.exp-date-range {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: var(--color-text-faint);
  white-space: nowrap;
  flex-shrink: 0;
}

.arrow-list {
  list-style: none;
  padding: 0;
  margin-bottom: 16px;
}

.arrow-list li {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  color: var(--color-text);
  line-height: 1.6;
  text-align: left;
}

.arrow-list li::before {
  content: '→';
  color: var(--color-accent);
  flex-shrink: 0;
  font-family: 'DM Mono', monospace;
}

.exp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.exp-tag {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  padding: 2px 8px;
  border-radius: 2px;
}
```

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: replace experience cards with terminal left-bordered blocks"
```

---

## Task 9: Education section — left-bordered blocks with bagel bullets

**Goal:** Replace Bootstrap cards in `#education` with left-bordered blocks using `bagel-bullet-large.png` at 14px for coursework lists, with dark mode invert support.

**Files:**
- Modify: `index.html` (`#education` section content)
- Modify: `style.css` (add `.bagel-list` styles with dark mode filter; remove `.bubble-tags` rule)

**Acceptance Criteria:**
- [ ] Three `.exp-block` entries (UC Berkeley, U of Utah, Utah Tech) replace Bootstrap cards
- [ ] Same left-bordered block structure as experience
- [ ] Coursework lists use `<ul class="bagel-list">` with `pics/bagel-bullet-large.png` at 14×14px
- [ ] Light mode: bagel renders as-is (black on white)
- [ ] Dark mode: `filter: invert(1)` turns bagel white on dark background
- [ ] No white background box around bagel in dark mode (invert handles it)
- [ ] Old `.bubble-tags` CSS removed

**Verify:** Open `index.html` in both light and dark mode — education blocks with bagel bullets render correctly in both modes.

**Steps:**

- [ ] **Step 1: Replace the UC Berkeley card in `index.html`**

Remove the `<!-- Berkeley MIDS -->` Bootstrap card block and replace with:

```html
<!-- UC Berkeley -->
<div class="exp-block">
  <div class="exp-header">
    <div class="exp-header-left">
      <div class="exp-company"><a href="https://ischoolonline.berkeley.edu/data-science/">University of California, Berkeley</a></div>
      <div class="exp-roles">M.S. Information and Data Science</div>
    </div>
    <div class="exp-date-range">2024</div>
  </div>
  <p>The MIDS program at the Berkeley School of Information is recognized as one of the nation's top-tier data science programs. The program's focus on collaborative problem-solving has taught me how to form effective teams from a diverse set of individuals.</p>
  <ul class="bagel-list">
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Natural Language Processing</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Time Series and Panel Data Analysis</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Computer Vision</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Experiments and Causal Inference</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Machine Learning</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Data Engineering</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Statistics</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Research Design and Analysis</li>
  </ul>
</div>
```

- [ ] **Step 2: Replace the University of Utah card in `index.html`**

Remove the `<!-- University of Utah -->` Bootstrap card block and replace with:

```html
<!-- University of Utah -->
<div class="exp-block">
  <div class="exp-header">
    <div class="exp-header-left">
      <div class="exp-company"><a href="https://www.cs.utah.edu/">University of Utah</a></div>
      <div class="exp-roles">B.S. Computer Science</div>
    </div>
    <div class="exp-date-range">2021</div>
  </div>
  <p>Utah's preeminent research institution and where I first cut my teeth at software development. Despite the challenging curriculum I was able to thrive thanks to the help of my peers and professors who offered ample support.</p>
  <ul class="bagel-list">
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Algorithms</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Artificial Intelligence</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Data Visualization</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Operating Systems</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Database Systems</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Machine Learning</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">NLP</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Information Systems</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Computer Systems</li>
  </ul>
</div>
```

- [ ] **Step 3: Replace the Utah Tech University card in `index.html`**

Remove the `<!-- Utah Tech University -->` Bootstrap card block and replace with:

```html
<!-- Utah Tech University -->
<div class="exp-block">
  <div class="exp-header">
    <div class="exp-header-left">
      <div class="exp-company"><a href="https://utahtech.edu/">Utah Tech University</a></div>
      <div class="exp-roles">A.S. Computer Science</div>
    </div>
    <div class="exp-date-range">2018</div>
  </div>
  <p>Taking full advantage of the Success Academy Program I engaged in concurrent enrollment classes which allowed me to graduate high school with enough credits to attain my associate's degree at the age of 18. The supportive community and passionate professors ignited my love for computing.</p>
  <ul class="bagel-list">
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Data Structures</li>
    <li><img src="pics/bagel-bullet-large.png" alt="" width="14" height="14">Algorithms</li>
  </ul>
</div>
```

- [ ] **Step 4: Add bagel-list styles and remove bubble-tags from `style.css`**

Remove the old `.bubble-tags` rules:

```css
#education .bubble-tags li {
  background-color: #1d7ab7;
  color: white;
  -webkit-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#education .bubble-tags li:hover {
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}
```

```css
.bubble-tags {
  list-style: none;
}

.bubble-tags li {
  font-size: 80%;
  display: inline-block;
  padding: 0px 8px;
  margin: 10px 3px 3px;
  border-radius: 10px;
  backface-visibility: hidden;
}
```

Also remove from the 767px media query:

```css
.bubble-tags {
  padding: 0px;
}
```

Add bagel-list styles:

```css
.bagel-list {
  list-style: none;
  padding: 0;
  margin-top: 12px;
  margin-bottom: 0;
}

.bagel-list li {
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  color: var(--color-text);
  line-height: 1.75;
  margin-bottom: 4px;
  text-align: left;
}

.bagel-list img {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
}

[data-theme="dark"] .bagel-list img {
  filter: invert(1);
}
```

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: replace education cards with terminal blocks and bagel-list bullets"
```

---

## Task 10: Projects section — terminal card styling

**Goal:** Restyle project cards with the terminal aesthetic: `1px solid --color-border` border, DM Mono title, expanded description, and `↗ Link` text links replacing Bootstrap `.btn-primary` buttons.

**Files:**
- Modify: `index.html` (`#projects` cards — replace `class="btn btn-primary stretched-link"` with `class="card-link"` and `↗` prefix; add `class="card-img-top"` stays unchanged)
- Modify: `style.css` (update `#projects .card` styles, add `.card-link`)

**Acceptance Criteria:**
- [ ] All 5 project cards have `↗` text links instead of blue Bootstrap buttons
- [ ] Card borders use `1px solid var(--color-border)` with a subtle box-shadow
- [ ] Card titles in DM Mono bold 13px
- [ ] Card descriptions in Raleway 13px, no height constraint (text expands fully)
- [ ] Card images retained at top of each card, `max-height: 200px`, `object-fit: cover`
- [ ] Hover scale on card images still works
- [ ] Cards render correctly in dark mode (subtle bg, border visible)

**Verify:** Open `index.html` — project cards have the terminal look with text links; hovering a card image still scales it; dark mode shows dark card backgrounds.

**Steps:**

- [ ] **Step 1: Update all 5 project card links in `index.html`**

For Datadrip — replace:
```html
<a href="https://dianalnguyen.github.io/datadrip/" class="btn btn-primary stretched-link">Website</a>
```
With:
```html
<a href="https://dianalnguyen.github.io/datadrip/" class="card-link">↗ Website</a>
```

For Bank Document Verifier — replace:
```html
<a href="https://bdvapp.com/" class="btn btn-primary stretched-link">Demo</a>
```
With:
```html
<a href="https://bdvapp.com/" class="card-link">↗ Demo</a>
```

For Aye-Aye — replace:
```html
<a href="https://github.com/trevorjd3141/aye-aye" class="btn btn-primary stretched-link">Github Repo</a>
```
With:
```html
<a href="https://github.com/trevorjd3141/aye-aye" class="card-link">↗ GitHub</a>
```

For Personal Website — replace:
```html
<a href="https://github.com/trevorjd3141/personal-website" class="btn btn-primary stretched-link">Github Repo</a>
```
With:
```html
<a href="https://github.com/trevorjd3141/personal-website" class="card-link">↗ GitHub</a>
```

For ASCII Image Converter — replace:
```html
<a href="https://github.com/trevorjd3141/asciiConverter" class="btn btn-primary stretched-link">Github Repo</a>
```
With:
```html
<a href="https://github.com/trevorjd3141/asciiConverter" class="card-link">↗ GitHub</a>
```

- [ ] **Step 2: Update project card CSS in `style.css`**

Replace the existing `#projects` and `.projects-grid` related card rules with:

```css
#projects {
  padding: 150px 20%;
}

#projects .card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  background-color: var(--color-bg-subtle);
  overflow: hidden;
}

#projects .card-title {
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
}

#projects .card-text {
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin-bottom: 12px;
}

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

.card-link {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: var(--color-accent);
  text-decoration: none;
}

.card-link:hover {
  color: var(--color-accent-light);
  text-decoration: underline;
}
```

Also remove the global `.card` overflow rule (it was needed to clip the image scale; now scoped to `#projects .card`):

```css
.card {
  overflow: hidden;
}
```

- [ ] **Step 3: Commit**

```bash
git add index.html style.css
git commit -m "feat: restyle project cards with terminal aesthetic and text links"
```

---

## Task 11: Footer restyling

**Goal:** Update the footer with the `# reach out` terminal header and a `→ email` DM Mono text link replacing the Bootstrap button.

**Files:**
- Modify: `index.html` (footer content)
- Modify: `style.css` (footer styles using CSS vars)

**Acceptance Criteria:**
- [ ] Footer uses `# reach out` terminal section header (same `.section-header` markup)
- [ ] `→ trevorjd3141@gmail.com` text link replaces the Bootstrap "Send me an email" button
- [ ] Footer background is `#212529` on light mode, `#0d0f12` on dark mode
- [ ] Footer text and `#` / `.section-name` render in appropriate light colors on the dark footer background
- [ ] Copyright line below footer unchanged

**Verify:** Open `index.html` — footer shows terminal header and text email link; dark mode footer is slightly deeper than the page background.

**Steps:**

- [ ] **Step 1: Replace the footer content in `index.html`**

Replace the entire `<footer>` block:

```html
<footer>
  <div class="section-header footer-header">
    <span class="hash">#</span>
    <span class="section-name">reach out</span>
    <div class="section-rule footer-rule"></div>
  </div>
  <p>If you want to chat or have an opportunity for me, message me and I will get back to you as soon as I can.</p>
  <a href="mailto:trevorjd3141@gmail.com" class="footer-email">→ trevorjd3141@gmail.com</a>
</footer>
```

- [ ] **Step 2: Replace footer rules in `style.css`**

Replace the existing `footer` and `footer .title-separator`, `footer p` rules with:

```css
footer {
  padding: 60px 25%;
  background-color: #212529;
  color: rgba(255, 255, 255, 0.6);
  text-align: left;
  height: auto;
}

[data-theme="dark"] footer {
  background-color: #0d0f12;
}

.footer-header .hash,
.footer-header .section-name {
  color: #ffffff;
}

.footer-rule {
  background: rgba(255, 255, 255, 0.15);
}

footer p {
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 20px;
}

.footer-email {
  font-family: 'DM Mono', monospace;
  font-size: 14px;
  color: var(--color-accent-light);
  text-decoration: none;
}

.footer-email:hover {
  text-decoration: underline;
}
```

- [ ] **Step 3: Commit**

```bash
git add index.html style.css
git commit -m "feat: restyle footer with terminal header and email link"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by |
|---|---|
| CSS custom properties, no hardcoded hex | Task 2 |
| `[data-theme="dark"]` overrides | Task 2 |
| LocalStorage + OS preference detection | Task 2 |
| Navbar: brand, links, underline | Task 3 |
| Dark mode toggle pill | Task 3 |
| Hero: `$ whoami`, blinking cursor, CTA links | Task 4 |
| Remove parallax dividers | Task 5 |
| About: border, source link, separator | Task 6 |
| `# section-name` headers | Task 7 |
| Experience: left-bordered, `→` bullets, tags | Task 8 |
| Education: left-bordered, bagel bullets, dark invert | Task 9 |
| Projects: terminal cards, `↗` links | Task 10 |
| Footer: `# reach out`, `→ email` | Task 11 |
| Feature branch, no merge without sign-off | Task 1 |

**Placeholder scan:** No TBDs, no "similar to Task N" references, all code blocks complete.

**Type consistency:** `.exp-block` used consistently in Tasks 8 and 9. `.section-header` used in Tasks 7 and 11. `.card-link` introduced in Task 10 only. `.bagel-list` introduced in Task 9 only. No conflicts.
