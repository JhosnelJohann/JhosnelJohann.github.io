// Auditoría contra el sitio publicado, no contra el servidor local.
import { chromium } from 'playwright'

const WEB = 'https://jhosneljohann.github.io/'
const ANCHOS = [
  { n: '320', w: 320 },
  { n: '390', w: 390 },
  { n: '1280', w: 1280 },
]

const nav = await chromium.launch()
const fallos = []

for (const a of ANCHOS) {
  for (const tema of ['dark', 'light']) {
    if (a.n !== '1280' && tema === 'light') continue

    const ctx = await nav.newContext({
      viewport: { width: a.w, height: 900 },
      colorScheme: tema,
    })
    const p = await ctx.newPage()
    const errores = []
    const rotos = []
    p.on('pageerror', (e) => errores.push(String(e)))
    p.on('console', (m) => m.type() === 'error' && errores.push(m.text()))
    p.on('response', (r) => r.status() >= 400 && rotos.push(`${r.status()} ${r.url()}`))

    await p.goto(WEB, { waitUntil: 'networkidle', timeout: 60000 })
    await p.evaluate(async () => {
      const alto = document.body.scrollHeight
      for (let y = 0; y < alto; y += 400) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 32))
      }
      window.scrollTo(0, 0)
    })
    await p.waitForTimeout(1200)

    const d = await p.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      cliente: document.documentElement.clientWidth,
      alto: document.body.scrollHeight,
      ocultos: [...document.querySelectorAll('.revela')].filter(
        (e) => getComputedStyle(e).opacity === '0').length,
      foto: (() => { const i = document.querySelector('.retrato img'); return !!i && i.naturalWidth > 0 })(),
      hojas: [...document.querySelectorAll('.hoja-img img')].map((i) => i.naturalWidth > 0),
      proyectos: document.querySelectorAll('#proyectos .tarjeta').length,
      fondo: getComputedStyle(document.body).backgroundColor,
    }))

    if (d.scroll > d.cliente + 1) fallos.push(`${a.n}/${tema}: desborde ${d.scroll}>${d.cliente}`)
    if (d.ocultos) fallos.push(`${a.n}/${tema}: ${d.ocultos} elementos invisibles`)
    if (!d.foto) fallos.push(`${a.n}/${tema}: la FOTO no carga`)
    if (d.hojas.filter(Boolean).length !== 7) fallos.push(`${a.n}/${tema}: solo ${d.hojas.filter(Boolean).length}/7 hojas`)
    if (d.proyectos !== 9) fallos.push(`${a.n}/${tema}: ${d.proyectos} proyectos, esperaba 9`)
    if (errores.length) fallos.push(`${a.n}/${tema}: JS -> ${errores.join(' | ')}`)
    if (rotos.length) fallos.push(`${a.n}/${tema}: recursos -> ${rotos.join(' | ')}`)

    await p.screenshot({ path: `_revision/vivo-${a.n}-${tema}.png`, fullPage: false })
    console.log(`  ${a.n}px/${tema}  alto ${d.alto}  foto:${d.foto ? 'ok' : 'NO'}  hojas:${d.hojas.filter(Boolean).length}/7  proyectos:${d.proyectos}  fondo:${d.fondo}`)
    await ctx.close()
  }
}

// Enlaces externos: que todos apunten a algo real
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } })
const p = await ctx.newPage()
await p.goto(WEB, { waitUntil: 'networkidle' })
const enlaces = await p.evaluate(() =>
  [...document.querySelectorAll('a[href^="http"]')].map((a) => a.href))
const unicos = [...new Set(enlaces)]
console.log(`\nEnlaces externos: ${unicos.length}`)
for (const u of unicos) {
  try {
    const r = await p.request.get(u, { timeout: 25000, maxRedirects: 5 })
    const est = r.status()
    console.log(`  ${est}  ${u}`)
    if (est >= 400 && est !== 429 && est !== 999) fallos.push(`enlace ${est}: ${u}`)
  } catch (e) {
    console.log(`  ???  ${u}  (${String(e).slice(0, 60)})`)
  }
}
await ctx.close()
await nav.close()

console.log('\n' + (fallos.length ? 'FALLOS:\n- ' + fallos.join('\n- ') : '✓ Todo correcto en el sitio publicado.'))
process.exit(fallos.length ? 1 : 0)
