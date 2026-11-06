import type { CSSProperties } from 'react'
import { Activity, ArrowUpRight, Gamepad2, Gauge, Globe2 } from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { Pill } from '@/src/components/ui'

const customers = [
  {
    name: 'Uken Games',
    tag: 'OBSERVABILITY',
    icon: Activity,
    metric: '-87%',
    metricLabel: '成本降低',
    facts: '1 节点 · 170GB traces',
    note: 'SigNoz + Prometheus + Grafana',
  },
  {
    name: 'Suprema Gaming',
    tag: 'GLOBAL',
    icon: Globe2,
    metric: '-62%',
    metricLabel: '成本降低',
    facts: '500K 用户 · 70 国',
    note: '移动游戏后端可观测性',
  },
  {
    name: 'Azur Games',
    tag: 'ELASTIC',
    icon: Gauge,
    metric: '-60%',
    metricLabel: '运维成本下降',
    facts: '120TB · 分钟级扩缩容',
    note: '开发成本 -40% · 系统简化',
  },
  {
    name: 'Roblox',
    tag: 'ML · SCALE',
    icon: Gamepad2,
    metric: '>90%',
    metricLabel: '审核决策自动化',
    facts: '~100M events/day',
    note: 'ML 决策记录 · 判定追踪 · 多模型对比',
  },
]

export default function Customers() {
  return (
    <SlideLayout
      eyebrow="14 · 客户验证"
      title="头部游戏平台的选择"
      subtitle="可复用的行业信心，而非孤立的成功案例"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
          {customers.map((customer, i) => {
            const Watermark = customer.icon
            return (
            <div
              key={customer.name}
              className="anim-rise relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-6"
              style={{ '--delay': `${120 + i * 70}ms` } as CSSProperties}
            >
              <Watermark
                size={170}
                strokeWidth={0.6}
                className="pointer-events-none absolute -bottom-8 right-3 text-white/[0.035]"
                aria-hidden="true"
              />
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[20px] font-semibold tracking-[-0.01em]">
                      {customer.name}
                    </h3>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                      {customer.tag}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-white/20"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-4 flex items-end gap-3">
                  <span className="text-[46px] font-semibold leading-none tracking-[-0.045em] text-ch-yellow">
                    {customer.metric}
                  </span>
                  <span className="pb-1 text-[12.5px] text-white/45">
                    {customer.metricLabel}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-white/10 pt-3.5">
                <div className="text-[12.5px] font-medium text-white/65">
                  {customer.facts}
                </div>
                <div className="mt-1 text-[11.5px] text-white/30">
                  {customer.note}
                </div>
              </div>
            </div>
            )
          })}
        </div>

        <div className="flex h-[44px] shrink-0 items-center gap-4 rounded-lg border border-white/10 bg-white/[0.02] px-5">
          <span className="h-[5px] w-[5px] bg-ch-yellow" />
          <span className="text-[12.5px] text-white/40">
            可观测性成本优势
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="text-[12.5px] text-white/40">全球化运营</span>
          <span className="h-3 w-px bg-white/10" />
          <span className="text-[12.5px] text-white/40">系统简化 · 弹性扩缩</span>
          <span className="h-3 w-px bg-white/10" />
          <span className="text-[12.5px] text-white/40">海量 ML 决策</span>
          <Pill tone="yellow" className="ml-auto">
            已验证的场景映射
          </Pill>
        </div>
      </div>
    </SlideLayout>
  )
}
