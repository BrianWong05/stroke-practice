import { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { t } from '@/i18n'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  
  const showBackButton = location.pathname !== '/'

  const handleBack = () => {
    const pathParts = location.pathname.split('/').filter(Boolean)
    
    // If deep (/category/index), go up one level
    if (pathParts.length > 1) {
      navigate(`/${pathParts[0]}`)
      return
    }
    
    // Otherwise go home
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex items-center gap-4 sticky top-0 z-50">
        {showBackButton && (
          <button
            onClick={handleBack}
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
