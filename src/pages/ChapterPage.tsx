import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChapterBlocks } from '../components/ChapterBlocks'
import { Icon } from '../components/Icon'
import { getChapter, getNeighbours } from '../content/chapters'
import { levelLabel } from '../content/types'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLang } from '../i18n/LanguageContext'
import { NotFoundPage } from './NotFoundPage'

const fallbackTitle = { zh: '章节', en: 'Chapter' }

export function ChapterPage() {
  const { slug } = useParams()
  const chapter = slug ? getChapter(slug) : undefined
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('')
  const [copied, setCopied] = useState(false)

  usePageMeta(chapter?.title ?? fallbackTitle, chapter?.subtitle)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [chapter])

  useEffect(() => {
    if (!chapter) return
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.chapter-section'))
    if (!elements.length) return
    setActive(elements[0].id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: 0 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [chapter])

  if (!chapter) return <NotFoundPage />

  const { prev, next } = getNeighbours(chapter.slug)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <header className={`chapter-hero accent-${chapter.accent}`}>
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/chapters">{zh ? '全部章节' : 'All chapters'}</Link>
            <Icon name="chevron-right" size={13} />
            <span>{chapter.num}</span>
          </div>
          <div className="chapter-hero-grid">
            <div className="chapter-hero-copy">
              <div className="chapter-meta-row">
                <span className="tag accent">{zh ? levelLabel[chapter.level].zh : levelLabel[chapter.level].en}</span>
                <span className="chapter-time"><Icon name="clock" size={14} /> {chapter.minutes} {zh ? '分钟' : 'min'}</span>
                <span className="chapter-time"><Icon name={chapter.icon} size={14} /> {zh ? '实战' : 'practical'}</span>
              </div>
              <h1 className="display">{zh ? chapter.title.zh : chapter.title.en}</h1>
              <p className="lead">{zh ? chapter.subtitle.zh : chapter.subtitle.en}</p>
            </div>
            <div className="chapter-promise">
              <span className="chapter-promise-label">{zh ? '一句话结论' : 'THE SHORT VERSION'}</span>
              <p>{zh ? chapter.promise.zh : chapter.promise.en}</p>
            </div>
          </div>
          <div className="chapter-hero-foot">
            <button className="btn btn-primary btn-sm" onClick={() => scrollToSection(chapter.sections[0].id)}>
              {zh ? '开始阅读' : 'Start reading'} <Icon name="arrow-right" size={15} />
            </button>
            <button className="btn btn-ghost btn-sm" onClick={copyLink}>
              <Icon name={copied ? 'check' : 'copy'} size={14} />
              {copied ? (zh ? '链接已复制' : 'Link copied') : zh ? '复制本章链接' : 'Copy link'}
            </button>
          </div>
          <span className="chapter-watermark" aria-hidden="true">{chapter.num}</span>
        </div>
      </header>

      <div className="container chapter-layout">
        <aside className="chapter-aside">
          <div className="chapter-toc">
            <span className="toc-label">{zh ? '本章目录' : 'ON THIS PAGE'}</span>
            <nav>
              {chapter.sections.map((section, index) => (
                <button
                  key={section.id}
                  className={active === section.id ? 'is-active' : ''}
                  onClick={() => scrollToSection(section.id)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {zh ? section.title.zh : section.title.en}
                </button>
              ))}
            </nav>
            <div className="toc-progress">
              <span>{Math.round(progress)}%</span>
              <div><i style={{ width: `${progress}%` }} /></div>
            </div>
          </div>
        </aside>

        <article className="chapter-article">
          <details className="mobile-toc">
            <summary>
              {zh ? '本章目录' : 'On this page'}
              <Icon name="chevron-down" size={16} />
            </summary>
            <nav>
              {chapter.sections.map((section, index) => (
                <button key={section.id} onClick={() => scrollToSection(section.id)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {zh ? section.title.zh : section.title.en}
                </button>
              ))}
            </nav>
          </details>

          {chapter.sections.map((section, index) => (
            <section className="chapter-section" id={section.id} key={section.id}>
              <div className="chapter-section-head">
                <span className="chapter-section-num">{chapter.num}.{index + 1}</span>
                <h2>{zh ? section.title.zh : section.title.en}</h2>
              </div>
              <ChapterBlocks blocks={section.blocks} />
            </section>
          ))}

          <div className="chapter-end">
            <div>
              <span className="eyebrow">{zh ? '本章结束' : 'END OF CHAPTER'}</span>
              <h3>{zh ? '别急着翻页，先做一遍练习。' : 'Before you turn the page, do the exercise.'}</h3>
              <p>
                {zh
                  ? '读完不等于学会。把本章的清单和练习落进你的项目，才算真正拿到手。'
                  : 'Reading is not learning. Apply the checklist and exercise to your project.'}
              </p>
            </div>
            <Link className="btn btn-accent btn-sm" to="/lab">
              <Icon name="sliders" size={15} />
              {zh ? '去实验室验证' : 'Test it in the lab'}
            </Link>
          </div>

          <nav className="chapter-nav" aria-label={zh ? '章节导航' : 'Chapter navigation'}>
            {prev ? (
              <Link className="chapter-nav-card prev" to={`/chapters/${prev.slug}`}>
                <span><Icon name="arrow-left" size={14} /> {zh ? '上一章' : 'Previous'}</span>
                <strong>{zh ? prev.title.zh : prev.title.en}</strong>
              </Link>
            ) : (
              <Link className="chapter-nav-card prev" to="/chapters">
                <span><Icon name="arrow-left" size={14} /> {zh ? '返回' : 'Back'}</span>
                <strong>{zh ? '全部章节' : 'All chapters'}</strong>
              </Link>
            )}
            {next ? (
              <Link className="chapter-nav-card next" to={`/chapters/${next.slug}`}>
                <span>{zh ? '下一章' : 'Next'} <Icon name="arrow-right" size={14} /></span>
                <strong>{zh ? next.title.zh : next.title.en}</strong>
              </Link>
            ) : (
              <Link className="chapter-nav-card next" to="/lab">
                <span>{zh ? '继续' : 'Continue'} <Icon name="arrow-right" size={14} /></span>
                <strong>{zh ? '去实战实验室' : 'Go to the lab'}</strong>
              </Link>
            )}
          </nav>
        </article>
      </div>
    </>
  )
}
