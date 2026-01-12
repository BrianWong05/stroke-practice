# Design: GitHub Pages Deployment

## Context
The user wants to deploy the app to GitHub Pages with the base URL `/#/stroke-practice`. 

## Decisions
### Base Path
GitHub Pages project pages are served at `https://<user>.github.io/<repo>/`.
For Vite projects, the `base` config must match the `<repo>` name (slashed).
We will set `base: '/stroke-practice/'`.

### Routing
The app currently uses conditional rendering. We will refactor this to use `react-router-dom` with `HashRouter`.
- **Why HashRouter?** GitHub Pages does not support single-page apps (SPA) with History API (pushState) out of the box because it returns 404 for unknown paths. `HashRouter` (`/#/path`) avoids this issue entirely and works reliably on GH Pages.
- **Route Structure**:
  - `/`: Home (Categories)
  - `/:category`: Grid View (e.g., `/#/chinese`)
  - `/:category/:index`: Practice View (e.g., `/#/chinese/0`)
  - `/custom`: Custom Practice View (e.g., `/#/custom?char=你好`)

