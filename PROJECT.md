# Project State — Personal Website

## What this is
A static single-page portfolio site hosted on GitHub Pages at trevorjdalton.com.
It presents Trevor Dalton's experience, education, and projects in a résumé-style layout.

## Status — Live, maintained as-needed

### Current state
- Single `index.html` with sections: terminal hero (merged with about), Experience, Education, Projects.
- "Terminal Light" visual redesign complete — CSS custom properties, greyscale accent, dark mode toggle, DM Mono typography, terminal-style section headers and content blocks.
- Responsive via Bootstrap 5.3 grid; custom styles in `style.css`. No jQuery dependency.
- Contact in footer: `# reach out` terminal header and `→ mailto:` text link.
- Certifications linked in the experience section (AWS Cloud Practitioner, Neo4j Certified Professional).
- No resume PDF (removed previously; re-add if a current resume is available).
- Custom domain `trevorjdalton.com` via `CNAME` on GitHub Pages.

### Experience shown (most recent → oldest)
- M Science — Senior Data Engineer (Jan 2026 – present), Data Engineer (Mar 2022 – Dec 2025)
- Northrop Grumman — Data Engineer (May 2021 – March 2022)
- Northrop Grumman — Data Engineering Intern (May 2020 – May 2021)

### Education shown
- UC Berkeley — Master of Information and Data Science (2024)
- University of Utah — Bachelor of Computer Science (2021)
- Utah Tech University — Associate of Science (2018)

### Certifications
- AWS Cloud Practitioner (`assets/aws-cert.pdf`) -- linked in experience section
- Neo4j Certified Professional (`assets/neo4j-cert.pdf`) -- linked in experience section

## How to preview
Open `index.html` in any browser — no server needed for local preview.
No server needed — the contact section uses a `mailto:` link.

## Live site
https://trevorjdalton.com (GitHub Pages, auto-deploys from `master`)

## Immediate next steps
See `tickets/` for tracked work items.
