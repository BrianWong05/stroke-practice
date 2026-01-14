import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { t } from '@/i18n'
import { usePractice } from '@/hooks/usePractice'
import { CharacterCategory } from '@/context/PracticeContext'
import { uppercaseAlphabet, lowercaseAlphabet } from '@/data/alphabet'
import { chineseCurriculum } from '@/data/characters'
import CustomCharacterInput from '@/components/CustomCharacterInput'

interface CharacterGridProps {
  category: CharacterCategory
}

export default function CharacterGrid({ category }: CharacterGridProps) {
  const { state } = usePractice()
  const navigate = useNavigate()
  const [openSections, setOpenSections] = useState<string[]>(['level-1'])

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) 
        ? prev.filter(sectionId => sectionId !== id)
        : [...prev, id]
    )
  }
  
  const handleSelect = (index: number) => {
    navigate(`/${category}/${index}`)
  }
  
  
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
                  onClick={() => handleSelect(index)}
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
                  onClick={() => handleSelect(uppercaseAlphabet.length + index)}
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
      <div className="flex flex-col h-full">
        {/* Custom Character Input - only for Chinese */}
        {category === 'chinese' && (
          <div className="sticky top-0 z-10 bg-slate-50 pb-4 pt-2 -mt-2">
            <CustomCharacterInput />
          </div>
        )}

        {/* Chinese Curriculum Accordion */}
        {category === 'chinese' ? (
          <div className="space-y-6 pb-8">
            {chineseCurriculum.map((level) => {
              const isOpen = openSections.includes(level.id)
              
              return (
                <div key={level.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  {/* Header */}
                  <button
                    onClick={() => toggleSection(level.id)}
                    className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{level.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{level.description}</p>
                    </div>
                    <ChevronDown 
                      className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {/* Content Grid */}
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                   <div className="p-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 md:gap-4 bg-white border-t border-slate-100">
                      {level.characters.map((char) => {
                        // Find global index in the flattened state.characters array
                        // This ensures navigation and "Next/Prev" logic works correctly
                        const globalIndex = state.characters.indexOf(char)
                        
                        // Fallback if not found (shouldn't happen if data is synced)
                        if (globalIndex === -1) return null

                        return (
                          <button
                            key={char}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all aspect-square flex items-center justify-center text-3xl sm:text-4xl font-bold text-slate-700 border border-slate-100 active:bg-slate-50 font-chinese" 
                            onClick={() => handleSelect(globalIndex)}
                          >
                            {char}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Numbers Grid (Default Flat) */
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {state.characters.map((char, index) => (
              <button
                key={char}
                className="bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all aspect-square flex items-center justify-center text-4xl font-bold text-slate-700 border border-slate-100 active:bg-slate-50 font-chinese" 
                onClick={() => handleSelect(index)}
              >
                {char}
              </button>
            ))}
          </div>
        )}
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
