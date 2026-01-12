# Proposal: Smart Stroke Indicator Positioning

## Objective
Fix the visual overlap between stroke order indicators (circled numbers) and the character strokes/other indicators, specifically in English letters and numbers where multiple strokes often start at the same coordinate.

## Problem
Currently, `StrokeGuideline` places the number indicator exactly at the `M` (move to) coordinate of the SVG path.
- In characters like "B", Stroke 1 (vertical) and Stroke 2 (curved) start at the exact same point `(25, 20)`.
- This causes the indicators to stack on top of each other and on top of the stroke itself, reducing readability.

## Solution
Implement "Smart Positioning" that calculates an offset for each indicator based on the **initial direction** (tangent) of the stroke.
- calculated position = `StartPoint - (TangentVector * OffsetDistance)`
- This "pulls" the number back from the stroke start, effectively placing it "before" the stroke begins.

### Example (Letter "B")
- **Stroke 1** (Vertical down): Starts `(25,20)`, goes `(0, 1)`. Indicator moves Up `(0, -1)`.
- **Stroke 2** (Horizontal right): Starts `(25,20)`, goes `(1, 0)`. Indicator moves Left `(-1, 0)`.
- Result: Indicator ① is above, Indicator ② is to the left. No overlap.

## Changes
1.  **Refactor `parsePathStartPoint`**: Rename to `parsePathGeometry` or similar. Update it to parse not just the `M` command but also the subsequent command (`L`, `C`, `Q`, etc.) to calculate the initial tangent vector.
2.  **Update `StrokeGuideline`**: Use the calculated tangent to apply an offset (e.g., 12-16px) to the `NumberIndicator` position.
3.  **Fallback**: If path is too short or complex to parse, default to existing behavior (no offset).

## Validation
- Verify "B", "D", "P", "R" (common shared start points).
- Verify "5" (horizontal then vertical).
- Verify generic paths in Chinese characters (should also benefit, but need to check for regression/off-screen issues).
