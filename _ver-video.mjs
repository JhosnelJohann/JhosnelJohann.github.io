import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
mkdirSync('_revision/video', { recursive: true })

const nav = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] })

for (const [n, opts] of [
  ['escritorio', { viewport: { width: 1440, height: 900 } }],
  ['movil', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
]) {
  const ctx = await nav.newContext({ ...opts, colorScheme: 'dark' })
  const p = await ctx.newPage()
  await p.goto('http://localhost:5188/', { waitUntil: 'networkidle' })
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30))
    }
  })
  await p.locator('.vids').scrollIntoViewIfNeeded()
  await p.waitForTimeout(1200)
  await p.locator('.vids').screenshot({ path: `_revision/video/${n}-seccion.png` })
  // Y la ficha de GHL, con su galería
  await p.locator('#trabajo').scrollIntoViewIfNeeded()
  await p.waitForTimeout(600)
  const ghl = p.locator('.tj').filter({ hasText: 'GoHighLevel' }).first()
  if (await ghl.count()) {
    await ghl.locator('.tj-btn').click()
    await p.waitForTimeout(1200)
    await p.locator('.fi').screenshot({ path: `_revision/video/${n}-ghl.png` })
  }
  await ctx.close()
  console.log('capturado', n)
}
await nav.close()
