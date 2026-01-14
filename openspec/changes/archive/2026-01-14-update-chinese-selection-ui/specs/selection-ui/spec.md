# Chinese Selection UI Spec

## ADDED Requirements

### Requirement: Accordion UI
The Chinese character selection screen MUST organize characters into collapsible sections based on curriculum levels.

#### Scenario: Rendering Accordions
Given I am on the Chinese selection category
When the page loads
Then I should see a list of curriculum levels as headers
And each header should display the level title and description
And Level 1 should be expanded by default.

#### Scenario: Toggling Sections
Given a curriculum level section
When I click the header
Then it should toggle between expanded and collapsed states
And the chevron icon should rotate 180 degrees to indicate state.

### Requirement: Navigation Integrity
Refactoring the UI structure MUST NOT break the character selection logic.

#### Scenario: Selecting a Character
Given I am viewing an expanded section
When I click a character button (e.g., '一')
Then the application should navigate to the practice screen
And the correct character index (global index) should be passed to the router/context.

### Requirement: Sticky Search
The custom character input MUST remain easily accessible.

#### Scenario: Scrolling
Given the character list is long
When I scroll down the page
Then the "Custom Character Input" field should remain visible at the top of the viewport (sticky).
