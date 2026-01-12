import { PracticeProvider } from '@/context/PracticeContext'
import Layout from '@/components/Layout'
import CategorySelector from '@/components/CategorySelector'
import CharacterGrid from '@/components/CharacterGrid'
import PracticeCanvas from '@/components/PracticeCanvas'

import { usePractice } from '@/hooks/usePractice'

import { HashRouter, Routes, Route, useParams, useSearchParams } from 'react-router-dom'
// ... existing imports

function CustomRoute() {
  const [searchParams] = useSearchParams()
  const char = searchParams.get('char')
  const { loadCustomCharacter } = usePractice()

  useEffect(() => {
    if (char) {
      loadCustomCharacter(decodeURIComponent(char))
    }
  }, [char, loadCustomCharacter])
  
  return <PracticeCanvas />
}

import { useEffect } from 'react'
import { chineseCharacters } from '@/data/characters'
import { numbers } from '@/data/numbers'
import { englishAlphabet } from '@/data/alphabet'
import { CharacterCategory } from '@/context/PracticeContext'

// Wrapper to load data based on route
function CategoryRoute() {
  const { category } = useParams<{ category: CharacterCategory }>()
  const { setCharacters } = usePractice()
  
  useEffect(() => {
    if (category) {
      let chars: string[] = []
      if (category === 'numbers') chars = numbers
      else if (category === 'english') chars = englishAlphabet
      else if (category === 'chinese') chars = chineseCharacters
      
      setCharacters(chars)
    }
  }, [category, setCharacters])

  return <CharacterGrid category={category as CharacterCategory} />
}

function PracticeRoute() {
  const { index } = useParams<{ index: string }>()
  const { selectCharacter } = usePractice()

  useEffect(() => {
    if (index !== undefined) {
      selectCharacter(parseInt(index, 10))
    }
  }, [index, selectCharacter])

  return <PracticeCanvas />
}

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CategorySelector />} />
        <Route path="/:category" element={<CategoryRoute />} />
        <Route path="/:category/:index" element={<PracticeRoute />} />
        <Route path="/custom" element={<CustomRoute />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <HashRouter>
      <PracticeProvider>
        <AppContent />
      </PracticeProvider>
    </HashRouter>
  )
}

export default App
