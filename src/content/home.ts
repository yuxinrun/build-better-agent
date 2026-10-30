import type { IconName } from '../components/Icon'
import type { Pair } from './types'

export type Path = {
  id: string
  tone: 'teal' | 'coral'
  label: Pair
  title: Pair
  audience: Pair
  desc: Pair
  steps: { title: Pair; desc: Pair }[]
  outcome: Pair
  cta: { label: Pair; to: string }
}

export const paths: Path[] = [
  {
    id: 'switcher',
    tone: 'teal',
    label: { zh: '路线 A · 转型', en: 'Track A · Switch' },
    title: { zh: '传统程序员 → Agent 工程师', en: 'Software engineer → Agent engineer' },
    audience: { zh: '会写业务代码，没做过 AI 应用', en: 'You ship software, but have not built AI apps' },
    desc: {
      zh: '不用先学微积分。从循环、工具、上下文这些你熟悉的工程概念入手，四周做出第一个能用的 Agent。',
      en: 'No calculus required. Start from loops, tools, and context — engineering concepts you already know. Ship a usable agent in four weeks.',
    },
    steps: [
      {
        title: { zh: '第 1 周 · 拆掉玄学', en: 'Week 1 · Demystify' },
        desc: { zh: '心智模型 + 最小循环，手写一个 50 行 Agent', en: 'Mental model + minimal loop; hand-write a 50-line agent' },
      },
      {
        title: { zh: '第 2 周 · 学会喂料', en: 'Week 2 · Feed it well' },
        desc: { zh: '上下文工程与工具设计，让模型看得懂、做得对', en: 'Context engineering and tool design' },
      },
      {
        title: { zh: '第 3 周 · 接上现实', en: 'Week 3 · Connect reality' },
        desc: { zh: 'RAG、记忆、工作流编排，接一个真实内部 API', en: 'RAG, memory, workflow orchestration with a real internal API' },
      },
      {
        title: { zh: '第 4 周 · 让它可靠', en: 'Week 4 · Make it reliable' },
        desc: { zh: '评测、trace、成本控制，小范围上线', en: 'Evals, traces, cost control, limited launch' },
      },
    ],
    outcome: {
      zh: '产出：一个能解决真实内部问题、有评测和日志的 Agent。',
      en: 'Outcome: an agent that solves a real internal problem, with evals and logs.',
    },
    cta: { label: { zh: '从第 1 章开始', en: 'Start at chapter 1' }, to: '/chapters/mental-model' },
  },
  {
    id: 'builder',
    tone: 'coral',
    label: { zh: '路线 B · 进阶', en: 'Track B · Level up' },
    title: { zh: 'Agent 工程师 → 生产负责人', en: 'Agent engineer → Production owner' },
    audience: { zh: '做过 Demo，正在为稳定性和成本发愁', en: 'You have a demo and are fighting reliability and cost' },
    desc: {
      zh: 'Demo 到生产之间，隔着的不是模型能力，而是评测、可观测性、成本与权限。按顺序补齐这四块。',
      en: 'Between demo and production sits evals, observability, cost, and permissions — not model capability. Fill the gaps in order.',
    },
    steps: [
      {
        title: { zh: '先建基线', en: 'Baseline first' },
        desc: { zh: '30 条真实用例 + trace，停止凭感觉调 Prompt', en: '30 real cases + traces; stop tuning by feel' },
      },
      {
        title: { zh: '再管成本', en: 'Then cost' },
        desc: { zh: '路由、缓存、上下文压缩，算清每个成功任务的成本', en: 'Routing, caching, compression; know cost per success' },
      },
      {
        title: { zh: '划清边界', en: 'Draw boundaries' },
        desc: { zh: '自主性阶梯、状态机、人工审批与权限最小化', en: 'Autonomy ladder, state machines, approvals, least privilege' },
      },
      {
        title: { zh: '最后谈规模', en: 'Scale last' },
        desc: { zh: '只在上下文隔离、并行、权限分离时上多 Agent', en: 'Use multi-agent only for isolation, parallelism, or permissions' },
      },
    ],
    outcome: {
      zh: '产出：一套能灰度、能回滚、能复盘的生产级 Agent 系统。',
      en: 'Outcome: a production agent system that canaries, rolls back, and learns from failures.',
    },
    cta: { label: { zh: '从第 7 章开始', en: 'Start at chapter 7' }, to: '/chapters/evaluation' },
  },
]

export const pitfalls: {
  icon: IconName
  title: Pair
  problem: Pair
  fix: Pair
}[] = [
  {
    icon: 'wrench',
    title: { zh: '工具开成杂货铺', en: 'A tool supermarket' },
    problem: {
      zh: '一口气接了 30 个工具，名字还都差不多。模型开始随机点菜，你还以为是模型笨。',
      en: 'Thirty tools with similar names. The model orders randomly, and you blame the model.',
    },
    fix: { zh: '按任务裁剪到 5±2 个；命名用动词 + 对象；描述写清何时别用。', en: 'Trim to 5±2 per task; verb + object names; say when not to use.' },
  },
  {
    icon: 'layers',
    title: { zh: '上下文塞成仓库', en: 'Context as a warehouse' },
    problem: {
      zh: '把整本手册、全部历史、所有检索结果都塞进去。关键约束被淹没，成本还翻了五倍。',
      en: 'Whole manuals, full history, every retrieved chunk. Key constraints drown, and cost quintuples.',
    },
    fix: { zh: '分层、设上限、滚动摘要；每段上下文对应一个具体失败模式。', en: 'Layer, cap, summarize; map each block to a failure mode.' },
  },
  {
    icon: 'chart',
    title: { zh: '只测 happy path', en: 'Happy-path-only testing' },
    problem: {
      zh: '演示用的五个问题全过，就宣布上线。真实用户带着错别字和缺失信息来了。',
      en: 'Five demo questions pass, so you ship. Real users arrive with typos and missing info.',
    },
    fix: { zh: '30 条真实用例，覆盖常见、边界、对抗；进 CI 跑回归。', en: '30 real cases across common, edge, adversarial; run in CI.' },
  },
  {
    icon: 'flow',
    title: { zh: '上来就全自主', en: 'Full autonomy on day one' },
    problem: {
      zh: '步骤明明可以写死，却让模型自由规划。结果不可复现，出了问题没人说得清。',
      en: 'Steps could be fixed, but the model plans freely. Results are irreproducible and unexplainable.',
    },
    fix: { zh: '先画工作流，再逐级放权；不可逆动作永远留人工确认。', en: 'Draw the workflow first; earn autonomy; keep human approval for irreversible actions.' },
  },
  {
    icon: 'pulse',
    title: { zh: '没有停止条件', en: 'No stop conditions' },
    problem: {
      zh: '模型陷入“再查一次”的循环。第二天早上，账单比任务先完成。',
      en: 'The model loops on “one more lookup.” By morning, the bill finishes before the task.',
    },
    fix: { zh: '最大步数 + 超时 + 预算上限；失败时给人话解释，而不是继续试。', en: 'Max steps + timeout + budget cap; explain failures, do not keep trying.' },
  },
  {
    icon: 'users',
    title: { zh: '为了多 Agent 而多 Agent', en: 'Multi-agent for its own sake' },
    problem: {
      zh: '三个 Agent 在群里自由聊天，看起来很智能。出错时你不知道该看谁的日志。',
      en: 'Three agents free-chat and look smart. When it breaks, you do not know whose logs to read.',
    },
    fix: { zh: '先证明单 Agent 不够；拆分只为隔离、并行或权限，并定义交接契约。', en: 'Prove one agent is insufficient; split only for isolation, parallelism, or permissions — with contracts.' },
  },
]

export const resources: {
  title: Pair
  desc: Pair
  href: string
  tag: Pair
  tone: 'teal' | 'coral' | 'blue' | 'lime'
}[] = [
  {
    title: { zh: 'Anthropic · Building effective agents', en: 'Anthropic · Building effective agents' },
    desc: { zh: '五种工作流模式与 Agent 设计原则，本文多处引用。', en: 'Five workflow patterns and agent design principles, referenced throughout.' },
    href: 'https://www.anthropic.com/engineering/building-effective-agents',
    tag: { zh: '必读', en: 'Essential' },
    tone: 'teal',
  },
  {
    title: { zh: 'OpenAI · 构建 Agent 实践指南', en: 'OpenAI · A practical guide to building agents' },
    desc: { zh: '从单 Agent 到编排、护栏与人工介入的实践指南。', en: 'From single agents to orchestration, guardrails, and human intervention.' },
    href: 'https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/',
    tag: { zh: '官方', en: 'Official' },
    tone: 'blue',
  },
  {
    title: { zh: 'LangGraph · Agent 编排', en: 'LangGraph · Agent orchestration' },
    desc: { zh: '有状态编排、checkpoint、人工介入与可观测性。', en: 'Stateful orchestration, checkpoints, human-in-the-loop, and observability.' },
    href: 'https://langchain-ai.github.io/langgraph/',
    tag: { zh: '框架', en: 'Framework' },
    tone: 'coral',
  },
  {
    title: { zh: '12-Factor Agents', en: '12-Factor Agents' },
    desc: { zh: '把 Agent 当软件系统来设计的 12 条工程原则。', en: 'Twelve engineering principles for treating agents as software systems.' },
    href: 'https://github.com/humanlayer/12-factor-agents',
    tag: { zh: '工程', en: 'Engineering' },
    tone: 'lime',
  },
  {
    title: { zh: '李博杰 · 深入理解 AI Agent', en: 'Bo Li · AI Agents in Depth' },
    desc: { zh: '从原理到实践的开放书，适合补齐理论底座。', en: 'An open book from principles to practice — a strong theoretical foundation.' },
    href: 'https://bojieli.github.io/ai-agent-book/astro/',
    tag: { zh: '理论', en: 'Theory' },
    tone: 'teal',
  },
  {
    title: { zh: 'Model Context Protocol', en: 'Model Context Protocol' },
    desc: { zh: '工具与上下文的标准接口，让 Agent 接系统更简单。', en: 'A standard interface for tools and context, simplifying integrations.' },
    href: 'https://modelcontextprotocol.io/',
    tag: { zh: '标准', en: 'Standard' },
    tone: 'blue',
  },
]

export const launchGates: Pair[] = [
  { zh: '一句话说清 Agent 的职责边界', en: 'Responsibility boundary fits in one sentence' },
  { zh: '失败时用户能看到可理解的下一步', en: 'Users see an understandable next step on failure' },
  { zh: '工具都有超时、重试、幂等与最小权限', en: 'Tools have timeouts, retries, idempotency, least privilege' },
  { zh: '写操作与不可逆动作有人工确认', en: 'Writes and irreversible actions need approval' },
  { zh: '有最大步数、token 与金额预算', en: 'Max steps, token, and spend budgets' },
  { zh: '完整 trace 可回放，敏感信息脱敏', en: 'Full replayable traces with PII redacted' },
  { zh: '≥30 条真实评测用例接入 CI', en: '30+ real eval cases in CI' },
  { zh: '关键错误与安全项一票否决', en: 'Critical errors and safety are veto gates' },
  { zh: '上下文有分层、上限与压缩', en: 'Context is layered, capped, compressed' },
  { zh: '模型 / Prompt / 工具可灰度可回滚', en: 'Model, prompt, tools canary and roll back' },
  { zh: '有人工接管与全局停止开关', en: 'Human takeover and global kill switch' },
  { zh: '有 bad case 复盘与迭代机制', en: 'Bad-case review and iteration loop' },
]
