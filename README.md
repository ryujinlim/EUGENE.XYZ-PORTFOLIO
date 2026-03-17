# eugenelim.xyz — Personal Portfolio

Personal portfolio for Eugene Lim — Finance & Business Analytics, Boston College Carroll School of Management. Built with React + Vite + Tailwind CSS. Deployed on Vercel at [eugenelim.xyz](https://eugenelim.xyz).

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Note:** The live VIX ticker in the navbar requires the Vercel serverless function (`/api/vix`).
It will not work in plain `npm run dev`. To test it locally with the API:

```bash
npm install -g vercel
vercel dev
```

This runs both the Vite dev server and the serverless function at [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected).
4. No environment variables required for the base site.
5. Deploy — Vercel handles `api/vix.js` as a serverless function automatically.

**Custom domain:**
- Vercel Dashboard → Project → **Domains** → add `eugenelim.xyz`
- Update DNS at your registrar with the A/CNAME records Vercel provides.

---

## Environment Variables

None required for the base portfolio. The VIX proxy fetches Yahoo Finance server-side with no API key.

If Yahoo Finance blocks the proxy, replace `api/vix.js` with a paid data source:
- [Polygon.io](https://polygon.io) free tier — add `POLYGON_API_KEY`
- [Finnhub](https://finnhub.io) free tier — add `FINNHUB_API_KEY`

---

## TODO — Fill These In

### Links (all currently `#` placeholder)
- [ ] `src/sections/Hero.jsx` — LinkedIn URL
- [ ] `src/sections/Hero.jsx` — GitHub URL
- [ ] `src/sections/Contact.jsx` — LinkedIn URL
- [ ] `src/sections/Contact.jsx` — GitHub URL
- [ ] `src/sections/Music.jsx` — Streaming link (Spotify / Apple Music / SoundCloud)
- [ ] `src/sections/Music.jsx` — Social follow link
- [ ] `src/sections/Projects.jsx` — all project `href` values → GitHub repos or live demos

### Content
- [ ] Update email in `Hero.jsx` + `Contact.jsx` + `Music.jsx` to your actual address
- [ ] Add internship(s) to `src/sections/Experience.jsx` once secured
- [ ] Add new projects to `src/sections/Projects.jsx` as they're built
- [ ] Update *Tribulations* release info in `Music.jsx` once published

### Assets & Meta
- [ ] Replace `/public/favicon.svg` with a real favicon
- [ ] Add `<meta property="og:image">` to `index.html` with a real OG image URL
- [ ] Confirm copyright year in `Contact.jsx` footer is current
