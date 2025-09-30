# Sam Lustig Photography - Static Site

This repository contains a fully static website. There is no build step and no Node/SSR framework.

Structure:
- `index.html`, `admin.html`
- `galleries.json` and `data/galleries.json` (same contents; keep `galleries.json` at root for the homepage)
- `images/` (hero images, galleries, thumbnails)
- `robots.txt`, `sitemap.xml`, `_redirects` (for static hosts like Netlify)

Local preview (any static server works):

```bash
python3 -m http.server 8000
# open http://127.0.0.1:8000
```

Deployment notes:
- Deploy the repository root as the site root.
- Ensure the host serves static files as-is and honors `_redirects` if present.

Editing galleries:
- Update `galleries.json` image entries. Images live under `images/`.
