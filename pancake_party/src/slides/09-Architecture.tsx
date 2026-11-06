import type { CSSProperties, ReactNode } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Braces,
  Code2,
  Database,
  Flame,
  Gamepad2,
  Layers,
  Search,
  Snowflake,
  Users,
  Workflow,
} from 'lucide-react'
import { ClickHouseLogo } from '@/src/components/ClickHouseLogo'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill } from '@/src/components/ui'

export default function Architecture() {
  return (
    <SlideLayout
      eyebrow="07 · 方案架构"
      title="数据源 → 集成 → Lakehouse → 应用"
      subtitle="保留 Lakehouse 分层，替换核心 OLAP 引擎"
    >
      <div className="flex h-full flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-[190px_42px_238px_42px_1fr_42px_224px]">
          <Lane index="01" cn="数据源" en="Sources">
            <Panel className="flex flex-1 flex-col gap-3 p-3.5">
              <FlowBox
                icon={Database}
                title="Database"
                sub="业务库 / 关系型"
                meta="MySQL · PostgreSQL"
                delay={140}
              />
              <FlowBox
                icon={Braces}
                title="Data API"
                sub="实时接口 / 服务端"
                meta="REST · gRPC"
                delay={180}
              />
              <FlowBox
                icon={Gamepad2}
                title="Game Log"
                sub="埋点 / 客户端日志"
                meta="SDK · EVENTS"
                delay={220}
              />

              <div className="mt-auto border-t border-white/10 pt-3.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                  Ingest profile
                </span>
                <div className="mt-2.5 space-y-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[16.5px] font-semibold text-white/75">
                      50–200
                    </span>
                    <span className="font-mono text-[9.5px] text-white/30">
                      MB/s 持续
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[16.5px] font-semibold text-white/75">
                      50万
                    </span>
                    <span className="font-mono text-[9.5px] text-white/30">
                      消息/秒 峰值
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['SDK', 'CDC', 'OpenAPI'].map((tag) => (
                    <Pill key={tag} tone="dark" className="px-2 py-1 text-[11px]">
                      {tag}
                    </Pill>
                  ))}
                </div>
              </div>
            </Panel>
          </Lane>

          <FlowArrow label="接入" delay={260} />

          <Lane index="02" cn="数据集成" en="Integration">
            <Panel className="flex flex-1 flex-col gap-3 p-3.5">
              <div className="flex items-center gap-2.5 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-3">
                <Workflow size={16} className="text-ch-yellow" />
                <div>
                  <div className="text-[13.5px] font-medium">LogHub</div>
                  <div className="text-[11px] text-white/35">日志统一接入</div>
                </div>
              </div>

              <div className="flex flex-1 flex-col rounded-lg border border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                    ETL
                  </span>
                  <span className="font-mono text-[10px] text-white/20">
                    STREAM / BATCH
                  </span>
                </div>
                <div className="mt-2.5 grid flex-1 grid-rows-3 gap-2">
                  {[
                    { title: 'Flink', sub: '流式处理', note: '实时事件' },
                    { title: 'Hive / Spark', sub: '批处理', note: 'T+1 回溯' },
                    { title: 'SeaTunnel', sub: '同步工具', note: '异构数据源' },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex flex-col justify-center rounded-md border border-white/10 bg-white/[0.03] px-3"
                    >
                      <span className="text-[13px] font-medium text-white/80">
                        {item.title}
                      </span>
                      <span className="mt-0.5 text-[10.5px] text-white/30">
                        {item.sub}
                      </span>
                      <span className="mt-1.5 font-mono text-[9.5px] text-ch-yellow/45">
                        {item.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] leading-[1.5] text-white/30">
                流批一体 · 统一写入
                <br />
                ODS 与 DWD 分层
              </div>
            </Panel>
          </Lane>

          <FlowArrow label="入湖" delay={300} />

          <Lane index="03" cn="Lakehouse" en="Storage & compute">
            <Panel accent className="flex flex-1 flex-col p-4">
              <div className="flex h-[62px] shrink-0 items-center gap-3 rounded-lg border border-white/12 bg-white/[0.035] px-4">
                <Layers size={18} className="text-white/45" />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[14.5px] font-semibold">ODS</span>
                    <span className="text-[11.5px] text-white/35">数据湖</span>
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-white/35">
                    Iceberg / Hive · 原始事件
                  </div>
                </div>
                <span className="font-mono text-[10px] tracking-[0.12em] text-white/25">
                  LAKE
                </span>
              </div>

              <div className="flex shrink-0 justify-center py-2">
                <ArrowDown size={14} className="text-white/25" />
              </div>

              <div className="flex flex-1 flex-col rounded-lg border border-ch-yellow/50 bg-ch-yellow/[0.035] p-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ClickHouseLogo className="text-[14.5px] text-white" />
                    <Pill tone="yellow" className="px-2 py-1 text-[10.5px]">
                      企业版
                    </Pill>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ch-yellow/60">
                    阿里云托管
                  </span>
                </div>

                <div className="mt-1.5 font-mono text-[10.5px] tracking-[0.06em] text-white/30">
                  DWD → DWS → ADS · 分层保持不变
                </div>

                <div className="mt-3 grid flex-1 grid-cols-[1fr_18px_1fr_18px_1fr] items-stretch">
                  <LayerBox
                    code="DWD"
                    name="明细层"
                    sub="事件明细 · 宽表"
                    items={['玩家事件宽表', '战斗与技能明细', '支付与道具流水']}
                    footer="EVENT DETAIL"
                    delay={360}
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
                    delay={400}
                  />
                  <div className="flex items-center justify-center">
                    <ArrowRight size={12} className="text-ch-yellow/45" />
                  </div>
                  <LayerBox
                    code="ADS"
                    name="应用层"
                    sub="报表 · 看板 · 画像"
                    items={['运营看板', '用户画像', '风控与作弊']}
                    footer="SERVING"
                    delay={440}
                  />
                </div>

                <div className="mt-3 flex shrink-0 items-center justify-between border-t border-white/10 pt-2.5">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/35">
                    <Snowflake size={10} className="text-white/30" />
                    Hot → Cold 分层
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-white/35">
                    查询加速
                    <Flame size={10} className="text-ch-yellow/60" />
                  </span>
                </div>
              </div>
            </Panel>
          </Lane>

          <FlowArrow label="服务" delay={480} />

          <Lane index="04" cn="数据应用" en="Applications">
            <Panel className="flex flex-1 flex-col gap-2.5 p-3.5">
              {[
                { icon: BarChart3, label: '报表分析', sub: '经营与自助看板' },
                { icon: Search, label: '日志检索', sub: 'Trace & Log' },
                { icon: Code2, label: 'Ad-hoc 查询', sub: '探索式分析' },
                { icon: Activity, label: '指标监控', sub: '告警与 SLA' },
                { icon: Users, label: '用户画像', sub: '标签与分群' },
              ].map(({ icon: Icon, label, sub }, i) => (
                <div
                  key={label}
                  className="anim-rise flex flex-1 flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] px-3"
                  style={{ '--delay': `${500 + i * 50}ms` } as CSSProperties}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={14} className="text-ch-yellow" />
                    <span className="text-[13px] text-white/70">{label}</span>
                  </div>
                  <span className="mt-1.5 pl-[26px] font-mono text-[9.5px] uppercase tracking-[0.08em] text-white/25">
                    {sub}
                  </span>
                </div>
              ))}
            </Panel>
          </Lane>
        </div>

        <div className="mt-4 flex h-[44px] shrink-0 items-center gap-4 rounded-lg border border-white/10 bg-white/[0.02] px-5">
          <span className="h-6 w-[3px] bg-ch-yellow" />
          <p className="text-[14px] text-white/55">
            不是推倒重来——
            <span className="text-white/90">
              保留 Lakehouse 分层，替换核心 OLAP 引擎。
            </span>
          </p>
          <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/25">
            Keep the layers · Replace the engine
          </span>
        </div>
      </div>
    </SlideLayout>
  )
}

function Lane({
  index,
  cn,
  en,
  children,
}: {
  index: string
  cn: string
  en: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-0 flex-col">
      <div className="mb-2.5 flex items-baseline gap-2">
        <span className="font-mono text-[11px] tracking-[0.12em] text-ch-yellow">
          {index}
        </span>
        <span className="text-[12.5px] font-medium text-white/65">{cn}</span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/20">
          {en}
        </span>
      </div>
      {children}
    </div>
  )
}

function FlowBox({
  icon: Icon,
  title,
  sub,
  meta,
  delay,
}: {
  icon: typeof Database
  title: string
  sub: string
  meta: string
  delay: number
}) {
  return (
    <div
      className="anim-rise flex h-[106px] shrink-0 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3"
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.05]">
        <Icon size={14} className="text-ch-yellow" />
      </span>
      <div className="min-w-0">
        <div className="truncate text-[13.5px] font-medium text-white/80">
          {title}
        </div>
        <div className="mt-0.5 truncate text-[10.5px] text-white/30">{sub}</div>
        <div className="mt-1 font-mono text-[9.5px] tracking-[0.06em] text-white/20">
          {meta}
        </div>
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
      className="anim-rise flex flex-col justify-center rounded-md border border-white/10 bg-[#1b1b1b] p-3"
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-ch-yellow/75">
          {code}
        </span>
        <span className="h-[3px] w-[3px] bg-ch-yellow/30" />
      </div>
      <span className="mt-1.5 text-[14px] font-medium text-white/85">
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

function FlowArrow({ label, delay }: { label: string; delay: number }) {
  return (
    <div
      className="anim-fade flex flex-col items-center justify-center gap-1.5"
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      <ArrowRight size={15} className="text-white/25" />
      <span className="font-mono text-[9px] tracking-[0.12em] text-white/20">
        {label}
      </span>
    </div>
  )
}
