import type { Chapter } from '../types'

export const ch2: Chapter = {
  slug: 'first-agent',
  num: '02',
  icon: 'terminal',
  level: 'starter',
  minutes: 18,
  accent: 'coral',
  title: { zh: '从零写一个最小 Agent', en: 'Build your first agent from zero' },
  subtitle: {
    zh: '不靠框架，先跑通一个能用的循环。',
    en: 'No framework. Just a loop that works.',
  },
  promise: {
    zh: '一个窄任务、三个工具、五十行代码，足够让你理解 90% 的 Agent 框架到底在替你做什么。',
    en: 'One narrow task, three tools, fifty lines. That is enough to understand what 90% of agent frameworks do for you.',
  },
  bullets: [
    { zh: '选一个“窄而脏”的真实任务', en: 'Pick a narrow, messy, real task' },
    { zh: '设计工具的输入输出边界', en: 'Define clean tool boundaries' },
    { zh: '让日志和停止条件从第一天就在', en: 'Have logs and stop conditions from day one' },
  ],
  sections: [
    {
      id: 'pick-task',
      title: { zh: '先选一个“窄而脏”的任务', en: 'Start with a narrow, messy task' },
      blocks: [
        {
          type: 'p',
          zh: '新手最容易犯的错，是一上来做“万能助理”。它会查资料、写代码、发邮件、订机票——然后你无法判断它哪一步做错了。请选一个你非常熟悉的内部任务，比如“根据订单号解释退款为什么还没到账”，或者“读取一条报警日志，定位最近一次部署”。',
          en: 'The classic beginner mistake is building a universal assistant that researches, codes, emails, and books flights — and then you cannot tell which step broke. Pick an internal task you know deeply, such as “explain why this refund has not arrived” or “read an alert and identify the latest deploy.”',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { zh: '好任务的三个特征', en: 'Three traits of a good first task' },
          zh: '输入开放（不能只靠固定表单）、步骤不固定（需要根据中间结果调整）、结果可验证（对错你能一眼判断）。三条全中，就是理想的练手任务。',
          en: 'Open input (not just a fixed form), variable steps (must adapt to intermediate results), and verifiable output (you can judge correctness). Hit all three and you have an ideal practice task.',
        },
        {
          type: 'p',
          zh: '别急着接生产系统。先用只读接口，或者一份脱敏数据。你的目标是学习循环和工具设计，不是第一周就上线。',
          en: 'Do not wire it to production yet. Use read-only APIs or anonymized data. The goal is learning loops and tool design, not shipping in week one.',
        },
      ],
    },
    {
      id: 'four-files',
      title: { zh: '四个文件就够', en: 'Four files are enough' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { zh: 'task.md：任务说明书', en: 'task.md: the task spec' },
              desc: {
                zh: '写清目标、输入、成功标准、禁止事项。这份文档以后会变成 system prompt 和评测用例。',
                en: 'Goal, input, success criteria, and forbidden actions. This later becomes your system prompt and eval cases.',
              },
            },
            {
              title: { zh: 'tools.py：工具层', en: 'tools.py: the tool layer' },
              desc: {
                zh: '每个函数只做一件事，返回小而结构化的数据。工具层是你唯一允许碰外部系统的地方。',
                en: 'One job per function, small structured returns. This is the only layer allowed to touch external systems.',
              },
            },
            {
              title: { zh: 'agent.py：循环', en: 'agent.py: the loop' },
              desc: {
                zh: '组装上下文、调用模型、执行工具、判断停止。保持薄，不要把业务逻辑塞进来。',
                en: 'Assemble context, call the model, execute tools, decide when to stop. Keep it thin; no business logic here.',
              },
            },
            {
              title: { zh: 'trace.jsonl：运行记录', en: 'trace.jsonl: the run record' },
              desc: {
                zh: '每一轮记一条：模型输出、工具名、参数、结果、耗时。没有它，你只能靠猜。',
                en: 'One line per turn: model output, tool name, arguments, result, latency. Without it, you are guessing.',
              },
            },
          ],
        },
        {
          type: 'p',
          zh: '框架会换，模型会换，这四样东西不会。先把它们写出来，再决定要不要引入 LangGraph、OpenAI Agents SDK 或其他编排工具。',
          en: 'Frameworks change, models change, these four things do not. Write them first, then decide whether you need LangGraph, the OpenAI Agents SDK, or another orchestrator.',
        },
      ],
    },
    {
      id: 'write-it',
      title: { zh: '写出来：一个报销查询 Agent', en: 'Write it: an expense-status agent' },
      blocks: [
        {
          type: 'p',
          zh: '任务：员工问“我的报销到哪一步了”，Agent 根据邮箱或单号查询状态，并用一句话解释卡在哪里。工具只有三个：按邮箱查单、按单号查详情、查审批规则。',
          en: 'Task: an employee asks “where is my expense reimbursement?” The agent looks it up by email or claim ID and explains what is blocking it in one sentence. Three tools only: find by email, get details by ID, fetch approval rules.',
        },
        {
          type: 'code',
          lang: 'python',
          title: 'expense_agent.py',
          code: `import json, os, time, logging
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
log = logging.getLogger("agent")

def find_claims(email: str) -> dict: ...
def get_claim(claim_id: str) -> dict: ...
def get_rules(stage: str) -> dict: ...

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "find_claims",
            "description": "按员工邮箱查询最近 5 条报销单。用户只给了邮箱时使用。",
            "parameters": {
                "type": "object",
                "properties": {"email": {"type": "string"}},
                "required": ["email"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_claim",
            "description": "按报销单号查询状态、金额、当前审批人和卡点原因。",
            "parameters": {
                "type": "object",
                "properties": {"claim_id": {"type": "string"}},
                "required": ["claim_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_rules",
            "description": "查询某个审批阶段的 SLA 与所需材料，用于解释为什么卡住。",
            "parameters": {
                "type": "object",
                "properties": {"stage": {"type": "string"}},
                "required": ["stage"],
            },
        },
    },
]

HANDLERS = {
    "find_claims": find_claims,
    "get_claim": get_claim,
    "get_rules": get_rules,
}

SYSTEM = """你是公司的报销进度助手。
规则：
1. 必须先查到真实单据再回答，禁止猜测。
2. 用户只给邮箱时，先 find_claims，再决定是否需要 get_claim。
3. 回答控制在 3 句话内：当前状态、卡点、下一步。
4. 查不到时，明确说没找到，并建议联系财务邮箱。"""

def run(task: str, max_steps: int = 6) -> str:
    messages = [{"role": "system", "content": SYSTEM},
                {"role": "user", "content": task}]
    started = time.time()

    for step in range(max_steps):
        if time.time() - started > 45:
            return "查询超时，请稍后再试或联系财务。"

        resp = client.chat.completions.create(
            model="gpt-4.1-mini", messages=messages,
            tools=TOOLS, tool_choice="auto", temperature=0,
        )
        msg = resp.choices[0].message
        messages.append(msg)

        log.info(json.dumps({
            "step": step, "content": msg.content,
            "tool_calls": [c.function.name for c in (msg.tool_calls or [])],
        }, ensure_ascii=False))

        if not msg.tool_calls:
            return msg.content or ""

        for call in msg.tool_calls:
            name = call.function.name
            try:
                args = json.loads(call.function.arguments)
                result = HANDLERS[name](**args)
            except Exception as e:
                result = {"ok": False, "error": str(e), "retryable": False}
            messages.append({
                "role": "tool", "tool_call_id": call.id,
                "content": json.dumps(result, ensure_ascii=False)[:4000],
            })

    return "这个问题有点复杂，建议直接联系财务同事。"`,
          note: {
            zh: '生产环境请加上鉴权、PII 脱敏、数据库连接池和真正的 trace 系统。这里刻意保持最小。',
            en: 'For production, add auth, PII redaction, connection pooling, and real tracing. This is deliberately minimal.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { zh: '两个细节，决定它能不能用', en: 'Two details decide if it works' },
          zh: '第一，工具返回值截断到 4000 字符——数据库字段可能巨大，别让一次查询挤爆上下文。第二，temperature 设为 0，内部流程类 Agent 不需要“创意”。',
          en: 'First, truncate tool output to 4,000 characters — database fields can be huge; do not let one query blow up context. Second, set temperature to 0; internal process agents do not need creativity.',
        },
      ],
    },
    {
      id: 'after-first-run',
      title: { zh: '第一次跑通之后，先别加功能', en: 'After the first run, resist adding features' },
      blocks: [
        {
          type: 'p',
          zh: '把 trace 打印出来，逐轮回答四个问题：模型为什么选这个工具？参数对不对？工具失败时它看懂了吗？有没有重复调用同一步？这四个问题的答案，比新增十个工具更有价值。',
          en: 'Print the trace and answer four questions per turn: why did it pick that tool? were the arguments right? did it understand failures? did it repeat a step? These answers are worth more than ten new tools.',
        },
        {
          type: 'diagram',
          id: 'anatomy',
          caption: {
            zh: '一个可用的最小 Agent：任务说明、工具层、循环、trace、护栏，缺一不可。',
            en: 'A usable minimal agent: task spec, tools, loop, trace, guardrails. Miss one and it is a demo.',
          },
        },
        {
          type: 'checklist',
          title: { zh: '最小 Agent 验收清单', en: 'Minimum viable agent checklist' },
          items: [
            { zh: '3 个工具都能被正确触发，且不会互相抢活', en: 'All three tools trigger correctly and do not overlap' },
            { zh: '查不到数据时，Agent 会承认而不是编造', en: 'When data is missing, it admits it instead of inventing' },
            { zh: '每次运行都有 trace，能复盘每一步', en: 'Every run has a trace you can replay' },
            { zh: '超时、最大步数、工具异常都有兜底', en: 'Timeout, max steps, and tool errors all have fallbacks' },
            { zh: '回答格式稳定，便于人工抽检', en: 'Output format is stable enough for spot checks' },
          ],
        },
        {
          type: 'callout',
          tone: 'idea',
          title: { zh: '本章练习', en: 'Exercise' },
          zh: '给这个 Agent 加第四个工具“查询报销政策”，但要求它只在用户问“能不能报”时使用。观察工具描述怎么写，模型才会选对。',
          en: 'Add a fourth tool, “look up expense policy,” used only when the user asks “is this reimbursable?” Observe how the description changes tool selection.',
        },
      ],
    },
  ],
}
