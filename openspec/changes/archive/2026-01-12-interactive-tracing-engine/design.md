# Design: SVG Path Tracing Engine

## 1. Architectural Overview
We need a lightweight "physics" engine that compares user input coordinates (Mouse/Touch) against a mathematical definition of an SVG path.

### Components
`TracingCanvas` (New Component)
|
+-- `SVG Layer` (Displays ghost/completed strokes)
+-- `Interaction Layer` (Transparent overlay for capturing events)
+-- `Feedback Layer` (Drawing the "user's line" in real-time)

## 2. Mathematical Approach (The "Engine")

### Path Interpolation
We cannot effectively check "distance to Bezier curve" cheaply in real-time without some pre-processing.
**Strategy: Point Sampling**
1.  On mount, use a hidden `<path>` element or a library (if lightweight) to `getPointAtLength()` at fixed intervals (e.g., every 5px).
2.  Store these points as `activePathPoints: {x, y}[]`.
3.  As the user drags (`onPointerMove`):
    -   Find the *closest* point in `activePathPoints` to the cursor.
    -   If `distance < threshold` (e.g., 20px), the input is **Valid**.
    -   Track "coverage": remove "visited" points from the set or mark them as covered.

### Progress Tracking
-   **Coverage Ratio**: `coveredPoints / totalPoints`.
-   **Snap Threshold**: If `coverage > 0.8`, consider the stroke complete. Trigger "Snap" animation.
-   **Order Enforcement**: We only load points for `paths[currentStrokeIndex]`. Input on other strokes is ignored.

## 3. Data Structure
No major changes to `alphabet.ts` are strictly required, as it already provides `paths: string[]`.
However, we might need to ensure directionality. SVG paths have a direction. The game will enforce drawing in the defined SVG direction.

## 4. Visual States
| State | Visual |
| :--- | :--- |
| **Idle** | Current stroke: Dashed, Faint Gray. Completed strokes: Solid Black. |
| **Dragging (Valid)** | Draw a temporary line following user input (e.g., Blue/Dark Grey ink). |
| **Dragging (Invalid)** | If user deviates > `threshold`, stop drawing or flash Red. |
| **Snapped** | The temporary line disappears; the underlying SVG stroke becomes Solid Black with a "pop" animation. |

## 5. UI Integration
We will modify the parent container (likely `PracticeCanvas` logic) to switch between `AlphanumericCanvas` (Play Mode) and `TracingCanvas` (Quiz Mode).
*Ideally*, we should unify them, but starting with a separate component is safer to avoid breaking the existing detailed animation logic.

## 6. Accessibility
-   Support Touch (mobile) and Mouse (desktop).
-   Prevent scrolling while tracing (`touch-action: none`).
