import type { CSSProperties } from 'react'
import { ArrowRight, BookOpen, GitBranch, Table2 } from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { IconBox, Panel, Pill } from '@/src/components/ui'

const methods = [
  {
    index: '01',
    icon: Table2,
    title: '预构建宽表',
    en: 'Wide table',
    desc: '在模型层消除 JOIN，用空间换时间。',
    example: 'JOIN(A, B) → wide_table',
  },
  {
    index: '02',
    icon: BookOpen,
    title: '右表转字典',
    en: 'Dictionary / Direct Join',
    desc: '把关联搬进内存，避免分布式 JOIN 的调度成本。',
    example: 'dictGet(B, key) → A',
  },
  {
    index: '03',
    icon: GitBranch,
    title: 'Join Table Engine',
    en: 'Engine-level join',
    desc: '特定场景下的引擎级 JOIN，而不是默认路径。',
    example: 'ENGINE = Join(ANY, LEFT, player_id)',
  },
]

const joinCosts = ['数据 Shuffle', '内存放大', '调度等待']

export default function AvoidJoin() {
  return (
    <SlideLayout
      eyebrow="10 · 性能实践"
      title="Non-Join 比 Join 快 10–100 倍"
      subtitle="从 Doris 的 CBO 习惯，切换到 ClickHouse 的建模方式"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-[0.94fr_1.06fr] gap-5">
          <Panel className="flex flex-col p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
                  QUERY RUNTIME
                </div>
                <h3 className="mt-2 text-[19px] font-semibold">
                  查询耗时（相对）
                </h3>
              </div>
              <Pill>越短越好</Pill>
            </div>

            <div className="mt-12 flex flex-1 flex-col">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[13.5px] text-white/60">
                    <span className="h-[6px] w-[6px] bg-white/30" />
                    JOIN 查询
                  </span>
                  <span className="font-mono text-[14.5px] text-white/70">1×</span>
                </div>
                <div className="h-6 w-full rounded-r-[4px] bg-white/20" />
                <div className="mt-2 font-mono text-[10.5px] tracking-[0.08em] text-white/25">
                  BASELINE
                </div>
              </div>

              <div className="mt-12">
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[13.5px] text-white/60">
                    <span className="h-[6px] w-[6px] bg-ch-yellow" />
                    Non-Join 查询
                  </span>
                  <span className="font-mono text-[14.5px] text-white/70">
                    &lt; 10%
                  </span>
                </div>
                <div className="h-6 w-[9%] min-w-[22px] rounded-r-[4px] bg-ch-yellow" />
                <div className="mt-2 font-mono text-[10.5px] tracking-[0.08em] text-ch-yellow/60">
                  SAME RESULT · FRACTION OF TIME
                </div>
              </div>

              <div className="mt-auto border-t border-white/10 pt-7">
                <div className="text-[52px] font-semibold leading-none tracking-[-0.04em] text-ch-yellow">
                  10–100×
                </div>
                <div className="mt-2 text-[13.5px] text-white/40">
                  相同查询结果，差距来自建模方式而非硬件
                </div>

                <div className="mt-7">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                    JOIN 的隐性成本
                  </div>
                  <div className="mt-2.5 grid grid-cols-3 gap-2">
                    {joinCosts.map((cost) => (
                      <div
                        key={cost}
                        className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-2 text-center text-[11.5px] text-white/40"
                      >
                        {cost}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <div className="flex flex-col gap-3">
            {methods.map(({ index, icon, title, en, desc, example }, i) => (
              <div
                key={index}
                className="anim-rise flex flex-1 flex-col justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-6 py-4"
                style={{ '--delay': `${150 + i * 80}ms` } as CSSProperties}
              >
                <div className="flex items-center gap-4">
                  <IconBox icon={icon} size={46} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-ch-yellow/60">
                        {index}
                      </span>
                      <h3 className="text-[18px] font-semibold">{title}</h3>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/25">
                        {en}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-[1.55] text-white/40">
                      {desc}
                    </p>
                  </div>
                  <ArrowRight size={15} className="shrink-0 text-white/20" />
                </div>

                <code className="block rounded-md border border-white/[0.06] bg-black/20 px-3 py-2 font-mono text-[11.5px] tracking-[0.02em] text-white/30">
                  {example}
                </code>
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-[46px] shrink-0 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-5">
          <span className="h-[5px] w-[5px] bg-ch-yellow" />
          <p className="text-[13.5px] text-white/45">
            原则：避免不必要的 JOIN，或低效 JOIN。
          </p>
          <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/25">
            建模习惯 · 先于 SQL 方言
          </span>
        </div>
      </div>
    </SlideLayout>
  )
}
