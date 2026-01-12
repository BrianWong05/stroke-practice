# Modified Practice Interface Requirements

## MODIFIED Requirements

### Requirement: Smart Indicator Positioning
The stroke order indicators MUST be positioned intelligently to avoid overlapping with stroke start points or other indicators, especially for characters with shared starting coordinates.

#### Scenario: Indicators do not overlap with stroke starts
Given a character with multiple strokes starting at the same point (e.g., "B"),
When the guidelines are displayed,
Then the stroke order indicators should be offset away from the start point in the direction opposite to the stroke's initial path, ensuring they do not overlap each other or the stroke content.

#### Scenario: Indicators respect direction
Given a stroke that starts moving horizontally to the right,
When the indicator is placed,
Then it should be positioned to the left of the start point.

Given a stroke that starts moving vertically down,
When the indicator is placed,
Then it should be positioned above the start point.
