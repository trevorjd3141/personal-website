# Mobile Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add scroll-snap full-viewport sections, a fixed mobile topbar with two states (brand on hero / nameplate off-hero), and a B1a-style fixed bottom nav — all scoped to `@media (max-width: 767px)` so desktop is untouched.

**Architecture:** Two new HTML elements (`.mobile-topbar`, `.mobile-bottom-nav`) are added alongside the existing `<nav id="my-nav">` which is hidden on mobile via CSS. An IntersectionObserver drives all state changes (topbar swap via `body.off-hero`, bottom nav `.active` class). All CSS lives in a new `@media (max-width: 767px)` block appended to `style.css`.

**Tech Stack:** Plain HTML5, CSS3, vanilla JS — no build step, no npm, no frameworks. Bootstrap 5.3.3 via CDN (desktop nav, grid).

**User decisions (already made):**
- "No resume link anywhere" — not in the hero CTA, not in the topbar, not anywhere.
- Chosen design is Version 2: scroll-snap + B1a bottom nav + collapsing nameplate topbar.
- Desktop layout is completely untouched.
- Theme toggle is duplicated in `.mobile-topbar`; original in `#my-nav` is hidden on mobile.

---

## File Map

| File | What changes |
|------|-------------|
| `index.html` | Add `.mobile-topbar` (before `<nav>`), `.mobile-bottom-nav` (after `</main>`), update theme-toggle JS block, append IntersectionObserver JS block |
| `style.css` | Add `.mobile-topbar, .mobile-bottom-nav { display: none }` to base styles; append new `@media (max-width: 767px)` block with all mobile layout rules |

---

### Task 1: Create feature branch

**Goal:** Establish the working branch so no changes land on `main` unreviewed.

**Files:**
- No file changes.

**Acceptance Criteria:**
- [ ] Branch `feature/mobile-layout-redesign` exists and is checked out.
- [ ] `git status` shows clean working tree on the new branch.

**Verify:** `git branch --show-current` → `feature/mobile-layout-redesign`

**Steps:**

- [ ] **Step 1: Create and switch to branch**

```bash
git checkout -b feature/mobile-layout-redesign
```

Expected: `Switched to a new branch 'feature/mobile-layout-redesign'`

- [ ] **Step 2: Confirm clean state**

```bash
git status
```

Expected: `nothing to commit, working tree clean`

---

### Task 2: Add mobile HTML elements

**Goal:** Insert `.mobile-topbar` and `.mobile-bottom-nav` into `index.html` and add base CSS to hide them on desktop.

**Files:**
- Modify: `index.html` — add two new HTML blocks
- Modify: `style.css` — add base `display: none` rule for both new elements

**Acceptance Criteria:**
- [ ] `.mobile-topbar` is present in the DOM immediately before `<nav id="my-nav">`.
- [ ] `.mobile-topbar` contains two child divs: `.mobile-topbar-brand` and `.mobile-topbar-nameplate`, each with a `.theme-toggle` button.
- [ ] `.mobile-bottom-nav` is present in the DOM immediately after `</main>`.
- [ ] `.mobile-bottom-nav` contains three `<a>` elements with `data-section` attributes for `experience`, `education`, `projects`.
- [ ] Both elements have `display: none` in the base (non-mobile) CSS.

**Verify:** Open `index.html` in a desktop browser → neither element is visible. Inspect DOM → both elements are present.

**Steps:**

- [ ] **Step 1: Add `.mobile-topbar` to `index.html`**

In `index.html`, directly before line 67 (`<nav id="my-nav" ...>`), insert:

```html
<!-- Mobile top bar (hidden on desktop; shown at ≤767px) -->
<div class="mobile-topbar" id="mobile-topbar">
  <!-- State 1: hero screen — shows brand -->
  <div class="mobile-topbar-brand">
    <span class="mobile-brand-text">~/trevordalton</span>
    <button class="theme-toggle" id="mobile-theme-toggle" aria-label="Toggle dark mode">☾ dark</button>
  </div>
  <!-- State 2: off-hero screens — shows nameplate -->
  <div class="mobile-topbar-nameplate">
    <div class="mobile-nameplate-left">
      <div class="mobile-nameplate-name">Trevor Dalton</div>
      <div class="mobile-nameplate-role">// Senior Data Engineer</div>
    </div>
    <button class="theme-toggle" id="mobile-theme-toggle-nameplate" aria-label="Toggle dark mode">☾ dark</button>
  </div>
</div>
```

- [ ] **Step 2: Add `.mobile-bottom-nav` to `index.html`**

In `index.html`, directly after `</main>` (line 351) and before `<footer>`, insert:

```html
<!-- Mobile bottom nav (hidden on desktop; shown at ≤767px) -->
<nav class="mobile-bottom-nav" aria-label="Page sections">
  <a href="#experience" class="mobile-nav-item" data-section="experience">
    <div class="mobile-nav-indicator"></div>
    <span>experience</span>
  </a>
  <a href="#education" class="mobile-nav-item" data-section="education">
    <div class="mobile-nav-indicator"></div>
    <span>education</span>
  </a>
  <a href="#projects" class="mobile-nav-item" data-section="projects">
    <div class="mobile-nav-indicator"></div>
    <span>projects</span>
  </a>
</nav>
```

- [ ] **Step 3: Add base display:none rule to `style.css`**

In `style.css`, add after the `.theme-toggle:hover` rule block (around line 136), before `.section-header`:

```css
.mobile-topbar,
.mobile-bottom-nav {
  display: none;
}
```

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add mobile-topbar and mobile-bottom-nav HTML elements

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: Add mobile CSS

**Goal:** Write all `@media (max-width: 767px)` rules for scroll-snap, the mobile topbar, and the B1a bottom nav.

**Files:**
- Modify: `style.css` — append new `@media (max-width: 767px)` block

**Acceptance Criteria:**
- [ ] On a 375px viewport (Chrome DevTools mobile emulation), `#my-nav` is not visible.
- [ ] `.mobile-topbar` is visible and fixed at the top; height 48px.
- [ ] On hero screen (default state), `.mobile-topbar-brand` is shown, `.mobile-topbar-nameplate` is hidden.
- [ ] On off-hero (`.body.off-hero` added via DevTools), `.mobile-topbar-nameplate` is shown, `.mobile-topbar-brand` is hidden.
- [ ] `.mobile-bottom-nav` is visible and fixed at the bottom; height 48px.
- [ ] Bottom nav items show muted grey text; `.active` class on an item shows the indicator line above the label and bright text.
- [ ] Each `section` and `#hero` has `min-height: 100dvh` and `scroll-snap-align: start`.
- [ ] `html` has `scroll-snap-type: y mandatory` on mobile.

**Verify:** Chrome DevTools → Responsive → 375×812 → scroll page → sections snap into view; topbar and bottom nav remain fixed.

**Steps:**

- [ ] **Step 1: Append mobile CSS block to `style.css`**

Add the following block at the **end** of `style.css`, after the existing `@media (max-width: 767px)` block:

```css
/* ── Mobile Layout Redesign (≤767px) ───────────────────── */
@media (max-width: 767px) {

  /* Scroll snap */
  html {
    scroll-snap-type: y mandatory;
  }

  #hero,
  section {
    scroll-snap-align: start;
    min-height: 100dvh;
    box-sizing: border-box;
  }

  /* Hide desktop nav */
  #my-nav {
    display: none !important;
  }

  /* ── Mobile topbar ── */
  .mobile-topbar {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 48px;
    padding: 0 16px;
    background-color: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    align-items: center;
    font-family: 'DM Mono', monospace;
  }

  .mobile-topbar-brand {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .mobile-brand-text {
    font-size: 13px;
    color: var(--color-text);
  }

  .mobile-topbar-nameplate {
    display: none;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  body.off-hero .mobile-topbar-brand {
    display: none;
  }

  body.off-hero .mobile-topbar-nameplate {
    display: flex;
  }

  .mobile-nameplate-name {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: var(--color-text);
    line-height: 1.2;
  }

  .mobile-nameplate-role {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--color-text-muted);
  }

  .mobile-topbar .theme-toggle {
    margin-left: 0;
    flex-shrink: 0;
  }

  /* Adjust section top padding to clear the 48px fixed topbar */
  #hero {
    padding-top: 72px;
  }

  section {
    padding-top: 68px;
    padding-bottom: 64px;
  }

  /* ── Mobile bottom nav ── */
  .mobile-bottom-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 48px;
    background-color: var(--color-bg);
    border-top: 1px solid var(--color-border);
  }

  .mobile-nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 8px;
    gap: 4px;
    text-decoration: none;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--color-text-muted);
    -webkit-tap-highlight-color: transparent;
  }

  .mobile-nav-item:visited {
    color: var(--color-text-muted);
  }

  .mobile-nav-item.active {
    color: var(--color-text);
  }

  .mobile-nav-indicator {
    width: 20px;
    height: 2px;
    background-color: var(--color-accent);
    border-radius: 1px;
    opacity: 0;
    transition: opacity 0.15s;
  }

  .mobile-nav-item.active .mobile-nav-indicator {
    opacity: 1;
  }
}
```

- [ ] **Step 2: Verify in DevTools**

Open `index.html` in Chrome. Open DevTools, toggle to responsive/mobile view at 375px width.

Expected:
- Desktop nav gone
- Mobile topbar fixed at top, shows `~/trevordalton` + theme toggle
- Mobile bottom nav fixed at bottom, shows 3 muted labels
- Scrolling snaps between sections

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat: add mobile layout CSS — scroll-snap, topbar, B1a bottom nav

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: Add mobile JavaScript

**Goal:** Wire up the IntersectionObserver (section tracking → topbar state + bottom nav active) and update the theme toggle JS to sync all `.theme-toggle` buttons.

**Files:**
- Modify: `index.html` — replace existing theme-toggle JS block; append IntersectionObserver block

**Acceptance Criteria:**
- [ ] Clicking any `.theme-toggle` button (desktop nav or either mobile topbar button) changes the theme and syncs the label on all three buttons.
- [ ] Scrolling to hero → `body.off-hero` is absent; bottom nav has no active item.
- [ ] Scrolling to experience → `body.off-hero` is present; `[data-section="experience"]` has class `active`.
- [ ] Scrolling to education → `[data-section="education"]` has class `active`; experience loses it.
- [ ] Scrolling to projects → `[data-section="projects"]` has class `active`.
- [ ] Resizing to >767px → `body.off-hero` removed, all `.active` classes removed, observer disconnected.

**Verify:** Chrome DevTools → mobile emulation 375px → scroll through all sections and confirm topbar state and active nav item update correctly on each snap.

**Steps:**

- [ ] **Step 1: Replace the theme-toggle JS block in `index.html`**

The current theme-toggle block (lines 369–385) is:

```html
<script>
  (function() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
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
```

Replace it with:

```html
<script>
  (function() {
    var html = document.documentElement;
    function updateAllToggles() {
      var isDark = html.getAttribute('data-theme') === 'dark';
      var label = isDark ? '☀ light' : '☾ dark';
      document.querySelectorAll('.theme-toggle').forEach(function(btn) {
        btn.textContent = label;
      });
    }
    updateAllToggles();
    document.querySelectorAll('.theme-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateAllToggles();
      });
    });
  })();
```

- [ ] **Step 2: Append IntersectionObserver block before `</script>` close of last script tag**

After the existing smooth-scroll block (around line 441, just before the final `</script>`), add:

```js
  (function() {
    var sectionIds = ['hero', 'experience', 'education', 'projects'];
    var sections = sectionIds.map(function(id) {
      return document.getElementById(id);
    }).filter(Boolean);
    var navItems = document.querySelectorAll('.mobile-nav-item');
    var body = document.body;
    var observer = null;
    var ratios = {};

    function setActive(id) {
      body.classList.toggle('off-hero', id !== 'hero');
      navItems.forEach(function(item) {
        item.classList.toggle('active', item.dataset.section === id);
      });
    }

    function teardown() {
      if (observer) { observer.disconnect(); observer = null; }
      body.classList.remove('off-hero');
      navItems.forEach(function(item) { item.classList.remove('active'); });
      ratios = {};
    }

    function setup() {
      ratios = {};
      observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) { ratios[e.target.id] = e.intersectionRatio; });
        var best = sections.reduce(function(a, b) {
          return (ratios[b.id] || 0) > (ratios[a.id] || 0) ? b : a;
        });
        setActive(best.id);
      }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });
      sections.forEach(function(s) { observer.observe(s); });
    }

    function onResize() {
      if (window.innerWidth <= 767) {
        if (!observer) setup();
      } else {
        teardown();
      }
    }

    onResize();
    window.addEventListener('resize', onResize, { passive: true });
  })();
```

- [ ] **Step 3: Test in DevTools — scroll through all sections**

Open `index.html` in Chrome, enable mobile emulation at 375px.

1. Default view (hero): topbar shows `~/trevordalton`, no active bottom nav item.
2. Scroll down to experience: topbar shows nameplate (Trevor Dalton / // Senior Data Engineer), `experience` label is bright with indicator line.
3. Scroll to education: `education` is active, experience is not.
4. Scroll to projects: `projects` is active.
5. Click dark/light toggle: all three toggle buttons update their label simultaneously.
6. Resize to 1200px: `body.off-hero` absent, no `.active` classes, desktop nav reappears.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add IntersectionObserver mobile nav and sync theme toggle

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: Merge to main

**Goal:** Merge the completed feature branch into `main` per the project's default merge strategy.

**Files:**
- No file changes — git operation only.

**Acceptance Criteria:**
- [ ] Branch `feature/mobile-layout-redesign` is merged into `main`.
- [ ] `main` contains all three commits from this feature branch.
- [ ] Feature branch is deleted.

**Verify:** `git log main --oneline -5` → shows the three feature commits.

**Steps:**

- [ ] **Step 1: Switch to main and merge**

```bash
git checkout main
git merge feature/mobile-layout-redesign
```

Expected: fast-forward or merge commit message.

- [ ] **Step 2: Delete the feature branch**

```bash
git branch -d feature/mobile-layout-redesign
```

- [ ] **Step 3: Confirm**

```bash
git log --oneline -5
```

Expected: three commits from this plan appear at the top.

- [ ] **Step 4: Move ticket to completed**

Move `tickets/in-progress/<mobile-redesign-ticket>.md` to `tickets/completed/`.
