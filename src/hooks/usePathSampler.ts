import { useMemo } from 'react'

export interface Point {
  x: number
  y: number
}

/**
 * Samples points along an SVG path string at a fixed interval.
 * This allows us to perform "hit detection" against the path without complex math.
 * 
 * @param pathData - The SVG path string (d attribute)
 * @param sampleInterval - Distance between sampled points in pixels (default: 5)
 * @returns Array of {x, y} points along the path
 */
export function usePathSampler(pathData: string, sampleInterval: number = 5): Point[] {
  return useMemo(() => {
    if (typeof window === 'undefined' || !pathData) return []

    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    pathElement.setAttribute('d', pathData)
    
    const length = pathElement.getTotalLength()
    const points: Point[] = []

    for (let i = 0; i <= length; i += sampleInterval) {
      const point = pathElement.getPointAtLength(i)
      points.push({ x: point.x, y: point.y })
    }
    
    // Ensure the very last point is included
    if (length % sampleInterval !== 0) {
      const endPoint = pathElement.getPointAtLength(length)
      points.push({ x: endPoint.x, y: endPoint.y })
    }

    return points
  }, [pathData, sampleInterval])
}
