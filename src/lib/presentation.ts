export interface PresentationMeta {
  /** Folder name under the site root, e.g. `pancake_party`. */
  slug: string
  title: string
  subtitle: string
  description: string
  /** Display date shown on the gallery card. */
  date: string
  slideCount: number
  tags: string[]
  /** Cover snapshot, imported by the presentation's own metadata file. */
  thumbnail: string
  thumbnailAlt: string
}

/** Resolve a presentation folder against the deploy base path. */
export function presentationHref(slug: string): string {
  const base = import.meta.env.BASE_URL
  return `${base.endsWith('/') ? base : `${base}/`}${slug}/`
}
