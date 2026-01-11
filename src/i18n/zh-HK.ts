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
  
  // Hints
  strokeOrderHint: '筆順提示',
  
  // Navigation
  back: '返回',
} as const

export type TranslationKey = keyof typeof zhHK
