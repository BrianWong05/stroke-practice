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
    ]
  },
  {
    character: 'B',
    viewBox: '0 0 100 140',
    paths: [
      'M25 20 L25 120',
      'M25 20 L60 20 C85 20 85 65 50 70',
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
      'M75 20 L25 20 L25 120 L75 120',
      'M25 70 L60 70'
    ]
  },
  // More letters would be added here...
]

// Lowercase letter paths (simplified for demonstration)
export const lowercasePaths: StrokePath[] = [
  {
    character: 'a',
    viewBox: '0 0 100 140',
    paths: [
      'M70 55 C70 35 40 35 35 55 C30 75 35 95 50 95 C65 95 70 80 70 55',
      'M70 55 L70 95'
    ]
  },
  {
    character: 'b',
    viewBox: '0 0 100 140',
    paths: [
      'M30 20 L30 95',
      'M30 55 C35 40 60 40 65 55 C70 75 65 95 50 95 C35 95 30 80 30 55'
    ]
  },
  {
    character: 'c',
    viewBox: '0 0 100 140',
    paths: [
      'M70 50 C55 35 35 40 30 65 C25 90 45 100 70 90'
    ]
  },
  // More letters would be added here...
]

export const alphabetPaths: StrokePath[] = [
  ...uppercasePaths,
  ...lowercasePaths,
]
