# Selection Flow Specification

## Added Requirements

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
