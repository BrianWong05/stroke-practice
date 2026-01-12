/**
 * Number characters for practice (0-9)
 */
export const numbers: string[] = [
  '0', '1', '2', '3', '4',
  '5', '6', '7', '8', '9',
]

/**
 * SVG path data for number stroke animation
 * Each path represents the stroke order for that number
 */
export interface StrokePath {
  character: string
  viewBox: string
  paths: string[]
  // Optional manual overrides for indicator positions
  // index matches paths array
  indicatorOverrides?: ({ x: number, y: number } | null)[]
}

export const numberPaths: StrokePath[] = [
  {
    character: '0',
    viewBox: '0 0 100 140',
    paths: [
      'M50 20 C20 20 15 50 15 70 C15 90 20 120 50 120 C80 120 85 90 85 70 C85 50 80 20 50 20'
    ]
  },
  {
    character: '1',
    viewBox: '0 0 100 140',
    paths: [
      'M50 20 L50 120'
    ]
  },
  {
    character: '2',
    viewBox: '0 0 100 140',
    paths: [
      'M20 40 C20 20 40 15 50 15 C70 15 85 30 85 45 C85 70 20 100 20 120 L85 120'
    ]
  },
  {
    character: '3',
    viewBox: '0 0 100 140',
    paths: [
      'M32 30 C45 12 78 12 78 40 C78 58 60 62 40 65 C65 68 82 78 82 105 C82 132 45 132 25 115'
    ]
  },
  {
    character: '4',
    viewBox: '0 0 100 140',
    paths: [
      'M60 20 L20 85 L85 85',
      'M60 50 L60 120'
    ],
    indicatorOverrides: [
        null, // 1st stroke uses auto positioning
        { x: 80, y: 50 }, // 2nd stroke: move to right side of vertical line to avoid crossing stroke 1
    ]
  },
  {
    character: '5',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L20 60', // 1. Vertical stroke down
      'M20 60 C40 50 80 55 80 85 C80 115 50 125 20 110', // 2. Curved belly
      'M25 20 L75 20' // 3. Top horizontal stroke (Left to Right)
    ]
  },
  {
    character: '6',
    viewBox: '0 0 100 140',
    paths: [
      'M70 20 C45 20 25 50 25 85 C25 120 60 125 80 105 C90 90 80 65 55 65 C40 65 30 85 30 85'
    ]
  },
  {
    character: '7',
    viewBox: '0 0 100 140',
    paths: [
      'M20 20 L80 20 L40 120'
    ]
  },
  {
    character: '8',
    viewBox: '0 0 100 140',
    paths: [
      'M70 30 C60 15 40 15 30 30 C20 45 60 75 75 95 C85 115 65 125 50 125 C35 125 15 115 25 95 C40 75 80 45 70 30'
    ]
  },
  {
    character: '9',
    viewBox: '0 0 100 140',
    paths: [
      'M72 35 C55 15 25 35 25 55 C25 80 65 80 72 50 L 72 120'
    ]
  }
]
