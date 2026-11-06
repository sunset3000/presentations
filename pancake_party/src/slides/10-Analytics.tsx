import type { CSSProperties } from 'react'
import {
  Bug,
  Clock,
  Filter,
  LineChart,
  Search,
  ShoppingCart,
  Users,
} from 'lucide-react'
import { CodeBlock } from '@/src/components/CodeBlock'
import { SlideLayout } from '@/src/components/Presentation'
import { Pill } from '@/src/components/ui'
import { cn } from '@/src/lib/cn'

const retentionSql = `-- 7 日留存魔法矩阵：小时级 → 秒级
WITH cohort AS (
    SELECT player_id,
           min(toDate(event_time)) AS first_day
    FROM gameplay_events
    WHERE event_type = 'login'
    GROUP BY player_id
)
SELECT
    first_day,
    countDistinctIf(player_id, day = 0) AS d0,
    countDistinctIf(player_id, day = 1) / d0 AS r1,
    countDistinctIf(player_id, day = 7) / d0 AS r7
FROM (
    SELECT c.first_day, c.player_id,
           dateDiff('day', c.first_day,
                    toDate(e.event_time)) AS day
    FROM gameplay_events e
    JOIN cohort c USING (player_id)
    WHERE e.event_type = 'login'
)
GROUP BY first_day
ORDER BY first_day`

const scenarios = [
  {
    icon: Users,
    title: 'DAU 统计',
    tech: 'COUNT(DISTINCT)',
    desc: '按日聚合活跃玩家',
  },
  {
    icon: Clock,
    title: '留存率分析',
    tech: '首登表 JOIN',
    desc: '7 日窗口留存',
  },
  {
    icon: ShoppingCart,
    title: '道具购买分析',
    tech: '聚合 + 排序',
    desc: '买家数 / 收入 / 均价',
  },
  {
    icon: Filter,
    title: '行为路径漏斗',
    tech: 'windowFunnel(3600)',
    desc: '副本三步转化追踪',
  },
  {
    icon: LineChart,
    title: '实时经济监控',
    tech: 'JSONExtract + HAVING',
    desc: '物价异动实时过滤',
  },
  {
    icon: Bug,
    title: '作弊检测',
    tech: '统计异常 · 10× 偏离',
    desc: '获取量与均值偏离',
  },
]

export default function Analytics() {
  return (
    <SlideLayout
      eyebrow="08 · 典型场景实现"
      title="从留存矩阵到作弊检测，一个引擎覆盖"
      subtitle="窗口函数、原生 JSON 与近似去重，让复杂分析落到秒级"
    >
      <div className="grid h-full grid-cols-[1.04fr_0.96fr] gap-5">
        <div className="flex h-full flex-col gap-3">
          <div className="anim-rise flex h-[146px] shrink-0 items-center justify-between rounded-xl border border-ch-yellow/50 bg-ch-yellow/[0.055] px-7" style={{ '--delay': '110ms' } as CSSProperties}>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ch-yellow/70">
                HERO QUERY · RETENTION MATRIX
              </div>
              <h3 className="mt-2 text-[21px] font-semibold">
                7 日留存魔法矩阵
              </h3>
              <p className="mt-1 text-[13px] text-white/40">
                countDistinctIf + 子查询 · 一次扫描完成多日留存
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-3">
                <span className="text-[24px] font-medium text-white/25 line-through decoration-white/20">
                  30 min
                </span>
                <span className="text-[16.5px] text-ch-yellow">→</span>
                <span className="text-[54px] font-semibold leading-none tracking-[-0.04em] text-ch-yellow">
                  &lt; 1s
                </span>
              </div>
              <div className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/30">
                Traditional → ClickHouse
              </div>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-2.5">
            {scenarios.map(({ icon: Icon, title, tech, desc }, i) => (
              <div
                key={title}
                className="anim-rise flex flex-col justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4"
                style={{ '--delay': `${180 + i * 50}ms` } as CSSProperties}
              >
                <div className="flex items-center gap-2">
                  <Icon size={13} className="text-ch-yellow" />
                  <span className="text-[14.5px] font-medium text-white/80">
                    {title}
                  </span>
                </div>
                <span className="mt-1.5 text-[11.5px] text-white/35">
                  {desc}
                </span>
                <span className="mt-1 font-mono text-[10.5px] text-ch-yellow/55">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        <CodeBlock
          className="h-full"
          filename="retention.sql"
          code={retentionSql}
          bodyClassName="py-3.5"
          footer={
            <>
              <Pill tone="yellow" className="text-[11.5px]">
                countDistinctIf
              </Pill>
              <Pill tone="default" className="text-[11.5px]">
                windowFunnel(3600)
              </Pill>
              <Pill tone="default" className="text-[11.5px]">
                JSONExtract
              </Pill>
              <span className="ml-auto flex items-center gap-1.5 text-[11px] text-white/30">
                <Search size={10} />
                秒级探索
              </span>
            </>
          }
        />
      </div>
    </SlideLayout>
  )
}
