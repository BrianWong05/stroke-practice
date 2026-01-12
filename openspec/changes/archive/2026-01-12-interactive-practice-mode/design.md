# Design: Interactive Writing Mode

## Overview
This design introduces interactivity to the Chinese character practice by leveraging the `quiz()` functionality of the `hanzi-writer` library.

## Architectural Reasoning
- **HanziWriter Quiz Mode**: Instead of just animating strokes, we switch to `writer.quiz()`. This mode handles mouse/touch events and provides its own feedback loop.
- **State Management**: We will synchronize the `hanzi-writer` state (current stroke index) with our internal `PracticeContext` if possible, though `quiz()` mostly manages its own internal state during interaction.
- **Button Interplay**: The existing "Play" and "Clear" buttons need to interact with the quiz lifecycle. `writer.cancelQuiz()` and `writer.animateCharacter()` will be used.

## Implementation Details

### HanziWriter Configuration
We will use the following settings for `quiz()`:
- `showOutline: true`
- `showCharacter: false`
- `highlightOnVariation: true`
- `strokeColor: '#333333'`
- `showHintAfterMisses: 3`

### Event Handling
- `onComplete`: Triggered when the user finishes the character. We will call `showFeedback('success')`.
- `onMistake`: Triggered on incorrect input. `hanzi-writer` handles the flash/shake.

### Play Button Flow
1. User clicks Play.
2. Call `writer.cancelQuiz()` if active.
3. Call `writer.animateCharacter()`.
4. After animation finishes, re-call `writer.quiz()`.

## Alternatives Considered
- **Custom Tracing Engine**: Too complex to build from scratch given `hanzi-writer`'s capabilities.
- **Hybrid Mode**: Allowing both animation and quiz concurrently. Rejected for clarity; the user should either be watching or practicing.
