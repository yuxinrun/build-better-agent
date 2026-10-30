import type { Pair } from './types'

export const site = {
  name: '鱼心快跑',
  nameEn: 'Yuxin Runs',
  author: '鱼心',
  authorEn: 'Yuxin',
  email: 'yuxink@126.com',
  github: 'https://github.com/yuxinrun',
  homepage: 'https://yuxin.run',
  repo: 'https://github.com/yuxinrun/better-agent',
  url: 'https://yuxinrun.github.io/better-agent/',
  motto: {
    zh: '鱼心快跑，Bug 追不到。',
    en: 'Run, Yuxin, run. Bugs cannot catch you.',
  } satisfies Pair,
}

export const authorStory: Pair[] = [
  {
    zh: '我是鱼心，一名和 Agent 一起写代码的程序员。白天在设计工具、打磨上下文、盯住每一次回归；晚上把这些踩过的坑整理成能被人接着用的方法。',
    en: 'I am Yuxin, an engineer who writes code alongside agents. By day I design tools, tune context, and watch regressions; by night I turn those scars into methods others can reuse.',
  },
  {
    zh: '「鱼心快跑」是我的个人品牌，也是一种工作方式：先把系统跑通，再让它跑快。这本手册里的每一章，都来自真实项目里的失败与修正，而不是转述别人的结论。',
    en: 'Yuxin Runs is my brand and my working style: make it work first, then make it fast. Every chapter here comes from real failures and fixes, not paraphrased conclusions.',
  },
  {
    zh: '我偏爱那些不炫技但可靠的东西：可回放的 trace、能跑在 CI 里的评测、出错时说得清原因的失败。稳定本身，就是一种浪漫。',
    en: 'I favor the unglamorous but reliable: replayable traces, evals that run in CI, failures that explain themselves. Stability is its own kind of romance.',
  },
]

export const authorFacts: { label: Pair; value: Pair }[] = [
  { label: { zh: '现在在做', en: 'Currently' }, value: { zh: '构建更好的 Agent', en: 'Building better agents' } },
  { label: { zh: '常用语言', en: 'Languages' }, value: { zh: 'TypeScript · Python · Go', en: 'TypeScript · Python · Go' } },
  { label: { zh: '关注方向', en: 'Focus' }, value: { zh: 'Agent · 可靠性 · DX', en: 'Agents · Reliability · DX' } },
  { label: { zh: '个人站点', en: 'Homepage' }, value: { zh: 'yuxin.run', en: 'yuxin.run' } },
]

export const faqs: { q: Pair; a: Pair }[] = [
  {
    q: { zh: '学 Agent 需要先补机器学习吗？', en: 'Do I need machine-learning theory first?' },
    a: {
      zh: '不需要。绝大多数 Agent 工作是把模型当成一个有边界的组件来编排：定义工具、喂上下文、设停止条件、做评测。线性代数帮不上你，工程判断力才是稀缺资源。',
      en: 'No. Most agent work treats the model as a bounded component: define tools, feed context, set stop conditions, measure. Linear algebra will not save you; engineering judgment will.',
    },
  },
  {
    q: { zh: '一定要用某个框架吗？', en: 'Do I have to use a framework?' },
    a: {
      zh: '先手写一遍循环。当你能用 50 行代码讲清 Agent 的行为，再选框架才知道自己在省什么。框架解决的是状态、重试、可观测性，而不是替你思考。',
      en: 'Write the loop by hand once. After you can explain agent behavior in fifty lines, a framework’s value becomes obvious: state, retries, observability — not thinking for you.',
    },
  },
  {
    q: { zh: '上下文窗口越来越大，还需要上下文工程吗？', en: 'With huge context windows, is context engineering still needed?' },
    a: {
      zh: '更需要。窗口变大只降低了“塞不下”的概率，没有解决“注意力被稀释”“成本失控”“旧信息干扰新判断”。信息越多，挑选越重要。',
      en: 'More than ever. Bigger windows reduce overflow, not diluted attention, runaway cost, or stale information poisoning new decisions. More context makes selection harder.',
    },
  },
  {
    q: { zh: '什么时候该上多 Agent？', en: 'When should I go multi-agent?' },
    a: {
      zh: '只在三种情况下：需要上下文隔离、确实能并行、权限必须分离。除此之外，多 Agent 带来的是调试成本和不确定性的复利。',
      en: 'Only three reasons: context isolation, real parallelism, or separated permissions. Otherwise multi-agent compounds debugging cost and uncertainty.',
    },
  },
  {
    q: { zh: '怎么证明 Agent 真的变好了？', en: 'How do I prove the agent improved?' },
    a: {
      zh: '先有基线：30 条真实用例、明确的判定标准、可回放的 trace。每次只改一个变量，看成功率与成本曲线。感觉不算数，回归测试才算。',
      en: 'Start with a baseline: thirty real cases, explicit criteria, replayable traces. Change one variable at a time and watch success rate and cost. Feelings do not count; regressions do.',
    },
  },
  {
    q: { zh: '成本为什么会突然翻倍？', en: 'Why did my cost suddenly double?' },
    a: {
      zh: '常见三件事：重试变多、上下文变长、工具调用进入循环。把 token、步骤数、重试次数按会话打点，先找到曲线拐点，再谈优化。',
      en: 'Usually retries, longer context, or tool-call loops. Instrument tokens, steps, and retries per session; find the knee in the curve before optimizing.',
    },
  },
  {
    q: { zh: '如何避免模型乱调工具？', en: 'How do I stop the model from misusing tools?' },
    a: {
      zh: '工具数量控制在 5±2；命名用动词加对象；描述里写清“什么时候不要用”；写操作加权限与人工确认；工具返回结构化的错误，让模型能自我修正。',
      en: 'Keep five-ish tools per task; verb-plus-object names; describe when not to use them; add permissions and approvals for writes; return structured errors the model can recover from.',
    },
  },
  {
    q: { zh: '需要微调模型吗？', en: 'Do I need to fine-tune?' },
    a: {
      zh: '先用上下文、工具与工作流解决问题。只有当同一类格式/风格问题在评测集上反复失败，且样本足够时，微调才划算。多数团队卡在工程而不是模型。',
      en: 'Fix it with context, tools, and workflows first. Fine-tuning pays off only when the same formatting/style failure repeats on your eval set with enough data. Most teams are blocked by engineering, not models.',
    },
  },
  {
    q: { zh: '这份手册适合谁？', en: 'Who is this handbook for?' },
    a: {
      zh: '会写业务代码、想把 AI 真正接进产品的工程师；以及做出了 Demo、正在被稳定性和成本折磨的团队。不需要 AI 背景，需要愿意做实验。',
      en: 'Engineers who ship software and want AI in the product, plus teams with a demo now fighting reliability and cost. No AI background required — just willingness to experiment.',
    },
  },
  {
    q: { zh: '为什么叫「鱼心快跑」？', en: 'Why “Yuxin Runs”?' },
    a: {
      zh: '鱼是我的形象，快跑是态度：与其等一个完美架构，不如先跑起来，在真实的反馈里把方向调对。Bug 永远追不上持续迭代的人。',
      en: 'A fish is my mark; running is the attitude: rather than waiting for a perfect architecture, get moving and correct course with real feedback. Bugs cannot catch someone who keeps iterating.',
    },
  },
]

export type Update = {
  date: string
  version: string
  title: Pair
  items: Pair[]
}

export const updates: Update[] = [
  {
    date: '2026-10',
    version: 'v1.3',
    title: { zh: '新增模板库、术语表与常见问题', en: 'Toolkit, glossary, and FAQ' },
    items: [
      { zh: '新增「工具箱」：系统提示、工具定义、评测用例、trace 字段、HITL 策略、上线清单六套可直接复制的模板。', en: 'New toolkit: six copy-ready templates for system prompts, tool specs, eval cases, trace fields, HITL, and launch checklists.' },
      { zh: '新增「术语表」：把 Agent 语境里最容易混淆的 32 个词一次讲清。', en: 'New glossary: 32 terms that get confused most often in agent work.' },
      { zh: '新增「常见问题」：转型、框架选择、成本、多 Agent 等十个高频疑问。', en: 'New FAQ covering transitions, frameworks, cost, and multi-agent.' },
    ],
  },
  {
    date: '2026-09',
    version: 'v1.2',
    title: { zh: '上线实战实验室', en: 'The lab ships' },
    items: [
      { zh: '上下文预算、成本估算、形态决策、工具体检四个交互实验上线。', en: 'Four interactive labs: context budget, cost, pattern decision, and tool checkup.' },
      { zh: '新增发布前 12 关自检清单，可直接贴进发布模板。', en: 'Added the twelve-gate pre-launch checklist for release templates.' },
    ],
  },
  {
    date: '2026-08',
    version: 'v1.1',
    title: { zh: '全站中英双语与深色模式', en: 'Bilingual and dark mode' },
    items: [
      { zh: '所有章节、图表、清单支持中英切换。', en: 'All chapters, diagrams, and checklists switch between Chinese and English.' },
      { zh: '适配深色阅读与键盘导航，补齐 SVG 图解。', en: 'Dark reading mode, keyboard navigation, and fuller SVG diagrams.' },
    ],
  },
  {
    date: '2026-07',
    version: 'v1.0',
    title: { zh: '十章首发', en: 'Ten chapters, day one' },
    items: [
      { zh: '从心智模型到多 Agent 生产上线的十章完整路径。', en: 'A full path from mental models to multi-agent production.' },
      { zh: '两条学习路线：转型者与生产负责人。', en: 'Two tracks: switchers and production owners.' },
    ],
  },
]
