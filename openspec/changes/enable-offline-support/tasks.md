# Tasks: Enable Offline Support

## 1. Setup Local Data Storage
- [x] 1.1 Create `public/hanzi-data/` directory
- [x] 1.2 Create `scripts/download-hanzi.js` Node.js script that:
  - Reads character list from `src/data/characters.ts`
  - Fetches each character's JSON from jsdelivr CDN
  - Saves to `public/hanzi-data/{char}.json`
- [x] 1.3 Add `download:hanzi` npm script to `package.json`
- [x] 1.4 Run script to populate `public/hanzi-data/` with 20 character files
- [x] 1.5 Verify all JSON files are valid and complete

## 2. Implement Custom Character Data Loader
- [x] 2.1 Create `src/utils/hanziDataLoader.ts` utility with:
  - Preset character list import
  - Local fetch for preset characters
  - CDN fallback for non-preset characters
  - Error handling with offline-specific rejection
- [x] 2.2 Add localized error message key `offlineLoadError` to `src/i18n/zh-HK.ts`
- [x] 2.3 Update `ChineseCanvas/index.tsx` to use custom `charDataLoader` option
- [x] 2.4 Update error fallback UI to display offline-specific message

## 3. Configure PWA Precaching
- [x] 3.1 Install `vite-plugin-pwa` as dev dependency
- [x] 3.2 Update `vite.config.ts` with PWA plugin configuration
- [x] 3.3 Configure workbox to include `*.json` in glob patterns
- [x] 3.4 Add PWA manifest with app name and icons (basic configuration)

## 4. Verification
- [x] 4.1 Build production bundle and verify `hanzi-data/` files in `dist/`
- [x] 4.2 Serve production build locally with `npm run preview`
- [ ] 4.3 Load app once to populate Service Worker cache
- [ ] 4.4 Disable network in browser DevTools and reload page
- [ ] 4.5 Verify all 20 preset characters render correctly offline
- [ ] 4.6 Type a custom character and verify friendly error appears offline
