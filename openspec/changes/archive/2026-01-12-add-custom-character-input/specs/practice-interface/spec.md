## ADDED Requirements

### Requirement: Hanzi-Writer Load Error Handling
The system SHALL gracefully handle cases where `hanzi-writer` cannot load stroke data for a character.

#### Scenario: Character data not found
- **GIVEN** the user has navigated to the Practice Interface with a custom character
- **WHEN** the `hanzi-writer` library fails to fetch stroke data (e.g., 404 from CDN)
- **THEN** a fallback message "找不到此字的筆順資料" is displayed on the canvas
- **AND** a "Back" button is provided to return to the Selection Grid

#### Scenario: Normal character loads successfully
- **GIVEN** the user has navigated to the Practice Interface with a supported character
- **WHEN** the `hanzi-writer` library successfully loads stroke data
- **THEN** the practice canvas displays normally with quiz mode active
