import { useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { Pair } from '../content/types'

export function usePageMeta(title: Pair, description?: Pair) {
  const { lang } = useLang()

  useEffect(() => {
    const t = lang === 'zh' ? title.zh : title.en
    document.title = `${t} · 鱼心快跑`
    if (description) {
      const content = lang === 'zh' ? description.zh : description.en
      document.querySelector('meta[name="description"]')?.setAttribute('content', content)
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', content)
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${t} · 鱼心快跑`)
    }
  }, [lang, title, description])
}
