import type { CSSProperties, ReactNode } from 'react'
import { ArrowDown, ArrowRight, Copy, Sigma } from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'
import { Panel, Pill } from '@/src/components/ui'

export default function BackupJoinScaling() {
  return (
    <SlideLayout
      eyebrow="BACKUP 2 · JOIN 性能提升"
      title="JOIN 性能提高 26 倍"
      subtitle="Parallel Replicas 横向加算力，多阶段分布式查询纵向拆瓶颈"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid min-h-0 flex-1 grid-cols-[0.94fr_1.06fr] gap-5">
          <Panel className="flex flex-col p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
                  PARALLEL REPLICAS
                </div>
                <h3 className="mt-2 text-[19px] font-semibold">
                  用副本算力换并行度
                </h3>
              </div>
              <Pill tone="yellow">横向 · 1 → N</Pill>
            </div>

            <div className="mt-4 flex flex-1 flex-col">
              <ReplicaVisual />

              <div className="mt-3 flex items-center gap-2">
                <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/25">
                  CUSTOM KEY
                </span>
                <code className="rounded-md border border-white/[0.07] bg-black/20 px-2 py-1 font-mono text-[9.5px] text-white/45">
                  parallel_replicas_custom_key = user_id
                </code>
              </div>

              <div className="mt-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5">
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ch-yellow/55">
                  <span className="h-[3px] w-[3px] bg-ch-yellow" />
                  生效条件
                </div>
                <p className="mt-1 text-[11px] leading-[1.5] text-white/35">
                  左大右小：非最左侧表会在每个副本被完整读取；多表 JOIN 需显式开启{' '}
                  <span className="font-mono text-white/55">
                    parallel_replicas_for_queries_with_multiple_tables
                  </span>
                  。
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
              <Benefit label="JOIN" text="左侧大表扫描并行化" />
              <Benefit label="CONCURRENCY" text="单查询资源占用降低" />
            </div>
          </Panel>

          <Panel className="flex flex-col p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/30">
                  MULTI-STAGE DISTRIBUTED QUERY
                </div>
                <h3 className="mt-2 text-[19px] font-semibold">
                  从执行计划拆掉两个瓶颈
                </h3>
              </div>
              <Pill>纵向 · 拆阶段</Pill>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[10.5px] text-white/30">
              <span className="h-[3px] w-[3px] shrink-0 bg-white/30" />
              传统瓶颈：右表哈希表逐节点完整复制 · 最终聚合挤在协调节点
            </div>

            <div className="mt-3 flex min-h-0 flex-1 flex-col">
              <MultiStageFigure />
            </div>

            <div className="mt-3 flex items-center justify-between rounded-lg border border-ch-yellow/25 bg-ch-yellow/[0.045] px-3.5 py-2">
              <div className="flex items-baseline gap-2">
                <span className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-ch-yellow">
                  26×
                </span>
                <span className="text-[10.5px] text-white/45">JOIN vs 22.4</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[18px] font-semibold leading-none text-white/65">
                  2×
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-white/35">
                  TPC-H SF100 · 8 nodes 54.7s · 1 node 117.6s
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
              <Benefit label="JOIN" text="消除大表 JOIN 内存瓶颈" />
              <Benefit
                label="CONCURRENCY"
                text="协调节点不再是串行瓶颈"
              />
            </div>
          </Panel>
        </div>

        <div className="flex h-[46px] shrink-0 items-center gap-3 rounded-lg border border-ch-yellow/25 bg-ch-yellow/[0.045] px-5">
          <span className="h-[5px] w-[5px] bg-ch-yellow" />
          <p className="text-[13.5px] text-ch-yellow">
            不是靠单节点硬扛，而是把 JOIN 成本摊到整个集群。
          </p>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
            Horizontal scale · Vertical split
          </span>
        </div>
      </div>
    </SlideLayout>
  )
}

function ReplicaVisual() {
  return (
    <div className="flex flex-1 flex-col justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-md border border-ch-yellow/35 bg-ch-yellow/[0.06] px-3 py-1.5">
          <span className="h-[4px] w-[4px] bg-ch-yellow" />
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ch-yellow/80">
            One query
          </span>
          <span className="font-mono text-[10px] text-white/45">A JOIN B</span>
        </div>
      </div>

      <div className="mt-2.5 flex justify-center">
        <ArrowDown size={12} className="text-ch-yellow/50" />
      </div>

      <div className="mt-1.5 grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((replica) => (
          <div
            key={replica}
            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-2"
          >
            <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-white/25">
              <span>R{replica}</span>
              <span>Node</span>
            </div>
            <div className="mt-2 h-[5px] overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/4 rounded-full bg-ch-yellow/70" />
            </div>
            <div className="mt-1.5 flex items-center justify-between font-mono text-[7.5px] uppercase tracking-[0.06em]">
              <span className="text-white/35">A / 4</span>
              <span className="text-ch-yellow/60">B ✓</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <div className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-white/30">
          4 × partial join
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  )
}

function MultiStageFigure() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-white/30">
        <Copy size={11} className="shrink-0 text-white/30" />
        BroadcastExchange 1 → N · 小表 B 复制到每个 worker
      </div>

      <div className="mt-2 grid grid-cols-[84px_1fr_1fr_1fr] items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">
          Worker
        </span>
        {['W1', 'W2', 'W3'].map((worker) => (
          <span
            key={worker}
            className="text-center font-mono text-[10px] text-white/40"
          >
            {worker}
          </span>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-[84px_1fr_1fr_1fr] items-center gap-3">
        <StageLabel title="JOIN 前" note="keys 分散" />
        {[
          ['A·k1', 'B·k4'],
          ['A·k3', 'B·k1'],
          ['A·k5', 'B·k2'],
        ].map((chips, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            {chips.map((chip) => (
              <Chip key={chip} tone={chip.startsWith('A') ? 'a' : 'b'}>
                {chip}
              </Chip>
            ))}
          </div>
        ))}
      </div>

      <ShuffleBand label="ShuffleExchange · 按 JOIN key 重分区" note="1 → N" />

      <div className="grid flex-1 grid-cols-[84px_1fr_1fr_1fr] items-center gap-3">
        <StageLabel title="Local JOIN" note="同 key 同 worker" />
        {['k1', 'k3', 'k5'].map((key) => (
          <div key={key} className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <Chip tone="a">A·{key}</Chip>
              <Chip tone="b">B·{key}</Chip>
            </div>
            <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-ch-yellow/60">
              ⨝ local join
            </span>
          </div>
        ))}
      </div>

      <ShuffleBand
        label="Re-shuffle 中间结果 · 按 GROUP BY key"
        note="M → N"
      />

      <div className="grid flex-1 grid-cols-[84px_1fr_1fr_1fr] items-center gap-3">
        <StageLabel title="Local AGG" note="同组同 worker" />
        {['g1', 'g2', 'g3'].map((group) => (
          <div
            key={group}
            className="flex items-center justify-center gap-2 rounded-md border border-ch-yellow/30 bg-ch-yellow/[0.06] py-2"
          >
            <Sigma size={11} className="text-ch-yellow/80" />
            <span className="font-mono text-[10px] text-ch-yellow/80">
              {group}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/35">
          GatherExchange
        </span>
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] text-white/40">协调节点只收结果</span>
      </div>
    </div>
  )
}

function StageLabel({ title, note }: { title: string; note: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/35">
        {title}
      </div>
      <div className="mt-0.5 text-[10px] text-white/25">{note}</div>
    </div>
  )
}

function Chip({ tone, children }: { tone: 'a' | 'b'; children: ReactNode }) {
  return (
    <span
      className={
        tone === 'a'
          ? 'rounded border border-ch-yellow/35 bg-ch-yellow/[0.07] px-2 py-1 font-mono text-[10px] text-ch-yellow/80'
          : 'rounded border border-white/12 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-white/45'
      }
    >
      {children}
    </span>
  )
}

function ShuffleBand({ label, note }: { label: string; note: string }) {
  return (
    <div className="my-1.5 flex items-center gap-2 rounded-md border border-ch-yellow/20 bg-ch-yellow/[0.035] px-3 py-1.5">
      <ArrowDown size={11} className="shrink-0 text-ch-yellow/70" />
      <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-ch-yellow/70">
        {label}
      </span>
      <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.08em] text-white/25">
        {note}
      </span>
    </div>
  )
}

function Benefit({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <ArrowRight size={11} className="mt-[3px] shrink-0 text-ch-yellow/50" />
      <div>
        <div className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/25">
          {label}
        </div>
        <div className="mt-0.5 text-[11px] text-white/55">{text}</div>
      </div>
    </div>
  )
}
