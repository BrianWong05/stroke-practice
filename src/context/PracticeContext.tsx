import { createContext, useReducer, ReactNode } from 'react'
// Character data logic moved to hooks/components
export type CharacterCategory = 'numbers' | 'english' | 'chinese'


export interface PracticeState {
  currentIndex: number
  customCharacter: string | null

  characters: string[]
  isAnimating: boolean
  feedback: 'success' | 'error' | null
  currentStrokeIndex: number
  totalStrokes: number
  showGuidelines: boolean
}

type PracticeAction =
  | { type: 'SET_CHARACTERS'; payload: string[] }
  | { type: 'SELECT_CHARACTER'; payload: number }
  | { type: 'GO_HOME' }

  | { type: 'NEXT_CHARACTER' }
  | { type: 'PREV_CHARACTER' }
  | { type: 'SET_ANIMATING'; payload: boolean }
  | { type: 'SET_FEEDBACK'; payload: 'success' | 'error' | null }
  | { type: 'CLEAR_CANVAS' }
  | { type: 'NEXT_STROKE' }
  | { type: 'PREV_STROKE' }
  | { type: 'RESET_STROKES' }
  | { type: 'SHOW_FULL_CHARACTER' }
  | { type: 'SET_TOTAL_STROKES'; payload: number }
  | { type: 'TOGGLE_GUIDELINES' }
  | { type: 'SET_CUSTOM_CHARACTER'; payload: string }

// Helper removed

const initialState: PracticeState = {
  currentIndex: 0,
  customCharacter: null,

  characters: [],
  isAnimating: false,
  feedback: null,
  currentStrokeIndex: 0,
  totalStrokes: 0,
  showGuidelines: true,
}

function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: action.payload,
        // Reset state when category changes
        currentIndex: 0,
        feedback: null,
        currentStrokeIndex: 0,
        totalStrokes: 0,
      }
    case 'SELECT_CHARACTER':
      return {
        ...state,
        currentIndex: action.payload,
        customCharacter: null,
        feedback: null,
        currentStrokeIndex: 0,
        totalStrokes: 0,
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
      return { ...state, currentStrokeIndex: 0 }
    case 'SHOW_FULL_CHARACTER':
      return { ...state, currentStrokeIndex: state.totalStrokes }
    case 'SET_TOTAL_STROKES':
      return { ...state, totalStrokes: action.payload, currentStrokeIndex: 0 }
    case 'TOGGLE_GUIDELINES':
      return { ...state, showGuidelines: !state.showGuidelines }
    case 'SET_CUSTOM_CHARACTER':
      return {
        ...state,
        customCharacter: action.payload,
        feedback: null,
        currentStrokeIndex: 0,
        totalStrokes: 0,
      }
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
