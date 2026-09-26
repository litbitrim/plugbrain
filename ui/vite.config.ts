import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Built into ../ui-dist so the Node server can serve it as a static root
// without the source tree being reachable over HTTP.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: { outDir: '../ui-dist', emptyOutDir: true },
  server: { proxy: { '/api': process.env.VITE_API_PROXY || 'http://127.0.0.1:4310' } },
})
