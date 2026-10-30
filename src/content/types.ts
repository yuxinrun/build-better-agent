import type { IconName } from '../components/Icon'

export type Pair = { zh: string; en: string }

export type Level = 'starter' | 'builder' | 'production'

export type Accent = 'teal' | 'coral' | 'blue' | 'lime'

export type DiagramId =
  | 'agent-loop'
  | 'anatomy'
  | 'context-stack'
  | 'tool-contract'
  | 'memory-map'
  | 'autonomy-ladder'
  | 'patterns'
  | 'eval-funnel'
  | 'trace-waterfall'
  | 'latency-budget'
  | 'multi-agent'

export type Block =
  | { type: 'p'; zh: string; en: string }
  | { type: 'list'; zh: string[]; en: string[] }
  | {
      type: 'cards'
      items: { icon?: IconName; title: Pair; desc: Pair }[]
    }
  | {
      type: 'callout'
      tone: 'tip' | 'warn' | 'idea' | 'note'
      title: Pair
      zh: string
      en: string
    }
  | { type: 'code'; lang: string; title: string; code: string; note?: Pair }
  | { type: 'diagram'; id: DiagramId; caption: Pair }
  | { type: 'table'; head: Pair[]; rows: Pair[][] }
  | { type: 'steps'; items: { title: Pair; desc: Pair }[] }
  | { type: 'checklist'; title?: Pair; items: Pair[] }
  | { type: 'formula'; label: Pair; formula: string; note: Pair }

export type Section = {
  id: string
  title: Pair
  blocks: Block[]
}

export type Chapter = {
  slug: string
  num: string
  icon: IconName
  level: Level
  minutes: number
  accent: Accent
  title: Pair
  subtitle: Pair
  promise: Pair
  bullets: Pair[]
  sections: Section[]
}

export const levelLabel: Record<Level, Pair> = {
  starter: { zh: '入门', en: 'Starter' },
  builder: { zh: '进阶', en: 'Builder' },
  production: { zh: '生产', en: 'Production' },
}
