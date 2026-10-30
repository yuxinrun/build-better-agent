import type { ReactNode } from 'react'

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-left'
  | 'check'
  | 'copy'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'chevron-right'
  | 'spark'
  | 'loop'
  | 'brain'
  | 'layers'
  | 'wrench'
  | 'pulse'
  | 'database'
  | 'flow'
  | 'chart'
  | 'activity'
  | 'coin'
  | 'users'
  | 'shield'
  | 'book'
  | 'code'
  | 'play'
  | 'pause'
  | 'refresh'
  | 'alert'
  | 'bulb'
  | 'target'
  | 'terminal'
  | 'clock'
  | 'external'
  | 'trash'
  | 'eye'
  | 'sliders'

const strokes: Partial<Record<IconName, ReactNode>> = {
  'arrow-right': <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  'arrow-left': <path d="M20 12H5m0 0 6-6m-6 6 6 6" />,
  'arrow-up-right': <path d="M7 17 17 7m0 0H8m9 0v9" />,
  check: <path d="m5 12.5 4.5 4.5L19 6.5" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H6.5A2.5 2.5 0 0 0 4 5.5v6A2.5 2.5 0 0 0 6.5 14" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  spark: (
    <path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z" />
  ),
  loop: (
    <>
      <path d="M4.5 11a7.5 7.5 0 0 1 13-4.9L20 8.5" />
      <path d="M20 3.5v5h-5" />
      <path d="M19.5 13a7.5 7.5 0 0 1-13 4.9L4 15.5" />
      <path d="M4 20.5v-5h5" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 4.5A2.5 2.5 0 0 0 7 7a2.8 2.8 0 0 0-2.5 3.4A3 3 0 0 0 6 15.8 2.7 2.7 0 0 0 9.5 19c1.2 0 2.2-.7 2.5-1.7V6.9a2.4 2.4 0 0 0-2.5-2.4Z" />
      <path d="M14.5 4.5A2.5 2.5 0 0 1 17 7a2.8 2.8 0 0 1 2.5 3.4 3 3 0 0 1-1.5 5.4A2.7 2.7 0 0 1 14.5 19c-1.2 0-2.2-.7-2.5-1.7V6.9a2.4 2.4 0 0 1 2.5-2.4Z" />
      <path d="M12 9.5v5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
    </>
  ),
  wrench: (
    <path d="M14.5 6.5a4 4 0 0 0 5 5l-8 8a2.8 2.8 0 0 1-4-4l8-8a4 4 0 0 0-1 1Z" />
  ),
  pulse: <path d="M2.5 12h4l2.5-6 4 12 2.5-6h6" />,
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
      <path d="M4.5 11.5v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
    </>
  ),
  flow: (
    <>
      <rect x="3.5" y="4" width="6" height="6" rx="1.5" />
      <rect x="14.5" y="14" width="6" height="6" rx="1.5" />
      <path d="M9.5 7h5a3 3 0 0 1 3 3v4M6.5 10v4a3 3 0 0 0 3 3h5" />
    </>
  ),
  chart: <path d="M4 20V10m6 10V4m6 16v-7m4 7V8" />,
  activity: (
    <>
      <path d="M3 12h4l2-7 4 14 2-7h6" />
      <circle cx="21" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.5 9.2c-.6-.7-1.5-1.1-2.6-1.1-1.7 0-2.7.8-2.7 1.9 0 3 5.6 1.4 5.6 4.4 0 1.2-1.1 2.1-2.9 2.1-1.2 0-2.3-.5-3-1.3M12 6.5v11" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5c.5-3 2.6-4.8 5.5-4.8s5 1.8 5.5 4.8" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6M17.5 15c1.8.5 2.9 2 3.2 4.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.4 2.8 7.5 7 9.5 4.2-2 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20M8 7h8" />
    </>
  ),
  code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4M13.5 5 10.5 19" />,
  play: <path d="m9 6.5 8.5 5.5L9 17.5v-11Z" />,
  pause: <path d="M9 6v12M15 6v12" />,
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8.5" />
      <path d="M4 4v4.5h4.5M4 13a8 8 0 0 0 14.5 4.5L20 15.5" />
      <path d="M20 20v-4.5h-4.5" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5 21 20H3L12 3.5Z" />
      <path d="M12 9v5M12 17.5v.1" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M8 14.5a6 6 0 1 1 8 0c-.8.7-1.3 1.4-1.3 2.5H9.3c0-1.1-.5-1.8-1.3-2.5Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 13v5.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H11" />,
  trash: (
    <>
      <path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 12.5h9L17.5 7" />
      <path d="M10 11v5M14 11v5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
}

export function Icon({
  name,
  size = 18,
  className,
  strokeWidth = 1.7,
}: {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {strokes[name]}
    </svg>
  )
}
