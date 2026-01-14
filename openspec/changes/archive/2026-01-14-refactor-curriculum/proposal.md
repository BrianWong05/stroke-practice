# Refactor Chinese Character Data into Curriculum Mode

## Problem
The current `chineseCharacters` array is a flat list, which lacks progression tracking. We need to structure the data into levels (Curriculum Mode) to guide users from simple lines to complex structures.

## Solution
Replace the flat `chineseCharacters` array in `src/data/characters.ts` with a structured `chineseCurriculum` object. This object will define levels with IDs, titles, descriptions, and character lists.

## Impact
- `src/data/characters.ts`: Major structural change.
- `src/App.tsx`: Needs to handle the new data structure (initially by flattening it for backward compatibility).
- `src/utils/hanziDataLoader.ts`: Needs to check against the new structure for offline data loading.
- `scripts/download-hanzi.js`: Regex parsing logic needs update to handle the new format.

## Risks
- Breaking changes for consumers of `chineseCharacters`.
- Offline data loader might fail if not updated correctly.

## Alternatives Considered
- Keeping `chineseCharacters` as a separate derived export. (Decided to move consumers to use the new source of truth where possible, but might use derived list for ease of transition).
