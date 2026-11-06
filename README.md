# Presentations

A growing collection of 16:9 presentation decks built with React + Vite and
deployed as static pages on GitHub Pages.

**Live**

- Gallery — <https://sunset3000.github.io/presentations/>
- 煎饼派对出海 — <https://sunset3000.github.io/presentations/pancake_party/>

## Structure

```text
.
├── index.html                  # gallery entry (site root)
├── src/
│   ├── gallery/                # gallery page + automatic deck discovery
│   ├── components/             # shared presentation framework
│   ├── lib/                    # shared helpers / presentation types
│   └── index.css               # brand tokens, fonts, animation utilities
├── pancake_party/              # one folder per presentation
│   ├── index.html              # deck entry → /<deck>/
│   ├── presentation.ts         # gallery metadata + cover import
│   ├── snapshot.png            # generated 1600×900 cover
│   └── src/
│       ├── main.tsx
│       ├── App.tsx             # ordered slide registry
│       └── slides/             # one component per slide
├── scripts/snapshot.mjs        # headless-Chrome cover snapshots
├── vite.config.ts              # multi-page build + GitHub Pages base path
└── .github/workflows/deploy.yml
```

Every folder containing a `presentation.ts` **and** an `index.html` is treated
as a deck. The gallery and the build discover decks automatically, so adding a
presentation does not require registering it anywhere.

## Commands

```bash
npm install
npm run dev        # gallery: http://localhost:3000/
                   # deck:    http://localhost:3000/pancake_party/
npm run build      # static build in dist/
npm run preview    # http://localhost:4173/presentations/ (production base)
npm run lint       # TypeScript check
npm run snapshot   # regenerate all cover snapshots with headless Chrome
npm run clean      # remove dist/
```

`npm run snapshot -- pancake_party` regenerates a single cover. The script looks
for Chrome/Chromium in the usual locations; set `CHROME_PATH` if needed.

## Adding a presentation

1. Create `<slug>/index.html` pointing to `<slug>/src/main.tsx` (copy the
   pancake_party entry as a starting point).
2. Build the deck: `<slug>/src/App.tsx`, `<slug>/src/slides/*.tsx`, reusing
   `Presentation`, `SlideLayout`, `ClickHouseLogo`, `CodeBlock` and the `ui`
   primitives from `src/`.
3. Add `<slug>/presentation.ts`:

   ```ts
   import snapshot from './snapshot.png'
   import type { PresentationMeta } from '@/src/lib/presentation'

   const deck: PresentationMeta = {
     slug: 'my_deck',
     title: 'Deck title',
     subtitle: 'One-line subtitle',
     description: 'Short summary shown on the gallery card.',
     date: '2026.12',
     slideCount: 12,
     tags: ['Tag A', 'Tag B'],
     thumbnail: snapshot,
     thumbnailAlt: 'Deck cover',
   }

   export default deck
   ```

4. Add a placeholder `snapshot.png`, then run `npm run snapshot -- my_deck` to
   capture the real cover from the first slide.
5. Commit. The gallery sorts decks by `date`, newest first.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which type-checks,
builds and publishes `dist/` to GitHub Pages.

One-time setup: in the repository, open **Settings → Pages → Build and
deployment** and set **Source** to **GitHub Actions**.

The deploy workflow derives the Vite `base` from the repository name
(`/<repo>/`). Builds default to `/presentations/`; override it with `BASE_PATH`:

```bash
BASE_PATH=/my-repo/ npm run build
```

For a custom domain served from the site root, build with `BASE_PATH=/`.

## Presenting

| Key | Action |
| --- | --- |
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `Home` / `End` | First / last slide |
| `O` | Slide overview |
| `F` | Fullscreen |
| `?` | Shortcut help |
| `Esc` | Close overlay |

The bottom control bar appears on pointer movement and auto-hides. The left and
right slide edges are also clickable.

## Design tokens

| Token | Value |
| --- | --- |
| Canvas | `#151515` |
| Accent | `#FBFF56` |
| Muted text | `#9B9B9B` / `#C8C8C8` |
| Font | Inter · Noto Sans SC · JetBrains Mono |

Slides are authored at a fixed 1600 × 900 canvas and scaled to the viewport, so
layout is identical on every screen.
