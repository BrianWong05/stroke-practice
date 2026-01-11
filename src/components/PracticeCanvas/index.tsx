import { Play, Eraser, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
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
    nextStroke,
    prevStroke,
  } = usePractice()

  const isChinese = state.category === 'chinese'
  const canPrevStroke = state.currentStrokeIndex > 0
  const canNextStroke = state.currentStrokeIndex < state.totalStrokes

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

      {/* Control buttons - new layout */}
      <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        {/* Previous Character */}
        <button 
          className="btn btn-secondary" 
          onClick={prevCharacter}
          aria-label={t('previous')}
        >
          <ChevronLeft size={20} />
          <span className="hidden md:inline">{t('previous')}</span>
        </button>

        {/* Stroke Navigation Group */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          <button 
            className="btn btn-secondary btn-icon"
            onClick={prevStroke}
            disabled={!canPrevStroke}
            aria-label={t('previousStroke')}
            title={t('previousStroke')}
            style={{ opacity: canPrevStroke ? 1 : 0.5 }}
          >
            <ChevronsLeft size={20} />
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
            className="btn btn-secondary btn-icon"
            onClick={nextStroke}
            disabled={!canNextStroke}
            aria-label={t('nextStroke')}
            title={t('nextStroke')}
            style={{ opacity: canNextStroke ? 1 : 0.5 }}
          >
            <ChevronsRight size={20} />
          </button>
        </div>

        {/* Clear Button */}
        <button 
          className="btn btn-secondary" 
          id="clear-btn"
          aria-label={t('clear')}
        >
          <Eraser size={20} />
          <span className="hidden md:inline">{t('clear')}</span>
        </button>

        {/* Next Character */}
        <button 
          className="btn btn-secondary" 
          onClick={nextCharacter}
          aria-label={t('next')}
        >
          <span className="hidden md:inline">{t('next')}</span>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Feedback toast */}
      <Feedback />
    </div>
  )
}

