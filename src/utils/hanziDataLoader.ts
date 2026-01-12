import { chineseCharacters } from '@/data/characters'

export const loadHanziData = (char: string, onLoad: (data: any) => void, onError: (err: any) => void) => {
  const isPreset = chineseCharacters.includes(char)

  const loadFromUrl = (url: string) => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load ${char}: ${res.statusText}`)
        }
        return res.json()
      })
      .then(onLoad)
      .catch(onError)
  }

  if (isPreset) {
    // Load from local public folder
    loadFromUrl(`/hanzi-data/${char}.json`)
  } else {
    // Fallback to CDN for custom characters
    loadFromUrl(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${char}.json`)
  }
}
