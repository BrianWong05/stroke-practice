# deployment Specification

## Purpose
TBD - created by archiving change deploy-to-gh-pages. Update Purpose after archive.
## Requirements
### Requirement: Deployment Configuration
The application MUST be deployable to GitHub Pages using a standard npm command.
#### Scenario: Deployment Configuration
Given the project is ready for deployment
When the user runs `npm run deploy`
Then the application should be built and pushed to the `gh-pages` branch
And the release should be accessible at the `/stroke-practice/` path

### Requirement: Base Path Configuration
The application MUST support being served from a subdirectory (`/stroke-practice/`).
#### Scenario: Base Path Configuration
Given the application is built for production
When the assets are generated
Then they should use relative paths or the `/stroke-practice/` base path to load correctly on GitHub Pages

### Requirement: Routing Implementation
The application MUST use HashRouter-based navigation to support deep linking on GitHub Pages.
#### Scenario: Router Integration
Given the application is loaded
When the user navigates between views
Then the URL hash should update (e.g., `#/chinese`, `#/chinese/5`)
And the application state should sync with the URL parameters

