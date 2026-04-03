# AMSG Website

Static multi-page website for the Analog/Mixed-Signal Research Group (AMSG) at the Technion.

## Overview

This repository contains a plain HTML/CSS/JavaScript website with no build step and no framework. All pages are served directly from the repository root, shared styling lives in `assets/css/styles.css`, and most interactive behavior and structured site data live in `assets/js/main.js`.

The site currently includes:

- Home page
- Research page
- Publications page
- People page
- News page
- Contact page

## Stack

- HTML for page structure and most content
- CSS for layout, typography, responsive behavior, and theming
- Vanilla JavaScript for navigation, search, carousels, modals, and accessibility controls
- Static image assets stored under `assets/img/`

There is no package manager, bundler, transpiler, CMS, or database in this project.

## Repository Structure

```text
.
├── index.html
├── research.html
├── publications.html
├── people.html
├── news.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       ├── chips/
│       ├── events/
│       └── ...
└── README.md
```

## Page Map

### `index.html`

Landing page with:

- hero section
- research vision summary
- team carousel preview
- latest news preview
- recent publications snapshot
- call-to-action section

### `research.html`

Research-focused page with:

- research topic cards
- undergraduate project cards
- expertise section
- chip gallery slideshow
- topic and project detail modals

### `publications.html`

Static publication listing grouped into:

- journals
- conferences
- talks

### `people.html`

Team directory with sections for:

- principal investigator
- research staff
- current students
- former students

Each person card opens a modal populated from JavaScript data.

### `news.html`

News listing page. The visible cards are injected by JavaScript from a hardcoded `NEWS_ITEMS` array in `assets/js/main.js`.

### `contact.html`

Static contact and recruiting information.

## Shared Frontend Behavior

Most shared behavior is implemented in `assets/js/main.js`:

- mobile navigation toggle
- search open/close behavior
- simple site search and page redirection
- reveal-on-scroll animations
- automatic footer year
- home-page team carousel
- shared slideshow logic
- accessibility settings panel
- people, research, project, and news modals

## Search Behavior

The site search is not a full-text indexer. It uses a small manual `SEARCH_INDEX` array in `assets/js/main.js` and maps user queries to one of the site pages.

How it works:

- if the current page already contains the query text, the page is searched locally
- otherwise the script redirects to the best matching page and appends `?q=...`
- the browser `window.find()` API is then used to highlight the match when possible

Implication:

- adding a new page requires updating `SEARCH_INDEX`
- changing a page's purpose or keywords should also be reflected in `SEARCH_INDEX`

## Accessibility and User Preferences

The header includes an accessibility/settings panel with:

- font size toggle
- dark/high-contrast theme toggle

Preferences are persisted in `localStorage` with the keys:

- `amsg-font`
- `amsg-contrast`

The Technion logo switches between light and dark assets depending on the active theme.

## Content Maintenance Guide

### Update the home page

Edit `index.html` for:

- hero headline and intro copy
- vision cards
- homepage publication snapshot
- CTA text and links

The homepage news preview is not edited in `index.html`; it comes from `NEWS_ITEMS` in `assets/js/main.js`.

### Update research topics

Edit `research.html` for:

- topic card titles and summaries
- undergraduate project cards
- chip gallery slide markup

Edit `assets/js/main.js` for:

- `topicModalData`
- `projectModalData`

If you add a new research card with `data-topic-id`, you must also add a matching entry in `topicModalData`.

If you add a new project card with `data-project-id`, you must also add a matching entry in `projectModalData`.

### Update people

People content is split across HTML and JavaScript.

Edit `people.html` for:

- visible person cards
- section placement
- card images
- short role/summary text

Edit `assets/js/main.js` for:

- `peopleModalData`
- `teamMembers` used by the homepage carousel

Important:

- every `data-person-id` used in `people.html` must exist in `peopleModalData`
- if a team member should appear on the home-page carousel, they must also be added to `teamMembers`

### Update news

News content is maintained in `assets/js/main.js` inside `NEWS_ITEMS`.

Each item can include:

- `id`
- `eyebrow`
- `title`
- `summary`
- `details`
- `ctaLabel`
- `ctaHref`
- `images`

The same data source feeds:

- the full news page
- the homepage "Latest news" preview
- the news modal dialog

Recommendation:

- add newest items at the top of `NEWS_ITEMS` so the homepage preview stays current

### Update publications

Edit `publications.html` directly. Publications are currently hardcoded in the page markup and are not generated from JavaScript.

Sections to maintain:

- journals
- conferences
- talks

### Update contact details

Edit `contact.html` for visible contact information.

Also review `peopleModalData` in `assets/js/main.js` if office locations, email addresses, or phone numbers changed for specific team members.

## Working With Images

Local images are stored under `assets/img/`, including:

- `assets/img/chips/` for chip gallery images
- `assets/img/events/` for news/event photos
- other shared branding and homepage images in `assets/img/`

Some images are also loaded from external URLs on `ams.net.technion.ac.il`. When replacing those assets, verify:

- the URL remains public and stable
- the image dimensions still work well in cards, carousels, and modals
- the `alt` text remains accurate

## Styling Guide

Global styles live in `assets/css/styles.css`.

Key points:

- theme colors are defined as CSS custom properties at `:root`
- dark/high-contrast mode is driven by the `body.a11y-high-contrast` class
- responsive layout is handled with CSS grid, flexbox, and media queries
- reusable utility patterns include `.container`, `.section`, `.grid-*`, `.card`, `.btn`, and `.reveal`

When editing styles, prefer reusing existing utility classes and variables before creating new one-off patterns.

## Local Preview

Because this is a static site, the simplest local preview is a small HTTP server from the repository root.

Example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Opening `index.html` directly in a browser can work for simple inspection, but using a local server is the safer default for testing navigation and query-string-based behavior.

## Deployment

This project is suitable for static hosting platforms such as:

- GitHub Pages
- Netlify
- Vercel static hosting
- any standard web server serving the repository root

For GitHub Pages:

1. Push the repository to GitHub.
2. In repository settings, open `Pages`.
3. Select the `main` branch.
4. Set the folder to `/` (root).
5. Save and wait for the site to publish.

## Maintenance Checklist

Before publishing changes, verify:

- all navigation links still work
- any new image paths are valid
- every modal trigger has a matching data entry in `assets/js/main.js`
- the homepage news preview still shows the intended top items
- the site works on both desktop and mobile widths
- dark/high-contrast mode still has readable contrast

## Known Architectural Constraints

- Content is duplicated across HTML and JavaScript in several places.
- People, news, projects, and research details are manually synchronized.
- There is no CMS or schema validation, so broken IDs or missing data will fail at runtime.
- External image dependencies can break if remote URLs change.

If the site grows further, the next maintainability step would be to centralize people, news, projects, and publications into a single data source and generate the pages from that content.
