// Captura los sitios en vivo que sirven de miniatura en el portafolio.
// Son capturas reales: lo que un reclutador vería si abriera el enlace.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const SITIOS = [
  { slug: 'web-corporativa', url: 'https://tuagentedeinmigracion.org', espera: 2600 },
  { slug: 'ciudadania', url: 'https://ciudadania.tuagentedeinmigracion.com', espera: 2600 },
  { slug: 'feedecorte', url: 'https://feedecorte.tuagentedeinmigracion.com', espera: 2600 },
  { slug: 'link-bio', url: 'https://link.tuagentedeinmigracion.com', espera: 2200 },
  { slug: 'contacto-vcard', url: 'https://contacto.tuagentedeinmigracion.com', espera: 2200 },
  { slug: 'crm-tadi', url: 'https://crm.tuagentedeinmigracion.com', espera: 3000 },
]

mkdirSync('_capturas', { recursive: true })

/* Dos formatos: el visitante de escritorio ve la web de escritorio y el de
   móvil la ve como se vería en su propio teléfono. */
const FORMATOS = [
  {
    sufijo: '',
    viewport: { width: 1440, height: 900 },
    movil: false,
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36',
  },
  {
    sufijo: '-movil',
    viewport: { width: 390, height: 844 },
    movil: true,
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  },
]

const nav = await chromium.launch()

for (const f of FORMATOS) {
  console.log(`\n── ${f.movil ? 'móvil 390×844' : 'escritorio 1440×900'} ──`)
  const ctx = await nav.newContext({
    viewport: f.viewport,
    deviceScaleFactor: 2,
    ignoreHTTPSErrors: true,
    isMobile: f.movil,
    hasTouch: f.movil,
    userAgent: f.ua,
  })

for (const s of SITIOS) {
  const p = await ctx.newPage()
  try {
    await p.goto(s.url, { waitUntil: 'networkidle', timeout: 60000 })
    await p.waitForTimeout(s.espera)

    // Fuera cookies y ventanas modales, que arruinan la captura
    await p.evaluate(() => {
      const patrones = /cookie|consent|gdpr|modal|popup|overlay|banner/i
      for (const el of document.querySelectorAll('div,section,aside,dialog')) {
        const est = getComputedStyle(el)
        if (est.position !== 'fixed' && est.position !== 'sticky') continue
        const id = (el.id + ' ' + el.className).toString()
        const r = el.getBoundingClientRect()
        if (patrones.test(id) || (r.height > 90 && r.bottom > innerHeight - 40)) {
          el.style.display = 'none'
        }
      }
      window.scrollTo(0, 0)
    })
    await p.waitForTimeout(500)

    await p.screenshot({ path: `_capturas/${s.slug}${f.sufijo}.png` })
    const titulo = await p.title()
    console.log(`  ${(s.slug + f.sufijo).padEnd(24)} OK   ${titulo.slice(0, 46)}`)
  } catch (e) {
    console.log(`  ${(s.slug + f.sufijo).padEnd(24)} FALLO  ${String(e).slice(0, 84)}`)
  }
  await p.close()
}

  await ctx.close()
}

await nav.close()
