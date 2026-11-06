import type { CSSProperties } from 'react'
import {
  Boxes,
  BrainCircuit,
  Layers,
  Radar,
  Workflow,
} from 'lucide-react'
import { ClickHouseStamp } from '@/src/components/ClickHouseLogo'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill } from '@/src/components/ui'

const domains = [
  {
    key: 'Observability',
    zh: '可观测性',
    icon: Radar,
    items: ['ClickStack', 'SigNoz', 'PromQL → Prometheus', 'Grafana'],
  },
  {
    key: 'AI / ML',
    zh: '智能应用',
    icon: BrainCircuit,
    items: [
      'Agnoo',
      'DSPy',
      'LangChain',
      'LlamaIndex',
      'PydanticAI',
      'LibreChat',
    ],
  },
  {
    key: 'Open Table Formats',
    zh: '开放表格式与 Catalog',
    icon: Layers,
    items: [
      'Delta Lake',
      'Iceberg',
      'Iceberg REST catalog',
      'Apache Polaris',
      'Unity Catalog',
    ],
  },
  {
    key: 'Cloud Native',
    zh: '云原生',
    icon: Boxes,
    items: ['clickhouse-operator'],
  },
  {
    key: 'Pipelines',
    zh: '数据管道',
    icon: Workflow,
    items: ['ClickPipe', 'Apache Airflow', 'dbt'],
  },
]

export default function Ecosystem() {
  return (
    <SlideLayout
      eyebrow="13 · 方案价值 02"
      title="拥抱开放活跃的 ClickHouse 生态"
      subtitle="生态延展决定分析底座的能力半径"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-[0.32fr_0.68fr] gap-5">
          <Panel className="flex flex-col p-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
              ECOSYSTEM CORE
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="border border-dashed border-ch-yellow/25 p-3">
                <ClickHouseStamp className="h-[92px] w-[92px]" />
              </div>
              <div className="mt-7 text-center">
                <div className="text-[20px] font-semibold tracking-[-0.01em]">
                  ClickHouse Enterprise
                </div>
                <div className="mt-1.5 text-[13px] text-white/40">
                  一套实时分析底座
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[46px] font-semibold leading-none tracking-[-0.045em] text-ch-yellow">
                  19
                </span>
                <span className="text-[13px] text-white/40">
                  个组件 · 5 类领域
                </span>
              </div>
              <div className="mt-2 text-[11.5px] text-white/30">
                同一套 SQL 与接口，按需接入
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

            <div className="mt-3 flex flex-1 flex-col">
              {domains.map(({ key, zh, icon: Icon, items }, i) => (
                <div
                  key={key}
                  className="anim-rise flex flex-1 items-center gap-5 border-t border-white/[0.08] first:border-0"
                  style={{ '--delay': `${170 + i * 55}ms` } as CSSProperties}
                >
                  <div className="flex w-[176px] shrink-0 items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.05] ring-1 ring-inset ring-white/[0.06]">
                      <Icon size={14} className="text-ch-yellow/80" />
                    </span>
                    <div>
                      <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/30">
                        {key}
                      </div>
                      <div className="mt-0.5 text-[12.5px] text-white/60">
                        {zh}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-wrap items-center gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[12px] leading-none text-white/65"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <span className="w-6 shrink-0 text-right font-mono text-[10px] text-white/20">
                    {String(items.length).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="flex h-[46px] shrink-0 items-center gap-3 rounded-lg border border-ch-yellow/25 bg-ch-yellow/[0.045] px-5">
          <span className="h-[5px] w-[5px] bg-ch-yellow" />
          <p className="text-[13.5px] text-ch-yellow">
            生态不是附属品——它决定这套底座的上限。
          </p>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
            5 domains · 19 components
          </span>
        </div>
      </div>
    </SlideLayout>
  )
}
