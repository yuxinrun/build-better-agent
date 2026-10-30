import { useMemo, useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { Icon } from '../Icon'

const BUDGET = 24_000
const SYSTEM = 1_200
const PER_TOOL = 500
const PER_TURN = 450
const PER_DOC = 900

export function ContextBudget() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [tools, setTools] = useState(6)
  const [turns, setTurns] = useState(10)
  const [docs, setDocs] = useState(8)

  const parts = useMemo(() => {
    const toolTokens = tools * PER_TOOL
    const historyTokens = turns * PER_TURN
    const docTokens = docs * PER_DOC
    const used = SYSTEM + toolTokens + historyTokens + docTokens
    return {
      system: SYSTEM,
      tools: toolTokens,
      history: historyTokens,
      docs: docTokens,
      used,
      free: Math.max(0, BUDGET - used),
      ratio: used / BUDGET,
    }
  }, [tools, turns, docs])

  const risk = parts.ratio > 0.85 ? 'danger' : parts.ratio > 0.65 ? 'warn' : 'ok'
  const riskText = {
    ok: zh ? '健康：还有余量给输出和意外' : 'Healthy: room left for output and surprises',
    warn: zh ? '偏紧：关键约束开始被稀释' : 'Tight: key constraints start getting diluted',
    danger: zh ? '危险：上下文被挤爆，模型会漏看指令' : 'Danger: context is saturated; instructions get missed',
  }[risk]

  const optimize = () => {
    setTools(5)
    setTurns(6)
    setDocs(3)
  }

  const fmt = (n: number) => `${(n / 1000).toFixed(1)}k`

  return (
    <div className="lab-card budget-lab">
      <div className="lab-card-head">
        <div>
          <span className="eyebrow">{zh ? '交互实验 01' : 'LAB 01'}</span>
          <h3>{zh ? '上下文预算模拟器' : 'Context budget simulator'}</h3>
          <p>{zh ? '拖动滑块，看看你的窗口是怎么被吃掉的。' : 'Drag the sliders to see what eats your window.'}</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={optimize}>
          <Icon name="refresh" size={14} />
          {zh ? '一键瘦身' : 'Auto-trim'}
        </button>
      </div>

      <div className="budget-total">
        <div>
          <strong>{fmt(parts.used)}</strong>
          <span>/ {fmt(BUDGET)} tokens</span>
        </div>
        <span className={`budget-pill ${risk}`}>{Math.round(parts.ratio * 100)}%</span>
      </div>

      <div className="budget-bar" aria-hidden="true">
        <span className="b-system" style={{ width: `${(parts.system / BUDGET) * 100}%` }} />
        <span className="b-tools" style={{ width: `${(parts.tools / BUDGET) * 100}%` }} />
        <span className="b-history" style={{ width: `${(parts.history / BUDGET) * 100}%` }} />
        <span className="b-docs" style={{ width: `${(parts.docs / BUDGET) * 100}%` }} />
        <span className="b-free" style={{ width: `${(parts.free / BUDGET) * 100}%` }} />
      </div>

      <div className="budget-legend">
        <span><i className="b-system" />{zh ? '系统指令' : 'System'} {fmt(parts.system)}</span>
        <span><i className="b-tools" />{zh ? '工具' : 'Tools'} {fmt(parts.tools)}</span>
        <span><i className="b-history" />{zh ? '历史' : 'History'} {fmt(parts.history)}</span>
        <span><i className="b-docs" />{zh ? '检索' : 'Docs'} {fmt(parts.docs)}</span>
        <span><i className="b-free" />{zh ? '余量' : 'Free'} {fmt(parts.free)}</span>
      </div>

      <div className="lab-sliders">
        <label>
          <span>{zh ? '工具数量' : 'Tools'} <b>{tools}</b></span>
          <input type="range" min={1} max={12} value={tools} onChange={(e) => setTools(Number(e.target.value))} />
        </label>
        <label>
          <span>{zh ? '对话轮数' : 'History turns'} <b>{turns}</b></span>
          <input type="range" min={2} max={24} value={turns} onChange={(e) => setTurns(Number(e.target.value))} />
        </label>
        <label>
          <span>{zh ? '检索片段' : 'Retrieved chunks'} <b>{docs}</b></span>
          <input type="range" min={1} max={16} value={docs} onChange={(e) => setDocs(Number(e.target.value))} />
        </label>
      </div>

      <div className={`lab-verdict ${risk}`}>
        <Icon name={risk === 'ok' ? 'check' : 'alert'} size={17} />
        <p>{riskText}</p>
      </div>
      <p className="lab-note">
        {zh
          ? '示意模型：每个工具约 0.5k、每轮历史约 450、每个片段约 900 token。真实数值请用你的 tokenizer 测量。'
          : 'Illustrative: ~0.5k per tool, ~450 per turn, ~900 per chunk. Measure real values with your tokenizer.'}
      </p>
    </div>
  )
}
