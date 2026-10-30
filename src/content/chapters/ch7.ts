import type { Chapter } from '../types'

export const ch7: Chapter = {
  slug: 'evaluation',
  num: '07',
  icon: 'chart',
  level: 'production',
  minutes: 18,
  accent: 'blue',
  title: { zh: '评估：没有 Eval，就没有进步', en: 'Evaluation: no eval, no progress' },
  subtitle: {
    zh: 'Demo 会骗人，评测集不会。',
    en: 'Demos lie. Eval sets do not.',
  },
  promise: {
    zh: 'Eval 不是学术作业，是 Agent 的刹车和方向盘。每次“感觉变好了”，都应该能指向一组数字。',
    en: 'Eval is not academic work. It is the brake and steering wheel of your agent. Every “feels better” should point to numbers.',
  },
  bullets: [
    { zh: '从 30 条真实用例开始建评测集', en: 'Start an eval set with 30 real cases' },
    { zh: '选对指标，别被单一分数骗了', en: 'Pick the right metrics; do not trust one score' },
    { zh: '把回归评测放进 CI', en: 'Put regression evals in CI' },
  ],
  sections: [
    {
      id: 'demos-lie',
      title: { zh: '为什么 Demo 总是很惊艳', en: 'Why demos always look great' },
      blocks: [
        {
          type: 'p',
          zh: '你会不自觉地挑顺利的输入、顺手的工具、刚调好的 Prompt。五个 case 全过，就以为系统成了。真实用户一上来，输入带错别字、上下文缺失、需求自相矛盾，系统立刻露馅。更糟的是，你改一个 Prompt 修好了 A，却悄悄弄坏了 B。',
          en: 'You unconsciously pick friendly inputs, convenient tools, and the prompt you just tuned. Five cases pass and you think it works. Then real users arrive with typos, missing context, and contradictory requests. Worse, a prompt fix for A quietly breaks B.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { zh: '评测集是你的“回归测试”', en: 'Your eval set is a regression suite' },
          zh: '传统后端有单元测试，Agent 需要行为测试。它不要求覆盖所有输入，只要求覆盖你已知的失败模式，并在每次改动后重跑。',
          en: 'Backends have unit tests; agents need behavior tests. They do not cover every input, only known failure modes — and they run after every change.',
        },
        {
          type: 'p',
          zh: '别等“有空再建评测”。从今天开始，每遇到一个 bad case，就把它写成一条用例。一个月后你会拥有一份比任何论文都更适合你业务的测试集。',
          en: 'Do not wait for “time to build evals.” Every bad case you see today becomes a test case. In a month you will have a suite better suited to your business than any paper.',
        },
      ],
    },
    {
      id: 'build-set',
      title: { zh: '从 30 条开始：评测集怎么建', en: 'Start with 30: how to build the set' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { zh: '1. 收集真实输入', en: '1. Collect real inputs' },
              desc: {
                zh: '从日志、客服工单、内部群聊里找，不要自己编。保留原始表达、错别字和缺失信息。',
                en: 'Pull from logs, tickets, and internal chats. Do not invent them. Keep original wording, typos, and missing info.',
              },
            },
            {
              title: { zh: '2. 标注期望行为', en: '2. Label expected behavior' },
              desc: {
                zh: '不只写“正确答案”，还要写“必须调用哪个工具、不能做什么、失败时怎么回复”。',
                en: 'Label not just the right answer, but which tool must be called, what must not happen, and how to respond on failure.',
              },
            },
            {
              title: { zh: '3. 分层', en: '3. Stratify' },
              desc: {
                zh: '60% 常见路径、30% 边界与异常、10% 对抗输入。别让 happy path 淹没真正的风险。',
                en: '60% common paths, 30% edge cases, 10% adversarial. Do not let happy paths drown the real risk.',
              },
            },
            {
              title: { zh: '4. 版本化', en: '4. Version it' },
              desc: {
                zh: '用例和 Prompt 一起进 Git。每条用例有 ID、来源、标签、期望结果和最后验证时间。',
                en: 'Keep cases in Git with prompts. Each has an ID, source, tags, expected result, and last verified date.',
              },
            },
          ],
        },
        {
          type: 'code',
          lang: 'json',
          title: 'eval_case.json',
          code: `{
  "id": "expense-017",
  "source": "support-ticket-8842",
  "tags": ["refund", "missing_info", "zh"],
  "input": "我上周提交的报销怎么还没到账？单号好像丢了，邮箱是 lin@example.com",
  "expected": {
    "must_call": ["find_claims"],
    "must_not_call": ["refund_payment"],
    "final_contains": ["当前状态", "下一步"],
    "max_steps": 4
  },
  "graders": ["tool_trace", "llm_judge:expense_rubric"],
  "notes": "用户没给单号，必须先按邮箱查；不得承诺到账时间。"
}`,
          note: {
            zh: '可执行的期望，比一段“回答要好”的评语有用一百倍。',
            en: 'Executable expectations beat “the answer should be good” by a hundred times.',
          },
        },
      ],
    },
    {
      id: 'metrics',
      title: { zh: '指标：别只看一个总分', en: 'Metrics: never trust one score' },
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'target',
              title: { zh: '任务成功率', en: 'Task success' },
              desc: {
                zh: '最终结果对不对。最重要，但太粗，无法告诉你哪里坏了。',
                en: 'Is the final result correct? Most important, but too coarse to localize failure.',
              },
            },
            {
              icon: 'wrench',
              title: { zh: '工具正确率', en: 'Tool correctness' },
              desc: {
                zh: '该调的调了吗？参数对吗？有没有调用危险工具？',
                en: 'Right tool? right arguments? any dangerous calls?',
              },
            },
            {
              icon: 'activity',
              title: { zh: '步数与延迟', en: 'Steps and latency' },
              desc: {
                zh: '绕了多少弯路。步数突然上升，通常意味着上下文或工具出了问题。',
                en: 'How much wandering. A step spike usually signals context or tool problems.',
              },
            },
            {
              icon: 'coin',
              title: { zh: '成本', en: 'Cost' },
              desc: {
                zh: '每次运行、每个成功任务的成本。只看单价会忽略重试和长尾。',
                en: 'Cost per run and per success. Unit price hides retries and long tails.',
              },
            },
            {
              icon: 'shield',
              title: { zh: '安全与合规', en: 'Safety and compliance' },
              desc: {
                zh: '越权、泄密、注入、不可逆误操作。一票否决项，必须单列。',
                en: 'Privilege escalation, leaks, injection, irreversible mistakes. Veto metrics — track separately.',
              },
            },
            {
              icon: 'eye',
              title: { zh: '人工接管率', en: 'Human takeover' },
              desc: {
                zh: '多少任务需要人接手。太低可能护栏不足，太高则价值有限。',
                en: 'How often humans take over. Too low may mean weak guardrails; too high means little value.',
              },
            },
          ],
        },
        {
          type: 'p',
          zh: 'LLM-as-judge 可以扩展评测规模，但要有评分细则、正反例和人工校准。最可靠的做法是“规则可判的用规则，主观的用成对比较，关键安全项人工抽检”。',
          en: 'LLM-as-judge scales evaluation, but needs rubrics, examples, and human calibration. The reliable mix: rules for checkable things, pairwise comparison for subjective quality, human spot checks for critical safety.',
        },
        {
          type: 'diagram',
          id: 'eval-funnel',
          caption: {
            zh: '评测漏斗：离线黄金集 → 回归集 → 线上抽样 → 人工深审。越往下越贵，也越接近真实。',
            en: 'Eval funnel: offline golden set → regression → online sample → human deep review. Lower levels cost more and resemble reality.',
          },
        },
      ],
    },
    {
      id: 'eval-ci',
      title: { zh: '让 Eval 进 CI，而不是进抽屉', en: 'Put evals in CI, not in a drawer' },
      blocks: [
        {
          type: 'p',
          zh: '每次改 Prompt、换模型、加工具，都自动跑一遍评测。关键用例失败就阻止发布；非关键指标下降就报警。把评测结果贴在 PR 里，让“变好了”变成可讨论的证据。',
          en: 'Run evals on every prompt change, model swap, and new tool. Block release on critical case failures; alert on metric drops. Attach results to the PR so “better” becomes evidence you can debate.',
        },
        {
          type: 'code',
          lang: 'yaml',
          title: '.github/workflows/agent-eval.yml',
          code: `name: agent-eval
on:
  pull_request:
    paths: ["prompts/**", "tools/**", "agent/**"]

jobs:
  eval:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - name: Run golden set
        run: python evals/run.py --suite golden --out results.json
      - name: Gate
        run: |
          python evals/gate.py results.json \\
            --min-success 0.90 \\
            --max-safety-failures 0 \\
            --max-cost-regression 0.15
      - uses: actions/upload-artifact@v4
        with:
          name: eval-results
          path: results.json`,
          note: {
            zh: '阈值不要拍脑袋：先跑两周基线，再按业务容忍度设定。安全项永远是一票否决。',
            en: 'Do not invent thresholds. Establish a two-week baseline first, then set them by business tolerance. Safety is always a veto.',
          },
        },
        {
          type: 'checklist',
          title: { zh: '评测体系自查', en: 'Evaluation system self-check' },
          items: [
            { zh: '有 ≥30 条来自真实场景的用例', en: 'At least 30 cases from real scenarios' },
            { zh: '用例覆盖常见、边界、对抗三类', en: 'Cases cover common, edge, and adversarial' },
            { zh: '工具调用轨迹被单独评估', en: 'Tool traces are evaluated separately' },
            { zh: 'LLM 评分有细则并经过人工校准', en: 'LLM judging has rubrics and human calibration' },
            { zh: '评测在 CI 中自动运行并设门槛', en: 'Evals run in CI with gates' },
            { zh: '线上 bad case 会回流到评测集', en: 'Online bad cases flow back into the set' },
          ],
        },
        {
          type: 'callout',
          tone: 'idea',
          title: { zh: '本章练习', en: 'Exercise' },
          zh: '今天挑 10 条真实失败对话，写成可执行的用例。先不要追求漂亮，能自动跑、能红能绿就够了。',
          en: 'Take 10 real failures today and turn them into executable cases. Do not aim for beauty; aim for red/green automation.',
        },
      ],
    },
  ],
}
