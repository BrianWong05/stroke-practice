## ADDED Requirements

### Requirement: Stroke Order Guidelines Display
The system SHALL display visual stroke order guidelines on the practice canvas when a character loads, showing the sequence of strokes at a glance.

#### Scenario: Guidelines visible on character load
- **WHEN** user navigates to a practice page for any character
- **THEN** the canvas displays dashed stroke paths with numbered indicators (①, ②, ③...) showing stroke sequence
- **AND** guidelines are visible without requiring any user action

#### Scenario: Alphanumeric character guidelines
- **WHEN** user is practicing an English letter or number
- **THEN** the SVG stroke paths are rendered as dashed lines with starting point numbers

#### Scenario: Chinese character guidelines
- **WHEN** user is practicing a Chinese character
- **THEN** the stroke data is extracted from hanzi-writer and rendered as dashed strokes with numbered starting points

---

### Requirement: Guideline Styling
The system SHALL style stroke order guidelines distinctly from the main character strokes.

#### Scenario: Visual distinction from ghost outline
- **WHEN** guidelines are displayed
- **THEN** they appear as light gray dashed lines (using CSS `stroke-dasharray`)
- **AND** numbered indicators are positioned at the starting point of each stroke

---

### Requirement: Guideline Visibility During Animation
The system SHALL keep stroke order guidelines visible as a reference during stroke animation playback.

#### Scenario: Guidelines remain during play
- **WHEN** user taps "播放" to animate strokes
- **THEN** the guidelines remain visible behind the animated strokes as a tracing reference
