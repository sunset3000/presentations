import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
} from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  LayoutGrid,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react'
import { cn, pad } from '@/src/lib/cn'
import { SlideMetaContext } from '@/src/components/slide-context'

export interface SlideDefinition {
  component: ComponentType
  title: string
}

type Direction = 1 | -1

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 44 : -44,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -44 : 44,
  }),
}

const SLIDE_W = 1600
const SLIDE_H = 900
const THUMB_W = 320
const THUMB_SCALE = THUMB_W / SLIDE_W

function initialIndex(total: number): number {
  const match = window.location.hash.match(/^#s(\d+)$/)
  if (!match) return 0
  return Math.min(total - 1, Math.max(0, Number(match[1]) - 1))
}

export function Presentation({
  slides,
  chrome = true,
}: {
  slides: SlideDefinition[]
  /** Set false for snapshots/embeds: hides arrows, progress bar and toolbar. */
  chrome?: boolean
}) {
  const total = slides.length
  const [index, setIndex] = useState(() => initialIndex(total))
  const [direction, setDirection] = useState<Direction>(1)
  const [overview, setOverview] = useState(false)
  const [help, setHelp] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [chromeVisible, setChromeVisible] = useState(true)
  const [scale, setScale] = useState(1)
  const chromeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const onResize = () => {
      setScale(
        Math.min(window.innerWidth / SLIDE_W, window.innerHeight / SLIDE_H),
      )
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    window.history.replaceState(null, '', `#s${index + 1}`)
  }, [index])

  useEffect(() => {
    const onHashChange = () => {
      const match = window.location.hash.match(/^#s(\d+)$/)
      if (!match) return
      const target = Math.min(total - 1, Math.max(0, Number(match[1]) - 1))
      if (target === index) return
      setDirection(target > index ? 1 : -1)
      setIndex(target)
      setOverview(false)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [index, total])

  useEffect(() => {
    const onFullscreen = () =>
      setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreen)
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreen)
  }, [])

  const goTo = useCallback(
    (next: number) => {
      const target = Math.min(total - 1, Math.max(0, next))
      if (target === index) return
      setDirection(target > index ? 1 : -1)
      setIndex(target)
    },
    [index, total],
  )

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void document.documentElement.requestFullscreen()
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const key = event.key
      const letter = key.toLowerCase()

      if (
        key === 'ArrowRight' ||
        key === 'ArrowDown' ||
        key === 'PageDown' ||
        key === ' '
      ) {
        event.preventDefault()
        setOverview(false)
        goTo(index + 1)
      } else if (
        key === 'ArrowLeft' ||
        key === 'ArrowUp' ||
        key === 'PageUp'
      ) {
        event.preventDefault()
        setOverview(false)
        goTo(index - 1)
      } else if (key === 'Home') {
        event.preventDefault()
        goTo(0)
      } else if (key === 'End') {
        event.preventDefault()
        goTo(total - 1)
      } else if (letter === 'o') {
        event.preventDefault()
        setOverview((value) => !value)
      } else if (letter === 'f') {
        event.preventDefault()
        toggleFullscreen()
      } else if (letter === '?' || key === '/') {
        event.preventDefault()
        setHelp((value) => !value)
      } else if (key === 'Escape') {
        setOverview(false)
        setHelp(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, index, total, toggleFullscreen])

  useEffect(() => {
    const wake = () => {
      setChromeVisible(true)
      window.clearTimeout(chromeTimer.current)
      chromeTimer.current = window.setTimeout(
        () => setChromeVisible(false),
        3200,
      )
    }
    wake()
    window.addEventListener('pointermove', wake)
    window.addEventListener('keydown', wake)
    return () => {
      window.clearTimeout(chromeTimer.current)
      window.removeEventListener('pointermove', wake)
      window.removeEventListener('keydown', wake)
    }
  }, [])

  const ActiveSlide = slides[index].component

  const showChrome = chrome && chromeVisible && !overview && !help

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#090909]">
      <div
        className="relative shrink-0 shadow-[0_50px_140px_rgba(0,0,0,0.8)]"
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          transform: `scale(${scale})`,
        }}
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideMetaContext.Provider value={{ index, total }}>
              <ActiveSlide />
            </SlideMetaContext.Provider>
          </motion.div>
        </AnimatePresence>

        {chrome && (
          <>
            <button
              type="button"
              aria-label="上一页"
              onClick={() => goTo(index - 1)}
              className="group absolute inset-y-0 left-0 z-30 flex w-12 items-center justify-center outline-none"
            >
              <span className="flex h-11 w-8 items-center justify-center rounded-r-md bg-black/0 text-white/0 transition-colors group-hover:bg-black/25 group-hover:text-white/60 group-focus-visible:bg-black/60 group-focus-visible:text-white">
                <ChevronLeft size={22} />
              </span>
            </button>
            <button
              type="button"
              aria-label="下一页"
              onClick={() => goTo(index + 1)}
              className="group absolute inset-y-0 right-0 z-30 flex w-12 items-center justify-center outline-none"
            >
              <span className="flex h-11 w-8 items-center justify-center rounded-l-md bg-black/0 text-white/0 transition-colors group-hover:bg-black/25 group-hover:text-white/60 group-focus-visible:bg-black/60 group-focus-visible:text-white">
                <ChevronRight size={22} />
              </span>
            </button>
          </>
        )}
      </div>

      {chrome && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-[4px] bg-white/[0.08]">
          <div
            className="h-full bg-ch-yellow transition-[width] duration-500 ease-out"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      )}

      {chrome && (
        <div
          className={cn(
            'fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 transition-all duration-300',
            showChrome
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-2 opacity-0',
          )}
        >
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#101010]/95 p-1.5 shadow-[0_13px_40px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <ToolbarButton
              label="上一页"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
            >
              <ChevronLeft size={16} />
            </ToolbarButton>
            <span className="min-w-[74px] px-1 text-center font-mono text-[12.5px] tracking-[0.12em] text-white/55">
              {pad(index + 1)}{' '}
              <span className="text-white/25">/ {pad(total)}</span>
            </span>
            <ToolbarButton
              label="下一页"
              onClick={() => goTo(index + 1)}
              disabled={index === total - 1}
            >
              <ChevronRight size={16} />
            </ToolbarButton>
            <span className="mx-1 h-4 w-px bg-white/10" />
            <ToolbarButton label="总览 (O)" onClick={() => setOverview(true)}>
              <LayoutGrid size={15} />
            </ToolbarButton>
            <ToolbarButton
              label={isFullscreen ? '退出全屏 (F)' : '全屏 (F)'}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </ToolbarButton>
            <ToolbarButton label="快捷键" onClick={() => setHelp(true)}>
              <HelpCircle size={15} />
            </ToolbarButton>
          </div>
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        第 {index + 1} 页，共 {total} 页：{slides[index].title}
      </div>

      <AnimatePresence>
        {overview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-[#0b0b0b]/97 backdrop-blur-sm"
          >
            <div className="mx-auto max-w-[1500px] px-12 py-10">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <div className="eyebrow">Overview</div>
                  <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.02em]">
                    幻灯片总览
                    <span className="ml-3 font-mono text-[14.5px] font-normal tracking-normal text-white/35">
                      {total} slides
                    </span>
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOverview(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:text-white"
                  aria-label="关闭总览"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-[repeat(auto-fill,320px)] justify-center gap-x-6 gap-y-7">
                {slides.map((slide, slideIndex) => {
                  const SlideThumb = slide.component
                  return (
                    <button
                      type="button"
                      key={slideIndex}
                      onClick={() => {
                        setDirection(slideIndex > index ? 1 : -1)
                        setIndex(slideIndex)
                        setOverview(false)
                      }}
                      className="group text-left outline-none"
                    >
                      <div
                        className={cn(
                          'relative overflow-hidden rounded-lg border bg-ch-bg transition-all duration-200',
                          slideIndex === index
                            ? 'border-ch-yellow ring-1 ring-ch-yellow/30'
                            : 'border-white/10 group-hover:border-white/30',
                        )}
                        style={{ width: THUMB_W, height: THUMB_W * 0.5625 }}
                      >
                        <div
                          className="pointer-events-none absolute left-0 top-0 origin-top-left"
                          style={{
                            width: SLIDE_W,
                            height: SLIDE_H,
                            transform: `scale(${THUMB_SCALE})`,
                          }}
                        >
                          <SlideMetaContext.Provider
                            value={{ index: slideIndex, total }}
                          >
                            <SlideThumb />
                          </SlideMetaContext.Provider>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-baseline gap-2.5">
                        <span
                          className={cn(
                            'font-mono text-[12px]',
                            slideIndex === index
                              ? 'text-ch-yellow'
                              : 'text-white/35',
                          )}
                        >
                          {pad(slideIndex + 1)}
                        </span>
                        <span className="truncate text-[13.5px] text-white/65 transition-colors group-hover:text-white">
                          {slide.title}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {help && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/65 p-6 backdrop-blur-sm"
            onClick={() => setHelp(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="w-[480px] rounded-2xl border border-white/12 bg-[#161616] p-7 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold">快捷键</h3>
                <button
                  type="button"
                  onClick={() => setHelp(false)}
                  className="text-white/40 transition-colors hover:text-white"
                  aria-label="关闭"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  ['→  /  Space', '下一页'],
                  ['←', '上一页'],
                  ['Home  /  End', '首页 / 末页'],
                  ['O', '幻灯片总览'],
                  ['F', '全屏演示'],
                  ['?', '打开快捷键'],
                  ['Esc', '关闭浮层'],
                ].map(([keys, action]) => (
                  <div
                    key={keys}
                    className="flex items-center justify-between border-b border-white/[0.06] pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-[13.5px] text-ch-yellow">
                      {keys}
                    </span>
                    <span className="text-[14.5px] text-white/60">{action}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[13.5px] leading-5 text-white/40">
                鼠标悬停底部可呼出控制条；移动鼠标或按键也会自动显示控制条。
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ToolbarButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  )
}

export function SlideLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer = 'dark',
  align = 'center',
  className,
  bodyClassName,
  headerClassName,
  decor = true,
}: {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  subtitle?: React.ReactNode
  children: React.ReactNode
  footer?: 'dark' | 'yellow' | 'none'
  align?: 'center' | 'left'
  className?: string
  bodyClassName?: string
  headerClassName?: string
  decor?: boolean
}) {
  return (
    <section
      className={cn(
        'slide-canvas flex select-none flex-col text-white',
        className,
      )}
    >
      {decor && (
        <div className="slide-decor pointer-events-none absolute inset-0" />
      )}
      <div
        className={cn(
          'relative z-10 flex min-h-0 flex-1 flex-col px-[80px]',
          footer === 'none' ? 'pb-12' : 'pb-[64px]',
        )}
      >
        <header
          className={cn(
            'shrink-0 pt-[46px]',
            align === 'center' ? 'text-center' : 'text-left',
            headerClassName,
          )}
        >
          {eyebrow && (
            <div
              className={cn(
                'eyebrow anim-fade flex items-center gap-2.5',
                align === 'center' && 'justify-center',
              )}
              style={{ '--delay': '40ms' } as CSSProperties}
            >
              <span className="h-[3px] w-[3px] bg-ch-yellow" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2
              className="anim-rise mt-[10px] text-[40px] font-bold leading-[1.16] tracking-[-0.012em] text-ch-yellow"
              style={{ '--delay': '90ms' } as CSSProperties}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className="anim-rise mt-[10px] text-[17px] font-light leading-[1.5] text-ch-soft/80"
              style={{ '--delay': '150ms' } as CSSProperties}
            >
              {subtitle}
            </p>
          )}
        </header>
        <div className={cn('min-h-0 flex-1 pt-7', bodyClassName)}>
          {children}
        </div>
      </div>
      {footer !== 'none' && <SlideFooter variant={footer} />}
    </section>
  )
}

function SlideFooter({ variant }: { variant: 'dark' | 'yellow' }) {
  return (
    <SlideMetaContext.Consumer>
      {({ index, total }) => {
        const page = pad(index + 1)
        if (variant === 'yellow') {
          return (
            <footer className="absolute inset-x-0 bottom-0 z-20 flex h-[54px] items-center justify-between bg-ch-yellow px-[64px] text-ch-bg">
              <div className="flex items-center gap-4 font-mono text-[12px] font-medium tracking-[0.16em]">
                <span className="text-[13.5px] font-semibold">{page}</span>
                <span className="opacity-40">/ {pad(total)}</span>
                <span className="ml-2 opacity-60">© 2026 CLICKHOUSE INC.</span>
              </div>
              <ClickHouseFooterLogo dark />
            </footer>
          )
        }
        return (
          <footer className="absolute inset-x-0 bottom-0 z-20 flex h-[54px] items-center justify-between px-[64px]">
            <div className="flex items-center gap-4 font-mono text-[12px] tracking-[0.16em]">
              <span className="text-[12.5px] font-medium text-white/85">
                {page}
              </span>
              <span className="text-white/30">© 2026 CLICKHOUSE INC.</span>
            </div>
            <ClickHouseFooterLogo />
          </footer>
        )
      }}
    </SlideMetaContext.Consumer>
  )
}

function ClickHouseFooterLogo({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex select-none items-center gap-[0.5em] text-[16.5px] font-medium tracking-[-0.035em]',
        dark ? 'text-ch-bg' : 'text-white/65',
      )}
      role="img"
      aria-label="ClickHouse"
    >
      <svg
        viewBox="0 0 22 24"
        className="h-[1.1em] w-auto"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect x="0" y="1.5" width="2.8" height="21" rx="1.1" />
        <rect x="4.5" y="1.5" width="2.8" height="21" rx="1.1" />
        <rect x="9" y="1.5" width="2.8" height="21" rx="1.1" />
        <rect x="13.5" y="1.5" width="2.8" height="21" rx="1.1" />
        <rect x="18" y="8.5" width="2.8" height="7" rx="1.1" />
      </svg>
      <span>ClickHouse</span>
    </span>
  )
}
