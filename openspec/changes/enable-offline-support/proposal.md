# Change: Enable Full Offline Support (Local Data Bundling)

## Why
The app currently fetches Chinese character stroke data from the jsdelivr CDN at runtime, which fails when the user is offline. Users cannot practice preset characters without an internet connection, defeating the purpose of a mobile-friendly learning app.

## What Changes
- **Create local data storage** — Add `public/hanzi-data/` folder with pre-downloaded JSON files for all preset characters
- **Add download script** — Create `scripts/download-hanzi.js` to fetch and save character data from CDN into local storage
- **Update HanziWriter loader** — Modify `ChineseCanvas` to use a custom `charDataLoader` that:
  1. Attempts to load from local `/hanzi-data/{char}.json` first
  2. Falls back to CDN for custom user-input characters not in local storage
  3. Shows a localized error message if both fail (offline + rare character)
- **Configure PWA precaching** — Install and configure `vite-plugin-pwa` to precache all static assets including `/hanzi-data/*.json` files so they're available immediately after app install

## Impact
- Affected specs: None currently exist for data loading; creating new `offline-data-loading` capability
- Affected code:
  - `src/components/PracticeCanvas/ChineseCanvas/index.tsx` — Custom loader integration
  - `src/data/characters.ts` — Source of preset character list for download script
  - `src/i18n/*.ts` — New error message translation key
  - `vite.config.ts` — PWA plugin configuration
  - `scripts/download-hanzi.js` [NEW] — One-time data download script
  - `public/hanzi-data/*.json` [NEW] — Bundled character data files
