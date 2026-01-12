/**
 * UI strings in Traditional Chinese (Hong Kong style / zh-HK)
 */
export const zhHK = {
  // App
  appTitle: '練筆順',
  
  // Category Selection
  selectCategory: '請選擇練習類別',
  numbers: '數字',
  englishAlphabet: '英文字母',
  chineseCharacters: '中文字',
  
  // Selection Grid Titles
  selectNumbers: '請選擇數字',
  selectEnglish: '請選擇英文字母',
  selectChinese: '請選擇中文字',
  uppercase: '大寫',
  lowercase: '小寫',
  
  // Practice Controls
  play: '播放',
  clear: '清除',
  next: '下一個',
  previous: '上一個',
  nextStroke: '下一筆',
  previousStroke: '上一筆',
  practice: '練習',
  
  // Feedback
  correct: '寫得好！',
  tryAgain: '請再試一次',
  successFeedback: '太棒了！寫得好正確！',
  
  // Hints
  strokeOrderHint: '筆順提示',
  
  // Navigation
  back: '返回',
  
  // Guideline Toggle
  showGuidelines: '顯示筆順',
  hideGuidelines: '隱藏筆順',

  // Custom Character Input
  customInputPlaceholder: '輸入想練習的中文字 (例如: 龍)',
  startPractice: '開始練習',
  invalidChineseInput: '請輸入中文字',
  charNotFound: '找不到此字的筆順資料',
  customProgress: '自定義',
  offlineLoadError: '請連接互聯網以加載此新字',
} as const

export type TranslationKey = keyof typeof zhHK
