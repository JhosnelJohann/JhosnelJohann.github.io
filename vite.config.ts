import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// La base cambia segun donde se publique:
//   usuario.github.io          -> '/'
//   usuario.github.io/repo/    -> '/repo/'
// Se pasa por variable de entorno para no tocar el codigo al desplegar.
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    rollupOptions: {
      /* Dos paginas, un solo paquete: el espanol en la raiz y el ingles en
         /en/. El idioma lo decide la direccion, no una preferencia guardada,
         asi cada version se puede enlazar y indexar por separado. */
      input: {
        es: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'en/index.html'),
      },
    },
  },
})
