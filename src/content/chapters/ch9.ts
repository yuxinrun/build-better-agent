import type { Chapter } from '../types'

export const ch9: Chapter = {
  slug: 'cost-latency',
  num: '09',
  icon: 'coin',
  level: 'production',
  minutes: 14,
  accent: 'lime',
  title: { zh: '成本与延迟：让 Agent 跑得快、花得少', en: 'Cost and latency: fast enough, cheap enough' },
  subtitle: {
    zh: '成本不是月底看账单，而是每一次设计决策的结果。',
    en: 'Cost is not a monthly bill. It is the sum of your design decisions.',
  },
  promise: {
    zh: 'Agent 的成本 ≈ 单步成本 × 平均步数 ×（1 + 重试率）。理解这个乘法，比记住任何单价都重要。',
    en: 'Agent cost ≈ cost per step × average steps × (1 + retry rate). Understanding this multiplication matters more than memorizing prices.',
  },
  bullets: [
    { zh: '建立每次运行的成本模型', en: 'Build a cost model per run' },
    { zh: '用路由、缓存、压缩、早停降本', en: 'Cut cost with routing, caching, compression, early stop' },
    { zh: '用 p95 而不是平均值管理延迟', en: 'Manage latency with p95, not averages' },
  ],
  sections: [
    {
      id: 'cost-model',
      title: { zh: '先把成本算清楚', en: 'Understand the cost model first' },
      blocks: [
        {
          type: 'p',
          zh: '单次聊天只调用一次模型，Agent 会调用 3 到 15 次。每一步都带着不断变长的上下文，还要加上工具调用、重试和失败回滚。成本不是线性增长，而是被步数放大。',
          en: 'A chat calls the model once. An agent calls it 3–15 times, each with a longer context, plus tools, retries, and rollbacks. Cost is not linear; step count multiplies it.',
        },
        {
          type: 'formula',
          label: { zh: '单次运行成本', en: 'Cost per run' },
          formula: 'C = Σ (in_i × p_in + out_i × p_out) + tools + retries',
          note: {
            zh: 'p_in / p_out 是每百万 token 的单价。工具调用费、检索费、沙箱费也要算进去。',
            en: 'p_in / p_out are prices per million tokens. Add tool fees, retrieval, and sandbox costs.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { zh: '先看“每个成功任务”的成本', en: 'Optimize cost per successful task' },
          zh: '单次调用便宜不代表整体便宜。成功率 60% 的便宜模型，可能比成功率 90% 的贵模型更烧钱。',
          en: 'Cheap per call does not mean cheap overall. A cheap model with 60% success can cost more than an expensive one with 90%.',
        },
      ],
    },
    {
      id: 'levers',
      title: { zh: '五个降本杠杆', en: 'Five cost levers' },
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'flow',
              title: { zh: '模型路由', en: 'Model routing' },
              desc: {
                zh: '分类、抽取、格式化交给小模型；只有复杂推理才升级到旗舰模型。按任务分层，不按心情。',
                en: 'Classification, extraction, formatting go to small models; only hard reasoning escalates. Route by task, not mood.',
              },
            },
            {
              icon: 'database',
              title: { zh: 'Prompt 缓存', en: 'Prompt caching' },
              desc: {
                zh: '稳定的系统指令和工具定义放前面，命中缓存后输入成本大幅下降。',
                en: 'Keep stable instructions and tools up front; cache hits cut input cost sharply.',
              },
            },
            {
              icon: 'layers',
              title: { zh: '上下文压缩', en: 'Context compression' },
              desc: {
                zh: '摘要历史、截断工具返回、只检索 3 条。把 8k 上下文降到 3k，往往不影响效果。',
                en: 'Summarize history, truncate tool returns, retrieve only 3 chunks. Cutting 8k to 3k often loses nothing.',
              },
            },
            {
              icon: 'flow',
              title: { zh: '并行与早停', en: 'Parallelism and early stop' },
              desc: {
                zh: '独立子任务并行降低延迟；达到成功标准立刻停止，不要“再多想一步”。',
                en: 'Parallelize independent subtasks; stop as soon as success is reached, not one thought later.',
              },
            },
            {
              icon: 'target',
              title: { zh: '缓存与去重', en: 'Caching and dedupe' },
              desc: {
                zh: '相同查询、相同文档、相同结果可以缓存。注意加 TTL 和用户隔离。',
                en: 'Cache identical queries, documents, and results. Use TTLs and per-user isolation.',
              },
            },
          ],
        },
        {
          type: 'p',
          zh: '别同时优化所有杠杆。先量出成本花在哪里：输入 token、输出 token、工具、重试、还是空转步数。找到最大项，再动手。',
          en: 'Do not pull every lever at once. Measure where cost goes: input, output, tools, retries, or wasted steps. Find the biggest line, then act.',
        },
      ],
    },
    {
      id: 'latency',
      title: { zh: '延迟：用户感受到的是 p95', en: 'Latency: users feel p95' },
      blocks: [
        {
          type: 'p',
          zh: '平均 3 秒听起来不错，但如果有 5% 的请求要 25 秒，用户会觉得系统“经常卡死”。Agent 的延迟由首 token、每一步模型调用、工具调用和重试叠加而成，必须分阶段设预算。',
          en: 'A 3-second average sounds fine, but if 5% of requests take 25 seconds, users feel a system that “often hangs.” Agent latency stacks first-token time, per-step model calls, tools, and retries. Budget each phase.',
        },
        {
          type: 'diagram',
          id: 'latency-budget',
          caption: {
            zh: '一次 12 秒的 Agent 运行：真正用于“思考”的时间可能不到一半。',
            en: 'A 12-second agent run: less than half may be actual thinking.',
          },
        },
        {
          type: 'list',
          zh: [
            '流式输出首 token，让用户知道系统在工作。',
            '工具并行化，尤其是互不依赖的查询。',
            '给每一步设置超时，慢工具直接降级。',
            '长任务改成异步 + 通知，不要让人盯着转圈。',
            '监控 p50 / p95 / p99，按 p95 做产品承诺。',
          ],
          en: [
            'Stream the first token so users know it is working.',
            'Parallelize independent tool calls.',
            'Timeout each step; degrade slow tools.',
            'Make long tasks async with notifications, not spinners.',
            'Monitor p50 / p95 / p99; promise based on p95.',
          ],
        },
      ],
    },
    {
      id: 'measure',
      title: { zh: '算一笔真实的账', en: 'Run the numbers' },
      blocks: [
        {
          type: 'p',
          zh: '假设每天 5,000 次运行，每次 4 步，每步输入 6,000 token、输出 500 token。用你当前模型的单价算一遍，再加上 15% 的重试。你可能会发现，成本主要来自“把整段历史反复送给模型”。',
          en: 'Assume 5,000 runs/day, 4 steps each, 6,000 input and 500 output tokens per step. Price it with your model, then add 15% retries. You may find most cost comes from resending the whole history every step.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: { zh: '去实验室算一算', en: 'Try the lab' },
          zh: '本站“实战实验室”里有成本计算器。把步数和输入 token 调一调，你会直观看到哪个变量最敏感。',
          en: 'The lab has a cost calculator. Move the step count and input tokens to see which variable dominates.',
        },
        {
          type: 'checklist',
          title: { zh: '成本与延迟自查', en: 'Cost and latency self-check' },
          items: [
            { zh: '能算出每次运行和每个成功任务的成本', en: 'Can compute cost per run and per success' },
            { zh: '简单步骤由小模型处理', en: 'Simple steps use a smaller model' },
            { zh: '稳定前缀命中 Prompt 缓存', en: 'Stable prefixes hit prompt cache' },
            { zh: '上下文有压缩策略，不重复送全量历史', en: 'Context is compressed; full history is not resent' },
            { zh: '有最大步数、预算和早停条件', en: 'Max steps, budget, and early stop exist' },
            { zh: '监控 p95 延迟与超时率', en: 'p95 latency and timeout rate are monitored' },
          ],
        },
        {
          type: 'callout',
          tone: 'idea',
          title: { zh: '本章练习', en: 'Exercise' },
          zh: '用实验室计算器算你项目的月度成本，然后只做一个改动：把历史摘要压缩 50%。再算一次，记录节省比例和成功率变化。',
          en: 'Compute your monthly cost in the lab, then make one change: compress history by 50%. Recompute and record savings and success-rate change.',
        },
      ],
    },
  ],
}
