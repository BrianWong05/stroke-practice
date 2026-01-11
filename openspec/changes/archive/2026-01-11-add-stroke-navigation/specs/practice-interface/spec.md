## ADDED Requirements

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

## MODIFIED Requirements

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
