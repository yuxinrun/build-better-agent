import type { ReactNode } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { Pair } from '../content/types'

export function SectionHead({
  index,
  kicker,
  title,
  desc,
  action,
  align = 'left',
}: {
  index: string
  kicker: Pair
  title: Pair
  desc?: Pair
  action?: ReactNode
  align?: 'left' | 'center'
}) {
  const { lang } = useLang()
  return (
    <div className={`section-head ${align === 'center' ? 'center' : ''}`}>
      <div className="section-head-main">
        <span className="section-index">{index}</span>
        <div>
          <span className="eyebrow">{lang === 'zh' ? kicker.zh : kicker.en}</span>
          <h2 className="section-title">{lang === 'zh' ? title.zh : title.en}</h2>
          {desc && <p className="section-desc">{lang === 'zh' ? desc.zh : desc.en}</p>}
        </div>
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  )
}
