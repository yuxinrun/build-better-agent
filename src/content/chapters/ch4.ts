import type { Chapter } from '../types'

export const ch4: Chapter = {
  slug: 'tool-design',
  num: '04',
  icon: 'wrench',
  level: 'builder',
  minutes: 15,
  accent: 'teal',
  title: { zh: '工具设计：Agent 的手和脚', en: 'Tool design: hands and feet for your agent' },
  subtitle: {
    zh: '工具不是 API 的搬运工，而是给模型看的说明书。',
    en: 'Tools are not API wrappers. They are manuals written for a model.',
  },
  promise: {
    zh: '模型选错工具，90% 不是模型笨，而是命名、描述、参数或返回值出了问题。',
    en: 'When the model picks the wrong tool, 90% of the time it is the name, description, schema, or return value — not the model.',
  },
  bullets: [
    { zh: '写出模型看得懂的工具说明', en: 'Write tool specs a model can understand' },
    { zh: '把错误设计成“下一步提示”', en: 'Design errors as next-step hints' },
    { zh: '给写操作加幂等与确认', en: 'Add idempotency and confirmation to writes' },
  ],
  sections: [
    {
      id: 'model-view',
      title: { zh: '模型眼中的工具长什么样', en: 'What a tool looks like to a model' },
      blocks: [
        {
          type: 'p',
          zh: '模型看不到你的函数体，只能看到四样东西：名字、描述、参数 schema、返回值。它像一个新来的同事，只能靠说明书决定该按哪个按钮。说明书模糊，动作就会离谱。',
          en: 'The model never sees your function body. It sees four things: name, description, parameter schema, and return value. It is a new colleague who can only use the manual to decide which button to press. Vague manual, wild actions.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { zh: '工具描述是 Prompt 的一部分', en: 'The tool description is part of the prompt' },
          zh: '少讲实现细节，多讲：什么时候该用、什么时候不该用、参数代表什么、成功和失败分别返回什么。最好再给一个调用例子。',
          en: 'Skip implementation details. Say when to use it, when not to, what each parameter means, and what success and failure look like. Add one example call.',
        },
        {
          type: 'diagram',
          id: 'tool-contract',
          caption: {
            zh: '工具契约：名称、描述、schema、返回、错误，五个面都要为模型设计。',
            en: 'The tool contract: name, description, schema, return, errors — all five designed for the model.',
          },
        },
      ],
    },
    {
      id: 'good-vs-bad',
      title: { zh: '好工具与坏工具的差距', en: 'Good tools vs. bad tools' },
      blocks: [
        {
          type: 'table',
          head: [
            { zh: '维度', en: 'Dimension' },
            { zh: '坏味道', en: 'Smell' },
            { zh: '更好的做法', en: 'Better' },
          ],
          rows: [
            [
              { zh: '命名', en: 'Name' },
              { zh: 'doStuff、query、execute_sql', en: 'doStuff, query, execute_sql' },
              { zh: 'get_order_status、refund_payment', en: 'get_order_status, refund_payment' },
            ],
            [
              { zh: '范围', en: 'Scope' },
              { zh: '一个工具干十件事', en: 'One tool does ten things' },
              { zh: '一个工具一个意图，必要时拆开', en: 'One intent per tool; split when needed' },
            ],
            [
              { zh: '参数', en: 'Params' },
              { zh: '五个自由文本字段', en: 'Five free-text fields' },
              { zh: '≤3 个参数，枚举优先，默认值明确', en: '≤3 params, enums first, explicit defaults' },
            ],
            [
              { zh: '返回', en: 'Return' },
              { zh: '整个数据库对象 / HTML', en: 'Whole database object / HTML' },
              { zh: '摘要 + 关键字段 + 引用 ID', en: 'Summary + key fields + reference ID' },
            ],
            [
              { zh: '错误', en: 'Errors' },
              { zh: '抛异常、返回 500', en: 'Throws, returns 500' },
              { zh: '{ok:false, code, hint, retryable}', en: '{ok:false, code, hint, retryable}' },
            ],
            [
              { zh: '副作用', en: 'Side effects' },
              { zh: '重复调用会重复扣款', en: 'Repeat call double-charges' },
              { zh: '幂等键 + 人工确认', en: 'Idempotency key + human confirmation' },
            ],
          ],
        },
        {
          type: 'code',
          lang: 'json',
          title: 'good_tool_schema.json',
          code: `{
  "name": "get_order_status",
  "description": "查询订单的当前状态与物流节点。仅当用户提供了订单号，或已通过 find_orders 找到唯一订单时使用。不要用它查询退款进度。",
  "parameters": {
    "type": "object",
    "properties": {
      "order_id": {
        "type": "string",
        "description": "订单号，格式如 ORD-2026-00123"
      },
      "include_items": {
        "type": "boolean",
        "description": "是否返回商品明细，默认 false",
        "default": false
      }
    },
    "required": ["order_id"],
    "additionalProperties": false
  }
}`,
          note: {
            zh: '描述里明确写了“何时用”和“何时别用”，这比任何架构图都更能减少误调用。',
            en: 'The description states both when to use and when not to. That reduces mis-calls more than any architecture diagram.',
          },
        },
        {
          type: 'p',
          zh: '工具数量也要克制。经验法则是同一时刻 5±2 个；超过就按任务分组，或做一层“工具路由”。工具越多，模型的注意力越分散，描述总长度也越容易挤占上下文。',
          en: 'Limit tool count. A practical rule is 5±2 at a time; beyond that, group by task or add a tool router. More tools dilute attention and consume context with descriptions.',
        },
      ],
    },
    {
      id: 'errors',
      title: { zh: '错误要能教模型下一步', en: 'Errors should teach the next step' },
      blocks: [
        {
          type: 'p',
          zh: '工具失败时，最糟的返回是一个 HTML 错误页或一段堆栈。模型看不懂，只能重复调用或胡编。把错误变成结构化、可行动的信息：发生了什么、能不能重试、下一步该做什么。',
          en: 'The worst failure return is an HTML error page or a stack trace. The model cannot use it, so it retries blindly or hallucinates. Make errors structured and actionable: what happened, whether to retry, what to do next.',
        },
        {
          type: 'code',
          lang: 'python',
          title: 'error_contract.py',
          code: `def tool_error(code, message, hint=None, retryable=False):
    return {
        "ok": False,
        "error_code": code,          # 稳定、可枚举，如 NOT_FOUND
        "message": message,          # 给模型看的一句人话
        "hint": hint,                # 建议的下一步
        "retryable": retryable,      # 是否值得重试
    }

# 例：查询订单
return tool_error(
    code="NOT_FOUND",
    message="没有找到订单 ORD-2026-00123。",
    hint="请让用户确认订单号，或改用 find_orders 按邮箱查询。",
    retryable=False,
)

# 例：上游超时
return tool_error(
    code="UPSTREAM_TIMEOUT",
    message="订单服务 10 秒内没有响应。",
    hint="可以重试一次；仍失败则告知用户稍后再试。",
    retryable=True,
)`,
          note: {
            zh: '不要把原始异常、SQL、内部 URL 直接返回给模型或用户，既没用也可能泄密。',
            en: 'Never return raw exceptions, SQL, or internal URLs to the model or user. It is both useless and a leak risk.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { zh: '写操作三件套', en: 'The write-operation trio' },
          zh: '任何会改变外部状态的工具，都应该有：幂等键（重复调用不重复生效）、权限校验（这个用户能不能做）、确认环节（高风险动作必须人工点头）。',
          en: 'Every tool that changes external state needs an idempotency key (repeat calls do not duplicate effects), authorization (can this user do it?), and confirmation (high-risk actions need a human yes).',
        },
      ],
    },
    {
      id: 'governance',
      title: { zh: '工具治理：从能用，到可维护', en: 'Tool governance: from works to maintainable' },
      blocks: [
        {
          type: 'list',
          zh: [
            '命名空间：crm_get_customer、billing_refund，避免跨系统重名。',
            '版本化：schema 变更要兼容旧调用，至少保留一个版本周期。',
            '最小权限：每个工具用独立凭证，只授予它真正需要的权限。',
            '限流与配额：防止 Agent 在一次循环里把下游打挂。',
            '审计：记录谁、在什么会话、用什么参数调用了什么工具。',
            '测试：为每个工具准备正常、空结果、异常三类用例。',
          ],
          en: [
            'Namespacing: crm_get_customer, billing_refund — avoid cross-system name collisions.',
            'Versioning: schema changes must stay compatible for at least one release cycle.',
            'Least privilege: each tool gets its own credential with only the permissions it needs.',
            'Rate limits and quotas: stop one loop from taking down a downstream service.',
            'Audit: who called what tool, with which arguments, in which session.',
            'Testing: normal, empty, and error cases for every tool.',
          ],
        },
        {
          type: 'checklist',
          title: { zh: '工具设计自查', en: 'Tool design self-check' },
          items: [
            { zh: '名字是“动词 + 对象”，不用内部黑话', en: 'Names are verb + object, no internal jargon' },
            { zh: '描述写清何时用、何时别用、返回什么', en: 'Descriptions cover when to use, when not to, what returns' },
            { zh: '参数不超过 3 个，自由文本尽量换成枚举', en: '≤3 params; free text replaced with enums where possible' },
            { zh: '返回是摘要，不是整库或 HTML', en: 'Returns are summaries, not whole databases or HTML' },
            { zh: '错误包含可执行提示，且不泄密', en: 'Errors include actionable hints and no secrets' },
            { zh: '写操作有幂等键、鉴权和确认', en: 'Writes have idempotency, auth, and confirmation' },
          ],
        },
        {
          type: 'callout',
          tone: 'idea',
          title: { zh: '本章练习', en: 'Exercise' },
          zh: '挑一个你现有的工具，补上三行描述：“何时使用 / 何时不要使用 / 失败时怎么办”。然后跑 20 次真实任务，统计误调用率。',
          en: 'Take an existing tool and add three lines: when to use, when not to, what to do on failure. Run 20 real tasks and measure mis-call rate.',
        },
      ],
    },
  ],
}
