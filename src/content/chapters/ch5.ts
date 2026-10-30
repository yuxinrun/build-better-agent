import type { Chapter } from '../types'

export const ch5: Chapter = {
  slug: 'memory-rag',
  num: '05',
  icon: 'database',
  level: 'builder',
  minutes: 15,
  accent: 'lime',
  title: { zh: '记忆与知识库：让 Agent 记得住、查得到', en: 'Memory and RAG: make your agent remember and retrieve' },
  subtitle: {
    zh: '记忆不是把聊天记录全存下来，而是有策略地写入、检索、遗忘。',
    en: 'Memory is not storing every chat. It is writing, retrieving, and forgetting on purpose.',
  },
  promise: {
    zh: '会查资料的 Agent 不一定可靠，但不会查资料、还假装记得的 Agent 一定不可靠。',
    en: 'An agent that retrieves is not automatically reliable. An agent that pretends to remember definitely is not.',
  },
  bullets: [
    { zh: '区分工作记忆、情节记忆、语义记忆', en: 'Separate working, episodic, and semantic memory' },
    { zh: '把 RAG 当成一条可评测的流水线', en: 'Treat RAG as an evaluable pipeline' },
    { zh: '设计写入、冲突与遗忘策略', en: 'Design write, conflict, and forgetting policies' },
  ],
  sections: [
    {
      id: 'three-memories',
      title: { zh: '三种记忆，三种用途', en: 'Three kinds of memory' },
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'layers',
              title: { zh: '工作记忆', en: 'Working memory' },
              desc: {
                zh: '当前这次运行的上下文：任务、最近几轮、工具结果。用完即弃，不跨会话。',
                en: 'Context for this run: task, recent turns, tool results. Discarded when done.',
              },
            },
            {
              icon: 'clock',
              title: { zh: '情节记忆', en: 'Episodic memory' },
              desc: {
                zh: '过去发生过什么：用户偏好、上次没做完的事、曾经的失败。需要摘要和时效。',
                en: 'What happened before: preferences, unfinished work, past failures. Needs summaries and freshness.',
              },
            },
            {
              icon: 'book',
              title: { zh: '语义记忆', en: 'Semantic memory' },
              desc: {
                zh: '稳定的知识：产品文档、政策、SOP。适合 RAG，不适合硬编码进 Prompt。',
                en: 'Stable knowledge: docs, policies, SOPs. Good for RAG, bad for hardcoding into prompts.',
              },
            },
          ],
        },
        {
          type: 'p',
          zh: '先问一个冷酷的问题：这个信息，下次真的会用到吗？如果不会，存下来只是增加检索噪音和隐私风险。记忆系统的价值不在于“记得多”，而在于“记得准、忘得掉”。',
          en: 'Ask a cold question: will this information actually be used next time? If not, storing it only adds retrieval noise and privacy risk. The value of memory is not how much it holds, but how accurately it recalls and how cleanly it forgets.',
        },
        {
          type: 'diagram',
          id: 'memory-map',
          caption: {
            zh: '写入、检索、更新、遗忘：记忆是一个生命周期，不是一张表。',
            en: 'Write, retrieve, update, forget: memory is a lifecycle, not a table.',
          },
        },
      ],
    },
    {
      id: 'rag-pipeline',
      title: { zh: 'RAG 不是“接个向量库”', en: 'RAG is not “plug in a vector DB”' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { zh: '1. 采集与清洗', en: '1. Ingest and clean' },
              desc: {
                zh: '去掉导航、页脚、重复内容；保留标题层级、表格和更新时间。垃圾进，垃圾出。',
                en: 'Remove navigation, footers, duplicates; preserve headings, tables, and update dates. Garbage in, garbage out.',
              },
            },
            {
              title: { zh: '2. 切块与元数据', en: '2. Chunk and annotate' },
              desc: {
                zh: '按语义切，不要按固定字数硬切。每块带上来源、章节、日期、权限标签。',
                en: 'Chunk by meaning, not fixed length. Tag each chunk with source, section, date, and access level.',
              },
            },
            {
              title: { zh: '3. 混合检索', en: '3. Hybrid retrieval' },
              desc: {
                zh: '向量召回 + 关键词召回，再做 rerank。专有名词和编号，往往靠关键词才找得准。',
                en: 'Vector recall + keyword recall, then rerank. Acronyms and IDs are often found only by keywords.',
              },
            },
            {
              title: { zh: '4. 组装与引用', en: '4. Assemble and cite' },
              desc: {
                zh: '给模型 3-5 条最相关片段，要求它标注来源。没有依据时，明确说“资料里没有”。',
                en: 'Give the model 3–5 top snippets, require citations, and allow “not in the sources.”',
              },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: { zh: '长上下文不能替代 RAG', en: 'Long context does not replace RAG' },
          zh: '窗口再大，检索错了照样答错；而且每次全量塞入既贵又慢。RAG 的核心不是省 token，是“把对的信息放到模型眼前”。',
          en: 'A bigger window does not fix bad retrieval, and stuffing everything in is slow and expensive. RAG is not about saving tokens; it is about putting the right information in front of the model.',
        },
        {
          type: 'code',
          lang: 'python',
          title: 'retrieve_with_citations.py',
          code: `def retrieve(question, user, top_k=5):
    # 1) 两路召回
    dense = vector_store.search(question, k=20, filters={"acl": user.groups})
    sparse = keyword_index.search(question, k=20, filters={"acl": user.groups})

    # 2) 合并去重 + rerank
    candidates = dedupe(dense + sparse)
    ranked = reranker.rank(question, candidates)[:top_k]

    # 3) 只保留模型真正需要的字段
    return [{
        "id": c.id,
        "text": c.text[:1200],
        "source": c.source,
        "updated_at": c.updated_at,
        "score": round(c.score, 3),
    } for c in ranked]

SYSTEM_HINT = """只根据 <sources> 中的内容回答。
每个结论后用 [来源: xxx] 标注；找不到依据就说“资料中没有”。
如果不同来源冲突，指出冲突并优先使用更新时间更晚的来源。"""`,
          note: {
            zh: '把 ACL 过滤放在检索层，而不是靠 Prompt 提醒模型“不要看没权限的”。',
            en: 'Apply ACL filters in retrieval, not by prompting the model to ignore unauthorized content.',
          },
        },
      ],
    },
    {
      id: 'write-forget',
      title: { zh: '写入与遗忘：记忆系统真正的难点', en: 'Writing and forgetting: the hard part' },
      blocks: [
        {
          type: 'list',
          zh: [
            '值得记：稳定偏好（“每周一生成周报”）、长期目标、已确认的事实、明确的禁止项。',
            '不该记：密码与密钥、一次性上下文、模型自己的猜测、未经确认的个人信息。',
            '写入要确认：重要记忆让用户看一眼，允许修改和删除。',
            '冲突要解决：新信息与旧记忆冲突时，按时间和来源可信度裁决，并保留变更记录。',
            '遗忘要自动：设置 TTL、按项目归档、提供“清除我的记忆”按钮。',
          ],
          en: [
            'Worth storing: stable preferences (“weekly report every Monday”), long-term goals, confirmed facts, explicit prohibitions.',
            'Never store: passwords and keys, one-off context, the model’s guesses, unconfirmed personal data.',
            'Confirm writes: let users review, edit, and delete important memories.',
            'Resolve conflicts: when new information contradicts old memory, decide by time and source trust, and keep a change log.',
            'Forget automatically: TTLs, project archiving, and a “clear my memory” button.',
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { zh: '隐私不是“加个开关”', en: 'Privacy is not a toggle' },
          zh: '记忆会跨会话传播错误和敏感信息。写入前问三件事：用户同意了吗？有权限吗？多久后应该删除？答不上来，就别写。',
          en: 'Memory propagates errors and sensitive data across sessions. Before writing, ask: did the user consent? is it authorized? when should it be deleted? If you cannot answer, do not write.',
        },
        {
          type: 'checklist',
          title: { zh: '记忆与 RAG 自查', en: 'Memory and RAG self-check' },
          items: [
            { zh: '检索结果带来源、时间、权限过滤', en: 'Results carry source, date, and ACL filtering' },
            { zh: '回答必须引用来源，查不到会承认', en: 'Answers cite sources and admit when nothing is found' },
            { zh: '切块按语义，保留标题与表格结构', en: 'Chunks are semantic and preserve headings and tables' },
            { zh: '有 rerank，且单独评测召回质量', en: 'Reranking exists and recall is evaluated separately' },
            { zh: '记忆写入有确认、冲突处理和 TTL', en: 'Memory writes have confirmation, conflict handling, and TTL' },
            { zh: '用户能查看和删除自己的记忆', en: 'Users can view and delete their memory' },
          ],
        },
        {
          type: 'callout',
          tone: 'idea',
          title: { zh: '本章练习', en: 'Exercise' },
          zh: '准备 20 个真实问题，只评测“检索”而不评测生成：标出没找到、找错、找到但没用上三类。先修检索，再调 Prompt。',
          en: 'Prepare 20 real questions and evaluate retrieval only: not found, wrong result, found but unused. Fix retrieval before touching the prompt.',
        },
      ],
    },
  ],
}
