# Character Selection Grid

## Summary
Introduce an intermediate "Selection Grid" screen between the Category Home and the Practice Interface. This allows users to choose a specific character to practice immediately instead of starting from the beginning or navigating sequentially.

## Motivation
Currently, users are forced directly into the practice mode upon selecting a category. A selection menu improves usability by allowing random access to specific characters, especially for larger sets like Chinese characters.

## Proposed Solution
1.  Introduce a `view` state in `PracticeContext` (`categories` | `grid` | `practice`).
2.  Create a new `CharacterGrid` component that displays available characters for the active category.
3.  Update navigation flow:
    *   Home -> Select Category -> **Selection Grid**
    *   Selection Grid -> Select Character -> **Practice Interface**
    *   Practice Interface -> Back -> **Selection Grid**
    *   Selection Grid -> Back -> **Home**

## Design Details
*   **Grid Layout**: Responsive grid adapting to screen size.
*   **Sections**: Specifically for "English", split into Uppercase and Lowercase sections.
*   **Styling**: Matches existing card aesthetic (white bg, shadow, rounded).
*   **Localization**: All labels localized in `zh-HK`.

## Impact Checklist
- [ ] UI/UX changes: New screen added.
- [ ] State Management: New `view` state and actions in reducer.
- [ ] Components: New `CharacterGrid.tsx`.
- [ ] Assets: None.
