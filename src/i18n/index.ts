import { zhHK, TranslationKey } from './zh-HK'

export function t(key: TranslationKey): string {
  return zhHK[key]
}

export { zhHK, type TranslationKey }
