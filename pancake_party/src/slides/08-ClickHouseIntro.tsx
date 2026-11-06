import { Database, Gauge, Scaling, Zap } from 'lucide-react'
import { ClickHouseLogo } from '@/src/components/ClickHouseLogo'
import { useSlideMeta } from '@/src/components/slide-context'
import { pad } from '@/src/lib/cn'

const capabilities = [
  {
    icon: Zap,
    title: '毫秒级处理',
    desc: '即使数据规模达到 PB 级，查询仍毫秒返回',
  },
  {
    icon: Gauge,
    title: '高并发查询',
    desc: '高 QPS 下保持稳定的并发处理',
  },
  {
    icon: Database,
    title: '超高压缩率',
    desc: '存储容量可缩减数十倍',
  },
  {
    icon: Scaling,
    title: '弹性伸缩',
    desc: '根据负载动态扩缩容',
  },
]

export default function ClickHouseIntro() {
  const { index, total } = useSlideMeta()

  return (
    <section className="slide-canvas relative select-none overflow-hidden bg-ch-bg text-white">
      {/* split background */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-ch-yellow" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-ch-bg" />
      <div className="slide-decor pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-70" />

      {/* headline that changes color exactly at the panel split */}
      <h1
        className="anim-rise absolute left-0 top-[62px] z-10 w-full text-center text-[64px] font-bold leading-[1.1] tracking-[-0.02em]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, #151515 0%, #151515 50%, #fbff56 50%, #fbff56 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        AI 时代的领先数据库
      </h1>

      {/* left: brand + positioning statement */}
      <div className="absolute left-0 top-[226px] z-10 flex w-1/2 flex-col items-center px-[84px] text-center text-ch-bg">
        <ClickHouseLogo className="text-[42px] text-ch-bg" />

        <div className="mt-[52px] max-w-[640px] text-[26px] font-medium leading-[1.9] tracking-[-0.01em]">
          <p>阿里云 ClickHouse 企业版托管方案，</p>
          <p>
            是基于
            <mark className="bg-ch-bg px-1.5 py-0.5 text-ch-yellow">
              列式 OLAP
            </mark>
            的
            <mark className="bg-ch-bg px-1.5 py-0.5 text-ch-yellow">
              托管数据库
            </mark>
            。
          </p>
          <p>
            为海量数据的
            <mark className="bg-ch-bg px-1.5 py-0.5 text-ch-yellow">
              实时 SQL 分析
            </mark>
            而设计。
          </p>
          <p>
            凭借
            <mark className="bg-ch-bg px-1.5 py-0.5 text-ch-yellow">
              极高压缩率
            </mark>
            与
            <mark className="bg-ch-bg px-1.5 py-0.5 text-ch-yellow">
              优化的查询引擎
            </mark>
            ，
          </p>
          <p>
            实现
            <mark className="bg-ch-bg px-1.5 py-0.5 text-ch-yellow">
              大幅成本降低
            </mark>
            。
          </p>
        </div>

        <div className="mt-[42px] inline-flex items-center gap-2.5 bg-ch-bg px-5 py-2.5 text-[13.5px] font-medium text-ch-yellow">
          <span className="h-[4px] w-[4px] bg-ch-yellow" />
          阿里云 · 全托管服务
        </div>
      </div>

      {/* right: four capabilities */}
      <div className="absolute right-0 top-[236px] z-10 w-1/2 px-[100px]">
        <div className="space-y-[54px]">
          {capabilities.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="anim-rise flex items-center gap-7"
              style={{ '--delay': `${160 + i * 80}ms` } as React.CSSProperties}
            >
              <span className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-ch-yellow text-ch-bg">
                <Icon size={32} strokeWidth={1.7} />
              </span>
              <div>
                <div className="text-[28px] font-semibold leading-[1.25] text-white">
                  {title}
                </div>
                <div className="mt-1.5 text-[16.5px] font-light leading-[1.5] text-white/50">
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer: page/copyright on yellow, wordmark on dark */}
      <footer className="absolute inset-x-0 bottom-0 z-20 flex h-[54px] items-center">
        <div className="flex w-1/2 items-center gap-4 pl-[64px] font-mono text-[12px] tracking-[0.16em] text-ch-bg">
          <span className="text-[12.5px] font-medium">{pad(index + 1)}</span>
          <span className="opacity-55">© 2026 CLICKHOUSE INC.</span>
          <span className="sr-only">/ {pad(total)}</span>
        </div>
        <div className="flex w-1/2 justify-end pr-[64px]">
          <ClickHouseLogo className="text-[16.5px] text-white/65" />
        </div>
      </footer>
    </section>
  )
}
