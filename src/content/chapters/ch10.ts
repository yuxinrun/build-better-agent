import type { Chapter } from '../types'

export const ch10: Chapter = {
  slug: 'multi-agent-production',
  num: '10',
  icon: 'users',
  level: 'production',
  minutes: 20,
  accent: 'coral',
  title: { zh: '多 Agent 与生产上线', en: 'Multi-agent systems and shipping to production' },
  subtitle: {
    zh: '多 Agent 不是银弹，能稳定上线才是。',
    en: 'Multi-agent is not a silver bullet. Shipping reliably is.',
  },
  promise: {
    zh: '先让一个 Agent 稳定工作，再考虑拆成多个；先有护栏，再谈自主。多 Agent 应该解决上下文隔离和权限边界，而不是制造更多不确定性。',
    en: 'Make one agent reliable before splitting into many. Build guardrails before autonomy. Multi-agent should solve context isolation and permission boundaries — not add uncertainty.',
  },
  bullets: [
    { zh: '判断什么时候值得拆多 Agent', en: 'Know when multi-agent is worth it' },
    { zh: '识别 token、调试、状态一致性的隐藏成本', en: 'See the hidden costs: tokens, debugging, state consistency' },
    { zh: '用 12 道上线关卡收尾', en: 'Finish with a 12-gate launch checklist' },
  ],
  sections: [
    {
      id: 'when-multi',
      title: { zh: '什么时候值得多 Agent', en: 'When multi-agent is worth it' },
      blocks: [
        {
          type: 'p',
          zh: '大多数“多 Agent”需求，其实一个 Agent 加几个好工具就能解决。真正值得拆分的理由只有三个：上下文需要隔离（不同角色的资料不应互相污染）、任务可以并行（子任务独立）、权限必须分离（不同 Agent 能碰的数据不同）。',
          en: 'Most “multi-agent” needs are solved by one agent with better tools. Only three reasons justify splitting: context isolation (roles should not pollute each other), parallelism (independent subtasks), and permission separation (different agents may touch different data).',
        },
        {
          type: 'diagram',
          id: 'multi-agent',
          caption: {
            zh: '两种常见拓扑：主管协调（supervisor）与任务交接（handoff）。共同点是明确的协议和停止条件。',
            en: 'Two common topologies: supervisor and handoff. Both need explicit protocols and stop conditions.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '拓扑', en: 'Topology' },
            { zh: '怎么工作', en: 'How it works' },
            { zh: '适合', en: 'Use when' },
          ],
          rows: [
            [
              { zh: '主管-工人', en: 'Supervisor' },
              { zh: '一个主管拆任务、派活、汇总', en: 'A lead splits, delegates, and merges' },
              { zh: '任务可分解，需要统一出口', en: 'Decomposable tasks with one output owner' },
            ],
            [
              { zh: '交接', en: 'Handoff' },
              { zh: '当前 Agent 把控制权交给更合适的 Agent', en: 'The current agent transfers control' },
              { zh: '专家边界清晰，如售前→售后', en: 'Clear specialist boundaries, e.g. sales → support' },
            ],
            [
              { zh: '辩论/评审', en: 'Debate / review' },
              { zh: '多个角色给方案，另一个角色裁决', en: 'Multiple roles propose; a judge decides' },
              { zh: '高风险决策，需要多视角', en: 'High-stakes decisions needing perspectives' },
            ],
            [
              { zh: '群体/蜂群', en: 'Swarm' },
              { zh: 'Agent 之间自由转交，动态协作', en: 'Agents hand off freely and collaborate dynamically' },
              { zh: '探索性强、容错高，少数场景', en: 'Exploratory, high-tolerance, rare' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { zh: '先证明单 Agent 不够', en: 'Prove a single agent is not enough' },
          zh: '多 Agent 会让 token 成本、延迟、调试复杂度成倍上升。没有明确的隔离或并行收益，就不要拆。',
          en: 'Multi-agent multiplies token cost, latency, and debugging complexity. Without clear isolation or parallelism gains, do not split.',
        },
      ],
    },
    {
      id: 'hidden-cost',
      title: { zh: '多 Agent 的隐藏成本', en: 'The hidden costs of multi-agent' },
      blocks: [
        {
          type: 'list',
          zh: [
            'Token 翻倍：每个 Agent 都要自己的系统指令、工具定义和历史。',
            '调试变难：错误可能来自交接协议、共享状态或某个子 Agent。',
            '状态不一致：两个 Agent 同时改同一份数据，谁说了算？',
            '责任边界模糊：最终错误由谁负责？用户该找谁？',
            '停止条件复杂：一个 Agent 停了，其他还在跑，任务算完成吗？',
          ],
          en: [
            'Token multiplication: each agent needs its own instructions, tools, and history.',
            'Harder debugging: failures may come from handoff protocols, shared state, or a sub-agent.',
            'State inconsistency: two agents write the same data — who wins?',
            'Blurred ownership: who is responsible for the final error? who does the user contact?',
            'Complex stopping: one agent stops while others run — is the task done?',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { zh: '把“聊天”换成“契约”', en: 'Replace chat with contracts' },
          zh: 'Agent 之间不要自由对话。定义输入 schema、输出 schema、超时、失败回退和最大轮次。把协作当成 API 设计，而不是群聊。',
          en: 'Do not let agents free-chat. Define input schema, output schema, timeout, fallback, and max turns. Treat collaboration as API design, not group chat.',
        },
        {
          type: 'code',
          lang: 'python',
          title: 'handoff_contract.py',
          code: `from pydantic import BaseModel, Field

class Handoff(BaseModel):
    to: Literal["billing", "logistics", "human"]
    reason: str = Field(max_length=200)
    context_summary: str = Field(max_length=800)
    open_questions: list[str] = Field(default_factory=list)
    must_not_do: list[str] = Field(default_factory=list)
    deadline_s: int = 30

def transfer(state, handoff: Handoff):
    if handoff.to == "human":
        return escalate(state, handoff)
    if state.handoffs >= 3:
        return escalate(state, "交接次数超限，转人工")
    return run_specialist(handoff.to, handoff, state)`,
          note: {
            zh: '交接时传“摘要 + 未决问题 + 禁止事项”，而不是把整段聊天记录甩过去。',
            en: 'Pass a summary, open questions, and prohibitions — not the entire chat log.',
          },
        },
      ],
    },
    {
      id: 'security',
      title: { zh: '安全与权限：自主性的代价', en: 'Security and permissions: the price of autonomy' },
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'alert',
              title: { zh: 'Prompt 注入', en: 'Prompt injection' },
              desc: {
                zh: '网页、文档、工具返回都可能藏指令。把外部内容当数据，不当命令；关键动作二次校验。',
                en: 'Web pages, docs, and tool returns can hide instructions. Treat external content as data, not commands; re-check critical actions.',
              },
            },
            {
              icon: 'shield',
              title: { zh: '最小权限', en: 'Least privilege' },
              desc: {
                zh: '每个工具独立凭证，只授予必要范围。只读 Agent 永远拿不到写权限。',
                en: 'Per-tool credentials with minimal scope. A read-only agent never gets write access.',
              },
            },
            {
              icon: 'terminal',
              title: { zh: '沙箱执行', en: 'Sandboxed execution' },
              desc: {
                zh: '代码执行、浏览器操作放在隔离环境，限制网络、文件和时间。',
                en: 'Run code and browsers in isolated environments with network, file, and time limits.',
              },
            },
            {
              icon: 'eye',
              title: { zh: '人工确认', en: 'Human approval' },
              desc: {
                zh: '不可逆、高金额、对外发布的操作，必须有人点头，并记录批准人。',
                en: 'Irreversible, high-value, or public actions need a human yes — and a record of who approved.',
              },
            },
            {
              icon: 'trash',
              title: { zh: '数据防外泄', en: 'Data exfiltration' },
              desc: {
                zh: '限制工具能把哪些数据发往哪些域名。日志、缓存同样要脱敏。',
                en: 'Limit which data can go to which domains. Redact logs and caches too.',
              },
            },
            {
              icon: 'activity',
              title: { zh: '审计与告警', en: 'Audit and alert' },
              desc: {
                zh: '记录谁在何时让 Agent 做了什么。异常频率、越权尝试要实时告警。',
                en: 'Record who made the agent do what, when. Alert on abnormal frequency and privilege attempts.',
              },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { zh: '把 Agent 当“新员工”，不是“神”', en: 'Treat the agent like a new hire, not a god' },
          zh: '新员工不会第一天就有生产库写权限。Agent 也一样：先只读、再草稿、再小范围写、最后才自主。',
          en: 'A new hire does not get prod write access on day one. Neither should an agent: read-only, then drafts, then limited writes, then autonomy.',
        },
      ],
    },
    {
      id: 'twelve-gates',
      title: { zh: '上线前的 12 道关', en: 'The 12 gates before launch' },
      blocks: [
        {
          type: 'p',
          zh: '这份清单来自前面九章。每一关都不是形式主义：过不了，就意味着某个深夜你会被叫起来。建议把它贴进发布模板，逐项打勾。',
          en: 'This checklist comes from the previous nine chapters. Each gate is practical: miss it and you will be paged some night. Put it in your release template and check every box.',
        },
        {
          type: 'checklist',
          title: { zh: '上线 12 关', en: '12 launch gates' },
          items: [
            { zh: '用一句话说清 Agent 的职责边界', en: 'The agent’s responsibility boundary fits in one sentence' },
            { zh: '失败时用户能看到可理解的下一步', en: 'On failure, users see an understandable next step' },
            { zh: '每个工具都有超时、重试、幂等与最小权限', en: 'Every tool has timeout, retry, idempotency, and least privilege' },
            { zh: '写操作与不可逆动作有确认环节', en: 'Writes and irreversible actions require confirmation' },
            { zh: '有最大步数、token 与金额预算', en: 'Max steps, token, and spend budgets exist' },
            { zh: '完整 trace 可回放，敏感信息已脱敏', en: 'Full traces replay with PII redacted' },
            { zh: '有 ≥30 条真实评测用例并接入 CI', en: '30+ real eval cases run in CI' },
            { zh: '关键错误与安全项为一票否决', en: 'Critical errors and safety are veto gates' },
            { zh: '上下文有分层、上限与压缩策略', en: 'Context has layers, caps, and compression' },
            { zh: '模型、Prompt、工具版本可灰度可回滚', en: 'Model, prompt, and tool versions canary and roll back' },
            { zh: '有人工接管与全局停止开关', en: 'Human takeover and a global kill switch exist' },
            { zh: '有明确的 bad case 复盘与迭代机制', en: 'A bad-case review and iteration loop is in place' },
          ],
        },
        {
          type: 'steps',
          items: [
            {
              title: { zh: '第 1 周：只读辅助', en: 'Week 1: read-only assistant' },
              desc: {
                zh: 'Agent 只查不写，输出建议，由人执行。收集真实输入和失败模式。',
                en: 'Agent reads only, suggests, and humans act. Collect real inputs and failure modes.',
              },
            },
            {
              title: { zh: '第 2-3 周：草稿模式', en: 'Weeks 2–3: draft mode' },
              desc: {
                zh: 'Agent 生成草稿或预填表单，人一键确认。开始积累评测集和 trace。',
                en: 'Agent drafts or pre-fills forms; a human confirms. Build eval sets and traces.',
              },
            },
            {
              title: { zh: '第 4 周：有限写入', en: 'Week 4: limited writes' },
              desc: {
                zh: '开放低风险、可逆的写操作，设金额与频率上限，灰度 5% 流量。',
                en: 'Enable low-risk reversible writes with caps and a 5% canary.',
              },
            },
            {
              title: { zh: '之后：逐级放权', en: 'After: earn autonomy' },
              desc: {
                zh: '只有评测、监控、回滚都稳定后，才提升自主性级别。每一级都重新过 12 关。',
                en: 'Raise autonomy only after evals, monitoring, and rollback are stable. Re-run the 12 gates at each level.',
              },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'idea',
          title: { zh: '最后一句', en: 'One last thing' },
          zh: '更好的 Agent，不是更聪明的模型堆出来的，而是一个个具体问题的工程解法堆出来的。少一点魔法，多一点 trace、eval 和护栏。',
          en: 'Better agents are not built from smarter models alone. They are built from engineering solutions to specific problems. Less magic; more traces, evals, and guardrails.',
        },
      ],
    },
  ],
}
