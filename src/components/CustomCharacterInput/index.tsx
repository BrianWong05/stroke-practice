import { useState, useCallback, KeyboardEvent, ChangeEvent, useRef } from 'react'
import { Search } from 'lucide-react'
import { t } from '@/i18n'
import { usePractice } from '@/hooks/usePractice'

// Chinese character Unicode range regex
const CHINESE_REGEX = /^[\u4e00-\u9fa5]$/

export default function CustomCharacterInput() {
  const { setCustomCharacter } = usePractice()
  const isCompositionRef = useRef(false)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  const handleCompositionStart = useCallback(() => {
    isCompositionRef.current = true
  }, [])

  const handleCompositionEnd = useCallback((e: React.CompositionEvent<HTMLInputElement>) => {
    isCompositionRef.current = false
    // Force validation on completion
    const value = e.currentTarget.value
    const firstChar = value.charAt(0) || '' // Keep only the result character
    setInputValue(firstChar)
  }, [])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // If composing (IME), allow full text update
    if (isCompositionRef.current) {
      setInputValue(e.target.value)
      return
    }

    const value = e.target.value
    // Take only the first character if multiple are pasted or typed normally
    const firstChar = value.charAt(0) || ''
    setInputValue(firstChar)
    setError('')
  }, [])

  const handleSubmit = useCallback(() => {
    // If submitting while composing (unlikely for Enter, but possible), use current value
    const finalValue = inputValue.charAt(0)
    
    if (!finalValue) {
      setError(t('invalidChineseInput'))
      return
    }

    if (!CHINESE_REGEX.test(finalValue)) {
      setError(t('invalidChineseInput'))
      return
    }

    setCustomCharacter(finalValue)
  }, [inputValue, setCustomCharacter])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Prevent submission if still composing (though usually Enter confirms composition)
      if (isCompositionRef.current) return
      handleSubmit()
    }
  }, [handleSubmit])

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={t('customInputPlaceholder')}
          className="w-full sm:w-80 px-6 py-4 text-3xl text-center font-chinese bg-white rounded-xl shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
          // Removed maxLength={1} to support IME composition
          aria-label={t('customInputPlaceholder')}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="btn btn-primary px-6 py-4 text-lg"
          aria-label={t('startPractice')}
        >
          <Search size={20} />
          <span>{t('startPractice')}</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-3 text-center text-red-500 text-sm font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
