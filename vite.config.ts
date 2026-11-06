import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, readdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

/**
 * GitHub Pages serves project sites from /<repo>/. Set BASE_PATH to override
 * (the deploy workflow derives it from the repository name).
 */
const buildBase = process.env.BASE_PATH || '/presentations/'

/** A presentation is any folder containing both presentation.ts and index.html. */
const deckEntries = Object.fromEntries(
  readdirSync(rootDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        existsSync(resolve(rootDir, entry.name, 'presentation.ts')) &&
        existsSync(resolve(rootDir, entry.name, 'index.html')),
    )
    .map((entry) => [entry.name, resolve(rootDir, entry.name, 'index.html')]),
)

export default defineConfig(({ command, isPreview }) => ({
  // Local dev stays at localhost:3000/, builds + previews use the repo subpath.
  base: command === 'build' || isPreview ? buildBase : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': rootDir,
    },
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        gallery: resolve(rootDir, 'index.html'),
        ...deckEntries,
      },
    },
  },
}))
