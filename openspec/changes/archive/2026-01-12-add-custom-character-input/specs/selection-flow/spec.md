## ADDED Requirements

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
