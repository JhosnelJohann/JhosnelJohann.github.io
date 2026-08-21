/** Genera el PDF real y lo rasteriza pagina a pagina, para VER cada hoja. */
import { chromium } from 'playwright'
import { pathToFileURL } from 'node:url'
import { writeFileSync, mkdirSync } from 'node:fs'

const C = 'C:/Users/preparador11/Desktop/Jhosnel-Laya-Expediente-2026-08/01-cv/'
mkdirSync('_revision/cv', { recursive: true })

const nav = await chromium.launch()
const p = await nav.newPage()
await p.goto(pathToFileURL(C + 'CV-Jhosnel-Laya-2026.html').href, { waitUntil: 'networkidle' })

// 1 · El PDF de verdad
const pdf = await p.pdf({ printBackground: true, preferCSSPageSize: true })
writeFileSync('_revision/cv/CV.pdf', pdf)
const paginas = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length
console.log(`PDF generado: ${paginas} paginas, ${(pdf.length / 1024).toFixed(0)} kB`)

// 2 · Capturas por franja de 279 mm: es lo que va a ver quien reciba el PDF
await p.emulateMedia({ media: 'print' })
await p.waitForTimeout(300)
const mm = 96 / 25.4
const alto = Math.round(279 * mm)
const ancho = Math.round(216 * mm)
await p.setViewportSize({ width: ancho, height: alto })

for (let i = 0; i < paginas; i++) {
  await p.evaluate((y) => window.scrollTo(0, y), i * alto)
  await p.waitForTimeout(300)
  await p.screenshot({ path: `_revision/cv/pagina-${i + 1}.png` })
  console.log(`  capturada pagina ${i + 1}`)
}

await nav.close()
