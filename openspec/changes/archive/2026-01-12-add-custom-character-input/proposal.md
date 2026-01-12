# Change: Add Custom Character Input for Chinese Practice

## Why
Users want to practice Chinese characters beyond the preset list. Adding a custom character input field on the Chinese Selection screen allows users to type **any** Chinese character and immediately practice it with `hanzi-writer`.

## What Changes
- Add a prominent input bar above the preset character grid on the Chinese selection screen
- Validate input is a single CJK character using Unicode regex `[\u4e00-\u9fa5]`
- Navigate to practice interface with the custom character on submit
- Handle `hanzi-writer` load failures gracefully with a fallback UI

## Impact
- Affected specs: `selection-flow`, `practice-interface`
- Affected code: `CharacterGrid/index.tsx`, `PracticeContext.tsx`, `ChineseCanvas/index.tsx`, i18n translation files
