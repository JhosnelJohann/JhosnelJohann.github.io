// Auditoría visual: la misma que hace Jhosnel en sus landings — 320 / 390 / 1280.
import { chromium } from 'playwright'
import { createServer } from 'vite'

const ANCHOS = [
  { n: '320', w: 320 },
  { n: '390', w: 390 },
  { n: '1280', w: 1280 },
]
const SECCIONES = ['inicio', 'evidencia', 'trayectoria', 'proyectos', 'stack', 'diseno', 'contacto']

const servidor = await createServer({ server: { port: 5199 }, logLevel: 'error' })
await servidor.listen()
const base = 'http://localhost:5199/'
const navegador = await chromium.launch()
const problemas = []

/** Recorre la página entera para que se disparen todos los revelados. */
async function recorrer(pag) {
  await pag.evaluate(async () => {
    const alto = document.body.scrollHeight
    for (let y = 0; y < alto; y += 400) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 34))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 300))
  })
  await pag.waitForTimeout(700)
}

for (const a of ANCHOS) {
  for (const tema of ['dark', 'light']) {
    if (a.n !== '1280' && tema === 'light') continue
    const ctx = await navegador.newContext({
      viewport: { width: a.w, height: 900 },
      colorScheme: tema,
      deviceScaleFactor: 1,
    })
    const pag = await ctx.newPage()
    const errores = []
    pag.on('pageerror', (e) => errores.push(String(e)))
    pag.on('console', (m) => m.type() === 'error' && errores.push(m.text()))

    await pag.goto(base, { waitUntil: 'networkidle' })
    await recorrer(pag)

    const d = await pag.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      cliente: document.documentElement.clientWidth,
      alto: document.body.scrollHeight,
      ocultos: [...document.querySelectorAll('.revela')].filter(
        (e) => getComputedStyle(e).opacity === '0',
      ).length,
    }))
    if (d.scroll > d.cliente + 1) problemas.push(`${a.n}/${tema}: desborde ${d.scroll} > ${d.cliente}`)
    if (d.ocultos) problemas.push(`${a.n}/${tema}: ${d.ocultos} elementos siguen invisibles`)

    const foto = await pag.evaluate(() => {
      const i = document.querySelector('.retrato img')
      return i ? i.naturalWidth > 0 : false
    })
    if (!foto) problemas.push(`${a.n}/${tema}: la FOTO no carga`)

    const hojas = await pag.evaluate(() =>
      [...document.querySelectorAll('.hoja-img img')].filter((i) => !i.naturalWidth).length,
    )
    if (hojas) problemas.push(`${a.n}/${tema}: ${hojas} hojas de diseño no cargan`)

    if (errores.length) problemas.push(`${a.n}/${tema}: ${errores.join(' | ')}`)

    // Una captura por sección, para poder juzgarlas
    if (tema === 'dark' || a.n === '1280') {
      for (const s of SECCIONES) {
        const el = pag.locator(`#${s}`)
        await el.scrollIntoViewIfNeeded()
        await pag.waitForTimeout(450)
        await pag.screenshot({ path: `_revision/${a.n}-${tema}-${s}.png` })
      }
    }

    if (a.n === '1280' && tema === 'dark') {
      await pag.locator('#proyectos .tarjeta-btn').first().click()
      await pag.waitForTimeout(800)
      await pag.screenshot({ path: '_revision/ficha.png' })
      await pag.keyboard.press('Escape')
      await pag.waitForTimeout(500)
      await pag.locator('#diseno .hoja-btn').first().click()
      await pag.waitForTimeout(800)
      await pag.screenshot({ path: '_revision/visor.png' })
    }

    await ctx.close()
    console.log(`  ${a.n}px / ${tema}  ·  alto ${d.alto}px  ·  ok`)
  }
}

await navegador.close()
await servidor.close()
console.log('\n' + (problemas.length ? 'PROBLEMAS:\n- ' + problemas.join('\n- ') : 'Sin problemas.'))
process.exit(problemas.length ? 1 : 0)
