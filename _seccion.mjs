/**
 * Comprueba lo que cambió al reordenar y unificar la sección.
 *
 * Lo importante aquí no es que los elementos existan, sino:
 *   · que el ORDEN del DOM sea el nuevo
 *   · que el menú coincida con ese orden y LLEVE a donde dice
 *   · que las cifras terminen en su valor final, no que se estén moviendo
 *   · que con `prefers-reduced-motion` no haya animación
 */
import { chromium } from 'playwright'

const base = 'http://localhost:5188'
const fallos = []
const mal = (m) => { fallos.push(m); console.log('  FALLO  ' + m) }
const bien = (m) => console.log('  ok     ' + m)

const ORDEN = ['diseno', 'experiencia', 'trabajo', 'habilidades', 'contacto']
const MENU = {
  '/': ['Diseño y edición', 'Experiencia', 'Portafolio', 'Herramientas', 'Contacto'],
  '/en/': ['Design & editing', 'Experience', 'Portfolio', 'Toolkit', 'Contact'],
}
const CIFRAS = {
  '/': ['10', '11:30', '4K', '7'],
  '/en/': ['10', '11:30', '4K', '7'],
}

const nav = await chromium.launch({ args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] })

for (const ruta of ['/', '/en/']) {
  console.log(`\n${ruta}`)
  const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } })
  const p = await ctx.newPage()
  await p.goto(base + ruta, { waitUntil: 'networkidle' })
  await p.waitForFunction(() => !!document.querySelector('#raiz > *'), { timeout: 15000 })

  // 1 · El orden real del DOM
  const orden = await p.evaluate(() =>
    [...document.querySelectorAll('main section[id]')].map((s) => s.id))
  if (orden.join() !== ORDEN.join()) mal(`orden ${orden.join(' → ')}`)
  else bien(`orden: ${orden.join(' → ')}`)

  // 2 · El menú coincide, y su numeración
  const menu = await p.evaluate(() =>
    [...document.querySelectorAll('.nav-lista a')].map((a) => a.textContent.trim()))
  if (menu.join('|') !== MENU[ruta].join('|')) mal(`menú escritorio: ${menu.join(' · ')}`)
  else bien(`menú escritorio: ${menu.join(' · ')}`)

  const nums = await p.evaluate(() =>
    [...document.querySelectorAll('#menu-movil .mnu-n')].map((e) => e.textContent.trim()))
  if (nums.join() !== '01,02,03,04,05') mal(`numeración móvil: ${nums.join(' ')}`)
  else bien('numeración móvil 01–05')

  const etMovil = await p.evaluate(() =>
    [...document.querySelectorAll('#menu-movil .mnu-et')].map((e) => e.textContent.trim()))
  if (etMovil.join('|') !== MENU[ruta].join('|')) mal(`menú móvil: ${etMovil.join(' · ')}`)
  else bien('menú móvil coincide con el de escritorio')

  // 3 · Cada entrada lleva a su sección
  for (let i = 0; i < ORDEN.length; i++) {
    await p.locator('.nav-lista a').nth(i).click()
    await p.waitForTimeout(1100)
    const arriba = await p.evaluate((ids) => {
      const y = window.scrollY + 120
      let mejor = null, dist = Infinity
      for (const id of ids) {
        const s = document.getElementById(id)
        const d = Math.abs(s.getBoundingClientRect().top + window.scrollY - y)
        if (d < dist) { dist = d; mejor = id }
      }
      return mejor
    }, ORDEN)
    if (arriba !== ORDEN[i]) mal(`el menú «${menu[i]}» llevó a #${arriba}, esperaba #${ORDEN[i]}`)
  }
  bien('las cinco entradas llevan a su sección')

  // 4 · La sección: rótulo, número y nota de calidad
  await p.locator('#diseno').scrollIntoViewIfNeeded()
  await p.waitForTimeout(2200)                       // que terminen de contar

  const cab = await p.evaluate(() => ({
    num: document.querySelector('#diseno .cab-num b')?.textContent.trim(),
    rotulo: document.querySelector('#diseno .cab-num')?.textContent.trim(),
    oscura: document.querySelector('#diseno')?.classList.contains('oscuro'),
    subpaneles: [...document.querySelectorAll('#diseno .subp-titulo')].map((h) => h.textContent.trim()),
    calidad: document.querySelector('.vids-calidad')?.textContent.trim() ?? '',
  }))
  if (cab.num !== '01') mal(`el número de sección es ${cab.num}, esperaba 01`)
  else bien('numerada 01')
  if (!cab.oscura) mal('la sección no lleva la clase oscuro')
  else bien('sección en oscuro')
  if (cab.subpaneles.length !== 2) mal(`${cab.subpaneles.length} subpaneles, esperaba 2`)
  else bien(`subpaneles: ${cab.subpaneles.join(' · ')}`)
  if (!/4K|4,6 GB|4\.6 GB/.test(cab.calidad)) mal(`la nota de calidad no menciona el origen: «${cab.calidad}»`)
  else bien('nota de calidad presente y menciona el 4K de origen')

  // 5 · Las cifras terminaron en su valor final
  const cifras = await p.evaluate(() =>
    [...document.querySelectorAll('.dcifra-n')].map((e) => e.textContent.trim()))
  if (cifras.join('|') !== CIFRAS[ruta].join('|')) mal(`cifras: ${cifras.join(' · ')}`)
  else bien(`cifras terminadas: ${cifras.join(' · ')}`)

  // 6 · El icono del subpanel se dibujó de verdad
  const iconos = await p.evaluate(() =>
    [...document.querySelectorAll('#diseno .subp-icono svg path')].map((pa) => ({
      largo: pa.getTotalLength ? Math.round(pa.getTotalLength()) : 0,
      offset: getComputedStyle(pa).strokeDashoffset,
    })))
  if (!iconos.length) mal('los subpaneles no tienen icono SVG')
  else if (iconos.some((i) => i.largo === 0)) mal('algún icono no tiene trazo')
  else bien(`${iconos.length} trazos de icono dibujados`)

  await ctx.close()
}

/* 7 · Nada invisible por haberlo saltado.
 *
 * `IntersectionObserver` solo avisa cuando el elemento CRUZA la ventana. Al
 * saltar con el menú o con un enlace con ancla, un elemento puede pasar de
 * estar debajo a estar encima sin cruzarla, y quedarse en `opacity: 0` para
 * siempre. Esto lo detecta: cualquier `.revela` que ya quedó por encima y
 * siga sin revelar es contenido invisible. */
console.log('\nsaltos de menú: nada invisible detrás')
{
  const ctxS = await nav.newContext({ viewport: { width: 1280, height: 900 } })
  const ps = await ctxS.newPage()
  await ps.goto(base + '/', { waitUntil: 'networkidle' })
  await ps.waitForFunction(() => !!document.querySelector('#raiz > *'))

  // Salto directo al final, sin pasar por el medio
  await ps.evaluate(() => document.getElementById('contacto').scrollIntoView())
  await ps.waitForTimeout(1400)

  const ocultos = await ps.evaluate(() =>
    [...document.querySelectorAll('.revela')]
      .filter((e) => {
        const r = e.getBoundingClientRect()
        const yaPasado = r.bottom < 0
        return yaPasado && parseFloat(getComputedStyle(e).opacity) < 0.9
      })
      .map((e) => e.className.split(' ')[0])
      .slice(0, 8))

  if (ocultos.length) mal(`${ocultos.length} elementos invisibles tras saltar: ${ocultos.join(' · ')}`)
  else bien('tras saltar al final, nada quedó invisible por detrás')
  await ctxS.close()
}

// 8 · Con movimiento reducido, las cifras salen ya en su valor final
console.log('\nprefers-reduced-motion: reduce')
const ctxR = await nav.newContext({
  viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce',
})
const pr = await ctxR.newPage()
await pr.goto(base + '/', { waitUntil: 'networkidle' })
await pr.waitForFunction(() => !!document.querySelector('#raiz > *'))
await pr.locator('#diseno').scrollIntoViewIfNeeded()
await pr.waitForTimeout(1500)
const cr = await pr.evaluate(() => ({
  cifras: [...document.querySelectorAll('.dcifra-n')].map((e) => e.textContent.trim()),
  regla: getComputedStyle(document.querySelector('.subp-regla')).animationName,
}))
if (cr.cifras.join('|') !== '10|11:30|4K|7') mal(`con movimiento reducido: ${cr.cifras.join(' · ')}`)
else bien('las cifras muestran su valor final')
if (cr.regla !== 'none') mal(`la regla sigue animándose: ${cr.regla}`)
else bien('la regla no se anima')
await ctxR.close()

await nav.close()
console.log('\n' + '─'.repeat(60))
if (fallos.length) { console.log(`${fallos.length} FALLO(S)`); process.exit(1) }
console.log('La sección está bien ordenada en los dos idiomas.')
