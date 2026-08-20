/**
 * Auditoría de móvil. No mide «se ve bien»: mide cosas comprobables.
 *
 * Falla —y por tanto no se publica— si encuentra:
 *   1. desborde horizontal
 *   2. objetivos táctiles por debajo de 44x44
 *   3. texto de cuerpo por debajo de 12,5 px
 *   4. palabras partidas en titulares
 *   5. contraste de cuerpo por debajo de 4,5:1
 *   6. el menú móvil no abre, no navega o no cierra
 *   7. las fichas no abren o no cierran
 *   8. en móvil llega la captura de escritorio en vez de la de móvil
 *   9. la página crece por encima del techo acordado
 */
import { chromium, devices } from 'playwright'
import { preview } from 'vite'

/* El techo de altura NO es un objetivo estético: es un detector de
   regresiones. Está puesto un 6 % por encima de lo que mide hoy, para que
   salte si alguien añade algo que dispare la página sin darse cuenta.
   La altura que hay es la que pide el contenido: cinco puestos con sus
   logros, doce proyectos, 32 competencias y siete hojas de diseño. */
const PANTALLAS = [
  { n: '320', w: 320, h: 690, techo: 19600 },
  { n: '390', w: 390, h: 844, techo: 18300 },
  { n: '414', w: 414, h: 896, techo: 17900 },
  { n: '768', w: 768, h: 1024, techo: 15700 },
]
const MIN_TACTIL = 44
const MIN_FUENTE = 12.5

const srv = await preview({ preview: { port: 5193 } })
const base = 'http://localhost:5193/'
const nav = await chromium.launch({
  args: ['--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
})
const fallos = []
const anota = (m) => fallos.push(m)

/* ── utilidades de medida dentro de la página ── */
const SONDA = () => {
  const lum = (c) => {
    const m = c.match(/\d+(\.\d+)?/g)
    if (!m) return 1
    const [r, g, b] = m.slice(0, 3).map((v) => {
      const s = Number(v) / 255
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const fondoDe = (el) => {
    let n = el
    while (n && n !== document.documentElement) {
      const bg = getComputedStyle(n).backgroundColor
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && !bg.endsWith(', 0)')) return bg
      n = n.parentElement
    }
    return getComputedStyle(document.body).backgroundColor
  }
  const visible = (el) => {
    const cs = getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0
  }

  // 2 · objetivos táctiles
  // Un enlace dentro de un párrafo es texto enlazado, no un control: la regla
  // de los 44 px es para lo que se pulsa a propósito, no para cada palabra.
  const enProsa = (el) => {
    const p = el.closest('p, li, dd, figcaption, blockquote')
    if (!p) return false
    const suyo = (el.textContent || '').trim().length
    const total = (p.textContent || '').trim().length
    return total > suyo + 20
  }

  const tactiles = []
  for (const el of document.querySelectorAll('a[href], button, [role="button"], input, select, summary')) {
    if (!visible(el)) continue
    if (el.closest('[hidden]')) continue
    if (enProsa(el)) continue
    const r = el.getBoundingClientRect()
    if (r.width < 44 - 0.5 || r.height < 44 - 0.5) {
      tactiles.push(
        `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} ${Math.round(r.width)}x${Math.round(r.height)}`,
      )
    }
  }

  // 3 · tamaño de fuente en texto de cuerpo
  const pequenos = []
  for (const el of document.querySelectorAll('p, li, dd, span.tj-gancho, .cab-nota, .hab-nota')) {
    if (!visible(el)) continue
    if (el.querySelector('p, li')) continue
    const txt = (el.textContent || '').trim()
    if (txt.length < 25) continue
    const cs = getComputedStyle(el)
    if (cs.fontFamily.includes('Mono')) continue
    const px = parseFloat(cs.fontSize)
    if (px < 12.5) pequenos.push(`${px}px "${txt.slice(0, 26)}…"`)
  }

  // 4 · palabras partidas en titulares
  const partidas = []
  for (const h of document.querySelectorAll('h1, h2, h3, .panel-et')) {
    if (!visible(h)) continue
    const cs = getComputedStyle(h)
    if (cs.wordBreak === 'break-all' || cs.overflowWrap === 'break-word') {
      partidas.push(h.tagName + ' usa corte de palabra')
    }
  }

  // 4b · palabras pegadas
  // Con `display: inline-block` el navegador recorta el espacio final del
  // recuadro y el texto sale sin separación. Se comprueba que entre dos
  // palabras de la misma línea quede hueco real.
  const pegadas = []
  for (const cont of document.querySelectorAll('.palabras, .cinetica')) {
    if (!visible(cont)) continue
    const trozos = [...cont.querySelectorAll('.pal, .cin-palabra')]
    for (let i = 0; i < trozos.length - 1; i++) {
      const a = trozos[i].getBoundingClientRect()
      const b = trozos[i + 1].getBoundingClientRect()
      if (Math.abs(a.top - b.top) > 2) continue // renglones distintos
      if (b.left - a.right < 1.2) {
        pegadas.push(`"${trozos[i].textContent}"+"${trozos[i + 1].textContent}"`)
        break
      }
    }
  }

  // 5 · contraste del cuerpo
  const contraste = []
  for (const el of document.querySelectorAll('p, li, dd')) {
    if (!visible(el)) continue
    const txt = (el.textContent || '').trim()
    if (txt.length < 40) continue
    const cs = getComputedStyle(el)
    const l1 = lum(cs.color)
    const l2 = lum(fondoDe(el))
    const r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
    if (r < 4.5) contraste.push(`${r.toFixed(2)}:1 "${txt.slice(0, 26)}…"`)
  }

  return {
    scroll: document.documentElement.scrollWidth,
    cliente: document.documentElement.clientWidth,
    alto: document.body.scrollHeight,
    tactiles: tactiles.slice(0, 6),
    pequenos: pequenos.slice(0, 6),
    partidas,
    pegadas: pegadas.slice(0, 4),
    contraste: contraste.slice(0, 5),
    capturas: [...document.querySelectorAll('.mini img')].map((i) => i.currentSrc || i.src),
  }
}

for (const s of PANTALLAS) {
  for (const tema of ['dark', 'light']) {
    const ctx = await nav.newContext({
      ...devices['iPhone 13'],
      viewport: { width: s.w, height: s.h },
      colorScheme: tema,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    })
    const p = await ctx.newPage()
    const errores = []
    p.on('pageerror', (e) => errores.push(String(e).slice(0, 90)))
    p.on('console', (m) => m.type() === 'error' && errores.push(m.text().slice(0, 90)))

    await p.goto(base, { waitUntil: 'networkidle' })
    await p.evaluate(async () => {
      for (let v = 0; v < 2; v++) {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 26))
        }
      }
      window.scrollTo(0, 0)
    })
    await p.waitForTimeout(900)

    const d = await p.evaluate(SONDA)
    const et = `${s.n}/${tema}`

    if (d.scroll > d.cliente + 1) anota(`${et}: desborde ${d.scroll}>${d.cliente}`)
    if (d.tactiles.length) anota(`${et}: táctil <${MIN_TACTIL}px → ${d.tactiles.join(' · ')}`)
    if (d.pequenos.length) anota(`${et}: fuente <${MIN_FUENTE}px → ${d.pequenos.join(' · ')}`)
    if (d.partidas.length) anota(`${et}: ${d.partidas.join(' · ')}`)
    if (d.pegadas.length) anota(`${et}: palabras pegadas → ${d.pegadas.join(' · ')}`)
    if (d.contraste.length) anota(`${et}: contraste bajo → ${d.contraste.join(' · ')}`)
    if (d.alto > s.techo) anota(`${et}: la página mide ${d.alto}px (techo ${s.techo})`)
    if (errores.length) anota(`${et}: JS → ${errores.join(' | ')}`)

    // 8 · ¿llega la captura de móvil?
    if (s.w <= 700) {
      const escritorio = d.capturas.filter((u) => u && !u.includes('-movil'))
      if (escritorio.length) {
        anota(`${et}: ${escritorio.length} capturas de ESCRITORIO servidas en móvil`)
      }
    }

    // 6 · el menú
    if (s.w <= 860) {
      const ham = p.locator('.nav-hamburguesa')
      if (!(await ham.isVisible())) anota(`${et}: no hay botón de menú`)
      else {
        await ham.click()
        await p.waitForTimeout(500)
        if (!(await p.locator('#menu-movil').isVisible())) anota(`${et}: el menú no abre`)
        const enlaces = await p.locator('#menu-movil .mnu-lista a').count()
        if (enlaces !== 5) anota(`${et}: el menú tiene ${enlaces} destinos, esperaba 5`)

        /* El menú se veía «abierto» y con cinco destinos, pero el texto era
           blanco sobre fondo claro por una colisión de nombres de clase, y no
           cubría la pantalla. Comprobar visibilidad no bastaba: hay que medir
           el contraste real y la altura. */
        const legible = await p.evaluate(() => {
          const lum = (c) => {
            const m = c.match(/\d+(\.\d+)?/g)
            if (!m) return 1
            const [r, g, b] = m.slice(0, 3).map((v) => {
              const s = Number(v) / 255
              return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
            })
            return 0.2126 * r + 0.7152 * g + 0.0722 * b
          }
          const menu = document.querySelector('#menu-movil')
          const destino = menu && menu.querySelector('.mnu-et')
          if (!menu || !destino) return { ok: false, motivo: 'sin destinos' }
          const l1 = lum(getComputedStyle(destino).color)
          const l2 = lum(getComputedStyle(menu).backgroundColor)
          const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
          const caja = menu.getBoundingClientRect()
          return {
            ok: ratio >= 4.5 && caja.height >= window.innerHeight - 2,
            ratio: Number(ratio.toFixed(2)),
            alto: Math.round(caja.height),
            ventana: window.innerHeight,
          }
        })
        if (!legible.ok) anota(`${et}: menú ilegible o no cubre → ${JSON.stringify(legible)}`)

        await p.screenshot({ path: `_revision/menu-${s.n}-${tema}.png` })
        await p.keyboard.press('Escape')
        await p.waitForTimeout(450)
        if (await p.locator('#menu-movil').isVisible()) anota(`${et}: el menú no cierra con Escape`)
      }
    }

    // 7 · la ficha
    const tarjeta = p.locator('#trabajo .tj-btn').first()
    await tarjeta.scrollIntoViewIfNeeded()
    await tarjeta.click()
    await p.waitForTimeout(700)
    if (!(await p.locator('.fi').isVisible())) anota(`${et}: la ficha no abre`)
    else {
      const cerrar = await p.locator('.fi-cerrar').boundingBox()
      if (cerrar && (cerrar.width < MIN_TACTIL || cerrar.height < MIN_TACTIL)) {
        anota(`${et}: cerrar ficha ${Math.round(cerrar.width)}x${Math.round(cerrar.height)}`)
      }
      if (s.n === '390' && tema === 'dark') {
        await p.screenshot({ path: '_revision/movil-ficha.png' })
      }
      await p.locator('.fi-cerrar').click()
      // La salida es un muelle: hay que darle su tiempo antes de juzgar
      await p.waitForTimeout(1100)
      if (await p.locator('.fi').isVisible()) {
        const porQue = await p.evaluate(() => {
          const fi = document.querySelector('.fi')
          const cs = fi ? getComputedStyle(fi) : null
          return {
            existe: !!fi,
            opacidad: cs?.opacity,
            cuerpoOverflow: document.body.style.overflow,
          }
        })
        anota(`${et}: la ficha no cierra → ${JSON.stringify(porQue)}`)
      }
      // El scroll del fondo tiene que quedar liberado
      const bloqueado = await p.evaluate(() => document.body.style.overflow === 'hidden')
      if (bloqueado) anota(`${et}: el fondo queda bloqueado tras cerrar la ficha`)
    }

    // Capturas por sección, solo en el ancho de referencia
    if (s.n === '390') {
      for (const sec of ['inicio', 'experiencia', 'trabajo', 'habilidades', 'diseno', 'contacto']) {
        await p.locator(`#${sec}`).scrollIntoViewIfNeeded()
        await p.waitForTimeout(400)
        await p.screenshot({ path: `_revision/m390-${tema}-${sec}.png` })
      }
    }

    console.log(`  ${s.n}px / ${tema}  ·  alto ${d.alto}px  ·  ok`)
    await ctx.close()
  }
}

await nav.close()
await srv.close()

console.log('\n' + (fallos.length ? `FALLOS (${fallos.length}):\n- ` + fallos.join('\n- ') : '✓ Móvil correcto.'))
process.exit(fallos.length ? 1 : 0)
