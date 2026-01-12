import { useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { PracticeContext, CharacterCategory } from '@/context/PracticeContext'

export function usePractice() {
  const context = useContext(PracticeContext)
  const navigate = useNavigate()
  
  if (!context) {
    throw new Error('usePractice must be used within a PracticeProvider')
  }

  const { state, dispatch } = context

  // Navigation replaced by Router
  const selectCategory = useCallback((category: CharacterCategory) => {
    navigate(`/${category}`)
  }, [navigate])

  const goHome = useCallback(() => {
    navigate('/')
    dispatch({ type: 'GO_HOME' })
  }, [navigate, dispatch])

  const selectCharacter = useCallback((index: number) => {
    // If URL contains category we should ideally navigate to it, but context doesn't know category anymore
    // This is mainly used by grid which knows category. 
    // We will let the component handle navigation or pass category here if needed.
    // For now, we update internal state for consistency
    dispatch({ type: 'SELECT_CHARACTER', payload: index })
  }, [dispatch])

  // Helpers to set data from Route components
  const setCharacters = useCallback((chars: string[]) => {
    dispatch({ type: 'SET_CHARACTERS', payload: chars })
  }, [dispatch])

  // Deprecated but kept for compatibility during refactor if needed, 
  // though components should likely use Link or navigate directly
  const backToGrid = useCallback(() => {
    navigate(-1)
  }, [navigate])


  const nextCharacter = useCallback(() => {
    dispatch({ type: 'NEXT_CHARACTER' })
  }, [dispatch])

  const prevCharacter = useCallback(() => {
    dispatch({ type: 'PREV_CHARACTER' })
  }, [dispatch])

  const setAnimating = useCallback((isAnimating: boolean) => {
    dispatch({ type: 'SET_ANIMATING', payload: isAnimating })
  }, [dispatch])

  const showFeedback = useCallback((type: 'success' | 'error') => {
    dispatch({ type: 'SET_FEEDBACK', payload: type })
    setTimeout(() => {
      dispatch({ type: 'SET_FEEDBACK', payload: null })
    }, 2000)
  }, [dispatch])

  const clearCanvas = useCallback(() => {
    dispatch({ type: 'CLEAR_CANVAS' })
  }, [dispatch])

  // Stroke navigation
  const nextStroke = useCallback(() => {
    dispatch({ type: 'NEXT_STROKE' })
  }, [dispatch])

  const prevStroke = useCallback(() => {
    dispatch({ type: 'PREV_STROKE' })
  }, [dispatch])

  const resetStrokes = useCallback(() => {
    dispatch({ type: 'RESET_STROKES' })
  }, [dispatch])

  const showFullCharacter = useCallback(() => {
    dispatch({ type: 'SHOW_FULL_CHARACTER' })
  }, [dispatch])

  const setTotalStrokes = useCallback((count: number) => {
    dispatch({ type: 'SET_TOTAL_STROKES', payload: count })
  }, [dispatch])

  const toggleGuidelines = useCallback(() => {
    dispatch({ type: 'TOGGLE_GUIDELINES' })
  }, [dispatch])

  const setCustomCharacter = useCallback((char: string) => {
    navigate(`/custom?char=${encodeURIComponent(char)}`)
  }, [navigate])

  const loadCustomCharacter = useCallback((char: string) => {
    dispatch({ type: 'SET_CUSTOM_CHARACTER', payload: char })
  }, [dispatch])

  const currentCharacter = state.customCharacter ?? state.characters[state.currentIndex] ?? ''
  const totalCharacters = state.characters.length
  const progress = state.customCharacter 
    ? '自定義' 
    : `${state.currentIndex + 1} / ${totalCharacters}`

  return {
    state,
    selectCategory,
    goHome,
    selectCharacter,
    setCharacters,
    backToGrid,

    nextCharacter,
    prevCharacter,
    setAnimating,
    showFeedback,
    clearCanvas,
    nextStroke,
    prevStroke,
    resetStrokes,
    showFullCharacter,
    setTotalStrokes,
    toggleGuidelines,
    setCustomCharacter,
    loadCustomCharacter,
    currentCharacter,
    totalCharacters,
    progress,
  }
}

