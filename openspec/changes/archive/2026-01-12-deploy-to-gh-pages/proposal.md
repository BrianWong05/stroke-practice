# Deploy to GitHub Pages

## Why
The application needs to be accessible over the internet for testing and sharing. GitHub Pages provides a free and integrated way to host the static build. A HashRouter is required to ensure deep links work correctly on GitHub Pages without server-side configuration for SPAs.

## User Review Required
> [!NOTE]
> The Vite base configuration will be set to `/stroke-practice/` to support GitHub Pages project structure. The user mentioned `/#/stroke-practice`, but strictly speaking, the Vite `base` configuration should be the subdirectory name. If routing were used, it would be a HashRouter, but this app uses conditional rendering.

## Proposed Changes
### Build Configuration
#### [MODIFY] vite.config.ts
- Set `base` property to `/stroke-practice/`

### Routing Migration
#### [MODIFY] src/App.tsx
- Replace conditional rendering with `HashRouter` and `Routes`
- Define routes:
  - `/` -> CategorySelector
  - `/:category` -> CharacterGrid
  - `/:category/:index` -> PracticeCanvas (for indexed characters)
  - `/practice/custom` -> PracticeCanvas (for custom input)

#### [MODIFY] src/context/PracticeContext.tsx
- Remove `view` state
- Remove view-related actions (`SET_CATEGORY`, `SELECT_CHARACTER`, `BACK_TO_GRID`, etc.) as these will be handled by URL updates

#### [MODIFY] src/hooks/usePractice.ts
- Use `useNavigate` and `useParams` for navigation logic
- Sync URL parameters with internal state (e.g., `currentIndex` from URL identifier)

### Package Management
#### [MODIFY] package.json
- Add `react-router-dom` to dependencies
- Add `gh-pages` to `devDependencies`
- Add `predeploy` and `deploy` scripts

## Verification Plan
### Automated Tests
- Run `npm run build` to verify the build succeeds with the new base path.

### Manual Verification
- Deploy to GitHub Pages (requires user action/credentials) and verify the site loads at `<user>.github.io/stroke-practice/`.
