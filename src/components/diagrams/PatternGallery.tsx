import { useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import type { Pair } from '../../content/types'

type Pattern = {
  id: string
  name: Pair
  tagline: Pair
  example: Pair
  avoid: Pair
  tip: Pair
}

const patterns: Pattern[] = [
  {
    id: 'chain',
    name: { zh: '提示链', en: 'Prompt chaining' },
    tagline: {
      zh: '把任务拆成固定顺序的几步，前一步的输出是下一步的输入。',
      en: 'Split the task into fixed sequential steps; each output feeds the next.',
    },
    example: { zh: '生成大纲 → 写初稿 → 事实核查 → 润色', en: 'Outline → draft → fact-check → polish' },
    avoid: { zh: '步骤之间需要频繁回头修改，或后一步无法评估前一步。', en: 'Steps need constant backtracking, or later steps cannot validate earlier ones.' },
    tip: { zh: '在关键节点加程序化校验，不合格就回到上一步，而不是硬着头皮往下走。', en: 'Add programmatic checks at key nodes; loop back on failure instead of pushing forward.' },
  },
  {
    id: 'routing',
    name: { zh: '路由', en: 'Routing' },
    tagline: {
      zh: '先分类，再把请求交给对应的专用流程或模型。',
      en: 'Classify first, then send the request to a specialized flow or model.',
    },
    example: { zh: '客服工单分流：退款 / 物流 / 技术 / 转人工', en: 'Ticket triage: refund / logistics / tech / human' },
    avoid: { zh: '类别边界模糊、经常混合，或分类错误代价极高。', en: 'Categories blur, mix often, or misclassification is very costly.' },
    tip: { zh: '给分类器一个“不确定”出口。强行二选一，比诚实地说不知道更危险。', en: 'Give the classifier an “unsure” exit. Forcing a choice is riskier than admitting uncertainty.' },
  },
  {
    id: 'parallel',
    name: { zh: '并行', en: 'Parallelization' },
    tagline: {
      zh: '把任务拆成相互独立的子任务并行处理，再汇总结果。',
      en: 'Run independent subtasks in parallel, then aggregate.',
    },
    example: { zh: '多份简历独立评分；同一问题多视角投票', en: 'Score resumes independently; multi-perspective voting' },
    avoid: { zh: '子任务强依赖、共享可变状态，或存在严格先后顺序。', en: 'Subtasks depend heavily, share mutable state, or require strict ordering.' },
    tip: { zh: '并行不是免费加速：token 成本同样翻倍。先确认子任务真的独立。', en: 'Parallelism is not free speed: token cost doubles too. Verify independence first.' },
  },
  {
    id: 'orchestrator',
    name: { zh: '编排者-工人', en: 'Orchestrator-workers' },
    tagline: {
      zh: '一个编排者动态拆解任务，派给多个工人，最后合并结果。',
      en: 'An orchestrator splits work dynamically, delegates to workers, and merges results.',
    },
    example: { zh: '大型代码库重构、深度调研、批量内容生产', en: 'Large refactors, deep research, batch content' },
    avoid: { zh: '子任务数量固定，直接写死流程更简单、更可控。', en: 'Subtask count is fixed; a hardcoded flow is simpler and safer.' },
    tip: { zh: '编排者只负责拆解和验收，不要让工人之间自由聊天。', en: 'The orchestrator splits and validates; workers should not free-chat with each other.' },
  },
  {
    id: 'evaluator',
    name: { zh: '评估-优化', en: 'Evaluator-optimizer' },
    tagline: {
      zh: '一个模型生成，另一个模型按标准评估，循环改进直到达标。',
      en: 'One model generates, another grades against criteria, looping until it passes.',
    },
    example: { zh: '翻译润色、代码修复、文案合规检查', en: 'Translation polish, code repair, copy compliance' },
    avoid: { zh: '没有可靠评估标准，或每轮迭代成本高到无法承受。', en: 'No reliable criteria, or each iteration costs too much.' },
    tip: { zh: '评估器最好和生成器不同，或者至少用不同的 Prompt 与视角。', en: 'Use a different evaluator, or at least a different prompt and perspective.' },
  },
]

const W = 460
const H = 190

function Box({
  x,
  y,
  w = 92,
  h = 46,
  label,
  sub,
  accent = false,
}: {
  x: number
  y: number
  w?: number
  h?: number
  label: string
  sub?: string
  accent?: boolean
}) {
  return (
    <g className={`pg-box ${accent ? 'accent' : ''}`}>
      <rect x={x} y={y} width={w} height={h} rx="9" />
      <text x={x + w / 2} y={sub ? y + h / 2 - 2 : y + h / 2 + 4} textAnchor="middle" className="pg-box-label">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" className="pg-box-sub">
          {sub}
        </text>
      )}
    </g>
  )
}

function Arrow({ d, dashed = false }: { d: string; dashed?: boolean }) {
  return <path d={d} className={`pg-arrow ${dashed ? 'dashed' : ''}`} markerEnd="url(#pg-arrowhead)" />
}

function Diagram({ id }: { id: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pattern-svg" role="img" aria-label={id}>
      <defs>
        <marker id="pg-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-2)" />
        </marker>
      </defs>

      {id === 'chain' && (
        <>
          <Box x={12} y={72} label="Input" sub="任务" />
          <Box x={128} y={72} label="LLM" sub="步骤 1" accent />
          <Box x={244} y={72} label="LLM" sub="步骤 2" accent />
          <Box x={356} y={72} label="Output" sub="结果" />
          <Arrow d="M 104 95 H 128" />
          <Arrow d="M 220 95 H 244" />
          <Arrow d="M 336 95 H 356" />
        </>
      )}

      {id === 'routing' && (
        <>
          <Box x={8} y={72} label="Input" sub="请求" />
          <path d="M 122 95 L 156 66 L 190 95 L 156 124 Z" className="pg-diamond" />
          <text x="156" y="99" textAnchor="middle" className="pg-box-sub">
            Router
          </text>
          <Box x={268} y={14} w={150} h={40} label="Refund Agent" accent />
          <Box x={268} y={75} w={150} h={40} label="Logistics Agent" accent />
          <Box x={268} y={136} w={150} h={40} label="Tech Agent" accent />
          <Arrow d="M 104 95 H 122" />
          <Arrow d="M 190 95 C 220 95 236 34 268 34" />
          <Arrow d="M 190 95 H 268" />
          <Arrow d="M 190 95 C 220 95 236 156 268 156" />
        </>
      )}

      {id === 'parallel' && (
        <>
          <Box x={8} y={72} label="Input" sub="任务" />
          <Box x={148} y={14} w={120} h={40} label="Worker A" accent />
          <Box x={148} y={75} w={120} h={40} label="Worker B" accent />
          <Box x={148} y={136} w={120} h={40} label="Worker C" accent />
          <Box x={336} y={72} w={112} label="Merge" sub="汇总" />
          <Arrow d="M 100 95 C 120 95 126 34 148 34" />
          <Arrow d="M 100 95 H 148" />
          <Arrow d="M 100 95 C 120 95 126 156 148 156" />
          <Arrow d="M 268 34 C 300 34 306 95 336 95" />
          <Arrow d="M 268 95 H 336" />
          <Arrow d="M 268 156 C 300 156 306 95 336 95" />
        </>
      )}

      {id === 'orchestrator' && (
        <>
          <Box x={8} y={72} w={106} label="Lead" sub="编排者" accent />
          <Box x={160} y={14} w={118} h={40} label="Worker A" />
          <Box x={160} y={75} w={118} h={40} label="Worker B" />
          <Box x={160} y={136} w={118} h={40} label="Worker C" />
          <Box x={338} y={72} w={112} label="Merge" sub="验收" />
          <Arrow d="M 114 95 C 134 95 140 34 160 34" />
          <Arrow d="M 114 95 H 160" />
          <Arrow d="M 114 95 C 134 95 140 156 160 156" />
          <Arrow d="M 278 34 C 308 34 312 95 338 95" />
          <Arrow d="M 278 95 H 338" />
          <Arrow d="M 278 156 C 308 156 312 95 338 95" />
        </>
      )}

      {id === 'evaluator' && (
        <>
          <Box x={8} y={72} w={84} label="Input" sub="任务" />
          <Box x={132} y={72} w={104} label="Generator" sub="生成" accent />
          <Box x={286} y={72} w={104} label="Evaluator" sub="评估" />
          <Box x={286} y={14} w={104} h={34} label="Pass?" />
          <Arrow d="M 92 95 H 132" />
          <Arrow d="M 236 95 H 286" />
          <Arrow d="M 338 72 V 48" />
          <path d="M 300 132 C 260 168 200 168 184 132" className="pg-arrow dashed" markerEnd="url(#pg-arrowhead)" />
          <text x="240" y="174" textAnchor="middle" className="pg-note">
            revise loop
          </text>
        </>
      )}
    </svg>
  )
}

export function PatternGallery() {
  const { lang } = useLang()
  const [active, setActive] = useState(0)
  const zh = lang === 'zh'
  const pattern = patterns[active]

  return (
    <div className="pattern-gallery">
      <div className="pattern-tabs" role="tablist" aria-label={zh ? '工作流模式' : 'Workflow patterns'}>
        {patterns.map((p, index) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={active === index}
            className={active === index ? 'is-active' : ''}
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            {zh ? p.name.zh : p.name.en}
          </button>
        ))}
      </div>

      <div className="pattern-panel" role="tabpanel">
        <div className="pattern-visual">
          <Diagram id={pattern.id} />
        </div>
        <div className="pattern-info">
          <span className="pattern-index">PATTERN 0{active + 1} / 05</span>
          <h3>{zh ? pattern.name.zh : pattern.name.en}</h3>
          <p className="pattern-tagline">{zh ? pattern.tagline.zh : pattern.tagline.en}</p>
          <dl>
            <div>
              <dt>{zh ? '典型例子' : 'Example'}</dt>
              <dd>{zh ? pattern.example.zh : pattern.example.en}</dd>
            </div>
            <div>
              <dt>{zh ? '别用，当' : 'Avoid when'}</dt>
              <dd>{zh ? pattern.avoid.zh : pattern.avoid.en}</dd>
            </div>
            <div>
              <dt>{zh ? '实战提示' : 'Field note'}</dt>
              <dd>{zh ? pattern.tip.zh : pattern.tip.en}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
