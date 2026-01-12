# Change: Add Visual Stroke Order Guidelines

## Why
Users need to see stroke order at a glance before playing animations or practicing. The current interface only shows a ghost outline without indicating which stroke comes first, the direction, or the sequence. Adding visual guidelines (dotted lines, directional arrows, and numbered indicators) will help users understand stroke order immediately upon loading a character.

## What Changes
- **English Alphabet & Numbers**: Add a new "Guideline Layer" component that renders existing SVG paths as dashed strokes with numbered starting point indicators
- **Chinese Characters**: Create a dynamic guideline layer that extracts stroke data from `hanzi-writer` and renders:
  - Dashed/dotted stroke paths (using CSS `stroke-dasharray`)
  - Numbered indicators (①, ②, ③...) at each stroke's starting point
  - Optional directional arrows along paths
- **Default Visibility**: Guidelines are visible when a character loads; they may fade or remain during animation/practice

## Impact
- **Affected specs**: `practice-interface`
- **Affected code**:
  - `src/components/PracticeCanvas/AlphanumericCanvas/index.tsx` — add guideline layer
  - `src/components/PracticeCanvas/ChineseCanvas/index.tsx` — add guideline layer using stroke data from `hanzi-writer`
  - New: `src/components/shared/StrokeGuideline/` — reusable guideline components
