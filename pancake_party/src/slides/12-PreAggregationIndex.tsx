import type { CSSProperties, ReactNode } from 'react'
import {
  ArrowDown,
  Filter,
  Sigma,
  Zap,
} from 'lucide-react'
import { CodeBlock } from '@/src/components/CodeBlock'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill } from '@/src/components/ui'
import { cn } from '@/src/lib/cn'

const summingSql = `CREATE TABLE daily_user_stats (
    stat_date Date,
    user_id UInt64,
    login_count UInt16,
    play_minutes UInt32,
    payment_total Decimal(18, 2)
) ENGINE = SummingMergeTree()
ORDER BY (stat_date, user_id)`

const skippingSql = `ALTER TABLE game_events
    ADD INDEX idx_item(item_id)
    TYPE bloom_filter GRANULARITY 3;

SELECT count()
FROM game_events
WHERE item_id = 10086
  AND event_time >= now() - INTERVAL 1 DAY`

export default function PreAggregationIndex() {
  return (
    <SlideLayout
      eyebrow="11 · 性能实践"
      title="预聚合与跳数索引：只读必要的数据"
      subtitle="固定指标读预聚合，高选择性过滤跳过数据块——两类低成本的 ClickHouse 原生加速"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-5">
          <TechniquePanel
            index="01"
            en="PRE-AGGREGATION"
            pill="SummingMergeTree"
            title="固定维度指标预聚合"
            scenario="赛季累计 · 日活 · 游玩时长 · 付费总额等固定指标被高频查询"
            filename="daily_user_stats.sql"
            sql={summingSql}
            benefit="查询直接读预聚合结果，避免每次扫描明细"
            delay={140}
          >
            <PreAggregationVisual />
          </TechniquePanel>

          <TechniquePanel
            index="02"
            en="DATA SKIPPING INDEX"
            pill="bloom_filter"
            title="特定条件查询加速"
            scenario="按道具 ID 等高选择性字段过滤查询"
            filename="game_events.sql"
            sql={skippingSql}
            benefit="Bloom Filter 跳过不相关数据块，减少扫描量"
            delay={200}
          >
            <SkipIndexVisual />
          </TechniquePanel>
        </div>

        <div
          className="anim-fade flex h-[46px] shrink-0 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-5"
          style={{ '--delay': '260ms' } as CSSProperties}
        >
          <span className="h-[5px] w-[5px] shrink-0 bg-ch-yellow" />
          <p className="text-[13.5px] text-white/45">
            预聚合解决「指标高频查」，跳数索引解决「过滤要快」——都应在建模阶段纳入设计。
          </p>
          <span className="ml-auto shrink-0 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/25">
            建模阶段 · 而非事后补救
          </span>
        </div>
      </div>
    </SlideLayout>
  )
}

function TechniquePanel({
  index,
  en,
  pill,
  title,
  scenario,
  filename,
  sql,
  benefit,
  delay,
  children,
}: {
  index: string
  en: string
  pill: string
  title: string
  scenario: string
  filename: string
  sql: string
  benefit: string
  delay: number
  children: ReactNode
}) {
  return (
    <Panel
      className="anim-rise flex min-h-0 flex-col p-6"
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] text-ch-yellow/60">
            {index}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            {en}
          </span>
        </div>
        <Pill tone="yellow" className="shrink-0">
          {pill}
        </Pill>
      </div>

      <h3 className="mt-3 shrink-0 text-[21px] font-semibold">{title}</h3>
      <div className="mt-1.5 flex shrink-0 items-center gap-2">
        <span className="h-[3px] w-[3px] shrink-0 bg-ch-yellow" />
        <span className="truncate text-[11.5px] text-white/40">
          场景 · {scenario}
        </span>
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col">{children}</div>

      <CodeBlock
        className="mt-4 shrink-0"
        filename={filename}
        code={sql}
        compact
      />

      <div className="mt-4 flex shrink-0 items-center gap-2 border-t border-white/10 pt-3">
        <Zap size={12} className="shrink-0 text-ch-yellow" />
        <span className="text-[12px] text-white/45">{benefit}</span>
      </div>
    </Panel>
  )
}

function PreAggregationVisual() {
  const detailWidths = ['58%', '44%', '66%', '50%', '62%', '38%']
  const days = ['11-01', '11-02', '11-03']

  return (
    <div className="flex h-full items-center justify-center gap-5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-5">
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-white/25">
          DETAIL · 明细事件
        </div>
        <div className="mt-2.5 space-y-1.5">
          {detailWidths.map((width, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="h-[4px] w-[4px] shrink-0 rounded-full bg-white/25" />
              <span
                className="h-[6px] rounded-sm bg-white/[0.08]"
                style={{ width }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2.5 font-mono text-[8px] uppercase tracking-[0.1em] text-white/25">
          每次查询扫描明细
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-1.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ch-yellow/45 bg-ch-yellow/[0.08]">
          <Sigma size={16} className="text-ch-yellow" />
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ch-yellow/60">
          SUM
        </span>
        <span className="font-mono text-[7.5px] tracking-[0.04em] text-white/25">
          (date, user)
        </span>
      </div>

      <div className="w-[210px] shrink-0">
        <div className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-white/25">
          daily_user_stats
        </div>
        <div className="mt-2.5 space-y-1.5">
          {days.map((day) => (
            <div
              key={day}
              className="flex items-center gap-2 rounded-md border border-ch-yellow/30 bg-ch-yellow/[0.05] px-2.5 py-1.5"
            >
              <span className="font-mono text-[8px] text-ch-yellow/60">
                {day}
              </span>
              <span className="h-[5px] flex-1 rounded-sm bg-ch-yellow/15" />
              <span className="font-mono text-[8px] text-white/25">u_1024</span>
            </div>
          ))}
        </div>
        <div className="mt-2.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ch-yellow/50">
          查询只读聚合结果
        </div>
      </div>
    </div>
  )
}

function SkipIndexVisual() {
  const granules = [false, false, true, false, false, true, false, false]

  return (
    <div className="flex h-full flex-col justify-center gap-4 rounded-lg border border-white/[0.06] bg-white/[0.02] px-5">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <Filter size={11} className="shrink-0 text-ch-yellow" />
          <span className="font-mono text-[10px] text-white/55">
            WHERE item_id = 10086
          </span>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/25">
          8 GRANULES · BLOOM FILTER
        </span>
      </div>

      <div className="flex justify-center">
        <ArrowDown size={13} className="text-ch-yellow/50" />
      </div>

      <div className="flex items-center gap-1.5">
        {granules.map((read, i) => (
          <div
            key={i}
            className={cn(
              'flex h-[62px] flex-1 flex-col items-center justify-center rounded-md border',
              read
                ? 'border-ch-yellow/55 bg-ch-yellow/[0.09]'
                : 'border-white/[0.07] bg-white/[0.02]',
            )}
          >
            <span
              className={cn(
                'font-mono text-[8px]',
                read ? 'text-ch-yellow/70' : 'text-white/20',
              )}
            >
              G0{i + 1}
            </span>
            <span
              className={cn(
                'mt-1 font-mono text-[7px] uppercase tracking-[0.08em]',
                read ? 'text-ch-yellow' : 'text-white/20',
              )}
            >
              {read ? 'read' : 'skip'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.1em]">
        <span className="text-white/25">不相关数据块直接跳过</span>
        <span className="text-ch-yellow/55">只读命中的 Granule</span>
      </div>
    </div>
  )
}
