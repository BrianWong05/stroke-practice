# Design: Visual Stroke Order Guidelines

## Context
The practice interface currently shows ghost outlines without indicating stroke sequence. Users must click "播放" to see stroke order. This change adds visual guidelines visible on load.

## Goals
- Show stroke order at a glance before animation
- Support both English alphanumeric (SVG-based) and Chinese (hanzi-writer) canvases
- Maintain existing animation and practice flows

## Non-Goals
- Modifying existing SVG asset files (we layer guidelines on top)
- Adding user preferences for guideline visibility (future scope)
- Supporting directional arrows in v1 (deferred to future iteration)

## Decisions

### 1. Guideline Rendering Approach
**Decision**: Create a separate SVG layer that renders on top of existing content, using the same path data.

**Rationale**: This is non-destructive and doesn't modify existing animation logic. The guideline layer is purely visual and can be toggled independently.

### 2. Chinese Character Stroke Data
**Decision**: Use `HanziWriter.loadCharacterData()` API to extract stroke paths and medians.

**Data structure** (from hanzi-writer-data):
```typescript
interface CharacterData {
  strokes: string[]      // SVG path strings for each stroke
  medians: number[][][]  // Array of [x,y] points along each stroke
}
```

The `medians[strokeIndex][0]` gives the starting coordinate for number placement.

### 3. Number Indicator Design
**Decision**: Use Unicode circled numbers (①②③...) positioned at stroke start points.

**Fallback**: For strokes > 20, use plain numbers in a styled circle (`<circle>` + `<text>`).

### 4. Visibility Behavior
**Decision**: Guidelines are visible by default. During animation/practice:
- Option A: Keep guidelines visible as tracing reference
- Option B: Fade guidelines on play (configurable via prop)

Initial implementation uses **Option A** (always visible) for simplicity. User feedback may drive Option B.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Hanzi-writer data loading is async | Show guidelines only after data loads; handle loading state gracefully |
| Cluttered visuals on complex characters | Use light gray dashes (`#d1d5db`), thin stroke width, and subtle indicators |
| Performance on low-end devices | Guidelines are pure SVG; no canvas API overhead |

## Open Questions
1. Should directional arrows be added in this iteration or deferred?
   - **Decision**: Deferred to future iteration; focus on numbers first.
2. Should guidelines fade during animation?
   - **Decision**: Start with "always visible"; gather user feedback.
