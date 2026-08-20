import { chromium } from 'playwright'
import { preview } from 'vite'

const srv = await preview({ preview: { port: 5194 } })
const nav = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] })
const p = await nav.newPage({ viewport: { width: 1280, height: 980 } })
await p.goto('http://localhost:5194/', { waitUntil: 'networkidle' })
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 26))
  }
})
await p.waitForTimeout(900)

for (const titulo of ['Cuestionario Medicare', 'ManhattanLife']) {
  const tarjeta = p.locator('#trabajo .tj', { hasText: titulo }).first()
  await tarjeta.scrollIntoViewIfNeeded()
  await tarjeta.locator('.tj-btn').click()
  await p.waitForTimeout(900)
  const slug = titulo.split(' ').pop().toLowerCase()
  await p.screenshot({ path: `_revision/ficha-${slug}.png` })
  // También el interior, desplazando el modal
  await p.locator('.fi').evaluate((el) => el.parentElement.scrollTo(0, 900))
  await p.waitForTimeout(700)
  await p.screenshot({ path: `_revision/ficha-${slug}-galeria.png` })
  await p.keyboard.press('Escape')
  await p.waitForTimeout(500)
  console.log(`  ${titulo}: ok`)
}

await nav.close()
await srv.close()
