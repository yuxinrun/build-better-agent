import type { Chapter } from '../types'

export const ch3: Chapter = {
  slug: 'context-engineering',
  num: '03',
  icon: 'layers',
  level: 'builder',
  minutes: 16,
  accent: 'blue',
  title: { zh: '上下文工程：模型看到什么，比它多聪明更重要', en: 'Context engineering: what the model sees beats how smart it is' },
  subtitle: {
    zh: '上下文不是越多越好，而是一张有限的工作台。',
    en: 'Context is not a warehouse. It is a limited workbench.',
  },
  promise: {
    zh: '好的上下文工程，是让每一段 token 都有存在的理由；差的上下文工程，是把所有资料一股脑塞进去，然后怪模型不聪明。',
    en: 'Good context engineering gives every token a reason to be there. Bad context engineering dumps everything in and blames the model.',
  },
  bullets: [
    { zh: '理解上下文预算与“中间遗忘”', en: 'Understand context budgets and lost-in-the-middle' },
    { zh: '掌握分层、裁剪、摘要、按需检索', en: 'Layer, trim, summarize, retrieve just in time' },
    { zh: '用结构化信息替代无效堆砌', en: 'Replace piles of text with structure' },
  ],
  sections: [
    {
      id: 'workbench',
      title: { zh: '上下文是一张有限的工作台', en: 'Context is a finite workbench' },
      blocks: [
        {
          type: 'p',
          zh: '模型没有长期记忆。每一次调用，它只能看到你递过去的那一叠材料。窗口再大，也不是无限；更麻烦的是，材料越多，关键信息越容易被淹没。研究者把这种现象叫作“lost in the middle”：放在中间的内容，最容易被忽略。',
          en: 'The model has no persistent memory. On every call it sees only the stack of material you hand it. Even a huge window is finite, and worse, more material means key facts get buried. Researchers call it “lost in the middle”: content in the center is most often ignored.',
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { zh: '把上下文当预算，而不是仓库', en: 'Treat context as a budget, not a warehouse' },
          zh: '每次调用都问：这段内容如果不放，模型会做错什么？答不上来，就删掉。留下的每一段，都应该能对应一个具体的失败模式。',
          en: 'Ask of every block: what would the model get wrong without this? If you cannot answer, cut it. Everything that stays should map to a concrete failure mode.',
        },
        {
          type: 'diagram',
          id: 'context-stack',
          caption: {
            zh: '六层上下文：系统指令、工具定义、任务、检索资料、历史、记忆。越靠下，越应该按需加载。',
            en: 'Six layers: instructions, tools, task, retrieval, history, memory. The lower layers should load on demand.',
          },
        },
      ],
    },
    {
      id: 'six-layers',
      title: { zh: '六层上下文，各有各的纪律', en: 'Six layers, six disciplines' },
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'target',
              title: { zh: '系统指令', en: 'System instructions' },
              desc: {
                zh: '角色、边界、禁止事项、输出格式。短而硬，放在最前；关键约束在结尾再复述一次。',
                en: 'Role, boundaries, prohibitions, output format. Short and firm, up front; repeat critical constraints at the end.',
              },
            },
            {
              icon: 'wrench',
              title: { zh: '工具定义', en: 'Tool definitions' },
              desc: {
                zh: '只放当前任务可能用到的工具。工具越多，选择越难，描述越长，越容易选错。',
                en: 'Only tools relevant to this task. More tools mean harder choices, longer prompts, and more mistakes.',
              },
            },
            {
              icon: 'terminal',
              title: { zh: '当前任务', en: 'Current task' },
              desc: {
                zh: '用户原话 + 你补全后的结构化目标。不要用你的总结替掉用户的原话，细节常在原话里。',
                en: 'The user’s exact words plus a structured goal. Do not replace the original with your summary; details live there.',
              },
            },
            {
              icon: 'database',
              title: { zh: '检索资料', en: 'Retrieved knowledge' },
              desc: {
                zh: '带来源、时间和相关度的片段。宁少勿多，先给最相关的 3 条，而不是最像的 20 条。',
                en: 'Snippets with source, date, and relevance. Fewer is better: top 3 relevant, not top 20 similar.',
              },
            },
            {
              icon: 'clock',
              title: { zh: '历史对话', en: 'Conversation history' },
              desc: {
                zh: '保留最近几轮原文，更早的做滚动摘要。摘要必须保留数字、承诺和未完成事项。',
                en: 'Keep recent turns verbatim; summarize older ones. Summaries must retain numbers, promises, and open items.',
              },
            },
            {
              icon: 'brain',
              title: { zh: '长期记忆', en: 'Long-term memory' },
              desc: {
                zh: '稳定偏好、长期目标、已确认事实。按需检索，不要每次全量注入。',
                en: 'Stable preferences, long-term goals, confirmed facts. Retrieve on demand, never inject everything.',
              },
            },
          ],
        },
        {
          type: 'p',
          zh: '这六层不是每次都全上。一个查天气的 Agent 不需要长期记忆；一个代码助手可能只需要工具定义和当前文件。按任务裁剪，是上下文工程的第一课。',
          en: 'You do not need all six every time. A weather agent needs no long-term memory; a coding assistant may need only tools and the current file. Trimming by task is lesson one.',
        },
      ],
    },
    {
      id: 'five-moves',
      title: { zh: '五个立刻见效的动作', en: 'Five moves that pay off immediately' },
      blocks: [
        {
          type: 'list',
          zh: [
            '指令前置 + 结尾复述：把最重要的三条规则放在开头和结尾，中间放资料。',
            '工具描述瘦身：删掉实现细节，只保留“何时用、返回什么、何时别用”。',
            '历史滚动摘要：超过 N 轮后，把旧对话压成 5 条要点，原文归档可查。',
            '检索片段带元数据：来源、更新时间、可信度。模型会因此更谨慎地引用。',
            '按需加载：先给目录和摘要，模型需要时再取全文。别一次把整本手册塞进去。',
          ],
          en: [
            'Instructions up front, repeated at the end: three key rules at the start and finish, evidence in between.',
            'Slim tool descriptions: drop implementation details; keep when to use, what it returns, when not to use.',
            'Rolling history summary: after N turns, compress older dialogue into five points; archive originals.',
            'Metadata on retrieved snippets: source, updated time, confidence. Models cite more carefully with it.',
            'Load on demand: give an index and summaries first; fetch full text only when needed.',
          ],
        },
        {
          type: 'table',
          head: [
            { zh: '症状', en: 'Symptom' },
            { zh: '常见原因', en: 'Likely cause' },
            { zh: '处方', en: 'Prescription' },
          ],
          rows: [
            [
              { zh: '模型忽略关键约束', en: 'Ignores a key constraint' },
              { zh: '约束埋在长文中段', en: 'Constraint buried mid-prompt' },
              { zh: '前置 + 结尾复述，单独成段', en: 'Move up front, repeat at end, isolate it' },
            ],
            [
              { zh: '工具总是选错', en: 'Picks the wrong tool' },
              { zh: '工具太多、描述太像', en: 'Too many similar tools' },
              { zh: '按任务裁剪到 5 个左右，改描述', en: 'Trim to ~5 per task, rewrite descriptions' },
            ],
            [
              { zh: '回答引用过时信息', en: 'Cites stale information' },
              { zh: '检索没有时间过滤', en: 'No time filter in retrieval' },
              { zh: '加时间戳、优先近期、要求注明日期', en: 'Add timestamps, prefer recent, require dates' },
            ],
            [
              { zh: '长对话后变笨', en: 'Gets dumber in long chats' },
              { zh: '历史太长，关键信息被稀释', en: 'History too long, signal diluted' },
              { zh: '滚动摘要 + 固定“当前状态”卡片', en: 'Rolling summary + a persistent state card' },
            ],
          ],
        },
      ],
    },
    {
      id: 'budget-in-code',
      title: { zh: '把预算写进代码', en: 'Put the budget in code' },
      blocks: [
        {
          type: 'p',
          zh: '不要靠感觉控制上下文。给每一层设 token 上限，超了就裁剪；在日志里记录每层占比。下面是一个简化的组装器：优先级低的先被砍，关键指令永远保留。',
          en: 'Do not manage context by vibes. Set token caps per layer, trim when exceeded, and log each layer’s share. Here is a simplified assembler: low priority is cut first; critical instructions always survive.',
        },
        {
          type: 'code',
          lang: 'python',
          title: 'context_builder.py',
          code: `BUDGET = 24_000  # 给输出和工具结果留出余量

def build_context(task, tools, history, docs, memory):
    layers = [
        ("system", 1_200, system_prompt()),
        ("tools",   3_000, render_tools(tools)),
        ("task",    2_000, task),
        ("memory",  1_500, render_memory(memory)),
        ("docs",    8_000, render_docs(docs)),
        ("history", 6_000, render_history(history)),
    ]
    # 关键层永远保留；其余按预算从后往前裁
    fixed = {"system", "task"}
    used, kept = 0, []
    for name, cap, text in layers:
        if name in fixed:
            used += count_tokens(text); kept.append((name, text)); continue
        room = BUDGET - used - reserve_for(fixed, layers)
        allowed = max(0, min(cap, room))
        trimmed = trim_to_tokens(text, allowed)
        used += count_tokens(trimmed)
        kept.append((name, trimmed))

    log.info({"context_tokens": used, "layers": layer_stats(kept)})
    return "\\n\\n".join(f"<{n}>\\n{t}\\n</{n}>" for n, t in kept if t)`,
          note: {
            zh: '真实实现请使用对应模型的 tokenizer；这里用 count_tokens 抽象。重点是“分层 + 上限 + 日志”。',
            en: 'Use the model’s real tokenizer in production; count_tokens is abstract here. The point is layers + caps + logging.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { zh: '摘要不是免费的', en: 'Summaries are not free' },
          zh: '摘要会丢信息，尤其是数字、否定和例外条件。让摘要保留“未完成事项”和“用户明确说过不要做什么”，否则模型会反复踩同一个坑。',
          en: 'Summaries lose information, especially numbers, negations, and exceptions. Preserve open items and explicit “do not do this” instructions, or the model will repeat the same mistake.',
        },
        {
          type: 'checklist',
          title: { zh: '上下文体检', en: 'Context health check' },
          items: [
            { zh: '每一层都有 token 上限和裁剪策略', en: 'Every layer has a token cap and trim policy' },
            { zh: '关键指令在开头和结尾都出现', en: 'Critical instructions appear at start and end' },
            { zh: '工具返回被截断，不会挤爆窗口', en: 'Tool returns are truncated' },
            { zh: '检索结果带来源和时间', en: 'Retrieved results carry source and time' },
            { zh: '日志能看到每层 token 占比', en: 'Logs show token share per layer' },
          ],
        },
        {
          type: 'callout',
          tone: 'idea',
          title: { zh: '本章练习', en: 'Exercise' },
          zh: '把你现在的 system prompt 逐段标注“它防止了哪个具体错误”。标不出来的段落，删掉 30%，再跑一遍评测。',
          en: 'Annotate every paragraph of your system prompt with the specific failure it prevents. Delete 30% of the unannotated ones and rerun your eval.',
        },
      ],
    },
  ],
}
