---
name: md-to-presentation
description: Build a new React + Vite HTML presentation deck in this repo from a Markdown outline and a Markdown presentation style guide. Use when asked to turn an outline.md/style.md pair into slides, scaffold a new deck folder, or add a presentation to the gallery.
---

# Markdown → Presentation

Turn an outline (content) plus a style guide (visual system) into a complete deck
that follows this repo's multi-deck conventions. The output is a new top-level
folder that the gallery, build, and snapshot script discover automatically.

## Inputs

Resolve these before writing code:

| Input | Role |
|---|---|
| `<outline>.md` | **Content source of truth** — sections, order, titles, facts, speaker notes, backup slides. Usually `<deck>/outline.md`. |
| `<style>.md` | **Visual source of truth** — tokens, type scale, layout archetypes, diagram/chart/motion/copy rules. Usually `<deck>/style.md`. |
| `<raw_info>.md` | Optional raw material when the outline references facts not spelled out. Usually `<deck>/raw_info.md`. |
| `pancake_party/` | Reference implementation. Read `src/index.css`, `src/components/`, and 2–3 slides before coding. Never copy its content. |

If the outline or style file is missing, ask for its path. Do not invent a style
system when a style file was promised.

Also read `CLAUDE.md` first — it is the authoritative repo map.

---

## Output layout

```text
<slug>/
├── index.html                 # deck entry → /<slug>/
├── presentation.ts            # gallery metadata, imports snapshot.png
├── snapshot.png               # placeholder first, regenerated later
├── outline.md                 # optional, keep source docs here
├── style.md
└── src/
    ├── main.tsx
    ├── App.tsx                # ordered SlideDefinition[]
    └── slides/
        ├── 01-Cover.tsx
        ├── 02-....tsx
        └── ...
```

`<slug>` is the folder name and URL segment: lowercase snake_case, e.g. `q4_review`.

---

## Step 1 — Read and produce a slide plan

Read the outline top to bottom and extract:

- Deck `title`, `subtitle`, `description`, `date` (YYYY.MM), and 3–4 `tags`.
- Every `##`/`#` section that becomes a slide, in order.
- Explicit merge/cut instructions (e.g. “原第 3 页并入本页”) — honor them.
- Backup/Q&A sections — these go last in the deck, prefixed `BACKUP`.
- Per-slide facts, metrics, and quotes. The outline is the only source of copy.

Then build an explicit plan table before writing components:

| # | Outline section | Slide file | Archetype from style.md | Key visual / data |
|---|---|---|---|---|
| 01 | Cover | `01-Cover.tsx` | full-bleed cover | title + brand mark + band |
| 02 | … | `02-….tsx` | two-column content | … |

Rules:

- One outline section → one slide, unless the outline says to merge.
- Choose **one archetype per slide** from the style file. If none fits, compose
  from the shared primitives — do not invent a new visual language.
- Number slide files in final deck order, `NN-PascalCase.tsx`.
- Backup slides are appended after the closing slide in `App.tsx`, even if their
  source numbering would place them earlier.

## Step 2 — Scaffold the folder

Copy the structural pattern from `pancake_party/` and replace names.

**`<slug>/index.html`**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#151515" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="description" content="<deck description>" />
    <title><deck title></title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/<slug>/src/main.tsx"></script>
  </body>
</html>
```

**`<slug>/src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/<slug>/src/App'
import '@/src/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**`<slug>/src/App.tsx`**

```tsx
import { Presentation, type SlideDefinition } from '@/src/components/Presentation'
import Cover from '@/<slug>/src/slides/01-Cover'
import Closing from '@/<slug>/src/slides/02-Closing'

const slides: SlideDefinition[] = [
  { component: Cover, title: '封面 · …' },
  { component: Closing, title: 'Q&A' },
]

export default function App() {
  const snapshot = new URLSearchParams(window.location.search).has('snapshot')
  return <Presentation slides={slides} chrome={!snapshot} />
}
```

**`<slug>/presentation.ts`**

```ts
import snapshot from '@/<slug>/snapshot.png'
import type { PresentationMeta } from '@/src/lib/presentation'

const deck: PresentationMeta = {
  slug: '<slug>',
  title: '…',
  subtitle: '…',
  description: 'One sentence shown on the gallery card.',
  date: '2026.11',
  slideCount: 12, // must equal slides.length in App.tsx
  tags: ['…', '…', '…'],
  thumbnail: snapshot,
  thumbnailAlt: '… cover',
}

export default deck
```

**Placeholder cover** — required because `presentation.ts` imports it at build time:

```bash
cp pancake_party/snapshot.png <slug>/snapshot.png
```

**Tailwind scanning** — add the new folder to `src/index.css` or classes will be
missing from the generated CSS:

```css
@source "../src";
@source "../pancake_party";
@source "../<slug>";
```

## Step 3 — Build the slides

For each planned slide, create one self-contained component.

- Content slides: use `SlideLayout` (eyebrow → title → subtitle → body → shared
  footer). Custom full-bleed `section.slide-canvas` only for cover, brand
  statement, or closing.
- Reuse shared primitives from `src/components/ui.tsx` (`Panel`, `Pill`, `Stat`,
  `IconBox`, `Dot`, `MonoLabel`, `Hairline`) and `src/components/CodeBlock.tsx`.
- Use the visual rules from `<style>.md` exactly: tokens, type scale, spacing,
  accent budget, diagram conventions, chart styling, motion, copy voice.
- Put data arrays at the top of the file and local helper components at the
  bottom. Promote a helper to `src/components/` only after a second deck needs it.
- Build diagrams in code (Tailwind flex/grid + inline SVG), not as images.
- Add one-line bottom takeaways where the style calls for them; use the yellow
  `Dot` marker.
- Stagger entrance animations with `anim-rise` / `anim-fade` / `anim-scale` and
  inline `style={{ '--delay': '120ms' } as CSSProperties}`.
- Never hardcode page numbers in content slides — `SlideLayout` derives them from
  `useSlideMeta()`. Custom slides must use `useSlideMeta()` if they show a footer.

Register every slide in `App.tsx` in the same order as the plan. The array order
is the deck order.

## Step 4 — Metadata and gallery

- Keep `presentation.ts` `slideCount` in sync with the final `slides` array.
- Use `date` format `YYYY.MM`; the gallery sorts descending by it.
- No registry edit is needed: gallery, Vite multi-page build, and snapshot script
  all discover any folder containing both `presentation.ts` and `index.html`.
- The deck is served at `/<slug>/` in dev and `/<base>/<slug>/` in production.

## Step 5 — Verify

Run, in order:

```bash
npm run lint
npm run dev                 # open http://localhost:3000/<slug>/
npm run snapshot -- <slug>  # replaces the placeholder cover
npm run build               # confirms the deck is picked up as a page
```

Manual checks:

- Navigate every slide with `→` / `Space`; check `O` overview and `F` fullscreen.
- No overflow, clipping, or scrollbars inside the 1600×900 canvas.
- Chinese text renders with the intended font stack; no missing glyphs.
- Gallery at `/` shows the new card with the generated snapshot and correct date.
- Refresh on `#s7` restores that slide.

## Definition of done

- [ ] Every outline section is represented, in order; merges and cuts honored.
- [ ] `slideCount` equals the number of entries in `App.tsx`.
- [ ] Backup slides are last and labelled `BACKUP`.
- [ ] New folder is added via `@source` in `src/index.css`.
- [ ] No content copied from `pancake_party`; only structure and style reused.
- [ ] `npm run lint`, `npm run snapshot -- <slug>`, and `npm run build` pass.
- [ ] `snapshot.png` is regenerated from the real cover, not the placeholder.

## Pitfalls

- **Discovery requires both files.** A folder with only `presentation.ts` or only
  `index.html` is silently ignored by the gallery and build.
- **Missing `@source`** produces a deck that looks unstyled in production while
  working in dev.
- **`snapshot.png` import fails the build** if the placeholder is absent.
- **`slideCount` is manual** and easily drifts; update it whenever the array changes.
- **The overview renders every slide at once** — give SVG `defs`/gradient IDs unique
  names, and avoid global side effects in slide components.
- **The canvas is fixed 1600×900.** Do not add responsive breakpoints inside a slide;
  use the scaled canvas and size text/spacing in fixed px.
- **Don't edit shared framework components** for one deck. Add deck-local helpers
  first; share only when a second deck needs the same thing.
