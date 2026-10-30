import { Link } from 'react-router-dom'
import logoUrl from '../assets/yuxin-run.png'

export function LogoMark({ size = 34, className }: { size?: number; className?: string }) {
  return (
    <img
      src={logoUrl}
      alt=""
      width={Math.round(size * 1.5)}
      height={size}
      className={`logo-mark ${className ?? ''}`}
      style={{ height: size }}
      aria-hidden="true"
      draggable={false}
    />
  )
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="brand" aria-label="鱼心快跑 · Yuxin Runs">
      <LogoMark size={38} />
      <span className="brand-text">
        <strong>鱼心快跑</strong>
        {!compact && <small>YUXIN RUNS · AGENT HANDBOOK</small>}
      </span>
    </Link>
  )
}
