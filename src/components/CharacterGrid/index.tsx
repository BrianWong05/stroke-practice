import { t } from '@/i18n'
import { usePractice } from '@/hooks/usePractice'
import { CharacterCategory } from '@/context/PracticeContext'
import { uppercaseAlphabet, lowercaseAlphabet } from '@/data/alphabet'
import CustomCharacterInput from '@/components/CustomCharacterInput'

interface CharacterGridProps {
  category: CharacterCategory
}

export default function CharacterGrid({ category }: CharacterGridProps) {
  const { state, selectCharacter } = usePractice()
  
  
  const getTitle = () => {
    switch (category) {
      case 'numbers': return t('selectNumbers')
      case 'english': return t('selectEnglish')
      case 'chinese': return t('selectChinese')
    }
  }

  const renderGrid = () => {
    if (category === 'english') {
      return (
        <div className="space-y-8">
          {/* Uppercase Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-500 mb-4 px-2">{t('uppercase')}</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 md:gap-4">
              {uppercaseAlphabet.map((char, index) => (
                <button
                  key={`upper-${char}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all aspect-square flex items-center justify-center text-3xl font-bold text-slate-700 border border-slate-100 active:bg-slate-50"
                  onClick={() => selectCharacter(index)}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>

          {/* Lowercase Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-500 mb-4 px-2">{t('lowercase')}</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 md:gap-4">
              {lowercaseAlphabet.map((char, index) => (
                <button
                  key={`lower-${char}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all aspect-square flex items-center justify-center text-3xl font-bold text-slate-700 border border-slate-100 active:bg-slate-50"
                  onClick={() => selectCharacter(uppercaseAlphabet.length + index)}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // Default Grid (Numbers & Chinese)
    return (
      <div>
        {/* Custom Character Input - only for Chinese */}
        {category === 'chinese' && <CustomCharacterInput />}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {state.characters.map((char, index) => (
            <button
              key={char}
              className="bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all aspect-square flex items-center justify-center text-4xl font-bold text-slate-700 border border-slate-100 active:bg-slate-50 font-chinese" 
              onClick={() => selectCharacter(index)}
            >
              {char}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col p-6 w-full max-w-4xl mx-auto h-full overflow-hidden">
      {/* Header */}
      <header className="flex items-center mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-800">
          {getTitle()}
        </h1>
      </header>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto pb-8 pr-2 pt-2">
        {renderGrid()}
      </div>
    </div>
  )
}
