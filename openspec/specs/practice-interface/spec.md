# practice-interface Specification

## Purpose
TBD - created by archiving change add-stroke-practice-app. Update Purpose after archive.
## Requirements
### Requirement: Practice Canvas Display
The system SHALL display a large, central drawing canvas appropriate for the selected character category.

#### Scenario: Chinese character canvas
- **WHEN** user is practicing Chinese characters
- **THEN** the canvas displays a Tian Zi Ge (田字格) background with cross-line guidelines

#### Scenario: English/Number canvas
- **WHEN** user is practicing English letters or Numbers
- **THEN** the canvas displays 4-line handwriting guidelines (ascender, x-height, baseline, descender)

---

### Requirement: Ghost Outline Display
The system SHALL display a ghost outline (light gray or semi-transparent) of the current character on the canvas.

#### Scenario: Character outline visibility
- **WHEN** user views the practice canvas
- **THEN** the target character is visible as a faint outline for tracing reference

---

### Requirement: Stroke Order Animation
The system SHALL animate the correct stroke order when the user taps the "播放" (Play) button.

#### Scenario: Animate Chinese character
- **WHEN** user taps "播放" while practicing a Chinese character
- **THEN** `hanzi-writer` animates each stroke in the correct order

#### Scenario: Animate English letter or Number
- **WHEN** user taps "播放" while practicing an English letter or Number
- **THEN** the SVG stroke path is animated sequentially showing the correct stroke order

#### Scenario: Play resets stroke navigation state
- **WHEN** user taps "播放" after stepping through some strokes
- **THEN** the full animation plays from the beginning and all strokes are shown upon completion

### Requirement: Canvas Clear
The system SHALL clear the user's drawing on the canvas when the "清除" (Clear) button is tapped.

#### Scenario: Clear canvas
- **WHEN** user taps "清除"
- **THEN** all user-drawn strokes are removed and the ghost outline remains visible

---

### Requirement: Character Navigation
The system SHALL provide "下一個" (Next) and "上一個" (Previous) buttons to navigate between characters in the selected category.

#### Scenario: Navigate to next character
- **WHEN** user taps "下一個"
- **THEN** the next character in the sequence is displayed on the canvas

#### Scenario: Navigate to previous character
- **WHEN** user taps "上一個"
- **THEN** the previous character in the sequence is displayed on the canvas

#### Scenario: Boundary handling - First character
- **WHEN** user is on the first character and taps "上一個"
- **THEN** the button is disabled or wraps to the last character

#### Scenario: Boundary handling - Last character
- **WHEN** user is on the last character and taps "下一個"
- **THEN** the button is disabled or wraps to the first character

---

### Requirement: Progress Indicator
The system SHALL display a progress indicator showing the current character position within the category.

#### Scenario: Progress display
- **WHEN** user is practicing character 3 of 10
- **THEN** the interface displays "3 / 10" or similar progress information

---

### Requirement: Current Character Display
The system SHALL prominently display the current character being practiced above or beside the canvas.

#### Scenario: Character label visibility
- **WHEN** user is practicing any character
- **THEN** the target character is displayed in a large, readable font outside the canvas area

---

### Requirement: Chinese Character Stroke Detection
The system SHALL detect if the user is drawing strokes in the correct order for Chinese characters using `hanzi-writer` quiz mode.

#### Scenario: Correct stroke detected
- **WHEN** user draws a correct stroke in the correct order for a Chinese character
- **THEN** the system accepts the stroke and highlights it

#### Scenario: Incorrect stroke detected
- **WHEN** user draws an incorrect stroke or out of order for a Chinese character
- **THEN** the system provides visual feedback indicating the error

---

### Requirement: Stroke Feedback Messages
The system SHALL display feedback messages to the user after stroke detection.

#### Scenario: Success feedback
- **WHEN** user completes a character correctly
- **THEN** the system displays "寫得好！" (Correct!)

#### Scenario: Error feedback
- **WHEN** user makes a stroke error
- **THEN** the system displays "請再試一次" (Try Again)

### Requirement: Stroke Step Navigation
The system SHALL provide buttons to step through individual strokes of a character one at a time.

#### Scenario: Advance to next stroke
- **WHEN** user taps "下一筆" (Next Stroke)
- **THEN** only the next immediate stroke in the sequence is animated/drawn on the canvas

#### Scenario: Go back to previous stroke
- **WHEN** user taps "上一筆" (Previous Stroke)
- **THEN** the most recently drawn stroke is removed from the canvas

#### Scenario: First stroke boundary
- **WHEN** user is at the first stroke (no strokes drawn) and taps "上一筆"
- **THEN** the button has no effect or is visually disabled

#### Scenario: Last stroke boundary
- **WHEN** all strokes are drawn and user taps "下一筆"
- **THEN** the button has no effect or is visually disabled

---

### Requirement: Stroke Navigation State Tracking
The system SHALL track the current stroke index to enable stepping through the character's strokes.

#### Scenario: State persistence across navigation
- **WHEN** user steps through strokes and then taps "播放"
- **THEN** the full animation plays and the stroke state resets to show all strokes

#### Scenario: Character change resets stroke state
- **WHEN** user navigates to a new character
- **THEN** the stroke index resets to 0 (no strokes drawn)

---

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

