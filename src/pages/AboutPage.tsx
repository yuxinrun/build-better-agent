import { Link } from 'react-router-dom'
import logoUrl from '../assets/yuxin-run.png'
import { Icon } from '../components/Icon'
import { SectionHead } from '../components/SectionHead'
import { authorFacts, authorStory, site } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { useLang } from '../i18n/LanguageContext'

const principles = [
  {
    icon: 'loop' as const,
    title: { zh: '先跑通，再跑快', en: 'Make it work, then fast' },
    desc: {
      zh: '能用五十行跑起来的循环，比纸面上的完美架构更接近答案。速度来自反馈，不来自设计。',
      en: 'A fifty-line loop that runs beats a perfect architecture on paper. Speed comes from feedback, not design.',
    },
  },
  {
    icon: 'chart' as const,
    title: { zh: '评测先于优化', en: 'Evals before optimization' },
    desc: {
      zh: '先定义“好”，再谈“更好”。没有基线的改动，只是把随机性换了个方向。',
      en: 'Define good, then better. A change without a baseline just redirects randomness.',
    },
  },
  {
    icon: 'shield' as const,
    title: { zh: '边界先于权限', en: 'Boundaries before permissions' },
    desc: {
      zh: '先写清 Agent 不做什么，再给它工具。不可逆的动作，永远留一个人工闸门。',
      en: 'Write down what the agent will not do, then hand it tools. Irreversible actions always keep a human gate.',
    },
  },
  {
    icon: 'book' as const,
    title: { zh: '写下来才算数', en: 'If it is not written, it did not happen' },
    desc: {
      zh: '踩过的坑要变成清单、模板和用例。否则同一个 bug 会在下一个人身上重播。',
      en: 'Scars must become checklists, templates, and cases — or the same bug replays on the next engineer.',
    },
  },
]

export function AboutPage() {
  const { lang } = useLang()
  const zh = lang === 'zh'

  usePageMeta(
    { zh: '关于鱼心', en: 'About Yuxin' },
    {
      zh: '鱼心，AI Agent 工程师。「鱼心快跑」是个人品牌：先把系统跑通，再让它跑快。这里记录他的方法、模板与踩坑。',
      en: 'Yuxin is an agent engineer. Yuxin Runs is the brand: make it work, then make it fast. Methods, templates, and scars.',
    },
  )

  return (
    <>
      <section className="page-hero about-hero">
        <div className="container page-hero-inner">
          <div>
            <span className="eyebrow">{zh ? '关于 / ABOUT' : 'ABOUT'}</span>
            <h1 className="display">{zh ? '鱼心快跑，Bug 追不到。' : 'Run, Yuxin, run. Bugs cannot catch you.'}</h1>
            <p className="lead">
              {zh
                ? '我是鱼心，一名和 Agent 一起写代码的程序员。这本手册是我的工作笔记：把踩过的坑整理成可以被别人接着用的方法。'
                : 'I am Yuxin, an engineer who writes code alongside agents. This handbook is my field notebook: scars turned into methods others can keep using.'}
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/chapters/mental-model">
                {zh ? '开始阅读手册' : 'Start reading'} <Icon name="arrow-right" size={16} />
              </Link>
              <a className="btn btn-ghost" href={`mailto:${site.email}`}>
                {zh ? '写信给我' : 'Say hello'} <Icon name="arrow-up-right" size={15} />
              </a>
            </div>
          </div>
          <figure className="about-hero-art">
            <img src={logoUrl} alt="鱼心快跑：戴着耳机奔跑的青色小鱼，两侧是代码尖括号" width={546} height={363} />
            <figcaption>{zh ? '跑得比 Bug 快一点。' : 'A little faster than the bugs.'}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-story">
            <span className="eyebrow">{zh ? '我是谁' : 'WHO I AM'}</span>
            {authorStory.map((paragraph) => (
              <p key={paragraph.en}>{zh ? paragraph.zh : paragraph.en}</p>
            ))}
            <p className="about-sign">{zh ? '— 鱼心，写于某个不想修 Bug 的夜晚' : '— Yuxin, on a night he did not want to fix bugs'}</p>
          </div>
          <div className="about-side">
            <dl className="about-facts">
              {authorFacts.map((fact) => (
                <div key={fact.label.en}>
                  <dt>{zh ? fact.label.zh : fact.label.en}</dt>
                  <dd>{zh ? fact.value.zh : fact.value.en}</dd>
                </div>
              ))}
            </dl>
            <div className="about-links">
              <a href={site.github} target="_blank" rel="noreferrer">
                <Icon name="code" size={17} />
                <span>GitHub</span>
                <small>github.com/yuxinrun</small>
                <Icon name="arrow-up-right" size={15} />
              </a>
              <a href={`mailto:${site.email}`}>
                <Icon name="terminal" size={17} />
                <span>Email</span>
                <small>{site.email}</small>
                <Icon name="arrow-up-right" size={15} />
              </a>
              <a href={site.homepage} target="_blank" rel="noreferrer">
                <Icon name="external" size={17} />
                <span>{zh ? '个人主页' : 'Homepage'}</span>
                <small>yuxin.run</small>
                <Icon name="arrow-up-right" size={15} />
              </a>
              <a href={site.repo} target="_blank" rel="noreferrer">
                <Icon name="book" size={17} />
                <span>{zh ? '本手册源码' : 'Handbook source'}</span>
                <small>yuxinrun.github.io/better-agent</small>
                <Icon name="arrow-up-right" size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead
            index="01"
            kicker={{ zh: '工作方式', en: 'How I work' }}
            title={{ zh: '四条不太聪明，但很少翻车的原则', en: 'Four unglamorous principles that rarely break' }}
            desc={{
              zh: '它们不是方法论，更像是在多次事故之后形成的肌肉记忆。',
              en: 'Not a methodology — muscle memory formed after a few too many incidents.',
            }}
          />
          <div className="principle-grid">
            {principles.map((principle, index) => (
              <article className={`principle-card tone-${index % 4}`} key={principle.title.en}>
                <span className="principle-icon">
                  <Icon name={principle.icon} size={20} />
                </span>
                <h3>{zh ? principle.title.zh : principle.title.en}</h3>
                <p>{zh ? principle.desc.zh : principle.desc.en}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-cta">
          <div>
            <span className="eyebrow">{zh ? '一起跑' : 'RUN TOGETHER'}</span>
            <h2 className="section-title">{zh ? '有想法？一起把它跑起来。' : 'Have an idea? Let us get it running.'}</h2>
            <p className="lead">
              {zh
                ? '无论是 Agent 产品、工程效率工具，还是只想聊聊怎么少写点 Bug，都欢迎来信。我通常一两天内回复。'
                : 'Agent products, developer tooling, or just fewer bugs — you are welcome to write. I usually reply within a day or two.'}
            </p>
          </div>
          <div className="about-cta-actions">
            <a className="btn btn-accent" href={`mailto:${site.email}`}>
              {site.email} <Icon name="arrow-up-right" size={15} />
            </a>
            <Link className="btn btn-ghost" to="/chapters">
              {zh ? '先看看章节' : 'Browse chapters'} <Icon name="arrow-right" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
