import type { ReactNode } from 'react'
import { cn } from '@/src/lib/cn'

const KEYWORDS = new Set([
  'WITH',
  'AS',
  'SELECT',
  'FROM',
  'WHERE',
  'GROUP',
  'ORDER',
  'BY',
  'JOIN',
  'USING',
  'ON',
  'AND',
  'OR',
  'HAVING',
  'LIMIT',
  'INTERVAL',
  'DESC',
  'ASC',
  'NOT',
  'IN',
  'BETWEEN',
  'UNION',
  'ALL',
  'DISTINCT',
  'CREATE',
  'TABLE',
  'ENGINE',
  'ALTER',
  'ADD',
  'INDEX',
  'TYPE',
  'GRANULARITY',
])

const FUNCTIONS = new Set([
  'countDistinctIf',
  'countDistinct',
  'dateDiff',
  'min',
  'max',
  'sum',
  'avg',
  'count',
  'toDate',
  'toDateTime',
  'toStartOfMinute',
  'today',
  'JSONExtractString',
  'JSONExtractUInt',
  'JSONExtractFloat',
  'windowFunnel',
  'argMax',
  'median',
  'now',
  'round',
  'SummingMergeTree',
  'bloom_filter',
])

function highlightLine(line: string): ReactNode[] {
  const tokens = line.match(
    /(--.*$)|('(?:[^']|'')*')|(\b[A-Za-z_][A-Za-z0-9_]*\b)|(\b\d+(?:\.\d+)?\b)|(\s+)|([^\sA-Za-z0-9_']+)/g,
  )
  if (!tokens) return [line]

  return tokens.map((token, i) => {
    if (token.startsWith('--')) {
      return (
        <span key={i} className="sql-comment">
          {token}
        </span>
      )
    }
    if (token.startsWith("'")) {
      return (
        <span key={i} className="sql-str">
          {token}
        </span>
      )
    }
    if (/^\d/.test(token)) {
      return (
        <span key={i} className="sql-num">
          {token}
        </span>
      )
    }
    if (/^[A-Za-z_]/.test(token)) {
      if (KEYWORDS.has(token.toUpperCase())) {
        return (
          <span key={i} className="sql-kw">
            {token}
          </span>
        )
      }
      if (FUNCTIONS.has(token)) {
        return (
          <span key={i} className="sql-fn">
            {token}
          </span>
        )
      }
    }
    return <span key={i}>{token}</span>
  })
}

export function CodeBlock({
  code,
  filename,
  footer,
  className,
  bodyClassName,
  compact = false,
}: {
  code: string
  filename: string
  footer?: ReactNode
  className?: string
  bodyClassName?: string
  /** Denser header and body for side-by-side SQL snippets. */
  compact?: boolean
}) {
  const lines = code.replace(/\n$/, '').split('\n')
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-xl border border-white/12 bg-[#101010]',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center gap-3 border-b border-white/10',
          compact ? 'h-[30px] px-3' : 'h-[42px] px-4',
        )}
      >
        <div className={compact ? 'flex gap-1' : 'flex gap-1.5'}>
          <span
            className={cn(
              'rounded-full bg-white/15',
              compact ? 'h-[5px] w-[5px]' : 'h-[7px] w-[7px]',
            )}
          />
          <span
            className={cn(
              'rounded-full bg-white/15',
              compact ? 'h-[5px] w-[5px]' : 'h-[7px] w-[7px]',
            )}
          />
          <span
            className={cn(
              'rounded-full bg-white/15',
              compact ? 'h-[5px] w-[5px]' : 'h-[7px] w-[7px]',
            )}
          />
        </div>
        <span
          className={cn(
            'font-mono tracking-[0.04em] text-white/35',
            compact ? 'text-[9.5px]' : 'text-[12px]',
          )}
        >
          {filename}
        </span>
        <span
          className={cn(
            'ml-auto font-mono uppercase text-ch-yellow/60',
            compact
              ? 'text-[8px] tracking-[0.14em]'
              : 'text-[10.5px] tracking-[0.18em]',
          )}
        >
          ClickHouse SQL
        </span>
      </div>

      <div
        className={cn(
          'flex-1 overflow-hidden font-mono text-[#d4d4d4]',
          compact
            ? 'px-3 py-2.5 text-[10.5px] leading-[1.55]'
            : 'px-5 py-4 text-[12.8px] leading-[1.68]',
          bodyClassName,
        )}
      >
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="flex">
            <span
              className={cn(
                'shrink-0 select-none text-right text-white/20',
                compact ? 'w-5 pr-2 text-[8.5px]' : 'w-7 pr-3',
              )}
            >
              {lineIndex + 1}
            </span>
            <pre className="whitespace-pre font-mono">
              {highlightLine(line)}
            </pre>
          </div>
        ))}
      </div>

      {footer && (
        <div className="flex shrink-0 items-center gap-2 border-t border-white/10 px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  )
}
