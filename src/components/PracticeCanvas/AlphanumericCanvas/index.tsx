import { useEffect, useRef, useState, useCallback } from 'react'
import { CharacterCategory } from '@/context/PracticeContext'
import { numberPaths, StrokePath } from '@/data/numbers'
import { alphabetPaths } from '@/data/alphabet'

interface AlphanumericCanvasProps {
  character: string
  category: CharacterCategory
}

export default function AlphanumericCanvas({ character, category }: AlphanumericCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animatedPaths, setAnimatedPaths] = useState<number[]>([])

  // Get stroke data for current character
  const getStrokeData = useCallback((): StrokePath | undefined => {
    if (category === 'numbers') {
      return numberPaths.find(p => p.character === character)
    }
    return alphabetPaths.find(p => p.character === character)
  }, [character, category])

  const strokeData = getStrokeData()

  // Reset animation when character changes
  useEffect(() => {
    setAnimatedPaths([])
    setIsAnimating(false)
  }, [character])

  // Handle play animation
  const handlePlay = useCallback(() => {
    if (!strokeData || isAnimating) return

    setIsAnimating(true)
    setAnimatedPaths([])

    // Animate each path sequentially
    strokeData.paths.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedPaths(prev => [...prev, index])
        if (index === strokeData.paths.length - 1) {
          setTimeout(() => setIsAnimating(false), 500)
        }
      }, index * 2500)
    })
  }, [strokeData, isAnimating])

  // Handle clear
  const handleClear = useCallback(() => {
    setAnimatedPaths([])
    setIsAnimating(false)
  }, [])

  // Connect to buttons
  useEffect(() => {
    const playBtn = document.getElementById('play-btn')
    const clearBtn = document.getElementById('clear-btn')

    if (playBtn) {
      playBtn.addEventListener('click', handlePlay)
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', handleClear)
    }

    return () => {
      if (playBtn) {
        playBtn.removeEventListener('click', handlePlay)
      }
      if (clearBtn) {
        clearBtn.removeEventListener('click', handleClear)
      }
    }
  }, [handlePlay, handleClear])

  if (!strokeData) {
    // Fallback for characters without path data
    return (
      <div className="w-full h-full handwriting-lines relative bg-white rounded-lg flex items-center justify-center">
        <span 
          className="text-8xl text-slate-300 font-bold"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {character}
        </span>
      </div>
    )
  }

  return (
    <div className="w-full h-full handwriting-lines relative bg-white rounded-lg overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={strokeData.viewBox}
        className="w-full h-full"
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

        {/* Animated stroke paths */}
        {strokeData.paths.map((path, index) => {
          const isVisible = animatedPaths.includes(index)
          const isCurrentlyAnimating = animatedPaths.length === index + 1 && isAnimating

          return (
            <path
              key={`stroke-${index}`}
              d={path}
              fill="none"
              stroke="#6366f1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isCurrentlyAnimating ? 'animate-draw' : ''}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          )
        })}
      </svg>

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
          animation: draw 2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
