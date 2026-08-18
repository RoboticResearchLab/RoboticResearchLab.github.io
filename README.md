# Robotic Research Lab

Official website of **Robotic Research Lab (RRL)** — a robotics research team working on autonomous robotics, industrial automation, intelligent perception, and robotic systems.

Live site (GitHub Pages): [https://roboticresearchlab.github.io/](https://roboticresearchlab.github.io/)

GitHub organization: [https://github.com/RoboticResearchLab](https://github.com/RoboticResearchLab)

This repository is static HTML, CSS, and JavaScript. There is no build step and no frontend framework.

## Website

The site is a dark-first laboratory homepage with pages for about, team, robots/projects, research areas, achievements, publications, sponsors, and contact.

Content that has not been confirmed (people, awards, sponsors, publications, contact details, university affiliation) is shown as **explicit placeholders**. Do not replace placeholders with invented facts.

## Repository structure

```
.
├── index.html
├── about.html
├── team.html
├── robots.html
├── research.html
├── achievements.html
├── publications.html
├── sponsors.html
├── contact.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── images/
        ├── favicon.svg
        ├── og-image.svg
        ├── placeholder-portrait.svg
        ├── placeholder-project.svg
        └── placeholder-logo.svg
```

Shared navigation and footer are duplicated in each HTML file (GitHub Pages has no server-side includes). If you change a nav label or link, update every page.

Colors, type, and spacing are CSS variables in `assets/css/style.css` (`:root`).

## How to edit content

1. Open the relevant `.html` file in the repository root.
2. Replace placeholder copy, keeping heading structure intact.
3. Use relative links (`about.html`, `assets/css/style.css`). Do not use root-absolute paths such as `/assets/...`.
4. Preview locally with any static server, for example:

   ```bash
   python3 -m http.server 8080
   ```

   Then open `http://localhost:8080/`.

## How to add team members

On `team.html`, copy an existing `<article class="card member-card">` into the right section:

- **Faculty Advisors** — `#faculty`
- **Team Members** — `#members`
- **Alumni** — `#alumni`

Then:

1. Replace `assets/images/placeholder-portrait.svg` with a photo (for example `assets/images/team/name.jpg`).
2. Change the `alt` text to the person’s name.
3. Set name, role, and field/responsibility.
4. Turn the LinkedIn/GitHub `<span class="placeholder-link">` elements into real `<a href="...">` links.

Do not invent names.

To insert an official logo later, replace the text monogram:

```html
<span class="logo-mark" aria-hidden="true">RRL</span>
```

with:

```html
<img class="logo-mark logo-mark-img" src="assets/images/logo.svg" alt="Robotic Research Lab">
```

Do this in the header (and footer, if you want the mark there too) on every page.

## How to add projects

On `robots.html`, copy an `<article class="card">`. Each card supports:

- Project image (`img` in `.card-media`)
- Project name (`h3`)
- Description
- Technologies (`.tag` spans)
- GitHub link (replace the placeholder span with an `<a>`)
- Project status (`.status`)

Give the article a stable `id` if other pages should link to it (see `research.html` related-project links).

## How to add publications

On `publications.html`, copy a `<article class="pub-item">` and fill in:

- Paper title
- Authors
- Conference / journal and year
- DOI (use `https://doi.org/...`)
- PDF (relative path such as `assets/papers/name.pdf`, or an external URL)
- Related project (link to `robots.html` or `research.html`)

Keep newest work first. Do not invent citations.

Achievements on `achievements.html` work the same way: duplicate a `.timeline-item` (or an extra `.timeline-card` inside a year).

## How to deploy using GitHub Pages

This site is intended for the organization site:

`https://roboticresearchlab.github.io/`

That URL is served from the repository `RoboticResearchLab/RoboticResearchLab.github.io`.

1. Push this tree to the default branch of that repository (usually `main`).
2. In the repository **Settings → Pages**, set source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Wait a minute and open [https://roboticresearchlab.github.io/](https://roboticresearchlab.github.io/).

No Jekyll features are required. If GitHub ever tries to process the site with Jekyll, add an empty `.nojekyll` file in the repository root.

After deploy, confirm:

- Internal links open the correct pages
- CSS and JS load (relative `assets/` paths)
- The custom `404.html` appears for unknown URLs

## License and contact

Website source is maintained by Robotic Research Lab. For collaboration, see `contact.html` and [github.com/RoboticResearchLab](https://github.com/RoboticResearchLab).
