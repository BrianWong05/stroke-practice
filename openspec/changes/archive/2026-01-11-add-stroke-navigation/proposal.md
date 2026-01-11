# Change: Add Step-by-Step Stroke Navigation Controls

## Why
Users need finer control over stroke order practice. The current "Play" button animates the entire character at once, which doesn't support interactive learning where users can step through strokes individually.

## What Changes
- **New Buttons**: Add "上一筆" (Previous Stroke) and "下一筆" (Next Stroke) buttons
- **State Tracking**: Track `currentStrokeIndex` to enable stepping through strokes
- **Button Layout**: Group stroke navigation buttons separately from character navigation buttons
- **Localization**: Add new zh-HK strings for stroke navigation labels

## Impact
- **Affected specs**: 
  - `practice-interface` (MODIFIED)
  - `localization` (MODIFIED)
- **Affected code**: 
  - `src/components/PracticeCanvas/index.tsx` - New button layout
  - `src/components/PracticeCanvas/ChineseCanvas/index.tsx` - Stroke stepping API
  - `src/components/PracticeCanvas/AlphanumericCanvas/index.tsx` - Stroke stepping
  - `src/context/PracticeContext.tsx` - Add `currentStrokeIndex` state
  - `src/i18n/zh-HK.ts` - New strings

## Control Bar Layout
```
[ < 上一個 ]   [ << 上一筆 ] [ ▷ 播放 ] [ >> 下一筆 ]   [ 下一個 > ]
```
