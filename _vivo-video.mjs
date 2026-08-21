/**
 * Verifica el portafolio de vídeo EN EL SITIO PUBLICADO.
 *
 * No basta con que la página cargue: eso lo hacía también la versión
 * anterior. Se comprueba que los diez .mp4 y las diez portadas devuelven 200
 * con el tipo correcto, y que uno reproduce de verdad desde la URL pública.
 */
import { chromium } from 'playwright'

const SITIO = 'https://jhosneljohann.github.io'
const VIDEOS = [
  'manhattanlife-headline', 'ciudadania-pr-aw', 'ciudadania-slt-aw', 'secuencia-01',
  'medicare-05', 'medicare-02', 'tipos-de-asilo', 'ciudadania-problem-aware',
  'hook-7-cta-5', 'video-3-ganador',
]
const CAPTURAS = [
  'n8n/n8n-setter.jpg', 'n8n/n8n-seguros-inbound.jpg', 'n8n/n8n-paula-manhattan.jpg',
  'ghl/ghl-sistema-ventas.jpg', 'ghl/ghl-puente-n8n.jpg', 'ghl/ghl-envio-api.jpg',
  'trabajo/n8n-setter.jpg', 'trabajo/ghl-sistema-ventas.jpg',
]

const fallos = []
const mal = (m) => { fallos.push(m); console.log('  FALLO  ' + m) }
const bien = (m) => console.log('  ok     ' + m)

const nav = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] })
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } })
const p = await ctx.newPage()

// ── 1 · Los archivos existen y pesan lo que deben ────────────────────────
console.log('Archivos servidos:\n')
let mbTotal = 0
for (const v of VIDEOS) {
  for (const [ruta, tipo] of [[`video/${v}.mp4`, 'video/mp4'], [`video/${v}.jpg`, 'image/jpeg']]) {
    const r = await p.request.fetch(`${SITIO}/${ruta}`, { method: 'HEAD' })
    const largo = Number(r.headers()['content-length'] || 0)
    const ct = r.headers()['content-type'] || ''
    if (r.status() !== 200) mal(`${ruta}: HTTP ${r.status()}`)
    else if (!ct.includes(tipo.split('/')[1])) mal(`${ruta}: content-type «${ct}»`)
    else if (largo < 10_000) mal(`${ruta}: solo ${largo} bytes`)
    else if (ruta.endsWith('.mp4')) mbTotal += largo / 1024 / 1024
  }
}
if (!fallos.length) bien(`los 10 vídeos y sus portadas responden 200 · ${mbTotal.toFixed(0)} MB`)

for (const c of CAPTURAS) {
  const r = await p.request.fetch(`${SITIO}/${c}`, { method: 'HEAD' })
  if (r.status() !== 200) mal(`${c}: HTTP ${r.status()}`)
}
if (!CAPTURAS.some((c) => fallos.some((f) => f.startsWith(c)))) {
  bien(`las ${CAPTURAS.length} capturas de flujos responden 200`)
}

/* ── 2 · La página, y que un vídeo reproduzca de verdad ───────────────────
 *
 * El sello es una cadena que SOLO existe en la versión nueva: sirve para
 * distinguir «la web está publicada» de «la web publicada es la de antes».
 * Al unificar la sección, el rótulo pasó de «Portafolio de edición» al
 * subpanel «Edición», y este sello se quedó apuntando al texto viejo: daba
 * fallo con la versión correcta delante. Ahora apunta a la nota de vista
 * previa, que es lo último que se ha añadido. */
for (const [et, ruta, sello] of [
  ['español', '/', 'vistas previas'],
  ['inglés', '/en/', 'previews'],
]) {
  console.log(`\n${SITIO}${ruta}`)
  const pedidos = []
  p.on('request', (r) => { if (r.url().endsWith('.mp4')) pedidos.push(r.url()) })

  const res = await p.goto(SITIO + ruta, { waitUntil: 'networkidle' })
  if (res.status() !== 200) { mal(`${et}: HTTP ${res.status()}`); continue }

  await p.waitForFunction(() => !!document.querySelector('#raiz > *'), { timeout: 20000 })
  await p.locator('#diseno').scrollIntoViewIfNeeded()
  await p.waitForTimeout(1500)

  const texto = (await p.evaluate(() => document.body.innerText)).toLowerCase()
  if (!texto.includes(sello)) mal(`${et}: falta «${sello}» — lo publicado es la versión anterior`)
  else bien(`sello presente: «${sello}»`)

  const n = await p.locator('.vid-btn').count()
  if (n !== 10) mal(`${et}: ${n} tarjetas de vídeo, esperaba 10`)
  else bien('las 10 tarjetas están')

  const ghl = await p.evaluate(() =>
    [...document.querySelectorAll('.tj-titulo')].some((h) => /gohighlevel/i.test(h.textContent)))
  if (!ghl) mal(`${et}: no aparece la ficha de GoHighLevel`)
  else bien('la ficha de GoHighLevel está')

  const antes = pedidos.length
  await p.locator('.vid-btn').first().click()
  await p.waitForTimeout(5000)
  const est = await p.evaluate(() => {
    const v = document.querySelector('.vid-video')
    return v ? { rs: v.readyState, t: v.currentTime, d: v.duration, err: v.error?.code ?? null } : null
  })
  if (!est) mal(`${et}: al pulsar no apareció <video>`)
  else if (est.err) mal(`${et}: error de vídeo ${est.err}`)
  else if (est.rs < 2) mal(`${et}: readyState ${est.rs}`)
  else if (!(est.t > 0)) mal(`${et}: el tiempo no avanza`)
  else bien(`reproduce desde la URL pública: ${est.t.toFixed(1)}s de ${est.d.toFixed(0)}s`)

  if (pedidos.length === antes) mal(`${et}: no se pidió ningún .mp4 al pulsar`)

  p.removeAllListeners('request')
}

await nav.close()
console.log('\n' + '─'.repeat(60))
if (fallos.length) { console.log(`${fallos.length} FALLO(S)`); process.exit(1) }
console.log('El portafolio de vídeo está publicado y funciona.')
