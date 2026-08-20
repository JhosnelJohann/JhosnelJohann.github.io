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
  },
})
