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
    // Auto-hide after 2 seconds
    setTimeout(() => {
      dispatch({ type: 'SET_FEEDBACK', payload: null })
    }, 2000)
  }, [dispatch])

  const clearCanvas = useCallback(() => {
    dispatch({ type: 'CLEAR_CANVAS' })
  }, [dispatch])

  const currentCharacter = state.characters[state.currentIndex] ?? ''
  const totalCharacters = state.characters.length
  const progress = `${state.currentIndex + 1} / ${totalCharacters}`

  return {
    state,
    selectCategory,
    goHome,
    nextCharacter,
    prevCharacter,
    setAnimating,
    showFeedback,
    clearCanvas,
    currentCharacter,
    totalCharacters,
    progress,
  }
}
