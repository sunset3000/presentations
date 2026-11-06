import { createContext, useContext } from 'react'

export interface SlideMeta {
  index: number
  total: number
}

export const SlideMetaContext = createContext<SlideMeta>({
  index: 0,
  total: 1,
})

export function useSlideMeta(): SlideMeta {
  return useContext(SlideMetaContext)
}
