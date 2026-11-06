import type { CSSProperties } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Clock,
  Server,
  TrendingUp,
  Wrench,
} from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill } from '@/src/components/ui'
import { cn } from '@/src/lib/cn'

const scores = [
  {
    index: '01',
    title: '存储可靠性',
    en: 'Storage Reliability',
    value: '100%',
    width: 100,
    note: '关键组件（DB、S3）均纳入「服务」保障',
  },
  {
    index: '02',
    title: '运维可靠性',
    en: 'Operational Reliability',
    value: '100%',
    width: 100,
    note: '大量复杂运维任务卸载至托管服务',
  },
  {
    index: '03',
    title: '易于维护',
    en: 'Ease of Maintenance',
    value: '80–85%',
    width: 83,
    honest: true,
    note: '显著降低但未完全消除——结合投入看结果良好',
  },
  {
    index: '04',
    title: '可扩展性',
    en: 'Flexibility for Growth',
    value: '100%',
    width: 100,
    note: '无停机、无数据再平衡，仅扩无状态计算节点，数分钟内 2x / 5x / 10x',
  },
  {
    index: '05',
    title: '预算内最优成本',
    en: 'Optimal Cost',
    value: '100%',
    width: 100,
    note: '降低总 TCO，服务成本可比，且被收益数倍覆盖',
  },
]

const simplifications = [
  { from: 'MinIO', to: 'Amazon S3', icon: Server },
  { from: '旧服务器搭建与维护', to: '清理冗余配置与脚本', icon: Wrench },
]

export default function ValueScorecard() {
  return (
    <SlideLayout
      eyebrow="12 · 方案价值 01"
      title="五项 Objective，逐项达成"
      subtitle="成本可比，收益数倍覆盖——不是概念映射，而是验收结果"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-[1.04fr_0.96fr] gap-5">
          <Panel className="flex flex-col p-7">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
                  OBJECTIVE SCORECARD
                </div>
                <h3 className="mt-2 text-[19px] font-semibold">验收记分卡</h3>
              </div>
              <Pill tone="yellow">4 × 100% · 1 × 80–85%</Pill>
            </div>

            <div className="mt-3.5 flex flex-1 flex-col justify-center">
              {scores.map((score, i) => (
                <div
                  key={score.index}
                  className="anim-rise border-t border-white/[0.08] py-2.5 first:border-0 first:pt-0"
                  style={{ '--delay': `${130 + i * 60}ms` } as CSSProperties}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10.5px] text-ch-yellow/60">
                      {score.index}
                    </span>
                    <span className="text-[15.5px] font-medium text-white/85">
                      {score.title}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/20">
                      {score.en}
                    </span>
                    <span
                      className={cn(
                        'ml-auto font-mono text-[17.5px] font-semibold',
                        score.honest ? 'text-white/65' : 'text-ch-yellow',
                      )}
                    >
                      {score.value}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-3 pl-[26px]">
                    <span className="min-w-0 flex-1 truncate text-[11.5px] text-white/35">
                      {score.note}
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-center pl-[26px]">
                    <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={cn(
                          'anim-grow-x h-full rounded-full',
                          score.honest ? 'bg-white/45' : 'bg-ch-yellow',
                        )}
                        style={
                          {
                            width: `${score.width}%`,
                            '--delay': `${250 + i * 60}ms`,
                          } as CSSProperties
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3.5">
              <span className="h-[4px] w-[4px] bg-ch-yellow" />
              <span className="text-[12px] text-white/35">
                80–85% 的诚实评分，比 100% 的口号更可信。
              </span>
            </div>
          </Panel>

          <div className="flex h-full flex-col gap-4">
            <Panel className="flex flex-1 flex-col p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
                INVESTMENT & RETURN
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]">
                  <Clock size={16} className="text-white/50" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/25">
                    投入
                  </div>
                  <div className="mt-0.5 text-[14px] font-medium text-white/80">
                    2 名工程师 × 3 个月 + 架构师 × 1 个月
                  </div>
                </div>
              </div>

              <div className="my-3 flex justify-center">
                <ArrowDown size={13} className="text-ch-yellow/40" />
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-ch-yellow/25 bg-ch-yellow/[0.045] px-4 py-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ch-yellow text-ch-bg">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-ch-yellow/60">
                    回报
                  </div>
                  <div className="mt-0.5 text-[14px] font-medium text-white/85">
                    服务成本可比，收益数倍覆盖
                  </div>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-[11px] text-white/25">迁移周期</span>
                <span className="font-mono text-[10.5px] tracking-[0.12em] text-white/45">
                  ≈ 3 MONTHS
                </span>
              </div>
            </Panel>

            <Panel flat className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
                  COMPLEXITY REDUCTION
                </div>
                <span className="font-mono text-[10px] text-white/20">
                  2 SIMPLIFICATIONS
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-center space-y-2.5 py-3">
                {simplifications.map(({ from, to, icon: Icon }) => (
                  <div
                    key={from}
                    className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-3"
                  >
                    <Icon size={13} className="shrink-0 text-ch-yellow/60" />
                    <span className="w-[136px] shrink-0 text-[12.5px] text-white/40 line-through decoration-white/15">
                      {from}
                    </span>
                    <ArrowRight size={12} className="shrink-0 text-white/20" />
                    <span className="text-[12.5px] text-white/75">{to}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 border-t border-white/10 pt-3">
                <span className="h-[4px] w-[4px] bg-ch-yellow" />
                <span className="text-[11.5px] text-white/30">
                  少一套系统，就少一类故障源。
                </span>
              </div>
            </Panel>
          </div>
        </div>

        <div className="flex h-[46px] shrink-0 items-center gap-3 rounded-lg border border-ch-yellow/25 bg-ch-yellow/[0.045] px-5">
          <span className="h-[5px] w-[5px] bg-ch-yellow" />
          <p className="text-[13.5px] text-ch-yellow">
            节省的工程师时间，足以覆盖略增的服务成本。
          </p>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
            Time saved &gt; cost increase
          </span>
        </div>
      </div>
    </SlideLayout>
  )
}
