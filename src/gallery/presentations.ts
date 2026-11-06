import type { PresentationMeta } from '@/src/lib/presentation'

/**
 * Every folder with a `presentation.ts` default export is a deck.
 * The gallery picks decks up automatically; newest first.
 */
const modules = import.meta.glob<PresentationMeta>('/*/presentation.ts', {
  eager: true,
  import: 'default',
})

export const presentations = Object.values(modules).sort((a, b) =>
  b.date.localeCompare(a.date),
)
