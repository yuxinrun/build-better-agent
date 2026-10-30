import { useLang } from '../i18n/LanguageContext'
import type { Block } from '../content/types'
import { Checklist } from './Checklist'
import { CodeBlock } from './CodeBlock'
import { DiagramFigure } from './diagrams/Diagram'
import { Icon } from './Icon'

const calloutIcon = {
  tip: 'bulb',
  warn: 'alert',
  idea: 'spark',
  note: 'book',
} as const

export function ChapterBlocks({ blocks }: { blocks: Block[] }) {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const t = (pair: { zh: string; en: string }) => (zh ? pair.zh : pair.en)

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'p':
            return (
              <p className="prose-p" key={index}>
                {t(block)}
              </p>
            )
          case 'list':
            return (
              <ul className="prose-list" key={index}>
                {(zh ? block.zh : block.en).map((item, i) => (
                  <li key={i}>
                    <span className="list-dot" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )
          case 'cards':
            return (
              <div className="prose-cards" key={index}>
                {block.items.map((item, i) => (
                  <div className="prose-card" key={i}>
                    {item.icon && (
                      <span className="prose-card-icon">
                        <Icon name={item.icon} size={18} />
                      </span>
                    )}
                    <h4>{t(item.title)}</h4>
                    <p>{t(item.desc)}</p>
                  </div>
                ))}
              </div>
            )
          case 'callout':
            return (
              <aside className={`callout tone-${block.tone}`} key={index}>
                <span className="callout-icon">
                  <Icon name={calloutIcon[block.tone]} size={18} />
                </span>
                <div>
                  <strong>{t(block.title)}</strong>
                  <p>{zh ? block.zh : block.en}</p>
                </div>
              </aside>
            )
          case 'code':
            return (
              <CodeBlock
                key={index}
                code={block.code}
                lang={block.lang}
                title={block.title}
                note={block.note ? t(block.note) : undefined}
              />
            )
          case 'diagram':
            return <DiagramFigure key={index} id={block.id} caption={block.caption} />
          case 'table':
            return (
              <div className="table-wrap" key={index}>
                <table>
                  <thead>
                    <tr>
                      {block.head.map((cell, i) => (
                        <th key={i}>{t(cell)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{t(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'steps':
            return (
              <ol className="step-list" key={index}>
                {block.items.map((item, i) => (
                  <li key={i}>
                    <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h4>{t(item.title)}</h4>
                      <p>{t(item.desc)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )
          case 'checklist':
            return <Checklist key={index} items={block.items} title={block.title} />
          case 'formula':
            return (
              <div className="formula-card" key={index}>
                <span className="formula-label">{t(block.label)}</span>
                <code>{block.formula}</code>
                <p>{t(block.note)}</p>
              </div>
            )
          default:
            return null
        }
      })}
    </>
  )
}
