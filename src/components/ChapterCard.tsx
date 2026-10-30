import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { levelLabel, type Chapter } from '../content/types'
import { Icon } from './Icon'

export function ChapterCard({ chapter, compact = false }: { chapter: Chapter; compact?: boolean }) {
  const { lang } = useLang()
  const zh = lang === 'zh'

  return (
    <Link to={`/chapters/${chapter.slug}`} className={`chapter-card accent-${chapter.accent} ${compact ? 'compact' : ''}`}>
      <div className="chapter-card-top">
        <span className="chapter-num">{chapter.num}</span>
        <span className="chapter-icon">
          <Icon name={chapter.icon} size={20} />
        </span>
      </div>
      <h3>{zh ? chapter.title.zh : chapter.title.en}</h3>
      <p className="chapter-sub">{zh ? chapter.subtitle.zh : chapter.subtitle.en}</p>
      {!compact && (
        <ul className="chapter-bullets">
          {chapter.bullets.slice(0, 3).map((bullet, index) => (
            <li key={index}>
              <Icon name="check" size={13} />
              {zh ? bullet.zh : bullet.en}
            </li>
          ))}
        </ul>
      )}
      <div className="chapter-card-foot">
        <span className="tag">{zh ? levelLabel[chapter.level].zh : levelLabel[chapter.level].en}</span>
        <span className="chapter-time">
          <Icon name="clock" size={13} />
          {chapter.minutes} {zh ? '分钟' : 'min'}
        </span>
        <span className="chapter-go">
          {zh ? '阅读' : 'Read'} <Icon name="arrow-right" size={14} />
        </span>
      </div>
    </Link>
  )
}
