import type { Chapter } from '../types'

export const ch6: Chapter = {
  slug: 'workflow-autonomy',
  num: '06',
  icon: 'flow',
  level: 'builder',
  minutes: 16,
  accent: 'coral',
  title: { zh: '工作流与自主性：该放手时再放手', en: 'Workflows and autonomy: let go only when ready' },
  subtitle: {
    zh: '大多数生产系统不是“全自主 Agent”，而是带智能节点的可控工作流。',
    en: 'Most production systems are controlled workflows with intelligent nodes — not fully autonomous agents.',
  },
  promise: {
    zh: '自主性不是开关，而是一级一级买的。每升一级，都需要对应的评估和护栏。',
    en: 'Autonomy is not a switch. You buy it one level at a time, and each level needs its own evals and guardrails.',
  },
  bullets: [
    { zh: '用自主性阶梯定位你的系统', en: 'Locate your system on the autonomy ladder' },
    { zh: '掌握 5 种经典工作流模式', en: 'Learn five classic workflow patterns' },
    { zh: '用状态机和人工审批控制失控风险', en: 'Control risk with state machines and approvals' },
  ],
  sections: [
    {
      id: 'ladder',
      title: { zh: '自主性不是二选一', en: 'Autonomy is not binary' },
      blocks: [
        {
          type: 'p',
          zh: '很多团队在“全写死”和“全自主”之间反复横跳。其实中间有很长的光谱：固定流程、LLM 节点、模型路由、有边界的 Agent、开放式 Agent。多数业务的最佳点，在中间。',
          en: 'Teams swing between “hardcode everything” and “let the agent decide everything.” There is a long spectrum between them: fixed flow, LLM nodes, model routing, bounded agent, open agent. Most businesses are best served in the middle.',
        },
        {
          type: 'diagram',
          id: 'autonomy-ladder',
          caption: {
            zh: '自主性阶梯：每升一级，都需要更多评测、权限控制和可观测性。',
            en: 'The autonomy ladder: every level up demands more evals, permissions, and observability.',
          },
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { zh: '升级前先过三关', en: 'Three gates before moving up' },
          zh: '有评测集吗？失败可逆吗？有人能在一分钟内叫停吗？三关不过，就留在当前级别，把流程和工具打磨好。',
          en: 'Do you have an eval set? Are failures reversible? Can someone stop it within a minute? If not, stay at the current level and polish the flow and tools.',
        },
      ],
    },
    {
      id: 'patterns',
      title: { zh: '五种经典工作流模式', en: 'Five classic workflow patterns' },
      blocks: [
        {
          type: 'p',
          zh: 'Anthropic 在《Building effective agents》里总结了五种模式。它们不是“过时的东西”，恰恰相反：大多数稳定上线的系统，都是这些模式的组合。先画流程，再决定哪一步交给模型。',
          en: 'Anthropic’s “Building effective agents” names five patterns. They are not outdated — quite the opposite. Most systems that ship reliably are combinations of them. Draw the flow first, then decide which step goes to the model.',
        },
        {
          type: 'diagram',
          id: 'patterns',
          caption: {
            zh: '点击切换五种模式：提示链、路由、并行、编排者-工人、评估-优化。',
            en: 'Switch between five patterns: chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer.',
          },
        },
        {
          type: 'table',
          head: [
            { zh: '模式', en: 'Pattern' },
            { zh: '适合', en: 'Use when' },
            { zh: '别用', en: 'Avoid when' },
          ],
          rows: [
            [
              { zh: '提示链', en: 'Prompt chaining' },
              { zh: '步骤可拆分，前一步输出是后一步输入', en: 'Steps are separable; output feeds the next' },
              { zh: '步骤之间需要频繁回头修改', en: 'Steps need frequent backtracking' },
            ],
            [
              { zh: '路由', en: 'Routing' },
              { zh: '输入类型有限且可分类', en: 'Input types are finite and classifiable' },
              { zh: '类别边界模糊、经常混合', en: 'Categories blur and mix often' },
            ],
            [
              { zh: '并行', en: 'Parallelization' },
              { zh: '子任务独立，或需要多视角投票', en: 'Subtasks are independent or need voting' },
              { zh: '子任务强依赖、共享状态', en: 'Subtasks depend heavily or share state' },
            ],
            [
              { zh: '编排者-工人', en: 'Orchestrator-workers' },
              { zh: '任务可动态拆成未知数量的子任务', en: 'Task splits into an unknown number of subtasks' },
              { zh: '子任务数量固定，直接写死即可', en: 'Subtask count is fixed; just hardcode it' },
            ],
            [
              { zh: '评估-优化', en: 'Evaluator-optimizer' },
              { zh: '有明确评价标准，且迭代能变好', en: 'Clear criteria exist and iteration improves output' },
              { zh: '没有可靠评估器，或迭代成本过高', en: 'No reliable evaluator, or iteration is too costly' },
            ],
          ],
        },
      ],
    },
    {
      id: 'state-machine',
      title: { zh: '把工作流写成状态机', en: 'Write the workflow as a state machine' },
      blocks: [
        {
          type: 'p',
          zh: '状态机的好处是“看得见”：当前在哪一步、下一步能去哪、失败了回哪、哪里需要人。把模型调用放进节点里，而不是让模型掌管整张图。LangGraph 这类框架的核心价值，也在这里。',
          en: 'State machines are visible: where you are, where you can go, where failures return, where humans step in. Put model calls inside nodes instead of letting the model own the graph. This is the core value of frameworks like LangGraph.',
        },
        {
          type: 'code',
          lang: 'python',
          title: 'expense_graph.py',
          code: `from typing import Literal
from langgraph.graph import StateGraph, END

class State(dict):
    task: str
    claim_id: str | None
    decision: str | None
    attempts: int

def classify(state: State):
    # 小模型只做分类，便宜且可控
    state["intent"] = classify_intent(state["task"])
    return state

def lookup(state: State):
    state["claim"] = get_claim(state["claim_id"])
    return state

def draft(state: State):
    state["reply"] = llm_reply(state["claim"])
    return state

def needs_human(state: State) -> Literal["human", "send"]:
    return "human" if state["claim"]["amount"] > 5000 else "send"

def human_review(state: State):
    state["reply"] = wait_for_approval(state["reply"])
    return state

graph = StateGraph(State)
graph.add_node("classify", classify)
graph.add_node("lookup", lookup)
graph.add_node("draft", draft)
graph.add_node("human", human_review)
graph.set_entry_point("classify")
graph.add_edge("classify", "lookup")
graph.add_edge("lookup", "draft")
graph.add_conditional_edges("draft", needs_human, {"human": "human", "send": END})
graph.add_edge("human", END)
app = graph.compile(checkpointer=memory)  # 可暂停、恢复、回放`,
          note: {
            zh: 'checkpoint 让长任务可以暂停、恢复和回放；人工审批也只是一个节点，不需要另造一套系统。',
            en: 'Checkpoints let long tasks pause, resume, and replay. Human approval is just another node, not a separate system.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { zh: '别让模型画整张图', en: 'Do not let the model draw the whole graph' },
          zh: '“让 Agent 自己规划所有步骤”听起来很酷，但调试时你会不知道它为什么走了那条路。把控制流留在代码里，把判断留在模型里。',
          en: '“Let the agent plan every step” sounds cool until you cannot tell why it took a path. Keep control flow in code; keep judgments in the model.',
        },
      ],
    },
    {
      id: 'choose',
      title: { zh: '怎么选：一张决策表', en: 'How to choose: a decision table' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '场景', en: 'Scenario' },
            { zh: '推荐形态', en: 'Recommended' },
            { zh: '原因', en: 'Why' },
          ],
          rows: [
            [
              { zh: '周报生成、合同摘要', en: 'Weekly reports, contract summaries' },
              { zh: '提示链 / 单次调用', en: 'Prompt chaining / single call' },
              { zh: '步骤固定，输出可校验', en: 'Fixed steps, checkable output' },
            ],
            [
              { zh: '客服工单分流', en: 'Support ticket triage' },
              { zh: '路由 + 专用工作流', en: 'Routing + specialized flows' },
              { zh: '类别有限，不同类别流程不同', en: 'Finite categories with different flows' },
            ],
            [
              { zh: '多份简历初筛', en: 'Screening many resumes' },
              { zh: '并行 + 评估器', en: 'Parallelization + evaluator' },
              { zh: '子任务独立，可投票', en: 'Independent subtasks, votable' },
            ],
            [
              { zh: '线上故障定位', en: 'Production incident triage' },
              { zh: '有边界的 Agent', en: 'Bounded agent' },
              { zh: '路径开放、工具多、可试错', en: 'Open paths, many tools, tolerable errors' },
            ],
            [
              { zh: '退款、删数据、发公告', en: 'Refunds, deletions, announcements' },
              { zh: 'Agent 草稿 + 人工确认', en: 'Agent draft + human approval' },
              { zh: '不可逆，必须有人负责', en: 'Irreversible; a human must own it' },
            ],
          ],
        },
        {
          type: 'checklist',
          title: { zh: '工作流设计自查', en: 'Workflow design self-check' },
          items: [
            { zh: '画出了状态图，标清每个节点由谁决策', en: 'A state diagram marks who decides at each node' },
            { zh: '不可逆操作前有人工确认节点', en: 'Irreversible actions have a human approval node' },
            { zh: '每个节点有超时、重试和失败出口', en: 'Every node has timeout, retry, and failure exit' },
            { zh: '长任务有 checkpoint，可暂停恢复', en: 'Long tasks checkpoint and can pause/resume' },
            { zh: '自主性级别与评测、护栏匹配', en: 'Autonomy level matches evals and guardrails' },
          ],
        },
        {
          type: 'callout',
          tone: 'idea',
          title: { zh: '本章练习', en: 'Exercise' },
          zh: '画出你现在系统的状态图，用三种颜色标出：代码决定、模型决定、人决定。哪个节点颜色最多，风险就在哪里。',
          en: 'Draw your system’s state diagram and color nodes by who decides: code, model, or human. The most mixed node is where the risk is.',
        },
      ],
    },
  ],
}
