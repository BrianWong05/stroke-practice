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
The system SHALL animate the correct stroke order upon request, handling the transition between interactive quiz mode and passive animation.

#### Scenario: Play button behavior in Quiz Mode
- **Given** I am in Quiz Mode for a Chinese character
- **When** I click the "播放" (Play) button
- **Then** the quiz should be paused/canceled
- **And** the full animation of the character should be played
- **And** once finished, the quiz should be reset so I can try again

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
The system SHALL detect if the user is drawing strokes in the correct order for Chinese characters using `hanzi-writer` quiz mode, providing interactive writing capabilities.

#### Scenario: Initializing Interactive Mode
- **Given** I am on the practice screen for a Chinese character
- **When** the component loads
- **Then** the `hanzi-writer` should be initialized in Quiz Mode
- **And** the background outline should be visible
- **And** the filled strokes should be hidden until correctly drawn

#### Scenario: Correct stroke detection in Quiz Mode
- **Given** I am in Quiz Mode
- **When** I correctly trace a stroke in the right order and direction
- **Then** the stroke should snap to the correct shape
- **And** turn dark (`#333333`)

#### Scenario: Incorrect stroke detection in Quiz Mode
- **Given** I am in Quiz Mode
- **When** I attempt an incorrect stroke or direction
- **Then** the writer should provide visual feedback (flash/shake)
- **And** the stroke should NOT be filled

#### Scenario: Automatic Hints on Misses
- **Given** I am in Quiz Mode
- **When** I make 3 consecutive mistakes on the same stroke
- **Then** a visual hint (outline or similar) should appear for that specific stroke

### Requirement: Stroke Feedback Messages
The system SHALL display feedback messages to the user after stroke detection, including success toasts upon character completion.

#### Scenario: Interactive Completion Success Toast
- **Given** I have just correctly drawn the final stroke of a Chinese character
- **When** the `onComplete` event is triggered
- **Then** a success toast should appear with the text "太棒了！寫得好正確！"

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

#### Scenario: Guidelines include direction arrows
- **WHEN** guidelines are displayed
- **THEN** the dashed stroke paths include an arrowhead at the end of the path
- **AND** the arrowhead points in the direction of the stroke

### Requirement: Guideline Styling
The system SHALL style stroke order guidelines distinctly from the main character strokes.

#### Scenario: Visual distinction from ghost outline
- **WHEN** guidelines are displayed
- **THEN** they appear as light gray dashed lines (using CSS `stroke-dasharray`)
- **AND** numbered indicators are positioned at the starting point of each stroke

---

### Requirement: Guideline Visibility During Animation
The system SHALL progressively hide stroke order guidelines as each stroke completes during animation playback.

#### Scenario: Guidelines hide during animation playback
- **WHEN** user taps "播放" to animate strokes
- **THEN** each guideline (dashed path + numbered indicator) hides as its corresponding stroke completes animation
- **AND** only guidelines for not-yet-animated strokes remain visible

#### Scenario: Guidelines hide during step navigation
- **WHEN** user taps "下一筆" (Next Stroke) to advance one stroke
- **THEN** the guideline for the newly completed stroke hides immediately
- **AND** guidelines for remaining strokes stay visible

#### Scenario: Guidelines reappear on previous stroke
- **WHEN** user taps "上一筆" (Previous Stroke) to remove a stroke
- **THEN** the guideline for the removed stroke reappears
- **AND** guidelines for subsequent strokes remain visible

---

### Requirement: Guideline Reset on Clear
The system SHALL restore all stroke guidelines when the user clears the canvas.

#### Scenario: Clear restores all guidelines
- **WHEN** user taps "清除" (Clear)
- **THEN** all user-drawn/animated strokes are removed
- **AND** all stroke order guidelines (dashed paths + numbers) reappear

---

### Requirement: Progressive Guideline Hiding
The system SHALL hide stroke order guidelines progressively as strokes are completed.

#### Scenario: Initial state shows all guidelines
- **WHEN** user navigates to a character practice page
- **THEN** all stroke guidelines are visible (currentStrokeIndex = 0)

#### Scenario: Completed strokes have hidden guidelines
- **WHEN** strokes 1 through N have been completed (animated or stepped)
- **THEN** guidelines for strokes 1 through N are hidden
- **AND** guidelines for strokes N+1 onwards remain visible

#### Scenario: Full character completion hides all guidelines
- **WHEN** all strokes are completed
- **THEN** no stroke order guidelines are visible

---

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

