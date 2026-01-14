export interface Level {
  id: string
  title: string
  description: string
  characters: string[]
}

export const chineseCurriculum: Level[] = [
  {
    id: 'level-1',
    title: '第一級：基礎線條 (Foundation)',
    description: '練習直線與穩定的筆觸',
    characters: [
      '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
      '人', '入', '大', '天', '土', '山', '工', '干', '上', '下',
      '夕', '小', '寸', '心', '手', '水', '火', '文', '木', '中',
      '止', '少', '牛', '王'
    ]
  },
  {
    id: 'level-2',
    title: '第二級：左右結構 (Left & Right)',
    description: '學習兩個部件並排的結構',
    characters: [
      '仁', '什', '仙', '他', '仔', '休', '位', '住', '好', '林',
      '明', '和', '知', '非', '比', '公', '分', '伴', '閃'
    ]
  },
  {
    id: 'level-3',
    title: '第三級：上下結構 (Top & Bottom)',
    description: '學習部件上下的堆疊',
    characters: [
      '古', '只', '召', '旦', '早', '全', '吉', '多', '呂', '炎',
      '圭', '見', '貝', '車', '長', '兒', '雨', '青', '男', '角', '豆'
    ]
  },
  {
    id: 'level-4',
    title: '第四級：包圍與封閉 (Enclosed)',
    description: '先入內，後關門',
    characters: [
      '口', '日', '月', '田', '目', '囚', '回', '因', '同', '向',
      '門', '白', '勺'
    ]
  },
  {
    id: 'level-5',
    title: '第五級：進階字庫 (Advanced)',
    description: '更多生活常用字',
    characters: [
      '不', '友', '牙', '瓜', '禾', '立', '皮', '石', '羊', '米',
      '耳', '虫', '衣', '足', '走', '里'
    ]
  }
]

/**
 * Flattened list for backward compatibility with existing components
 */
export const chineseCharacters: string[] = chineseCurriculum.flatMap(level => level.characters)
