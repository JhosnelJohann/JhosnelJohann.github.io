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
      foto: (() => { const i = document.querySelector('.enc-foto img'); return !!i && i.naturalWidth > 0 })(),
      hojas: [...document.querySelectorAll('.hoja-img img')].filter((i) => i.naturalWidth > 0).length,
      capturas: [...document.querySelectorAll('.mini img')].filter((i) => i.naturalWidth > 0).length,
      puestos: document.querySelectorAll('#experiencia .exp').length,
      piezas: document.querySelectorAll('#trabajo .tj').length,
      barras: document.querySelectorAll('#habilidades .hab').length,
      fondo: getComputedStyle(document.body).backgroundColor,
    }))

    if (d.scroll > d.cliente + 1) fallos.push(`${a.n}/${tema}: desborde ${d.scroll}>${d.cliente}`)
    if (d.ocultos) fallos.push(`${a.n}/${tema}: ${d.ocultos} elementos invisibles`)
    if (!d.foto) fallos.push(`${a.n}/${tema}: la FOTO no carga`)
    if (d.hojas !== 7) fallos.push(`${a.n}/${tema}: ${d.hojas}/7 hojas de diseño`)
    // En móvil se muestran 6 de las 12 piezas hasta pulsar «ver los demás»,
    // así que también hay 6 capturas en pantalla y no 8.
    const piezasEsperadas = a.w <= 700 ? 6 : 12
    const capturasEsperadas = a.w <= 700 ? 6 : 8
    if (d.capturas !== capturasEsperadas) {
      fallos.push(`${a.n}/${tema}: ${d.capturas}/${capturasEsperadas} capturas`)
    }
    if (d.puestos !== 5) fallos.push(`${a.n}/${tema}: ${d.puestos} puestos, esperaba 5`)
    if (d.piezas !== piezasEsperadas) {
      fallos.push(`${a.n}/${tema}: ${d.piezas} piezas, esperaba ${piezasEsperadas}`)
    }
    if (errores.length) fallos.push(`${a.n}/${tema}: JS -> ${errores.join(' | ')}`)
    if (rotos.length) fallos.push(`${a.n}/${tema}: recursos -> ${rotos.join(' | ')}`)

    await p.screenshot({ path: `_revision/vivo-${a.n}-${tema}.png`, fullPage: false })
    console.log(`  ${a.n}px/${tema}  alto ${d.alto}  foto:${d.foto ? 'ok' : 'NO'}  hojas:${d.hojas}/7  capturas:${d.capturas}/8  puestos:${d.puestos}  piezas:${d.piezas}  barras:${d.barras}  fondo:${d.fondo}`)
    await ctx.close()
  }
}

// Enlaces externos: que todos apunten a algo real, incluidos los de las fichas
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } })
const p = await ctx.newPage()
await p.goto(WEB, { waitUntil: 'networkidle' })
await p.evaluate(async () => {
  const alto = document.body.scrollHeight
  for (let y = 0; y < alto; y += 500) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 28))
  }
})
await p.waitForTimeout(800)
const enlaces = await p.evaluate(() =>
  [...document.querySelectorAll('a[href^="http"]')].map((a) => a.href))
const unicos = [...new Set(enlaces)]
console.log(`\nEnlaces externos: ${unicos.length}`)
for (const u of unicos) {
  try {
    const r = await p.request.get(u, { timeout: 25000, maxRedirects: 5 })
    const est = r.status()
    console.log(`  ${est}  ${u}`)
    // 401 esperado en las dos campañas en pausa: la propia página lo avisa.
    const enPausa = u.includes('planes.juanmanueltuagente') || u.includes('staging.juanmanueltuagente')
    if (est === 401 && enPausa) continue
    if (est >= 400 && est !== 429 && est !== 999) fallos.push(`enlace ${est}: ${u}`)
  } catch (e) {
    console.log(`  ???  ${u}  (${String(e).slice(0, 60)})`)
  }
}
await ctx.close()
await nav.close()

console.log('\n' + (fallos.length ? 'FALLOS:\n- ' + fallos.join('\n- ') : '✓ Todo correcto en el sitio publicado.'))
process.exit(fallos.length ? 1 : 0)
