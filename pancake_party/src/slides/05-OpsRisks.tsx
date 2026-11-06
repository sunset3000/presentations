import type { CSSProperties } from 'react'
import { CloudOff, Expand, HardDrive, Wrench } from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { Dot, IconBox, Pill } from '@/src/components/ui'
import { cn } from '@/src/lib/cn'

const risks = [
  {
    index: '01',
    icon: HardDrive,
    title: '存储可靠性',
    en: 'Storage',
    desc: 'On-prem Doris 单盘故障可能引发分片级崩溃；部分项目面临长时间数据完全不可用。',
    tag: '数据不可用',
  },
  {
    index: '02',
    icon: CloudOff,
    title: 'MinIO 运维',
    en: 'Object Storage',
    desc: '在线升级风险高、扩容收效甚微；故障导致 ETL 崩溃，Airflow 团队疲于排查恢复。',
    tag: 'ETL 不稳定',
  },
  {
    index: '03',
    icon: Wrench,
    title: 'On-Prem 运维',
    en: 'Operations',
    desc: '升级、备份、故障排查均不轻松。关键工程人力被困在基础设施上。',
    tag: '人力黑洞',
  },
  {
    index: '04',
    icon: Expand,
    title: 'Doris 扩容',
    en: 'Scaling',
    desc: 'FE / BE 需分别扩容；BE 扩容后数据再平衡可能耗时数小时至数天，性能下降直接影响业务。',
    tag: '数小时 → 数天',
    accent: true,
  },
]

export default function OpsRisks() {
  return (
    <SlideLayout
      eyebrow="03 · 痛点 01 · 运维成本"
      title="自建 OLAP 的四类运维风险"
      subtitle="每一次故障与扩容，都在消耗团队与业务窗口"
    >
      <div className="flex h-full flex-col justify-center">
        <div className="grid grid-cols-2 gap-4">
          {risks.map((risk, i) => {
            const Icon = risk.icon
            return (
              <div
                key={risk.index}
                className={cn(
                  'anim-rise relative flex h-[246px] flex-col justify-between rounded-xl border p-6',
                  risk.accent
                    ? 'border-ch-yellow bg-ch-yellow text-ch-bg'
                    : 'border-white/10 bg-white/[0.035]',
                )}
                style={{ '--delay': `${100 + i * 70}ms` } as CSSProperties}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <IconBox
                      icon={Icon}
                      size={42}
                      solid={!risk.accent}
                      className={
                        risk.accent
                          ? 'bg-ch-bg text-ch-yellow ring-0'
                          : undefined
                      }
                    />
                    <span
                      className={cn(
                        'font-mono text-[30px] font-medium leading-none',
                        risk.accent ? 'text-ch-bg/15' : 'text-white/[0.08]',
                      )}
                    >
                      {risk.index}
                    </span>
                  </div>

                  <h3 className="mt-4 flex items-baseline gap-2.5">
                    <span className="text-[21px] font-semibold tracking-[-0.01em]">
                      {risk.title}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-[10.5px] uppercase tracking-[0.18em]',
                        risk.accent ? 'text-ch-bg/45' : 'text-white/30',
                      )}
                    >
                      {risk.en}
                    </span>
                  </h3>
                  <p
                    className={cn(
                      'mt-2 max-w-[540px] text-[14px] leading-[1.6]',
                      risk.accent ? 'text-ch-bg/70' : 'text-white/50',
                    )}
                  >
                    {risk.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  {risk.accent ? (
                    <span className="inline-flex items-center gap-2 bg-ch-bg px-3 py-1.5 text-[12.5px] font-semibold text-ch-yellow">
                      <Dot className="bg-ch-yellow" />
                      {risk.tag}
                    </span>
                  ) : (
                    <Pill>{risk.tag}</Pill>
                  )}
                  {risk.accent && (
                    <span className="font-mono text-[11px] tracking-[0.18em] text-ch-bg/45">
                      CRITICAL PATH
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <Dot />
          <p className="text-[14px] text-white/40">
            第 4 类风险最贴近游戏业务：扩容不是「加机器」，而是「等数据再平衡」。
          </p>
        </div>
      </div>
    </SlideLayout>
  )
}
