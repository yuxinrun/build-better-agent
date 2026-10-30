import { Link } from 'react-router-dom'
import { site } from '../content/site'
import { useLang } from '../i18n/LanguageContext'
import { Icon } from './Icon'
import { LogoMark } from './Logo'

export function Footer() {
  const { lang } = useLang()
  const zh = lang === 'zh'

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="鱼心快跑">
            <LogoMark size={44} />
            <span>
              <strong>鱼心快跑</strong>
              <small>YUXIN RUNS</small>
            </span>
          </Link>
          <p>
            {zh
              ? '写给程序员的 Agent 实战手册。少一点魔法，多一点 trace、eval 和护栏。'
              : 'A practical agent handbook for engineers. Less magic; more traces, evals, and guardrails.'}
          </p>
          <p className="footer-motto-inline">
            {zh ? '先跑通，再跑快。' : 'Make it work. Then make it fast.'}
          </p>
          <div className="footer-contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub <Icon name="arrow-up-right" size={13} />
            </a>
            <a href={site.homepage} target="_blank" rel="noreferrer">
              yuxin.run <Icon name="arrow-up-right" size={13} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>{zh ? '手册' : 'Handbook'}</h3>
          <Link to="/chapters">{zh ? '全部章节' : 'All chapters'}</Link>
          <Link to="/chapters/mental-model">{zh ? '第 1 章 · 心智模型' : 'Ch.1 · Mental model'}</Link>
          <Link to="/chapters/evaluation">{zh ? '第 7 章 · 评估' : 'Ch.7 · Evaluation'}</Link>
          <Link to="/lab">{zh ? '实战实验室' : 'The lab'}</Link>
        </div>

        <div className="footer-col">
          <h3>{zh ? '工具与参考' : 'Tools and reference'}</h3>
          <Link to="/toolkit">{zh ? '模板工具箱' : 'Template toolkit'}</Link>
          <Link to="/glossary">{zh ? 'Agent 术语表' : 'Agent glossary'}</Link>
          <Link to="/faq">{zh ? '常见问题' : 'FAQ'}</Link>
          <Link to="/about">{zh ? '关于鱼心' : 'About Yuxin'}</Link>
        </div>

        <div className="footer-col">
          <h3>{zh ? '延伸阅读' : 'Further reading'}</h3>
          <a href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank" rel="noreferrer">
            Anthropic · Effective agents
          </a>
          <a href="https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/" target="_blank" rel="noreferrer">
            OpenAI · Practical guide
          </a>
          <a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer">
            LangGraph docs
          </a>
          <a href="https://bojieli.github.io/ai-agent-book/astro/" target="_blank" rel="noreferrer">
            {zh ? '深入理解 AI Agent' : 'AI Agents in Depth'}
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 鱼心快跑 · Yuxin Runs</span>
        <span className="footer-motto">
          {zh ? '鱼心快跑，Bug 追不到。' : 'Run, Yuxin, run. Bugs cannot catch you.'}
        </span>
      </div>
    </footer>
  )
}
