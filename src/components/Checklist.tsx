import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import type { Pair } from '../content/types'
import { Icon } from './Icon'

export function Checklist({ items, title, compact = false }: { items: Pair[]; title?: Pair; compact?: boolean }) {
  const { lang } = useLang()
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const progress = Math.round((checked.size / items.length) * 100)
  const zh = lang === 'zh'

  return (
    <div className={`checklist ${compact ? 'compact' : ''}`}>
      {title && (
        <div className="checklist-head">
          <div>
            <h4>{zh ? title.zh : title.en}</h4>
            <p>{zh ? '点一下打勾，进度会保存到本次浏览。' : 'Tap to check. Progress is kept for this visit.'}</p>
          </div>
          <span className="checklist-count">
            {checked.size}/{items.length}
          </span>
        </div>
      )}
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <ul>
        {items.map((item, index) => {
          const isChecked = checked.has(index)
          return (
            <li key={index} className={isChecked ? 'is-checked' : ''}>
              <label>
                <input type="checkbox" checked={isChecked} onChange={() => toggle(index)} />
                <span className="check-box">
                  <Icon name="check" size={12} strokeWidth={2.6} />
                </span>
                <span>{zh ? item.zh : item.en}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
