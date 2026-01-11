import { Hash, Type, Languages } from 'lucide-react'
import { t } from '@/i18n'
import { usePractice } from '@/hooks/usePractice'
import { CharacterCategory } from '@/context/PracticeContext'

interface CategoryCardProps {
  category: CharacterCategory
  icon: React.ReactNode
  label: string
  className: string
  onClick: () => void
}

function CategoryCard({ icon, label, className, onClick }: CategoryCardProps) {
  return (
    <button className={`category-btn ${className}`} onClick={onClick}>
      <div className="icon">{icon}</div>
      <span className="text-xl font-semibold text-slate-700">{label}</span>
    </button>
  )
}

export default function CategorySelector() {
  const { selectCategory } = usePractice()

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      {/* Instruction */}
      <p className="text-xl text-slate-600 mb-8">{t('selectCategory')}</p>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        <CategoryCard
          category="numbers"
          icon={<Hash size={32} />}
          label={t('numbers')}
          className="numbers"
          onClick={() => selectCategory('numbers')}
        />
        <CategoryCard
          category="english"
          icon={<Type size={32} />}
          label={t('englishAlphabet')}
          className="english"
          onClick={() => selectCategory('english')}
        />
        <CategoryCard
          category="chinese"
          icon={<Languages size={32} />}
          label={t('chineseCharacters')}
          className="chinese"
          onClick={() => selectCategory('chinese')}
        />
      </div>
    </div>
  )
}
