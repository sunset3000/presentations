import type { CSSProperties, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/src/lib/cn'

export function Panel({
  children,
  className,
  accent = false,
  flat = false,
  style,
}: {
  children: ReactNode
  className?: string
  accent?: boolean
  flat?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      className={cn(
        'rounded-xl border',
        accent
          ? 'border-ch-yellow/55 bg-ch-yellow/[0.045]'
          : flat
            ? 'border-white/10 bg-white/[0.02]'
            : 'border-white/10 bg-white/[0.035]',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export function IconBox({
  icon: Icon,
  className,
  size = 44,
  solid = false,
  strokeWidth = 1.8,
}: {
  icon: LucideIcon
  className?: string
  size?: number
  solid?: boolean
  strokeWidth?: number
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-[10px]',
        solid
          ? 'bg-ch-yellow text-ch-bg'
          : 'bg-white/[0.06] text-ch-yellow ring-1 ring-inset ring-white/10',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.46)} strokeWidth={strokeWidth} />
    </span>
  )
}

export function Pill({
  children,
  tone = 'default',
  className,
}: {
  children: ReactNode
  tone?: 'default' | 'yellow' | 'dark'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[5px] text-[12.5px] font-medium leading-none tracking-[0.02em]',
        tone === 'yellow' &&
          'border-ch-yellow/35 bg-ch-yellow/[0.09] text-ch-yellow',
        tone === 'default' && 'border-white/12 text-white/60',
        tone === 'dark' && 'border-transparent bg-white/[0.06] text-white/70',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Stat({
  value,
  unit,
  label,
  note,
  className,
  valueClassName,
  delay = 0,
}: {
  value: ReactNode
  unit?: ReactNode
  label: ReactNode
  note?: ReactNode
  className?: string
  valueClassName?: string
  delay?: number
}) {
  return (
    <div
      className={cn('anim-rise', className)}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <div
        className={cn(
          'flex items-baseline gap-2 leading-none tracking-[-0.045em]',
          valueClassName,
        )}
      >
        <span className="text-[62px] font-semibold text-white">{value}</span>
        {unit && (
          <span className="text-[20px] font-medium text-ch-yellow">{unit}</span>
        )}
      </div>
      <div className="mt-3 text-[14.5px] font-medium text-white/85">{label}</div>
      {note && <div className="mt-1 text-[12.5px] text-white/40">{note}</div>}
    </div>
  )
}

export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-white/40',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Dot({ className }: { className?: string }) {
  return (
    <span
      className={cn('inline-block h-[5px] w-[5px] shrink-0 bg-ch-yellow', className)}
    />
  )
}

export function Hairline({ className }: { className?: string }) {
  return <div className={cn('h-px w-full bg-white/10', className)} />
}
