# Bootstrap 5 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the static portfolio site from Bootstrap 4.5 + jQuery to Bootstrap 5.3, removing jQuery entirely and updating all deprecated APIs.

**Architecture:** All changes are confined to two files — `index.html` and `style.css` — plus a one-line fix to `tickets/README.md`. No build step, no package manager. Each task produces a clean commit with grep-verifiable output.

**Tech Stack:** Plain HTML5, CSS3, Bootstrap 5.3.3 (CDN), Bootstrap Icons 1.13.1 (CDN).

**User decisions (already made):**
- "Use CSS column-count" for the Projects section layout (not Bootstrap row/grid).
- Commented-out archived cards (Clearhome, Flappy Bird, etc.) must NOT be removed — they are intentional archives.
- Smooth scroll replaced with `scroll-behavior: smooth` CSS (no JS).

---

### Task 1: Swap CDN links and remove IE shiv

**Goal:** Replace all Bootstrap 4 and jQuery CDN references in `<head>` with Bootstrap 5.3 equivalents and delete the IE shiv comment block.

**Files:**
- Modify: `index.html` (lines 10–13 IE shiv, lines 27–46 CDN scripts)

**Acceptance Criteria:**
- [ ] No reference to `bootstrap/4.5.0` anywhere in `index.html`
- [ ] No reference to `jquery` anywhere in `<head>`
- [ ] Bootstrap 5.3.3 CSS loaded from jsDelivr
- [ ] Bootstrap 5.3.3 JS bundle loaded from jsDelivr (single tag, replaces both jQuery + BS4 JS)
- [ ] Bootstrap Icons upgraded to 1.13.1
- [ ] IE shiv comment block is gone

**Verify:** `grep -n "bootstrap/4\|jquery\|html5shiv\|bootstrap-icons@1.4" index.html` → no output

**Steps:**

- [ ] **Step 1: Remove the IE shiv block**

Delete lines 10–13 (the `<!--Internet Explorer Shiv-->` comment and the conditional comment block):
```html
<!--Internet Explorer Shiv-->
<!--[if lt IE 9]>
        <script src="/js/html5shiv.js"></script>
    <![endif]-->
```
Remove these four lines entirely.

- [ ] **Step 2: Replace Bootstrap 4 CSS CDN**

Replace:
```html
<!--Bootstrap CSS CDN-->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
```
With:
```html
<!--Bootstrap CSS CDN-->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
```

- [ ] **Step 3: Upgrade Bootstrap Icons CDN**

Replace:
```html
<!--Bootstrap Icons CDN-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css">
```
With:
```html
<!--Bootstrap Icons CDN-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.css">
```

- [ ] **Step 4: Remove jQuery and replace Bootstrap 4 JS**

Remove:
```html
<!--jQuery-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!--Bootstrap jQuery CDN-->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
```
Replace with (single tag — the bundle includes Popper):
```html
<!--Bootstrap JS CDN-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

- [ ] **Step 5: Verify**

Run: `grep -n "bootstrap/4\|jquery\|html5shiv\|bootstrap-icons@1.4" index.html`
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "chore: upgrade Bootstrap 4→5 and Bootstrap Icons, remove jQuery from head, drop IE shiv"
```

---

### Task 2: Replace jQuery smooth scroll with CSS

**Goal:** Remove the jQuery smooth-scroll script block at the bottom of `<body>` and replace it with a single `scroll-behavior: smooth` CSS rule.

**Files:**
- Modify: `index.html` (bottom of `<body>`, the two `<script>` tags after `</main>`)
- Modify: `style.css` (add one rule)

**Acceptance Criteria:**
- [ ] No jQuery CDN reference anywhere in `index.html`
- [ ] No `$('a[href^="#"]')` script block in `index.html`
- [ ] `html { scroll-behavior: smooth; }` present in `style.css`
- [ ] Clicking a nav link still smooth-scrolls to the target section

**Verify:** `grep -n "jquery\|scrollTop\|\\.animate" index.html` → no output

**Steps:**

- [ ] **Step 1: Remove the jQuery scroll block from the bottom of `<body>`**

Find and delete these lines (just before `<footer>`):
```html
<!--Script for scrolling in middle so it doesn't affect footer-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
<script>
	$('a[href^="#"]').on('click', function(event) {
	    var target = $(this.getAttribute('href'));
	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').stop().animate({
	            scrollTop: target.offset().top
	        }, 1000);
	    }
	});
</script>
```
Remove all of the above — comment line and both script tags.

- [ ] **Step 2: Add CSS smooth scroll to `style.css`**

Add at the very top of `style.css`, before any other rules:
```css
html {
	scroll-behavior: smooth;
}
```

- [ ] **Step 3: Verify**

Run: `grep -n "jquery\|scrollTop\|\.animate" index.html`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "chore: replace jQuery smooth scroll with CSS scroll-behavior"
```

---

### Task 3: Migrate Bootstrap 4 data attributes to Bootstrap 5

**Goal:** Update all `data-toggle`, `data-target`, `data-spy`, and `data-offset` attributes to their Bootstrap 5 `data-bs-*` equivalents.

**Files:**
- Modify: `index.html` (navbar toggler button, `<body>` tag)

**Acceptance Criteria:**
- [ ] No `data-toggle` attribute anywhere in `index.html`
- [ ] No `data-spy` attribute anywhere in `index.html`
- [ ] Navbar mobile toggle works (collapse/expand on small screens)
- [ ] Scrollspy highlights the correct nav link as user scrolls

**Verify:** `grep -n "data-toggle\|data-spy\b\|data-offset" index.html` → no output

**Steps:**

- [ ] **Step 1: Update the navbar toggler button**

Find:
```html
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#pill-target" aria-controls="pill-target" aria-expanded="false" aria-label="Toggle navigation">
```
Replace with:
```html
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#pill-target" aria-controls="pill-target" aria-expanded="false" aria-label="Toggle navigation">
```

- [ ] **Step 2: Update the scrollspy on `<body>`**

Find:
```html
<body data-spy="scroll" data-target="#my-nav" data-offset="10">
```
Replace with:
```html
<body data-bs-spy="scroll" data-bs-target="#my-nav" data-bs-offset="10">
```

- [ ] **Step 3: Verify**

Run: `grep -n "data-toggle\|data-spy\b\|data-offset" index.html`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "chore: migrate Bootstrap 4 data-* attributes to data-bs-* for Bootstrap 5"
```

---

### Task 4: Replace card-columns with projects-grid layout

**Goal:** Replace the removed-in-Bootstrap-5 `card-columns` class with a custom `projects-grid` class using CSS `column-count`.

**Files:**
- Modify: `index.html` (Projects section container div)
- Modify: `style.css` (replace `card-columns` rules, add `projects-grid` default)

**Acceptance Criteria:**
- [ ] No `card-columns` class anywhere in `index.html`
- [ ] No `card-columns` rule anywhere in `style.css`
- [ ] `.projects-grid` has `column-count: 3` at default (desktop) breakpoint
- [ ] `.projects-grid` has `column-count: 2` inside the `max-width: 1300px` media query
- [ ] Project cards render in a multi-column masonry layout on desktop

**Verify:** `grep -n "card-columns" index.html style.css` → no output

**Steps:**

- [ ] **Step 1: Update the Projects container in `index.html`**

Find:
```html
<div class="card-columns">
```
Replace with:
```html
<div class="projects-grid">
```

- [ ] **Step 2: Add default `.projects-grid` rule to `style.css`**

In `style.css`, find the `#projects .card:hover img` rule block (around line 119). After it, add:
```css
.projects-grid {
	column-count: 3;
	column-gap: 1.25rem;
}

.projects-grid .card {
	break-inside: avoid;
	margin-bottom: 1.25rem;
}
```
The `break-inside: avoid` prevents a card from being split across two columns.

- [ ] **Step 3: Replace the card-columns rule in the media query**

In `style.css`, inside the `@media only screen and (max-width: 1300px)` block, find:
```css
.card-columns {
    column-count: 2;
}
```
Replace with:
```css
.projects-grid {
	column-count: 2;
}
```

- [ ] **Step 4: Verify**

Run: `grep -n "card-columns" index.html style.css`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "chore: replace card-columns with projects-grid CSS column layout for Bootstrap 5"
```

---

### Task 5: Fix tickets README and move ticket to completed

**Goal:** Mark `refresh-about-content` as done in the tickets index, and move `upgrade-bootstrap-5` to `completed/` once all prior tasks pass.

**Files:**
- Modify: `tickets/README.md`
- Move: `tickets/in-progress/upgrade-bootstrap-5.md` → `tickets/completed/upgrade-bootstrap-5.md`

**Acceptance Criteria:**
- [ ] `refresh-about-content` checkbox is `[x]` in `tickets/README.md`
- [ ] `upgrade-bootstrap-5` checkbox is `[x]` in `tickets/README.md`
- [ ] `tickets/in-progress/` directory is empty (or the file is gone)
- [ ] `tickets/completed/upgrade-bootstrap-5.md` exists

**Verify:** `grep "\[ \]" tickets/README.md` → only lines for remaining open tickets (items 3 and 4)

**Steps:**

- [ ] **Step 1: Update `tickets/README.md`**

Change:
```markdown
1. [ ] [refresh-about-content.md](backlog/refresh-about-content.md) — update bio, current role, reading list; remove resume link
```
To:
```markdown
1. [x] [refresh-about-content.md](completed/refresh-about-content.md) — update bio, current role, reading list; remove resume link
```

And change:
```markdown
2. [ ] [upgrade-bootstrap-5.md](backlog/upgrade-bootstrap-5.md) — migrate from Bootstrap 4 + jQuery to Bootstrap 5; clean up dead code
```
To:
```markdown
2. [x] [upgrade-bootstrap-5.md](completed/upgrade-bootstrap-5.md) — migrate from Bootstrap 4 + jQuery to Bootstrap 5; clean up dead code
```

- [ ] **Step 2: Move ticket file**

```bash
git mv tickets/in-progress/upgrade-bootstrap-5.md tickets/completed/upgrade-bootstrap-5.md
```

- [ ] **Step 3: Verify**

Run: `grep "\[ \]" tickets/README.md`
Expected: only items 3 (`replace-contact-form`) and 4 (`visual-redesign`) are unchecked.

- [ ] **Step 4: Commit**

```bash
git add tickets/README.md tickets/completed/upgrade-bootstrap-5.md
git commit -m "chore: close upgrade-bootstrap-5 ticket, fix refresh-about-content checkbox in README"
```
