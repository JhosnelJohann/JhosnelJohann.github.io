// Comprueba con un navegador de verdad si estos sitios son publicos y utilizables.
import { chromium } from 'playwright'

const CAND = [
  'https://yt.tuimpulsolatino.com',
  'https://curso.tuimpulsolatino.com',
  'https://academiadeingles.tuimpulsolatino.com',
  'https://tuimpulsolatino.com',
  'https://meta.tuimpulsolatino.com',
  'https://planes.juanmanueltuagente.com',
  'https://staging.juanmanueltuagente.com',
]

const nav = await chromium.launch()
for (const url of CAND) {
  // Sin ignoreHTTPSErrors: si el certificado esta mal, quiero que falle igual que le fallaria
  // a un reclutador que abra el enlace.
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  try {
    const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await p.waitForTimeout(2000)
    const info = await p.evaluate(() => ({
      titulo: document.title,
      pass: !!document.querySelector('input[type=password]'),
      texto: document.body.innerText.slice(0, 110).replace(/\s+/g, ' '),
    }))
    console.log(`${String(r?.status()).padEnd(4)} ${url}`)
    console.log(`     titulo: ${info.titulo}`)
    console.log(`     login : ${info.pass ? 'SI, pide contrasena' : 'no'}`)
    console.log(`     texto : ${info.texto}\n`)
  } catch (e) {
    const msg = String(e).split('\n')[0]
    console.log(`FALLA ${url}`)
    console.log(`     ${msg.slice(0, 120)}\n`)
  }
  await ctx.close()
}
await nav.close()
