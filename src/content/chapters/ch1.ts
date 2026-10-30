import type { Chapter } from '../types'

export const ch1: Chapter = {
  slug: 'mental-model',
  num: '01',
  icon: 'loop',
  level: 'starter',
  minutes: 12,
  accent: 'teal',
  title: { zh: '心智模型：Agent 到底是什么', en: 'The mental model: what an agent really is' },
  subtitle: {
    zh: '模型、上下文、工具和循环——拆掉玄学的外壳。',
    en: 'Model, context, tools, loop. Strip away the mystique.',
  },
  promise: {
    zh: 'Agent 不是更长的 Prompt，也不是会聊天的程序。它是一个让 LLM 在循环里调用工具、观察结果、继续决策的系统。',
    en: 'An agent is not a longer prompt or a chatty program. It is a system where an LLM calls tools, observes results, and decides again — in a loop.',
  },
  bullets: [
    { zh: '分清 Chatbot、Workflow 和 Agent 的边界', en: 'Tell chatbots, workflows, and agents apart' },
    { zh: '画出你自己的 Agent Loop', en: 'Draw your own agent loop' },
    { zh: '判断什么场景根本不需要 Agent', en: 'Know when you do not need an agent at all' },
  ],
  sections: [
    {
      id: 'from-chatbot',
      title: { zh: '从聊天机器人到智能体', en: 'From chatbot to agent' },
      blocks: [
        {
          type: 'p',
          zh: '传统程序由开发者写死每一步：先查数据库，再判断，再发邮件。LLM 应用一开始也只是问答：你问，它答。Agent 多出来的关键东西只有一件——模型可以自己决定下一步做什么，并通过工具改变外部世界。',
          en: 'Classic programs have every step written by a developer. Early LLM apps were just Q&A: you ask, it answers. What an agent adds is one crucial thing — the model decides the next step itself, and changes the outside world through tools.',
        },
        {
          type: 'table',
          head: [
            { zh: '形态', en: 'Form' },
            { zh: '谁决定下一步', en: 'Who decides next' },
            { zh: '典型例子', en: 'Example' },
            { zh: '适合场景', en: 'Best for' },
          ],
          rows: [
            [
              { zh: 'Chatbot', en: 'Chatbot' },
              { zh: '用户', en: 'The user' },
              { zh: '客服问答、文档问答', en: 'Support Q&A, doc Q&A' },
              { zh: '只读、单轮、低风险', en: 'Read-only, one-shot, low risk' },
            ],
            [
              { zh: 'Workflow', en: 'Workflow' },
              { zh: '开发者', en: 'The developer' },
              { zh: '固定三步的审核流水线', en: 'A fixed 3-step review pipeline' },
              { zh: '步骤稳定、需要审计', en: 'Stable steps, auditable' },
            ],
            [
              { zh: 'Agent', en: 'Agent' },
              { zh: '模型 + 代码护栏', en: 'The model + code guardrails' },
              { zh: '定位线上故障、处理退款', en: 'Debugging prod, handling refunds' },
              { zh: '路径开放、工具丰富、可试错', en: 'Open paths, rich tools, tolerable errors' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { zh: '一句话记牢', en: 'Remember this' },
          zh: '模型是大脑，不是整个系统。真正让 Agent 可用的，是上下文、工具、状态和护栏共同组成的“身体”。',
          en: 'The model is the brain, not the whole system. Context, tools, state, and guardrails form the body that makes the brain useful.',
        },
      ],
    },
    {
      id: 'four-parts',
      title: { zh: '一个循环，四个零件', en: 'One loop, four parts' },
      blocks: [
        {
          type: 'p',
          zh: '把 Agent 想成一颗心脏在跳动：模型每跳一次，就做一次“思考 → 行动 → 观察”，直到任务完成或触发停止条件。它不需要一步到位，它需要每一步都基于上一步的真实结果。',
          en: 'Think of an agent as a heartbeat: on every beat it does “think → act → observe” until the task is done or a stop condition fires. It does not need to be right in one shot; it needs each step to be grounded in the previous result.',
        },
        {
          type: 'cards',
          items: [
            {
              icon: 'brain',
              title: { zh: '模型 · 大脑', en: 'Model · the brain' },
              desc: {
                zh: '负责理解任务、选择工具、组织答案。它很会推理，但不知道你公司的隐藏规则。',
                en: 'Understands the task, picks tools, writes the answer. Great at reasoning, blind to your company’s hidden rules.',
              },
            },
            {
              icon: 'layers',
              title: { zh: '上下文 · 工作记忆', en: 'Context · working memory' },
              desc: {
                zh: '模型这一秒能看到的全部信息：指令、历史、资料、工具返回。它决定了模型“此刻聪不聪明”。',
                en: 'Everything the model can see right now: instructions, history, documents, tool output. It determines how smart the model looks in this moment.',
              },
            },
            {
              icon: 'wrench',
              title: { zh: '工具 · 手脚', en: 'Tools · hands and feet' },
              desc: {
                zh: '搜索、查库、发消息、跑代码。工具让模型从“会说”变成“能做”，也把风险带进了系统。',
                en: 'Search, query, send, execute. Tools turn “can talk” into “can do” — and bring real risk into the system.',
              },
            },
            {
              icon: 'pulse',
              title: { zh: '循环 · 心跳', en: 'Loop · the heartbeat' },
              desc: {
                zh: '观察结果、修正计划、继续行动。没有循环，它只是一次函数调用；有了循环，它才叫 Agent。',
                en: 'Observe, revise, continue. Without the loop it is a function call; with it, it becomes an agent.',
              },
            },
          ],
        },
        {
          type: 'diagram',
          id: 'agent-loop',
          caption: {
            zh: 'Agent Loop：上下文喂给模型，模型选择工具，工具改变环境，结果再回到上下文。',
            en: 'The agent loop: context feeds the model, the model calls tools, tools change the world, results return to context.',
          },
        },
        {
          type: 'p',
          zh: '这个模式最早被总结为 ReAct（Reason + Act）：先写下推理，再采取行动，再读取观察结果。今天的框架五花八门，但内核几乎都是这个循环的变体。你完全可以不用框架，先手写一遍。',
          en: 'This pattern was popularized as ReAct (Reason + Act): write a thought, take an action, read the observation. Today’s frameworks differ in packaging, but the core is almost always this loop. You can write it by hand first — no framework required.',
        },
      ],
    },
    {
      id: 'when-not',
      title: { zh: '什么时候不该用 Agent', en: 'When not to use an agent' },
      blocks: [
        {
          type: 'p',
          zh: '如果步骤可以枚举、错误代价高、结果必须可审计，先写 Workflow。Agent 适合的是另一类问题：输入开放、路径不确定、工具很多、允许试错。用错形态，复杂度会成倍增长。',
          en: 'If steps can be enumerated, mistakes are expensive, and results must be auditable, write a workflow. Agents fit a different problem: open input, uncertain paths, many tools, tolerable errors. Pick the wrong form and complexity multiplies.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { zh: '别为了用 Agent 而用 Agent', en: 'Do not use an agent for its own sake' },
          zh: '最贵的不是 token，是你半夜被叫起来修一个“会自己决定下一步”的系统。自主性要一点点买，不能一次性梭哈。',
          en: 'The expensive part is not tokens. It is being paged at 2 a.m. to fix a system that decides its own next step. Buy autonomy incrementally, never all at once.',
        },
        {
          type: 'list',
          zh: [
            '步骤固定、每次一样 → 用 Workflow，别让模型重新发明流程。',
            '只需要分类、抽取、改写 → 单次 LLM 调用 + 结构化输出就够了。',
            '操作不可逆（转账、删库、发公告）→ 必须有人工确认，Agent 只能做草稿。',
            '没有可验证的成功标准 → 先定义评估，再谈自主。',
          ],
          en: [
            'Fixed, repeatable steps → use a workflow; do not make the model reinvent the process.',
            'Classification, extraction, rewriting → a single LLM call with structured output is enough.',
            'Irreversible actions (payments, deletions, announcements) → require human approval; the agent drafts only.',
            'No verifiable success criteria → define evaluation before autonomy.',
          ],
        },
      ],
    },
    {
      id: 'minimal-loop',
      title: { zh: '最小可用循环', en: 'The smallest useful loop' },
      blocks: [
        {
          type: 'p',
          zh: '下面这段代码没有框架、没有抽象，只有循环和工具。读懂它，你就读懂了大多数 Agent 框架在做什么。重点看三个停止条件：模型不再调用工具、达到步数上限、超时或超预算。',
          en: 'No framework, no abstractions — just a loop and tools. Understand this and you understand what most agent frameworks actually do. Watch the three stop conditions: no more tool calls, max steps, and timeout or budget.',
        },
        {
          type: 'code',
          lang: 'python',
          title: 'agent_loop.py',
          code: `import json, time
from openai import OpenAI

client = OpenAI()

def get_weather(city: str) -> dict:
    # 换成你公司的真实 API
    return {"city": city, "condition": "sunny", "temp_c": 22}

TOOLS = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "查询城市当前天气。用户问是否适合户外活动时使用。",
        "parameters": {
            "type": "object",
            "properties": {"city": {"type": "string", "description": "城市名"}},
            "required": ["city"],
        },
    },
}]

def run(task: str, max_steps: int = 6) -> str:
    messages = [
        {"role": "system", "content": "你是一个谨慎的助手。需要实时信息时必须调用工具。"},
        {"role": "user", "content": task},
    ]
    started = time.time()

    for step in range(max_steps):
        if time.time() - started > 30:          # 停止条件：超时
            return "任务超时，已停止。"

        resp = client.chat.completions.create(
            model="gpt-4.1-mini", messages=messages, tools=TOOLS
        )
        msg = resp.choices[0].message
        messages.append(msg)

        if not msg.tool_calls:                   # 停止条件：不再调用工具
            return msg.content or ""

        for call in msg.tool_calls:
            args = json.loads(call.function.arguments)
            try:
                result = get_weather(**args)
            except Exception as e:
                result = {"ok": False, "error": str(e), "retryable": False}
            messages.append({
                "role": "tool",
                "tool_call_id": call.id,
                "content": json.dumps(result, ensure_ascii=False),
            })

    return "达到最大步数，已停止。"            # 停止条件：步数上限`,
          note: {
            zh: '示例使用 OpenAI SDK，但循环结构与厂商无关。生产代码还需要日志、重试、权限和密钥管理。',
            en: 'The example uses the OpenAI SDK, but the loop is vendor-agnostic. Production code also needs logging, retries, permissions, and secret management.',
          },
        },
        {
          type: 'checklist',
          title: { zh: '跑通之后，检查这 5 件事', en: 'After it runs, check these five things' },
          items: [
            { zh: '模型不调用工具时，循环能干净退出', en: 'The loop exits cleanly when the model stops calling tools' },
            { zh: '工具有超时，失败会以可读结构返回', en: 'Tools have timeouts and return readable failures' },
            { zh: '有最大步数和总预算，不会无限烧钱', en: 'There is a max step count and budget cap' },
            { zh: '每一步的输入、输出、工具参数都进了日志', en: 'Every step’s input, output, and tool arguments are logged' },
            { zh: '成功标准写下来了，而不是“看起来还行”', en: 'Success criteria are written down, not “looks fine”' },
          ],
        },
        {
          type: 'callout',
          tone: 'idea',
          title: { zh: '本章练习', en: 'Exercise' },
          zh: '把 get_weather 换成一个你公司真实的查询 API，并给它加上“查不到时返回可行动建议”的行为。只改工具，不改循环。',
          en: 'Replace get_weather with a real internal API, and make it return an actionable suggestion when nothing is found. Change only the tool, not the loop.',
        },
      ],
    },
  ],
}
