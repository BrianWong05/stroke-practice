# Tasks: Hide Completed Stroke Guidelines

## Phase 1: Shared Component Update

- [x] **1.1** Add `completedCount?: number` prop to `StrokeGuideline` component interface
- [x] **1.2** Apply conditional opacity styling to path and indicator elements based on `completedCount`
- [x] **1.3** Verify the component still renders correctly when `completedCount` is undefined (default behavior)

## Phase 2: Alphanumeric Canvas Integration

- [x] **2.1** Pass `visibleStrokeCount` as `completedCount` prop to `StrokeGuideline` in `AlphanumericCanvas`
- [x] **2.2** Verify guidelines hide during step navigation (下一筆/上一筆)
- [x] **2.3** Verify guidelines hide progressively during "播放" animation
- [x] **2.4** Verify "清除" button resets all guidelines to visible

## Phase 3: Chinese Canvas Integration

- [x] **3.1** Update inline SVG guideline rendering to conditionally style completed strokes
- [x] **3.2** Use `state.currentStrokeIndex` to determine completed stroke count
- [x] **3.3** Verify guidelines hide during step navigation
- [x] **3.4** Verify guidelines hide during "播放" animation playback
- [x] **3.5** Verify "清除" button resets all guidelines to visible

## Phase 4: Animation-Triggered Hiding (Optional Enhancement)

> Note: Not needed - the current approach using `currentStrokeIndex` provides smooth hiding with CSS transitions.

- [x] ~~**4.1** Hook into `onAnimateStrokeComplete` callback~~ (Skipped - not required)
- [x] ~~**4.2** Track animation progress using `animatingStroke` state~~ (Skipped - not required)

## Validation

- [x] TypeScript compilation passes with no errors
- [x] Manual test: All three categories (Chinese, English, Numbers)
- [x] Manual test: Step navigation hides guidelines correctly
- [x] Manual test: Play animation hides guidelines progressively
- [x] Manual test: Clear button restores all guidelines
