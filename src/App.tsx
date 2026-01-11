import { PracticeProvider } from '@/context/PracticeContext'
import Layout from '@/components/Layout'
import CategorySelector from '@/components/CategorySelector'
import CharacterGrid from '@/components/CharacterGrid'
import PracticeCanvas from '@/components/PracticeCanvas'

import { usePractice } from '@/hooks/usePractice'

function AppContent() {
  const { state } = usePractice()
  
  return (
    <Layout>
      {state.view === 'categories' && <CategorySelector />}
      {state.view === 'grid' && state.category && (
        <CharacterGrid category={state.category} />
      )}
      {state.view === 'practice' && <PracticeCanvas />}

    </Layout>
  )
}

function App() {
  return (
    <PracticeProvider>
      <AppContent />
    </PracticeProvider>
  )
}

export default App
