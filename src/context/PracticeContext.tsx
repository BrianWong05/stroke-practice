import { createContext, useReducer, ReactNode } from 'react'
import { chineseCharacters } from '@/data/characters'
import { numbers } from '@/data/numbers'
import { englishAlphabet } from '@/data/alphabet'

export type CharacterCategory = 'numbers' | 'english' | 'chinese'

export interface PracticeState {
  category: CharacterCategory | null
  currentIndex: number
  characters: string[]
  isAnimating: boolean
  feedback: 'success' | 'error' | null
  currentStrokeIndex: number
  totalStrokes: number
}

type PracticeAction =
  | { type: 'SET_CATEGORY'; payload: CharacterCategory }
  | { type: 'GO_HOME' }
  | { type: 'NEXT_CHARACTER' }
  | { type: 'PREV_CHARACTER' }
  | { type: 'SET_ANIMATING'; payload: boolean }
  | { type: 'SET_FEEDBACK'; payload: 'success' | 'error' | null }
  | { type: 'CLEAR_CANVAS' }
  | { type: 'NEXT_STROKE' }
  | { type: 'PREV_STROKE' }
  | { type: 'RESET_STROKES' }
  | { type: 'SET_TOTAL_STROKES'; payload: number }

function getCharactersForCategory(category: CharacterCategory): string[] {
  switch (category) {
    case 'numbers':
      return numbers
    case 'english':
      return englishAlphabet
    case 'chinese':
      return chineseCharacters
  }
}

const initialState: PracticeState = {
  category: null,
  currentIndex: 0,
  characters: [],
  isAnimating: false,
  feedback: null,
  currentStrokeIndex: 0,
  totalStrokes: 0,
}

function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case 'SET_CATEGORY': {
      const characters = getCharactersForCategory(action.payload)
      return {
        ...state,
        category: action.payload,
        currentIndex: 0,
        characters,
        feedback: null,
        currentStrokeIndex: 0,
        totalStrokes: 0,
      }
    }
    case 'GO_HOME':
      return {
        ...initialState,
      }
    case 'NEXT_CHARACTER':
      if (state.currentIndex >= state.characters.length - 1) {
        return { ...state, currentIndex: 0 }
      }
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        feedback: null,
        currentStrokeIndex: 0,
        totalStrokes: 0,
      }
    case 'PREV_CHARACTER':
      if (state.currentIndex <= 0) {
        return { ...state, currentIndex: state.characters.length - 1 }
      }
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
        feedback: null,
        currentStrokeIndex: 0,
        totalStrokes: 0,
      }
    case 'SET_ANIMATING':
      return { ...state, isAnimating: action.payload }
    case 'SET_FEEDBACK':
      return { ...state, feedback: action.payload }
    case 'CLEAR_CANVAS':
      return { ...state, feedback: null, currentStrokeIndex: 0 }
    case 'NEXT_STROKE':
      if (state.currentStrokeIndex >= state.totalStrokes) {
        return state
      }
      return { ...state, currentStrokeIndex: state.currentStrokeIndex + 1 }
    case 'PREV_STROKE':
      if (state.currentStrokeIndex <= 0) {
        return state
      }
      return { ...state, currentStrokeIndex: state.currentStrokeIndex - 1 }
    case 'RESET_STROKES':
      return { ...state, currentStrokeIndex: state.totalStrokes }
    case 'SET_TOTAL_STROKES':
      return { ...state, totalStrokes: action.payload, currentStrokeIndex: 0 }
    default:
      return state
  }
}

interface PracticeContextValue {
  state: PracticeState
  dispatch: React.Dispatch<PracticeAction>
}

export const PracticeContext = createContext<PracticeContextValue | null>(null)

interface PracticeProviderProps {
  children: ReactNode
}

export function PracticeProvider({ children }: PracticeProviderProps) {
  const [state, dispatch] = useReducer(practiceReducer, initialState)

  return (
    <PracticeContext.Provider value={{ state, dispatch }}>
      {children}
    </PracticeContext.Provider>
  )
}
