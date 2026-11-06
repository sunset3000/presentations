import type { CSSProperties } from 'react'
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

const steps = [
  {
    index: '01',
    title: 'DDL 解析与模型适配',
    desc: '解析原表结构，推导排序键、分区与性能模型。',
    tag: 'MODEL',
  },
  {
    index: '02',
    title: '任务复制与双路写入',
    desc: 'Hive / Kafka → Doris 任务无缝复制；离线链路经 DTS 批量导入。',
    tag: 'DTS',
  },
  {
    index: '03',
    title: '存量数据弹性补数',
    desc: 'ClickHouse Dump · HardLink 隔离 · 1 GB/s；Hive 完整时 Spark 重刷。',
    tag: '1 GB/s',
  },
  {
    index: '04',
    title: '四阶段自动化数据校验',
    desc: '全部通过才允许切换；任何偏差自动断路。',
    tag: '4 STAGES',
    highlight: true,
  },
  {
    index: '05',
    title: '正式下线 Doris',
    desc: '下线集群与写入任务，完成迁移闭环。',
    tag: 'CUTOVER',
  },
]

const validationStages = ['行数', '指标', '精度', 'SQL 回放']

export default function Migration() {
  return (
    <SlideLayout
      eyebrow="09 · 迁移策略"
      title="国内双跑，海外新建"
      subtitle="国内双跑验证一致再切换，海外从第一天就只有一个引擎"
    >
      <div className="flex h-full flex-col gap-3">
        <div className="grid min-h-0 flex-1 grid-cols-[1.16fr_0.84fr] gap-5">
          {/* ── China: dual run + 5-step playbook ── */}
          <Panel className="flex min-h-0 flex-col p-5">
            <div className="anim-fade flex shrink-0 items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/30">
                  CHINA · EXISTING SYSTEM
                </div>
                <h3 className="mt-1.5 text-[20px] font-semibold">
                  国内存量 · 双跑
                </h3>
                <p className="mt-1 text-[11.5px] text-white/40">
                  实时双写、Hive/Spark 双写、存量经 DTS 回填；结果匹配后再切换。
                </p>
              </div>
              <Pill tone="yellow">Dual Run</Pill>
            </div>

            <div
              className="anim-rise mt-3 flex h-[92px] shrink-0 items-stretch gap-2"
              style={{ '--delay': '120ms' } as CSSProperties}
            >
              <div className="grid w-[248px] shrink-0 grid-cols-2 gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-2">
                <SourceCell
                  icon={Workflow}
                  title="Kafka / CDC"
                  sub="实时 · 双系统消费"
                />
                <SourceCell
                  icon={Zap}
                  title="Flink Jobs"
                  sub="实时 · 双路写入"
                />
                <SourceCell
                  icon={Layers}
                  title="Hive / Spark"
                  sub="批量 · 双路写入"
                />
                <SourceCell
                  icon={ArrowLeftRight}
                  title="存量数据 · DTS"
                  sub="回填 → ClickHouse"
                />
              </div>

              <RunArrow />

              <div className="flex w-[184px] shrink-0 flex-col justify-center gap-1.5">
                <RunSystem title="Doris" sub="现有系统" />
                <RunSystem title="ClickHouse" sub="新建 · 企业版" accent />
              </div>

              <RunArrow />

              <div className="flex w-[118px] shrink-0 flex-col items-center justify-center rounded-lg border border-ch-yellow/45 bg-ch-yellow/[0.06]">
                <span className="font-mono text-[21px] font-semibold leading-none text-ch-yellow">
                  100%
                </span>
                <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/40">
                  results match
                </span>
              </div>

              <RunArrow />

              <div className="flex w-[138px] shrink-0 flex-col items-center justify-center rounded-lg bg-ch-yellow text-ch-bg">
                <span className="text-[13.5px] font-semibold">切换</span>
                <span className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ch-bg/60">
                  DORIS 下线
                </span>
              </div>
            </div>

            <div className="mt-4 flex shrink-0 items-center justify-between border-b border-white/10 pb-1.5">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/30">
                5-step playbook · 双跑细节
              </span>
              <span className="font-mono text-[9.5px] tracking-[0.12em] text-ch-yellow/45">
                05 STEPS
              </span>
            </div>

            <div className="mt-1 flex min-h-0 flex-1 flex-col">
              {steps.map((step, i) => (
                <div
                  key={step.index}
                  className="flex min-h-0 flex-1 gap-3"
                  style={
                    { '--delay': `${180 + i * 60}ms` } as CSSProperties
                  }
                >
                  <div className="flex w-5 shrink-0 flex-col items-center pt-2">
                    <span
                      className={cn(
                        'anim-fade font-mono text-[11px]',
                        step.highlight ? 'text-ch-yellow' : 'text-white/35',
                      )}
                    >
                      {step.index}
                    </span>
                    {i < steps.length - 1 && (
                      <span className="mt-1.5 w-px flex-1 bg-white/[0.12]" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'anim-rise flex min-w-0 flex-1 flex-col justify-center rounded-lg px-3 py-1.5',
                      step.highlight &&
                        'border border-ch-yellow/40 bg-ch-yellow/[0.055]',
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="truncate text-[14px] font-semibold text-white/85">
                        {step.title}
                      </h4>
                      <span
                        className={cn(
                          'shrink-0 font-mono text-[8.5px] tracking-[0.12em]',
                          step.highlight
                            ? 'text-ch-yellow/80'
                            : 'text-white/25',
                        )}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[10.5px] leading-[1.45] text-white/40">
                      {step.desc}
                    </p>

                    {step.highlight && (
                      <div className="mt-1 flex items-center gap-1">
                        {validationStages.map((stage, stageIndex) => (
                          <span
                            key={stage}
                            className="flex items-center gap-1"
                          >
                            {stageIndex > 0 && (
                              <ArrowRight
                                size={7}
                                className="text-white/20"
                              />
                            )}
                            <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-[1px] font-mono text-[8px] tracking-[0.04em] text-white/45">
                              {stage}
                            </span>
                          </span>
                        ))}
                        <span className="ml-auto flex items-center gap-1 rounded bg-ch-yellow px-1.5 py-[1px] text-[8px] font-semibold text-ch-bg">
                          <Zap size={8} strokeWidth={2.4} />
                          断路器
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* ── Overseas: greenfield architecture ── */}
          <Panel className="flex min-h-0 flex-col p-5">
            <div className="anim-fade flex shrink-0 items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/30">
                  OVERSEAS · GREENFIELD
                </div>
                <h3 className="mt-1.5 text-[20px] font-semibold">
                  海外新系统 · 新建
                </h3>
                <p className="mt-1 text-[11px] text-white/40">
                  所有数据源直接路由至 ClickHouse Enterprise
                </p>
              </div>
              <Pill tone="yellow" className="shrink-0">
                阿里云 · 全托管
              </Pill>
            </div>

            <div
              className="anim-rise mt-3 shrink-0"
              style={{ '--delay': '160ms' } as CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                  DATA SOURCES
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/20">
                  STREAMING + BATCH
                </span>
              </div>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                <SourceCard icon={Gamepad2} title="Game Log · Data API" sub="LogHub → Flink" />
                <SourceCard icon={Database} title="Database · CDC" sub="阿里云 DTS" />
                <SourceCard icon={Layers} title="Hive / Spark Job" sub="批处理 · 回填" />
              </div>
            </div>

            <div
              className="anim-rise mt-2 flex h-[184px] shrink-0 items-stretch gap-2"
              style={{ '--delay': '220ms' } as CSSProperties}
            >
              <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-ch-yellow/45 bg-ch-yellow/[0.055] px-3.5 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClickHouseLogo className="text-[15px] text-white" />
                    <Pill tone="yellow" className="px-2 py-0.5 text-[9px]">
                      企业版
                    </Pill>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ch-yellow/50">
                    阿里云托管
                  </span>
                </div>
                <div className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-ch-yellow/55">
                  CORE OLAP · MANAGED
                </div>

                <div className="mt-3 grid grid-cols-[1fr_10px_1fr_10px_1fr] items-stretch">
                  <MiniLayer code="DWD" name="明细层" sub="事件明细 · 宽表" />
                  <div className="flex items-center justify-center">
                    <ArrowRight size={9} className="text-ch-yellow/45" />
                  </div>
                  <MiniLayer code="DWS" name="汇总层" sub="主题聚合 · 指标" />
                  <div className="flex items-center justify-center">
                    <ArrowRight size={9} className="text-ch-yellow/45" />
                  </div>
                  <MiniLayer code="ADS" name="应用层" sub="主题集市 · 服务" />
                </div>

                <div className="mt-auto flex items-center justify-between pt-2 font-mono text-[8px] uppercase tracking-[0.08em] text-white/25">
                  <span>DWD → DWS → ADS</span>
                  <span className="text-ch-yellow/40">分层保持不变</span>
                </div>
              </div>

              <div className="flex w-[104px] shrink-0 flex-col justify-center rounded-lg border border-white/12 bg-white/[0.03] px-3 py-2.5">
                <Snowflake size={12} className="text-ch-yellow/70" />
                <div className="mt-1.5 font-mono text-[7.5px] uppercase tracking-[0.08em] text-white/30">
                  LAKEHOUSE · ODS
                </div>
                <div className="mt-1 text-[11px] font-medium text-white/75">
                  Iceberg / Hive
                </div>
                <div className="mt-0.5 text-[8.5px] leading-[1.4] text-white/30">
                  原始事件 · 冷数据
                </div>
                <div className="mt-2 flex flex-col gap-0.5 font-mono text-[7.5px] uppercase tracking-[0.06em] text-ch-yellow/45">
                  <span className="flex items-center gap-1">
                    <ArrowUp size={7} />
                    查询加速
                  </span>
                  <span className="flex items-center gap-1">
                    <ArrowDown size={7} />
                    HOT → COLD
                  </span>
                </div>
              </div>
            </div>

            <div className="my-1.5 flex shrink-0 justify-center">
              <ArrowDown size={13} className="text-white/25" />
            </div>

            <div
              className="anim-rise shrink-0"
              style={{ '--delay': '280ms' } as CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                  DATA APPLICATIONS
                </span>
                <span className="text-[9px] text-white/30">
                  三大核心分析场景
                </span>
              </div>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                <AppCard icon={Users} title="玩家行为分析" sub="流失 · 留存 · 定价" />
                <AppCard icon={Activity} title="运营指标监控" sub="DAU · ARPU · 延迟" />
                <AppCard icon={BarChart3} title="商业智能分析" sub="对比 · 营销 · LTV" />
              </div>
            </div>

            <div
              className="anim-fade mt-auto shrink-0 border-t border-white/10 pt-2.5"
              style={{ '--delay': '340ms' } as CSSProperties}
            >
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/30">
                    MIGRATION COST
                  </div>
                  <div className="mt-0.5 text-[18px] font-semibold leading-none text-white/80">
                    0 → 1
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-white/30">
                    HISTORICAL DEBT
                  </div>
                  <div className="mt-0.5 text-[18px] font-semibold leading-none text-ch-yellow">
                    None
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 border-t border-white/[0.07] pt-1.5">
                <span className="h-[4px] w-[4px] shrink-0 bg-ch-yellow" />
                <span className="text-[10px] text-white/40">
                  没有历史包袱：直接以 ClickHouse 为目标引擎
                </span>
              </div>
            </div>
          </Panel>
        </div>

        <div className="flex h-[46px] shrink-0 items-center justify-center gap-3 rounded-lg border border-ch-yellow/25 bg-ch-yellow/[0.045]">
          <span className="h-[6px] w-[6px] bg-ch-yellow" />
          <span className="text-[15px] font-medium text-ch-yellow">
            双跑不是可选项——它是「结果一致」的唯一证据。
          </span>
        </div>
      </div>
    </SlideLayout>
  )
}

function SourceCell({
  icon: Icon,
  title,
  sub,
}: {
  icon: typeof Workflow
  title: string
  sub: string
}) {
  return (
    <div className="flex flex-col justify-center rounded-md border border-white/10 bg-white/[0.03] px-2 py-1">
      <div className="flex items-center gap-1.5">
        <Icon size={9} className="shrink-0 text-ch-yellow/80" />
        <span className="truncate text-[10.5px] font-medium leading-[1.25] text-white/70">
          {title}
        </span>
      </div>
      <span className="mt-0.5 truncate font-mono text-[7.5px] leading-[1.25] tracking-[0.02em] text-white/35">
        {sub}
      </span>
    </div>
  )
}

function RunArrow() {
  return (
    <div className="flex w-3 shrink-0 items-center justify-center">
      <ArrowRight size={13} className="text-white/25" />
    </div>
  )
}

function RunSystem({
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
        'flex h-[34px] items-center justify-between rounded-md border px-2.5',
        accent
          ? 'border-ch-yellow/55 bg-ch-yellow/[0.07]'
          : 'border-white/10 bg-white/[0.03]',
      )}
    >
      <span
        className={cn(
          'text-[12px] font-medium',
          accent ? 'text-ch-yellow' : 'text-white/70',
        )}
      >
        {title}
      </span>
      <span className="font-mono text-[8px] tracking-[0.06em] text-white/30">
        {sub}
      </span>
    </div>
  )
}

function SourceCard({
  icon: Icon,
  title,
  sub,
}: {
  icon: typeof Gamepad2
  title: string
  sub: string
}) {
  return (
    <div className="flex h-[50px] items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5">
      <Icon size={12} className="shrink-0 text-ch-yellow" />
      <div className="min-w-0">
        <div className="truncate text-[10.5px] font-medium text-white/75">
          {title}
        </div>
        <div className="truncate text-[8.5px] text-white/30">{sub}</div>
      </div>
    </div>
  )
}

function MiniLayer({
  code,
  name,
  sub,
}: {
  code: string
  name: string
  sub: string
}) {
  return (
    <div className="flex flex-col justify-center rounded-md border border-white/10 bg-[#1b1b1b] px-2 py-2">
      <span className="font-mono text-[9px] tracking-[0.12em] text-ch-yellow/75">
        {code}
      </span>
      <span className="mt-0.5 text-[11px] font-medium text-white/85">
        {name}
      </span>
      <span className="mt-0.5 text-[8px] leading-[1.4] text-white/30">
        {sub}
      </span>
    </div>
  )
}

function AppCard({
  icon: Icon,
  title,
  sub,
}: {
  icon: typeof Users
  title: string
  sub: string
}) {
  return (
    <div className="flex h-[56px] flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] px-2.5">
      <div className="flex items-center gap-1.5">
        <Icon size={11} className="shrink-0 text-ch-yellow" />
        <span className="truncate text-[11px] font-medium text-white/80">
          {title}
        </span>
      </div>
      <span className="mt-1 truncate text-[8px] text-white/30">{sub}</span>
    </div>
  )
}
