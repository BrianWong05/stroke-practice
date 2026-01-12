# Hide Completed Stroke Guidelines

## Summary

Modify the practice interface so that the visual stroke order guidelines (dashed lines, numbered starting points) for a specific stroke disappear as soon as that stroke is successfully played via animation or stepped through by the user. This reduces visual clutter and provides clearer feedback on which strokes are complete vs. pending.

## Motivation

Currently, all stroke guidelines remain visible throughout the practice session, overlaying the completed solid strokes. This creates visual noise and makes it harder to see the next stroke to practice. By progressively hiding completed stroke guidelines, users get a cleaner canvas focused on the remaining strokes.

## User Impact

- **Improved clarity**: Users can focus on upcoming strokes without distraction from already-completed guidelines
- **Visual progress feedback**: The disappearing guidelines serve as a secondary indicator of stroke completion
- **No behavior change**: All existing functionality (animation, stepping, clear) remains the same

## Proposed Changes

### [MODIFY] `PracticeContext.tsx`

No state changes required. The existing `currentStrokeIndex` already tracks which strokes have been completed - guidelines for strokes `0` to `currentStrokeIndex - 1` should be hidden.

---

### [MODIFY] `StrokeGuideline/index.tsx`

Add a new optional prop `completedCount` (number of completed strokes). Paths and number indicators with index < completedCount will have `opacity: 0` or be excluded from render.

---

### [MODIFY] `ChineseCanvas/index.tsx`

Pass `state.currentStrokeIndex` to the guideline SVG overlay. Apply conditional styling to hide paths and indicators with index < currentStrokeIndex.

---

### [MODIFY] `AlphanumericCanvas/index.tsx`

Pass `visibleStrokeCount` (which equals `state.currentStrokeIndex`) to `StrokeGuideline` component as the `completedCount` prop.

---

## Reset Behavior

When "清除" (Clear) is tapped, the `CLEAR_CANVAS` action already resets `currentStrokeIndex` to `0`, which will automatically cause all guidelines to reappear.

## Verification Plan

### Manual Verification

1. **Chinese character practice**:
   - Load a Chinese character (e.g., 一)
   - Tap "下一筆" (Next Stroke) - verify guideline #1 disappears
   - Continue stepping - verify guidelines hide progressively
   - Tap "清除" - verify all guidelines reappear

2. **Alphanumeric practice**:
   - Load a number (e.g., 5) or letter (e.g., A)
   - Tap "播放" - verify guidelines hide as each stroke animates
   - Tap "清除" - verify all guidelines reappear

3. **Animation mode**:
   - Tap "播放" on any character
   - Verify guidelines hide progressively during full animation playback
