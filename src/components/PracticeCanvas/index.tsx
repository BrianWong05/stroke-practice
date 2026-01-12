import { Play, Eraser, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, EyeOff } from 'lucide-react'
import { t } from '@/i18n'
import { usePractice } from '@/hooks/usePractice'
import ChineseCanvas from './ChineseCanvas'
import TracingCanvas from './TracingCanvas'
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
    resetStrokes,
    toggleGuidelines,
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
            <TracingCanvas character={currentCharacter} category={state.category!} />
          )}
        </div>
      </div>

      {/* Control buttons - new layout */}
      <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        {/* Previous Character */}
        <button 
          className="btn btn-secondary" 
          onClick={prevCharacter}
          disabled={state.isAnimating}
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
            disabled={!canPrevStroke || state.isAnimating}
            aria-label={t('previousStroke')}
            title={t('previousStroke')}
            style={{ opacity: (!canPrevStroke || state.isAnimating) ? 0.5 : 1 }}
          >
            <ChevronsLeft size={20} />
          </button>
          
          <button 
            className="btn btn-primary" 
            id="play-btn"
            disabled={state.isAnimating}
            aria-label={t('play')}
            style={{ opacity: state.isAnimating ? 0.5 : 1 }}
          >
            <Play size={20} />
            <span>{t('play')}</span>
          </button>
          
          <button 
            className="btn btn-secondary btn-icon"
            onClick={nextStroke}
            disabled={!canNextStroke || state.isAnimating}
            aria-label={t('nextStroke')}
            title={t('nextStroke')}
            style={{ opacity: (!canNextStroke || state.isAnimating) ? 0.5 : 1 }}
          >
            <ChevronsRight size={20} />
          </button>
        </div>

        {/* Clear Button */}
        <button 
          className="btn btn-secondary" 
          id="clear-btn"
          onClick={resetStrokes}
          disabled={state.isAnimating}
          aria-label={t('clear')}
          title={t('clear')}
          style={{ opacity: state.isAnimating ? 0.5 : 1 }}
        >
          <Eraser size={20} />
          <span className="hidden md:inline">{t('clear')}</span>
        </button>

        {/* Toggle Guidelines Button */}
        <button
          className="btn btn-secondary btn-icon"
          onClick={toggleGuidelines}
          disabled={state.isAnimating}
          aria-label={state.showGuidelines ? t('hideGuidelines') : t('showGuidelines')}
          title={state.showGuidelines ? t('hideGuidelines') : t('showGuidelines')}
          style={{ opacity: state.isAnimating ? 0.5 : 1 }}
        >
          {state.showGuidelines ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>

        {/* Next Character */}
        <button 
          className="btn btn-secondary" 
          onClick={nextCharacter}
          disabled={state.isAnimating}
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

