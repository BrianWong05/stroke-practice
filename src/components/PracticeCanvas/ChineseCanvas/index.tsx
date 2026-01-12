import { useEffect, useRef, useCallback, useState } from 'react'
import HanziWriter from 'hanzi-writer'
import { usePractice } from '@/hooks/usePractice'

interface ChineseCanvasProps {
  character: string
}

export default function ChineseCanvas({ character }: ChineseCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const writerRef = useRef<HanziWriter | null>(null)
  const { state, setTotalStrokes, setAnimating, resetStrokes, showFullCharacter } = usePractice()
  const [size, setSize] = useState(300)
  const prevStrokeIndexRef = useRef(0)
  const justFinishedPlayRef = useRef(false)

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
    if (!containerRef.current || !character || size <= 0) return

    // Clear previous writer
    containerRef.current.innerHTML = ''
    writerRef.current = null
    prevStrokeIndexRef.current = 0

    // Create new writer with fixed size
    const writer = HanziWriter.create(containerRef.current, character, {
      width: size,
      height: size,
      padding: 20,
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: 0.3,
      delayBetweenStrokes: 1000,
      strokeColor: '#1e293b',
      outlineColor: '#94a3b8',
      drawingColor: '#6366f1',
      radicalColor: '#1e293b', // Same as strokeColor
      highlightColor: '#a5b4fc',
      showHintAfterMisses: 3,
    })

    writerRef.current = writer

    // Get stroke count and set in context
    const charData = HanziWriter.loadCharacterData(character)
    charData.then((data) => {
      if (data) {
        setTotalStrokes(data.strokes.length)
      }
    }).catch(() => {
      setTotalStrokes(1) // Fallback
    })

    return () => {
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

  // Handle play button - animate full character
  const handlePlay = useCallback(() => {
    if (writerRef.current) {
      resetStrokes()
      writerRef.current.hideCharacter()
      setAnimating(true)
      
      setTimeout(() => {
        writerRef.current?.animateCharacter({
          onComplete: () => {
            setAnimating(false)
            justFinishedPlayRef.current = true
            showFullCharacter()
          },
        })
      }, 500)
    }
  }, [setAnimating, resetStrokes, showFullCharacter])

  // Handle clear button
  const handleClear = useCallback(() => {
    if (writerRef.current) {
      writerRef.current.hideCharacter()
      prevStrokeIndexRef.current = 0
    }
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
    </div>
  )
}


