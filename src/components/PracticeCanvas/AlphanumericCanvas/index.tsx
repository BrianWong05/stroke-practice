import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { CharacterCategory } from '@/context/PracticeContext'
import { numberPaths, StrokePath } from '@/data/numbers'
import { alphabetPaths } from '@/data/alphabet'
import { usePractice } from '@/hooks/usePractice'
import StrokeGuideline, { parsePathStartPoint, StrokeStartPoint } from '@/components/shared/StrokeGuideline'


interface AlphanumericCanvasProps {
  character: string
  category: CharacterCategory
}

export default function AlphanumericCanvas({ character, category }: AlphanumericCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [animatingStroke, setAnimatingStroke] = useState<number | null>(null)
  const [isPlayMode, setIsPlayMode] = useState(false)
  const { state, setTotalStrokes, setAnimating, resetStrokes, showFullCharacter } = usePractice()
  const prevStrokeIndexRef = useRef(0)
  const justFinishedPlayRef = useRef(false)

  // Animation durations
  const STROKE_DURATION = 5000 // 5s animation for all strokes
  const PLAY_DELAY = 1000 // 1s delay between strokes in play mode
  const START_DELAY = 500 // Initial delay to show clear state

  // Get stroke data for current character
  const getStrokeData = useCallback((): StrokePath | undefined => {
    if (category === 'numbers') {
      return numberPaths.find(p => p.character === character)
    }
    return alphabetPaths.find(p => p.character === character)
  }, [character, category])

  const strokeData = getStrokeData()

  // Calculate stroke starting points for guideline indicators
  const startPoints = useMemo((): StrokeStartPoint[] => {
    if (!strokeData) return []
    return strokeData.paths
      .map(path => parsePathStartPoint(path))
      .filter((point): point is StrokeStartPoint => point !== null)
  }, [strokeData])

  // Set total strokes and reset when character changes
  useEffect(() => {
    if (strokeData) {
      setTotalStrokes(strokeData.paths.length)
    } else {
      setTotalStrokes(1)
    }
    prevStrokeIndexRef.current = 0
    justFinishedPlayRef.current = false
    setAnimatingStroke(null)
    setIsPlayMode(false)
  }, [character, strokeData, setTotalStrokes])

  // Handle stroke index changes - trigger animation when stepping forward
  useEffect(() => {
    const prevIndex = prevStrokeIndexRef.current
    const newIndex = state.currentStrokeIndex

    // Check if we should skip animation due to play finish
    if (justFinishedPlayRef.current) {
      justFinishedPlayRef.current = false
      prevStrokeIndexRef.current = newIndex
      setAnimatingStroke(null)
      return
    }

    if (newIndex === prevIndex + 1 && !isPlayMode) {
      // Moving forward manually by 1 step - animate
      setAnimatingStroke(newIndex - 1)
      const timer = setTimeout(() => {
        setAnimatingStroke(null)
      }, STROKE_DURATION)
      prevStrokeIndexRef.current = newIndex
      return () => clearTimeout(timer)
    } else if (newIndex !== prevIndex) {
      // Other changes (backward, or jump/reset) - no animation, just update ref
      setAnimatingStroke(null)
      prevStrokeIndexRef.current = newIndex
    }
  }, [state.currentStrokeIndex, isPlayMode])

  // Handle play animation - same speed but faster sequencing
  const handlePlay = useCallback(() => {
    if (!strokeData) return

    resetStrokes()
    setIsPlayMode(true)
    setAnimating(true)
    
    // Animate each path sequentially with overlapping timing
    strokeData.paths.forEach((_, index) => {
      setTimeout(() => {
        setAnimatingStroke(index)
        if (index === strokeData.paths.length - 1) {
          setTimeout(() => {
            setAnimatingStroke(null)
            
            // Prevent next index change from animating
            justFinishedPlayRef.current = true
            
            setIsPlayMode(false)
            setAnimating(false)
            showFullCharacter() // Keep character visible at end
          }, STROKE_DURATION + 500) // Small buffer to ensure animation finishes visually
        }
      }, index * PLAY_DELAY + START_DELAY)
    })
  }, [strokeData, setAnimating, resetStrokes, showFullCharacter])

  // Handle clear
  const handleClear = useCallback(() => {
    setAnimatingStroke(null)
    prevStrokeIndexRef.current = 0
  }, [])

  // Connect to buttons
  useEffect(() => {
    const playBtn = document.getElementById('play-btn')
    const clearBtn = document.getElementById('clear-btn')

    if (playBtn) playBtn.addEventListener('click', handlePlay)
    if (clearBtn) clearBtn.addEventListener('click', handleClear)

    return () => {
      if (playBtn) playBtn.removeEventListener('click', handlePlay)
      if (clearBtn) clearBtn.removeEventListener('click', handleClear)
    }
  }, [handlePlay, handleClear])

  // Calculate visible strokes based on context state
  const visibleStrokeCount = state.currentStrokeIndex

  // During play mode, use animatingStroke to determine which guidelines to hide
  // (hide all strokes up to and including the one currently animating)
  // During manual mode, use visibleStrokeCount (currentStrokeIndex)
  const guidelineCompletedCount = isPlayMode && animatingStroke !== null
    ? animatingStroke + 1  // Hide guidelines for strokes that have started animating
    : visibleStrokeCount

  if (!strokeData) {
    // Fallback for characters without path data
    return (
      <div className="w-full h-full handwriting-lines relative bg-white rounded-lg flex items-center justify-center">
        <span 
          className="text-[12rem] text-slate-300 font-bold leading-none"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {character}
        </span>
      </div>
    )
  }

  return (
    <div className="w-full h-full handwriting-lines relative bg-white rounded-lg overflow-hidden flex items-center justify-center p-4">
      {/* Container for both guideline and character SVG to ensure alignment */}
      <div className="relative w-full h-full max-w-[300px] max-h-[300px]">
        {/* Stroke order guidelines - visible by default, hides progressively as strokes complete */}
        <StrokeGuideline
          paths={strokeData.paths}
          viewBox={strokeData.viewBox}
          startPoints={startPoints}
          visible={state.showGuidelines}
          completedCount={guidelineCompletedCount}
        />

        <svg
          ref={svgRef}
          viewBox={strokeData.viewBox}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ touchAction: 'none' }}
      >
        {/* Ghost outline - always visible */}
        {strokeData.paths.map((path, index) => (
          <path
            key={`ghost-${index}`}
            d={path}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Visible stroke paths based on currentStrokeIndex */}
        {strokeData.paths.map((path, index) => {
          // In play mode, show all strokes up to and including the animating stroke
          // In manual mode, show strokes based on currentStrokeIndex
          const isVisible = isPlayMode 
            ? (animatingStroke !== null && index <= animatingStroke)
            : (index < visibleStrokeCount || index === animatingStroke)
          const isCurrentlyAnimating = index === animatingStroke

          return (
            <path
              key={`stroke-${index}-${isCurrentlyAnimating ? 'anim' : 'static'}`}
              d={path}
              fill="none"
              stroke="#1e293b"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: isVisible ? 1 : 0,
                strokeDasharray: isCurrentlyAnimating ? 1000 : 'none',
                strokeDashoffset: isCurrentlyAnimating ? 1000 : 0,
                animation: isCurrentlyAnimating ? 'draw 5s ease-out forwards' : 'none',
              }}
            />
          )
        })}
      </svg>
      </div>

      {/* Stroke order indicators */}
      <style>{`
        @keyframes draw {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          animation: draw 5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}


