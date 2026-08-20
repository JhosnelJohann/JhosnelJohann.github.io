import { chromium } from 'playwright'

const CAND = [
  'https://juanmanueltuagente.com',
  'https://www.juanmanueltuagente.com',
  'https://planes.juanmanueltuagente.com',
  'https://staging.juanmanueltuagente.com',
]

const nav = await chromium.launch()
for (const url of CAND) {
  for (const intento of [1, 2]) {
    const ctx = await nav.newContext({ viewport: { width: 430, height: 900 } })
    const p = await ctx.newPage()
    try {
      const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 })
      await p.waitForTimeout(1800)
      const info = await p.evaluate(() => ({
        t: document.title,
        h1: document.querySelector('h1')?.innerText?.replace(/\s+/g, ' ').slice(0, 70),
        txt: document.body.innerText.replace(/\s+/g, ' ').slice(0, 90),
      }))
      console.log(`${String(r?.status()).padEnd(4)} ${url}  (intento ${intento})`)
      console.log(`     ${info.t}`)
      console.log(`     h1: ${info.h1 || '—'}`)
      console.log(`     ${info.txt}\n`)
      await ctx.close()
      break
    } catch (e) {
      console.log(`FALLA ${url} (intento ${intento}): ${String(e).split('\n')[0].slice(0, 80)}`)
      await ctx.close()
      if (intento === 2) console.log('')
    }
  }
}
await nav.close()
