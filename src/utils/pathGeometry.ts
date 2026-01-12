/**
 * Utilities for analyzing SVG path geometry
 * Used for smart positioning of elements relative to path strokes
 */

export interface Point {
  x: number
  y: number
}

export interface TangentVector {
  x: number
  y: number
}

export interface PathGeometry {
  startPoint: Point
  startTangent: TangentVector
}

/**
 * Normalizes a vector to unit length
 */
function normalize(x: number, y: number): TangentVector {
  const length = Math.sqrt(x * x + y * y)
  if (length === 0) return { x: 0, y: 0 }
  return { x: x / length, y: y / length }
}

/**
 * Parses the start point and initial tangent vector from an SVG path string.
 * Supports M (Move) followed by L (Line), H (Horizontal), V (Vertical), 
 * C (Cubic Bezier), Q (Quadratic Bezier).
 * 
 * NOTE: This is a simplified parser designed for the specific needs of stroke indicators.
 * It assumes paths start with 'M' and have at least one subsequent draw command.
 */
export function parsePathTangent(d: string): PathGeometry | null {
  // normalize path: add spaces around commands to make parsing easier
  const normalizedPath = d.trim()
  
  // 1. Extract Start Point (M x y)
  const moveMatch = normalizedPath.match(/^M\s*([\d.-]+)[,\s]+([\d.-]+)/i)
  if (!moveMatch) return null
  
  const startX = parseFloat(moveMatch[1])
  const startY = parseFloat(moveMatch[2])
  
  // Remove the initial M command to look for what comes next
  const remainingPath = normalizedPath.substring(moveMatch[0].length).trim()
  
  if (!remainingPath) return null

  // 2. Determine the first draw command
  // Regex to find the next command and its params
  // Commands: L, H, V, C, S, Q, T, A, Z (case insensitive)
  const commandMatch = remainingPath.match(/^([LHVCSQTAZlhvcsqtaz])\s*(.*)/)
  
  if (!commandMatch) return null
  
  const command = commandMatch[1]
  const paramsStr = commandMatch[2]
  // Extract numbers from params string
  const params = paramsStr.match(/[\d.-]+/g)?.map(parseFloat) || []
  
  let tangentX = 0
  let tangentY = 0
  
  /* 
   * Calculate tangent based on command type
   * We only need the INITIAL tangent, so we look at the very start of the curve/line.
   */
  
  switch (command.toUpperCase()) {
    case 'L': // Line To (x, y)
    case 'H': // Horizontal Line To (x)
    case 'V': // Vertical Line To (y)
      let targetX = startX
      let targetY = startY
      
      if (command.toUpperCase() === 'L' && params.length >= 2) {
        targetX = command === 'l' ? startX + params[0] : params[0]
        targetY = command === 'l' ? startY + params[1] : params[1]
      } else if (command.toUpperCase() === 'H' && params.length >= 1) {
        targetX = command === 'h' ? startX + params[0] : params[0]
      } else if (command.toUpperCase() === 'V' && params.length >= 1) {
        targetY = command === 'v' ? startY + params[0] : params[0]
      }
      
      tangentX = targetX - startX
      tangentY = targetY - startY
      break

    case 'C': // Cubic Bezier (x1, y1, x2, y2, x, y)
      // Tangent at t=0 is vector from start to control point 1 (x1, y1)
      // If start == control1, it's start to control2, etc.
      if (params.length >= 2) {
        const c1x = command === 'c' ? startX + params[0] : params[0]
        const c1y = command === 'c' ? startY + params[1] : params[1]
        
        tangentX = c1x - startX
        tangentY = c1y - startY
        
        // Handle case where control point is same as start point (rare but possible)
        if (Math.abs(tangentX) < 0.001 && Math.abs(tangentY) < 0.001 && params.length >= 4) {
           const c2x = command === 'c' ? startX + params[2] : params[2]
           const c2y = command === 'c' ? startY + params[3] : params[3]
           tangentX = c2x - startX
           tangentY = c2y - startY
        }
      }
      break
      
    case 'Q': // Quadratic Bezier (x1, y1, x, y)
      // Tangent at t=0 is vector from start to control point 1
      if (params.length >= 2) {
        const c1x = command === 'q' ? startX + params[0] : params[0]
        const c1y = command === 'q' ? startY + params[1] : params[1]
        
        tangentX = c1x - startX
        tangentY = c1y - startY
      }
      break

    // For other commands (S, T, A, Z), or fallback, we might not get accurate initial tangent easily
    // or they aren't common first strokes in our fonts.
    // For now, return null or try minimal approximation if needed.
    default:
      return null
  }
  
  const tangent = normalize(tangentX, tangentY)
  
  // If vector is zero-length, return null
  if (tangent.x === 0 && tangent.y === 0) return null
  
  return {
    startPoint: { x: startX, y: startY },
    startTangent: tangent
  }
}
