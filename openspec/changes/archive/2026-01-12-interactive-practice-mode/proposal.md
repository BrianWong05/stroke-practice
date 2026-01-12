# Proposal: Enable Interactive Writing (Quiz Mode) for Chinese Characters

## Goal
Update the Chinese Character Practice component to allow users to write and trace characters directly on the screen using `hanzi-writer`'s Quiz Mode. This provides interactive feedback and a better learning experience.

## User Review Required
> [!IMPORTANT]
> This change is scoped **ONLY** to the Chinese Character category. Numbers and English sections will remain non-interactive (animation only) for now.

> [!NOTE]
> The "Play" button will be repurposed to pause the quiz, show the full animation, and then reset the quiz for a fresh attempt.

## Proposed Changes

### [Practice Interface]
#### [MODIFY] [ChineseCanvas.tsx](file:///Users/brianwong/Project/react/stroke-practice/src/components/PracticeCanvas/ChineseCanvas/index.tsx)
- Initialize `HanziWriter` in Quiz Mode by calling `writer.quiz()`.
- Implement interactive logic for correct and incorrect strokes.
- Automatically show hints after 3 consecutive mistakes.
- Repurpose the "Play" button to show animation and reset the quiz.
- Handle the `onComplete` callback to trigger success feedback.

### [Localization]
#### [MODIFY] [zh-HK.ts](file:///Users/brianwong/Project/react/stroke-practice/src/i18n/zh-HK.ts)
- Add new success message: "太棒了！寫得好正確！"

## Verification Plan

### Automated Tests
- N/A (Project currently lacks automated tests for canvas interactions)

### Manual Verification
- Select a Chinese character from the grid.
- Attempt to trace the character strokes.
- Verify that correct strokes turn dark and incorrect ones provide feedback (flash/shake).
- Verify that a hint appears after 3 mistakes.
- Click the "Play" button and verify it shows the full animation then resets the quiz.
- Complete all strokes and verify the success toast appears with the correct Traditional Chinese text.
