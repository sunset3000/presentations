import type { CSSProperties } from 'react'
import {
  Activity,
  BrainCircuit,
  Coins,
  Flame,
  HardDrive,
  Radar,
  ShieldCheck,
  Snowflake,
} from 'lucide-react'
import { ClickHouseStamp } from '@/src/components/ClickHouseLogo'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill } from '@/src/components/ui'

export default function CostEcosystem() {
  return (
    <SlideLayout
      eyebrow="13 · 方案价值 02"
      title="代价是什么，为什么仍然值得"
      subtitle="迁云不代表上 SaaS——成本现实必须被正视"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-[1.02fr_0.98fr] gap-5">
          <Panel className="flex flex-col p-7">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
                  COST REALITY
                </div>
                <h3 className="mt-2 text-[19px] font-semibold">成本现实</h3>
              </div>
              <Pill tone="yellow">诚实呈现</Pill>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[56px] font-semibold leading-none tracking-[-0.045em]">
                    480
                  </span>
                  <span className="text-[18px] font-medium text-ch-yellow">
                    TB
                  </span>
                </div>
                <div className="mt-2.5 text-[13px] text-white/45">
                  240 TB 业务数据 × 2 副本 = 物理磁盘占用
                </div>
              </div>
              <div className="flex items-end gap-1.5 pb-1">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex h-[86px] w-[48px] flex-col justify-end rounded-t-md border border-white/10 bg-white/[0.04] p-1.5"
                  >
                    <span className="h-[62px] w-full rounded-sm bg-white/15" />
                    <span className="mt-1 text-center font-mono text-[9px] text-white/30">
                      R{i}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 h-px w-full bg-white/10" />

            <div className="mt-4 space-y-3">
              {[
                {
                  icon: HardDrive,
                  title: '存储不是免费的',
                  desc: '仅存储一项，双副本即产生数千美元额外支出。',
                },
                {
                  icon: Coins,
                  title: '硬件更强，价格更高',
                  desc: '迁云但不使用 SaaS，性能上去了，账单也上去了。',
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="anim-rise flex gap-3"
                  style={{ '--delay': `${160 + i * 70}ms` } as CSSProperties}
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.05]">
                    <Icon size={13} className="text-ch-yellow/80" />
                  </span>
                  <div>
                    <div className="text-[13px] font-medium text-white/75">
                      {title}
                    </div>
                    <div className="mt-0.5 text-[12px] leading-[1.5] text-white/35">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-[4px] w-[4px] bg-ch-yellow" />
                <span className="text-[12.5px] font-medium text-white/60">
                  为什么仍然值得
                </span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-[1.6] text-white/35">
                这笔账要放在工程师时间、业务连续性与扩容确定性上一起算。
              </p>
            </div>

            <div className="mt-auto border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                  冷热分层 · 成本可减半
                </span>
                <span className="text-[10.5px] text-white/30">
                  需要规划与测试
                </span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex h-[34px] items-center justify-between rounded-md border border-ch-yellow/30 bg-ch-yellow/[0.055] px-3">
                  <span className="flex items-center gap-2 text-[11.5px] text-white/65">
                    <Flame size={11} className="text-ch-yellow" />
                    Hot · 实时查询
                  </span>
                  <span className="font-mono text-[9.5px] text-white/25">
                    CLICKHOUSE
                  </span>
                </div>
                <div className="flex h-[34px] items-center justify-between rounded-md border border-white/[0.08] bg-white/[0.025] px-3">
                  <span className="flex items-center gap-2 text-[11.5px] text-white/45">
                    <Snowflake size={11} className="text-white/30" />
                    Cold · 历史归档
                  </span>
                  <span className="font-mono text-[9.5px] text-white/20">
                    OBJECT STORAGE
                  </span>
                </div>
              </div>
            </div>
          </Panel>

          <Panel className="flex flex-col p-7">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
                  ECOSYSTEM
                </div>
                <h3 className="mt-2 text-[19px] font-semibold">生态延展</h3>
              </div>
              <Pill>Open</Pill>
            </div>

            <div className="relative mt-2 flex-1">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {[
                  [50, 50, 24, 26],
                  [50, 50, 76, 26],
                  [50, 50, 24, 74],
                  [50, 50, 76, 74],
                ].map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="white"
                    strokeOpacity="0.12"
                    strokeWidth="0.3"
                  />
                ))}
              </svg>

              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <ClickHouseStamp className="h-[84px] w-[84px]" />
              </div>

              <EcosystemNode
                className="left-0 top-[2%]"
                icon={Radar}
                title="ClickStack / SigNoz"
                sub="Trace 与可观测性"
                delay={200}
              />
              <EcosystemNode
                className="right-0 top-[2%]"
                icon={Activity}
                title="OpenTelemetry"
                sub="统一遥测采集"
                delay={260}
              />
              <EcosystemNode
                className="bottom-[3%] left-0"
                icon={BrainCircuit}
                title="AI / ML"
                sub="特征、推理与 Agent"
                delay={320}
              />
              <EcosystemNode
                className="bottom-[3%] right-0"
                icon={ShieldCheck}
                title="AI Security / 治理"
                sub="权限 · 审计 · 脱敏"
                delay={380}
              />
            </div>

            <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3">
              <p className="text-[12.5px] leading-[1.6] text-white/45">
                从单一 OLAP 引擎，延展到
                <span className="text-white/80"> 可观测性、AI / ML </span>
                等负载——一套生态支撑多类场景。
              </p>
            </div>
          </Panel>
        </div>

        <div className="flex h-[46px] shrink-0 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-5">
          <span className="h-[5px] w-[5px] bg-ch-yellow" />
          <p className="text-[13.5px] text-white/45">
            不回避代价，才能让「值得」站得住脚。
          </p>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
            Honest cost · Clear return
          </span>
        </div>
      </div>
    </SlideLayout>
  )
}

function EcosystemNode({
  icon: Icon,
  title,
  sub,
  className,
  delay,
}: {
  icon: typeof Radar
  title: string
  sub: string
  className: string
  delay: number
}) {
  return (
    <div
      className={`anim-rise absolute z-10 w-[212px] rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-3 ${className}`}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <div className="flex items-center gap-2">
        <Icon size={13} className="text-ch-yellow" />
        <span className="text-[13px] font-medium text-white/80">{title}</span>
      </div>
      <div className="mt-1 text-[11px] text-white/30">{sub}</div>
    </div>
  )
}
