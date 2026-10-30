import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { glossaryGroups } from '../content/glossary'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLang } from '../i18n/LanguageContext'

const totalTerms = glossaryGroups.reduce((sum, group) => sum + group.terms.length, 0)

export function GlossaryPage() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [query, setQuery] = useState('')

  usePageMeta(
    { zh: 'Agent 术语表', en: 'Agent glossary' },
    {
      zh: `${totalTerms} 个 Agent 核心术语：Agent Loop、上下文工程、RAG、Trace、评测、HITL、最小权限等，中英对照解释。`,
      en: `${totalTerms} core agent terms explained: agent loop, context engineering, RAG, traces, evals, HITL, least privilege, and more.`,
    },
  )

  const q = query.trim().toLowerCase()

  const groups = useMemo(
    () =>
      glossaryGroups
        .map((group) => ({
          ...group,
          terms: group.terms.filter((term) => {
            if (!q) return true
            return (
              term.term.toLowerCase().includes(q) ||
              (term.abbr ?? '').toLowerCase().includes(q) ||
              term.desc.zh.toLowerCase().includes(q) ||
              term.desc.en.toLowerCase().includes(q)
            )
          }),
        }))
        .filter((group) => group.terms.length > 0),
    [q],
  )

  const matches = groups.reduce((sum, group) => sum + group.terms.length, 0)

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">{zh ? '术语表 / GLOSSARY' : 'GLOSSARY'}</span>
            <h1 className="display">{zh ? '先把词说清楚，再谈架构' : 'Get the words right before the architecture'}</h1>
            <p className="lead">
              {zh
                ? 'Agent 领域的争论，有一半是因为两个人在说不同的东西。这份表按使用场景分组，每条只讲清“它是什么、什么时候会用到”。'
                : 'Half of all agent debates are two people describing different things. Grouped by use case, each entry explains what it is and when you meet it.'}
            </p>
          </div>
          <div className="page-hero-meta">
            <div><strong>{totalTerms}</strong><span>{zh ? '个术语' : 'terms'}</span></div>
            <div><strong>{glossaryGroups.length}</strong><span>{zh ? '个分组' : 'groups'}</span></div>
            <div><strong>中 / EN</strong><span>{zh ? '对照' : 'parallel'}</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="glossary-toolbar">
            <label className="glossary-search">
              <Icon name="eye" size={17} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={zh ? '搜索术语，例如 RAG、trace、权限…' : 'Search terms, e.g. RAG, trace, permissions…'}
                aria-label={zh ? '搜索术语' : 'Search terms'}
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label={zh ? '清空搜索' : 'Clear search'}>
                  <Icon name="close" size={15} />
                </button>
              )}
            </label>
            <div className="glossary-tabs" role="group" aria-label={zh ? '术语分组' : 'Term groups'}>
              {glossaryGroups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => document.getElementById(`glossary-${group.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  {zh ? group.title.zh : group.title.en}
                  <span>{group.terms.length}</span>
                </button>
              ))}
            </div>
            {q && (
              <p className="glossary-count">
                {zh ? `找到 ${matches} 个匹配` : `${matches} matches`}
              </p>
            )}
          </div>

          {groups.length === 0 ? (
            <div className="glossary-empty">
              <Icon name="alert" size={20} />
              <p>{zh ? '没有找到匹配的术语。换个关键词，或者直接搜索英文缩写。' : 'No matching terms. Try another keyword or the English abbreviation.'}</p>
            </div>
          ) : (
            <div className="glossary-body">
              {groups.map((group) => (
                <section className="glossary-group" id={`glossary-${group.id}`} key={group.id}>
                  <header className="glossary-group-head">
                    <span className="eyebrow">{zh ? group.title.zh : group.title.en}</span>
                    <p>{zh ? group.blurb.zh : group.blurb.en}</p>
                  </header>
                  <dl className="glossary-list">
                    {group.terms.map((term, index) => (
                      <Reveal key={term.term} delay={(index % 3) as 0 | 1 | 2} className="glossary-term">
                        <dt>
                          <span className="glossary-word">{term.term}</span>
                          {term.abbr && <span className="glossary-abbr">{term.abbr}</span>}
                        </dt>
                        <dd>{zh ? term.desc.zh : term.desc.en}</dd>
                      </Reveal>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          )}

          <div className="glossary-foot">
            <p>
              <Icon name="bulb" size={18} />
              {zh
                ? '术语只是路标。想把它变成能力，还是得回到章节里跑一遍。'
                : 'Terms are signposts. Turn them into skill by running the chapters.'}
            </p>
            <div>
              <Link className="link-arrow" to="/chapters">
                {zh ? '回到章节' : 'Back to chapters'} <Icon name="arrow-right" size={15} />
              </Link>
              <Link className="link-arrow" to="/faq">
                {zh ? '看常见问题' : 'Read the FAQ'} <Icon name="arrow-right" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
