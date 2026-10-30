import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CodeBlock } from '../components/CodeBlock'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { templates } from '../content/toolkit'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLang } from '../i18n/LanguageContext'

export function ToolkitPage() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [active, setActive] = useState<string>('all')

  usePageMeta(
    { zh: '工具箱 · 可复制模板', en: 'Toolkit · copy-ready templates' },
    {
      zh: '六套 Agent 工程模板：系统提示骨架、工具定义、评测用例、trace 字段、人工审批策略、上线检查清单。一键复制。',
      en: 'Six agent engineering templates: system prompt, tool spec, eval cases, trace schema, human approval, and launch checklist.',
    },
  )

  const list = active === 'all' ? templates : templates.filter((template) => template.id === active)

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">{zh ? '工具箱 / TOOLKIT' : 'TOOLKIT'}</span>
            <h1 className="display">{zh ? '别从空白页开始' : 'Do not start from a blank page'}</h1>
            <p className="lead">
              {zh
                ? '这些模板来自真实项目里反复修改的版本。直接复制，改成你的场景；比从零写快，也比从零写稳。'
                : 'Versions refined across real projects. Copy, adapt to your context — faster and steadier than starting from zero.'}
            </p>
          </div>
          <div className="page-hero-meta">
            <div><strong>{templates.length}</strong><span>{zh ? '套模板' : 'templates'}</span></div>
            <div><strong>MD / JSON / YAML</strong><span>{zh ? '即拿即用' : 'ready to use'}</span></div>
            <div><strong>0</strong><span>{zh ? '个依赖' : 'dependencies'}</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="toolkit-nav" role="group" aria-label={zh ? '模板筛选' : 'Filter templates'}>
            <button type="button" className={active === 'all' ? 'is-active' : ''} onClick={() => setActive('all')}>
              {zh ? '全部' : 'All'}
              <span>{templates.length}</span>
            </button>
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                className={active === template.id ? 'is-active' : ''}
                onClick={() => setActive(template.id)}
              >
                {zh ? template.title.zh : template.title.en}
              </button>
            ))}
          </div>

          <div className="toolkit-list">
            {list.map((template, index) => (
              <Reveal key={template.id} delay={(index % 3) as 0 | 1 | 2} className="toolkit-item" as="article">
                <div className="toolkit-item-head">
                  <span className="toolkit-icon">
                    <Icon name={template.icon} size={20} />
                  </span>
                  <div>
                    <div className="toolkit-meta">
                      <span className="tag accent">{zh ? template.tag.zh : template.tag.en}</span>
                      <span className="toolkit-file">{template.file}</span>
                    </div>
                    <h2>{zh ? template.title.zh : template.title.en}</h2>
                    <p>{zh ? template.desc.zh : template.desc.en}</p>
                  </div>
                </div>
                <CodeBlock
                  code={template.code}
                  lang={template.lang}
                  title={template.file}
                  note={zh ? template.note.zh : template.note.en}
                />
              </Reveal>
            ))}
          </div>

          <div className="toolkit-note">
            <Icon name="bulb" size={18} />
            <p>
              {zh
                ? '模板的价值不在“照抄”，而在“被迫做决定”：角色是谁、边界在哪、失败长什么样。每一次填空，都是一次设计。'
                : 'The value is not copying but being forced to decide: who the role is, where the boundary sits, what failure looks like.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container toolkit-cta">
          <div>
            <span className="eyebrow">{zh ? '下一步' : 'NEXT'}</span>
            <h2 className="section-title">{zh ? '模板有了，还差一次评测' : 'You have templates. Now measure.'}</h2>
            <p className="lead">
              {zh
                ? '把模板贴进项目，然后用评测集证明它真的有用。第 7 章给了完整的评测方法与用例设计。'
                : 'Drop the templates into your project, then prove they work with an eval set. Chapter 7 covers the full method.'}
            </p>
          </div>
          <div className="toolkit-cta-actions">
            <Link className="btn btn-primary" to="/chapters/evaluation">
              {zh ? '读第 7 章：评估' : 'Chapter 7: Evaluation'} <Icon name="arrow-right" size={15} />
            </Link>
            <Link className="btn btn-ghost" to="/lab">
              {zh ? '去实验室试试' : 'Try the lab'} <Icon name="sliders" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
