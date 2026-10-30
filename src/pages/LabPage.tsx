import { Link } from 'react-router-dom'
import { Checklist } from '../components/Checklist'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'
import { ContextBudget } from '../components/labs/ContextBudget'
import { CostCalculator } from '../components/labs/CostCalculator'
import { DecisionWizard } from '../components/labs/DecisionWizard'
import { ToolDoctor } from '../components/labs/ToolDoctor'
import { launchGates } from '../content/home'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLang } from '../i18n/LanguageContext'

export function LabPage() {
  const { lang } = useLang()
  const zh = lang === 'zh'

  usePageMeta(
    { zh: '实战实验室', en: 'The lab' },
    {
      zh: '四个交互实验：上下文预算、Agent 成本、Workflow/Agent 决策、工具说明书体检。动手调一调，比看十篇文章更直观。',
      en: 'Four interactive labs: context budget, agent cost, workflow vs agent, and tool spec checkup.',
    },
  )

  return (
    <>
      <section className="page-hero lab-hero">
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">{zh ? '实战实验室' : 'THE LAB'}</span>
            <h1 className="display">{zh ? '把参数拧一拧，直觉就来了' : 'Turn the knobs. Build intuition.'}</h1>
            <p className="lead">
              {zh
                ? '四个小实验，对应四个最常被低估的决策：上下文、成本、自主性、工具设计。没有标准答案，只有更清醒的取舍。'
                : 'Four experiments for four underrated decisions: context, cost, autonomy, and tool design. No right answers — just clearer trade-offs.'}
            </p>
          </div>
          <div className="page-hero-meta">
            <div><strong>4</strong><span>{zh ? '个实验' : 'labs'}</span></div>
            <div><strong>12</strong><span>{zh ? '道上关卡' : 'gates'}</span></div>
            <div><strong>0</strong><span>{zh ? '个标准答案' : 'right answers'}</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="lab-grid lab-page-grid">
            <Reveal><ContextBudget /></Reveal>
            <Reveal delay={1}><CostCalculator /></Reveal>
            <Reveal delay={1}><DecisionWizard /></Reveal>
            <Reveal delay={2}><ToolDoctor /></Reveal>
          </div>

          <div className="lab-tips">
            <div>
              <Icon name="bulb" size={18} />
              <p>
                {zh
                  ? '建议顺序：先用预算实验理解上下文，再用决策器选形态，然后算成本，最后体检工具。所有数字都是示意，换成你自己的数据才有意义。'
                  : 'Suggested order: context budget, then the decision wizard, then cost, then tool checkup. All numbers are illustrative; use your own.'}
              </p>
            </div>
            <Link className="link-arrow" to="/chapters">
              {zh ? '回到章节' : 'Back to chapters'} <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="gate-band">
        <div className="container gate-grid">
          <div className="gate-copy">
            <span className="eyebrow coral">{zh ? '附加实验 · 上线自检' : 'BONUS · LAUNCH GATE'}</span>
            <h2 className="section-title">{zh ? '你的 Agent 能过几关？' : 'How many gates does your agent pass?'}</h2>
            <p>
              {zh
                ? '把这份清单当成发布前的体检表。能全部打勾，再谈放权和扩容。'
                : 'Treat this as a pre-flight checkup. Check every box before expanding autonomy or traffic.'}
            </p>
            <Link className="link-arrow" to="/chapters/multi-agent-production">
              {zh ? '第 10 章：生产上线' : 'Ch.10: Shipping to production'} <Icon name="arrow-right" size={15} />
            </Link>
          </div>
          <div className="gate-checklist">
            <Checklist items={launchGates} title={{ zh: '上线 12 关', en: '12 launch gates' }} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="→"
            kicker={{ zh: '下一步', en: 'Next' }}
            title={{ zh: '带着答案，回到章节里找方法', en: 'Take your answers back to the chapters' }}
            desc={{
              zh: '实验室帮你发现问题，章节给你解决问题的工具和代码。',
              en: 'The lab surfaces problems; the chapters give you tools and code to solve them.',
            }}
            action={
              <Link className="btn btn-primary btn-sm" to="/chapters/mental-model">
                {zh ? '从第 1 章开始' : 'Start chapter 1'} <Icon name="arrow-right" size={15} />
              </Link>
            }
          />
        </div>
      </section>
    </>
  )
}
