# Tasks: Add Stroke Navigation Controls

## 1. State Management
- [x] 1.1 Add `currentStrokeIndex` and `totalStrokes` to PracticeContext
- [x] 1.2 Add actions: `NEXT_STROKE`, `PREV_STROKE`, `RESET_STROKES`
- [x] 1.3 Update usePractice hook with `nextStroke`, `prevStroke` functions

## 2. Localization
- [x] 2.1 Add `previousStroke: '上一筆'` to zh-HK.ts
- [x] 2.2 Add `nextStroke: '下一筆'` to zh-HK.ts

## 3. Control Bar UI
- [x] 3.1 Refactor PracticeCanvas controls layout with button grouping
- [x] 3.2 Add "上一筆" button with ChevronsLeft icon
- [x] 3.3 Add "下一筆" button with ChevronsRight icon
- [x] 3.4 Style stroke navigation group separately from character navigation

## 4. Chinese Canvas Integration
- [x] 4.1 Expose stroke count from hanzi-writer to context
- [x] 4.2 Implement `animateStroke(index)` for single-stroke animation
- [x] 4.3 Implement previous stroke (redraw up to index - 1)
- [x] 4.4 Connect prev/next stroke buttons to canvas methods

## 5. Alphanumeric Canvas Integration
- [x] 5.1 Track stroke index for SVG path animation
- [x] 5.2 Implement next stroke (show next path only)
- [x] 5.3 Implement previous stroke (hide last path)

## 6. Validation
- [x] 6.1 Test stroke navigation on Chinese characters
- [x] 6.2 Test stroke navigation on Numbers/English
- [x] 6.3 Verify button layout matches spec
- [x] 6.4 Verify zh-HK labels are correct

## Dependencies
- Tasks 3.x depend on 2.x (localization)
- Tasks 4.x and 5.x depend on 1.x and 3.x
