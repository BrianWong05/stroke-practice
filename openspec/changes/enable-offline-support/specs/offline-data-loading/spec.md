## ADDED Requirements

### Requirement: Local Character Data Bundling
The system SHALL bundle stroke data JSON files for all preset Chinese characters in the `public/hanzi-data/` directory, enabling offline access without CDN dependency.

#### Scenario: Preset character data files exist
- **WHEN** the application is built
- **THEN** the `dist/hanzi-data/` directory MUST contain one `.json` file per preset character (20 files for 20 characters)

#### Scenario: Data files are valid
- **WHEN** a character JSON file is loaded
- **THEN** it MUST contain valid `strokes` and `medians` arrays matching the `hanzi-writer-data` format

---

### Requirement: Custom Character Data Loader
The system SHALL use a custom `charDataLoader` function that prioritizes local data over CDN fetching, with graceful fallback for non-preset characters.

#### Scenario: Loading a preset character offline
- **WHEN** user selects a preset character (e.g., "一") while offline
- **THEN** the system MUST load character data from `/hanzi-data/一.json` via Service Worker cache
- **AND** the character MUST render correctly for practice

#### Scenario: Loading a preset character online
- **WHEN** user selects a preset character while online
- **THEN** the system MUST still load from local `/hanzi-data/{char}.json` (not CDN)
- **AND** response time SHOULD be faster than CDN fetch

#### Scenario: Loading a custom character online
- **WHEN** user inputs a character NOT in the preset list while online
- **THEN** the system MUST fallback to fetching from jsdelivr CDN
- **AND** the character MUST render correctly if CDN returns valid data

#### Scenario: Loading a custom character offline
- **WHEN** user inputs a character NOT in the preset list while offline
- **THEN** the system MUST display a localized error message: "請連接互聯網以加載此新字"
- **AND** the system MUST NOT crash or show a generic error

---

### Requirement: PWA Precaching for Offline Capability
The system SHALL configure a Service Worker to precache all static assets including character data files, enabling full offline functionality after initial app load.

#### Scenario: First app visit precaches assets
- **WHEN** user visits the app for the first time with internet connection
- **THEN** the Service Worker MUST install and precache all files matching `*.{js,css,html,ico,png,svg,json}`
- **AND** this MUST include all files in `/hanzi-data/`

#### Scenario: Subsequent visits work offline
- **WHEN** user revisits the app after initial load without internet connection
- **THEN** the app MUST load successfully from Service Worker cache
- **AND** all preset characters MUST be available for practice
