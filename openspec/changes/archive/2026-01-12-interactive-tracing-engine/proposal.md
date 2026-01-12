# Interactive Stroke Tracing Engine

## Summary
Implement an interactive "Quiz Mode" for English letters and numbers, enabling users to trace strokes with validation and visual feedback, replicating the experience from the Chinese section.

## Motivation
Currently, English/Number practice is limited to passive observation ("Watch Mode"). Users need active reinforcement to build muscle memory. Since `hanzi-writer` (used for Chinese) does not support arbitrary SVG paths for English/Numbers, a custom path tracing engine is required.

## Proposed Solution
1.  **Tracing Engine**: specific logic to partial-match user pointer movement against an SVG path.
2.  **TracingCanvas Component**: A new component that accepts `StrokePath` data and handles the interaction (touch/mouse).
3.  **UI Integration**: Seamlessly swap the current `AlphanumericCanvas` (or wrap it) to support this interactive mode.

## Core Mechanics
-   **Active Stroke**: Only the "current" stroke index is interactive.
-   **Validation**: User must trace within a tolerance (e.g., 20px) of the path.
-   **Feedback**:
    -   *Guide*: Dashed outline of the current stroke.
    -   *Mistake*: Red flash/shake if deviating.
    -   *Success*: "Snap" to full stroke upon >80% coverage.
    -   *Completion*: "Awesome!" message.
