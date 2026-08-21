/**
 * Comprueba el sitio YA PUBLICADO, no la compilacion local.
 *
 * Es la unica prueba que importa al final: una vez se dio por buena una
 * publicacion contra el despliegue anterior porque el envio se habia cortado a
 * medias. Aqui se compara contra algo que solo existe en esta version.
 */
import { chromium } from 'playwright'

const SITIO = 'https://jhosneljohann.github.io'
/* Marcas que solo existen a partir de esta version. Si falta alguna, lo que
   hay publicado es el despliegue viejo por mucho que la pagina cargue. */
const SELLOS = {
  '/en/': ['work experience', 'toolkit', 'let’s talk', 'jun 2026', 'hybrid', 'soyroas@gmail.com'],
  '/': ['experiencia laboral', 'herramientas', 'hablemos', 'jun 2026', 'semipresencial', 'soyroas@gmail.com'],
}

const fallos = []
const nav = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] })
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } })

for (const [ruta, sellos] of Object.entries(SELLOS)) {
  const p = await ctx.newPage()
  const rotos = []
  p.on('response', (r) => {
    if (r.status() >= 400 && !r.url().includes('favicon')) rotos.push(`${r.status()} ${r.url()}`)
  })

  const r = await p.goto(SITIO + ruta, { waitUntil: 'networkidle' })
  console.log(`\n${SITIO}${ruta}  →  HTTP ${r.status()}`)
  if (r.status() !== 200) fallos.push(`${ruta}: HTTP ${r.status()}`)
  await p.waitForTimeout(1200)

  await p.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)))
  for (const b of await p.locator('.habs-pestana').all()) await b.click().catch(() => {})
  await p.waitForTimeout(500)

  const texto = (await p.evaluate(() => document.body.innerText)).toLowerCase()
  for (const s of sellos) {
    if (texto.includes(s.toLowerCase())) console.log('  ok     ' + s)
    else { console.log('  FALTA  ' + s); fallos.push(`${ruta}: falta «${s}»`) }
  }

  const lang = await p.evaluate(() => document.documentElement.lang)
  const esperado = ruta === '/en/' ? 'en' : 'es'
  if (lang === esperado) console.log(`  ok     lang="${lang}"`)
  else { console.log(`  FALTA  lang="${lang}"`); fallos.push(`${ruta}: lang="${lang}"`) }

  const conmutador = await p.evaluate(() => {
    const a = document.querySelector('.nav-idioma')
    return a ? new URL(a.href).pathname : null
  })
  const destino = ruta === '/en/' ? '/' : '/en/'
  if (conmutador === destino) console.log(`  ok     conmutador → ${destino}`)
  else { console.log(`  FALTA  conmutador → ${conmutador}`); fallos.push(`${ruta}: conmutador a ${conmutador}`) }

  const imgs = await p.evaluate(() =>
    [...document.images].filter((i) => i.currentSrc && !i.complete).length,
  )
  if (imgs) fallos.push(`${ruta}: ${imgs} imagenes sin cargar`)
  if (rotos.length) { console.log('  FALTA  ' + rotos.slice(0, 3).join(' · ')); fallos.push(`${ruta}: ${rotos.length} peticiones rotas`) }
  else console.log('  ok     sin peticiones rotas')

  await p.close()
}

await nav.close()
console.log('\n' + '─'.repeat(58))
if (fallos.length) { fallos.forEach((f) => console.log(' · ' + f)); process.exit(1) }
console.log('Las dos versiones estan publicadas y correctas.')
