import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { CharacterCategory } from '@/context/PracticeContext'
import { numberPaths, StrokePath } from '@/data/numbers'
import { alphabetPaths } from '@/data/alphabet'
import { usePractice } from '@/hooks/usePractice'
import { usePathSampler, Point } from '@/hooks/usePathSampler'
import StrokeGuideline, { parsePathStartPoint, StrokeStartPoint } from '@/components/shared/StrokeGuideline'

interface TracingCanvasProps {
  character: string
  category: CharacterCategory
}

const ERROR_THRESHOLD = 30 // px allowed deviation
const COMPLETION_RATIO = 0.85 // 85% coverage required
const LOOK_AHEAD_BUFFER = 15 

export default function TracingCanvas({ character, category }: TracingCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const { state, setTotalStrokes, setAnimating, resetStrokes, nextStroke, showFeedback } = usePractice()
  
  // State
  const [isDragging, setIsDragging] = useState(false)
  const [tracePath, setTracePath] = useState<Point[]>([])
  const [shake, setShake] = useState(false)
  const [isPlayMode, setIsPlayMode] = useState(false)
  const [animatingStroke, setAnimatingStroke] = useState<number | null>(null)
  
  // Progress Tracking for Quiz
  const maxReachedIndexRef = useRef<number>(-1)

  // 1. Get stroke data
  const strokeData = useMemo((): StrokePath | undefined => {
    if (category === 'numbers') {
        return numberPaths.find(p => p.character === character)
    }
    return alphabetPaths.find(p => p.character === character)
  }, [character, category])

  // 2. Sample target points for the *active* stroke (for hit detection)
  // We only care about the current stroke from the context
  const activeStrokeIndex = state.currentStrokeIndex
  const activePathStr = strokeData?.paths[activeStrokeIndex] || ''
  const targetPoints = usePathSampler(activePathStr, 5)

   // Calculate stroke starting points for guideline indicators
   const startPoints = useMemo((): StrokeStartPoint[] => {
    if (!strokeData) return []
    return strokeData.paths
      .map(path => parsePathStartPoint(path))
      .filter((point): point is StrokeStartPoint => point !== null)
  }, [strokeData])

  // 3. Initialize / Reset when character changes
  useEffect(() => {
    if (strokeData) {
        setTotalStrokes(strokeData.paths.length)
    } else {
        setTotalStrokes(1)
    }
    // Reset local quiz state
    setIsDragging(false)
    setTracePath([])
    maxReachedIndexRef.current = -1
    setAnimatingStroke(null)
    setIsPlayMode(false)
  }, [character, strokeData, setTotalStrokes])

  // Reset trace when moving to next stroke
  useEffect(() => {
    setTracePath([])
    maxReachedIndexRef.current = -1
    setIsDragging(false)
  }, [activeStrokeIndex])

  // 4. Play Animation Logic
  const handlePlay = useCallback(() => {
    if (!strokeData) return

    resetStrokes() // Reset global index to 0
    setIsPlayMode(true)
    setAnimating(true)
    
    const STROKE_DURATION = 1500 // Faster for play mode? AlphanumericCanvas had 5000 overlaps
    const PLAY_DELAY = 1000 
    
    strokeData.paths.forEach((_, index) => {
      setTimeout(() => {
        setAnimatingStroke(index)
        
        // If last stroke
        if (index === strokeData.paths.length - 1) {
          setTimeout(() => {
            setAnimatingStroke(null)
            setIsPlayMode(false)
            setAnimating(false)
          }, STROKE_DURATION)
        }
      }, index * PLAY_DELAY)
    })
  }, [strokeData, setAnimating, resetStrokes])

  // Connect Play Button
  useEffect(() => {
    const playBtn = document.getElementById('play-btn')
    const clearBtn = document.getElementById('clear-btn') // Also handle clear

    const onClear = () => {
        setTracePath([])
        maxReachedIndexRef.current = -1
        setIsDragging(false)
    }

    if (playBtn) playBtn.addEventListener('click', handlePlay)
    if (clearBtn) clearBtn.addEventListener('click', onClear)

    return () => {
      if (playBtn) playBtn.removeEventListener('click', handlePlay)
      if (clearBtn) clearBtn.removeEventListener('click', onClear)
    }
  }, [handlePlay])


  // 5. Quiz Logic (Pointer Events)
  const getEventPoint = (e: React.PointerEvent): Point | null => {
    if (!svgRef.current) return null
    const pt = svgRef.current.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    // Transform to SVG coordinates
    const svgP = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse())
    return { x: svgP.x, y: svgP.y }
  }
  const getDist = (p1: Point, p2: Point) => Math.hypot(p1.x - p2.x, p1.y - p2.y)

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isPlayMode) return // No interaction during play
    if (activeStrokeIndex >= (strokeData?.paths.length || 0)) return
    if (!targetPoints.length) return
    
    e.currentTarget.setPointerCapture(e.pointerId)
    e.preventDefault() // Prevent scrolling on touch
    
    const p = getEventPoint(e)
    if (!p) return

    // Check start point proximity
    if (getDist(p, targetPoints[0]) > ERROR_THRESHOLD) {
      triggerError()
      return
    }

    setIsDragging(true)
    setTracePath([p])
    maxReachedIndexRef.current = 0
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isPlayMode) return
    e.preventDefault()
    const p = getEventPoint(e)
    if (!p) return

    // Find closest point in targetPoints
    // search optimization: check around maxReached
    let closestDist = Infinity
    let closestIndex = -1
    
    // Check all points (robustness) or window
    for (let i = 0; i < targetPoints.length; i++) {
        const d = getDist(p, targetPoints[i])
        if (d < closestDist) {
            closestDist = d
            closestIndex = i
        }
    }

    if (closestDist > ERROR_THRESHOLD) {
        triggerError()
        return
    }

    // Direction check
    // Ensure we aren't jumping waaaay ahead
    if (closestIndex > maxReachedIndexRef.current + LOOK_AHEAD_BUFFER) {
        // Too fast or skip?
        // Maybe ignore update but keep dragging? 
        // Or strict error? Let's be lenient for now, purely updating trace
    }

    // Update progress
    if (closestIndex > maxReachedIndexRef.current) {
        maxReachedIndexRef.current = closestIndex
    }

    setTracePath(prev => [...prev, p])
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)
    
    // Check completion
    const coverage = maxReachedIndexRef.current / (targetPoints.length - 1)
    
    if (coverage >= COMPLETION_RATIO) {
        handleStrokeComplete()
    } else {
        // Incomplete
        setTracePath([]) // Reset ink
    }
  }

  const triggerError = () => {
    setIsDragging(false)
    setShake(true)
    setTracePath([]) 
    setTimeout(() => setShake(false), 500)
    if (window.navigator?.vibrate) window.navigator.vibrate(200)
  }

  const handleStrokeComplete = () => {
    // 1. Advance stroke
    nextStroke()
    
    // 2. Check if that was the last one
    if (activeStrokeIndex === (strokeData?.paths.length || 0) - 1) {
        showFeedback('success')
    }
  }

  // Generate trace path d
  const traceD = useMemo(() => {
    if (tracePath.length < 2) return ''
    return `M ${tracePath.map(p => `${p.x} ${p.y}`).join(' L ')}`
  }, [tracePath])


  if (!strokeData) return <div className="p-10 text-center">No Data</div>

  // Visual Helper: Determine which strokes are completed
  // completed = indices < activeStrokeIndex
  // const visibleStrokeCount = activeStrokeIndex

  // Guideline Logic
  // During play, we animate guidelines too via completedCount
  const guidelineCompletedCount = isPlayMode && animatingStroke !== null
    ? animatingStroke + 1
    : activeStrokeIndex + (isDragging ? 0 : 0) 
    // If dragging, we still want to see the guideline for the active stroke

  return (
    <div className={`w-full h-full relative bg-white rounded-lg overflow-hidden flex items-center justify-center p-4 select-none touch-none ${shake ? "animate-shake" : ""}`}>
      <div className="relative w-full h-full max-w-[300px] max-h-[300px]">
        
        {/* Helper Component: Stroke Guidelines (Dashed + Start Dots) */}
        <StrokeGuideline
            paths={strokeData.paths}
            viewBox={strokeData.viewBox}
            startPoints={startPoints}
            visible={state.showGuidelines && !isPlayMode} // Hide full guidelines during play? or keep them? AlphanumericCanvas kept them
            completedCount={guidelineCompletedCount}
        />

        <svg
            ref={svgRef}
            viewBox={strokeData.viewBox}
            className="w-full h-full absolute inset-0 left-0 top-0"
            preserveAspectRatio="xMidYMid meet"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{ touchAction: 'none' }}
        >
             {/* 1. Ghost outlines (Faint background) */}
             {strokeData.paths.map((d, i) => (
                <path
                    key={`ghost-${i}`}
                    d={d}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
             ))}

             {/* 2. Completed Strokes (Solid Black) */}
             {/* Show strokes < activeStrokeIndex */}
             {strokeData.paths.map((d, i) => {
                 let style = {}
                 let visible = false
                 let className = ""

                 if (isPlayMode) {
                     if (i <= (animatingStroke ?? -1)) {
                         visible = true
                         if (i === animatingStroke) {
                            className = "animate-draw"
                            style = { animation: 'draw 1.5s ease-out forwards' }
                         } else {
                            // Already played
                         }
                     }
                 } else {
                     if (i < activeStrokeIndex) {
                         visible = true
                     }
                 }

                 if (!visible) return null

                 return (
                    <path
                        key={`stroke-${i}`}
                        d={d}
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={className}
                        style={style}
                    />
                 )
             })}

             {/* 3. Active Stroke Guideline (Dashed overlay for current) */}
             {/* Only if not play mode and not dragging (or even if dragging?) */}
             {/* StrokeGuideline component handles most of this, but we might want a specific active highlight */}
             {!isPlayMode && activeStrokeIndex < strokeData.paths.length && (
                 <path
                    d={strokeData.paths[activeStrokeIndex]}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="0 0" 
                    className="opacity-10" // Just a faint fill hint?
                 />
             )}

             {/* 4. User Ink (Trace) */}
             {traceD && (
                 <path
                    d={traceD}
                    fill="none"
                    stroke="#3b82f6" // Blue ink
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(59,130,246,0.3))' }}
                 />
             )}
        </svg>

      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes draw {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        .animate-draw {
           stroke-dasharray: 1000;
           stroke-dashoffset: 1000;
        }
      `}</style>
    </div>
  )
}
