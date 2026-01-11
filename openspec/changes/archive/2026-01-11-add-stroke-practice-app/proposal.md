# Change: Add Stroke Order Practice App (練筆順 App)

## Why
Users need an educational app to practice writing Numbers (0-9), English Alphabets (A-Z, a-z), and Traditional Chinese Characters with correct stroke order. The entire UI must be in Traditional Chinese (Hong Kong style / zh-HK) to serve the target audience.

## What Changes
- **Category Selection Page**: Home screen with three practice modes (數字, 英文字母, 中文字)
- **Practice Interface**: Large canvas with stroke detection, guidelines, and navigation controls
- **Chinese Character Support**: Integration with `hanzi-writer` library for stroke animation and validation
- **English/Number Support**: SVG-based tracing with ghost outlines and 4-line handwriting guidelines
- **Localization**: All UI text in Traditional Chinese (zh-HK), following Hong Kong phrasing conventions

## Impact
- **Affected specs**: 
  - `category-selection` (NEW)
  - `practice-interface` (NEW)
  - `localization` (NEW)
- **Affected code**: 
  - New React application with Vite + TypeScript
  - Tailwind CSS for styling
  - `hanzi-writer` library for Chinese character rendering
  - Custom SVG paths for English/Number tracing
  - Lucide-React for icons

## Technical Constraints
- Must be mobile-friendly and touch-responsive
- Clean, bright, kid-friendly but professional aesthetic
- High contrast for accessibility
- Use Noto Sans HK font for Traditional Chinese
