import type { CSSProperties } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  Gamepad2,
  Globe2,
  Server,
  Workflow,
} from 'lucide-react'
import { ClickHouseLogo } from '@/src/components/ClickHouseLogo'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill } from '@/src/components/ui'
import { cn } from '@/src/lib/cn'

export default function Migration() {
  return (
    <SlideLayout
      eyebrow="09 · 迁移策略"
      title="国内双跑，海外新建"
      subtitle="结果完全一致后再切换——双跑不是可选项"
    >
      <div className="flex h-full flex-col gap-3">
        <div className="grid min-h-0 flex-1 grid-cols-[1.16fr_0.84fr] gap-5">
          <Panel className="flex flex-col p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/30">
                  CHINA · EXISTING SYSTEM
                </div>
                <h3 className="mt-2 text-[24px] font-semibold">
                  国内存量 · 双跑
                </h3>
              </div>
              <Pill tone="yellow">Dual Run</Pill>
            </div>

            <p className="mt-2.5 text-[14.5px] leading-[1.55] text-white/45">
              Kafka 事件双系统消费，Flink 任务双路写入；结果完全匹配后再切换。
            </p>

            <div className="mt-4 grid grid-cols-[1fr_20px_1fr_20px_1fr] items-center">
              {[
                { label: 'Kafka / Flink 双跑', index: '01' },
                { label: '结果逐项比对', index: '02' },
                { label: 'Doris 下线', index: '03' },
              ].map((step, i) => (
                <div key={step.index} className="contents">
                  <div className="flex items-center gap-2.5 rounded-md border border-white/[0.08] bg-white/[0.025] px-3.5 py-2">
                    <span className="font-mono text-[11px] text-ch-yellow/55">
                      {step.index}
                    </span>
                    <span className="truncate text-[13px] text-white/55">
                      {step.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="flex justify-center">
                      <ArrowRight size={13} className="text-white/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-1 items-center justify-between gap-3">
              <div className="w-[168px] space-y-4">
                <div className="pl-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/25">
                  Sources
                </div>
                <SourceBox icon={Workflow} title="Kafka / CDC" sub="事件流" />
                <SourceBox icon={Server} title="Flink Jobs" sub="实时任务" />
              </div>

              <div className="flex flex-col items-center">
                <ForkArrows />
                <span className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ch-yellow/55">
                  双路写入
                </span>
              </div>

              <div className="w-[200px] space-y-4">
                <div className="pl-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/25">
                  Systems
                </div>
                <SystemBox title="Doris" sub="现有系统" />
                <SystemBox title="ClickHouse" sub="新建 · 企业版" accent />
              </div>

              <ArrowRight size={18} className="shrink-0 text-white/25" />

              <div className="w-[166px] shrink-0">
                <div className="flex h-[100px] flex-col items-center justify-center rounded-lg border border-ch-yellow/45 bg-ch-yellow/[0.06]">
                  <span className="font-mono text-[24px] font-semibold text-ch-yellow">
                    100%
                  </span>
                  <span className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">
                    results match
                  </span>
                </div>
                <div className="flex justify-center py-1.5">
                  <ArrowDown size={16} className="text-ch-yellow/50" />
                </div>
                <div className="flex h-[70px] items-center justify-center rounded-lg bg-ch-yellow px-2 text-center text-[14.5px] font-semibold text-ch-bg">
                  切换 · Doris 下线
                </div>
              </div>
            </div>

            <div className="mt-3.5 grid grid-cols-3 gap-3 border-t border-white/10 pt-3">
              {['CDC 双系统消费', 'Flink 双路写入', '结果一致后切换'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className="shrink-0 text-ch-yellow"
                    />
                    <span className="text-[13px] text-white/55">{item}</span>
                  </div>
                ),
              )}
            </div>
          </Panel>

          <Panel className="flex flex-col p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/30">
                  OVERSEAS · GREENFIELD
                </div>
                <h3 className="mt-2 text-[24px] font-semibold">
                  海外新系统 · 新建
                </h3>
              </div>
              <Pill>Aliyun</Pill>
            </div>

            <div className="relative mt-4 flex flex-1 flex-col justify-center gap-2">
              <Globe2
                size={210}
                strokeWidth={0.7}
                className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 text-white/[0.05]"
              />

              <div className="mb-1 pl-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/25">
                All sources
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Database, label: 'Database' },
                  { icon: Gamepad2, label: 'Game Log' },
                  { icon: BarChart3, label: 'Data API' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-4"
                  >
                    <Icon size={16} className="text-white/45" />
                    <span className="text-[12.5px] text-white/65">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center py-1.5">
                <ArrowDown size={15} className="text-white/25" />
              </div>

              <div className="rounded-xl border border-ch-yellow/55 bg-ch-yellow/[0.055] px-5 py-6">
                <div className="flex items-center justify-between">
                  <ClickHouseLogo className="text-[17px] text-white" />
                  <Pill tone="yellow" className="px-2.5 py-1 text-[10px]">
                    企业版
                  </Pill>
                </div>
                <div className="mt-4 flex items-center justify-between text-[12px] text-white/45">
                  <span>阿里云 · 托管</span>
                  <span className="font-mono tracking-[0.08em]">
                    ALL SOURCES → ONE ENGINE
                  </span>
                </div>
              </div>

              <div className="flex justify-center py-1.5">
                <ArrowDown size={15} className="text-white/25" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['报表分析', '运营监控', '实时风控'].map((label) => (
                  <div
                    key={label}
                    className="flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] py-3 text-[12.5px] text-white/65"
                  >
                    {label}
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                    Migration cost
                  </div>
                  <div className="mt-1.5 text-[24px] font-semibold text-white/80">
                    0 → 1
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
                    Historical debt
                  </div>
                  <div className="mt-1.5 text-[24px] font-semibold text-ch-yellow">
                    None
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3.5 flex items-center gap-2.5 border-t border-white/10 pt-3">
              <span className="h-[5px] w-[5px] bg-ch-yellow" />
              <span className="text-[13px] leading-[1.5] text-white/45">
                没有历史包袱：直接以 ClickHouse 为目标引擎
              </span>
            </div>
          </Panel>
        </div>

        <div className="flex h-[46px] shrink-0 items-center justify-center gap-3 rounded-lg border border-ch-yellow/25 bg-ch-yellow/[0.045]">
          <span className="h-[6px] w-[6px] bg-ch-yellow" />
          <span className="text-[15.5px] font-medium text-ch-yellow">
            双跑不是可选项——它是「结果一致」的唯一证据。
          </span>
        </div>
      </div>
    </SlideLayout>
  )
}

function SourceBox({
  icon: Icon,
  title,
  sub,
}: {
  icon: typeof Workflow
  title: string
  sub: string
}) {
  return (
    <div className="flex h-[118px] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3.5">
      <Icon size={17} className="shrink-0 text-white/45" />
      <div className="min-w-0">
        <div className="truncate text-[15px] font-medium text-white/80">
          {title}
        </div>
        <div className="mt-1 text-[12px] text-white/40">{sub}</div>
      </div>
    </div>
  )
}

function SystemBox({
  title,
  sub,
  accent = false,
}: {
  title: string
  sub: string
  accent?: boolean
}) {
  return (
    <div
      className={cn(
        'flex h-[118px] flex-col justify-center rounded-lg border px-4',
        accent
          ? 'border-ch-yellow/55 bg-ch-yellow/[0.07]'
          : 'border-white/10 bg-white/[0.03]',
      )}
    >
      <div
        className={cn(
          'text-[15.5px] font-medium',
          accent ? 'text-ch-yellow' : 'text-white/70',
        )}
      >
        {title}
      </div>
      <div className="mt-1 text-[12px] text-white/40">{sub}</div>
    </div>
  )
}

function ForkArrows() {
  return (
    <svg
      width="52"
      height="260"
      viewBox="0 0 52 260"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
      style={{ '--delay': '260ms' } as CSSProperties}
    >
      <g stroke="white" strokeOpacity="0.22" strokeWidth="1.1">
        <path d="M0 66 H24" />
        <path d="M0 196 H24" />
        <path d="M24 66 V196" />
        <path d="M24 66 H52" />
        <path d="M24 196 H52" />
      </g>
      <circle cx="24" cy="131" r="3.2" fill="#fbff56" fillOpacity="0.55" />
      {[66, 196].map((y) => (
        <path
          key={y}
          d={`M46 ${y - 3.5} L52 ${y} L46 ${y + 3.5}`}
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="1.1"
        />
      ))}
    </svg>
  )
}
