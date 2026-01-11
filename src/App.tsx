import { PracticeProvider } from '@/context/PracticeContext'
import Layout from '@/components/Layout'
import CategorySelector from '@/components/CategorySelector'
import PracticeCanvas from '@/components/PracticeCanvas'
import { usePractice } from '@/hooks/usePractice'

function AppContent() {
  const { state } = usePractice()
  
  return (
    <Layout>
      {state.category === null ? (
        <CategorySelector />
      ) : (
        <PracticeCanvas />
      )}
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
