import { Link } from 'react-router-dom'
import logoUrl from '../assets/yuxin-run.png'
import { ChapterCard } from '../components/ChapterCard'
import { Checklist } from '../components/Checklist'
import { CodeBlock } from '../components/CodeBlock'
import { AgentLoop } from '../components/diagrams/AgentLoop'
import { PatternGallery } from '../components/diagrams/PatternGallery'
import { Icon } from '../components/Icon'
import { LogoMark } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import { SectionHead } from '../components/SectionHead'
import { ContextBudget } from '../components/labs/ContextBudget'
import { DecisionWizard } from '../components/labs/DecisionWizard'
import { chapters } from '../content/chapters'
import { launchGates, paths, pitfalls, resources } from '../content/home'
import { authorStory, faqs, site, updates } from '../content/site'
import { templates } from '../content/toolkit'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLang } from '../i18n/LanguageContext'

const modelParts = [
  { icon: 'brain' as const, zh: '模型 · 大脑', en: 'Model · brain', descZh: '理解任务、选择工具、组织答案。', descEn: 'Understands, chooses, writes.' },
  { icon: 'layers' as const, zh: '上下文 · 工作记忆', en: 'Context · memory', descZh: '这一秒能看到的全部信息。', descEn: 'Everything it can see right now.' },
  { icon: 'wrench' as const, zh: '工具 · 手脚', en: 'Tools · hands', descZh: '搜索、查库、发消息、跑代码。', descEn: 'Search, query, send, execute.' },
  { icon: 'pulse' as const, zh: '循环 · 心跳', en: 'Loop · heartbeat', descZh: '观察结果，修正计划，继续行动。', descEn: 'Observe, revise, continue.' },
]

export function HomePage() {
  const { lang } = useLang()
  const zh = lang === 'zh'

  usePageMeta(
    { zh: '如何构建更好的 Agent', en: 'How to build better agents' },
    {
      zh: '写给程序员转型 Agent 开发的实战手册：心智模型、上下文工程、工具设计、RAG、工作流、评估、可观测性、成本与多 Agent。',
      en: 'A practical handbook for engineers building agents: mental models, context engineering, tools, RAG, workflows, evals, observability, cost, and multi-agent.',
    },
  )

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-badge">
              <span className="dot" />
              {zh ? '鱼心快跑 · Agent 实战手册' : 'YUXIN RUNS · AGENT FIELD GUIDE'}
            </span>
            <h1 className="display hero-title">
              {zh ? (
                <>
                  别只会调 API，
                  <br />
                  去造一个<span className="mark">真正好用</span>的 Agent
                </>
              ) : (
                <>
                  Stop just calling APIs.
                  <br />
                  Build agents that <span className="mark">actually work</span>.
                </>
              )}
            </h1>
            <p className="hero-lead">
              {zh
                ? '写给正在转型的传统程序员，也写给想把 Demo 做成产品的 Agent 工程师。少一点玄学，多一点可复用的工程方法、清单和代码。'
                : 'For engineers moving into agents — and for those turning a demo into a product. Less mystique, more reusable engineering: patterns, checklists, and code.'}
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/chapters/mental-model">
                {zh ? '从第 1 章开始' : 'Start at chapter 1'}
                <Icon name="arrow-right" size={17} />
              </Link>
              <Link className="btn btn-ghost" to="/lab">
                <Icon name="sliders" size={16} />
                {zh ? '先逛实验室' : 'Explore the lab'}
              </Link>
            </div>
            <div className="hero-meta">
              <span><b>10</b> {zh ? '章实战' : 'chapters'}</span>
              <span><b>2</b> {zh ? '条路线' : 'tracks'}</span>
              <span><b>4</b> {zh ? '个交互实验' : 'interactive labs'}</span>
              <span><b>32</b> {zh ? '个术语' : 'terms'}</span>
              <span><b>中 / EN</b></span>
            </div>
            <p className="hero-source">
              {zh ? '基于 Anthropic · OpenAI · LangChain 官方实践，加上一线踩坑经验。' : 'Grounded in Anthropic, OpenAI, and LangChain guidance — plus field notes.'}
            </p>
          </div>

          <div className="hero-visual">
            <AgentLoop />
            <p className="hero-visual-note">
              <Icon name="spark" size={14} />
              {zh ? '模型不是 Agent，循环才是。' : 'The model is not the agent. The loop is.'}
            </p>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy}>
              {['MODEL', 'CONTEXT', 'TOOLS', 'LOOP', 'EVAL', 'TRACE', 'GUARDRAILS', 'MEMORY', 'RAG', 'HUMAN-IN-THE-LOOP'].map((word) => (
                <span key={`${copy}-${word}`}>
                  {word}
                  <i>✳</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section" id="paths">
        <div className="container">
          <SectionHead
            index="01"
            kicker={{ zh: '学习路线', en: 'Roadmap' }}
            title={{ zh: '先对号入座，再开始跑', en: 'Pick your track, then start running' }}
            desc={{
              zh: '不管你是刚转过来，还是已经在为线上稳定性发愁，都有一条更短的路径。',
              en: 'Whether you are switching in or fighting production reliability, there is a shorter path.',
            }}
            action={
              <Link className="link-arrow" to="/chapters">
                {zh ? '看全部章节' : 'All chapters'} <Icon name="arrow-right" size={15} />
              </Link>
            }
          />
          <div className="path-grid">
            {paths.map((path, index) => (
              <Reveal key={path.id} delay={(index + 1) as 1 | 2} className={`path-card tone-${path.tone}`}>
                <div className="path-top">
                  <span className="path-label">{zh ? path.label.zh : path.label.en}</span>
                  <span className="path-watermark">{String.fromCharCode(65 + index)}</span>
                </div>
                <h3>{zh ? path.title.zh : path.title.en}</h3>
                <p className="path-audience">{zh ? path.audience.zh : path.audience.en}</p>
                <p className="path-desc">{zh ? path.desc.zh : path.desc.en}</p>
                <ol className="path-steps">
                  {path.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>
                      <span className="path-step-dot">{stepIndex + 1}</span>
                      <div>
                        <strong>{zh ? step.title.zh : step.title.en}</strong>
                        <p>{zh ? step.desc.zh : step.desc.en}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="path-outcome"><Icon name="target" size={15} /> {zh ? path.outcome.zh : path.outcome.en}</p>
                <Link className="link-arrow" to={path.cta.to}>
                  {zh ? path.cta.label.zh : path.cta.label.en} <Icon name="arrow-right" size={15} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="model">
        <div className="container">
          <SectionHead
            index="02"
            kicker={{ zh: '心智模型', en: 'Mental model' }}
            title={{ zh: 'Agent 不是更长的 Prompt', en: 'An agent is not a longer prompt' }}
            desc={{
              zh: '拆开看，它只有四个零件。理解这四个零件，比背下十个框架更有用。',
              en: 'Strip it down and there are only four parts. Understanding them beats memorizing ten frameworks.',
            }}
          />
          <div className="model-grid">
            <div className="model-left">
              <div className="model-parts">
                {modelParts.map((part, index) => (
                  <Reveal key={part.en} delay={(index % 4) as 0 | 1 | 2 | 3} className="model-part">
                    <span className="model-part-icon"><Icon name={part.icon} size={20} /></span>
                    <h3>{zh ? part.zh : part.en}</h3>
                    <p>{zh ? part.descZh : part.descEn}</p>
                  </Reveal>
                ))}
              </div>
              <div className="model-quote">
                <Icon name="spark" size={20} />
                <p>
                  {zh
                    ? '模型是大脑，不是整个系统。让它可用的，是上下文、工具、状态和护栏共同组成的“身体”。'
                    : 'The model is the brain, not the system. Context, tools, state, and guardrails form the body that makes it useful.'}
                </p>
              </div>
            </div>
            <div className="model-right">
              <CodeBlock
                lang="python"
                title="the_whole_idea.py"
                code={`messages = [{"role": "user", "content": task}]

for step in range(MAX_STEPS):
    msg = llm(messages, tools=TOOLS)
    messages.append(msg)

    # 停止条件：模型不再调用工具
    if not msg.tool_calls:
        return msg.content

    # 行动 → 观察 → 回到循环
    for call in msg.tool_calls:
        result = run_tool(call.name, call.arguments)
        messages.append(tool_result(call.id, result))

return "达到最大步数，已停止。"`}
                note={zh ? '所有 Agent 框架，都是这段循环的工程化包装。' : 'Every agent framework is an engineering wrapper around this loop.'}
              />
              <div className="model-links">
                <Link to="/chapters/mental-model" className="mini-link">
                  <span>01</span>
                  {zh ? '先搞懂 Agent Loop' : 'Understand the loop'}
                  <Icon name="arrow-right" size={14} />
                </Link>
                <Link to="/chapters/first-agent" className="mini-link">
                  <span>02</span>
                  {zh ? '手写你的第一个 Agent' : 'Write your first agent'}
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="chapters">
        <div className="container">
          <SectionHead
            index="03"
            kicker={{ zh: '核心章节', en: 'Chapters' }}
            title={{ zh: '10 章，从第一个循环到生产上线', en: 'Ten chapters, from first loop to production' }}
            desc={{
              zh: '每章都有可复制的做法、代码片段、检查清单和常见坑。可以按顺序读，也可以直接跳到你现在的问题。',
              en: 'Every chapter has reusable practices, code, checklists, and pitfalls. Read in order or jump to your current problem.',
            }}
            action={
              <Link className="link-arrow" to="/chapters">
                {zh ? '浏览全部' : 'Browse all'} <Icon name="arrow-right" size={15} />
              </Link>
            }
          />
          <div className="chapter-grid home-chapters">
            {chapters.map((chapter, index) => (
              <Reveal key={chapter.slug} delay={(index % 3) as 0 | 1 | 2}>
                <ChapterCard chapter={chapter} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band" id="patterns">
        <div className="container">
          <SectionHead
            index="04"
            kicker={{ zh: '模式库', en: 'Pattern library' }}
            title={{ zh: '大多数场景，不需要“全自主”', en: 'Most problems do not need full autonomy' }}
            desc={{
              zh: '先把工作流画明白，再把合适的节点交给模型。这五种模式，覆盖了大多数稳定上线的系统。',
              en: 'Draw the workflow first, then hand the right nodes to the model. These five patterns cover most systems that ship.',
            }}
          />
          <PatternGallery />
          <p className="band-source">
            {zh ? '模式分类参考 Anthropic《Building effective agents》。' : 'Pattern taxonomy after Anthropic’s “Building effective agents.”'}
            <a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noreferrer">
              {zh ? '阅读原文' : 'Read the source'} <Icon name="arrow-up-right" size={13} />
            </a>
          </p>
        </div>
      </section>

      <section className="section" id="lab">
        <div className="container">
          <SectionHead
            index="05"
            kicker={{ zh: '实战实验室', en: 'The lab' }}
            title={{ zh: '动手调一调，比看十篇文章更直观', en: 'Turn the knobs; it beats ten articles' }}
            desc={{
              zh: '上下文怎么被吃掉？Workflow 还是 Agent？成本为什么翻倍？用下面两个小实验先找找感觉。',
              en: 'What eats your context? Workflow or agent? Why did cost double? Start with these two experiments.',
            }}
            action={
              <Link className="link-arrow" to="/lab">
                {zh ? '进入完整实验室' : 'Enter the full lab'} <Icon name="arrow-right" size={15} />
              </Link>
            }
          />
          <div className="lab-grid home-labs">
            <Reveal><ContextBudget /></Reveal>
            <Reveal delay={1}><DecisionWizard /></Reveal>
          </div>
          <div className="lab-more">
            <span>{zh ? '实验室里还有：' : 'Also in the lab:'}</span>
            <Link to="/lab">{zh ? 'Agent 成本估算器' : 'Agent cost estimator'}</Link>
            <Link to="/lab">{zh ? '工具说明书体检' : 'Tool spec checkup'}</Link>
          </div>
        </div>
      </section>

      <section className="gate-band" id="checklist">
        <div className="container gate-grid">
          <div className="gate-copy">
            <span className="eyebrow coral">{zh ? '06 · 上线自检' : '06 · LAUNCH GATE'}</span>
            <h2 className="section-title">
              {zh ? '上线前，先过这 12 关' : 'Pass these 12 gates before launch'}
            </h2>
            <p>
              {zh
                ? '这不是形式主义。每一关背后，都对应一个会在深夜爆炸的问题。建议直接贴进发布模板。'
                : 'This is not ceremony. Each gate maps to a problem that explodes at night. Put it in your release template.'}
            </p>
            <div className="gate-stats">
              <div><strong>12</strong><span>{zh ? '道上关卡' : 'gates'}</span></div>
              <div><strong>0</strong><span>{zh ? '个可以跳过' : 'skippable'}</span></div>
            </div>
            <p className="gate-foot">
              <Icon name="shield" size={15} />
              {zh ? '过不了，就别急着把权限交出去。' : 'If you cannot pass, do not hand over permissions yet.'}
            </p>
          </div>
          <div className="gate-checklist">
            <Checklist
              items={launchGates}
              title={{ zh: '发布前自检', en: 'Pre-launch check' }}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="07"
            kicker={{ zh: '踩坑博物馆', en: 'Museum of mistakes' }}
            title={{ zh: 'Demo 很惊艳，上线就翻车', en: 'The demo was stunning. Then it shipped.' }}
            desc={{
              zh: '下面六个坑，几乎每个做 Agent 的团队都会踩。提前知道，能少熬几个夜。',
              en: 'Almost every agent team hits these six. Knowing them early saves a few nights.',
            }}
          />
          <div className="pitfall-grid">
            {pitfalls.map((pitfall, index) => (
              <Reveal key={pitfall.title.en} delay={(index % 3) as 0 | 1 | 2} className="pitfall-card">
                <span className="pitfall-icon"><Icon name={pitfall.icon} size={20} /></span>
                <h3>{zh ? pitfall.title.zh : pitfall.title.en}</h3>
                <p className="pitfall-problem">{zh ? pitfall.problem.zh : pitfall.problem.en}</p>
                <p className="pitfall-fix"><span>{zh ? '处方' : 'FIX'}</span>{zh ? pitfall.fix.zh : pitfall.fix.en}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="resources">
        <div className="container">
          <SectionHead
            index="08"
            kicker={{ zh: '延伸阅读', en: 'Further reading' }}
            title={{ zh: '别只读我，去读源头', en: 'Do not just read me. Read the source.' }}
            desc={{
              zh: '这份手册是导航，不是终点。下面这些官方指南和工程实践，值得反复读。',
              en: 'This handbook is a map, not the destination. These official guides and field notes are worth rereading.',
            }}
          />
          <div className="resource-grid">
            {resources.map((resource, index) => (
              <Reveal key={resource.href} delay={(index % 3) as 0 | 1 | 2}>
                <a className={`resource-card tone-${resource.tone}`} href={resource.href} target="_blank" rel="noreferrer">
                  <div className="resource-top">
                    <span className="tag">{zh ? resource.tag.zh : resource.tag.en}</span>
                    <Icon name="arrow-up-right" size={17} />
                  </div>
                  <h3>{zh ? resource.title.zh : resource.title.en}</h3>
                  <p>{zh ? resource.desc.zh : resource.desc.en}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="author">
        <div className="container author-home-grid">
          <div className="author-home-art">
            <img src={logoUrl} alt="鱼心快跑：戴着耳机奔跑的青色小鱼，两侧是代码尖括号" width={546} height={363} loading="lazy" />
            <span>YUXIN RUNS</span>
          </div>
          <div className="author-home-copy">
            <span className="eyebrow">{zh ? '关于作者' : 'ABOUT THE AUTHOR'}</span>
            <h2 className="section-title">{zh ? '写这份手册的人' : 'The person behind the handbook'}</h2>
            <p className="lead">{zh ? authorStory[0].zh : authorStory[0].en}</p>
            <p className="lead">{zh ? authorStory[2].zh : authorStory[2].en}</p>
            <div className="author-home-stats">
              <div><strong>10</strong><span>{zh ? '章实战' : 'chapters'}</span></div>
              <div><strong>32</strong><span>{zh ? '个术语' : 'terms'}</span></div>
              <div><strong>6</strong><span>{zh ? '套模板' : 'templates'}</span></div>
              <div><strong>4</strong><span>{zh ? '个实验' : 'labs'}</span></div>
            </div>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/about">
                {zh ? '认识鱼心' : 'Meet Yuxin'} <Icon name="arrow-right" size={16} />
              </Link>
              <a className="btn btn-ghost" href={`mailto:${site.email}`}>
                {zh ? '写信给我' : 'Say hello'} <Icon name="arrow-up-right" size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="toolkit">
        <div className="container">
          <SectionHead
            index="09"
            kicker={{ zh: '工具箱', en: 'Toolkit' }}
            title={{ zh: '别从空白页开始', en: 'Do not start from a blank page' }}
            desc={{
              zh: '系统提示、工具定义、评测用例、trace 字段、人工审批、上线清单——六套模板，改改就能用。',
              en: 'System prompts, tool specs, eval cases, trace fields, approvals, launch checklist — six templates, ready to adapt.',
            }}
            action={
              <Link className="link-arrow" to="/toolkit">
                {zh ? '打开工具箱' : 'Open the toolkit'} <Icon name="arrow-right" size={15} />
              </Link>
            }
          />
          <div className="template-mini-grid">
            {templates.map((template) => (
              <Link className="template-mini" to="/toolkit" key={template.id}>
                <span>{zh ? template.tag.zh : template.tag.en}</span>
                <strong>{zh ? template.title.zh : template.title.en}</strong>
                <small>{zh ? template.desc.zh : template.desc.en}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="updates">
        <div className="container">
          <SectionHead
            index="10"
            kicker={{ zh: '更新日志', en: 'Changelog' }}
            title={{ zh: '这本手册还在长', en: 'The handbook is still growing' }}
            desc={{
              zh: '每一版都来自读者的提问和项目里的新坑。不追求篇幅，只补真正会用到的东西。',
              en: 'Each release comes from reader questions and new field failures. No padding — only what gets used.',
            }}
            action={
              <Link className="link-arrow" to="/faq">
                {zh ? '看看常见问题' : 'Read the FAQ'} <Icon name="arrow-right" size={15} />
              </Link>
            }
          />
          <div className="update-list">
            {updates.map((update) => (
              <Reveal key={update.version} as="article" className="update-row">
                <div className="update-meta">
                  <span className="update-version">{update.version}</span>
                  <span className="update-date">{update.date}</span>
                </div>
                <div>
                  <h3>{zh ? update.title.zh : update.title.en}</h3>
                  <ul>
                    {update.items.map((item) => (
                      <li key={item.en}>{zh ? item.zh : item.en}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="faq">
        <div className="container">
          <SectionHead
            index="11"
            kicker={{ zh: '常见问题', en: 'FAQ' }}
            title={{ zh: '你可能正卡在这几个地方', en: 'You are probably stuck here' }}
            desc={{
              zh: '转型、框架、上下文、成本、多 Agent。答案不一定适合所有人，但能帮你排除几个错误方向。',
              en: 'Transitions, frameworks, context, cost, multi-agent. Not one-size-fits-all, but it rules out wrong turns.',
            }}
            action={
              <Link className="link-arrow" to="/faq">
                {zh ? '全部问题' : 'All questions'} <Icon name="arrow-right" size={15} />
              </Link>
            }
          />
          <div className="home-faq-list">
            {faqs.slice(0, 6).map((item) => (
              <details className="home-faq-item" key={item.q.en}>
                <summary>
                  <span>{zh ? item.q.zh : item.q.en}</span>
                  <Icon name="chevron-down" size={17} />
                </summary>
                <p>{zh ? item.a.zh : item.a.en}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="container cta-inner">
          <LogoMark size={58} />
          <h2>{zh ? '准备好造第一个 Agent 了吗？' : 'Ready to build your first agent?'}</h2>
          <p>
            {zh
              ? '从 50 行代码开始。先跑通，再跑快。'
              : 'Start with fifty lines. Make it work, then make it fast.'}
          </p>
          <div className="cta-actions">
            <Link className="btn btn-accent" to="/chapters/mental-model">
              {zh ? '开始第 1 章' : 'Start chapter 1'} <Icon name="arrow-right" size={16} />
            </Link>
            <Link className="btn btn-ghost" to="/lab">
              <Icon name="sliders" size={15} />
              {zh ? '去实验室' : 'Go to the lab'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
