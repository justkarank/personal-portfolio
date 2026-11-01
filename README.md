# Karan Kamboj: personal portfolio

A single-page portfolio for a creative technologist: a full-screen hero, a project index, nine project panels that stack as you scroll, services, an about section and contact. Plain HTML, CSS and JavaScript, with no framework and no build step.

**Live:** https://justkarank.github.io/personal-portfolio/

## What is in it

- **Project panels:** each project gets its own colour panel that slides over the previous one using CSS `position: sticky`, so scrolling is never hijacked. On small screens they become normal blocks.
- **Smooth scrolling:** [Lenis](https://github.com/darkroomengineering/lenis) drives the scroll and stays in sync with GSAP's ScrollTrigger.
- **Motion:** GSAP reveals the hero and each section as it enters. A header that hides on the way down and returns on the way up, a progress line, and an active-section marker.
- **Accessibility:** one `h1`, a skip link, visible focus, semantic landmarks, alt text on every image, and 4.5:1 text contrast. With `prefers-reduced-motion` or without JavaScript, the page renders fully with no animation.
- **Performance:** AVIF and WebP images with responsive sizes, lazy loading below the fold, self-hosted variable fonts, and no layout shift.

## Run it

```bash
npm run dev      # serves the folder at http://localhost:4000 (any static server works)
```

## Structure

```text
index.html      page content and structure
styles.css      design tokens, layout and responsive rules
main.js         scroll, header and reveal behaviour
assets/         fonts, images and the project collages
serve.mjs       tiny local static server
```

## How it was made

I designed and directed this site; the code was written with an AI coding assistant working to my brief, then tested and refined by me. Several of the images and project visuals are AI-assisted, which I say openly on the work itself.

**The layout is inspired by an existing portfolio design:** a full-screen photo hero followed by colour panels that stack as you scroll. The code, writing, images and everything else here are my own. No template code or assets were copied.

## Credits

- [GSAP](https://gsap.com/) and ScrollTrigger (loaded from a CDN, under the [GSAP standard licence](https://gsap.com/standard-license))
- [Lenis](https://github.com/darkroomengineering/lenis) (MIT, loaded from a CDN)
- Fonts: Bricolage Grotesque and Archivo, both SIL Open Font Licence (licences in `assets/fonts/`)

## Rights

© Karan Kamboj. All rights reserved: the code, writing and images are here for review. Please ask before reusing them. Client brand names and logos that appear inside the project collages belong to their owners.
