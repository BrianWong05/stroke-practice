import { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { t } from '@/i18n'
import { usePractice } from '@/hooks/usePractice'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { state, goHome } = usePractice()
  const showBackButton = state.category !== null

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex items-center gap-4 sticky top-0 z-50">
        {showBackButton && (
          <button
            onClick={goHome}
            className="btn btn-icon btn-secondary"
            aria-label={t('back')}
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className="text-2xl font-bold text-slate-800 flex-1 text-center" style={{ marginRight: showBackButton ? '48px' : '0' }}>
          {t('appTitle')}
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  )
}
