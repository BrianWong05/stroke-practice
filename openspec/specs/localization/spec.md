# localization Specification

## Purpose
TBD - created by archiving change add-stroke-practice-app. Update Purpose after archive.
## Requirements
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
The system SHALL use localized strings for all user-facing text, including interactive feedback messages.

#### Scenario: Interactive Success String addition
- **Given** completion feedback is required in Traditional Chinese (Hong Kong)
- **Then** the message "太棒了！寫得好正確！" should be defined and used for successful Chinese character completion.

