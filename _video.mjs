/**
 * Auditoría del portafolio de vídeo.
 *
 * Lo que hay que comprobar no es «existen los archivos», sino tres cosas que
 * pueden estar mal pareciendo bien:
 *
 *   1. Que al ABRIR la página no se descargue ni un byte de vídeo. Diez
 *      archivos de 20 MB cargando a la vez son 190 MB de golpe. Se comprueba
 *      leyendo las peticiones REALES del navegador, no el atributo `preload`.
 *   2. Que al pulsar, el vídeo llegue a reproducir de verdad — `readyState`
 *      y que avance el tiempo, no que el elemento exista.
 *   3. Que ninguno tenga `autoplay`.
 */
import { chromium } from 'playwright'

const base = 'http://localhost:5188'
const fallos = []
const mal = (m) => { fallos.push(m); console.log('  FALLO  ' + m) }
const bien = (m) => console.log('  ok     ' + m)

const nav = await chromium.launch({
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--autoplay-policy=no-user-gesture-required'],
})

for (const [etiqueta, ruta, esperados] of [['español', '/', 10], ['inglés', '/en/', 10]]) {
  console.log(`\n${etiqueta}  ·  ${ruta}`)
  const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } })
  const pag = await ctx.newPage()

  const pedidos = []
  const rotos = []
  pag.on('request', (r) => {
    const u = new URL(r.url()).pathname
    if (u.endsWith('.mp4')) pedidos.push(u)
  })
  pag.on('response', (r) => {
    if (r.status() >= 400 && !r.url().includes('favicon')) rotos.push(`${r.status()} ${new URL(r.url()).pathname}`)
  })

  await pag.goto(base + ruta, { waitUntil: 'networkidle' })
  await pag.waitForFunction(() => !!document.querySelector('#raiz > *'), { timeout: 15000 })

  // Recorrer hasta la sección: si no se recorre, la carga diferida no se dispara
  await pag.locator('#diseno').scrollIntoViewIfNeeded()
  await pag.waitForTimeout(1200)
  await pag.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 22))
    }
  })
  await pag.waitForTimeout(900)

  // 1 · Nada de vídeo descargado al abrir
  if (pedidos.length) mal(`${etiqueta}: se pidieron ${pedidos.length} .mp4 sin pulsar → ${pedidos[0]}`)
  else bien('al abrir la página no se descarga ningún .mp4')

  // 2 · Las diez tarjetas, con su portada
  const tarjetas = await pag.evaluate(() => {
    const bs = [...document.querySelectorAll('.vid-btn')]
    return {
      n: bs.length,
      sinPortada: bs.filter((b) => !b.querySelector('img')?.currentSrc).length,
      sinDuracion: bs.filter((b) => !b.querySelector('.vid-dur')?.textContent.trim()).length,
      pequenos: bs.filter((b) => {
        const r = b.querySelector('.vid-play')?.getBoundingClientRect()
        return !r || r.width < 44 || r.height < 44
      }).length,
    }
  })
  if (tarjetas.n !== esperados) mal(`${etiqueta}: ${tarjetas.n} tarjetas, esperaba ${esperados}`)
  else bien(`${tarjetas.n} tarjetas de vídeo`)
  if (tarjetas.sinPortada) mal(`${etiqueta}: ${tarjetas.sinPortada} sin portada cargada`)
  else bien('las diez portadas cargan')
  if (tarjetas.sinDuracion) mal(`${etiqueta}: ${tarjetas.sinDuracion} sin duración`)
  else bien('todas muestran su duración')
  if (tarjetas.pequenos) mal(`${etiqueta}: ${tarjetas.pequenos} botones por debajo de 44 px`)
  else bien('botones de reproducción de 44 px o más')

  // 3 · Ninguno con autoplay
  const auto = await pag.evaluate(() => document.querySelectorAll('video[autoplay]').length)
  if (auto) mal(`${etiqueta}: ${auto} vídeos con autoplay`)
  else bien('ninguno con autoplay')

  // 4 · Al pulsar, reproduce DE VERDAD
  await pag.locator('.vid-btn').first().click()
  await pag.waitForTimeout(3500)
  const est = await pag.evaluate(() => {
    const v = document.querySelector('.vid-video')
    if (!v) return null
    return {
      src: new URL(v.currentSrc || v.src).pathname,
      readyState: v.readyState,
      tiempo: v.currentTime,
      duracion: v.duration,
      pausado: v.paused,
      error: v.error ? v.error.code : null,
    }
  })
  if (!est) mal(`${etiqueta}: al pulsar no apareció ningún <video>`)
  else {
    if (est.error) mal(`${etiqueta}: error de vídeo código ${est.error}`)
    else if (est.readyState < 2) mal(`${etiqueta}: readyState ${est.readyState}, no llegó a tener datos`)
    else if (!(est.duracion > 0)) mal(`${etiqueta}: duración ${est.duracion}`)
    else if (est.tiempo <= 0) mal(`${etiqueta}: reproduce pero el tiempo no avanza (${est.tiempo})`)
    else bien(`reproduce: ${est.src} · ${est.tiempo.toFixed(1)}s de ${est.duracion.toFixed(0)}s`)

    if (!pedidos.length) mal(`${etiqueta}: se pulsó reproducir y no se pidió ningún .mp4`)
    else bien(`al pulsar se pidió el archivo (${pedidos.length})`)
  }

  if (rotos.length) mal(`${etiqueta}: peticiones rotas → ${rotos.slice(0, 3).join(' · ')}`)
  else bien('sin peticiones rotas')

  await ctx.close()
}

// 5 · Móvil: que la rejilla no desborde
console.log('\nmóvil · 320 px')
const ctxm = await nav.newContext({
  viewport: { width: 320, height: 720 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
})
const pm = await ctxm.newPage()
await pm.goto(base + '/', { waitUntil: 'networkidle' })
await pm.locator('#diseno').scrollIntoViewIfNeeded()
await pm.waitForTimeout(1000)
const m = await pm.evaluate(() => {
  const de = document.documentElement
  const r = document.querySelector('.vids-rejilla')?.getBoundingClientRect()
  const chicos = [...document.querySelectorAll('.vid-play')]
    .filter((e) => { const b = e.getBoundingClientRect(); return b.width < 44 || b.height < 44 }).length
  return { desborde: de.scrollWidth - de.clientWidth, ancho: r ? Math.round(r.width) : 0, chicos }
})
if (m.desborde > 1) mal(`320 px: desborde de ${m.desborde} px`)
else bien('320 px: sin desborde horizontal')
if (m.ancho > 320) mal(`320 px: la rejilla mide ${m.ancho} px`)
else bien(`320 px: la rejilla cabe (${m.ancho} px)`)
if (m.chicos) mal(`320 px: ${m.chicos} botones por debajo de 44 px`)
else bien('320 px: botones táctiles correctos')
await ctxm.close()

await nav.close()
console.log('\n' + '─'.repeat(60))
if (fallos.length) { console.log(`${fallos.length} FALLO(S)`); process.exit(1) }
console.log('El portafolio de vídeo pasa.')
