import type { CSSProperties } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Archive,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Eye,
  Gift,
  Globe2,
  Plus,
  ShieldAlert,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { IconBox, Panel, Pill } from '@/src/components/ui'

const throughput = [
  { day: '-8', value: 94 },
  { day: '-7', value: 102 },
  { day: '-6', value: 97 },
  { day: '-5', value: 109 },
  { day: '-4', value: 104 },
  { day: '-3', value: 113 },
  { day: '-2', value: 107 },
  { day: '-1', value: 121 },
  { day: 'D0', value: 1900 },
  { day: '+1', value: 1480 },
  { day: '+2', value: 1030 },
  { day: '+3', value: 720 },
  { day: '+4', value: 540 },
  { day: '+5', value: 430 },
  { day: '+6', value: 365 },
  { day: '+7', value: 330 },
  { day: '+8', value: 312 },
  { day: '+9', value: 300 },
  { day: '+10', value: 294 },
  { day: '+11', value: 288 },
  { day: '+12', value: 283 },
  { day: '+13', value: 279 },
  { day: '+14', value: 276 },
]

const decisions = [
  { icon: ShieldAlert, title: '异常道具交易波动', action: '外挂预警' },
  { icon: Target, title: '新手关卡流失点', action: '快速调优' },
  { icon: Gift, title: '活动参与热度', action: '动态奖励' },
]

const requirements = [
  { icon: TrendingUp, label: '线性写入吞吐' },
  { icon: Archive, label: '高效压缩' },
  { icon: Eye, label: '实时可见' },
  { icon: ArrowDown, label: '平稳期可缩容' },
]

export default function Spikes() {
  return (
    <SlideLayout
      eyebrow="04 · 痛点 02 / 03 · 扩张 · 洪峰 · 时效"
      title="运维人员的手跟不上出海的业务的扩张"
      subtitle="峰值 10–20 倍爆发，决策要求秒级响应"
    >
      <div className="grid h-full grid-cols-[0.78fr_1.46fr_0.9fr] gap-4">
        {/* 01 · Regional expansion */}
        <Panel className="flex h-full flex-col p-6">
          <div className="border-b border-white/10 pb-3">
            <KeypointHeader index="01" title="区域扩张" en="Regional Expansion" />
          </div>
          <p className="mt-3 text-[12.5px] leading-[1.55] text-white/45">
            业务向新地区扩张，分析底座需要同步覆盖。
          </p>

          <div className="relative mt-4 flex flex-1 flex-col items-center justify-center">
            <Globe2
              size={230}
              strokeWidth={0.55}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.035]"
              aria-hidden="true"
            />
            <div className="flex flex-col items-center">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-ch-yellow text-ch-bg shadow-[0_0_0_9px_rgba(251,255,86,0.07)]">
                <BarChart3 size={26} strokeWidth={1.8} />
              </div>
              <span className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-ch-yellow/55">
                ONE PLATFORM
              </span>
            </div>

            <div className="h-6 w-px border-l border-dashed border-ch-yellow/30" />

            <div className="grid w-full grid-cols-2 gap-2.5">
              {['东南亚', '欧洲', '北美'].map((region) => (
                <div
                  key={region}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
                >
                  <span className="text-[12px] text-white/70">{region}</span>
                  <span className="h-[4px] w-[4px] bg-ch-yellow/60" />
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg border border-dashed border-ch-yellow/40 bg-ch-yellow/[0.04] px-3 py-2.5">
                <span className="text-[12px] text-ch-yellow/80">新地区</span>
                <Plus size={11} className="text-ch-yellow/70" />
              </div>
            </div>

            <div className="mt-5 w-full rounded-lg border border-ch-yellow/20 bg-ch-yellow/[0.03] px-3.5 py-3">
              <div className="flex items-center justify-center gap-2.5">
                <span className="font-mono text-[10.5px] tracking-[0.06em] text-ch-yellow/70">
                  REGION +1
                </span>
                <span className="text-[16px] font-semibold leading-none text-ch-yellow">
                  ≠
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.06em] text-white/40">
                  OPS +1
                </span>
              </div>
              <div className="mt-1.5 text-center text-[10.5px] leading-[1.45] text-white/35">
                区域增加不应造成线性增长的运维压力
              </div>
            </div>
          </div>
        </Panel>

        {/* 02 · Data spikes */}
        <Panel className="flex h-full flex-col p-6">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <KeypointHeader index="02" title="数据洪峰" en="Traffic Spikes" />
              <h3 className="mt-3 text-[16.5px] font-semibold text-white/85">
                写入吞吐 · 版本上线日
              </h3>
            </div>
            <Pill tone="yellow" className="shrink-0">
              <Zap size={11} />
              峰值 10–20×
            </Pill>
          </div>

          <div className="relative mt-4 min-h-[260px] flex-1">
            <div className="absolute right-[10%] top-[26%] z-10 flex items-center gap-2 rounded-md border border-white/10 bg-ch-panel/90 px-3 py-1.5">
              <span className="h-[5px] w-[5px] bg-ch-yellow" />
              <span className="text-[12.5px] text-white/55">
                平稳期可缩容
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={throughput}
                margin={{ top: 26, right: 10, bottom: 4, left: 2 }}
              >
                <defs>
                  <linearGradient id="spikeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="#fbff56"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="100%"
                      stopColor="#fbff56"
                      stopOpacity={0.012}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="#2b2b2b"
                  strokeWidth={1}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  ticks={['-8', '-5', '-2', 'D0', '+3', '+7', '+14']}
                  tick={{
                    fill: '#8a8a8a',
                    fontSize: 10,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                  tickMargin={10}
                />
                <YAxis hide domain={[0, 2050]} />
                <Tooltip content={<SpikeTooltip />} cursor={false} />
                <ReferenceLine
                  x="D0"
                  stroke="#fbff56"
                  strokeOpacity={0.35}
                  strokeWidth={1}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#fbff56"
                  strokeWidth={2}
                  fill="url(#spikeFill)"
                  activeDot={{
                    r: 4,
                    fill: '#fbff56',
                    stroke: '#151515',
                    strokeWidth: 2,
                  }}
                />
                <ReferenceDot
                  x="D0"
                  y={1900}
                  r={4}
                  fill="#fbff56"
                  stroke="#151515"
                  strokeWidth={2}
                  label={{
                    value: '10–20×',
                    position: 'top',
                    fill: '#ffffff',
                    fontSize: 12,
                    fontWeight: 600,
                    offset: 12,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-5 bg-ch-yellow" />
              <span className="text-[12px] text-white/40">
                写入量（基线 = 100）· 新版本上线当天出现瞬时爆发
              </span>
            </div>
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-white/25">
              D-8 — D+14
            </span>
          </div>

          <div className="mt-3 shrink-0 border-t border-white/10 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/25">
                PLATFORM REQUIREMENTS
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/20">
                4 capabilities
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {requirements.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.025] px-3 py-2"
                >
                  <Icon size={12} className="text-ch-yellow" />
                  <span className="text-[11.5px] text-white/55">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* 03 · Real-time decisions */}
        <Panel className="flex h-full flex-col p-6">
          <div className="border-b border-white/10 pb-3">
            <KeypointHeader index="03" title="实时决策" en="Real-time Decisions" />
          </div>

          <div className="mt-5 flex items-end gap-4">
            <div className="text-[60px] font-semibold leading-none tracking-[-0.05em] text-ch-yellow">
              ≤ 1s
            </div>
            <div className="pb-1.5 text-[13px] leading-[1.5] text-white/50">
              亿级事件聚合
              <br />
              从事件到洞察
            </div>
          </div>

          <div className="mt-6 flex flex-1 flex-col justify-center">
            {decisions.map(({ icon: Icon, title, action }, i) => (
              <div
                key={title}
                className="flex items-center gap-3 border-t border-white/[0.08] py-3.5 first:border-0 first:pt-0"
                style={{ '--delay': `${260 + i * 60}ms` } as CSSProperties}
              >
                <IconBox icon={Icon} size={32} />
                <span className="flex-1 text-[14px] text-white/75">
                  {title}
                </span>
                <span className="font-mono text-[11px] tracking-[0.1em] text-ch-yellow/80">
                  {action}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
            <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/25">
              Decision loop · ≤ 1s
            </div>
            <div className="flex items-center justify-between">
              {['事件', '聚合', '洞察', '动作'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="text-[11.5px] text-white/60">
                    {step}
                  </span>
                  {i < 3 && (
                    <ArrowRight size={11} className="text-ch-yellow/45" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
            <span className="h-[4px] w-[4px] bg-ch-yellow" />
            <span className="text-[11px] leading-[1.5] text-white/35">
              从事件到洞察，再到动作——全部发生在秒级窗口内
            </span>
          </div>
        </Panel>
      </div>
    </SlideLayout>
  )
}

function KeypointHeader({
  index,
  title,
  en,
}: {
  index: string
  title: string
  en: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ch-yellow font-mono text-[11px] font-semibold text-ch-bg">
        {index}
      </span>
      <span className="text-[18px] font-semibold tracking-[-0.01em]">
        {title}
      </span>
      <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/25">
        {en}
      </span>
    </div>
  )
}

function SpikeTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value?: number | string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  const value = Number(payload[0]?.value ?? 0)
  return (
    <div className="rounded-md border border-white/12 bg-[#222] px-3 py-2 shadow-xl">
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
        {label === 'D0' ? '版本上线' : `Day ${label}`}
      </div>
      <div className="mt-1 text-[14.5px] font-medium text-white">
        {value.toLocaleString()}
        <span className="ml-1.5 text-[12px] font-normal text-white/40">
          · 基线 100
        </span>
      </div>
    </div>
  )
}
