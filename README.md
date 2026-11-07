# Kasama (prototype)

React + Vite + TypeScript + Tailwind + Framer Motion + React Router. Frontend only.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
```

- Demo login: see `src/config/demoAuth.ts` (DEMO ONLY, not real authentication).
- `/design-check` shows tokens and font candidates (dev server only; delete in Phase 9).
- Add a country: one file in `src/data/countries/<id>.ts` default-exporting a `Country` (see `src/data/types.ts`).
- Fonts: Shrikhand + Fredoka come from npm; Alta, Barabara, Moontime go in `public/fonts/` (see the README there).
- Design tokens live in `tailwind.config.ts` (colors are replaced, so default Tailwind blues do not exist).

## Assets (Phase 5)
- `src/assets/brand`: logo badge + wordmark. `src/assets/home`: hero, About photo, four collage tiles.
- `src/assets/countries/<country>/<NN-section>/<item>.webp`: 93 optimized country photos (see `manifest.csv`, which also notes low-res or doubtful photos).
- `src/geo/seaMap.ts` is generated: `node scripts/build-sea-map.mjs` (Natural Earth, public domain).
- Hide the gold [Sample] tags with one switch in `src/config/sampleContent.ts`.

## Map (Phase 6)
- `src/components/map/SeaMap.tsx`: click, tap or press Enter/Space on a country to zoom in; Esc, the Back button or a click on empty map zooms out. The URL follows (`/home?country=laos`).
- Map shapes: Natural Earth 50m (public domain) via `world-atlas`, pre-built into `src/geo/seaMap.ts`.
- Country status for the colors/tooltips comes from `src/geo/countryMeta.ts` (temporary table; a country data file's own status wins once it exists).
- The Philippines is decorative. Tiny countries (Singapore, Brunei, Timor-Leste) have enlarged invisible tap targets.

## Country guides (Phase 7)
- `src/data/countries/<id>.ts`: one file per country, converted from the Word document. The wording is exactly as in the document (typos, odd labels and notes included). Edit text in these files to change it on the site.
- Status per country (`complete` / `partial` / `coming-soon`) comes from the file itself and colors the map.
- Panel: an overview of 12 topics in 4 groups (Before you go / Getting around and staying / Things to see and eat / Stay safe and respectful), then one topic at a time with Back / Next. Long lists are collapsed rows (photo + name) that open on tap. Every topic shows its source line(s) and a "verify before you travel" note.
- Deep links: `/home?country=laos&section=hotels`.
- Photos: `src/assets/countries/<country>/<NN-section>/<name>.webp` (see `manifest.csv`; low-resolution photos are noted there).
- Emergency numbers card: shown only where the document lists numbers (Cambodia).

## Put it online (GitHub Pages)
1. On github.com click **New repository**, name it (for example `kasama-tourismo`), leave it empty, **Create**.
2. In this folder run:
   ```
   git init
   git add .
   git commit -m "Kasama"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab and wait for the green check (about 2 minutes). Your link is `https://<your-username>.github.io/<repo-name>/`.
Every later `git push` updates the live site. Demo login (admin / 123456) is visible in the code, so treat the site as a demo.
