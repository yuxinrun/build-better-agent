import { useEffect, useRef, useState, type ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: 0 | 1 | 2 | 3
  className?: string
  as?: 'div' | 'section' | 'article' | 'li'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? 'is-in' : ''} ${className}`.trim()}
      data-delay={delay || undefined}
    >
      {children}
    </Tag>
  )
}
