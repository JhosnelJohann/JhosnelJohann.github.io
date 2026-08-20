// Confirma que lo publicado es de verdad la versión nueva, y no la anterior.
import { chromium } from 'playwright'

const WEB = 'https://jhosneljohann.github.io/'
const ESPERADO = [
  { que: 'correo', buscar: 'soyroas@gmail.com' },
  { que: 'fecha de nacimiento', buscar: '5 de enero de 2001' },
  { que: 'modalidad remoto', buscar: 'Remoto' },
  { que: 'modalidad semipresencial', buscar: 'Semipresencial' },
  { que: 'modalidad presencial', buscar: 'Presencial' },
  { que: 'modalidad freelance', buscar: 'Freelance' },
]

const nav = await chromium.launch()
const p = await nav.newPage({ viewport: { width: 1280, height: 900 } })
await p.goto(WEB, { waitUntil: 'networkidle' })
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 26))
  }
})
await p.waitForTimeout(900)

const texto = await p.evaluate(() => document.body.innerText)
const modalidades = await p.evaluate(() =>
  [...document.querySelectorAll('#experiencia .exp-modalidad')].map((e) => e.textContent))

// Sin distinguir mayúsculas: `text-transform: uppercase` cambia el texto que
// devuelve innerText, y comparar tal cual daba falsos negativos.
const plano = texto.toLowerCase()

let mal = 0
for (const e of ESPERADO) {
  const ok = plano.includes(e.buscar.toLowerCase())
  console.log(`  ${ok ? '✓' : '✗'} ${e.que}: ${e.buscar}`)
  if (!ok) mal++
}
console.log(`\n  modalidades en pantalla: ${modalidades.join(' · ')}`)
if (modalidades.length !== 5) { console.log('  ✗ esperaba 5'); mal++ }

await nav.close()
console.log('\n' + (mal ? `${mal} cosas NO están publicadas todavía` : '✓ La versión publicada es la nueva.'))
process.exit(mal ? 1 : 0)
