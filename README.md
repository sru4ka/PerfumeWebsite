# Perfumedia — Marketing Website

The landing page for **Perfumedia**, the fragrance wardrobe app. *Your fragrance wardrobe, in your pocket.*

Built as a fast, dependency-free static site (plain HTML/CSS/JS). It mirrors the app's
design language — marble/off-white surfaces, a single gold accent (`#C9A227`), and
serif display type (Fraunces + Inter).

```
index.html   → page markup & content
styles.css   → all styling (design tokens match the app)
main.js      → scroll reveals, nav, match-ring animation, FAQ accordion
```

---

## View it locally

**Option A — just open the file (fastest)**

Open `index.html` in any browser. Double-click it, or:

```bash
# macOS
open index.html
# Linux
xdg-open index.html
# Windows
start index.html
```

**Option B — run a local server (recommended)**

A server avoids any browser file:// quirks and matches how it'll be hosted.

```bash
# Python (pre-installed on most machines)
python3 -m http.server 8080
# then visit http://localhost:8080

# …or Node, if you prefer
npx serve .
```

That's the whole "activation" — there's no build step, no install, nothing to compile.

---

## Publish it (make it live on the web)

### GitHub Pages (free, no config)

1. Push this branch to GitHub (already the default here).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick this branch and the `/ (root)` folder, then **Save**.
5. Wait ~1 minute. Your site is live at
   `https://<your-username>.github.io/PerfumeWebsite/`.

The included `.nojekyll` file tells Pages to serve the files as-is.

### Any other host

Because it's fully static, you can drag-and-drop the folder onto
**Netlify**, **Vercel**, **Cloudflare Pages**, or **Render** — no build command needed.

---

## Editing

Everything is hand-editable, no toolchain required:

- **Copy / sections** → `index.html`
- **Colors, spacing, type** → the `:root` variables at the top of `styles.css`
- **Store links** → replace the `href="#"` on the `.store-badge` links in `index.html`
  once the App Store / Google Play listings exist.

Fonts load from Google Fonts over the network; everything else is self-contained.
