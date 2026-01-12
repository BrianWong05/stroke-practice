# Tasks: Add Custom Character Input

## 1. Context & State Management
- [x] 1.1 Add `SET_CUSTOM_CHARACTER` action to `PracticeContext.tsx`
- [x] 1.2 Update reducer to handle custom character navigation (set `view: 'practice'` and store custom character separately or at index -1)

## 2. UI Implementation
- [x] 2.1 Create `CustomCharacterInput` component with input field + submit button
- [x] 2.2 Integrate component into `CharacterGrid/index.tsx` (display above grid for `chinese` category only)
- [x] 2.3 Style input bar to be prominent, centered, with rounded corners matching card aesthetic

## 3. Input Validation
- [x] 3.1 Implement Chinese character regex validation `[\u4e00-\u9fa5]`
- [x] 3.2 Display zh-HK error message "請輸入中文字" for invalid input
- [x] 3.3 Limit input to 1 character (auto-take first char if string pasted)

## 4. Error Handling
- [x] 4.1 Handle `onLoadCharDataError` in `ChineseCanvas` when `hanzi-writer` fails to load character data
- [x] 4.2 Display fallback UI: "找不到此字的筆順資料" with Back button

## 5. i18n
- [x] 5.1 Add translation keys for input placeholder, button label, error messages

## 6. Verification
- [x] 6.1 Manual test: Enter valid character (e.g., "龍") and verify practice loads
- [x] 6.2 Manual test: Enter invalid input (e.g., "A", "1") and verify error message
- [x] 6.3 Manual test: Enter rare/unsupported character and verify fallback UI
