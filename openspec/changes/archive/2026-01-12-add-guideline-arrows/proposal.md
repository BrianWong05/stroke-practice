# Add Guideline Arrows

## Why
Users need clearer visual cues for the direction of each stroke. While the numbered indicators show where to start, adding an arrowhead at the end of the guideline will explicitly show the direction of movement.

## What Changes
### Practice Interface
- Update `StrokeGuideline` component:
    - Add SVG `<defs>` block with an arrowhead `<marker>`.
    - Apply `markerEnd="url(#guideline-arrow)"` to the dashed guideline paths.
    - Match the arrow color to the guideline color (`#d1d5db`).

## Verification Plan
### Visual Verification
- Inspect various characters (e.g., H, S, C) to ensure arrows appear at the end of strokes.
- Verify that arrows point in the correct direction of the stroke.
- Ensure arrows disappear/fade out along with the guideline when the stroke is completed.
