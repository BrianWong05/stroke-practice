/**
 * Circled number indicators for stroke order display
 * Uses Unicode circled numbers ①-⑳ and SVG fallback for higher numbers
 */

interface NumberIndicatorProps {
  number: number
  x: number
  y: number
  size?: number
}

// Unicode circled numbers (1-20)
const CIRCLED_NUMBERS = [
  '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩',
  '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳'
]

export default function NumberIndicator({ number, x, y, size = 16 }: NumberIndicatorProps) {
  const displayNumber = number + 1 // Convert 0-indexed to 1-indexed

  if (displayNumber <= 20) {
    // Use Unicode circled numbers
    return (
      <text
        x={x}
        y={y}
        className="stroke-number-indicator"
        fontSize={size}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#6366f1"
        fontWeight="bold"
      >
        {CIRCLED_NUMBERS[displayNumber - 1]}
      </text>
    )
  }

  // Fallback: SVG circle with number for > 20
  const radius = size / 2
  return (
    <g className="stroke-number-indicator">
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill="white"
        stroke="#6366f1"
        strokeWidth={1.5}
      />
      <text
        x={x}
        y={y}
        fontSize={size * 0.6}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#6366f1"
        fontWeight="bold"
      >
        {displayNumber}
      </text>
    </g>
  )
}
