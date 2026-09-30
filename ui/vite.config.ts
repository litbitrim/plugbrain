import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function readOnlyPreview() {
  return {
    name: 'plugbrain-read-only-preview',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use((req, res, next) => {
        let pathname = ''
        try { pathname = new URL(req.url ?? '/', 'http://vite.local').pathname } catch {}
        if (pathname.startsWith('/api') && !['GET', 'HEAD', 'OPTIONS'].includes(req.method ?? '')) {
          res.statusCode = 405
          res.setHeader('Allow', 'GET, HEAD, OPTIONS')
          res.end('Read-only preview')
          return
        }
        next()
      })
    },
  }
}

// Built into ../ui-dist so the Node server can serve it as a static root
// without the source tree being reachable over HTTP.
export default defineConfig({
  base: '/',
  plugins: [react(), readOnlyPreview()],
  build: { outDir: '../ui-dist', emptyOutDir: true },
  server: {
    proxy: { '/api': process.env.VITE_API_PROXY || 'http://127.0.0.1:4310' },
  },
})
