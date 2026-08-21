/** ¿Dónde cae el corte entre la página 1 y la 2 del CV impreso? */
import { chromium } from 'playwright'
import { pathToFileURL } from 'node:url'

const C = 'C:/Users/preparador11/Desktop/Jhosnel-Laya-Expediente-2026-08/01-cv/'
const nav = await chromium.launch()
const p = await nav.newPage()

await p.goto(pathToFileURL(C + 'CV-Jhosnel-Laya-2026.html').href, { waitUntil: 'networkidle' })
await p.emulateMedia({ media: 'print' })
await p.waitForTimeout(400)

// Cuántas páginas salen de verdad, en tamaño Carta
const pdf = await p.pdf({ printBackground: true, preferCSSPageSize: true })
const paginas = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length

const d = await p.evaluate(() => {
  const mm = 96 / 25.4
  const hoja = document.querySelector('.hoja')
  const top = hoja.getBoundingClientRect().top
  const altoPagina = 279 * mm
  const corte = top + altoPagina

  const columnas = [...hoja.children].map((c) => ({
    clase: c.className || c.tagName,
    alto: Math.round(c.getBoundingClientRect().height),
  }))

  // Qué elementos atraviesan la línea de corte
  const cruzan = []
  hoja.querySelectorAll('h2, h3, li, p, .puesto, .cab, .barra').forEach((e) => {
    const r = e.getBoundingClientRect()
    if (r.height > 6 && r.top < corte && r.bottom > corte) {
      cruzan.push({
        clase: e.className || e.tagName,
        texto: e.textContent.trim().replace(/\s+/g, ' ').slice(0, 60),
        arriba: Math.round(corte - r.top),
        abajo: Math.round(r.bottom - corte),
      })
    }
  })

  // Qué empieza justo despues del corte (primeros 40 mm de la pagina 2)
  const empiezaPag2 = []
  hoja.querySelectorAll('h2, h3, .puesto').forEach((e) => {
    const r = e.getBoundingClientRect()
    if (r.top >= corte && r.top < corte + 40 * mm) {
      empiezaPag2.push(e.textContent.trim().replace(/\s+/g, ' ').slice(0, 60))
    }
  })

  return {
    altoHoja: Math.round(hoja.getBoundingClientRect().height),
    altoPagina: Math.round(altoPagina),
    columnas, cruzan, empiezaPag2,
  }
})

console.log(`Paginas reales (Carta): ${paginas}`)
console.log(`Alto de la hoja: ${d.altoHoja}px · una pagina Carta: ${d.altoPagina}px`)
console.log(`Ocupa ${(d.altoHoja / d.altoPagina).toFixed(2)} paginas\n`)
d.columnas.forEach((c) => console.log(`  columna ${c.clase}: ${c.alto}px`))
console.log('\nATRAVIESAN EL CORTE:')
if (!d.cruzan.length) console.log('  ninguno')
d.cruzan.forEach((c) => console.log(`  [${c.clase}] "${c.texto}"  (${c.arriba}px arriba / ${c.abajo}px abajo)`))
console.log('\nEMPIEZA LA PAGINA 2 CON:')
d.empiezaPag2.forEach((t) => console.log(`  ${t}`))

await nav.close()
