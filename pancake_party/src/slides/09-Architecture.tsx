import type { CSSProperties, ReactNode } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Database,
  Gamepad2,
  Layers,
  Snowflake,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import { ClickHouseLogo } from '@/src/components/ClickHouseLogo'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill } from '@/src/components/ui'
import { cn } from '@/src/lib/cn'

const scenarios = [
  {
    icon: Users,
    title: '玩家行为分析',
    items: ['流失节点识别', '留存率与召回', '道具定价与投放'],
  },
  {
    icon: Activity,
    title: '运营指标监控',
    items: ['DAU / MAU', '付费转化 · ARPU', '延迟与崩溃率'],
  },
  {
    icon: BarChart3,
    title: '商业智能分析',
    items: ['地区 / 设备对比', '营销效果评估', 'LTV 预测'],
  },
]

export default function Architecture() {
  return (
    <SlideLayout
      eyebrow="07 · 方案架构"
      title="数据源 → 集成 → Lakehouse → 数据应用"
      subtitle="保留 Lakehouse 分层，替换核心 OLAP 引擎"
    >
      <Panel className="flex h-full flex-col p-6">
        {/* panel header */}
        <div className="anim-fade flex items-start justify-between">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.24em] text-white/35">
              SOLUTION STACK
            </div>
            <h3 className="mt-2 text-[19px] font-semibold">
              以 ClickHouse 企业版作为核心 OLAP 引擎
            </h3>
          </div>
          <Pill tone="yellow">阿里云 · 全托管</Pill>
        </div>

        <div className="relative mt-4 grid flex-1 grid-cols-[500px_1fr_20px_280px] grid-rows-[1fr_auto] gap-x-3">
          {/* sources -> integration */}
          <div className="col-start-1 row-start-1 flex flex-col justify-center gap-3">
            <div
              className="anim-rise"
              style={{ '--delay': '140ms' } as CSSProperties}
            >
              <PipelineLabel>Realtime Pipeline · Flink Job</PipelineLabel>
              <div className="flex items-center gap-7 pr-5">
                <FlowNode
                  icon={Gamepad2}
                  title="Game Log · Data API"
                  sub="埋点 / 服务端接口"
                  className="flex-1"
                />
                <FlowNode
                  icon={Workflow}
                  title="LogHub"
                  sub="日志统一接入"
                  className="w-[112px]"
                />
                <FlowNode
                  icon={Zap}
                  title="Flink Job"
                  sub="流式作业"
                  className="w-[116px]"
                />
              </div>
            </div>

            <div
              className="anim-rise"
              style={{ '--delay': '190ms' } as CSSProperties}
            >
              <PipelineLabel>Realtime Pipeline · Database CDC</PipelineLabel>
              <div className="flex items-center gap-7 pr-5">
                <FlowNode
                  icon={Database}
                  title="Database"
                  sub="业务库 / CDC"
                  className="flex-1"
                />
                <FlowNode
                  icon={ArrowLeftRight}
                  title="阿里云 DTS服务"
                  sub="实时同步 · CDC"
                  className="w-[164px]"
                />
              </div>
            </div>

            <div
              className="anim-rise"
              style={{ '--delay': '240ms' } as CSSProperties}
            >
              <PipelineLabel>Batch Pipeline</PipelineLabel>
              <div className="flex items-center pr-5">
                <FlowNode
                  icon={Layers}
                  title="Hive / Spark Job"
                  sub="批处理 · 回填"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* ClickHouse 企业版 core */}
          <div
            className="anim-rise col-start-2 row-start-1 flex flex-col rounded-xl border border-ch-yellow/40 bg-ch-yellow/[0.06] px-4 py-4"
            style={{ '--delay': '280ms' } as CSSProperties}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <ClickHouseLogo className="text-[17px] text-white" />
                  <Pill tone="yellow" className="px-2 py-1 text-[10px]">
                    企业版
                  </Pill>
                </div>
                <div className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ch-yellow/60">
                  CORE OLAP · MANAGED
                </div>
                <div className="mt-1 text-[10.5px] text-white/40">
                  列式 OLAP · 全托管 · 无数据再平衡
                </div>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/25">
                阿里云托管
              </span>
            </div>

            <div className="mt-3 flex shrink-0 items-center justify-between">
              <span className="font-mono text-[9.5px] tracking-[0.06em] text-white/30">
                DWD → DWS → ADS · 分层保持不变
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ch-yellow/50">
                Lakehouse
              </span>
            </div>

            <div className="mt-2 grid flex-1 grid-cols-[1fr_16px_1fr_16px_1fr] items-stretch">
              <LayerBox
                code="DWD"
                name="明细层"
                sub="事件明细 · 宽表"
                items={['玩家事件宽表', '战斗与技能明细', '支付与道具流水']}
                footer="EVENT DETAIL"
                delay={340}
              />
              <div className="flex items-center justify-center">
                <ArrowRight size={12} className="text-ch-yellow/45" />
              </div>
              <LayerBox
                code="DWS"
                name="汇总层"
                sub="主题聚合 · 指标"
                items={['留存 / DAU / ARPU', '服务器健康度', '活动与商业化']}
                footer="AGGREGATES"
                delay={380}
              />
              <div className="flex items-center justify-center">
                <ArrowRight size={12} className="text-ch-yellow/45" />
              </div>
              <LayerBox
                code="ADS"
                name="应用层"
                sub="主题集市 · 数据服务"
                items={['行为标签与分群', '运营指标集市', 'BI 主题数据集']}
                footer="SERVING"
                delay={420}
              />
            </div>
          </div>

          {/* applications */}
          <div
            className="col-start-4 row-span-2 row-start-1 flex flex-col"
            style={{ gridRow: '1 / span 2' }}
          >
            <div className="anim-fade">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/30">
                DATA APPLICATIONS
              </div>
              <div className="mt-1 text-[10px] text-white/35">
                三大核心分析场景
              </div>
            </div>
            <div className="mt-2 grid flex-1 grid-rows-3 gap-2">
              {scenarios.map(({ icon, title, items }, i) => (
                <ScenarioCard
                  key={title}
                  icon={icon}
                  title={title}
                  items={items}
                  delay={500 + i * 60}
                />
              ))}
            </div>
          </div>

          {/* cold lake below the core */}
          <div className="col-start-2 row-start-2">
            <div
              className="anim-fade flex h-[26px] items-center justify-center gap-9"
              style={{ '--delay': '300ms' } as CSSProperties}
            >
              <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white/30">
                <ArrowDown size={10} className="text-ch-yellow/60" />
                Hot → Cold 分层
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-white/30">
                <ArrowUp size={10} className="text-ch-yellow/60" />
                查询加速
              </span>
            </div>

            <div
              className="anim-rise rounded-lg border border-white/12 bg-white/[0.03] px-4 py-2.5"
              style={{ '--delay': '340ms' } as CSSProperties}
            >
              <div className="flex items-center gap-2">
                <Snowflake size={11} className="text-ch-yellow/70" />
                <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-white/30">
                  LAKEHOUSE · ODS
                </span>
                <span className="ml-auto font-mono text-[8px] tracking-[0.08em] text-white/20">
                  ICEBERG / HIVE
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-[13.5px] font-semibold leading-none text-white/85">
                  Iceberg / Hive
                </span>
                <span className="text-[10px] text-white/35">
                  原始事件 · 冷数据 · 批式回读
                </span>
              </div>
            </div>
          </div>

          {/* Data-flow routes (stack-grid coordinates) */}
          <svg
            className="pointer-events-none absolute inset-0"
            width="100%"
            height="100%"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="archFlowArrow"
                markerWidth="7"
                markerHeight="7"
                refX="5.5"
                refY="3.5"
                orient="auto"
              >
                <path d="M0 0 L7 3.5 L0 7 Z" fill="#fbff56" fillOpacity="0.6" />
              </marker>
            </defs>

            {[
              // Flink Job link
              'M 196 97 H 224',
              'M 336 97 H 364',
              'M 480 97 H 512',
              // Database CDC link
              'M 288 213 H 316',
              'M 480 213 H 512',
              // Batch Pipeline link
              'M 480 329 H 512',
            ].map((d) => (
              <path
                key={d}
                d={d}
                stroke="#fbff56"
                strokeOpacity="0.42"
                strokeWidth="1.5"
                strokeDasharray="3 7"
                markerEnd="url(#archFlowArrow)"
                className="route-flow"
              />
            ))}

            <path
              d="M 512 459 C 474 459 430 448 430 410 L 430 371"
              stroke="#fbff56"
              strokeOpacity="0.42"
              strokeWidth="1.5"
              strokeDasharray="3 7"
              markerEnd="url(#archFlowArrow)"
              className="route-flow"
            />

            {[
              'M 1066 203 C 1080 203 1096 112 1110 112',
              'M 1066 203 C 1080 203 1096 263 1110 263',
              'M 1066 203 C 1080 203 1096 414 1110 414',
            ].map((d) => (
              <path
                key={d}
                d={d}
                stroke="#fbff56"
                strokeOpacity="0.42"
                strokeWidth="1.5"
                strokeDasharray="3 7"
                markerEnd="url(#archFlowArrow)"
                className="route-flow"
              />
            ))}
          </svg>
        </div>
        <div className="anim-fade mt-3 flex items-center gap-2 rounded-md border border-ch-yellow/15 bg-ch-yellow/[0.03] px-4 py-2">
          <span className="text-[12px] text-ch-yellow/75">
            不是推倒重来——保留 Lakehouse 分层，替换核心 OLAP 引擎。
          </span>
          <span className="ml-auto font-mono text-[9px] tracking-[0.12em] text-white/25">
            KEEP THE LAYERS · REPLACE THE ENGINE
          </span>
        </div>
      </Panel>
    </SlideLayout>
  )
}

function PipelineLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/25">
      <span className="h-[3px] w-[3px] bg-ch-yellow" />
      {children}
    </div>
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
        'flex h-[84px] items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5',
        className,
      )}
    >
      <Icon size={14} className="shrink-0 text-ch-yellow" />
      <div className="min-w-0">
        <div className="truncate text-[12px] font-medium text-white/75">
          {title}
        </div>
        <div className="truncate text-[10px] text-white/30">{sub}</div>
      </div>
    </div>
  )
}

function ScenarioCard({
  icon: Icon,
  title,
  items,
  delay,
}: {
  icon: typeof Users
  title: string
  items: string[]
  delay: number
}) {
  return (
    <div
      className="anim-rise flex h-full flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] px-3.5"
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <div className="flex items-center gap-2">
        <Icon size={14} className="shrink-0 text-ch-yellow" />
        <span className="text-[13px] font-medium text-white/80">{title}</span>
      </div>
      <div className="mt-1.5 space-y-1">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-1.5">
            <span className="h-[3px] w-[3px] shrink-0 bg-ch-yellow/45" />
            <span className="text-[10px] leading-[1.45] text-white/40">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LayerBox({
  code,
  name,
  sub,
  items,
  footer,
  delay,
}: {
  code: string
  name: string
  sub: string
  items: string[]
  footer: string
  delay: number
}) {
  return (
    <div
      className="anim-rise flex flex-col justify-center rounded-md border border-white/10 bg-[#1b1b1b] p-3.5"
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-ch-yellow/75">
          {code}
        </span>
        <span className="h-[3px] w-[3px] bg-ch-yellow/30" />
      </div>
      <span className="mt-1.5 text-[14.5px] font-medium text-white/85">
        {name}
      </span>
      <span className="mt-0.5 text-[10.5px] leading-[1.4] text-white/30">
        {sub}
      </span>

      <div className="mt-4 space-y-1.5">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-1.5">
            <span className="mt-[5px] h-[3px] w-[3px] shrink-0 bg-ch-yellow/40" />
            <span className="text-[10.5px] leading-[1.45] text-white/45">
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-1.5 border-t border-white/[0.07] pt-2.5 font-mono text-[8.5px] tracking-[0.1em] text-white/20">
        <span className="h-[2px] w-3 bg-ch-yellow/25" />
        {footer}
      </div>
    </div>
  )
}
