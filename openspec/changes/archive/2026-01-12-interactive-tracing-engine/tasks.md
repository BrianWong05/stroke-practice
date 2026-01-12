# Tasks: Interactive Tracing Engine

1.  [x] **Prototype Tracing Logic** (Spike) <!-- ID: 1 -->
    -   Create a helper `usePathSampler(pathData: string)` that returns sampled points.
    -   Create a test component to visualize these points and test "hit detection" with mouse events.

2.  [x] **Implement `TracingCanvas` Component** <!-- ID: 2 -->
    -   Scaffold the component accepting `character`, `paths`, `width`, `height`.
    -   Setup SVG and transparent interaction layer.
    -   Implement `isPointInStroke` logic using the sampler from Task 1.

3.  [x] **Implement Interaction State Machine** <!-- ID: 3 -->
    -   Handle `onPointerDown`: Check start point proximity.
    -   Handle `onPointerMove`: Update "ink" path if valid; reject if invalid.
    -   Handle `onPointerUp`: Check if stroke is complete (>80%). If so, advance index.

4.  [x] **Visual Feedback System** <!-- ID: 4 -->
    -   Add "Guideline" style (Dashed).
    -   Add "Snap" animation (Framer Motion or CSS Class).
    -   Add "Mistake" feedback (Shake animation).

5.  [x] **Integration** <!-- ID: 5 -->
    -   Add `mode` prop ('view' | 'quiz') to the relevant parent container.
    -   Render `TracingCanvas` when in 'quiz' mode.
    -   Ensure "Success" message triggers when all strokes are done.

6.  [x] **Refinement & Mobile Support** <!-- ID: 6 -->
    -   Test on Touch dimension simulation.
    -   Tune thresholds (20px vs 40px).
