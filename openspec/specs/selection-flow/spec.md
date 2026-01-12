# selection-flow Specification

## Purpose
TBD - created by archiving change character-selection. Update Purpose after archive.
## Requirements
### Requirement: Intermediate Selection Screen
The system SHALL display a character selection grid after picking a category.

#### Scenario: User selects Numbers category
- **Given** the user is on the Home screen
- **When** they click "Numbers"
- **Then** the Selection Grid for Numbers (0-9) is displayed.

#### Scenario: User selects English category
- **Given** the user is on the Home screen
- **When** they click "English/Alphabet"
- **Then** the Selection Grid is displayed with two sections: "Uppercase" (A-Z) and "Lowercase" (a-z).

#### Scenario: User selects Chinese category
- **Given** the user is on the Home screen
- **When** they click "Chinese"
- **Then** the Selection Grid for Chinese characters is displayed.

### Requirement: Grid Navigation
The system SHALL allow navigation between Grid, Practice, and Home.

#### Scenario: Select a character to practice
- **Given** the user is on the Selection Grid
- **When** they click a specific character card (e.g., 'A')
- **Then** they navigate to the Practice Interface with 'A' loaded.

#### Scenario: Back to Home from Grid
- **Given** the user is on the Selection Grid
- **When** they click the "Back" button
- **Then** they navigate back to the Home (Select Category) screen.

#### Scenario: Back to Grid from Practice
- **Given** the user is on the Practice Interface
- **When** they click the "Back" button
- **Then** they navigate back to the Selection Grid for the current category.

### Requirement: Custom Character Input
The system SHALL provide an input field on the Chinese selection screen allowing users to enter any Chinese character for practice.

#### Scenario: Input field visibility
- **GIVEN** the user is on the Chinese category Selection Grid
- **WHEN** the page loads
- **THEN** a prominent input bar is displayed above the preset character grid
- **AND** the input field has placeholder text "輸入想練習的中文字 (例如: 龍)"

#### Scenario: Valid Chinese character submission
- **GIVEN** the user has entered a single Chinese character (Unicode range `\u4e00-\u9fa5`)
- **WHEN** they click "開始練習" or press Enter
- **THEN** they navigate to the Practice Interface with the custom character loaded

#### Scenario: Invalid input rejection
- **GIVEN** the user has entered non-Chinese text (e.g., "A", "1", "abc")
- **WHEN** they attempt to submit
- **THEN** an error message "請輸入中文字" is displayed
- **AND** navigation does not occur

#### Scenario: Multi-character paste handling
- **GIVEN** the user pastes a string of multiple characters (e.g., "龍鳳")
- **WHEN** the input is processed
- **THEN** only the first character is retained in the input field

