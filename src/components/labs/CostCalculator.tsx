import { useMemo, useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { Icon } from '../Icon'

type Preset = { id: string; zh: string; en: string; priceIn: number; priceOut: number }

const presets: Preset[] = [
  { id: 'small', zh: '小模型', en: 'Small', priceIn: 0.15, priceOut: 0.6 },
  { id: 'mid', zh: '中模型', en: 'Mid', priceIn: 0.4, priceOut: 1.6 },
  { id: 'flagship', zh: '旗舰模型', en: 'Flagship', priceIn: 3, priceOut: 15 },
]

export function CostCalculator() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [runs, setRuns] = useState(5000)
  const [steps, setSteps] = useState(4)
  const [inputTokens, setInputTokens] = useState(6000)
  const [outputTokens, setOutputTokens] = useState(500)
  const [priceIn, setPriceIn] = useState(0.4)
  const [priceOut, setPriceOut] = useState(1.6)
  const [retry, setRetry] = useState(15)
  const [preset, setPreset] = useState('mid')

  const numbers = useMemo(() => {
    const stepMultiplier = steps * (1 + retry / 100)
    const dailyIn = runs * stepMultiplier * inputTokens
    const dailyOut = runs * stepMultiplier * outputTokens
    const inputCost = (dailyIn / 1_000_000) * priceIn
    const outputCost = (dailyOut / 1_000_000) * priceOut
    const daily = inputCost + outputCost
    return {
      daily,
      monthly: daily * 30,
      perRun: daily / runs,
      perStep: daily / (runs * stepMultiplier),
      inputCost,
      outputCost,
      tokens: dailyIn + dailyOut,
    }
  }, [runs, steps, inputTokens, outputTokens, priceIn, priceOut, retry])

  const money = (n: number) =>
    n >= 1000
      ? `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      : `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`

  const totalCost = numbers.inputCost + numbers.outputCost || 1
  const applyPreset = (p: Preset) => {
    setPreset(p.id)
    setPriceIn(p.priceIn)
    setPriceOut(p.priceOut)
  }

  return (
    <div className="lab-card cost-lab">
      <div className="lab-card-head">
        <div>
          <span className="eyebrow">{zh ? '交互实验 02' : 'LAB 02'}</span>
          <h3>{zh ? 'Agent 成本估算器' : 'Agent cost estimator'}</h3>
          <p>{zh ? '步数会放大一切。改一个数，看月账单怎么跳。' : 'Steps multiply everything. Change one number and watch the bill.'}</p>
        </div>
      </div>

      <div className="preset-row">
        {presets.map((p) => (
          <button key={p.id} className={preset === p.id ? 'is-active' : ''} onClick={() => applyPreset(p)}>
            {zh ? p.zh : p.en}
          </button>
        ))}
        <span className="preset-prices">${priceIn} / ${priceOut} {zh ? '每百万 token' : 'per 1M tokens'}</span>
      </div>

      <div className="cost-highlight">
        <div>
          <span>{zh ? '每月预估' : 'Monthly estimate'}</span>
          <strong>{money(numbers.monthly)}</strong>
        </div>
        <div className="cost-mini">
          <span>{zh ? '每天' : 'Daily'} <b>{money(numbers.daily)}</b></span>
          <span>{zh ? '每次运行' : 'Per run'} <b>${numbers.perRun.toFixed(3)}</b></span>
          <span>{zh ? '每月 token' : 'Tokens / mo'} <b>{(numbers.tokens * 30 / 1_000_000).toFixed(0)}M</b></span>
        </div>
      </div>

      <div className="cost-split" aria-hidden="true">
        <span className="c-in" style={{ width: `${(numbers.inputCost / totalCost) * 100}%` }} />
        <span className="c-out" style={{ width: `${(numbers.outputCost / totalCost) * 100}%` }} />
      </div>
      <div className="budget-legend">
        <span><i className="c-in" />{zh ? '输入' : 'Input'} {Math.round((numbers.inputCost / totalCost) * 100)}%</span>
        <span><i className="c-out" />{zh ? '输出' : 'Output'} {Math.round((numbers.outputCost / totalCost) * 100)}%</span>
      </div>

      <div className="lab-sliders two-col">
        <label>
          <span>{zh ? '每天运行次数' : 'Runs / day'} <b>{runs.toLocaleString()}</b></span>
          <input type="range" min={100} max={20000} step={100} value={runs} onChange={(e) => setRuns(Number(e.target.value))} />
        </label>
        <label>
          <span>{zh ? '平均步数' : 'Steps / run'} <b>{steps}</b></span>
          <input type="range" min={1} max={15} value={steps} onChange={(e) => setSteps(Number(e.target.value))} />
        </label>
        <label>
          <span>{zh ? '每步输入 tokens' : 'Input tokens / step'} <b>{inputTokens.toLocaleString()}</b></span>
          <input type="range" min={1000} max={30000} step={500} value={inputTokens} onChange={(e) => setInputTokens(Number(e.target.value))} />
        </label>
        <label>
          <span>{zh ? '每步输出 tokens' : 'Output tokens / step'} <b>{outputTokens.toLocaleString()}</b></span>
          <input type="range" min={100} max={4000} step={100} value={outputTokens} onChange={(e) => setOutputTokens(Number(e.target.value))} />
        </label>
        <label>
          <span>{zh ? '重试率' : 'Retry rate'} <b>{retry}%</b></span>
          <input type="range" min={0} max={50} step={1} value={retry} onChange={(e) => setRetry(Number(e.target.value))} />
        </label>
        <div className="price-inputs">
          <label>
            <span>{zh ? '输入单价 / 1M' : 'Price in / 1M'}</span>
            <input type="number" min={0} step={0.05} value={priceIn} onChange={(e) => { setPriceIn(Number(e.target.value)); setPreset('custom') }} />
          </label>
          <label>
            <span>{zh ? '输出单价 / 1M' : 'Price out / 1M'}</span>
            <input type="number" min={0} step={0.05} value={priceOut} onChange={(e) => { setPriceOut(Number(e.target.value)); setPreset('custom') }} />
          </label>
        </div>
      </div>

      <div className="lab-verdict note">
        <Icon name="bulb" size={17} />
        <p>
          {zh
            ? `每次运行约 ${money(numbers.perRun)}。把步数从 ${steps} 降到 ${Math.max(1, steps - 1)}，每月大约省 ${money(numbers.monthly * (1 / steps))}。`
            : `About ${money(numbers.perRun)} per run. Cutting one step saves roughly ${money(numbers.monthly * (1 / steps))} per month.`}
        </p>
      </div>
      <p className="lab-note">
        {zh ? '单价为示例值，请以模型官网为准。未计入工具费、检索费和基础设施成本。' : 'Prices are illustrative. Check official pricing. Tool, retrieval, and infra costs are excluded.'}
      </p>
    </div>
  )
}
