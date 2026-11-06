import { useState, type CSSProperties } from 'react'
import {
  ArrowRight,
  Bug,
  Clock,
  Filter,
  LineChart,
  ShoppingCart,
  Users,
} from 'lucide-react'
import { CodeBlock } from '@/src/components/CodeBlock'
import { SlideLayout } from '@/src/components/Presentation'
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

const heroQuery = {
  filename: 'retention.sql',
  sql: retentionSql,
}

const scenarios = [
  {
    icon: Users,
    title: 'DAU 统计',
    tech: 'COUNT(DISTINCT)',
    desc: '按日聚合活跃玩家',
    filename: 'dau.sql',
    sql: `-- DAU 统计：按日精确去重
SELECT
    toDate(event_time) AS dt,
    countDistinct(player_id) AS dau,
    count() AS events
FROM gameplay_events
WHERE event_type = 'login'
  AND event_time >= today() - INTERVAL 7 DAY
GROUP BY dt
ORDER BY dt`,
  },
  {
    icon: Clock,
    title: '留存率分析',
    tech: '首登表 JOIN',
    desc: '7 日窗口留存',
    ...heroQuery,
  },
  {
    icon: ShoppingCart,
    title: '道具购买分析',
    tech: '聚合 + 排序',
    desc: '买家数 / 收入 / 均价',
    filename: 'item_sales.sql',
    sql: `-- 道具购买：买家数 / 收入 / 均价
SELECT
    item_id,
    countDistinct(player_id) AS buyers,
    sum(price) AS revenue,
    round(avg(price), 2) AS avg_price
FROM item_purchase_events
WHERE event_time >= today() - INTERVAL 30 DAY
GROUP BY item_id
ORDER BY revenue DESC
LIMIT 20`,
  },
  {
    icon: Filter,
    title: '行为路径漏斗',
    tech: 'windowFunnel(3600)',
    desc: '副本三步转化追踪',
    filename: 'funnel.sql',
    sql: `-- 行为路径漏斗：1 小时内三步转化
SELECT
    countDistinctIf(player_id, level >= 1) AS enter,
    countDistinctIf(player_id, level >= 2) AS clear,
    countDistinctIf(player_id, level >= 3) AS settle,
    round(settle / enter, 4) AS conversion
FROM (
    SELECT player_id,
           windowFunnel(3600)(
               event_time,
               event = 'dungeon_enter',
               event = 'dungeon_clear',
               event = 'settle'
           ) AS level
    FROM gameplay_events
    WHERE event_time >= today() - 1
    GROUP BY player_id
)`,
  },
  {
    icon: LineChart,
    title: '实时经济监控',
    tech: 'JSONExtract + HAVING',
    desc: '物价异动实时过滤',
    filename: 'economy.sql',
    sql: `-- 实时经济监控：JSON 提取 + 异常过滤
SELECT
    toStartOfMinute(event_time) AS minute,
    JSONExtractString(props, 'item_id') AS item,
    round(avg(JSONExtractFloat(props, 'price')), 2) AS price
FROM game_events
WHERE event = 'market_trade'
  AND event_time >= now() - INTERVAL 1 HOUR
GROUP BY minute, item
HAVING price > 1.5 * (
    SELECT avg(JSONExtractFloat(props, 'price'))
    FROM game_events
    WHERE event = 'market_trade'
      AND event_time >= now() - INTERVAL 1 DAY
)
ORDER BY price DESC`,
  },
  {
    icon: Bug,
    title: '作弊检测',
    tech: '统计异常 · 10× 偏离',
    desc: '获取量与均值偏离',
    filename: 'cheat.sql',
    sql: `-- 作弊检测：获取量偏离全服均值 10 倍
WITH per_player AS (
    SELECT player_id,
           item_id,
           count() AS gains
    FROM item_gain_events
    WHERE event_time >= today() - INTERVAL 7 DAY
    GROUP BY player_id, item_id
)
SELECT player_id, item_id, gains
FROM per_player
WHERE gains > 10 * (
    SELECT avg(gains)
    FROM per_player
)
ORDER BY gains DESC
LIMIT 50`,
  },
]

export default function Analytics() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeScenario = activeIndex === null ? null : scenarios[activeIndex]
  const activeQuery = activeScenario ?? heroQuery

  return (
    <SlideLayout
      eyebrow="08 · 典型场景实现"
      title="从留存矩阵到作弊检测，一个引擎覆盖"
      subtitle="窗口函数、原生 JSON 与近似去重，让复杂分析落到秒级"
    >
      <div className="grid h-full grid-cols-[1.04fr_0.96fr] gap-5">
        <div className="flex h-full flex-col gap-3">
          <div
            className={cn(
              'anim-rise flex h-[146px] shrink-0 items-center justify-between rounded-xl border px-7 transition-colors duration-200',
              activeScenario
                ? 'border-white/10 bg-white/[0.02]'
                : 'border-ch-yellow/50 bg-ch-yellow/[0.055]',
            )}
            style={{ '--delay': '110ms' } as CSSProperties}
          >
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

          <div
            className="grid flex-1 grid-cols-2 gap-2.5"
            onMouseLeave={() => setActiveIndex(null)}
          >
            {scenarios.map(({ icon: Icon, title, tech, desc }, i) => (
              <div
                key={title}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  'anim-rise flex flex-col justify-center rounded-lg border px-4 transition-colors duration-200',
                  activeIndex === i
                    ? 'border-ch-yellow/60 bg-ch-yellow/[0.07]'
                    : activeIndex !== null
                      ? 'border-white/[0.06] bg-white/[0.02]'
                      : 'border-white/10 bg-white/[0.03]',
                )}
                style={{ '--delay': `${180 + i * 50}ms` } as CSSProperties}
              >
                <div className="flex items-center gap-2">
                  <Icon size={13} className="text-ch-yellow" />
                  <span className="text-[14.5px] font-medium text-white/80">
                    {title}
                  </span>
                  <ArrowRight
                    size={12}
                    className={cn(
                      'ml-auto transition-opacity duration-200',
                      activeIndex === i
                        ? 'text-ch-yellow/80 opacity-100'
                        : 'text-white/25 opacity-0',
                    )}
                  />
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
          filename={activeQuery.filename}
          code={activeQuery.sql}
          bodyClassName="py-3.5"
        />
      </div>
    </SlideLayout>
  )
}
