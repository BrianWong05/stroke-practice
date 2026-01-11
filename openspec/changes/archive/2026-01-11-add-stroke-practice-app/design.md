# Design: Stroke Order Practice App

## Context
Educational touch-interface application for practicing handwriting with stroke order validation. Target audience includes children and adults learning to write Numbers, English letters, and Traditional Chinese characters. The app must provide real-time stroke feedback and visual guidance.

## Goals
- Provide intuitive stroke order practice with visual feedback
- Support three character types with appropriate canvas backgrounds
- Animate correct stroke order on demand
- Detect and validate user strokes (within practical limits)
- Maintain a clean, accessible, kid-friendly UI in Traditional Chinese (zh-HK)

## Non-Goals
- Full handwriting recognition (we validate stroke order, not handwriting quality)
- User accounts or progress persistence (out of initial scope)
- Custom character uploads or editing
- Simplified Chinese support

## Decisions

### Architecture: Single-Page React Application
**Decision**: Build as a Vite + React + TypeScript SPA with Tailwind CSS.
**Rationale**: Fast development, excellent touch support, easy deployment.

### Chinese Character Rendering: `hanzi-writer` Library
**Decision**: Use `hanzi-writer` for stroke animation and quiz functionality.
**Alternatives considered**:
- Custom SVG paths: Too complex, requires stroke data for thousands of characters
- Make My Own Hanzi: Less maintained, smaller dataset
**Rationale**: `hanzi-writer` provides pre-built stroke data, animation, and quiz modes with proven reliability.

### English/Number Rendering: Custom SVG Paths
**Decision**: Implement SVG paths with dashed stroke outlines for tracing.
**Rationale**: Limited character set (0-9, A-Z, a-z) makes custom implementation feasible. No suitable library exists for this specific use case.

### Canvas Guidelines
**Decision**: Use CSS-based backgrounds for guidelines.
- Chinese: Tian Zi Ge (田字格) pattern with cross lines
- English/Numbers: 4-line handwriting guide (ascender, x-height, baseline, descender)
**Rationale**: CSS backgrounds are performant and don't interfere with drawing logic.

### State Management: React Context + useState
**Decision**: Use React Context for app-wide state (selected category, current character index) and local useState for component state.
**Rationale**: App complexity doesn't warrant Redux or Zustand; Context is sufficient.

## Component Structure

```
src/
├── components/
│   ├── CategorySelector/      # Home page category buttons
│   ├── PracticeCanvas/        # Drawing canvas wrapper
│   │   ├── ChineseCanvas/     # hanzi-writer integration
│   │   └── AlphanumericCanvas/ # SVG tracing for English/Numbers
│   ├── Controls/              # Play, Clear, Next, Previous buttons
│   └── Layout/                # App shell, header, navigation
├── context/
│   └── PracticeContext.tsx    # Global practice state
├── data/
│   ├── characters.ts          # Chinese character list
│   ├── numbers.ts             # Number 0-9 SVG paths
│   └── alphabet.ts            # A-Z, a-z SVG paths
├── hooks/
│   └── usePractice.ts         # Practice session logic
└── i18n/
    └── zh-HK.ts               # All UI strings in Traditional Chinese
```

## Data Models

### Character Type
```typescript
type CharacterCategory = 'numbers' | 'english' | 'chinese';

interface PracticeState {
  category: CharacterCategory | null;
  currentIndex: number;
  characters: string[];
}
```

### SVG Path Data (for English/Numbers)
```typescript
interface StrokePath {
  character: string;
  paths: string[];       // SVG path d attributes
  viewBox: string;       // SVG viewBox
  strokeOrder: number[]; // Indices for animation order
}
```

## Risks / Trade-offs

### Risk: `hanzi-writer` Bundle Size
- **Impact**: ~500KB+ for stroke data
- **Mitigation**: Use dynamic imports, lazy-load character data

### Risk: Touch Accuracy on Small Screens
- **Impact**: Poor UX if canvas too small
- **Mitigation**: Enforce minimum canvas size, full-width on mobile

### Risk: SVG Path Creation for 62 Characters
- **Impact**: Time-consuming manual work
- **Mitigation**: Start with numbers (10 chars), then uppercase (26), then lowercase (26). Consider simplifying paths.

## Open Questions
1. Should stroke validation be strict (exact path) or lenient (approximate direction)?
   - **Proposal**: Start lenient for better UX
2. Should we include sound feedback for correct/incorrect strokes?
   - **Proposal**: Defer to Phase 2
3. What is the preset list of Chinese characters for initial release?
   - **Proposal**: 一, 二, 三, 四, 五, 六, 七, 八, 九, 十, 人, 大, 天, 日, 月, 山, 水, 火, 土, 木
