## MODIFIED Requirements

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
| Previous Stroke | 上一筆 |
| Next Stroke | 下一筆 |

#### Scenario: String consistency
- **WHEN** the app is deployed
- **THEN** all UI strings match the reference table exactly

#### Scenario: Stroke navigation labels
- **WHEN** user views the stroke navigation buttons
- **THEN** buttons display "上一筆" and "下一筆" respectively
