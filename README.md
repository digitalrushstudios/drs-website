# Digital Rush Studios — Website

Static HTML/CSS/JS site hosted on Netlify.

---

## Folder Structure

```
/
├── index.html               # Homepage (inline CSS + JS — no external stylesheet)
├── 404.html                 # 404 error page
├── thank-you.html           # Post-form submission confirmation
├── privacy.html             # Privacy policy
├── terms.html               # Terms of use
├── free.html                # Standalone lead capture (noindex, inline CSS)
├── offer.html               # Standalone character order page (noindex, inline CSS)
├── favicon.svg              # Primary favicon
├── favicon.png              # PWA icon (192x192 + 512x512)
├── og-image.png             # Open Graph share image
├── robots.txt               # Allow all, sitemap pointer
├── sitemap.xml              # 5 canonical URLs
├── site.webmanifest         # PWA manifest
├── _redirects               # Netlify redirects (old URLs to new /pages/ URLs)
│
├── pages/                   # Secondary content pages
│   ├── case-studies.html
│   └── creative-lab.html
│
├── styles/
│   ├── main.css             # All component styles, fonts, variables, layout
│   ├── animations.css       # @keyframes only
│   └── responsive.css       # All @media breakpoints
│
├── scripts/
│   ├── main.js              # Nav, mobile menu, smooth scroll, scroll reveal, active nav, Netlify form
│   ├── motion.js            # Custom cursor, portfolio card glow, stats counter
│   └── interactions.js      # Lightbox, package card pre-select
│
├── assets/
│   ├── images/
│   │   ├── branding/        # drs-logo-primary.png, drs-logo-mark.svg
│   │   ├── portfolio/       # Project artwork
│   │   ├── freebies/        # Freebie cover images (coming soon)
│   │   ├── motion/          # Motion/animation stills (future)
│   │   ├── ui/              # UI element images (future)
│   │   ├── backgrounds/
│   │   ├── social/
│   │   └── products/
│   └── fonts/
│       ├── ClashDisplay_Complete/
│       └── Satoshi_Complete/
│
├── videos/
│   ├── logo-reveals/        # drs-logo-reveal.mp4
│   └── background-loops/    # (future)
│
├── documents/
│   ├── freebies/            # drs-ai-design-prompt-starter-kit.pdf (others coming soon)
│   └── premium-products/    # (future paid products)
│
└── archive/                 # Unreferenced images kept for reference
```

---

## Pages

| File | URL | Notes |
|---|---|---|
| index.html | / | Homepage. Inline CSS + JS. |
| pages/case-studies.html | /pages/case-studies.html | Redirects from /case-studies.html |
| pages/creative-lab.html | /pages/creative-lab.html | Redirects from /creative-lab.html |
| thank-you.html | /thank-you.html | Form submission confirmation |
| privacy.html | /privacy.html | Privacy policy |
| terms.html | /terms.html | Terms of use |
| 404.html | /404.html | Netlify 404 handler |
| free.html | /free.html | Standalone lead capture (noindex) |
| offer.html | /offer.html | Character order page (noindex) |

---

## Stylesheet Load Order

Root pages: styles/main.css, styles/animations.css, styles/responsive.css
Pages in /pages/: ../styles/main.css, ../styles/animations.css, ../styles/responsive.css
index.html, free.html, offer.html use inline CSS.

---

## Script Load Order

Root pages: scripts/main.js, scripts/motion.js, scripts/interactions.js
Pages in /pages/: ../scripts/main.js, ../scripts/motion.js, ../scripts/interactions.js
index.html, free.html, offer.html use inline JS.

---

## Netlify Forms

| Form ID | Name | File |
|---|---|---|
| intakeForm | intake | index.html |
| creative-lab | creative-lab | pages/creative-lab.html |
| character-order | character-order | offer.html |

All forms: data-netlify="true", honeypot bot-field.

---

## Netlify Redirects

/creative-lab.html  ->  /pages/creative-lab.html  301
/case-studies.html  ->  /pages/case-studies.html  301

---

## Missing / Coming Soon Assets

Freebie cover images (assets/images/freebies/): 5 placeholder images not yet created.
Freebie PDFs (documents/freebies/): 5 PDFs not yet created (only starter kit exists).

---

## Notes

- index.html has all CSS and JS inline — intentional
- macOS is case-insensitive; Netlify (Linux) is case-sensitive — always use exact lowercase paths
- Font paths in styles/main.css use ../assets/fonts/ (one level up from styles/)
- Font paths in free.html and offer.html use assets/fonts/ (root-relative)
