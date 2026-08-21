/**
 * El original en Drive de cada pieza.
 *
 * Lo que se publica en la web es una vista previa a 1080. El maestro sigue en
 * Drive, en 4K, y desde cada tarjeta se llega a él.
 *
 * Va en su propio módulo y no dentro de `video.ts` a propósito: hay una
 * `video.ts` por idioma, y un identificador duplicado en dos sitios acaba
 * divergiendo. El identificador no se traduce, así que vive una sola vez.
 *
 * Generado uniendo `_video-descargar.py` (identificador → nombre original) con
 * `_video-comprimir.py` (nombre original → archivo publicado). No se transcribe
 * a mano: un carácter cambiado en un identificador da un enlace roto que
 * ninguna comprobación de tipos detecta.
 */
export const ORIGINALES: Record<string, string> = {
  'manhattanlife-headline': '1pT9CjRFC4HuzoLiuiIe4vbBA12DLc1zH',        // ManhattanLife ADS 2 DEF CON_HEADLINE.mp4
  'medicare-05': '1cRF7nA0e5hTj8T32SWYyt_QL0fad-Hv8',                   // Medicare ADS 05.mp4
  'medicare-02': '1kNNgiMOkgf-lRAfNQOftpsXBunB4yxBz',                   // Medicare ADS 02 V1 POST.mp4
  'ciudadania-problem-aware': '1ohG8D84lxWIGehPeOio-CrtEIFuD-ZKE',      // Ciudadania Problem Aware V1.mp4
  'tipos-de-asilo': '1ONiPoordM5zf3dRyODaSXYr-6MuZZsXv',                // Video 004 271025 Tipos de Asilo CTA 1.mp4
  'ciudadania-pr-aw': '1jiSsmmteMYx3czyIxSDNaO6dkOsC9Dyb',              // PR AW CDDN 01 DEF.mp4
  'ciudadania-slt-aw': '1b7eY4Sf0IMTPxqfwuu1W0e4hv-HApoVV',             // SLT AW CDDN 02.mp4
  'secuencia-01': '1IKDtj6xHtCT3jk44zejZkx7wqCO0Km3g',                  // Secuencia 01_2.mp4
  'hook-7-cta-5': '15DWS6TjHC6ZO0mzzoe7evae_REaCNJ6R',                  // HOOK 7 + CTA 5.mp4
  'video-3-ganador': '1bgHUONcZDgABjoMWF1-U7rrwtZ8vIKZs',               // Video 3 ganador + CTA new.mp4
}

/** Enlace de visualización, no de descarga: se ve en Drive sin bajar 900 MB. */
export const enlaceOriginal = (archivo: string) => {
  const id = ORIGINALES[archivo]
  return id ? `https://drive.google.com/file/d/${id}/view` : null
}
