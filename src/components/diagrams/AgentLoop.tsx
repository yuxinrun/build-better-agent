import { useEffect, useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { Icon } from '../Icon'

const stepCopy = [
  {
    zh: { title: '组装上下文', desc: '把目标、历史、工具说明和记忆放进工作台。模型只能看到这里的东西。' },
    en: { title: 'Assemble context', desc: 'Put the goal, history, tool docs, and memory on the workbench. The model sees only this.' },
  },
  {
    zh: { title: '模型决策', desc: '模型判断：直接回答，还是调用工具？如果调用，选哪个、传什么参数？' },
    en: { title: 'Model decides', desc: 'Answer now, or call a tool? If a tool, which one and with what arguments?' },
  },
  {
    zh: { title: '执行工具', desc: '代码校验参数、检查权限、调用外部系统。真正改变世界的一步在这里。' },
    en: { title: 'Run the tool', desc: 'Code validates arguments, checks permissions, calls the outside system. This is where the world changes.' },
  },
  {
    zh: { title: '观察并循环', desc: '工具结果回到上下文，模型基于真实结果继续决策，直到触发停止条件。' },
    en: { title: 'Observe and loop', desc: 'Results return to context. The model decides again from real results until a stop condition fires.' },
  },
]

export function AgentLoop() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setStep((s) => (s + 1) % 4), 2800)
    return () => window.clearInterval(timer)
  }, [playing])

  const active = (index: number) => (step === index ? 'is-active' : '')

  return (
    <div className="loop-widget">
      <div className="loop-stage">
        <div className="loop-badge">
          <span className="dot" />
          {zh ? 'AGENT LOOP · 实时' : 'AGENT LOOP · LIVE'}
        </div>
        <svg viewBox="0 0 520 440" role="img" aria-label={zh ? 'Agent 循环示意图' : 'Agent loop diagram'}>
          <defs>
            <marker id="loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--line-strong)" />
            </marker>
            <marker id="loop-arrow-hot" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
            </marker>
            <radialGradient id="core-glow">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="260" cy="216" r="150" className="loop-orbit" />
          <circle cx="260" cy="216" r="104" className="loop-orbit dashed" />
          <circle cx="260" cy="216" r="88" fill="url(#core-glow)" />

          <path className={`loop-path ${active(0)}`} d="M 190 128 C 215 145 228 165 240 184" markerEnd="url(#loop-arrow)" />
          <path className={`loop-path ${active(1)}`} d="M 282 184 C 296 165 310 145 334 128" markerEnd="url(#loop-arrow)" />
          <path className={`loop-path ${active(2)}`} d="M 386 148 C 392 232 350 292 310 330" markerEnd="url(#loop-arrow)" />
          <path className={`loop-path ${active(3)}`} d="M 208 338 C 150 312 116 254 124 160" markerEnd="url(#loop-arrow)" strokeDasharray="5 7" />

          <g className={`loop-node ${active(0)}`}>
            <rect x="28" y="56" width="162" height="76" rx="15" className="node-bg" />
            <text x="48" y="86" className="node-kicker">CONTEXT</text>
            <text x="48" y="111" className="node-title">{zh ? '上下文' : 'Context'}</text>
            <text x="48" y="125" className="node-sub">{zh ? '任务 · 历史 · 资料' : 'task · history · docs'}</text>
          </g>

          <g className={`loop-node ${active(2)}`}>
            <rect x="330" y="56" width="162" height="76" rx="15" className="node-bg" />
            <text x="350" y="86" className="node-kicker">TOOLS</text>
            <text x="350" y="111" className="node-title">{zh ? '工具' : 'Tools'}</text>
            <text x="350" y="125" className="node-sub">{zh ? '搜索 · 代码 · API' : 'search · code · API'}</text>
          </g>

          <g className={`loop-node ${active(1)}`}>
            <circle cx="260" cy="216" r="58" className="node-core" />
            <text x="260" y="211" textAnchor="middle" className="core-title">LLM</text>
            <text x="260" y="232" textAnchor="middle" className="core-sub">{zh ? '决策核心' : 'decision core'}</text>
          </g>

          <g className={`loop-node ${active(3)}`}>
            <rect x="181" y="342" width="158" height="68" rx="15" className="node-bg" />
            <text x="198" y="369" className="node-kicker">WORLD</text>
            <text x="198" y="392" className="node-title">{zh ? '环境' : 'World'}</text>
            <text x="198" y="404" className="node-sub">{zh ? '文件 · 浏览器 · 人' : 'files · browser · people'}</text>
          </g>

          <text x="155" y="176" className="edge-label">{zh ? '读取' : 'read'}</text>
          <text x="330" y="176" className="edge-label">{zh ? '行动' : 'act'}</text>
          <text x="392" y="250" className="edge-label">{zh ? '影响' : 'change'}</text>
          <text x="104" y="272" className="edge-label">{zh ? '观察' : 'observe'}</text>
        </svg>

        <div className="loop-controls">
          <button
            className="icon-btn"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? (zh ? '暂停动画' : 'Pause animation') : zh ? '播放动画' : 'Play animation'}
          >
            <Icon name={playing ? 'pause' : 'play'} size={16} />
          </button>
          <div className="loop-steps" role="tablist" aria-label={zh ? '循环步骤' : 'Loop steps'}>
            {stepCopy.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={step === index}
                className={step === index ? 'is-active' : ''}
                onClick={() => {
                  setStep(index)
                  setPlaying(false)
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <span className="loop-counter">0{step + 1} / 04</span>
        </div>
      </div>

      <div className="loop-caption" aria-live="polite">
        <span className="loop-caption-index">0{step + 1}</span>
        <div>
          <strong>{zh ? stepCopy[step].zh.title : stepCopy[step].en.title}</strong>
          <p>{zh ? stepCopy[step].zh.desc : stepCopy[step].en.desc}</p>
        </div>
      </div>
    </div>
  )
}
