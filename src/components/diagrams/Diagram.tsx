import type { CSSProperties, ReactNode } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import type { DiagramId, Pair } from '../../content/types'
import { AgentLoop } from './AgentLoop'
import { PatternGallery } from './PatternGallery'

const arrow = { stroke: 'var(--ink-2)', strokeWidth: 1.4, fill: 'none' }

function Frame({ viewBox, children, label }: { viewBox: string; children: ReactNode; label: string }) {
  return (
    <svg viewBox={viewBox} className="static-svg" role="img" aria-label={label}>
      <defs>
        <marker id="dg-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-2)" />
        </marker>
      </defs>
      {children}
    </svg>
  )
}

function Anatomy() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return (
    <Frame viewBox="0 0 900 390" label={zh ? '最小 Agent 解剖图' : 'Minimal agent anatomy'}>
      <rect x="18" y="18" width="864" height="354" rx="22" className="dg-guardrail" />
      <text x="44" y="45" className="dg-kicker coral">
        {zh ? '护栏：超时 · 预算 · 权限 · 最大步数' : 'GUARDRAILS · TIMEOUT · BUDGET · PERMISSION · MAX STEPS'}
      </text>

      <g className="dg-card">
        <rect x="44" y="112" width="190" height="112" rx="14" />
        <text x="62" y="140" className="dg-kicker">TASK.MD</text>
        <text x="62" y="166" className="dg-title">{zh ? '任务说明' : 'Task spec'}</text>
        <text x="62" y="190" className="dg-sub">{zh ? '目标 · 成功标准' : 'goal · success'}</text>
        <text x="62" y="208" className="dg-sub">{zh ? '禁止事项 · 输入' : 'constraints · input'}</text>
      </g>

      <g className="dg-loop-frame">
        <rect x="316" y="86" width="274" height="184" rx="18" />
        <text x="336" y="112" className="dg-kicker">AGENT LOOP</text>
        <circle cx="420" cy="186" r="42" className="dg-core" />
        <text x="420" y="183" textAnchor="middle" className="dg-core-title">LLM</text>
        <text x="420" y="199" textAnchor="middle" className="dg-core-sub">{zh ? '决策' : 'decide'}</text>
        <g className="dg-chip">
          <rect x="494" y="150" width="76" height="30" rx="7" />
          <text x="532" y="169" textAnchor="middle" className="dg-chip-text">{zh ? '工具' : 'tools'}</text>
        </g>
        <g className="dg-chip">
          <rect x="494" y="192" width="76" height="30" rx="7" />
          <text x="532" y="211" textAnchor="middle" className="dg-chip-text">{zh ? '上下文' : 'context'}</text>
        </g>
        <path d="M 462 178 H 494" {...arrow} markerEnd="url(#dg-arrow)" />
        <path d="M 494 210 H 462" {...arrow} markerEnd="url(#dg-arrow)" />
        <path d="M 420 228 C 452 246 468 250 492 244" className="dg-loop-line" markerEnd="url(#dg-arrow)" />
        <text x="336" y="246" className="dg-note">{zh ? '观察 → 再决策' : 'observe → decide'}</text>
      </g>

      <g className="dg-card">
        <rect x="666" y="112" width="190" height="112" rx="14" />
        <text x="684" y="140" className="dg-kicker">TOOLS.PY</text>
        <text x="684" y="166" className="dg-title">{zh ? '3 个窄工具' : '3 narrow tools'}</text>
        <text x="684" y="190" className="dg-sub">{zh ? '超时 · 幂等' : 'timeout · idempotent'}</text>
        <text x="684" y="208" className="dg-sub">{zh ? '结构化错误' : 'structured errors'}</text>
      </g>

      <g className="dg-card">
        <rect x="316" y="292" width="274" height="56" rx="12" />
        <text x="336" y="316" className="dg-kicker">TRACE.JSONL</text>
        <text x="336" y="335" className="dg-sub">{zh ? '每一轮：模型输出 · 工具参数 · 结果 · 耗时' : 'each turn: output · args · result · latency'}</text>
      </g>

      <path d="M 234 168 H 316" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 590 168 H 666" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 453 270 V 292" {...arrow} markerEnd="url(#dg-arrow)" />
    </Frame>
  )
}

function ContextStack() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const layers = [
    { name: zh ? '系统指令' : 'System', tokens: '1.0k', width: 70, cls: 'c1' },
    { name: zh ? '工具定义' : 'Tools', tokens: '3.0k', width: 150, cls: 'c2' },
    { name: zh ? '当前任务' : 'Task', tokens: '1.6k', width: 100, cls: 'c3' },
    { name: zh ? '长期记忆' : 'Memory', tokens: '0.9k', width: 70, cls: 'c4' },
    { name: zh ? '检索资料' : 'Retrieval', tokens: '7.2k', width: 310, cls: 'c5' },
    { name: zh ? '历史对话' : 'History', tokens: '5.8k', width: 250, cls: 'c6' },
  ]
  return (
    <Frame viewBox="0 0 900 390" label={zh ? '上下文分层示意图' : 'Context layers'}>
      <text x="54" y="44" className="dg-kicker">CONTEXT WINDOW · 24K TOKENS</text>
      <text x="846" y="44" textAnchor="end" className="dg-note">{zh ? '越往下越应按需加载' : 'lower layers load on demand'}</text>
      {layers.map((layer, index) => {
        const y = 68 + index * 48
        return (
          <g key={layer.name}>
            <text x="232" y={y + 23} textAnchor="end" className="dg-label">{layer.name}</text>
            <rect x="250" y={y} width={layer.width} height="34" rx="7" className={`dg-bar ${layer.cls}`} />
            <text x={262 + layer.width} y={y + 22} className="dg-token">{layer.tokens}</text>
          </g>
        )
      })}
      <rect x="250" y="68" width="620" height="34" rx="7" className="dg-budget-outline" />
      <line x1="870" y1="62" x2="870" y2="336" className="dg-budget-line" />
      <text x="870" y="356" textAnchor="middle" className="dg-note">{zh ? '预算上限' : 'budget'}</text>
      <text x="54" y="322" className="dg-sub">{zh ? '关键约束' : 'critical'}</text>
      <text x="54" y="340" className="dg-sub">{zh ? '放首尾' : 'first + last'}</text>
    </Frame>
  )
}

function ToolContract() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return (
    <Frame viewBox="0 0 900 420" label={zh ? '工具契约五要素' : 'Five parts of a tool contract'}>
      <g className="dg-center-hex">
        <path d="M 450 158 L 512 194 V 266 L 450 302 L 388 266 V 194 Z" />
        <text x="450" y="228" textAnchor="middle" className="dg-core-title">TOOL</text>
        <text x="450" y="247" textAnchor="middle" className="dg-core-sub">{zh ? '模型看到的全部' : 'all the model sees'}</text>
      </g>

      <g className="dg-card">
        <rect x="330" y="26" width="240" height="72" rx="12" />
        <text x="350" y="52" className="dg-kicker">01 · NAME</text>
        <text x="350" y="78" className="dg-title">get_order_status</text>
      </g>
      <g className="dg-card">
        <rect x="664" y="158" width="216" height="86" rx="12" />
        <text x="682" y="184" className="dg-kicker">02 · DESCRIPTION</text>
        <text x="682" y="207" className="dg-title">{zh ? '何时用 / 别用' : 'when / when not'}</text>
        <text x="682" y="227" className="dg-sub">{zh ? '返回什么 · 例子' : 'returns · example'}</text>
      </g>
      <g className="dg-card">
        <rect x="600" y="318" width="258" height="78" rx="12" />
        <text x="618" y="344" className="dg-kicker">03 · SCHEMA</text>
        <text x="618" y="368" className="dg-title">{zh ? '≤3 个参数 · 枚举优先' : '≤3 params · enums'}</text>
        <text x="618" y="386" className="dg-sub">required / default</text>
      </g>
      <g className="dg-card">
        <rect x="42" y="318" width="258" height="78" rx="12" />
        <text x="60" y="344" className="dg-kicker">04 · RETURN</text>
        <text x="60" y="368" className="dg-title">{zh ? '摘要 + 关键字段' : 'summary + key fields'}</text>
        <text x="60" y="386" className="dg-sub">{zh ? '不要整库 / HTML' : 'no whole DB / HTML'}</text>
      </g>
      <g className="dg-card">
        <rect x="20" y="158" width="216" height="86" rx="12" />
        <text x="38" y="184" className="dg-kicker">05 · ERRORS</text>
        <text x="38" y="207" className="dg-title">{zh ? '可行动提示' : 'actionable hint'}</text>
        <text x="38" y="227" className="dg-sub">{zh ? '是否可重试' : 'retryable?'}</text>
      </g>

      <path d="M 430 98 L 430 158" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 512 212 H 664" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 476 296 L 600 340" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 424 296 L 300 340" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 388 212 H 236" {...arrow} markerEnd="url(#dg-arrow)" />
    </Frame>
  )
}

function MemoryMap() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return (
    <Frame viewBox="0 0 900 420" label={zh ? '记忆生命周期' : 'Memory lifecycle'}>
      <circle cx="450" cy="210" r="118" className="dg-orbit" />
      <circle cx="450" cy="210" r="64" className="dg-core" />
      <text x="450" y="205" textAnchor="middle" className="dg-core-title">MEMORY</text>
      <text x="450" y="224" textAnchor="middle" className="dg-core-sub">{zh ? '生命周期' : 'lifecycle'}</text>

      <g className="dg-card">
        <rect x="354" y="22" width="192" height="60" rx="12" />
        <text x="372" y="47" className="dg-kicker">01 · WRITE</text>
        <text x="372" y="69" className="dg-sub">{zh ? '确认 · 去敏 · 记录来源' : 'consent · redact · source'}</text>
      </g>
      <g className="dg-card">
        <rect x="700" y="178" width="172" height="64" rx="12" />
        <text x="718" y="203" className="dg-kicker">02 · RETRIEVE</text>
        <text x="718" y="225" className="dg-sub">{zh ? '按需 · 排序 · 过滤' : 'on demand · rank'}</text>
      </g>
      <g className="dg-card">
        <rect x="354" y="338" width="192" height="60" rx="12" />
        <text x="372" y="363" className="dg-kicker">03 · UPDATE</text>
        <text x="372" y="385" className="dg-sub">{zh ? '冲突裁决 · 时间优先' : 'conflict · recency'}</text>
      </g>
      <g className="dg-card">
        <rect x="28" y="178" width="172" height="64" rx="12" />
        <text x="46" y="203" className="dg-kicker">04 · FORGET</text>
        <text x="46" y="225" className="dg-sub">TTL · {zh ? '用户删除' : 'user delete'}</text>
      </g>

      <path d="M 450 82 V 146" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 546 210 H 700" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 450 274 V 338" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 354 210 H 200" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 450 82 C 620 82 760 120 786 178" className="dg-loop-line" markerEnd="url(#dg-arrow)" />
      <path d="M 786 242 C 750 340 600 368 546 368" className="dg-loop-line" markerEnd="url(#dg-arrow)" />
      <path d="M 354 368 C 200 368 120 320 114 242" className="dg-loop-line" markerEnd="url(#dg-arrow)" />
      <path d="M 114 178 C 130 110 250 82 354 82" className="dg-loop-line" markerEnd="url(#dg-arrow)" />

      <text x="450" y="405" textAnchor="middle" className="dg-note">
        {zh ? '记得准，比记得多更重要' : 'accurate recall beats massive storage'}
      </text>
    </Frame>
  )
}

function AutonomyLadder() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const levels = [
    { code: 'L0', title: zh ? '固定工作流' : 'Fixed workflow', desc: zh ? '代码决定每一步，模型只做文本处理' : 'Code owns every step; model only handles text', risk: 1 },
    { code: 'L1', title: zh ? 'LLM 节点' : 'LLM nodes', desc: zh ? '固定流程中嵌入模型判断' : 'Model judgments inside a fixed flow', risk: 1 },
    { code: 'L2', title: zh ? '模型路由' : 'Model routing', desc: zh ? '模型选择分支或专用流程' : 'Model selects a branch or specialist flow', risk: 2 },
    { code: 'L3', title: zh ? '有界 Agent' : 'Bounded agent', desc: zh ? '模型决定步骤，但有预算、权限和停止条件' : 'Model owns steps, bounded by budget, permissions, stops', risk: 3 },
    { code: 'L4', title: zh ? '开放 Agent' : 'Open agent', desc: zh ? '开放工具与环境，自主规划长任务' : 'Open tools and environment; plans long tasks', risk: 4 },
  ]
  return (
    <div className="ladder" role="img" aria-label={zh ? '自主性阶梯' : 'Autonomy ladder'}>
      {levels.map((level, index) => (
        <div className="ladder-step" key={level.code} style={{ '--i': index } as CSSProperties}>
          <div className="ladder-risk" aria-label={zh ? `风险 ${level.risk}/4` : `risk ${level.risk}/4`}>
            {[1, 2, 3, 4].map((n) => (
              <i key={n} className={n <= level.risk ? 'on' : ''} />
            ))}
          </div>
          <div className="ladder-card">
            <span className="ladder-code">{level.code}</span>
            <strong>{level.title}</strong>
            <p>{level.desc}</p>
          </div>
        </div>
      ))}
      <div className="ladder-axis">
        <span>{zh ? '更可控 · 更低风险' : 'more control · less risk'}</span>
        <span>{zh ? '更自主 · 更高风险' : 'more autonomy · more risk'}</span>
      </div>
    </div>
  )
}

function EvalFunnel() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const rows = [
    { top: 640, y: 46, title: zh ? '黄金集' : 'Golden set', sub: zh ? '30–100 条 · 每次 PR' : '30–100 cases · every PR', count: '100%' },
    { top: 520, y: 136, title: zh ? '回归集' : 'Regression', sub: zh ? '已知失败模式 · 每次发版' : 'known failures · every release', count: '60%' },
    { top: 400, y: 226, title: zh ? '线上抽样' : 'Online sample', sub: zh ? '真实流量 · 每日' : 'real traffic · daily', count: '10%' },
    { top: 280, y: 316, title: zh ? '人工深审' : 'Human review', sub: zh ? '高风险 / 争议 · 每周' : 'high-risk · weekly', count: '1%' },
  ]
  return (
    <Frame viewBox="0 0 900 400" label={zh ? '评测漏斗' : 'Evaluation funnel'}>
      {rows.map((row, index) => {
        const nextTop = rows[index + 1]?.top ?? row.top - 90
        const cx = 430
        return (
          <g key={row.title}>
            <path
              d={`M ${cx - row.top / 2} ${row.y} L ${cx + row.top / 2} ${row.y} L ${cx + nextTop / 2} ${row.y + 74} L ${cx - nextTop / 2} ${row.y + 74} Z`}
              className={`dg-funnel f${index + 1}`}
            />
            <text x={cx} y={row.y + 32} textAnchor="middle" className="dg-funnel-title">{row.title}</text>
            <text x={cx} y={row.y + 52} textAnchor="middle" className="dg-funnel-sub">{row.sub}</text>
            <text x={780} y={row.y + 42} className="dg-token">{row.count}</text>
          </g>
        )
      })}
      <path d="M 810 54 V 350" className="dg-budget-line" markerEnd="url(#dg-arrow)" />
      <text x="822" y="70" className="dg-note">{zh ? '成本' : 'cost'}</text>
      <text x="822" y="330" className="dg-note">{zh ? '真实' : 'reality'}</text>
    </Frame>
  )
}

function MultiAgent() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  return (
    <Frame viewBox="0 0 900 400" label={zh ? '多 Agent 拓扑' : 'Multi-agent topologies'}>
      <line x1="450" y1="30" x2="450" y2="370" className="dg-divider" />
      <text x="40" y="40" className="dg-kicker">SUPERVISOR</text>
      <text x="500" y="40" className="dg-kicker">HANDOFF</text>

      <g className="dg-card">
        <rect x="170" y="58" width="150" height="52" rx="11" />
        <text x="245" y="80" textAnchor="middle" className="dg-title">{zh ? '主管 Agent' : 'Supervisor'}</text>
        <text x="245" y="98" textAnchor="middle" className="dg-sub">{zh ? '拆解 · 验收' : 'split · validate'}</text>
      </g>
      {[
        { x: 50, label: 'Billing' },
        { x: 195, label: 'Logistics' },
        { x: 340, label: 'Tech' },
      ].map((worker) => (
        <g key={worker.label} className="dg-chip">
          <rect x={worker.x} y="176" width="110" height="40" rx="9" />
          <text x={worker.x + 55} y="201" textAnchor="middle" className="dg-chip-text">{worker.label}</text>
        </g>
      ))}
      <g className="dg-card">
        <rect x="170" y="286" width="150" height="52" rx="11" />
        <text x="245" y="308" textAnchor="middle" className="dg-title">{zh ? '统一出口' : 'One output'}</text>
        <text x="245" y="326" textAnchor="middle" className="dg-sub">{zh ? '汇总给人' : 'to the human'}</text>
      </g>
      <path d="M 220 110 C 170 130 120 150 105 176" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 245 110 V 176" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 270 110 C 320 130 370 150 395 176" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 105 216 C 120 252 160 278 200 286" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 250 216 V 286" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 395 216 C 380 252 340 278 300 286" {...arrow} markerEnd="url(#dg-arrow)" />

      <g className="dg-card">
        <rect x="500" y="86" width="120" height="54" rx="11" />
        <text x="560" y="108" textAnchor="middle" className="dg-title">Agent A</text>
        <text x="560" y="126" textAnchor="middle" className="dg-sub">{zh ? '售前' : 'sales'}</text>
      </g>
      <g className="dg-card">
        <rect x="662" y="86" width="120" height="54" rx="11" />
        <text x="722" y="108" textAnchor="middle" className="dg-title">Agent B</text>
        <text x="722" y="126" textAnchor="middle" className="dg-sub">{zh ? '售后' : 'support'}</text>
      </g>
      <g className="dg-card">
        <rect x="662" y="210" width="120" height="54" rx="11" />
        <text x="722" y="232" textAnchor="middle" className="dg-title">{zh ? '人工' : 'Human'}</text>
        <text x="722" y="250" textAnchor="middle" className="dg-sub">{zh ? '升级处理' : 'escalation'}</text>
      </g>
      <path d="M 620 113 H 662" {...arrow} markerEnd="url(#dg-arrow)" />
      <path d="M 722 140 V 210" {...arrow} markerEnd="url(#dg-arrow)" />
      <text x="560" y="324" className="dg-sub" textAnchor="middle">
        {zh ? '交接契约：摘要 · 未决问题 · 禁止事项' : 'handoff contract: summary · open items · never-do'}
      </text>
      <text x="560" y="348" className="dg-note" textAnchor="middle">
        {zh ? '不要让 Agent 自由群聊' : 'no free-form agent group chat'}
      </text>
    </Frame>
  )
}

function TraceWaterfall() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const rows = [
    { label: zh ? '模型 · 规划' : 'LLM · plan', start: 0, ms: 900, kind: 'model' },
    { label: 'get_claim', start: 900, ms: 220, kind: 'tool' },
    { label: zh ? '模型 · 决策' : 'LLM · decide', start: 1120, ms: 1480, kind: 'model' },
    { label: 'get_rules · timeout', start: 2600, ms: 10000, kind: 'error' },
    { label: zh ? '重试 1 次' : 'retry 1', start: 12600, ms: 520, kind: 'retry' },
    { label: zh ? '模型 · 汇总' : 'LLM · answer', start: 13120, ms: 1280, kind: 'model' },
  ]
  const total = 14400
  return (
    <div className="waterfall" role="img" aria-label={zh ? 'Agent 运行 trace 瀑布图' : 'Agent trace waterfall'}>
      <div className="waterfall-head">
        <span>RUN r_8f2 · 14.4s</span>
        <span className="small">{zh ? '工具超时占了 69%' : 'tool timeout = 69% of run'}</span>
      </div>
      {rows.map((row) => (
        <div className="waterfall-row" key={row.label}>
          <span className="waterfall-label">{row.label}</span>
          <div className="waterfall-track">
            <span
              className={`waterfall-bar ${row.kind}`}
              style={{ left: `${(row.start / total) * 100}%`, width: `${(row.ms / total) * 100}%` }}
            >
              {(row.ms / 1000).toFixed(1)}s
            </span>
          </div>
        </div>
      ))}
      <div className="waterfall-axis">
        <span>0s</span>
        <span>3.6s</span>
        <span>7.2s</span>
        <span>10.8s</span>
        <span>14.4s</span>
      </div>
    </div>
  )
}

function LatencyBudget() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const segments = [
    { label: zh ? '首 token' : 'TTFT', value: 0.9, cls: 's1' },
    { label: zh ? '模型 1' : 'model 1', value: 2.4, cls: 's2' },
    { label: zh ? '工具 1' : 'tool 1', value: 1.6, cls: 's3' },
    { label: zh ? '模型 2' : 'model 2', value: 2.2, cls: 's2' },
    { label: zh ? '工具 2' : 'tool 2', value: 2.8, cls: 's3' },
    { label: zh ? '模型 3' : 'model 3', value: 1.1, cls: 's2' },
    { label: zh ? '渲染' : 'render', value: 0.7, cls: 's4' },
  ]
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  return (
    <div className="latency" role="img" aria-label={zh ? '延迟预算拆分' : 'Latency budget'}>
      <div className="latency-head">
        <span>RUN r_8f2 · {total.toFixed(1)}s</span>
        <span className="small">{zh ? '模型 56% · 工具 38%' : 'model 56% · tools 38%'}</span>
      </div>
      <div className="latency-bar">
        {segments.map((segment) => (
          <span key={segment.label} className={`latency-seg ${segment.cls}`} style={{ width: `${(segment.value / total) * 100}%` }}>
            <i>{segment.value.toFixed(1)}s</i>
          </span>
        ))}
      </div>
      <div className="latency-legend">
        {segments.map((segment) => (
          <span key={segment.label}>
            <i className={`swatch ${segment.cls}`} />
            {segment.label}
          </span>
        ))}
      </div>
      <p className="latency-note">
        {zh ? 'p95 才是用户感受到的延迟。优化前先找到最长的那一段。' : 'p95 is what users feel. Find the longest segment before optimizing.'}
      </p>
    </div>
  )
}

export function Diagram({ id }: { id: DiagramId }) {
  if (id === 'agent-loop') return <AgentLoop />
  if (id === 'patterns') return <PatternGallery />
  if (id === 'anatomy') return <Anatomy />
  if (id === 'context-stack') return <ContextStack />
  if (id === 'tool-contract') return <ToolContract />
  if (id === 'memory-map') return <MemoryMap />
  if (id === 'autonomy-ladder') return <AutonomyLadder />
  if (id === 'eval-funnel') return <EvalFunnel />
  if (id === 'trace-waterfall') return <TraceWaterfall />
  if (id === 'latency-budget') return <LatencyBudget />
  if (id === 'multi-agent') return <MultiAgent />
  return null
}

export function DiagramFigure({ id, caption }: { id: DiagramId; caption: Pair }) {
  const { lang } = useLang()
  return (
    <figure className="diagram-figure">
      <Diagram id={id} />
      <figcaption>{lang === 'zh' ? caption.zh : caption.en}</figcaption>
    </figure>
  )
}
