This repository is a production-ready, vanilla HTML/CSS/JS static website for Berserk Tattoos (no framework).

Key intent for coding agents:

- Keep changes minimal and performant: this project inlines CSS/JS for initial render and prioritizes tiny payloads.
- Preserve in-file patterns: HTML is used as the "source of truth" — copy, structure, and behavior are implemented directly inside each HTML file (index.html, artists.html, book.html).
- Images and static assets live under `/images`, `/portfolio`, and `/fonts` (if present). Image filenames are referenced directly in HTML — treat paths as case-sensitive.

Important files and why they matter:

- `index.html`, `artists.html`, `book.html` — core pages; update content and assets here.
- `package.json` — contains utility scripts (optimize-images, update-html, minify-html, build, lint). Use existing npm scripts rather than inventing new build steps.
- `netlify.toml` — production headers, caching rules, and redirects. Respect these settings when adding or moving files.
- `optimize-images.js`, `update-html-images.js` — image pipeline and HTML-updater scripts used by `npm run optimize-all`.
- `sw.js` — service worker (caching). If you change asset paths or add routes, update the service worker accordingly.

Build & developer commands (from `package.json`):

- Install dependencies: npm ci or npm install
- Optimize images: npm run optimize-images
- Update HTML image paths: npm run update-html
- Full local build: npm run build (runs optimize-all then minifies HTML into ./dist)
- Lint: npm run lint (runs js/css/html linters in parallel)
- Format: npm run format

Conventions and patterns to follow:

- No JS frameworks — prefer small, readable vanilla JS. Follow existing code style (Prettier + ESLint rules in package.json).
- Do not externalize critical CSS unless you update inlined critical CSS blocks in each HTML file.
- Image handling: generate WebP + JPG fallbacks; keep filename patterns (e.g. `amelia-1.jpg`) and update `update-html-images.js` when adding new sizes.
- Forms: booking form posts to Formspree (action="https://formspree.io/f/YOUR_FORM_ID"). When changing form fields, preserve required-name/phone/email inputs and success redirect to `thank-you.html`/`payment-success.html`.
- Payments: Stripe Payment Links are embedded as direct links. Do not substitute server-side payment flows without creating a small backend and documenting env vars.

Integration points:

- Formspree (forms) — check `book.html` for the form action placeholder.
- Stripe (payment links) — replace `YOUR_PAYMENT_LINK_ID` in `book.html` when updating payment flows.
- Google Analytics — replace `GA_MEASUREMENT_ID` in all HTML files when adding analytics.
- Netlify — `netlify.toml` controls headers/caching and is authoritative for deployment.

Quality gates and checks for PRs:

- Run `npm run lint` and fix any reported issues.
- Run `npm run build` and verify output in `./dist` (spot-check pages: index, book, artists).
- Verify image references (no 404s) and preserve case-sensitive paths.
- If you change HTML structure, update `sw.js` and `netlify.toml` if routing or asset patterns change.

Examples (do this in PRs):

- Small content change: update text in `index.html` and run `npm run lint` and `npm run format` before pushing.
- Add a new portfolio image: place file in `/images/portfolio/`, run `npm run optimize-images`, then `npm run update-html` if you rely on the updater script to inject sizes; verify the image appears on `artists.html` and that caching headers in `netlify.toml` still apply.

What NOT to do:

- Don't introduce heavy client libraries (React/Vue). This site intentionally avoids them for performance.
- Don't change caching rules in `netlify.toml` without documenting the reason.
- Don't remove inlined critical CSS or inline JS without providing an equal or better optimization and validating Lighthouse performance.

When in doubt or if a change affects deployment:

- Update this file with a one-paragraph rationale.
- Run `npm run build` locally and test pages from `./dist` (or use Netlify Preview).

If you need more context, open `README.md`, `SETUP-GUIDE.md`, and `IMPLEMENTATION-COMPLETE.md` at the repo root.

Please review these instructions and tell me if you'd like extra examples (e.g., how to update `sw.js` after adding routes) or stricter lint rules applied.
