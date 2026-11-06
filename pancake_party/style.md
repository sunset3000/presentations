# pancake_party — Style Guide

A dark, technical, ClickHouse-branded deck for a Chinese-speaking customer audience.
The look is closer to an engineering keynote than a sales brochure: near-black canvas,
one acid-yellow accent, dense structured diagrams, monospace metadata, and copy that
states hard numbers and honest trade-offs.

Source of truth: the 17 slides in `src/slides/`, `src/App.tsx`, and the shared
framework in `src/components/`.

---

## 1. Design thesis

- **Dark by default.** `#151515` canvas, no photography, no gradients as decoration.
- **One accent.** ClickHouse yellow `#fbff56` carries every emphasis. There is no
  second brand color; charts and diagrams are monochrome + yellow.
- **Structure over prose.** Each slide is a diagram, scorecard, flow, table, or
  metric grid. Text is labels and one-line takeaways, not paragraphs.
- **Small type, strong hierarchy.** Most metadata is 10–12px; hierarchy comes from
  opacity, mono-vs-sans, and spacing rather than large body text.
- **Chinese first, English as system language.** Chinese carries meaning; English
  in monospace uppercase carries category, system, and metadata.

---

## 2. Canvas, grid, and safe area

| Item | Value |
|---|---|
| Slide canvas | fixed **1600 × 900**, scaled to viewport by `Presentation` |
| Horizontal padding | `px-[80px]` (custom full-bleed slides also use 80px) |
| Header top padding | `pt-[46px]` |
| Body top spacing | `pt-7` (28px) |
| Bottom padding with footer | `pb-[64px]`; footer is 54px tall |
| Bottom padding without footer | `pb-12` |
| Content radius | panels `12px` (`rounded-xl`), cards `8px` (`rounded-lg`), chips `6px` (`rounded-md`) |
| Hairlines | `1px` white at 10–14% opacity |

Content slides use the two-column asymmetric split far more than 50/50:
`0.88fr_1.12fr`, `1.04fr_0.96fr`, `1.32fr_0.88fr`, `1.06fr_0.94fr`. Equal columns are
reserved for repeated cards (stat rows, customer cards, 2×3 scenario grids).

Vertical rhythm is tight: `gap-4`/`gap-5` between major regions, `gap-2`/`gap-3`
inside cards. Slides are dense on purpose — but each region has one job.

---

## 3. Color

Defined as Tailwind v4 tokens in `src/index.css`:

| Token | Hex | Use |
|---|---|---|
| `ch-bg` | `#151515` | slide canvas |
| `ch-panel` | `#1c1c1c` | raised chart tooltip / chip surfaces |
| `ch-panel-2` | `#242424` | secondary surface |
| `ch-line` | `#363636` | lines |
| `ch-yellow` | `#fbff56` | the only accent |
| `ch-yellow-soft` | `#e9ee4c` | secondary accent |
| `ch-muted` | `#9b9b9b` | muted text |
| `ch-soft` | `#c8c8c8` | subtitle text |

Text is white with a strict opacity ladder: **90 / 85 / 80 / 75 / 65 / 60 / 50 / 45 /
40 / 35 / 30 / 25 / 20%**. Titles and key figures use 85–100%; body copy sits at
35–50%; metadata at 20–35%.

Yellow usage follows three tiers:

1. **Tinted surfaces** — `border-ch-yellow/25–/60` + `bg-ch-yellow/[0.03–0.07]` for
   the one important card in a group, never every card.
2. **Yellow text/icons** — eyebrows, units, numbers, checkmarks, active nodes.
3. **Full yellow blocks** — reserved for brand moments and the single strongest
   statement on a slide: cover ground band, the split-black/yellow ClickHouse intro,
   the closing footer, the circuit-breaker card, the "100% results match" block.

Panels: default `border-white/10 bg-white/[0.035]`; `flat` = `bg-white/[0.02]`;
`accent` = `border-ch-yellow/55 bg-ch-yellow/[0.045]`.

Never introduce a second hue for charts or states. "Bad" is white/gray and
line-through; "good" is yellow.

---

## 4. Typography

Loaded in `src/index.css`:

- **Sans:** Inter → Noto Sans SC → PingFang SC → Microsoft YaHei
- **Mono:** JetBrains Mono for English labels, numbers, tags, page numbers, code

| Role | Spec |
|---|---|
| Eyebrow | `.eyebrow`: 12px mono, uppercase, `tracking-[0.28em]`, `#8e8e8e`, preceded by a 3×3px yellow square |
| Slide title | 40px bold, **`text-ch-yellow`**, `leading-[1.16]`, `tracking-[-0.012em]`, centered by default |
| Subtitle | 17px light, `text-ch-soft/80`, one line, centered |
| Section label | 10–12px mono, uppercase, `tracking-[0.20–0.24em]`, `text-white/30–35` |
| Card title | 17–21px semibold; panel headings 18–19px |
| Body / descriptions | 12–14.5px, `leading-[1.5–1.6]`, `text-white/35–50` |
| Micro copy / tags | 9–11.5px mono, uppercase, wide tracking |
| Hero metric | 46–64px semibold, `tracking-[-0.04em]`; unit in 18–20px yellow |
| Cover title | 86px bold; closing "谢谢" 96px bold |

Rules:

- Chinese sentences use full-width punctuation (`，。：——`). Latin terms keep their
  own form (`ClickHouse`, `Kafka`, `DAU / MAU`).
- Every content panel gets a mono uppercase English label
  (`CURRENT STACK`, `WRITE PROFILE`, `COST REALITY`) above its Chinese heading.
- Large decorative numbers (`01`, `02`) sit at 30px mono in `white/[0.08]` or as
  tiny 10–12px labels in yellow — never large enough to compete with content.
- No emoji. Iconography is `lucide-react`, stroke width 1.6–1.8.

---

## 5. Component vocabulary

Shared primitives in `src/components/ui.tsx`:

- **`Panel`** — bordered card; `accent` for the highlighted card, `flat` for
  secondary surfaces.
- **`IconBox`** — 32–46px rounded square; default is white/6 fill with a yellow icon,
  `solid` is yellow fill with dark icon.
- **`Pill`** — small rounded status chip; `yellow` for the key state, `default` for
  neutral, `dark` for nested chips.
- **`Stat`** — 62px figure + yellow unit + 14.5px label + 12.5px note, with staggered
  entrance animation. Used in 4-up rows divided by `border-l border-white/10`.
- **`Dot`** — 5×5px yellow square used as the bullet before every takeaway line.
- **`MonoLabel`**, **`Hairline`** — micro-label and divider.

Deck-local helpers are defined at the bottom of each slide file (`FlowNode`,
`ScenarioCard`, `Lane`, `LayerBox`, `FlowArrow`, `SourceBox`, `SystemBox`,
`ForkArrows`, `EcosystemNode`, `SpikeTooltip`). Promote to shared only after a second
deck needs them.

`CodeBlock` is used when SQL itself is the evidence: dark `#101010` panel, 42px
title bar with three gray dots, `ClickHouse SQL` tag, line numbers at white/20,
JetBrains Mono 12.8px. Syntax palette: keywords yellow, functions `#a9cdf0`,
numbers `#e8c98a`, strings `#b9d7a9`, comments `#6e6e6e` italic.

---

## 6. Slide archetypes

1. **Cover / closing (custom full-bleed)** — not `SlideLayout`. Cover: left-aligned
   86px title, technical tick marks, 300px yellow ClickHouse stamp, SVG yellow
   ground band, date block. Closing: 96px "谢谢", 4 pillar cards, yellow footer band.
2. **Standard content slide** — `SlideLayout` header (eyebrow → yellow title →
   subtitle) + asymmetric two-column body + optional 42–46px takeaway strip pinned
   to the bottom.
3. **Stat row** — 4 `Stat`s with vertical dividers, then a 2-column detail grid
   (data profile).
4. **Card grid** — 2×2 or 2×3; exactly one card may be yellow-filled or
   yellow-bordered as the critical item (ops risks, migration steps).
5. **Flow / architecture diagram** — numbered horizontal lanes (`01`–`04`),
   boxes → arrows → engine → apps, every arrow carries a short Chinese verb
   (`接入`, `入湖`, `服务`), final takeaway strip restates the thesis.
6. **Process** — chevron-clipped 5-up row (objectives) or vertical numbered rail
   with connecting line (five steps, validation stages).
7. **Scorecard** — rows with name, monospace score, and thin animated progress bar.
8. **Comparison table** — backup only; 4 columns, first column category, the
   ClickHouse Enterprise column tinted and its header filled yellow.
9. **Split brand statement** — 50/50 black/yellow canvas with a text-fill gradient
   headline that switches color exactly at the split (ClickHouse intro).

Every content slide ends with a **one-line takeaway**, either as a bottom strip
(`border-white/10` or `border-ch-yellow/25`) or a centered line with a yellow `Dot`.

---

## 7. Diagrams and data visualization

- **Draw diagrams in code**, not with image assets: Tailwind flex/grid for nodes,
  inline SVG for routes and connectors. The only raster asset is the gallery snapshot.
- Arrows are lucide `ArrowRight` / `ArrowDown` at 12–18px in `white/20–25` or
  `ch-yellow/45`. Dashed borders mean batch/async paths.
- Numbered lanes and layer boxes (`DWD`, `DWS`, `ADS`) use mono codes and a tiny
  yellow square. A yellow-bordered box marks the ClickHouse core.
- Watermark icons (e.g. 210px globe at 5% opacity) and wireframe globes add depth
  without images.
- Charts use **recharts**, single yellow series, 2px stroke, gradient fill from
  `rgba(251,255,86,0.2)` to `0.012`, horizontal-only grid `#2b2b2b`, Y axis hidden,
  X ticks JetBrains Mono 10px `#8a8a8a`, custom dark tooltip. Annotate the key point
  with `ReferenceLine` / `ReferenceDot` and short pills (`峰值 10–20×`,
  `平稳期可缩容`). No legends.
- Relative bar comparisons are plain `div`s, not charts (e.g. JOIN 1× vs Non-Join
  `<10%` with a 9%-width yellow bar).

---

## 8. Motion

Entrance-only, staggered, fast, and subtle:

| Utility | Effect |
|---|---|
| `anim-rise` | 0.7s, translateY(18px) + fade, `cubic-bezier(0.22, 1, 0.36, 1)` |
| `anim-fade` | 0.6s opacity |
| `anim-scale` | 0.65s scale(0.96) + fade |
| `anim-grow-x` | 1.1s scaleX(0→1), origin left — for score bars |

Stagger via inline `style={{ '--delay': '120ms' }}` (typed as `CSSProperties`).
Typical sequence: eyebrow 40ms → title 90ms → subtitle 150ms → body 180–260ms →
cards in 50–80ms increments. Keep the last body element under ~550ms.

Continuous motion is only for data flow: `route-flow` dashed stroke and
`<animateMotion>` dots on SVG routes. Slide transitions use `motion/react` at 0.34s,
±44px horizontal. `prefers-reduced-motion` disables route animation.

---

## 9. Copy and narrative

**Headlines are claims with numbers**, not topics:

- `20TB/天、亿级事件、200+ 维度、高基数`
- `峰值 10–20 倍爆发，决策要求秒级响应`
- `Non-Join 比 Join 快 10–100 倍`
- `从「能跑」到「可信、可扩、可控成本」`

**Subtitles explain the consequence** in one line:
`这不是普通报表负载——它直接定义架构选型`.

**Takeaways are quotable and blunt**: `双跑不是可选项——它是「结果一致」的唯一证据。`
`80–85% 的诚实评分，比 100% 的口号更可信。`

Voice:

- Concrete numbers over adjectives. Every claim gets a figure, ratio, or unit.
- State trade-offs openly: the cost-reality panel shows the extra spend, the
  scorecard keeps an 80–85% score, and both are framed as credibility.
- Short noun phrases inside cards (`流失节点识别`, `无数据再平衡`), never bullets of prose.
- Use `——` and `：` to land the point; bold/yellow `<span>` highlights the key phrase
  inside a sentence.
- English appears only as system metadata in mono uppercase, not as body copy.
- Pain → objective → solution → proof → value is the narrative arc; backup slides
  (`BACKUP 1 · 竞争对比`) sit at the end and are explicitly not part of the main talk.

Slide eyebrows number the **narrative sections** (01–14), not the page numbers.
`06` is the full-bleed ClickHouse intro (no eyebrow); page numbers come from
`useSlideMeta` via `SlideLayout`'s footer.

---

## 10. Chrome and deck-specific identity

- Footer (dark): page `01`, `© 2026 CLICKHOUSE INC.`, ClickHouse wordmark right.
  Yellow variant (closing): dark text on yellow, page `/ total`, wordmark dark.
- Page numbering: mono, 2-digit `pad()`, total included in the cover and closing.
- `.slide-decor` adds two very faint yellow radial glows (top center, bottom right)
  to every slide — visible as atmosphere, not as a gradient.
- Cover specifics: vertical mono caption `REAL-TIME ANALYTICS · GAMING · GLOBAL`,
  right-side tick marks, 332px outlined square, yellow ground band, `2026.11` block.
- `snapshot.png` capture hides all chrome via `?snapshot=1` (`chrome={false}`).

---

## 11. Implementation conventions

- One slide per file: `src/slides/NN-Name.tsx`, default export, data arrays at top,
  local helper components at the bottom.
- Order is defined only by the `slides` array in `src/App.tsx`. Backup slides go last.
- Use `SlideLayout` for content slides and raw `<section className="slide-canvas">`
  only for cover / brand / closing moments.
- Tailwind utilities inline; conditionals via `cn()`. Theme tokens for surfaces and
  text; raw hex only inside SVG and recharts props.
- Import alias `@/` points at repo root.
- Accessibility: `aria-hidden` on decorative SVG, `role="img"` + `aria-label` on
  wordmarks, `sr-only` live region comes from `Presentation`.
- Cache the URL hash (`#s7`) and keyboard map (←/→/Space, `O`, `F`, `?`) come free
  from the framework.

---

## 12. New-slide checklist

- [ ] Eyebrow: next narrative section number + short Chinese label, mono uppercase.
- [ ] Title: a number-bearing claim in yellow, ≤ 1 line at 40px.
- [ ] Subtitle: one line explaining the "so what".
- [ ] Body: at least one diagram / metric / table — no bullet walls.
- [ ] Accent budget: at most one yellow-filled block and a few yellow text accents.
- [ ] Mono English label on each major panel.
- [ ] Bottom takeaway line with a yellow `Dot`.
- [ ] Entrance delays staggered, last element < ~550ms.
- [ ] Text sizes ≥ 9px and body copy ≤ 1 short sentence per concept.
- [ ] Footer page auto-renders via `SlideLayout`; no manual page numbers on content slides.
