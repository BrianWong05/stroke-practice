import NumberIndicator from './NumberIndicator'

/**
 * Stroke order guideline overlay component
 * Renders dashed stroke paths with numbered indicators at starting points
 */

export interface StrokeStartPoint {
  x: number
  y: number
}

interface StrokeGuidelineProps {
  paths: string[]
  viewBox: string
  startPoints: StrokeStartPoint[]
  visible?: boolean
  className?: string
}

/**
 * Parse the starting point coordinates from an SVG path string
 * Handles paths starting with M (moveto) command
 */
export function parsePathStartPoint(path: string): StrokeStartPoint | null {
  // Match M followed by coordinates (supports both comma and space separators)
  const match = path.match(/^M\s*([\d.-]+)[,\s]+([\d.-]+)/i)
  if (match) {
    return {
      x: parseFloat(match[1]),
      y: parseFloat(match[2])
    }
  }
  return null
}

export default function StrokeGuideline({
  paths,
  viewBox,
  startPoints,
  visible = true,
  className = ''
}: StrokeGuidelineProps) {
  if (!visible || paths.length === 0) {
    return null
  }

  return (
    <svg
      viewBox={viewBox}
      className={`stroke-guideline-container ${className}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    >
      {/* Dashed stroke paths */}
      {paths.map((path, index) => (
        <path
          key={`guideline-${index}`}
          d={path}
          className="stroke-guideline-path"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 4"
        />
      ))}

      {/* Number indicators at start points */}
      {startPoints.map((point, index) => (
        <NumberIndicator
          key={`number-${index}`}
          number={index}
          x={point.x}
          y={point.y}
          size={14}
        />
      ))}
    </svg>
  )
}
