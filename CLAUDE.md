@AGENTS.md

# Project Overview
Personal portfolio website for Trevor Dalton — a static single-page site that
serves as an online resume showcasing experience, education, projects, and skills.
Hosted on GitHub Pages at trevorjdalton.com.

# Goals
- Present a clean, professional portfolio for job marketing and networking.
- Keep the content current: experience, education, projects, and resume PDF.
- Maintain fast load times and mobile responsiveness.

# Tech Stack
- Plain HTML5 / CSS3 / vanilla JavaScript — no build step
- Bootstrap 4.5 (CSS + JS via CDN) for layout and responsive grid
- Bootstrap Icons 1.4.1 (CDN) and Font Awesome for icons
- jQuery 3.5.1 (CDN) — required by Bootstrap 4 JS
- Google Fonts (Open Sans, Raleway, DM Mono)
- FCF (Free Contact Form) — PHP-based contact form in `fcf-assets/`
- GitHub Pages for hosting; custom domain via `CNAME`

# Setup & Environment
- No build step; open `index.html` directly in a browser for local preview.
- Live site: https://trevorjdalton.com
- To update resume: replace `assets/trevor_dalton_resume.pdf`.
- CDN dependencies; no `npm install` needed.

# File Layout
```
index.html          # Single page — all sections live here
style.css           # Custom styles
assets/             # PDFs (resume, certs)
pics/               # Images: headshot, project cards, icons, dividers
fcf-assets/         # Contact form PHP + CSS + JS
CNAME               # GitHub Pages custom domain
```

# Coding Standards
- Keep all content in `index.html`; avoid splitting into multiple HTML files.
- Custom CSS goes in `style.css` only — no inline styles.
- Use Bootstrap grid classes for layout; add custom CSS only when Bootstrap
  doesn't cover it.
- Images in `pics/cardPics/` for project cards; `pics/icons/` for stack icons.
- Prefer descriptive `alt` text on all images.
- No JavaScript frameworks — jQuery is only present because Bootstrap 4 needs it.

# Content Update Rules
- **Experience:** update the card copy and period text in `index.html`.
- **Projects:** add a new card in the `#projects` section; add a card image to
  `pics/cardPics/`.
- **Resume:** replace `assets/trevor_dalton_resume.pdf` (filename stays the same
  so the link doesn't break).
- **Skills/icons:** add new stack icon PNGs to `pics/icons/`.

# Current Priorities
- Keep experience section up to date with current role and responsibilities.
- Refresh project cards as new projects are completed.
See `tickets/` for tracked work items.
