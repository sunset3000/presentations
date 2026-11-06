import { cn } from '@/src/lib/cn'

export function ClickHouseMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="0" y="1.5" width="2.8" height="21" rx="1.1" />
      <rect x="4.5" y="1.5" width="2.8" height="21" rx="1.1" />
      <rect x="9" y="1.5" width="2.8" height="21" rx="1.1" />
      <rect x="13.5" y="1.5" width="2.8" height="21" rx="1.1" />
      <rect x="18" y="8.5" width="2.8" height="7" rx="1.1" />
    </svg>
  )
}

export function ClickHouseLogo({
  className,
  markClassName,
}: {
  className?: string
  markClassName?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex select-none items-center gap-[0.55em] font-medium tracking-[-0.035em]',
        className,
      )}
      role="img"
      aria-label="ClickHouse"
    >
      <ClickHouseMark className={cn('h-[1.12em] w-auto', markClassName)} />
      <span>ClickHouse</span>
    </span>
  )
}

export function ClickHouseStamp({
  className,
  markClassName,
}: {
  className?: string
  markClassName?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center bg-ch-yellow text-ch-bg',
        className,
      )}
      role="img"
      aria-label="ClickHouse"
    >
      <ClickHouseMark className={cn('h-[58%] w-auto', markClassName)} />
    </span>
  )
}
