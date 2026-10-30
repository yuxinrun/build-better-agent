import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'zh' | 'en'

type LanguageValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageValue | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('yx-lang')
    if (saved === 'zh' || saved === 'en') return saved
    return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
  } catch {
    return 'zh'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    try {
      localStorage.setItem('yx-lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => setLangState(next), [])
  const toggle = useCallback(() => setLangState((cur) => (cur === 'zh' ? 'en' : 'zh')), [])

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}

export function useT() {
  const { lang } = useLang()
  return useCallback((zh: string, en: string) => (lang === 'zh' ? zh : en), [lang])
}
