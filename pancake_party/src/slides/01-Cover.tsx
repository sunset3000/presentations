import { ClickHouseLogo, ClickHouseStamp } from '@/src/components/ClickHouseLogo'
import { useSlideMeta } from '@/src/components/slide-context'
import { pad } from '@/src/lib/cn'

export default function Cover() {
  const { total } = useSlideMeta()

  return (
    <section className="slide-canvas relative select-none overflow-hidden bg-ch-bg text-white">
      <div className="slide-decor pointer-events-none absolute inset-0" />

      {/* faint technical ticks on the right */}
      <div className="pointer-events-none absolute right-[52px] top-[292px] flex flex-col gap-2">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="block h-px bg-white/15"
            style={{ width: i % 4 === 0 ? 14 : 7 }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute right-[84px] top-[300px] h-[332px] w-[332px] border border-white/[0.08]" />
      <div
        className="pointer-events-none absolute right-[26px] top-[390px] font-mono text-[11px] uppercase tracking-[0.42em] text-white/25"
        style={{ writingMode: 'vertical-rl' }}
      >
        Real-time analytics · Gaming · Global
      </div>

      <div className="relative z-10 flex h-full flex-col px-[80px] pb-[170px] pt-[54px]">
        <header className="flex items-center justify-between">
          <ClickHouseLogo className="text-[27px] text-white" />
          <div className="font-mono text-[12px] tracking-[0.26em] text-white/40">
            ALIBABA CLOUD × CLICKHOUSE ENTERPRISE
          </div>
        </header>

        <div className="mt-[62px] max-w-[1080px]">
          <div className="eyebrow flex items-center gap-3 text-ch-yellow">
            <span className="h-[3px] w-[3px] bg-ch-yellow" />
            GAMING · GLOBAL · REAL-TIME ANALYTICS
          </div>

          <h1
            className="anim-rise mt-7 text-[86px] font-bold leading-[1.02] tracking-[-0.035em]"
            style={{ '--delay': '90ms' } as React.CSSProperties}
          >
            煎饼派对出海
          </h1>

          <div
            className="anim-rise mt-5 text-[39px] font-light leading-[1.25] tracking-[-0.02em] text-white/92"
            style={{ '--delay': '170ms' } as React.CSSProperties}
          >
            阿里云 <span className="font-semibold text-ch-yellow">ClickHouse</span>{' '}
            企业版托管方案
          </div>

          <p
            className="anim-rise mt-7 max-w-[760px] text-[19px] font-light leading-[1.6] text-white/50"
            style={{ '--delay': '250ms' } as React.CSSProperties}
          >
            从自建 Doris 到 Agent 时代实时分析底座
          </p>

          <div
            className="anim-rise mt-5 flex items-center gap-3 text-[13px] font-light text-white/50"
            style={{ '--delay': '290ms' } as React.CSSProperties}
          >
            <span className="h-[3px] w-[3px] bg-ch-yellow" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/30">
              场景
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span>游戏出海</span>
            <span className="text-white/20">·</span>
            <span>实时分析</span>
            <span className="text-white/20">·</span>
            <span>托管化演进</span>
          </div>

          <div
            className="anim-rise mt-8 flex items-center gap-5"
            style={{ '--delay': '330ms' } as React.CSSProperties}
          >
            <span className="h-11 w-px bg-white/20" />
            <div>
              <div className="text-[17.5px] font-medium text-white/90">
                Solution Architect
              </div>
              <div className="mt-1.5 font-mono text-[12px] tracking-[0.18em] text-white/35">
                CLICKHOUSE ENTERPRISE · 阿里云
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* right-hand brand visual */}
      <div className="absolute right-[92px] top-[300px] z-10">
        <ClickHouseStamp className="h-[300px] w-[300px]" />
        <div className="absolute -left-[206px] top-[146px]">
          <DatabaseBolt />
        </div>
      </div>

      {/* yellow ground band */}
      <svg
        className="absolute inset-x-0 bottom-0 z-10 h-[152px] w-full"
        viewBox="0 0 1600 152"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 26 L1600 0 L1600 152 L0 152 Z" fill="#fbff56" />
      </svg>

      <div className="absolute bottom-[30px] left-[80px] z-20 flex items-center gap-6">
        <div className="flex h-[64px] min-w-[186px] items-center justify-center bg-ch-bg px-8">
          <span className="font-mono text-[25px] font-medium tracking-[0.05em] text-white">
            2026.11
          </span>
        </div>
        <div className="font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-ch-bg/55">
          Game globalization / Real-time analytics
        </div>
      </div>

      <div className="absolute bottom-[36px] right-[80px] z-20 font-mono text-[12.5px] tracking-[0.18em] text-ch-bg/55">
        01 <span className="mx-1 opacity-50">/</span> {pad(total)}
      </div>
    </section>
  )
}

function DatabaseBolt() {
  return (
    <svg
      width="132"
      height="150"
      viewBox="0 0 132 150"
      fill="none"
      aria-hidden="true"
      className="opacity-90"
    >
      <ellipse
        cx="66"
        cy="34"
        rx="36"
        ry="12"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="1.6"
      />
      <path
        d="M30 34v78c0 6.6 16.1 12 36 12s36-5.4 36-12V34"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="1.6"
      />
      <path
        d="M30 60c0 6.6 16.1 12 36 12s36-5.4 36-12M30 86c0 6.6 16.1 12 36 12s36-5.4 36-12"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.4"
      />
      <path
        d="M72 100 L46 62 L63 62 L54 34 L86 74 L68 74 L78 100 Z"
        fill="#fbff56"
      />
      <path
        d="M72 100 L46 62 L63 62 L54 34 L86 74 L68 74 L78 100 Z"
        stroke="#151515"
        strokeWidth="1.2"
      />
    </svg>
  )
}
