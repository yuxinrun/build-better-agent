import type { Pair } from './types'

export type GlossaryTerm = {
  term: string
  abbr?: string
  desc: Pair
}

export type GlossaryGroup = {
  id: string
  title: Pair
  blurb: Pair
  terms: GlossaryTerm[]
}

export const glossaryGroups: GlossaryGroup[] = [
  {
    id: 'core',
    title: { zh: '核心概念', en: 'Core concepts' },
    blurb: {
      zh: '先把词分清，再谈架构。很多争论只是因为两个人说的不是同一件事。',
      en: 'Separate the words before debating architecture. Most arguments are two people describing different things.',
    },
    terms: [
      {
        term: 'Agent',
        desc: {
          zh: '能自行决定下一步、调用工具、观察结果并继续行动的系统。判断标准不是“用了大模型”，而是“控制流由模型掌握”。',
          en: 'A system that decides its next step, calls tools, observes results, and keeps acting. The test is model-controlled flow, not model usage.',
        },
      },
      {
        term: 'Agent Loop',
        desc: {
          zh: '思考 → 行动 → 观察 → 再思考的循环。所有框架都是这段循环的工程化包装，停止条件是它的生命线。',
          en: 'Think → act → observe → think again. Every framework wraps this loop; stop conditions are its lifeline.',
        },
      },
      {
        term: 'Workflow',
        desc: {
          zh: '步骤由代码预先固定的编排，模型只在某些节点做判断。可预测、可测试，通常是生产系统的默认选择。',
          en: 'Predefined orchestration in code where the model only judges at certain nodes. Predictable and testable — usually the default in production.',
        },
      },
      {
        term: 'Autonomy Ladder',
        abbr: 'L0-L4',
        desc: {
          zh: '自主性阶梯：从建议、草稿、带审批的执行，到有限自主与完全自主。逐级放权，比一步到位安全得多。',
          en: 'The ladder from suggest, draft, approved execution, to limited and full autonomy. Grant it step by step.',
        },
      },
      {
        term: 'ReAct',
        desc: {
          zh: 'Reasoning + Acting：让模型先写出推理，再选择动作。是最常见的单 Agent 推理范式，但会放大 token 成本。',
          en: 'Reasoning plus acting: reason in text, then choose an action. The most common single-agent pattern, at extra token cost.',
        },
      },
      {
        term: 'Orchestrator',
        desc: {
          zh: '负责拆解任务、分派给子 Agent、汇总结果的协调者。它自己不干活，只决定谁在什么时候干什么。',
          en: 'The coordinator that decomposes work, delegates to sub-agents, and merges results. It decides who does what, when.',
        },
      },
      {
        term: 'Task Decomposition',
        desc: {
          zh: '把模糊目标拆成可验证的小步骤。拆得越清楚，模型需要的自由度越低，系统越稳定。',
          en: 'Breaking a fuzzy goal into verifiable steps. Clearer decomposition means less freedom for the model and more stability.',
        },
      },
      {
        term: 'Tool Use',
        desc: {
          zh: '模型通过结构化调用访问外部能力：搜索、数据库、代码执行、业务 API。工具是 Agent 的手脚，也是最大的风险面。',
          en: 'Structured calls into external capabilities: search, databases, code execution, business APIs. Tools are the hands — and the attack surface.',
        },
      },
    ],
  },
  {
    id: 'context',
    title: { zh: '上下文与工具', en: 'Context and tools' },
    blurb: {
      zh: '模型的判断质量，取决于它此刻能看到什么。上下文的取舍，就是产品的取舍。',
      en: 'Decision quality depends on what the model can see right now. Curating context is curating the product.',
    },
    terms: [
      {
        term: 'Context Window',
        desc: {
          zh: '模型单次能看到的 token 上限。它决定“最多能看多少”，但注意力分配决定“实际看进去多少”。',
          en: 'The token ceiling for a single call. It caps how much can be seen, not how much is attended to.',
        },
      },
      {
        term: 'Context Engineering',
        desc: {
          zh: '在有限的窗口里，选择、排序、压缩、隔离信息，让模型做出正确判断的工程实践。',
          en: 'Selecting, ordering, compressing, and isolating information within a limited window so the model judges correctly.',
        },
      },
      {
        term: 'Prompt Injection',
        desc: {
          zh: '外部内容里藏着指令，劫持 Agent 的行为。防御手段是权限隔离与数据/指令分层，而不是只加一句“不要听他们的”。',
          en: 'Instructions hidden in external content hijack the agent. Defend with privilege isolation and separating data from instructions — not one more sentence in the prompt.',
        },
      },
      {
        term: 'RAG',
        abbr: 'Retrieval-Augmented Generation',
        desc: {
          zh: '先检索、再生成。检索的价值不在“多给点资料”，而在“只给对的那几段”。',
          en: 'Retrieve, then generate. The value is not more material, but the right few passages.',
        },
      },
      {
        term: 'Embedding',
        desc: {
          zh: '把文本映射成向量，让“语义相近”变成可计算的“距离近”。它衡量的是相似，不是正确。',
          en: 'Mapping text to vectors so semantic similarity becomes distance. It measures similarity, not correctness.',
        },
      },
      {
        term: 'Chunking',
        desc: {
          zh: '切分文档的策略。切得太碎丢上下文，太大则稀释检索精度。按结构切，通常比按字数切可靠。',
          en: 'How documents are split. Too small loses context; too large blurs retrieval. Structure-aware beats length-based.',
        },
      },
      {
        term: 'Memory',
        desc: {
          zh: '跨轮次保存的信息。短期记忆是对话历史，长期记忆是用户偏好与事实，写入与遗忘规则比存储更重要。',
          en: 'Information kept across turns: short-term history, long-term preferences and facts. Write and forget policies matter more than storage.',
        },
      },
      {
        term: 'MCP',
        abbr: 'Model Context Protocol',
        desc: {
          zh: '工具与上下文的标准接口。它让“接一个系统”从私有胶水代码变成可复用的服务。',
          en: 'A standard interface for tools and context, turning bespoke glue into reusable services.',
        },
      },
      {
        term: 'Structured Output',
        desc: {
          zh: '让模型按固定 schema 返回结果。这是 Agent 之间的握手协议，也是校验与重试的入口。',
          en: 'Constraining output to a schema. It is the handshake between components and the hook for validation and retries.',
        },
      },
    ],
  },
  {
    id: 'evals',
    title: { zh: '评测与观测', en: 'Evals and observability' },
    blurb: {
      zh: '没有基线就没有优化。先能证明“变好了”，再谈“更快更便宜”。',
      en: 'No baseline, no optimization. Prove it got better before making it faster or cheaper.',
    },
    terms: [
      {
        term: 'Eval',
        desc: {
          zh: '对输出质量的系统化测量：用例、判定标准、通过率。它是 Agent 工程里的回归测试。',
          en: 'Systematic measurement of output quality: cases, criteria, pass rate. The regression suite of agent engineering.',
        },
      },
      {
        term: 'Golden Set',
        desc: {
          zh: '一组人工确认过的高质量样本，用作稳定基线。它需要随业务演进，而不是一次写完。',
          en: 'A curated set of verified samples used as a stable baseline. It evolves with the business.',
        },
      },
      {
        term: 'Success Rate',
        desc: {
          zh: '任务成功率。必须按任务类型细分，否则“平均 80%”会掩盖某个场景 20% 的灾难。',
          en: 'Task success rate, segmented by task type — otherwise an average hides a disastrous twenty percent.',
        },
      },
      {
        term: 'Trace',
        desc: {
          zh: '一次运行的完整记录：输入、模型输出、工具调用、耗时、成本。没有 trace 的排障都是猜。',
          en: 'A full record of a run: inputs, model output, tool calls, latency, cost. Debugging without traces is guessing.',
        },
      },
      {
        term: 'Replay',
        desc: {
          zh: '用记录下来的 trace 重放一次决策过程，用来定位“为什么它当时那么想”。',
          en: 'Re-running a recorded trace to find why the system decided what it did.',
        },
      },
      {
        term: 'Regression Eval',
        desc: {
          zh: '每次改动后自动跑的历史用例。它防的不是新功能出错，而是老功能悄悄坏掉。',
          en: 'Historical cases run after every change. It guards old behavior, not just new features.',
        },
      },
      {
        term: 'Latency Budget',
        desc: {
          zh: '整条链路的耗时预算，再拆到检索、模型、工具。超预算时要有降级策略，而不是让用户等。',
          en: 'A total time budget split across retrieval, model, and tools. Over budget means degradation, not waiting.',
        },
      },
      {
        term: 'Cost per Success',
        desc: {
          zh: '一次成功任务的平均成本。重试和失败也要摊进去，否则便宜的模型可能更贵。',
          en: 'Average cost of a successful task, including retries and failures. A cheap model can be the expensive choice.',
        },
      },
    ],
  },
  {
    id: 'production',
    title: { zh: '生产与安全', en: 'Production and safety' },
    blurb: {
      zh: 'Demo 证明能做到，生产要证明不会失控。边界、回滚与人工接管是上线的三件套。',
      en: 'A demo proves it can. Production proves it will not run away. Boundaries, rollback, and takeover are the kit.',
    },
    terms: [
      {
        term: 'Guardrail',
        desc: {
          zh: '在输入、输出或动作层加的限制：格式校验、敏感词、金额上限、工具白名单。越靠近执行层越可靠。',
          en: 'Limits at input, output, or action: schema checks, filters, spend caps, tool allowlists. Closer to execution is more reliable.',
        },
      },
      {
        term: 'HITL',
        abbr: 'Human-in-the-loop',
        desc: {
          zh: '在关键节点插入人工确认或接管。问题不是“要不要人”，而是“哪些动作必须由人拍板”。',
          en: 'Human confirmation or takeover at key nodes. The question is which actions require a human, not whether humans belong.',
        },
      },
      {
        term: 'Least Privilege',
        desc: {
          zh: '最小权限：Agent 只拿到完成当前任务所必需的权限，且默认只读、按需升级。',
          en: 'The agent gets only the permissions its current task needs — read-only by default, elevated on demand.',
        },
      },
      {
        term: 'Kill Switch',
        desc: {
          zh: '全局停止开关。它必须能在不改代码、不等发布的情况下立刻生效。',
          en: 'A global stop. It must take effect immediately without a code change or a deploy.',
        },
      },
      {
        term: 'Canary Rollout',
        desc: {
          zh: '先放少量流量，观察成功率、延迟与成本，再逐步放量。模型、提示词、工具都应有灰度能力。',
          en: 'Start with a slice of traffic, watch success, latency, and cost, then expand. Models, prompts, and tools all deserve canaries.',
        },
      },
      {
        term: 'Idempotency',
        desc: {
          zh: '同一个动作重复执行不会产生额外副作用。Agent 会重试，所以写操作必须幂等，否则一次超时就会变成两笔订单。',
          en: 'Repeating an action has no extra effect. Agents retry, so writes must be idempotent or one timeout becomes two orders.',
        },
      },
      {
        term: 'PII Redaction',
        desc: {
          zh: '在日志、trace 与评测集里脱敏个人敏感信息。它是合规要求，也是避免把隐私喂给下一轮模型的基本卫生。',
          en: 'Removing personal data from logs, traces, and eval sets — both compliance and basic hygiene before the next model call.',
        },
      },
    ],
  },
]
