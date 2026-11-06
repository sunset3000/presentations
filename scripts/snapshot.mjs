/**
 * Regenerates gallery cover snapshots with headless Chrome (CDP).
 *
 * Usage: npm run snapshot
 * Chrome: set CHROME_PATH if it is not in a standard location.
 */
import { spawn } from 'node:child_process'
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const WIDTH = 1600
const HEIGHT = 900

const root = fileURLToPath(new URL('..', import.meta.url))

/** Every folder with a presentation.ts is a deck; snapshots go beside it. */
const discovered = readdirSync(root, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      existsSync(join(root, entry.name, 'presentation.ts')),
  )
  .map((entry) => ({
    slug: entry.name,
    output: `${entry.name}/snapshot.png`,
  }))

const requested = process.argv.slice(2)
const targets = requested.length
  ? discovered.filter((target) => requested.includes(target.slug))
  : discovered

if (!targets.length) {
  console.error(
    requested.length
      ? `No matching presentation: ${requested.join(', ')}`
      : 'No presentation folders found.',
  )
  process.exit(1)
}

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const chrome = CHROME_CANDIDATES.find((candidate) => existsSync(candidate))

if (!chrome) {
  console.error(
    'No Chrome/Chromium found. Set CHROME_PATH to a Chrome binary and retry.',
  )
  process.exit(1)
}

const server = await createServer({
  root,
  logLevel: 'error',
  server: { port: 5199, strictPort: false },
})

await server.listen()

const baseUrl = server.resolvedUrls?.local[0]
if (!baseUrl) {
  await server.close()
  throw new Error('Vite dev server did not expose a local URL.')
}

try {
  for (const target of targets) {
    const output = join(root, target.output)
    const url = new URL(`${target.slug}/?snapshot=1`, baseUrl).toString()

    console.log(`→ ${target.slug}  ${url}`)
    await capture(url, output)

    if (!existsSync(output)) {
      throw new Error(`Chrome did not write ${target.output}`)
    }

    console.log(`✓ ${target.output}`)
  }
} finally {
  await server.close()
}

async function capture(url, output) {
  const profile = mkdtempSync(join(tmpdir(), 'deck-snapshot-'))
  const browser = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--disable-extensions',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  )

  try {
    const browserWsUrl = await waitForDevtools(browser)
    const { host } = new URL(browserWsUrl)
    const list = await fetch(`http://${host}/json/list`).then((res) =>
      res.json(),
    )
    const page = list.find((entry) => entry.type === 'page')
    if (!page) throw new Error('Chrome exposed no page target.')

    const socket = new WebSocket(page.webSocketDebuggerUrl)
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true })
      socket.addEventListener('error', reject, { once: true })
    })

    let nextId = 1
    const pending = new Map()
    const eventWaiters = new Map()

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data)

      if (message.id) {
        const waiter = pending.get(message.id)
        if (!waiter) return
        pending.delete(message.id)
        if (message.error) waiter.reject(new Error(message.error.message))
        else waiter.resolve(message.result)
        return
      }

      const waiters = eventWaiters.get(message.method)
      if (!waiters?.length) return
      eventWaiters.delete(message.method)
      waiters.forEach((resolve) => resolve(message.params))
    })

    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = nextId++
        pending.set(id, { resolve, reject })
        socket.send(JSON.stringify({ id, method, params }))
      })

    const waitForEvent = (method, timeout = 20_000) =>
      new Promise((resolve, reject) => {
        const waiters = eventWaiters.get(method) ?? []
        waiters.push(resolve)
        eventWaiters.set(method, waiters)
        setTimeout(() => {
          const current = eventWaiters.get(method)
          if (!current) return
          eventWaiters.set(
            method,
            current.filter((waiter) => waiter !== resolve),
          )
          reject(new Error(`Timed out waiting for ${method}`))
        }, timeout)
      })

    try {
      await send('Page.enable')
      await send('Runtime.enable')
      await send('Emulation.setDeviceMetricsOverride', {
        width: WIDTH,
        height: HEIGHT,
        deviceScaleFactor: 1,
        mobile: false,
      })

      const loaded = waitForEvent('Page.loadEventFired')
      await send('Page.navigate', { url })
      await loaded

      // Wait for web fonts and the cover entrance animation to settle.
      await send('Runtime.evaluate', {
        expression: `(async () => {
          await document.fonts.ready
          await new Promise((resolve) => setTimeout(resolve, 1800))
          return true
        })()`,
        awaitPromise: true,
        returnByValue: true,
      })

      const { data } = await send('Page.captureScreenshot', {
        format: 'png',
        fromSurface: true,
        captureBeyondViewport: false,
      })

      writeFileSync(output, Buffer.from(data, 'base64'))
    } finally {
      socket.close()
    }
  } finally {
    browser.kill('SIGTERM')
    await new Promise((resolve) => {
      if (browser.exitCode !== null) return resolve()
      const timer = setTimeout(resolve, 3000)
      browser.once('exit', () => {
        clearTimeout(timer)
        resolve()
      })
    })
    rmSync(profile, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100,
    })
  }
}

function waitForDevtools(browser) {
  return new Promise((resolve, reject) => {
    let buffer = ''
    let settled = false

    const finish = (error, value) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      browser.stdout.off('data', onData)
      browser.stderr.off('data', onData)
      browser.off('exit', onExit)
      if (error) reject(error)
      else resolve(value)
    }

    const onData = (chunk) => {
      buffer += chunk.toString()
      const match = buffer.match(/DevTools listening on (ws:\/\/\S+)/)
      if (match) finish(null, match[1])
    }

    const onExit = (code) => {
      finish(new Error(`Chrome exited before DevTools was ready (${code}).`))
    }

    const timer = setTimeout(
      () => finish(new Error('Timed out waiting for Chrome DevTools.')),
      20_000,
    )

    browser.stdout.on('data', onData)
    browser.stderr.on('data', onData)
    browser.on('exit', onExit)
  })
}
