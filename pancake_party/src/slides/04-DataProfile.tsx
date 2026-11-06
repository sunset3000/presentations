import type { CSSProperties } from 'react'
import { Activity, Clock, Gauge, Plus, Zap } from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill, Stat } from '@/src/components/ui'

const events = [
  { label: 'Movement', side: 'up' },
  { label: 'Skill casts', side: 'down' },
  { label: 'Damage', side: 'up' },
  { label: 'Loot pickup', side: 'down' },
  { label: 'Status changes', side: 'up' },
  { label: 'Social actions', side: 'down' },
]

export default function DataProfile() {
  return (
    <SlideLayout
      eyebrow="02 · Data Profile"
      title="20 TB/day, 100M+ events, 200+ dimensions, high cardinality"
      subtitle="This is not a typical reporting workload — it directly defines the architecture"
    >
      <div className="flex h-full flex-col">
        <div className="grid grid-cols-4">
          <Stat
            value="20"
            unit="TB / day"
            label="Daily player events"
            note="Continuous writes, not offline batches"
            className="border-l-0 border-white/10 pl-0"
            delay={100}
          />
          <Stat
            value="100M+"
            unit="EVENTS"
            label="Daily event ingestion"
            note="Further amplified during launches and campaigns"
            className="border-l border-white/10 pl-8"
            delay={160}
          />
          <Stat
            value="200"
            unit="+"
            label="Metrics and dimensions"
            note="Multi-dimensional, exploratory queries"
            className="border-l border-white/10 pl-8"
            delay={220}
          />
          <Stat
            value="100M+"
            label="High-cardinality player IDs"
            note="A single dimension can reach 100M+"
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
                  One dungeon battle generates 50+ event logs
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
                Finer granularity raises both query pressure and analytical value
              </span>
            </div>
          </Panel>

          <Panel flat className="flex flex-col p-7">
            <div className="font-mono text-[12px] tracking-[0.24em] text-white/35">
              WRITE PROFILE
            </div>
            <h3 className="mt-2 text-[18px] font-semibold">Write-side constraints</h3>

            <div className="mt-6 grid flex-1 grid-cols-2 gap-3">
              {[
                { icon: Activity, value: '50–200', unit: 'MB/s', label: 'Sustained writes' },
                { icon: Gauge, value: '500K', unit: 'MSG / S', label: 'Peak writes' },
                { icon: Clock, value: 'Seconds', unit: 'VISIBLE', label: 'Real-time visibility' },
                { icon: Zap, value: '10–20×', unit: 'SPIKE', label: 'Launch traffic spike' },
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
                20 TB/day ≈ 231 MB/s average
              </span>
              <span className="font-mono text-[10px] tracking-[0.12em] text-ch-yellow/45">
                BURST → 500K MSG/S
              </span>
            </div>
          </Panel>
        </div>

        <div className="mt-5 flex items-center gap-3 pl-1">
          <span className="h-[3px] w-[3px] bg-ch-yellow" />
          <p className="text-[13.5px] text-white/40">
            Batch processing is too slow and pre-computation too rigid — we need real-time, flexible, scalable OLAP.
          </p>
        </div>
      </div>
    </SlideLayout>
  )
}
