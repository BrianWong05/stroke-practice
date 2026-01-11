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
      'M35 35 L50 20 L50 120',
      'M30 120 L70 120'
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
      'M25 25 C40 15 70 15 75 35 C80 55 50 65 50 70',
      'M50 70 C50 75 80 85 75 105 C70 125 40 125 25 115'
    ]
  },
  {
    character: '4',
    viewBox: '0 0 100 140',
    paths: [
      'M60 20 L20 85 L85 85',
      'M60 50 L60 120'
    ]
  },
  {
    character: '5',
    viewBox: '0 0 100 140',
    paths: [
      'M75 20 L25 20 L20 60',
      'M20 60 C40 50 80 55 80 85 C80 115 50 125 20 110'
    ]
  },
  {
    character: '6',
    viewBox: '0 0 100 140',
    paths: [
      'M70 25 C50 15 25 35 20 70 C15 105 35 125 55 125 C75 125 85 105 80 80 C75 55 55 55 40 70'
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
      'M50 70 C25 55 25 25 50 20 C75 25 75 55 50 70',
      'M50 70 C20 85 15 115 50 120 C85 115 80 85 50 70'
    ]
  },
  {
    character: '9',
    viewBox: '0 0 100 140',
    paths: [
      'M60 70 C45 85 25 75 20 55 C15 35 35 15 55 15 C75 15 85 35 80 70 C75 105 50 125 30 115'
    ]
  }
]
