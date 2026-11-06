import type { CSSProperties } from 'react'
import { Expand, Network, TrendingUp, Wallet } from 'lucide-react'
import { ClickHouseLogo, ClickHouseMark } from '@/src/components/ClickHouseLogo'
import { useSlideMeta } from '@/src/components/slide-context'
import { pad } from '@/src/lib/cn'

const pillars = [
  {
    index: '01',
    title: '峰值不塌',
    note: '10–20× 版本洪峰',
    icon: TrendingUp,
  },
  {
    index: '02',
    title: '扩容不痛',
    note: '无数据再平衡',
    icon: Expand,
  },
  {
    index: '03',
    title: '成本可控',
    note: 'TCO 可比，收益覆盖',
    icon: Wallet,
  },
  {
    index: '04',
    title: '生态可延展',
    note: '可观测性 · AI / ML',
    icon: Network,
  },
]

export default function Closing() {
  const { index, total } = useSlideMeta()

  return (
    <section className="slide-canvas relative select-none overflow-hidden bg-ch-bg text-white">
      <div className="slide-decor pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col px-[80px] pb-[100px] pt-[54px]">
        <header className="flex items-center justify-between">
          <ClickHouseLogo className="text-[24px] text-white" />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/25">
            Q&amp;A · Discussion
          </span>
        </header>

        <div className="grid flex-1 grid-cols-[0.9fr_1.1fr] items-center gap-16">
          <div>
            <div className="eyebrow flex items-center gap-3 text-ch-yellow">
              <span className="h-[3px] w-[3px] bg-ch-yellow" />
              THANK YOU
            </div>
            <h1 className="mt-6 text-[96px] font-bold leading-[1] tracking-[-0.04em]">
              谢谢
            </h1>
            <div className="mt-4 text-[27px] font-light tracking-[0.04em] text-ch-yellow">
              Q &amp; A
            </div>
            <div className="mt-9 flex items-center gap-4">
              <span className="h-9 w-px bg-white/20" />
              <div>
                <div className="text-[14.5px] font-medium text-white/70">
                  Solution Architect
                </div>
                <div className="mt-1 font-mono text-[11px] tracking-[0.18em] text-white/25">
                  CLICKHOUSE ENTERPRISE · 阿里云
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
              <div
                key={pillar.index}
                className="anim-rise flex h-[132px] flex-col justify-between rounded-xl border border-white/10 bg-[#1b1b1b] p-5"
                style={{ '--delay': `${140 + i * 70}ms` } as CSSProperties}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ch-yellow/60">
                    {pillar.index}
                  </span>
                  <Icon size={15} className="text-white/20" />
                </div>
                <div>
                  <div className="text-[21px] font-semibold tracking-[-0.01em]">
                    {pillar.title}
                  </div>
                  <div className="mt-1 text-[11.5px] text-white/30">
                    {pillar.note}
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="h-8 w-[3px] bg-ch-yellow" />
          <p className="text-[17.5px] font-light leading-[1.6] text-white/55">
            对出海游戏而言，实时分析的竞争力不在「能不能查」，而在
            <span className="text-white">
              「峰值不塌、扩容不痛、成本可控、生态可延展」
            </span>
            ——这就是托管方案要交付的确定性。
          </p>
        </div>
      </div>

      <footer className="absolute inset-x-0 bottom-0 z-20 flex h-[54px] items-center justify-between bg-ch-yellow px-[64px] text-ch-bg">
        <div className="flex items-center gap-4 font-mono text-[12px] font-medium tracking-[0.16em]">
          <span className="text-[13.5px] font-semibold">{pad(index + 1)}</span>
          <span className="opacity-40">/ {pad(total)}</span>
          <span className="ml-2 opacity-60">© 2026 CLICKHOUSE INC.</span>
        </div>
        <span
          className="inline-flex select-none items-center gap-[0.5em] text-[16.5px] font-medium tracking-[-0.035em]"
          role="img"
          aria-label="ClickHouse"
        >
          <ClickHouseMark className="h-[1.1em] w-auto" />
          <span>ClickHouse</span>
        </span>
      </footer>
    </section>
  )
}
