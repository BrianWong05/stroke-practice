# Tasks: Stroke Order Practice App

## 1. Project Setup
- [x] 1.1 Initialize Vite project with React + TypeScript
- [x] 1.2 Install and configure Tailwind CSS
- [x] 1.3 Install dependencies: `hanzi-writer`, `lucide-react`
- [x] 1.4 Configure Google Fonts (Noto Sans HK)
- [x] 1.5 Set up absolute imports with `@/` alias
- [x] 1.6 Create base folder structure (`components/`, `context/`, `data/`, `hooks/`, `i18n/`)

## 2. Localization Setup
- [x] 2.1 Create `i18n/zh-HK.ts` with all UI strings
- [x] 2.2 Create localization hook/context for string access

## 3. Layout & Navigation
- [x] 3.1 Create `Layout` component (app shell with header)
- [x] 3.2 Style header with app title: 練筆順
- [x] 3.3 Add back navigation from practice page to home

## 4. Category Selection Page
- [x] 4.1 Create `CategorySelector` component
- [x] 4.2 Implement three category buttons: 數字, 英文字母, 中文字
- [x] 4.3 Style buttons with icons (Lucide) and responsive layout
- [x] 4.4 Wire up navigation to practice interface

## 5. Practice Context & State
- [x] 5.1 Create `PracticeContext` with category, currentIndex, characters
- [x] 5.2 Create `usePractice` hook for navigation (next, previous)
- [x] 5.3 Populate character arrays for each category

## 6. Practice Interface - Common
- [x] 6.1 Create `PracticeCanvas` wrapper component
- [x] 6.2 Implement control buttons: 播放, 清除, 下一個, 上一個
- [x] 6.3 Display current character prominently
- [x] 6.4 Add progress indicator (e.g., "3 / 10")

## 7. Chinese Character Practice (hanzi-writer)
- [x] 7.1 Create `ChineseCanvas` component
- [x] 7.2 Integrate `hanzi-writer` with Tian Zi Ge (田字格) background
- [x] 7.3 Implement "Play" (animate stroke order)
- [x] 7.4 Implement "Clear" (reset canvas)
- [x] 7.5 Connect hanzi-writer quiz mode for stroke detection

## 8. English/Number Practice (SVG Tracing)
- [x] 8.1 Create `AlphanumericCanvas` component
- [x] 8.2 Add 4-line handwriting guidelines as CSS background
- [x] 8.3 Create SVG path data for numbers 0-9
- [x] 8.4 Create SVG path data for uppercase A-Z (partial)
- [x] 8.5 Create SVG path data for lowercase a-z (partial)
- [x] 8.6 Implement ghost outline rendering
- [x] 8.7 Implement stroke animation for "Play" button
- [ ] 8.8 Implement basic stroke tracing detection (deferred)

## 9. Feedback & Polish
- [x] 9.1 Add visual feedback for correct strokes (寫得好！)
- [x] 9.2 Add visual feedback for incorrect strokes (請再試一次)
- [x] 9.3 Ensure responsive design for mobile
- [x] 9.4 Test touch interactions on mobile viewport
- [x] 9.5 Verify high-contrast accessibility

## 10. Validation
- [x] 10.1 Manual testing: Category selection navigates correctly
- [x] 10.2 Manual testing: Chinese characters animate and detect strokes
- [x] 10.3 Manual testing: English/Number tracing works with guidelines
- [x] 10.4 Manual testing: All UI text is in Traditional Chinese (zh-HK)
- [x] 10.5 Manual testing: Responsive on mobile viewport (375px width)

## Dependencies
- Tasks 4.x depend on 3.x (Layout)
- Tasks 6.x-8.x depend on 5.x (Context)
- Tasks 7.x and 8.x can be parallelized
- Task 9.x depends on 7.x and 8.x

## Notes
- Task 8.8 (stroke tracing detection for English/Numbers) is deferred to Phase 2
- SVG paths for letters are partial - more can be added as needed
