# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at http://localhost:3000 (gallery; deck at /pancake_party/)
npm run build     # Production multi-page build in dist/
npm run lint      # Type-check (tsc --noEmit)
npm run preview   # Preview build at http://localhost:4173/presentations/
npm run snapshot  # Regenerate deck cover snapshots with headless Chrome
npm run clean     # Remove dist/
```

`BASE_PATH` overrides the build path (default `/presentations/`). The GitHub Actions workflow sets it from the repository name.

## Architecture

This is a multi-deck presentation site built with React/TypeScript and Vite, deployed to GitHub Pages. The root page is a gallery; each presentation lives in its own top-level folder and is served under `/<deck>/` (production: `/presentations/<deck>/`).

**Deck discovery is by convention.** Any top-level folder containing both `presentation.ts` and `index.html` is a deck. Three places discover decks automatically from that convention:

- `src/gallery/presentations.ts` — `import.meta.glob('/*/presentation.ts')` feeds the gallery, sorted newest first by `date`.
- `vite.config.ts` — scans folders for `presentation.ts` + `index.html` and adds each `index.html` as a Rollup input for the multi-page build.
- `scripts/snapshot.mjs` — scans the same convention and screenshots each deck's first slide into `<deck>/snapshot.png`.

Each deck folder has:

- `index.html` — presentation entry for `/pancake_party/`.
- `presentation.ts` — default-exports `PresentationMeta` (imported by the gallery; imports its own `snapshot.png`).
- `snapshot.png` — generated 1600×900 gallery cover, captured from the deck with `?snapshot=1` (hides presentation chrome).
- `src/main.tsx` — React entry.
- `src/App.tsx` — ordered `SlideDefinition[]` (`{ component, title }`).
- `src/slides/*.tsx` — one self-contained slide component per file.

**Shared framework (root `src/`):**

- `src/components/Presentation.tsx` — two exports:
  - `Presentation`: fixed 1600×900 canvas scaled to the viewport, keyboard/hash navigation, slide overview (`O`), fullscreen (`F`), progress bar and animated transitions via `motion/react`. Pass `chrome={false}` to hide presentation chrome (used for snapshots).
  - `SlideLayout`: reusable layout wrapper with optional eyebrow/title/subtitle, ClickHouse footer chrome (page number, copyright, wordmark) and a flex-1 content area.
- `src/components/ClickHouseLogo.tsx` — wordmark, mark and yellow stamp.
- `src/components/CodeBlock.tsx` — SQL panel with lightweight token highlighting.
- `src/components/ui.tsx` — shared Panel / Pill / Stat / IconBox primitives.
- `src/gallery/Gallery.tsx` — the gallery: ambient background, deck stats and one card per discovered deck.
- `src/lib/presentation.ts` — `PresentationMeta` type and `presentationHref(slug)` helper.
- `src/index.css` — Tailwind v4 entry, brand tokens, fonts, animations. It explicitly `@source`s `src/` and `pancake_party/`; add a new source path when creating a presentation folder outside those locations.

## Adding a slide

Create a new file in `<deck>/src/slides/`, then import it and add `{ component, title }` to the `slides` array in that deck's `src/App.tsx`. The order of the array determines slide order.

## Adding a presentation

1. Create `<deck>/` with `index.html`, `src/main.tsx`, `src/App.tsx` and `src/slides/`.
2. Add `<deck>/presentation.ts` default-exporting a `PresentationMeta` (see README for the shape), importing its own `snapshot.png`.
3. Add a placeholder `snapshot.png`, then run `npm run snapshot -- <deck>` to capture the cover.
4. No registry edits needed — gallery, build and snapshot script discover the folder automatically.
5. If the new deck folder needs Tailwind scanning outside `src/` and `pancake_party/`, add an `@source` line in `src/index.css`.

## Presentation Design Principles

**Minimize text. Maximize visuals.** Slides should communicate through diagrams, metrics, data, and infographics — not paragraphs. Concrete rules:

- Prefer a metric callout (big number + label) over a sentence describing that metric.
- Prefer a flow diagram or pipeline visualization over a bulleted list of steps.
- Prefer a comparison chart or table over prose describing differences.
- If you find yourself writing more than one short sentence per concept, look for a visual alternative.
- Use icons, color coding, and spatial layout to convey relationships instead of words.

**Available visualization libraries:**
- `recharts` — already installed; use for bar, line, pie, radial charts.
- `@antvis/infographic` (https://github.com/antvis/infographic) — for rich infographic layouts (not yet installed; `npm install @antvis/infographic` before use).
- `lucide-react` — icons already installed.
- `motion/react` — animation already installed; use entrance animations to reveal data progressively.

## Styling

Tailwind CSS v4 (via `@tailwindcss/vite` plugin). No config file — use utility classes directly. The `@` alias resolves to the repo root.
