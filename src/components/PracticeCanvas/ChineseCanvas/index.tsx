import { useEffect, useRef, useCallback, useState } from 'react'
import HanziWriter from 'hanzi-writer'
import { usePractice } from '@/hooks/usePractice'
import NumberIndicator from '@/components/shared/StrokeGuideline/NumberIndicator'

interface ChineseCanvasProps {
  character: string
}

// Stroke data extracted from hanzi-writer for guidelines
interface StrokeGuidelineData {
  strokes: string[]       // SVG path strings
  medians: number[][][]   // Start points: medians[strokeIndex][0] = [x, y]
}

export default function ChineseCanvas({ character }: ChineseCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hanziRef = useRef<HTMLDivElement>(null)  // Separate ref for hanzi-writer
  const writerRef = useRef<HanziWriter | null>(null)
  const { state, setTotalStrokes, setAnimating, resetStrokes, showFeedback } = usePractice()
  const [size, setSize] = useState(300)
  const prevStrokeIndexRef = useRef(0)
  const justFinishedPlayRef = useRef(false)
  const [strokeData, setStrokeData] = useState<StrokeGuidelineData | null>(null)
  // Track animated strokes during play mode for progressive guideline hiding
  const [animatedStrokeCount, setAnimatedStrokeCount] = useState(0)
  // Track correct strokes in quiz mode
  const [quizStrokeCount, setQuizStrokeCount] = useState(0)
  const [isPlayMode, setIsPlayMode] = useState(false)


  // Observe container size
  useEffect(() => {
    if (!containerRef.current) return

    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newSize = Math.min(rect.width, rect.height)
        if (newSize > 0) {
          setSize(newSize)
        }
      }
    }

    updateSize()

    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  // Initialize HanziWriter
  useEffect(() => {
    if (!hanziRef.current || !character || size <= 0) return

    // Clear previous writer
    hanziRef.current.innerHTML = ''
    writerRef.current = null
    hanziRef.current.innerHTML = ''
    writerRef.current = null
    prevStrokeIndexRef.current = 0
    setQuizStrokeCount(0)

    // Create new writer with fixed size
    const writer = HanziWriter.create(hanziRef.current, character, {
      width: size,
      height: size,
      padding: 20,
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: 0.3,
      delayBetweenStrokes: 1000,
      strokeColor: '#333333',
      outlineColor: '#94a3b8',
      drawingColor: '#333333',
      radicalColor: '#333333',
      highlightColor: '#a5b4fc',
      showHintAfterMisses: 3,
      drawingWidth: 40,
    })

    writerRef.current = writer

    // Start quiz mode immediately
    writer.quiz({
      onComplete: () => {
        showFeedback('success')
      },
      onCorrectStroke: () => {
        setQuizStrokeCount(prev => prev + 1)
      }
    })

    // Get stroke count and stroke data for guidelines
    const charData = HanziWriter.loadCharacterData(character)
    charData.then((data) => {
      if (data) {
        setTotalStrokes(data.strokes.length)
        // Store stroke data for guideline rendering
        setStrokeData({
          strokes: data.strokes,
          medians: data.medians
        })
      }
    }).catch(() => {
      setTotalStrokes(1) // Fallback
      setStrokeData(null)
    })

    return () => {
      if (writerRef.current) {
        writerRef.current.cancelQuiz()
      }
      writerRef.current = null
    }
  }, [character, size, setTotalStrokes])

  // Handle stroke index changes from context
  useEffect(() => {
    if (!writerRef.current) return

    const prevIndex = prevStrokeIndexRef.current
    const newIndex = state.currentStrokeIndex

    // Check if we should skip animation due to play finish
    if (justFinishedPlayRef.current) {
      justFinishedPlayRef.current = false
      prevStrokeIndexRef.current = newIndex
      return
    }

    if (newIndex > prevIndex && prevIndex < state.totalStrokes) {
      // Animate next stroke
      setAnimating(true)
      writerRef.current.animateStroke(prevIndex, {
        onComplete: () => {
          setAnimating(false)
        },
      })
    } else if (newIndex < prevIndex) {
      // Hide character and show up to newIndex instantly
      writerRef.current.hideCharacter()
      // Show strokes up to newIndex
      for (let i = 0; i < newIndex; i++) {
        // cast to any because showStroke is missing from default types but exists in library
        (writerRef.current as any).showStroke(i)
      }
    }

    prevStrokeIndexRef.current = newIndex
  }, [state.currentStrokeIndex, state.totalStrokes, setAnimating])

  // Handle play button - animate strokes one by one with callbacks for progressive hiding
  const handlePlay = useCallback(() => {
    if (!writerRef.current || !strokeData) return
    
    // Cancel any active quiz
    writerRef.current.cancelQuiz()
    
    resetStrokes()
    writerRef.current.hideCharacter()
    writerRef.current.showOutline()
    setAnimating(true)
    writerRef.current.showOutline()
    setAnimating(true)
    setIsPlayMode(true)
    setAnimatedStrokeCount(0)
    setQuizStrokeCount(0)
    
    const totalStrokes = strokeData.strokes.length
    
    // Animate strokes sequentially with callbacks
    const animateNextStroke = (strokeIndex: number) => {
      if (!writerRef.current || strokeIndex >= totalStrokes) {
        // All strokes done
        setAnimating(false)
        setIsPlayMode(false)
        justFinishedPlayRef.current = true
        
        // Show full character briefly then restart quiz
        setTimeout(() => {
           // Reset for quiz
           writerRef.current?.hideCharacter()
           setQuizStrokeCount(0)
           writerRef.current?.quiz({
             onComplete: () => showFeedback('success'),
             onCorrectStroke: () => {
               setQuizStrokeCount(prev => prev + 1)
             }
           })
        }, 1000)
        return
      }
      
      // Update animated count to hide this stroke's guideline
      setAnimatedStrokeCount(strokeIndex + 1)
      
      writerRef.current.animateStroke(strokeIndex, {
        onComplete: () => {
          // Small delay between strokes for visual clarity
          setTimeout(() => {
            animateNextStroke(strokeIndex + 1)
          }, 300)
        },
      })
    }
    
    // Start animation after a brief delay
    setTimeout(() => {
      animateNextStroke(0)
    }, 500)
  }, [strokeData, setAnimating, resetStrokes, showFeedback])

  // Handle clear button
  const handleClear = useCallback(() => {
    if (writerRef.current) {
      writerRef.current.cancelQuiz()
      writerRef.current.hideCharacter()
      writerRef.current.showOutline()
      prevStrokeIndexRef.current = 0
      setQuizStrokeCount(0)
      // Restart quiz
      writerRef.current.quiz({
        onComplete: () => showFeedback('success'),
        onCorrectStroke: () => {
          setQuizStrokeCount(prev => prev + 1)
        }
      })
    }
  }, [showFeedback])

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

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative bg-white rounded-lg flex items-center justify-center overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {/* Tian Zi Ge grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          border: '2px solid #1e293b',
          borderRadius: '0.5rem',
        }}
      >
        {/* Horizontal center line */}
        <div 
          className="absolute left-0 right-0 h-px bg-slate-300" 
          style={{ top: '50%', borderStyle: 'dashed' }}
        />
        {/* Vertical center line */}
        <div 
          className="absolute top-0 bottom-0 w-px bg-slate-300" 
          style={{ left: '50%', borderStyle: 'dashed' }}
        />
      </div>

      {/* Wrapper for hanzi-writer and guidelines overlay */}
      <div 
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Hanzi-writer container */}
        <div 
          ref={hanziRef}
          className="absolute inset-0"
        />

        {/* Stroke order guidelines overlay */}
        {strokeData && (
          <svg
            viewBox="0 0 1024 1024"
            className="stroke-guideline-container absolute pointer-events-none"
            style={{
              // Match hanzi-writer's internal padding: inset by padding on all sides
              top: `${20 * 100 / size}%`,
              left: `${20 * 100 / size}%`,
              width: `${(size - 40) * 100 / size}%`,
              height: `${(size - 40) * 100 / size}%`
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Transform group to flip Y-axis (Make Me a Hanzi uses top-left at (0,900)) */}
            <g transform="scale(1, -1) translate(0, -900)">
              {/* Dashed stroke paths - hide completed strokes */}
              {strokeData.strokes.map((strokePath, index) => {
                // During play mode, use animatedStrokeCount; otherwise use currentStrokeIndex OR quizStrokeCount (whichever is higher/relevant)
                // Since currentStrokeIndex from context likely stays 0 in quiz mode unless synced, we rely on quizStrokeCount
                const completedCount = isPlayMode ? animatedStrokeCount : Math.max(state.currentStrokeIndex, quizStrokeCount)
                // Hide if completed OR if guidelines are toggled off
                const isHidden = !state.showGuidelines || index < completedCount
                return (
                  <path
                    key={`guideline-stroke-${index}`}
                    d={strokePath}
                    className="stroke-guideline-path"
                    fill="none"
                    stroke="#d1d5db"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="40 20"
                    style={{
                      opacity: isHidden ? 0 : 1,
                      transition: 'opacity 0.3s ease-out'
                    }}
                  />
                )
              })}

              {/* Number indicators at stroke starting points - hide completed strokes */}
              {strokeData.medians.map((median, index) => {
                // First point of each median is the stroke start
                const startPoint = median[0]
                if (!startPoint) return null
                // During play mode, use animatedStrokeCount; otherwise use currentStrokeIndex OR quizStrokeCount
                const completedCount = isPlayMode ? animatedStrokeCount : Math.max(state.currentStrokeIndex, quizStrokeCount)
                // Hide if completed OR if guidelines are toggled off
                const isHidden = !state.showGuidelines || index < completedCount
                return (
                  <g 
                    key={`number-${index}`} 
                    transform={`translate(${startPoint[0]}, ${startPoint[1]}) scale(1, -1)`}
                    style={{
                      opacity: isHidden ? 0 : 1,
                      transition: 'opacity 0.3s ease-out'
                    }}
                  >
                    <NumberIndicator
                      number={index}
                      x={0}
                      y={0}
                      size={60}
                    />
                  </g>
                )
              })}
            </g>
          </svg>
        )}
      </div>
    </div>
  )
}


