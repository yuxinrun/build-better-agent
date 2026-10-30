import type { Chapter } from '../types'

export const ch8: Chapter = {
  slug: 'observability',
  num: '08',
  icon: 'activity',
  level: 'production',
  minutes: 16,
  accent: 'teal',
  title: { zh: '可观测性与可靠性：线上翻车怎么查', en: 'Observability and reliability: debugging the 3 a.m. failure' },
  subtitle: {
    zh: '一次 Agent 请求，本质上是一次分布式系统调用。',
    en: 'An agent request is a distributed systems call in disguise.',
  },
  promise: {
    zh: '线上翻车不可怕，查不到原因才可怕。没有 trace，你只能靠猜；有了 trace，你才能修。',
    en: 'Failures are survivable. Not knowing why is not. Without traces you guess; with traces you fix.',
  },
  bullets: [
    { zh: '设计 run → step → tool 的 trace 结构', en: 'Design a run → step → tool trace model' },
    { zh: '区分可重试与不可重试错误', en: 'Separate retryable from permanent errors' },
    { zh: '用灰度、预算和熔断控制爆炸半径', en: 'Limit blast radius with canaries, budgets, and circuit breakers' },
  ],
  sections: [
    {
      id: 'what-to-see',
      title: { zh: '一次运行，应该能看到什么', en: 'What one run should show you' },
      blocks: [
        {
          type: 'p',
          zh: '用户说“它答错了”，你需要还原现场：模型看到了什么、每一步选了什么工具、参数是什么、工具返回了什么、花了多少 token、哪一步开始跑偏。没有这些，所有讨论都会变成“我觉得是模型不行”。',
          en: 'When a user says “it was wrong,” you need the scene: what the model saw, which tool each step picked, the arguments, the returns, tokens spent, and where it drifted. Without that, every discussion becomes “I think the model is bad.”',
        },
        {
          type: 'diagram',
          id: 'trace-waterfall',
          caption: {
            zh: 'Trace 瀑布图：模型调用、工具调用、重试、人工审批，各自耗时与 token 一目了然。',
            en: 'Trace waterfall: model calls, tool calls, retries, approvals — latency and tokens at a glance.',
          },
        },
        {
          type: 'list',
          zh: [
            'run_id / session_id / user_id：能串起一次完整任务。',
            '每一步的模型、温度、Prompt 版本、token 数、耗时。',
            '工具名、脱敏参数、返回摘要、错误码、是否重试。',
            '上下文各层占比：系统、工具、历史、检索。',
            '最终结果、用户反馈、人工是否接管。',
          ],
          en: [
            'run_id / session_id / user_id: tie one task together.',
            'Per step: model, temperature, prompt version, tokens, latency.',
            'Tool name, redacted arguments, return summary, error code, retry flag.',
            'Context share per layer: system, tools, history, retrieval.',
            'Final output, user feedback, whether a human took over.',
          ],
        },
      ],
    },
    {
      id: 'logging',
      title: { zh: '日志不是 printf', en: 'Logging is not printf' },
      blocks: [
        {
          type: 'p',
          zh: '把每一步写成结构化事件，而不是拼一段字符串。结构化之后，你才能按工具、错误码、Prompt 版本聚合，才能做看板和告警。',
          en: 'Write each step as a structured event, not a concatenated string. Structure lets you aggregate by tool, error code, and prompt version — and build dashboards and alerts.',
        },
        {
          type: 'code',
          lang: 'json',
          title: 'trace_event.jsonl',
          code: `{"ts":"2026-10-30T08:12:41.220Z","run_id":"r_8f2","step":3,
 "event":"tool_call","tool":"get_claim","args":{"claim_id":"EXP-2026-0193"},
 "latency_ms":182,"ok":true,"retry":0,
 "result_preview":"status=waiting_approval; approver=finance; sla_hours=48",
 "tokens":{"in":3120,"out":186},"prompt_version":"expense-v7","model":"gpt-4.1-mini"}

{"ts":"2026-10-30T08:12:41.410Z","run_id":"r_8f2","step":3,
 "event":"tool_error","tool":"get_rules","args":{"stage":"finance"},
 "error_code":"UPSTREAM_TIMEOUT","retryable":true,"latency_ms":10000,
 "hint":"retry once, then fall back to canned explanation"}`,
          note: {
            zh: '参数与结果要脱敏，只留定位问题所需的最小信息。日志本身也可能是泄密面。',
            en: 'Redact arguments and results to the minimum needed for debugging. Logs are an attack surface too.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { zh: 'Prompt 也要版本化', en: 'Version your prompts too' },
          zh: '如果日志里只写“用了最新 Prompt”，一周后你无法解释行为变化。Prompt、工具 schema、模型版本，都应该有可回滚的 ID。',
          en: 'If logs say “latest prompt,” you cannot explain behavior changes a week later. Prompts, tool schemas, and model versions need rollback-able IDs.',
        },
      ],
    },
    {
      id: 'reliability',
      title: { zh: '可靠性模式：让失败变得可预期', en: 'Reliability patterns: make failure predictable' },
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'clock',
              title: { zh: '超时', en: 'Timeouts' },
              desc: {
                zh: '每个模型调用和工具调用都要有超时，且小于上游预算。否则一个慢查询拖垮整个请求。',
                en: 'Every model and tool call needs a timeout shorter than its parent budget, or one slow query sinks the request.',
              },
            },
            {
              icon: 'refresh',
              title: { zh: '重试 + 抖动', en: 'Retry + jitter' },
              desc: {
                zh: '只对可重试错误重试，指数退避并加随机抖动，避免整群 Agent 同时重试。',
                en: 'Retry only retryable errors, with exponential backoff and jitter to avoid coordinated retry storms.',
              },
            },
            {
              icon: 'shield',
              title: { zh: '熔断与降级', en: 'Circuit breaker + fallback' },
              desc: {
                zh: '下游连续失败就快速失败，切备用模型或模板回答。别让用户等 30 秒看一个错误。',
                en: 'Fail fast after repeated downstream errors; switch to a fallback model or canned answer. Do not make users wait 30s for an error.',
              },
            },
            {
              icon: 'coin',
              title: { zh: '预算护栏', en: 'Budget guard' },
              desc: {
                zh: '按 run 限制 token、步数、金额。超限就停，并给用户一个可理解的解释。',
                en: 'Cap tokens, steps, and spend per run. Stop on breach and explain it in human terms.',
              },
            },
          ],
        },
        {
          type: 'p',
          zh: '错误分类比错误处理更重要。上游超时可以重试；参数错误重试一万次也没用；权限不足应该立刻转人工；内容违规要阻断并记录。把这些分类写进工具契约，模型才知道下一步。',
          en: 'Classifying errors matters more than handling them. Upstream timeouts can be retried; bad arguments will never succeed; permission failures should escalate to a human; policy violations must block and log. Put the classes in the tool contract so the model knows what next.',
        },
        {
          type: 'code',
          lang: 'python',
          title: 'error_policy.py',
          code: `POLICY = {
    "UPSTREAM_TIMEOUT": {"action": "retry", "max": 2, "backoff": "expo"},
    "RATE_LIMITED":      {"action": "retry", "max": 3, "backoff": "expo_jitter"},
    "INVALID_ARGUMENT":  {"action": "ask_model_to_fix", "max": 1},
    "NOT_FOUND":         {"action": "return_to_user", "hint": True},
    "PERMISSION_DENIED": {"action": "handoff_human"},
    "POLICY_VIOLATION":  {"action": "block_and_log"},
}

def handle(error, state):
    rule = POLICY.get(error.code, {"action": "fail_safe"})
    if rule["action"] == "retry" and state.retries < rule["max"]:
        return Retry(after=backoff(rule["backoff"], state.retries))
    if rule["action"] == "handoff_human":
        return Escalate(summary=state.brief())
    return FailSafe(user_message=rule.get("hint", "请稍后再试"))`,
          note: {
            zh: '把策略写成表，比散落在各处的 if/else 更容易审计和修改。',
            en: 'A policy table is easier to audit and change than if/else scattered across the codebase.',
          },
        },
      ],
    },
    {
      id: 'ship-safely',
      title: { zh: '灰度、回滚与叫停', en: 'Canary, rollback, kill switch' },
      blocks: [
        {
          type: 'list',
          zh: [
            '模型与 Prompt 分版本发布，先跑 5% 流量。',
            '同时看成功率、步数、成本、人工接管率，不只看错误率。',
            '出现异常一键回滚到上一个版本，而不是在线改 Prompt。',
            '保留一个全局 kill switch，能在 60 秒内关闭写操作。',
            '每周复盘 bad case，把它们变成评测用例和产品需求。',
          ],
          en: [
            'Release models and prompts separately; canary at 5% traffic.',
            'Watch success, steps, cost, and takeover rate — not just errors.',
            'Roll back to the previous version; never edit prompts in production.',
            'Keep a global kill switch that disables writes within 60 seconds.',
            'Review bad cases weekly and turn them into eval cases and product work.',
          ],
        },
        {
          type: 'checklist',
          title: { zh: '上线可靠性自查', en: 'Reliability self-check' },
          items: [
            { zh: '每次运行有完整 trace，可按 run_id 还原', en: 'Every run has a trace replayable by run_id' },
            { zh: '日志结构化、脱敏、可聚合', en: 'Logs are structured, redacted, aggregatable' },
            { zh: '模型、工具、Prompt 版本都可追溯', en: 'Model, tool, and prompt versions are traceable' },
            { zh: '错误有分类，且每类有明确策略', en: 'Errors are classified with explicit policies' },
            { zh: '超时、预算、熔断、降级都已接入', en: 'Timeouts, budgets, breakers, fallbacks are wired' },
            { zh: '灰度与一键回滚演练过', en: 'Canary and one-click rollback have been drilled' },
          ],
        },
        {
          type: 'callout',
          tone: 'idea',
          title: { zh: '本章练习', en: 'Exercise' },
          zh: '找一次最近的失败运行，画出时间线，标出第一个异常点。问自己：如果当时有哪条日志，你本可以五分钟内定位？把它加上。',
          en: 'Take a recent failed run, draw the timeline, and mark the first anomaly. Ask: which log line would have let me diagnose this in five minutes? Add it.',
        },
      ],
    },
  ],
}
