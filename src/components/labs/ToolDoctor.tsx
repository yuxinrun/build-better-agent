import { useState, type CSSProperties } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { Icon } from '../Icon'

const checks = [
  {
    zh: '名字是“动词 + 对象”，不用内部黑话',
    en: 'Name is verb + object, no internal jargon',
    fixZh: '改名为 get_order_status、refund_payment 这类一眼懂的名字。',
    fixEn: 'Rename to something obvious like get_order_status or refund_payment.',
  },
  {
    zh: '描述写清何时用、何时别用',
    en: 'Description covers when to use and when not to',
    fixZh: '在描述里加一句“不要用它查询退款进度”。',
    fixEn: 'Add one line: “Do not use this to check refund progress.”',
  },
  {
    zh: '参数 ≤3 个，自由文本尽量换成枚举',
    en: '≤3 params; free text replaced by enums',
    fixZh: '把 status: string 改成 enum，把多个查询合并成一个明确意图。',
    fixEn: 'Turn status: string into an enum; merge multiple queries into one clear intent.',
  },
  {
    zh: '返回摘要，不返回整库或 HTML',
    en: 'Returns a summary, not a whole DB or HTML',
    fixZh: '只返回关键字段和引用 ID，把原文截断到 1–2k 字符。',
    fixEn: 'Return key fields and a reference ID; truncate raw text to 1–2k chars.',
  },
  {
    zh: '错误包含可行动提示与 retryable',
    en: 'Errors include hints and retryable',
    fixZh: '统一返回 {ok:false, code, hint, retryable}，不要抛原始异常。',
    fixEn: 'Return {ok:false, code, hint, retryable}; never raw exceptions.',
  },
  {
    zh: '写操作有幂等键',
    en: 'Writes have an idempotency key',
    fixZh: '让调用方传 request_id，重复请求返回同一结果。',
    fixEn: 'Accept a request_id; repeated calls return the same result.',
  },
  {
    zh: '危险操作需要人工确认',
    en: 'Dangerous actions need confirmation',
    fixZh: '退款、删除、发布类工具加一道 approval 节点。',
    fixEn: 'Add an approval node for refunds, deletions, and publishing.',
  },
  {
    zh: '工具总数 ≤7，职责不重叠',
    en: '≤7 tools with no overlapping duties',
    fixZh: '合并相似工具，或按任务分组，用路由选择工具集。',
    fixEn: 'Merge similar tools or group them by task with a router.',
  },
]

export function ToolDoctor() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const score = checked.size
  const grade =
    score === 8
      ? { zh: '工具优等生', en: 'Tool honor roll', tone: 'ok' }
      : score >= 6
        ? { zh: '能用，但会偶发选错', en: 'Usable, occasionally mis-picked', tone: 'warn' }
        : score >= 3
          ? { zh: '高危：模型在猜你的意图', en: 'High risk: the model is guessing', tone: 'danger' }
          : { zh: '建议重做工具层', en: 'Rebuild the tool layer', tone: 'danger' }
  const firstMissing = checks.findIndex((_, index) => !checked.has(index))

  return (
    <div className="lab-card tool-lab">
      <div className="lab-card-head">
        <div>
          <span className="eyebrow">{zh ? '交互实验 04' : 'LAB 04'}</span>
          <h3>{zh ? '工具说明书体检' : 'Tool spec checkup'}</h3>
          <p>{zh ? '勾选你已满足的项，看看模型会不会选错工具。' : 'Check what you satisfy and see if the model will mis-pick.'}</p>
        </div>
        <div className={`score-ring ${grade.tone}`} style={{ '--score': `${(score / 8) * 100}%` } as CSSProperties}>
          <span>{score}/8</span>
        </div>
      </div>

      <div className="tool-checks">
        {checks.map((check, index) => (
          <label key={check.en} className={checked.has(index) ? 'is-checked' : ''}>
            <input type="checkbox" checked={checked.has(index)} onChange={() => toggle(index)} />
            <span className="check-box">
              <Icon name="check" size={12} strokeWidth={2.6} />
            </span>
            <span>{zh ? check.zh : check.en}</span>
          </label>
        ))}
      </div>

      <div className={`lab-verdict ${grade.tone}`}>
        <Icon name={grade.tone === 'ok' ? 'check' : 'alert'} size={17} />
        <p>
          <strong>{zh ? grade.zh : grade.en}</strong>
          {firstMissing >= 0 && (
            <span className="verdict-fix">
              {zh ? '下一步：' : 'Next: '}
              {zh ? checks[firstMissing].fixZh : checks[firstMissing].fixEn}
            </span>
          )}
        </p>
      </div>
      <p className="lab-note">
        {zh ? '这不是标准答案，而是一份能显著降低误调用的检查表。' : 'Not a standard, just a checklist that sharply reduces mis-calls.'}
      </p>
    </div>
  )
}
