import type { CSSProperties } from 'react'
import {
  BarChart3,
  CircleAlert,
  Hash,
  Percent,
  Play,
  Zap,
} from 'lucide-react'
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
    desc: 'Hive / Kafka → Doris 任务无缝复制；离线链路经阿里云 DTS 批量导入。',
    tag: 'DTS',
  },
  {
    index: '03',
    title: '存量数据弹性补数',
    desc: 'ClickHouse Dump 专有集群 · HardLink 隔离线上读写 · 导出 1 GB/s；Hive 完整时用 Spark 重刷。',
    tag: '1 GB/s',
  },
  {
    index: '04',
    title: '四阶段自动化数据校验',
    desc: '行数 → 指标 → 精度 → SQL 回放；任何偏差自动触发断路器。',
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

const validationStages = [
  { icon: Hash, title: '行数统计', sub: '表级 / 分区级对齐' },
  { icon: BarChart3, title: '核心指标聚合', sub: '关键口径逐项比对' },
  { icon: Percent, title: '浮点精度阈值', sub: '误差范围可配置' },
  { icon: Play, title: '真实业务 SQL 回放', sub: '结果逐行比对' },
]

export default function FiveSteps() {
  return (
    <SlideLayout
      eyebrow="10 · 迁移路径"
      title="五步迁移法"
      subtitle="从 DDL 适配到 Doris 下线，每一步都有可验证的出口"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-[1.08fr_0.92fr] gap-6">
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/25">
                Migration playbook
              </span>
              <span className="font-mono text-[10.5px] tracking-[0.14em] text-ch-yellow/45">
                05 STEPS
              </span>
            </div>

            <div className="flex flex-1 flex-col">
              {steps.map((step, i) => (
                <div
                  key={step.index}
                  className={cn(
                    'anim-rise flex flex-1 gap-4 rounded-lg px-4 py-2',
                    step.highlight &&
                      'border border-ch-yellow/40 bg-ch-yellow/[0.055]',
                  )}
                  style={{ '--delay': `${110 + i * 60}ms` } as CSSProperties}
                >
                  <div className="flex w-6 shrink-0 flex-col items-center">
                    <span
                      className={cn(
                        'pt-1 font-mono text-[12.5px]',
                        step.highlight ? 'text-ch-yellow' : 'text-white/35',
                      )}
                    >
                      {step.index}
                    </span>
                    {i < steps.length - 1 && (
                      <span className="mt-2 w-px flex-1 bg-white/[0.12]" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[17px] font-semibold text-white/90">
                        {step.title}
                      </h3>
                      <span
                        className={cn(
                          'shrink-0 font-mono text-[10px] tracking-[0.14em]',
                          step.highlight
                            ? 'text-ch-yellow/80'
                            : 'text-white/25',
                        )}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <p className="mt-1 max-w-[560px] text-[12.5px] leading-[1.55] text-white/40">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Panel accent className="flex flex-col p-6">
            <div className="flex shrink-0 items-start justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ch-yellow/60">
                  STEP 04 · VALIDATION GATE
                </div>
                <h3 className="mt-2 text-[18px] font-semibold">
                  四阶段自动化数据校验
                </h3>
                <p className="mt-1.5 text-[11.5px] text-white/35">
                  四个阶段依次执行，全部通过后才允许切换。
                </p>
              </div>
              <Pill tone="yellow">Automated</Pill>
            </div>

            <div className="relative mt-4 flex flex-1 flex-col">
              <span className="absolute bottom-8 left-[15px] top-8 w-px bg-white/10" />
              {validationStages.map(({ icon: Icon, title, sub }, i) => (
                <div
                  key={title}
                  className="relative z-10 flex flex-1 items-center gap-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ch-yellow/40 bg-[#181818]">
                    <Icon size={13} className="text-ch-yellow" />
                  </span>
                  <div className="flex flex-1 items-center justify-between border-b border-white/[0.06] py-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-white/25">
                          0{i + 1}
                        </span>
                        <span className="text-[14.5px] font-medium text-white/85">
                          {title}
                        </span>
                      </div>
                      <div className="mt-1 text-[11.5px] text-white/35">
                        {sub}
                      </div>
                    </div>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/15">
                      Stage 0{i + 1}
                    </span>
                  </div>
                </div>
              ))}

              <div className="mt-3 shrink-0 rounded-lg border border-ch-yellow/60 bg-ch-yellow px-4 py-3.5 text-ch-bg">
                <div className="flex items-center gap-2.5">
                  <Zap size={16} strokeWidth={2.2} />
                  <span className="text-[14.5px] font-semibold">
                    断路器 · Circuit Breaker
                  </span>
                  <CircleAlert size={14} className="ml-auto opacity-60" />
                </div>
                <p className="mt-1.5 text-[12px] leading-[1.5] text-ch-bg/65">
                  任何阶段出现偏差，自动阻断迁移——不进入人工确认。
                </p>
              </div>
            </div>
          </Panel>
        </div>

        <div className="flex h-[42px] shrink-0 items-center justify-center gap-3">
          <span className="h-[5px] w-[5px] bg-ch-yellow" />
          <p className="text-[13px] text-white/35">
            工程严谨性，体现在「自动阻断」而不是「人工确认」。
          </p>
        </div>
      </div>
    </SlideLayout>
  )
}
