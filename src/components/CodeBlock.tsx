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
])

const FUNCTIONS = new Set([
  'countDistinctIf',
  'dateDiff',
  'min',
  'max',
  'sum',
  'avg',
  'count',
  'toDate',
  'toDateTime',
  'JSONExtractUInt',
  'JSONExtractFloat',
  'windowFunnel',
  'argMax',
  'median',
  'now',
  'round',
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
}: {
  code: string
  filename: string
  footer?: ReactNode
  className?: string
  bodyClassName?: string
}) {
  const lines = code.replace(/\n$/, '').split('\n')
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-xl border border-white/12 bg-[#101010]',
        className,
      )}
    >
      <div className="flex h-[42px] shrink-0 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex gap-1.5">
          <span className="h-[7px] w-[7px] rounded-full bg-white/15" />
          <span className="h-[7px] w-[7px] rounded-full bg-white/15" />
          <span className="h-[7px] w-[7px] rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[12px] tracking-[0.04em] text-white/35">
          {filename}
        </span>
        <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.18em] text-ch-yellow/60">
          ClickHouse SQL
        </span>
      </div>

      <div
        className={cn(
          'flex-1 overflow-hidden px-5 py-4 font-mono text-[12.8px] leading-[1.68] text-[#d4d4d4]',
          bodyClassName,
        )}
      >
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="flex">
            <span className="w-7 shrink-0 select-none pr-3 text-right text-white/20">
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
