import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { faqs, site } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLang } from '../i18n/LanguageContext'

export function FaqPage() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [open, setOpen] = useState(0)

  usePageMeta(
    { zh: '常见问题', en: 'FAQ' },
    {
      zh: '关于 Agent 转型、框架选择、上下文、多 Agent、成本与评测的十个高频问题，一次回答清楚。',
      en: 'Ten high-frequency questions about agent transitions, frameworks, context, multi-agent, cost, and evals.',
    },
  )

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">{zh ? '常见问题 / FAQ' : 'FAQ'}</span>
            <h1 className="display">{zh ? '你卡住的地方，多半已经有人踩过' : 'Someone has already been stuck where you are'}</h1>
            <p className="lead">
              {zh
                ? '这些问题来自真实的提问与项目复盘。答案不一定适合所有人，但至少能帮你排除几个错误方向。'
                : 'These come from real questions and retrospectives. The answers will not fit everyone, but they eliminate a few wrong turns.'}
            </p>
          </div>
          <div className="page-hero-meta">
            <div><strong>{faqs.length}</strong><span>{zh ? '个问题' : 'questions'}</span></div>
            <div><strong>10</strong><span>{zh ? '章方法' : 'chapters'}</span></div>
            <div><strong>0</strong><span>{zh ? '个万能钥匙' : 'silver bullets'}</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-wrap">
          <div className="faq-list">
            {faqs.map((item, index) => {
              const isOpen = open === index
              return (
                <Reveal key={item.q.en} delay={(index % 3) as 0 | 1 | 2} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="faq-text">{zh ? item.q.zh : item.q.en}</span>
                    <Icon name="chevron-down" size={18} />
                  </button>
                  <div className="faq-a">
                    <p>{zh ? item.a.zh : item.a.en}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <aside className="faq-aside">
            <h2>{zh ? '还没找到答案？' : 'Still stuck?'}</h2>
            <p>
              {zh
                ? '有些问题只靠一篇答案解决不了。把你的场景、失败方式和 trace 发过来，我们可以一起看。'
                : 'Some questions need more than an answer. Send your scenario, failure mode, and trace — we can look together.'}
            </p>
            <a className="btn btn-accent" href={`mailto:${site.email}`}>
              {zh ? '写信给鱼心' : 'Email Yuxin'} <Icon name="arrow-up-right" size={15} />
            </a>
            <div className="faq-aside-links">
              <Link to="/glossary">
                {zh ? '先查术语表' : 'Check the glossary'} <Icon name="arrow-right" size={14} />
              </Link>
              <Link to="/toolkit">
                {zh ? '直接拿模板' : 'Grab a template'} <Icon name="arrow-right" size={14} />
              </Link>
              <Link to="/chapters">
                {zh ? '回到章节' : 'Back to chapters'} <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
