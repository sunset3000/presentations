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
  Eye,
  Gift,
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
      eyebrow="04 · 痛点 02 / 03 · 洪峰与时效"
      title="峰值 10–20 倍爆发，决策要求秒级响应"
      subtitle="增长不是线性曲线——容量与时效同时被推向极限"
    >
      <div className="grid h-full grid-cols-[1.32fr_0.88fr] gap-5">
        <Panel className="flex flex-col p-7">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono text-[12px] tracking-[0.24em] text-white/35">
                INGEST THROUGHPUT
              </div>
              <h3 className="mt-2 text-[18px] font-semibold">
                写入吞吐 · 版本上线日
              </h3>
            </div>
            <Pill tone="yellow">
              <Zap size={11} />
              峰值 10–20×
            </Pill>
          </div>

          <div className="relative mt-3 h-[342px] flex-1">
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

          <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-5 bg-ch-yellow" />
              <span className="text-[12.5px] text-white/40">
                写入量（基线 = 100）· 新版本上线当天出现瞬时爆发
              </span>
            </div>
            <span className="font-mono text-[11px] tracking-[0.16em] text-white/25">
              D-8 — D+14
            </span>
          </div>
        </Panel>

        <div className="flex h-full flex-col gap-4">
          <Panel className="flex-1 p-7">
            <div className="font-mono text-[12px] tracking-[0.24em] text-white/35">
              REAL-TIME DECISION
            </div>
            <div className="mt-3 flex items-end gap-4">
              <div className="text-[64px] font-semibold leading-none tracking-[-0.05em] text-ch-yellow">
                ≤ 1s
              </div>
              <div className="pb-1.5 text-[13.5px] leading-[1.5] text-white/50">
                亿级事件聚合
                <br />
                从事件到洞察
              </div>
            </div>

            <div className="mt-6 space-y-0">
              {decisions.map(({ icon: Icon, title, action }, i) => (
                <div
                  key={title}
                  className="flex items-center gap-3 border-t border-white/[0.08] py-3.5 first:border-0 first:pt-0"
                  style={
                    { '--delay': `${260 + i * 60}ms` } as CSSProperties
                  }
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
          </Panel>

          <Panel flat className="p-5">
            <div className="font-mono text-[11px] tracking-[0.2em] text-white/30">
              PLATFORM REQUIREMENTS
            </div>
            <div className="mt-3.5 grid grid-cols-2 gap-2.5">
              {requirements.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.025] px-3 py-2.5"
                >
                  <Icon size={12} className="text-ch-yellow" />
                  <span className="text-[12.5px] text-white/60">{label}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </SlideLayout>
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
