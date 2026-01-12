/**
 * English alphabet characters for practice (A-Z, a-z)
 */
export const uppercaseAlphabet: string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z',
]

export const lowercaseAlphabet: string[] = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z',
]

export const englishAlphabet: string[] = [
  ...uppercaseAlphabet,
  ...lowercaseAlphabet,
]

/**
 * SVG path data for letter stroke animation
 */
export interface StrokePath {
  character: string
  viewBox: string
  paths: string[]
  // Optional manual overrides for indicator positions
  // index matches paths array
  indicatorOverrides?: ({ x: number, y: number } | null)[]
}

// Uppercase letter paths (simplified for demonstration)
export const uppercasePaths: StrokePath[] = [
  {
    character: 'A',
    viewBox: '0 0 100 140',
    paths: [
      'M50 20 L15 120',
      'M50 20 L85 120',
      'M30 80 L70 80'
    ],
    indicatorOverrides: [
        { x: 32, y: 15 }, // 1. Left diagonal - shift Left
        { x: 68, y: 15 }, // 2. Right diagonal - shift Right
        null // 3. Crossbar - auto
    ]
  },
  {
    character: 'B',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120',
      'M25 20 L60 20 C85 20 85 65 50 70 L25 70',
      'M25 70 L55 70 C90 70 90 120 60 120 L25 120'
    ]
  },
  {
    character: 'C',
    viewBox: '0 0 100 140',
    paths: [
      'M80 35 C60 15 25 25 20 70 C15 115 55 130 80 105'
    ]
  },
  {
    character: 'D',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120',
      'M25 20 L50 20 C90 30 90 110 50 120 L25 120'
    ]
  },
  {
    character: 'E',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120', // 1. Vertical straight line
      'M25 20 L75 20',  // 2. Top horizontal
      'M25 70 L60 70',  // 3. Middle horizontal
      'M25 120 L75 120' // 4. Bottom horizontal
    ]
  },
  {
    character: 'F',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120',
      'M25 20 L75 20',
      'M25 70 L60 70'
    ]
  },
  {
    character: 'G',
    viewBox: '0 0 100 140',
    paths: [
      'M80 35 C60 15 25 25 20 70 C15 115 55 130 80 105 L80 70 L55 70'
    ]
  },
  {
    character: 'H',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120',
      'M75 20 L75 120',
      'M25 70 L75 70'
    ]
  },
  {
    character: 'I',
    viewBox: '0 0 100 140',
    paths: [
      'M35 20 L65 20',
      'M50 20 L50 120',
      'M35 120 L65 120'
    ]
  },
  {
    character: 'J',
    viewBox: '0 0 100 140',
    paths: [
      'M35 20 L75 20',
      'M55 20 L55 95 C55 115 35 120 25 105'
    ]
  },
  {
    character: 'K',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120',
      'M75 20 L25 70',
      'M25 70 L75 120'
    ]
  },
  {
    character: 'L',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120 L75 120'
    ]
  },
  {
    character: 'M',
    viewBox: '0 0 100 140',
    paths: [
      'M20 20 L20 120', // 1. Vertical straight line down
      'M20 20 L50 120', // 2. Diagonal down to center
      'M50 120 L80 20', // 3. Diagonal up to right
      'M80 20 L80 120'  // 4. Vertical straight line down
    ],
    indicatorOverrides: [
        { x: 10, y: 20 }, // 1. Shift left
        { x: 35, y: 35 }, // 2. Shift down-right
        null,
        null
    ]
  },
  {
    character: 'N',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120', // 1. Vertical down
      'M25 20 L75 120', // 2. Diagonal down
      'M75 120 L75 20'  // 3. Vertical up
    ],
    indicatorOverrides: [
        { x: 15, y: 20 }, // 1. Shift left
        { x: 40, y: 35 }, // 2. Shift down-right
        null
    ]
  },
  {
    character: 'O',
    viewBox: '0 0 100 140',
    paths: [
      'M50 20 C15 20 15 120 50 120 C85 120 85 20 50 20'
    ]
  },
  {
    character: 'P',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120',
      'M25 20 L60 20 C90 25 90 70 60 75 L25 75'
    ]
  },
  {
    character: 'Q',
    viewBox: '0 0 100 140',
    paths: [
      'M50 20 C15 20 15 120 50 120 C85 120 85 20 50 20',
      'M60 95 L80 120'
    ]
  },
  {
    character: 'R',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120',
      'M25 20 L60 20 C90 25 90 65 60 70 L25 70',
      'M25 70 L80 120'
    ]
  },
  {
    character: 'S',
    viewBox: '0 0 100 140',
    paths: [
      'M75 35 C60 15 25 20 25 50 C25 75 75 70 75 100 C75 125 40 130 20 110'
    ]
  },
  {
    character: 'T',
    viewBox: '0 0 100 140',
    paths: [
      'M20 20 L80 20',   // 1. Top horizontal bar
      'M50 20 L50 120' // 2. Vertical straight line down
    ]
  },
  {
    character: 'U',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 90 C25 120 75 120 75 90 L75 20'
    ]
  },
  {
    character: 'V',
    viewBox: '0 0 100 140',
    paths: [
      'M20 20 L50 120',
      'M50 120 L80 20'
    ]
  },
  {
    character: 'W',
    viewBox: '0 0 100 140',
    paths: [
      'M15 20 L30 120',
      'M30 120 L50 60',
      'M50 60 L70 120',
      'M70 120 L85 20'
    ]
  },
  {
    character: 'X',
    viewBox: '0 0 100 140',
    paths: [
      'M20 20 L80 120',
      'M80 20 L20 120'
    ]
  },
  {
    character: 'Y',
    viewBox: '0 0 100 140',
    paths: [
      'M20 20 L50 70',
      'M80 20 L50 70',
      'M50 70 L50 120'
    ]
  },
  {
    character: 'Z',
    viewBox: '0 0 100 140',
    paths: [
      'M20 20 L80 20',
      'M80 20 L20 120',
      'M20 120 L80 120'
    ]
  },
]

// Lowercase letter paths (simplified for demonstration)
export const lowercasePaths: StrokePath[] = [
  {
    character: 'a',
    viewBox: '0 0 100 140',
    paths: [
      'M70 55 C70 35 40 35 35 55 C30 75 35 95 50 95 C65 95 70 80 70 55',
      'M70 55 L70 95'
    ],
    indicatorOverrides: [
        { x: 90, y: 55 }, // 1. Loop - right side
        { x: 70, y: 35 }  // 2. Stem - top
    ]
  },
  {
    character: 'b',
    viewBox: '0 0 100 140',
    paths: [
      'M30 20 L30 95',
      'M30 55 C35 40 60 40 65 55 C70 75 65 95 50 95 C35 95 30 80 30 55'
    ],
    indicatorOverrides: [
        { x: 30, y: 10 }, // 1. Stem - top
        { x: 10, y: 55 }  // 2. Loop start - left side
    ]
  },
  {
    character: 'c',
    viewBox: '0 0 100 140',
    paths: [
      'M70 50 C55 35 35 40 30 65 C25 90 45 100 70 90'
    ]
  },
  {
    character: 'd',
    viewBox: '0 0 100 140',
    paths: [
      'M70 55 C65 40 40 40 35 55 C30 75 35 95 50 95 C65 95 70 80 70 55', // 1. Loop
      'M70 20 L70 95' // 2. Stem
    ],
    indicatorOverrides: [
        { x: 50, y: 55 }, // 1. Loop - left/center
        { x: 70, y: 10 }  // 2. Stem - top
    ]
  },
  {
    character: 'e',
    viewBox: '0 0 100 140',
    paths: [
      'M30 70 L70 70 C70 45 45 40 30 55 C15 75 30 100 70 90'
    ]
  },
  {
    character: 'f',
    viewBox: '0 0 100 140',
    paths: [
      'M65 30 C55 20 40 25 40 40 L40 95',
      'M25 55 L55 55'
    ]
  },
  {
    character: 'g',
    viewBox: '0 0 100 140',
    paths: [
      'M70 55 C70 35 40 35 35 55 C30 75 35 95 50 95 C65 95 70 80 70 55',
      'M70 55 L70 110 C70 130 40 130 30 115'
    ],
    indicatorOverrides: [
        { x: 50, y: 55 }, // 1. Loop - center/left
        { x: 70, y: 35 }  // 2. Tail - top right
    ]
  },
  {
    character: 'h',
    viewBox: '0 0 100 140',
    paths: [
      'M30 20 L30 95',
      'M30 55 C35 40 60 40 65 55 L65 95'
    ],
    indicatorOverrides: [
        { x: 30, y: 10 }, // 1. Stem - top
        { x: 10, y: 55 }  // 2. Arch - left side
    ]
  },
  {
    character: 'i',
    viewBox: '0 0 100 140',
    paths: [
      'M50 50 L50 95', // 1. Stem
      'M50 35 L50 37'  // 2. Dot
    ],
    indicatorOverrides: [
        { x: 30, y: 60 }, // 1. Stem - move left and down to clear dot area
        { x: 50, y: 15 }  // 2. Dot - move higher
    ]
  },
  {
    character: 'j',
    viewBox: '0 0 100 140',
    paths: [
      'M55 50 L55 110 C55 130 35 130 25 115', // 1. Tail
      'M55 35 L55 37' // 2. Dot
    ],
    indicatorOverrides: [
        { x: 35, y: 60 }, // 1. Tail - move left and down
        { x: 55, y: 15 }  // 2. Dot - move higher
    ]
  },
  {
    character: 'k',
    viewBox: '0 0 100 140',
    paths: [
      'M30 20 L30 95',
      'M65 50 L30 75',
      'M30 75 L70 95'
    ]
  },
  {
    character: 'l',
    viewBox: '0 0 100 140',
    paths: [
      'M50 20 L50 95'
    ]
  },
  {
    character: 'm',
    viewBox: '0 0 100 140',
    paths: [
      'M20 45 L20 95',
      'M20 55 C25 45 40 45 45 55 L45 95',
      'M45 55 C50 45 65 45 70 55 L70 95'
    ],
    indicatorOverrides: [
        { x: 20, y: 35 }, // 1. Stem - shifted up
        { x: 35, y: 40 }, // 2. Arch 1 - top center
        { x: 60, y: 40 }  // 3. Arch 2 - top center
    ]
  },
  {
    character: 'n',
    viewBox: '0 0 100 140',
    paths: [
      'M30 45 L30 95',
      'M30 55 C35 40 60 40 65 55 L65 95'
    ],
    indicatorOverrides: [
        { x: 30, y: 35 }, // 1. Stem - shifted up
        { x: 50, y: 40 }  // 2. Arch - top center
    ]
  },
  {
    character: 'o',
    viewBox: '0 0 100 140',
    paths: [
      'M50 50 C25 50 25 95 50 95 C75 95 75 50 50 50'
    ]
  },
  {
    character: 'p',
    viewBox: '0 0 100 140',
    paths: [
      'M30 50 L30 120',
      'M30 55 C35 40 60 40 65 55 C70 75 65 95 50 95 C35 95 30 80 30 55'
    ],
    indicatorOverrides: [
        { x: 30, y: 40 }, // 1. Stem - top 
        { x: 10, y: 65 }  // 2. Loop start - left side (shifted down)
    ]
  },
  {
    character: 'q',
    viewBox: '0 0 100 140',
    paths: [
      'M70 55 C65 40 40 40 35 55 C30 75 35 95 50 95 C65 95 70 80 70 55', // 1. Loop
      'M70 50 L70 120' // 2. Stem
    ],
    indicatorOverrides: [
        { x: 50, y: 55 }, // 1. Loop - center/left
        { x: 70, y: 40 }  // 2. Stem - top
    ]
  },
  {
    character: 'r',
    viewBox: '0 0 100 140',
    paths: [
      'M35 45 L35 95',
      'M35 55 C45 45 70 50 70 60'
    ]
  },
  {
    character: 's',
    viewBox: '0 0 100 140',
    paths: [
      'M65 55 C55 45 35 45 35 60 C35 75 65 75 65 85 C65 100 40 100 30 90'
    ]
  },
  {
    character: 't',
    viewBox: '0 0 100 140',
    paths: [
      'M50 30 L50 85 C50 95 60 95 70 90',
      'M35 50 L65 50'
    ]
  },
  {
    character: 'u',
    viewBox: '0 0 100 140',
    paths: [
      'M30 50 L30 80 C30 95 55 95 60 80',
      'M60 50 L60 95'
    ]
  },
  {
    character: 'v',
    viewBox: '0 0 100 140',
    paths: [
      'M25 50 L50 95',
      'M50 95 L75 50'
    ]
  },
  {
    character: 'w',
    viewBox: '0 0 100 140',
    paths: [
      'M20 50 L30 95',
      'M30 95 L50 65',
      'M50 65 L70 95',
      'M70 95 L80 50'
    ]
  },
  {
    character: 'x',
    viewBox: '0 0 100 140',
    paths: [
      'M30 50 L70 95',
      'M70 50 L30 95'
    ]
  },
  {
    character: 'y',
    viewBox: '0 0 100 140',
    paths: [
      'M30 50 L50 80',
      'M70 50 L30 130'
    ]
  },
  {
    character: 'z',
    viewBox: '0 0 100 140',
    paths: [
      'M30 50 L70 50',
      'M70 50 L30 95',
      'M30 95 L70 95'
    ]
  },
]

export const alphabetPaths: StrokePath[] = [
  ...uppercasePaths,
  ...lowercasePaths,
]
