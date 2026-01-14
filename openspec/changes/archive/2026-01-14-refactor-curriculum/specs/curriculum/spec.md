# Curriculum Data Structure

## ADDED Requirements

The application data must support a structured curriculum to guide user progression.

### Requirement: Structured Data Export
The `src/data/characters.ts` file MUST be refactored to export a structured curriculum object instead of a flat list.

#### Scenario: Data file exports structured curriculum
Given I check `src/data/characters.ts`
Then it should export a `chineseCurriculum` constant
And `chineseCurriculum` should be an array of level objects
And each level object should have `id`, `title`, `description`, and `characters` (string array).

### Requirement: Backward Compatibility
The system MUST maintain backward compatibility for existing components by providing a flat list of characters.

#### Scenario: Backward compatibility
Given the application uses `chineseCharacters` flat array
When I access `src/data/characters.ts`
Then it should still export `chineseCharacters` (either explicitly or derived) containing all unique characters from the curriculum
So that existing components like `CategorySelector` continue to work without major refactor.

### Requirement: Script Support
The offline download script MUST be updated to work with the new data structure.

#### Scenario: Script compatibility
Given the `download-hanzi.js` script
When I run it
Then it should correctly identify all characters listed in `chineseCurriculum`
And verify their existence/download them.
