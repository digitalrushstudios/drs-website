---
name: project-drs-site
description: DRS HTML site structure, assets, design system, and deployment context
metadata:
  type: project
---

Digital Rush Studios static site at `/Users/sxc/Desktop/DRS HTML SIte/`. Hosted on Netlify.

**File structure:**
- `index.html` — main homepage (rebuilt May 2026)
- `style.css` — all styles (external file)
- `script.js` — all JS (external file)
- `free.html` — lead-capture page for free prompt pack (Kit/ConvertKit form)
- `Assets/Photos/DR_Logo1.png` — primary logo (root-relative path)
- `Assets/Photos/DRS_Logo_reveal.mp4` — hero background video
- `Assets/Fonts/ClashDisplay_Complete/Fonts/WEB/` — display font (ClashDisplay)
- `Assets/Fonts/Satoshi_Complete/Fonts/WEB/` — body font (Satoshi)

**Design system:**
- Cyan accent: `#01DDFE`
- Background: `#070709`, `#0d0d11`, `#111116`
- Display font: ClashDisplay (700/600/500) — loaded locally via @font-face
- Body font: Satoshi (300/400/500/700) — loaded locally via @font-face
- Previously used Sora/Montserrat from Google Fonts (now replaced)

**Key decisions:**
- Netlify Forms wired with `netlify` attribute + `name="intake"` + hidden `form-name` field
- Form uses AJAX submission via `fetch('/')` in script.js for smooth UX
- Portfolio uses real asset images from Assets/Photos/
- Marquee ticker duplicated (2× items) for seamless CSS-only loop animation

**Intake form fields:** name, email, phone, brand, project-type, budget, timeline, project-details, reference-links

**Why:** [[feedback-drs-brand]] Brand is premium, cinematic, editorial, dark, urban, tech-forward. Not SaaS, gaming, crypto, or generic AI startup.
