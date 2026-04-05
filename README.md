# Al Raedon — Trading & Logistics Landing Page

<div align="center">
  <img src="./public/assets/Logo/logo-v.png" alt="Al Raedon Logo" width="120" />
  <br /><br />
  <p>
    A production-grade, bilingual (EN / AR) landing page for <strong>Al Raedon Trading & Logistics Services</strong> — an Egyptian company providing integrated logistics, trading, agricultural production, and import/export solutions.
  </p>

  ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)
  ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)
  ![Ant Design](https://img.shields.io/badge/Ant%20Design-5-0170FE?logo=antdesign&logoColor=white&style=flat-square)
  ![i18next](https://img.shields.io/badge/i18next-bilingual-26A69A?style=flat-square)
</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment & Configuration](#environment--configuration)
- [Internationalization (i18n)](#internationalization-i18n)
- [Design System](#design-system)
- [Components](#components)
- [Assets](#assets)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

This is a **frontend-only** React + TypeScript landing page. It is fully static — no backend, no authentication, no database. All content is driven by translation JSON files, making it straightforward to update copy without touching component code.

The page is built with a **luxury & refined** aesthetic: deep navy (`#1B2A4A`) as the primary brand color, warm gold (`#C9A84C`) as the accent, and a mix of light and dark sections to create visual rhythm as the user scrolls.

---

## Features

- **Bilingual** — Full English and Arabic support with a single click, including automatic RTL layout switching
- **Animated Hero** — Canvas-based background with moving trucks, cargo containers, a ship, a tractor, wheat fields, floating grain particles, radar rings, and location pins — all drawn at 60fps
- **Scroll Animations** — Elements fade up into view using `IntersectionObserver` (no animation library required)
- **Adaptive Navbar** — Transparent/light on the bright hero section, transitions to dark navy as the user scrolls into dark sections
- **Floating NavDots** — Fixed bottom-left navigation buttons to jump to the top or bottom of the page
- **6 Service Cards** — Warehouse, Transport, Consulting, Trading, Agricultural Production, Import & Export — each with a custom thin-stroke SVG icon
- **Fully Responsive** — Mobile-first layouts across all sections and breakpoints
- **Professional Arabic Typography** — Uses `Noto Kufi Arabic` for Arabic, which auto-activates on language switch
- **Favicon with cache-busting** — Light/dark mode favicons with `?v=` query string to prevent browser caching issues

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (functional components + hooks) |
| Language | TypeScript 5 |
| Build Tool | Vite 5 |
| UI Library | Ant Design 5 |
| Styling | Plain CSS (co-located per component) |
| i18n | i18next + react-i18next |
| Fonts | Google Fonts (Cormorant Garamond, DM Sans, Noto Kufi Arabic) |
| Animation | CSS transitions + Canvas 2D API (`requestAnimationFrame`) |
| Scroll detection | Native `IntersectionObserver` (no library) |

---

## Project Structure

```
al-raedon/
│
├── public/
│   └── assets/
│       └── Logo/
│           ├── logo-v.PNG          # Dark vertical logo (used on light backgrounds)
│           └── logo-v-white.PNG    # White vertical logo (used on dark backgrounds)
│
├── src/
│   ├── App.tsx                     # Root component — imports and renders all sections
│   ├── App.css                     # Global CSS tokens, resets, utility classes
│   ├── main.tsx                    # Entry point — imports i18n before App
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx          # Fixed top nav, scroll-aware, mobile hamburger, lang switcher
│   │   │   └── Navbar.css
│   │   │
│   │   ├── Hero/
│   │   │   ├── Hero.tsx            # Canvas animation + arrow tags + logo/CTA panel
│   │   │   └── Hero.css
│   │   │
│   │   ├── About/
│   │   │   ├── About.tsx           # Two-column: text left, stat cards right
│   │   │   └── About.css
│   │   │
│   │   ├── Services/
│   │   │   ├── Services.tsx        # 6-card grid with custom SVG icons, dark section
│   │   │   └── Services.css
│   │   │
│   │   ├── VisionMission/
│   │   │   ├── VisionMission.tsx   # Vision block, Mission block, Values grid
│   │   │   └── VisionMission.css
│   │   │
│   │   ├── WhyUs/
│   │   │   ├── WhyUs.tsx           # 6-card grid with numbered hover cards
│   │   │   └── WhyUs.css
│   │   │
│   │   ├── Sustainability/
│   │   │   ├── Sustainability.tsx  # Two-column: text + 3 pillar cards, spinning ring
│   │   │   └── Sustainability.css
│   │   │
│   │   ├── Contact/
│   │   │   ├── Contact.tsx         # Two-column: header + 4 clickable contact cards
│   │   │   └── Contact.css
│   │   │
│   │   ├── Footer/
│   │   │   ├── Footer.tsx          # Brand column + 3 nav columns + copyright bar
│   │   │   └── Footer.css
│   │   │
│   │   └── NavDots/
│   │       ├── NavDots.tsx         # Fixed bottom-left ↑ ↓ scroll buttons
│   │       └── NavDots.css
│   │
│   ├── hooks/
│   │   └── useScrollAnimation.ts  # IntersectionObserver hook — adds .visible to .fade-up elements
│   │
│   └── i18n/
│       ├── i18n.ts                 # i18next config — sets default lang + document dir
│       ├── en.json                 # English translations
│       └── ar.json                 # Arabic translations
│
├── index.html                      # HTML entry — favicon setup with cache-busting
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher (or `yarn` / `pnpm`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/al-raedon.git
cd al-raedon

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

---

## Environment & Configuration

This project is **fully static** — there are no environment variables or `.env` files required. All configuration lives in:

| File | Purpose |
|---|---|
| `src/i18n/en.json` | All English copy |
| `src/i18n/ar.json` | All Arabic copy |
| `src/App.css` | CSS design tokens (colors, fonts, spacing) |
| `index.html` | Page title and favicon |

To update any text on the page, edit the relevant key in `en.json` or `ar.json` — no component code needs to change.

---

## Internationalization (i18n)

The site supports **English** (default) and **Arabic**, with full RTL layout switching.

### How it works

1. `src/i18n/i18n.ts` initializes i18next with both locale files and sets `lng: 'en'` as default.
2. `src/main.tsx` imports `./i18n/i18n` **before** `App` so translations are ready before the first render.
3. The **Navbar** language toggle calls `i18n.changeLanguage()` and sets `document.documentElement.dir` to `'rtl'` or `'ltr'`.
4. All `[dir="rtl"]` CSS selectors in every component activate automatically when Arabic is selected.

### Adding a new language

1. Create `src/i18n/xx.json` (copy structure from `en.json`)
2. Import and register it in `src/i18n/i18n.ts`
3. Add the toggle option to `Navbar.tsx`

### Translation key structure

```jsonc
{
  "nav": { ... },         // Navbar link labels
  "hero": { ... },        // Hero section CTAs and stats
  "about": { ... },       // About section text and stat cards
  "services": { ... },    // All 6 service titles and bullet items
  "vision": { ... },      // Vision, Mission, and Values
  "why": { ... },         // Why Choose Al-Raedon cards
  "sustainability": { ... }, // Sustainability pillars
  "contact": { ... },     // Contact info labels
  "footer": { ... }       // Footer tagline and copyright
}
```

---

## Design System

All design tokens are defined as CSS custom properties in `src/App.css` and are available globally.

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--navy` | `#1B2A4A` | Primary brand color, text, dark backgrounds |
| `--navy-deep` | `#111E36` | Deepest dark — footer, hero overlay |
| `--navy-mid` | `#243659` | Mid-dark — hover states, card backgrounds |
| `--navy-light` | `#2E4270` | Lighter navy — gradients |
| `--gold` | `#C9A84C` | Primary accent — CTAs, highlights, icons |
| `--gold-light` | `#E2C97E` | Hover gold, stat numbers |
| `--gold-dim` | `#9A7A34` | Subtle gold — borders, dividers |
| `--off-white` | `#F4F5F7` | Light section backgrounds |
| `--grey-mid` | `#8A93A8` | Muted text, labels |

### Typography

| Token | Font | Usage |
|---|---|---|
| `--font-display` | Cormorant Garamond | Section titles, hero text, card titles |
| `--font-body` | DM Sans | Body text, nav links, buttons, labels |
| *(RTL only)* | Noto Kufi Arabic | All text when Arabic is active |

### Spacing & Layout

| Token | Value |
|---|---|
| `--container` | `1200px` max-width |
| `--section-pad` | `100px 0` (70px on mobile) |
| `--radius` | `4px` |
| `--radius-lg` | `12px` |

### Scroll Animations

Any element with the class `fade-up` inside a component wrapped with `useScrollAnimation()` will animate in when it enters the viewport.

```tsx
const ref = useScrollAnimation();

<section ref={ref}>
  <h2 className="fade-up">Animates in</h2>
  <p className="fade-up delay-1">Slightly delayed</p>
  <p className="fade-up delay-2">More delayed</p>
</section>
```

Available delay classes: `delay-1` through `delay-5` (0.1s increments).

---

## Components

### `<Navbar />`
- Fixed to the top, always visible
- **Light state** (default): frosted off-white glass — navy text, navy hamburger bars, navy lang border. Designed for the bright Hero section.
- **Scrolled state** (`.navbar--scrolled`): dark navy background — white text, white bars, gold lang toggle. Activates after 40px of scroll.
- Logo uses `filter: brightness(0) invert(0)` (dark) in light state, flips to `invert(1)` (white) when scrolled.
- Mobile: hamburger menu slides down with a dark overlay panel.

### `<Hero />`
- Full-viewport bright section (`var(--off-white)` background)
- **Canvas animation** (`requestAnimationFrame` loop at 60fps): animated grid, dashed route lines, floating dots with connections, moving trucks, cargo containers, a ship, a tractor with rotating wheels and exhaust, wheat crop rows with swaying stalks, floating grain seed particles, a large wheat watermark, radar pulse rings, and location pin pulses.
- **Left column**: 5 arrow/chevron-shaped tags (Logistics, Trading, Export, Import, Agri. Growers) that scale up on hover with a spring easing curve.
- **Right column**: vertical logo, two CTA buttons, stats row (6+ services / 360° supply chain / 24/7 monitoring).

### `<About />`
- Two-column layout: text on the left, stat cards on the right.
- Three stat cards with a gold left-border accent.
- Decorative "Trusted Partner" text block in navy.

### `<Services />`
- Dark navy section with a diagonal top clip.
- 6 cards in a 2-column grid, each with a custom thin-stroke SVG icon.
- Cards use pure CSS `:hover` (no JS state) to avoid flicker bugs.
- Services: Warehouse Management, Transportation, Logistics Consulting, Trading & Supplies, Agricultural Production, Import & Export.

### `<VisionMission />`
- Vision and Mission as two equal cards with a bottom gold gradient border.
- Values rendered in a 3-column grid inside a full-width dark navy panel with a diagonal hatch pattern.

### `<WhyUs />`
- 6-card grid with large decorative number in the background of each card.
- Cards have an animated gold top-border that scales in from left on hover.

### `<Sustainability />`
- Two-column: text on the left, 3 pillar cards on the right.
- A large SVG ring animates with a slow continuous rotation (`animation: slowSpin 30s linear infinite`).

### `<Contact />`
- Two-column: header on the left, 4 clickable contact cards on the right.
- Cards link to phone, email, address (Google Maps), and website.
- Hover slides the card right and reveals a gold arrow.

### `<Footer />`
- 4-column grid: brand column + Company links + Services links + Contact details.
- Large watermark text "AL RAEDON" in the background using `::after`.
- Diagonal cut at the top using `clip-path` to blend from the Contact section.

### `<NavDots />`
- Fixed bottom-left (bottom-right in RTL).
- Two circular buttons: ↑ scroll to top, ↓ scroll to bottom.
- A small animated track between them shows which half of the page you're on.
- Active button highlights in navy + gold.

---

## Assets

All static assets must be placed in the `public/` folder so Vite serves them at the root path.

```
public/
└── assets/
    └── Logo/
        ├── logo-v.PNG          # Dark vertical logo (light backgrounds, navbar, footer)
        └── logo-v-white.PNG    # White vertical logo (dark backgrounds, hero right panel)
```

> **Important:** File paths in `public/` are case-sensitive on Linux (production servers). The filenames use `.PNG` (uppercase extension) — make sure your `src` attributes match exactly.

---

## Deployment

The project builds to a static `dist/` folder and can be deployed to any static hosting provider.

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

Drag and drop the `dist/` folder into the Netlify dashboard, or connect the GitHub repo with these settings:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |

### Nginx / Apache

Copy the contents of `dist/` to your web root. For client-side routing (if added later), configure your server to serve `index.html` for all routes.

---

## Contributing

This is a company landing page project. If you are working on it:

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. To add or edit content, update `src/i18n/en.json` and `src/i18n/ar.json` — **both files must be updated together**
4. To add a new section, create a new folder under `src/components/YourSection/` with `YourSection.tsx` and `YourSection.css`, then import it in `App.tsx`
5. Open a pull request with a clear description of what changed

### Code Style Conventions

- One component per folder, co-located with its CSS file
- CSS class names follow BEM-inspired convention: `block__element--modifier`
- All user-facing strings must go through the i18n system — no hardcoded English or Arabic text in components
- Scroll animations: use `useScrollAnimation()` hook + `fade-up` classes, not inline `style` transitions
- No `localStorage` or browser storage — this is a static display-only site

---

<div align="center">
  <sub>Built with precision & purpose for Al Raedon Trading & Logistics Services · Egypt</sub>
</div>
