import { useContext, useCallback } from 'react'
import { PracticeContext, CharacterCategory } from '@/context/PracticeContext'

export function usePractice() {
  const context = useContext(PracticeContext)
  
  if (!context) {
    throw new Error('usePractice must be used within a PracticeProvider')
  }

  const { state, dispatch } = context

  const selectCategory = useCallback((category: CharacterCategory) => {
    dispatch({ type: 'SET_CATEGORY', payload: category })
  }, [dispatch])

  const goHome = useCallback(() => {
    dispatch({ type: 'GO_HOME' })
  }, [dispatch])

  const selectCharacter = useCallback((index: number) => {
    dispatch({ type: 'SELECT_CHARACTER', payload: index })
  }, [dispatch])

  const backToGrid = useCallback(() => {
    dispatch({ type: 'BACK_TO_GRID' })
  }, [dispatch])


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
    currentCharacter,
    totalCharacters,
    progress,
  }
}

