# Spec Delta: Interactive Chinese Character Practice

## MODIFIED Requirements

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

### Requirement: Stroke Order Animation
The system SHALL animate the correct stroke order upon request, handling the transition between interactive quiz mode and passive animation.

#### Scenario: Play button behavior in Quiz Mode
- **Given** I am in Quiz Mode for a Chinese character
- **When** I click the "播放" (Play) button
- **Then** the quiz should be paused/canceled
- **And** the full animation of the character should be played
- **And** once finished, the quiz should be reset so I can try again
