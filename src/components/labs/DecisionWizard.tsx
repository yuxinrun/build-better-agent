import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext'
import { Icon } from '../Icon'

type Answer = 'yes' | 'no' | null

const questions = [
  {
    zh: '步骤能提前写死吗？',
    en: 'Can the steps be fixed in advance?',
    hintZh: '每次执行顺序基本一样，不需要根据中间结果换路。',
    hintEn: 'The order is stable; no rerouting based on intermediate results.',
  },
  {
    zh: '需要调用工具或改变外部状态吗？',
    en: 'Does it need tools or external state changes?',
    hintZh: '查数据库、发消息、创建工单、修改文件。',
    hintEn: 'Query a database, send a message, create a ticket, edit files.',
  },
  {
    zh: '出错代价高、且不可逆吗？',
    en: 'Are mistakes costly and irreversible?',
    hintZh: '涉及付款、删数据、对外发布或合规风险。',
    hintEn: 'Payments, deletions, public posts, or compliance risk.',
  },
]

export function DecisionWizard() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [answers, setAnswers] = useState<Answer[]>([null, null, null])

  const setAnswer = (index: number, value: Answer) => {
    setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)))
  }

  const complete = answers.every((a) => a !== null)
  let result: { title: string; why: string; to: string; cta: string; level: string } | null = null

  if (complete) {
    if (answers[0] === 'yes') {
      result = {
        level: 'L0 / L1',
        title: zh ? 'Workflow（固定工作流）' : 'Workflow',
        why: zh
          ? '步骤稳定，优先把流程写进代码。可以在个别节点嵌入 LLM 调用，但别让模型掌管控制流。'
          : 'Steps are stable, so put the flow in code. You can embed LLM calls in some nodes, but do not let the model own control flow.',
        to: '/chapters/workflow-autonomy',
        cta: zh ? '第 6 章：工作流与自主性' : 'Ch.6: Workflows and autonomy',
      }
    } else if (answers[1] === 'no') {
      result = {
        level: 'L1',
        title: zh ? '单次 LLM + 结构化输出' : 'Single LLM call + structured output',
        why: zh
          ? '没有外部动作，也不需要多步试错。别为了“Agent”而引入循环，一次调用加严格 schema 更可靠。'
          : 'No external actions and no multi-step trial. Skip the loop; one call with a strict schema is more reliable.',
        to: '/chapters/mental-model',
        cta: zh ? '第 1 章：什么时候不该用 Agent' : 'Ch.1: When not to use an agent',
      }
    } else if (answers[2] === 'yes') {
      result = {
        level: 'L3 + Human',
        title: zh ? '有界 Agent + 人工确认' : 'Bounded agent + human approval',
        why: zh
          ? '路径开放、需要工具，但错误不可逆。给 Agent 预算、步数和权限边界，关键动作必须由人确认。'
          : 'Open paths and tools, but irreversible errors. Bound budget, steps, and permissions; critical actions need a human.',
        to: '/chapters/multi-agent-production',
        cta: zh ? '第 10 章：安全与上线' : 'Ch.10: Security and launch',
      }
    } else {
      result = {
        level: 'L3',
        title: zh ? '有界 Agent' : 'Bounded agent',
        why: zh
          ? '路径不固定、需要工具、失败可承受。给它明确的工具集、最大步数、超时和预算，先小流量跑起来。'
          : 'Variable paths, tools needed, tolerable failures. Give it a tight toolset, max steps, timeout, and budget; start with small traffic.',
        to: '/chapters/first-agent',
        cta: zh ? '第 2 章：从零写一个 Agent' : 'Ch.2: Build your first agent',
      }
    }
  }

  return (
    <div className="lab-card decision-lab">
      <div className="lab-card-head">
        <div>
          <span className="eyebrow">{zh ? '交互实验 03' : 'LAB 03'}</span>
          <h3>{zh ? 'Workflow 还是 Agent？' : 'Workflow or agent?'}</h3>
          <p>{zh ? '三个问题，帮你选对形态，少写一半代码。' : 'Three questions to pick the right form and write half the code.'}</p>
        </div>
        <span className="wizard-progress">{answers.filter(Boolean).length}/3</span>
      </div>

      <div className="wizard-questions">
        {questions.map((q, index) => (
          <div className="wizard-q" key={q.en}>
            <div className="wizard-q-text">
              <span className="wizard-num">0{index + 1}</span>
              <div>
                <strong>{zh ? q.zh : q.en}</strong>
                <p>{zh ? q.hintZh : q.hintEn}</p>
              </div>
            </div>
            <div className="wizard-options" role="group" aria-label={zh ? q.zh : q.en}>
              <button className={answers[index] === 'yes' ? 'is-active yes' : ''} onClick={() => setAnswer(index, 'yes')}>
                {zh ? '是' : 'Yes'}
              </button>
              <button className={answers[index] === 'no' ? 'is-active no' : ''} onClick={() => setAnswer(index, 'no')}>
                {zh ? '否' : 'No'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`wizard-result ${result ? 'is-visible' : ''}`} aria-live="polite">
        {result ? (
          <>
            <span className="wizard-level">{result.level}</span>
            <div>
              <span className="small muted">{zh ? '推荐形态' : 'Recommended form'}</span>
              <h4>{result.title}</h4>
              <p>{result.why}</p>
              <Link className="link-arrow" to={result.to}>
                {result.cta} <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </>
        ) : (
          <p className="wizard-placeholder">
            {zh ? '回答三个问题后，这里会给出推荐形态。' : 'Answer all three and a recommendation appears here.'}
          </p>
        )}
      </div>
    </div>
  )
}
