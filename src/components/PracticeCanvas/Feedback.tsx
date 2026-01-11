import { t } from '@/i18n'
import { usePractice } from '@/hooks/usePractice'

export default function Feedback() {
  const { state } = usePractice()

  if (!state.feedback) return null

  return (
    <div className={`feedback ${state.feedback}`}>
      {state.feedback === 'success' ? t('correct') : t('tryAgain')}
    </div>
  )
}
