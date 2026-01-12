# Tasks: Add Visual Stroke Order Guidelines

## 1. Shared Guideline Components
- [x] 1.1 Create `src/components/shared/StrokeGuideline/index.tsx` with props for paths, viewBox, and visibility
- [x] 1.2 Create `NumberIndicator` sub-component for circled numbers (①, ②, ③...)
- [x] 1.3 Add CSS class `.stroke-guideline` for dashed stroke styling (`stroke-dasharray`)

## 2. Alphanumeric Canvas Integration
- [x] 2.1 Import `StrokeGuideline` into `AlphanumericCanvas/index.tsx`
- [x] 2.2 Render guidelines by default when character loads (before animation)
- [x] 2.3 Calculate starting point coordinates from first point of each SVG path
- [x] 2.4 Add visibility toggle (visible by default, optional fade on play)

## 3. Chinese Canvas Integration
- [x] 3.1 Extract stroke vector data using `HanziWriter.loadCharacterData()`
- [x] 3.2 Transform stroke `strokes[]` (SVG paths) into guideline-compatible format
- [x] 3.3 Extract median start points from `medians[]` for number placement
- [x] 3.4 Render `StrokeGuideline` layer on top of main character canvas
- [x] 3.5 Ensure guidelines are visible by default when character loads

## 4. Styling & Polish
- [x] 4.1 Add guideline styles to `index.css` (dashed strokes, lighter color)
- [x] 4.2 Style numbered indicators (circled numbers, appropriate size)
- [x] 4.3 Test responsiveness across different canvas sizes

## 5. Browser Verification
- [x] 5.1 Verify English letters show guidelines on load (test: letter "A")
- [x] 5.2 Verify numbers show guidelines on load (test: number "4")
- [x] 5.3 Verify Chinese characters show guidelines on load (test: "六")
- [x] 5.4 Verify guidelines remain or fade appropriately during animation


