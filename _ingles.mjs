/**
 * Comprueba la version inglesa contra la compilacion de produccion.
 *
 * No basta con «se ve en ingles»: lo que falla de verdad al partir un sitio en
 * dos direcciones son las rutas relativas —desde /en/ una imagen `foto.jpg`
 * apunta a /en/foto.jpg y da 404— y las cadenas que se quedaron sin traducir
 * dentro del JSX. Esto detecta las dos cosas leyendo la pagina real.
 */
import { chromium } from 'playwright'

const base = 'http://localhost:5197'

/* Palabras que no pueden aparecer en la version inglesa. Elegidas porque no
   existen en ingles y porque estaban en el texto que habia que traducir. */
const DELATORAS = [
  'Disponible', 'Ubicación', 'Modalidad', 'Experiencia laboral', 'En curso',
  'Trayectoria', 'Portafolio', 'Herramientas', 'Contacto', 'Formación',
  'Certificaciones', 'Idiomas', 'Egresado', 'Cursando', 'Avanzado',
  'Intermedio', 'Detalle', 'Visitar', 'Por dentro', 'Ampliar', 'Todo',
  'Diseño', 'Desarrollo', 'Presencial', 'Remoto', 'Semipresencial',
  'acceso restringido', 'Ver mi experiencia', 'proyectos restantes',
  'tablas', 'nodos', 'documentos', 'dominios', 'marcas', 'pasos',
]

/* Y al reves: la version espanola no puede haberse quedado en ingles. */
const DELATORAS_EN = ['Work experience', 'Toolkit', 'Education & contact', 'Show the remaining']

const fallos = []
const mal = (m) => { fallos.push(m); console.log('  FALLO  ' + m) }
const bien = (m) => console.log('  ok     ' + m)

const navegador = await chromium.launch({
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'],
})

/** Abre una pagina, despliega todo lo plegado y devuelve su texto visible. */
async function leer(ctx, ruta) {
  const pag = await ctx.newPage()
  const rotos = []
  const consola = []
  pag.on('response', (r) => {
    if (r.status() >= 400 && !r.url().includes('favicon')) rotos.push(`${r.status()} ${r.url()}`)
  })
  pag.on('pageerror', (e) => consola.push(String(e)))

  await pag.goto(base + ruta, { waitUntil: 'networkidle' })
  await pag.waitForTimeout(700)

  /* Abrir todo lo que esconde texto: fichas, paneles plegados y «ver mas» */
  await pag.evaluate(() => {
    document.querySelectorAll('details').forEach((d) => (d.open = true))
  })
  for (const b of await pag.locator('.trab-mas, .habs-pestana').all()) {
    await b.click({ timeout: 2000 }).catch(() => {})
  }
  await pag.waitForTimeout(400)

  /* Las fichas y el visor de marcas tienen su propio texto —«Por dentro», los
     avisos de las galerias— y solo existen en el DOM cuando estan abiertos.
     Se abre una de cada y se acumula lo que muestran. */
  let extra = ''
  for (const [disparador, panel, cierre] of [
    ['.tj-btn', '.fi', '.fi-cerrar'],
    ['.hoja-btn', '.visor', '.ficha-cerrar'],
  ]) {
    const b = pag.locator(disparador).first()
    if (!(await b.count())) continue
    await b.click({ timeout: 3000 }).catch(() => {})
    await pag.waitForTimeout(600)
    const p = pag.locator(panel).first()
    if (await p.count()) extra += '\n' + (await p.innerText())
    await pag.locator(cierre).first().click({ timeout: 3000 }).catch(() => {})
    await pag.waitForTimeout(400)
  }

  const texto = (await pag.evaluate(() => document.body.innerText)) + extra
  const lang = await pag.evaluate(() => document.documentElement.lang)
  const titulo = await pag.title()
  const idiomaHref = await pag.evaluate(() => {
    const a = document.querySelector('.nav-idioma')
    return a ? { texto: a.textContent.trim(), href: new URL(a.href).pathname } : null
  })
  /* La URL que el navegador descargo de verdad, no la que dice el atributo */
  const imagenes = await pag.evaluate(() =>
    [...document.images].filter((i) => i.currentSrc).map((i) => new URL(i.currentSrc).pathname),
  )
  return { pag, texto, lang, titulo, idiomaHref, rotos, consola, imagenes }
}

for (const movil of [false, true]) {
  const ctx = await navegador.newContext(
    movil
      ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }
      : { viewport: { width: 1280, height: 900 } },
  )
  const donde = movil ? '390 px' : '1280 px'

  // ── Ingles ────────────────────────────────────────────────────────────
  console.log(`\n/en/  a ${donde}`)
  const en = await leer(ctx, '/en/')

  if (en.lang !== 'en') mal(`/en/ ${donde}: <html lang="${en.lang}">, deberia ser "en"`)
  else bien('lang="en"')

  if (!/Graphic Designer/i.test(en.titulo)) mal(`/en/ ${donde}: titulo sin traducir — "${en.titulo}"`)
  else bien(`titulo: ${en.titulo}`)

  const cuela = DELATORAS.filter((p) => en.texto.includes(p))
  if (cuela.length) mal(`/en/ ${donde}: espanol sin traducir — ${cuela.join(', ')}`)
  else bien(`sin espanol residual (${DELATORAS.length} palabras buscadas)`)

  if (!en.idiomaHref) mal(`/en/ ${donde}: no hay conmutador de idioma`)
  else if (en.idiomaHref.href !== '/' || en.idiomaHref.texto !== 'ES')
    mal(`/en/ ${donde}: el conmutador dice "${en.idiomaHref.texto}" y va a ${en.idiomaHref.href}`)
  else bien('conmutador ES → /')

  const fuera = en.imagenes.filter((p) => p.startsWith('/en/'))
  if (fuera.length) mal(`/en/ ${donde}: imagenes buscadas dentro de /en/ — ${fuera.slice(0, 3).join(', ')}`)
  else bien(`${en.imagenes.length} imagenes servidas desde la raiz`)

  if (en.rotos.length) mal(`/en/ ${donde}: peticiones rotas — ${en.rotos.slice(0, 4).join(' · ')}`)
  else bien('sin peticiones rotas')

  if (en.consola.length) mal(`/en/ ${donde}: error de consola — ${en.consola[0]}`)
  else bien('sin errores de consola')

  const desborde = await en.pag.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  if (desborde > 1) mal(`/en/ ${donde}: desborde horizontal de ${desborde} px`)
  else bien('sin desborde horizontal')
  await en.pag.close()

  // ── Espanol, para no haber roto la version que ya funcionaba ───────────
  console.log(`\n/  a ${donde}`)
  const es = await leer(ctx, '/')

  if (es.lang !== 'es') mal(`/ ${donde}: <html lang="${es.lang}">`)
  else bien('lang="es"')

  const cuelaEn = DELATORAS_EN.filter((p) => es.texto.includes(p))
  if (cuelaEn.length) mal(`/ ${donde}: ingles colado — ${cuelaEn.join(', ')}`)
  else bien('sigue en espanol')

  if (!es.idiomaHref || es.idiomaHref.href !== '/en/' || es.idiomaHref.texto !== 'EN')
    mal(`/ ${donde}: conmutador incorrecto — ${JSON.stringify(es.idiomaHref)}`)
  else bien('conmutador EN → /en/')

  if (es.rotos.length) mal(`/ ${donde}: peticiones rotas — ${es.rotos.slice(0, 4).join(' · ')}`)
  else bien('sin peticiones rotas')

  if (es.consola.length) mal(`/ ${donde}: error de consola — ${es.consola[0]}`)
  else bien('sin errores de consola')
  await es.pag.close()

  await ctx.close()
}

await navegador.close()

console.log('\n' + '─'.repeat(60))
if (fallos.length) {
  console.log(`${fallos.length} FALLO(S)\n`)
  fallos.forEach((f) => console.log(' · ' + f))
  process.exit(1)
}
console.log('Las dos versiones pasan.')
