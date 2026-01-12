# practice-interface Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

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
