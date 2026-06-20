# Visual redesign

## Context
The site's design had accumulated organically since 2018. This ticket delivers a
ground-up visual redesign under the "Terminal Light" aesthetic: single-column doc
style, DM Mono for structural elements, Raleway for body copy, full dark mode via
CSS custom properties.

Work happens on `feature/visual-redesign`. Nothing merges to `master` without
explicit user sign-off.

## Design decisions (locked in)
- Terminal Light aesthetic: monospace headers/labels, Raleway body copy
- CSS custom properties (`--color-*`) on `:root` (light) and `[data-theme="dark"]` (dark)
- Dark mode toggle pill in navbar; localStorage persistence; prefers-color-scheme default
- Electric cyan accent (`#0096c7` / `#00b4d8`), near-black dark bg (`#111318`)
- `$ whoami` terminal hero with blinking CSS cursor (thin 2px bar)
- `# section-name` terminal headers on all content sections (including about)
- Left-bordered `.exp-block` layout for experience and education
- `→` arrow bullets (experience), bagel bullets (education)
- DM Mono tech tags replacing stack icon grids in experience
- `↗` text links replacing Bootstrap buttons throughout
- Resume removed from site: PDF deleted, link removed from hero
- About section: terminal block layout with text links replacing Bootstrap icons
- Social/nav links in `--color-accent`, not Bootstrap default blue
- Copyright in DM Mono
- Custom ease-out scroll (750ms cubic, JS-driven) replacing CSS smooth scroll
- Section dividers: 2px

## What has been done
### Phase 1 (initial implementation)
All 11 original plan tasks completed on `feature/visual-redesign`:
- CSS custom properties + dark mode infrastructure
- Navbar: `~/trevordalton` brand, DM Mono links, dark mode toggle
- `$ whoami` terminal hero (replaced parallax)
- Parallax photo dividers removed
- About section restyled (initial pass)
- `# section-name` terminal headers
- Experience: left-bordered blocks, arrow bullets, tech tags
- Education: left-bordered blocks, bagel bullets
- Projects: terminal card styling, `↗` text links
- Footer: `# reach out` header, `→ email` link

### Phase 2 (polish pass)
Fixes from first visual review:
- Toggle button fixed width (`min-width: 76px`) so it doesn't shift size on click
- Section padding reduced (`150px` → `60px`) — sections were spaced too far apart
- Section rule thickness increased to `2px`
- Copyright restyle: DM Mono 11px, `--color-text-faint`
- Experience stack icon grids removed; tag boxes are the sole skill representation
- Social links (LinkedIn, GitHub, Instagram) replaced with DM Mono text links
- About section fully restyled as terminal block with `# about` header, flexbox
  layout (bio text + circular headshot), and DM Mono text links
- Hero cursor changed from `█` block character to thin 2px CSS bar
- Subtitle simplified: `// Senior Data Engineer · AI/ML · LLMs` → `// Senior Data Engineer`
- Hero bio reworded to remove duplicate "Senior Data Engineer" opener
- About bio reworded to remove duplicate "Senior Data Engineer" reference
- Resume PDF deleted (`assets/trevor_dalton_resume.pdf`); `↗ Resume PDF` link
  removed from hero CTA
- Custom JS scroll: 750ms cubic ease-out, respects prefers-reduced-motion

## Acceptance criteria
- [ ] All sections cohesive Terminal Light aesthetic
- [ ] Dark mode works in all sections; toggle persists across refresh
- [ ] No resume links or PDF asset remain
- [ ] About section matches terminal aesthetic of other sections
- [ ] Desktop and mobile layouts correct
- [ ] Merge to `master` approved by user after visual review

## Dependencies
- Depends on Bootstrap 5 upgrade (completed)
