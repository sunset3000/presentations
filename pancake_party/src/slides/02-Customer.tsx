import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart3,
  ChevronRight,
  Database,
  Gamepad2,
  Globe2,
  Rocket,
  Snowflake,
  TrendingUp,
  Wallet,
  Workflow,
  Zap,
} from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { IconBox, Panel, Pill } from '@/src/components/ui'
import { cn } from '@/src/lib/cn'

const needs = [
  { icon: Globe2, title: 'Globalize analytics', note: 'Extend the domestic stack overseas' },
  { icon: Rocket, title: 'Match expansion speed', note: 'The business cannot wait for a rebuild' },
  { icon: Wallet, title: 'Controllable cost', note: 'Efficient at peak and steady state' },
]

export default function Customer() {
  return (
    <SlideLayout
      eyebrow="01 · Customer & Business Context"
      title="A fast-growing Chinese digital-native company goes global"
      subtitle="There is already a solution — it simply hits its limits under global expansion and scale"
    >
      <div className="grid h-full grid-cols-[0.88fr_1.12fr] gap-6">
        <Panel className="flex flex-col p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono text-[12px] tracking-[0.24em] text-white/35">
                CUSTOMER PROFILE
              </div>
              <div className="mt-3 flex items-center gap-3">
                <h3 className="text-[30px] font-semibold tracking-[-0.02em]">
                  Pancake Party
                </h3>
                <IconBox icon={Gamepad2} size={38} solid />
              </div>
              <p className="mt-2 text-[14.5px] text-white/50">
                Chinese digital-native game company · going global
              </p>
            </div>
          </div>

          <div className="relative mt-2 flex flex-1 items-center justify-center">
            <GlobalExpansion />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2">
              {['Fast growth', 'Global expansion', 'Data-driven'].map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="flex h-full flex-col p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono text-[10.5px] tracking-[0.24em] text-white/35">
                CURRENT STACK
              </div>
              <h3 className="mt-2 text-[19px] font-semibold">
                Current analytics platform: self-built Apache Doris
              </h3>
            </div>
            <Pill tone="default">On-Prem · Self-managed</Pill>
          </div>

          <div className="mt-4 flex flex-1 flex-col gap-3">
            {/* one integrated stack: ingestion -> Doris -> applications */}
            <div className="flex flex-1 items-stretch gap-3">
              {/* ingestion lanes */}
              <div className="flex w-[330px] shrink-0 flex-col justify-center gap-3">
                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/25">
                    <span className="h-[3px] w-[3px] bg-ch-yellow" />
                    Real-time pipeline · STREAMING
                  </div>
                  <div className="flex items-center gap-1">
                    <FlowNode
                      icon={Gamepad2}
                      title="Player device data"
                      sub="Client · SDK"
                      className="flex-1"
                    />
                    <ArrowRight size={12} className="shrink-0 text-white/20" />
                    <FlowNode
                      icon={Workflow}
                      title="Kafka"
                      sub="Queue"
                      className="w-[78px]"
                    />
                    <ArrowRight size={12} className="shrink-0 text-white/20" />
                    <FlowNode
                      icon={Zap}
                      title="Flink Job"
                      sub="Streaming"
                      className="w-[90px]"
                    />
                    <ArrowRight
                      size={12}
                      className="shrink-0 text-ch-yellow/45"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/25">
                    <span className="h-[3px] w-[3px] bg-ch-yellow" />
                    Batch pipeline · BATCH
                  </div>
                  <div className="flex items-center gap-1">
                    <FlowNode
                      icon={Database}
                      title="Hive / Spark"
                      sub="Batch Job"
                      className="w-[180px]"
                    />
                    <div className="h-px flex-1 border-t border-dashed border-white/15" />
                    <ArrowRight
                      size={12}
                      className="shrink-0 text-ch-yellow/45"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-ch-yellow/50">
                    <ArrowUp size={10} className="text-ch-yellow/60" />
                    BATCH ETL SOURCE
                  </div>
                  <div className="relative rounded-lg border border-white/12 bg-white/[0.03] px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <Snowflake size={12} className="text-ch-yellow/70" />
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-white/30">
                        COLD · DATALAKE
                      </span>
                      <span className="ml-auto font-mono text-[8px] tracking-[0.08em] text-white/20">
                        ICEBERG / HIVE
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="text-[14.5px] font-semibold leading-none text-white/85">
                        Iceberg / Hive
                      </span>
                      <span className="text-[10px] text-white/35">
                        Cold data · Data lake
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 border-t border-white/[0.08] pt-1.5">
                      <span className="h-[3px] w-[3px] shrink-0 bg-ch-yellow/55" />
                      <span className="text-[9.5px] leading-[1.4] text-white/35">
                        Doris cold-data archive · Hive / Spark batch read-back
                      </span>
                    </div>
                    <div className="pointer-events-none absolute -right-[20px] top-1/2 z-10 flex -translate-y-1/2 items-center">
                      <ArrowLeft size={12} className="shrink-0 text-ch-yellow/85" />
                      <span className="h-px w-[9px] border-t border-dashed border-ch-yellow/45" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Doris core */}
              <div className="flex w-[144px] shrink-0 flex-col justify-center rounded-xl border border-ch-yellow/40 bg-ch-yellow/[0.06] px-3.5">
                <div className="flex items-center gap-1.5">
                  <Database size={14} className="text-ch-yellow" />
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-ch-yellow/70">
                    SELF-BUILT
                  </span>
                </div>
                <div className="mt-2 text-[17px] font-semibold leading-tight">
                  Apache Doris
                </div>
                <div className="mt-1 text-[10px] leading-[1.5] text-white/40">
                  Core OLAP
                  <br />
                  Self-built · On-Prem
                </div>
                <div className="mt-2">
                  <Pill tone="dark" className="px-2 py-1 text-[9.5px]">
                    Self-managed
                  </Pill>
                </div>
              </div>

              {/* Doris -> applications */}
              <div className="flex w-[20px] shrink-0 items-center justify-center">
                <ArrowRight size={15} className="text-ch-yellow/45" />
              </div>

              {/* applications */}
              <div className="flex w-[200px] shrink-0 flex-col">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/30">
                  DATA APPLICATIONS
                </div>
                <div className="mt-1 text-[10px] text-white/35">Full business coverage</div>
                <div className="mt-2 grid flex-1 grid-rows-3 gap-2">
                  <ScenarioCard
                    icon={Gamepad2}
                    title="Player behavior analysis"
                    items={['Churn point identification', 'Retention & win-back', 'Item pricing & placement']}
                  />
                  <ScenarioCard
                    icon={Activity}
                    title="Operations monitoring"
                    items={['DAU / MAU', 'Conversion · ARPU', 'Latency & crash rate']}
                  />
                  <ScenarioCard
                    icon={BarChart3}
                    title="Business intelligence"
                    items={['Spend by region / device', 'Marketing effectiveness', 'LTV prediction']}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-md border border-ch-yellow/15 bg-ch-yellow/[0.03] px-3 py-1.5">
              <span className="text-[10px] text-ch-yellow/75">
                Three core scenarios, one Doris engine
              </span>
              <span className="ml-auto font-mono text-[8px] tracking-[0.12em] text-white/25">
                ONE ENGINE · FULL COVERAGE
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {needs.map(({ icon: Icon, title, note }) => (
                <div
                  key={title}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2"
                >
                  <Icon size={14} className="shrink-0 text-ch-yellow" />
                  <div className="min-w-0">
                    <div className="truncate text-[11.5px] font-medium text-white/80">
                      {title}
                    </div>
                    <div className="truncate text-[9px] text-white/30">
                      {note}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-2.5 border-t border-white/10 pt-2.5">
              <span className="h-[5px] w-[5px] bg-ch-yellow" />
              <span className="text-[11.5px] text-white/40">
                Upgrades, backups, scaling, and troubleshooting all sit with the in-house team
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 border-t border-white/10 pt-2.5">
              {[
                { value: '20', unit: 'TB / day', label: 'Player data' },
                { value: '100M+', unit: 'EVENTS', label: 'Daily events' },
                { value: '50–200', unit: 'MB/s', label: 'Steady writes' },
                { value: '500K', unit: 'msg/s', label: 'Peak writes' },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-baseline gap-1.5 whitespace-nowrap"
                >
                  <span className="text-[17px] font-semibold tracking-[-0.03em] text-white/85">
                    {metric.value}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.08em] text-ch-yellow/60">
                    {metric.unit}
                  </span>
                  <span className="ml-1 text-[10px] text-white/25">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </SlideLayout>
  )
}


function FlowNode({
  icon: Icon,
  title,
  sub,
  className,
}: {
  icon: typeof Gamepad2
  title: string
  sub: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex h-[76px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5',
        className,
      )}
    >
      <Icon size={13} className="shrink-0 text-ch-yellow" />
      <div className="min-w-0">
        <div className="truncate text-[11px] font-medium text-white/75">
          {title}
        </div>
        <div className="truncate text-[9px] text-white/30">{sub}</div>
      </div>
    </div>
  )
}

function ScenarioCard({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Gamepad2
  title: string
  items: string[]
}) {
  return (
    <div className="flex h-full flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <div className="flex items-center gap-2">
        <Icon size={13} className="shrink-0 text-ch-yellow" />
        <span className="text-[12.5px] font-medium text-white/80">
          {title}
        </span>
      </div>
      <div className="mt-1.5 space-y-1">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-1.5">
            <span className="h-[3px] w-[3px] shrink-0 bg-ch-yellow/45" />
            <span className="text-[10px] leading-[1.45] text-white/35">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GlobalExpansion() {
  const routes = [
    {
      d: 'M76 225 C 170 150, 260 90, 360 68',
      label: 'Southeast Asia',
      labelClassName: 'left-[67%] top-[12%]',
    },
    {
      d: 'M76 225 C 200 215, 360 190, 482 170',
      label: 'Europe',
      labelClassName: 'left-[86%] top-[53%] -translate-x-1/2 text-center',
    },
    {
      d: 'M76 225 C 170 270, 260 285, 350 265',
      label: 'North America',
      labelClassName: 'left-[65%] top-[72%]',
    },
  ]

  return (
    <div className="relative h-[340px] w-full max-w-[560px]">
      <div className="absolute left-1 top-0 z-10">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/20">
          GLOBAL EXPANSION
        </div>
        <div className="mt-2 text-[13px] font-medium text-white/55">
          Global analytics platform
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-ch-yellow">
          <TrendingUp size={12} />
          <span>Global expansion accelerating</span>
          <span className="flex items-center text-ch-yellow/60">
            <ChevronRight size={10} />
            <ChevronRight size={12} />
            <ChevronRight size={14} />
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 560 340"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="routeArrow"
            markerWidth="7"
            markerHeight="7"
            refX="5.5"
            refY="3.5"
            orient="auto"
          >
            <path d="M0 0 L7 3.5 L0 7 Z" fill="#fbff56" fillOpacity="0.6" />
          </marker>
        </defs>

        {/* globe context */}
        <g stroke="white" strokeOpacity="0.09" strokeWidth="1">
          <circle cx="350" cy="170" r="140" />
          <ellipse cx="350" cy="170" rx="55" ry="140" />
          <ellipse cx="350" cy="170" rx="105" ry="140" />
          <path d="M210 170h280M225 115h250M225 225h250" />
          <path d="M350 30c-38 42-38 238 0 280M350 30c38 42 38 238 0 280" />
        </g>

        {/* data routes */}
        {routes.map((route, i) => (
          <g key={route.label}>
            <path
              d={route.d}
              stroke="#fbff56"
              strokeOpacity="0.42"
              strokeWidth="1.5"
              strokeDasharray="3 7"
              markerEnd="url(#routeArrow)"
              className="route-flow"
            />
            <circle r="2.4" fill="#fbff56" fillOpacity="0.9">
              <animateMotion
                dur="2.8s"
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
                path={route.d}
              />
            </circle>
          </g>
        ))}

        {/* destination nodes */}
        {[
          [360, 68],
          [482, 170],
          [350, 265],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="12" fill="#fbff56" fillOpacity="0.09" />
            <circle
              cx={cx}
              cy={cy}
              r="3.6"
              fill="#fbff56"
              stroke="#151515"
              strokeWidth="2"
            />
          </g>
        ))}

        {/* hub glow */}
        <circle cx="76" cy="225" r="48" fill="#fbff56" fillOpacity="0.045" />
      </svg>

      {/* China platform hub */}
      <div className="absolute left-[13.6%] top-[66.2%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-ch-yellow text-ch-bg shadow-[0_0_0_9px_rgba(251,255,86,0.08)]">
          <BarChart3 size={24} strokeWidth={1.8} />
        </div>
      </div>
      <div className="absolute left-[20px] top-[76%]">
        <div className="text-[13px] font-medium text-white/80">
          China · Analytics platform
        </div>
        <div className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-ch-yellow/55">
          SELF-BUILT OLAP
        </div>
      </div>

      {/* destination labels */}
      {routes.map((route) => (
        <div
          key={route.label}
          className={`absolute z-10 ${route.labelClassName}`}
        >
          <div className="whitespace-nowrap text-[13px] font-medium text-white/80">
            {route.label}
          </div>
          <div className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white/30">
            ANALYTICS
          </div>
        </div>
      ))}
    </div>
  )
}
