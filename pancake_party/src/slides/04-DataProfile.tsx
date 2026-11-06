import type { CSSProperties } from 'react'
import { Activity, Clock, Gauge, Plus, Zap } from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill, Stat } from '@/src/components/ui'

const events = [
  { label: '移动轨迹', side: 'up' },
  { label: '技能释放', side: 'down' },
  { label: '伤害统计', side: 'up' },
  { label: '掉落拾取', side: 'down' },
  { label: '状态变化', side: 'up' },
  { label: '社交互动', side: 'down' },
]

export default function DataProfile() {
  return (
    <SlideLayout
      eyebrow="02 · 数据画像"
      title="20TB/天、亿级事件、200+ 维度、高基数"
      subtitle="这不是普通报表负载——它直接定义架构选型"
    >
      <div className="flex h-full flex-col">
        <div className="grid grid-cols-4">
          <Stat
            value="20"
            unit="TB / 天"
            label="每日玩家行为数据"
            note="持续写入，不是离线批量"
            className="border-l-0 border-white/10 pl-0"
            delay={100}
          />
          <Stat
            value="亿"
            unit="级 / 天"
            label="日均事件写入量"
            note="大促与版本期进一步放大"
            className="border-l border-white/10 pl-8"
            delay={160}
          />
          <Stat
            value="200"
            unit="+"
            label="分析指标与维度"
            note="多维度组合、探索式查询"
            className="border-l border-white/10 pl-8"
            delay={220}
          />
          <Stat
            value="上亿"
            label="高基数玩家 ID"
            note="单维度基数即可达到亿级"
            className="border-l border-white/10 pl-8"
            delay={280}
          />
        </div>

        <div className="mt-9 grid flex-1 grid-cols-[1.35fr_0.85fr] gap-5">
          <Panel className="flex flex-col p-7">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-[12px] tracking-[0.24em] text-white/35">
                  EVENT ANATOMY
                </div>
                <h3 className="mt-2 text-[18px] font-semibold">
                  一次副本战斗，产生 50+ 条事件日志
                </h3>
              </div>
              <Pill tone="yellow">
                <Activity size={11} />
                50+ events
              </Pill>
            </div>

            <div className="relative mt-3 flex-1">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/12" />
              {events.map((event, i) => (
                <div
                  key={event.label}
                  className="absolute -translate-x-1/2"
                  style={{ left: `${8 + i * 16.4}%`, top: '50%' }}
                >
                  <span
                    className={
                      event.side === 'up'
                        ? 'absolute bottom-3 left-1/2 h-12 w-px -translate-x-1/2 bg-white/15'
                        : 'absolute top-3 left-1/2 h-12 w-px -translate-x-1/2 bg-white/15'
                    }
                  />
                  <span className="relative z-10 block h-[11px] w-[11px] -translate-y-1/2 rounded-full border-2 border-ch-bg bg-ch-yellow" />
                  <div
                    className={
                      event.side === 'up'
                        ? 'absolute bottom-[68px] left-1/2 w-[96px] -translate-x-1/2 text-center'
                        : 'absolute top-[68px] left-1/2 w-[96px] -translate-x-1/2 text-center'
                    }
                  >
                    <span className="text-[12.5px] font-medium text-white/70">
                      {event.label}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] tracking-[0.1em] text-white/25">
                      {String(i + 1).padStart(2, '0')} · EVENT
                    </span>
                  </div>
                </div>
              ))}
              <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-ch-panel px-2.5 py-1">
                <Plus size={9} className="text-ch-yellow" />
                <span className="font-mono text-[11px] text-white/45">45</span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2.5 border-t border-white/10 pt-4">
              <Zap size={13} className="text-ch-yellow" />
              <span className="text-[12.5px] text-white/40">
                明细粒度越细，实时分析的查询压力与价值同时上升
              </span>
            </div>
          </Panel>

          <Panel flat className="flex flex-col p-7">
            <div className="font-mono text-[12px] tracking-[0.24em] text-white/35">
              WRITE PROFILE
            </div>
            <h3 className="mt-2 text-[18px] font-semibold">写入侧约束</h3>

            <div className="mt-6 grid flex-1 grid-cols-2 gap-3">
              {[
                { icon: Activity, value: '50–200', unit: 'MB/s', label: '持续写入' },
                { icon: Gauge, value: '50万', unit: '消息/秒', label: '峰值写入' },
                { icon: Clock, value: '秒级', unit: 'VISIBLE', label: '实时可见性' },
                { icon: Zap, value: '10–20×', unit: 'SPIKE', label: '版本期流量放大' },
              ].map(({ icon: Icon, value, unit, label }, i) => (
                <div
                  key={label}
                  className="anim-rise flex flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4"
                  style={{ '--delay': `${320 + i * 60}ms` } as CSSProperties}
                >
                  <Icon size={15} className="text-ch-yellow" />
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-[25px] font-semibold tracking-[-0.03em]">
                      {value}
                    </span>
                    <span className="font-mono text-[10.5px] tracking-[0.1em] text-white/35">
                      {unit}
                    </span>
                  </div>
                  <span className="mt-0.5 text-[12.5px] text-white/40">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-[11.5px] text-white/30">
                20 TB/天 ≈ 231 MB/s 平均值
              </span>
              <span className="font-mono text-[10px] tracking-[0.12em] text-ch-yellow/45">
                BURST → 50万 消息/秒
              </span>
            </div>
          </Panel>
        </div>

        <div className="mt-5 flex items-center gap-3 pl-1">
          <span className="h-[3px] w-[3px] bg-ch-yellow" />
          <p className="text-[13.5px] text-white/40">
            批处理太慢，预计算不够灵活——需要实时、灵活、可扩展的 OLAP。
          </p>
        </div>
      </div>
    </SlideLayout>
  )
}
