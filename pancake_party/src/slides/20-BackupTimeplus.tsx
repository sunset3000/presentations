import type { ReactNode } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill } from '@/src/components/ui'
import { cn } from '@/src/lib/cn'

const limits = [
  '只在单张源表的插入块上触发，不是持续查询',
  'JOIN 定义中只有左侧源表触发；右侧变更不会更新',
  '没有时间窗口与流语义，多流持续 JOIN 做不了',
]

const steps = [
  {
    index: '01',
    title: '定义多流 JOIN',
    desc: '行为流 · 道具流 · 画像流按事件时间关联',
  },
  {
    index: '02',
    title: '封装为物化视图',
    desc: '持续运行，增量输出打平后的宽表行',
  },
  {
    index: '03',
    title: 'External Table 写入',
    desc: 'Timeplus 直接写入 ClickHouse 目标表',
    accent: true,
  },
  {
    index: '04',
    title: '只扫描与聚合',
    desc: '查询侧无 JOIN，列式扫描 + 向量化',
  },
]

export default function BackupTimeplus() {
  return (
    <SlideLayout
      eyebrow="BACKUP 3 · 宽表构建"
      title="宽表在写入前打平，查询侧不再 JOIN"
      subtitle="ClickHouse 物化视图是单表触发器；Timeplus 物化视图是持续运行的流式查询"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-[0.94fr_1.06fr] gap-5">
          <Panel className="flex flex-col p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
                  CLICKHOUSE MATERIALIZED VIEW
                </div>
                <h3 className="mt-2 text-[19px] font-semibold">
                  单表触发器，接不住多流 JOIN
                </h3>
              </div>
              <Pill>能力边界</Pill>
            </div>

            <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
              <NativeMVVisual />

              <div>
                <SectionLabel>为什么不够用</SectionLabel>
                <div className="mt-2 space-y-1.5">
                  {limits.map((limit) => (
                    <div key={limit} className="flex items-start gap-2">
                      <X
                        size={11}
                        strokeWidth={2.2}
                        className="mt-[3px] shrink-0 text-white/25"
                        aria-hidden="true"
                      />
                      <span className="text-[11.5px] leading-[1.5] text-white/40">
                        {limit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>对宽表构建的影响</SectionLabel>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {['玩家行为流', '道具配置', '用户画像流', '活动状态'].map(
                    (source) => (
                      <span
                        key={source}
                        className="rounded border border-white/12 bg-white/[0.03] px-2 py-1 font-mono text-[9px] text-white/45"
                      >
                        {source}
                      </span>
                    ),
                  )}
                </div>
                <div className="mt-2">
                  <SquarePoint>
                    多流实时到达、时间乱序，写入侧无法完成关联
                  </SquarePoint>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-3 py-2">
                <span className="h-[4px] w-[4px] shrink-0 bg-ch-yellow" />
                <span className="text-[10.5px] leading-[1.45] text-white/35">
                  查询侧补 JOIN → 回到 Non-Join 与 Join 的 10–100× 差距
                </span>
              </div>
            </div>
          </Panel>

          <Panel className="flex flex-col p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
                  TIMEPLUS MATERIALIZED VIEW
                </div>
                <h3 className="mt-2 text-[19px] font-semibold">
                  持续运行的流式查询，在写入前打平
                </h3>
              </div>
              <Pill tone="yellow">补位</Pill>
            </div>

            <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
              <TimeplusVisual />

              <div>
                <SectionLabel>定位</SectionLabel>
                <div className="mt-2 space-y-1.5">
                  <SquarePoint>
                    Proton：基于 ClickHouse 引擎构建的流处理引擎
                  </SquarePoint>
                  <SquarePoint>
                    物化视图持续运行，增量处理流入数据
                  </SquarePoint>
                </div>
              </div>

              <div>
                <SectionLabel>执行路径</SectionLabel>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  {steps.map((step) => (
                    <div
                      key={step.index}
                      className={cn(
                        'flex min-h-[64px] flex-col justify-center rounded-lg border px-3.5 py-2.5',
                        step.accent
                          ? 'border-ch-yellow/30 bg-ch-yellow/[0.05]'
                          : 'border-white/[0.08] bg-white/[0.02]',
                      )}
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[9px] text-ch-yellow/60">
                          {step.index}
                        </span>
                        <span className="text-[12px] font-medium text-white/75">
                          {step.title}
                        </span>
                      </div>
                      <div className="mt-1 text-[10.5px] leading-[1.45] text-white/35">
                        {step.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-md border border-ch-yellow/25 bg-ch-yellow/[0.045] px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ch-yellow/60">
                    Hybrid Hash Table
                  </span>
                  <span className="ml-auto font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/25">
                    高基数 JOIN
                  </span>
                </div>
                <div className="mt-1 text-[10.5px] leading-[1.45] text-white/40">
                  热 key 驻留内存 · 冷 key 溢写 RocksDB ·{' '}
                  <span className="font-mono text-white/55">max_hot_keys</span> + LRU
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="flex h-[46px] shrink-0 items-center gap-3 rounded-lg border border-ch-yellow/25 bg-ch-yellow/[0.045] px-5">
          <span className="h-[5px] w-[5px] bg-ch-yellow" />
          <p className="text-[13.5px] text-ch-yellow">
            ClickHouse MV 做内部预聚合，Timeplus MV 做上游宽表打平——互补，而非替代。
          </p>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
            Upstream · Not replacement
          </span>
        </div>
      </div>
    </SlideLayout>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">
      <span className="h-[3px] w-[3px] bg-ch-yellow/60" />
      {children}
    </div>
  )
}

function SquarePoint({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-[5px] h-[3px] w-[3px] shrink-0 bg-white/30" />
      <span className="text-[11px] leading-[1.45] text-white/40">
        {children}
      </span>
    </div>
  )
}

function NativeMVVisual() {
  return (
    <div className="flex flex-col rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <div className="flex items-center gap-2">
        <TableChip label="源表 A" />
        <FlowLabel text="INSERT" />
        <div className="rounded-md border border-ch-yellow/35 bg-ch-yellow/[0.06] px-2.5 py-1.5">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-ch-yellow/80">
            Materialized View
          </div>
          <div className="mt-0.5 text-[9px] text-white/40">后置计算</div>
        </div>
        <FlowLabel text="WRITE" />
        <TableChip label="目标表" />
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-md border border-white/[0.06] bg-black/15 px-3 py-2">
        <TableChip label="右表 B" dim />
        <FlowLabel text="UPDATE" />
        <X size={12} className="text-white/30" aria-hidden="true" />
        <span className="text-[10px] text-white/30">
          不触发 MV，宽表字段不更新
        </span>
      </div>
    </div>
  )
}

function TimeplusVisual() {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-1.5">
          {['行为流', '道具流', '画像流'].map((stream) => (
            <div key={stream} className="flex items-center gap-1.5">
              <span className="rounded border border-white/12 bg-white/[0.04] px-2 py-1 font-mono text-[9px] text-white/45">
                {stream}
              </span>
              <ArrowRight size={9} className="text-white/20" />
            </div>
          ))}
        </div>

        <div className="flex-1 rounded-md border border-ch-yellow/35 bg-ch-yellow/[0.06] px-3 py-2.5">
          <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-ch-yellow/80">
            Timeplus Materialized View
          </div>
          <div className="mt-1 text-[11px] text-white/45">
            持续多流 JOIN · 字段打平
          </div>
        </div>

        <ArrowRight size={12} className="shrink-0 text-ch-yellow/50" />

        <div className="shrink-0 rounded-md border border-white/15 bg-white/[0.04] px-3 py-2.5">
          <div className="font-mono text-[9px] text-white/60">
            ClickHouse 宽表
          </div>
          <div className="mt-1 text-[9.5px] text-white/30">
            查询侧无 JOIN · 只扫描聚合
          </div>
        </div>
      </div>
    </div>
  )
}

function TableChip({ label, dim = false }: { label: string; dim?: boolean }) {
  return (
    <span
      className={cn(
        'shrink-0 rounded border px-2 py-1 font-mono text-[9px]',
        dim
          ? 'border-white/10 bg-white/[0.02] text-white/35'
          : 'border-white/15 bg-white/[0.04] text-white/60',
      )}
    >
      {label}
    </span>
  )
}

function FlowLabel({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-white/25">
        {text}
      </span>
      <ArrowRight size={10} className="text-white/25" aria-hidden="true" />
    </span>
  )
}
