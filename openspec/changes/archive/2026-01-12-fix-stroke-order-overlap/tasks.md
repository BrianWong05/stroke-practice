# Tasks: Smart Stroke Indicator Positioning

- [x] **Create Path Geometry Utility** <!-- id: 0 -->
    - Create `src/utils/pathGeometry.ts`.
    - Implement `parsePathTangent(d: string): { x: number, y: number } | null` that extracts the start point and the initial tangent vector.
    - Support `L` (Line), `C` (Cubic Bezier), `Q` (Quad Bezier), `H` (Horizontal), `V` (Vertical) commands.
    - Test with sample paths from `alphabet.ts`.

- [x] **Refactor StrokeGuideline** <!-- id: 1 -->
    - Update `StrokeGuideline/index.tsx` to use `parsePathTangent` instead of `parsePathStartPoint`.
    - Calculate dynamic `x` and `y` for `NumberIndicator` using: `pos = start - tangent * offset`.
    - Define generic offset constant (e.g., `START_OFFSET = 18`. Updated to `22` in implementation).

- [x] **Verify & Tune** <!-- id: 2 -->
    - Check letters B, D, P, R, E, F.
    - Check Chinese characters (ensure indicators don't go off-bounds unexpectedly).
    - Adjust offset distance if needed.
