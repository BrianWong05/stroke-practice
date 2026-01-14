# Update Chinese Selection UI to Support Categorized Curriculum

## Problem
The current Chinese character selection is a flat, overwhelming grid of 100+ characters. We recently structured the data into a curriculum (learning levels), but the UI does not yet reflect this, making it hard for users to follow a progression path.

## Solution
Refactor `src/components/CharacterGrid/index.tsx` to display characters in collapsible accordion sections corresponding to the `chineseCurriculum` levels.

### Key Changes
- **Accordion Layout:** Group characters by level with collapsible headers displaying title and description.
- **Sticky Search:** Keep the custom input field pinned to the top for easy access.
- **Interaction:** Sections toggle open/closed; clicking a character navigates to practice mode (maintaining existing logic).

## Impact
- `src/components/CharacterGrid/index.tsx`: Significant rendering logic change for 'chinese' category.
- **User Experience:** greatly improved navigability and sense of progression.

## UX Design
- **Headers:** Light gray background, clear title/description.
- **Toggle:** Chevron icon indicating state.
- **Defaults:** Level 1 open by default.
