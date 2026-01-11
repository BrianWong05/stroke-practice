## ADDED Requirements

### Requirement: Traditional Chinese UI Language
The system SHALL display all user interface text in Traditional Chinese (Hong Kong style / zh-HK). Simplified Chinese or English text in the UI is NOT permitted.

#### Scenario: Homepage text
- **WHEN** user views the category selection page
- **THEN** the title reads "練筆順" and the instruction reads "請選擇練習類別"

#### Scenario: Category labels
- **WHEN** user views category buttons
- **THEN** labels are "數字", "英文字母", and "中文字"

#### Scenario: Control button labels
- **WHEN** user views the practice interface
- **THEN** buttons are labeled "播放", "清除", "下一個", "上一個"

---

### Requirement: Hong Kong Phrasing Conventions
The system SHALL use Hong Kong-style Traditional Chinese phrasing rather than Taiwan-style where differences exist.

#### Scenario: Feedback messages
- **WHEN** user receives feedback
- **THEN** messages use Hong Kong phrasing (e.g., "寫得好！" not "寫得很好！")

---

### Requirement: Localization String Reference
The following UI strings SHALL be used exactly:

| English Reference | zh-HK Display |
|-------------------|---------------|
| Select Category | 請選擇練習類別 |
| Numbers | 數字 |
| English Alphabet | 英文字母 |
| Chinese Characters | 中文字 |
| Practice | 練習 |
| Correct! | 寫得好！ |
| Try Again | 請再試一次 |
| Stroke Order Hint | 筆順提示 |
| Play | 播放 |
| Clear | 清除 |
| Next | 下一個 |
| Previous | 上一個 |
| App Title | 練筆順 |

#### Scenario: String consistency
- **WHEN** the app is deployed
- **THEN** all UI strings match the reference table exactly
