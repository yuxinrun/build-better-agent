import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChapterCard } from '../components/ChapterCard'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { chapters } from '../content/chapters'
import type { Level } from '../content/types'
import { levelLabel } from '../content/types'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLang } from '../i18n/LanguageContext'

type Filter = 'all' | Level

export function ChaptersPage() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [filter, setFilter] = useState<Filter>('all')

  usePageMeta(
    { zh: '全部章节', en: 'All chapters' },
    {
      zh: '10 章 Agent 实战内容：心智模型、第一个 Agent、上下文工程、工具设计、记忆、工作流、评估、可观测性、成本与多 Agent。',
      en: 'Ten practical agent chapters: mental model, first agent, context, tools, memory, workflows, evals, observability, cost, and multi-agent.',
    },
  )

  const filters: { id: Filter; zh: string; en: string }[] = [
    { id: 'all', zh: '全部', en: 'All' },
    { id: 'starter', zh: '入门', en: 'Starter' },
    { id: 'builder', zh: '进阶', en: 'Builder' },
    { id: 'production', zh: '生产', en: 'Production' },
  ]

  const list = filter === 'all' ? chapters : chapters.filter((chapter) => chapter.level === filter)

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">{zh ? '全部章节' : 'ALL CHAPTERS'} · 10</span>
            <h1 className="display">
              {zh ? '从第一个循环，到生产上线' : 'From first loop to production'}
            </h1>
            <p className="lead">
              {zh
                ? '建议按顺序读：每一章都建立在前一章的心智模型上。如果你已经在线上踩坑，也可以直接跳到第 7 章。'
                : 'Read in order: each chapter builds on the previous mental model. If you are already fighting production, jump to chapter 7.'}
            </p>
          </div>
          <div className="page-hero-meta">
            <div><strong>10</strong><span>{zh ? '章' : 'chapters'}</span></div>
            <div><strong>~2.7h</strong><span>{zh ? '总阅读' : 'total read'}</span></div>
            <div><strong>30+</strong><span>{zh ? '检查项' : 'checks'}</span></div>
          </div>
        </div>
      </section>

      <section className="section chapters-index">
        <div className="container">
          <div className="filter-row">
            <div className="filter-pills" role="group" aria-label={zh ? '按难度筛选' : 'Filter by level'}>
              {filters.map((item) => (
                <button
                  key={item.id}
                  className={filter === item.id ? 'is-active' : ''}
                  onClick={() => setFilter(item.id)}
                  aria-pressed={filter === item.id}
                >
                  {zh ? item.zh : item.en}
                  <span>
                    {item.id === 'all' ? chapters.length : chapters.filter((c) => c.level === item.id).length}
                  </span>
                </button>
              ))}
            </div>
            <Link className="link-arrow" to="/lab">
              {zh ? '先做个小实验' : 'Try a lab first'} <Icon name="arrow-right" size={15} />
            </Link>
          </div>

          <div className="chapter-grid full">
            {list.map((chapter, index) => (
              <Reveal key={chapter.slug} delay={(index % 3) as 0 | 1 | 2}>
                <ChapterCard chapter={chapter} />
              </Reveal>
            ))}
          </div>

          <div className="index-note">
            <Icon name="bulb" size={18} />
            <p>
              {zh
                ? `不确定从哪开始？入门章节适合先建立心智模型；${levelLabel.production.zh}章节适合已有 Demo、准备上线的团队。`
                : 'Unsure where to start? Starter chapters build the mental model; production chapters fit teams with a demo heading to launch.'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
