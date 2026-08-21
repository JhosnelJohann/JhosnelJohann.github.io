import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
mkdirSync('_revision/diseno', { recursive: true })

const nav = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] })

for (const [n, opts] of [
  ['escritorio', { viewport: { width: 1440, height: 900 } }],
  ['movil', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
]) {
  const ctx = await nav.newContext({ ...opts, colorScheme: 'dark' })
  const p = await ctx.newPage()
  await p.goto('http://localhost:5188/', { waitUntil: 'networkidle' })
  await p.waitForFunction(() => !!document.querySelector('#raiz > *'))
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 26))
    }
    window.scrollTo(0, 0)
  })
  await p.waitForTimeout(1000)

  // La sección entera
  await p.locator('#diseno').scrollIntoViewIfNeeded()
  await p.waitForTimeout(1800)                       // que cuenten las cifras
  await p.locator('#diseno .cab-seccion').screenshot({ path: `_revision/diseno/${n}-cabecera.png` })
  await p.locator('.dcifras').screenshot({ path: `_revision/diseno/${n}-cifras.png` })

  /* `scrollIntoViewIfNeeded` deja el elemento donde caiga —a menudo al pie del
     viewport— y entonces solo queda sitio para una franja. Se lleva al borde
     superior a propósito, así el recorte coge la cabecera y lo que hay debajo. */
  for (const [clave, sel] of [['edicion', '.subp'], ['disenografico', '.hojas']]) {
    await p.evaluate((s) => {
      const el = document.querySelector(s)
      window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 88)
    }, sel)
    await p.waitForTimeout(1100)
    await p.screenshot({
      path: `_revision/diseno/${n}-${clave}.png`,
      clip: { x: 0, y: 76, width: opts.viewport.width, height: opts.viewport.height - 76 },
    })
  }

  // El menú, para ver el orden nuevo
  await p.evaluate(() => window.scrollTo(0, 900))
  await p.waitForTimeout(500)
  await p.screenshot({ path: `_revision/diseno/${n}-menu.png`, clip: { x: 0, y: 0, width: opts.viewport.width, height: 70 } })

  await ctx.close()
  console.log('capturado', n)
}
await nav.close()
