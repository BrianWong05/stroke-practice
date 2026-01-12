import NumberIndicator from './NumberIndicator'
import { parsePathTangent } from '@/utils/pathGeometry'

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
  /** Number of completed strokes - guidelines for these strokes will be hidden */
  completedCount?: number
}

/**
 * Calculate the indicator position for a stroke path.
 * Uses smart positioning (reverse tangent offset) to avoid overlaps.
 * Clamps result to be within viewBox (or reasonable bounds) to prevents clipping.
 */
export function getIndicatorPosition(path: string, viewBoxStr: string = '0 0 100 140'): StrokeStartPoint | null {
  const geometry = parsePathTangent(path)
  
  if (geometry) {
    const OFFSET_DISTANCE = 22 // Distance to pull back the indicator
    
    let x = geometry.startPoint.x - (geometry.startTangent.x * OFFSET_DISTANCE)
    let y = geometry.startPoint.y - (geometry.startTangent.y * OFFSET_DISTANCE)
    
    // Parse viewBox to clamp values
    // viewBox format: "min-x min-y width height"
    const vbParts = viewBoxStr.split(' ').map(parseFloat)
    if (vbParts.length === 4) {
      const [minX, minY, width, height] = vbParts
      const margin = 8 // Keep at least 8 units from edge
      
      x = Math.max(minX + margin, Math.min(minX + width - margin, x))
      y = Math.max(minY + margin, Math.min(minY + height - margin, y))
    } else {
        // Fallback clamping if viewBox parsing fails
        x = Math.max(5, x)
        y = Math.max(5, y)
    }

    return { x, y }
  }

  // Fallback: simple regex match for Start Point
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
  className = '',
  completedCount = 0
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
      <defs>
        <marker
          id="guideline-arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="3"
          markerHeight="3"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#d1d5db" />
        </marker>
      </defs>

      {/* Dashed stroke paths */}
      {paths.map((path, index) => {
        const isCompleted = index < completedCount
        return (
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
            markerEnd="url(#guideline-arrow)"
            style={{
              opacity: isCompleted ? 0 : 1,
              transition: 'opacity 0.3s ease-out'
            }}
          />
        )
      })}

      {/* Number indicators at start points */}
      {startPoints.map((point, index) => {
        const isCompleted = index < completedCount
        return (
          <g
            key={`number-${index}`}
            style={{
              opacity: isCompleted ? 0 : 1,
              transition: 'opacity 0.3s ease-out'
            }}
          >
            <NumberIndicator
              number={index}
              x={point.x}
              y={point.y}
              size={14}
            />
          </g>
        )
      })}
    </svg>
  )
}
