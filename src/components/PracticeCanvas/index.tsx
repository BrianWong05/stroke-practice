import { Play, Eraser, ChevronLeft, ChevronRight } from 'lucide-react'
import { t } from '@/i18n'
import { usePractice } from '@/hooks/usePractice'
import ChineseCanvas from './ChineseCanvas'
import AlphanumericCanvas from './AlphanumericCanvas'
import Feedback from './Feedback'

export default function PracticeCanvas() {
  const {
    state,
    currentCharacter,
    progress,
    nextCharacter,
    prevCharacter,
  } = usePractice()

  const isChinese = state.category === 'chinese'

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 gap-4">
      {/* Progress and current character */}
      <div className="text-center">
        <span className="text-sm text-slate-500 mb-2 block">{progress}</span>
        <div className="text-6xl md:text-8xl font-bold text-slate-800 mb-4" style={{ fontFamily: isChinese ? 'Noto Sans HK, sans-serif' : 'inherit' }}>
          {currentCharacter}
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md aspect-square">
          {isChinese ? (
            <ChineseCanvas character={currentCharacter} />
          ) : (
            <AlphanumericCanvas character={currentCharacter} category={state.category!} />
          )}
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <button 
          className="btn btn-secondary" 
          onClick={prevCharacter}
          aria-label={t('previous')}
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">{t('previous')}</span>
        </button>
        
        <button 
          className="btn btn-primary" 
          id="play-btn"
          aria-label={t('play')}
        >
          <Play size={20} />
          <span>{t('play')}</span>
        </button>
        
        <button 
          className="btn btn-secondary" 
          id="clear-btn"
          aria-label={t('clear')}
        >
          <Eraser size={20} />
          <span>{t('clear')}</span>
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={nextCharacter}
          aria-label={t('next')}
        >
          <span className="hidden sm:inline">{t('next')}</span>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Feedback toast */}
      <Feedback />
    </div>
  )
}
