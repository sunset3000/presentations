import type { CSSProperties } from 'react'
import {
  Check,
  CheckCircle2,
  Coins,
  HardDrive,
  ShieldCheck,
  TrendingUp,
  Wrench,
} from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { cn } from '@/src/lib/cn'

const objectives = [
  {
    index: '01',
    icon: HardDrive,
    title: '存储可靠性',
    en: 'Storage Reliability',
    criterion: '多副本、故障可恢复，数据始终可用',
  },
  {
    index: '02',
    icon: ShieldCheck,
    title: '运维可靠性',
    en: 'Operational Reliability',
    criterion: '故障少、可预期，不靠人肉兜底',
  },
  {
    index: '03',
    icon: Wrench,
    title: '易于维护',
    en: 'Ease of Maintenance',
    criterion: '升级、备份、排障不占核心人力',
  },
  {
    index: '04',
    icon: TrendingUp,
    title: '可扩展性',
    en: 'Flexibility for Growth',
    criterion: '峰值扩容数分钟，平稳期可缩容',
  },
  {
    index: '05',
    icon: Coins,
    title: '预算内最优成本',
    en: 'Optimal Cost',
    criterion: '总成本可比，收益覆盖增量投入',
  },
]

export default function Objectives() {
  return (
    <SlideLayout
      eyebrow="05 · 验收标准"
      title="从「能跑」到「可信、可扩、可控成本」"
      subtitle="五项 Objective，后续方案价值逐项回扣"
    >
      <div className="flex h-full flex-col justify-center gap-9">
        <div className="flex items-stretch gap-2">
          {objectives.map(({ index, icon: Icon, title, en, criterion }, i) => (
            <div
              key={index}
              className={cn(
                'anim-rise relative flex h-[292px] flex-1 flex-col rounded-[4px] bg-white/[0.055] px-7 pb-7 pt-8',
                i === 0 && 'clip-chevron-first',
                i === objectives.length - 1
                  ? 'clip-chevron-last'
                  : 'clip-chevron',
              )}
              style={{ '--delay': `${100 + i * 70}ms` } as CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] tracking-[0.18em] text-ch-yellow">
                  {index}
                </span>
                <Icon size={18} className="text-white/30" strokeWidth={1.6} />
              </div>

              <h3 className="mt-9 text-[19px] font-semibold leading-[1.35] tracking-[-0.01em]">
                {title}
              </h3>
              <div className="mt-2 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] text-white/30">
                {en}
              </div>

              <div className="mt-auto flex items-start gap-2 border-t border-white/10 pt-4">
                <CheckCircle2
                  size={11}
                  className="mt-[2px] shrink-0 text-ch-yellow"
                />
                <span className="text-[12.5px] leading-[1.55] text-white/40">
                  {criterion}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="anim-rise flex items-center gap-7 rounded-xl border border-white/10 bg-white/[0.025] px-8 py-6" style={{ '--delay': '520ms' } as CSSProperties}>
          <div className="flex items-center gap-3">
            <div className="font-mono text-[44px] font-medium leading-none text-ch-yellow">
              5
            </div>
            <div className="text-[11px] uppercase leading-[1.5] tracking-[0.18em] text-white/35">
              Acceptance
              <br />
              Criteria
            </div>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <p className="text-[19px] font-medium leading-[1.5] text-white/80">
            五项不是并列的愿望，而是一张
            <span className="text-ch-yellow">评分表</span>。
          </p>
          <div className="ml-auto flex items-center gap-3">
            {objectives.map((objective) => (
              <span key={objective.index} className="flex items-center gap-1.5">
                <Check size={12} className="text-ch-yellow" />
                <span className="text-[12px] text-white/35">
                  {objective.title}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
