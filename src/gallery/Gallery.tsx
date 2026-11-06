import { motion } from 'motion/react'
import { ArrowUpRight, Github, MonitorPlay } from 'lucide-react'
import { ClickHouseLogo } from '@/src/components/ClickHouseLogo'
import { presentations } from '@/src/gallery/presentations'
import type { PresentationMeta } from '@/src/lib/presentation'
import { presentationHref } from '@/src/lib/presentation'

const REPO_URL = 'https://github.com/sunset3000/presentations'

export function Gallery() {
  const totalSlides = presentations.reduce(
    (sum, presentation) => sum + presentation.slideCount,
    0,
  )
  const latestDate = presentations.reduce(
    (latest, presentation) =>
      presentation.date > latest ? presentation.date : latest,
    '',
  )

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#090909] text-white">
      <AmbientBackground />

      <header className="relative z-10 mx-auto flex max-w-[1240px] items-center justify-between px-6 pt-8 sm:px-10">
        <a
          href={import.meta.env.BASE_URL}
          className="group flex items-center gap-4"
          aria-label="返回演示首页"
        >
          <ClickHouseLogo className="text-[23px] text-white transition-colors group-hover:text-ch-yellow" />
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.26em] text-white/40 sm:block">
            Presentations
          </span>
        </a>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-[12.5px] text-white/55 transition-colors hover:border-white/25 hover:text-white"
        >
          <Github size={15} />
          <span>GitHub</span>
          <ArrowUpRight size={13} className="text-white/30" />
        </a>
      </header>

      <main className="relative z-10 mx-auto max-w-[1240px] px-6 pb-24 sm:px-10">
        <section className="pb-16 pt-20 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow flex items-center gap-3 text-ch-yellow">
              <span className="h-[3px] w-[3px] bg-ch-yellow" />
              DECK LIBRARY
            </div>
            <h1 className="mt-6 text-[52px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[76px]">
              演示文集<span className="text-ch-yellow">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] font-light leading-7 text-white/45">
              ClickHouse × 阿里云企业版 — 客户方案、技术深潜与实战复盘。
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-7"
          >
            <GalleryStat
              value={String(presentations.length).padStart(2, '0')}
              label="Presentations"
            />
            <GalleryStat
              value={String(totalSlides).padStart(2, '0')}
              label="Slides"
            />
            <GalleryStat value={latestDate} label="Latest update" />
          </motion.dl>
        </section>

        <section aria-labelledby="deck-list">
          <div className="flex items-center justify-between border-t border-white/10 pt-5">
            <h2
              id="deck-list"
              className="font-mono text-[10.5px] uppercase tracking-[0.26em] text-white/40"
            >
              All presentations
            </h2>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/25">
              {String(presentations.length).padStart(2, '0')} deck
              {presentations.length === 1 ? '' : 's'}
            </span>
          </div>

          <ol className="mt-6 space-y-5">
            {presentations.map((presentation, index) => (
              <PresentationCard
                key={presentation.slug}
                presentation={presentation}
                index={index}
              />
            ))}
          </ol>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-6 py-7 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/30 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>ClickHouse Enterprise · 阿里云</span>
          <span>
            {totalSlides} slides · 16:9 · Presented on the web
          </span>
        </div>
      </footer>
    </div>
  )
}

function GalleryStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
        {label}
      </dt>
      <dd className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.04em] text-white sm:text-[36px]">
        {value}
      </dd>
    </div>
  )
}

function PresentationCard({
  presentation,
  index,
}: {
  presentation: PresentationMeta
  index: number
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.18 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <a
        href={presentationHref(presentation.slug)}
        className="group grid overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition-[border-color,background-color] duration-300 hover:border-ch-yellow/45 hover:bg-[#131313] md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]"
      >
        <div className="flex flex-col border-t border-white/10 md:border-l md:border-t-0">
          <div className="relative aspect-video overflow-hidden bg-[#151515]">
            <img
              src={presentation.thumbnail}
              alt={presentation.thumbnailAlt}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
              Deck {String(index + 1).padStart(2, '0')}
            </span>
            <span className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-ch-yellow text-ch-bg opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={19} strokeWidth={2.2} />
            </span>
          </div>
          <div className="flex flex-1 items-center justify-between border-t border-white/[0.06] px-5 py-4 font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/25">
            <span>ClickHouse × Alibaba Cloud</span>
            <span>{presentation.date}</span>
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            <span className="flex items-center gap-1.5 text-ch-yellow">
              <span className="h-1.5 w-1.5 rounded-full bg-ch-yellow" />
              Live
            </span>
            <span className="h-3 w-px bg-white/12" />
            <span>{presentation.date}</span>
            <span className="h-3 w-px bg-white/12" />
            <span>{presentation.slideCount} slides</span>
          </div>

          <h3 className="mt-5 text-[30px] font-semibold leading-tight tracking-[-0.035em] sm:text-[34px]">
            {presentation.title}
          </h3>
          <p className="mt-2 text-[16px] font-light leading-6 text-white/55">
            {presentation.subtitle}
          </p>
          <p className="mt-5 max-w-md text-[13.5px] leading-6 text-white/40">
            {presentation.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {presentation.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-2.5 py-1 text-[11.5px] text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
              Open presentation
            </span>
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/70 transition-colors group-hover:text-ch-yellow">
              打开演示
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </a>
    </motion.li>
  )
}

function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0">
      <div className="absolute left-1/2 top-[-34%] h-[760px] w-[1120px] -translate-x-1/2 rounded-full bg-ch-yellow/[0.055] blur-[170px]" />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 90% 55% at 50% 0%, black, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 55% at 50% 0%, black, transparent 78%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[320px] bg-gradient-to-t from-[#090909] to-transparent" />
    </div>
  )
}
